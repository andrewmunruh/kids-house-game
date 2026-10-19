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

export function installJuice() {
  document.addEventListener('pointerup', e => {
    if (prefersReducedMotion()) return;
    const b = (e.target as HTMLElement | null)?.closest('button');
    if (!b) return;
    b.classList.remove('spring');
    void b.offsetWidth;
    b.classList.add('spring');
  }, true);
}
