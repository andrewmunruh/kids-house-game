// M3 social reactions: dolls to each other, pets to resting dolls, the baby to a visitor.
// Pure and deterministic from synced positions (plus the shared wall-clock minute), so every
// iPad agrees without sending anything. Motion and pose only; nothing here moves a stored position.

export type PairKind = 'wave' | 'hop' | 'heart';
export interface SocDoll { id: string; x: number; y: number; seated?: boolean; lying?: boolean; busy?: boolean; dancingAt?: string }
export interface SocPet { key: string; x: number; y: number }
export interface SocBaby { x: number; y: number }
export interface PairRx { kind: PairKind; with: string; face: -1 | 1; phase: number }
export interface DuetRx { with: string; face: -1 | 1; phase: number }
export interface PetRx { toward: string; dx: number }
export interface SocialOut {
  pair: Map<string, PairRx>;
  duet: Map<string, DuetRx>;
  /** Dolls near the baby, facing her. */
  nearBaby: Map<string, -1 | 1>;
  babyCoo: boolean;
  pets: Map<string, PetRx>;
}

export const FRIEND_R = 200, DUET_R = 170, BABY_R = 210, PET_R = 420, PET_GAP = 70;
/** Pair reactions run in small bursts so a room never feels busy: on for this part of each cycle. */
export const PAIR_CYCLE_MS = 12000, PAIR_ON_MS = 4200;
/** Cap on social animations per room (with M1's 6 ambient dancers, still fine at 60fps). */
export const MAX_PAIRS = 3;
const KINDS: PairKind[] = ['wave', 'hop', 'heart'];

export function hash01(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return ((h >>> 0) % 10000) / 10000;
}
const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, (a.y - b.y) * 1.5);
const byId = (a: { id: string }, b: { id: string }) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

/** Is this pair in its "on" burst right now? Each pair has its own offset, so groups never move in lockstep. */
export function pairActive(seed: string, a: string, b: string, nowMs: number): boolean {
  const off = hash01(seed + '|' + a + '|' + b) * PAIR_CYCLE_MS;
  return (nowMs + off) % PAIR_CYCLE_MS < PAIR_ON_MS;
}
/** Which friendly gesture a pair does this cycle. Same on every iPad. */
export function pairKind(seed: string, a: string, b: string, nowMs: number): PairKind {
  const off = hash01(seed + '|' + a + '|' + b) * PAIR_CYCLE_MS;
  const cycle = Math.floor((nowMs + off) / PAIR_CYCLE_MS);
  return KINDS[Math.floor(hash01(seed + a + b + cycle) * KINDS.length) % KINDS.length];
}

export function socialFor(seed: string, dolls: readonly SocDoll[], pets: readonly SocPet[], baby: SocBaby | null, nowMs: number): SocialOut {
  const out: SocialOut = { pair: new Map(), duet: new Map(), nearBaby: new Map(), babyCoo: false, pets: new Map() };
  const ds = [...dolls].sort(byId);
  // Dance together: two dolls dancing to the same stereo, close to each other, face and match steps.
  const used = new Set<string>();
  for (const a of ds) {
    if (!a.dancingAt || used.has(a.id)) continue;
    let best: SocDoll | null = null, bd = Infinity;
    for (const b of ds) {
      if (b === a || used.has(b.id) || b.dancingAt !== a.dancingAt) continue;
      const d = dist(a, b); if (d <= DUET_R && d < bd) { bd = d; best = b; }
    }
    if (best) {
      const phase = hash01(seed + a.id + best.id);
      out.duet.set(a.id, { with: best.id, face: best.x < a.x ? -1 : 1, phase });
      out.duet.set(best.id, { with: a.id, face: a.x < best.x ? -1 : 1, phase });
      used.add(a.id); used.add(best.id);
    }
  }
  // Friends nearby: closest free pairs first, each doll in one pair.
  const free = ds.filter(d => !d.busy && !d.lying);
  const pairs: { a: SocDoll; b: SocDoll; d: number }[] = [];
  for (let i = 0; i < free.length; i++) for (let j = i + 1; j < free.length; j++) {
    const d = dist(free[i], free[j]); if (d <= FRIEND_R) pairs.push({ a: free[i], b: free[j], d });
  }
  pairs.sort((p, q) => p.d - q.d || (p.a.id + p.b.id < q.a.id + q.b.id ? -1 : 1));
  const paired = new Set<string>();
  for (const { a, b } of pairs) {
    if (out.pair.size >= MAX_PAIRS * 2) break;
    if (paired.has(a.id) || paired.has(b.id)) continue;
    paired.add(a.id); paired.add(b.id);
    if (!pairActive(seed, a.id, b.id, nowMs)) continue;
    // Seated dolls only wave or send a heart; a hop would lift her off the chair.
    let kind = pairKind(seed, a.id, b.id, nowMs);
    if (kind === 'hop' && (a.seated || b.seated)) kind = 'wave';
    const phase = hash01(seed + a.id + b.id);
    out.pair.set(a.id, { kind, with: b.id, face: b.x < a.x ? -1 : 1, phase });
    out.pair.set(b.id, { kind, with: a.id, face: a.x < b.x ? -1 : 1, phase: (phase + 0.18) % 1 });
  }
  // The baby: a gentle coo when anyone is near. Her mood and clock are untouched.
  if (baby) for (const d of ds) if (!d.lying && dist(d, baby) <= BABY_R) { out.nearBaby.set(d.id, baby.x < d.x ? -1 : 1); out.babyCoo = true; }
  // Pets trot over to the closest doll sitting or lying nearby and settle beside her.
  const rest = ds.filter(d => d.seated || d.lying);
  for (const p of [...pets].sort((a, b) => (a.key < b.key ? -1 : 1))) {
    let best: SocDoll | null = null, bd = Infinity;
    for (const d of rest) { const dd = Math.abs(d.x - p.x); if (dd <= PET_R && dd < bd) { bd = dd; best = d; } }
    if (!best) continue;
    const side = p.x <= best.x ? -1 : 1;
    const taken = [...out.pets.values()].some(r => r.toward === best!.id);
    const tx = best.x + side * PET_GAP * (taken ? 1.9 : 1);
    out.pets.set(p.key, { toward: best.id, dx: Math.round(tx - p.x) });
  }
  return out;
}
