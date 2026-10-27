// Hung paintings: a small client cache of bitmaps by art id, the frame art (drawn in code so it is the
// same on every iPad), and the PNG data URL a frame shows. Nothing here talks to the network directly.
import { PALETTE, PAINT_W, PAINT_H, PAINT_PER_HOUSE, FRAMES, cleanPaintData, cleanArtId, decodePaint } from '../shared/paint';
import { storeKey } from '../shared/storekey';

const O = '#5a3d5c';
const cache = new Map<string, string>();      // id -> data
const urls = new Map<string, string>();       // id -> png data URL
const LOCAL_KEY = storeKey('cozy-art');

/** Offline house: paintings live in this iPad's storage, next to the save. */
export function loadLocalArt() {
  try {
    const raw = JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '{}');
    if (raw && typeof raw === 'object') for (const [id, d] of Object.entries(raw)) if (cleanArtId(id) && cleanPaintData(d)) cache.set(id, d as string);
  } catch { /* a broken entry is simply blank paper */ }
}
/** Keep the newest paintings that are still hung (plus this one), at most PAINT_PER_HOUSE. */
export function saveLocalArt(id: string, data: string, hung: Set<string>) {
  cache.set(id, data);
  let raw: Record<string, string> = {};
  try { raw = JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '{}') || {}; } catch { raw = {}; }
  raw[id] = data;
  const keys = Object.keys(raw);
  if (keys.length > PAINT_PER_HOUSE) for (const k of keys) if (k !== id && !hung.has(k) && Object.keys(raw).length > PAINT_PER_HOUSE) delete raw[k];
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(raw)); } catch { /* storage full: still shows this session */ }
}
export function hasArt(id: string) { return cache.has(id); }
export function putArt(id: string, data: string) {
  if (!cleanArtId(id) || !cleanPaintData(data)) return;
  if (cache.get(id) !== data) { cache.set(id, data); urls.delete(id); }
}
export function artData(id: string) { return cache.get(id) ?? null; }

const RGB = PALETTE.map(h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]);
/** Paint palette indexes into RGBA. */
export function toImageData(px: Uint8Array, img: ImageData) {
  const d = img.data;
  for (let i = 0; i < px.length; i++) { const c = RGB[px[i] & 15]; d[i * 4] = c[0]; d[i * 4 + 1] = c[1]; d[i * 4 + 2] = c[2]; d[i * 4 + 3] = 255; }
}
export function artUrl(id: string): string | null {
  const hit = urls.get(id); if (hit) return hit;
  const data = cache.get(id); if (!data) return null;
  const cv = document.createElement('canvas'); cv.width = PAINT_W; cv.height = PAINT_H;
  const ctx = cv.getContext('2d'); if (!ctx) return null;
  const img = ctx.createImageData(PAINT_W, PAINT_H); toImageData(decodePaint(data), img); ctx.putImageData(img, 0, 0);
  const url = cv.toDataURL('image/png'); urls.set(id, url); return url;
}

/** Frame + painting, viewBox 0 0 100 100 (the picture footprint). No url = soft paper placeholder. */
export function framedSvg(frame: number, url: string | null): string {
  const f = FRAMES[frame] ?? 'wood';
  const st = `stroke="${O}" stroke-width="3" stroke-linejoin="round"`;
  let body = '';
  if (f === 'wood') body = `<rect x="6" y="18" width="88" height="70" rx="6" fill="#c9905a" ${st}/><path d="M10 24 H90 M10 82 H90" stroke="#a86f3e" stroke-width="1.6" opacity=".7"/>`;
  else if (f === 'plum') body = `<rect x="6" y="18" width="88" height="70" rx="8" fill="#9a6fc0" ${st}/><rect x="9" y="21" width="82" height="64" rx="6" fill="none" stroke="#d7c0ef" stroke-width="1.6"/>`;
  else if (f === 'gold') body = `<rect x="6" y="18" width="88" height="70" rx="5" fill="#f2c14e" ${st}/>${[14, 32, 50, 68, 86].map(x => `<circle cx="${x}" cy="21.5" r="1.6" fill="#fff3b0"/><circle cx="${x}" cy="84.5" r="1.6" fill="#fff3b0"/>`).join('')}`;
  else body = `<rect x="6" y="18" width="88" height="70" rx="7" fill="#ff6b6b" ${st}/>${['#ffa94d', '#ffd43b', '#69db7c', '#4dabf7', '#b388d6'].map((c, i) => `<rect x="${7.5 + i * 1.1}" y="${19.5 + i * 1.1}" width="${85 - i * 2.2}" height="${67 - i * 2.2}" rx="6" fill="none" stroke="${c}" stroke-width="1.3"/>`).join('')}`;
  const pic = url
    ? `<image href="${url}" x="13" y="25" width="74" height="55.5" preserveAspectRatio="none"/>`
    : `<rect x="13" y="25" width="74" height="55.5" fill="#fff6ea"/><circle cx="40" cy="50" r="5" fill="#ffc8dd"/><circle cx="55" cy="56" r="4" fill="#bde0fe"/><circle cx="62" cy="44" r="3.5" fill="#fff3b0"/>`;
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M38 18 L50 7 L62 18" fill="none" stroke="${O}" stroke-width="2"/><circle cx="50" cy="7" r="2.4" fill="${O}"/>${body}${pic}<rect x="13" y="25" width="74" height="55.5" fill="none" stroke="${O}" stroke-width="1.6"/></svg>`;
}
