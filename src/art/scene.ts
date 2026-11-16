// Optional painted scene backgrounds, one opaque WebP per scene: assets/art/scene/<scene>.webp
// (2x the scene's logical size). The vector scene is never removed: it stays underneath and
// is what shows while the painting loads, when it fails, with ?art=v1, or for a scene that
// has no painting. Hotspots, doors and floor lines are untouched DOM; the painting is an
// <img> with pointer-events:none, so taps land exactly where they always did.
// Each painting is fetched on first entry to its scene and decoded off the main thread
// (img.decode) before it is shown, so a scene switch never stalls a frame. Nothing is saved.
import { artRasterOn } from './flag';

const files = import.meta.glob('../../assets/art/scene/*.webp', { query: '?url', import: 'default' }) as Record<string, () => Promise<string>>;
const byScene = new Map<string, () => Promise<string>>();
for (const p in files) {
  const name = (p.split('/').pop() || '').replace(/\.webp$/i, '');
  if (name && !name.startsWith('_')) byScene.set(name, files[p]);
}

// Batch 6 (D-02): wide scenes also ship as lossless 1200 px strips of the SAME painting
// (scripts/tile_scenes.py; pixel-identical). Only strips near the screen are fetched and decoded,
// so a 7200 px ranch no longer needs one 35 MB bitmap. Same box, so hotspots do not move.
import { TILE_MAN } from './scene-tiles';
const tileFiles = import.meta.glob('../../assets/art/scene-tiles/*/*.webp', { query: '?url', import: 'default' }) as Record<string, () => Promise<string>>;
const tilesOf = new Map<string, { w: number; parts: { x: number; w: number; get: () => Promise<string> }[] }>();
for (const [name, m] of Object.entries(TILE_MAN)) {
  const parts = m.tiles.map(([x, w], i) => ({ x, w, get: tileFiles[`../../assets/art/scene-tiles/${name}/${name}.${i}.webp`] }));
  if (byScene.has(name) && parts.length && parts.every(t => !!t.get)) tilesOf.set(name, { w: m.w, parts });
}
// OFF by default until the real-iPad Safari Web Inspector session (plan, Batch 6): in headless Chromium
// the strips held the scene bitmap lower but renderer memory kept climbing ~20 MB per tour (the 50 lossless
// strips sit in the image cache). ?tiles=1 turns them on for that device A/B; TILES_DEFAULT flips it for everyone.
const TILES_DEFAULT = false;
function tilesOff(): boolean { try { const q = new URLSearchParams(location.search).get('tiles'); return q === '1' ? false : q === '0' ? true : !TILES_DEFAULT; } catch { return !TILES_DEFAULT; } }

/** Scenes that have a painting file (no fetch). */
export function sceneArtNames(): string[] { return [...byScene.keys()].sort(); }
export function hasSceneArt(scene: string): boolean { return byScene.has(scene); }

function forcedVector(): boolean {
  try { if (new URLSearchParams(location.search).get('art') === 'v1') return true; } catch { /* no location */ }
  return !artRasterOn();
}

type Job = { state: 'loading' | 'ok' | 'failed'; url?: string; p: Promise<string | null> };
const jobs = new Map<string, Job>();
const JOBS_MAX = 24; // D-17: one small entry per scene (there are ~13); capped anyway, oldest first

function load(scene: string): Job {
  let j = jobs.get(scene);
  if (j) return j;
  const get = byScene.get(scene)!;
  const job: Job = { state: 'loading', p: null as any };
  // Only the URL here (Vite asset); the <img> that shows it decodes it off the main thread (img.decode)
  // before it is shown, and a bad or missing file marks the job failed there (vector stays).
  job.p = get().then(url => { job.state = 'ok'; job.url = url; return url; }).catch(() => { job.state = 'failed'; return null; });
  jobs.set(scene, job);
  while (jobs.size > JOBS_MAX) jobs.delete(jobs.keys().next().value!);
  return job;
}

