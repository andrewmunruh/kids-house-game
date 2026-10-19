// Optional 2× WebP drawings. One file per item: assets/art/<room>/<id>.webp
// A colon in an id is written as ~ (pack:slug → pack~slug.webp).
// The loader is a separate chunk. A missing file, a failed fetch, or ?art=v1
// leaves the item on its SVG.
import { setArtFromSearch } from './flag';
import { rememberRaster } from './cache';

const loaders = import.meta.glob('../../assets/art/*/*.webp', { query: '?url', import: 'default' }) as Record<string, () => Promise<string>>;

function kindIn(path: string, room: string): string | null {
  const parts = path.split('/');
  const file = parts[parts.length - 1] || '';
  const folder = parts[parts.length - 2] || '';
  if (folder !== room || file.length < 6 || file.slice(-5).toLowerCase() !== '.webp') return null;
  return decodeURIComponent(file.slice(0, -5)).replace(/~/g, ':');
}

/** Load one room's drawings. Returns the ids that resolved. */
export function loadArtRoom(room: string): Promise<string[]> {
  const jobs: Promise<string>[] = [];
  for (const path in loaders) {
    const kind = kindIn(path, room);
    if (!kind) continue;
    jobs.push(loaders[path]().then(url => { rememberRaster(kind, url); return kind; }));
  }
  return Promise.all(jobs);
}

/** Read the page switch, then load the room plus shared `any` drawings. */
export function boot(search: string, room: string): Promise<string[]> {
  if (!setArtFromSearch(search)) return Promise.resolve([]);
  return loadArtRooms([room, 'any']);
}

/** Load the rooms a visit needs. Repeated calls share the module cache. */
export function loadArtRooms(rooms: readonly string[]): Promise<string[]> {
  return Promise.all(rooms.map(loadArtRoom)).then(groups => {
    const out: string[] = [];
    for (let i = 0; i < groups.length; i++) {
      const ids = groups[i];
      for (let j = 0; j < ids.length; j++) out.push(ids[j]);
    }
    return out;
  });
}
