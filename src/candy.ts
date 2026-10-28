// Trick-or-treat candy bucket. Every knock gives a treat; nothing ever takes one away.
// Kept in its own localStorage key (not the house save), so save v3 is untouched and
// the count only moves while the app is open and she is knocking.
import { halloweenVisible } from './shared/catalog-halloween';

export const CANDY_KEY = 'cozy-candy';
const TREATS = ['🍬', '🍭', '🍫', '🍪', '🧁', '🍎'];

export interface CandyStore { getItem(k: string): string | null; setItem(k: string, v: string): void }

export function candyCount(s: CandyStore | null | undefined): number {
  try { const n = Number(s?.getItem(CANDY_KEY) ?? 0); return Number.isFinite(n) && n > 0 ? Math.min(9999, Math.floor(n)) : 0; } catch { return 0; }
}
/** One knock, one treat. Returns the new count and which treat came out. */
export function knockTreat(s: CandyStore | null | undefined, roll = Math.random()): { count: number; treat: string } {
  const count = Math.min(9999, candyCount(s) + 1);
  try { s?.setItem(CANDY_KEY, String(count)); } catch { /* private mode: the treat still shows */ }
  return { count, treat: TREATS[Math.floor(Math.max(0, Math.min(0.999, roll)) * TREATS.length)] };
}
/** Trick-or-treat is on in season, with the constant, or with ?halloween=1 for previews. */
export function trickOrTreatOn(now: Date = new Date(), search = typeof location !== 'undefined' ? location.search : ''): boolean {
  if (/[?&]halloween=0\b/.test(search)) return false;
  return /[?&]halloween=1\b/.test(search) || halloweenVisible(now);
}
/** "Reagan came trick-or-treating!" (the server only ever sends a first name or nickname). */
export function knockNote(name: string): string {
  // The server already sends a first name or a pick-list nickname ("Sunny Bunny"); just keep it tidy.
  const first = String(name ?? '').replace(/[^\p{L}' -]/gu, '').replace(/\s+/g, ' ').trim().slice(0, 30) || 'A friend';
  return `${first} came trick-or-treating!`;
}
