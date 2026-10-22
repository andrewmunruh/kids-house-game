// The nursery baby. Save version stays 3. She is not a character slot.
// Omitted until the house has one, so an older save stays byte-for-byte the same.
// Mood is 2 Cozy, 3 or 4 Happy. It never stores upset, and care never lowers it.
import { cleanDollSeat, resolveDrop, seatFractions, STAND_Y, type DollSeat, type SeatPiece } from './sit';

export type BabyCare = 'feed' | 'burp' | 'change' | 'rock';
export type BabySpot = 'crib' | 'bassinet' | 'arms' | 'mat';
export type BabyRoom = 'living' | 'bedroom' | 'kitchen' | 'salon' | 'nursery' | 'bathroom' | 'backyard';

export interface Baby {
  name: string;
  mood: 2 | 3 | 4;
  spot: BabySpot;
  bed?: string;
  seat?: DollSeat;
  holder?: string;
  x: number;
  y: number;
  room: BabyRoom;
  at?: Partial<Record<BabyCare, number>>;
  since: number;
}

/** One ease step. Care resets this wait. */
export const EASE_MS = 45000;

const ROOMS: BabyRoom[] = ['living', 'bedroom', 'kitchen', 'salon', 'nursery', 'bathroom', 'backyard'];
const ID_RE = /^[A-Za-z0-9:_\/.-]{1,80}$/;
const NAME_RE = /^[\p{L}\p{N}][\p{L}\p{N}' -]{0,13}$/u;
const CARES: BabyCare[] = ['feed', 'burp', 'change', 'rock'];

/** Crib or bassinet. A crib mobile is not a bed. */
export function babyBedKind(kind: string): 'crib' | 'bassinet' | null {
  const k = String(kind || '').toLowerCase();
  if (!k || /mobile/.test(k)) return null;
  if (/bassinet/.test(k)) return 'bassinet';
  if (k === 'crib' || /(^|[-_:])crib$/.test(k)) return 'crib';
  return null;
}

/** Only the house owner may drag her. Everyone else may still care, or tap to hold. */
export function babyDragAllowed(owner: boolean): boolean {
  return owner;
}

export function moodLabel(mood: 2 | 3 | 4): 'Cozy' | 'Happy' {
  return mood === 2 ? 'Cozy' : 'Happy';
}

/** Filled blossoms. Mood 2 draws three, so the meter is never empty. */
export function blossomsFilled(mood: 2 | 3 | 4): number {
  return mood + 1;
}

function isRoom(r: unknown): r is BabyRoom {
  return ROOMS.indexOf(r as BabyRoom) >= 0;
}

function clampMood(raw: unknown): 2 | 3 | 4 {
  const n = typeof raw === 'number' && Number.isFinite(raw) ? Math.round(raw) : 2;
  if (n <= 2) return 2;
  if (n >= 4) return 4;
  return 3;
}

function cleanAt(raw: unknown): Baby['at'] | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const src = raw as Record<string, unknown>;
  const at: Partial<Record<BabyCare, number>> = {};
  let any = false;
  for (let i = 0; i < CARES.length; i++) {
    const k = CARES[i];
    const t = src[k];
    if (typeof t === 'number' && Number.isFinite(t)) { at[k] = t; any = true; }
  }
  return any ? at : undefined;
}

/** Drop fields that do not belong to this spot, and drop an empty care clock. */
export function packBaby(b: Baby): Baby {
  const out: Baby = { name: b.name, mood: b.mood, spot: b.spot, x: b.x, y: b.y, room: b.room, since: b.since };
  if ((b.spot === 'crib' || b.spot === 'bassinet') && b.bed) out.bed = b.bed;
  if (b.spot === 'mat' && b.seat) out.seat = b.seat;
  if (b.spot === 'arms' && b.holder) out.holder = b.holder;
  const at = cleanAt(b.at);
  if (at) out.at = at;
  return out;
}

function sameBaby(a: Baby, b: Baby): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Structural check. The personal-word filter runs in cleanHouseState.
 * When `rooms` is passed, a bed or seat that is not there becomes the mat.
 */
