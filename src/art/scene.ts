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
  job.p = get().then(async url => {
    const im = new Image();
    im.decoding = 'async';
    im.src = url;
    await im.decode(); // decodes off the main thread; rejects on a bad or missing file
    job.state = 'ok'; job.url = url;
    return url;
  }).catch(() => { job.state = 'failed'; return null; });
  jobs.set(scene, job);
  return job;
}

/**
 * Show `scene`'s painting inside `host` (absolutely positioned, filling it, under items).
 * Pass null (or a scene with no painting, or one that does not apply right now) to show
 * only the vector. While shown, `mark` (default `host`) carries the class `sceneArtOn` and data-scene-art.
 */
export function showSceneArt(host: HTMLElement, scene: string | null, mark: HTMLElement = host): void {
  const want = scene && byScene.has(scene) && !forcedVector() ? scene : null;
  host.dataset.sceneWant = want ?? '';
  let img = host.querySelector<HTMLImageElement>(':scope > img.sceneArt');
  const off = () => {
    mark.classList.remove('sceneArtOn');
    delete mark.dataset.sceneArt;
    if (img) img.hidden = true;
  };
  if (!want) { off(); return; }
  const job = load(want);
  const put = (url: string) => {
    if (host.dataset.sceneWant !== want) return; // she left the scene before it loaded
    if (!img) {
      img = document.createElement('img');
      img.className = 'sceneArt';
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.draggable = false;
      img.decoding = 'async';
      host.prepend(img);
    }
    if (img.getAttribute('src') !== url) img.src = url;
    img.hidden = false;
    mark.classList.add('sceneArtOn');
    mark.dataset.sceneArt = want;
  };
  if (job.state === 'ok') { put(job.url!); return; }
  off();
  if (job.state === 'loading') job.p.then(u => { if (u) put(u); });
}

/** Tests: resolves once the painting for `scene` has loaded (url) or failed (null). */
export function sceneArtReady(scene: string): Promise<string | null> {
  return byScene.has(scene) ? load(scene).p : Promise.resolve(null);
}
