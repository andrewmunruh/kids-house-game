// Mailbox: filter, cap, expiry, rate limit, author stamp, owner-only reading, old clients.
import { Neighborhood, type KV, type Conn } from '../server/core';
import { NICKNAMES, PROTOCOL, cleanMailText } from '../src/shared/hood';
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
  await hood.init('MAILBOX1');
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
  for (let i = 0; i < 5; i++) await send(speedy.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'Note ' + i, color: 0, sticker: i % 6 });
  await send(speedy.c, { t: 'mail', op: 'send', houseId: owner.hid, text: 'Too many', color: 0, sticker: 0 });
  check('the sixth letter in a minute waits', speedy.c.last('mailFail')?.reason === 'slow' && speedy.c.inbox.filter(m => m.t === 'mailbox' && m.houseId === owner.hid).length === 5);

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

  console.log(`${pass} passed`);
}
main();
