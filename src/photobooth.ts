// Photo Booth (track E): a snapshot of the room as it is on screen, in a cute frame.
// PRIVATE: everything happens on this iPad. The scene is cloned into an SVG <foreignObject>,
// drawn to a <canvas>, and handed to the share sheet / a download. Nothing is uploaded or sent.
// Asset bytes come from the app's own files (already cached); no other host is contacted.

const XHTML = 'http://www.w3.org/1999/xhtml';
const dataCache = new Map<string, Promise<string>>();

function toData(url: string): Promise<string> {
  if (url.startsWith('data:')) return Promise.resolve(url);
  let p = dataCache.get(url);
  if (!p) {
    p = (async () => {
      try {
        const u = new URL(url, location.href);
        if (u.origin !== location.origin) return ''; // never reach out to another host
        const r = await fetch(u.href, { credentials: 'same-origin' });
        const b = await r.blob();
        return await new Promise<string>(res => { const fr = new FileReader(); fr.onload = () => res(String(fr.result)); fr.onerror = () => res(''); fr.readAsDataURL(b); });
      } catch { return ''; }
    })();
    dataCache.set(url, p);
  }
  return p;
}

const URL_RE = /url\((['"]?)([^'")]+)\1\)/g;
async function inlineUrls(css: string, base: string, keep: (abs: string) => boolean): Promise<string> {
  const found = new Map<string, string>();
  for (const m of css.matchAll(URL_RE)) {
    const raw = m[2]; if (raw.startsWith('data:') || raw.startsWith('#')) continue;
    let abs = raw; try { abs = new URL(raw, base).href; } catch { /* keep */ }
    found.set(raw, abs);
  }
  const out = new Map<string, string>();
  await Promise.all([...found].map(async ([raw, abs]) => out.set(raw, keep(abs) ? await toData(abs) : '')));
  return css.replace(URL_RE, (all, _q, raw) => {
    if (raw.startsWith('data:') || raw.startsWith('#')) return all;
    const d = out.get(raw); return d ? `url("${d}")` : 'none';
  });
}

const FROZEN = ['transform', 'translate', 'rotate', 'scale', 'opacity', 'filter'] as const;

/** Render `stage` (as on screen right now) to a canvas `scale` times its CSS size. */
export async function renderStage(stage: HTMLElement, scale: number): Promise<HTMLCanvasElement> {
  const w = stage.offsetWidth, h = stage.offsetHeight;
  // 1) Freeze running animations where they are this frame.
  const frozen = new Map<Element, string>();
  for (const a of document.getAnimations()) {
    const t = (a.effect as KeyframeEffect | null)?.target;
    if (!t || !(stage === t || stage.contains(t)) || (a.effect as KeyframeEffect).pseudoElement) continue;
    const cs = getComputedStyle(t);
    frozen.set(t, FROZEN.map(p => `${p}:${cs.getPropertyValue(p)}`).join(';'));
  }
  // 2) Which images does the scene really use? Only those get inlined.
  const used = new Set<string>();
  const addBg = (v: string) => { for (const m of v.matchAll(URL_RE)) { try { used.add(new URL(m[2], location.href).href); } catch { /* */ } } };
  const all = [stage, ...stage.querySelectorAll<HTMLElement>('*')];
  for (const el of all) {
    addBg(getComputedStyle(el).backgroundImage);
    addBg(getComputedStyle(el, '::before').backgroundImage); addBg(getComputedStyle(el, '::after').backgroundImage);
  }
  // 3) Clone, with frozen motion, inlined images, canvases as pictures.
  const clone = stage.cloneNode(true) as HTMLElement;
  const cl = [clone, ...clone.querySelectorAll<HTMLElement>('*')];
  const jobs: Promise<void>[] = [];
  all.forEach((src, i) => {
    const dst = cl[i]; if (!dst) return;
    const f = frozen.get(src); if (f) dst.setAttribute('style', (dst.getAttribute('style') || '') + ';' + f);
    const st = dst.getAttribute('style');
    if (st && st.includes('url(')) jobs.push(inlineUrls(st, location.href, () => true).then(v => dst.setAttribute('style', v)));
    if (src instanceof HTMLImageElement && dst instanceof HTMLImageElement) {
      const s = src.currentSrc || src.src; dst.removeAttribute('srcset'); dst.removeAttribute('loading');
      jobs.push(toData(s).then(d => { if (d) dst.src = d; else dst.removeAttribute('src'); }));
    } else if (src instanceof HTMLCanvasElement) {
      try { const im = document.createElement('img'); im.src = src.toDataURL(); im.setAttribute('style', getComputedStyle(src).cssText || `width:${src.offsetWidth}px;height:${src.offsetHeight}px`); im.className = src.className; dst.replaceWith(im); } catch { /* skip */ }
    } else if (src instanceof SVGImageElement) {
      const s = src.href.baseVal; if (s) jobs.push(toData(s).then(d => { if (d) (dst as unknown as SVGImageElement).setAttribute('href', d); }));
    }
    if (src.tagName === 'BUTTON' && src.classList.contains('nudge')) dst.setAttribute('style', 'display:none');
  });
  clone.style.transform = 'none'; clone.style.left = '0'; clone.style.top = '0'; clone.style.position = 'relative'; clone.style.margin = '0';
  // 4) The app's own CSS, with the scene's images inlined and everything held still.
  let css = '';
  for (const sh of [...document.styleSheets]) {
    try { const t = [...sh.cssRules].map(r => r.cssText).join('\n'); css += await inlineUrls(t, sh.href || location.href, abs => used.has(abs)); } catch { /* cross-origin sheet: skip */ }
  }
  css = css.replace(/:root\b/g, '.pbHtml') + '\n*,*::before,*::after{animation:none!important;transition:none!important}';
  await Promise.all(jobs);
  const root = document.documentElement, body = document.body;
  const ser = new XMLSerializer();
  const wrapHtml = `<div xmlns="${XHTML}" class="pbHtml ${root.className}" style="${esc(root.getAttribute('style') || '')};width:${w}px;height:${h}px;overflow:hidden">`
    + `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>`
    + `<body class="${esc(body.className)}" style="margin:0;width:${w}px;height:${h}px;overflow:hidden;background:transparent"><div id="app"><div class="stageWrap" style="position:relative;margin:0;padding:0;width:${w}px;height:${h}px;inset:auto;transform:none">`
    + ser.serializeToString(clone) + '</div></div></body></div>';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><foreignObject x="0" y="0" width="${w}" height="${h}">${wrapHtml}</foreignObject></svg>`;
  // A data: URL, not a blob: URL. WebKit taints the canvas for a blob: SVG with foreignObject.
  const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(w * scale); canvas.height = Math.round(h * scale);
  const ctx = canvas.getContext('2d')!;
  try {
    const img = new Image(); img.decoding = 'sync'; img.src = url;
    await img.decode().catch(() => new Promise(r => { img.onload = r; img.onerror = r; }));
    // WebKit can paint a foreignObject's inner images a frame late: draw, wait, draw again.
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    await new Promise(r => setTimeout(r, 60));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  } finally { /* nothing to revoke */ }
  return canvas;
}
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** The scene inside a soft pastel frame with little stars and hearts (drawn shapes, no art files). */
export function framePhoto(scene: HTMLCanvasElement, when = new Date(), radius = 0): HTMLCanvasElement {
  const k = scene.width / 600, pad = Math.round(26 * k), foot = Math.round(64 * k);
  const c = document.createElement('canvas'); c.width = scene.width + pad * 2; c.height = scene.height + pad + foot;
  const x = c.getContext('2d')!;
  const g = x.createLinearGradient(0, 0, c.width, c.height); g.addColorStop(0, '#ffd6e8'); g.addColorStop(.5, '#fff1c9'); g.addColorStop(1, '#d9ecff');
  x.fillStyle = g; rr(x, 0, 0, c.width, c.height, 30 * k); x.fill();
  x.lineWidth = 5 * k; x.strokeStyle = '#5a3d5c'; rr(x, 2.5 * k, 2.5 * k, c.width - 5 * k, c.height - 5 * k, 28 * k); x.stroke();
  // The stage already wears its own rounded plum border, so the scene drops straight in.
  // Clip to the stage's own rounded corners so the page behind them never shows as a pale strip.
  x.save(); if (radius > 0) { rr(x, pad, pad, scene.width, scene.height, radius); x.clip(); }
  x.drawImage(scene, pad, pad); x.restore();
  // Confetti dots along the border.
  const cols = ['#ff7aa8', '#ffd166', '#7ec8ff', '#b48cff', '#8ee08e'];
  for (let i = 0; i < 26; i++) { const t = i / 26; const px = t * c.width, py = i % 2 ? pad / 2 : c.height - foot / 2 + ((i % 4) - 1.5) * 8 * k; x.fillStyle = cols[i % 5]; x.beginPath(); x.arc(px + 10 * k, i % 2 ? py : py, 4 * k, 0, Math.PI * 2); x.fill(); }
  star(x, pad * 1.2, c.height - foot / 2, 14 * k, '#ffd166'); heart(x, c.width - pad * 1.3, c.height - foot / 2, 13 * k, '#ff7aa8');
  x.fillStyle = '#5a3d5c'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.font = `800 ${Math.round(24 * k)}px ui-rounded, "SF Pro Rounded", "Nunito", system-ui, sans-serif`;
  x.fillText('Our cozy house · ' + when.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), c.width / 2, c.height - foot / 2);
  return c;
}
function rr(x: CanvasRenderingContext2D, l: number, t: number, w: number, h: number, r: number) { x.beginPath(); x.moveTo(l + r, t); x.arcTo(l + w, t, l + w, t + h, r); x.arcTo(l + w, t + h, l, t + h, r); x.arcTo(l, t + h, l, t, r); x.arcTo(l, t, l + w, t, r); x.closePath(); }
function star(x: CanvasRenderingContext2D, cx: number, cy: number, r: number, fill: string) {
  x.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rad = i % 2 ? r * .45 : r; x.lineTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad); } x.closePath(); x.fillStyle = fill; x.fill(); x.lineWidth = r / 5; x.strokeStyle = '#5a3d5c'; x.stroke();
}
function heart(x: CanvasRenderingContext2D, cx: number, cy: number, r: number, fill: string) {
  x.beginPath(); x.moveTo(cx, cy + r * .9); x.bezierCurveTo(cx - r * 1.6, cy - r * .2, cx - r * .6, cy - r * 1.3, cx, cy - r * .4); x.bezierCurveTo(cx + r * .6, cy - r * 1.3, cx + r * 1.6, cy - r * .2, cx, cy + r * .9); x.fillStyle = fill; x.fill(); x.lineWidth = r / 5; x.strokeStyle = '#5a3d5c'; x.stroke();
}

/** Phones zoom the stage past its frame: keep just the part she can see. */
function cropToView(full: HTMLCanvasElement, stage: HTMLElement): { c: HTMLCanvasElement, radius: number } {
  const sr = stage.getBoundingClientRect(), wrap = stage.parentElement?.getBoundingClientRect();
  const rad = (el: Element | null | undefined, k: number) => el ? (parseFloat(getComputedStyle(el).borderTopRightRadius) || 0) * k : 0;
  const kx = full.width / (sr.width || 1), ky = full.height / (sr.height || 1);
  // The canvas is in the stage's own (untransformed) px times the render scale, so its radius uses that scale, not the on-screen one.
  const own = full.width / Math.max(1, stage.offsetWidth);
  if (!wrap || !sr.width) return { c: full, radius: rad(stage, own) };
  const l = Math.max(sr.left, wrap.left, 0), t = Math.max(sr.top, wrap.top, 0);
  const r = Math.min(sr.right, wrap.right, innerWidth), b = Math.min(sr.bottom, wrap.bottom, innerHeight);
  if (r - l >= sr.width - 2 && b - t >= sr.height - 2) return { c: full, radius: rad(stage, own) };
  if (r <= l || b <= t) return { c: full, radius: rad(stage, own) };
  const c = document.createElement('canvas'); c.width = Math.round((r - l) * kx); c.height = Math.round((b - t) * ky);
  c.getContext('2d')!.drawImage(full, (l - sr.left) * kx, (t - sr.top) * ky, c.width, c.height, 0, 0, c.width, c.height);
  return { c, radius: rad(stage.parentElement, kx) };
}
const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
let busy = false;
/** Snap! Soft flash, then a little preview card with Save and Close. */
export async function takePhoto(stage: HTMLElement, onSound?: () => void): Promise<void> {
  if (busy) return; busy = true;
  try {
    const scale = Math.min(2, Math.max(1, window.devicePixelRatio || 1), 1600 / Math.max(1, stage.offsetWidth));
    const scenePromise = renderStage(stage, scale); // starts from this exact frame
    const flash = document.createElement('div'); flash.className = 'pbFlash' + (reduced() ? ' soft' : ''); document.body.appendChild(flash);
    onSound?.();
    setTimeout(() => flash.remove(), 700);
    const view = cropToView(await scenePromise, stage); const framed = framePhoto(view.c, new Date(), view.radius);
    const blob = await new Promise<Blob | null>(r => framed.toBlob(r, 'image/png'));
    if (!blob) return;
    showPreview(blob);
  } catch (e) { console.warn('photo booth', e); }
  finally { busy = false; }
}
function showPreview(blob: Blob) {
  document.querySelector('.pbCard')?.remove();
  const url = URL.createObjectURL(blob);
  const name = 'cozy-house-' + new Date().toISOString().slice(0, 10) + '.png';
  const file = typeof File === 'function' ? new File([blob], name, { type: 'image/png' }) : null;
  const wrap = document.createElement('div'); wrap.className = 'pbCard'; wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-label', 'Your photo');
  wrap.innerHTML = `<div class="pbInner"><img class="pbImg" alt="Your photo" src="${url}"/><div class="pbBtns"><button type="button" class="pbSave">💾 Save</button><button type="button" class="pbClose">Close</button></div></div>`;
  document.body.appendChild(wrap);
  const close = () => { wrap.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); };
  wrap.querySelector('.pbClose')!.addEventListener('click', close);
  wrap.addEventListener('click', e => { if (e.target === wrap) close(); });
  wrap.querySelector('.pbSave')!.addEventListener('click', async () => {
    // iPad: the share sheet has "Save Image" (to Photos). It stays on the device; we pass a file, no link.
    const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
    if (file && nav.share && nav.canShare?.({ files: [file] })) {
      try { await nav.share({ files: [file] }); return; } catch (e) { if ((e as DOMException)?.name === 'AbortError') return; }
    }
    const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  });
}
