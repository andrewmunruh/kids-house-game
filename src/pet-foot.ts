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

/** The foot of the mattress, opposite the pillow, inset so a curled pet stays on the bed. Room units. */
export function bedFoot(item: BedFootItem): { x: number; y: number; away: 1 | -1 } | null {
  const mat = mattressBox(item);
  if (!mat) return null;
  const away: 1 | -1 = item.flip ? -1 : 1;
  const width = mat.r - mat.l;
  const inset = Math.min(36, Math.max(18, width * 0.18));
  const x = away === 1 ? mat.r - inset : mat.l + inset;
  // Feet rest on the front edge of the painted mattress, not the floor or the footboard.
  const y = mat.b - 2;
  return { x, y, away };
}

/**
 * Slots at the foot, in room units, for the painted nap/sleep bodies
 * (cat ~116×66, house dog ~70×54). x is along the bed (positive = past the
 * foot / off the mattress); y is down the screen. Both stay on the mattress,
 * on opposite sides of the foot so they miss the doll's face and each other.
 */
export const FOOT_SLOTS: { x: number; y: number }[] = [
  { x: -4, y: -54 },   // near the foot, toward the wall (far side of the mattress)
  { x: -24, y: 6 },    // the other side, toward the front edge, still on the mattress
];

/** Painted body of a pet curled at the foot, at the same scale as the 150×128 / 92×71 boxes. */
export const FOOT_BODY: Record<string, { w: number; h: number }> = {
  cat: { w: 116, h: 66 },
  dog: { w: 70, h: 54 },
};

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

/** True when a pet's painted body is sitting on the mattress (feet on it, not just overlapping the headboard). */
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
