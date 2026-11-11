// Service worker start-up, kill switch, and the "New stuff! Tap to refresh" note (Batch 8).
//
// Kill switch, two levers (both off by default):
//  1. sw-switch.json {"sw":"off"} on the server: this build unregisters our worker, deletes our
//     caches and reloads once, uncontrolled. Offline or unreadable switch = keep going as normal.
//  2. A build with COZY_SW_KILL=1 ships a self-removing sw.js (sw/kill.js). That one works even
//     for old pages whose JavaScript knows nothing about the switch.
// Saved houses (localStorage) are never touched by either lever.
declare const __COZY_BUILD__: string;
export const COZY_BUILD: string = typeof __COZY_BUILD__ === 'string' ? __COZY_BUILD__ : 'dev';

const KILLED_KEY = 'cozy-sw-killed';
type Opts = { base: string; safeNow?: () => boolean; showNote?: (onTap: () => void) => void };

let updateReady = false;
export const swUpdateReady = () => updateReady;

async function switchOff(base: string): Promise<boolean> {
  try {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 4000);
    const r = await fetch(base + 'sw-switch.json?t=' + Date.now(), { cache: 'no-store', signal: ctl.signal });
    clearTimeout(t);
    if (!r.ok) return false;
    const j = await r.json();
    return !!j && j.sw === 'off';
  } catch { return false; } // offline / missing file: the switch is "on"
}

export async function killSW(base: string): Promise<void> {
  const scope = location.origin + base;
  // Preview shares andrewmunruh.github.io with production: only /kids-house-game/ may delete cozy-v1.
  const ownLegacy = base === '/kids-house-game/';
  try { for (const reg of await navigator.serviceWorker.getRegistrations()) if (reg.scope === scope || reg.scope.startsWith(scope)) await reg.unregister(); } catch { /* ignore */ }
  try { if ('caches' in self) for (const k of await caches.keys()) if ((ownLegacy && k === 'cozy-v1') || k.startsWith('cozy:' + base + ':')) await caches.delete(k); } catch { /* ignore */ }
}

export async function startSW(o: Opts): Promise<void> {
  if (!('serviceWorker' in navigator)) return;
  const sw = navigator.serviceWorker;
  if (await switchOff(o.base)) {
    await killSW(o.base);
    let once = false; try { once = sessionStorage.getItem(KILLED_KEY) === '1'; sessionStorage.setItem(KILLED_KEY, '1'); } catch { once = true; }
    if (sw.controller && !once) location.reload();
    return;
  }
  try { sessionStorage.removeItem(KILLED_KEY); } catch { /* ignore */ }

  // A different build took over this tab (its old JavaScript keeps running): offer a refresh.
  sw.addEventListener('message', e => {
    const d = e.data;
    if (d && d.type === 'cozy-sw' && typeof d.build === 'string' && !d.build.startsWith('__') && d.build !== COZY_BUILD && !updateReady) {
      updateReady = true; offer(o);
    }
  });
  sw.addEventListener('controllerchange', () => { try { sw.controller?.postMessage({ type: 'cozy-build?' }); } catch { /* ignore */ } });
  let reg: ServiceWorkerRegistration | undefined;
  try { reg = await sw.register(o.base + 'sw.js'); } catch { return; }
  kickWaiting(reg);
  try { sw.controller?.postMessage({ type: 'cozy-build?' }); } catch { /* ignore */ }
  // An iPad app can stay open for days: look for a new build when it comes back to the front.
  let last = Date.now();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible' || Date.now() - last < 10 * 60e3) return;
    last = Date.now(); reg?.update().catch(() => {});
  });
}

// A new worker that installed but is still waiting (Chromium, right after the pre-Batch-8 'cozy-v1' worker handled
// one of our requests) gets skipWaiting again via a message, so it activates now: it clears the old caches
// (cozy-v1 only on /kids-house-game/) and takes over, instead of waiting for the next navigation (which can hang).
// A nudge sent while the old worker is still busy can be ignored, so it repeats with backoff (about 1 s to 28 s)
// until nothing is waiting. Safe to repeat; the kill-switch worker has no message handler.
function kickWaiting(reg: ServiceWorkerRegistration): void {
  let tries = 0; let timer: ReturnType<typeof setTimeout> | undefined;
  const kick = () => {
    timer = undefined;
    const w = reg.waiting; if (!w) return;
    try { w.postMessage({ type: 'cozy-skip' }); } catch { /* ignore */ }
    if (++tries < 8) timer = setTimeout(kick, 1000 * tries);
  };
  const soon = () => { if (timer === undefined) kick(); };
  const watch = (w: ServiceWorker | null) => w?.addEventListener('statechange', () => { if (w.state === 'installed') { tries = 0; soon(); } });
  soon(); watch(reg.installing);
  reg.addEventListener('updatefound', () => watch(reg.installing));
}

function offer(o: Opts) {
  const tap = () => location.reload(); // pagehide flushes the save first (shared/state.ts)
  const show = () => {
    if (o.safeNow && !o.safeNow()) { setTimeout(show, 2000); return; } // never mid-drag
    (o.showNote ?? defaultNote)(tap);
  };
  show();
}

function defaultNote(onTap: () => void) {
  if (document.querySelector('.updateNote')) return;
  const t = document.createElement('div'); t.className = 'toast grownNotice updateNote'; t.setAttribute('role', 'status');
  t.innerHTML = '<span>New stuff! Tap to refresh</span><button type="button">Refresh</button>';
  t.addEventListener('click', onTap);
  (document.getElementById('toastLane') ?? document.body).appendChild(t);
}
