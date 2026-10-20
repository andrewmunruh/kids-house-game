// URLs filled by the per-room loader. Stays off until that chunk reads ?art=.
const urls = new Map<string, string>();
let on = false;

export function rasterOn(): boolean {
  return on;
}

export function setRasterOn(v: boolean): void {
  on = v;
}

export function rasterUrl(kind: string): string | undefined {
  return urls.get(kind);
}

export function rememberRaster(kind: string, url: string): void {
  urls.set(kind, url);
}
