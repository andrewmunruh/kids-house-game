// Dance Party pure rules. Run: npx vite-node tests/party_test.ts
import { reactionsFor } from '../src/shared/ambient';
import { partyFor } from '../src/shared/party';
let pass = 0;
const check = (n: string, ok: boolean) => { console.log((ok ? 'PASS ' : 'FAIL ') + n); if (ok) pass++; else process.exitCode = 1; };
const spk = { id: 'spk', kind: 'pack:cute-speaker', x: 800, y: 560, on: true };
const teddy = { id: 't1', kind: 'teddy', x: 1000, y: 580 }, sofa = { id: 's1', kind: 'sofa', x: 900, y: 560 };
const farBall = { id: 'b1', kind: 'ball', x: 1500, y: 560 };
const a = { id: 'a', x: 880, y: 560 }, b = { id: 'b', x: 720, y: 560 }, c = { id: 'c', x: 300, y: 560 };
const items = [spk, teddy, sofa, farBall];
const p = partyFor(items, reactionsFor(items, [a, b, c]));
check('2 dancers at a stereo make a party', !!p && p.stereo === 'spk' && p.dancers.join() === 'a,b');
check('only nearby light toys bounce', !!p && p.toys.join() === 't1');
check('one dancer is not a party', partyFor(items, reactionsFor(items, [a, c])) === null);
check('stereo off ends the party', partyFor([{ ...spk, on: false }], reactionsFor([{ ...spk, on: false }], [a, b])) === null);
const mb = { id: 'mb', kind: 'music-box', x: 800, y: 560, on: true };
check('a music box is not a party', partyFor([mb], reactionsFor([mb], [a, b])) === null);
check('deterministic', JSON.stringify(partyFor(items, reactionsFor(items, [b, a]))) === JSON.stringify(p));
console.log(pass + ' passed');
