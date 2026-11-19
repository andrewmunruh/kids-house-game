// Client-only: pets curl at the foot of the bed. Stored cat.x is never written.
// Geometry is pure so tests can measure boxes without a browser.
import { bedArt, lieBedKinds, pieceWidth } from './shared/sit';

export type BedFootItem = {
  kind: string;
  x: number;
  y: number;
  flip?: boolean;
  scale?: number;
  h?: number;
};

const SLEEP = new Set(lieBedKinds());

export function isSleepBed(kind: string): boolean {
  const k = String(kind || '').toLowerCase();
  if (!k) return false;
  return SLEEP.has(k) || SLEEP.has(k.startsWith('pack:') ? k : 'pack:' + k);
}

/** Painted mattress in room units (y grows down). Flip mirrors x around the bed's centre. */
export function mattressBox(item: BedFootItem): { l: number; t: number; r: number; b: number } | null {
  if (!isSleepBed(item.kind)) return null;
  const art = bedArt(item.kind);
  if (!art) return null;
  const sc = item.scale ?? 1;
  const w = pieceWidth(item.kind) * sc;
  const h = item.h ?? w * 0.7;
  const left = item.x - w / 2;
  const top = item.y - h;
  let l = left + art.mattress.x * w;
  let r = left + (art.mattress.x + art.mattress.w) * w;
  const t = top + art.mattress.y * h;
  const b = top + (art.mattress.y + art.mattress.h) * h;
  if (item.flip) {
    const nl = item.x - (r - item.x);
    const nr = item.x - (l - item.x);
    l = nl;
    r = nr;
  }
  return { l, t, r, b };
}

/**
 * Painted bedspread by the footboard, as fractions of the item box (measured
 * on bed.webp). This is NOT the hip-target `art.mattress`, which sits under
 * the doll's torso and made pets land on her body.
 */
export const FOOT_MAT_FRAC: { x: number; y: number; w: number; h: number } = {
  x: 0.28, y: 0.52, w: 0.50, h: 0.26,
};

/** Painted bedspread inside the rails and footboard (item-box fractions, bed.webp). */
export const MAT_INNER_FRAC: { x: number; y: number; w: number; h: number } = {
  x: 0.16, y: 0.42, w: 0.62, h: 0.38,
};

/** Foot-end mattress in room units. Flip mirrors x around the bed's centre. */
export function footMattressBox(item: BedFootItem): { l: number; t: number; r: number; b: number } | null {
  if (!isSleepBed(item.kind)) return null;
  const sc = item.scale ?? 1;
  const w = pieceWidth(item.kind) * sc;
  const h = item.h ?? w * 0.7;
  const left = item.x - w / 2;
  const top = item.y - h;
  const f = FOOT_MAT_FRAC;
  let l = left + f.x * w;
  let r = left + (f.x + f.w) * w;
  const t = top + f.y * h;
  const b = top + (f.y + f.h) * h;
  if (item.flip) {
    const nl = item.x - (r - item.x);
    const nr = item.x - (l - item.x);
    l = nl;
    r = nr;
  }
  return { l, t, r, b };
}

/** Painted bedspread inside the footboard, in room units. Flip mirrors x around centre. */
export function innerMattressBox(item: BedFootItem): { l: number; t: number; r: number; b: number } | null {
  if (!isSleepBed(item.kind)) return null;
  const sc = item.scale ?? 1;
  const w = pieceWidth(item.kind) * sc;
  const h = item.h ?? w * 0.7;
  const left = item.x - w / 2;
  const top = item.y - h;
  const f = MAT_INNER_FRAC;
  let l = left + f.x * w;
  let r = left + (f.x + f.w) * w;
  const t = top + f.y * h;
  const b = top + (f.y + f.h) * h;
  if (item.flip) {
    const nl = item.x - (r - item.x);
    const nr = item.x - (l - item.x);
    l = nl;
    r = nr;
  }
  return { l, t, r, b };
}

/** True when the painted body is fully on the mattress, inside the footboard. */
export function bodyInsideBox(
  body: { l: number; t: number; r: number; b: number },
  box: { l: number; t: number; r: number; b: number },
  slack = 12,
): boolean {
  return body.l >= box.l - slack && body.r <= box.r + slack && body.t >= box.t - slack && body.b <= box.b + slack;
}

/** Anchor at the painted foot, opposite the pillow, on the bedspread by the footboard. */
export function bedFoot(item: BedFootItem): { x: number; y: number; away: 1 | -1 } | null {
  const foot = footMattressBox(item);
  if (!foot) return null;
  const away: 1 | -1 = item.flip ? -1 : 1;
  // Toward the footboard end of the foot-region (not the mid-bed), a little to the front.
  const mid = (foot.l + foot.r) / 2;
  const x = mid + away * ((foot.r - foot.l) * 0.20 + 8);
  const y = foot.t + (foot.b - foot.t) * 0.72;
  return { x, y, away };
}

/**
 * Slots at the painted foot, in room units, for the nap/sleep bodies
 * (cat ~116×66, house dog ~70×54). x is along the bed (positive = toward the
 * footboard); y is down the screen (positive = toward the front rail).
 * Both stay on the foot of the mattress, side by side, off the doll.
 */
