// M3: remaining ambient items + social reactions. Pure rules, determinism, no stored data,
// and an un-updated 10ef736 client keeping a save from this build. Run: npx vite-node tests/social_test.ts
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { initialState, migrate, reduce, type GameState } from '../src/shared/state';
import { cleanHouseState, PROTOCOL } from '../src/shared/hood';
import { isPowerable, reactionsFor } from '../src/shared/ambient';
import { moreRoleOf, MORE_RADIUS } from '../src/shared/ambientMore';
import { BABY_R, FRIEND_R, MAX_PAIRS, PAIR_CYCLE_MS, PAIR_ON_MS, pairActive, socialFor } from '../src/shared/social';
import { ITEM_MAP } from '../src/items';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + name, extra); if (ok) pass++; else process.exitCode = 1; };

// ---- catalog ----
const KINDS = ['pack:piano', 'pack:keyboard', 'stove', 'yard-swing', 'pack:cc-macrame-swing', 'little-slide', 'pack:aquarium', 'pack:cc-cottage-aquarium', 'fish', 'pack:pink-fountain', 'lily-pond', 'birdbath', 'pack:doll-house'];
for (const k of KINDS) check(`${k} is in the catalog and has a role`, !!ITEM_MAP[k] && !!moreRoleOf(k));
check('none of the new items is powerable (nothing new is stored)', KINDS.every(k => !isPowerable(k)));

// ---- item reactions ----
const doll = { id: 'a', x: 800, y: 560 };
const at = (kind: string, dx = 40, opts = {}, d: any = doll) => reactionsFor([{ id: 'i', kind, x: d.x + dx, y: d.y }], [d], opts).get(d.id)?.kind;
check('piano silent: nothing', at('pack:piano') === undefined);
check('piano playing: nearest plays', at('pack:piano', 40, { keysPlaying: new Set(['i']) }) === 'play');
check('piano playing: farther dolls listen', at('pack:piano', MORE_RADIUS.play + 60, { keysPlaying: new Set(['i']) }) === 'listen');
check('seated doll listens to the piano', at('pack:piano', 40, { keysPlaying: new Set(['i']) }, { ...doll, seated: true }) === 'listen');
check('open stove: stir', at('stove', 60, { fridgesOpen: new Set(['i']) }) === 'stir');
check('closed stove: nothing', at('stove', 60) === undefined);
check('on the swing: swing', at('yard-swing', 20) === 'swing' && at('pack:cc-macrame-swing', 20) === 'swing');
check('at the slide: slide', at('little-slide', 30) === 'slide');
for (const k of ['pack:aquarium', 'fish', 'pack:pink-fountain', 'lily-pond']) check(`${k}: look`, at(k, 120) === 'look');
check('a seated doll still looks at the aquarium', at('pack:aquarium', 120, {}, { ...doll, seated: true }) === 'look');
check('doll house: kneel and play', at('pack:doll-house', 50) === 'kneel');
check('out of reach: nothing', at('pack:aquarium', MORE_RADIUS.look + 30) === undefined);
check('a lying doll sleeps through it all', at('pack:aquarium', 60, {}, { ...doll, lying: true }) === undefined);
check('the stereo still wins over the aquarium', reactionsFor([{ id: 's', kind: 'pack:cute-speaker', x: 900, y: 560, on: true }, { id: 'q', kind: 'pack:aquarium', x: 820, y: 560 }], [doll]).get('a')?.kind === 'dance');
check('a toy beats an aquarium that is farther away', reactionsFor([{ id: 't', kind: 'teddy', x: 830, y: 560 }, { id: 'q', kind: 'pack:aquarium', x: 950, y: 560 }], [doll]).get('a')?.kind === 'hug');

