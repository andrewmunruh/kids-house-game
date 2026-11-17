// Client-only: which wish bubble a kid should see.
// Shared wishOf() still picks the lowest leftover need; we hide it while she is
// already meeting a need here (asleep, in the tub, holding a snack) so z z and
// bath bubbles can read clearly.
import type { Character, GameState } from './shared/state';
import { meetableHere, wishOf, type Need } from './shared/needs';

export function wishToShow(s: GameState, c: Character): Need | null {
  const w = wishOf(c);
  if (!w) return null;
  if (meetableHere(s, c).length) return null;
  return w;
}
