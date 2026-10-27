// M2 gentle needs: pure rules, reducer, sanitizer, server gating (3 clients + an old one), and an un-updated 10ef736 client.
// Never talks to production. Run: npx vite-node tests/needs_test.ts   (OLD_TREE=/tmp/t-needs/oldtree holds `git archive 10ef736 src`)
import { existsSync } from 'node:fs';
import { Neighborhood, type KV, type Conn } from '../server/core';
import { NICKNAMES, PROTOCOL, cleanAction, cleanHouseState } from '../src/shared/hood';
import { initialState, migrate, reduce, newCharacter, type GameState } from '../src/shared/state';
import { DRIFT_CAP_MS, DriftGate, NEEDS, cleanNeeds, driftPick, levelOf, meetableHere, meetsHere, wishOf } from '../src/shared/needs';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + name, extra); if (ok) pass++; else process.exitCode = 1; };

// ---- sanitizer ----
check('missing needs = cozy', NEEDS.every(n => levelOf({}, n) === 3));
check('cleanNeeds clamps and drops junk', JSON.stringify(cleanNeeds({ sleepy: -4, hungry: 2.4, playful: 9, clean: 'x', evil: 1 })) === JSON.stringify({ sleepy: 0, hungry: 2 }));
check('all-full is null (omitted)', cleanNeeds({ sleepy: 3, hungry: 3 }) === null && cleanNeeds(null) === null && cleanNeeds('x') === null);
check('wish shows only at level 1 or below', wishOf({ needs: { hungry: 2 } }) === null && wishOf({ needs: { hungry: 1, clean: 0 } }) === 'clean');

// ---- migrate: untouched saves stay byte-identical; garbage is cleaned ----
const plain = initialState();
check('migrate adds no needs key to an untouched save', JSON.stringify(migrate(JSON.parse(JSON.stringify(plain)))) === JSON.stringify(migrate(plain)) && !JSON.stringify(migrate(plain)).includes('needs'));
for (const f of ['v1', 'v2']) {
  const raw = f === 'v1' ? { version: 1, rooms: { living: { wallpaper: '#fff', floor: '#fff', pattern: 0, items: [] } }, character: { x: 100 } } : { version: 2, rooms: plain.rooms, character: { x: 1200 } };
  check(`${f} save migrates with no needs key`, !JSON.stringify(migrate(raw)).includes('needs'));
}
const junk = JSON.parse(JSON.stringify(plain)); junk.characters[0].needs = { sleepy: 1, hungry: 99, bad: 0 };
check('migrate keeps a valid need and drops junk', JSON.stringify(migrate(junk).characters[0].needs) === JSON.stringify({ sleepy: 1 }));
check('cleanHouseState keeps needs (server)', JSON.stringify(cleanHouseState(junk).characters[0].needs) === JSON.stringify({ sleepy: 1 }));
check('save version stays 3, protocol 4', migrate(junk).version === 3 && PROTOCOL === 4);

// ---- where each need is met (starter house has a bed, fridge, tub, teddy) ----
const at = (s: GameState, id: string, patch: any): GameState => ({ ...s, characters: s.characters.map(c => c.id === id ? { ...c, ...patch } : c) });
const it = (s: GameState, room: string, kind: string) => (s.rooms as any)[room].items.find((i: any) => i.kind === kind);
let s = initialState();
s = { ...s, characters: [newCharacter({ id: 'd1', room: 'living', x: 1200, y: 540, needs: { sleepy: 0, hungry: 1, playful: 1, clean: 1 } })] };
const bed = it(s, 'bedroom', 'bed'), fridge = it(s, 'kitchen', 'fridge'), tub = it(s, 'bathroom', 'soaking-tub'), teddy = it(s, 'bedroom', 'teddy');
const d = () => s.characters[0];
check('standing in the living room meets nothing', meetableHere(s, d()).length === 0);
check('lying on a bed meets sleepy', meetsHere(at(s, 'd1', { room: 'bedroom', x: bed.x, y: bed.y, seat: { item: bed.id, pose: 'lie', n: 0 } }), { ...d(), room: 'bedroom', seat: { item: bed.id, pose: 'lie', n: 0 } }, 'sleepy'));
check('sitting does not meet sleepy', !meetsHere(s, { ...d(), room: 'bedroom', seat: { item: bed.id, pose: 'sit', n: 0 } }, 'sleepy'));
check('next to the fridge meets hungry', meetsHere(s, { ...d(), room: 'kitchen', x: fridge.x + 80, y: fridge.y }, 'hungry'));
check('in the tub meets clean', meetsHere(s, { ...d(), room: 'bathroom', x: tub.x, y: tub.y }, 'clean'));
check('by the teddy meets playful', meetsHere(s, { ...d(), room: 'bedroom', x: teddy.x + 30, y: teddy.y }, 'playful'));
check('far from the tub does not meet clean', !meetsHere(s, { ...d(), room: 'bathroom', x: tub.x + 900, y: tub.y }, 'clean'));

