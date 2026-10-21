// Sit and lie. Save version stays 3. A standing kid has no `seat` key.
// Anchors are fractions of the piece. The caller passes the drawn foot
// (the same drawn y sit, the kennel, and the bubble already use).

export type SeatPose = 'sit' | 'lie';
export type SeatN = 0 | 1;

/** Saved on a house doll. Omitted when she is standing. */
export interface DollSeat { item: string; pose: SeatPose; n: SeatN }
/** Saved on a house presence. `id` is the placed item. */
export interface PresSeat { id: string; pose: SeatPose; n: SeatN }

const ID_RE = /^[A-Za-z0-9:_\/.-]{1,80}$/;

/** Not a kid seat in P1: crib, bassinet, high chair, pet beds, flower beds, toadstools. */
const NOT_SEAT = /crib|bassinet|high-?chair|cat-bed|pet-bed|dog-bed|kennel|tulip|flower|toadstool|mobile/;

export interface SeatFractions { pose: SeatPose; spots: { dx: number; dy: number }[] }

/**
 * Category anchors, measured from the piece's center-bottom.
 * dx and dy are fractions of width and height. A flip mirrors dx.
 * A sofa has two. A chair, armchair, stool, and bed have one. A bench has two.
 * A bunk uses the bottom bunk only (one lie anchor).
 */
export function seatFractions(kind: string): SeatFractions | null {
  const k = String(kind || '').toLowerCase();
  if (!k || NOT_SEAT.test(k)) return null;
  if (k === 'bed' || /(^|[-_:])bed$/.test(k) || /bunk/.test(k)) return { pose: 'lie', spots: [{ dx: -0.08, dy: -0.30 }] };
  if (/sofa|couch|loveseat/.test(k)) return { pose: 'sit', spots: [{ dx: -0.18, dy: -0.33 }, { dx: 0.18, dy: -0.33 }] };
  if (/armchair/.test(k)) return { pose: 'sit', spots: [{ dx: 0, dy: -0.32 }] };
  if (/bench/.test(k)) return { pose: 'sit', spots: [{ dx: -0.22, dy: -0.30 }, { dx: 0.22, dy: -0.30 }] };
  if (/stool|rocker/.test(k)) return { pose: 'sit', spots: [{ dx: 0, dy: -0.38 }] };
  if (/chair/.test(k)) return { pose: 'sit', spots: [{ dx: 0, dy: -0.48 }] };
  return null;
}

export interface SeatPiece {
  id: string;
  kind: string;
  x: number;
  /** Drawn foot of the piece, not the stored y. */
  footY: number;
  flip: boolean;
  scale: number;
  w: number;
  h: number;
}

export interface Anchor { x: number; y: number; pose: SeatPose; n: SeatN }

/** Room position of each anchor. `footY` is the drawn y. */
export function anchorsOf(p: SeatPiece): Anchor[] {
  const spec = seatFractions(p.kind);
  if (!spec) return [];
  const sc = p.scale || 1;
  return spec.spots.map((s, i) => {
    const dx = s.dx * p.w * sc;
    const dy = s.dy * p.h * sc;
    const n: SeatN = i === 1 ? 1 : 0;
    return { x: p.x + (p.flip ? -dx : dx), y: p.footY + dy, pose: spec.pose, n };
  });
}

export interface DropResult {
  x: number;
  y: number;
  seat: DollSeat | null;
  toast: string | null;
  /** False when a full tap leaves her where she was. */
  moved: boolean;
}

/**
 * Play snaps to the nearest free anchor. Decorate never seats.
 * A tap on a full piece toasts and does not move her. A drag onto a full piece
 * lands at the release point, standing, with no toast.
 */
export function resolveDrop(opts: {
  mode: 'play' | 'decorate';
  via: 'drag' | 'tap';
  releaseX: number;
  releaseY: number;
  piece: SeatPiece | null;
  occupied: { item: string; n: SeatN }[];
  /** She is already on this piece. A second tap stands her up. */
  alreadyOn?: string | null;
}): DropResult {
  const standAt = (x: number, y: number): DropResult => ({ x, y, seat: null, toast: null, moved: true });
  if (opts.mode !== 'play') return standAt(opts.releaseX, opts.releaseY);
  const piece = opts.piece;
  if (!piece) {
    if (opts.via === 'drag') return standAt(opts.releaseX, opts.releaseY);
    return { x: opts.releaseX, y: opts.releaseY, seat: null, toast: null, moved: false };
  }
  if (opts.via === 'tap' && opts.alreadyOn === piece.id) return standAt(piece.x, piece.footY);
  const taken = new Set(opts.occupied.filter(o => o.item === piece.id).map(o => o.n));
  const free = anchorsOf(piece).filter(a => !taken.has(a.n));
  if (!free.length) {
    if (opts.via === 'tap') return { x: opts.releaseX, y: opts.releaseY, seat: null, toast: 'Someone is already there!', moved: false };
    return standAt(opts.releaseX, opts.releaseY);
  }
  let best = free[0];
  let bestD = Infinity;
  for (const a of free) {
    const d = (a.x - opts.releaseX) ** 2 + (a.y - opts.releaseY) ** 2;
    if (d < bestD) { best = a; bestD = d; }
  }
  return { x: best.x, y: best.y, seat: { item: piece.id, pose: best.pose, n: best.n }, toast: null, moved: true };
}

/** Moving past 6px, flipping, deleting, or holding stands her. A tap, front, and back do not. */
export function furnitureClearsSeat(edit: 'move' | 'flip' | 'delete' | 'hold' | 'front' | 'back' | 'tap', movedPx: number): boolean {
  if (edit === 'flip' || edit === 'delete' || edit === 'hold') return true;
  if (edit === 'move') return movedPx > 6;
  return false;
}

export function cleanDollSeat(raw: unknown): DollSeat | null {
  if (!raw || typeof raw !== 'object') return null;
  const s = raw as { item?: unknown; pose?: unknown; n?: unknown };
  if (typeof s.item !== 'string' || !ID_RE.test(s.item)) return null;
  if (s.pose !== 'sit' && s.pose !== 'lie') return null;
  if (s.n !== 0 && s.n !== 1) return null;
  return { item: s.item, pose: s.pose, n: s.n };
}

export function cleanPresSeat(raw: unknown): PresSeat | null {
  if (!raw || typeof raw !== 'object') return null;
  const s = raw as { id?: unknown; pose?: unknown; n?: unknown };
  if (typeof s.id !== 'string' || !ID_RE.test(s.id)) return null;
  if (s.pose !== 'sit' && s.pose !== 'lie') return null;
  if (s.n !== 0 && s.n !== 1) return null;
  return { id: s.id, pose: s.pose, n: s.n };
}

/** Keep a seat only when that item is still in her room. A dangling seat is dropped. */
export function seatStillThere(seat: DollSeat | null | undefined, roomItems: { id?: string }[] | null | undefined): DollSeat | null {
  if (!seat) return null;
  const clean = cleanDollSeat(seat);
  if (!clean || !roomItems?.some(i => i && i.id === clean.item)) return null;
  return clean;
}
