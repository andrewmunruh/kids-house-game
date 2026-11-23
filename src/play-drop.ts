// Client-only Play-drop polish. Does not change shared sit/needs reducers.
// A drop on the table (or food on it) sits her in the nearest empty chair.
// A drop on a tub or bed puts down held food first; a tub drop stands her in the water.
import { isFood } from './shared/needs';
import { isTub } from './shared/ambient';
import {
  pieceWidth, resolveDrop, seatFractions, standBeside, STAND_Y,
  type DollSeat, type SeatPiece,
} from './shared/sit';

const slug = (k: string) => String(k || '').replace(/^pack:/, '').toLowerCase();

export function isTableKind(kind: string): boolean {
  return /(^|-)table$/.test(slug(kind));
}

export function isChairKind(kind: string): boolean {
  const spec = seatFractions(kind);
  if (!spec || spec.pose !== 'sit') return false;
  return /chair|stool/.test(slug(kind));
}

export type DropItem = {
  id: string;
  kind: string;
  x: number;
  y: number;
  flip?: boolean;
  scale?: number;
};

export type HeldFood = { hand: 'left' | 'right'; kind: string };

export type BesideKind = 'away-side' | 'in-front' | 'other-side' | 'far' | 'fallback';

export type PlayDrop = {
  x: number;
  y: number;
  seat: DollSeat | null;
  releases: { hand: 'left' | 'right'; x: number; y: number }[];
  /** Stood on the floor next to a table with no seat. The caller keeps her in view. */
  beside?: boolean;
  /** Which candidate tier chose the standing spot (for diagnostics and tests). */
  besideKind?: BesideKind;
  /** Table span around which she landed (for camera framing). */
  besideTable?: { x: number; w: number };
};

/** Someone already standing in the room: the baby, another doll, another kid's avatar. `hw` is half their drawn width. */
export type Stander = { x: number; hw: number };

/** What the caller knows about the stage around a standing spot. All optional; with none, standNextTo is standBeside. */
export type StandCheck = {
  /** Room px the camera must slide to show a standing doll at (x, y) clear of UI and keeping >=50% of the table in view: 0 = fine, Infinity = impossible. */
  cost?: (x: number, y?: number) => number;
  /** Deprecated for fridges (a closed fridge must not block a spot); kept optional for unit callers. */
  bad?: (x: number, y?: number) => boolean;
  /** Standing here would overlap another piece of furniture. */
  crowded?: (x: number, y?: number) => boolean;
  /** Others standing in the room. She does not stand on them, and prefers the side of the table they are not on. */
  others?: Stander[];
  /** Called if every near spot (away side, in front, other side) was blocked and a far spot had to be used. */
  onFar?: (info: { kind: BesideKind; tableX: number; x: number; y: number }) => void;
};

export const STAND_BODY_HW = 62;   // half her idle drawn width on the floor (120 element + breathing)
export const STAND_DRAWN_HW = 82;  // half her widest drawn width (wave pose, arms and hair buns)
export const MAX_EDGE_DIST = 118;  // within ~1 doll-width (CHAR_W = 120) of the table's edge
const MAX_WALK_OUT = 360;

// Built-in widths of non-seat items whose kind is omitted from shared PIECE_W (which defaults to 320).
const ITEM_W: Record<string, number> = {
  table: 200,
  'picnic-table': 360,
  fridge: 150,
  stove: 170,
  plant: 110,
  cake: 100,
  juice: 56,
};

export function itemSpanWidth(it: { kind: string; scale?: number }, custom?: (it: DropItem) => number): number {
  if (custom) return custom(it as DropItem);
  const k = slug(it.kind);
  const base = ITEM_W[k] ?? pieceWidth(it.kind);
  return base * (it.scale || 1);
}

/**
 * Floor beside a table with no seat.
 * Candidate order when `check` is supplied:
 *   1. Side away from the baby/others, near the table edge (within ~1 doll-width, ideally clearing wave pose).
 *   2. Floor in front of the table (same x footprint, lower y on screen).
 *   3. The other side, near the table edge.
 *   4. Far spot fallback (logs via `onFar`).
 * Without `check` this is exactly standBeside.
 */
