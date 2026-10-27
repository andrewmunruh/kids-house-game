// M3 ambient items (the rest of the plan's table). Pure, deterministic, never sent.
// None of these store anything: piano/keyboard "play" and the stove are local taps (like the
// M1 fridge), and the rest are always-on and react to synced doll positions only.
// Why no `on` for them: a 10ef736 client's cleanItem drops `on` from kinds it does not know
// as powerable, so storing it would not survive an old iPad's write. Nothing new is stored.

export type MoreKind = 'play' | 'listen' | 'stir' | 'swing' | 'slide' | 'look' | 'kneel';
export type MoreRole = 'keys' | 'stove' | 'swing' | 'slide' | 'water' | 'dollhouse';

const slugOf = (kind: string) => String(kind || '').replace(/^pack:/, '').toLowerCase();
const MORE: Record<string, MoreRole> = {
  piano: 'keys', keyboard: 'keys',
  stove: 'stove',
  'yard-swing': 'swing', 'cc-macrame-swing': 'swing',
  'little-slide': 'slide',
  aquarium: 'water', 'cc-cottage-aquarium': 'water', fish: 'water', 'pink-fountain': 'water', 'lily-pond': 'water', birdbath: 'water',
  'doll-house': 'dollhouse',
};
export function moreRoleOf(kind: string): MoreRole | null { return MORE[slugOf(kind)] ?? null; }
export const isDucky = (kind: string) => slugOf(kind) === 'rubber-ducky';

/** Reach in room units (vertical counts 1.5x, same as M1). */
export const MORE_RADIUS = { play: 110, listen: 260, stir: 140, swing: 70, slide: 90, look: 200, kneel: 120 } as const;
/** A tapped piano plays for this long on the tapper's iPad, then settles. */
export const KEYS_MS = 9000;

export interface MoreOpts { keysPlaying?: ReadonlySet<string>; opened?: ReadonlySet<string> }
export interface MoreHit { kind: MoreKind; d: number }

/** The reaction one nearby item gives one doll, or null. Seated dolls only listen or look. */
export function moreReaction(itKind: string, itId: string, d: number, seated: boolean, opts: MoreOpts = {}): MoreHit | null {
  const role = moreRoleOf(itKind);
  if (!role) return null;
  switch (role) {
    case 'keys':
      if (!opts.keysPlaying?.has(itId)) return null;
      if (!seated && d <= MORE_RADIUS.play) return { kind: 'play', d };
      return d <= MORE_RADIUS.listen ? { kind: 'listen', d: d + 40 } : null;
    case 'stove': return !seated && opts.opened?.has(itId) && d <= MORE_RADIUS.stir ? { kind: 'stir', d } : null;
    case 'swing': return !seated && d <= MORE_RADIUS.swing ? { kind: 'swing', d } : null;
    case 'slide': return !seated && d <= MORE_RADIUS.slide ? { kind: 'slide', d } : null;
    case 'water': return d <= MORE_RADIUS.look ? { kind: 'look', d: d + 20 } : null;
    case 'dollhouse': return !seated && d <= MORE_RADIUS.kneel ? { kind: 'kneel', d } : null;
  }
}
