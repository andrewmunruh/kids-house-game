// look2 validation, legacy mapping, and the chibi size budget. Never talks to a server.
import { gzipSync } from 'node:zlib';
import { characterSVG } from '../src/character';
import { chibiSVG, handsOf, hemOf, poseFor } from '../src/avatar/draw';
import { chibiRideLeg } from '../src/avatar/ride';
import {
  sanitizeLook2, fillLook2, legacyFromLook2, look2FromLegacy, patchFromLook2, randomLook2, withRandomStarter,
  HAIR_IDS, EYE_IDS, ACC_IDS, accSlot, LOOK2_MAX,
} from '../src/shared/avatar';
import { applyLook, cleanHouseState, cleanLook, cleanLookPatch, cleanAction, PROTOCOL } from '../src/shared/hood';
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
check('a round eye keeps the kit sparkles, crescent, and gloss', svg.indexOf('data-iris="1"') >= 0 && svg.indexOf('opacity=".5"/>') >= 0 && svg.indexOf('M54 72') >= 0 && svg.indexOf('class="shadow"') >= 0);
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
check('a dress drapes the riding thigh', skirtRide.indexOf('#ffc2da') >= 0 && skirtRide.indexOf('#ffe0c4') >= 0 && skirtRide.indexOf('class="dress"') >= 0);
check('pants do not drape a skirt over the saddle', ride.indexOf('class="dress"') < 0);
function pathPairs(svg: string, cls: string): { xs: number[]; ys: number[] } {
  const m = svg.match(new RegExp('class="' + cls + '" d="([^"]+)"'));
  const n = m ? (m[1].match(/-?\d*\.?\d+/g) || []).map(Number) : [];
  const xs: number[] = [], ys: number[] = [];
  for (let i = 0; i + 1 < n.length; i += 2) { xs.push(n[i]); ys.push(n[i + 1]); }
  return { xs, ys };
}
const thigh = pathPairs(ride, 'thigh cloth');
const shin = pathPairs(ride, 'shin cloth');
const shoe = pathPairs(ride, 'shoe');
const dressRide = chibiRideLeg(fillLook2({ v: 1, dress: 'twirl', dressC: '#f4a3c8', skin: '#c68642', shoes: 'boots', shoesC: '#5a3d5c' }));
const drape = pathPairs(dressRide, 'dress');
const span = (ns: number[]) => Math.max(...ns) - Math.min(...ns);
check('the near leg is a short bend that stops mid-side',
  span(thigh.xs) > span(thigh.ys) && span(shin.ys) > span(shin.xs) && span(shin.ys) > 8
  && shoe.ys.length > 0 && Math.max(...shoe.ys) < 82 && Math.max(...shoe.ys) > 64);
check('the skirt drape stays hip-wide', drape.xs.length > 1 && span(drape.xs) < 22 && dressRide.indexOf('stroke-width="12"') < 0 && dressRide.indexOf('stroke-width="11"') < 0);

