// Dev spike for a sit pose. Off unless the page is opened with ?sit=1.
// The pose is drawn locally and is never written to the house or the street.
import type { Pose } from './geom';

/** Legs swing out, body stays upright. Hair, hats, and clothes use the standing layers. */
export const SIT_POSE: Pose = {
  hip: 0,
  head: 3,
  armL: 26,
  armR: -22,
  legL: -76,
  legR: 76,
  legLLift: 8,
  legRLift: 8,
};

/** True only for `?sit=1`. Any other query, including none, stays off. */
export function sitSpikeOn(search?: string): boolean {
  try {
    const q = search ?? (typeof location === 'undefined' ? '' : location.search);
    return new URLSearchParams(q.replace(/^\?/, '')).get('sit') === '1';
  } catch {
    return false;
  }
}
