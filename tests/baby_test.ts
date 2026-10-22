// Nursery baby. Migration, two-client sync, and owner-only rules. Never talks to production.
import { Neighborhood, type KV, type Conn } from '../server/core';
import { NICKNAMES, PROTOCOL, cleanAction, cleanHouseState, cleanPetName } from '../src/shared/hood';
import { babyAfterFurniture, babyBedKind, babyDragAllowed, babyOccupant, careBaby, easeBaby, EASE_MS, meetBaby, resolveBabyDrop } from '../src/shared/baby';
import { drawnScale, initialState, MAX_CHARS, migrate, reduce } from '../src/shared/state';
import { pieceWidth, seatFractions, standBeside, STAND_Y, type SeatPiece } from '../src/shared/sit';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + name, extra); if (ok) pass++; else process.exitCode = 1; };

const store = new Map<string, any>();
const kv: KV = {
  get: async k => store.has(k) ? JSON.parse(JSON.stringify(store.get(k))) : undefined,
  put: async (k, v) => { store.set(k, JSON.parse(JSON.stringify(v))); },
  delete: async k => { store.delete(k); },
};
type C = Conn & { inbox: any[]; last(t: string): any };
const mk = (): C => {
  const inbox: any[] = [];
  return { inbox, send(s: string) { inbox.push(JSON.parse(s)); }, close() {}, last(t: string) { return [...inbox].reverse().find(m => m.t === t); } } as any;
};
const look = { skin: '#f1c27d', hair: '#3b2219', hairStyle: 0, shirt: '#ff7aa8', pants: '#5b8def', size: 'kid' as const, acc: 0 };
const msg = (hood: Neighborhood, c: C, o: any) => { (c as any).budget = undefined; return hood.onMessage(c, JSON.stringify(o)); };
const babyActs = (c: C) => c.inbox.filter(m => m.t === 'act' && String(m.action?.type || '').startsWith('baby/'));

/** A reducer from before baby actions. Unknown types fall through and return null. */
function oldCleanAction(a: any): null {
  switch (a?.type) {
    default: return null;
  }
}
/** A migrate from before the baby field was known. It spreads the save and does not throw. */
function oldMigrate(raw: any) {
  const base = initialState();
  return { ...base, ...raw, rooms: { ...base.rooms, ...(raw.rooms || {}) } };
}

