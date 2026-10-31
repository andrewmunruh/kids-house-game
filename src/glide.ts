// Friends' avatars glide between position updates. Updates arrive every ~100-300 ms depending on the
// network, so a fixed 120 ms slide made a friend dash, stop, dash. Stretch the slide to the gap we just saw.
// Big jumps (door, far seat), her first placement, and screen resizes/rotations snap instead of sliding.
import { prefersReducedMotion } from './juice';

export const GLIDE_MIN = 120, GLIDE_MAX = 300;
/** A jump farther than this share of the scene (either axis) is a teleport: snap. */
export const SNAP_FRAC = 0.25;
/** Position changes this soon after a resize or rotation are re-layout, not walking: snap. */
export const RESIZE_SNAP_MS = 500;

export function glideMs(gapMs: number): number {
  if (!Number.isFinite(gapMs) || gapMs <= 0) return GLIDE_MIN;
  return Math.round(Math.min(GLIDE_MAX, Math.max(GLIDE_MIN, gapMs)));
}

export type GlidePlan = { first: boolean; jumpFrac: number; sinceResizeMs: number; reduced: boolean; avgGapMs: number };
/** Slide length in ms for one update (0 = snap). Pure, so the rules are unit-tested. */
export function glidePlanMs(p: GlidePlan): number {
  if (p.reduced || p.first) return 0;
  if (p.sinceResizeMs < RESIZE_SNAP_MS) return 0;
  if (!(p.jumpFrac <= SNAP_FRAC)) return 0; // also snaps when the jump can't be measured (NaN)
  return glideMs(p.avgGapMs * 1.15);
}

let resizedAt = -Infinity;
if (typeof window !== 'undefined') {
  const mark = () => { resizedAt = performance.now(); };
  window.addEventListener('resize', mark); window.addEventListener('orientationchange', mark);
}

/** How far a left/top string moved, as a share of the parent box. '%' values are already shares. */
function frac(a: string, b: string, size: number): number {
  if (!a) return NaN;
  const pa = parseFloat(a), pb = parseFloat(b);
  if (!Number.isFinite(pa) || !Number.isFinite(pb)) return NaN;
  if (a.endsWith('%') && b.endsWith('%')) return Math.abs(pb - pa) / 100;
  if (a.endsWith('px') && b.endsWith('px') && size > 0) return Math.abs(pb - pa) / size;
  return NaN;
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
    const par = el.parentElement;
    const jump = Math.max(frac(el.style.left, left, par?.clientWidth ?? 0), frac(el.style.top, top, par?.clientHeight ?? 0));
    const ms = glidePlanMs({ first: !last || !el.style.left, jumpFrac: jump, sinceResizeMs: now - resizedAt, reduced: prefersReducedMotion(), avgGapMs: avg });
    el.style.transitionDuration = ms + 'ms';
    el.dataset.glideMs = String(ms);
  }
  el.style.left = left; el.style.top = top;
}