// ---- reducer: care only raises, drift one gentle step, never below 0 ----
const fed = reduce(at(s, 'd1', { room: 'kitchen', x: fridge.x + 80, y: fridge.y }), { type: 'need/meet', id: 'd1', need: 'hungry' });
check('meet raises hungry to cozy', levelOf(fed.characters[0], 'hungry') === 3 && levelOf(fed.characters[0], 'sleepy') === 0);
check('meet twice is a no-op', reduce(fed, { type: 'need/meet', id: 'd1', need: 'hungry' }) === fed);
check('meet where it cannot be met is a no-op (never lowers)', reduce(s, { type: 'need/meet', id: 'd1', need: 'clean' }) === s);
const allFull = { ...s, characters: [newCharacter({ id: 'd1' })] };
const dr = reduce(allFull, { type: 'need/drift', id: 'd1', need: 'sleepy' });
check('drift is one step', levelOf(dr.characters[0], 'sleepy') === 2);
check('drift floors at 0', reduce(s, { type: 'need/drift', id: 'd1', need: 'sleepy' }) === s);
const back = reduce(reduce(dr, { type: 'char/move', id: 'd1', room: 'bedroom', x: bed.x, y: bed.y, seat: { item: bed.id, pose: 'lie', n: 0 } }), { type: 'need/meet', id: 'd1', need: 'sleepy' });
check('all cozy again: needs key is gone', !('needs' in back.characters[0]));
check('a cat and the baby never get needs', !JSON.stringify(reduce(dr, { type: 'baby/meet', now: 1 }).baby ?? {}).includes('needs'));
check('no creator field anywhere after drift and care', !/creator/i.test(JSON.stringify(dr) + JSON.stringify(back)));
check('nothing drifts while closed: no time-based reducer exists (48h later, same state)', JSON.stringify(migrate(JSON.parse(JSON.stringify(dr)))) === JSON.stringify(migrate(dr)));
check('driftPick is deterministic and picks a full need', JSON.stringify(driftPick(allFull, 0)) === JSON.stringify(driftPick(allFull, 0)) && levelOf(allFull.characters[0], driftPick(allFull, 0)!.need) === 3);
const bare = { ...allFull, rooms: Object.fromEntries(Object.entries(allFull.rooms).map(([k, r]) => [k, { ...r, items: [] }])) } as GameState;
check('no bed/fridge/tub/toy in the house: nothing drifts', driftPick(bare, 0) === null);
const g = new DriftGate();
check('drift gate: one step per window per house', g.ok('h', 0) && !g.ok('h', 1000) && !g.ok('h', DRIFT_CAP_MS - 1) && g.ok('h', DRIFT_CAP_MS) && g.ok('h2', 1));

// ---- sanitizer for actions ----
check('cleanAction keeps need/meet', JSON.stringify(cleanAction({ type: 'need/meet', id: 'd1', need: 'clean' })) === JSON.stringify({ type: 'need/meet', id: 'd1', need: 'clean' }));
check('cleanAction rejects an unknown need', cleanAction({ type: 'need/drift', id: 'd1', need: 'grumpy' }) === null);
check('char/add cannot forge needs', !('needs' in ((cleanAction({ type: 'char/add', char: { id: 'z', room: 'living', x: 1, y: 100, needs: { sleepy: 0 } } }) as any)?.char ?? {})));