async function main() {
  check('protocol stays 4', PROTOCOL === 4);
  check('save version stays 3', initialState().version === 3);
  check('the baby is not an extra kid', MAX_CHARS === 8);
  check('a fresh house has no baby key', !('baby' in initialState()) && !('baby' in migrate(initialState())) && !('baby' in cleanHouseState(initialState())));

  const rooms = initialState().rooms;
  const met = meetBaby(rooms, 1000);
  check('she meets in the crib', met.name === 'Bean' && met.mood === 2 && met.spot === 'crib' && met.bed === 'crib-1' && met.since === 1000);

  let mood = met;
  let rose = true;
  for (let i = 0; i < 6; i++) {
    const next = careBaby(mood, 'feed', 1000);
    if (next.mood < mood.mood || next.mood > 4 || next.mood < 2) rose = false;
    mood = next;
  }
  check('care never drops her and never passes Happy', rose && mood.mood === 4);
  const replay = careBaby({ ...met, mood: 4, since: 1000 }, 'rock', 1000 + 90000);
  check('care at Happy stays Happy and resets the wait', replay.mood === 4 && replay.at?.rock === 1000 + 90000 && replay.since === 1000 + 90000 && replay.mood >= 4);

  const step = easeBaby({ ...met, mood: 4, since: 1000 }, 1000 + EASE_MS);
  const two = easeBaby({ ...met, mood: 4, since: 1000 }, 1000 + EASE_MS * 2);
  const stayed = two ? easeBaby(two, 1000 + EASE_MS * 4) : null;
  const stamped = easeBaby({ ...met, mood: 3, since: 0 }, 50);
  check('ease walks back to Cozy and stops', step?.mood === 3 && two?.mood === 2 && stayed === null);
  check('a missing clock only stamps', stamped?.mood === 3 && stamped?.since === 50);

  check('Bean and Sunny Bunny are names', cleanPetName('Bean') === 'Bean' && cleanPetName('Sunny Bunny') === 'Sunny Bunny');
  check('a blank name and password are not', cleanPetName('') === null && cleanPetName('password') === null);
  check('baby/name trims Bean', cleanAction({ type: 'baby/name', name: '  Bean ' })?.type === 'baby/name' && (cleanAction({ type: 'baby/name', name: '  Bean ' }) as { name?: string })?.name === 'Bean');
  check('password is rejected', cleanAction({ type: 'baby/name', name: 'password' }) === null);
  check('an old cleanAction drops baby/care', oldCleanAction({ type: 'baby/care', care: 'feed', now: 1 }) === null);
  check('a new cleanAction keeps baby/care', cleanAction({ type: 'baby/care', care: 'feed', now: 1 })?.type === 'baby/care');

  const saved = {
    ...initialState(),
    rooms: { ...initialState().rooms, nursery: { ...initialState().rooms.nursery, items: [...initialState().rooms.nursery.items, { id: 'bassinet-9', kind: 'bassinet', x: 400, y: 500, flip: false, z: 9, scale: 1 }] } },
    baby: { name: 'Sunny Bunny', mood: 3, spot: 'bassinet', bed: 'bassinet-9', x: 400, y: 500, room: 'nursery', since: 20 },
  };
  const loaded = migrate(JSON.parse(JSON.stringify(saved)));
  const cleaned = cleanHouseState(JSON.parse(JSON.stringify(saved)));
  check('migrate keeps Sunny Bunny in the bassinet', loaded.version === 3 && loaded.baby?.name === 'Sunny Bunny' && loaded.baby?.mood === 3 && loaded.baby?.spot === 'bassinet' && loaded.baby?.bed === 'bassinet-9');
  check('cleanHouseState keeps her too', cleaned.baby?.name === 'Sunny Bunny' && cleaned.baby?.mood === 3 && cleaned.baby?.spot === 'bassinet');
  const oldKept = oldMigrate(saved);
  check('an old migrate keeps the baby and does not throw', oldKept.baby?.name === 'Sunny Bunny' && oldKept.baby?.spot === 'bassinet');

  const high = migrate({ ...initialState(), baby: { name: 'Bean', mood: 9, spot: 'mat', x: 10, y: 20, room: 'nursery', since: 1 } });
  const low = migrate({ ...initialState(), baby: { name: 'Bean', mood: 0, spot: 'mat', x: 1, y: 2, room: 'nursery', since: 1 } });
  const missing = migrate({ ...initialState(), baby: { name: '', mood: 2 } });
  const dangling = migrate({ ...initialState(), baby: { name: 'Pip', mood: 3, spot: 'crib', bed: 'missing-crib', x: 1, y: 2, room: 'nursery', since: 1 } });
  const pw = cleanHouseState({ ...initialState(), baby: { name: 'password', mood: 2, spot: 'mat', x: 1, y: 2, room: 'nursery', since: 1 } });
  check('mood clamps between Cozy and Happy', high.baby?.mood === 4 && low.baby?.mood === 2);
  check('a broken baby is left out', !('baby' in missing));
  check('a missing crib becomes the mat and keeps her name', dangling.baby?.spot === 'mat' && dangling.baby?.name === 'Pip' && !dangling.baby?.bed);
  check('password becomes Bean', pw.baby?.name === 'Bean' && pw.baby?.spot === 'mat');

  check('kids still cannot sit in the crib or bassinet', seatFractions('crib') === null && seatFractions('bassinet') === null && babyBedKind('crib-mobile') === null && babyBedKind('crib') === 'crib' && babyBedKind('bassinet') === 'bassinet');
  const cribPiece: SeatPiece = { id: 'crib-1', kind: 'crib', x: 500, footY: 480, flip: false, scale: 1, w: 260, h: 260 };
  const chairPiece: SeatPiece = { id: 'chair-1', kind: 'chair', x: 400, footY: 560, flip: false, scale: 1, w: 100, h: 100 };
  const onCrib = resolveBabyDrop({ mode: 'play', releaseX: 500, releaseY: 400, piece: cribPiece, occupied: [] });
  const onChair = resolveBabyDrop({ mode: 'play', releaseX: 400, releaseY: 500, piece: chairPiece, occupied: [] });
  const taken = resolveBabyDrop({ mode: 'play', releaseX: 20, releaseY: 30, piece: chairPiece, occupied: [{ item: 'chair-1', n: 0 }] });
  const deco = resolveBabyDrop({ mode: 'decorate', releaseX: 15, releaseY: 25, piece: chairPiece, occupied: [] });
  const bedPiece: SeatPiece = { id: 'bed-1', kind: 'bed', x: 600, footY: 540, flip: false, scale: 1, w: 280, h: 180 };
  const onBed = resolveBabyDrop({ mode: 'play', releaseX: 600, releaseY: 500, piece: bedPiece, occupied: [] });
  const decoBed = resolveBabyDrop({ mode: 'decorate', releaseX: 600, releaseY: 500, piece: bedPiece, occupied: [] });
  check('play drop lies her in the crib', onCrib.spot === 'crib' && onCrib.bed === 'crib-1' && onCrib.seat === null);
  check('play drop on a chair sits her', onChair.spot === 'mat' && onChair.seat?.pose === 'sit' && onChair.seat?.item === 'chair-1');
  check('play drop lies her on a bed', onBed.spot === 'mat' && onBed.seat?.pose === 'lie' && onBed.seat?.item === 'bed-1' && onBed.bed === null);
  check('a taken chair leaves her on the mat', taken.spot === 'mat' && taken.seat === null && taken.x === 20 && taken.y === 30);
  check('decorate does not seat her', deco.spot === 'mat' && deco.seat === null && deco.x === 15);
  check('decorate does not lie her on a bed', decoBed.spot === 'mat' && decoBed.seat === null && decoBed.bed === null);
  check('only the owner may drag her', babyDragAllowed(false) === false && babyDragAllowed(true) === true);

  let s = reduce(initialState(), { type: 'baby/meet', now: 1000 });
  check('meet stores Bean in the crib', s.baby?.name === 'Bean' && s.baby?.spot === 'crib' && s.baby?.bed === 'crib-1' && !('baby' in initialState()));
  const gone = reduce(s, { type: 'item/delete', room: 'nursery', id: 'crib-1' });
  check('deleting her crib stands her on the mat and keeps Bean', gone.baby?.spot === 'mat' && gone.baby?.name === 'Bean' && !gone.baby?.bed);
  const seated = reduce(s, { type: 'baby/place', room: 'nursery', x: 100, y: 500, spot: 'mat', bed: null, seat: { item: 'rocker-3', pose: 'sit', n: 0 }, now: 2 });
  check('she can sit in the rocker', seated.baby?.spot === 'mat' && seated.baby?.seat?.item === 'rocker-3' && seated.baby?.name === 'Bean');
  const cribKept = reduce(seated, { type: 'item/delete', room: 'nursery', id: 'crib-1' });
  check('deleting the crib leaves a seat on another piece', cribKept.baby?.seat?.item === 'rocker-3' && cribKept.baby?.name === 'Bean');
  const rocker = seated.rooms.nursery.items.find(i => i.id === 'rocker-3')!;
  const beside = standBeside(rocker.x, pieceWidth('rocker') * drawnScale(rocker), seated.baby!.x);
  const shifted = reduce(seated, { type: 'item/move', room: 'nursery', id: 'rocker-3', x: rocker.x + 80, y: rocker.y, stand: true });
  check('moving her seat stands her beside it', !shifted.baby?.seat && shifted.baby?.spot === 'mat' && shifted.baby?.x === beside.x && shifted.baby?.y === STAND_Y);
  const flipped = reduce(s, { type: 'item/flip', room: 'nursery', id: 'crib-1' });
  check('flipping the crib does not evict her', flipped.baby?.spot === 'crib' && flipped.baby?.bed === 'crib-1' && flipped.rooms.nursery.items.find(i => i.id === 'crib-1')!.flip === true);
  check('she only blocks the cushion she is using', babyOccupant(seated.baby, 'nursery')?.n === 0 && babyOccupant(s.baby, 'nursery') === null);
  const untouched = babyAfterFurniture(s.baby!, 'crib-1', false, { x: 1, y: 2 });
  check('moving the crib keeps the same baby', untouched === s.baby);
  const movedCrib = reduce(s, { type: 'item/move', room: 'nursery', id: 'crib-1', x: 1400, y: 480, stand: true });
  const sizedCrib = reduce(s, { type: 'item/size', room: 'nursery', id: 'crib-1', size: 1.5 });
  check('moving the crib while she is in it keeps her lying there', movedCrib.baby?.spot === 'crib' && movedCrib.baby?.bed === 'crib-1' && movedCrib.rooms.nursery.items.find(i => i.id === 'crib-1')!.x === 1400);
  check('resizing the crib while she is in it keeps her lying there', sizedCrib.baby?.spot === 'crib' && sizedCrib.baby?.bed === 'crib-1' && sizedCrib.rooms.nursery.items.find(i => i.id === 'crib-1')!.size === 1.5);
  const heldBaby = reduce(s, { type: 'baby/hold', holder: 'c1', room: 'nursery', x: 400, y: 420, now: 3 });
  const heldMove = reduce(heldBaby, { type: 'item/move', room: 'nursery', id: 'crib-1', x: 1500, y: 480, stand: true });
  const heldSize = reduce(heldBaby, { type: 'item/size', room: 'nursery', id: 'crib-1', size: 0.75 });
  const heldDel = reduce(heldBaby, { type: 'item/delete', room: 'nursery', id: 'crib-1' });
  check('moving the crib while she is held keeps the cuddle', heldMove.baby?.spot === 'arms' && heldMove.baby?.holder === 'c1');
  check('resizing the crib while she is held keeps the cuddle', heldSize.baby?.spot === 'arms' && heldSize.baby?.holder === 'c1' && heldSize.rooms.nursery.items.find(i => i.id === 'crib-1')!.size === 0.75);
  check('deleting the crib while she is held keeps the cuddle', heldDel.baby?.spot === 'arms' && heldDel.baby?.holder === 'c1' && !heldDel.rooms.nursery.items.some(i => i.id === 'crib-1'));

  const hood = new Neighborhood(kv, { flushMs: 5 });
  await hood.init('BABYTEST');
  const A = mk();
  await hood.onConnect(A);
  await msg(hood, A, { t: 'join', nickname: NICKNAMES[0], look, v: PROTOCOL, pet: 1, mail: 1, sit: 1, fit: 1, baby: 1 });
  const pidA = A.last('joined').pid as string;
  const hid = A.last('welcome').houses.find((h: { ownerId: string }) => h.ownerId === pidA).id as string;
  check('welcome says the server speaks baby', A.last('welcome').baby === 1 && A.last('welcome').sit === 1);

  const B = mk();
  await hood.onConnect(B);
  await msg(hood, B, { t: 'join', nickname: NICKNAMES[1], look, v: PROTOCOL, pet: 1, mail: 1, sit: 1, fit: 1, baby: 1 });
  const pidB = B.last('joined').pid as string;
  const C = mk();
  await hood.onConnect(C);
  await msg(hood, C, { t: 'join', nickname: NICKNAMES[2], look, v: PROTOCOL, pet: 1, mail: 1, sit: 1, fit: 1 });

  await msg(hood, B, { t: 'act', houseId: hid, cid: 1, action: { type: 'baby/name', name: 'Pip' } });
  check('a visitor cannot name her before she exists', B.last('nack')?.reason === 'notyours' || B.last('nack')?.reason === 'noop');

  A.inbox.length = 0; B.inbox.length = 0; C.inbox.length = 0;
  await msg(hood, A, { t: 'act', houseId: hid, cid: 1, action: { type: 'baby/meet', now: 1 } });
  const born = hood.houses.get(hid)!.state.baby!;
  check('both baby clients see her arrive in the crib', born.name === 'Bean' && born.spot === 'crib' && born.mood === 2 && B.last('act')?.action?.type === 'baby/meet' && A.last('act')?.action?.type === 'baby/meet');
  check('an older client is not told', babyActs(C).length === 0);

  await msg(hood, A, { t: 'act', houseId: hid, cid: 2, action: { type: 'baby/ease', now: 1 } });
  check('ease right after meeting is a noop', A.last('nack')?.reason === 'noop' && hood.houses.get(hid)!.state.baby!.mood === 2);

  await msg(hood, B, { t: 'act', houseId: hid, cid: 2, action: { type: 'baby/name', name: 'Pip' } });
  check('a visitor cannot rename her', B.last('nack')?.reason === 'notyours' && hood.houses.get(hid)!.state.baby!.name === 'Bean');

  A.inbox.length = 0; B.inbox.length = 0;
  await msg(hood, A, { t: 'act', houseId: hid, cid: 3, action: { type: 'baby/name', name: 'Sunny Bunny' } });
  check('the owner names her and the other baby client hears it', hood.houses.get(hid)!.state.baby!.name === 'Sunny Bunny' && B.last('act')?.action?.name === 'Sunny Bunny');

  A.inbox.length = 0; B.inbox.length = 0; C.inbox.length = 0;
  await msg(hood, B, { t: 'act', houseId: hid, cid: 3, action: { type: 'baby/care', care: 'feed', now: 1 } });
  check('a friend can feed her up to Happy', hood.houses.get(hid)!.state.baby!.mood === 3 && A.last('act')?.action?.type === 'baby/care' && B.last('act')?.action?.care === 'feed' && babyActs(C).length === 0);

  await msg(hood, B, { t: 'pres', p: { where: 'house', houseId: hid, room: 'nursery', x: 400, y: 540, flip: false } });
  await msg(hood, B, { t: 'act', houseId: hid, cid: 4, action: { type: 'baby/hold', holder: 'someone', room: 'nursery', x: 400, y: 420, now: 1 } });
  check('the friend picks her up', hood.houses.get(hid)!.state.baby!.spot === 'arms' && hood.houses.get(hid)!.state.baby!.holder === pidB);

  const held = hood.houses.get(hid)!.state.baby!.holder;
  await msg(hood, A, { t: 'act', houseId: hid, cid: 4, action: { type: 'baby/hold', holder: pidA, room: 'nursery', x: 420, y: 420, now: 1 } });
  check('a second hold is cuddling and does not steal her', A.last('nack')?.reason === 'cuddling' && hood.houses.get(hid)!.state.baby!.holder === held);

  await msg(hood, B, { t: 'act', houseId: hid, cid: 5, action: { type: 'baby/place', room: 'nursery', x: 10, y: 20, spot: 'mat', bed: null, seat: null, now: 1 } });
  check('a visitor cannot place her', B.last('nack')?.reason === 'notyours' && hood.houses.get(hid)!.state.baby!.holder === pidB);

  await msg(hood, A, { t: 'act', houseId: hid, cid: 5, action: { type: 'item/add', room: 'nursery', item: { id: 'bassinet-a', kind: 'bassinet', x: 900, y: 500, flip: false, z: 8, scale: 1 } } });
  A.inbox.length = 0; B.inbox.length = 0; C.inbox.length = 0;
  await msg(hood, A, { t: 'act', houseId: hid, cid: 6, action: { type: 'baby/place', room: 'nursery', x: 900, y: 400, spot: 'bassinet', bed: 'bassinet-a', seat: null, now: 1 } });
  check('the owner lays her in the bassinet and the friend sees it', hood.houses.get(hid)!.state.baby!.spot === 'bassinet' && hood.houses.get(hid)!.state.baby!.bed === 'bassinet-a' && !hood.houses.get(hid)!.state.baby!.holder && B.last('act')?.action?.spot === 'bassinet' && babyActs(C).length === 0);

  const live = hood.houses.get(hid)!.state.baby!;
  live.mood = 4;
  live.since = Date.now() - EASE_MS;
  A.inbox.length = 0; B.inbox.length = 0; C.inbox.length = 0;
  await msg(hood, A, { t: 'act', houseId: hid, cid: 7, action: { type: 'baby/ease', now: 1 } });
  check('ease syncs one step to both baby clients only', hood.houses.get(hid)!.state.baby!.mood === 3 && A.last('act')?.action?.type === 'baby/ease' && B.last('act')?.action?.type === 'baby/ease' && babyActs(C).length === 0);

  const D = mk();
  await hood.onConnect(D);
  await msg(hood, D, { t: 'join', nickname: NICKNAMES[3], look, v: PROTOCOL, pet: 1, mail: 1, sit: 1 });
  const seen = D.last('welcome').houses.find((h: { id: string }) => h.id === hid);
  check('a client without baby:1 never receives the field', seen && !('baby' in seen.state));

  const E = mk();
  await hood.onConnect(E);
  await msg(hood, E, { t: 'join', nickname: NICKNAMES[4], look, v: PROTOCOL, pet: 1, mail: 1, sit: 1, fit: 1 });
  B.inbox.length = 0;
  await msg(hood, E, { t: 'act', houseId: hid, cid: 1, action: { type: 'baby/care', care: 'burp', now: 1 } });
  check('a client that did not say baby:1 is nacked and not echoed', E.last('nack')?.reason === 'invalid' && babyActs(B).length === 0 && hood.houses.get(hid)!.state.baby!.mood === 3);

  check('the older client stayed quiet the whole time', C.inbox.every(m => !(m.t === 'act' && String(m.action?.type || '').startsWith('baby/'))));

  await msg(hood, B, { t: 'pres', p: { where: 'house', houseId: hid, room: 'nursery', x: 420, y: 540, flip: false } });
  await msg(hood, B, { t: 'act', houseId: hid, cid: 8, action: { type: 'baby/hold', holder: pidB, room: 'nursery', x: 448, y: 430, now: 1 } });
  check('she can be held again while her friend is in the house', hood.houses.get(hid)!.state.baby!.spot === 'arms' && hood.houses.get(hid)!.state.baby!.holder === pidB);
  await msg(hood, B, { t: 'pres', p: { where: 'house', houseId: hid, room: 'bedroom', x: 700, y: 540, flip: false } });
  check('another room in the same house keeps the cuddle', hood.houses.get(hid)!.state.baby!.spot === 'arms' && hood.houses.get(hid)!.state.baby!.holder === pidB);
  A.inbox.length = 0; B.inbox.length = 0; C.inbox.length = 0;
  await msg(hood, B, { t: 'pres', p: { where: 'street', x: 200, y: 540, flip: false } });
  const dropped = hood.houses.get(hid)!.state.baby!;
  check('leaving the house puts her on the mat', dropped.spot === 'mat' && !dropped.holder && dropped.room === 'bedroom');
  check('both baby clients hear the release and the older client does not', A.last('act')?.action?.type === 'baby/hold' && A.last('act')?.action?.holder === null && B.last('act')?.action?.holder === null && babyActs(C).length === 0);
  A.inbox.length = 0;
  await msg(hood, A, { t: 'act', houseId: hid, cid: 9, action: { type: 'baby/hold', holder: pidA, room: 'nursery', x: 500, y: 430, now: 1 } });
  check('after she is put down anyone can hold her', !A.last('nack') && hood.houses.get(hid)!.state.baby!.holder === pidA && hood.houses.get(hid)!.state.baby!.spot === 'arms');
  await msg(hood, A, { t: 'act', houseId: hid, cid: 10, action: { type: 'baby/hold', holder: null, room: 'nursery', x: 640, y: 540, now: 1 } });
  await msg(hood, B, { t: 'pres', p: { where: 'house', houseId: hid, room: 'nursery', x: 640, y: 540, flip: true } });
  await msg(hood, B, { t: 'act', houseId: hid, cid: 11, action: { type: 'baby/hold', holder: pidB, room: 'nursery', x: 612, y: 430, now: 1 } });
  check('the friend is holding her before the disconnect', hood.houses.get(hid)!.state.baby!.holder === pidB);
  A.inbox.length = 0; C.inbox.length = 0;
  hood.onClose(B);
  await msg(hood, A, { t: 'pres', p: { where: 'house', houseId: hid, room: 'nursery', x: 800, y: 540, flip: false } });
  const afterClose = hood.houses.get(hid)!.state.baby!;
  check('a disconnect puts her on the mat where her holder was', afterClose.spot === 'mat' && !afterClose.holder && afterClose.x === 640 && afterClose.room === 'nursery');
  check('the owner hears the disconnect release and the older client does not', A.last('act')?.action?.holder === null && babyActs(C).length === 0);
  const stuck = hood.houses.get(hid)!.state.baby!;
  stuck.spot = 'arms'; stuck.holder = 'pgone';
  A.inbox.length = 0;
  await msg(hood, A, { t: 'act', houseId: hid, cid: 12, action: { type: 'baby/hold', holder: pidA, room: 'nursery', x: 700, y: 430, now: 1 } });
  check('a holder who is already gone is not cuddling', !A.last('nack') && hood.houses.get(hid)!.state.baby!.holder === pidA);

  console.log(pass + ' passed');
}

main().catch(err => { console.error(err); process.exitCode = 1; });
