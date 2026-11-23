// Play-drop onto a table with no seat: she stands BESIDE it, on a side that is in view and clear of the buttons.
// Client-only (src/play-drop.ts). Run: npx vite-node tests/table_drop_test.ts
import { seatFractions, standBeside, STAND_Y, type SeatPiece } from '../src/shared/sit';
import { playDropPolish, standNextTo, STAND_BODY_HW, type DropItem } from '../src/play-drop';

let pass = 0, fail = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++; else { fail++; process.exitCode = 1; }
};

// cost(ok): a camera that can show x only where ok(x) says so, with no slide needed
const cost = (ok: (x: number) => boolean) => (x: number) => ok(x) ? 0 : Infinity;
const picnic: DropItem = { id: 'qa-pt', kind: 'picnic-table', x: 1104, y: 520, scale: 1 };
const W = 2400;
// The client keeps the picnic table unsittable (seats off): no seat piece for it, like src/picnic_seats.ts.
const noSeat = (_it: DropItem): SeatPiece | null => null;

// ---- standNextTo: same as standBeside unless a view check says no ----
{
  const a = standNextTo(picnic, 320, 900, W);
  const b = standBeside(picnic.x, 320, 900, W);
  check('no view check: exactly standBeside', a.x === b.x && a.y === b.y, JSON.stringify(a));
  const ok = standNextTo(picnic, 320, 900, W, { cost: cost(() => true) });
  check('view check says yes: the normal side, 14px further out for her arm pose', Math.abs(ok.x - b.x) === 14 && Math.sign(ok.x - picnic.x) === Math.sign(b.x - picnic.x), `x=${ok.x}`);
}
{
  // Her side (left, x=860) is behind the Paint button; the right side is fine.
  const r = standNextTo(picnic, 320, 900, W, { cost: cost(x => x > 1000 && x !== picnic.x) });
  check('left side hidden + in-front hidden: lands on the right, beside the table', r.x === picnic.x + 244 && r.y === STAND_Y, JSON.stringify(r));
  // Both sides and in-front hidden, far spot works and calls onFar.
  const fars: unknown[] = [];
  const far = standNextTo(picnic, 320, 900, W, { cost: cost(x => x < 800 || x > 1450), onFar: info => fars.push(info) });
  check('nothing near works: steps to far spot and logs it', far.x < picnic.x && far.x <= 800 && far.x >= 700 && far.kind === 'far' && fars.length === 1, JSON.stringify(far));
  const none = standNextTo(picnic, 320, 900, W, { cost: cost(() => false) });
  check('nothing in view: falls back to standBeside', none.x === standBeside(picnic.x, 320, 900, W).x, JSON.stringify(none));
}

// ---- playDropPolish on the picnic table (real width 360 when standCost is given -> reach 264) ----
const base = { releaseX: 1104, releaseY: 520, hit: picnic, items: [picnic], occupied: [], held: [], seatPiece: noSeat, roomW: W };
{
  const r = playDropPolish(base);
  check('picnic table drop: stands, no seat', r.seat === null && r.y === STAND_Y, JSON.stringify(r));
  check('picnic table drop: same 230 off the middle (the Worker stand-beside, no view check)', Math.abs(Math.abs(r.x - picnic.x) - 230) < 1, `x=${r.x}`);
  check('picnic table drop: beside, not under the table', Math.abs(r.x - picnic.x) >= 180);
  check('picnic table drop: flagged beside (caller keeps her in view)', r.beside === true);
}
{
  const r = playDropPolish({ ...base, releaseX: 900, standCost: cost(x => x > 1200) });
  check('left behind Paint + in-front hidden: lands right of the table, in view', r.seat === null && r.x === picnic.x + 264, JSON.stringify(r));
  const l = playDropPolish({ ...base, releaseX: 900 });
  check('no view check: keeps the side she came from', l.x === picnic.x - 230, JSON.stringify(l));
}
{
  // A seat she would never get: picnic seats stay off even when the shared table lists spots.
  check('shared sit.ts lists picnic spots (B16)', !!seatFractions('picnic-table'));
  const r = playDropPolish({ ...base, standCost: cost(() => true) });
  check('picnic seats stay off: never a seat', r.seat === null);
  const r2 = playDropPolish({ ...base, hit: null, releaseX: 1104, releaseY: 520, standCost: cost(() => true) });
  check('no hit, near the table: still no seat and no crash', r2.seat === null);
}