export function standNextTo(
  piece: { x: number; y?: number }, pieceW: number, fromX: number, roomW: number, check?: StandCheck,
): { x: number; y: number; kind?: BesideKind } {
  const first = standBeside(piece.x, pieceW, fromX, roomW);
  if (!check) return first;
  const half = Math.max(0, pieceW) / 2;
  const idealR = half + STAND_DRAWN_HW + 2;
  const minSideR = half + STAND_BODY_HW;
  const maxSideR = half + MAX_EDGE_DIST;
  const edge = 40;
  const cost = check.cost ?? (() => 0);
  const bad = check.bad ?? (() => false);
  const crowded = check.crowded ?? (() => false);
  const others = check.others ?? [];
  const pref = first.x >= piece.x ? 1 : -1;
  const onOthers = (x: number) => others.some(o => Math.abs(o.x - x) < o.hw + STAND_BODY_HW);
  const sideOf = (x: number) => (x >= piece.x ? 1 : -1);
  const taken = (side: number) => others.some(o => sideOf(o.x) === side && Math.abs(o.x - piece.x) <= maxSideR + MAX_WALK_OUT + 120);
  const awayTaken = taken(pref), otherTaken = taken(-pref);
  const awaySide = (awayTaken && !otherTaken) ? -pref : pref;
  const otherSide = -awaySide;
  const bothFreeOrBothTaken = awayTaken === otherTaken;

  // Radial offsets for a near side: ideal reach outward to maxSideR, plus inward tuck to minSideR if ideal is crowded.
  const nearOffsets: number[] = [];
  for (let r = idealR; r <= maxSideR; r += 10) nearOffsets.push(r);
  for (let r = idealR - 2; r >= minSideR; r -= 2) nearOffsets.push(r);

  const pickSide = (sides: number[]): { x: number; y: number; score: number } | null => {
    let best: { x: number; y: number; score: number } | null = null;
    for (const side of sides) {
      for (const r of nearOffsets) {
        const x = piece.x + side * r;
        if (x < edge || x > roomW - edge || bad(x, STAND_Y) || onOthers(x) || crowded(x, STAND_Y)) continue;
        const c = cost(x, STAND_Y);
        if (!Number.isFinite(c)) continue;
        const inward = r < idealR ? 50 + (idealR - r) : (r - idealR);
        const score = inward + c * 0.5 + (side === pref ? 0 : 0.001);
        if (!best || score < best.score) best = { x, y: STAND_Y, score };
      }
    }
    return best;
  };

  // 1. Side away from the baby (if nobody is on either side, allow whichever near side needs the smaller slide).
  const tier1 = pickSide(bothFreeOrBothTaken ? [awaySide, otherSide] : [awaySide]);
  if (tier1) return { x: tier1.x, y: tier1.y, kind: 'away-side' };

  // 2. Floor in front of the table (same footprint, lower y on the floor).
  const frontY = Math.max(STAND_Y, Math.min(556, (piece.y ?? 500) + 20));
  const footSpan = Math.max(0, half - 20);
  let bestFront: { x: number; y: number; score: number } | null = null;
  for (let d = 0; d <= footSpan; d += 20) {
    for (const dx of d === 0 ? [0] : [-d, d]) {
      const x = piece.x + dx;
      if (x < edge || x > roomW - edge || bad(x, frontY) || onOthers(x) || crowded(x, frontY)) continue;
      const c = cost(x, frontY);
      if (!Number.isFinite(c)) continue;
      const score = Math.abs(dx) + c * 0.5;
      if (!bestFront || score < bestFront.score) bestFront = { x, y: frontY, score };
    }
  }
  if (bestFront) return { x: bestFront.x, y: bestFront.y, kind: 'in-front' };

  // 3. The other side (if one side had someone and wasn't checked in tier 1).
  if (!bothFreeOrBothTaken) {
    const tier3 = pickSide([otherSide]);
    if (tier3) return { x: tier3.x, y: tier3.y, kind: 'other-side' };
  }

  // 4. Far spot fallback (only when no near spot on either side or in front works).
  let bestFar: { x: number; y: number; score: number; tier: number } | null = null;
  for (let r = maxSideR + 10; r <= idealR + MAX_WALK_OUT; r += 10) {
    for (const side of [awaySide, otherSide]) {
      const x = piece.x + side * r;
      if (x < edge || x > roomW - edge || bad(x, STAND_Y)) continue;
      const c = cost(x, STAND_Y);
      if (!Number.isFinite(c)) continue;
      const tier = onOthers(x) ? 2 : crowded(x, STAND_Y) ? 1 : 0;
      const score = (r - idealR) + c * 0.5 + (side === awaySide ? 0 : 300);
      if (!bestFar || tier < bestFar.tier || (tier === bestFar.tier && score < bestFar.score)) bestFar = { x, y: STAND_Y, score, tier };
    }
  }
  if (bestFar) {
    check.onFar?.({ kind: 'far', tableX: piece.x, x: bestFar.x, y: bestFar.y });
    return { x: bestFar.x, y: bestFar.y, kind: 'far' };
  }

  // Last resort when no camera can show any spot: return standBeside's own spot (or the unblocked side).
  if (first.x >= edge && first.x <= roomW - edge && !bad(first.x, STAND_Y)) {
    check.onFar?.({ kind: 'fallback', tableX: piece.x, x: first.x, y: STAND_Y });
    return { ...first, kind: 'fallback' };
  }
  for (const x of [piece.x + awaySide * idealR, piece.x + otherSide * idealR]) {
    if (x >= edge && x <= roomW - edge && !bad(x, STAND_Y)) {
      check.onFar?.({ kind: 'fallback', tableX: piece.x, x, y: STAND_Y });
      return { x, y: STAND_Y, kind: 'fallback' };
    }
  }
  check.onFar?.({ kind: 'fallback', tableX: piece.x, x: first.x, y: STAND_Y });
  return { ...first, kind: 'fallback' };
}

