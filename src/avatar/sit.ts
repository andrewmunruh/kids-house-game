// Sit and lie poses for the chibi. Hair, hats, and clothes stay in the standing stack.
// Lie turns the whole body in CSS and only the eyes change for that frame.
import type { Pose } from './geom';

/** Legs swing out, body stays upright. */
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

/** A small rest. The body itself is turned by the pose-lie class. */
export const LIE_POSE: Pose = {
  hip: 0,
  head: -8,
  armL: 18,
  armR: -12,
  legL: -4,
  legR: 6,
  legLLift: 0,
  legRLift: 0,
};

export function poseNamed(name: 'sit' | 'lie' | null | undefined): Pose | null {
  if (name === 'sit') return SIT_POSE;
  if (name === 'lie') return LIE_POSE;
  return null;
}