// ---- left half, centre, right half of the table; view check hides one side or none ----
{
  const at = (rx: number, ok?: (x: number) => boolean) => playDropPolish({ ...base, releaseX: rx, standCost: ok && cost(ok) });
  check('drop on the left half: stands left, beside the table', at(picnic.x - 120).x === picnic.x - 230 && at(picnic.x - 120).y === STAND_Y);
  check('drop on the right half: stands right, beside the table', at(picnic.x + 120).x === picnic.x + 230);
  check('drop dead centre: stands right (same as today)', at(picnic.x).x === picnic.x + 230);
  const leftHidden = (x: number) => x > 1290, rightHidden = (x: number) => x < 920;
  check('left half + left hidden: right side', at(picnic.x - 120, leftHidden).x === picnic.x + 264);
  check('right half + right hidden: left side', at(picnic.x + 120, rightHidden).x === picnic.x - 264);
  check('centre + right hidden: left side', at(picnic.x, rightHidden).x === picnic.x - 264);
  check('every drop point lands beside, never under the table, and never seated',
    [-160, -80, 0, 80, 160].every(dx => { const r = at(picnic.x + dx, dx < 0 ? leftHidden : rightHidden); return r.seat === null && Math.abs(r.x - picnic.x) >= 180 && r.y === STAND_Y && r.beside === true; }));
}

// ---- real seats keep seating her, and a view check does not move them ----
{
  const bench: DropItem = { id: 'yard-bench-1', kind: 'yard-bench', x: 700, y: 520 };
  const seatPiece = (it: DropItem): SeatPiece | null => seatFractions(it.kind)
    ? { id: it.id, kind: it.kind, x: it.x, footY: it.y, flip: false, scale: 1, w: 308, h: 220 } : null;
  const withOk = playDropPolish({ releaseX: 700, releaseY: 520, hit: bench, items: [bench], occupied: [], held: [], seatPiece, roomW: W, standCost: cost(() => false) });
  const without = playDropPolish({ releaseX: 700, releaseY: 520, hit: bench, items: [bench], occupied: [], held: [], seatPiece, roomW: W });
  check('bench drop still seats her', !!withOk.seat && withOk.seat.item === 'yard-bench-1', JSON.stringify(withOk));
  check('bench drop is not flagged beside', withOk.beside !== true);
  check('bench drop is the same with or without the view check', withOk.x === without.x && withOk.y === without.y && withOk.seat?.n === without.seat?.n);

  // Kitchen table with a chair: still sits in the chair; with both chairs full she stands beside, in view.
  const table: DropItem = { id: 'table-2', kind: 'table', x: 1220, y: 500 };
  const chair: DropItem = { id: 'chair-5', kind: 'chair', x: 1080, y: 500 };
  const sp = (it: DropItem): SeatPiece | null => seatFractions(it.kind)
    ? { id: it.id, kind: it.kind, x: it.x, footY: it.y, flip: false, scale: 1, w: it.kind === 'chair' ? 100 : 200, h: 140 } : null;
  const seated = playDropPolish({ releaseX: table.x, releaseY: table.y, hit: table, items: [table, chair], occupied: [], held: [], seatPiece: sp, standCost: cost(() => false) });
  check('table with a free chair still seats her in the chair', seated.seat?.item === 'chair-5', JSON.stringify(seated));
  const full = playDropPolish({ releaseX: table.x - 50, releaseY: table.y, hit: table, items: [table, chair], occupied: [{ item: 'chair-5', n: 0 }], held: [], seatPiece: sp, standCost: cost(x => x > 1220) });
  check('chair full + left hidden: stands on the visible side', !full.seat && full.x > table.x, JSON.stringify(full));
}