const TABLE_CHAIR_R = 320;
const FOOD_ON_TABLE_R = 180;

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);

function tableAt(items: DropItem[], x: number, y: number, hit: DropItem | null): DropItem | null {
  if (hit && isTableKind(hit.kind)) return hit;
  const tables = items.filter(i => isTableKind(i.kind));
  let best: DropItem | null = null, bestD = Infinity;
  const probe = hit && isFood(hit.kind) ? hit : { x, y };
  const reach = hit && isFood(hit.kind) ? FOOD_ON_TABLE_R : 0;
  for (const t of tables) {
    const r = Math.max(reach, pieceWidth(t.kind) * 0.55 + 40);
    const d = dist(probe, t);
    if (d <= r && d < bestD) { best = t; bestD = d; }
  }
  return best;
}

function tubAt(items: DropItem[], x: number, y: number, hit: DropItem | null): DropItem | null {
  if (hit && isTub(hit.kind)) return hit;
  for (const it of items) {
    if (!isTub(it.kind)) continue;
    const w = pieceWidth(it.kind);
    if (Math.abs(x - it.x) <= Math.max(60, w * 0.45) && Math.abs(y - it.y) <= 80) return it;
  }
  return null;
}

function releaseSpots(piece: { x: number; kind: string }, fromX: number, n: number, roomW: number): { x: number; y: number }[] {
  const w = pieceWidth(piece.kind);
  const first = standBeside(piece.x, w, fromX, roomW);
  const out = [first];
  if (n > 1) {
    const other = standBeside(piece.x, w, piece.x + (piece.x - first.x), roomW);
    out.push({ x: other.x, y: other.y });
  }
  return out;
}

