// Cozy House service worker (Batch 8: "updates that behave").
// - BUILD is stamped by vite.config.ts at build time; every deploy gets its own app cache.
// - Caches are named per scope, so the game (/kids-house-game/) and the preview (/cozy-preview/)
//   on the same origin never delete each other's files.
// - Only same-origin GETs inside our scope are handled. The neighborhood server (another origin)
//   and sw-switch.json always go straight to the network and are never cached.
// - On activate, old app caches of this scope are deleted. The legacy 'cozy-v1' cache is deleted
//   only when this worker's scope is /kids-house-game/ (production); preview never touches it.
// - Kill switch: see sw/kill.js and src/sw-client.ts (sw-switch.json).
const BUILD = '__COZY_BUILD__';
const SCOPE = new URL(self.registration.scope).pathname;
const PFX = 'cozy:' + SCOPE + ':';
const APP = PFX + 'app:' + BUILD;
const ART = PFX + 'art';
const ART_MAX = 900; // paintings kept (oldest dropped first); a full house set is ~600
// Pre-Batch-8 builds stored everything in one origin-wide 'cozy-v1' cache.
// Production (/kids-house-game/) and preview (/cozy-preview/) share andrewmunruh.github.io,
// so only the production scope may delete that legacy cache. Preview must leave it alone
// or an iPad that opened both would lose production's offline shell. When production ships
// Batch 8 it still clears cozy-v1 (and moves to scoped cozy:/kids-house-game/:… caches).
const LEGACY = 'cozy-v1';
const OWN_LEGACY = SCOPE === '/kids-house-game/';

self.addEventListener('install', () => { self.skipWaiting(); });
async function sweep() {
  try {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => (OWN_LEGACY && k === LEGACY) || (k.startsWith(PFX + 'app:') && k !== APP)).map(k => caches.delete(k)));
  } catch (err) { /* storage trouble must never block the game */ }
}
// Sweep again on the first request this worker serves: a write the old worker had in flight
// while we activated can re-create its cache.
let swept = false;
self.addEventListener('activate', e => e.waitUntil((async () => {
  await sweep();
  await self.clients.claim();
  const cs = await self.clients.matchAll({ type: 'window' });
  cs.forEach(c => c.postMessage({ type: 'cozy-sw', build: BUILD }));
})()));
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'cozy-build?' && e.source) e.source.postMessage({ type: 'cozy-sw', build: BUILD });
  // Page nudge for a waiting worker (see sw-client.ts kickWaiting). Chromium can leave this worker 'installed'
  // behind the pre-Batch-8 worker even though install already called skipWaiting(), when the old worker took a
  // request right after we installed; it then only activates on the next navigation, and that navigation can hang.
  // Calling skipWaiting() again from a message event activates it at once. Idempotent: no-op once active.
  if (e.data && e.data.type === 'cozy-skip') e.waitUntil(self.skipWaiting());
});

function artRequest(url) {
  const path = url.pathname;
  // Dev and an unhashed file still live under /assets/art/. The Vite build
  // emits each painting as /assets/<name>-<hash>.webp, so the directory
  // match never sees it and the painting would stay network-first.
  if (path.indexOf('/assets/art/') >= 0) return true;
  return path.indexOf('/assets/') >= 0 && path.slice(-5).toLowerCase() === '.webp';
}

let trimming = false;
async function trimArt(cache) {
  if (trimming) return; trimming = true;
  try { const keys = await cache.keys(); for (let i = 0; i < keys.length - ART_MAX; i++) await cache.delete(keys[i]); }
  catch (err) { /* ignore */ } finally { trimming = false; }
}

// Item paintings are cache-first: one network fetch on a miss, then the cache.
// A missing file is a normal 404. Nothing here calls cache.add, which logs
// "Failed to execute 'add' on 'Cache'" when the response is not ok.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (!swept) { swept = true; e.waitUntil(new Promise(r => setTimeout(r, 3000)).then(sweep)); }
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;          // neighborhood server, fonts: network only
  if (!url.pathname.startsWith(SCOPE)) return;
  if (url.pathname.endsWith('/sw-switch.json')) return;     // the kill switch is never cached
  if (artRequest(url)) {
    e.respondWith((async () => {
      try {
        const cache = await caches.open(ART);
        const hit = await cache.match(req);
        if (hit) return hit;
        const r = await fetch(req);
        if (r && r.ok) { await cache.put(req, r.clone()); trimArt(cache); }
        return r;
      } catch (err) {
        return new Response('', { status: 404, statusText: 'Not Found' });
      }
    })());
    return;
  }
  // Everything else in scope: network first, so a new deploy shows up right away; cache for offline.
  const nav = req.mode === 'navigate';
  e.respondWith(fetch(req).then(r => {
    if (r.ok && r.type === 'basic') {
      const c = r.clone();
      // Pages are stored once under the scope URL so ?hood=... links still open offline.
      caches.open(APP).then(x => x.put(nav ? SCOPE : req, c)).catch(() => {});
    }
    return r;
  }).catch(async () => {
    const cache = await caches.open(APP);
    const hit = await cache.match(nav ? SCOPE : req) || (nav ? null : await caches.match(req));
    return hit || new Response('', { status: 504 });
  }));
});
