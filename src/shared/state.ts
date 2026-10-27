import { isPowerable } from './ambient';
import { storeKey } from './storekey';
import { sanitizeLook2, withRandomStarter, type Look2 } from './avatar';
// All game state is plain serializable JSON. All changes go through `Action`s
// so a future multiplayer server can validate/relay the same actions.
import { ranchApply, cleanPlots, cleanBasket, BASKET_ITEM, type Basket, type Plot, type RanchOp } from './ranch';
import { keepMailbox, type Mailbox } from './mail';
import { STAND_Y, cleanDollSeat, pieceWidth, seatStillThere, standBeside, type DollSeat } from './sit';
import { babyAfterFurniture, careBaby, cleanBaby, easeBaby, holdBaby, meetBaby, packBaby, placeBaby, type Baby } from './baby';
export type RoomId = 'living' | 'bedroom' | 'kitchen' | 'salon' | 'nursery' | 'bathroom' | 'backyard';
/** Display order is the client's tab list. The backyard is a room, not a tab. */
export const ROOM_IDS: RoomId[] = ['living', 'bedroom', 'kitchen', 'salon', 'nursery', 'bathroom', 'backyard'];
/** Rooms with a tab. The yard is reached through the living-room door, not this list. */
export const TAB_ROOMS: readonly RoomId[] = ['living', 'bedroom', 'kitchen', 'salon', 'nursery', 'bathroom'];
/** Rooms that have a scene. Anything else opens the living room. */
export const SCENE_ROOMS: readonly RoomId[] = ['living', 'bedroom', 'kitchen', 'salon', 'nursery', 'bathroom', 'backyard'];
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
  /** Decorate-mode size. Omitted at 1 so an old save stays byte-for-byte the same. */
  size?: number;
  /** Play-mode power (stereo, TV, fire, music box). Omitted when off so an old save stays identical. */
  on?: true;
  /** Art Studio: id of her own painting, kept beside the house (not inline). Only on a 'picture', so an old client draws the plain picture frame. */
  art?: string;
  /** Art Studio frame style (0 wood, 1 plum, 2 gold, 3 rainbow). Omitted when 0. */
  frame?: number;
}

/** Kid steps from smaller to bigger. Missing, or anything that snaps to 1, is the old size. */
export const ITEM_SIZE_STEPS = [0.75, 0.875, 1, 1.25, 1.5] as const;
export type ItemSizeStep = (typeof ITEM_SIZE_STEPS)[number];

/** Nearest step. A missing or junk value is 1, which is what an old save draws. */
export function itemSizeOf(raw: unknown): ItemSizeStep {
  if (typeof raw !== 'number' || !Number.isFinite(raw)) return 1;
  let best: ItemSizeStep = 1;
  let dist = Infinity;
  for (const step of ITEM_SIZE_STEPS) {
    const d = Math.abs(raw - step);
    if (d < dist) { dist = d; best = step; }
  }
  return best;
}

/** scale × size. An item with no size field draws at its old scale. */
export function drawnScale(it: { scale?: number; size?: number } | null | undefined): number {
  return ((it?.scale || 1) * itemSizeOf(it?.size));
}

