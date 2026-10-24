// M1 ambient reactions: pure rules, reducer, sanitizer, server gating, and an un-updated 7e32067 client.
// Never talks to production. Run: npx vite-node tests/ambient_test.ts
import { existsSync } from 'node:fs';
import { Neighborhood, type KV, type Conn } from '../server/core';
import { NICKNAMES, PROTOCOL, cleanAction, cleanHouseState, cleanItem } from '../src/shared/hood';
import { initialState, migrate, reduce, newCharacter, type GameState, type PlacedItem } from '../src/shared/state';
import { MAX_REACTING, RADIUS, isPowerable, phaseOf, reactionsFor, roleOf, syncDelayMs, toyRoleOf } from '../src/shared/ambient';
import { ITEM_MAP } from '../src/items';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + name, extra); if (ok) pass++; else process.exitCode = 1; };

// ---- roles exist in the real catalog ----
for (const k of ['pack:cute-speaker', 'pack:cc-record-player', 'pack:retro-radio', 'music-box', 'tv', 'pack:fireplace', 'pack:brick-fireplace', 'pack:wc-woodstove', 'pack:fire-pit']) {
  check(`powerable kind ${k} is in the catalog`, !!ITEM_MAP[k] && isPowerable(k));
}
check('stereo role', roleOf('pack:cute-speaker') === 'stereo' && roleOf('pack:retro-radio') === 'stereo');
check('music box is its own softer role', roleOf('music-box') === 'musicbox');
check('a sofa and a lamp are not powerable', !isPowerable('sofa') && !isPowerable('lamp') && !isPowerable('pack:tv-stand'));
check('toys', toyRoleOf('ball') === 'bounce' && toyRoleOf('beach-ball') === 'bounce' && toyRoleOf('balloon') === 'bounce' && toyRoleOf('teddy') === 'hug' && toyRoleOf('pack:dino-plush') === 'hug' && toyRoleOf('bunny-plush') === 'hug');

// ---- reactions ----
const spk = { id: 'spk', kind: 'pack:cute-speaker', x: 800, y: 560, on: true };
const near = { id: 'a', x: 900, y: 560 }, far = { id: 'b', x: 800 + RADIUS.stereo + 40, y: 560 };
let rx = reactionsFor([spk], [near, far]);
check('a doll near a stereo that is on dances', rx.get('a')?.kind === 'dance');
check('a doll out of reach does not', !rx.has('b'));
check('stereo off: nobody dances', reactionsFor([{ ...spk, on: false }], [near]).size === 0);
check('moved out of reach: the dance stops', !reactionsFor([{ ...spk, x: 100 }], [near]).has('a'));
check('same input, same output (deterministic)', JSON.stringify([...reactionsFor([spk], [near, far])]) === JSON.stringify([...reactionsFor([spk], [far, near])]));
check('phase is stable per pair and differs between dolls', phaseOf('spk', 'a') === phaseOf('spk', 'a') && phaseOf('spk', 'a') !== phaseOf('spk', 'c'));
const many = Array.from({ length: 8 }, (_, i) => ({ id: 'd' + i, x: 760 + i * 10, y: 560 }));
check(`at most ${MAX_REACTING} dolls animate`, reactionsFor([spk], many).size === MAX_REACTING);
check('a seated doll does not dance', !reactionsFor([spk], [{ ...near, seated: true }]).has('a'));
check('a lying doll sleeps through it', !reactionsFor([spk], [{ ...near, lying: true }]).has('a'));
check('a seated doll watches the TV', reactionsFor([{ id: 'tv', kind: 'tv', x: 800, y: 560, on: true }], [{ ...near, seated: true }]).get('a')?.kind === 'watch');
check('fire warms hands', reactionsFor([{ id: 'f', kind: 'pack:fireplace', x: 800, y: 560, on: true }], [near]).get('a')?.kind === 'warm');
check('stereo wins over fire', reactionsFor([{ id: 'f', kind: 'pack:fireplace', x: 900, y: 560, on: true }, spk], [near]).get('a')?.kind === 'dance');
check('a wound-down music box stops swaying', !reactionsFor([{ id: 'm', kind: 'music-box', x: 900, y: 560, on: true }], [near], { musicBoxDone: new Set(['m']) }).has('a'));
check('music box sways', reactionsFor([{ id: 'm', kind: 'music-box', x: 900, y: 560, on: true }], [near]).get('a')?.kind === 'sway');
check('teddy hug', reactionsFor([{ id: 't', kind: 'teddy', x: 920, y: 560 }], [near]).get('a')?.kind === 'hug');
check('ball bounce', reactionsFor([{ id: 'b', kind: 'ball', x: 880, y: 560 }], [near]).get('a')?.kind === 'bounce');
check('open fridge nibble', reactionsFor([{ id: 'fr', kind: 'fridge', x: 960, y: 560 }], [near], { fridgesOpen: new Set(['fr']) }).get('a')?.kind === 'nibble');
check('closed fridge: nothing', !reactionsFor([{ id: 'fr', kind: 'fridge', x: 960, y: 560 }], [near]).has('a'));
check('in the tub: bubbles', reactionsFor([{ id: 'tb', kind: 'tub', x: 900, y: 570, w: 240 }], [near]).get('a')?.kind === 'bathe');
check('sync delay is a negative offset within one period', (() => { const d = syncDelayMs(0.25, 1800, 1_000_000); return d <= 0 && d > -1800; })());
check('two iPads at the same clock get the same delay', syncDelayMs(0.3, 1800, 123456) === syncDelayMs(0.3, 1800, 123456));

