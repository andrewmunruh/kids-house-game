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

/** A rectangle in the piece, fractions from the top-left. The painted image fills the box. */
export interface LieRect { x: number; y: number; w: number; h: number }

/**
 * Pillow and mattress on the painted bed, not the SVG.
 * `head` is where the chibi head center should land (unflipped).
 * `clip` picks the footboard overlay in CSS (`.k-bed-*`).
 */
export interface BedArt {
  head: { x: number; y: number };
  pillow: LieRect;
  mattress: LieRect;
  clip: string;
}

/** Measured on the WebP. Head targets keep the face off the headboard and the hips on the mattress. */
const BED_ART: Record<string, BedArt> = {
  bed: {
    head: { x: 0.24, y: 0.42 },
    pillow: { x: 0.10, y: 0.27, w: 0.22, h: 0.18 },
    mattress: { x: 0.36, y: 0.34, w: 0.36, h: 0.16 },
    clip: 'starter',
  },
  'wooden-bed': {
    head: { x: 0.22, y: 0.53 },
    pillow: { x: 0.12, y: 0.36, w: 0.24, h: 0.18 },
    mattress: { x: 0.38, y: 0.46, w: 0.32, h: 0.16 },
    clip: 'wooden',
  },
  'checker-bed': {
    head: { x: 0.16, y: 0.45 },
    pillow: { x: 0.08, y: 0.26, w: 0.22, h: 0.22 },
    mattress: { x: 0.38, y: 0.40, w: 0.32, h: 0.16 },
    clip: 'checker',
  },
  'bunk-bed': {
    head: { x: 0.11, y: 0.62 },
    pillow: { x: 0.05, y: 0.52, w: 0.18, h: 0.14 },
    mattress: { x: 0.22, y: 0.56, w: 0.36, h: 0.14 },
    clip: 'bunk',
  },
  'canopy-bed': {
    head: { x: 0.38, y: 0.52 },
    pillow: { x: 0.28, y: 0.46, w: 0.24, h: 0.14 },
    mattress: { x: 0.48, y: 0.48, w: 0.28, h: 0.16 },
    clip: 'canopy',
  },
  'cc-heart-bed': {
    head: { x: 0.22, y: 0.67 },
    pillow: { x: 0.12, y: 0.58, w: 0.26, h: 0.16 },
    mattress: { x: 0.36, y: 0.64, w: 0.36, h: 0.16 },
    clip: 'heart',
  },
  'cc-canopy-daybed': {
    head: { x: 0.37, y: 0.58 },
    pillow: { x: 0.26, y: 0.50, w: 0.26, h: 0.16 },
    mattress: { x: 0.48, y: 0.54, w: 0.30, h: 0.16 },
    clip: 'daybed',
  },
};

const LIE_KINDS = ['bed', 'pack:wooden-bed', 'pack:checker-bed', 'pack:bunk-bed', 'pack:canopy-bed', 'pack:cc-heart-bed', 'pack:cc-canopy-daybed'];

function isLieBed(k: string): boolean {
  if (k === 'bed' || /bunk/.test(k) || /daybed/.test(k)) return true;
  return /(^|[-_:])bed$/.test(k);
}

export function lieBedKinds(): string[] { return LIE_KINDS.slice(); }

/** Painted pillow, mattress, and head target. Unknown beds use the starter bed. */
export function bedArt(kind: string): BedArt | null {
  const k = String(kind || '').toLowerCase();
  if (!k || NOT_SEAT.test(k) || !isLieBed(k)) return null;
  const slug = k.replace(/^pack:/, '');
  return BED_ART[slug] || BED_ART[k] || BED_ART.bed;
}

/**
 * One CSS turn, rotate(-90deg) around 40% 72% of the 120×192 box.
 * That lays her flat on the mattress. -78 left her feet about 12° up.
 * Points are the chibi head, chest, and hip before that turn.
 * A flipped bed mirrors the result; the SVG is not rotated as well.
 */
const LIE_BOX: Record<'head' | 'chest' | 'hip' | 'classic', { x: number; y: number }> = {
  head: { x: 55.0733, y: 59.7445 },
  chest: { x: 60, y: 114 },
  hip: { x: 60, y: 138 },
  classic: { x: 60, y: 52.8 },
};
const LIE_OX = 48;
const LIE_OY = 138.24;

function lieTurn(px: number, py: number): { x: number; y: number } {
  const rad = -90 * Math.PI / 180;
  const c = Math.cos(rad), s = Math.sin(rad);
  const dx = px - LIE_OX, dy = py - LIE_OY;
  const x = LIE_OX + c * dx - s * dy;
  const y = LIE_OY + s * dx + c * dy;
  return { x: x - 60, y: y - 192 };
}

