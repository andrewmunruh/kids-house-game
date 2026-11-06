// Cozy House KILL-SWITCH service worker.
// Shipped as dist/sw.js only by a build with COZY_SW_KILL=1 (see vite.config.ts). Browsers re-check
// sw.js on every visit, so any installed worker (including the old 'cozy-v1' one from before Batch 8)
// is replaced by this one, which removes our caches, unregisters itself, and reloads open tabs so
// they come straight from the network. Saved houses live in localStorage and are not touched.
const SCOPE = new URL(self.registration.scope).pathname;
self.addEventListener('install', () => { self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil((async () => {
  try {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k === 'cozy-v1' || k.startsWith('cozy:' + SCOPE + ':')).map(k => caches.delete(k)));
  } catch (err) { /* ignore */ }
  try { await self.registration.unregister(); } catch (err) { /* ignore */ }
  const cs = await self.clients.matchAll({ type: 'window' });
  cs.forEach(c => { try { c.navigate(c.url); } catch (err) { /* ignore */ } });
})()));
// No fetch handler: every request goes to the network.
