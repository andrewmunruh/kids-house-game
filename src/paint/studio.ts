// Art Studio screen: a thin touch UI over the pure Bitmap core. Finger and Apple Pencil via pointer events.
import { Bitmap, CLEAR, nearestIndex, type StampMask } from './bitmap';
import { PALETTE, PAINT_W, PAINT_H, FRAMES } from '../shared/paint';
import { toImageData, framedSvg } from './gallery';

export interface StampSrc { name: string; svg: string }
export interface StudioOpts { stamps: StampSrc[]; onSave(data: string, frame: number): void; onClose?(): void; sfx?: { click(): void; pop?(): void } }

type Tool = 'brush' | 'fill' | 'eraser' | 'stamp';
const SIZES = [2, 4, 8, 14];            // brush radius in painting pixels
const STAMP_PX = [24, 34, 46, 60];      // stamp box per size step
const ICON: Record<Tool, string> = {
  brush: '<svg viewBox="0 0 40 40"><path d="M26 6 L34 14 L18 30 L10 22 Z" fill="#ffd43b" stroke="#5a3d5c" stroke-width="2.5" stroke-linejoin="round"/><path d="M10 22 L18 30 Q12 36 5 35 Q4 28 10 22 Z" fill="#ff6b6b" stroke="#5a3d5c" stroke-width="2.5" stroke-linejoin="round"/></svg>',
  fill: '<svg viewBox="0 0 40 40"><path d="M8 18 L20 6 L32 18 L20 30 Z" fill="#bde0fe" stroke="#5a3d5c" stroke-width="2.5" stroke-linejoin="round"/><path d="M32 22 Q36 28 32 32 Q28 28 32 22 Z" fill="#4dabf7" stroke="#5a3d5c" stroke-width="2"/></svg>',
  eraser: '<svg viewBox="0 0 40 40"><rect x="8" y="12" width="24" height="16" rx="4" fill="#ffc8dd" stroke="#5a3d5c" stroke-width="2.5" transform="rotate(-30 20 20)"/><path d="M8 34 H32" stroke="#5a3d5c" stroke-width="2.5" stroke-linecap="round"/></svg>',
  stamp: '<svg viewBox="0 0 40 40"><path d="M20 33 C13 27 5 22 8 14 C11 7 20 10 20 16 C20 10 29 7 32 14 C35 22 27 27 20 33 Z" fill="#ff8fab" stroke="#5a3d5c" stroke-width="2.5"/></svg>',
};
const UNDO = '<svg viewBox="0 0 40 40"><path d="M14 10 L6 18 L14 26" fill="none" stroke="#5a3d5c" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 18 H24 Q34 18 34 26 Q34 33 24 33 H18" fill="none" stroke="#5a3d5c" stroke-width="3.5" stroke-linecap="round"/></svg>';
const CLEAR_ICO = '<svg viewBox="0 0 40 40"><rect x="7" y="7" width="26" height="26" rx="5" fill="#fff" stroke="#5a3d5c" stroke-width="2.5"/><path d="M12 28 L28 12" stroke="#ff8fab" stroke-width="3" stroke-linecap="round"/><circle cx="31" cy="9" r="3" fill="#ffd43b"/></svg>';

const maskCache = new Map<string, StampMask>();
async function stampMask(src: StampSrc, box: number): Promise<StampMask | null> {
  const key = src.name + ':' + box; const hit = maskCache.get(key); if (hit) return hit;
  const svg = src.svg.includes('xmlns') ? src.svg : src.svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
  const img = new Image(); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  try { await img.decode(); } catch { return null; }
  const cv = document.createElement('canvas'); cv.width = box; cv.height = box;
  const ctx = cv.getContext('2d', { willReadFrequently: true }); if (!ctx) return null;
  ctx.drawImage(img, 0, 0, box, box);
  const d = ctx.getImageData(0, 0, box, box).data, px = new Uint8Array(box * box);
  for (let i = 0; i < px.length; i++) px[i] = d[i * 4 + 3] < 140 ? CLEAR : nearestIndex(d[i * 4], d[i * 4 + 1], d[i * 4 + 2], PALETTE);
  const m = { w: box, h: box, px }; maskCache.set(key, m); return m;
}

let openEl: HTMLElement | null = null;
export const studioOpen = () => !!openEl;

