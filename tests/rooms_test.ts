// Nursery + backyard: missing rooms are filled without overwriting a stored room,
// edits to both rooms are accepted, and an old client's save cannot drop them.
import { readFileSync } from 'node:fs';
import { Neighborhood, type KV, type Conn } from '../server/core';
import { NICKNAMES, PROTOCOL, cleanAction, cleanFx, cleanHouseState, cleanLook, cleanLookPatch, cleanPresence } from '../src/shared/hood';
import { ensureRooms, initialState, migrate, reduce, ROOM_IDS, type GameState } from '../src/shared/state';
import { BATHROOM_ITEMS } from '../src/bathroom';
import { playGesture } from '../src/playmode';
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
const bathKinds = () => initialState().rooms.bathroom.items.map(i => i.kind);
const strip = (s: GameState): GameState => {
  const rooms = { ...s.rooms } as GameState['rooms'];
  delete (rooms as any).nursery; delete (rooms as any).backyard; delete (rooms as any).bathroom;
  return { ...s, rooms };
};

/** What client 27cfcac does with a house it does not recognise: keep every saved room, draw only the four it knows. */
function oldClientMigrate(saved: any) {
  const baseRooms = { living: { items: [] }, bedroom: { items: [] }, kitchen: { items: [] }, salon: { items: [] } };
  return { ...saved, rooms: { ...baseRooms, ...saved.rooms } };
}

