// Cozy House KILL-SWITCH service worker.
// Shipped as dist/sw.js only by a build with COZY_SW_KILL=1 (see vite.config.ts). Browsers re-check
// sw.js on every visit, so any installed worker (including the old 'cozy-v1' one from before Batch 8)
// is replaced by this one, which removes this scope's caches (and cozy-v1 only from /kids-house-game/),
// unregisters itself, and reloads open tabs so they come straight from the network.
// Saved houses live in localStorage and are not touched.
const SCOPE = new URL(self.registration.scope).pathname;
// Only production owns the pre-Batch-8 origin-wide 'cozy-v1' cache (preview shares the origin).
const OWN_LEGACY = SCOPE === '/kids-house-game/';
self.addEventListener('install', () => { self.skipWaiting(); });
function ours(keys) {
  return keys.filter(k => (OWN_LEGACY && k === 'cozy-v1') || k.startsWith('cozy:' + SCOPE + ':'));
}
async function wipe(names) {
  try { await Promise.all(names.map(k => caches.delete(k))); } catch (err) { /* ignore */ }
}
// A late cache.put from an outgoing worker can re-create a name we just deleted. After the
// delay we only delete those doomed names, and only if the kill switch is still off and a
// new worker has not re-registered (kill on, then off again inside the delay).
async function killStillOn() {
  try {
    const r = await fetch(new URL('sw-switch.json?t=' + Date.now(), self.registration.scope), { cache: 'no-store' });
    if (!r.ok) return false;
    const j = await r.json();
    return !!j && j.sw === 'off';
  } catch (err) { return false; }
}
async function someoneElseRegistered() {
  try {
    const reg = self.registration;
    const other = w => w && w !== self.serviceWorker;
    if (other(reg.installing) || other(reg.waiting) || other(reg.active)) return true;
  } catch (err) { /* ignore */ }
  return false;
}
self.addEventListener('activate', e => e.waitUntil((async () => {
  let doomed = [];
  try { doomed = ours(await caches.keys()); } catch (err) { /* ignore */ }
  await wipe(doomed);
  try { await self.registration.unregister(); } catch (err) { /* ignore */ }
  // Client.navigate reloads open tabs. Confirm on a real iPad in standalone/PWA mode during
  // soak: some iOS versions no-op navigate from a worker. Unregister still recovers on the
  // next manual open even if navigate does nothing.
  const cs = await self.clients.matchAll({ type: 'window' });
  cs.forEach(c => { try { c.navigate(c.url); } catch (err) { /* ignore */ } });
  // Late caches.open / cache.put from the outgoing worker can re-create a cache after the
  // first wipe (observed 1.1–1.8 s after install). Stay alive and sweep those doomed names
  // once the writes settle. Never navigate or unregister a second time.
  await new Promise(r => setTimeout(r, 3000));
  if (!(await killStillOn())) return;
  if (await someoneElseRegistered()) return;
  await wipe(doomed);
})()));
// No fetch handler: every request goes to the network.