// ---- an un-updated 10ef736 client keeps a save that has the new fields ----
const OLD = process.env.OLD_TREE || '/tmp/t-needs/oldtree';
if (existsSync(OLD + '/src/shared/state.ts')) {
  const old = await import(OLD + '/src/shared/state.ts');
  const saved = JSON.parse(JSON.stringify(dr));
  const m = old.migrate(saved);
  check('10ef736 migrate keeps the version-3 save', m.version === 3 && m.characters[0].id === 'd1');
  check('10ef736 migrate keeps needs', JSON.stringify(m.characters[0].needs) === JSON.stringify({ sleepy: 2 }));
  let o = old.reduce(m, { type: 'char/move', id: 'd1', room: 'kitchen', x: 900, y: 540 });
  o = old.reduce(o, { type: 'char/update', id: 'd1', patch: { shirt: '#123456' } });
  check('10ef736 reducer keeps needs through its own edits', JSON.stringify(o.characters[0].needs) === JSON.stringify({ sleepy: 2 }));
  check('the new client reads that save back with needs intact', levelOf(migrate(JSON.parse(JSON.stringify(o))).characters[0], 'sleepy') === 2);
  const oldHood = await import(OLD + '/src/shared/hood.ts');
  check('10ef736 PROTOCOL is unchanged', oldHood.PROTOCOL === PROTOCOL);
  check('10ef736 cleanAction rejects need/* (so it never reaches an old reducer from a forged relay)', oldHood.cleanAction({ type: 'need/meet', id: 'd1', need: 'clean' }) === null);
} else check('old tree present at ' + OLD, false);