/** What fbd04db and avatar-v2 do: keep an unknown room object, and walk a kid out of a room that has no tab. */
function fbd04dbLoad(saved: any) {
  const tab = ['living', 'bedroom', 'kitchen', 'salon', 'nursery'];
  const known = [...tab, 'backyard'];
  const current = saved.currentRoom as string;
  const onTab = tab.includes(current);
  const characters = (saved.characters ?? []).map((c: any) => {
    const room = c.room as string;
    if (!known.includes(room) || (!onTab && room === current)) return { ...c, room: 'living' };
    return c;
  });
  return { ...saved, rooms: { ...saved.rooms }, currentRoom: onTab ? current : 'living', characters };
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
  check('loading an old stored house fills the nursery in memory', mem.rooms.nursery.items.map(i => i.kind).join(',') === starterKinds().join(',') && mem.rooms.backyard.items.length === 0 && mem.rooms.bathroom.items.map(i => i.kind).join(',') === bathKinds().join(',') && mem.rooms.living.items.some(i => i.id === 'from-disk'));
  check('that fill-in does not write the house back yet', !diskRooms.includes('nursery') && !diskRooms.includes('backyard') && !diskRooms.includes('bathroom') && puts.slice(putsBefore).every(k => k !== hid && k !== 'house:' + hid));

  const c2 = mk();
  await hood2.onConnect(c2);
  await hood2.onMessage(c2, JSON.stringify({ t: 'hello', token, v: 4 }));
  const msg = (o: any) => { (c2 as any).budget = undefined; return hood2.onMessage(c2, JSON.stringify(o)); };
  await msg({ t: 'act', houseId: hid, cid: 1, action: { type: 'room/wallpaper', room: 'living', color: '#aabbcc' } });
  await hood2.flush();
  const after = store.get('house:' + hid).state;
  check('a living-room edit persists the filled nursery and the original items', after.rooms.living.wallpaper === '#aabbcc' && after.rooms.living.items.some((i: { id: string }) => i.id === 'from-disk') && after.rooms.nursery.items.map((i: { kind: string }) => i.kind).join(',') === starterKinds().join(',') && after.rooms.bathroom.items.map((i: { kind: string }) => i.kind).join(',') === bathKinds().join(','));

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
  check('a backyard save opens the living room and brings the kid', yardKid.currentRoom === 'living' && yardKid.characters[0].room === 'living');
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
  const codeNames = [...(readFileSync(new URL('../src/items.ts', import.meta.url), 'utf8') + readFileSync(new URL('../src/nursery.ts', import.meta.url), 'utf8') + readFileSync(new URL('../src/bathroom.ts', import.meta.url), 'utf8') + readFileSync(new URL('../src/eggs.ts', import.meta.url), 'utf8')).matchAll(/name:\s*'([^']+)'/g)].map(m => m[1]);
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

  check('protocol stays 4 and a fresh house is still version 3', PROTOCOL === 4 && fresh.version === 3 && bathKinds().join(',') === 'puddle-mat,clawfoot-tub,mirror-vanity,towel-ladder');
  const noBath = initialState();
  const livingBefore = JSON.stringify(noBath.rooms.living);
  delete (noBath.rooms as any).bathroom;
  const filled = ensureRooms(noBath);
  const filled2 = ensureRooms(JSON.parse(JSON.stringify(noBath)));
  check('a house with the bathroom key deleted gains the four starter kinds', filled.rooms.bathroom.items.map(i => i.kind).join(',') === bathKinds().join(',') && JSON.stringify(filled.rooms.living) === livingBefore);
  filled.rooms.bathroom.items.push({ id: 'extra-bath', kind: 'sunny-ducky', x: 1, y: 1, flip: false, z: 9, scale: 1 });
  check('two bathroom fill-ins do not share objects', filled2.rooms.bathroom.items.length === 4 && !filled2.rooms.bathroom.items.some(i => i.id === 'extra-bath'));
  const customBath = initialState();
  customBath.rooms.bathroom = { ...customBath.rooms.bathroom, items: [{ id: 'my-duck', kind: 'sunny-ducky', x: 40, y: 500, flip: false, z: 1, scale: 1 }] };
  delete (customBath.rooms as any).backyard;
  const keptBath = ensureRooms(customBath);
  check('a custom bathroom is not replaced and a missing backyard is still filled', keptBath.rooms.bathroom.items.length === 1 && keptBath.rooms.bathroom.items[0].id === 'my-duck' && keptBath.rooms.backyard.items.length === 0);
  const emptyBath = initialState();
  emptyBath.rooms.bathroom.items = [];
  check('an emptied bathroom stays empty', ensureRooms(emptyBath) === emptyBath && emptyBath.rooms.bathroom.items.length === 0);
  const fromV3 = initialState();
  delete (fromV3.rooms as any).bathroom;
  const migratedBath = migrate(fromV3);
  check('migrate of a version-3 save with no bathroom leaves version at 3', migratedBath.version === 3 && migratedBath.rooms.bathroom.items.map(i => i.kind).join(',') === bathKinds().join(',') && migratedBath.rooms.living.items.length === initialState().rooms.living.items.length);
  const cleanedBath = cleanHouseState(fromV3);
  check('cleanHouseState adds the starter bathroom', cleanedBath.rooms.bathroom.items.map(i => i.kind).join(',') === bathKinds().join(',') && cleanedBath.rooms.nursery.items.length === 4);
  const cleanedCustomBath = cleanHouseState(customBath);
  check('cleanHouseState keeps a custom bathroom', cleanedCustomBath.rooms.bathroom.items.length === 1 && cleanedCustomBath.rooms.bathroom.items[0].id === 'my-duck');
  const bathItem = { id: 'b1', kind: 'clawfoot-tub', x: 200, y: 480, flip: false, z: 1, scale: 1 };
  check('cleanAction and cleanPresence accept bathroom and still reject attic', !!cleanAction({ type: 'item/add', room: 'bathroom', item: bathItem }) && !!cleanPresence({ where: 'house', houseId: 'h1', room: 'bathroom', x: 10, y: 20, flip: false }, () => true) && cleanAction({ type: 'item/add', room: 'attic', item: bathItem }) === null && !cleanPresence({ where: 'house', houseId: 'h1', room: 'attic', x: 10, y: 20, flip: false }, () => true));

  const carried = ensureRooms(JSON.parse(JSON.stringify(fromV3)));
  const oldRound = oldClientMigrate(JSON.parse(JSON.stringify(carried)));
  const oldBack = cleanHouseState(oldRound);
  check('a 27cfcac load keeps the bathroom and bringing it back does too', oldRound.rooms.bathroom.items.map((i: { kind: string }) => i.kind).join(',') === bathKinds().join(',') && oldBack.rooms.bathroom.items.map((i: { kind: string }) => i.kind).join(',') === bathKinds().join(','));
  const standing = { ...initialState(), currentRoom: 'bathroom' as const, characters: [{ ...initialState().characters[0], room: 'bathroom' as const }] };
  const fbd = fbd04dbLoad(JSON.parse(JSON.stringify(standing)));
  const fbdEdit = { ...fbd, rooms: { ...fbd.rooms, living: { ...fbd.rooms.living, wallpaper: '#112233' } } };
  check('an fbd04db load keeps the bathroom items and opens the living room', fbd.currentRoom === 'living' && fbd.characters[0].room === 'living' && fbd.rooms.bathroom.items.map((i: { kind: string }) => i.kind).join(',') === bathKinds().join(',') && fbdEdit.rooms.bathroom.items.length === 4 && fbdEdit.rooms.living.wallpaper === '#112233');
  const stayedBath = migrate({ ...initialState(), currentRoom: 'bathroom' });
  check('a new client standing in the bathroom is not moved', stayedBath.currentRoom === 'bathroom');

  const bathMem = new Map<string, any>();
  const bathPuts: string[] = [];
  const kvB: KV = {
    get: async k => bathMem.has(k) ? JSON.parse(JSON.stringify(bathMem.get(k))) : undefined,
    put: async (k, v) => { bathPuts.push(k); bathMem.set(k, JSON.parse(JSON.stringify(v))); },
    delete: async k => { bathMem.delete(k); },
  };
  const hoodB = new Neighborhood(kvB, { flushMs: 5 });
  await hoodB.init('BATHROOM');
  const ownerB = mk();
  await hoodB.onConnect(ownerB);
  await hoodB.onMessage(ownerB, JSON.stringify({ t: 'join', nickname: NICKNAMES[2], look, v: 4 }));
  const bhid = [...hoodB.houses.keys()][0];
  const btoken = ownerB.last('joined').token;
  await hoodB.flush();
  const diskB = bathMem.get('house:' + bhid);
  delete diskB.state.rooms.bathroom;
  bathMem.set('house:' + bhid, JSON.parse(JSON.stringify(diskB)));
  const putsB = bathPuts.length;
  const hoodB2 = new Neighborhood(kvB, { flushMs: 5 });
  await hoodB2.load();
  const memB = hoodB2.houses.get(bhid)!.state;
  const diskKeys = Object.keys(bathMem.get('house:' + bhid).state.rooms);
  check('loading an old stored house fills the bathroom in memory only', memB.rooms.bathroom.items.map(i => i.kind).join(',') === bathKinds().join(',') && !diskKeys.includes('bathroom') && bathPuts.slice(putsB).every(k => k !== 'house:' + bhid));
  const newClient = mk(), oldClient = mk();
  await hoodB2.onConnect(newClient);
  await hoodB2.onMessage(newClient, JSON.stringify({ t: 'hello', token: btoken, v: 4 }));
  await hoodB2.onConnect(oldClient);
  await hoodB2.onMessage(oldClient, JSON.stringify({ t: 'join', nickname: NICKNAMES[3], look, v: 4 }));
  const actB = (c: C, o: any) => { (c as any).budget = undefined; return hoodB2.onMessage(c, JSON.stringify(o)); };
  await actB(oldClient, { t: 'act', houseId: bhid, cid: 1, action: { type: 'room/wallpaper', room: 'living', color: '#445566' } });
  await hoodB2.flush();
  const afterOld = bathMem.get('house:' + bhid).state;
  check('an old client living-room edit does not drop the bathroom', afterOld.rooms.living.wallpaper === '#445566' && afterOld.rooms.bathroom.items.map((i: { kind: string }) => i.kind).join(',') === bathKinds().join(','));
  await actB(newClient, { t: 'act', houseId: bhid, cid: 2, action: { type: 'item/add', room: 'bathroom', item: { id: 'bath-edit', kind: 'sunny-ducky', x: 300, y: 500, flip: false, z: 1, scale: 1 } } });
  await actB(newClient, { t: 'act', houseId: bhid, cid: 3, action: { type: 'item/add', room: 'attic', item: { id: 'nope', kind: 'crib', x: 1, y: 1, flip: false, z: 1, scale: 1 } } });
  await hoodB2.flush();
  const refusedB = bathMem.get('house:' + bhid).state;
  check('a bathroom edit sticks and an attic edit is nacked', refusedB.rooms.bathroom.items.some((i: { id: string }) => i.id === 'bath-edit') && !refusedB.rooms.bathroom.items.some((i: { id: string }) => i.id === 'nope') && newClient.last('nack')?.reason === 'invalid');
  const oldView = fbd04dbLoad(JSON.parse(JSON.stringify({ ...refusedB, currentRoom: 'bathroom', characters: [{ ...refusedB.characters[0], room: 'bathroom' }] })));
  const newView = reduce(refusedB, { type: 'room/wallpaper', room: 'bathroom', color: '#d7f6f8' });
  check('old and new clients share the street without dropping the bathroom', oldView.currentRoom === 'living' && oldView.rooms.bathroom.items.some((i: { id: string }) => i.id === 'bath-edit') && newView.rooms.bathroom.wallpaper === '#d7f6f8' && newView.rooms.living.wallpaper === '#445566');

  const names = BATHROOM_ITEMS.map(i => i.name);
  const kinds = BATHROOM_ITEMS.map(i => i.kind);
  check('the bathroom shelf has 30 unique original names', names.length === 30 && new Set(names).size === 30 && new Set(kinds).size === 30);
  const wall = new Set(['wall-towel-bar', 'bubble-mobile', 'porthole-mirror', 'robe-hooks', 'hanging-eucalyptus']);
  const artBad = BATHROOM_ITEMS.filter(i => {
    const svg = i.svg;
    if (/feGaussianBlur|feDropShadow|filter=|color-mix|backdrop-filter/.test(svg)) return true;
    if (svg.length > 3200) return true;
    if (!svg.includes('#5a3d5c')) return true;
    const rugOrWall = i.kind === 'puddle-mat' || wall.has(i.kind);
    const shadows = (svg.match(/<ellipse[^>]*opacity="\.08"/g) ?? []).length;
    if (rugOrWall && shadows !== 0) return true;
    if (!rugOrWall && shadows < 1) return true;
    return false;
  });
  check('bathroom art uses the v2 shadow and no blur', artBad.length === 0, artBad.map(i => i.kind).join(','));
  check('bathroom gestures open the mirrors and wiggle the tub', playGesture('mirror-vanity') === 'open' && playGesture('porthole-mirror') === 'open' && playGesture('clawfoot-tub') === 'wiggle' && playGesture('rain-shower') === 'wiggle' && playGesture('little-toilet') === 'wiggle' && playGesture('sink-step') === 'wiggle' && playGesture('tub') === 'wiggle');
  check('bathroom is a known room and backyard stays tab-less', ROOM_IDS.includes('bathroom') && ROOM_IDS.includes('backyard'));

  console.log(`${pass} passed`);
}
main();
