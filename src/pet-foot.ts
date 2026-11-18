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

/** The foot of the mattress, opposite the pillow. Room units. */
export function bedFoot(item: BedFootItem): { x: number; y: number; away: 1 | -1 } | null {
  if (!isSleepBed(item.kind)) return null;
  const art = bedArt(item.kind);
  if (!art) return null;
  const sc = item.scale ?? 1;
  const w = pieceWidth(item.kind) * sc;
  const footFrac = Math.min(0.92, art.mattress.x + art.mattress.w + 0.08);
  const away: 1 | -1 = item.flip ? -1 : 1;
  const x = item.x + away * (footFrac - 0.5) * w;
  const h = item.h ?? w * 0.7;
  // A little above the painted foot, on the mattress rather than mid-air.
  const y = item.y - h * 0.16;
  return { x, y, away };
}

/**
 * Slots at the foot, in room units, for 150×128 (cat) and 92×71 (house dog) boxes.
 * Offsets go past the foot (away from the pillow) so they miss the doll's face,
 * and they are staggered in y so two pets do not overlap each other.
 */
export const FOOT_SLOTS: { x: number; y: number }[] = [
  { x: 18, y: -30 },  // on the mattress at the foot
  { x: 88, y: 92 },   // on the floor, further past the foot
];

export function petFootTargets(
  foot: { x: number; y: number; away: 1 | -1 },
  keys: readonly string[],
): Map<string, { x: number; y: number }> {
  const sorted = [...keys].sort();
  const out = new Map<string, { x: number; y: number }>();
  for (let i = 0; i < sorted.length; i++) {
    const s = FOOT_SLOTS[i] ?? { x: 88 + (i - 1) * 90, y: 92 };
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