const ivy = chibiSVG(fillLook2({ v: 1, hair: 'pony', top: 'stripes', topC: '#ffffff', bottom: 'overalls', bottomC: '#ffd34e', shoes: 'boots', shoesC: '#ff9ec4', freckles: true }), { rich: true, uid: 'iv' });
const ivyBottom = (ivy.split('data-layer="bottom"')[1] || '').split('data-layer=')[0];
const ivyOver = (ivy.split('data-layer="bottom-over"')[1] || '').split('data-layer=')[0];
check('overalls are short shorts under a bib pocket', ivyBottom.indexOf('L139 264') >= 0 && ivyBottom.indexOf('292') < 0 && ivyOver.indexOf('M80 176 L72 164') >= 0 && ivyOver.indexOf('M88 190 H112 V206') >= 0);
check('a white tee uses mint stripes', ivy.indexOf('--top-trim:#8fdcc0') >= 0 && ivy.indexOf('fill="var(--top-trim)"') >= 0);
check('polka dots sit on the boots', ivy.indexOf('cy="272" r="2.6" fill="#fff"') >= 0);
const mayaTop = chibiSVG(fillLook2({ v: 1, top: 'hoodie', topC: '#c6a8f0', bottom: 'skirt' }), { rich: true, uid: 'hd' });
check('a hoodie keeps its strings and pocket', mayaTop.indexOf('M92 172 v18') >= 0 && mayaTop.indexOf('M78 202 H122') >= 0);
const lily = chibiSVG(fillLook2({ v: 1, dress: 'twirl', dressC: '#ffc2da', top: 'puff' }), { rich: true, uid: 'ly' });
check('a twirl dress prints hearts and puff sleeves', lily.indexOf('c-3 -5 -9 -1') >= 0 && lily.indexOf('class="skirt"') >= 0);
const classicTop = chibiSVG(fillLook2({ v: 1, top: 'classic', topC: '#ff7aa8' }), { rich: true, uid: 'ar' });
const arm = (classicTop.split('class="arm l"')[1] || '').split('</g>')[0];
check('forearms have no dark ghost patch and the tee is not a flat dot', arm.indexOf('opacity=".14"') < 0 && classicTop.indexOf('cy="188"') < 0 && classicTop.indexOf('url(#arc)') >= 0);

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
check('a legacy patch keeps look2 and the new shirt', state.characters[0].look2?.hair === 'puffs' && state.characters[0].shirt === '#80ed99' && !!shirtOnly && !('look2' in shirtOnly));
const classicPatch = cleanLookPatch({ look2: null, shirt: '#ffffff' });
const cleared = reduce(state, { type: 'char/update', id: 'c1', patch: classicPatch! });
check('an explicit look2 clears the chibi look', classicPatch?.look2 === null && cleared.characters[0].look2 === undefined && cleared.characters[0].shirt === '#ffffff');
const keptLook = applyLook({ ...legacy, look2: maya }, { ...legacy, shirt: '#80ed99' });
const classicLook = applyLook(keptLook, { ...legacy, look2: null });
check('a legacy player look keeps look2 and a classic look clears it', keptLook.look2?.hair === 'puffs' && keptLook.shirt === '#80ed99' && classicLook.look2 === undefined);
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

function quad(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, t: number): { x: number; y: number } {
  const u = 1 - t;
  return { x: u * u * x0 + 2 * u * t * x1 + t * t * x2, y: u * u * y0 + 2 * u * t * y1 + t * t * y2 };
}
function browHappy(d: string): boolean {
  const n = (d.match(/-?\d*\.?\d+/g) || []).map(Number);
  if (n.length < 6) return false;
  const a = { x: n[0], y: n[1] }, c = { x: n[2], y: n[3] }, b = { x: n[4], y: n[5] };
  const inner = a.x < 100 ? b : a, outer = a.x < 100 ? a : b;
  if (inner.y > outer.y + 0.4) return false;
  let peak = Math.min(a.y, b.y);
  for (let t = 0.15; t < 1; t += 0.1) peak = Math.min(peak, quad(a.x, a.y, c.x, c.y, b.x, b.y, t).y);
  return peak <= Math.min(inner.y, outer.y) - 1;
}
for (const eyes of EYE_IDS) {
  const face = chibiSVG(fillLook2({ v: 1, eyes, hair: 'short' }), { rich: true, uid: 'e' });
  const brows = face.match(/data-brow="[lr]" d="([^"]+)"/g) || [];
  const happy = brows.length === 2 && brows.every(tag => browHappy((tag.match(/d="([^"]+)"/) || [])[1] || ''));
  check('a ' + eyes + ' face has raised happy brows', happy, brows.join(' '));
}

interface Pt { x: number; y: number }
function samplePath(d: string): Pt[] {
  const tokens = d.match(/[MLHVQZ]|-?\d*\.?\d+/gi) || [];
  const pts: Pt[] = [];
  let i = 0, x = 0, y = 0, sx = 0, sy = 0;
  const num = () => parseFloat(tokens[i++]);
  while (i < tokens.length) {
    const cmd = tokens[i++];
    if (cmd === 'M' || cmd === 'L') { x = num(); y = num(); if (cmd === 'M') { sx = x; sy = y; } pts.push({ x, y }); }
    else if (cmd === 'H') { x = num(); pts.push({ x, y }); }
    else if (cmd === 'V') { y = num(); pts.push({ x, y }); }
    else if (cmd === 'Q') {
      const x1 = num(), y1 = num(), x2 = num(), y2 = num();
      for (let t = 0.1; t <= 1.001; t += 0.1) {
        const p = quad(x, y, x1, y1, x2, y2, Math.min(t, 1));
        pts.push(p);
      }
      x = x2; y = y2;
    } else if (cmd === 'Z' || cmd === 'z') { x = sx; y = sy; pts.push({ x, y }); }
  }
  return pts;
}
function attr(tag: string, name: string): string {
  const m = new RegExp('\\b' + name + '="([^"]*)"').exec(tag);
  return m ? m[1] : '';
}
function inPoly(p: Pt, poly: Pt[]): boolean {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i], b = poly[j];
    if (((a.y > p.y) !== (b.y > p.y)) && p.x < (b.x - a.x) * (p.y - a.y) / ((b.y - a.y) || 1e-9) + a.x) c = !c;
  }
  return c;
}
function distSeg(p: Pt, a: Pt, b: Pt): number {
  const dx = b.x - a.x, dy = b.y - a.y, l2 = dx * dx + dy * dy || 1e-9;
  let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}
