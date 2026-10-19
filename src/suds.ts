// Bath bubbles. They spawn in the water at her sides and on the back rim, then
// rise and drift outward on a straight line. A straight line stays out of her
// head when both ends are on the same side of it and the sideways motion only
// moves further out. The size does not change, so the bubble never grows into her.

export interface Box { l: number; t: number; w: number; h: number }
export interface Rect { l: number; t: number; r: number; b: number }
export interface Sud {
  x0: number; y0: number; x1: number; y1: number;
  s: number; color: string; delay: number;
}

const COLORS = ['#ffb7d5', '#9fd4ee', '#b7ebc8', '#ffe08a', '#c9b6f2', '#ffd6e4', '#ffffff', '#d7f3ff'];
const DELAYS = [0, 0.05, 0.1, 0.03, 0.08, 0.12, 0.02, 0.06];
const GAP = 8;

/** Hair and ears included. Four percent in from each side, eight percent above the sprite, down to the chin. */
export function headBox(kid: Box): Rect {
  return {
    l: kid.l + kid.w * 0.04,
    r: kid.l + kid.w * 0.96,
    t: kid.t - kid.h * 0.08,
    b: kid.t + kid.h * 0.5,
  };
}

export function bubbleSize(fixtureW: number): number {
  const raw = fixtureW * 0.12;
  if (raw < 16) return 16;
  if (raw > 36) return 36;
  return Math.round(raw);
}

/** Just in front of the fixture, still behind the kid (she paints near 5500). */
export function sudsZ(itemZ: number): number {
  return itemZ + 1;
}

export function sudRect(sud: Sud, t: number): Rect {
  const x = sud.x0 + (sud.x1 - sud.x0) * t;
  const y = sud.y0 + (sud.y1 - sud.y0) * t;
  const half = sud.s / 2;
  return { l: x - half, t: y - half, r: x + half, b: y + half };
}

/**
 * Every point on the flight misses the head, not only the sampled frames.
 * The bubble's box moves in a straight line at a constant size, so the whole
 * flight stays clear when the vertical slab misses, or when both ends sit
 * strictly on the same side. A path that starts on one side and ends on the
 * other is a cross and fails.
 */
export function pathMissesHead(sud: Sud, head: Rect): boolean {
  const a = sudRect(sud, 0);
  const b = sudRect(sud, 1);
  const top = a.t < b.t ? a.t : b.t;
  const bot = a.b > b.b ? a.b : b.b;
  if (bot <= head.t || top >= head.b) return true;
  const left = a.r <= head.l && b.r <= head.l;
  const right = a.l >= head.r && b.l >= head.r;
  return left || right;
}

function flightMisses(x0: number, y0: number, x1: number, y1: number, s: number, heads: Rect[]): boolean {
  const sud: Sud = { x0, y0, x1, y1, s, color: '', delay: 0 };
  for (let i = 0; i < heads.length; i++) if (!pathMissesHead(sud, heads[i])) return false;
  return true;
}

function anchorOf(tub: Box, heads: Rect[]): { l: number; r: number } {
  const tubR = tub.l + tub.w;
  let l = Infinity, r = -Infinity, n = 0;
  for (let i = 0; i < heads.length; i++) {
    const h = heads[i];
    if (h.r <= tub.l || h.l >= tubR) continue;
    if (h.l < l) l = h.l;
    if (h.r > r) r = h.r;
    n++;
  }
  if (!n) {
    const c = tub.l + tub.w / 2;
    return { l: c, r: c };
  }
  return { l, r };
}

function riseFor(h: number, back: boolean): number {
  const full = h * (back ? 0.45 : 0.75);
  const cap = back ? 80 : 130;
  return full < cap ? full : cap;
}

function placeColumn(dir: -1 | 1, limit: number, tub: Box, water: number, back: number, s: number, heads: Rect[]): { x: number; drift: number } | null {
  const want = Math.round(Math.max(16, s * 0.8));
  const waterY = tub.t + tub.h * water;
  const backY = tub.t + tub.h * back;
  const yW = waterY - riseFor(tub.h, false);
  const yB = backY - riseFor(tub.h, true);
  for (let shift = 0; shift <= 80; shift += 2) {
    const x = dir === -1 ? limit - s / 2 - shift : limit + s / 2 + shift;
    for (let drift = want; drift >= 8; drift -= 1) {
      const x1 = x + dir * drift;
      if (flightMisses(x, waterY, x1, yW, s, heads) && flightMisses(x, backY, x1, yB, s, heads)) return { x, drift };
    }
  }
  return null;
}

function fixtureSuds(tub: Box, kids: Box[], water: number, back: number): Sud[] {
  const s = bubbleSize(tub.w);
  const heads = kids.map(headBox);
  const anchor = anchorOf(tub, heads);
  const suds: Sud[] = [];
  const take = (x0: number, y0: number, x1: number, y1: number) => {
    const n = suds.length;
    suds.push({ x0, y0, x1, y1, s, color: COLORS[n % COLORS.length], delay: DELAYS[n % DELAYS.length] });
  };
  addSide(-1, anchor.l, tub, water, back, s, heads, take);
  addSide(1, anchor.r, tub, water, back, s, heads, take);
  return suds;
}

function addSide(dir: -1 | 1, edge: number, tub: Box, water: number, back: number, s: number, heads: Rect[], take: (x0: number, y0: number, x1: number, y1: number) => void) {
  let limit = dir === -1 ? edge - GAP : edge + GAP;
  const waterY = tub.t + tub.h * water;
  const backY = tub.t + tub.h * back;
  const waterRise = riseFor(tub.h, false);
  const backRise = riseFor(tub.h, true);
  for (let col = 0; col < 2; col++) {
    const placed = placeColumn(dir, limit, tub, water, back, s, heads);
    if (!placed) break;
    take(placed.x, waterY, placed.x + dir * placed.drift, waterY - waterRise);
    take(placed.x, backY, placed.x + dir * placed.drift, backY - backRise);
    limit = dir === -1 ? placed.x - s / 2 - 6 : placed.x + s / 2 + 6;
  }
}

/** Water line is the drawn ellipse (cy 80). Back rim is the top of the roll (y 40) in the 140-tall tub. */
export function tubSuds(tub: Box, kids: Box[]): Sud[] {
  return fixtureSuds(tub, kids, 80 / 140, 40 / 140);
}

/** Same side-and-outward rule for the stall, lower band at the tray and upper band by the rain head. */
export function showerSuds(stall: Box, kids: Box[]): Sud[] {
  return fixtureSuds(stall, kids, 0.72, 0.40);
}