export function playDropPolish(opts: {
  releaseX: number;
  releaseY: number;
  hit: DropItem | null;
  items: DropItem[];
  occupied: { item: string; n: 0 | 1 }[];
  held: HeldFood[];
  seatPiece: (it: DropItem) => SeatPiece | null;
  roomW?: number;
  /** Camera slide (room px) that shows a standing doll at (x, y) clear of UI and keeping >=50% of the table in view: 0 fine, Infinity impossible. Unset means anywhere. */
  standCost?: (x: number, y?: number, table?: DropItem) => number;
  /** Others standing in the room (baby, other dolls, avatars); she lands on neither them nor, if she can help it, their side of the table. */
  standers?: Stander[];
  /** Actual rendered width of a placed item (falls back to built-in ITEM_W / pieceWidth). */
  itemWidth?: (it: DropItem) => number;
  /** Optional far-spot logger (defaults to console.warn in playDropPolish when standCost is given). */
  onFar?: StandCheck['onFar'];
}): PlayDrop {
  const roomW = opts.roomW ?? 2400;
  const { releaseX, releaseY, hit, items, occupied, held, seatPiece } = opts;
  const foodHeld = held.filter(h => isFood(h.kind));

  // A drop that already landed on a chair keeps that chair (even next to the table).
  if (hit && isChairKind(hit.kind)) {
    const piece = seatPiece(hit);
    if (piece) {
      const drop = resolveDrop({ mode: 'play', via: 'drag', releaseX, releaseY, piece, occupied });
      if (drop.seat) return { x: drop.x, y: drop.y, seat: drop.seat, releases: [] };
    }
  }

  const tub = tubAt(items, releaseX, releaseY, hit);
  const table = tableAt(items, releaseX, releaseY, hit);
  const lie = !!(hit && seatFractions(hit.kind)?.pose === 'lie');
  const care = tub || (lie ? hit : null);

  const releases: PlayDrop['releases'] = [];
  if (care && foodHeld.length) {
    const spots = releaseSpots(care, releaseX, foodHeld.length, roomW);
    for (let i = 0; i < foodHeld.length; i++) {
      const spot = spots[Math.min(i, spots.length - 1)];
      releases.push({ hand: foodHeld[i].hand, x: spot.x, y: spot.y || STAND_Y });
    }
  }

  if (tub) return { x: tub.x, y: tub.y + 8, seat: null, releases };

  if (table) {
    let best: { x: number; y: number; seat: DollSeat } | null = null;
    let bestD = Infinity;
    for (const ch of items) {
      if (!isChairKind(ch.kind) || dist(ch, table) > TABLE_CHAIR_R) continue;
      const piece = seatPiece(ch);
      if (!piece) continue;
      const drop = resolveDrop({ mode: 'play', via: 'drag', releaseX, releaseY, piece, occupied });
      if (!drop.seat) continue;
      const d = dist(ch, { x: releaseX, y: releaseY });
      if (d < bestD) { bestD = d; best = { x: drop.x, y: drop.y, seat: drop.seat }; }
    }
    if (best) return { ...best, releases };

    if (!opts.standCost) {
      const stand = standBeside(table.x, pieceWidth(table.kind), releaseX, roomW);
      return { x: stand.x, y: stand.y, seat: null, releases, beside: true };
    }

    const tableW = itemSpanWidth(table, opts.itemWidth);
    const stand = standNextTo(table, tableW, releaseX, roomW, {
      cost: (x, y) => opts.standCost!(x, y, table),
      // A closed fridge's open-door zone does NOT block a spot; only physical piece boxes (excluding the table) block.
      crowded: x => items.some(it => {
        if (it.id === table.id || it.y <= table.y - 60) return false;
        const iw = opts.itemWidth ? opts.itemWidth(it) : (ITEM_W[slug(it.kind)] ?? (pieceWidth(it.kind) < 320 ? pieceWidth(it.kind) : 170)) * (it.scale || 1);
        return Math.abs(x - it.x) < iw / 2 + STAND_BODY_HW;
      }),
      others: opts.standers,
      onFar: info => {
        if (opts.onFar) opts.onFar(info);
        else console.warn('[table-drop] far-spot fallback', JSON.stringify(info));
      },
    });
    return {
      x: stand.x, y: stand.y, seat: null, releases, beside: true,
      besideKind: stand.kind,
      besideTable: { x: table.x, w: tableW },
    };
  }

  const piece = hit ? seatPiece(hit) : null;
  const drop = resolveDrop({ mode: 'play', via: 'drag', releaseX, releaseY, piece, occupied });
  return { x: drop.x, y: drop.y, seat: drop.seat, releases };
}
