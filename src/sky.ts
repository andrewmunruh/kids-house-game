// Day and night. The choice lives on this device only (localStorage), never in the house save.
// Auto follows the local clock: dawn, day, golden evening, night, with a smooth blend between them.

export type SkyChoice = 'day' | 'night' | 'auto';
export type SkyPhase = 'dawn' | 'day' | 'golden' | 'night';

/** Veil strength, lamp glow, and star strength for one moment. */
export interface SkyLook {
  phase: SkyPhase;
  /** 0 hides the tint. Full cozy night stays under 0.4 so labels on the art stay readable. */
  opacity: number;
  /** 0..1 warm light from windows, lamps, and light furniture. */
  glow: number;
  /** 0..1 stars and fireflies on the street (the neighborhood map). */
  stars: number;
  tint: string;
}

/** New key. Not `cozy-house`, and not sent to the street. */
export const SKY_KEY = 'cozy-sky';

interface Stop { m: number; opacity: number; glow: number; stars: number; phase: SkyPhase; tint: string }

// Minutes from midnight. Neighbours blend so dawn and dusk ease in instead of popping.
const STOPS: Stop[] = [
  { m: 0, opacity: 0.30, glow: 1, stars: 1, phase: 'night', tint: '#322456' },
  { m: 5 * 60, opacity: 0.30, glow: 0.92, stars: 0.9, phase: 'night', tint: '#322456' },
  { m: 5 * 60 + 35, opacity: 0.22, glow: 0.55, stars: 0.45, phase: 'dawn', tint: '#6d4e86' },
  { m: 6 * 60 + 25, opacity: 0.16, glow: 0.28, stars: 0.06, phase: 'dawn', tint: '#f0b4c8' },
  { m: 7 * 60 + 15, opacity: 0, glow: 0, stars: 0, phase: 'day', tint: '#fff6e4' },
  { m: 16 * 60 + 15, opacity: 0, glow: 0, stars: 0, phase: 'day', tint: '#fff6e4' },
  { m: 17 * 60 + 5, opacity: 0.14, glow: 0.38, stars: 0, phase: 'golden', tint: '#ffb15c' },
  { m: 18 * 60 + 10, opacity: 0.22, glow: 0.66, stars: 0.1, phase: 'golden', tint: '#f0943a' },
  { m: 19 * 60 + 5, opacity: 0.26, glow: 0.88, stars: 0.55, phase: 'night', tint: '#5c457f' },
  { m: 20 * 60 + 10, opacity: 0.30, glow: 1, stars: 1, phase: 'night', tint: '#322456' },
  { m: 24 * 60, opacity: 0.30, glow: 1, stars: 1, phase: 'night', tint: '#322456' },
];

const DAY: SkyLook = { phase: 'day', opacity: 0, glow: 0, stars: 0, tint: '#fff6e4' };
const NIGHT: SkyLook = { phase: 'night', opacity: 0.30, glow: 1, stars: 1, tint: '#322456' };

function hex(c: string): [number, number, number] {
  const h = c.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function mixHex(a: string, b: string, t: number): string {
  const pa = hex(a), pb = hex(b);
  const n = (i: number) => Math.round(pa[i] + (pb[i] - pa[i]) * t).toString(16).padStart(2, '0');
  return '#' + n(0) + n(1) + n(2);
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Where the clock sits between two stops. `t` is 0 at the earlier stop. */
export function skyAuto(date: Date): SkyLook {
  const m = date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
  let i = 0;
  while (i < STOPS.length - 2 && m >= STOPS[i + 1].m) i++;
  const a = STOPS[i], b = STOPS[i + 1];
  const span = Math.max(1, b.m - a.m);
  const t = Math.max(0, Math.min(1, (m - a.m) / span));
  // Phase follows whichever side the blend has crossed.
  const phase = t < 0.5 ? a.phase : b.phase;
  return {
    phase,
    opacity: lerp(a.opacity, b.opacity, t),
    glow: lerp(a.glow, b.glow, t),
    stars: lerp(a.stars, b.stars, t),
    tint: mixHex(a.tint, b.tint, t),
  };
}

export function skyLook(date: Date, choice: SkyChoice): SkyLook {
  if (choice === 'day') return DAY;
  if (choice === 'night') return NIGHT;
  return skyAuto(date);
}

export function isSkyChoice(v: unknown): v is SkyChoice {
  return v === 'day' || v === 'night' || v === 'auto';
}

/**
 * Lamps, string lights, night-lights, windows. `flagged` is the pack tag `lighting`.
 * Kind names cover the built-in lamp and window, plus pack slugs, without a protocol field.
 */
export function isLightKind(kind: string, flagged = false): boolean {
  if (flagged) return true;
  return kind === 'lamp' || kind === 'window' || kind === 'stars'
    || /lamp|light|lantern|candle|string-lights|night-light/i.test(kind);
}

/** A tiny static tint: reduced motion, or a very small CPU / memory budget. iPad 10th gen stays on the live path. */
export function skyIsSimple(): boolean {
  try {
    if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  } catch { /* no window */ }
  if (typeof navigator === 'undefined') return false;
  const n = navigator.hardwareConcurrency;
  if (typeof n === 'number' && n > 0 && n <= 2) return true;
  const mem = (navigator as { deviceMemory?: number }).deviceMemory;
  if (typeof mem === 'number' && mem > 0 && mem <= 2) return true;
  return false;
}
