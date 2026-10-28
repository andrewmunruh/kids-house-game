// Gentle needs (M2). Pure and shared by client and server.
// Each house doll has four cozy levels, 0..3. Missing means 3 (all cozy), so an untouched save
// stays byte-identical. Levels only drift during visible play time (the client proposes a step,
// the server caps the rate per house) and never while the app is closed. Care only raises.
// Pets and the baby have no needs: this module only ever touches `characters`.
import { isFridge, isTub, toyRoleOf, FRIDGE_RADIUS, TOY_RADIUS } from './ambient';
import { pieceWidth } from './sit';
import type { Character, GameState, PlacedItem } from './state';

export type Need = 'sleepy' | 'hungry' | 'playful' | 'clean';
export const NEEDS: readonly Need[] = ['sleepy', 'hungry', 'playful', 'clean'];
export type NeedLevel = 0 | 1 | 2 | 3;
export type Needs = Partial<Record<Need, 0 | 1 | 2>>;
export const FULL: NeedLevel = 3;
/** A wish bubble shows at or below this level. */
export const WISH_AT = 1;
/** Calm cadence: one drift step per this much visible play time while some doll already shows a wish. */
export const DRIFT_MS = 4 * 60_000;
/** Quicker cadence while no doll in the house shows a wish, so the first gentle hint comes within a few minutes. */
export const DRIFT_EARLY_MS = 2 * 60_000;
/** The first step of a play session (visible time only; nothing accrues while closed). */
export const DRIFT_FIRST_MS = 75_000;
/** Server cap: a second step for the same house inside this window is dropped (two iPads cannot double it). */
export const DRIFT_CAP_MS = Math.round(DRIFT_EARLY_MS * 0.8);
/** Visible play time before the next drift step. steps = steps already taken this session. */
export function driftDelay(s: GameState, steps: number): number {
  if (s.characters.some(c => wishOf(c))) return DRIFT_MS;
  return steps === 0 ? DRIFT_FIRST_MS : DRIFT_EARLY_MS;
}

export const isNeed = (v: unknown): v is Need => NEEDS.includes(v as Need);
const slug = (k: string) => String(k || '').replace(/^pack:/, '').toLowerCase();
const FOOD = /^(cake|juice|cupcake|cookie|apple|pie|pizza|donut|sandwich|milk|bread|fruit|.*-cake|.*-pie|.*cookies?)$/;
export const isFood = (kind: string) => FOOD.test(slug(kind));
export const isToy = (kind: string) => !!toyRoleOf(kind) || slug(kind) === 'rubber-ducky';

/** Clamp and drop unknown keys. Full levels are omitted. Null when nothing is left. */
export function cleanNeeds(raw: unknown): Needs | null {
  if (!raw || typeof raw !== 'object') return null;
  const out: Needs = {};
  for (const n of NEEDS) {
    const v = (raw as Record<string, unknown>)[n];
    if (typeof v !== 'number' || !Number.isFinite(v)) continue;
    const l = Math.max(0, Math.min(3, Math.round(v)));
    if (l < 3) out[n] = l as 0 | 1 | 2;
  }
  return Object.keys(out).length ? out : null;
}
export function levelOf(c: Pick<Character, 'needs'> | null | undefined, n: Need): NeedLevel {
  const v = c?.needs?.[n];
  return typeof v === 'number' ? (Math.max(0, Math.min(3, v)) as NeedLevel) : 3;
}
/** The one wish to show (lowest level, then plan order), or null. */
export function wishOf(c: Pick<Character, 'needs'>): Need | null {
  let best: Need | null = null, lv = WISH_AT + 1;
  for (const n of NEEDS) { const l = levelOf(c, n); if (l < lv) { lv = l; best = n; } }
  return best;
}
function withNeeds(c: Character, needs: Needs | null): Character {
  if (needs) return { ...c, needs };
  if (!('needs' in c)) return c;
  const { needs: _d, ...rest } = c; return rest;
}

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, (a.y - b.y) * 1.5);
const holds = (c: Character, f: (k: string) => boolean) => !!((c.held.left && f(c.held.left.kind)) || (c.held.right && f(c.held.right.kind)));
const tubW = (it: PlacedItem) => pieceWidth(it.kind) * (it.scale || 1) * (it.size || 1);

