// Need-met celebration: short, gentle, one at a time, never blocking input.
// Pure bits live here so unit tests can check duration, picking, and the queue
// without opening a browser. The UI in needs-ui.ts plays what this module returns.
import type { Need } from './shared/needs';
import { NEEDS } from './shared/needs';

/** Hard cap. Particles finish by ~1.2s; the glow is gone by this mark. */
export const CELEBRATE_MS = 1500;

export function raisedNeeds(
  was: Partial<Record<Need, number>> | undefined,
  now: Partial<Record<Need, number>> | undefined,
): Need[] {
  if (!was || !now) return [];
  return NEEDS.filter(n => (now[n] ?? 0) > (was[n] ?? 0));
}

/** Several needs rising in the same frame get one celebration. Prefer the current wish. */
export function celebrationNeed(raised: Need[], wish?: Need | null): Need | null {
  if (!raised.length) return null;
  if (wish && raised.includes(wish)) return wish;
  return raised[0] ?? null;
}

export type CelebrateQueue = { playing: Need | null; until: number; pending: Need | null };

export function emptyCelebrateQueue(): CelebrateQueue {
  return { playing: null, until: 0, pending: null };
}

/** Start now, or remember at most one follow-up. Never starts a second burst on top of the first. */
export function enqueueCelebrate(q: CelebrateQueue, need: Need, now: number): { q: CelebrateQueue; start: Need | null } {
  if (!q.playing || now >= q.until) {
    return { q: { playing: need, until: now + CELEBRATE_MS, pending: null }, start: need };
  }
  return { q: { ...q, pending: need }, start: null };
}

export function tickCelebrate(q: CelebrateQueue, now: number): { q: CelebrateQueue; start: Need | null } {
  if (q.playing && now >= q.until) {
    if (q.pending) {
      return { q: { playing: q.pending, until: now + CELEBRATE_MS, pending: null }, start: q.pending };
    }
    return { q: emptyCelebrateQueue(), start: null };
  }
  return { q, start: null };
}

/** Faceless burst bits. Every need shares a bold ring of stars and hearts
 *  around a gold aura. Angles are from straight up. */
const BITS: { cls: string; a: number; dl: number; text?: string }[] = [
  { cls: 'nb-star', a: -56, dl: 0 },
  { cls: 'nb-heart', a: -28, dl: 40 },
  { cls: 'nb-star', a: 0, dl: 20 },
  { cls: 'nb-heart', a: 28, dl: 50 },
  { cls: 'nb-star', a: 56, dl: 10 },
  { cls: 'nb-spark', a: -78, dl: 30 },
  { cls: 'nb-spark', a: 78, dl: 60 },
];

/** Cheerful, faceless particles. Icons only — no faces on food or items. */
export function burstMarkup(need: Need): string {
  const extra = need === 'hungry' ? 'nb-crumb' : need === 'sleepy' ? 'nb-z' : need === 'clean' ? 'nb-bubble' : 'nb-spark';
  const bits = BITS.map((b) => b.cls === 'nb-heart'
    ? `<i class="nb-heart" style="--a:${b.a}deg;--dl:${b.dl}ms">♥</i>`
    : `<i class="${b.cls}" style="--a:${b.a}deg;--dl:${b.dl}ms"></i>`);
  bits.push(extra === 'nb-z'
    ? `<i class="nb-z" style="--a:12deg;--dl:35ms">z</i>`
    : `<i class="${extra}" style="--a:12deg;--dl:35ms"></i>`);
  return `<div class="need-burst need-burst-${need}" data-need-cele="${need}" aria-hidden="true"><span class="nb-aura"></span>${bits.join('')}</div>`;
}
