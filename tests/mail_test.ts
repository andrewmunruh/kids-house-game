// Mailbox: filter, cap, expiry, rate limit, author stamp, owner-only reading, old clients.
import { readFileSync } from 'node:fs';
import { Neighborhood, type KV, type Conn } from '../server/core';
import { FILTER_MSG, MAIL_FREE_DEFAULT, NICKNAMES, PROTOCOL, cleanFirstName, cleanHouseName, cleanMailText, cleanPetName, filterChat, filterMailbox, filterSay, mailIsFree } from '../src/shared/hood';
import { CATALOG_NAMES } from '../src/shared/catalog-names';
import { initialState, type Cat } from '../src/shared/state';
import { keepMailbox, stripUrls, MAIL_CAP, MAIL_MAX, MAIL_TTL_MS, type Letter } from '../src/shared/mail';
import { catAt } from '../src/pets';
import { dragAllowed, playGesture } from '../src/playmode';

const mem = new Map<string, any>();
const kv: KV = {
  get: async k => mem.has(k) ? JSON.parse(JSON.stringify(mem.get(k))) : undefined,
  put: async (k, v) => { mem.set(k, JSON.parse(JSON.stringify(v))); },
  delete: async k => { mem.delete(k); },
};
let pass = 0;
const check = (name: string, ok: boolean, extra = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + name, extra); if (ok) pass++; else process.exitCode = 1; };
type C = Conn & { inbox: any[]; last(t: string): any };
const mk = (): C => { const inbox: any[] = []; return { inbox, send(s: string) { inbox.push(JSON.parse(s)); }, close() {}, last(t: string) { return [...inbox].reverse().find(m => m.t === t); } } as any; };
const look = { skin: '#f1c27d', hair: '#3b2219', hairStyle: 0, shirt: '#ff7aa8', pants: '#5b8def', size: 'kid', acc: 0 };

const letter = (over: Partial<Letter> = {}): Letter => ({
  id: 'mabcde12', from: 'Quinn', fromPid: 'pseedkid1', text: 'Come play', color: 0, sticker: 0, at: Date.now(), ...over,
});