// ---- the camera slides before she walks away from the table ----
{
  const R = 244; // 320/2 + 82 + 2
  const t = picnic;
  // Both normal spots can be shown, the right one only after a slide of 90, the left one as is: left, no slide.
  const a = standNextTo(t, 320, 1200, W, { cost: x => x > t.x ? 90 : 0 });
  check('other side needs no slide, her side needs one: other side at the normal reach', a.x === t.x - R, JSON.stringify(a));
  // Her side needs 40, the other 90: her side + a slide of 40.
  const b = standNextTo(t, 320, 1200, W, { cost: x => x > t.x ? 40 : 90 });
  check('smaller slide wins between the normal spots', b.x === t.x + R, JSON.stringify(b));
  // Her side is out of reach of any camera (room edge), the other side is fine: the other side at the normal reach, not further out.
  const c = standNextTo(t, 320, 1200, W, { cost: x => x > t.x ? Infinity : 0 });
  check('her side unreachable: other side at the NORMAL reach (not walked out)', c.x === t.x - R, JSON.stringify(c));
  // Slid cameras only matter when needed: a spot already in view beats one that needs a slide even if she came from the far side.
  const d = standNextTo(t, 320, 900, W, { cost: x => x < t.x ? 120 : 0 });
  check('in view without a slide beats a slide', d.x === t.x + R, JSON.stringify(d));
  // Distance rule: whenever any normal spot is reachable, the distance from the table middle is at most the ideal reach.
  const all = [0, 40, 400, Infinity].every(cl => [0, 90, Infinity].every(cr => {
    if (cl === Infinity && cr === Infinity) return true;
    const r = standNextTo(t, 320, 1000, W, { cost: x => x < t.x ? cl : cr });
    return Math.abs(Math.abs(r.x - t.x) - R) < 0.5;
  }));
  check('any reachable normal spot: lands at the normal reach from the table', all);
}

// ---- closed fridge's open-door zone must NOT block a near spot ----
{
  const table: DropItem = { id: 'table-2', kind: 'table', x: 1200, y: 500 };
  // Scaled narrow fridge sitting beside the table: the normal left spot (1016) is within FRIDGE_RADIUS (130),
  // yet physically clear of the scaled fridge box (920 ± 40 = 880..960 vs 1016 - 62 = 954? use 900 scale 0.6 -> 855..945).
  const smallFridge: DropItem = { id: 'fridge-1', kind: 'fridge', x: 910, y: 470, scale: 0.6 };
  const r = playDropPolish({ releaseX: 1120, releaseY: 500, hit: table, items: [table, smallFridge], occupied: [], held: [], seatPiece: noSeat, roomW: W, standCost: () => 0, standers: [{ x: 1336, hw: 60 }] });
  check('closed fridge open-door zone does not block the near left spot', r.besideKind === 'away-side' && Math.hypot(r.x - smallFridge.x, STAND_Y - smallFridge.y) <= 130 && Math.abs(r.x - 1018) <= 6, JSON.stringify(r));
}

// ---- candidate order: away-side -> in-front -> other-side -> far ----
{
  const t: DropItem = { id: 'qa-pt', kind: 'table', x: 1200, y: 500 };
  const baby = { x: 1336, hw: 60 };
  const a = standNextTo(t, 200, t.x + 80, W, { cost: () => 0, others: [baby] });
  check('1. baby on right: takes away-side (left) even when dropped on right', a.kind === 'away-side' && a.x < t.x - 100, JSON.stringify(a));

  // Left side crowded (fridge pushed right up to table), baby on right -> floor in front of table!
  const b = standNextTo(t, 200, t.x, W, { cost: () => 0, crowded: x => x < t.x - 80, others: [baby] });
  check('2. away-side blocked + baby on right: takes floor in front of the table (same footprint, lower y)',
    b.kind === 'in-front' && Math.abs(b.x - t.x) <= 100 && b.y >= STAND_Y && b.y > t.y, JSON.stringify(b));

  // Away-side blocked AND in-front blocked (another doll in front), other side clear -> other-side!
  const c = standNextTo(t, 200, t.x, W, { cost: () => 0, crowded: x => x < t.x - 80, others: [{ x: t.x, hw: 60 }] });
  check('3. away-side + in-front blocked: takes the other side', c.kind === 'other-side' && c.x > t.x + 100, JSON.stringify(c));

  // Away-side, in-front, AND other-side all blocked -> far spot fallback + logged!
  const farCalls: unknown[] = [];
  const d = standNextTo(t, 200, t.x, W, {
    cost: () => 0,
    crowded: x => x > t.x - 240 && x < t.x + 240,
    others: [baby],
    onFar: info => farCalls.push(info),
  });
  check('4. all near spots blocked: far-spot fallback used and logged', d.kind === 'far' && farCalls.length === 1 && Math.abs(d.x - t.x) > 220, JSON.stringify(d));
}

