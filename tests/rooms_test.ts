// Nursery + backyard: missing rooms are filled without overwriting a stored room,
// edits to both rooms are accepted, and an old client's save cannot drop them.
import { Neighborhood, type KV, type Conn } from '../server/core';
import { NICKNAMES, PROTOCOL, cleanAction, cleanFx, cleanHouseState, cleanPresence } from '../src/shared/hood';
import { ensureRooms, initialState, migrate, reduce, type GameState } from '../src/shared/state';

const store = new Map<string, any>();
const puts: string[] = [];
const kv: KV = {
  get: async k => store.has(k) ? JSON.parse(JSON.stringify(store.get(k))) : undefined,
  put: async (k, v) => { puts.push(k); store.set(k, JSON.parse(JSON.stringify(v))); },
  delete: async k => { store.delete(k); },
};
let pass = 0;
const check = (name: string, ok: boolean, extra = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + name, extra); if (ok) pass++; else process.exitCode = 1; };
type C = Conn & { inbox: any[]; last(t: string): any };
const mk = (): C => { const inbox: any[] = []; return { inbox, send(s: string) { inbox.push(JSON.parse(s)); }, close() {}, last(t: string) { return [...inbox].reverse().find(m => m.t === t); } } as any; };
const look = { skin: '#f1c27d', hair: '#3b2219', hairStyle: 0, shirt: '#ff7aa8', pants: '#5b8def', size: 'kid', acc: 0 };
const starterKinds = () => initialState().rooms.nursery.items.map(i => i.kind);
const strip = (s: GameState): GameState => {
  const rooms = { ...s.rooms } as GameState['rooms'];
  delete (rooms as any).nursery; delete (rooms as any).backyard;
  return { ...s, rooms };
};

/** What client 27cfcac does with a house it does not recognise: keep every saved room, draw only the four it knows. */
function oldClientMigrate(saved: any) {
  const baseRooms = { living: { items: [] }, bedroom: { items: [] }, kitchen: { items: [] }, salon: { items: [] } };
  return { ...saved, rooms: { ...baseRooms, ...saved.rooms } };
}

