// First-run doll: a fixed starter look (sparkle eyes, c1's colours) for automated runs and a house reset only.
// migrate() output must stay byte-identical to the golden JSON captured from base e0a4cfd. Never talks to a server.
import { readFileSync, readdirSync } from 'node:fs';
import { migrate, initialState, reduce } from '../src/shared/state';
import { withStarterLook, sanitizeLook2 } from '../src/shared/avatar';
let fails = 0;
const check = (n: string, ok: boolean, extra = '') => { if (!ok) fails++; console.log((ok ? 'PASS ' : 'FAIL ') + n, extra); };
const dir = new URL('./fixtures/firstrun_golden/', import.meta.url);
for (const f of readdirSync(dir).filter(f => f.endsWith('.json')).sort()) {
  const g = JSON.parse(readFileSync(new URL(f, dir), 'utf8'));
  check(`migrate(${f}) matches the e0a4cfd golden`, JSON.stringify(migrate(g.input)) === JSON.stringify(g.migrated));
}
const s = withStarterLook(initialState()), c = s.characters[0], c1 = initialState().characters[0];
check('starter look has sparkle eyes', c.look2?.eyes === 'sparkle');
check('starter look keeps c1 legacy colours', c.skin === c1.skin && c.hair === c1.hair && c.hairStyle === c1.hairStyle && c.shirt === c1.shirt && c.pants === c1.pants && c.acc === c1.acc);
check('starter look passes sanitizeLook2 unchanged', JSON.stringify(sanitizeLook2(c.look2)) === JSON.stringify(c.look2));
check('starter look is deterministic', JSON.stringify(withStarterLook(initialState())) === JSON.stringify(s));
const had = { ...s, characters: [{ ...c, look2: { ...c.look2!, eyes: 'big' as const } }] };
check('a doll that already has look2 is left alone', withStarterLook(had) === had);
check('initialState() stays classic', initialState().characters[0].look2 === undefined);
check('game/reset gives the starter look', reduce(had, { type: 'game/reset' } as any).characters[0].look2?.eyes === 'sparkle');
check('starter house round-trips through migrate()', JSON.stringify(migrate(JSON.parse(JSON.stringify(s))).characters[0].look2) === JSON.stringify(c.look2));
console.log('RESULT', fails ? 'FAIL' : 'PASS', fails); process.exit(fails ? 1 : 0);
