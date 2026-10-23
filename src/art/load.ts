// Optional WebP drawings, one file per item id: assets/art/<group>/<id>.webp
// A colon in an id is written as ~ (pack:slug → pack~slug.webp).
// The file's folder does not decide who may use it. A lamp in the bedroom uses
// the same painting as a lamp in the living room.
// Kinds already in the save, just placed, or scrolled onto the shelf are
// fetched. The service worker serves /assets/art/ from its own cache, so the
// page does not fetch a painting a second time. A missing file, a failed fetch,
// or ?art=v1 leaves the item on its SVG. Winter Cheer has no SVG, so v1 still
// requests that pack's WebP.
import { setArtFromSearch } from './flag';
import { rememberRaster } from './cache';

const loaders = import.meta.glob('../../assets/art/*/*.webp', { query: '?url', import: 'default' }) as Record<string, () => Promise<string>>;

function kindOf(path: string): string | null {
  const file = path.split('/').pop() || '';
  if (file.length < 6 || file.slice(-5).toLowerCase() !== '.webp') return null;
  const kind = decodeURIComponent(file.slice(0, -5)).replace(/~/g, ':');
  if (!kind || kind.startsWith('_')) return null;
  return kind;
}

const known = new Set<string>();
for (const path in loaders) {
  const kind = kindOf(path);
  if (kind) known.add(kind);
}

/** True when a painting file exists. Does not fetch the file. */
export function hasArt(kind: string): boolean {
  return known.has(kind);
}

const started = new Map<string, Promise<string | null>>();

function loaderFor(kind: string): (() => Promise<string>) | undefined {
  for (const path in loaders) if (kindOf(path) === kind) return loaders[path];
  return undefined;
}

function startKind(kind: string): Promise<string | null> {
  const pending = started.get(kind);
  if (pending) return pending;
  const load = loaderFor(kind);
  if (!load) return Promise.resolve(null);
  const job = load().then(url => {
    rememberRaster(kind, url);
    return kind;
  }).catch(() => {
    started.delete(kind);
    return null;
  });
  started.set(kind, job);
  return job;
}

/** Fetch these item paintings. A kind that already started is not fetched again. */
export function loadArtKinds(kinds: string[]): Promise<string[]> {
  const unique = [...new Set(kinds)];
  return Promise.all(unique.map(startKind)).then(ids => ids.filter((id): id is string => id !== null));
}

/** Every painting. The game uses loadArtKinds; the harness uses this. */
export function loadAllArt(): Promise<string[]> {
  const kinds: string[] = [];
  for (const path in loaders) {
    const kind = kindOf(path);
    if (kind) kinds.push(kind);
  }
  return loadArtKinds(kinds);
}

/**
 * Read the page switch, then load just these item ids.
 * Pass the kinds placed in the save (every room, plus anything in a hand).
 */
export function boot(search: string, kinds: string[] = []): Promise<string[]> {
  if (!setArtFromSearch(search)) return Promise.resolve([]);
  return loadArtKinds(kinds);
}
