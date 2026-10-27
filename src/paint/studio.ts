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
  fill: '<svg viewBox="0 0 40 40"><path d="M7 15 L21 9 L27 23 L13 29 Z" fill="#fff" stroke="#5a3d5c" stroke-width="2.5" stroke-linejoin="round"/><path d="M7 15 Q14 19 21 9" fill="#4dabf7" stroke="#5a3d5c" stroke-width="2"/><path d="M8 16 Q3 24 6 34 Q12 34 11 27 Q10 22 8 16 Z" fill="#4dabf7" stroke="#5a3d5c" stroke-width="2" stroke-linejoin="round"/><path d="M27 23 Q31 14 21 9" fill="none" stroke="#5a3d5c" stroke-width="2"/></svg>',
  eraser: '<svg viewBox="0 0 40 40"><g transform="rotate(-35 20 20)"><rect x="6" y="13" width="28" height="14" rx="3" fill="#ffc8dd" stroke="#5a3d5c" stroke-width="2.5"/><rect x="6" y="13" width="10" height="14" rx="3" fill="#fff" stroke="#5a3d5c" stroke-width="2.5"/></g><path d="M7 35 h4 M15 36 h3 M22 35 h2" stroke="#5a3d5c" stroke-width="2.5" stroke-linecap="round"/></svg>',
  stamp: '<svg viewBox="0 0 40 40"><path d="M20 33 C13 27 5 22 8 14 C11 7 20 10 20 16 C20 10 29 7 32 14 C35 22 27 27 20 33 Z" fill="#ff8fab" stroke="#5a3d5c" stroke-width="2.5"/></svg>',
};
const UNDO = '<svg viewBox="0 0 40 40"><path d="M14 10 L6 18 L14 26" fill="none" stroke="#5a3d5c" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 18 H24 Q34 18 34 26 Q34 33 24 33 H18" fill="none" stroke="#5a3d5c" stroke-width="3.5" stroke-linecap="round"/></svg>';
const LABEL: Record<Tool, string> = { brush: 'Brush', fill: 'Fill', eraser: 'Eraser', stamp: 'Stamps' };
const COLOR_NAME = ['White', 'Plum', 'Red', 'Pink', 'Orange', 'Yellow', 'Green', 'Dark green', 'Blue', 'Dark blue', 'Lilac', 'Purple', 'Tan', 'Brown', 'Gray', 'Black'];
const FRAME_NAME: Record<string, string> = { wood: 'Wood', plum: 'Plum', gold: 'Gold', rainbow: 'Rainbow' };
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
        <div class="stuTools">${(Object.keys(ICON) as Tool[]).map(t => `<button type="button" class="stuTool" data-tool="${t}" aria-label="${LABEL[t]}" aria-pressed="false">${ICON[t]}<span>${LABEL[t]}</span></button>`).join('')}
          <button type="button" class="stuTool stuUndo" aria-label="Undo">${UNDO}<span>Undo</span></button><button type="button" class="stuTool stuClear" aria-label="Clear">${CLEAR_ICO}<span>Clear</span></button></div>
        <div class="stuGroup stuSizeGroup"><b>Size</b><div class="stuRow stuSizes">${SIZES.map((s, i) => `<button type="button" class="stuSize" data-size="${i}" aria-label="Size ${i + 1}" aria-pressed="false"><i style="width:${8 + s * 2}px;height:${8 + s * 2}px"></i></button>`).join('')}</div></div>
        <div class="stuGroup stuColorGroup"><b>Colors</b><div class="stuColors">${PALETTE.map((c, i) => `<button type="button" class="stuColor" data-color="${i}" aria-label="${COLOR_NAME[i] ?? 'Color ' + (i + 1)}" aria-pressed="false" style="background:${c}"></button>`).join('')}</div></div>
        <div class="stuGroup stuStampGroup"><b>Stamps</b><div class="stuStamps">${o.stamps.map((s, i) => `<button type="button" class="stuStamp" data-stamp="${i}" aria-label="${s.name}" aria-pressed="false">${s.svg}</button>`).join('')}</div></div>
        <div class="stuGroup stuFrameGroup"><b>Frame</b><div class="stuRow stuFrames">${FRAMES.map((f, i) => `<button type="button" class="stuFrame" data-frame="${i}" aria-label="${FRAME_NAME[f] ?? f} frame" aria-pressed="false">${framedSvg(i, null, false)}</button>`).join('')}</div></div>
        <button type="button" class="stuHang">Hang it up!</button>
      </div>
    </div></div>
    <div class="stuAsk hidden" role="alertdialog" aria-label="Start over?"><div class="stuAskCard"><p>Start a new picture?</p><div class="stuAskRow"><button type="button" class="stuAskNo" aria-label="Keep my picture">Keep it</button><button type="button" class="stuAskYes" aria-label="Yes, clear it">Clear it</button></div></div></div>`;
  document.body.appendChild(root); openEl = root;
  const cv = root.querySelector('canvas')!, ctx = cv.getContext('2d')!, img = ctx.createImageData(PAINT_W, PAINT_H);
  const paint = () => { toImageData(bm.px, img); ctx.putImageData(img, 0, 0); };
  const sync = () => {
    root.querySelectorAll<HTMLElement>('.stuTool[data-tool]').forEach(b => b.classList.toggle('on', b.dataset.tool === tool));
    root.querySelectorAll<HTMLElement>('.stuSize').forEach(b => b.classList.toggle('on', Number(b.dataset.size) === size));
    root.querySelectorAll<HTMLElement>('.stuColor').forEach(b => b.classList.toggle('on', Number(b.dataset.color) === color));
    root.querySelectorAll<HTMLElement>('.stuStamp').forEach(b => b.classList.toggle('on', Number(b.dataset.stamp) === stamp));
    root.querySelectorAll<HTMLElement>('.stuFrame').forEach(b => b.classList.toggle('on', Number(b.dataset.frame) === frame));
    root.querySelectorAll<HTMLElement>('[aria-pressed]').forEach(b => b.setAttribute('aria-pressed', String(b.classList.contains('on'))));
    root.classList.toggle('stamping', tool === 'stamp');
    if (bm.canUndo() !== shown) refreshFrames();
    root.querySelector<HTMLButtonElement>('.stuUndo')!.disabled = !bm.canUndo();
  };
  // Frame choices show her own painting inside each frame (refreshed when the picture changes).
  let shown = false, frameT = 0;
  function refreshFrames() {
    shown = bm.canUndo(); clearTimeout(frameT);
    frameT = window.setTimeout(() => { if (!openEl) return; const url = bm.canUndo() ? cv.toDataURL() : null; root.querySelectorAll<HTMLElement>('.stuFrame').forEach(b => { b.innerHTML = framedSvg(Number(b.dataset.frame), url, false); }); }, 60);
  }
  const ask = root.querySelector<HTMLElement>('.stuAsk')!;
  paint(); sync();
  const close = () => { root.remove(); openEl = null; o.onClose?.(); };
  root.addEventListener('click', e => {
    const t = (e.target as HTMLElement).closest<HTMLElement>('button'); if (!t) return;
    o.sfx?.click();
    if (t.classList.contains('stuX')) { close(); return; }
    if (t.classList.contains('stuAskNo')) { ask.classList.add('hidden'); return; }
    if (t.classList.contains('stuAskYes')) { ask.classList.add('hidden'); bm.checkpoint(); bm.apply({ k: 'clear' }); paint(); sync(); refreshFrames(); return; }
    if (t.dataset.tool) tool = t.dataset.tool as Tool;
    else if (t.dataset.size) size = Number(t.dataset.size);
    else if (t.dataset.color) { color = Number(t.dataset.color); if (tool === 'eraser' || tool === 'stamp') tool = 'brush'; }
    else if (t.dataset.stamp) { stamp = Number(t.dataset.stamp); tool = 'stamp'; }
    else if (t.dataset.frame) frame = Number(t.dataset.frame);
    else if (t.classList.contains('stuUndo')) { if (bm.undoStep()) { paint(); refreshFrames(); } }
    else if (t.classList.contains('stuClear')) { ask.classList.remove('hidden'); ask.querySelector<HTMLElement>('.stuAskNo')!.focus(); }
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
    if (tool === 'fill') { bm.checkpoint(); bm.apply({ k: 'fill', x: p.x, y: p.y, c: color }); paint(); sync(); refreshFrames(); o.sfx?.pop?.(); return; }
    if (tool === 'stamp') {
      const src = o.stamps[stamp]; if (!src) return;
      void stampMask(src, STAMP_PX[size]).then(m => { if (!m || !openEl) return; bm.checkpoint(); bm.apply({ k: 'stamp', mask: m, x: p.x, y: p.y }); paint(); sync(); refreshFrames(); o.sfx?.pop?.(); });
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
  const end = (e: PointerEvent) => { if (e.pointerId !== active) return; active = -1; last = null; sync(); refreshFrames(); };
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
