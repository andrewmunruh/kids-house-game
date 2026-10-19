// One-line switch for optional raster item art. Not stored on the house.
// `?art=v1` draws the current SVG. Anything else may use a 2× WebP when one exists.
import { setRasterOn } from './cache';

export const ART_RASTER = true;

let override: boolean | null = null;

/** Raster wins unless this page forced the SVG drawings. */
export function artRasterOn(): boolean {
  return override ?? ART_RASTER;
}

/** Sample pages and tests use this to draw one side, then the other. */
export function setArtRaster(v: boolean): void {
  override = v;
  setRasterOn(v);
}

/**
 * `?art=v1` forces the current SVG. `?art=v2` forces raster when a file exists.
 * Anything else follows ART_RASTER.
 */
export function setArtFromSearch(search: string): boolean {
  const art = new URLSearchParams(search.replace(/^\?/, '')).get('art');
  if (art === 'v1') override = false;
  else if (art === 'v2') override = true;
  else override = null;
  const on = override ?? ART_RASTER;
  setRasterOn(on);
  return on;
}
