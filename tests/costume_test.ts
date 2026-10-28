// Halloween costumes: sanitize, season switch, save/reducer, hood look merge, and no-costume avatars unchanged.
import { createHash } from 'node:crypto';
import { corpus } from './costume_corpus';
import { characterSVG } from '../src/character';
import { randomLook2 } from '../src/shared/avatar';
import { COSTUME_IDS, cleanCostume, inCostumeSeason, shownCostume } from '../src/shared/costume';
import { applyLook, cleanLook, cleanLookPatch, PROTOCOL } from '../src/shared/hood';
import { initialState, migrate, reduce } from '../src/shared/state';

let pass = 0;
const check = (n: string, ok: boolean, x = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + n, x); if (ok) pass++; else process.exitCode = 1; };

// Hash of the same corpus rendered by 10ef736 (before costumes), re-pinned once for the
// arm-layer fix: arms + sleeves moved to their own layer above clothes (markup order only,
// no art changed; tests/arm_layer_test.ts guards the order). Old hash e5371abb...ec4b6.
const BASE = 'c2b695a735daebd4ad1366a6169e79688e731a0a9a5f6c3d52dba3e6606ce3c9';
check('no-costume avatars identical to 10ef736 (+arm-layer re-pin)', createHash('sha256').update(corpus().join('\n')).digest('hex') === BASE);
check('protocol stays 4', PROTOCOL === 4);

check('clean ok ids', COSTUME_IDS.every(id => cleanCostume(id) === id));
check('clean rejects junk', [null, undefined, '', 'batman', 7, {}, '<x>'].every(v => cleanCostume(v) === null));
const d = (s: string) => new Date(s + 'T12:00:00');
check('season Oct 24..Nov 2', inCostumeSeason(d('2026-10-24')) && inCostumeSeason(d('2026-11-02')) && inCostumeSeason(d('2026-10-31')));
check('off season', !inCostumeSeason(d('2026-10-23')) && !inCostumeSeason(d('2026-11-03')) && !inCostumeSeason(d('2026-07-04')));
const g = globalThis as { __costumeDate?: string };
g.__costumeDate = '2026-07-04';
check('hidden off season (field kept)', shownCostume({ costume: 'witch' }) === null);
g.__costumeDate = '2026-10-27';
check('shown in season', shownCostume({ costume: 'witch' }) === 'witch');

const look2 = randomLook2(() => 0.4);
const base = { skin: '#f1c27d', hair: '#5b3a29', hairStyle: 1, shirt: '#ff7aa8', pants: '#5aa9e6', look2 };
for (const id of COSTUME_IDS) for (const p of [null, 'sit', 'lie'] as const) for (const h of [false, true]) {
  const svg = characterSVG({ ...base, costume: id }, p, h);
  if (!svg.includes(`data-costume="${id}"`) || svg.length > 60000) check(`draw ${id} ${p} ${h}`, false, String(svg.length));
}
check('every costume draws in every pose', true);
check('classic doll ignores costume', !characterSVG({ ...base, look2: null, costume: 'witch' }).includes('data-costume'));
check('ghost has no face of its own', !/<circle[^>]*data-eye/.test(characterSVG({ ...base, costume: 'ghost' })));

let s = initialState();
const id = s.characters[0]?.id;
if (id) {
  s = reduce(s, { type: 'char/update', id, patch: { costume: 'cat' } } as never);
  check('reducer sets', s.characters.find(c => c.id === id)?.costume === 'cat');
  s = reduce(s, { type: 'char/update', id, patch: { costume: 'nope' } } as never);
  check('reducer drops junk', !('costume' in (s.characters.find(c => c.id === id) || {})));
  s = reduce(s, { type: 'char/update', id, patch: { costume: 'bat' } } as never);
  s = reduce(s, { type: 'char/update', id, patch: { costume: null } } as never);
  check('reducer removes', !('costume' in (s.characters.find(c => c.id === id) || {})));
  const raw = JSON.parse(JSON.stringify({ ...s, characters: s.characters.map((c, i) => i ? c : { ...c, costume: 'ghost' }) }));
  const m = migrate(raw);
  check('save keeps costume, stays v3', m.characters[0].costume === 'ghost' && (m as { version?: number }).version === 3);
  check('migrate drops bad costume', !('costume' in migrate({ ...raw, characters: [{ ...raw.characters[0], costume: 'x' }] }).characters[0]));
} else check('initial state has a kid', false);

const L = cleanLook({ name: 'Mia', look2, costume: 'skeleton' } as never);
check('look carries costume', L?.costume === 'skeleton');
check('look none -> explicit empty', cleanLook({ name: 'Mia', look2, costume: null } as never)?.costume === '' && cleanLookPatch({ costume: null })?.costume === null);
const kept = applyLook(L, { name: 'Mia', look2 } as never);
check('older client look keeps costume', kept?.costume === 'skeleton');
const off = applyLook(L, { name: 'Mia', look2, costume: '' } as never);
check('taking costume off clears it', !off?.costume);
console.log(`${pass} passed`);
