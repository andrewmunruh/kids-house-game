// Visitors arrive apart from the host. Pure helper, no network.
import { arriveSpot, ARRIVE_GAP } from '../src/shared/arrive';
let fails = 0;
const check = (n: string, ok: boolean, x = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + n, x); if (!ok) fails++; };
const B = { minX: 80, maxX: 2320, minY: 450, maxY: 580 };
const clear = (a: { x: number; y: number }, o: { x: number; y: number }) => Math.abs(a.x - o.x) >= ARRIVE_GAP || Math.abs(a.y - o.y) >= ARRIVE_GAP * .6;
check('empty room keeps the wanted spot', JSON.stringify(arriveSpot({ x: 1000, y: 540 }, [], B)) === '{"x":1000,"y":540}');
const host = { x: 1000, y: 540 };
const a = arriveSpot({ x: 1010, y: 540 }, [host], B);
check('arrives clear of host', clear(a, host), JSON.stringify(a));
const crowd = [host, { x: 1090, y: 540 }, { x: 910, y: 540 }, { x: 1180, y: 540 }];
const b = arriveSpot({ x: 1000, y: 540 }, crowd, B);
check('arrives clear of a crowd', crowd.every(o => clear(b, o)), JSON.stringify(b));
for (const want of [{ x: 60, y: 300 }, { x: 2400, y: 900 }]) {
  const c = arriveSpot(want, [{ x: 80, y: 540 }, { x: 2320, y: 580 }], B);
  check('stays on the walkable floor ' + JSON.stringify(want), c.x >= B.minX && c.x <= B.maxX && c.y >= B.minY && c.y <= B.maxY, JSON.stringify(c));
}
const wall = Array.from({ length: 40 }, (_, i) => ({ x: 80 + i * 60, y: 540 }));
const d = arriveSpot({ x: 1000, y: 540 }, wall, B);
check('full room still gives a floor spot', d.x >= B.minX && d.x <= B.maxX && d.y === 540, JSON.stringify(d));
if (fails) process.exit(1); else console.log('arrive_test all pass');
