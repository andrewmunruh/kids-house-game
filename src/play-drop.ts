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

export type PlayDrop = {
  x: number;
  y: number;
  seat: DollSeat | null;
  releases: { hand: 'left' | 'right'; x: number; y: number }[];
};

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
    const stand = standBeside(table.x, pieceWidth(table.kind), releaseX, roomW);
    return { x: stand.x, y: stand.y, seat: null, releases };
  }

  const piece = hit ? seatPiece(hit) : null;
  const drop = resolveDrop({ mode: 'play', via: 'drag', releaseX, releaseY, piece, occupied });
  return { x: drop.x, y: drop.y, seat: drop.seat, releases };
}
