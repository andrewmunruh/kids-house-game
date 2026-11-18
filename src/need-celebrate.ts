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

const ANGLES: Record<Need, number[]> = {
  hungry: [-50, -22, 8, 36, 62],
  sleepy: [-40, -12, 16, 44],
  playful: [-56, -28, 0, 28, 56],
  clean: [-48, -18, 12, 40, 68],
};

/** Gentle, faceless particles. Icons only — no faces on food or items. */
export function burstMarkup(need: Need): string {
  const angles = ANGLES[need] ?? ANGLES.playful;
  const bits = angles.map((a, i) => {
    const delay = i * 40;
    if (need === 'hungry') return `<i class="nb-crumb" style="--a:${a}deg;--dl:${delay}ms"></i>`;
    if (need === 'sleepy') return `<i class="nb-z" style="--a:${a}deg;--dl:${delay}ms">z</i>`;
    if (need === 'clean') return `<i class="nb-bubble" style="--a:${a}deg;--dl:${delay}ms"></i>`;
    return `<i class="nb-spark" style="--a:${a}deg;--dl:${delay}ms"></i>`;
  });
  return `<div class="need-burst need-burst-${need}" data-need-cele="${need}" aria-hidden="true">${bits.join('')}</div>`;
}
