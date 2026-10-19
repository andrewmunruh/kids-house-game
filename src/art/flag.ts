// One-line rollback. Set this to false to ship the previous drawings.
export const ART_V2 = true;

let override: boolean | null = null;

/** The drawing the game uses. The constant wins unless this page forced a side. */
export function artV2On(): boolean {
  return override ?? ART_V2;
}

/** Sample pages use this to draw the before column and the after column. */
export function setArtV2(v: boolean): void {
  override = v;
}

/**
 * `?art=v1` forces the previous drawings. `?art=v2` forces the new ones.
 * Anything else follows ART_V2. The choice is not stored on the house.
 */
export function setArtV2FromSearch(search: string): boolean {
  const art = new URLSearchParams(search.replace(/^\?/, '')).get('art');
  if (art === 'v1') { override = false; return false; }
  if (art === 'v2') { override = true; return true; }
  override = null;
  return ART_V2;
}
