// Bathroom fill-in and decorate size. An old save gains the starter bathroom and
// keeps an emptied one. Size is a separate field from scale: missing means 1x,
// 1x is omitted, and item/size is forwarded only to clients that say fit:1.
import { Neighborhood, type KV, type Conn } from '../server/core';
import { NICKNAMES, PROTOCOL, cleanAction, cleanHouseState, cleanItem } from '../src/shared/hood';
import { applyItemSize, drawnScale, ensureRooms, initialState, itemSizeOf, ITEM_SIZE_STEPS, migrate, reduce, type GameState, type PlacedItem } from '../src/shared/state';
import { anchorsOf } from '../src/shared/sit';

const store = new Map<string, unknown>();
const kv: KV = {
  get: async k => store.has(k) ? JSON.parse(JSON.stringify(store.get(k))) : undefined,
  put: async (k, v) => { store.set(k, JSON.parse(JSON.stringify(v))); },
  delete: async k => { store.delete(k); },
};
let pass = 0;
const check = (name: string, ok: boolean, extra = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + name, extra); if (ok) pass++; else process.exitCode = 1; };
type C = Conn & { inbox: any[]; last(t: string): any };
const mk = (): C => { const inbox: any[] = []; return { inbox, send(s: string) { inbox.push(JSON.parse(s)); }, close() {}, last(t: string) { return [...inbox].reverse().find(m => m.t === t); } } as C; };
const look = { skin: '#f1c27d', hair: '#3b2219', hairStyle: 0, shirt: '#ff7aa8', pants: '#5b8def', size: 'kid', acc: 0 };
const bathKinds = () => initialState().rooms.bathroom.items.map(i => i.kind);
const BATH = 'bath-mat,shower-curtain,soaking-tub,rubber-ducky,bath-toilet,sink-vanity,bath-mirror,towel-bar';

function oldClientMigrate(saved: any) {
  const baseRooms = { living: { items: [] }, bedroom: { items: [] }, kitchen: { items: [] }, salon: { items: [] } };
  return { ...saved, rooms: { ...baseRooms, ...saved.rooms } };
}

