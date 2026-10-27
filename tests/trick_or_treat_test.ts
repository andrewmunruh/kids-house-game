// Trick-or-treat: candy bucket rules, the season switch, and the server knock relay
// (flag-gated, owner only, first name only), including clients that never said halloween:1.
// Never talks to production. Run: npx vite-node tests/trick_or_treat_test.ts
import { Neighborhood, type KV, type Conn, firstName, knockerName } from '../server/core';
import { NICKNAMES, PROTOCOL } from '../src/shared/hood';
import { CANDY_KEY, candyCount, knockTreat, knockNote, trickOrTreatOn } from '../src/candy';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + name, extra); if (ok) pass++; else process.exitCode = 1; };

// ---- bucket ----
const mem = new Map<string, string>();
const ls = { getItem: (k: string) => mem.get(k) ?? null, setItem: (k: string, v: string) => { mem.set(k, v); } };
check('an empty bucket is 0', candyCount(ls) === 0);
let last = 0, allUp = true;
for (let i = 0; i < 25; i++) { const r = knockTreat(ls, i / 25); allUp &&= r.count === last + 1 && !!r.treat; last = r.count; }
check('every knock gives exactly one treat (25 of 25)', allUp && candyCount(ls) === 25);
mem.set(CANDY_KEY, 'garbage'); check('a broken value reads as 0, never negative', candyCount(ls) === 0);
mem.set(CANDY_KEY, '-4'); check('a negative value reads as 0', candyCount(ls) === 0);
check('no storage still gives a treat', knockTreat(null).count === 1);
const throwing = { getItem() { throw new Error('x'); }, setItem() { throw new Error('x'); } };
check('storage that throws still gives a treat', knockTreat(throwing).count === 1);

// ---- season ----
check('on Oct 31', trickOrTreatOn(new Date(2026, 9, 31), ''));
check('off in June', !trickOrTreatOn(new Date(2026, 5, 10), ''));
check('?halloween=1 forces on', trickOrTreatOn(new Date(2026, 5, 10), '?halloween=1'));
check('?halloween=0 forces off', !trickOrTreatOn(new Date(2026, 9, 31), '?x=1&halloween=0'));

// ---- notes ----
check('note uses the first name', knockNote('Reagan Smith') === 'Reagan came trick-or-treating!');
check('note never empty', knockNote('  ') === 'A friend came trick-or-treating!');
check('knocker name: house first name', knockerName("Reagan's House", 'Sunny Bunny') === 'Reagan' && knockerName('Castle', 'Sunny Bunny') === 'Sunny Bunny' && knockerName(undefined, '') === 'A friend');
check('server first name strips symbols', firstName('Quinn!! Jones') === 'Quinn' && firstName('') === 'A friend');

// ---- server ----
const store = new Map<string, any>();
const kv: KV = { get: async k => store.has(k) ? JSON.parse(JSON.stringify(store.get(k))) : undefined, put: async (k, v) => { store.set(k, JSON.parse(JSON.stringify(v))); }, delete: async k => { store.delete(k); } };
type C = Conn & { inbox: any[]; last(t: string): any };
const mk = (): C => { const inbox: any[] = []; return { inbox, send(x: string) { inbox.push(JSON.parse(x)); }, close() {}, last(t: string) { return [...inbox].reverse().find(m => m.t === t); } } as any; };
const look = { skin: '#f1c27d', hair: '#3b2219', hairStyle: 0, shirt: '#ff7aa8', pants: '#5b8def', size: 'kid' as const, acc: 0 };
const msg = (h: Neighborhood, c: C, o: any) => { (c as any).budget = undefined; return h.onMessage(c, JSON.stringify(o)); };
const hood = new Neighborhood(kv, { flushMs: 5 });
await hood.init('HWTEST');
// A throwaway street of three houses: A and B are new clients, Old never says halloween:1.
const A = mk(), B = mk(), Old = mk();
for (const c of [A, B, Old]) await hood.onConnect(c);
const flags = { v: PROTOCOL, pet: 1, mail: 1, sit: 1, fit: 1, baby: 1, amb: 1 };
await msg(hood, A, { t: 'join', nickname: NICKNAMES[0], look, ...flags, halloween: 1 });
await msg(hood, B, { t: 'join', nickname: NICKNAMES[1], look, ...flags, halloween: 1 });
await msg(hood, Old, { t: 'join', nickname: NICKNAMES[2], look, ...flags });
const houseOf = (c: C) => { const pid = c.last('joined').pid; return c.last('welcome').houses.find((h: any) => h.ownerId === pid)?.id ?? [...(hood as any).houses.values()].find((h: any) => h.ownerId === pid)?.id; };
const hA = houseOf(A), hOld = houseOf(Old);
check('three houses on the street', (hood as any).houses.size === 3, String((hood as any).houses.size));
await new Promise(r => setTimeout(r, 30));
const before = JSON.stringify([...store.entries()]);
await msg(hood, B, { t: 'knock', houseId: hA });
const note = A.last('knocked');
check('the owner gets a knocked note', note?.houseId === hA && typeof note?.name === 'string' && note.name.length > 0 && note.name.length <= 30, JSON.stringify(note));
check('the knocker does not get one', !B.inbox.some(m => m.t === 'knocked'));
check('the old client never sees knocked', !Old.inbox.some(m => m.t === 'knocked'));
await msg(hood, B, { t: 'knock', houseId: hOld });
check('knocking at an old client\'s house sends nothing to it', !Old.inbox.some(m => m.t === 'knocked'));
await msg(hood, Old, { t: 'knock', houseId: hA });
check('a client without halloween:1 cannot knock', A.inbox.filter(m => m.t === 'knocked').length === 1);
await msg(hood, A, { t: 'knock', houseId: hA });
check('knocking on your own door is ignored', A.inbox.filter(m => m.t === 'knocked').length === 1);
await msg(hood, B, { t: 'knock', houseId: 'nope' });
check('unknown house is ignored, no error', !B.inbox.some(m => m.t === 'error'));
await new Promise(r => setTimeout(r, 30));
check('knocks store nothing', JSON.stringify([...store.entries()]) === before);
check('no failure message ever reaches a knocker', !B.inbox.some(m => m.t === 'nack' || m.t === 'error'));

console.log(`\n${pass} checks passed${process.exitCode ? ' (with failures)' : ''}`);
process.exit(process.exitCode ?? 0);