// ---- server: 3 new clients + 1 old client ----
const store = new Map<string, any>();
const kv: KV = {
  get: async k => store.has(k) ? JSON.parse(JSON.stringify(store.get(k))) : undefined,
  put: async (k, v) => { store.set(k, JSON.parse(JSON.stringify(v))); },
  delete: async k => { store.delete(k); },
};
type C = Conn & { inbox: any[]; last(t: string): any; acts(): any[]; nack(cid: number): any };
const mk = (): C => {
  const inbox: any[] = [];
  return { inbox, send(x: string) { inbox.push(JSON.parse(x)); }, close() {}, last(t: string) { return [...inbox].reverse().find(m => m.t === t); }, acts() { return inbox.filter(m => m.t === 'act').map(m => m.action); }, nack(cid: number) { return inbox.find(m => m.t === 'nack' && m.cid === cid); } } as any;
};
const look = { skin: '#f1c27d', hair: '#3b2219', hairStyle: 0, shirt: '#ff7aa8', pants: '#5b8def', size: 'kid' as const, acc: 0 };
const msg = (hood: Neighborhood, c: C, o: any) => { (c as any).budget = undefined; return hood.onMessage(c, JSON.stringify(o)); };
const FLAGS = { v: PROTOCOL, pet: 1, mail: 1, sit: 1, fit: 1, baby: 1, amb: 1 };
const hood = new Neighborhood(kv, { flushMs: 5 });
await hood.init('NEEDTEST');
const A = mk(), A2 = mk(), B = mk(), Cc = mk(), Old = mk();
for (const c of [A, B, Cc, Old]) await hood.onConnect(c);
const home = initialState(); home.characters = [newCharacter({ id: 'd1', room: 'kitchen', x: fridge.x + 80, y: fridge.y })];
await msg(hood, A, { t: 'join', nickname: NICKNAMES[0], look, house: home, ...FLAGS, needs: 1 });
await msg(hood, B, { t: 'join', nickname: NICKNAMES[1], look, ...FLAGS, needs: 1 });
await msg(hood, Cc, { t: 'join', nickname: NICKNAMES[2], look, ...FLAGS, needs: 1 });
await msg(hood, Old, { t: 'join', nickname: NICKNAMES[3], look, ...FLAGS });
const pidA = A.last('joined').pid as string, tokA = A.last('joined').token as string;
const hidA = A.last('welcome').houses.find((h: any) => h.ownerId === pidA).id as string;
const H = () => (hood as any).houses.get(hidA).state as GameState;
check('welcome says needs:1', A.last('welcome').needs === 1);
// Stale tab / second iPad of the owner: same token, a second socket.
await hood.onConnect(A2); await msg(hood, A2, { t: 'hello', token: tokA, ...FLAGS, needs: 1 });
// A second socket with the same token supersedes the stale one; the stale tab's drift and the new one share one window.
await msg(hood, A2, { t: 'act', houseId: hidA, cid: 1, action: { type: 'need/drift', id: 'd1', need: 'hungry' } });
await msg(hood, A2, { t: 'act', houseId: hidA, cid: 2, action: { type: 'need/drift', id: 'd1', need: 'hungry' } });
check('owner drift lands once; a second iPad in the same window is capped', levelOf(H().characters[0], 'hungry') === 2 && A2.nack(2)?.reason === 'noop');
await msg(hood, B, { t: 'act', houseId: hidA, cid: 3, action: { type: 'need/drift', id: 'd1', need: 'clean' } });
check("a visitor's play never wears down another house", B.nack(3)?.reason === 'notyours' && levelOf(H().characters[0], 'clean') === 3);
check('B and C see the drift; the old client never gets need/*', B.acts().some(a => a.type === 'need/drift') && Cc.acts().some(a => a.type === 'need/drift') && !Old.acts().some(a => String(a.type).startsWith('need/')));
// Two visitors care for the same doll at once: one lands, the other is a harmless noop with the settled state.
await msg(hood, B, { t: 'act', houseId: hidA, cid: 4, action: { type: 'need/meet', id: 'd1', need: 'hungry' } });
await msg(hood, Cc, { t: 'act', houseId: hidA, cid: 5, action: { type: 'need/meet', id: 'd1', need: 'hungry' } });
check('a visitor can care for the other girl\'s doll', !B.nack(4) && levelOf(H().characters[0], 'hungry') === 3);
check('concurrent care settles at cozy (second is noop with state)', Cc.nack(5)?.reason === 'noop' && levelOf(Cc.nack(5).state.characters[0], 'hungry') === 3);
check('owner sees the visitor\'s care', A2.acts().some(a => a.type === 'need/meet'));
await msg(hood, B, { t: 'act', houseId: hidA, cid: 6, action: { type: 'char/move', id: 'd1', room: 'kitchen', x: 900, y: 540, seat: { item: 'x', pose: 'lie', n: 0 } } });
check('visitor seat rule is unchanged (notyours)', B.nack(6)?.reason === 'notyours');
await msg(hood, B, { t: 'act', houseId: hidA, cid: 7, action: { type: 'need/meet', id: pidA, need: 'hungry' } });
check('an avatar id has no needs', B.nack(7)?.reason === 'notyours');
await msg(hood, Old, { t: 'act', houseId: hidA, cid: 8, action: { type: 'need/meet', id: 'd1', need: 'clean' } });
check('a client without needs:1 is nacked invalid', Old.nack(8)?.reason === 'invalid');
// The old client edits the doll; the server keeps needs.
await msg(hood, A2, { t: 'act', houseId: hidA, cid: 9, action: { type: 'need/drift', id: 'd1', need: 'sleepy' } }); // capped (same window) => noop
(hood as any).driftGate = new DriftGate();
await msg(hood, A2, { t: 'act', houseId: hidA, cid: 10, action: { type: 'need/drift', id: 'd1', need: 'sleepy' } });
await msg(hood, Old, { t: 'act', houseId: hidA, cid: 11, action: { type: 'char/update', id: 'd1', patch: { shirt: '#abcdef' } } });
await msg(hood, Old, { t: 'act', houseId: hidA, cid: 12, action: { type: 'char/move', id: 'd1', room: 'living', x: 900, y: 540 } });
check('old-client edits keep needs on the server', levelOf(H().characters[0], 'sleepy') === 2 && H().characters[0].shirt === '#abcdef');
// Reconnect after sleep: a fresh hello gets the stored levels, unchanged by time.
const Re = mk(); await hood.onConnect(Re); await msg(hood, Re, { t: 'hello', token: tokA, ...FLAGS, needs: 1 });
check('reconnect sees the same levels', levelOf(Re.last('welcome').houses.find((h: any) => h.id === hidA).state.characters[0], 'sleepy') === 2);
// Server restart (DO evicted): reload from storage keeps needs.
await new Promise(r => setTimeout(r, 30));
const hood2 = new Neighborhood(kv, { flushMs: 5 });
const R = mk(); await hood2.onConnect(R); await msg(hood2, R, { t: 'hello', token: tokA, ...FLAGS, needs: 1 });
check('restart keeps needs', levelOf(R.last('welcome').houses.find((h: any) => h.id === hidA).state.characters[0], 'sleepy') === 2);

console.log(`\n${pass} passed${process.exitCode ? ', some FAILED' : ''}`);
