// Halloween costumes. Optional `costume` on a character / street look. Save stays v3, protocol 4.
// An old client keeps the field (it spreads unknown keys) and simply draws the plain avatar.
// Join flag cos:1 says a client draws costumes.

/** Plain on/off switch for the whole costume feature. */
export const COSTUMES_ON = true;
/** Season window, inclusive: Oct 24 – Nov 2 (local date). */
export const COSTUME_FROM = { m: 10, d: 24 };
export const COSTUME_TO = { m: 11, d: 2 };

export const HELPER_COLORS = { yellow: '#ffd166', denim: '#4f7fb8', rose: '#f28fb0', mint: '#7fd8b8' } as const;
export type HelperColor = keyof typeof HELPER_COLORS;
export const COSTUME_IDS = ['helper-yellow', 'helper-denim', 'helper-rose', 'helper-mint', 'witch', 'cat', 'ghost', 'skeleton', 'bat'] as const;
export type CostumeId = typeof COSTUME_IDS[number];
const SET = new Set<string>(COSTUME_IDS);

export const COSTUME_NAME: Record<string, string> = {
  helper: 'Yellow Helper', witch: 'Witch hat', cat: 'Black cat', ghost: 'Ghost sheet', skeleton: 'Bone PJs', bat: 'Bat cape',
};

export function cleanCostume(v: unknown): CostumeId | null {
  return typeof v === 'string' && SET.has(v) ? v as CostumeId : null;
}

export function inCostumeSeason(now: Date = new Date()): boolean {
  const m = now.getMonth() + 1, d = now.getDate();
  if (m === COSTUME_FROM.m) return d >= COSTUME_FROM.d;
  if (m === COSTUME_TO.m) return d <= COSTUME_TO.d;
  return false;
}

/** Test hook: window.__costumeDate = 'YYYY-MM-DD' pretends today is that date. */
function today(): Date {
  const g = (typeof globalThis !== 'undefined' ? globalThis : {}) as { __costumeDate?: string };
  if (typeof g.__costumeDate === 'string') { const t = new Date(g.__costumeDate + 'T12:00:00'); if (!isNaN(+t)) return t; }
  return new Date();
}

export function costumesVisible(): boolean {
  return COSTUMES_ON && inCostumeSeason(today());
}

/** The costume to draw, or null. Unknown ids and out-of-season draw the plain avatar. */
export function shownCostume(c: { costume?: unknown } | null | undefined): CostumeId | null {
  if (!c || c.costume == null) return null;
  const id = cleanCostume(c.costume);
  return id && costumesVisible() ? id : null;
}
