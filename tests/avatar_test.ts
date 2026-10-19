// look2 validation, legacy mapping, and the chibi size budget. Never talks to a server.
import { gzipSync } from 'node:zlib';
import { characterSVG } from '../src/character';
import { chibiSVG, handsOf, hemOf, poseFor } from '../src/avatar/draw';
import { chibiRideLeg } from '../src/avatar/ride';
import {
  sanitizeLook2, fillLook2, legacyFromLook2, look2FromLegacy, patchFromLook2, randomLook2, withRandomStarter,
  HAIR_IDS, LOOK2_MAX,
} from '../src/shared/avatar';
import { cleanHouseState, cleanLook, cleanLookPatch, cleanAction, PROTOCOL } from '../src/shared/hood';
import { initialState, migrate, reduce } from '../src/shared/state';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + name, extra); if (ok) pass++; else process.exitCode = 1; };

const legacy = { skin: '#f1c27d', hair: '#5b3a29', hairStyle: 2, shirt: '#ff7aa8', pants: '#5aa9e6', size: 'kid' as const, acc: 0 };
const classic = characterSVG(legacy);
check('classic kid has no chibi marker', classic.indexOf('data-chibi') < 0 && classic.indexOf('data-hem="126"') >= 0 && classic.indexOf('cx="15"') >= 0);
check('classic kid has no blur', classic.indexOf('feGaussianBlur') < 0);

const bad = sanitizeLook2({ v: 9, hair: 'nope', hairC: '#ff7aa8', skin: '#F1C27D', eyes: 'round', acc: ['glasses', 'nope', 'glasses', 'bow', 'cap'], freckles: 1, blush: false, dress: '' });
check('bad fields drop and valid ones stay', !!bad && bad.v === 1 && bad.hair === undefined && bad.hairC === undefined && bad.skin === '#f1c27d' && bad.eyes === 'round' && bad.blush === false && bad.freckles === undefined && bad.dress === '' && bad.acc && bad.acc.join(',') === 'glasses,bow');
check('wrong look2 type drops the field', sanitizeLook2(['puffs']) === null && sanitizeLook2('puffs') === null && sanitizeLook2(null) === null);
check('a bad hair color does not drop the hair', sanitizeLook2({ v: 1, hair: 'long', hairC: 'nope' })?.hair === 'long');
const huge = sanitizeLook2({ v: 1, hair: 'puffs', pad: 'x'.repeat(LOOK2_MAX) });
check('oversize look2 is dropped whole', huge === null);

const fromOld = look2FromLegacy({ skin: '#f1c27d', hair: '#5b3a29', hairStyle: 2, shirt: '#ff7aa8', pants: '#5aa9e6', acc: 1 });
check('legacy buns and bow map across', fromOld.hair === 'buns' && fromOld.skin === '#f1c27d' && fromOld.top === 'classic' && fromOld.topC === '#ff7aa8' && fromOld.bottom === 'pants' && fromOld.acc.join() === 'bow' && fromOld.dress === '');
const back = legacyFromLook2(fillLook2({ v: 1, hair: 'puffs', hairC: '#2b1d16', dress: 'party', dressC: '#f4a3c8', acc: ['glasses', 'bow'], topC: '#ffffff', bottomC: '#5aa9e6' }));
check('glasses win the legacy accessory and a dress colors both', back.acc === 2 && back.hairStyle === 2 && back.shirt === '#f4a3c8' && back.pants === '#f4a3c8');
check('nearest hair of the classic brown stays brown', look2FromLegacy(legacy).hairC === '#5b3a29');

const maya = fillLook2({ v: 1, hair: 'puffs', hairC: '#2b1d16', skin: '#8d5524', eyes: 'round', eyeC: '#7b4fb8', top: 'hoodie', topC: '#c9a0dc', bottom: 'skirt', bottomC: '#5aa9e6', shoes: 'sneakers', shoesC: '#ffffff', acc: ['bow'], accC: '#ffd166' });
const svg = chibiSVG(maya, { rich: true, uid: 'm' });
check('chibi marks itself and keeps blush', svg.indexOf('data-chibi="1"') >= 0 && svg.indexOf('radialGradient') >= 0 && svg.indexOf('feGaussianBlur') < 0 && svg.indexOf('--hair:#2b1d16') >= 0);
check('full quality draws the iris and cloth gradients', svg.indexOf('id="mi"') >= 0 && svg.indexOf('id="mc"') >= 0);
const light = chibiSVG(maya, { rich: false, uid: 'q' });
check('safari floor skips the heavy gradients', light.indexOf('id="qi"') < 0 && light.indexOf('id="qc"') < 0 && light.indexOf('radialGradient') >= 0 && light.indexOf('data-chibi') >= 0);

const neutral = { hip: 0, head: 0, armL: 0, armR: 0, legL: 0, legR: 0, legLLift: 0, legRLift: 0 };
const hands = handsOf(neutral);
check('neutral hands sit on the chibi anchors', Math.abs(hands.left.x - 25) < 0.2 && Math.abs(hands.left.y - 116.5) < 0.2 && Math.abs(hands.right.x - 75) < 0.2 && Math.abs(hands.right.y - 116.5) < 0.2);
check('neutral hem is the seat', hemOf(neutral) === 122);
const posed = handsOf(poseFor(maya));
check('posed hands stay finite and near the anchor', Number.isFinite(posed.left.x) && Math.abs(posed.left.x - 25) < 8 && Math.abs(posed.right.y - 116.5) < 8);

