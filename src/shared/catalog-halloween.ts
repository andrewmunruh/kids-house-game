// Spooky Cute (Halloween) names, pack label, nursery skips, and the seasonal switch.
// Kept in its own file so other pack branches can add lists without editing the same lines.

export const HALLOWEEN_PACK_ID = 'halloween';
export const HALLOWEEN_PACK_LABEL = 'Spooky Cute';
export const HALLOWEEN_PACK_NAMES: Record<string, string> = { [HALLOWEEN_PACK_ID]: HALLOWEEN_PACK_LABEL };

/**
 * Plain on/off switch. true = always show the pack (preview builds), false = only in season.
 * The pack's items always stay known to the game, so anything already placed keeps rendering
 * after the season ends; only the catalog shelf hides them.
 */
export const HALLOWEEN_ON = false;

/** Oct 24 through Nov 2 (local date), any year. */
export function halloweenSeason(d: Date = new Date()): boolean {
  const m = d.getMonth(), day = d.getDate();
  return (m === 9 && day >= 24) || (m === 10 && day <= 2);
}

export function halloweenVisible(d: Date = new Date(), on: boolean = HALLOWEEN_ON): boolean {
  return on || halloweenSeason(d);
}

/** Spooky pieces stay off the nursery shelf. */
export const HALLOWEEN_NURSERY_SKIP: readonly string[] = [
  'pack:hw-cauldron',
  'pack:hw-cat-statue',
  'pack:hw-witch-hat',
];

/** Item names and the pack name. Letters may name any of these. */
export const HALLOWEEN_CATALOG_NAMES: readonly string[] = [
  'Autumn Leaf Garland',
  'Black Cat Statue',
  'Bubbly Cauldron',
  'Friendly Sheet Ghost',
  'Harvest Hay Bale',
  'Heart and Moon Pumpkin',
  'Moon and Stars Window Cling',
  'Moonbeam Lantern',
  'Spooky Cute',
  'Starry Glow Pumpkin',
  'Starry Witch Hat',
  'Treat Bowl',
];
