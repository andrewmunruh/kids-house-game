// Retry with backoff for art that loads over the network (Batch 12).
// GitHub Pages sometimes answers a single request with a 503. Before this, one bad answer
// left an item on its fallback drawing for the rest of the visit, with no retry.
// Both Chromium and WebKit fetch a failed dynamic import() again when it is called again,
// and fetch an <img> again when its src is set again, so a retry is just another try.
// The waits are short so that a hiccup heals before she notices: 0.6 s, 1.8 s, then 4.5 s.

/** Waits between tries, in ms. Three retries after the first try. */
export const ART_RETRY_MS: readonly number[] = [600, 1800, 4500];

const wait = (ms: number) => new Promise<void>(res => setTimeout(res, ms));

/**
 * Run `load`, and on failure try again after each wait in `delays`.
 * Rejects with the last error once every try has failed.
 */
export async function withRetry<T>(load: () => Promise<T>, delays: readonly number[] = ART_RETRY_MS): Promise<T> {
  let last: unknown;
  for (let i = 0; ; i++) {
    try { return await load(); } catch (e) { last = e; }
    if (i >= delays.length) break;
    await wait(delays[i]);
  }
  throw last;
}

/**
 * An <img> that failed: set the same src again after the next backoff wait.
 * Returns false once its retries are used up (the caller then shows the fallback).
 * The try count lives on the element (data-tries), so a fresh render starts over.
 */
export function retryImage(img: HTMLImageElement, delays: readonly number[] = ART_RETRY_MS): boolean {
  const tries = Number(img.dataset.tries || '0');
  if (tries >= delays.length) return false;
  const src = img.getAttribute('src');
  if (!src) return false;
  img.dataset.tries = String(tries + 1);
  setTimeout(() => {
    if (!img.isConnected || img.getAttribute('src') !== src) return; // re-rendered or moved on meanwhile
    img.removeAttribute('src');
    img.setAttribute('src', src);
  }, delays[tries]);
  return true;
}

/**
 * Dynamic import() of a JS chunk, with the same backoff. Production Vite wraps
 * those imports so a 503 (e.g. assets/armchair-*.js on GitHub Pages) becomes
 * vite:preloadError; the caller still sees a rejected promise, which we retry.
 * A final failure shows a gentle note once — never a blank screen, and never
 * a location.reload() loop.
 */
export async function importWithRetry<T>(load: () => Promise<T>, delays: readonly number[] = ART_RETRY_MS): Promise<T> {
  try {
    return await withRetry(load, delays);
  } catch (e) {
    showSoftArtMiss();
    throw e;
  }
}

let chunkRetryOn = false;
let missShown = false;

/** Call once at startup, before any lazy import(). Does not reload the page. */
export function installChunkRetry(): void {
  if (chunkRetryOn || typeof window === 'undefined') return;
  chunkRetryOn = true;
  window.addEventListener('vite:preloadError', ev => {
    // Do not preventDefault: Vite would then swallow the rejection and withRetry
    // would think the import succeeded. Do not reload: an always-503 would loop.
    void ev;
  });
}

/** A soft, kid-safe note after every retry of a JS chunk (or art URL module) has failed. Shown once. */
export function showSoftArtMiss(): void {
  if (missShown || typeof document === 'undefined') return;
  missShown = true;
  if (document.getElementById('artRetryNote')) return;
  const el = document.createElement('div');
  el.id = 'artRetryNote';
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'polite');
  el.textContent = 'Some pictures could not load. You can still play!';
  const go = document.createElement('button');
  go.type = 'button';
  go.className = 'artRetryNoteOk';
  go.textContent = 'OK';
  go.addEventListener('click', () => el.remove());
  el.appendChild(go);
  const mount = () => { (document.body || document.documentElement).appendChild(el); };
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount, { once: true });
}

/** Tests only: reset the once-per-visit note flag. */
export function resetSoftArtMiss(): void { missShown = false; }
