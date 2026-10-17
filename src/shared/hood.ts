// Shared between client and server: protocol, presets, validation and the chat filter.
// Nothing here touches the DOM or Node APIs, so it runs in browsers, Node and Cloudflare Workers.
import { initialState, migrate, newCharacter, ROOM_W, ROOM_H, MAX_CHARS, type Action, type GameState, type PlacedItem, type RoomId, type Character } from './state';

export const MAX_PLAYERS = 12;
export const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no 0/O/1/I/L
export const CODE_LEN = 6;
export const STREET_SLOT_W = 520;
export const streetWidth = (n: number) => Math.max(2400, 400 + n * STREET_SLOT_W + 400);
export const slotX = (i: number) => 500 + i * STREET_SLOT_W;
export const NEAR_X = 460, NEAR_Y = 320;

// ---------- presets (kids pick from these; no real names) ----------
export const NICKNAMES = [
  'Sunny Bunny', 'Bubbly Panda', 'Sparkle Kitty', 'Happy Hippo', 'Cozy Koala', 'Jolly Jelly', 'Zippy Fox', 'Dreamy Deer',
  'Giggly Goose', 'Peachy Pup', 'Minty Mouse', 'Rainbow Duck', 'Cuddly Cub', 'Starry Owl', 'Bouncy Frog', 'Lucky Lamb',
  'Snuggly Seal', 'Twinkle Tiger', 'Berry Bear', 'Cloudy Llama', 'Pebble Penguin', 'Honey Hedgehog', 'Marshmallow Moose', 'Cupcake Cat',
];
export const PHRASES = [
  'Hi!', 'Come over!', 'I love your house!', "Let's play!", 'Follow me!', 'Look at this!', 'Want a snack?', 'Nice!',
  'Yes!', 'No thanks', 'Hehe', 'Be right back', 'Bye!', "Let's decorate!", 'Wanna race?', 'So cute!',
];
export const EMOTES = ['👋', '😀', '😂', '😍', '😮', '😢', '🎉', '⭐', '❤️', '👍', '🍕', '🐱', '🌈', '🎶', '💤', '✨'];
export const HOUSE_STYLES = 8;

// ---------- chat filter (client gives instant feedback; server enforces) ----------
export const MAX_CHAT = 60;
const LEET: Record<string, string> = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '@': 'a', '$': 's', '!': 'i', '+': 't' };
const BAD = ['fuck', 'fuk', 'fck', 'shit', 'sht', 'bitch', 'btch', 'bastard', 'asshole', 'ass', 'dick', 'cock', 'pussy', 'cunt', 'whore', 'slut',
  'damn', 'crap', 'piss', 'fag', 'faggot', 'retard', 'nigger', 'nigga', 'porn', 'sex', 'sexy', 'nude', 'naked', 'boob', 'boobs', 'penis', 'vagina',
  'kill', 'suicide', 'stupid', 'idiot', 'dumb', 'hate', 'loser', 'shutup', 'wtf', 'stfu', 'gtfo', 'bs'];