export const FOOT_SLOTS: { x: number; y: number }[] = [
  { x: -22, y: 26 },   // cat: on the spread, fully inside the footboard, below her body
  { x: -102, y: 26 },  // dog: next to the cat at the foot, clear of her hair and body
];

/** Painted body of a pet curled at the foot, at the same scale as the 150×128 / 92×71 boxes. */
export const FOOT_BODY: Record<string, { w: number; h: number }> = {
  cat: { w: 116, h: 66 },
  dog: { w: 56, h: 54 },
};

/**
 * Opaque nap/sleep sprite in the 150×128 / 92×71 CSS box (object-fit: contain,
 * bottom centre). Use this for overlap checks: the nap cat is a little right of
 * centre and the sleep dog a little left, so a centred FOOT_BODY box is loose.
 */
export const FOOT_SPRITE = {
  cat: { cssW: 150, cssH: 128, artW: 360, artH: 300, l: 61, t: 145, r: 339, b: 300 },
  dog: { cssW: 92, cssH: 71, artW: 390, artH: 300, l: 58, t: 58, r: 288, b: 287 },
} as const;

export function paintedFootBox(cx: number, cy: number, kind: 'cat' | 'dog', flip = false): { l: number; t: number; r: number; b: number } {
  const s = FOOT_SPRITE[kind];
  const scale = Math.min(s.cssW / s.artW, s.cssH / s.artH);
  const dw = s.artW * scale, dh = s.artH * scale;
  const ox = cx - dw / 2, oy = cy - dh;
  let l = ox + s.l * scale, r = ox + s.r * scale;
  if (flip) {
    const nl = 2 * cx - r, nr = 2 * cx - l;
    l = nl;
    r = nr;
  }
  return { l, t: oy + s.t * scale, r, b: oy + s.b * scale };
}

export function petFootTargets(
  foot: { x: number; y: number; away: 1 | -1 },
  keys: readonly string[],
): Map<string, { x: number; y: number }> {
  const sorted = [...keys].sort();
  const out = new Map<string, { x: number; y: number }>();
  for (let i = 0; i < sorted.length; i++) {
    const s = FOOT_SLOTS[i] ?? { x: FOOT_SLOTS[1].x - (i - 1) * 50, y: FOOT_SLOTS[1].y };
    out.set(sorted[i], { x: foot.x + foot.away * s.x, y: foot.y + s.y });
  }
  return out;
}

export function boxAtFeet(cx: number, cy: number, w: number, h: number) {
  return { l: cx - w / 2, t: cy - h, r: cx + w / 2, b: cy };
}

export function boxesOverlap(a: { l: number; t: number; r: number; b: number }, b: { l: number; t: number; r: number; b: number }, pad = 0): boolean {
  return a.l < b.r - pad && b.l < a.r - pad && a.t < b.b - pad && b.t < a.b - pad;
}

/** True when a pet's painted body is sitting on a mattress/foot box (feet on it, not just overlapping the headboard). */
export function bodyOnMattress(
  body: { l: number; t: number; r: number; b: number },
  mat: { l: number; t: number; r: number; b: number },
  slack = 16,
): boolean {
  const cx = (body.l + body.r) / 2;
  const feet = body.b;
  const onX = cx >= mat.l - slack && cx <= mat.r + slack;
  const onY = feet >= mat.t - slack && feet <= mat.b + slack * 1.5;
  const overlapX = body.l < mat.r + slack && body.r > mat.l - slack;
  return onX && onY && overlapX;
}

/** Stricter: the body's center must sit in the foot-end region, not mid-bed or on the pillow. */
export function bodyInFootRegion(
  body: { l: number; t: number; r: number; b: number },
  foot: { l: number; t: number; r: number; b: number },
  slack = 20,
): boolean {
  const cx = (body.l + body.r) / 2;
  const cy = (body.t + body.b) / 2;
  return cx >= foot.l - slack && cx <= foot.r + slack && cy >= foot.t - slack && cy <= foot.b + slack;
}

/** How close a pet must already be before we slide her to the foot (no room-wide teleport). */
export const FOOT_CATCH = 420;

export function petFootTranslates(
  pets: readonly { key: string; x: number; y: number }[],
  beds: readonly BedFootItem[],
  lying: readonly { x: number; y: number }[],
): Map<string, { dx: number; dy: number }> | null {
  if (!pets.length || !beds.length || !lying.length) return null;
  let best: ReturnType<typeof bedFoot> = null;
  let bestD = Infinity;
  for (const d of lying) {
    for (const b of beds) {
      const f = bedFoot(b);
      if (!f) continue;
      const dist = Math.hypot(d.x - b.x, d.y - b.y);
      if (dist < bestD) { bestD = dist; best = f; }
    }
  }
  if (!best || bestD > 380) return null;
  const near = pets.filter(p =>
    lying.some(d => Math.hypot(p.x - d.x, p.y - d.y) < FOOT_CATCH)
    || Math.hypot(p.x - best!.x, p.y - best!.y) < FOOT_CATCH);
  if (!near.length) return null;
  const targets = petFootTargets(best, near.map(p => p.key));
  const out = new Map<string, { dx: number; dy: number }>();
  for (const p of near) {
    const t = targets.get(p.key);
    if (!t) continue;
    out.set(p.key, { dx: t.x - p.x, dy: t.y - p.y });
  }
  return out;
}