async function main() {
  check('protocol stays 4', PROTOCOL === 4);
  const fresh = initialState();
  check('a new house starts with the bathroom pieces', bathKinds().join(',') === BATH && fresh.version === 3 && fresh.rooms.bathroom.wallpaper === '#d4f4fb' && fresh.rooms.bathroom.floor === '#f7e7d4');
  check('starter pieces have no size field', fresh.rooms.bathroom.items.every(i => !('size' in i)) && fresh.rooms.living.items.every(i => !('size' in i)));

  const old = initialState();
  delete (old.rooms as Partial<GameState['rooms']>).bathroom;
  old.rooms.living.items = [...old.rooms.living.items, { id: 'kept-sofa', kind: 'sofa', x: 20, y: 400, flip: false, z: 9, scale: 1 }];
  const filled = ensureRooms(old);
  check('a house with no bathroom gains the starter layout', filled.rooms.bathroom.items.map(i => i.kind).join(',') === BATH);
  check('filling the bathroom leaves the living room alone', filled.rooms.living.items.some(i => i.id === 'kept-sofa') && filled.rooms.living.items.length === old.rooms.living.items.length);

  const custom = initialState();
  custom.rooms.bathroom = { ...custom.rooms.bathroom, items: [{ id: 'my-tub', kind: 'soaking-tub', x: 40, y: 500, flip: false, z: 2, scale: 1 }] };
  check('a bathroom a kid already has is not replaced', ensureRooms(custom).rooms.bathroom.items.length === 1 && ensureRooms(custom).rooms.bathroom.items[0].id === 'my-tub');
  const emptied = initialState();
  emptied.rooms.bathroom.items = [];
  check('an emptied bathroom stays empty', ensureRooms(emptied) === emptied && emptied.rooms.bathroom.items.length === 0);

  const migrated = migrate(JSON.parse(JSON.stringify(old)));
  check('migrate fills a version-3 save and leaves the version alone', migrated.version === 3 && migrated.rooms.bathroom.items.map(i => i.kind).join(',') === BATH && migrated.rooms.living.items.some(i => i.id === 'kept-sofa'));
  const cleaned = cleanHouseState(JSON.parse(JSON.stringify(old)));
  check('cleanHouseState adds the starter bathroom without a size field', cleaned.rooms.bathroom.items.map(i => i.kind).join(',') === BATH && cleaned.rooms.bathroom.items.every(i => !('size' in i)) && cleaned.rooms.living.items.some(i => i.id === 'kept-sofa'));
  const round = oldClientMigrate(JSON.parse(JSON.stringify(filled)));
  check('an old client keeps the bathroom key', round.rooms.bathroom.items.map((i: { kind: string }) => i.kind).join(',') === BATH);

  const bare = { id: 'a', kind: 'sofa', x: 10, y: 400, flip: false, z: 1, scale: 1 };
  const missing = cleanItem(bare);
  const junk = cleanItem({ ...bare, size: 'big' });
  const one = cleanItem({ ...bare, size: 1 });
  const near = cleanItem({ ...bare, size: 1.2 });
  const big = cleanItem({ ...bare, size: 1.5 });
  check('a missing or 1x size stays off the item', !!missing && !('size' in missing) && !!one && !('size' in one) && !!junk && !('size' in junk) && drawnScale(missing) === 1 && itemSizeOf(undefined) === 1);
  check('a saved size snaps onto a step', !!near && near.size === 1.25 && !!big && big.size === 1.5 && drawnScale({ scale: 2, size: 1.5 }) === 3);
  const grown = applyItemSize(bare, 0.8);
  const reset = applyItemSize(grown, 1);
  check('applyItemSize omits 1x', grown.size === 0.75 && !('size' in reset));

  let s = initialState();
  const id = s.rooms.bathroom.items.find(i => i.kind === 'soaking-tub')!.id;
  for (const step of ITEM_SIZE_STEPS) {
    if (step === 1) continue;
    const next = reduce(s, { type: 'item/size', room: 'bathroom', id, size: step });
    const it = next.rooms.bathroom.items.find(i => i.id === id)!;
    const again = reduce(next, { type: 'item/size', room: 'bathroom', id, size: step });
    if (it.size !== step || again !== next) { check('size steps stick and a repeat is a no-op', false, String(step)); s = next; break; }
    s = next;
  }
  const back = reduce(s, { type: 'item/size', room: 'bathroom', id, size: 1 });
  const plain = back.rooms.bathroom.items.find(i => i.id === id)!;
  check('stepping back to 1x drops the field', !('size' in plain) && itemSizeOf(plain.size) === 1 && reduce(back, { type: 'item/size', room: 'bathroom', id, size: 1 }) === back);
  const moved = reduce(reduce(back, { type: 'item/size', room: 'bathroom', id, size: 1.5 }), { type: 'item/move', room: 'bathroom', id, x: 900, y: 500 });
  const kept = moved.rooms.bathroom.items.find(i => i.id === id)!;
  check('moving a resized item keeps its size', kept.size === 1.5 && kept.x === 900 && kept.scale === 1);

  const sample: PlacedItem = { id: 'n1', kind: 'soaking-tub', x: 100, y: 200, flip: false, z: 1, scale: 1 };
  check('bathroom edits are accepted', !!cleanAction({ type: 'item/add', room: 'bathroom', item: sample }) && !!cleanAction({ type: 'room/wallpaper', room: 'bathroom', color: '#d4f4fb' }) && !!cleanAction({ type: 'item/size', room: 'bathroom', id: 'n1', size: 1.4 }));
  const snapped = cleanAction({ type: 'item/size', room: 'bathroom', id: 'n1', size: 1.4 });
  check('item/size snaps and an unknown room is still rejected', snapped?.type === 'item/size' && snapped.size === 1.5 && cleanAction({ type: 'item/add', room: 'attic', item: sample }) === null && cleanAction({ type: 'item/size', room: 'attic', id: 'n1', size: 1.5 }) === null && cleanAction({ type: 'item/size', room: 'bathroom', id: 'n1', size: Number.NaN }) === null);

  const hood = new Neighborhood(kv, { flushMs: 5 });
  await hood.init('BATHSIZE');
  const fitA = mk();
  await hood.onConnect(fitA);
  await hood.onMessage(fitA, JSON.stringify({ t: 'join', nickname: NICKNAMES[0], look, v: 4, fit: 1, pet: 1, mail: 1, sit: 1 }));
  const hid = [...hood.houses.keys()][0];
  const fitB = mk();
  await hood.onConnect(fitB);
  await hood.onMessage(fitB, JSON.stringify({ t: 'join', nickname: NICKNAMES[1], look, v: 4, fit: 1 }));
  const oldC = mk();
  await hood.onConnect(oldC);
  await hood.onMessage(oldC, JSON.stringify({ t: 'join', nickname: NICKNAMES[2], look, v: 4 }));
  fitA.inbox.length = 0; fitB.inbox.length = 0; oldC.inbox.length = 0;
  const tub = hood.houses.get(hid)!.state.rooms.bathroom.items.find(i => i.kind === 'soaking-tub')!;
  await hood.onMessage(fitA, JSON.stringify({ t: 'act', houseId: hid, cid: 7, action: { type: 'item/size', room: 'bathroom', id: tub.id, size: 0.75 } }));
  const acts = (c: C) => c.inbox.filter(m => m.t === 'act' && m.action && m.action.type === 'item/size');
  const stored = hood.houses.get(hid)!.state.rooms.bathroom.items.find(i => i.id === tub.id)!;
  check('both fit clients see the resize', acts(fitA).length === 1 && acts(fitB).length === 1 && acts(fitA)[0].action.size === 0.75 && acts(fitB)[0].action.size === 0.75);
  check('a client without fit does not receive item/size', acts(oldC).length === 0 && !oldC.inbox.some(m => m.t === 'act' && m.action && m.action.type === 'item/size'));
  check('the stored item is 0.75 and still has its scale', stored.size === 0.75 && stored.scale === 1);
  const later = mk();
  await hood.onConnect(later);
  await hood.onMessage(later, JSON.stringify({ t: 'join', nickname: NICKNAMES[3], look, v: 4 }));
  const welcome = later.last('welcome');
  const welcomed = (welcome?.houses ?? []).find((h: { id: string }) => h.id === hid);
  const welcomedTub = welcomed?.state?.rooms?.bathroom?.items?.find((i: { id: string }) => i.id === tub.id);
  check('an old client loading the house still receives the size field', welcomedTub && welcomedTub.size === 0.75 && welcomed?.state?.rooms?.bathroom?.items?.length === 8);
  await hood.onMessage(fitA, JSON.stringify({ t: 'act', houseId: hid, cid: 8, action: { type: 'item/move', room: 'bathroom', id: tub.id, x: 880, y: 510 } }));
  const afterMove = hood.houses.get(hid)!.state.rooms.bathroom.items.find(i => i.id === tub.id)!;
  check('an item/move does not wipe the size', afterMove.size === 0.75 && afterMove.x === 880);
  await hood.flush();
  const disk = store.get('house:' + hid) as { state: GameState };
  const diskTub = disk.state.rooms.bathroom.items.find(i => i.id === tub.id)!;
  check('the size is on the saved house', diskTub.size === 0.75 && disk.state.rooms.bathroom.items.map(i => i.kind).join(',') === BATH);

  // A resize changes only the scale. She stays in the seat, and the anchor moves with the piece.
  const stoolAt = (size: number) => anchorsOf({ id: 'seat-stool', kind: 'bath-stool', x: 1200, footY: 520, flip: false, scale: size, w: 110, h: 110 })[0];
  const y1 = stoolAt(1).y, y15 = stoolAt(1.5).y, y075 = stoolAt(0.75).y;
  check('the stool seat rises at 1.5x and drops at 0.75x', y15 < y1 && y1 < y075 && stoolAt(1).pose === 'sit');
  const pidA = (fitA as { pid?: string }).pid || '';
  const doll = hood.houses.get(hid)!.state.characters[0];
  const seat = { item: 'seat-stool', pose: 'sit' as const, n: 0 as const };
  await hood.onMessage(fitA, JSON.stringify({ t: 'act', houseId: hid, cid: 21, action: { type: 'item/add', room: 'bathroom', item: { id: 'seat-stool', kind: 'bath-stool', x: 1200, y: 520, flip: false, z: 9, scale: 1 } } }));
  await hood.onMessage(fitA, JSON.stringify({ t: 'act', houseId: hid, cid: 22, action: { type: 'char/move', id: doll.id, room: 'bathroom', x: 1200, y: 470, seat } }));
  const seated = JSON.parse(JSON.stringify(hood.houses.get(hid)!.state)) as GameState;
  const sitting = seated.characters.find(c => c.id === doll.id)!;
  check('she is seated on the stool before the resize', sitting.seat?.item === 'seat-stool' && sitting.seat.pose === 'sit' && sitting.seat.n === 0);
  const sitB = mk();
  await hood.onConnect(sitB);
  await hood.onMessage(sitB, JSON.stringify({ t: 'join', nickname: NICKNAMES[4], look, v: 4, fit: 1, sit: 1 }));
  fitA.inbox.length = 0; sitB.inbox.length = 0;
  await hood.onMessage(fitA, JSON.stringify({ t: 'act', houseId: hid, cid: 23, action: { type: 'item/size', room: 'bathroom', id: 'seat-stool', size: 1.5 } }));
  await hood.onMessage(fitA, JSON.stringify({ t: 'act', houseId: hid, cid: 24, action: { type: 'item/size', room: 'bathroom', id: 'seat-stool', size: 0.75 } }));
  const replay = (inbox: any[]) => {
    let s = seated;
    for (const m of inbox) if (m.t === 'act' && m.houseId === hid) s = reduce(s, m.action);
    return s;
  };
  const stillSeated = (s: GameState) => {
    const c = s.characters.find(x => x.id === doll.id);
    const piece = s.rooms.bathroom.items.find(i => i.id === 'seat-stool');
    return !!c && c.seat?.item === 'seat-stool' && c.seat.pose === 'sit' && c.seat.n === 0 && c.x === sitting.x && c.y === sitting.y && piece?.size === 0.75 && piece.scale === 1;
  };
  const viewA = replay(fitA.inbox), viewB = replay(sitB.inbox);
  const sizes = (c: C) => c.inbox.filter(m => m.t === 'act' && m.action?.type === 'item/size' && m.action.id === 'seat-stool').map(m => m.action.size);
  check('she stays seated on both clients at 1.5x and 0.75x', stillSeated(viewA) && stillSeated(viewB) && stillSeated(hood.houses.get(hid)!.state) && sizes(fitA).join(',') === '1.5,0.75' && sizes(sitB).join(',') === '1.5,0.75');
  await hood.onMessage(fitA, JSON.stringify({ t: 'act', houseId: hid, cid: 25, action: { type: 'item/add', room: 'bathroom', item: { id: 'player-stool', kind: 'bath-stool', x: 1500, y: 520, flip: false, z: 10, scale: 1 } } }));
  await hood.onMessage(fitA, JSON.stringify({ t: 'pres', p: { where: 'house', houseId: hid, room: 'bathroom', x: 1500, y: 470, flip: false, seat: { id: 'player-stool', pose: 'sit', n: 0 } } }));
  fitA.inbox.length = 0; sitB.inbox.length = 0;
  await hood.onMessage(fitA, JSON.stringify({ t: 'act', houseId: hid, cid: 26, action: { type: 'item/size', room: 'bathroom', id: 'player-stool', size: 1.5 } }));
  await hood.onMessage(fitA, JSON.stringify({ t: 'act', houseId: hid, cid: 27, action: { type: 'item/size', room: 'bathroom', id: 'player-stool', size: 0.75 } }));
  const pres = hood.presence.get(pidA);
  const stood = sitB.inbox.some(m => m.t === 'pres' && m.pid === pidA && !m.p?.seat);
  check('a seated player is not stood up by a resize', pres?.seat?.id === 'player-stool' && pres.seat.pose === 'sit' && pres.seat.n === 0 && pres.x === 1500 && pres.y === 470 && !stood);

  console.log(pass + ' passed');
}

main();
