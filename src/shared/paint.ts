// Art Studio shared rules: palette, bitmap codec, and the checks the Worker runs on a painting.
// A painting is a small palette-indexed bitmap. The Worker never decodes it: it checks the header,
// the charset and the length, then stores it as an opaque string. Clients only ever draw it onto a canvas.

/** Painting size in pixels (4:3, like the picture frame). */
export const PAINT_W = 256, PAINT_H = 192;
/** 16 kid colors. Index 0 is the white paper. Fixed forever: a saved index always means the same color. */
export const PALETTE = [
  '#ffffff', '#5a3d5c', '#ff6b6b', '#ff8fab', '#ffa94d', '#ffd43b', '#69db7c', '#2f9e44',
  '#4dabf7', '#1c5fb8', '#b388d6', '#7048b6', '#c9905a', '#7a4b2a', '#ced4da', '#212529',
] as const;
/** Hard cap on one painting's stored string (header + base64). */
export const PAINT_MAX = 8000;
/** Paintings kept per house. Unhung ones are cleared first when a new one needs room. */
export const PAINT_PER_HOUSE = 12;
/** Frame styles: wood, plum, gold, rainbow. */
export const FRAMES = ['wood', 'plum', 'gold', 'rainbow'] as const;
export const ART_ID_RE = /^a[0-9a-z]{6,24}$/;
const DATA_RE = /^P1[A-Za-z0-9+/]+={0,2}$/;

/** Opaque blob check, the only thing the Worker runs. Never decodes or evaluates the data. */
export function cleanPaintData(raw: unknown): string | null {
  if (typeof raw !== 'string' || raw.length < 4 || raw.length > PAINT_MAX) return null;
  if (!DATA_RE.test(raw) || (raw.length - 2) % 4 !== 0) return null;
  return raw;
}
export function cleanArtId(raw: unknown): string | null {
  return typeof raw === 'string' && ART_ID_RE.test(raw) ? raw : null;
}
export function cleanFrame(raw: unknown): number {
  return typeof raw === 'number' && Number.isInteger(raw) && raw >= 0 && raw < FRAMES.length ? raw : 0;
}

// ---------- codec (client side) ----------
// Run-length bytes. b < 0x80: run (b>>4)+1 (1..8) of color b&15.
// b >= 0x80: run ((b>>4&7)<<8 | next)+9 (9..2056) of color b&15.
export function encodeRuns(px: Uint8Array): Uint8Array {
  const out: number[] = [];
  let i = 0;
  while (i < px.length) {
    const c = px[i] & 15; let n = 1;
    while (i + n < px.length && (px[i + n] & 15) === c && n < 2056) n++;
    if (n <= 8) out.push(((n - 1) << 4) | c);
    else { const r = n - 9; out.push(0x80 | ((r >> 8) << 4) | c, r & 255); }
    i += n;
  }
  return Uint8Array.from(out);
}
/** Never throws. Short data pads with paper; long data is cut. */
export function decodeRuns(bytes: Uint8Array, size = PAINT_W * PAINT_H): Uint8Array {
  const px = new Uint8Array(size);
  let p = 0;
  for (let i = 0; i < bytes.length && p < size; i++) {
    const b = bytes[i];
    let n: number;
    if (b < 0x80) n = (b >> 4) + 1;
    else { if (i + 1 >= bytes.length) break; n = ((((b >> 4) & 7) << 8) | bytes[++i]) + 9; }
    const end = Math.min(size, p + n); px.fill(b & 15, p, end); p = end;
  }
  return px;
}
const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
export function toB64(u: Uint8Array): string {
  let s = '';
  for (let i = 0; i < u.length; i += 3) {
    const a = u[i], b = u[i + 1], c = u[i + 2];
    s += B64[a >> 2] + B64[((a & 3) << 4) | ((b ?? 0) >> 4)] + (b === undefined ? '=' : B64[((b & 15) << 2) | ((c ?? 0) >> 6)]) + (c === undefined ? '=' : B64[c & 63]);
  }
  return s;
}
export function fromB64(s: string): Uint8Array {
  const clean = s.replace(/=+$/, '');
  const out: number[] = [];
  let buf = 0, bits = 0;
  for (const ch of clean) {
    const v = B64.indexOf(ch); if (v < 0) break;
    buf = (buf << 6) | v; bits += 6;
    if (bits >= 8) { bits -= 8; out.push((buf >> bits) & 255); }
  }
  return Uint8Array.from(out);
}
export const encodePaint = (px: Uint8Array) => 'P1' + toB64(encodeRuns(px));
/** A bad or missing string decodes to blank paper. */
export function decodePaint(data: string | null | undefined): Uint8Array {
  if (!data || !cleanPaintData(data)) return new Uint8Array(PAINT_W * PAINT_H);
  return decodeRuns(fromB64(data.slice(2)));
}