const HATS = ACC_IDS.filter(id => accSlot(id) === 'hat');
let hatFail = '';
for (const hair of HAIR_IDS) {
  for (let h = 0; h < HATS.length && !hatFail; h++) {
    const hat = HATS[h];
    const svg = chibiSVG(fillLook2({ v: 1, hair, eyes: 'big', acc: [hat], accC: '#ffd166' }), { rich: false, uid: 'h' });
    const irises: { cx: number; cy: number; rx: number; ry: number }[] = [];
    const all = svg.match(/<ellipse\b[^>]*>/g) || [];
    for (let t = 0; t < all.length; t++) {
      if (all[t].indexOf('data-iris') < 0) continue;
      irises.push({ cx: +attr(all[t], 'cx'), cy: +attr(all[t], 'cy'), rx: +attr(all[t], 'rx'), ry: +attr(all[t], 'ry') });
    }
    const acc = (svg.split('data-layer="accessory">')[1] || '').split('</g>')[0];
    const tags = acc.match(/<(path|circle|ellipse)\b[^>]*>/g) || [];
    const eyes: Pt[] = [];
    for (let e = 0; e < irises.length; e++) {
      const ir = irises[e];
      eyes.push({ x: ir.cx, y: ir.cy });
      eyes.push({ x: ir.cx, y: ir.cy - ir.ry * 0.8 }, { x: ir.cx, y: ir.cy + ir.ry * 0.55 });
      eyes.push({ x: ir.cx - ir.rx * 0.7, y: ir.cy }, { x: ir.cx + ir.rx * 0.7, y: ir.cy });
    }
    for (let t = 0; t < tags.length && !hatFail; t++) {
      const tag = tags[t];
      const sw = parseFloat(attr(tag, 'stroke-width') || '0') || 0;
      const filled = attr(tag, 'fill') !== 'none';
      if (tag.indexOf('<circle') === 0 || tag.indexOf('<ellipse') === 0) {
        const cx = +attr(tag, 'cx'), cy = +attr(tag, 'cy');
        const rx = +(attr(tag, 'rx') || attr(tag, 'r')) + sw / 2;
        const ry = +(attr(tag, 'ry') || attr(tag, 'r')) + sw / 2;
        if (cx > 54 && cx < 146 && cy + ry > 77) hatFail = hair + ' ' + hat + ' circle';
        for (let p = 0; p < eyes.length; p++) {
          const dx = (eyes[p].x - cx) / rx, dy = (eyes[p].y - cy) / ry;
          if (dx * dx + dy * dy <= 1) hatFail = hair + ' ' + hat + ' covers an eye';
        }
      } else {
        const poly = samplePath(attr(tag, 'd'));
        for (let p = 0; p < poly.length; p++) {
          if (poly[p].x >= 54 && poly[p].x <= 146 && poly[p].y + sw / 2 > 77) hatFail = hair + ' ' + hat + ' dips to ' + poly[p].y.toFixed(1);
        }
        for (let p = 0; p < eyes.length && !hatFail; p++) {
          if (filled && inPoly(eyes[p], poly)) hatFail = hair + ' ' + hat + ' fill';
          for (let s = 1; s < poly.length && !hatFail; s++) {
            if (distSeg(eyes[p], poly[s - 1], poly[s]) <= sw / 2 + 0.8) hatFail = hair + ' ' + hat + ' stroke';
          }
        }
      }
    }
    if (irises.length < 2) hatFail = hair + ' ' + hat + ' missing eyes';
  }
}
check('every hat sits above the brow on every hairstyle', hatFail === '', hatFail + ' (' + HATS.length * HAIR_IDS.length + ' looks)');

console.log(pass + ' passed');