async function main() {
  check('protocol stays 4', PROTOCOL === 4);
  const fresh = initialState();
  check('save version stays 3', fresh.version === 3 && fresh.rooms.nursery.items.length === 4 && fresh.rooms.backyard.items.length === 0);
  check('starter pieces are the crib, rug, mobile and rocker', starterKinds().join(',') === 'cloud-rug,crib,crib-mobile,rocker');

  const old = strip(fresh);
  old.rooms.living.items = [...old.rooms.living.items, { id: 'kept-sofa', kind: 'sofa', x: 20, y: 400, flip: false, z: 9, scale: 1 }];
  const a = ensureRooms(old);
  const b = ensureRooms(strip(initialState()));
  check('a house with no nursery gains the starter layout', a.rooms.nursery.items.map(i => i.kind).join(',') === starterKinds().join(',') && a.rooms.backyard.items.length === 0);
  check('existing living-room items are not replaced', a.rooms.living.items.some(i => i.id === 'kept-sofa') && a.rooms.living.items.length === old.rooms.living.items.length);
  a.rooms.nursery.items.push({ id: 'extra', kind: 'rattle', x: 1, y: 1, flip: false, z: 9, scale: 1 });
  check('each fill-in gets its own starter objects', b.rooms.nursery.items.length === 4 && !b.rooms.nursery.items.some(i => i.id === 'extra'));

  const custom = initialState();
  custom.rooms.nursery = { ...custom.rooms.nursery, items: [{ id: 'my-doll', kind: 'doll-rose', x: 30, y: 40, flip: true, z: 2, scale: 1 }] };
  delete (custom.rooms as any).backyard;
  const kept = ensureRooms(custom);
  check('a nursery a kid already has is not replaced by the starter set', kept.rooms.nursery.items.length === 1 && kept.rooms.nursery.items[0].id === 'my-doll' && kept.rooms.backyard.items.length === 0);

  const emptied = initialState();
  emptied.rooms.nursery.items = [];
  check('an emptied nursery stays empty', ensureRooms(emptied) === emptied && emptied.rooms.nursery.items.length === 0);

  const migrated = migrate(strip(initialState()));
  check('migrate fills a version-3 save and leaves the version alone', migrated.version === 3 && migrated.rooms.nursery.items.map(i => i.kind).join(',') === starterKinds().join(',') && migrated.rooms.living.items.length === initialState().rooms.living.items.length);

  const cleaned = cleanHouseState(strip(initialState()));
  check('cleanHouseState of a 4-room house adds the starter nursery and an empty backyard', cleaned.rooms.nursery.items.map(i => i.kind).join(',') === starterKinds().join(',') && cleaned.rooms.backyard.items.length === 0 && cleaned.rooms.living.items.length === initialState().rooms.living.items.length);
  const cleanedCustom = cleanHouseState(custom);
  check('cleanHouseState keeps a custom nursery', cleanedCustom.rooms.nursery.items.length === 1 && cleanedCustom.rooms.nursery.items[0].id === 'my-doll');

  const item = { id: 'n1', kind: 'crib', x: 100, y: 200, flip: false, z: 1, scale: 1 };
  check('nursery and backyard edits are accepted', !!cleanAction({ type: 'item/add', room: 'nursery', item }) && !!cleanAction({ type: 'item/add', room: 'backyard', item: { ...item, id: 'y1', kind: 'plant' } }) && !!cleanAction({ type: 'room/wallTile', room: 'nursery', tile: 'nursery/cloud-sky' }) && !!cleanAction({ type: 'cat/move', room: 'nursery', x: 400 }) && !!cleanAction({ type: 'char/move', id: 'c1', room: 'backyard', x: 200, y: 500 }));
  check('an unknown room is still rejected', cleanAction({ type: 'item/add', room: 'attic', item }) === null);
  check('presence accepts nursery and rejects attic', !!cleanPresence({ where: 'house', houseId: 'h1', room: 'nursery', x: 10, y: 20, flip: false }, () => true) && !cleanPresence({ where: 'house', houseId: 'h1', room: 'attic', x: 10, y: 20, flip: false }, () => true));

  const sent = ensureRooms(strip(initialState()));
  sent.rooms.living.items = [...sent.rooms.living.items, { id: 'old-sofa', kind: 'sofa', x: 10, y: 400, flip: false, z: 4, scale: 1 }];
  const round = oldClientMigrate(JSON.parse(JSON.stringify(sent)));
  const reimported = cleanHouseState(round);
  check('an old client keeps the nursery, and bringing that house back does too', round.rooms.nursery.items.length === 4 && reimported.rooms.nursery.items.map(i => i.kind).join(',') === starterKinds().join(',') && reimported.rooms.living.items.some((i: { id: string }) => i.id === 'old-sofa'));

  let hood = new Neighborhood(kv, { flushMs: 5 });
  await hood.init('ROOMTEST');
  const c = mk();
  await hood.onConnect(c);
  await hood.onMessage(c, JSON.stringify({ t: 'join', nickname: NICKNAMES[0], look, v: 4 }));
  const token = c.last('joined').token;
  const hid = [...hood.houses.keys()][0];
  await hood.flush();
  const stored = store.get('house:' + hid);
  stored.state = strip(stored.state);
  stored.state.rooms.living.items.push({ id: 'from-disk', kind: 'lamp', x: 80, y: 420, flip: false, z: 3, scale: 1 });
  store.set('house:' + hid, JSON.parse(JSON.stringify(stored)));
  const putsBefore = puts.length;
  const hood2 = new Neighborhood(kv, { flushMs: 5 });
  await hood2.load();
  const mem = hood2.houses.get(hid)!.state;
  const diskRooms = Object.keys(store.get('house:' + hid).state.rooms);
  check('loading an old stored house fills the nursery in memory', mem.rooms.nursery.items.map(i => i.kind).join(',') === starterKinds().join(',') && mem.rooms.backyard.items.length === 0 && mem.rooms.living.items.some(i => i.id === 'from-disk'));
  check('that fill-in does not write the house back yet', !diskRooms.includes('nursery') && !diskRooms.includes('backyard') && puts.slice(putsBefore).every(k => k !== hid && k !== 'house:' + hid));

  const c2 = mk();
  await hood2.onConnect(c2);
  await hood2.onMessage(c2, JSON.stringify({ t: 'hello', token, v: 4 }));
  const msg = (o: any) => { (c2 as any).budget = undefined; return hood2.onMessage(c2, JSON.stringify(o)); };
  await msg({ t: 'act', houseId: hid, cid: 1, action: { type: 'room/wallpaper', room: 'living', color: '#aabbcc' } });
  await hood2.flush();
  const after = store.get('house:' + hid).state;
  check('a living-room edit persists the filled nursery and the original items', after.rooms.living.wallpaper === '#aabbcc' && after.rooms.living.items.some((i: { id: string }) => i.id === 'from-disk') && after.rooms.nursery.items.map((i: { kind: string }) => i.kind).join(',') === starterKinds().join(','));

  await msg({ t: 'act', houseId: hid, cid: 2, action: { type: 'item/add', room: 'nursery', item: { id: 'nur-edit', kind: 'bunny-plush', x: 300, y: 500, flip: false, z: 1, scale: 1 } } });
  await msg({ t: 'act', houseId: hid, cid: 3, action: { type: 'room/wallTile', room: 'backyard', tile: 'nursery/cloud-sky' } });
  await msg({ t: 'act', houseId: hid, cid: 4, action: { type: 'cat/set', cat: { name: 'Pip', coat: 1, room: 'nursery', x: 500 } } });
  await msg({ t: 'act', houseId: hid, cid: 5, action: { type: 'cat/move', room: 'nursery', x: 640 } });
  await hood2.flush();
  const edited = store.get('house:' + hid).state;
  check('nursery and backyard edits are saved on top of the starter layout', edited.rooms.nursery.items.some((i: { id: string }) => i.id === 'nur-edit') && edited.rooms.nursery.items.length === 5 && edited.rooms.backyard.wallTile === 'nursery/cloud-sky' && edited.cat.room === 'nursery' && edited.cat.x === 640);

  const beforeAttic = JSON.stringify(edited.rooms.nursery.items.map((i: { id: string }) => i.id));
  await msg({ t: 'act', houseId: hid, cid: 6, action: { type: 'item/add', room: 'attic', item: { id: 'nope', kind: 'crib', x: 1, y: 1, flip: false, z: 1, scale: 1 } } });
  await hood2.flush();
  const refused = store.get('house:' + hid).state;
  check('an unknown room is nacked and the nursery stays', c2.last('nack')?.reason === 'invalid' && JSON.stringify(refused.rooms.nursery.items.map((i: { id: string }) => i.id)) === beforeAttic);

  const customHouse = store.get('house:' + hid);
  customHouse.state.rooms.nursery.items = [{ id: 'my-doll', kind: 'doll-rose', x: 12, y: 340, flip: false, z: 1, scale: 1 }];
  store.set('house:' + hid, JSON.parse(JSON.stringify(customHouse)));
  const hood3 = new Neighborhood(kv, { flushMs: 5 });
  await hood3.load();
  check('a stored custom nursery is not overwritten on load', hood3.houses.get(hid)!.state.rooms.nursery.items.length === 1 && hood3.houses.get(hid)!.state.rooms.nursery.items[0].id === 'my-doll');

  // reduce on the filled state still applies a nursery edit (the path an old client receives).
  const next = reduce(mem, { type: 'item/add', room: 'nursery', item: { id: 'from-old', kind: 'rattle', x: 50, y: 500, flip: false, z: 1, scale: 1 } });
  check('reduce accepts a nursery edit once the room exists', next.rooms.nursery.items.some(i => i.id === 'from-old') && next.rooms.living.items.some(i => i.id === 'from-disk'));

  const oldDog = initialState();
  delete (oldDog as any).dogKennel;
  oldDog.dog = { name: 'Rocket', breed: 1, owner: 'c1' };
  const followed = migrate(oldDog);
  check('old save loads with the dog following', followed.dog?.name === 'Rocket' && followed.dogKennel == null && followed.rooms.living.items.length === initialState().rooms.living.items.length);
  const kennelItem = { id: 'k1', kind: 'kennel', x: 400, y: 500, flip: false, z: 1, scale: 1 };
  const placed = reduce(followed, { type: 'item/add', room: 'living', item: kennelItem });
  const kenneled = reduce(placed, { type: 'dog/kennel', item: 'k1' });
  check('dog/kennel stores the kennel id', kenneled.dogKennel?.item === 'k1' && kenneled.dog?.name === 'Rocket');
  const movedK = reduce(kenneled, { type: 'item/move', room: 'living', id: 'k1', x: 800, y: 520 });
  check('moving the kennel keeps the dog inside', movedK.dogKennel?.item === 'k1' && movedK.rooms.living.items.find(i => i.id === 'k1')!.x === 800);
  const deletedK = reduce(movedK, { type: 'item/delete', room: 'living', id: 'k1' });
  check('deleting the kennel lets the dog follow', deletedK.dogKennel == null && deletedK.dog?.name === 'Rocket' && !deletedK.rooms.living.items.some(i => i.id === 'k1'));
  const again = reduce(reduce(deletedK, { type: 'item/add', room: 'living', item: { ...kennelItem, id: 'k2' } }), { type: 'dog/kennel', item: 'k2' });
  const heldK = reduce(again, { type: 'char/hold', id: 'c1', hand: 'left', room: 'living', itemId: 'k2' });
  check('picking up the kennel lets the dog follow', heldK.dogKennel == null && heldK.characters[0].held.left?.id === 'k2' && heldK.dog?.name === 'Rocket');
  const dangling = migrate({ ...followed, dogKennel: { item: 'missing' } });
  check('a kennel id that is not in the house clears on migrate', dangling.dogKennel == null && dangling.dog?.name === 'Rocket');
  check('cleanHouseState keeps a real kennel and drops a dangling id', cleanHouseState(kenneled).dogKennel?.item === 'k1' && cleanHouseState({ ...followed, dogKennel: { item: 'nope' } }).dogKennel == null);
  check('cleanAction accepts dog/kennel and cleanFx accepts a leap', !!cleanAction({ type: 'dog/kennel', item: 'k1' }) && cleanAction({ type: 'dog/kennel', item: null })?.type === 'dog/kennel' && cleanAction({ type: 'dog/kennel', item: 'bad id' }) === null && cleanFx({ k: 'leap' })?.k === 'leap');
  const keptByOld = oldClientMigrate(JSON.parse(JSON.stringify(kenneled)));
  check('an old client keeps kennel state it does not understand', keptByOld.dogKennel?.item === 'k1' && keptByOld.dog?.name === 'Rocket' && keptByOld.rooms.living.items.some((i: { id: string }) => i.id === 'k1'));

  const kennelMem = new Map<string, any>();
  const kvK: KV = {
    get: async k => kennelMem.has(k) ? JSON.parse(JSON.stringify(kennelMem.get(k))) : undefined,
    put: async (k, v) => { kennelMem.set(k, JSON.parse(JSON.stringify(v))); },
    delete: async k => { kennelMem.delete(k); },
  };
  const hoodK = new Neighborhood(kvK, { flushMs: 5 });
  await hoodK.init('KENNEL1');
  const owner = mk(), pal = mk();
  await hoodK.onConnect(owner);
  await hoodK.onMessage(owner, JSON.stringify({ t: 'join', nickname: NICKNAMES[4], look, v: 4, pet: 1 }));
  const khid = [...hoodK.houses.keys()][0];
  await hoodK.onConnect(pal);
  await hoodK.onMessage(pal, JSON.stringify({ t: 'join', nickname: NICKNAMES[5], look, v: 4 }));
  const sendK = (c: C, o: any) => { (c as any).budget = undefined; return hoodK.onMessage(c, JSON.stringify(o)); };
  await sendK(owner, { t: 'act', houseId: khid, cid: 1, action: { type: 'item/add', room: 'living', item: { id: 'keep-kennel', kind: 'kennel', x: 500, y: 500, flip: false, z: 1, scale: 1 } } });
  await sendK(owner, { t: 'act', houseId: khid, cid: 2, action: { type: 'dog/kennel', item: 'keep-kennel' } });
  const ownerSaw = owner.inbox.some(m => m.t === 'act' && m.action?.type === 'dog/kennel');
  const palSaw = pal.inbox.some(m => m.t === 'act' && m.action?.type === 'dog/kennel');
  check('a pet client receives dog/kennel and an old client does not', ownerSaw && !palSaw);
  await sendK(pal, { t: 'act', houseId: khid, cid: 3, action: { type: 'dog/kennel', item: null } });
  check('a visitor cannot kennel someone else\'s dog', pal.last('nack')?.reason === 'notyours');
  await sendK(pal, { t: 'act', houseId: khid, cid: 4, action: { type: 'room/wallpaper', room: 'living', color: '#112233' } });
  await hoodK.flush();
  const diskK = kennelMem.get('house:' + khid).state;
  check('an old client edit keeps the kennel on the server', diskK.dogKennel?.item === 'keep-kennel' && diskK.rooms.living.wallpaper === '#112233' && diskK.rooms.living.items.some((i: { id: string }) => i.id === 'keep-kennel') && diskK.dog == null);

  console.log(`${pass} passed`);
}
main();