// ---- reducer ----
const base = (): GameState => {
  const s = initialState();
  s.rooms.living.items.push({ id: 'spk', kind: 'pack:cute-speaker', x: 800, y: 560, flip: false, z: 50, scale: 1 });
  return s;
};
let s = base();
const s1 = reduce(s, { type: 'item/power', room: 'living', id: 'spk', on: true });
check('item/power on sets on: true', s1.rooms.living.items.find(i => i.id === 'spk')!.on === true);
check('item/power on twice is a no-op (idempotent)', reduce(s1, { type: 'item/power', room: 'living', id: 'spk', on: true }) === s1);
const s2 = reduce(s1, { type: 'item/power', room: 'living', id: 'spk', on: false });
check('off removes the field so the JSON is as before', !('on' in s2.rooms.living.items.find(i => i.id === 'spk')!) && JSON.stringify(s2) === JSON.stringify(s));
check('a sofa cannot be powered', reduce(s, { type: 'item/power', room: 'living', id: s.rooms.living.items[0].id, on: true }) === s || isPowerable(s.rooms.living.items[0].kind));
check('missing item is a no-op', reduce(s, { type: 'item/power', room: 'living', id: 'nope', on: true }) === s);

// ---- sanitizers ----
check('cleanAction keeps item/power', JSON.stringify(cleanAction({ type: 'item/power', room: 'living', id: 'spk', on: true })) === JSON.stringify({ type: 'item/power', room: 'living', id: 'spk', on: true }));
check('cleanAction rejects a non-boolean on', cleanAction({ type: 'item/power', room: 'living', id: 'spk', on: 1 }) === null);
check('cleanItem keeps on for a powerable kind', cleanItem({ id: 'x', kind: 'tv', x: 1, y: 1, on: true })?.on === true);
check('cleanItem drops on for a plain kind', !('on' in (cleanItem({ id: 'x', kind: 'sofa', x: 1, y: 1, on: true }) as PlacedItem)));
check('cleanItem leaves an old item byte-identical', JSON.stringify(cleanItem({ id: 'x', kind: 'tv', x: 1, y: 1, flip: false, z: 0, scale: 1 })) === JSON.stringify({ id: 'x', kind: 'tv', x: 1, y: 1, flip: false, z: 0, scale: 1 }));
check('cleanHouseState keeps on', JSON.stringify(cleanHouseState(s1)).includes('"on":true'));