export function cleanBaby(raw: unknown, rooms?: Record<string, { items?: { id?: string; kind?: string }[] | null } | null> | null): Baby | null {
  if (!raw || typeof raw !== 'object') return null;
  const b = raw as Record<string, unknown>;
  const name = String(b.name ?? '').normalize('NFC').replace(/\s+/g, ' ').trim();
  if (!NAME_RE.test(name)) return null;
  if ((name.match(/\d/g) || []).length > 2) return null;
  let spot: BabySpot = b.spot === 'crib' || b.spot === 'bassinet' || b.spot === 'arms' || b.spot === 'mat' ? b.spot : 'mat';
  const room: BabyRoom = isRoom(b.room) ? b.room : 'nursery';
  const x = typeof b.x === 'number' && Number.isFinite(b.x) ? Math.max(0, Math.min(2400, b.x)) : 700;
  const y = typeof b.y === 'number' && Number.isFinite(b.y) ? Math.max(0, Math.min(600, b.y)) : 540;
  const since = typeof b.since === 'number' && Number.isFinite(b.since) ? b.since : 0;
  const mood = clampMood(b.mood);
  let bed = typeof b.bed === 'string' && ID_RE.test(b.bed) ? b.bed : undefined;
  let seat = cleanDollSeat(b.seat) ?? undefined;
  let holder = typeof b.holder === 'string' && ID_RE.test(b.holder) ? b.holder : undefined;
  if (rooms) {
    const items = rooms[room]?.items ?? [];
    if (spot === 'crib' || spot === 'bassinet') {
      let found = false;
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        if (it && it.id === bed && babyBedKind(String(it.kind || '')) === spot) found = true;
      }
      if (!found) { spot = 'mat'; bed = undefined; }
    }
    if (seat) {
      let there = false;
      for (let i = 0; i < items.length; i++) if (items[i] && items[i].id === seat.item) there = true;
      if (!there) seat = undefined;
    }
  }
  if (spot !== 'crib' && spot !== 'bassinet') bed = undefined;
  if (spot !== 'mat') seat = undefined;
  if (spot !== 'arms') holder = undefined;
  if (spot === 'arms' && !holder) spot = 'mat';
  return packBaby({ name, mood, spot, bed, seat, holder, x, y, room, at: cleanAt(b.at), since });
}

/** First crib in the nursery, or the mat when the crib is gone. */
export function meetBaby(rooms: Record<string, { items?: { id?: string; kind?: string; x?: number; y?: number }[] | null } | null>, now: number): Baby {
  const items = rooms.nursery?.items ?? [];
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (!it || !it.id || babyBedKind(String(it.kind || '')) !== 'crib') continue;
    const x = typeof it.x === 'number' && Number.isFinite(it.x) ? it.x : 1170;
    const y = typeof it.y === 'number' && Number.isFinite(it.y) ? it.y : 480;
    return packBaby({ name: 'Bean', mood: 2, spot: 'crib', bed: it.id, x, y, room: 'nursery', since: now });
  }
  return packBaby({ name: 'Bean', mood: 2, spot: 'mat', x: 700, y: 540, room: 'nursery', since: now });
}

/** Raises one step, or replays at Happy. Never lowers, even if an ease was due. */
export function careBaby(baby: Baby, care: BabyCare, now: number): Baby {
  const mood = Math.min(4, baby.mood + 1) as 2 | 3 | 4;
  return packBaby({ ...baby, mood, at: { ...(baby.at || {}), [care]: now }, since: now });
}

/**
 * Steps toward Cozy, about one per EASE_MS, and stops at 2.
 * A missing clock is stamped and does not drop her.
 * Returns null when nothing changed.
 */
export function easeBaby(baby: Baby, now: number): Baby | null {
  if (!baby.since) {
    const next = packBaby({ ...baby, since: now });
    return sameBaby(next, baby) ? null : next;
  }
  if (baby.mood <= 2) return null;
  const steps = Math.floor((now - baby.since) / EASE_MS);
  if (steps < 1) return null;
  const drop = Math.min(steps, baby.mood - 2);
  const mood = (baby.mood - drop) as 2 | 3 | 4;
  return packBaby({ ...baby, mood, since: baby.since + drop * EASE_MS });
}

/** One holder. Someone else already cuddling returns null so the server can nack. */
export function holdBaby(baby: Baby, holder: string | null, room: BabyRoom, x: number, y: number): Baby | null {
  if (holder && baby.spot === 'arms' && baby.holder && baby.holder !== holder) return null;
  const next = holder
    ? packBaby({ ...baby, spot: 'arms', holder, room, x, y, bed: undefined, seat: undefined })
    : packBaby({ ...baby, spot: 'mat', room, x, y, bed: undefined, seat: undefined, holder: undefined });
  return sameBaby(next, baby) ? baby : next;
}

