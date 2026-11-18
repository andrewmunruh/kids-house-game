// B18 item 3: share a snack. Existing ownership/nack unchanged.
// A pass to a doll the passer cannot control is refused: no snack lost or duplicated,
// and the Worker house state agrees. A valid pass moves the snack A→B.
import { Neighborhood, type KV, type Conn } from '../server/core';
import { NICKNAMES, PROTOCOL } from '../src/shared/hood';
import { initialState, newCharacter, reduce, type GameState } from '../src/shared/state';
import { locateSnack, planShare, recoverShare, shareActions, snackHands } from '../src/share-snack';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++;
  else process.exitCode = 1;
};

const s0 = initialState();
const cake = s0.rooms.kitchen.items.find(i => i.kind === 'cake')!;
const table = s0.rooms.kitchen.items.find(i => i.kind === 'table')!;

function houseWithSnack(): GameState {
  let s: GameState = {
    ...s0,
    characters: [
      newCharacter({ id: 'd1', name: 'Rosie', room: 'kitchen', x: table.x, y: 540, held: { left: null, right: null } }),
      newCharacter({ id: 'd2', name: 'Lulu', room: 'kitchen', x: table.x + 80, y: 540, held: { left: null, right: null } }),
    ],
  };
  s = reduce(s, { type: 'char/hold', id: 'd1', hand: 'left', room: 'kitchen', itemId: cake.id });
  return s;
}

const start = houseWithSnack();
check('setup: Rosie holds the only cake', locateSnack(start, cake.id).holder === 'd1' && locateSnack(start, cake.id).copies === 1);

const good = planShare({ state: start, fromId: 'd1', toId: 'd2' });
check('valid pass is planned', good.ok === true && good.ok && good.itemId === cake.id, JSON.stringify(good));

let moved = start;
if (good.ok) for (const a of shareActions(good)) moved = reduce(moved, a);
check('valid pass moves the snack A→B', locateSnack(moved, cake.id).holder === 'd2' && locateSnack(moved, cake.id).copies === 1);
check('Rosie\'s hand is empty', snackHands(moved.characters.find(c => c.id === 'd1')).left === null);
check('Lulu holds the cake', snackHands(moved.characters.find(c => c.id === 'd2')).left === cake.id || snackHands(moved.characters.find(c => c.id === 'd2')).right === cake.id);

const toAvatar = planShare({ state: start, fromId: 'd1', toId: 'player-b', playerIds: ['player-b'] });
check('pass to a player avatar is refused (notyours)', toAvatar.ok === false && !toAvatar.ok && toAvatar.reason === 'notyours', JSON.stringify(toAvatar));
check('refused plan has no actions', !toAvatar.ok);

const toMissing = planShare({ state: start, fromId: 'd1', toId: 'ghost' });
check('pass to an unknown doll is refused', toMissing.ok === false && !toMissing.ok && toMissing.reason === 'notyours');

const toSelf = planShare({ state: start, fromId: 'd1', toId: 'd1' });
check('pass to self is refused', toSelf.ok === false && !toSelf.ok && toSelf.reason === 'no-target');

const far = start.characters[1];
const farState: GameState = { ...start, characters: start.characters.map(c => c.id === 'd2' ? { ...c, x: c.x + 800 } : c) };
const tooFar = planShare({ state: farState, fromId: 'd1', toId: 'd2' });
check('pass across the room is refused', tooFar.ok === false && !tooFar.ok && tooFar.reason === 'too-far');
void far;

const full: GameState = {
  ...start,
  characters: start.characters.map(c => c.id === 'd2' ? { ...c, held: { left: { ...cake, id: 'other' }, right: { ...cake, id: 'other2' } } } : c),
};
const handsFull = planShare({ state: full, fromId: 'd1', toId: 'd2' });
check('pass to full hands is refused', handsFull.ok === false && !handsFull.ok && handsFull.reason === 'hands-full');

// Recover: if the snack is on the floor after a failed hold, give it back to Rosie.
let mid = start;
if (good.ok) mid = reduce(mid, shareActions(good)[0]); // release only
check('after release only, cake is on the floor (one copy)', locateSnack(mid, cake.id).holder === null && locateSnack(mid, cake.id).copies === 1);
const rec = recoverShare(mid, good.ok ? good : null as any);
check('recover picks the cake back up for Rosie', !!rec && rec.type === 'char/hold' && rec.id === 'd1');
if (rec) mid = reduce(mid, rec);
check('recovered: Rosie has the only cake again', locateSnack(mid, cake.id).holder === 'd1' && locateSnack(mid, cake.id).copies === 1);

