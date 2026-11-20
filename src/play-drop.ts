// Client-only Play-drop polish. Does not change shared sit/needs reducers.
// A drop on the table (or food on it) sits her in the nearest empty chair.
// A drop on a tub or bed puts down held food first; a tub drop stands her in the water.
import { isFood } from './shared/needs';
import { FRIDGE_RADIUS, isFridge, isTub } from './shared/ambient';
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

export type PlayDrop = {
  x: number;
  y: number;
  seat: DollSeat | null;
  releases: { hand: 'left' | 'right'; x: number; y: number }[];
  /** Stood on the floor next to a table with no seat. The caller keeps her in view. */
  beside?: boolean;
};

/** Someone already standing in the room: the baby, another doll, another kid's avatar. `hw` is half their drawn width. */
export type Stander = { x: number; hw: number };

/** What the caller knows about the stage around a standing spot. All optional; with none, standNextTo is standBeside. */
export type StandCheck = {
  /** Room px the camera must slide to show a standing doll at x clear of the buttons: 0 = already fine, Infinity = no camera position can. */
  cost?: (x: number) => number;
  /** Standing here would trip something (a fridge's open zone). Never chosen while another spot works. */
  bad?: (x: number) => boolean;
  /** Standing here would overlap another piece of furniture. */
  crowded?: (x: number) => boolean;
  /** Others standing in the room. She does not stand on them, and prefers the side of the table they are not on. */
  others?: Stander[];
};

export const STAND_BODY_HW = 55;   // half her drawn width on the floor
export const STAND_DRAWN_HW = 82;   // half her widest drawn width (wave pose, arms and hair buns): the clearance a piece needs
const OTHERS_SIDE_PENALTY = 300;   // room px of extra walking we accept to be on the side away from the baby
const MAX_WALK_OUT = 360;

/**
 * Floor beside a table with no seat. Candidates are both sides of the table, starting at the normal reach (standBeside's
 * spot and its mirror) and stepping outward. A candidate must be inside the room, outside every fridge's open zone and
 * showable by some camera position (cost finite). Among those we prefer, in order: (1) not on anybody and not on another
 * piece, (2) not on anybody, (3) anything. Inside a tier the cheapest wins: steps out + half the camera slide, plus
 * OTHERS_SIDE_PENALTY if she would stand on the same side of the table as the baby or other dolls. So with both sides
 * clean she takes the normal reach on the side away from them, with the smaller slide on a tie.
 * Without `check` this is exactly standBeside.
 */
export function standNextTo(
  piece: { x: number }, pieceW: number, fromX: number, roomW: number, check?: StandCheck,
): { x: number; y: number } {
  const first = standBeside(piece.x, pieceW, fromX, roomW);
  if (!check) return first;
  const reach = Math.max(0, pieceW) / 2 + 70, edge = 40;
  const cost = check.cost ?? (() => 0);
  const bad = check.bad ?? (() => false);
  const crowded = check.crowded ?? (() => false);
  const others = check.others ?? [];
  const pref = first.x >= piece.x ? 1 : -1;
  const onOthers = (x: number) => others.some(o => Math.abs(o.x - x) < o.hw + STAND_BODY_HW);
  const sideOf = (x: number) => (x >= piece.x ? 1 : -1);
  const taken = (side: number) => others.some(o => sideOf(o.x) === side && Math.abs(o.x - piece.x) <= reach + MAX_WALK_OUT + 120);
  type C = { x: number; score: number; tier: number };
  let best: C | null = null;
  for (let extra = 0; extra <= MAX_WALK_OUT; extra += 10) {
    for (const side of [pref, -pref]) {
      const x = extra === 0 && side === pref ? first.x : piece.x + side * (reach + extra);
      if (x < edge || x > roomW - edge || bad(x)) continue;
      const c = cost(x);
      if (!Number.isFinite(c)) continue;
      const tier = onOthers(x) ? 2 : crowded(x) ? 1 : 0;
      const score = extra + c * 0.5 + (taken(side) ? OTHERS_SIDE_PENALTY : 0) + (side === pref ? 0 : 0.001);
      if (!best || tier < best.tier || (tier === best.tier && score < best.score)) best = { x, score, tier };
    }
  }
  if (best) return { x: best.x, y: STAND_Y };
  // nothing can be shown: the normal spot that trips nothing, else standBeside's own
  for (const x of [first.x, piece.x - pref * reach]) if (x >= edge && x <= roomW - edge && !bad(x)) return { x, y: STAND_Y };
  return first;
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
  /** Camera slide (room px) that shows a standing doll at this room x clear of the buttons: 0 fine, Infinity impossible. Unset means anywhere. */
  standCost?: (x: number) => number;
  /** Others standing in the room (baby, other dolls, avatars); she lands on neither them nor, if she can help it, their side of the table. */
  standers?: Stander[];
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
    const stand = standNextTo(table, pieceWidth(table.kind), releaseX, roomW, opts.standCost ? {
      cost: opts.standCost,
      // her derived fridge-open reads dolls at STAND_Y; a table drop must never be what opens one
      bad: x => items.some(it => isFridge(it.kind) && Math.hypot(x - it.x, STAND_Y - it.y) <= FRIDGE_RADIUS + 12),
      // other furniture on the floor row (not things standing on the table); unknown kinds are about 170 wide, not the 320 default
      crowded: x => items.some(it => it.id !== table.id && it.y > table.y - 60 && Math.abs(x - it.x) < (pieceWidth(it.kind) < 320 ? pieceWidth(it.kind) / 2 : 85) + STAND_DRAWN_HW),
      others: opts.standers,
    } : undefined);
    return { x: stand.x, y: stand.y, seat: null, releases, beside: true };
  }

  const piece = hit ? seatPiece(hit) : null;
  const drop = resolveDrop({ mode: 'play', via: 'drag', releaseX, releaseY, piece, occupied });
  return { x: drop.x, y: drop.y, seat: drop.seat, releases };
}
