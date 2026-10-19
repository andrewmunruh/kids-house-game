// Bubble flights stay outside her head box on every frame, not only at the start.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { headBox, pathMissesHead, showerSuds, sudRect, tubSuds, type Box, type Rect, type Sud } from '../src/suds';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => {
  assert.equal(ok, true, extra ? name + ' — ' + extra : name);
  pass++;
  console.log('PASS', name);
};

function kidAt(x: number, y: number, scale = 1): Box {
  const w = 120 * scale, h = 192 * scale;
  return { l: x - w / 2, t: y - h, w, h };
}

const tub: Box = { l: 850, t: 390, w: 220, h: 140 };
const shower: Box = { l: 1400, t: 210, w: 116, h: 250 };

function fails(suds: Sud[], heads: Rect[]): string {
  for (let i = 0; i < suds.length; i++) {
    for (let h = 0; h < heads.length; h++) {
      if (!pathMissesHead(suds[i], heads[h])) return 'proof ' + i + ' head ' + h;
      for (let s = 0; s <= 48; s++) {
        const b = sudRect(suds[i], s / 48);
        const head = heads[h];
        if (b.l < head.r && b.r > head.l && b.t < head.b && b.b > head.t) return 'sample ' + i + ' t ' + (s / 48);
      }
    }
  }
  return '';
}

function sides(suds: Sud[], head: Rect) {
  let left = 0, right = 0, water = 0, back = 0;
  const waterY = tub.t + tub.h * (80 / 140);
  const backY = tub.t + tub.h * (40 / 140);
  for (const sud of suds) {
    if (sud.x0 + sud.s / 2 <= head.l && sud.x1 < sud.x0) left++;
    if (sud.x0 - sud.s / 2 >= head.r && sud.x1 > sud.x0) right++;
    if (Math.abs(sud.y0 - waterY) < 0.5) water++;
    if (Math.abs(sud.y0 - backY) < 0.5) back++;
    if (sud.x1 === sud.x0) return 'no drift';
  }
  if (left < 2 || right < 2) return 'sides ' + left + '/' + right;
  if (water < 2 || back < 2) return 'bands ' + water + '/' + back;
  return '';
}

const centered = kidAt(980, 548);
const head = headBox(centered);
const blown = tubSuds(tub, [centered]);
check('a centered kid gets eight bubbles', blown.length === 8, String(blown.length));
check('those bubbles miss her head on every frame', fails(blown, [head]) === '', fails(blown, [head]));
check('they leave the water at her sides and the back rim, drifting out', sides(blown, head) === '', sides(blown, head));
check('bubble size stays put', blown.every(s => s.s === blown[0].s && s.s >= 16 && s.s <= 36));

const poses: Array<[string, Box]> = [
  ['left lip', kidAt(850, 548)],
  ['right lip', kidAt(1070, 548)],
  ['little', kidAt(980, 548, 0.78)],
  ['adult', kidAt(980, 548, 1.28)],
];
for (const [name, box] of poses) {
  const suds = tubSuds(tub, [box]);
  const h = headBox(box);
  check(name + ' stays clear and keeps both sides', suds.length >= 6 && fails(suds, [h]) === '' && sides(suds, h) === '', fails(suds, [h]) || sides(suds, h) || String(suds.length));
}

const toilet = kidAt(756, 552);
const pair = tubSuds(tub, [centered, toilet]);
const pairHeads = [headBox(centered), headBox(toilet)];
check('two kids stay clear, including the one by the toilet', pair.length >= 6 && fails(pair, pairHeads) === '' && sides(pair, head) === '', fails(pair, pairHeads) || sides(pair, head) || String(pair.length));

const alone = tubSuds(tub, []);
const mid = tub.l + tub.w / 2;
const aloneOk = alone.length === 8 && alone.every(s => {
  if (s.x0 + s.s / 2 <= mid) return s.x1 < s.x0;
  if (s.x0 - s.s / 2 >= mid) return s.x1 > s.x0;
  return false;
});
check('with nobody in the tub the bubbles still split and drift out', aloneOk, String(alone.length));

const stallKid = kidAt(1458, 460);
const rain = showerSuds(shower, [stallKid]);
check('shower bubbles miss the kid standing in the stall', rain.length >= 6 && fails(rain, [headBox(stallKid)]) === '', fails(rain, [headBox(stallKid)]) || String(rain.length));

const juice = readFileSync(new URL('../src/juice.css', import.meta.url), 'utf8');
const rise = juice.slice(juice.indexOf('@keyframes sudsRise'), juice.indexOf('@keyframes sudsRise') + 400);
const sudsCss = juice.slice(juice.indexOf('.suds {'), juice.indexOf('/* Name tags'));
check('the flight is a straight translate and nothing else',
  /0% \{ transform: translate\(0px, 0px\);/.test(rise) && /100% \{ transform: translate\(var\(--dx\), var\(--dy\)\);/.test(rise) && !/sudsFront|translateY|scale\(/.test(sudsCss));
check('reduced motion leaves the bubbles where they spawned', /prefers-reduced-motion:\s*reduce[\s\S]*\.suds i \{[^}]*transform:\s*none/.test(juice));
const main = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8');
check('bubbles paint just in front of the tub', /sudsZ\(/.test(main) && !/7200/.test(main));

console.log(pass + ' passed');