async function main() {
  check('protocol stays 4', PROTOCOL === 4);
  check('80 characters is a letter and 81 is too long', cleanMailText('a'.repeat(MAIL_MAX)).ok && cleanMailText('a'.repeat(MAIL_MAX + 1)).ok === false);
  check('a link is refused', cleanMailText('come see www.example.com').ok === false && (cleanMailText('come see www.example.com') as { reason?: string }).reason === 'link');
  check('an email is refused', cleanMailText('write me at a@b.com').ok === false);
  check('a mean word is refused', cleanMailText('you are stupid').ok === false);
  const roster = ['Ava', 'Chloe', 'Cada'];
  const blocked = [
    'roblox user Jane2016', 'Ava Smith', 'I go to Lincoln Elementary', 'meet me at the park at 3',
    'fivefivefive-oneoneone-twotwotwotwo', 'st00pid', 'fat', 'ugly', 'f*ck', 'f u c k',
  ];
  const alsoBlocked = [
    'minecraft please', 'snap me', 'insta friend', 'youtube channel', 'username coolkid',
    'Lincoln School', 'Lincoln Academy', 'Lincoln Middle', 'Lincoln High',
    'at the park', 'see you at 3', 'come at 3pm', 'hate you', 'shut up', 'dumb', 'loser', 'kill',
    'five five five one one', 'my tiktok', 'discord user',
    'add me on fortnite SparkleQueen', 'my house is on Maple street', 'kys', 'im 8 and live on Oak ave',
    'call me', 'text me', "my mom's phone is nine one two", 'f\u{1F338}i\u{1F338}v\u{1F338}e five five',
    '\uFF46\uFF49\uFF56\uFF45', '\u0456d\u0456ot', 'I play for the Tigers soccer team',
    "what's your address", 'whats ur last name',
  ];
  const allowed = [
    'Why is your cat in my bed?', 'Your house is so cute!', 'Want to play Slay?', 'Hi Chloe!', 'father', 'skill', 'someone', 'snapshot of the cat', 'so high',
    'see you at school', 'Come to my garden', 'come to my house', 'meet me at the treehouse', 'want to play at the ranch?',
    'I love your bedroom', 'my cat is so cute', 'Hi Reagan!',
    'best way to play', 'cool drive in my house', 'Text me back with a letter', 'Text me back in the game', 'my favorite number is seven',
    'Come see my Ring Light!',
    'you are silly', 'you dummy', 'meanie', 'so stinky', 'hello friend', 'please help', 'a pretty seashell', 'dummmmy', 'he will come play',
    'silly', 'dummy', 'stinky',
    'the lamp is pretty', 'the lake', 'the last one', 'the leaf', 'the llama', 'wheel', 'haha he laughed', "Rachel's House",
    'Rachel', 'Michelle', 'Chelsea', 'Ethel', 'Mitchell', 'hello', 'help', 'shell', 'heel', "he'll", "she'll", 'helicopter', 'Helen', 'gotohell', 'seashell',
    'seven', 'one two',
    ...CATALOG_NAMES.filter(n => n.length <= MAIL_MAX),
  ];
  const phraseBlocked = [
    'Text me back', 'cool drive', 'Cool Drive', 'Maple Drive cool drive in my house', 'best way to the park',
    'my favorite number is seven eight nine', 'one two three', 'call me with a letter', 'text me your phone',
    'Ring Light Smith', 'Emma Ring Light', 'Big Monitor street', 'Gaming Chair Lane 12', 'I live on Gaming Chair Lane',
    'fuck', 'nigger',
    'go to hell', 'go to hell!', 'go-to-hell', 'go.to.hell', 'you dumbass', 'dumb ass', 'dumb@ss', 'h3ll', 'he11', 'heeellll', 'hellll', 'h e l l', 'h.e.l.l', 'd.u.m.b.a.s.s', 'd u m b a s s', 'dumb-ass', 'you are a dumbass', 'duuumbass', 'h*ll', 'helllll', 'dvmbass', 'd*mbass', 'f*ck', 'kys',
  ];
  const rows: { text: string; want: string }[] = [
    ...blocked.map(text => ({ text, want: 'mail' })),
    ...alsoBlocked.map(text => ({ text, want: 'block' })),
    ...phraseBlocked.map(text => ({ text, want: 'block' })),
    ...allowed.map(text => ({ text, want: 'ok' })),
  ];
  console.log('MAIL TABLE');
  console.log('result\texpect\treason\ttext');
  const tableBad: string[] = [];
  for (const row of rows) {
    const f = cleanMailText(row.text, roster);
    const reason = f.ok ? 'ok' : (f as { reason?: string }).reason ?? '';
    const chat = filterChat(row.text, 80);
    let got = reason;
    if (row.want === 'mail') got = reason === 'mail' ? 'mail' : (f.ok ? 'ok' : 'not-mail:' + reason);
    else if (row.want === 'block') got = f.ok ? 'ok' : 'block';
    else got = f.ok ? 'ok' : reason;
    const passRow = got === row.want || (row.want === 'block' && !f.ok && !chat.ok);
    if (row.want === 'block' && !f.ok) got = 'block';
    if (!passRow) tableBad.push(row.text + ' -> ' + reason);
    console.log((passRow ? 'PASS' : 'FAIL') + '\t' + row.want + '\t' + reason + '\t' + row.text);
  }
  const blockedBad = blocked.filter(t => {
    const f = cleanMailText(t, roster);
    return f.ok || (f as { reason?: string }).reason !== 'mail';
  });
  const phraseBad = phraseBlocked.filter(t => cleanMailText(t, roster).ok);
  const alsoBad = alsoBlocked.filter(t => {
    const f = cleanMailText(t, roster);
    if (f.ok) return true;
    const chat = filterChat(t, 80);
    return chat.ok && (f as { reason?: string }).reason !== 'mail';
  });
  const allowedBad = allowed.filter(t => !cleanMailText(t, roster).ok);
  const named = new Set(CATALOG_NAMES);
  const manifest = JSON.parse(readFileSync('assets/items/manifest.json', 'utf8')) as { name?: string; type?: string }[];
  const expectNames = new Set<string>();
  for (const e of manifest) if (e?.name && e.type !== 'wallpaper' && e.type !== 'floor') expectNames.add(e.name);
  const grab = (file: string) => {
    for (const m of readFileSync(file, 'utf8').matchAll(/name:\s*(?:'([^']*)'|"([^"]*)")/g)) expectNames.add(m[1] ?? m[2]);
  };
  grab('src/items.ts'); grab('src/nursery.ts');
  for (const m of readFileSync('src/eggs.ts', 'utf8').matchAll(/item:\s*\{[^}]*name:\s*(?:'([^']*)'|"([^"]*)")/g)) expectNames.add(m[1] ?? m[2]);
  for (const kid of ['Cada', 'Sloane', 'Chloe', 'Quinn', 'Reagan']) expectNames.delete(kid);
  const missingNames = [...expectNames].filter(n => !named.has(n));
  check('every catalog and pack name is allow-listed', missingNames.length === 0 && CATALOG_NAMES.length > 100, missingNames.slice(0, 8).join(' | '));
  check('trickier letters are blocked without naming the rule', blockedBad.length === 0 && alsoBad.length === 0 && phraseBad.length === 0 && tableBad.length === 0 && FILTER_MSG.mail === 'Oops, try different words!' && !/roblox|school|stupid|fat/i.test(FILTER_MSG.mail), blockedBad.concat(alsoBad, phraseBad, tableBad).join(' | '));
  const explicit = ['go to hell', 'go to hell!', 'go-to-hell', 'go.to.hell', 'you dumbass', 'dumb ass', 'dumb@ss', 'h3ll', 'he11', 'heeellll', 'hellll', 'h e l l', 'h.e.l.l', 'd.u.m.b.a.s.s', 'd u m b a s s', 'dumb-ass', 'h*ll', 'dvmbass', 'd*mbass', 'duuumbass', 'f*ck', 'kys'];
  const mild = ['you are silly', 'you dummy', 'meanie', 'so stinky', 'silly', 'dummy', 'hello friend', 'please help', 'a pretty seashell', 'dummmmy'];
  const safe = ['the lamp is pretty', 'the lake', 'the last one', 'the leaf', 'the llama', 'wheel', 'haha he laughed', "Rachel's House", 'Rachel', 'Michelle', 'Chelsea', 'Ethel', 'Mitchell', 'hello', 'help', 'seashell', "he'll", "she'll", 'heel', 'gotohell'];
  const explicitBad = explicit.filter(t => filterSay(t, 80).ok || cleanMailText(t, roster).ok);
  const mildBad = mild.filter(t => !filterSay(t, 80).ok || !cleanMailText(t, roster).ok || !filterChat(t, 80).ok);
  const safeBad = safe.filter(t => !filterSay(t, 80).ok || !cleanMailText(t, roster).ok || !filterChat(t, 80).ok);
  const storedStill = ['the lamp is pretty', 'I like your wheel', 'Rachel says hi', 'haha he laughed', 'go to hell', 'you dumbass', 'f*ck', 'kys', 'h3ll', 'Ethel', 'Mitchell'];
  const storedBad = storedStill.filter(t => { const f = filterChat(t, 80); return !f.ok || f.text !== t; });
  check('explicit words are blocked in new chat and new mail', explicitBad.length === 0, explicitBad.join(' | '));
  check('mild teases stay allowed in chat and mail', mildBad.length === 0, mildBad.join(' | '));
  check('ordinary phrases and names stay allowed', safeBad.length === 0, safeBad.join(' | '));
  check('the stored-mail rule is unchanged', storedBad.length === 0, storedBad.join(' | '));
  const names = ['Rachel', 'Michelle', 'Chelsea', 'Ethel', 'Mitchell'];
  const nameBad = names.filter(n => cleanFirstName(n) !== n || cleanPetName(n) !== n || cleanHouseName(n) !== n || cleanHouseName(n + "'s House") !== n + "'s House");
  check('those names work for a kid, a pet, and a house', nameBad.length === 0, nameBad.join(' | '));
  const four = ['the lamp is pretty', 'I like your wheel', 'Rachel says hi', 'haha he laughed'];
  const fourLetters = four.map((text, i) => letter({ id: 'mkeep' + i + 'abcd', text, from: 'Rachel', fromPid: 'pkeepkid01' }));
  const reloadedBox = filterMailbox({ letters: fourLetters });
  check('a stored mailbox keeps those four letters exactly', JSON.stringify(reloadedBox?.letters) === JSON.stringify(fourLetters));
  check('ordinary letters still go through', allowedBad.length === 0, allowedBad.join(' | '));
  check('Ava Smith is blocked even when Ava is on the roster', cleanMailText('Ava Smith', ['Ava']).ok === false);
  check('five digits are still refused', cleanMailText('call 12345').ok === false);
  check('urls are stripped', stripUrls('hello') === 'hello' && stripUrls('see http://x.com now') !== 'see http://x.com now' && !stripUrls('see http://x.com now').includes('http'));
  const old = letter({ at: Date.now() - MAIL_TTL_MS - 86400000 });
  const fresh = Array.from({ length: MAIL_CAP + 1 }, (_, i) => letter({ id: 'm' + String(i).padStart(6, '0'), at: Date.now() - i * 1000 }));
  check('letters older than 30 days clear', keepMailbox({ letters: [old, letter()] })?.letters.length === 1);
  check('a mailbox keeps the newest 30', keepMailbox({ letters: fresh })?.letters.length === MAIL_CAP && keepMailbox({ letters: fresh })?.letters[0].id === 'm000001');
  const fat = { ...initialState(), mailbox: { letters: Array.from({ length: MAIL_CAP }, (_, i) => letter({ id: 'm' + String(i).padStart(8, 'a'), from: 'Marshmallow Moose', fromPid: 'p' + 'a'.repeat(16), text: 'x'.repeat(MAIL_MAX), color: 4, sticker: 5, read: true })) } };
  const maxItem = { id: 'item-0123456789abcdef', kind: 'pack:very-long-kind-name', x: 2400, y: 700, flip: true, z: 80, scale: 1 };
  for (const room of Object.values(fat.rooms)) room.items = Array.from({ length: 80 }, (_, i) => ({ ...maxItem, id: room.wallpaper.slice(1) + i }));
  const bytes = JSON.stringify(fat).length;
  console.log('worst-case house JSON bytes', bytes);
  check('a full mailbox stays under 400KB', bytes < 400_000, String(bytes));
  check('play mode does not drag furniture', dragAllowed('play') === false && dragAllowed('decorate') === true && playGesture('bed') === 'sit' && playGesture('kennel') === 'kennel' && playGesture('lamp') === 'lamp' && playGesture('fridge') === 'open' && playGesture('plant') === 'wiggle');

  const cat: Cat = { name: 'Mochi', coat: 0, room: 'living', x: 900 };
  const t0 = 1_700_000_000_000;
  check('a room with no bed matches itself', JSON.stringify(catAt(cat, t0, null)) === JSON.stringify(catAt(cat, t0, null, null)));
  check('a tower ignores the bed', JSON.stringify(catAt(cat, t0, { x: 800 })) === JSON.stringify(catAt(cat, t0, { x: 800 }, { x: 100 })));
  let settled = true, curled = false;
  for (let k = 0; k < 40; k++) {
    const now = (k * 18 + 17) * 1000;
    const plain = catAt(cat, now, null);
    const bed = catAt(cat, now, null, { x: 500 });
    if (plain.mood !== 'nap' && (plain.x !== bed.x || plain.mood !== bed.mood || bed.curl !== 0)) settled = false;
    if (bed.curl === 1 && bed.mood === 'nap' && Math.abs(bed.x - 500) < 1) curled = true;
  }
  check('the cat only curls up on a bed while napping', settled && curled);

  const hood = new Neighborhood(kv, { flushMs: 5 });
  const parentKey = await hood.init('MAILBOX1');
  let nickN = 0;
  const send = (c: C, o: any) => { (c as any).budget = undefined; return hood.onMessage(c, JSON.stringify(o)); };
  const join = async (mail = 1) => {
    const c = mk(); const nick = NICKNAMES[nickN++];
    await hood.onConnect(c);
    await hood.onMessage(c, JSON.stringify({ t: 'join', nickname: nick, look, v: PROTOCOL, ...(mail ? { mail: 1 } : {}) }));
    const pid = c.last('joined').pid as string;
    const hid = (c.last('welcome').houses as any[]).find(h => h.ownerId === pid).id as string;
    return { c, pid, nick, hid, token: c.last('joined').token as string };
  };

  const owner = await join(1);
  const pal = await join(1);
  const other = await join(1);
  await send(pal.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'Come play in the yard!', color: 2, sticker: 3, from: 'Hacker', fromPid: 'pHacker' });
  const got = owner.c.last('mailbox');
  const live = () => hood.houses.get(owner.hid)!.state;
  const disk0 = () => mem.get('house:' + owner.hid).state;
  check('the server stamps her name and ignores a spoofed one', got?.mailbox?.letters?.[0]?.from === pal.nick && got.mailbox.letters[0].fromPid === pal.pid && got.mailbox.letters[0].text === 'Come play in the yard!' && live().mailbox?.letters[0].from === pal.nick);
  check('the sender sees Delivered and not the words', pal.c.last('mailbox')?.mailbox?.letters?.[0]?.text === '' && pal.c.last('mailbox').mailbox.letters[0].read !== true);
  await send(pal.c, { t: 'mail', op: 'read', houseId: owner.hid, id: got.mailbox.letters[0].id });
  check('only the owner can read', pal.c.last('mailFail')?.reason === 'notyours' && live().mailbox?.letters[0].read !== true);
  await send(other.c, { t: 'mail', op: 'drop', houseId: owner.hid, id: got.mailbox.letters[0].id });
  check('only the owner can throw a letter away', other.c.last('mailFail')?.reason === 'notyours' && live().mailbox?.letters.length === 1);
  const again = mk();
  await hood.onConnect(again);
  await hood.onMessage(again, JSON.stringify({ t: 'hello', token: other.token, v: PROTOCOL, mail: 1 }));
  const hidden = (again.last('welcome').houses as any[]).find(h => h.id === owner.hid).state;
  check('someone else does not receive the letter', !('mailbox' in hidden));
  await send(owner.c, { t: 'mail', op: 'read', houseId: owner.hid, id: got.mailbox.letters[0].id });
  check('opening the letter marks it Read for the sender', owner.c.last('mailbox').mailbox.letters[0].read === true && pal.c.last('mailbox').mailbox.letters[0].read === true && pal.c.last('mailbox').mailbox.letters[0].text === '');
  await send(owner.c, { t: 'mail', op: 'drop', houseId: owner.hid, id: got.mailbox.letters[0].id });
  await hood.flush();
  check('throwing it away clears the mailbox', !disk0().mailbox && owner.c.last('mailbox').mailbox.letters.length === 0);

  await send(pal.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'come see www.example.com', color: 0, sticker: 0 });
  await send(pal.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'you are stupid', color: 0, sticker: 0 });
  await send(pal.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'a'.repeat(81), color: 0, sticker: 0 });
  check('the server refuses a link, a mean word, and a long letter', ['link', 'words', 'long'].every(r => pal.c.inbox.some(m => m.t === 'mailFail' && m.reason === r)) && !live().mailbox);

  const seeded = Array.from({ length: MAIL_CAP }, (_, i) => letter({ id: 'm' + String(i).padStart(6, '0') }));
  hood.houses.get(owner.hid)!.state = { ...hood.houses.get(owner.hid)!.state, mailbox: { letters: seeded } };
  const fullKid = await join(1);
  await send(fullKid.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'One more?', color: 0, sticker: 0 });
  check('the 31st letter is refused', fullKid.c.last('mailFail')?.reason === 'full' && live().mailbox?.letters.length === MAIL_CAP);

  hood.houses.get(owner.hid)!.state = { ...hood.houses.get(owner.hid)!.state, mailbox: { letters: [letter({ id: 'moldletter', at: Date.now() - 31 * 86400000 })] } };
  await send(fullKid.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'A new note', color: 1, sticker: 1 });
  await hood.flush();
  check('a 31-day-old letter clears when new mail arrives', live().mailbox?.letters.length === 1 && live().mailbox?.letters[0].text === 'A new note' && disk0().mailbox.letters[0].text === 'A new note');

  const speedy = await join(1);
  for (let i = 0; i < 5; i++) {
    await send(speedy.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'Note ' + i, color: 0, sticker: i % 6 });
    const id = (live().mailbox?.letters ?? []).slice(-1)[0]?.id;
    if (id) await send(owner.c, { t: 'mail', op: 'read', houseId: owner.hid, id });
  }
  await send(speedy.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'Too many', color: 0, sticker: 0 });
  check('the sixth letter in a minute waits', speedy.c.last('mailFail')?.reason === 'slow' && (live().mailbox?.letters ?? []).filter(l => l.text.startsWith('Note ')).length === 5 && !(live().mailbox?.letters ?? []).some(l => l.text === 'Too many'));

  const oldie = await join(0);
  const writer = await join(1);
  await send(writer.c, { t: 'mail', op: 'send', houseId: oldie.hid, text: 'Hello from the street', color: 0, sticker: 1 });
  check('an old client is not sent the mailbox', !oldie.c.inbox.some(m => m.t === 'mailbox'));
  const back = mk();
  await hood.onConnect(back);
  await hood.onMessage(back, JSON.stringify({ t: 'hello', token: oldie.token, v: 4 }));
  const oldView = (back.last('welcome').houses as any[]).find(h => h.id === oldie.hid).state;
  check('an old client welcome leaves the mailbox out', !('mailbox' in oldView));
  await send(back, { t: 'act', houseId: oldie.hid, cid: 9, action: { type: 'room/wallpaper', room: 'living', color: '#445566' } });
  await hood.flush();
  const diskOld = mem.get('house:' + oldie.hid).state;
  check('an old client edit keeps the mail', diskOld.mailbox.letters[0].text === 'Hello from the street' && diskOld.rooms.living.wallpaper === '#445566');

  const sneaky = mk();
  await hood.onConnect(sneaky);
  const brought = { ...initialState(), mailbox: { letters: [letter({ id: 'minjected1', text: 'I planted this', from: 'Hacker' })] } };
  await hood.onMessage(sneaky, JSON.stringify({ t: 'join', nickname: NICKNAMES[nickN++], look, v: PROTOCOL, mail: 1, house: brought }));
  const sneakyId = (sneaky.last('welcome').houses as any[]).find(h => h.ownerId === sneaky.last('joined').pid).id;
  await hood.flush();
  check('joining cannot import letters', !mem.get('house:' + sneakyId).state.mailbox);

  await send(owner.c, { t: 'lock', houseId: owner.hid, locked: true });
  const locked = await join(1);
  await send(locked.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'Even if it is locked', color: 0, sticker: 0 });
  check('a locked house can still get a letter', locked.c.last('mailbox')?.mailbox?.letters?.some((l: Letter) => l.text === ''));

  const grown = mk();
  await hood.onConnect(grown);
  await send(grown, { t: 'parent', key: 'nope', op: 'freeChat', on: false });
  check('a wrong grown-up key does not change the street', grown.last('error')?.code === 'badkey' && hood.meta!.settings.freeChat === true);
  await send(grown, { t: 'parent', key: parentKey, op: 'freeChat', on: false });
  check('the grown-up turns free typing off', grown.last('parentInfo')?.settings.freeChat === false && hood.meta!.settings.freeChat === false);
  check('an unset freeMail is left out and letters follow the chat switch', !('freeMail' in hood.meta!.settings) && !JSON.stringify(hood.meta!.settings).includes('freeMail') && mailIsFree(hood.meta!.settings) === false && MAIL_FREE_DEFAULT === 'follow freeChat' && mailIsFree({ freeChat: true }) === true);
  const before = live().mailbox?.letters.length ?? 0;
  await send(locked.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'Come play today!', color: 1, sticker: 2 });
  await send(locked.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'Hi! Bye!', color: 0, sticker: 0 });
  await send(locked.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'hi!', color: 0, sticker: 0 });
  await send(locked.c, { t: 'mail', op: 'send', houseId: owner.hid, text: ' Hi!', color: 0, sticker: 0 });
  check('free text is refused when presets are on, even from a hand-crafted message', locked.c.last('mailFail')?.reason === 'presetsOnly' && (live().mailbox?.letters.length ?? 0) === before && locked.c.inbox.filter(m => m.t === 'mailFail' && m.reason === 'presetsOnly').length === 4);
  await send(locked.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'Hi!', color: 1, sticker: 2, from: 'Hacker', fromPid: 'pHacker' });
  const preset = (owner.c.last('mailbox')?.mailbox?.letters ?? []).slice(-1)[0];
  check('a preset phrase and a sticker are delivered with her name', preset?.text === 'Hi!' && preset?.sticker === 2 && preset?.color === 1 && preset?.from === locked.nick && preset?.fromPid === locked.pid);
  await send(locked.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'Bye!', color: 0, sticker: 4 });
  await hood.flush();
  await send(grown, { t: 'parent', key: parentKey, op: 'info' });
  const listed = grown.last('parentInfo')?.mail as { houseId: string; letters: { id: string; from: string; text: string; at: number }[] }[];
  const ownerBox = listed?.find(b => b.houseId === owner.hid);
  const hi = ownerBox?.letters?.find(l => l.text === 'Hi!');
  const bye = ownerBox?.letters?.find(l => l.text === 'Bye!');
  const hiKeys = hi ? Object.keys(hi).sort().join(',') : '';
  check('the grown-up view lists the name, the words, and the date', !!hi && hi.from === locked.nick && typeof hi.at === 'number' && hi.at > 0 && !!bye && hiKeys === 'at,from,id,text');
  await send(grown, { t: 'parent', key: 'wrong-key', op: 'mailClear', houseId: owner.hid, id: bye!.id });
  await send(grown, { t: 'parent', key: parentKey, op: 'mailWipe', houseId: owner.hid });
  check('only an allow-listed grown-up message can clear mail', grown.last('error')?.code === 'badkey' && live().mailbox?.letters.some(l => l.text === 'Bye!'));
  await send(grown, { t: 'parent', key: parentKey, op: 'mailClear', houseId: owner.hid, id: bye!.id });
  await hood.flush();
  const hood2 = new Neighborhood(kv, { flushMs: 5 });
  await hood2.load();
  const reloaded = hood2.houses.get(owner.hid)!.state.mailbox!.letters;
  check('clearing one letter stays gone after a reload', reloaded.some(l => l.text === 'Hi!') && !reloaded.some(l => l.text === 'Bye!'));
  const oldAgain = mk();
  await hood.onConnect(oldAgain);
  await hood.onMessage(oldAgain, JSON.stringify({ t: 'hello', token: owner.token, v: PROTOCOL }));
  await send(oldAgain, { t: 'act', houseId: owner.hid, cid: 11, action: { type: 'room/wallpaper', room: 'kitchen', color: '#112233' } });
  await hood.flush();
  const kept = mem.get('house:' + owner.hid).state;
  check('an old client edit still keeps the mailbox', kept.mailbox.letters.some((l: Letter) => l.text === 'Hi!') && !kept.mailbox.letters.some((l: Letter) => l.text === 'Bye!') && kept.rooms.kitchen.wallpaper === '#112233' && !('mailbox' in (oldAgain.last('welcome').houses as any[]).find((h: any) => h.id === owner.hid).state));
  await send(grown, { t: 'parent', key: parentKey, op: 'mailClearAll' });
  await hood.flush();
  const hood3 = new Neighborhood(kv, { flushMs: 5 });
  await hood3.load();
  const cleared = grown.last('parentInfo')?.mail as { letters: unknown[] }[];
  check('the grown-up can clear every mailbox', !hood3.houses.get(owner.hid)!.state.mailbox && !hood3.houses.get(oldie.hid)!.state.mailbox && Array.isArray(cleared) && cleared.every(b => b.letters.length === 0));

  await send(grown, { t: 'parent', key: parentKey, op: 'freeChat', on: true });
  await send(grown, { t: 'parent', key: parentKey, op: 'rosterAdd', name: 'Ava' });
  const tricky = ['roblox user Jane2016', 'Ava Smith', 'I go to Lincoln Elementary', 'meet me at the park at 3', 'fivefivefive-oneoneone-twotwotwotwo', 'st00pid', 'fat', 'ugly', 'f*ck', 'f u c k'];
  for (const text of tricky) await send(locked.c, { t: 'mail', op: 'send', houseId: owner.hid, text, color: 0, sticker: 0 });
  const mailFails = locked.c.inbox.filter(m => m.t === 'mailFail' && m.reason === 'mail');
  check('the server blocks trickier letters with a generic reason', mailFails.length === tricky.length && !live().mailbox, String(mailFails.length));
  const passTexts = ['Why is your cat in my bed?', 'Your house is so cute!', 'Want to play Slay?', 'Hi Chloe!'];
  const passBox = () => hood.houses.get(fullKid.hid)!.state.mailbox?.letters ?? [];
  for (const text of passTexts) {
    await send(sneaky, { t: 'mail', op: 'send', houseId: fullKid.hid, text, color: 1, sticker: 0 });
    const id = passBox().slice(-1)[0]?.id;
    if (id) await send(fullKid.c, { t: 'mail', op: 'read', houseId: fullKid.hid, id });
  }
  const gotPass = passBox().map(l => l.text);
  check('ordinary letters are delivered', passTexts.every(t => gotPass.includes(t)), gotPass.join('|'));

  const capBox = () => hood.houses.get(speedy.hid)!.state.mailbox?.letters ?? [];
  for (let i = 0; i < 3; i++) await send(pal.c, { t: 'mail', op: 'send', houseId: speedy.hid, text: 'Hi!', color: 0, sticker: i % 6 });
  await send(pal.c, { t: 'mail', op: 'send', houseId: speedy.hid, text: 'Hi!', color: 0, sticker: 0 });
  check('a fourth unread letter waits', pal.c.last('mailFail')?.reason === 'unread' && capBox().filter(l => l.fromPid === pal.pid && !l.read).length === 3);
  await send(speedy.c, { t: 'mail', op: 'read', houseId: speedy.hid, id: capBox().find(l => l.fromPid === pal.pid)!.id });
  await send(pal.c, { t: 'mail', op: 'send', houseId: speedy.hid, text: 'So cute!', color: 1, sticker: 1 });
  check('reading a letter lets her send again', capBox().some(l => l.text === 'So cute!'), capBox().map(l => l.text).join('|') + ' fail=' + pal.c.last('mailFail')?.reason);

  await send(writer.c, { t: 'mail', op: 'send', houseId: fullKid.hid, text: 'Look at this!', color: 0, sticker: 0 });
  await send(writer.c, { t: 'mail', op: 'send', houseId: speedy.hid, text: 'Nice!', color: 0, sticker: 1 });
  check('her letter is in the other mailbox', capBox().some(l => l.fromPid === writer.pid && l.text === 'Nice!'));
  await send(grown, { t: 'parent', key: parentKey, op: 'remove', pid: writer.pid });
  await hood.flush();
  const hood4 = new Neighborhood(kv, { flushMs: 5 });
  await hood4.load();
  const stillFull = hood4.houses.get(fullKid.hid)!.state.mailbox?.letters ?? [];
  const stillSpeedy = hood4.houses.get(speedy.hid)!.state.mailbox?.letters ?? [];
  check('removing a kid deletes her letters from every mailbox', !hood4.houses.has(writer.hid) && !stillFull.some(l => l.fromPid === writer.pid) && !stillSpeedy.some(l => l.fromPid === writer.pid) && stillFull.some(l => l.text === 'Hi Chloe!') && stillSpeedy.some(l => l.text === 'So cute!'));

  await send(grown, { t: 'parent', key: parentKey, op: 'freeChat', on: false });
  check('letters still follow freeChat while freeMail is absent', hood.meta!.settings.freeChat === false && !('freeMail' in hood.meta!.settings) && mailIsFree(hood.meta!.settings) === false);
  await send(fullKid.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'Come play today!', color: 0, sticker: 0 });
  await send(fullKid.c, { t: 'say', b: { kind: 'text', v: 'Hello there' } });
  check('preset letters and preset chat while the switch is absent', fullKid.c.last('mailFail')?.reason === 'presetsOnly' && fullKid.c.last('sayFail')?.reason === 'presetsOnly');
  await send(grown, { t: 'parent', key: 'nope', op: 'freeMail', on: true });
  await send(grown, { t: 'parent', key: parentKey, op: 'freeMail', on: true });
  check('freeMail can allow typed letters while chat stays on presets', grown.last('error')?.code === 'badkey' && hood.meta!.settings.freeMail === true && hood.meta!.settings.freeChat === false && mailIsFree(hood.meta!.settings) === true && fullKid.c.last('settings')?.settings?.freeMail === true);
  await send(fullKid.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'Your house is so cute!', color: 0, sticker: 0 });
  await send(fullKid.c, { t: 'say', b: { kind: 'text', v: 'Hello there' } });
  check('a typed letter arrives and chat does not', !!live().mailbox?.letters.some(l => l.text === 'Your house is so cute!') && fullKid.c.last('sayFail')?.reason === 'presetsOnly');
  await send(grown, { t: 'parent', key: parentKey, op: 'freeChat', on: true });
  await send(grown, { t: 'parent', key: parentKey, op: 'freeMail', on: false });
  check('freeMail can force preset letters while chat stays free', hood.meta!.settings.freeChat === true && hood.meta!.settings.freeMail === false && mailIsFree(hood.meta!.settings) === false && JSON.parse(JSON.stringify(hood.meta!.settings)).freeMail === false);
  await send(fullKid.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'A typed note', color: 0, sticker: 0 });
  await send(fullKid.c, { t: 'say', b: { kind: 'text', v: 'Hello there' } });
  check('typed letters wait and chat still goes out', fullKid.c.last('mailFail')?.reason === 'presetsOnly' && !live().mailbox?.letters.some(l => l.text === 'A typed note') && fullKid.c.last('sayFail')?.reason === 'nowhere');

  const shield = ['Ring Light Smith', 'Emma Ring Light', 'Big Monitor street', 'Gaming Chair Lane 12', 'I live on Gaming Chair Lane'];
  const keptCute = () => live().mailbox?.letters.some(l => l.text === 'Your house is so cute!') ?? false;
  await send(grown, { t: 'parent', key: parentKey, op: 'freeMail', on: true });
  const onAt = fullKid.c.inbox.length;
  for (const text of shield) await send(fullKid.c, { t: 'mail', op: 'send', houseId: owner.hid, text, color: 0, sticker: 0 });
  await send(fullKid.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'Come see my Ring Light!', color: 0, sticker: 0 });
  const onFails = fullKid.c.inbox.slice(onAt).filter(m => m.t === 'mailFail');
  const onMail = onFails.filter(m => m.reason === 'mail').length;
  check('item names do not shield a surname or a street when freeMail is on', hood.meta!.settings.freeMail === true && onMail === 4 && onFails.some(m => m.reason === 'personal') && live().mailbox?.letters.some(l => l.text === 'Come see my Ring Light!') && !shield.some(t => live().mailbox?.letters.some(l => l.text === t)) && keptCute(), onFails.map(m => m.reason).join(','));
  await send(grown, { t: 'parent', key: parentKey, op: 'freeMail', on: false });
  const offAt = fullKid.c.inbox.length;
  const offBefore = live().mailbox?.letters.length ?? 0;
  for (const text of shield) await send(fullKid.c, { t: 'mail', op: 'send', houseId: owner.hid, text, color: 0, sticker: 0 });
  const offFails = fullKid.c.inbox.slice(offAt).filter(m => m.t === 'mailFail');
  check('those letters stay out when freeMail is off', hood.meta!.settings.freeMail === false && offFails.length === shield.length && offFails.every(m => m.reason === 'presetsOnly') && (live().mailbox?.letters.length ?? 0) === offBefore, offFails.map(m => m.reason).join(','));

  await send(grown, { t: 'parent', key: parentKey, op: 'freeChat', on: true });
  await send(grown, { t: 'parent', key: parentKey, op: 'freeMail', on: true });
  const sayBlocked = ['go to hell', 'you dumbass', 'f*ck', 'kys', 'h3ll', 'dvmbass'];
  const wordsBefore = fullKid.c.inbox.filter(m => m.t === 'sayFail' && m.reason === 'words').length;
  for (const text of sayBlocked) await send(fullKid.c, { t: 'say', b: { kind: 'text', v: text } });
  const sayWords = fullKid.c.inbox.filter(m => m.t === 'sayFail' && m.reason === 'words').length - wordsBefore;
  await send(fullKid.c, { t: 'say', b: { kind: 'text', v: 'the lamp is pretty' } });
  await send(fullKid.c, { t: 'say', b: { kind: 'text', v: 'you dummy' } });
  check('new bubbles block what new letters block, and mild words still pass the filter', sayWords === sayBlocked.length && fullKid.c.last('sayFail')?.reason === 'nowhere', 'words=' + sayWords + ' last=' + fullKid.c.last('sayFail')?.reason);
  await send(fullKid.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'go to hell', color: 0, sticker: 0 });
  await send(fullKid.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'the lamp is pretty', color: 0, sticker: 0 });
  check('a new letter blocks hell and keeps the lamp', fullKid.c.inbox.some(m => m.t === 'mailFail' && m.reason === 'mail') && live().mailbox?.letters.some(l => l.text === 'the lamp is pretty') && !live().mailbox?.letters.some(l => l.text === 'go to hell'));

  const keepMem = new Map<string, any>();
  const keepKv: KV = {
    get: async k => keepMem.has(k) ? JSON.parse(JSON.stringify(keepMem.get(k))) : undefined,
    put: async (k, v) => { keepMem.set(k, JSON.parse(JSON.stringify(v))); },
    delete: async k => { keepMem.delete(k); },
  };
  const hid = 'hkeepmail1';
  const keepHouse = {
    id: hid, ownerId: 'pkeep1', name: "Rachel's House", locked: false, style: 0, slot: 0,
    state: { ...initialState(), mailbox: { letters: fourLetters } },
  };
  await keepKv.put('meta', { code: 'KEEPMAIL', roster: names, createdAt: Date.now(), parentKeyHash: 'x', settings: { freeChat: true }, players: {}, houseOrder: [hid], nextStyle: 1 });
  await keepKv.put('house:' + hid, keepHouse);
  const keepHood = new Neighborhood(keepKv, { flushMs: 5 });
  await keepHood.load();
  const keptLetters = keepHood.houses.get(hid)!.state.mailbox!.letters;
  check('reloading a house keeps those four letters exactly', JSON.stringify(keptLetters) === JSON.stringify(fourLetters));

  const dogMem = new Map<string, any>();
  const dogKv: KV = {
    get: async k => dogMem.has(k) ? JSON.parse(JSON.stringify(dogMem.get(k))) : undefined,
    put: async (k, v) => { dogMem.set(k, JSON.parse(JSON.stringify(v))); },
    delete: async k => { dogMem.delete(k); },
  };
  const dogHood = new Neighborhood(dogKv, { flushMs: 5 });
  const dogKey = await dogHood.init('ETHELDOG');
  const dogKid = mk();
  await dogHood.onConnect(dogKid);
  const broughtPets = { ...initialState(), cat: { name: 'Mitchell', coat: 1, room: 'living' as const, x: 500 } };
  await dogHood.onMessage(dogKid, JSON.stringify({ t: 'join', nickname: NICKNAMES[0], look, v: PROTOCOL, pet: 1, mail: 1, dog: { name: 'Ethel', breed: 0 }, house: broughtPets }));
  const dogPid = dogKid.last('joined').pid as string;
  const dogWelcome = dogKid.last('welcome');
  const dogPlayer = (dogWelcome.players as any[]).find(p => p.pid === dogPid);
  const dogHouse = (dogWelcome.houses as any[]).find(h => h.ownerId === dogPid);
  check('a pet named Ethel survives the street join', dogPlayer?.dog?.name === 'Ethel' && dogPlayer?.dog?.breed === 0 && dogHouse?.state?.cat?.name === 'Mitchell');
  await dogHood.onMessage(dogKid, JSON.stringify({ t: 'dog', dog: { name: 'Mitchell', breed: 2 } }));
  await dogHood.onMessage(dogKid, JSON.stringify({ t: 'dog', dog: { name: 'Ethel', breed: 1 } }));
  const dogs = dogKid.inbox.filter(m => m.t === 'players').map(m => (m.players as any[]).find(p => p.pid === dogPid)?.dog?.name);
  check('dog updates for Ethel and Mitchell are accepted', dogs.slice(-2).join(',') === 'Mitchell,Ethel', dogs.join(','));
  const grownDog = mk();
  await dogHood.onConnect(grownDog);
  for (const name of names) await dogHood.onMessage(grownDog, JSON.stringify({ t: 'parent', key: dogKey, op: 'rosterAdd', name }));
  await dogHood.onMessage(grownDog, JSON.stringify({ t: 'parent', key: dogKey, op: 'rename', houseId: dogHouse.id, name: "Rachel's House" }));
  const rosterNames = (grownDog.last('parentInfo')?.roster ?? []).map((r: { name: string }) => r.name);
  const renamed = (grownDog.last('parentInfo')?.houses ?? []).find((h: { id: string }) => h.id === dogHouse.id)?.name;
  check("Rachel, Michelle, Chelsea, Ethel and Mitchell are real names, and Rachel's House sticks", names.every(n => rosterNames.includes(n)) && renamed === "Rachel's House" && !grownDog.inbox.some(m => m.t === 'parentInfo' && m.note === 'badName'), rosterNames.join(',') + ' house=' + renamed);

  console.log(`${pass} passed`);
}
main();
