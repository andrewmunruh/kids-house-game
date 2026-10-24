// Tap juice: a spring on buttons, a wiggle on a placed item, and a reduced-motion check.

export function prefersReducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function wiggleItem(el: HTMLElement | null | undefined) {
  if (!el || prefersReducedMotion()) return;
  el.classList.remove('wiggle');
  void el.offsetWidth;
  el.classList.add('wiggle');
  window.setTimeout(() => el.classList.remove('wiggle'), 480);
}

/** Instant press feedback: a class on pointerdown (before click), so round header buttons and drawer cards react within a frame. */
const PRESS_SEL = '.round, .thing';
export function installJuice() {
  let pressed: Element | null = null;
  const release = () => { pressed?.classList.remove('pressing'); pressed = null; };
  document.addEventListener('pointerdown', e => {
    release();
    const el = (e.target as HTMLElement | null)?.closest?.(PRESS_SEL);
    if (!el) return;
    el.classList.add('pressing'); pressed = el;
  }, { capture: true, passive: true });
  for (const t of ['pointerup', 'pointercancel', 'dragstart', 'blur'] as const) window.addEventListener(t, release, { capture: true, passive: true });
  document.addEventListener('pointerup', e => {
    if (prefersReducedMotion()) return;
    const b = (e.target as HTMLElement | null)?.closest('button');
    if (!b) return;
    b.classList.remove('spring');
    void b.offsetWidth;
    b.classList.add('spring');
  }, true);
}