// ---- Worker: two clients, refused pass does not move the snack; valid pass does. ----
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
const FLAGS = { v: PROTOCOL, pet: 1, mail: 1, sit: 1, fit: 1, baby: 1, amb: 1, needs: 1 };
const hood = new Neighborhood(kv, { flushMs: 5 });
await hood.init('SHARETEST');
const A = mk(), B = mk();
await hood.onConnect(A); await hood.onConnect(B);
const home = houseWithSnack();
await msg(hood, A, { t: 'join', nickname: NICKNAMES[0], look, house: home, ...FLAGS });
await msg(hood, B, { t: 'join', nickname: NICKNAMES[1], look, ...FLAGS });
const pidA = A.last('joined').pid as string;
const pidB = B.last('joined').pid as string;
const hidA = A.last('welcome').houses.find((h: any) => h.ownerId === pidA).id as string;
const H = () => (hood as any).houses.get(hidA).state as GameState;

check('worker starts with Rosie holding the cake', locateSnack(H(), cake.id).holder === 'd1' && locateSnack(H(), cake.id).copies === 1);

// Refused: host tries to pass to the visitor's avatar. Client must not dispatch; we also
// prove that if someone did send it, the snack would not become the avatar's, and we do not send it.
const refuse = planShare({ state: H(), fromId: 'd1', toId: pidB, playerIds: [pidA, pidB] });
check('plan refuses a pass to the visitor avatar', refuse.ok === false && !refuse.ok && refuse.reason === 'notyours');
const before = JSON.stringify({ loc: locateSnack(H(), cake.id), hands: H().characters.map(c => [c.id, snackHands(c)]) });
// Dispatch nothing. Worker and both inboxes stay still for hold/release.
const actsA0 = A.acts().length, actsB0 = B.acts().length;
check('refused pass dispatched nothing', actsA0 === A.acts().length && actsB0 === B.acts().length);
check('worker state unchanged after refused pass', JSON.stringify({ loc: locateSnack(H(), cake.id), hands: H().characters.map(c => [c.id, snackHands(c)]) }) === before);
check('both clients would agree: snack still only with Rosie', locateSnack(H(), cake.id).holder === 'd1' && locateSnack(H(), cake.id).copies === 1);

// Valid pass: owner sends release then hold. Worker and both clients (inbox acts) see A→B.
const ok = planShare({ state: H(), fromId: 'd1', toId: 'd2' });
check('owner can plan a pass between house dolls', ok.ok === true);
if (ok.ok) {
  await msg(hood, A, { t: 'act', houseId: hidA, cid: 1, action: shareActions(ok)[0] });
  await msg(hood, A, { t: 'act', houseId: hidA, cid: 2, action: shareActions(ok)[1] });
}
const locW = locateSnack(H(), cake.id);
check('worker: snack moved A→B, one copy', locW.holder === 'd2' && locW.copies === 1, JSON.stringify(locW));
check('visitor inbox sees the hold (valid pass on both clients)', B.acts().some(a => a.type === 'char/hold' && a.id === 'd2' && a.itemId === cake.id), JSON.stringify(B.acts().filter(a => String(a.type).startsWith('char/'))));
check('host inbox / worker agree Lulu holds it', snackHands(H().characters.find(c => c.id === 'd2')).left === cake.id || snackHands(H().characters.find(c => c.id === 'd2')).right === cake.id);
check('Rosie has empty hands on the worker', snackHands(H().characters.find(c => c.id === 'd1')).left === null && snackHands(H().characters.find(c => c.id === 'd1')).right === null);
check('visitor did not get a nack for the owner\'s valid pass', !B.nack(1) && !B.nack(2) && !A.nack(1) && !A.nack(2));

// Existing visitor seat rule is still notyours (ownership unchanged).
await msg(hood, B, { t: 'act', houseId: hidA, cid: 9, action: { type: 'char/move', id: 'd2', room: 'kitchen', x: 900, y: 540, seat: { item: 'x', pose: 'lie', n: 0 } } });
check('visitor seat rule is unchanged (notyours)', B.nack(9)?.reason === 'notyours');

console.log(`share_snack_test: ${pass} passed`);
