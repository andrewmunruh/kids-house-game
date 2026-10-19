// Optional WebP drawings, one file per item id: assets/art/<group>/<id>.webp
// A colon in an id is written as ~ (pack:slug → pack~slug.webp).
// The file's folder does not decide who may use it. A lamp in the bedroom uses
// the same painting as a lamp in the living room, loaded once up front.
// The loader is a separate chunk. A missing file, a failed fetch, or ?art=v1
// leaves the item on its SVG.
import { setArtFromSearch } from './flag';
import { rememberRaster } from './cache';

const loaders = import.meta.glob('../../assets/art/*/*.webp', { query: '?url', import: 'default' }) as Record<string, () => Promise<string>>;

// Same cache the service worker reads when the network is down.
const OFFLINE = 'cozy-v1';

function kindOf(path: string): string | null {
  const file = path.split('/').pop() || '';
  if (file.length < 6 || file.slice(-5).toLowerCase() !== '.webp') return null;
  const kind = decodeURIComponent(file.slice(0, -5)).replace(/~/g, ':');
  if (!kind || kind.startsWith('_')) return null;
  return kind;
}

function keepOffline(url: string) {
  if (typeof caches !== 'undefined') caches.open(OFFLINE).then(cache => cache.add(url)).catch(() => {});
  const sw = typeof navigator !== 'undefined' ? navigator.serviceWorker : undefined;
  sw?.controller?.postMessage({ art: [url] });
}

/** Load every item painting. Returns the ids that resolved. Repeated calls share one load. */
export function loadArtRoom(room: string): Promise<string[]> {
  const jobs: Promise<string>[] = [];
  for (const path in loaders) {
    const parts = path.split('/');
    const folder = parts[parts.length - 2] || '';
    if (folder !== room) continue;
    const kind = kindOf(path);
    if (!kind) continue;
    jobs.push(loaders[path]().then(url => { rememberRaster(kind, url); keepOffline(url); return kind; }));
  }
  return Promise.all(jobs);
}

let all: Promise<string[]> | null = null;

/** Every painting, whatever room the item is standing in. */
export function loadAllArt(): Promise<string[]> {
  if (all) return all;
  const jobs: Promise<string>[] = [];
  for (const path in loaders) {
    const kind = kindOf(path);
    if (!kind) continue;
    jobs.push(loaders[path]().then(url => { rememberRaster(kind, url); keepOffline(url); return kind; }));
  }
  all = Promise.all(jobs);
  return all;
}

/**
 * Read the page switch, then load every item painting.
 * `room` is accepted so callers can still name the room they are showing;
 * the files are chosen by item id, not by that visit.
 */
export function boot(search: string, _room?: string): Promise<string[]> {
  if (!setArtFromSearch(search)) return Promise.resolve([]);
  return loadAllArt();
}
