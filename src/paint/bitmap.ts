// Pure drawing core for the Art Studio. No DOM. Every tool is a plain op on a palette-indexed bitmap,
// so a later slice can replay the same ops from a friend (stroke sync) and get the same pixels.
import { PAINT_W, PAINT_H, PAINT_MAX, encodePaint, decodePaint } from '../shared/paint';

/** A stamp shape: palette indexes, 255 = see-through. */
export interface StampMask { w: number; h: number; px: Uint8Array }
export type PaintOp =
  | { k: 'line'; x0: number; y0: number; x1: number; y1: number; r: number; c: number }
  | { k: 'fill'; x: number; y: number; c: number }
  | { k: 'stamp'; mask: StampMask; x: number; y: number }
  | { k: 'clear' };

export const CLEAR = 255;
export const UNDO_STEPS = 12;

export class Bitmap {
  readonly w = PAINT_W; readonly h = PAINT_H;
  px: Uint8Array;
  private undo: Uint8Array[] = [];
  constructor(data?: string | null) { this.px = decodePaint(data ?? null); }

  /** Call once at the start of each stroke, fill, stamp, or clear. */
  checkpoint() { this.undo.push(this.px.slice()); if (this.undo.length > UNDO_STEPS) this.undo.shift(); }
  canUndo() { return this.undo.length > 0; }
  undoStep(): boolean { const p = this.undo.pop(); if (!p) return false; this.px = p; return true; }

  apply(op: PaintOp) {
    switch (op.k) {
      case 'line': this.line(op.x0, op.y0, op.x1, op.y1, op.r, op.c); break;
      case 'fill': this.fill(op.x, op.y, op.c); break;
      case 'stamp': this.stamp(op.mask, op.x, op.y); break;
      case 'clear': this.px.fill(0); break;
    }
  }
  dot(cx: number, cy: number, r: number, c: number) {
    const rr = Math.max(0.5, r), r2 = rr * rr;
    const x0 = Math.max(0, Math.floor(cx - rr)), x1 = Math.min(this.w - 1, Math.ceil(cx + rr));
    const y0 = Math.max(0, Math.floor(cy - rr)), y1 = Math.min(this.h - 1, Math.ceil(cy + rr));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const dx = x + 0.5 - cx, dy = y + 0.5 - cy;
      if (dx * dx + dy * dy <= r2) this.px[y * this.w + x] = c;
    }
  }
  line(x0: number, y0: number, x1: number, y1: number, r: number, c: number) {
    const d = Math.hypot(x1 - x0, y1 - y0), step = Math.max(0.5, r / 2), n = Math.max(1, Math.ceil(d / step));
    for (let i = 0; i <= n; i++) this.dot(x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n, r, c);
  }
  /** Scanline flood fill of the touched color region. */
  fill(sx: number, sy: number, c: number) {
    const x = Math.floor(sx), y = Math.floor(sy);
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return;
    const { w, h, px } = this, from = px[y * w + x];
    if (from === c) return;
    const stack = [x, y];
    while (stack.length) {
      const py = stack.pop()!, pxx = stack.pop()!;
      let lx = pxx; while (lx > 0 && px[py * w + lx - 1] === from) lx--;
      let rx = pxx; while (rx < w - 1 && px[py * w + rx + 1] === from) rx++;
      for (let i = lx; i <= rx; i++) {
        px[py * w + i] = c;
        if (py > 0 && px[(py - 1) * w + i] === from && (i === lx || px[(py - 1) * w + i - 1] !== from)) stack.push(i, py - 1);
        if (py < h - 1 && px[(py + 1) * w + i] === from && (i === lx || px[(py + 1) * w + i - 1] !== from)) stack.push(i, py + 1);
      }
    }
  }
  stamp(m: StampMask, cx: number, cy: number) {
    const ox = Math.round(cx - m.w / 2), oy = Math.round(cy - m.h / 2);
    for (let y = 0; y < m.h; y++) for (let x = 0; x < m.w; x++) {
      const v = m.px[y * m.w + x]; if (v === CLEAR) continue;
      const tx = ox + x, ty = oy + y;
      if (tx >= 0 && ty >= 0 && tx < this.w && ty < this.h) this.px[ty * this.w + tx] = v;
    }
  }
  /** Saved string, always under the cap. A very busy picture is gently smoothed until it fits (never refused). */
  save(): string {
    let data = encodePaint(this.px);
    let work = this.px;
    for (let pass = 0; data.length > PAINT_MAX && pass < 6; pass++) { work = smooth(work, this.w, this.h, 1 << pass); data = encodePaint(work); }
    if (data.length > PAINT_MAX) data = encodePaint(posterBlocks(work, this.w, this.h, 8));
    return data;
  }
}

/** Each row run shorter than `minRun` takes the color to its left: fewer runs, same picture from afar. */
function smooth(src: Uint8Array, w: number, h: number, minRun: number): Uint8Array {
  const out = src.slice();
  for (let y = 0; y < h; y++) {
    let x = 0;
    while (x < w) {
      const c = out[y * w + x]; let n = 1;
      while (x + n < w && out[y * w + x + n] === c) n++;
      if (n <= minRun && x > 0) out.fill(out[y * w + x - 1], y * w + x, y * w + x + n);
      x += n;
    }
  }
  return out;
}
function posterBlocks(src: Uint8Array, w: number, h: number, b: number): Uint8Array {
  const out = new Uint8Array(src.length);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) out[y * w + x] = src[Math.floor(y / b) * b * w + Math.floor(x / b) * b];
  return out;
}

/** Nearest palette index for an RGB color. */
export function nearestIndex(r: number, g: number, b: number, palette: readonly string[]): number {
  let best = 0, bd = Infinity;
  palette.forEach((hex, i) => {
    const pr = parseInt(hex.slice(1, 3), 16), pg = parseInt(hex.slice(3, 5), 16), pb = parseInt(hex.slice(5, 7), 16);
    const d = (pr - r) ** 2 * 2 + (pg - g) ** 2 * 4 + (pb - b) ** 2 * 3;
    if (d < bd) { bd = d; best = i; }
  });
  return best;
}
