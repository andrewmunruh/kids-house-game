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

/** Scenes that have a painting file (no fetch). */
export function sceneArtNames(): string[] { return [...byScene.keys()].sort(); }
export function hasSceneArt(scene: string): boolean { return byScene.has(scene); }

function forcedVector(): boolean {
  try { if (new URLSearchParams(location.search).get('art') === 'v1') return true; } catch { /* no location */ }
  return !artRasterOn();
}

type Job = { state: 'loading' | 'ok' | 'failed'; url?: string; p: Promise<string | null> };
const jobs = new Map<string, Job>();

function load(scene: string): Job {
  let j = jobs.get(scene);
  if (j) return j;
  const get = byScene.get(scene)!;
  const job: Job = { state: 'loading', p: null as any };
  // Only the URL here (Vite asset); the <img> that shows it decodes it off the main thread (img.decode)
  // before it is shown, and a bad or missing file marks the job failed there (vector stays).
  job.p = get().then(url => { job.state = 'ok'; job.url = url; return url; }).catch(() => { job.state = 'failed'; return null; });
  jobs.set(scene, job);
  return job;
}

// One painting decoded at a time: every host that currently holds an <img> (room stage, map card,
// park, ranch/barn, clubhouse). Showing a scene in one host releases the others, and leaving a
// scene removes its <img> (not just hides it), so the browser can drop that decoded bitmap
// (a 5800x1200 park is ~28 MB decoded). Re-entry decodes again off the main thread before showing.
const holders = new Set<HTMLElement>();
function release(host: HTMLElement, mark: HTMLElement | null): void {
  host.querySelectorAll<HTMLImageElement>(':scope > img.sceneArt').forEach(i => { i.removeAttribute('src'); i.remove(); });
  holders.delete(host);
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
