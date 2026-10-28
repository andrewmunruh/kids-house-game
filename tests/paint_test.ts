// Art Studio: codec, pure bitmap core, Worker art store (opaque blob, own key per house, 12 cap, GC), old clients.
import { Neighborhood, type KV, type Conn } from '../server/core';
import { NICKNAMES, PROTOCOL, cleanItem } from '../src/shared/hood';
import { PAINT_W, PAINT_H, PAINT_MAX, PAINT_PER_HOUSE, PAINT_PER_STREET, PALETTE, cleanPaintData, cleanArtId, cleanFrame, encodePaint, decodePaint } from '../src/shared/paint';
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

const aid = (n: number) => 'a' + (1000000 + n).toString(36).padStart(8, '0');
const afriend = (n: number) => 'afriend00' + n;
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
  const send = (c: C, o: any) => { (c as any).budget = undefined; (hood as any).artBudget.clear(); return hood.onMessage(c, JSON.stringify(o)); };
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
  // only members of this street may write
  const snap = JSON.stringify(mem.get('art:' + a.hid));
  const stranger = mk(); await hood.onConnect(stranger);
  await hood.onMessage(stranger, JSON.stringify({ t: 'art', op: 'save', houseId: a.hid, id: 'astrang01', data: d1 }));
  const forged = mk(); await hood.onConnect(forged);
  await hood.onMessage(forged, JSON.stringify({ t: 'hello', token: 'x'.repeat(32), v: PROTOCOL, art: 1 }));
  await hood.onMessage(forged, JSON.stringify({ t: 'art', op: 'save', houseId: a.hid, id: 'astrang02', data: d1 }));
  check('a non-member cannot write a painting', JSON.stringify(mem.get('art:' + a.hid)) === snap && !stranger.inbox.some((m: any) => m.t === 'art') && !forged.inbox.some((m: any) => m.t === 'art'), JSON.stringify(forged.inbox.map((m: any) => m.t)));
  await send(a.c, { t: 'art', op: 'save', houseId: 'hNOTHERE', id: 'astrang03', data: d1 });
  check('a house from another street is refused', a.c.last('artFail')?.reason === 'nohouse' && !mem.get('art:hNOTHERE'));
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
  // her earlier saves are minutes old in real life; here they were saved a moment ago, so let the 'just saved' guard lapse
  const lapse = () => { const f: Map<string, number> = (hood as any).artFresh; for (const k of f.keys()) f.set(k, 0); };
  // ...but first: a just-saved painting that is not placed yet is never the one cleared, even when it is the oldest unhung
  const freshSnap = JSON.stringify(mem.get('art:' + a.hid));
  await send(a.c, { t: 'art', op: 'save', houseId: a.hid, id: 'anew00000', data: d1 });
  check('a just-saved, not yet placed painting is never cleared (house full of fresh ones: full)', a.c.last('artFail')?.reason === 'full' && JSON.stringify(mem.get('art:' + a.hid)) === freshSnap);
  lapse();
  await send(a.c, { t: 'art', op: 'save', houseId: a.hid, id: 'anew00001', data: d1 });
  const after = mem.get('art:' + a.hid);
  check('when her house is full, her oldest unhung painting is cleared to make room', after.anew00001 === d1 && after.acap0000 === eb && !after.aabcdef01 && Object.keys(after).length === PAINT_PER_HOUSE, Object.keys(after).join(','));
  check('memory and storage agree after clearing', JSON.stringify(Object.keys(await (hood as any).artsOf(a.hid)).sort()) === JSON.stringify(Object.keys(after).sort()));
  // safe choice: a friend in an open house never clears the owner's unhung paintings
  const keep = JSON.stringify(mem.get('art:' + a.hid));
  await send(b.c, { t: 'art', op: 'save', houseId: a.hid, id: afriend(1), data: eb });
  check("a friend cannot clear the owner's unhung paintings (full instead)", b.c.last('artFail')?.reason === 'full' && JSON.stringify(mem.get('art:' + a.hid)) === keep);
  check('a refused save leaves memory and storage in step', JSON.stringify(await (hood as any).artsOf(a.hid)) === keep);
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
  // per-street cap: every house together holds at most PAINT_PER_STREET. A full street refuses with 'streetfull' and never
  // touches another child's house; the owner may only free her own old unhung drafts, never one she just saved.
  const countStreet = () => [...hood.houses.keys()].reduce((n, k) => n + Object.keys(mem.get('art:' + k) ?? {}).length, 0);
  const snapStreet = () => JSON.stringify([...hood.houses.keys()].map(k => [k, mem.get('art:' + k) ?? {}]));
  const fillers: Awaited<ReturnType<typeof join>>[] = [];
  let streetN = countStreet(), seq = 0;
  while (streetN < PAINT_PER_STREET) {
    const p = await join(1); fillers.push(p);
    for (let i = 0; i < PAINT_PER_HOUSE && streetN < PAINT_PER_STREET; i++, streetN++) await send(p.c, { t: 'art', op: 'save', houseId: p.hid, id: aid(seq++), data: eb });
  }
  lapse();
  check('the street holds ' + PAINT_PER_STREET + ' paintings', countStreet() === PAINT_PER_STREET, String(countStreet()));
  const s0 = snapStreet(), oldInbox = old.c.inbox.length;
  await send(b.c, { t: 'art', op: 'save', houseId: b.hid, id: aid(900), data: eb });
  check('a full street refuses a new painting with streetfull (she has no drafts of her own)', b.c.last('artFail')?.reason === 'streetfull' && !b.c.last('art')?.arts?.[aid(900)]);
  check("a full street never deletes another house's paintings", snapStreet() === s0 && countStreet() === PAINT_PER_STREET);
  // the owner of a house with old unhung drafts: her own oldest draft makes room, nobody else's
  const f0 = fillers[0], othersBefore = JSON.stringify([...hood.houses.keys()].filter(k => k !== f0.hid).map(k => mem.get('art:' + k) ?? {}));
  const f0Old = Object.keys(mem.get('art:' + f0.hid)).sort()[0];
  await send(f0.c, { t: 'art', op: 'save', houseId: f0.hid, id: aid(901), data: eb });
  check('on a full street her own oldest unhung draft makes room', mem.get('art:' + f0.hid)?.[aid(901)] === eb && !mem.get('art:' + f0.hid)?.[f0Old] && countStreet() === PAINT_PER_STREET);
  check("...and no other house's paintings change", JSON.stringify([...hood.houses.keys()].filter(k => k !== f0.hid).map(k => mem.get('art:' + k) ?? {})) === othersBefore);
  // the window: hang every other painting of hers, so the one just saved (not placed yet) is her only unhung one
  const hf0 = hood.houses.get(f0.hid)!;
  for (const k of Object.keys(mem.get('art:' + f0.hid))) if (k !== aid(901)) hf0.state.rooms.living!.items.push({ id: 'picture-' + k, kind: 'picture', x: 500, y: 200, flip: false, z: 0, art: k } as any);
  const s1 = snapStreet();
  await send(f0.c, { t: 'art', op: 'save', houseId: f0.hid, id: aid(902), data: eb });
  check('her just-saved, not yet placed painting is never cleared to make room', ['full', 'streetfull'].includes(f0.c.last('artFail')?.reason) && mem.get('art:' + f0.hid)?.[aid(901)] === eb && snapStreet() === s1, f0.c.last('artFail')?.reason);
  // two saves at the same moment at the cap: each owner frees only her own draft, the total never passes the cap
  const f1 = fillers[1], f2 = fillers[2], f3keep = JSON.stringify(mem.get('art:' + fillers[3].hid));
  await Promise.all([send(f1.c, { t: 'art', op: 'save', houseId: f1.hid, id: aid(950), data: eb }), send(f2.c, { t: 'art', op: 'save', houseId: f2.hid, id: aid(951), data: eb })]);
  check('two simultaneous saves at the cap never pass ' + PAINT_PER_STREET + ' and only clear their own drafts', countStreet() === PAINT_PER_STREET && mem.get('art:' + f1.hid)?.[aid(950)] === eb && mem.get('art:' + f2.hid)?.[aid(951)] === eb && JSON.stringify(mem.get('art:' + fillers[3].hid)) === f3keep, String(countStreet()));
  // a friend painting in someone else's open house on a full street: refused, nothing cleared there
  const s2 = snapStreet();
  await send(b.c, { t: 'art', op: 'save', houseId: fillers[3].hid, id: aid(960), data: eb });
  check("a friend on a full street is refused and clears nothing in the owner's house", ['full', 'streetfull'].includes(b.c.last('artFail')?.reason) && snapStreet() === s2);
  check('old 10ef736-style client (no art:1) is never sent art or artFail through all of this', !old.c.inbox.slice(oldInbox).some(m => m.t === 'art' || m.t === 'artFail') && !old.c.inbox.some(m => m.t === 'art' || m.t === 'artFail'));
  // every painting hung: the street really is full, and nothing changes
  for (const hid of hood.houses.keys()) { const hh = hood.houses.get(hid)!; for (const k of Object.keys(mem.get('art:' + hid) ?? {})) hh.state.rooms.living!.items.push({ id: 'picture-' + k, kind: 'picture', x: 500, y: 200, flip: false, z: 0, art: k } as any); }
  const snapAll = JSON.stringify([...hood.houses.keys()].map(k => mem.get('art:' + k)));
  await Promise.all([send(b.c, { t: 'art', op: 'save', houseId: b.hid, id: aid(990), data: eb }), send(fillers[3].c, { t: 'art', op: 'save', houseId: fillers[3].hid, id: aid(991), data: eb })]);
  check('all hung: a new painting is refused as streetfull, nothing cleared', b.c.last('artFail')?.reason === 'streetfull' && ['full', 'streetfull'].includes(fillers[3].c.last('artFail')?.reason) && JSON.stringify([...hood.houses.keys()].map(k => mem.get('art:' + k))) === snapAll, JSON.stringify([b.c.last('artFail'), fillers[3].c.last('artFail'), countStreet()]));
  await send(a.c, { t: 'art', op: 'save', houseId: a.hid, id: 'acap0000', data: d1 });
  check('repainting an existing painting still works on a full street', mem.get('art:' + a.hid)?.acap0000 === d1);
  // rate limit: a burst is fine, a flood is slowed
  (hood as any).artBudget.clear(); let slow = 0;
  for (let i = 0; i < 30; i++) { (a.c as any).budget = undefined; await hood.onMessage(a.c, JSON.stringify({ t: 'art', op: 'save', houseId: a.hid, id: 'acap0000', data: d1 })); if (a.c.last('artFail')?.reason === 'slow') slow++; }
  check('art saves are rate limited per player (burst ok, flood slowed)', slow > 0 && slow <= 30 - 12, String(slow));
  console.log(`\n${pass} passed` + (process.exitCode ? ' (FAILURES)' : ''));
}
main();
