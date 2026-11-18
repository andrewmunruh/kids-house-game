// B17-r2 prototype: picnic table scale options. Switch with ?picnic=1.5x|2x|2x-in
// or applyPicnicOpt(). The branch default is the recommended option. Uniform
// scale only; the painted view-box stays 0 0 160 100 (no stretch, no repaint).
// Seat fractions stay in this module so sit.ts and yard.ts stay in sync.

export type PicnicOpt = '1.5x' | '2x' | '2x-in';

export const PICNIC_OPTS: Record<PicnicOpt, { w: number; h: number; dx: number; dy: number }> = {
  '1.5x': { w: 270, h: 165, dx: 0.33, dy: 0.22 },
  '2x': { w: 360, h: 220, dx: 0.33, dy: 0.22 },
  // 2× box with sitters pulled in so they share the tabletop. 0.24 is inside
  // the requested ±0.22–0.25 band; a later pass may retune after the frames.
  '2x-in': { w: 360, h: 220, dx: 0.24, dy: 0.22 },
};

/** Recommended default for this branch. Runtime may override on the client only. */
export const PICNIC_DEFAULT: PicnicOpt = '2x-in';

let current: PicnicOpt = PICNIC_DEFAULT;

export function picnicOpt(): PicnicOpt { return current; }
export function picnicBox(): { w: number; h: number; dx: number; dy: number } { return PICNIC_OPTS[current]; }

export function isPicnicOpt(v: string | null | undefined): v is PicnicOpt {
  return !!v && Object.prototype.hasOwnProperty.call(PICNIC_OPTS, v);
}

export function picnicOptFromSearch(search: string): PicnicOpt | null {
  try {
    const v = new URLSearchParams(search.startsWith('?') ? search : `?${search}`).get('picnic');
    return isPicnicOpt(v) ? v : null;
  } catch {
    return null;
  }
}

/** Apply an option. When a catalog map is passed, the picnic-table box is patched in place. */
export function applyPicnicOpt(opt: PicnicOpt, map?: Record<string, { w: number; h?: number }>): void {
  current = opt;
  const box = PICNIC_OPTS[opt];
  const def = map && map['picnic-table'];
  if (def) { def.w = box.w; def.h = box.h; }
}

/** Prototype-only: retune 2x-in dx (clamped to the 0.22–0.25 review band). */
export function setPicnicInDx(dx: number): number {
  const v = Math.max(0.22, Math.min(0.25, dx));
  PICNIC_OPTS['2x-in'] = { ...PICNIC_OPTS['2x-in'], dx: v };
  return v;
}
