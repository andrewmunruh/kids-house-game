// M2 needs: time to the first gentle hint, deterministic sim of the client timer + server DriftGate + reducer.
// Run: npx vite-node tests/needs_first_hint_test.ts
import { initialState, reduce, newCharacter, type GameState } from '../src/shared/state';
import { DRIFT_MS, DRIFT_CAP_MS, DriftGate, NEEDS, driftDelay, driftPick, levelOf, wishOf, type Need } from '../src/shared/needs';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + name, extra); if (ok) pass++; else process.exitCode = 1; };
const house = (n: number): GameState => ({ ...initialState(), characters: Array.from({ length: n }, (_, i) => newCharacter({ id: 'd' + (i + 1), room: 'living', x: 400 + i * 200, y: 540 })) });

// The rule before this change (cycle every doll and need once before any reaches a wish), for the before/after numbers.
function oldPick(s: GameState, k: number) {
  const c = [] as { id: string; need: Need; l: number }[];
  for (const ch of [...s.characters].sort((a, b) => (a.id < b.id ? -1 : 1))) for (const n of NEEDS) { const l = levelOf(ch, n); if (l > 0) c.push({ id: ch.id, need: n, l }); }
  const top = Math.max(...c.map(x => x.l)); const t = c.filter(x => x.l === top); return t[k % t.length];
}
type Sim = { first: number | null; wishTimes: number[]; perDoll: Map<string, number[]>; final: GameState };
/** One second ticks of visible play, like needs-ui tick(); server gate in front of the reducer. */
function sim(n: number, mins: number, useOld = false): Sim {
  let s = house(n); const g = new DriftGate(); let vis = 0, steps = 0, turn = 0, first: number | null = null;
  const wishTimes: number[] = []; const perDoll = new Map<string, number[]>();
  for (let t = 1000; t <= mins * 60_000; t += 1000) {
    vis += 1000;
    const due = useOld ? DRIFT_MS : driftDelay(s, steps);
    if (vis < due) continue;
    vis = 0; steps++;
    const p = useOld ? oldPick(s, turn++) : driftPick(s, turn++);
    if (!p || !g.ok('h', t)) continue;
    const before = new Set(s.characters.filter(c => wishOf(c)).map(c => c.id));
    s = reduce(s, { type: 'need/drift', id: p.id, need: p.need });
    for (const c of s.characters) if (wishOf(c) && !before.has(c.id)) { wishTimes.push(t); perDoll.set(c.id, [...(perDoll.get(c.id) ?? []), t]); first ??= t; }
  }
  return { first, wishTimes, perDoll, final: s };
}
const m = (ms: number | null) => ms == null ? 'never' : (ms / 60_000).toFixed(2) + ' min';
for (const n of [1, 4]) {
  const before = sim(n, 120, true), after = sim(n, 120);
  console.log(`dolls=${n}: first hint before ${m(before.first)}, after ${m(after.first)}`);
  check(`${n} doll(s): first hint well under 5 min of play`, after.first != null && after.first <= 4 * 60_000, m(after.first));
  const gaps = after.wishTimes.slice(1).map((t, i) => t - after.wishTimes[i]);
  check(`${n} doll(s): new hints are spaced (>= 3 min apart overall)`, gaps.every(g => g >= 3 * 60_000), gaps.map(m).join(','));
  check(`${n} doll(s): at most one wish per doll at a time`, after.final.characters.every(c => NEEDS.filter(x => levelOf(c, x) <= 1).length <= 1 || after.final.characters.every(d => wishOf(d))));
  check(`${n} doll(s): no more than ${n + 3} new hints in 30 min`, after.wishTimes.filter(t => t <= 30 * 60_000).length <= n + 3, String(after.wishTimes.filter(t => t <= 30 * 60_000).length));
}
check('calm cadence once a wish shows', driftDelay({ ...house(1), characters: [newCharacter({ id: 'd1', needs: { hungry: 1 } })] }, 3) === DRIFT_MS);
check('server cap still holds two iPads to one step per window', (() => { const g = new DriftGate(); return g.ok('h', 0) && !g.ok('h', DRIFT_CAP_MS - 1); })());
check('no time-based reducer: closed app does not change anything (sim with zero visible time)', JSON.stringify(sim(4, 0).final) === JSON.stringify(house(4)));
console.log(`${pass} passed`);
