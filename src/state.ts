// All game state is plain serializable JSON. All changes go through `Action`s
// so a future multiplayer server can validate/relay the same actions.
export type RoomId = 'living' | 'bedroom' | 'kitchen';
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

export interface Room { wallpaper: string; floor: string; pattern: number; items: PlacedItem[]; }

export interface Character {
  skin: string; hair: string; hairStyle: number; shirt: string; pants: string;
  room: RoomId; x: number; y: number; flip: boolean;
}

export interface GameState {
  version: 2;
  houseId: string;           // future: one house per invited player
  currentRoom: RoomId;
  rooms: Record<RoomId, Room>;
  character: Character;
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
  | { type: 'char/update'; patch: Partial<Omit<Character, 'room' | 'x' | 'y'>> }
  | { type: 'char/move'; room: RoomId; x: number; y: number }
  | { type: 'settings/sound'; on: boolean }
  | { type: 'game/reset' };

const it = (kind: string, x: number, y: number, z: number, scale = 1): PlacedItem =>
  ({ id: kind + '-' + z, kind, x: x + V1_OFFSET, y, flip: false, z, scale });

export function initialState(): GameState {
  return {
    version: 2,
    houseId: 'local',
    currentRoom: 'living',
    rooms: {
      living: { wallpaper: '#ffd6e0', floor: '#e8b98a', pattern: 1, items: [
        it('sofa', 470, 470, 1), it('lamp', 230, 470, 2), it('plant', 760, 480, 3), it('rug', 480, 530, 0), it('picture', 470, 200, 4), it('cat', 600, 520, 5),
        it('window', -350, 230, 6), it('armchair', -300, 480, 7), it('bookshelf', 1250, 470, 8), it('tree', 1500, 480, 9), it('clock', 1100, 170, 10)] },
      bedroom: { wallpaper: '#d9ccff', floor: '#f2d0a4', pattern: 2, items: [
        it('bed', 450, 480, 1), it('window', 750, 230, 2), it('teddy', 330, 500, 3), it('stars', 300, 180, 4), it('tub', 1350, 480, 5), it('lamp', -250, 470, 6), it('flowers', -150, 500, 7)] },
      kitchen: { wallpaper: '#cdf3dc', floor: '#ffe7a8', pattern: 3, items: [
        it('fridge', 200, 470, 1), it('table', 520, 500, 2), it('cake', 520, 395, 3), it('stove', 800, 470, 4), it('chair', 380, 500, 5), it('chair', 660, 500, 6), it('juice', 470, 395, 7), it('plant', -300, 480, 8), it('fish', 1300, 480, 9)] },
    },
    character: { skin: '#f1c27d', hair: '#5b3a29', hairStyle: 0, shirt: '#ff7aa8', pants: '#5aa9e6', room: 'living', x: 330 + V1_OFFSET, y: 540, flip: false },
    soundOn: true,
  };
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const maxZ = (r: Room) => r.items.reduce((m, i) => Math.max(m, i.z), 0);
const minZ = (r: Room) => r.items.reduce((m, i) => Math.min(m, i.z), 0);

function mapItems(s: GameState, room: RoomId, f: (r: Room) => Room): GameState {
  return { ...s, rooms: { ...s.rooms, [room]: f(s.rooms[room]) } };
}

/** Pure reducer: (state, action) -> new state. Safe to run on server too. */
export function reduce(s: GameState, a: Action): GameState {
  switch (a.type) {
    case 'room/switch': return { ...s, currentRoom: a.room };
    case 'item/add': return mapItems(s, a.room, r => r.items.length >= 80 ? r :
      ({ ...r, items: [...r.items, { ...a.item, z: maxZ(r) + 1 }] }));
    case 'item/move': return mapItems(s, a.room, r => ({ ...r, items: r.items.map(i => i.id === a.id ? { ...i, x: clamp(a.x, 0, ROOM_W), y: clamp(a.y, 40, ROOM_H) } : i) }));
    case 'item/flip': return mapItems(s, a.room, r => ({ ...r, items: r.items.map(i => i.id === a.id ? { ...i, flip: !i.flip } : i) }));
    case 'item/front': return mapItems(s, a.room, r => ({ ...r, items: r.items.map(i => i.id === a.id ? { ...i, z: maxZ(r) + 1 } : i) }));
    case 'item/back': return mapItems(s, a.room, r => ({ ...r, items: r.items.map(i => i.id === a.id ? { ...i, z: minZ(r) - 1 } : i) }));
    case 'item/delete': return mapItems(s, a.room, r => ({ ...r, items: r.items.filter(i => i.id !== a.id) }));
    case 'room/wallpaper': return mapItems(s, a.room, r => ({ ...r, wallpaper: a.color }));
    case 'room/floor': return mapItems(s, a.room, r => ({ ...r, floor: a.color }));
    case 'room/pattern': return mapItems(s, a.room, r => ({ ...r, pattern: a.pattern }));
    case 'char/update': return { ...s, character: { ...s.character, ...a.patch } };
    case 'char/move': return { ...s, character: { ...s.character, room: a.room, x: clamp(a.x, 0, ROOM_W), y: clamp(a.y, 60, ROOM_H) } };
    case 'settings/sound': return { ...s, soundOn: a.on };
    case 'game/reset': return initialState();
  }
}

// ---- Store with auto-save. Later: swap `dispatch` to also send to a server. ----
const KEY = 'cozy-house', V1_KEY = 'cozy-house-v1';

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
  if (s.version !== 2) return initialState();
  const base = initialState();
  return { ...base, ...s, rooms: { ...base.rooms, ...s.rooms }, character: { ...base.character, ...s.character } };
}
type Listener = (s: GameState, a: Action) => void;

export function createStore() {
  let state: GameState;
  try {
    const raw = localStorage.getItem(KEY) ?? localStorage.getItem(V1_KEY);
    state = raw ? migrate(JSON.parse(raw)) : initialState();
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
