// B17b step 1: picnic:1 is advertised, fractions exist, seats stay disabled.
// Run: npx vite-node tests/picnic_flag_test.ts
import { hoodHelloCaps, picnicHelloFields, picnicSeatFractions, HAS_PICNIC_SEAT_FRACTIONS, PICNIC_SEATS_ENABLED, PICNIC_IN_DX, PICNIC_IN_DY } from '../src/picnic_seats';
import { seatFractions, anchorsOf, resolveDrop, type SeatPiece } from '../src/shared/sit';

let pass = 0, fail = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++; else { fail++; process.exitCode = 1; }
};

check('this build carries picnic seatFractions', HAS_PICNIC_SEAT_FRACTIONS === true);
check('picnic seats stay disabled', PICNIC_SEATS_ENABLED === false);

const frac = picnicSeatFractions('picnic-table');
check('picnic-table fractions are 2x-in at dx ±0.24, dy 0.22',
  !!frac && frac.pose === 'sit' && frac.spots.length === 2
  && frac.spots[0].dx === -PICNIC_IN_DX && frac.spots[1].dx === PICNIC_IN_DX
  && frac.spots[0].dy === PICNIC_IN_DY && frac.spots[1].dy === PICNIC_IN_DY
  && PICNIC_IN_DX === 0.24 && PICNIC_IN_DY === 0.22,
  JSON.stringify(frac));
check('other kinds have no picnic fractions', picnicSeatFractions('sofa') === null && picnicSeatFractions('yard-bench') === null);

const caps = hoodHelloCaps();
const fields = picnicHelloFields();
check('picnic:1 is in hello/join caps next to sit:1 and baby:1',
  (caps as { picnic?: number }).picnic === 1 && caps.sit === 1 && caps.baby === 1
  && (fields as { picnic?: number }).picnic === 1,
  JSON.stringify(caps));

check('shared seatFractions does not treat the picnic table as a seat',
  seatFractions('picnic-table') === null && seatFractions('pack:picnic-table') === null);

const piece: SeatPiece = { id: 'qa-pt', kind: 'picnic-table', x: 1104, footY: 520, flip: false, scale: 1, w: 360, h: 220 };
check('anchorsOf has no picnic seats', anchorsOf(piece).length === 0);
const tap = resolveDrop({ mode: 'play', via: 'tap', releaseX: 1104, releaseY: 500, piece: null, occupied: [] });
const drag = resolveDrop({ mode: 'play', via: 'drag', releaseX: 1104, releaseY: 500, piece: null, occupied: [] });
check('Play tap with no seat-piece does not sit her', tap.seat === null && tap.moved === false, JSON.stringify(tap));
check('Play drag onto the table (no seat-piece) stands, does not sit', drag.seat === null && drag.moved === true, JSON.stringify(drag));
// Even if a caller passed a picnic piece through, shared resolveDrop still has no anchors.
const forced = resolveDrop({ mode: 'play', via: 'drag', releaseX: 1104, releaseY: 500, piece, occupied: [] });
check('Play drag on a picnic SeatPiece still does not sit (no shared anchors)', forced.seat === null, JSON.stringify(forced));

console.log(`RESULT ${pass} pass ${fail} fail`);
if (fail) process.exit(1);
