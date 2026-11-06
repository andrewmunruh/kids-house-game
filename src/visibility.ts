// D-09: one place that calms the game while the iPad shows something else (home screen, another
// app, screen locked). Audio contexts are suspended and resumed; the 1 s heartbeats skip their
// work while hidden (see main.ts, needs-ui.ts, sky-toggle.ts, ambientMusic.ts). Nothing is saved.
const ctxs = new Set<AudioContext>();
const paused = new Set<AudioContext>();
const onShow: (() => void)[] = [];
let wired = false;
function wire() {
  if (wired || typeof document === 'undefined') return; wired = true;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      for (const c of ctxs) if (c.state === 'running') { paused.add(c); c.suspend().catch(() => {}); }
    } else {
      for (const c of paused) c.resume().catch(() => {}); // a later tap resumes it too if iOS says no
      paused.clear();
      for (const f of onShow) { try { f(); } catch { /* one listener never blocks the rest */ } }
    }
  });
}
/** Suspend this AudioContext while the page is hidden and resume it when it comes back. */
export function trackAudio<T extends AudioContext>(c: T): T { wire(); ctxs.add(c); return c; }
/** Run `f` each time the page becomes visible again. */
export function whenShown(f: () => void): void { wire(); onShow.push(f); }
export const pageHidden = () => typeof document !== 'undefined' && document.hidden;
