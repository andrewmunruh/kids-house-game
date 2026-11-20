// Play-drop onto a table with no seat: she stands BESIDE it, on a side that is in view and clear of the buttons.
// Client-only (src/play-drop.ts). Run: npx vite-node tests/table_drop_test.ts
import { seatFractions, standBeside, STAND_Y, type SeatPiece } from '../src/shared/sit';
import { playDropPolish, standNextTo, type DropItem } from '../src/play-drop';

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
  check('view check says yes: first spot kept', ok.x === b.x, `x=${ok.x}`);
}
{
  // Her side (left, x=854) is behind the Paint button; the right side is fine.
  const r = standNextTo(picnic, 320, 900, W, { cost: cost(x => x > 1000) });
  check('left side hidden: lands on the right, beside the table', r.x === picnic.x + 230 && r.y === STAND_Y, JSON.stringify(r));
  // Both sides hidden at the first spot but a little further out is fine.
  const far = standNextTo(picnic, 320, 900, W, { cost: cost(x => x < 800 || x > 1450) });
  check('no camera can show either normal spot: steps further out', far.x < picnic.x && far.x <= 800 && far.x >= 700, JSON.stringify(far));
  const none = standNextTo(picnic, 320, 900, W, { cost: cost(() => false) });
  check('nothing in view: falls back to standBeside', none.x === standBeside(picnic.x, 320, 900, W).x, JSON.stringify(none));
}

// ---- playDropPolish on the picnic table ----
const base = { releaseX: 1104, releaseY: 520, hit: picnic, items: [picnic], occupied: [], held: [], seatPiece: noSeat, roomW: W };
{
  const r = playDropPolish(base);
  check('picnic table drop: stands, no seat', r.seat === null && r.y === STAND_Y, JSON.stringify(r));
  check('picnic table drop: same 230 off the middle as today (same as the Worker stand-beside)', Math.abs(Math.abs(r.x - picnic.x) - 230) < 1, `x=${r.x}`);
  check('picnic table drop: beside, not under the table', Math.abs(r.x - picnic.x) >= 180);
  check('picnic table drop: flagged beside (caller keeps her in view)', r.beside === true);
}
{
  // Drop on the left of the table with the left side behind the Paint button: she lands on the right.
  const r = playDropPolish({ ...base, releaseX: 900, standCost: cost(x => x > 1000) });
  check('left behind Paint: lands right of the table, in view', r.seat === null && r.x === picnic.x + 230, JSON.stringify(r));
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
  const leftHidden = (x: number) => x > 1000, rightHidden = (x: number) => x < 1200;
  check('left half + left hidden: right side', at(picnic.x - 120, leftHidden).x === picnic.x + 230);
  check('right half + right hidden: left side', at(picnic.x + 120, rightHidden).x === picnic.x - 230);
  check('centre + right hidden: left side', at(picnic.x, rightHidden).x === picnic.x - 230);
  check('every drop point lands beside, never under the table, and never seated',
    [-160, -80, 0, 80, 160].every(dx => { const r = at(picnic.x + dx, dx < 0 ? leftHidden : rightHidden); return r.seat === null && Math.abs(r.x - picnic.x) >= 160 && r.y === STAND_Y && r.beside === true; }));
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
    ? { id: it.id, kind: it.kind, x: it.x, footY: it.y, flip: false, scale: 1, w: it.kind === 'chair' ? 100 : 240, h: 140 } : null;
  const seated = playDropPolish({ releaseX: table.x, releaseY: table.y, hit: table, items: [table, chair], occupied: [], held: [], seatPiece: sp, standCost: cost(() => false) });
  check('table with a free chair still seats her in the chair', seated.seat?.item === 'chair-5', JSON.stringify(seated));
  const full = playDropPolish({ releaseX: table.x - 50, releaseY: table.y, hit: table, items: [table, chair], occupied: [{ item: 'chair-5', n: 0 }], held: [], seatPiece: sp, standCost: cost(x => x > 1220) });
  check('chair full + left hidden: stands on the visible side', !full.seat && full.x > table.x, JSON.stringify(full));
}

// ---- the camera slides before she walks away from the table (B17b-table fix #2) ----
{
  const R = 230; // 320/2 + 70
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
  // A fridge zone at the other normal spot is never chosen.
  const fr = { bad: (x: number) => Math.abs(x - (t.x - R)) < 130 };
  const e = standNextTo(t, 320, 900, W, { cost: x => x > t.x ? Infinity : 0, ...fr });
  check('fridge zone at the only reachable normal spot: does not land there', Math.abs(e.x - (t.x - R)) >= 130, JSON.stringify(e));
  // Walking out skips a spot on top of another piece, then takes the next clear one.
  const f = standNextTo(t, 320, 900, W, { cost: x => x < t.x - R - 10 ? 0 : Infinity, crowded: x => x < 880 && x > 790 });
  check('walked-out spot is not on another piece', f.x <= 790 && f.x >= 500, JSON.stringify(f));
  // Distance rule: whenever any normal spot is reachable, the distance from the table middle is exactly the normal reach.
  const all = [0, 40, 400, Infinity].every(cl => [0, 90, Infinity].every(cr => {
    if (cl === Infinity && cr === Infinity) return true;
    const r = standNextTo(t, 320, 1000, W, { cost: x => x < t.x ? cl : cr });
    return Math.abs(Math.abs(r.x - t.x) - R) < 0.5;
  }));
  check('any reachable normal spot: lands at exactly the normal reach from the table', all);
}
// playDropPolish wires the fridge zone from the room's items (FRIDGE_RADIUS 130 around the fridge, at STAND_Y).
{
  const table: DropItem = { id: 'table-2', kind: 'table', x: 1200, y: 500 };
  const fridge: DropItem = { id: 'fridge-1', kind: 'fridge', x: 1000, y: 500 };
  const r = playDropPolish({ releaseX: 1100, releaseY: 500, hit: table, items: [table, fridge], occupied: [], held: [], seatPiece: noSeat, roomW: W, standCost: () => 0 });
  check('table drop with a fridge on her side: never inside the fridge zone', Math.hypot(r.x - fridge.x, STAND_Y - fridge.y) > 130, JSON.stringify(r));
  check('...and she lands at the normal reach beside the table', Math.abs(Math.abs(r.x - table.x) - 230) < 0.5, JSON.stringify(r));
}

console.log(`RESULT ${pass} pass ${fail} fail`);
