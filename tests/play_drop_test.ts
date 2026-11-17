// B13: Play-drop sits at the table's chair, puts snacks down at the tub/bed, and stands in the tub.
// Run: npx vite-node tests/play_drop_test.ts
import { seatFractions, type SeatPiece } from '../src/shared/sit';
import { playDropPolish, isTableKind, isChairKind, type DropItem } from '../src/play-drop';

let pass = 0, fail = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++; else { fail++; process.exitCode = 1; }
};

const table: DropItem = { id: 'table-2', kind: 'table', x: 1220, y: 500 };
const chair: DropItem = { id: 'chair-5', kind: 'chair', x: 1080, y: 500 };
const cake: DropItem = { id: 'cake-3', kind: 'cake', x: 1220, y: 395 };
const tub: DropItem = { id: 'soaking-tub-2', kind: 'soaking-tub', x: 860, y: 500 };
const bed: DropItem = { id: 'bed-1', kind: 'bed', x: 1150, y: 480 };
const fridge: DropItem = { id: 'fridge-1', kind: 'fridge', x: 900, y: 470 };

const SIZES: Record<string, { w: number; h: number }> = {
  table: { w: 240, h: 140 }, chair: { w: 100, h: 140 }, bed: { w: 300, h: 160 },
  'soaking-tub': { w: 240, h: 140 },
};

function seatPiece(it: DropItem): SeatPiece | null {
  if (!seatFractions(it.kind)) return null;
  const sz = SIZES[it.kind] ?? { w: 160, h: 140 };
  return { id: it.id, kind: it.kind, x: it.x, footY: it.y, flip: false, scale: 1, w: sz.w, h: sz.h };
}

check('table kind', isTableKind('table') && isTableKind('pack:kitchen-table') && !isTableKind('turntable'));
check('chair kind', isChairKind('chair') && isChairKind('stool') && !isChairKind('table') && !isChairKind('sofa'));

const kitchen = [table, chair, cake, fridge];
const atCake = playDropPolish({
  releaseX: cake.x, releaseY: cake.y, hit: cake, items: kitchen, occupied: [], held: [], seatPiece,
});
check('drop on cake sits in the empty chair', !!atCake.seat && atCake.seat.item === 'chair-5', JSON.stringify(atCake));
check('drop on cake does not leave her on the tabletop', Math.abs(atCake.x - table.x) > 40, `x=${atCake.x}`);

const atTable = playDropPolish({
  releaseX: table.x, releaseY: table.y, hit: table, items: kitchen, occupied: [], held: [{ hand: 'right', kind: 'cake' }], seatPiece,
});
check('drop on the table sits in the chair and keeps the snack (eating)', !!atTable.seat && atTable.seat.item === 'chair-5' && atTable.releases.length === 0, JSON.stringify(atTable));

const chairFirst = playDropPolish({
  releaseX: chair.x, releaseY: chair.y, hit: chair, items: kitchen, occupied: [], held: [], seatPiece,
});
check('drop directly on the chair still uses that chair', !!chairFirst.seat && chairFirst.seat.item === 'chair-5');

const taken = playDropPolish({
  releaseX: table.x, releaseY: table.y, hit: table, items: kitchen, occupied: [{ item: 'chair-5', n: 0 }], held: [], seatPiece,
});
check('full chair: she stands beside the table, not on it', !taken.seat && Math.abs(taken.x - table.x) > 40, JSON.stringify(taken));

const inTub = playDropPolish({
  releaseX: tub.x, releaseY: tub.y, hit: tub, items: [tub], occupied: [], held: [{ hand: 'right', kind: 'cake' }], seatPiece,
});
check('drop on the tub stands her in the water', !inTub.seat && Math.abs(inTub.x - tub.x) < 1, JSON.stringify(inTub));
check('drop on the tub puts the cake down beside it', inTub.releases.length === 1 && inTub.releases[0].hand === 'right' && Math.abs(inTub.releases[0].x - tub.x) > 40, JSON.stringify(inTub.releases));

const inBed = playDropPolish({
  releaseX: bed.x, releaseY: bed.y, hit: bed, items: [bed], occupied: [], held: [{ hand: 'right', kind: 'cake' }], seatPiece,
});
check('drop on the bed lies down', !!inBed.seat && inBed.seat.pose === 'lie' && inBed.seat.item === 'bed-1', JSON.stringify(inBed.seat));
check('drop on the bed puts the cake down', inBed.releases.length === 1 && Math.abs(inBed.releases[0].x - bed.x) > 40, JSON.stringify(inBed.releases));

const floor = playDropPolish({
  releaseX: 400, releaseY: 540, hit: null, items: kitchen, occupied: [], held: [{ hand: 'right', kind: 'cake' }], seatPiece,
});
check('drop on the floor keeps the snack and stands where she landed', floor.releases.length === 0 && floor.seat == null && Math.abs(floor.x - 400) < 1);

console.log(`RESULT ${pass} pass ${fail} fail`);