// One painting decoded at a time: every host that currently holds an <img> (room stage, map card,
// park, ranch/barn, clubhouse). Showing a scene in one host releases the others, and leaving a
// scene removes its <img> (not just hides it), so the browser can drop that decoded bitmap
// (a 5800x1200 park is ~28 MB decoded). Re-entry decodes again off the main thread before showing.
const holders = new Set<HTMLElement>();
function release(host: HTMLElement, mark: HTMLElement | null): void {
  host.querySelectorAll<HTMLImageElement>(':scope > img.sceneArt').forEach(i => { i.removeAttribute('src'); i.remove(); });
  holders.delete(host); tiled.delete(host); if (!tiled.size) stopWatch();
  const m = mark ?? (host as any).__sceneMark as HTMLElement | undefined;
  if (m) { m.classList.remove('sceneArtOn'); delete m.dataset.sceneArt; }
}
/** Drop every painting (e.g. a view with no painted scene). */
export function releaseSceneArt(except?: HTMLElement): void {
  for (const h of [...holders]) if (h !== except) { h.dataset.sceneWant = ''; release(h, null); }
}

/**
 * Show `scene`'s painting inside `host` (absolutely positioned, filling it, under items).
 * Pass null (or a scene with no painting, or one that does not apply right now) to show
 * only the vector. While shown, `mark` (default `host`) carries the class `sceneArtOn` and data-scene-art.
 */
export function showSceneArt(host: HTMLElement, scene: string | null, mark: HTMLElement = host): void {
  const want = scene && byScene.has(scene) && !forcedVector() ? scene : null;
  host.dataset.sceneWant = want ?? '';
  (host as any).__sceneMark = mark;
  if (!want) { release(host, mark); return; }
  releaseSceneArt(host); // leaving another scene: let its painting go
  if (tilesOf.has(want) && !tilesOff()) { showTiles(host, want, mark); return; }
  if (tiled.has(host)) release(host, mark); // strips of another scene: never reuse one as the single painting
  const job = load(want);
  const put = (url: string) => {
    if (host.dataset.sceneWant !== want) return; // she left the scene before it loaded
    // Re-read: two calls made while the file loads each resolve here, and a stale null would add a second <img>
    // (that one kept the previous scene's painting on top after a switch, e.g. living -> backyard).
    let img = host.querySelector<HTMLImageElement>(':scope > img.sceneArt');
    if (img && img.getAttribute('src') === url && !img.hidden) { mark.classList.add('sceneArtOn'); mark.dataset.sceneArt = want; return; }
    if (!img) {
      img = document.createElement('img');
      img.className = 'sceneArt';
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.draggable = false;
      img.decoding = 'async';
      host.prepend(img);
    }
    holders.add(host);
    const el = img;
    if (el.getAttribute('src') === url) { show(el); return; }
    // New or different painting: keep the vector (and no stale painting) until this one is decoded.
    el.hidden = true; mark.classList.remove('sceneArtOn'); delete mark.dataset.sceneArt;
    el.src = url;
    el.decode().then(
      () => { if (host.dataset.sceneWant === want && el.isConnected && el.getAttribute('src') === url) show(el); },
      () => { job.state = 'failed'; if (host.dataset.sceneWant === want) release(host, mark); });
  };
  const show = (el: HTMLImageElement) => { el.hidden = false; mark.classList.add('sceneArtOn'); mark.dataset.sceneArt = want; };
  if (job.state === 'ok') { put(job.url!); return; }
  if (job.state === 'failed') { release(host, mark); return; }
  mark.classList.remove('sceneArtOn'); delete mark.dataset.sceneArt;
  const old = host.querySelector<HTMLImageElement>(':scope > img.sceneArt'); if (old) old.hidden = true;
  job.p.then(u => { if (u) put(u); });
}

/** Tests: resolves once the painting for `scene` has loaded (url) or failed (null). */
export function sceneArtReady(scene: string): Promise<string | null> {
  return byScene.has(scene) ? load(scene).p : Promise.resolve(null);
}

// ---- tiled scenes -------------------------------------------------------------------------------
type Tiled = { scene: string; mark: HTMLElement; imgs: HTMLImageElement[]; shown: boolean };
const tiled = new Map<HTMLElement, Tiled>();
const tileUrl = new Map<string, string>(); // tile key -> url (small strings; bounded by the tile count)
let watch = 0;
function stopWatch() { if (watch) { clearInterval(watch); watch = 0; } }
function startWatch() { if (!watch) watch = window.setInterval(() => { if (!document.hidden) for (const h of tiled.keys()) wantTiles(h); }, 200); }

