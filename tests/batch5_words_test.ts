// Batch 5: shared wording (plurals, "why didn't that work" toasts, "Chloe moved the sofa"), the friend glide, 2D name tag lanes.
import assert from 'node:assert/strict';
import { plural, nackText, movedNote, noteGate, NACK_REASONS, ALL_SIGNED_IN, dupName } from '../src/words';
import { glideMs } from '../src/glide';
import { assignLanes } from '../src/nametags';

let pass = 0;
const check = (name: string, ok: boolean) => { assert.equal(ok, true, name); pass++; console.log('PASS', name); };

// plural
check('1 friend', plural(1, 'friend') === '1 friend');
check('0 friends', plural(0, 'friend') === '0 friends');
check('2 treats', plural(2, 'treat') === '2 treats');
check('irregular plural', plural(3, 'puppy', 'puppies') === '3 puppies');

// nack toast snapshot, one line per reason (action kind matters for notyours)
const move = { type: 'item/move' } as const, other = { type: 'house/rename' } as unknown as { type: 'item/move' };
const snap: Record<string, string> = {};
for (const r of NACK_REASONS) snap[r] = nackText(r, move);
snap['notyours:other'] = nackText('notyours', other);
snap['notyours:none'] = nackText('notyours', null);
assert.deepEqual(snap, {
  locked: 'This house is locked 🔒 You can look around!',
  notyours: "That's hers to move 💛",
  cuddling: 'Someone is cuddling!',
  nohouse: "That house isn't on the street anymore.",
  toobig: 'This house is super full! Put something away first.',
  noop: '',
  invalid: '',
  'notyours:other': 'Only she can do that one 💛',
  'notyours:none': 'Only she can do that one 💛',
}); pass++; console.log('PASS nack toast snapshot');
check('unknown reason stays quiet', nackText('mystery') === '');

// moved notes
check('moved the sofa', movedNote('Chloe', { type: 'item/move' }, 'Sofa') === 'Chloe moved the sofa');
check('put the lamp away', movedNote('Chloe', { type: 'item/delete' }, 'Lamp') === 'Chloe put the lamp away');
check('no note for other acts', movedNote('Chloe', { type: 'item/add' }, 'Lamp') === '');
check('unknown piece still reads', movedNote('Chloe', { type: 'item/move' }, '') === 'Chloe moved something');
const gate = noteGate(5000);
check('first note shows', gate('p1:i1', 1000));
check('drag repeats are quiet', !gate('p1:i1', 2000) && !gate('p1:i1', 5900));
check('another piece shows', gate('p1:i2', 2000));
check('same piece later shows again', gate('p1:i1', 6100));
check('all-signed-in line', ALL_SIGNED_IN === "Everyone's already playing! Ask a grown-up to add your name.");
check('dup name line', dupName('Sunny') === 'Sunny is already on the list 💛');

// glide
check('glide floor', glideMs(30) === 120 && glideMs(0) === 120 && glideMs(NaN) === 120);
check('glide follows the gap', glideMs(200) === 200);
check('glide cap', glideMs(5000) === 300);

// name tags at different heights (B-24): lane 1 of a low kid must not land on a higher kid's lane 0 tag
const H = 24;
const tags = assignLanes([
  { id: 'low1', x: 100, w: 80, y: 300, h: H },
  { id: 'low2', x: 110, w: 80, y: 300, h: H },
  { id: 'high', x: 120, w: 80, y: 300 - H, h: H },
]);
const top = (id: string) => { const t = tags.find(r => r.id === id)!; const y = id === 'high' ? 300 - H : 300; return y - t.lane * H; };
const ys = ['low1', 'low2', 'high'].map(top);
check('tags at different heights do not overlap', ys.every((y, i) => ys.every((z, j) => i === j || Math.abs(y - z) >= H)));
check('x-only callers keep old lanes', assignLanes([{ id: 'a', x: 100, w: 80 }, { id: 'b', x: 120, w: 80 }]).map(t => t.lane).join() === '0,1');
console.log(`batch5_words: ${pass} passed`);
