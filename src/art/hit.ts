// Raster items are grabbed only where the painting is opaque. Empty corners
// (under a table, beside a lamp) fall through to whatever is behind them.
// ?art=v1 never reaches this: those items are SVG, and SVG hit-testing is unchanged.

const sheets = new WeakMap<HTMLImageElement, Uint8ClampedArray>();

function pixelsOf(img: HTMLImageElement): Uint8ClampedArray | null {
  const cached = sheets.get(img);
  if (cached) return cached;
  if (!img.complete || !img.naturalWidth) return null;
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  try {
    ctx.drawImage(img, 0, 0);
  } catch {
    return null;
  }
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  sheets.set(img, data);
  return data;
}

/** Bitmap pixel under a screen point, honoring object-fit and a horizontal flip. */
export function bitmapPoint(img: HTMLImageElement, clientX: number, clientY: number): { x: number; y: number } | null {
  const rect = img.getBoundingClientRect();
  if (rect.width < 1 || rect.height < 1 || !img.naturalWidth) return null;
  let u = (clientX - rect.left) / rect.width;
  const v = (clientY - rect.top) / rect.height;
  if (img.closest('.flipped')) u = 1 - u;
  const nw = img.naturalWidth;
  const nh = img.naturalHeight;
  const scale = Math.min(rect.width / nw, rect.height / nh);
  const dw = nw * scale;
  const dh = nh * scale;
  // .packimg is object-position: 50% 100%
  const ox = (rect.width - dw) * 0.5;
  const oy = rect.height - dh;
  const x = (u * rect.width - ox) / scale;
  const y = (v * rect.height - oy) / scale;
  if (x < 0 || y < 0 || x >= nw || y >= nh) return null;
  return { x, y };
}

/** True when the tap lands on painted pixels, not the clear part of the square. */
export function artSolid(img: HTMLImageElement, clientX: number, clientY: number): boolean {
  const data = pixelsOf(img);
  const pt = data && bitmapPoint(img, clientX, clientY);
  if (!data || !pt) return !data;
  const x = Math.floor(pt.x);
  const y = Math.floor(pt.y);
  const i = (y * img.naturalWidth + x) * 4 + 3;
  return data[i] > 24;
}

/** The element under a tap, skipping raster images that are clear at that point. */
export function topHit(clientX: number, clientY: number): Element | null {
  const hidden: HTMLElement[] = [];
  try {
    for (let i = 0; i < 12; i++) {
      const el = document.elementFromPoint(clientX, clientY);
      if (!el) return null;
      const img = el.closest('img.artimg') as HTMLImageElement | null;
      if (img && !artSolid(img, clientX, clientY)) {
        hidden.push(img);
        img.style.pointerEvents = 'none';
        continue;
      }
      return el;
    }
    return null;
  } finally {
    for (let i = 0; i < hidden.length; i++) hidden[i].style.pointerEvents = '';
  }
}
