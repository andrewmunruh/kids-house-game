// Day and night. The choice lives on this device only (localStorage), never in the house save.
// Auto follows the local clock: dawn, day, golden evening, night, with a smooth blend between them.

export type SkyChoice = 'day' | 'night' | 'auto';
export type SkyPhase = 'dawn' | 'day' | 'golden' | 'night';

/** One moment of the sky. Colours are hex so the clock can blend them. */
export interface SkyLook {
  phase: SkyPhase;
  /** Room veil. Night multiplies toward indigo. Golden is a normal blend of about 18% peach, closer to day than to night. */
  opacity: number;
  /** Map veil. Stronger than the room: day grass is bright, and night has to turn it blue-green. */
  map: number;
  /** 0..1 warm light from windows, lamps, string lights, night-lights, and TVs. */
  glow: number;
  /** 0..1 stars, the moon, and fireflies on the neighborhood map. */
  stars: number;
  /** 0..1 night-sky plate over room windows. 0 leaves the painted day sky alone. */
  glass: number;
  tint: string;
  body: string;
  pageA: string;
  pageB: string;
  spot: string;
  fieldA: string;
  fieldB: string;
  win: string;
  win2: string;
  house: string;
  /** Multiply (night) or wash (golden) laid over the map ground and trees. */
  mapTint: string;
}

/** New key. Not `cozy-house`, and not sent to the street. */
export const SKY_KEY = 'cozy-sky';

interface Tone {
  tint: string; body: string; pageA: string; pageB: string; spot: string;
  fieldA: string; fieldB: string; win: string; win2: string; house: string; mapTint: string;
}
interface Stop extends Tone {
  m: number; opacity: number; map: number; glow: number; stars: number; glass: number; phase: SkyPhase;
}

const DAY_T: Tone = {
  tint: '#fff6e4', body: '#ffe9f0', pageA: '#ffe0ec', pageB: '#e6ddff', spot: '#fff6fa',
  fieldA: '#c9f2c7', fieldB: '#8fd18a', win: '#a2d2ff', win2: '#b9e3ff', house: '#fff3b0', mapTint: '#ffffff',
};
const DAWN_T: Tone = {
  tint: '#e7b4cc', body: '#f6dce8', pageA: '#ffd0e6', pageB: '#e6d2f8', spot: '#fff0f6',
  fieldA: '#f6d0e2', fieldB: '#dcc8f0', win: '#f6c6de', win2: '#e4d0f8', house: '#ffe0ee', mapTint: '#f3c4dc',
};
const GOLD_T: Tone = {
  // A soft peach. The room lays this on with a normal blend near 18%, so pink walls stay pink.
  tint: '#ffb38a', body: '#ffe4dc', pageA: '#ffe0d6', pageB: '#f0d8ea', spot: '#fff6ee',
  fieldA: '#d4eec4', fieldB: '#a3cb8a', win: '#ffc48a', win2: '#ffd4b0', house: '#ffc56a', mapTint: '#ffb38a',
};
const NIGHT_T: Tone = {
  tint: '#2a2350', body: '#14182c', pageA: '#1c1748', pageB: '#101832', spot: '#2c2458',
  fieldA: '#1a2458', fieldB: '#0c1028', win: '#1a245c', win2: '#12183a', house: '#ffe9a0', mapTint: '#102044',
};

// Minutes from midnight. Neighbours blend so dawn and dusk ease in instead of popping.
const STOPS: Stop[] = [
  { m: 0, opacity: 0.70, map: 0.78, glow: 1, stars: 1, glass: 1, phase: 'night', ...NIGHT_T },
  { m: 5 * 60, opacity: 0.70, map: 0.78, glow: 0.95, stars: 0.95, glass: 1, phase: 'night', ...NIGHT_T },
  { m: 5 * 60 + 35, opacity: 0.42, map: 0.34, glow: 0.55, stars: 0.42, glass: 0.8, phase: 'dawn', ...DAWN_T },
  { m: 6 * 60 + 25, opacity: 0.14, map: 0.16, glow: 0.28, stars: 0.08, glass: 0.9, phase: 'dawn', ...DAWN_T },
  { m: 7 * 60 + 15, opacity: 0, map: 0, glow: 0, stars: 0, glass: 0, phase: 'day', ...DAY_T },
  { m: 16 * 60 + 15, opacity: 0, map: 0, glow: 0, stars: 0, glass: 0, phase: 'day', ...DAY_T },
  { m: 17 * 60 + 5, opacity: 0.08, map: 0.10, glow: 0.40, stars: 0.02, glass: 0.55, phase: 'golden', ...GOLD_T },
  { m: 18 * 60 + 10, opacity: 0.18, map: 0.20, glow: 0.62, stars: 0.06, glass: 0.82, phase: 'golden', ...GOLD_T },
  { m: 19 * 60 + 5, opacity: 0.52, map: 0.68, glow: 0.9, stars: 0.55, glass: 1, phase: 'night', ...NIGHT_T },
  { m: 20 * 60 + 10, opacity: 0.70, map: 0.78, glow: 1, stars: 1, glass: 1, phase: 'night', ...NIGHT_T },
  { m: 24 * 60, opacity: 0.70, map: 0.78, glow: 1, stars: 1, glass: 1, phase: 'night', ...NIGHT_T },
];

const DAY: SkyLook = { phase: 'day', opacity: 0, map: 0, glow: 0, stars: 0, glass: 0, ...DAY_T };
const NIGHT: SkyLook = { phase: 'night', opacity: 0.70, map: 0.78, glow: 1, stars: 1, glass: 1, ...NIGHT_T };

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
  const phase = t < 0.5 ? a.phase : b.phase;
  return {
    phase,
    opacity: lerp(a.opacity, b.opacity, t),
    map: lerp(a.map, b.map, t),
    glow: lerp(a.glow, b.glow, t),
    stars: lerp(a.stars, b.stars, t),
    glass: lerp(a.glass, b.glass, t),
    tint: mixHex(a.tint, b.tint, t),
    body: mixHex(a.body, b.body, t),
    pageA: mixHex(a.pageA, b.pageA, t),
    pageB: mixHex(a.pageB, b.pageB, t),
    spot: mixHex(a.spot, b.spot, t),
    fieldA: mixHex(a.fieldA, b.fieldA, t),
    fieldB: mixHex(a.fieldB, b.fieldB, t),
    win: mixHex(a.win, b.win, t),
    win2: mixHex(a.win2, b.win2, t),
    house: mixHex(a.house, b.house, t),
    mapTint: mixHex(a.mapTint, b.mapTint, t),
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
 * Lamps, string lights, night-lights, windows, and the TV.
 * `flagged` is the pack tag `lighting`. Kind names cover the built-ins plus pack slugs.
 * A TV stand is not a screen, so the slug has to be the kind `tv` itself.
 */
export function isLightKind(kind: string, flagged = false): boolean {
  if (flagged) return true;
  return kind === 'lamp' || kind === 'window' || kind === 'stars' || kind === 'tv'
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