// ---- an un-updated 7e32067 client keeps a save that has the new fields ----
const OLD = process.env.OLD_TREE || '/tmp/m1/prodtree';
if (existsSync(OLD + '/src/shared/state.ts')) {
  const old = await import(OLD + '/src/shared/state.ts');
  const saved = JSON.parse(JSON.stringify(s1));
  const m = old.migrate(saved);
  check('7e32067 migrate keeps the version-3 save', m.version === 3 && m.rooms.living.items.some((i: any) => i.id === 'spk'));
  check('7e32067 migrate keeps on: true', m.rooms.living.items.find((i: any) => i.id === 'spk').on === true);
  let o = m;
  o = old.reduce(o, { type: 'item/move', room: 'living', id: 'spk', x: 820, y: 560 });
  o = old.reduce(o, { type: 'item/flip', room: 'living', id: 'spk' });
  o = old.reduce(o, { type: 'room/wallpaper', room: 'living', color: '#ffffff' });
  check('7e32067 reducer keeps on through its own edits', o.rooms.living.items.find((i: any) => i.id === 'spk').on === true);
  const back = migrate(JSON.parse(JSON.stringify(o)));
  check('the new client reads that save back with on intact', back.rooms.living.items.find(i => i.id === 'spk')?.on === true);
  const oldHood = await import(OLD + '/src/shared/hood.ts');
  check('7e32067 PROTOCOL is unchanged', oldHood.PROTOCOL === PROTOCOL && PROTOCOL === 4);
  check('save version stays 3', s1.version === 3);
} else check('old tree present at ' + OLD, false);

