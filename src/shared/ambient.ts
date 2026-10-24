// Ambient object reactions (M1). Pure and deterministic: every iPad computes the same
// reactions from the same synced state, so reactions are never sent over the wire.
// Only an item's `on` flag is synced (item/power).

export type AmbRole = 'stereo' | 'musicbox' | 'tv' | 'fire';
export type ToyRole = 'bounce' | 'hug';
export type ReactionKind = 'dance' | 'sway' | 'watch' | 'warm' | 'hug' | 'bounce' | 'bathe' | 'nibble';

const slugOf = (kind: string) => String(kind || '').replace(/^pack:/, '').toLowerCase();

const ROLE: Record<string, AmbRole> = {
  'cute-speaker': 'stereo', 'cc-record-player': 'stereo', 'retro-radio': 'stereo',
  'music-box': 'musicbox',
  tv: 'tv',
  fireplace: 'fire', 'brick-fireplace': 'fire', 'wc-woodstove': 'fire', woodstove: 'fire', 'wc-stone-hearth': 'fire', 'fire-pit': 'fire',
};

/** Ambient role of a catalog kind, or null when tapping it in Play does not power it. */
export function roleOf(kind: string): AmbRole | null { return ROLE[slugOf(kind)] ?? null; }
export function isPowerable(kind: string): boolean { return roleOf(kind) !== null; }

export function toyRoleOf(kind: string): ToyRole | null {
  const k = slugOf(kind);
  if (k === 'ball' || k === 'beach-ball' || k === 'balloon') return 'bounce';
  if (k === 'teddy' || /plush/.test(k)) return 'hug';
  return null;
}
export const isTub = (kind: string) => /(^|-)tub$/.test(slugOf(kind));
export const isFridge = (kind: string) => /fridge$/.test(slugOf(kind));

/** Reach in room units (room is 1600 wide). Vertical distance counts 1.5x (floor perspective). */
export const RADIUS: Record<AmbRole, number> = { stereo: 220, musicbox: 160, tv: 280, fire: 230 };
export const TOY_RADIUS = 70, FRIDGE_RADIUS = 130, TUB_HALF = 0.4;
/** At most this many dolls animate per room, to hold 60fps on an iPad 10th gen. */
export const MAX_REACTING = 6;
/** The music box winds down on its own (client only; the `on` flag stays as the kids left it). */
export const MUSIC_BOX_MS = 20000;
/** Beat length of the dance loop. Phase is anchored to the wall clock so two iPads line up. */
export const BEAT_MS = 900;

const PRIORITY: AmbRole[] = ['stereo', 'tv', 'fire', 'musicbox'];

export interface AmbItem { id: string; kind: string; x: number; y: number; on?: boolean; w?: number }
export interface AmbChar { id: string; x: number; y: number; seated?: boolean; lying?: boolean }
export interface Reaction { kind: ReactionKind; item: string; phase: number; face: -1 | 1 }
export interface AmbOpts { fridgesOpen?: ReadonlySet<string>; musicBoxDone?: ReadonlySet<string> }

/** Stable 0..1 phase from (itemId, charId), so a group of dancers is not in lockstep. */
export function phaseOf(itemId: string, charId: string): number {
  let h = 2166136261;
  const s = itemId + '|' + charId;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return ((h >>> 0) % 1000) / 1000;
}

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, (a.y - b.y) * 1.5);

/** Which doll reacts to which item. Same input gives the same output on every client. */
export function reactionsFor(items: readonly AmbItem[], chars: readonly AmbChar[], opts: AmbOpts = {}): Map<string, Reaction> {
  const out = new Map<string, Reaction>();
  const sorted = [...chars].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  const live = items.filter(i => i.on && roleOf(i.kind) && !(roleOf(i.kind) === 'musicbox' && opts.musicBoxDone?.has(i.id)));
  type Cand = { c: AmbChar; it: AmbItem; d: number; kind: ReactionKind };
  const cands: Cand[] = [];
  for (const c of sorted) {
    if (c.lying) continue;
    let best: Cand | null = null;
    for (const role of PRIORITY) {
      for (const it of live) {
        if (roleOf(it.kind) !== role) continue;
        const d = dist(c, it);
        if (d > RADIUS[role]) continue;
        if (c.seated && role !== 'tv' && role !== 'musicbox') continue;
        const kind: ReactionKind = role === 'stereo' ? 'dance' : role === 'tv' ? 'watch' : role === 'fire' ? 'warm' : 'sway';
        if (!best || d < best.d || (d === best.d && it.id < best.it.id)) best = { c, it, d, kind };
      }
      if (best) break;
    }
    if (!best && !c.seated) {
      for (const it of items) {
        const toy = toyRoleOf(it.kind);
        let kind: ReactionKind | null = null, d = dist(c, it);
        if (toy && d <= TOY_RADIUS) kind = toy;
        else if (isFridge(it.kind) && opts.fridgesOpen?.has(it.id) && d <= FRIDGE_RADIUS) kind = 'nibble';
        else if (isTub(it.kind) && Math.abs(c.x - it.x) <= (it.w ?? 240) * TUB_HALF && Math.abs(c.y - it.y) <= 40) kind = 'bathe';
        if (kind && (!best || d < best.d || (d === best.d && it.id < best.it.id))) best = { c, it, d, kind };
      }
    }
    if (best) cands.push(best);
  }
  cands.sort((a, b) => a.d - b.d || (a.c.id < b.c.id ? -1 : 1));
  for (const k of cands.slice(0, MAX_REACTING)) {
    out.set(k.c.id, { kind: k.kind, item: k.it.id, phase: phaseOf(k.it.id, k.c.id), face: k.it.x < k.c.x ? -1 : 1 });
  }
  return out;
}

/** Negative animation-delay (ms) that puts the loop at the same spot on every iPad. */
export function syncDelayMs(phase: number, period: number, nowMs: number): number {
  return -((nowMs + phase * period) % period);
}