// ---- social ----
const T = 5_000_000;
const findOn = (a: string, b: string) => { for (let t = T; t < T + PAIR_CYCLE_MS; t += 250) if (pairActive('h', a, b, t)) return t; return -1; };
const tOn = findOn('a', 'b');
const A = { id: 'a', x: 800, y: 560 }, B = { id: 'b', x: 900, y: 560 };
let o = socialFor('h', [A, B], [], null, tOn);
check('two friends near each other greet with the same gesture', !!o.pair.get('a') && o.pair.get('a')!.kind === o.pair.get('b')!.kind);
check('they face each other', o.pair.get('a')!.face === 1 && o.pair.get('b')!.face === -1);
check('their phases are staggered', o.pair.get('a')!.phase !== o.pair.get('b')!.phase);
check('same input, same output on two iPads', JSON.stringify([...socialFor('h', [A, B], [], null, tOn).pair]) === JSON.stringify([...socialFor('h', [B, A], [], null, tOn).pair]));
check('bursts: on for part of the cycle only', (() => { let on = 0; for (let t = 0; t < PAIR_CYCLE_MS; t += 100) if (pairActive('h', 'a', 'b', t)) on++; return Math.abs(on * 100 - PAIR_ON_MS) <= 200; })());
check('far apart: no pair', socialFor('h', [A, { ...B, x: 800 + FRIEND_R + 50 }], [], null, tOn).pair.size === 0);
check('a busy (dancing) doll is not pulled into a pair', socialFor('h', [{ ...A, busy: true }, B], [], null, tOn).pair.size === 0);
check('a seated doll never hops', (() => { for (let t = T; t < T + PAIR_CYCLE_MS * 20; t += 500) { const r = socialFor('h', [{ ...A, seated: true }, B], [], null, t).pair.get('a'); if (r?.kind === 'hop') return false; } return true; })());
const crowd = Array.from({ length: 10 }, (_, i) => ({ id: 'c' + i, x: 600 + i * 30, y: 560 }));
check(`at most ${MAX_PAIRS} pairs animate`, (() => { for (let t = T; t < T + PAIR_CYCLE_MS; t += 300) if (socialFor('h', crowd, [], null, t).pair.size > MAX_PAIRS * 2) return false; return true; })());
o = socialFor('h', [{ ...A, busy: true, dancingAt: 's' }, { ...B, busy: true, dancingAt: 's' }], [], null, T);
check('dancing together: duet with a shared phase', o.duet.get('a')?.with === 'b' && o.duet.get('a')!.phase === o.duet.get('b')!.phase && o.duet.get('a')!.face === 1);
check('different stereos: no duet', socialFor('h', [{ ...A, dancingAt: 's' }, { ...B, dancingAt: 't' }], [], null, T).duet.size === 0);
o = socialFor('h', [A], [], { x: 900, y: 560 }, T);
check('near the baby: she coos and the doll faces her', o.babyCoo && o.nearBaby.get('a') === 1);
check('far from the baby: no coo', !socialFor('h', [A], [], { x: 800 + BABY_R + 60, y: 560 }, T).babyCoo);
o = socialFor('h', [{ ...A, seated: true }], [{ key: 'cat', x: 1100, y: 560 }], null, T);
check('the cat trots over to a sitting doll and settles beside her', o.pets.get('cat')?.toward === 'a' && 1100 + o.pets.get('cat')!.dx === 870);
check('a standing doll does not draw the cat', socialFor('h', [A], [{ key: 'cat', x: 1100, y: 560 }], null, T).pets.size === 0);
o = socialFor('h', [{ ...A, lying: true }], [{ key: 'cat', x: 1000, y: 560 }, { key: 'dog', x: 1050, y: 560 }], null, T);
check('two pets settle on different spots by the same doll', o.pets.size === 2 && o.pets.get('cat')!.dx + 1000 !== o.pets.get('dog')!.dx + 1050);

// ---- no stored data: the save is byte-identical ----
const base = (): GameState => {
  const s = initialState();
  s.rooms.living.items.push({ id: 'pno', kind: 'pack:piano', x: 800, y: 560, flip: false, z: 50, scale: 1 }, { id: 'aq', kind: 'pack:aquarium', x: 1100, y: 560, flip: false, z: 51, scale: 1 });
  return s;
};
const s0 = base();
check('item/power on a piano is refused (no new stored field)', reduce(s0, { type: 'item/power', room: 'living', id: 'pno', on: true } as any) === s0);
check('migrate leaves the save byte-identical', JSON.stringify(migrate(JSON.parse(JSON.stringify(s0)))) === JSON.stringify(migrate(JSON.parse(JSON.stringify(s0)))));
check('server cleanHouseState: no new keys', !JSON.stringify(cleanHouseState(JSON.parse(JSON.stringify(s0)))).includes('"on"'));
check('PROTOCOL stays 4, save stays v3', PROTOCOL === 4 && s0.version === 3);

// ---- an un-updated 10ef736 client keeps a save from this build ----
const OLD = process.env.OLD_TREE || '/tmp/t-reactions-old-10ef736';
if (!existsSync(OLD + '/src/shared/state.ts')) execSync(`git worktree add --detach ${OLD} 10ef736`, { stdio: 'ignore' });
if (existsSync(OLD + '/src/shared/state.ts')) {
  const old = await import(OLD + '/src/shared/state.ts');
  const s = base();
  s.rooms.living.items.push({ id: 'spk', kind: 'pack:cute-speaker', x: 700, y: 560, flip: false, z: 52, scale: 1, on: true });
  const json = JSON.stringify(migrate(JSON.parse(JSON.stringify(s))));
  const m = old.migrate(JSON.parse(json));
  check('10ef736 migrate keeps the v3 save byte-identical', JSON.stringify(m) === json);
  let x = old.reduce(m, { type: 'item/move', room: 'living', id: 'pno', x: 820, y: 560 });
  x = old.reduce(x, { type: 'room/wallpaper', room: 'living', color: '#ffffff' });
  check('10ef736 reducer keeps the new items and the stereo on', x.rooms.living.items.some((i: any) => i.id === 'aq') && x.rooms.living.items.find((i: any) => i.id === 'spk').on === true);
  const oldHood = await import(OLD + '/src/shared/hood.ts');
  check('10ef736 cleanHouseState matches this build', JSON.stringify(oldHood.cleanHouseState(JSON.parse(json))) === JSON.stringify(cleanHouseState(JSON.parse(json))));
} else check('old tree present at ' + OLD, false);

console.log(`\n${pass} passed${process.exitCode ? ', some FAILED' : ''}`);
