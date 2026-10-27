// Glow Jam: a shared light-and-sound toy in the Clubhouse. Pure data + validation, used by server, client and tests.
// No scores, no saving. A tap is { i: pad index, c: colour index }; the server relays it to everyone in the Clubhouse.

/** Pads: 8 glowing floor tiles (0-7) and 5 hanging lights (8-12). */
export const JAM_TILES = 8;
export const JAM_LIGHTS = 5;
export const JAM_PADS = JAM_TILES + JAM_LIGHTS;
/** Tapper colours. A kid's colour comes from her pid, so it is the same on every iPad. */
export const JAM_COLORS = ['#ff7eb3', '#ffd43b', '#66d9e8', '#b197fc', '#8ce99a', '#ffa94d', '#f783ac', '#74c0fc'];
/** C-major pentatonic, so any mix of taps sounds nice. Tiles go up left to right, lights sit an octave higher. */
const PENTA = [0, 2, 4, 7, 9];
export function jamFreq(i: number): number {
  const step = i < JAM_TILES ? i : i - JAM_TILES + 5 + 3;
  const semis = PENTA[step % 5] + 12 * Math.floor(step / 5);
  return 261.63 * Math.pow(2, semis / 12);
}
/** Server-side cap per kid. Fast fingers stay fun; a held-down spam cannot flood the room. */
export const JAM_PER_SEC = 8;
export const JAM_BURST = 12;

export function jamColorOf(pid: string): number {
  let h = 0; for (let k = 0; k < pid.length; k++) h = (h * 31 + pid.charCodeAt(k)) >>> 0;
  return h % JAM_COLORS.length;
}
export function cleanJam(m: unknown): { i: number } | null {
  if (!m || typeof m !== 'object') return null;
  const i = (m as { i?: unknown }).i;
  return typeof i === 'number' && Number.isInteger(i) && i >= 0 && i < JAM_PADS ? { i } : null;
}
/** Token bucket. Returns the updated bucket and whether this tap may pass. */
export function jamBucket(b: { t: number; n: number } | undefined, now: number): { b: { t: number; n: number }; ok: boolean } {
  const cur = b ?? { t: now, n: JAM_BURST };
  const n = Math.min(JAM_BURST, cur.n + ((now - cur.t) / 1000) * JAM_PER_SEC);
  return n >= 1 ? { b: { t: now, n: n - 1 }, ok: true } : { b: { t: now, n }, ok: false };
}