/** Is she somewhere that meets this need right now? Same answer on every client and the server. */
export function meetsHere(s: GameState, c: Character, n: Need): boolean {
  const items = s.rooms[c.room]?.items ?? [];
  switch (n) {
    case 'sleepy': return c.seat?.pose === 'lie' && items.some(i => i.id === c.seat!.item);
    case 'clean': return items.some(i => isTub(i.kind) && Math.abs(c.x - i.x) <= Math.max(60, tubW(i) * 0.45) && Math.abs(c.y - i.y) <= 60);
    case 'hungry': return holds(c, isFood) || items.some(i => (isFridge(i.kind) && dist(c, i) <= FRIDGE_RADIUS + 30) || (isFood(i.kind) && dist(c, i) <= TOY_RADIUS + 40));
    case 'playful': return holds(c, isToy) || items.some(i => isToy(i.kind) && dist(c, i) <= TOY_RADIUS + 40);
  }
}
/** Needs she could meet where she stands and that are not already full. */
export function meetableHere(s: GameState, c: Character): Need[] {
  return NEEDS.filter(n => levelOf(c, n) < 3 && meetsHere(s, c, n));
}

/** need/meet: only raises, straight back to cozy. Returns s unchanged when nothing applies. */
export function reduceMeet(s: GameState, id: string, n: Need): GameState {
  const c = s.characters.find(x => x.id === id);
  if (!c || levelOf(c, n) >= 3 || !meetsHere(s, c, n)) return s;
  const next: Needs = { ...(c.needs ?? {}) }; delete next[n];
  const nc = withNeeds(c, cleanNeeds(next));
  return { ...s, characters: s.characters.map(x => (x.id === id ? nc : x)) };
}
/** need/drift: one gentle step down, never below 0. */
export function reduceDrift(s: GameState, id: string, n: Need): GameState {
  const c = s.characters.find(x => x.id === id);
  const l = levelOf(c, n);
  if (!c || l <= 0) return s;
  const nc = withNeeds(c, cleanNeeds({ ...(c.needs ?? {}), [n]: l - 1 }));
  return { ...s, characters: s.characters.map(x => (x.id === id ? nc : x)) };
}

/** Which doll and need drifts on step k. Deterministic, per doll:
 *  - a doll who already shows a wish is left alone while another doll has none (no piling up);
 *  - a doll with a need already part-way down finishes that one first, so her hint comes in two steps
 *    instead of after every doll and need has gone round once;
 *  - otherwise a fresh doll/need starts, rotating on k.
 *  If every doll already shows a wish, the old rule applies: highest level first, rotating on ties.
 *  A need with no way to meet it in the house (no bed, fridge, tub, or toy) never drifts. */
export function driftPick(s: GameState, k: number): { id: string; need: Need } | null {
  const all = Object.values(s.rooms).flatMap(r => r?.items ?? []);
  const can: Record<Need, boolean> = {
    sleepy: all.some(i => /bed$|^bed|sofa|couch/.test(slug(i.kind))),
    hungry: all.some(i => isFridge(i.kind) || isFood(i.kind)),
    playful: all.some(i => isToy(i.kind)),
    clean: all.some(i => isTub(i.kind)),
  };
  const rot = <T,>(a: T[]) => a[((k % a.length) + a.length) % a.length];
  const cands: { id: string; need: Need; l: number; wish: boolean }[] = [];
  for (const c of [...s.characters].sort((a, b) => (a.id < b.id ? -1 : 1))) {
    const wish = !!wishOf(c);
    for (const n of NEEDS) if (can[n]) { const l = levelOf(c, n); if (l > 0) cands.push({ id: c.id, need: n, l, wish }); }
  }
  if (!cands.length) return null;
  const calm = cands.filter(c => !c.wish);
  if (calm.length) {
    const part = calm.filter(c => c.l < 3);
    const p = part.length ? rot(part) : rot(calm);
    return { id: p.id, need: p.need };
  }
  const top = Math.max(...cands.map(c => c.l));
  const p = rot(cands.filter(c => c.l === top));
  return { id: p.id, need: p.need };
}

/** Rate cap for drift, one step per house per window. Server keeps one of these per process. */
export class DriftGate {
  private last = new Map<string, number>();
  ok(houseId: string, now: number): boolean {
    const t = this.last.get(houseId);
    if (t !== undefined && now - t < DRIFT_CAP_MS) return false;
    this.last.set(houseId, now); return true;
  }
}
