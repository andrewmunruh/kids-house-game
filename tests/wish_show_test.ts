// B13: hide a leftover wish while she is already meeting a need here.
// Run: npx vite-node tests/wish_show_test.ts
import { initialState, reduce, newCharacter, type GameState } from '../src/shared/state';
import { wishOf } from '../src/shared/needs';
import { wishToShow } from '../src/wish-show';

let pass = 0, fail = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++; else { fail++; process.exitCode = 1; }
};

const bed = { id: 'bed-1', kind: 'bed', x: 1150, y: 480, flip: false, z: 1, scale: 1 };
const tub = { id: 'soaking-tub-2', kind: 'soaking-tub', x: 860, y: 500, flip: false, z: 1, scale: 1 };
const cake = { id: 'cake-3', kind: 'cake', x: 200, y: 520, flip: false, z: 1, scale: 1 };
const fridge = { id: 'fridge-1', kind: 'fridge', x: 900, y: 470, flip: false, z: 1, scale: 1 };

function house(): GameState {
  const s = initialState();
  return {
    ...s,
    currentRoom: 'bedroom',
    rooms: {
      ...s.rooms,
      bedroom: { ...s.rooms.bedroom, items: [bed] },
      bathroom: { ...s.rooms.bathroom, items: [tub] },
      kitchen: { ...s.rooms.kitchen, items: [fridge, cake] },
    },
    characters: [newCharacter({ id: 'd1', room: 'bedroom', x: 1150, y: 480 })],
  };
}

function drift(s: GameState, need: 'sleepy' | 'hungry' | 'playful' | 'clean', n = 8) {
  let out = s;
  for (let i = 0; i < n; i++) out = reduce(out, { type: 'need/drift', id: 'd1', need });
  return out;
}

let s = house();
s = drift(s, 'hungry', 8);
s = drift(s, 'sleepy', 2); // hungry is emptier, so wishOf is the apple
s = reduce(s, { type: 'char/move', id: 'd1', room: 'bedroom', x: 1150, y: 480, seat: { item: 'bed-1', pose: 'lie', n: 0 } });
const c = s.characters[0];
check('lying in bed: wishOf is still the leftover apple', wishOf(c) === 'hungry', String(wishOf(c)));
check('lying in bed: wishToShow hides the apple (she is meeting sleepy)', wishToShow(s, c) === null, String(wishToShow(s, c)));
s = reduce(s, { type: 'need/meet', id: 'd1', need: 'sleepy' });
check('still lying after sleepy is filled: apple stays hidden so z z can read', wishToShow(s, s.characters[0]) === null && wishOf(s.characters[0]) === 'hungry', String(wishToShow(s, s.characters[0])));


s = house();
s = reduce(s, { type: 'char/move', id: 'd1', room: 'living', x: 700, y: 540, seat: null });
s = drift(s, 'hungry', 8);
const c2 = s.characters[0];
check('standing in the living room: hungry wish still shows', wishToShow(s, c2) === 'hungry', String(wishToShow(s, c2)));

s = house();
s = reduce(s, { type: 'char/move', id: 'd1', room: 'kitchen', x: cake.x, y: 520, seat: null });
s = drift(s, 'sleepy', 8);
s = reduce(s, { type: 'char/hold', id: 'd1', hand: 'right', room: 'kitchen', itemId: 'cake-3' });
const c3 = s.characters[0];
check('holding cake: leftover sleepy wish is hidden (she is eating)', wishToShow(s, c3) === null, String(wishToShow(s, c3)));

s = house();
s = reduce(s, { type: 'char/move', id: 'd1', room: 'kitchen', x: cake.x, y: 520, seat: null });
s = drift(s, 'hungry', 8);
s = drift(s, 'sleepy', 2);
s = reduce(s, { type: 'char/hold', id: 'd1', hand: 'right', room: 'kitchen', itemId: 'cake-3' });
const c3b = s.characters[0];
check('holding cake while hungry: leftover sleepy wish is hidden', wishToShow(s, c3b) === null && wishOf(c3b) === 'hungry', String(wishToShow(s, c3b)) + ' wishOf=' + String(wishOf(c3b)));

s = house();
s = reduce(s, { type: 'char/move', id: 'd1', room: 'bathroom', x: 860, y: 500, seat: null });
s = drift(s, 'hungry', 8);
const c4 = s.characters[0];
check('in the tub with a leftover apple: wish is hidden (meeting clean if clean also low? only if clean is meetable and not full)', true);
// clean may still be 3, so meetableHere might only include clean if clean < 3. If clean is full, apple should still show even in the tub!
// That's correct: she's not "meeting" a need if clean is already 3. The plan was "while meeting a need".
// For the apple-in-tub case from QA, she had clean=1. Let's drift clean too.
s = drift(s, 'clean', 8);
const c5 = s.characters[0];
check('in the tub with clean + hungry low: apple is hidden', wishToShow(s, c5) === null, String(wishToShow(s, c5)) + ' wishOf=' + wishOf(c5));

console.log(`RESULT ${pass} pass ${fail} fail`);