export function openStudio(o: StudioOpts) {
  if (openEl) return;
  const bm = new Bitmap();
  let tool: Tool = 'brush', color = 2, size = 1, stamp = 0, frame = 0;
  const root = document.createElement('div');
  root.className = 'studio'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-label', 'Art Studio');
  root.innerHTML = `<div class="stuCard">
    <div class="stuHead"><h2>Art Studio</h2><button type="button" class="stuX" aria-label="Close">✕</button></div>
    <div class="stuBody">
      <div class="stuPaper"><canvas width="${PAINT_W}" height="${PAINT_H}" aria-label="Drawing paper"></canvas></div>
      <div class="stuSide">
        <div class="stuRow stuTools">${(Object.keys(ICON) as Tool[]).map(t => `<button type="button" class="stuTool" data-tool="${t}" aria-label="${t === 'fill' ? 'Fill' : t[0].toUpperCase() + t.slice(1)}">${ICON[t]}</button>`).join('')}
          <button type="button" class="stuTool stuUndo" aria-label="Undo">${UNDO}</button><button type="button" class="stuTool stuClear" aria-label="Clear">${CLEAR_ICO}</button></div>
        <div class="stuRow stuSizes">${SIZES.map((s, i) => `<button type="button" class="stuSize" data-size="${i}" aria-label="Size ${i + 1}"><i style="width:${6 + s * 1.6}px;height:${6 + s * 1.6}px"></i></button>`).join('')}</div>
        <div class="stuColors">${PALETTE.map((c, i) => `<button type="button" class="stuColor" data-color="${i}" aria-label="Color ${i + 1}" style="background:${c}"></button>`).join('')}</div>
        <div class="stuStamps">${o.stamps.map((s, i) => `<button type="button" class="stuStamp" data-stamp="${i}" aria-label="${s.name}">${s.svg}</button>`).join('')}</div>
        <div class="stuRow stuFrames">${FRAMES.map((f, i) => `<button type="button" class="stuFrame" data-frame="${i}" aria-label="${f} frame">${framedSvg(i, null)}</button>`).join('')}</div>
        <button type="button" class="stuHang">Hang it up!</button>
      </div>
    </div></div>`;
  document.body.appendChild(root); openEl = root;
  const cv = root.querySelector('canvas')!, ctx = cv.getContext('2d')!, img = ctx.createImageData(PAINT_W, PAINT_H);
  const paint = () => { toImageData(bm.px, img); ctx.putImageData(img, 0, 0); };
  const sync = () => {
    root.querySelectorAll<HTMLElement>('.stuTool[data-tool]').forEach(b => b.classList.toggle('on', b.dataset.tool === tool));
    root.querySelectorAll<HTMLElement>('.stuSize').forEach(b => b.classList.toggle('on', Number(b.dataset.size) === size));
    root.querySelectorAll<HTMLElement>('.stuColor').forEach(b => b.classList.toggle('on', Number(b.dataset.color) === color));
    root.querySelectorAll<HTMLElement>('.stuStamp').forEach(b => b.classList.toggle('on', Number(b.dataset.stamp) === stamp));
    root.querySelectorAll<HTMLElement>('.stuFrame').forEach(b => b.classList.toggle('on', Number(b.dataset.frame) === frame));
    root.classList.toggle('stamping', tool === 'stamp');
    root.querySelector<HTMLButtonElement>('.stuUndo')!.disabled = !bm.canUndo();
  };
  paint(); sync();
  const close = () => { root.remove(); openEl = null; o.onClose?.(); };
  root.addEventListener('click', e => {
    const t = (e.target as HTMLElement).closest<HTMLElement>('button'); if (!t) return;
    o.sfx?.click();
    if (t.classList.contains('stuX')) { close(); return; }
    if (t.dataset.tool) tool = t.dataset.tool as Tool;
    else if (t.dataset.size) size = Number(t.dataset.size);
    else if (t.dataset.color) { color = Number(t.dataset.color); if (tool === 'eraser' || tool === 'stamp') tool = 'brush'; }
    else if (t.dataset.stamp) { stamp = Number(t.dataset.stamp); tool = 'stamp'; }
    else if (t.dataset.frame) frame = Number(t.dataset.frame);
    else if (t.classList.contains('stuUndo')) { if (bm.undoStep()) paint(); }
    else if (t.classList.contains('stuClear')) { bm.checkpoint(); bm.apply({ k: 'clear' }); paint(); }
    else if (t.classList.contains('stuHang')) { const data = bm.save(); close(); o.onSave(data, frame); return; }
    sync();
  });
  // Drawing: one pointer at a time (a resting palm or second finger is ignored).
  let active = -1, last: { x: number; y: number } | null = null;
  const at = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * PAINT_W / r.width, y: (e.clientY - r.top) * PAINT_H / r.height }; };
  cv.addEventListener('pointerdown', e => {
    e.preventDefault();
    if (active !== -1) return;
    const p = at(e);
    if (tool === 'fill') { bm.checkpoint(); bm.apply({ k: 'fill', x: p.x, y: p.y, c: color }); paint(); sync(); o.sfx?.pop?.(); return; }
    if (tool === 'stamp') {
      const src = o.stamps[stamp]; if (!src) return;
      void stampMask(src, STAMP_PX[size]).then(m => { if (!m || !openEl) return; bm.checkpoint(); bm.apply({ k: 'stamp', mask: m, x: p.x, y: p.y }); paint(); sync(); o.sfx?.pop?.(); });
      return;
    }
    active = e.pointerId; try { cv.setPointerCapture(e.pointerId); } catch { /* fine */ }
    bm.checkpoint(); last = p;
    bm.apply({ k: 'line', x0: p.x, y0: p.y, x1: p.x, y1: p.y, r: SIZES[size], c: tool === 'eraser' ? 0 : color }); paint();
  });
  cv.addEventListener('pointermove', e => {
    if (e.pointerId !== active || !last) return;
    const evs = typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : [];
    for (const ev of evs.length ? evs : [e]) {
      const p = at(ev);
      bm.apply({ k: 'line', x0: last.x, y0: last.y, x1: p.x, y1: p.y, r: SIZES[size], c: tool === 'eraser' ? 0 : color }); last = p;
    }
    paint();
  });
  const end = (e: PointerEvent) => { if (e.pointerId !== active) return; active = -1; last = null; sync(); };
  cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
  // Warm the first stamps so the first tap feels instant.
  o.stamps.slice(0, 3).forEach(s => void stampMask(s, STAMP_PX[1]));
}

/** Tap a hung painting in Play: big view, tap anywhere to close. */
export function zoomPainting(svg: string) {
  const z = document.createElement('div');
  z.className = 'paintZoom'; z.setAttribute('role', 'dialog'); z.setAttribute('aria-label', 'Painting');
  z.innerHTML = `<div class="pzInner">${svg}</div>`;
  z.addEventListener('pointerup', () => z.remove());
  document.body.appendChild(z);
}