const NUM_WORDS = ['zero', 'oh', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const PERSONAL = [
  /\bmy\s+(real\s+)?(full\s+|last\s+|sur)?name\s+is\b/i, /\bi\s*live\s+(at|on|in)\b/i, /\bmy\s+(address|addy|phone|number|cell|email|e-mail|school|password|pass|insta|snap|tiktok|discord)\b/i,
  /\b(password|passcode|zip\s*code|postcode)\b/i, /\b(snapchat|instagram|tiktok|discord|whatsapp|kik|telegram|facebook|messenger|youtube\.com)\b/i,
];
const URL_RE = /(https?:|www\.|\b[a-z0-9-]+\s*(\.|\(dot\)|\sdot\s)\s*(com|net|org|io|co|me|ly|gg|tv|app|xyz|us|uk|ca|de|link|site|info)\b)/i;
const EMAIL_RE = /\S+\s*(@|\(at\)|\sat\s)\s*\S+\s*(\.|\sdot\s)\s*\w{2,}/i;
const HANDLE_RE = /@\w/;
const ADDRESS_RE = /\b\d{1,6}\s+([a-z]+\s+){0,3}(street|st|road|rd|avenue|ave|lane|ln|drive|dr|court|ct|blvd|boulevard|way|place|pl|circle|cir|terrace|parkway|pkwy|highway|hwy|apt|apartment|unit)\b/i;

export type FilterResult = { ok: true; text: string } | { ok: false; reason: 'empty' | 'long' | 'link' | 'contact' | 'personal' | 'words' };
export function filterChat(raw: unknown): FilterResult {
  if (typeof raw !== 'string') return { ok: false, reason: 'empty' };
  // strip control/zero-width chars, collapse whitespace
  const text = raw.normalize('NFKC').replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g, '').replace(/\s+/g, ' ').trim();
  if (!text) return { ok: false, reason: 'empty' };
  if (text.length > MAX_CHAT) return { ok: false, reason: 'long' };
  if (URL_RE.test(text)) return { ok: false, reason: 'link' };
  if (EMAIL_RE.test(text) || HANDLE_RE.test(text)) return { ok: false, reason: 'contact' };
  const digits = (text.match(/\d/g) ?? []).length;
  if (digits >= 5 || /\d[\d\s().\-]{4,}\d/.test(text) || ADDRESS_RE.test(text)) return { ok: false, reason: 'contact' };
  const words = text.toLowerCase().split(/[^a-z]+/).filter(Boolean);
  let run = 0; for (const w of words) { run = NUM_WORDS.includes(w) ? run + 1 : 0; if (run >= 4) return { ok: false, reason: 'contact' }; }
  if (PERSONAL.some(r => r.test(text))) return { ok: false, reason: 'personal' };
  const norm = text.toLowerCase().replace(/[0-9@$!+]/g, c => LEET[c] ?? c);
  const toks = norm.split(/[^a-z]+/).filter(Boolean);
  const squashed = norm.replace(/[^a-z]/g, '').replace(/(.)\1{2,}/g, '$1$1');
  if (toks.some(t => BAD.includes(t) || BAD.includes(t.replace(/(.)\1+/g, '$1'))) || BAD.filter(b => b.length >= 5).some(b => squashed.includes(b)))
    return { ok: false, reason: 'words' };
  return { ok: true, text };
}
export const FILTER_MSG: Record<string, string> = {
  long: 'That is a bit long!', link: 'No links, please!', contact: 'Keep numbers and contact info secret!', personal: 'Keep personal info secret!',
  words: "Let's use kind words!", empty: '',
};

// ---------- validation (server-authoritative; also used when importing a local house) ----------
const ROOMS: RoomId[] = ['living', 'bedroom', 'kitchen', 'salon'];
const isRoom = (r: unknown): r is RoomId => ROOMS.includes(r as RoomId);
const num = (v: unknown, lo: number, hi: number): number | null => (typeof v === 'number' && Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : null);
const str = (v: unknown, re: RegExp, max = 80): string | null => (typeof v === 'string' && v.length <= max && re.test(v) ? v : null);
const ID_RE = /^[A-Za-z0-9:_\/.-]{1,80}$/;
const COLOR_RE = /^#[0-9a-fA-F]{3,8}$/;
const KIND_RE = /^[A-Za-z0-9:_\/-]{1,100}$/;
const TILE_RE = /^[a-z0-9_-]{1,40}\/[a-z0-9_.-]{1,60}$/i;
const SIZES = ['little', 'kid', 'adult'] as const;

export function cleanItem(i: any): PlacedItem | null {
  if (!i || typeof i !== 'object') return null;
  const id = str(i.id, ID_RE), kind = str(i.kind, KIND_RE, 100);
  if (!id || !kind) return null;
  return { id, kind, x: num(i.x, 0, ROOM_W) ?? ROOM_W / 2, y: num(i.y, 0, ROOM_H) ?? 500, flip: i.flip === true, z: Math.round(num(i.z, -1e6, 1e6) ?? 0), scale: num(i.scale, 0.3, 3) ?? 1 };
}
export type Look = Pick<Character, 'skin' | 'hair' | 'hairStyle' | 'shirt' | 'pants' | 'size' | 'acc'>;
export function cleanLookPatch(p: any): Partial<Look & { flip: boolean }> | null {
  if (!p || typeof p !== 'object') return null;
  const out: any = {};
  for (const k of ['skin', 'hair', 'shirt', 'pants'] as const) if (k in p) { const c = str(p[k], COLOR_RE, 9); if (!c) return null; out[k] = c; }
  if ('hairStyle' in p) { const v = num(p.hairStyle, 0, 3); if (v === null) return null; out.hairStyle = Math.round(v); }
  if ('acc' in p) { const v = num(p.acc, 0, 3); if (v === null) return null; out.acc = Math.round(v); }
  if ('size' in p) { if (!SIZES.includes(p.size)) return null; out.size = p.size; }
  if ('flip' in p) { if (typeof p.flip !== 'boolean') return null; out.flip = p.flip; }
  return Object.keys(out).length ? out : null;
}
export function cleanLook(p: any): Look {
  const base = newCharacter({ id: 'x' });
  const c = cleanLookPatch({ skin: p?.skin, hair: p?.hair, hairStyle: p?.hairStyle, shirt: p?.shirt, pants: p?.pants, size: p?.size, acc: p?.acc }) ?? {};
  const pickOr = <K extends keyof Look>(k: K): Look[K] => ((c as any)[k] ?? base[k]);
  return { skin: pickOr('skin'), hair: pickOr('hair'), hairStyle: pickOr('hairStyle'), shirt: pickOr('shirt'), pants: pickOr('pants'), size: pickOr('size'), acc: pickOr('acc') };
}
function cleanCharacter(c: any): Character | null {
  const id = str(c?.id, ID_RE); if (!id || !isRoom(c?.room)) return null;
  return newCharacter({ ...cleanLook(c), id, room: c.room, x: num(c.x, 0, ROOM_W) ?? ROOM_W / 2, y: num(c.y, 60, ROOM_H) ?? 540, flip: c.flip === true,
    held: { left: c.held?.left ? cleanItem(c.held.left) : null, right: c.held?.right ? cleanItem(c.held.right) : null } });
}