/** Crib, bassinet, or a free kid seat. A taken seat, or Decorate, leaves her on the mat. */
export function placeBaby(
  baby: Baby,
  cmd: { room: BabyRoom; x: number; y: number; spot: 'crib' | 'bassinet' | 'mat' | 'arms'; bed: string | null; seat: DollSeat | null },
  items: { id: string; kind: string }[],
  occupied: { item: string; n: 0 | 1 }[],
): Baby {
  let spot: BabySpot = cmd.spot === 'crib' || cmd.spot === 'bassinet' ? cmd.spot : 'mat';
  let bed: string | undefined;
  let seat: DollSeat | undefined;
  if (spot === 'crib' || spot === 'bassinet') {
    let match = false;
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (it && it.id === cmd.bed && babyBedKind(it.kind) === spot) match = true;
    }
    if (match && cmd.bed) bed = cmd.bed;
    else spot = 'mat';
  }
  if (spot === 'mat' && cmd.seat) {
    let item: { id: string; kind: string } | null = null;
    for (let i = 0; i < items.length; i++) if (items[i] && items[i].id === cmd.seat.item) item = items[i];
    const spec = item ? seatFractions(item.kind) : null;
    let taken = false;
    for (let i = 0; i < occupied.length; i++) if (occupied[i].item === cmd.seat.item && occupied[i].n === cmd.seat.n) taken = true;
    if (item && spec && spec.pose === cmd.seat.pose && !taken) seat = cmd.seat;
  }
  const next = packBaby({ ...baby, spot, room: cmd.room, x: cmd.x, y: cmd.y, bed, seat, holder: undefined });
  return sameBaby(next, baby) ? baby : next;
}

/**
 * A seat on this piece always stands her beside it.
 * Deleting or holding the crib or bassinet she is lying in does too.
 * Moving or flipping that crib does not: she draws on the live anchor.
 */
export function babyAfterFurniture(baby: Baby, id: string, evictBed: boolean, beside: { x: number; y: number } | null): Baby {
  const onSeat = baby.spot === 'mat' && baby.seat?.item === id;
  const onBed = !!evictBed && (baby.spot === 'crib' || baby.spot === 'bassinet') && baby.bed === id;
  if (!onSeat && !onBed) return baby;
  return packBaby({
    ...baby,
    spot: 'mat',
    x: beside ? beside.x : baby.x,
    y: beside ? beside.y : STAND_Y,
    bed: undefined,
    seat: undefined,
    holder: undefined,
  });
}

/** Center of her bundle on the mattress. A flip mirrors the sideways nudge. */
export function bedLieCenter(kind: string, piece: { x: number; footY: number; flip: boolean; scale: number; w: number; h: number }): { x: number; y: number } {
  const sc = piece.scale || 1;
  const w = piece.w * sc;
  const h = piece.h * sc;
  const which = babyBedKind(kind);
  let dx = which === 'bassinet' ? 0 : -0.02 * w;
  const dy = which === 'bassinet' ? -0.52 * h : -0.46 * h;
  if (piece.flip) dx = -dx;
  return { x: piece.x + dx, y: piece.footY + dy };
}

/** Play lies her in a crib or bassinet, or uses the kid seat anchors. Decorate never seats. */
export function resolveBabyDrop(opts: {
  mode: 'play' | 'decorate';
  releaseX: number;
  releaseY: number;
  piece: SeatPiece | null;
  occupied: { item: string; n: 0 | 1 }[];
}): { x: number; y: number; spot: 'crib' | 'bassinet' | 'mat'; bed: string | null; seat: DollSeat | null } {
  const mat = (x: number, y: number) => ({ x, y, spot: 'mat' as const, bed: null, seat: null });
  if (opts.mode !== 'play' || !opts.piece) return mat(opts.releaseX, opts.releaseY);
  const bedKind = babyBedKind(opts.piece.kind);
  if (bedKind) {
    const c = bedLieCenter(opts.piece.kind, opts.piece);
    return { x: c.x, y: c.y, spot: bedKind, bed: opts.piece.id, seat: null };
  }
  const drop = resolveDrop({
    mode: 'play',
    via: 'drag',
    releaseX: opts.releaseX,
    releaseY: opts.releaseY,
    piece: opts.piece,
    occupied: opts.occupied,
  });
  if (drop.seat) return { x: drop.x, y: drop.y, spot: 'mat', bed: null, seat: drop.seat };
  return mat(opts.releaseX, opts.releaseY);
}

/** She counts as sitting only on a kid seat, so a sofa's other cushion stays free. */
export function babyOccupant(baby: Baby | null | undefined, room: string): { item: string; n: 0 | 1 } | null {
  if (!baby || baby.spot !== 'mat' || !baby.seat || baby.room !== room) return null;
  return { item: baby.seat.item, n: baby.seat.n };
}