/** Write size only when it is not 1, so old JSON without the field stays identical. */
export function applyItemSize(item: PlacedItem, raw: number): PlacedItem {
  const size = itemSizeOf(raw);
  if (size === 1) {
    if (item.size == null) return item;
    const { size: _drop, ...rest } = item;
    return rest;
  }
  if (item.size === size) return item;
  return { ...item, size };
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
  /** Omitted when she is standing, so a standing kid matches an old save. */
  seat?: DollSeat;
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
  /** Nursery baby. Absent until someone meets her, so an older save stays identical. */
  baby?: Baby;
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
  | { type: 'item/move'; room: RoomId; id: string; x: number; y: number; stand?: true }
  | { type: 'item/flip'; room: RoomId; id: string }
  | { type: 'item/size'; room: RoomId; id: string; size: number }
  | { type: 'item/front'; room: RoomId; id: string }
  | { type: 'item/back'; room: RoomId; id: string }
  | { type: 'item/delete'; room: RoomId; id: string }
  | { type: 'item/power'; room: RoomId; id: string; on: boolean }
  | { type: 'room/wallpaper'; room: RoomId; color: string }
  | { type: 'room/floor'; room: RoomId; color: string }
  | { type: 'room/pattern'; room: RoomId; pattern: number }
  | { type: 'room/wallTile'; room: RoomId; tile: string | null }
  | { type: 'room/floorTile'; room: RoomId; tile: string | null }
  | { type: 'char/add'; char: Character }
  | { type: 'char/update'; id: string; patch: Partial<Pick<Character, 'skin' | 'hair' | 'hairStyle' | 'shirt' | 'pants' | 'size' | 'acc' | 'flip'>> & { look2?: Look2 | null } }
  | { type: 'char/move'; id: string; room: RoomId; x: number; y: number; seat?: DollSeat | null }
  | { type: 'char/delete'; id: string }
  | { type: 'char/hold'; id: string; hand: Hand; room: RoomId; itemId: string }
  | { type: 'char/release'; id: string; hand: Hand; x: number; y: number }
  | { type: 'cat/set'; cat: Cat | null }
  | { type: 'cat/move'; room: RoomId; x: number }
  | { type: 'dog/set'; dog: Dog | null }
  | { type: 'dog/kennel'; item: string | null }
  | { type: 'settings/sound'; on: boolean }
  | { type: 'game/reset' }
  | { type: 'ranch/op'; op: RanchOp; now: number }
  | { type: 'baby/meet'; now: number }
  | { type: 'baby/name'; name: string }
  | { type: 'baby/care'; care: 'feed' | 'burp' | 'change' | 'rock'; now: number }
  | { type: 'baby/hold'; holder: string | null; room: RoomId; x: number; y: number; now: number }
  | { type: 'baby/place'; room: RoomId; x: number; y: number; spot: 'crib' | 'bassinet' | 'mat'; bed: string | null; seat: DollSeat | null; now: number }
  | { type: 'baby/ease'; now: number };

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
      // A brand-new yard gets a bench and flowers. A stored yard, even with items: [], is never refilled.
      // Same shape as the Nursery: old saves gain these pieces, version stays 3.
      bathroom: { wallpaper: '#d4f4fb', floor: '#f7e7d4', pattern: 3, items: [
        it('bath-mat', 180, 560, 0), it('shower-curtain', -40, 520, 1), it('soaking-tub', 160, 500, 2), it('rubber-ducky', 300, 545, 3),
        it('bath-toilet', 480, 500, 4), it('sink-vanity', 700, 500, 5), it('bath-mirror', 700, 175, 6), it('towel-bar', 940, 200, 7)] },
      backyard: { wallpaper: '#c5ecff', floor: '#b6e3a8', pattern: 0, items: [
        { id: 'yard-bench-1', kind: 'yard-bench', x: 1122, y: 372, flip: false, z: 1, scale: 1 },
        { id: 'tulip-bed-2', kind: 'tulip-bed', x: 946, y: 580, flip: false, z: 2, scale: 1 },
      ] },
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

/**
 * Solo play: dragging the doll onto another room tab moves her and leaves the baby
 * in the old room with no arms. She stands on the mat where that doll was.
 * A neighborhood holder is a player id, so a doll walking does not drop her.
 */
function releaseBabyIfDollLeft(s: GameState, prev: Character | undefined, room: RoomId): GameState {
  const b = s.baby;
  if (!prev || !b || b.spot !== 'arms' || b.holder !== prev.id || room === b.room) return s;
  const x = prev.room === b.room ? prev.x : b.x;
  const y = prev.room === b.room ? prev.y : STAND_Y;
  const down = holdBaby(b, null, b.room, x, y);
  if (!down || down === b) return s;
  return { ...s, baby: down };
}

/** Drop `seat` so a standing kid's JSON matches an old save. */
export function standChar(c: Character): Character {
  if (!c.seat) return c;
  const { seat: _drop, ...rest } = c;
  return rest;
}

/** The piece a seat was just cleared from, so the local player can stand beside it too. */
export interface ClearedPiece { id: string; x: number; kind: string; scale: number }
let clearedFurniture: ClearedPiece | null = null;
export function takeClearedFurniture(): ClearedPiece | null {
  const v = clearedFurniture;
  clearedFurniture = null;
  return v;
}

/** A seat on this piece stands her. Deleting or holding her crib does too. Moving the crib does not. */
function settleBaby(s: GameState, id: string, evictBed: boolean, item: { x: number; kind: string; scale?: number; size?: number } | null): GameState {
  if (!s.baby) return s;
  const beside = item ? standBeside(item.x, pieceWidth(item.kind) * drawnScale(item), s.baby.x) : null;
  const next = babyAfterFurniture(s.baby, id, evictBed, beside);
  if (next === s.baby) return s;
  return { ...s, baby: next };
}

/** She is not carried. She stands on the floor beside where the piece was. */
function clearSeatsOn(s: GameState, itemId: string, item: { x: number; kind: string; scale: number } | null): GameState {
  if (item) clearedFurniture = { id: itemId, x: item.x, kind: item.kind, scale: drawnScale(item) };
  let changed = false;
  const characters = s.characters.map(c => {
    if (c.seat?.item !== itemId) return c;
    changed = true;
    if (!item) return standChar(c);
    const spot = standBeside(item.x, pieceWidth(item.kind) * drawnScale(item), c.x);
    const { seat: _drop, ...rest } = c;
    return { ...rest, x: spot.x, y: spot.y };
  });
  return changed ? { ...s, characters } : s;
}

function withSeat(c: Character, roomItems: { id?: string }[] | null | undefined, seat: DollSeat | null | undefined, touched: boolean): Character {
  if (!touched) {
    const kept = seatStillThere(c.seat, roomItems);
    if (kept) return c.seat === kept ? c : { ...c, seat: kept };
    return standChar(c);
  }
  const kept = seatStillThere(seat, roomItems);
  if (!kept) return standChar(c);
  return { ...c, seat: kept };
}

function mapItems(s: GameState, room: RoomId, f: (r: Room) => Room): GameState {
  const cur = s.rooms[room];
  if (!cur) return s;
  const next = f(cur);
  if (next === cur) return s;
  return { ...s, rooms: { ...s.rooms, [room]: next } };
}

/** A later copy keeps its art and position, and takes a new id. The first copy keeps the id
 *  so a kennel or mailbox reference still finds it. Ids stay inside the action id pattern. */
function dedupeItems(items: PlacedItem[]): PlacedItem[] {
  const used = new Set<string>();
  let changed = false;
  const next = items.map(it => {
    if (!used.has(it.id)) { used.add(it.id); return it; }
    changed = true;
    const stem = String(it.id).replace(/-d\d+$/, '').replace(/[^A-Za-z0-9:_/.-]/g, '').slice(0, 72) || 'item';
    let n = 2;
    let id = (stem + '-d' + n).slice(0, 80);
    while (used.has(id)) { n += 1; id = (stem + '-d' + n).slice(0, 80); }
    used.add(id);
    return { ...it, id };
  });
  return changed ? next : items;
}

function dedupeHouse<T extends { rooms: GameState['rooms'] }>(s: T): T {
  let changed = false;
  const rooms = { ...s.rooms };
  for (const id of ROOM_IDS) {
    const room = s.rooms[id];
    if (!room || !Array.isArray(room.items)) continue;
    const items = dedupeItems(room.items);
    if (items !== room.items) { rooms[id] = { ...room, items }; changed = true; }
  }
  return changed ? { ...s, rooms } : s;
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
  const filled: T = missing ? (() => {
    const next = { ...rooms } as GameState['rooms'];
    for (const id of ROOM_IDS) {
      const cur = rooms[id] as Room | undefined;
      if (!cur || typeof cur !== 'object' || !Array.isArray(cur.items)) next[id] = base[id];
    }
    return { ...s, rooms: next } as T;
  })() : s;
  return dedupeHouse(filled as T & { rooms: GameState['rooms'] });
}

/** Pure reducer: (state, action) -> new state. Safe to run on server too. */
export function reduce(s: GameState, a: Action): GameState {
  clearedFurniture = null;
  switch (a.type) {
    case 'room/switch': return s.rooms[a.room] ? { ...s, currentRoom: a.room } : s;
    case 'item/add': return mapItems(s, a.room, r =>
      (r.items.length >= 80 || r.items.some(i => i.id === a.item.id)) ? r :
      ({ ...r, items: [...r.items, { ...a.item, z: maxZ(r) + 1 }] }));
    case 'item/move': {
      const prev = s.rooms[a.room]?.items.find(i => i.id === a.id) ?? null;
      const moved = mapItems(s, a.room, r => ({ ...r, items: r.items.map(i => i.id === a.id ? { ...i, x: clamp(a.x, 0, ROOM_W), y: clamp(a.y, 40, ROOM_H) } : i) }));
      return a.stand ? settleBaby(clearSeatsOn(moved, a.id, prev), a.id, false, prev) : moved;
    }
    case 'item/flip': {
      const prev = s.rooms[a.room]?.items.find(i => i.id === a.id) ?? null;
      return settleBaby(clearSeatsOn(mapItems(s, a.room, r => ({ ...r, items: r.items.map(i => i.id === a.id ? { ...i, flip: !i.flip } : i) })), a.id, prev), a.id, false, prev);
    }
    case 'item/size': {
      // Size only. A kid already in the seat stays there; the seat is a fraction of the piece, so it draws at the new scale.
      const prev = s.rooms[a.room]?.items.find(i => i.id === a.id) ?? null;
      if (!prev || itemSizeOf(prev.size) === itemSizeOf(a.size)) return s;
      return mapItems(s, a.room, r => ({ ...r, items: r.items.map(i => i.id === a.id ? applyItemSize(i, a.size) : i) }));
    }
    case 'item/power': {
      // Explicit target state, so two taps at once settle the same way (idempotent, last write wins).
      const prev = s.rooms[a.room]?.items.find(i => i.id === a.id) ?? null;
      if (!prev || !isPowerable(prev.kind) || !!prev.on === !!a.on) return s;
      return mapItems(s, a.room, r => ({ ...r, items: r.items.map(i => {
        if (i.id !== a.id) return i;
        if (a.on) return { ...i, on: true as const };
        const { on: _off, ...rest } = i; return rest;
      }) }));
    }
    case 'item/front': return mapItems(s, a.room, r => ({ ...r, items: r.items.map(i => i.id === a.id ? { ...i, z: maxZ(r) + 1 } : i) }));
    case 'item/back': return mapItems(s, a.room, r => ({ ...r, items: r.items.map(i => i.id === a.id ? { ...i, z: minZ(r) - 1 } : i) }));
    case 'item/delete': {
      const prev = s.rooms[a.room]?.items.find(i => i.id === a.id) ?? null;
      const gone = prev?.kind === 'kennel';
      const cleared = clearSeatsOn(mapItems(s, a.room, r => ({ ...r, items: r.items.filter(i => i.id !== a.id) })), a.id, prev);
      const next = gone && s.dogKennel?.item === a.id ? { ...cleared, dogKennel: null } : cleared;
      return settleBaby(next, a.id, true, prev);
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
    case 'char/move': {
      if (!s.rooms[a.room]) return s;
      const prev = s.characters.find(c => c.id === a.id);
      const moved = mapChar(s, a.id, c => {
        const next: Character = { ...c, room: a.room, x: clamp(a.x, 0, ROOM_W), y: clamp(a.y, 60, ROOM_H) };
        // An old char/move has no seat field and only copies x and y.
        return withSeat(next, s.rooms[a.room].items, a.seat, 'seat' in a);
      });
      return releaseBabyIfDollLeft(moved, prev, a.room);
    }
    case 'char/delete': {
      const c = s.characters.find(c => c.id === a.id); if (!c) return s;
      // anything the character was holding is put down where they stood
      let next: GameState = { ...s, characters: s.characters.filter(x => x.id !== a.id) };
      (['left', 'right'] as Hand[]).forEach((h, i) => { const it = c.held[h]; if (it) next = mapItems(next, c.room, r => ({ ...r, items: [...r.items, { ...it, x: c.x + (i ? 40 : -40), y: c.y, z: maxZ(r) + 1 }] })); });
      if (next.baby?.spot === 'arms' && next.baby.holder === a.id) {
        const down = holdBaby(next.baby, null, next.baby.room, next.baby.x, next.baby.y);
        if (down && down !== next.baby) next = { ...next, baby: down };
      }
      return next;
    }
    case 'char/hold': {
      const c = s.characters.find(c => c.id === a.id); const it = s.rooms[a.room]?.items.find(i => i.id === a.itemId);
      if (!c || !it || c.held[a.hand] || c.room !== a.room) return s;
      const next = clearSeatsOn(mapItems(s, a.room, r => ({ ...r, items: r.items.filter(i => i.id !== a.itemId) })), a.itemId, it);
      const held = mapChar(next, a.id, ch => ({ ...ch, held: { ...ch.held, [a.hand]: it } }));
      const kennel = it.kind === 'kennel' && s.dogKennel?.item === a.itemId ? { ...held, dogKennel: null } : held;
      return settleBaby(kennel, a.itemId, true, it);
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
      const op = a.op;
      if (op.op === 'take') {
        const room = s.rooms[op.room as RoomId];
        if (room && room.items.some(i => i.id === op.id)) return s;
      }
      const r = ranchApply(cleanPlots(s.garden), cleanBasket(s.basket), a.op, a.now, s.lastEgg ?? 0);
      if (typeof r === 'string') return s;
      let next: GameState = { ...s, garden: r.plots, basket: r.basket, lastEgg: a.op.op === 'egg' ? a.now : s.lastEgg };
      if (a.op.op === 'take' && next.rooms[a.op.room as RoomId]) { const op = a.op; next = mapItems(next, op.room as RoomId, rm => rm.items.length >= 80 ? rm : ({ ...rm, items: [...rm.items, { id: op.id, kind: BASKET_ITEM[op.kind], x: op.x, y: 560, flip: false, z: maxZ(rm) + 1, scale: 1 }] })); }
      return next;
    }
    case 'settings/sound': return { ...s, soundOn: a.on };
    case 'game/reset': return initialState();
    case 'baby/meet': return s.baby ? s : { ...s, baby: meetBaby(s.rooms, a.now) };
    case 'baby/name': {
      if (!s.baby || !a.name || a.name === s.baby.name) return s;
      return { ...s, baby: packBaby({ ...s.baby, name: a.name }) };
    }
    case 'baby/care': {
      if (!s.baby) return s;
      const next = careBaby(s.baby, a.care, a.now);
      return next === s.baby ? s : { ...s, baby: next };
    }
    case 'baby/hold': {
      if (!s.baby) return s;
      const next = holdBaby(s.baby, a.holder, a.room, a.x, a.y);
      if (!next || next === s.baby) return s;
      return { ...s, baby: next };
    }
    case 'baby/place': {
      if (!s.baby || !s.rooms[a.room]) return s;
      const occupied = s.characters.filter(c => c.room === a.room && c.seat).map(c => ({ item: c.seat!.item, n: c.seat!.n }));
      const next = placeBaby(s.baby, a, s.rooms[a.room].items, occupied);
      if (next === s.baby) return s;
      return { ...s, baby: next };
    }
    case 'baby/ease': {
      if (!s.baby) return s;
      const next = easeBaby(s.baby, a.now);
      if (!next) return s;
      return { ...s, baby: next };
    }
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
  // Rooms added after a save was made (salon, nursery, bathroom, backyard) come from the starter layout.
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
  const seated = keepSeats(next);
  const dogKennel = validKennel(seated);
  const withKennel = dogKennel === next.dogKennel ? next : { ...next, dogKennel };
  const mailbox = keepMailbox((withKennel as { mailbox?: unknown }).mailbox);
  let kept: GameState = seated === next ? withKennel : { ...withKennel, characters: seated.characters };
  if (mailbox) kept = { ...kept, mailbox };
  else if (kept.mailbox) {
    const { mailbox: _drop, ...rest } = kept;
    kept = rest;
  }
  const cleanedBaby = cleanBaby((kept as { baby?: unknown }).baby, kept.rooms);
  if (cleanedBaby) kept = { ...kept, baby: cleanedBaby };
  else if ('baby' in kept) {
    const { baby: _drop, ...rest } = kept;
    kept = rest;
  }
  return keepSeats(showKnownRoom(kept));
}

/** A seat stays only while its item is still in that doll's room. */
function keepSeats(s: GameState): GameState {
  let changed = false;
  const characters = s.characters.map(c => {
    const kept = seatStillThere(cleanDollSeat(c.seat), s.rooms[c.room]?.items);
    if (kept) return c.seat?.item === kept.item && c.seat.pose === kept.pose && c.seat.n === kept.n ? c : { ...c, seat: kept };
    if (!c.seat) return c;
    changed = true;
    return standChar(c);
  });
  if (!changed && characters.every((c, i) => c === s.characters[i])) return s;
  return { ...s, characters };
}

/**
 * A room with no scene opens the living room. A kid standing in that unknown
 * room comes too, so she is not invisible. The backyard has a scene and no tab.
 */
function showKnownRoom(s: GameState): GameState {
  const current = s.currentRoom as string;
  const scene = (SCENE_ROOMS as readonly string[]).includes(current);
  const known = (room: string) => (ROOM_IDS as readonly string[]).includes(room);
  let moved = false;
  const characters = s.characters.map(c => {
    const room = c.room as string;
    if (!known(room) || (!scene && room === current)) { moved = true; return { ...c, room: 'living' as RoomId }; }
    return c;
  });
  if (scene && !moved) return s;
  return { ...s, currentRoom: scene ? s.currentRoom : 'living', characters };
}
type Listener = (s: GameState, a: Action) => void;

export function createStore() {
  let state: GameState;
  let born = false;
  try {
    const raw = localStorage.getItem(KEY) ?? localStorage.getItem(V1_KEY);
    if (raw) state = migrate(JSON.parse(raw));
    else {
      born = true;
      state = initialState();
      if (typeof navigator !== 'undefined' && !navigator.webdriver) state = withRandomStarter(state);
    }
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
    born,
  };
}
export type Store = ReturnType<typeof createStore>;