// ---- server: multi-client sync and gating ----
const store = new Map<string, any>();
const kv: KV = {
  get: async k => store.has(k) ? JSON.parse(JSON.stringify(store.get(k))) : undefined,
  put: async (k, v) => { store.set(k, JSON.parse(JSON.stringify(v))); },
  delete: async k => { store.delete(k); },
};
type C = Conn & { inbox: any[]; last(t: string): any; acts(): any[] };
const mk = (): C => {
  const inbox: any[] = [];
  return { inbox, send(x: string) { inbox.push(JSON.parse(x)); }, close() {}, last(t: string) { return [...inbox].reverse().find(m => m.t === t); }, acts() { return inbox.filter(m => m.t === 'act').map(m => m.action); } } as any;
};
const look = { skin: '#f1c27d', hair: '#3b2219', hairStyle: 0, shirt: '#ff7aa8', pants: '#5b8def', size: 'kid' as const, acc: 0 };
const msg = (hood: Neighborhood, c: C, o: any) => { (c as any).budget = undefined; return hood.onMessage(c, JSON.stringify(o)); };
const hood = new Neighborhood(kv, { flushMs: 5 });
await hood.init('AMBTEST');
const A = mk(), B = mk(), Old = mk();
for (const c of [A, B, Old]) await hood.onConnect(c);
await msg(hood, A, { t: 'join', nickname: NICKNAMES[0], look, v: PROTOCOL, pet: 1, mail: 1, sit: 1, fit: 1, baby: 1, amb: 1 });
await msg(hood, B, { t: 'join', nickname: NICKNAMES[1], look, v: PROTOCOL, pet: 1, mail: 1, sit: 1, fit: 1, baby: 1, amb: 1 });
await msg(hood, Old, { t: 'join', nickname: NICKNAMES[2], look, v: PROTOCOL, pet: 1, mail: 1, sit: 1, fit: 1, baby: 1 });
const pidA = A.last('joined').pid as string;
const hidA = A.last('welcome').houses.find((h: any) => h.ownerId === pidA).id as string;
check('welcome says amb:1', A.last('welcome').amb === 1);
await msg(hood, A, { t: 'act', houseId: hidA, cid: 1, action: { type: 'item/add', room: 'living', item: { id: 'spk', kind: 'pack:cute-speaker', x: 800, y: 560, flip: false, z: 50, scale: 1 } } });
// B (a visitor) turns the stereo on: anyone may.
await msg(hood, B, { t: 'act', houseId: hidA, cid: 2, action: { type: 'item/power', room: 'living', id: 'spk', on: true } });
check('a visitor can turn the stereo on', !B.inbox.some(m => m.t === 'nack' && m.cid === 2));
check('the owner sees item/power', A.acts().some(a => a.type === 'item/power' && a.on === true));
check('an old client never receives item/power', !Old.acts().some(a => a.type === 'item/power'));
check('reactions are never sent', ![...A.inbox, B.inbox, Old.inbox].flat().some((m: any) => JSON.stringify(m).includes('"dance"')));
// Both girls tap at the same moment: both ask for on. The second is a noop and carries the settled state.
await msg(hood, A, { t: 'act', houseId: hidA, cid: 3, action: { type: 'item/power', room: 'living', id: 'spk', on: true } });
const nk = A.inbox.find(m => m.t === 'nack' && m.cid === 3);
check('a double tap settles (noop with state)', nk?.reason === 'noop' && nk.state.rooms.living.items.find((i: any) => i.id === 'spk').on === true);
// An old client never sends it, but if it did it is refused rather than wiping a house.
await msg(hood, Old, { t: 'act', houseId: hidA, cid: 4, action: { type: 'item/power', room: 'living', id: 'spk', on: false } });
check('a client without amb:1 is nacked invalid', Old.inbox.find(m => m.t === 'nack' && m.cid === 4)?.reason === 'invalid');
// The old client's next house copy still carries on, and its own reducer keeps it.
const Old2 = mk(); await hood.onConnect(Old2);
await msg(hood, Old2, { t: 'join', nickname: NICKNAMES[3], look, v: PROTOCOL, pet: 1, mail: 1, sit: 1 });
check('an old client gets the on flag on the house copy', Old2.last('welcome').houses.find((h: any) => h.id === hidA).state.rooms.living.items.find((i: any) => i.id === 'spk').on === true);
// Last write wins.
await msg(hood, B, { t: 'act', houseId: hidA, cid: 5, action: { type: 'item/power', room: 'living', id: 'spk', on: false } });
await msg(hood, A, { t: 'act', houseId: hidA, cid: 6, action: { type: 'item/power', room: 'living', id: 'spk', on: true } });
check('last write wins', (hood as any).houses.get(hidA).state.rooms.living.items.find((i: any) => i.id === 'spk').on === true);
// Locked house: a visitor is nacked locked.
await msg(hood, A, { t: 'lock', houseId: hidA, locked: true });
await msg(hood, B, { t: 'act', houseId: hidA, cid: 7, action: { type: 'item/power', room: 'living', id: 'spk', on: false } });
check('locked house: a visitor tap is nacked locked', B.inbox.find(m => m.t === 'nack' && m.cid === 7)?.reason === 'locked');
// A doll dragged out of range stops: pure rule on the synced state.
const st = (hood as any).houses.get(hidA).state as GameState;
const doll = { ...newCharacter(), id: 'dl', room: 'living' as const, x: 880, y: 560 };
const items = st.rooms.living.items.map(i => ({ id: i.id, kind: i.kind, x: i.x, y: i.y, on: !!i.on }));
check('server state: a doll near dances', reactionsFor(items, [doll]).get('dl')?.kind === 'dance');
check('dragged out: the dance stops', !reactionsFor(items, [{ ...doll, x: 200 }]).has('dl'));

console.log(`\n${pass} passed${process.exitCode ? ', some FAILED' : ''}`);
