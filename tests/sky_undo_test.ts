// Day/night clock. It does not touch the save or the protocol. Decorate has no undo.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SKY_KEY, isLightKind, skyLook } from '../src/sky';
import { PROTOCOL } from '../src/shared/hood';

let pass = 0;
const check = (name: string, ok: boolean) => { assert.equal(ok, true, name); pass++; console.log('PASS', name); };

const at = (h: number, min = 0) => new Date(2026, 5, 15, h, min, 0);

const noon = skyLook(at(12), 'auto');
check('noon is day with no veil', noon.phase === 'day' && noon.opacity === 0 && noon.glow === 0 && noon.stars === 0);
const night = skyLook(at(3), 'auto');
check('the middle of the night is cozy night', night.phase === 'night' && night.opacity > 0.62 && night.opacity < 0.78 && night.map > 0.7 && night.map < 0.88 && night.glow > 0.8 && night.stars > 0.8 && night.glass > 0.9 && night.tint === '#2a2350');
const gold = skyLook(at(18, 10), 'auto');
check('early evening is golden', gold.phase === 'golden' && gold.glow > 0.4 && gold.opacity >= 0.16 && gold.opacity <= 0.2 && gold.glass > 0.5 && gold.tint === '#ffb38a' && gold.opacity < night.opacity * 0.4);
const dawn = skyLook(at(6, 25), 'auto');
check('sunrise is dawn', dawn.phase === 'dawn' && dawn.opacity > 0 && dawn.opacity < night.opacity && dawn.glass > 0.4);

check('Day forces daylight at midnight', skyLook(at(0), 'day').phase === 'day' && skyLook(at(0), 'day').opacity === 0);
check('Night forces night at noon', skyLook(at(12), 'night').phase === 'night' && skyLook(at(12), 'night').stars === 1);

let prev = skyLook(at(0), 'auto').opacity;
let smooth = true;
for (let m = 10; m <= 24 * 60; m += 10) {
  const look = skyLook(at(0, m), 'auto');
  if (Math.abs(look.opacity - prev) > 0.12) smooth = false;
  prev = look.opacity;
}
check('the clock eases from one part of the day to the next', smooth);

check('lamps, windows, string lights, night-lights and the TV glow', isLightKind('lamp') && isLightKind('window') && isLightKind('tv') && isLightKind('pack:string-lights') && isLightKind('pack:moon-night-light') && isLightKind('pack:scent-candle', true));
check('a sofa is not a light', !isLightKind('sofa') && !isLightKind('pack:cloud-rug') && !isLightKind('pack:tv-stand'));
const ink = readFileSync(new URL('../src/sky-toggle.ts', import.meta.url), 'utf8');
check('night and golden ink wrap the whole item, so a raster painting dims too', /html\[data-sky="night"\] #layer > \.item:not\(\.is-light\) > \.inner/.test(ink) && /html\[data-sky="golden"\] #layer > \.item:not\(\.is-light\) > \.inner/.test(ink) && /filter: url\("#skyNightInk"\)/.test(ink));

const stateSrc = readFileSync(new URL('../src/shared/state.ts', import.meta.url), 'utf8');
const hoodSrc = readFileSync(new URL('../src/shared/hood.ts', import.meta.url), 'utf8');
check('the sky key is new and not part of the save', SKY_KEY === 'cozy-sky' && !stateSrc.includes(SKY_KEY) && !stateSrc.includes('skyChoice') && !hoodSrc.includes(SKY_KEY));
check('protocol stays 4', PROTOCOL === 4);
const client = ['main.ts', 'playmode.ts', 'sky-toggle.ts', 'sky.css', 'style.css', 'whatsnew.ts', 'items.ts'].map(f => readFileSync(new URL('../src/' + f, import.meta.url), 'utf8')).join('\n');
check('decorate has no undo button, stack, or shortcut', !/undoMount|decorateUndo|menuUndo|undoBtn|DecorateUndo|mountUndoButton|__undoDepth/.test(client) && !/\bUndo\b/.test(client) && !/KeyZ|ctrlKey|metaKey/.test(readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8')));
const skyCss = readFileSync(new URL('../src/sky.css', import.meta.url), 'utf8');
check('a painted window carries a night plate over the glass', /class="artnight"/.test(readFileSync(new URL('../src/items.ts', import.meta.url), 'utf8')) && /\.item \.artnight[\s\S]*opacity:\s*var\(--sky-glass\)/.test(skyCss) && /\.winNight \{\s*opacity:\s*var\(--sky-glass\)/.test(skyCss));

console.log(pass + ' passed');
