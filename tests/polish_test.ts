// Quick-win checks that do not need a browser: frame math, name-tag lanes, room shelves, motion CSS.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolveFrame } from '../src/framekid';
import { assignLanes, initials } from '../src/nametags';
import { itemMatchesRoom } from '../src/roomfilter';

let pass = 0;
const check = (name: string, ok: boolean) => { assert.equal(ok, true, name); pass++; console.log('PASS', name); };

const pan = resolveFrame({ cam: 100, maxCam: 500, kidX: 400, overflowL: 0, overflowR: 84, scale: 1, nudgeX: true });
check('an 84px overflow pans the camera and leaves the kid', pan.cam === 184 && pan.kidX === 400);
const edge = resolveFrame({ cam: 480, maxCam: 500, kidX: 400, overflowL: 0, overflowR: 84, scale: 1, nudgeX: true });
check('a camera at the end of the room steps the kid back', edge.cam === 500 && edge.kidX === 336);
const look = resolveFrame({ cam: 480, maxCam: 500, kidX: 400, overflowL: 0, overflowR: 84, scale: 1, nudgeX: false });
check('panning alone does not rewrite a saved position', look.cam === 500 && look.kidX === 400);

const far = assignLanes([{ id: 'a', x: 0, w: 40 }, { id: 'b', x: 200, w: 40 }]);
check('name tags far apart share a lane', far.every(t => t.lane === 0 && !t.initials));
const close = assignLanes([{ id: 'a', x: 100, w: 80 }, { id: 'b', x: 120, w: 80 }]);
check('name tags that overlap take different lanes', close[0].lane !== close[1].lane && close.every(t => !t.initials));
const crowd = assignLanes([
  { id: 'a', x: 0, w: 100 }, { id: 'b', x: 10, w: 100 }, { id: 'c', x: 20, w: 100 }, { id: 'd', x: 30, w: 100 },
]);
check('a fourth overlapping tag shrinks to initials', crowd.filter(t => t.initials).length === 1 && new Set(crowd.map(t => t.lane)).size <= 3);
check('initials keep two letters', initials('Sparkle Kitty') === 'SK' && initials('Sunny') === 'SU');

const decor = (name: string, kind: string, rooms: string[], cat = 'decor') => itemMatchesRoom({ name, kind, rooms, cat }, 'nursery');
check('nursery decor stays on the nursery shelf', decor('Moon Art', 'moon-art', ['nursery']));
check('a balloon tagged for any room waits for All rooms', !decor('Balloons', 'balloon', ['any']) && itemMatchesRoom({ name: 'Balloons', kind: 'balloon', rooms: ['any'], cat: 'decor' }, 'all'));
check('clocks and plants still count as generic', decor('Wood Wall Clock', 'clock', ['any']) && itemMatchesRoom({ name: 'Fern', kind: 'fern', rooms: ['any'], cat: 'plants' }, 'nursery'));
check('a bookshelf tagged any stays off the nursery shelf', !itemMatchesRoom({ name: 'Wood Bookshelf', kind: 'wood-bookshelf', rooms: ['any'], cat: 'furniture' }, 'nursery'));
check('the kennel still shows in the living room', itemMatchesRoom({ name: 'Dog Kennel', kind: 'kennel', rooms: ['any'], cat: 'pets' }, 'living'));

const css = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8');
const juice = readFileSync(new URL('../src/juice.css', import.meta.url), 'utf8');
const mailCss = readFileSync(new URL('../src/mail.css', import.meta.url), 'utf8');
const sceneryCss = readFileSync(new URL('../src/scenery.css', import.meta.url), 'utf8');
const vite = readFileSync(new URL('../vite.config.ts', import.meta.url), 'utf8');
const jsFresh = ['juice.ts', 'nametags.ts', 'framekid.ts', 'roomfilter.ts', 'scenery.ts'].map(f => readFileSync(new URL('../src/' + f, import.meta.url), 'utf8')).join('\n');
check('the surprise banner keeps the only hop keyframes', (css.match(/@keyframes\s+hop\b/g) || []).length === 1 && (css.match(/animation:\s*hop\b/g) || []).length === 1);
const wiggleCss = juice + '\n' + mailCss;
check('item wiggle animation is defined once', (wiggleCss.match(/\.item\.wiggle[^{]*\{/g) || []).length === 1 && (wiggleCss.match(/@keyframes\s+(?:itemWiggle|mailWiggle)\b/g) || []).length === 1);
check('pets bounce with their own names', /@keyframes\s+petHop\b/.test(css) && /@keyframes\s+petSpin\b/.test(css) && /animation:\s*petHop\b/.test(css));
check('reduced motion is honoured in CSS', /prefers-reduced-motion:\s*reduce/.test(juice) && /animation-duration:\s*0\.01ms/.test(juice));
check('vite builds for safari 16', /target:\s*'safari16'/.test(vite) && /cssTarget:\s*'safari16'/.test(vite));
check('new css avoids nesting, color-mix, view transitions, and :has()', !/color-mix\(|view-transition|:has\(/.test(juice + sceneryCss) && !/(^|[^\w-])&(?=[\s.:#[,{])/.test(juice + sceneryCss));
check('new js avoids findLast and toSorted', !/\.(findLast|toSorted|toReversed|toSpliced)\b/.test(jsFresh));

console.log(`${pass} passed`);
