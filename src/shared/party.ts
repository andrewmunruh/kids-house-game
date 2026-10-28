// Dance Party (track E). Pure and deterministic like ambient.ts: derived on every iPad from
// the synced stereo `on` flag and positions. Nothing is stored and nothing is sent.
import { RADIUS, roleOf, toyRoleOf, type AmbItem, type Reaction } from './ambient';

/** Dancers needed before the room turns into a party. */
export const PARTY_MIN = 2;
/** Light toys (plushes, balls, balloons) this close to the stereo bounce along. Room units. */
export const PARTY_TOY_RADIUS = 340;
/** Pets this close to the stereo hop along. Room units. */
export const PARTY_PET_RADIUS = 380;

export interface Party { stereo: string; x: number; y: number; dancers: string[]; toys: string[] }

/** The party in this room, or null. The stereo with the most dancers wins (ties: lowest id). */
export function partyFor(items: readonly AmbItem[], rx: ReadonlyMap<string, Reaction>): Party | null {
  const by = new Map<string, string[]>();
  for (const [cid, r] of rx) {
    if (r.kind !== 'dance') continue;
    const it = items.find(i => i.id === r.item);
    if (!it || !it.on || roleOf(it.kind) !== 'stereo') continue;
    (by.get(r.item) ?? by.set(r.item, []).get(r.item)!).push(cid);
  }
  let best: [string, string[]] | null = null;
  for (const e of [...by].sort((a, b) => (a[0] < b[0] ? -1 : 1))) if (e[1].length >= PARTY_MIN && (!best || e[1].length > best[1].length)) best = e;
  if (!best) return null;
  const st = items.find(i => i.id === best![0])!;
  const toys = items.filter(i => i.id !== st.id && toyRoleOf(i.kind) && Math.hypot(i.x - st.x, (i.y - st.y) * 1.5) <= PARTY_TOY_RADIUS).map(i => i.id).sort();
  return { stereo: st.id, x: st.x, y: st.y, dancers: best[1].sort(), toys };
}
export const partyReach = RADIUS.stereo;