// ---- baby / other dolls / kitchen scenarios ----
{
  const t = picnic; const R = 244;
  const baby = { x: t.x + 136, hw: 60 };
  const a = standNextTo(t, 320, t.x + 100, W, { cost: () => 0, others: [baby] });
  check('baby on the right: she takes the normal reach on the LEFT, even when she was dropped on the right', a.x === t.x - R, JSON.stringify(a));
  const doll = { x: t.x - R, hw: 60 };
  const c = standNextTo(t, 320, t.x - 100, W, { cost: () => 0, others: [doll] });
  check('another doll on the left spot: she goes right (when in-front is also blocked by a doll)', (() => {
    const c2 = standNextTo(t, 320, t.x - 100, W, { cost: () => 0, others: [doll, { x: t.x, hw: 60 }] });
    return c2.x === t.x + R;
  })(), JSON.stringify(c));
  // Someone standing far away on one side does not count as "that side taken".
  const e = standNextTo(t, 320, t.x + 100, W, { cost: () => 0, others: [{ x: t.x + 1000, hw: 60 }] });
  check('a kid far away does not push her to the other side', e.x === t.x + R, JSON.stringify(e));

  // Kitchen as the test builds it: table 1200 (w=200 -> 1100..1300), fridge 900 (w=150 -> 825..975), baby 1336, stove 1500.
  const kt: DropItem = { id: 'qa-pt', kind: 'table', x: 1200, y: 500 };
  const fr: DropItem = { id: 'fridge-1', kind: 'fridge', x: 900, y: 470 };
  const st: DropItem = { id: 'stove-4', kind: 'stove', x: 1500, y: 470 };
  const cake: DropItem = { id: 'cake-3', kind: 'cake', x: 1220, y: 395 };
  const items = [fr, kt, st, cake];
  const k = playDropPolish({ releaseX: 1200 + 100, releaseY: 500, hit: kt, items, occupied: [], held: [], seatPiece: noSeat, roomW: W, standCost: () => 0, standers: [{ x: 1336, hw: 60 }] });
  check('kitchen: lands on the left (away-side) between fridge and table, never walks past fridge', k.besideKind === 'away-side' && k.x < 1100 && k.x > 975, JSON.stringify(k));
  check('kitchen: within 1 doll-width (120px) of the table left edge', Math.abs(1100 - k.x) <= 120, JSON.stringify(k));
  check('kitchen: not on the fridge or the stove', Math.abs(k.x - fr.x) >= 75 + STAND_BODY_HW && Math.abs(k.x - st.x) >= 85 + STAND_BODY_HW, JSON.stringify(k));

  // Default kitchen (fridge 900, table 1220, stove 1500, chairs removed), baby far away.
  const dt: DropItem = { id: 'table-2', kind: 'table', x: 1220, y: 500 };
  const df: DropItem = { id: 'fridge-1', kind: 'fridge', x: 900, y: 470 };
  const ds: DropItem = { id: 'stove-4', kind: 'stove', x: 1500, y: 470 };
  const q = playDropPolish({ releaseX: 1180, releaseY: 500, hit: dt, items: [df, dt, ds], occupied: [], held: [], seatPiece: noSeat, roomW: W, standCost: () => 0, standers: [] });
  check('default kitchen: stays beside the table (never walks past fridge)', q.x > df.x + 75 && Math.abs(q.x - (dt.x - 100)) <= 120, JSON.stringify(q));
}

console.log(`RESULT ${pass} pass ${fail} fail`);