let biggest = 0, biggestName = '';
for (const hair of HAIR_IDS) {
  const look = fillLook2({ v: 1, hair, top: 'puff', bottom: 'tutu', shoes: 'maryjanes', acc: ['glasses', 'bow'], dress: '', eyes: 'sparkle', freckles: true });
  const n = gzipSync(Buffer.from(chibiSVG(look, { rich: true, uid: 'z' }))).length;
  if (n > biggest) { biggest = n; biggestName = hair; }
}
check('every full-quality kid is under 8 KB gzip', biggest < 8192, biggestName + ' ' + biggest);

const ride = chibiRideLeg(fillLook2({ v: 1, bottom: 'pants', bottomC: '#5aa9e6', shoes: 'boots', shoesC: '#ff9ec4', dress: '' }));
check('ride leg keeps the saddle class names', ride.indexOf('class="thigh cloth"') >= 0 && ride.indexOf('class="shin') >= 0 && ride.indexOf('class="shoe"') >= 0 && ride.indexOf('class="knee"') >= 0);
const skirtRide = chibiRideLeg(fillLook2({ v: 1, bottom: 'skirt', dress: 'party', dressC: '#ffc2da', skin: '#ffe0c4' }));
check('a dress drapes the riding thigh', skirtRide.indexOf('#ffc2da') >= 0 && skirtRide.indexOf('#ffe0c4') >= 0);

const seeded = randomLook2(() => 0.1);
check('surprise-me stays on the allow-list', !!sanitizeLook2(seeded) && JSON.stringify(sanitizeLook2(seeded)) === JSON.stringify(seeded));
const house = withRandomStarter(initialState(), () => 0.2);
check('a fresh house keeps one kid and gains a look', house.characters.length === 1 && !!house.characters[0].look2 && house.characters[0].skin === legacyFromLook2(house.characters[0].look2).skin);
check('the deterministic starter is still classic', initialState().characters[0].look2 === undefined && initialState().characters[0].shirt === '#ff7aa8');

const patched = patchFromLook2(maya);
let state = reduce(initialState(), { type: 'char/update', id: 'c1', patch: { ...patched, size: 'kid' } });
check('a look2 patch lands on the kid', state.characters[0].look2?.hair === 'puffs' && state.characters[0].hair === '#2b1d16');
const shirtOnly = cleanLookPatch({ shirt: '#80ed99' });
state = reduce(state, { type: 'char/update', id: 'c1', patch: shirtOnly! });
check('a legacy patch drops look2 and keeps the new shirt', state.characters[0].look2 === undefined && state.characters[0].shirt === '#80ed99');
state = reduce(initialState(), { type: 'char/update', id: 'c1', patch: { ...patched, size: 'kid' } });
state = reduce(state, { type: 'char/update', id: 'c1', patch: cleanLookPatch({ flip: true })! });
check('a flip leaves look2 alone', state.characters[0].flip === true && state.characters[0].look2?.hair === 'puffs');
state = reduce(state, { type: 'room/wallpaper', room: 'living', color: '#ddeeff' });
check('a room edit leaves look2 alone', state.characters[0].look2?.hair === 'puffs' && state.rooms.living.wallpaper === '#ddeeff');

const over = cleanLook({ ...legacy, look2: { v: 1, hair: 'pony', pad: 'y'.repeat(500) } });
check('oversize look2 does not reject the legacy look', over.skin === '#f1c27d' && over.look2 === undefined && over.shirt === '#ff7aa8');
const kept = cleanLook({ ...legacy, look2: { v: 1, hair: 'pony', hairC: 'nope', skin: '#ffe0c4' } });
check('one bad color keeps the rest of look2', kept.look2?.hair === 'pony' && kept.look2.skin === '#ffe0c4' && kept.look2.hairC === undefined);

const raw = initialState() as any;
raw.characters[0] = { ...raw.characters[0], look2: { v: 1, hair: 'locs', hairC: '#1d1416', extra: true } };
const a = migrate(JSON.parse(JSON.stringify(raw)));
const b = cleanHouseState(JSON.parse(JSON.stringify(raw)));
check('migrate and cleanHouseState agree on look2', JSON.stringify(a.characters[0].look2) === JSON.stringify(b.characters[0].look2) && a.characters[0].look2?.hair === 'locs');
const plain = migrate(initialState());
check('a kid without look2 stays without it', plain.characters[0].look2 === undefined && JSON.stringify(plain.characters[0]) === JSON.stringify(cleanHouseState(initialState()).characters[0]));
check('protocol stays 4', PROTOCOL === 4);
const act = cleanAction({ type: 'char/update', id: 'c1', patch: { shirt: '#ffffff', look2: { v: 1, hair: 'bob', bad: 'no' } } });
check('a network patch keeps a cleaned look2', act?.type === 'char/update' && (act as any).patch.look2?.hair === 'bob' && (act as any).patch.shirt === '#ffffff');

console.log(pass + ' passed');
