import { storeKey } from './storekey';
import { sanitizeLook2, withRandomStarter, type Look2 } from './avatar';
// All game state is plain serializable JSON. All changes go through `Action`s
// so a future multiplayer server can validate/relay the same actions.
import { ranchApply, cleanPlots, cleanBasket, BASKET_ITEM, type Basket, type Plot, type RanchOp } from './ranch';
import { keepMailbox, type Mailbox } from './mail';
export type RoomId = 'living' | 'bedroom' | 'kitchen' | 'salon' | 'nursery' | 'bathroom' | 'backyard';
/** Display order is the client's tab list. Backyard is a room id only until its scene ships. */
export const ROOM_IDS: RoomId[] = ['living', 'bedroom', 'kitchen', 'salon', 'nursery', 'bathroom', 'backyard'];
/** Rooms with a tab. A save pointing at anything else opens the living room. */
export const TAB_ROOMS: readonly RoomId[] = ['living', 'bedroom', 'kitchen', 'salon', 'nursery', 'bathroom'];
/** Room size in world units. v1 rooms were 1000 wide; v2 rooms are 2.4x wider. */
export const ROOM_W = 2400, ROOM_H = 600, V1_ROOM_W = 1000;
/** v1 layouts are re-centred in the wider room so nothing a child built moves relative to anything else. */
export const V1_OFFSET = (ROOM_W - V1_ROOM_W) / 2;

export interface PlacedItem {
  id: string;        // unique instance id
  kind: string;      // catalog key (see items.ts)
  x: number;         // position in room units (0..ROOM_W wide, 0..ROOM_H tall), center-bottom anchor
  y: number;
  flip: boolean;
  z: number;         // layer order
  scale: number;
}

export interface Room {
  wallpaper: string; floor: string; pattern: number; items: PlacedItem[];
  wallTile?: string | null;   // pattern-pack id "<pack>/<slug>" (overrides built-in pattern)
  floorTile?: string | null;
}

export type Hand = 'left' | 'right';
export type CharSize = 'little' | 'kid' | 'adult';
export interface Character {
  id: string;
  skin: string; hair: string; hairStyle: number; shirt: string; pants: string;
  size: CharSize; acc: number;          // accessory: 0 none, 1 bow, 2 glasses, 3 cap
  look2?: Look2;                     // chibi maker. Missing means the classic drawing.
  room: RoomId; x: number; y: number; flip: boolean;
  /** Items held in each hand travel with the character (x/y of a held item are ignored). */
  held: { left: PlacedItem | null; right: PlacedItem | null };
}
export const MAX_CHARS = 8;

/** A house cat lives in one room of its house and wanders around its home spot `x` on its own. */
export interface Cat { name: string; coat: number; room: RoomId; x: number }
/** A dog follows its walker (solo: a character id; neighborhood: the player, stored on the server instead). */
export interface Dog { name: string; breed: number; owner?: string }
/** The house owner's dog is resting in this placed kennel. Null means she follows her walker. */
export interface DogKennel { item: string }
export const CAT_COATS = 4, DOG_BREEDS = 5;
const KENNEL_ID = /^[A-Za-z0-9:_\/.-]{1,80}$/;

/** Keep a kennel link only when that placed kennel is still in the house. A missing kennel lets the dog follow again. */
export function validKennel(s: { dogKennel?: unknown; rooms?: Record<string, { items?: { id?: string; kind?: string }[] | null }> | null }): DogKennel | null {
  const k = s?.dogKennel as { item?: unknown } | null | undefined;
  if (!k || typeof k !== 'object' || typeof k.item !== 'string' || !KENNEL_ID.test(k.item)) return null;
  const rooms = s.rooms; if (!rooms) return null;
  for (const room of Object.values(rooms)) {
    if (room?.items?.some(i => i && i.id === k.item && i.kind === 'kennel')) return { item: k.item };
  }
  return null;
}
function kennelHere(s: GameState, id: string) { return validKennel({ dogKennel: { item: id }, rooms: s.rooms }) !== null; }

export interface GameState {
  version: 3;
  cat?: Cat | null;          // optional: older saves simply have no pets
  dog?: Dog | null;
  dogKennel?: DogKennel | null;
  /** Letters in the mailbox out front. Absent when empty so older saves stay identical. */
  mailbox?: Mailbox | null;
  basket?: Basket;           // Rainbow Ranch (solo play): her basket, garden plots, last egg time
  garden?: (Plot | null)[];
  lastEgg?: number;
  houseId: string;           // future: one house per invited player
  currentRoom: RoomId;
  rooms: Record<RoomId, Room>;
  characters: Character[];
  soundOn: boolean;
}

