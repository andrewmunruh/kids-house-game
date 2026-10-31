// Friends' avatars glide between position updates. Updates arrive every ~100-300 ms depending on the
// network, so a fixed 120 ms slide made a friend dash, stop, dash. Stretch the slide to the gap we just saw.
export const GLIDE_MIN = 120, GLIDE_MAX = 300;
export function glideMs(gapMs: number): number {
  if (!Number.isFinite(gapMs) || gapMs <= 0) return GLIDE_MIN;
  return Math.round(Math.min(GLIDE_MAX, Math.max(GLIDE_MIN, gapMs)));
}
/** Set left/top on a friend's avatar with a slide that fits how often her updates come. */
export function glide(el: HTMLElement, left: string, top: string, now = performance.now()) {
  if (el.style.left === left && el.style.top === top) return;
  if (el.classList.contains('other')) {
    const last = Number(el.dataset.glideAt || 0);
    el.dataset.glideAt = String(now);
    // Smooth the gap a little and slide slightly longer than it, so she keeps moving until the next update lands.
    const gap = last ? Math.min(now - last, 600) : GLIDE_MIN;
    const prev = Number(el.dataset.glideGap || 0) || gap;
    const avg = prev * 0.5 + gap * 0.5;
    el.dataset.glideGap = String(avg);
    el.style.transitionDuration = glideMs(avg * 1.15) + 'ms';
  }
  el.style.left = left; el.style.top = top;
}
