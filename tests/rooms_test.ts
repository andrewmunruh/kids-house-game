// Nursery + backyard: missing rooms are filled without overwriting a stored room,
// edits to both rooms are accepted, and an old client's save cannot drop them.
import { readFileSync } from 'node:fs';
import { Neighborhood, type KV, type Conn } from '../server/core';
import { NICKNAMES, PROTOCOL, cleanAction, cleanFx, cleanHouseState, cleanLook, cleanLookPatch, cleanPresence } from '../src/shared/hood';
import { ensureRooms, initialState, migrate, reduce, type GameState } from '../src/shared/state';
import { patchFromLook2, sanitizeLook2 } from '../src/shared/avatar';

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
  check('presence accepts the yard', !!cleanPresence({ where: 'house', houseId: 'h1', room: 'backyard', x: 990, y: 530, flip: false }, () => true));
  const packed = Array.from({ length: 80 }, (_, i) => ({ id: 'cap-' + i, kind: 'plant', x: 100, y: 400, flip: false, z: 1, scale: 1 }));
  const capped = reduce({ ...initialState(), rooms: { ...initialState().rooms, backyard: { ...initialState().rooms.backyard, items: packed } } }, { type: 'item/add', room: 'backyard', item: { id: 'too-many', kind: 'yard-swing', x: 1160, y: 548, flip: false, z: 1, scale: 1 } });
  check('the 80-item cap still rejects the 81st', capped.rooms.backyard.items.length === 80 && !capped.rooms.backyard.items.some(i => i.id === 'too-many'));

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

  const stamped = { ...initialState(), mailbox: { letters: [{ id: 'mkeepmail1', from: 'Quinn', fromPid: 'pabc', text: 'Come play', color: 1, sticker: 2, at: Date.now() }] } };
  const mailRound = oldClientMigrate(JSON.parse(JSON.stringify(stamped)));
  check('an old client keeps mailbox state it does not understand', mailRound.mailbox?.letters?.[0]?.text === 'Come play' && mailRound.mailbox.letters[0].from === 'Quinn');
  const painted = reduce(stamped, { type: 'room/wallpaper', room: 'living', color: '#abcdef' });
  check('a wallpaper edit keeps the mailbox', painted.rooms.living.wallpaper === '#abcdef' && painted.mailbox?.letters[0].text === 'Come play');
  check('cleanHouseState keeps a real mailbox and drops a bad one', cleanHouseState(stamped).mailbox?.letters[0].text === 'Come play' && cleanHouseState({ ...stamped, mailbox: { letters: [{ id: 'nope', text: 'x' }] } }).mailbox == null);
  check('an empty house has no mailbox key', !('mailbox' in initialState()));

  const futureKid = { ...initialState().characters[0], room: 'attic' as GameState['currentRoom'] };
  const future = migrate({ ...initialState(), currentRoom: 'attic', characters: [futureKid] });
  check('an unknown room opens the living room with the kid', future.currentRoom === 'living' && future.characters[0].room === 'living' && future.version === 3);
  const yardKid = migrate({ ...initialState(), currentRoom: 'backyard', characters: [{ ...initialState().characters[0], room: 'backyard' }] });
  check('a backyard save stays in the yard with the kid', yardKid.currentRoom === 'backyard' && yardKid.characters[0].room === 'backyard' && yardKid.version === 3);
  const yardSwing = { id: 'keep-swing', kind: 'yard-swing', x: 1200, y: 548, flip: false, z: 1, scale: 1 };
  const yardHouse = { ...initialState(), currentRoom: 'living' as const, rooms: { ...initialState().rooms, backyard: { ...initialState().rooms.backyard, items: [yardSwing] } } };
  const oldYard = oldClientMigrate(JSON.parse(JSON.stringify(yardHouse)));
  const yardBack = cleanHouseState(oldYard);
  const yardEdit = reduce(yardHouse, { type: 'room/wallpaper', room: 'living', color: '#abcdef' });
  check('an old client keeps yard items it does not draw', oldYard.rooms.backyard.items.length === 1 && oldYard.rooms.backyard.items[0].kind === 'yard-swing' && oldYard.rooms.backyard.items[0].id === 'keep-swing');
  check('bringing that house back still has the swing', yardBack.rooms.backyard.items.length === 1 && yardBack.rooms.backyard.items[0].id === 'keep-swing' && yardBack.version === 3);
  check('a living-room edit does not delete the yard', yardEdit.rooms.living.wallpaper === '#abcdef' && yardEdit.rooms.backyard.items[0].id === 'keep-swing' && yardEdit.rooms.nursery.items.length === 4);
  const stayed = migrate({ ...initialState(), currentRoom: 'nursery' });
  check('a known room is left alone', stayed.currentRoom === 'nursery' && stayed.characters[0].room === 'living');

  // Nursery shelf: pack items with no room used to default to "any" and leak in.
  // "any" may only be generic decor. Room-specific pieces keep the shelf they belong on.
  const manifest = JSON.parse(readFileSync(new URL('../assets/items/manifest.json', import.meta.url), 'utf8')) as { slug: string; name: string; room?: string; category?: string; tag?: string; type?: string; pack?: string }[];
  const patterns = JSON.parse(readFileSync(new URL('../assets/patterns/manifest.json', import.meta.url), 'utf8')) as { name: string; type?: string }[];
  const genericDecor = (e: { name?: string; category?: string; tag?: string }) => {
    const tag = String(e.tag || '').toLowerCase(), cat = String(e.category || '').toLowerCase(), name = String(e.name || '').toLowerCase();
    if (cat === 'plants' || tag === 'plant' || tag === 'plants') return true;
    if (['rug', 'lighting', 'light', 'lamp', 'curtain', 'curtains'].includes(tag)) return true;
    if (cat === 'furniture' && /shelf|bookshelf/.test(name)) return true;
    if (cat === 'decor' && /rug|lamp|light|plant|art|shelf|curtain|clock|cushion|wreath|lantern|board|book/.test(name)) return true;
    return false;
  };
  const packItems = manifest.filter(e => e.type !== 'wallpaper' && e.type !== 'floor');
  const nurseryShelf = packItems.filter(e => !e.room || e.room === 'any' || e.room === 'nursery');
  const leaked = nurseryShelf.filter(e => e.room !== 'nursery' && !genericDecor(e));
  check('nursery shelf is nursery items plus generic decor', leaked.length === 0 && nurseryShelf.length > 0, leaked.map(e => e.name).join(', '));
  const banned = ['Kitchen Counter', 'Mini Fridge', 'Bubble Bath', 'Fire Pit', 'Gaming Chair'];
  check('room-specific pack items stay off the nursery shelf', banned.every(n => !nurseryShelf.some(e => e.name === n)));
  check('those items still sit on the shelf where they belong',
    packItems.find(e => e.name === 'Kitchen Counter')?.room === 'kitchen'
    && packItems.find(e => e.name === 'Mini Fridge')?.room === 'kitchen'
    && packItems.find(e => e.name === 'Bubble Bath')?.room === 'bedroom'
    && packItems.find(e => e.name === 'Fire Pit')?.room === 'backyard'
    && packItems.find(e => e.name === 'Gaming Chair')?.room === 'bedroom'
    && packItems.find(e => e.slug === 'comfy-armchair')?.room === 'living'
    && packItems.find(e => e.slug === 'cc-light-vanity')?.room === 'salon');
  const codeNames = [...(readFileSync(new URL('../src/items.ts', import.meta.url), 'utf8') + readFileSync(new URL('../src/nursery.ts', import.meta.url), 'utf8') + readFileSync(new URL('../src/yard.ts', import.meta.url), 'utf8') + readFileSync(new URL('../src/eggs.ts', import.meta.url), 'utf8')).matchAll(/name:\s*'([^']+)'/g)].map(m => m[1]);
  const mapSrc = readFileSync(new URL('../src/map.ts', import.meta.url), 'utf8') + readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8');
  check('the yard is not a map place', !/data-go=["']backyard|mapYard|aria-label="Backyard"/.test(mapSrc) && /data-yard-go/.test(mapSrc));
  const swingArt = readFileSync(new URL('../src/yard.ts', import.meta.url), 'utf8');
  check('the swing is bigger than the kid and the cup can be held', /kind: 'yard-swing'[\s\S]{0,160}w: 280, h: 215/.test(swingArt) && /kind: 'lemonade-cup'[\s\S]{0,160}holdable: true/.test(swingArt));
  const display = [...packItems.map(e => e.name), ...patterns.map(e => e.name), ...codeNames];
  const seen = new Map<string, number>();
  for (const n of display) seen.set(n, (seen.get(n) ?? 0) + 1);
  const dup = [...seen.entries()].filter(([, n]) => n > 1).map(([name]) => name);
  check('item, wallpaper and floor names are unique', dup.length === 0 && display.includes('Jewelry Box') && display.includes('Mint Gingham Floor') && display.includes('Mint Checks'), dup.join(', '));

  const look2 = { v: 1 as const, hair: 'puffs' as const, hairC: '#2b1d16', skin: '#f1c27d', eyes: 'round' as const, eyeC: '#5a321c', freckles: false, blush: true, top: 'hoodie' as const, topC: '#c9a0dc', bottom: 'skirt' as const, bottomC: '#5aa9e6', dress: '' as const, dressC: '#ff7aa8', shoes: 'sneakers' as const, shoesC: '#ffffff', acc: ['bow' as const], accC: '#ffd166' };
  let styled = reduce(initialState(), { type: 'char/update', id: 'c1', patch: { ...patchFromLook2(look2), size: 'kid' } });
  check('look2 is optional and protocol stays 4', PROTOCOL === 4 && styled.version === 3 && styled.characters[0].look2?.hair === 'puffs' && styled.characters[0].hairStyle === 2);
  const dropped = sanitizeLook2({ v: 1, hair: 'nope', skin: '#ffe0c4', acc: 'bow' });
  check('a bad look2 field is dropped by itself', !!dropped && dropped.hair === undefined && dropped.skin === '#ffe0c4' && dropped.acc === undefined);
  const tooBig = cleanLook({ ...look, look2: { v: 1, hair: 'bob', pad: 'z'.repeat(500) } });
  check('an oversize look2 drops only itself', tooBig.shirt === look.shirt && tooBig.look2 === undefined);
  const legacyPatch = cleanAction({ type: 'char/update', id: 'c1', patch: { shirt: '#80ed99' } });
  styled = legacyPatch ? reduce(styled, legacyPatch) : styled;
  check('a legacy char update keeps look2', styled.characters[0].look2?.hair === 'puffs' && styled.characters[0].shirt === '#80ed99' && legacyPatch?.type === 'char/update' && !('look2' in legacyPatch.patch));
  const classicAct = cleanAction({ type: 'char/update', id: 'c1', patch: { look2: null } });
  const cleared = classicAct ? reduce(styled, classicAct) : styled;
  check('an explicit look2 clears the chibi look', classicAct?.type === 'char/update' && classicAct.patch.look2 === null && cleared.characters[0].look2 === undefined && cleared.characters[0].shirt === '#80ed99');
  styled = reduce(initialState(), { type: 'char/update', id: 'c1', patch: { ...patchFromLook2(look2), size: 'kid' } });
  styled = reduce(styled, { type: 'room/wallpaper', room: 'living', color: '#ccddee' });
  check('a room edit keeps look2', styled.characters[0].look2?.hair === 'puffs' && styled.rooms.living.wallpaper === '#ccddee');
  const flip = cleanLookPatch({ flip: true });
  styled = flip ? reduce(styled, { type: 'char/update', id: 'c1', patch: flip }) : styled;
  check('a flip keeps look2', styled.characters[0].flip === true && styled.characters[0].look2?.bottom === 'skirt');
  const saved = JSON.parse(JSON.stringify(styled));
  check('local and server loads match for look2', JSON.stringify(migrate(saved).characters[0].look2) === JSON.stringify(cleanHouseState(saved).characters[0].look2));
  const bare = initialState();
  check('a character without look2 is not rewritten', migrate(bare).characters[0].look2 === undefined && cleanHouseState(bare).characters[0].look2 === undefined);

  console.log(`${pass} passed`);
}
main();