export type Action =
  | { type: 'room/switch'; room: RoomId }
  | { type: 'item/add'; room: RoomId; item: PlacedItem }
  | { type: 'item/move'; room: RoomId; id: string; x: number; y: number }
  | { type: 'item/flip'; room: RoomId; id: string }
  | { type: 'item/front'; room: RoomId; id: string }
  | { type: 'item/back'; room: RoomId; id: string }
  | { type: 'item/delete'; room: RoomId; id: string }
  | { type: 'room/wallpaper'; room: RoomId; color: string }
  | { type: 'room/floor'; room: RoomId; color: string }
  | { type: 'room/pattern'; room: RoomId; pattern: number }
  | { type: 'room/wallTile'; room: RoomId; tile: string | null }
  | { type: 'room/floorTile'; room: RoomId; tile: string | null }
  | { type: 'char/add'; char: Character }
  | { type: 'char/update'; id: string; patch: Partial<Pick<Character, 'skin' | 'hair' | 'hairStyle' | 'shirt' | 'pants' | 'size' | 'acc' | 'flip'>> & { look2?: Look2 | null } }
  | { type: 'char/move'; id: string; room: RoomId; x: number; y: number }
  | { type: 'char/delete'; id: string }
  | { type: 'char/hold'; id: string; hand: Hand; room: RoomId; itemId: string }
  | { type: 'char/release'; id: string; hand: Hand; x: number; y: number }
  | { type: 'cat/set'; cat: Cat | null }
  | { type: 'cat/move'; room: RoomId; x: number }
  | { type: 'dog/set'; dog: Dog | null }
  | { type: 'dog/kennel'; item: string | null }
  | { type: 'settings/sound'; on: boolean }
  | { type: 'game/reset' }
  | { type: 'ranch/op'; op: RanchOp; now: number };

const it = (kind: string, x: number, y: number, z: number, scale = 1): PlacedItem =>
  ({ id: kind + '-' + z, kind, x: x + V1_OFFSET, y, flip: false, z, scale });

export function initialState(): GameState {
  return {
    version: 3,
    houseId: 'local',
    currentRoom: 'living',
    rooms: {
      living: { wallpaper: '#ffd6e0', floor: '#e8b98a', pattern: 1, items: [
        it('sofa', 470, 470, 1), it('lamp', 230, 470, 2), it('plant', 760, 480, 3), it('rug', 480, 530, 0), it('picture', 470, 200, 4), it('cat', 600, 520, 5),
        it('window', -350, 230, 6), it('armchair', -300, 480, 7), it('bookshelf', 1250, 470, 8), it('tree', 1500, 480, 9), it('clock', 1100, 170, 10)] },
      bedroom: { wallpaper: '#d9ccff', floor: '#f2d0a4', pattern: 2, items: [
        it('bed', 450, 480, 1), it('window', 750, 230, 2), it('teddy', 330, 500, 3), it('stars', 300, 180, 4), it('tub', 1350, 480, 5), it('lamp', -250, 470, 6), it('flowers', -150, 500, 7)] },
      salon: { wallpaper: '#ffe0f0', floor: '#f6d6ff', pattern: 2, items: [
        it('rug', 470, 540, 0), it('mirror', 470, 150, 1), it('vanity', 470, 480, 2), it('perfume', 400, 345, 3), it('polish', 450, 345, 4), it('hairdryer', 560, 340, 5),
        it('stool', 470, 545, 6), it('lamp', 200, 470, 7), it('flowers', 780, 480, 8), it('picture', 780, 200, 9), it('chair', -250, 490, 10), it('mirror', -250, 170, 11), it('plant', 1300, 480, 12)] },
      kitchen: { wallpaper: '#cdf3dc', floor: '#ffe7a8', pattern: 3, items: [
        it('fridge', 200, 470, 1), it('table', 520, 500, 2), it('cake', 520, 395, 3), it('stove', 800, 470, 4), it('chair', 380, 500, 5), it('chair', 660, 500, 6), it('juice', 470, 395, 7), it('plant', -300, 480, 8), it('fish', 1300, 480, 9)] },
      // Same shape as the Salon: old saves gain these pieces, version stays 3.
      nursery: { wallpaper: '#d6f3ff', floor: '#f3ddc4', pattern: 1, items: [
        it('cloud-rug', 480, 545, 0), it('crib', 470, 480, 1), it('crib-mobile', 470, 155, 2), it('rocker', 780, 490, 3)] },
      // Toilet and soaker fill the opening view, with room for her between them.
      // Ladder, shower, vanity, and fern continue across the right side of the room.
      bathroom: { wallpaper: '#d7f6f8', floor: '#f3e0c8', pattern: 1, items: [
        it('puddle-mat', 335, 566, 0), it('rain-shower', 758, 460, 1), it('clawfoot-tub', 366, 530, 3),
        it('mirror-vanity', 909, 528, 2), it('little-toilet', 56, 552, 4), it('bath-cubby', 610, 250, 5),
        it('towel-ladder', 606, 468, 6), it('mist-fern', 1340, 490, 7)] },
      // Empty on purpose. The backyard scene ships later; the room key has to exist so edits are not dropped.
      backyard: { wallpaper: '#c5ecff', floor: '#b6e3a8', pattern: 0, items: [] },
    },
    characters: [
      newCharacter({ id: 'c1', skin: '#f1c27d', hair: '#5b3a29', hairStyle: 2, shirt: '#ff7aa8', pants: '#5aa9e6', room: 'living', x: 330 + V1_OFFSET, y: 540 }),
    ],
    soundOn: true,
    dogKennel: null,
  };
}