/** Offset from the anchor (bottom center of the doll box) to that point, in room pixels. */
export function lieOffset(part: 'head' | 'chest' | 'hip' | 'classic', flipped: boolean): { x: number; y: number } {
  const p = LIE_BOX[part];
  const u = lieTurn(p.x, p.y);
  return { x: flipped ? -u.x : u.x, y: u.y };
}

/** Where that point lands in the piece, fractions from the top-left. `w` and `h` are the drawn size. */
export function lieSpot(kind: string, w: number, h: number, part: 'head' | 'chest' | 'hip' | 'classic', flipped: boolean): { x: number; y: number } | null {
  const art = bedArt(kind);
  if (!art || w < 1 || h < 1) return null;
  const head = lieOffset('head', false);
  const dx = (art.head.x - 0.5) * w - head.x;
  const dy = (art.head.y - 1) * h - head.y;
  const off = lieOffset(part, flipped);
  const adx = flipped ? -dx : dx;
  return { x: 0.5 + (adx + off.x) / w, y: 1 + (dy + off.y) / h };
}

export function inLieRect(p: { x: number; y: number }, r: LieRect): boolean {
  return p.x >= r.x - 1e-4 && p.y >= r.y - 1e-4 && p.x <= r.x + r.w + 1e-4 && p.y <= r.y + r.h + 1e-4;
}

/**
 * Category anchors, measured from the piece's center-bottom.
 * dx and dy are fractions of width and height. A flip mirrors dx.
 * A sofa has two. A chair, armchair, stool, and bed have one. A bench has two.
 * A bunk uses the bottom bunk only (one lie anchor). Bed spots are filled in
 * by anchorsOf from the painted pillow, because the head offset is in pixels.
 */
export function seatFractions(kind: string): SeatFractions | null {
  const k = String(kind || '').toLowerCase();
  if (!k || NOT_SEAT.test(k)) return null;
  if (isLieBed(k)) return { pose: 'lie', spots: [{ dx: 0, dy: 0 }] };
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
  const art = spec.pose === 'lie' ? bedArt(p.kind) : null;
  if (art) {
    const w = p.w * sc, h = p.h * sc;
    const head = lieOffset('head', false);
    const dx = (art.head.x - 0.5) * w - head.x;
    const dy = (art.head.y - 1) * h - head.y;
    return [{ x: p.x + (p.flip ? -dx : dx), y: p.footY + dy, pose: 'lie', n: 0 }];
  }
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

/** Drawn width of a seat, without scale. Unknown kinds use a wide default so she clears the piece. */
const PIECE_W: Record<string, number> = {
  sofa: 260, armchair: 150, bed: 300, chair: 100, stool: 90, rocker: 190, 'yard-bench': 140,
  'bar-stool': 52.8, 'bunk-bed': 294, 'canopy-bed': 294, 'cc-bubble-chair': 142, 'cc-canopy-daybed': 276,
  'cc-dryer-chair': 164, 'cc-heart-bed': 236, 'cc-mani-chair': 188, 'cc-mushroom-stool': 112,
  'cc-scallop-loveseat': 248, 'checker-bed': 196, 'cloud-sofa': 212, 'comfy-armchair': 161.7,
  'cream-sofa': 234.6, 'egg-chair': 126, 'fancy-sofa': 234.6, 'gaming-chair': 101.4, 'lattice-bench': 147,
  'puffy-stool': 46.9, 'rocking-chair': 137.2, 'salon-chair': 111.8, 'swivel-stool': 46.2,
  'waiting-bench': 166.6, 'wash-chair': 186.2, 'wood-armchair': 127.4, 'wood-stool': 46.2, 'wooden-bed': 235.2,
};

export function pieceWidth(kind: string): number {
  const k = String(kind || '').toLowerCase().replace(/^pack:/, '');
  return PIECE_W[k] ?? 320;
}

/** Standing feet. The same y a new kid starts on. */
export const STAND_Y = 540;

/**
 * Floor beside the piece she was on. `fromX` picks the side she was already
 * closer to. A 70px gap clears her 120px body. The other side is used when
 * the first one would leave the room.
 */
export function standBeside(itemX: number, itemW: number, fromX: number, roomW = 2400): { x: number; y: number } {
  const reach = Math.max(0, itemW) / 2 + 70;
  const edge = 40;
  let side = fromX < itemX - 8 ? -1 : 1;
  let x = itemX + side * reach;
  if (x < edge || x > roomW - edge) {
    side = -side;
    x = itemX + side * reach;
  }
  if (x < edge) x = edge;
  if (x > roomW - edge) x = roomW - edge;
  return { x, y: STAND_Y };
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
