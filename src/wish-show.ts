// Client-only: which wish bubble a kid should see.
// Shared wishOf() still picks the lowest leftover need; we hide it while she is
// already in a care spot (asleep, in the tub, holding a snack) so z z and
// bath bubbles can read clearly, even after auto-care fills that need.
import type { Character, GameState } from './shared/state';
import { isFood, meetsHere, wishOf, type Need } from './shared/needs';

function holdingFood(c: Character): boolean {
  return !!(c.held?.left && isFood(c.held.left.kind)) || !!(c.held?.right && isFood(c.held.right.kind));
}

export function wishToShow(s: GameState, c: Character): Need | null {
  const w = wishOf(c);
  if (!w) return null;
  if (c.seat?.pose === 'lie') return null;
  if (meetsHere(s, c, 'clean')) return null;
  if (holdingFood(c)) return null;
  return w;
}