export function newCharacter(p: Partial<Character> & { id: string }): Character {
  return { skin: '#f1c27d', hair: '#5b3a29', hairStyle: 0, shirt: '#ff7aa8', pants: '#5aa9e6', size: 'kid', acc: 0,
    room: 'living', x: ROOM_W / 2, y: 540, flip: false, held: { left: null, right: null }, ...p };
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const maxZ = (r: Room) => r.items.reduce((m, i) => Math.max(m, i.z), 0);
const minZ = (r: Room) => r.items.reduce((m, i) => Math.min(m, i.z), 0);

function mapChar(s: GameState, id: string, f: (c: Character) => Character): GameState {
  return { ...s, characters: s.characters.map(c => c.id === id ? f(c) : c) };
}

function mapItems(s: GameState, room: RoomId, f: (r: Room) => Room): GameState {
  const cur = s.rooms[room];
  if (!cur) return s;
  return { ...s, rooms: { ...s.rooms, [room]: f(cur) } };
}

/**
 * Copy starter rooms that a save does not have yet. Rooms already stored are left
 * byte-for-byte alone, including an emptied nursery or a backyard a kid has started.
 */
export function ensureRooms<T extends { rooms?: GameState['rooms'] | null }>(s: T): T {
  if (!s || !s.rooms) return s;
  const base = initialState().rooms;
  const rooms = s.rooms;
  let missing = false;
  for (const id of ROOM_IDS) {
    const cur = rooms[id] as Room | undefined;
    if (!cur || typeof cur !== 'object' || !Array.isArray(cur.items)) missing = true;
  }
  if (!missing) return s;
  const next = { ...rooms } as GameState['rooms'];
  for (const id of ROOM_IDS) {
    const cur = rooms[id] as Room | undefined;
    if (!cur || typeof cur !== 'object' || !Array.isArray(cur.items)) next[id] = base[id];
  }
  return { ...s, rooms: next };
}

/** Pure reducer: (state, action) -> new state. Safe to run on server too. */
export function reduce(s: GameState, a: Action): GameState {
  switch (a.type) {
    case 'room/switch': return s.rooms[a.room] ? { ...s, currentRoom: a.room } : s;
    case 'item/add': return mapItems(s, a.room, r => r.items.length >= 80 ? r :
      ({ ...r, items: [...r.items, { ...a.item, z: maxZ(r) + 1 }] }));
    case 'item/move': return mapItems(s, a.room, r => ({ ...r, items: r.items.map(i => i.id === a.id ? { ...i, x: clamp(a.x, 0, ROOM_W), y: clamp(a.y, 40, ROOM_H) } : i) }));
    case 'item/flip': return mapItems(s, a.room, r => ({ ...r, items: r.items.map(i => i.id === a.id ? { ...i, flip: !i.flip } : i) }));
    case 'item/front': return mapItems(s, a.room, r => ({ ...r, items: r.items.map(i => i.id === a.id ? { ...i, z: maxZ(r) + 1 } : i) }));
    case 'item/back': return mapItems(s, a.room, r => ({ ...r, items: r.items.map(i => i.id === a.id ? { ...i, z: minZ(r) - 1 } : i) }));
    case 'item/delete': {
      const gone = s.rooms[a.room]?.items.some(i => i.id === a.id && i.kind === 'kennel');
      const next = mapItems(s, a.room, r => ({ ...r, items: r.items.filter(i => i.id !== a.id) }));
      return gone && s.dogKennel?.item === a.id ? { ...next, dogKennel: null } : next;
    }
    case 'room/wallpaper': return mapItems(s, a.room, r => ({ ...r, wallpaper: a.color }));
    case 'room/floor': return mapItems(s, a.room, r => ({ ...r, floor: a.color }));
    case 'room/pattern': return mapItems(s, a.room, r => ({ ...r, pattern: a.pattern, wallTile: null }));
    case 'room/wallTile': return mapItems(s, a.room, r => ({ ...r, wallTile: a.tile }));
    case 'room/floorTile': return mapItems(s, a.room, r => ({ ...r, floorTile: a.tile }));
    case 'char/add': return s.characters.length >= MAX_CHARS || s.characters.some(c => c.id === a.char.id) ? s : { ...s, characters: [...s.characters, a.char] };
    case 'char/update': return mapChar(s, a.id, c => {
      const { look2, ...rest } = a.patch;
      const next: Character = { ...c, ...rest };
      if ('look2' in a.patch) { if (look2) next.look2 = look2; else delete next.look2; }
      return next;
    });
    case 'char/move': return s.rooms[a.room] ? mapChar(s, a.id, c => ({ ...c, room: a.room, x: clamp(a.x, 0, ROOM_W), y: clamp(a.y, 60, ROOM_H) })) : s;
    case 'char/delete': {
      const c = s.characters.find(c => c.id === a.id); if (!c) return s;
      // anything the character was holding is put down where they stood
      let next: GameState = { ...s, characters: s.characters.filter(x => x.id !== a.id) };
      (['left', 'right'] as Hand[]).forEach((h, i) => { const it = c.held[h]; if (it) next = mapItems(next, c.room, r => ({ ...r, items: [...r.items, { ...it, x: c.x + (i ? 40 : -40), y: c.y, z: maxZ(r) + 1 }] })); });
      return next;
    }
    case 'char/hold': {
      const c = s.characters.find(c => c.id === a.id); const it = s.rooms[a.room]?.items.find(i => i.id === a.itemId);
      if (!c || !it || c.held[a.hand] || c.room !== a.room) return s;
      const next = mapItems(s, a.room, r => ({ ...r, items: r.items.filter(i => i.id !== a.itemId) }));
      const held = mapChar(next, a.id, ch => ({ ...ch, held: { ...ch.held, [a.hand]: it } }));
      return it.kind === 'kennel' && s.dogKennel?.item === a.itemId ? { ...held, dogKennel: null } : held;
    }
    case 'char/release': {
      const c = s.characters.find(c => c.id === a.id); const it = c?.held[a.hand]; if (!c || !it) return s;
      const next = mapChar(s, a.id, ch => ({ ...ch, held: { ...ch.held, [a.hand]: null } }));
      return mapItems(next, c.room, r => ({ ...r, items: [...r.items, { ...it, x: clamp(a.x, 0, ROOM_W), y: clamp(a.y, 40, ROOM_H), z: maxZ(r) + 1 }] }));
    }
    case 'cat/set': return { ...s, cat: a.cat };
    case 'cat/move': return s.cat && s.rooms[a.room] ? { ...s, cat: { ...s.cat, room: a.room, x: clamp(a.x, 100, ROOM_W - 100) } } : s;
    case 'dog/set': return { ...s, dog: a.dog };
    case 'dog/kennel': {
      if (a.item === null) return s.dogKennel ? { ...s, dogKennel: null } : s;
      if (!kennelHere(s, a.item) || s.dogKennel?.item === a.item) return s;
      return { ...s, dogKennel: { item: a.item } };
    }
    case 'ranch/op': {
      const r = ranchApply(cleanPlots(s.garden), cleanBasket(s.basket), a.op, a.now, s.lastEgg ?? 0);
      if (typeof r === 'string') return s;
      let next: GameState = { ...s, garden: r.plots, basket: r.basket, lastEgg: a.op.op === 'egg' ? a.now : s.lastEgg };
      if (a.op.op === 'take' && next.rooms[a.op.room as RoomId]) { const op = a.op; next = mapItems(next, op.room as RoomId, rm => rm.items.length >= 80 ? rm : ({ ...rm, items: [...rm.items, { id: op.id, kind: BASKET_ITEM[op.kind], x: op.x, y: 560, flip: false, z: maxZ(rm) + 1, scale: 1 }] })); }
      return next;
    }
    case 'settings/sound': return { ...s, soundOn: a.on };
    case 'game/reset': return initialState();
  }
}

// ---- Store with auto-save. Later: swap `dispatch` to also send to a server. ----
const KEY = storeKey('cozy-house'), V1_KEY = storeKey('cozy-house-v1');

/** Upgrade any older save to the current schema. Pure; safe to run on a server too. */
export function migrate(raw: any): GameState {
  if (!raw || typeof raw !== 'object' || !raw.rooms) return initialState();
  let s = raw;
  if (s.version === 1) {
    const shift = (x: number) => (Number(x) || 0) + V1_OFFSET;
    const rooms: any = {};
    for (const [id, r] of Object.entries<any>(s.rooms)) rooms[id] = { ...r, items: (r.items ?? []).map((i: any) => ({ ...i, x: shift(i.x) })) };
    s = { ...s, version: 2, rooms, character: { ...s.character, x: shift(s.character?.x) } };
  }
  if (s.version === 2) {
    // single `character` -> `characters[]`
    const ch = s.character ?? {};
    s = { ...s, version: 3, characters: [newCharacter({ ...ch, id: 'c1', size: 'kid', acc: 0, held: { left: null, right: null } })] };
    delete s.character;
  }
  if (s.version !== 3) return initialState();
  // Rooms added after a save was made (salon, nursery, backyard) come from the starter layout.
  // Existing rooms win, so a kid's furniture is never replaced by the starter set.
  const base = initialState();
  const characters = (Array.isArray(s.characters) ? s.characters : []).slice(0, MAX_CHARS)
    .map((c: any, i: number) => {
      const rawLook = c?.look2;
      const ch = newCharacter({ ...c, id: String(c.id ?? 'c' + (i + 1)), held: { left: c.held?.left ?? null, right: c.held?.right ?? null } });
      delete ch.look2;
      if (rawLook != null) { const clean = sanitizeLook2(rawLook); if (clean) ch.look2 = clean; }
      return ch;
    });
  const next = ensureRooms({ ...base, ...s, rooms: { ...base.rooms, ...s.rooms }, characters });
  const dogKennel = validKennel(next);
  const withKennel = dogKennel === next.dogKennel ? next : { ...next, dogKennel };
  const mailbox = keepMailbox((withKennel as { mailbox?: unknown }).mailbox);
  let kept: GameState = withKennel;
  if (mailbox) kept = { ...kept, mailbox };
  else if (kept.mailbox) {
    const { mailbox: _drop, ...rest } = kept;
    kept = rest;
  }
  return showKnownRoom(kept);
}

/**
 * A future room (or the backyard, which has no scene yet) has no tab.
 * Open the living room instead, and bring a kid who was standing in that
 * unknown room with her so she is not invisible.
 */
function showKnownRoom(s: GameState): GameState {
  const current = s.currentRoom as string;
  const onTab = (TAB_ROOMS as readonly string[]).includes(current);
  const known = (room: string) => (ROOM_IDS as readonly string[]).includes(room);
  let moved = false;
  const characters = s.characters.map(c => {
    const room = c.room as string;
    if (!known(room) || (!onTab && room === current)) { moved = true; return { ...c, room: 'living' as RoomId }; }
    return c;
  });
  if (onTab && !moved) return s;
  return { ...s, currentRoom: onTab ? s.currentRoom : 'living', characters };
}
type Listener = (s: GameState, a: Action) => void;

export function createStore() {
  let state: GameState;
  try {
    const raw = localStorage.getItem(KEY) ?? localStorage.getItem(V1_KEY);
    state = raw ? migrate(JSON.parse(raw)) : initialState();
    if (!raw && typeof navigator !== 'undefined' && !navigator.webdriver) state = withRandomStarter(state);
  } catch { state = initialState(); }
  const listeners: Listener[] = [];
  let t: number | undefined;
  return {
    get: () => state,
    subscribe(l: Listener) { listeners.push(l); },
    dispatch(a: Action) {
      state = reduce(state, a);
      listeners.forEach(l => l(state, a));
      clearTimeout(t); t = window.setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} }, 250);
    },
  };
}
export type Store = ReturnType<typeof createStore>;
