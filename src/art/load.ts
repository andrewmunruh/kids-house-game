// Optional WebP drawings, one file per item id: assets/art/<group>/<id>.webp
// A colon in an id is written as ~ (pack:slug → pack~slug.webp).
// The file's folder does not decide who may use it. A lamp in the bedroom uses
// the same painting as a lamp in the living room.
// Kinds already in the save, just placed, or scrolled onto the shelf are
// fetched. The service worker serves /assets/art/ from its own cache, so the
// page does not fetch a painting a second time. A failed fetch is retried with
// backoff (retry.ts). A missing file, a fetch that keeps failing, or ?art=v1
// leaves the item on its SVG. Winter Cheer has no SVG, so v1 still
// requests that pack's WebP.
import { setArtFromSearch } from './flag';
import { rememberRaster } from './cache';
import { importWithRetry } from './retry';

const loaders = import.meta.glob(['../../assets/art/*/*.webp', '!../../assets/art/scene/*.webp'], { query: '?url', import: 'default' }) as Record<string, () => Promise<string>>;

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

// A kind whose tries all failed is not asked for again for a minute. Callers that retry on
// their own (the shelf) then get null at once instead of starting another round of requests.
const GAVE_UP_MS = 60_000;
const gaveUp = new Map<string, number>();

function startKind(kind: string): Promise<string | null> {
  const pending = started.get(kind);
  if (pending) return pending;
  const since = gaveUp.get(kind);
  if (since !== undefined && Date.now() - since < GAVE_UP_MS) return Promise.resolve(null);
  const load = loaderFor(kind);
  if (!load) return Promise.resolve(null);
  // A failed chunk (e.g. a one-off 503) is tried again with backoff. If every try fails the
  // item keeps its SVG, and the kind rests for GAVE_UP_MS before a later visit tries again.
  const job = importWithRetry(load).then(url => {
    gaveUp.delete(kind);
    rememberRaster(kind, url);
    return kind;
  }).catch(() => {
    started.delete(kind);
    gaveUp.set(kind, Date.now());
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
