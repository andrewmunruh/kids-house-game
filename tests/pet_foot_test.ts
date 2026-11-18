// B18 item 4: pets at the foot of the bed. Rects do not overlap the face or each other.
// Stored cat.x is not in the input, and the helper never returns a new one.
import { initialState } from '../src/shared/state';
import { bedArt, pieceWidth } from '../src/shared/sit';
import {
  bedFoot, boxesOverlap, boxAtFeet, isSleepBed, petFootTargets, petFootTranslates, FOOT_SLOTS,
} from '../src/pet-foot';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++;
  else process.exitCode = 1;
};

check('starter bed is a sleep bed', isSleepBed('bed'));
check('wooden-bed (pack) is a sleep bed', isSleepBed('pack:wooden-bed') && isSleepBed('wooden-bed'));
check('tulip-bed is not a sleep bed', !isSleepBed('tulip-bed'));
check('fridge is not a sleep bed', !isSleepBed('fridge'));

const s = initialState();
const bed = s.rooms.bedroom.items.find(i => i.kind === 'bed')!;
const art = bedArt('bed')!;
const w = pieceWidth('bed');
const foot = bedFoot({ kind: 'bed', x: bed.x, y: bed.y, flip: bed.flip, scale: 1, h: w });
check('foot is computed', !!foot, JSON.stringify(foot));
const headX = bed.x + (bed.flip ? -1 : 1) * (art.head.x - 0.5) * w;
check('foot is on the opposite side from the pillow', !!foot && Math.abs(foot!.x - headX) > 120, `foot=${foot?.x} head=${headX} bed=${bed.x}`);
check('stored bed.x is not the foot (she used to curl mid-mattress)', !!foot && Math.abs(foot!.x - bed.x) > 40);

const keys = ['cat', 'solo'];
const targets = petFootTargets(foot!, keys);
const catT = targets.get('cat')!, dogT = targets.get('solo')!;
// Real painted boxes: cat 150×128, house dog 92×71. Feet at (x, y).
const catB = boxAtFeet(catT.x, catT.y, 150, 128);
const dogB = boxAtFeet(dogT.x, dogT.y, 92, 71);
check('two pets do not overlap each other (room units)', !boxesOverlap(catB, dogB), JSON.stringify({ catB, dogB }));

// Doll face: a generous 90×90 around the painted head target, at pillow height.
const headY = bed.y - w * (1 - art.head.y);
const face = boxAtFeet(headX, headY + 20, 90, 90);
check('cat does not overlap the doll face', !boxesOverlap(catB, face), JSON.stringify({ catB, face, headX, headY }));
check('dog does not overlap the doll face', !boxesOverlap(dogB, face), JSON.stringify({ dogB, face }));

// Flipped bed mirrors away from the head too.
const flipped = bedFoot({ kind: 'bed', x: bed.x, y: bed.y, flip: true, scale: 1, h: w })!;
check('flipped foot is on the other side of center', (flipped.x - bed.x) * (foot!.x - bed.x) < 0, `flip=${flipped.x} raw=${foot!.x}`);
const fTargets = petFootTargets(flipped, keys);
const fHeadX = bed.x + -1 * (art.head.x - 0.5) * w;
const fFace = boxAtFeet(fHeadX, headY + 20, 90, 90);
const fCat = boxAtFeet(fTargets.get('cat')!.x, fTargets.get('cat')!.y, 150, 128);
const fDog = boxAtFeet(fTargets.get('solo')!.x, fTargets.get('solo')!.y, 92, 71);
check('flipped: pets do not overlap each other', !boxesOverlap(fCat, fDog));
check('flipped: cat misses the face', !boxesOverlap(fCat, fFace));
check('flipped: dog misses the face', !boxesOverlap(fDog, fFace));

// Translates: a cat already near the bed moves visually; cat.x is not an output.
const catX = 400; // a stored wander-center far from the painted spot
const nearCat = { key: 'cat', x: bed.x, y: 560 };
const nearDog = { key: 'solo', x: bed.x + 40, y: 580 };
const lying = [{ x: bed.x, y: bed.y }];
const t = petFootTranslates([nearCat, nearDog], [{ kind: 'bed', x: bed.x, y: bed.y, flip: false, scale: 1, h: w }], lying);
check('nearby pets get a foot translate', !!t && t.has('cat') && t.has('solo'), t && JSON.stringify([...t.entries()]));
check('translate does not mention stored cat.x', t != null && !JSON.stringify([...t.values()]).includes(String(catX)));

const far = petFootTranslates([{ key: 'cat', x: 200, y: 560 }], [{ kind: 'bed', x: bed.x, y: bed.y, scale: 1, h: w }], lying);
check('a pet across the room is not teleported', far == null || !far.has('cat'), far && JSON.stringify([...far.entries()]));

const none = petFootTranslates([nearCat], [{ kind: 'bed', x: bed.x, y: bed.y, scale: 1, h: w }], []);
check('no lying doll means no foot slide', none == null);

check('two slots are defined', FOOT_SLOTS.length >= 2);

console.log(`pet_foot_test: ${pass} passed`);
