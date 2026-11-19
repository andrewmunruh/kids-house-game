// B18 item 4: pets at the foot of the bed. Rects do not overlap the face or each other.
// Stored cat.x is not in the input, and the helper never returns a new one.
import { initialState } from '../src/shared/state';
import { bedArt, pieceWidth } from '../src/shared/sit';
import {
  bedFoot, bodyInFootRegion, bodyOnMattress, boxesOverlap, boxAtFeet, isSleepBed,
  footMattressBox, mattressBox, petFootTargets, petFootTranslates, FOOT_BODY, FOOT_SLOTS,
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
const mat = mattressBox({ kind: 'bed', x: bed.x, y: bed.y, flip: bed.flip, scale: 1, h: w })!;
const footBox = footMattressBox({ kind: 'bed', x: bed.x, y: bed.y, flip: bed.flip, scale: 1, h: w })!;
check('the painted foot is past the hip-target mattress', footBox.r > mat.r - 8, JSON.stringify({ footBox, mat }));
// Painted nap/sleep bodies (the CSS box is larger because of transparent padding).
const catB = boxAtFeet(catT.x, catT.y, FOOT_BODY.cat.w, FOOT_BODY.cat.h);
const dogB = boxAtFeet(dogT.x, dogT.y, FOOT_BODY.dog.w, FOOT_BODY.dog.h);
check('two pets do not overlap each other (room units)', !boxesOverlap(catB, dogB), JSON.stringify({ catB, dogB }));
check('cat is on the mattress at the foot', bodyOnMattress(catB, footBox, 24) && bodyInFootRegion(catB, footBox), JSON.stringify({ catB, footBox, catT }));
check('dog is on the mattress at the foot', bodyOnMattress(dogB, footBox, 24) && bodyInFootRegion(dogB, footBox), JSON.stringify({ dogB, footBox, dogT }));
check('the second pet is beside the first at the foot', Math.abs(catT.x - dogT.x) > 30 || Math.abs(catT.y - dogT.y) > 30, JSON.stringify({ catT, dogT, foot }));

// Doll face at the pillow, plus the painted lie body (head through mid-torso), which
// must stay clear of the pets. The old 90×90 face box missed pets sitting on her chest.
const headY = bed.y - w * (1 - art.head.y);
const face = boxAtFeet(headX, headY + 20, 90, 90);
const left = bed.x - w / 2, top = bed.y - w;
const body = { l: left + 0.10 * w, t: top + 0.28 * w, r: left + 0.54 * w, b: top + 0.56 * w };
check('cat does not overlap the doll face', !boxesOverlap(catB, face), JSON.stringify({ catB, face, headX, headY }));
check('dog does not overlap the doll face', !boxesOverlap(dogB, face), JSON.stringify({ dogB, face }));
check('cat does not overlap the doll body', !boxesOverlap(catB, body, 4), JSON.stringify({ catB, body }));
check('dog does not overlap the doll body', !boxesOverlap(dogB, body, 4), JSON.stringify({ dogB, body }));

// Flipped bed mirrors away from the head too.
const flipped = bedFoot({ kind: 'bed', x: bed.x, y: bed.y, flip: true, scale: 1, h: w })!;
check('flipped foot is on the other side of center', (flipped.x - bed.x) * (foot!.x - bed.x) < 0, `flip=${flipped.x} raw=${foot!.x}`);
const fMat = mattressBox({ kind: 'bed', x: bed.x, y: bed.y, flip: true, scale: 1, h: w })!;
const fFoot = footMattressBox({ kind: 'bed', x: bed.x, y: bed.y, flip: true, scale: 1, h: w })!;
const fTargets = petFootTargets(flipped, keys);
const fHeadX = bed.x + -1 * (art.head.x - 0.5) * w;
const fFace = boxAtFeet(fHeadX, headY + 20, 90, 90);
const fCat = boxAtFeet(fTargets.get('cat')!.x, fTargets.get('cat')!.y, FOOT_BODY.cat.w, FOOT_BODY.cat.h);
const fDog = boxAtFeet(fTargets.get('solo')!.x, fTargets.get('solo')!.y, FOOT_BODY.dog.w, FOOT_BODY.dog.h);
const fBody = { l: bed.x * 2 - body.r, t: body.t, r: bed.x * 2 - body.l, b: body.b };
check('flipped: pets do not overlap each other', !boxesOverlap(fCat, fDog));
check('flipped: cat misses the face', !boxesOverlap(fCat, fFace));
check('flipped: dog misses the face', !boxesOverlap(fDog, fFace));
check('flipped: cat misses the doll body', !boxesOverlap(fCat, fBody, 4), JSON.stringify({ fCat, fBody }));
check('flipped: dog misses the doll body', !boxesOverlap(fDog, fBody, 4), JSON.stringify({ fDog, fBody }));
check('flipped: cat is on the foot of the mattress', bodyOnMattress(fCat, fFoot, 24) && bodyInFootRegion(fCat, fFoot), JSON.stringify({ fCat, fFoot }));
check('flipped: dog is on the foot of the mattress', bodyOnMattress(fDog, fFoot, 24) && bodyInFootRegion(fDog, fFoot), JSON.stringify({ fDog, fFoot }));

// Translates: a cat already near the bed moves visually; cat.x is not an output.
const catX = 400; // a stored wander-center far from the painted spot
const nearCat = { key: 'cat', x: bed.x, y: 560 };
const nearDog = { key: 'solo', x: bed.x + 40, y: 580 };
const lying = [{ x: bed.x, y: bed.y }];
const t = petFootTranslates([nearCat, nearDog], [{ kind: 'bed', x: bed.x, y: bed.y, flip: false, scale: 1, h: w }], lying);
check('nearby pets get a foot translate', !!t && t.has('cat') && t.has('solo'), t && JSON.stringify([...t.entries()]));
check('translate does not mention stored cat.x', t != null && [...t.values()].every(v => 'dx' in v && 'dy' in v && !('x' in v)) && !JSON.stringify([...t.values()]).includes('"x"'), JSON.stringify({ catX, vals: t && [...t.values()] }));

const far = petFootTranslates([{ key: 'cat', x: 200, y: 560 }], [{ kind: 'bed', x: bed.x, y: bed.y, scale: 1, h: w }], lying);
check('a pet across the room is not teleported', far == null || !far.has('cat'), far && JSON.stringify([...far.entries()]));

const none = petFootTranslates([nearCat], [{ kind: 'bed', x: bed.x, y: bed.y, scale: 1, h: w }], []);
check('no lying doll means no foot slide', none == null);

check('two slots are defined', FOOT_SLOTS.length >= 2);

console.log(`pet_foot_test: ${pass} passed`);
