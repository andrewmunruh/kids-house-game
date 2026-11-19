// Play-drop onto a table with no seat: she stands BESIDE it, on a side that is in view and clear of the buttons.
// Client-only (src/play-drop.ts). Run: npx vite-node tests/table_drop_test.ts
import { seatFractions, standBeside, STAND_Y, type SeatPiece } from '../src/shared/sit';
import { playDropPolish, standNextTo, type DropItem } from '../src/play-drop';

let pass = 0, fail = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++; else { fail++; process.exitCode = 1; }
};

const picnic: DropItem = { id: 'qa-pt', kind: 'picnic-table', x: 1104, y: 520, scale: 1 };
const W = 2400;
// The client keeps the picnic table unsittable (seats off): no seat piece for it, like src/picnic_seats.ts.
const noSeat = (_it: DropItem): SeatPiece | null => null;

// ---- standNextTo: same as standBeside unless a view check says no ----
{
  const a = standNextTo(picnic, 320, 900, W);
  const b = standBeside(picnic.x, 320, 900, W);
  check('no view check: exactly standBeside', a.x === b.x && a.y === b.y, JSON.stringify(a));
  const ok = standNextTo(picnic, 320, 900, W, () => true);
  check('view check says yes: first spot kept', ok.x === b.x, `x=${ok.x}`);
}
{
  // Her side (left, x=854) is behind the Paint button; the right side is fine.
  const r = standNextTo(picnic, 320, 900, W, x => x > 1000);
  check('left side hidden: lands on the right, beside the table', r.x === picnic.x + 230 && r.y === STAND_Y, JSON.stringify(r));
  // Both sides hidden at the first spot but a little further out is fine.
  const far = standNextTo(picnic, 320, 900, W, x => x < 800 || x > 1450);
  check('both near spots hidden: steps further out on her side first', far.x < picnic.x && far.x <= 800 && far.x >= 700, JSON.stringify(far));
  const none = standNextTo(picnic, 320, 900, W, () => false);
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
  const r = playDropPolish({ ...base, releaseX: 900, standOk: x => x > 1000 });
  check('left behind Paint: lands right of the table, in view', r.seat === null && r.x === picnic.x + 230, JSON.stringify(r));
  const l = playDropPolish({ ...base, releaseX: 900 });
  check('no view check: keeps the side she came from', l.x === picnic.x - 230, JSON.stringify(l));
}
{
  // A seat she would never get: picnic seats stay off even when the shared table lists spots.
  check('shared sit.ts lists picnic spots (B16)', !!seatFractions('picnic-table'));
  const r = playDropPolish({ ...base, standOk: () => true });
  check('picnic seats stay off: never a seat', r.seat === null);
  const r2 = playDropPolish({ ...base, hit: null, releaseX: 1104, releaseY: 520, standOk: () => true });
  check('no hit, near the table: still no seat and no crash', r2.seat === null);
}

// ---- left half, centre, right half of the table; view check hides one side or none ----
{
  const at = (rx: number, ok?: (x: number) => boolean) => playDropPolish({ ...base, releaseX: rx, standOk: ok });
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
  const withOk = playDropPolish({ releaseX: 700, releaseY: 520, hit: bench, items: [bench], occupied: [], held: [], seatPiece, roomW: W, standOk: () => false });
  const without = playDropPolish({ releaseX: 700, releaseY: 520, hit: bench, items: [bench], occupied: [], held: [], seatPiece, roomW: W });
  check('bench drop still seats her', !!withOk.seat && withOk.seat.item === 'yard-bench-1', JSON.stringify(withOk));
  check('bench drop is not flagged beside', withOk.beside !== true);
  check('bench drop is the same with or without the view check', withOk.x === without.x && withOk.y === without.y && withOk.seat?.n === without.seat?.n);

  // Kitchen table with a chair: still sits in the chair; with both chairs full she stands beside, in view.
  const table: DropItem = { id: 'table-2', kind: 'table', x: 1220, y: 500 };
  const chair: DropItem = { id: 'chair-5', kind: 'chair', x: 1080, y: 500 };
  const sp = (it: DropItem): SeatPiece | null => seatFractions(it.kind)
    ? { id: it.id, kind: it.kind, x: it.x, footY: it.y, flip: false, scale: 1, w: it.kind === 'chair' ? 100 : 240, h: 140 } : null;
  const seated = playDropPolish({ releaseX: table.x, releaseY: table.y, hit: table, items: [table, chair], occupied: [], held: [], seatPiece: sp, standOk: () => false });
  check('table with a free chair still seats her in the chair', seated.seat?.item === 'chair-5', JSON.stringify(seated));
  const full = playDropPolish({ releaseX: table.x - 50, releaseY: table.y, hit: table, items: [table, chair], occupied: [{ item: 'chair-5', n: 0 }], held: [], seatPiece: sp, standOk: x => x > 1220 });
  check('chair full + left hidden: stands on the visible side', !full.seat && full.x > table.x, JSON.stringify(full));
}

console.log(`RESULT ${pass} pass ${fail} fail`);
