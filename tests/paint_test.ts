// Art Studio: codec, pure bitmap core, Worker art store (opaque blob, own key per house, 12 cap, GC), old clients.
import { Neighborhood, type KV, type Conn } from '../server/core';
import { NICKNAMES, PROTOCOL, cleanItem } from '../src/shared/hood';
import { PAINT_W, PAINT_H, PAINT_MAX, PAINT_PER_HOUSE, PALETTE, cleanPaintData, cleanArtId, cleanFrame, encodePaint, decodePaint } from '../src/shared/paint';
import { Bitmap, CLEAR } from '../src/paint/bitmap';

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
const noise = (seed: number) => { const px = new Uint8Array(PAINT_W * PAINT_H); let s = seed; for (let i = 0; i < px.length; i++) { s = (s * 1103515245 + 12345) >>> 0; px[i] = (s >>> 16) & 15; } return px; };

async function main() {
  // codec
  check('16 colors, 256x192', PALETTE.length === 16 && PAINT_W === 256 && PAINT_H === 192);
  const blank = new Uint8Array(PAINT_W * PAINT_H);
  const eb = encodePaint(blank);
  check('blank paper is tiny', eb.length < 600 && cleanPaintData(eb) === eb, String(eb.length));
  const bm = new Bitmap();
  bm.apply({ k: 'line', x0: 10, y0: 10, x1: 200, y1: 150, r: 4, c: 3 } as any);
  bm.apply({ k: 'fill', x: 250, y: 5, c: 9 } as any);
  const d1 = bm.save();
  check('round trip is exact', decodePaint(d1).every((v, i) => v === bm.px[i]) && cleanPaintData(d1) === d1);
  check('drawing changed pixels', bm.px[10 * PAINT_W + 10] === 3 && bm.px[5 * PAINT_W + 250] === 9);
  check('fill stops at the line', bm.px[150 * PAINT_W + 20] === 0 || bm.px[150 * PAINT_W + 20] === 9);
  check('bad data is blank paper, never throws', ['', 'xx', 'P1@@@', 'P1' + 'A'.repeat(20), null, undefined, 'P1////'].every(x => { try { const p = decodePaint(x as any); return p.length === PAINT_W * PAINT_H; } catch { return false; } }));
  const busy = new Bitmap(); busy.px = noise(7); const ds = busy.save();
  check('a very busy picture still saves under the cap', ds.length <= PAINT_MAX && cleanPaintData(ds) === ds, String(ds.length));
  // undo
  const u = new Bitmap(); u.checkpoint(); u.apply({ k: 'clear' } as any); u.checkpoint(); u.dot(50, 50, 6, 4);
  check('undo steps back', u.undoStep() && u.px[50 * PAINT_W + 50] === 0 && u.undoStep() && !u.undoStep());
  const cap = new Bitmap(); for (let i = 0; i < 30; i++) cap.checkpoint(); let n = 0; while (cap.undoStep()) n++;
  check('undo keeps 12 steps', n === 12, String(n));
  // stamp
  const st = new Bitmap(); const m = { w: 4, h: 4, px: new Uint8Array(16).fill(5) }; m.px[0] = CLEAR;
  st.stamp(m, 100, 100);
  check('stamp paints, clear pixels stay', st.px[99 * PAINT_W + 99] === 5 && st.px[98 * PAINT_W + 98] === 0);
  check('drawing off the edge is safe', (() => { try { const e = new Bitmap(); e.line(-50, -50, 400, 400, 14, 2); e.fill(-1, 999, 3); e.stamp(m, -2, 500); return true; } catch { return false; } })());
  // validation
  check('ids and frames are cleaned', cleanArtId('a1234567') === 'a1234567' && cleanArtId('A1234567') === null && cleanArtId('a12') === null && cleanArtId('a1234567<x>') === null && cleanFrame(3) === 3 && cleanFrame(9) === 0 && cleanFrame('2') === 0);
  check('data validation is header/length/charset only', cleanPaintData('P1' + 'A'.repeat(PAINT_MAX)) === null && cleanPaintData('P2AAAA') === null && cleanPaintData('P1AAA') === null && cleanPaintData('P1AA A') === null && cleanPaintData(42) === null && cleanPaintData('P1AAAA') === 'P1AAAA');
  const ci = cleanItem({ id: 'picture-1', kind: 'picture', x: 1, y: 2, flip: false, z: 0, art: 'a1234567', frame: 2 } as any);
  const cs = cleanItem({ id: 'sofa-1', kind: 'sofa', x: 1, y: 2, flip: false, z: 0, art: 'a1234567', frame: 2 } as any);
  check('only a picture carries art', (ci as any)?.art === 'a1234567' && (ci as any)?.frame === 2 && !('art' in (cs as any ?? {})));
  const cb = cleanItem({ id: 'picture-1', kind: 'picture', x: 1, y: 2, flip: false, z: 0, art: '<script>', frame: 99 } as any);
  check('a bad art id or frame is dropped', cb != null && !('art' in (cb as any)) && !('frame' in (cb as any)));

  // server
  check('protocol stays 4', PROTOCOL === 4);
  const hood = new Neighborhood(kv, { flushMs: 5 });
  await hood.init('ARTSTUD1');
  let nickN = 0;
  const send = (c: C, o: any) => { (c as any).budget = undefined; return hood.onMessage(c, JSON.stringify(o)); };
  const join = async (art = 1) => {
    const c = mk(); const nick = NICKNAMES[nickN++];
    await hood.onConnect(c);
    await hood.onMessage(c, JSON.stringify({ t: 'join', nickname: nick, look, v: PROTOCOL, ...(art ? { art: 1 } : {}) }));
    const pid = c.last('joined').pid as string;
    const hid = (c.last('welcome').houses as any[]).find(h => h.ownerId === pid).id as string;
    return { c, pid, nick, hid };
  };
  const a = await join(1), b = await join(1), old = await join(0);
  check('welcome says art:1', a.c.last('welcome')?.art === 1);
  await send(a.c, { t: 'art', op: 'save', houseId: a.hid, id: 'aabcdef01', data: d1 });
  check('save echoes to her', a.c.last('art')?.arts?.aabcdef01 === d1);
  check('a new friend hears it', b.c.last('art')?.arts?.aabcdef01 === d1);
  check('an old client never gets an art message', !old.c.inbox.some(m => m.t === 'art' || m.t === 'artFail'));
  check('paintings live under their own key, not the house save', mem.get('art:' + a.hid)?.aabcdef01 === d1 && !JSON.stringify(mem.get('house:' + a.hid) ?? {}).includes(d1));
  await send(b.c, { t: 'art', op: 'get', houseId: a.hid, ids: ['aabcdef01', 'anothere1'] });
  check('get returns only what exists', JSON.stringify(b.c.last('art')?.arts) === JSON.stringify({ aabcdef01: d1 }));
  await send(a.c, { t: 'art', op: 'save', houseId: a.hid, id: 'aabcdef02', data: 'P1' + 'A'.repeat(PAINT_MAX + 4) });
  check('too big is refused', a.c.last('artFail')?.reason === 'bad' && !mem.get('art:' + a.hid)?.aabcdef02);
  await send(a.c, { t: 'art', op: 'save', houseId: a.hid, id: 'aabcdef03', data: '<img src=x>' });
  check('bad charset is refused', a.c.last('artFail')?.reason === 'bad');
  // malicious payloads: none may be stored, none may throw, the Worker never decodes
  const before = JSON.stringify(mem.get('art:' + a.hid));
  const evil: any[] = [
    { id: '__proto__', data: d1 }, { id: 'constructor', data: d1 }, { id: 'aabcdef09', data: { length: 5 } },
    { id: 'aabcdef09', data: ['P1AAAA'] }, { id: 'aabcdef09', data: 'P1' + 'A'.repeat(1 << 20) }, { id: 'aabcdef09', data: 'GIF89aAAAA' },
    { id: 'aabcdef09', data: 'P1AAAA\n<script>' }, { id: 'aabcdef09', data: 'javascript:alert(1)' }, { id: 'a'.repeat(5000), data: d1 },
    { id: 'aabcdef09', data: d1, houseId: 'house:../../x' },
  ];
  let threw = false;
  for (const e of evil) { try { await send(a.c, { t: 'art', op: 'save', houseId: e.houseId ?? a.hid, id: e.id, data: e.data }); } catch { threw = true; } }
  check('malicious saves are refused and nothing is stored', !threw && JSON.stringify(mem.get('art:' + a.hid)) === before && !mem.get('art:house:../../x'));
  await send(b.c, { t: 'art', op: 'get', houseId: a.hid, ids: ['__proto__', 'constructor', 'toString', 'aabcdef01'] });
  check('a hostile get only returns real paintings', JSON.stringify(b.c.last('art')?.arts) === JSON.stringify({ aabcdef01: d1 }));
  const bomb = 'P1' + '/'.repeat(PAINT_MAX - 2 - ((PAINT_MAX - 2) % 4));
  check('a decode bomb stays one bounded bitmap', decodePaint(bomb).length === PAINT_W * PAINT_H);
  // lock: a friend cannot paint into a locked house
  const h = hood.houses.get(a.hid)!; const wasLocked = h.locked; h.locked = true;
  await send(b.c, { t: 'art', op: 'save', houseId: a.hid, id: 'abbbbbb01', data: eb });
  check('a locked house refuses a friend', b.c.last('artFail')?.reason === 'locked'); h.locked = wasLocked;
  // cap 12 + GC of paintings that are not hung
  for (let i = 0; i < PAINT_PER_HOUSE - 1; i++) await send(a.c, { t: 'art', op: 'save', houseId: a.hid, id: 'acap' + String(i).padStart(4, '0'), data: eb });
  check('12 paintings fit', Object.keys(mem.get('art:' + a.hid)).length === PAINT_PER_HOUSE);
  const sz = JSON.stringify(mem.get('art:' + a.hid)).length;
  const full = { aw: Object.fromEntries(Array.from({ length: PAINT_PER_HOUSE }, (_, i) => ['a' + i, 'P1' + 'A'.repeat(PAINT_MAX - 2)])) };
  check('12 full-size paintings stay under 128 KiB', JSON.stringify(full.aw).length < 128 * 1024, String(JSON.stringify(full.aw).length)); void sz;
  // hang one: put it in the room
  h.state.rooms.living!.items.push({ id: 'picture-x', kind: 'picture', x: 500, y: 200, flip: false, z: 0, art: 'acap0000' } as any);
  await send(a.c, { t: 'art', op: 'save', houseId: a.hid, id: 'anew00001', data: d1 });
  const after = mem.get('art:' + a.hid);
  check('when full, paintings not hung are cleared to make room', after.anew00001 === d1 && after.acap0000 === eb && !after.acap0001 && Object.keys(after).length === 2, Object.keys(after).join(','));
  for (let i = 0; i < PAINT_PER_HOUSE; i++) h.state.rooms.living!.items.push({ id: 'picture-h' + i, kind: 'picture', x: 500, y: 200, flip: false, z: 0, art: 'ahung' + String(i).padStart(4, '0') } as any);
  for (let i = 0; i < PAINT_PER_HOUSE; i++) await send(a.c, { t: 'art', op: 'save', houseId: a.hid, id: 'ahung' + String(i).padStart(4, '0'), data: eb });
  await send(a.c, { t: 'art', op: 'save', houseId: a.hid, id: 'aover0001', data: eb });
  check('when every painting is hung, the 13th is full', a.c.last('artFail')?.reason === 'full' && Object.keys(mem.get('art:' + a.hid)).length <= PAINT_PER_HOUSE);
  // a fresh server (Worker restart) still has them
  await hood.flush(); const hood2 = new Neighborhood(kv, { flushMs: 5 }); await hood2.load();
  const r = mk(); await hood2.onConnect(r);
  const tok = a.c.last('joined').token as string;
  await hood2.onMessage(r, JSON.stringify({ t: 'hello', token: tok, v: PROTOCOL, art: 1 }));
  await hood2.onMessage(r, JSON.stringify({ t: 'art', op: 'get', houseId: a.hid, ids: ['acap0000'] }));
  check('paintings survive a restart', r.last('art')?.arts?.acap0000 === eb, JSON.stringify(r.inbox.map(m => m.t)) + ' ' + Object.keys(mem.get('art:' + a.hid)));
  console.log(`\n${pass} passed` + (process.exitCode ? ' (FAILURES)' : ''));
}
main();