/** Turn an untrusted action into a safe one, or null to reject. UI-only actions are never accepted over the network. */
export function cleanAction(a: any): Action | null {
  if (!a || typeof a !== 'object' || typeof a.type !== 'string') return null;
  const room = a.room;
  switch (a.type) {
    case 'item/add': { const item = cleanItem(a.item); return isRoom(room) && item ? { type: a.type, room, item } : null; }
    case 'item/move': { const id = str(a.id, ID_RE), x = num(a.x, 0, ROOM_W), y = num(a.y, 0, ROOM_H); return isRoom(room) && id && x !== null && y !== null ? { type: a.type, room, id, x, y } : null; }
    case 'item/flip': case 'item/front': case 'item/back': case 'item/delete': { const id = str(a.id, ID_RE); return isRoom(room) && id ? { type: a.type, room, id } : null; }
    case 'room/wallpaper': case 'room/floor': { const color = str(a.color, COLOR_RE, 9); return isRoom(room) && color ? { type: a.type, room, color } : null; }
    case 'room/pattern': { const p = num(a.pattern, 0, 3); return isRoom(room) && p !== null ? { type: a.type, room, pattern: Math.round(p) } : null; }
    case 'room/wallTile': case 'room/floorTile': { if (!isRoom(room)) return null; if (a.tile === null) return { type: a.type, room, tile: null }; const t = str(a.tile, TILE_RE, 101); return t ? { type: a.type, room, tile: t } : null; }
    case 'char/add': { const c = cleanCharacter(a.char); return c ? { type: a.type, char: { ...c, held: { left: null, right: null } } } : null; }
    case 'char/update': { const id = str(a.id, ID_RE), patch = cleanLookPatch(a.patch); return id && patch ? { type: a.type, id, patch } : null; }
    case 'char/move': { const id = str(a.id, ID_RE), x = num(a.x, 0, ROOM_W), y = num(a.y, 60, ROOM_H); return id && isRoom(room) && x !== null && y !== null ? { type: a.type, id, room, x, y } : null; }
    case 'char/delete': { const id = str(a.id, ID_RE); return id ? { type: a.type, id } : null; }
    case 'char/hold': { const id = str(a.id, ID_RE), itemId = str(a.itemId, ID_RE); return id && itemId && isRoom(room) && (a.hand === 'left' || a.hand === 'right') ? { type: a.type, id, hand: a.hand, room, itemId } : null; }
    case 'char/release': { const id = str(a.id, ID_RE), x = num(a.x, 0, ROOM_W), y = num(a.y, 0, ROOM_H); return id && x !== null && y !== null && (a.hand === 'left' || a.hand === 'right') ? { type: a.type, id, hand: a.hand, x, y } : null; }
    default: return null; // room/switch, settings/sound, game/reset are local-only
  }
}