function showTiles(host: HTMLElement, scene: string, mark: HTMLElement) {
  const t = tilesOf.get(scene)!;
  let st = tiled.get(host);
  if (!st || st.scene !== scene) {
    host.querySelectorAll<HTMLImageElement>(':scope > img.sceneArt').forEach(i => { i.removeAttribute('src'); i.remove(); });
    mark.classList.remove('sceneArtOn'); delete mark.dataset.sceneArt;
    const imgs = t.parts.map((p, i) => {
      const img = document.createElement('img');
      img.className = 'sceneArt sceneTile'; img.alt = ''; img.setAttribute('aria-hidden', 'true'); img.draggable = false; img.decoding = 'async';
      img.dataset.tile = String(i); img.hidden = true;
      // Each strip sits exactly where it is in the painting; a hair of overlap hides sub-pixel seams.
      img.style.left = (p.x / t.w * 100) + '%';
      img.style.width = `calc(${p.w / t.w * 100}% + ${i < t.parts.length - 1 ? 1 : 0}px)`;
      return img;
    });
    host.prepend(...imgs);
    st = { scene, mark, imgs, shown: false };
    tiled.set(host, st);
  }
  holders.add(host); startWatch();
  wantTiles(host);
}

/** Strips within one screen width of the viewport are fetched + decoded; the painting turns on
 *  once every strip that is actually on screen is ready (no half-painted first frame). */
function wantTiles(host: HTMLElement) {
  const st = tiled.get(host); if (!st || host.dataset.sceneWant !== st.scene) return;
  const t = tilesOf.get(st.scene)!;
  const hr = host.getBoundingClientRect(); if (hr.width < 2) return;
  // Fetch strips within a quarter screen of the edge (a glide is ~0.6 screen, so this stays ahead).
  // Strips stay until she leaves the scene (letting them go mid-scene and re-decoding grew Chromium's
  // decode cache in the soak test).
  const vw = innerWidth, near = vw * 0.25;
  const onScreen: HTMLImageElement[] = [];
  st.imgs.forEach((img, i) => {
    const p = t.parts[i];
    const l = hr.left + p.x / t.w * hr.width, r = l + p.w / t.w * hr.width;
    const isNear = r > -near && l < vw + near, vis = r > 0 && l < vw;
    if (vis) onScreen.push(img);
    if (isNear && !img.dataset.state) loadTile(host, st, img, i);
  });
  if (!st.shown && onScreen.length && onScreen.every(i => i.dataset.state === 'ok')) {
    st.shown = true; st.mark.classList.add('sceneArtOn'); st.mark.dataset.sceneArt = st.scene;
  }
}

function loadTile(host: HTMLElement, st: Tiled, img: HTMLImageElement, i: number) {
  img.dataset.state = 'loading';
  const key = st.scene + '.' + i;
  const cached = tileUrl.get(key);
  const p = cached ? Promise.resolve(cached) : tilesOf.get(st.scene)!.parts[i].get().then(u => { tileUrl.set(key, u); return u; });
  p.then(url => {
    if (tiled.get(host) !== st || !img.isConnected) return;
    img.src = url;
    return img.decode().then(() => {
      if (tiled.get(host) !== st || !img.isConnected) return;
      if (img.dataset.state !== 'loading') return; // let go of while it loaded
      img.hidden = false; img.dataset.state = 'ok'; wantTiles(host);
    });
  }).catch(() => {
    // A strip that will not load: fall back to the single painting for this host (vector stays meanwhile).
    if (tiled.get(host) !== st) return;
    tiled.delete(host); if (!tiled.size) stopWatch();
    host.querySelectorAll<HTMLImageElement>(':scope > img.sceneTile').forEach(x => { x.removeAttribute('src'); x.remove(); });
    tilesOf.delete(st.scene);
    showSceneArt(host, st.scene, st.mark);
  });
}

/** Tests: which strips of the shown scene are loaded. */
export function sceneTilesState(host: HTMLElement): string[] { return (tiled.get(host)?.imgs ?? []).map(i => i.dataset.state || '-'); }
