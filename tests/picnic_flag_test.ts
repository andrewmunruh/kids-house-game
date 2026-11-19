// B17b1-r2: picnic:1 is advertised from B16's shared picnic seatFractions; the client keeps picnic seats off.
// Run: npx vite-node tests/picnic_flag_test.ts
import { hoodHelloCaps, picnicHelloFields, HAS_PICNIC_SEAT_FRACTIONS, PICNIC_SEATS_ENABLED, clientSeatFractions } from '../src/picnic_seats';
import { seatFractions, resolveDrop } from '../src/shared/sit';

let pass = 0, fail = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++; else { fail++; process.exitCode = 1; }
};

// 1. Shared (B16) has the picnic entry: the single source of truth for the fractions.
const shared = seatFractions('picnic-table');
check('shared seatFractions has a picnic-table entry (two sit spots)',
  !!shared && shared.pose === 'sit' && shared.spots.length === 2, JSON.stringify(shared));
check('pack:picnic-table resolves to the same shared entry',
  JSON.stringify(seatFractions('pack:picnic-table')) === JSON.stringify(shared));
check('HAS_PICNIC_SEAT_FRACTIONS follows the shared entry', HAS_PICNIC_SEAT_FRACTIONS === (shared !== null) && HAS_PICNIC_SEAT_FRACTIONS === true);

// 2. picnic:1 advertised next to sit:1 / baby:1, keyed off that entry.
const caps = hoodHelloCaps() as Record<string, number>;
const fields = picnicHelloFields() as { picnic?: number };
check('picnic:1 is in hello/join caps next to sit:1 and baby:1',
  caps.picnic === 1 && caps.sit === 1 && caps.baby === 1 && fields.picnic === 1, JSON.stringify(caps));

// 3. Seats stay off in the client.
check('PICNIC_SEATS_ENABLED stays false', PICNIC_SEATS_ENABLED === false);
check('client seat fractions: no seat for picnic-table or pack:picnic-table',
  clientSeatFractions('picnic-table') === null && clientSeatFractions('pack:picnic-table') === null && clientSeatFractions('Picnic-Table') === null);
check('client seat fractions for other kinds are the shared ones',
  JSON.stringify(clientSeatFractions('sofa')) === JSON.stringify(seatFractions('sofa')) && clientSeatFractions('sofa') !== null
  && JSON.stringify(clientSeatFractions('yard-bench')) === JSON.stringify(seatFractions('yard-bench'))
  && JSON.stringify(clientSeatFractions('cc-window-seat')) === JSON.stringify(seatFractions('cc-window-seat')));

// 4. The client builds no seat piece for the table (main.ts seatPieceOf returns null when clientSeatFractions is null),
//    so Play tap and drag reach resolveDrop with piece:null. That must not sit her.
const piece = clientSeatFractions('picnic-table') ? { id: 'qa-pt' } : null;
check('client builds no seat piece for the picnic table', piece === null);
const tap = resolveDrop({ mode: 'play', via: 'tap', releaseX: 1104, releaseY: 500, piece: null, occupied: [] });
const drag = resolveDrop({ mode: 'play', via: 'drag', releaseX: 1104, releaseY: 500, piece: null, occupied: [] });
check('Play tap on the table (no seat piece) does not sit her', tap.seat === null && tap.moved === false, JSON.stringify(tap));
check('Play drag onto the table (no seat piece) stands, does not sit', drag.seat === null && drag.moved === true, JSON.stringify(drag));

console.log(`RESULT ${pass} pass ${fail} fail`);
if (fail) process.exit(1);