/** Sanitize a whole house (e.g. a kid's local house brought into the neighborhood). */
export function cleanHouseState(raw: any): GameState {
  let s: GameState;
  try { s = migrate(raw); } catch { return initialState(); }
  const base = initialState();
  const rooms = {} as GameState['rooms'];
  for (const r of ROOMS) {
    const src: any = (s.rooms as any)?.[r] ?? base.rooms[r];
    rooms[r] = {
      wallpaper: str(src.wallpaper, COLOR_RE, 9) ?? base.rooms[r].wallpaper, floor: str(src.floor, COLOR_RE, 9) ?? base.rooms[r].floor,
      pattern: Math.round(num(src.pattern, 0, 3) ?? 0), wallTile: src.wallTile ? str(src.wallTile, TILE_RE, 101) : null, floorTile: src.floorTile ? str(src.floorTile, TILE_RE, 101) : null,
      items: (Array.isArray(src.items) ? src.items : []).slice(0, 80).map(cleanItem).filter(Boolean) as PlacedItem[],
    };
  }
  const characters = (Array.isArray(s.characters) ? s.characters : []).slice(0, MAX_CHARS).map(cleanCharacter).filter(Boolean) as Character[];
  return { ...base, rooms, characters, currentRoom: 'living', soundOn: true };
}

// ---------- presence ----------
export interface Presence { where: 'street' | 'house'; houseId?: string; room?: RoomId; x: number; y: number; flip: boolean }
export function cleanPresence(p: any, houseExists: (id: string) => boolean): Presence | null {
  if (!p || (p.where !== 'street' && p.where !== 'house')) return null;
  const x = num(p.x, 0, 20000), y = num(p.y, 0, ROOM_H); if (x === null || y === null) return null;
  if (p.where === 'street') return { where: 'street', x, y, flip: p.flip === true };
  const houseId = str(p.houseId, ID_RE); if (!houseId || !houseExists(houseId) || !isRoom(p.room)) return null;
  return { where: 'house', houseId, room: p.room, x: Math.min(x, ROOM_W), y, flip: p.flip === true };
}
export const sameSpot = (a: Presence, b: Presence) => a.where === b.where && (a.where === 'street' || (a.houseId === b.houseId && a.room === b.room));
export const isNear = (a: Presence, b: Presence) => sameSpot(a, b) && Math.abs(a.x - b.x) <= NEAR_X && Math.abs(a.y - b.y) <= NEAR_Y;

// ---------- protocol ----------
export interface PlayerPub { pid: string; nickname: string; houseId: string; look: Look; online: boolean }
export interface HouseMeta { id: string; ownerId: string; name: string; locked: boolean; style: number; slot: number }
export interface HouseFull extends HouseMeta { state: GameState }
export type Bubble = { kind: 'phrase' | 'emote'; v: number } | { kind: 'text'; v: string };

export type ClientMsg =
  | { t: 'hello'; token: string }
  | { t: 'join'; nickname: string; look: Look; house?: unknown }
  | { t: 'act'; houseId: string; cid: number; action: Action }
  | { t: 'pres'; p: Presence }
  | { t: 'look'; look: Look }
  | { t: 'lock'; houseId: string; locked: boolean }
  | { t: 'say'; b: Bubble }
  | { t: 'parent'; key: string; op: 'info' } | { t: 'parent'; key: string; op: 'rename'; houseId: string; name: string }
  | { t: 'parent'; key: string; op: 'remove'; pid: string } | { t: 'parent'; key: string; op: 'freeChat'; on: boolean };

export type ServerMsg =
  | { t: 'joined'; token: string; pid: string }
  | { t: 'welcome'; pid: string; settings: { freeChat: boolean }; players: PlayerPub[]; houses: HouseFull[]; presence: Record<string, Presence> }
  | { t: 'act'; houseId: string; by: string; cid: number; action: Action }
  | { t: 'nack'; houseId: string; cid: number; reason: string; state?: GameState }
  | { t: 'pres'; pid: string; p: Presence | null }
  | { t: 'players'; players: PlayerPub[] }
  | { t: 'house'; house: HouseFull } | { t: 'houseMeta'; meta: HouseMeta } | { t: 'houseGone'; houseId: string }
  | { t: 'settings'; settings: { freeChat: boolean } }
  | { t: 'bubble'; pid: string; b: Bubble }
  | { t: 'sayFail'; reason: string }
  | { t: 'parentInfo'; code: string; settings: { freeChat: boolean }; players: PlayerPub[]; houses: HouseMeta[] }
  | { t: 'error'; code: 'nohood' | 'badtoken' | 'nickname' | 'full' | 'badkey' | 'bad'; msg?: string }
  | { t: 'removed' };

export function cleanHouseName(raw: unknown): string | null {
  const f = filterChat(raw); if (!f.ok || f.text.length > 24) return null; return f.text;
}
