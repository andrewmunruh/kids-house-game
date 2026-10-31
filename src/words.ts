// Kid-facing wording that more than one screen shares: plurals, "why didn't that work?" notes,
// and the small "Chloe moved the sofa" notes. Plain words, no blame, a gentle next step.
import type { Action } from './shared/state';

/** "1 friend", "3 friends". `many` defaults to one + 's'. */
export function plural(n: number, one: string, many = one + 's'): string {
  return `${n} ${n === 1 ? one : many}`;
}

/**
 * What a kid sees when the street says no to her edit (a server nack).
 * '' means stay quiet: noop and invalid happen during normal play (two kids drag at once, a slow tick).
 */
export function nackText(reason: string, action?: Pick<Action, 'type'> | null): string {
  const t = action?.type ?? '';
  switch (reason) {
    case 'locked': return 'This house is locked 🔒 You can look around!';
    case 'notyours':
      if (t === 'char/move' || t.startsWith('item/')) return "That's hers to move 💛";
      return 'Only she can do that one 💛';
    case 'cuddling': return 'Someone is cuddling!';
    case 'nohouse': return "That house isn't on the street anymore.";
    case 'toobig': return 'This house is super full! Put something away first.';
    default: return '';
  }
}
export const NACK_REASONS = ['locked', 'notyours', 'cuddling', 'nohouse', 'toobig', 'noop', 'invalid'] as const;

/** "Chloe moved the sofa" / "Chloe put the lamp away". '' for actions that need no note. */
export function movedNote(who: string, action: Pick<Action, 'type'>, itemName: string): string {
  const what = itemName ? 'the ' + itemName.toLowerCase() : 'something';
  if (!who) return '';
  if (action.type === 'item/move') return `${who} moved ${what}`;
  if (action.type === 'item/delete') return `${who} put ${what} away`;
  return '';
}

/** One note per friend per thing for a short while, so a drag (many moves) shows a single note. */
export function noteGate(windowMs = 5000) {
  const seen = new Map<string, number>();
  return (key: string, now = Date.now()) => {
    const last = seen.get(key) ?? -Infinity;
    if (now - last < windowMs) return false;
    seen.set(key, now);
    if (seen.size > 64) for (const [k, t] of seen) if (now - t > windowMs) seen.delete(k);
    return true;
  };
}

/** Join picker: every name on the list is already playing on another iPad. */
export const ALL_SIGNED_IN = "Everyone's already playing! Ask a grown-up to add your name.";
export const dupName = (name: string) => `${name} is already on the list 💛`;
