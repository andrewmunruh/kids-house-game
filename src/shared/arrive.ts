/** Visitors arrive apart: pick a floor spot near `want` that is clear of everyone already in the room.
 *  Pure and client-side only; nothing new goes on the wire (save v3 / protocol 4 unchanged). */
export const ARRIVE_GAP = 150;
export interface Spot { x: number; y: number }
export function arriveSpot(want: Spot, others: Spot[], opts: { minX: number; maxX: number; minY: number; maxY: number; gap?: number }): Spot {
  const gap = opts.gap ?? ARRIVE_GAP;
  const y = Math.max(opts.minY, Math.min(opts.maxY, want.y));
  const clampX = (x: number) => Math.max(opts.minX, Math.min(opts.maxX, x));
  const clear = (x: number) => others.every(o => Math.abs(o.x - x) >= gap || Math.abs(o.y - y) >= gap * .6);
  for (let i = 0; i <= 12; i++) {
    for (const s of i ? [1, -1] : [1]) {
      const x = clampX(want.x + s * i * gap * .6);
      if (clear(x)) return { x, y };
    }
  }
  return { x: clampX(want.x), y };
}
