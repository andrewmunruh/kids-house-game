// Day/night clock and decorate undo. Neither one touches the save or the protocol.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SKY_KEY, isLightKind, skyLook } from '../src/sky';
import { DecorateUndo, UNDO_LIMIT, inverseDecorate } from '../src/decorate-undo';
import { initialState, reduce, type Action, type GameState } from '../src/shared/state';
import { PROTOCOL, cleanAction } from '../src/shared/hood';

let pass = 0;
const check = (name: string, ok: boolean) => { assert.equal(ok, true, name); pass++; console.log('PASS', name); };

const at = (h: number, min = 0) => new Date(2026, 5, 15, h, min, 0);

const noon = skyLook(at(12), 'auto');
check('noon is day with no veil', noon.phase === 'day' && noon.opacity === 0 && noon.glow === 0 && noon.stars === 0);
const night = skyLook(at(3), 'auto');
check('the middle of the night is cozy night', night.phase === 'night' && night.opacity > 0.45 && night.opacity < 0.58 && night.map > 0.4 && night.map < 0.55 && night.glow > 0.8 && night.stars > 0.8 && night.glass > 0.9);
const gold = skyLook(at(18, 10), 'auto');
check('early evening is golden', gold.phase === 'golden' && gold.glow > 0.4 && gold.opacity > 0 && gold.opacity < 0.3 && gold.glass > 0.5);
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

const stateSrc = readFileSync(new URL('../src/shared/state.ts', import.meta.url), 'utf8');
const hoodSrc = readFileSync(new URL('../src/shared/hood.ts', import.meta.url), 'utf8');
check('the sky key is new and not part of the save', SKY_KEY === 'cozy-sky' && !stateSrc.includes(SKY_KEY) && !stateSrc.includes('skyChoice') && !hoodSrc.includes(SKY_KEY));
check('protocol stays 4', PROTOCOL === 4);

function apply(s: GameState, list: Action[]): GameState {
  return list.reduce((cur, a) => reduce(cur, a), s);
}
const lamp = initialState().rooms.living.items.find(i => i.kind === 'lamp')!;
const undo = new DecorateUndo();
let s = initialState();
const x0 = lamp.x, y0 = lamp.y;
for (const dx of [12, 24, 40]) {
  const a: Action = { type: 'item/move', room: 'living', id: lamp.id, x: x0 + dx, y: y0 };
  undo.note(s, a);
  s = reduce(s, a);
}
let back = undo.take();
check('a drag is one undo', undo.depth === 0 && !!back && back.length === 1 && back[0].type === 'item/move' && back[0].type === 'item/move' && (back[0] as { x: number }).x === x0);
s = apply(s, back!);
check('undo puts the lamp back', s.rooms.living.items.find(i => i.id === lamp.id)!.x === x0);
check('the move is an ordinary edit', !!cleanAction(back![0]));

s = initialState();
const placed: Action[] = ['rug', 'lamp', 'plant', 'chair'].map((kind, i) => ({ type: 'item/add' as const, room: 'nursery' as const, item: { id: 'n' + i, kind, x: 400 + i, y: 500, flip: false, z: i, scale: 1 } }));
for (const a of placed) { undo.note(s, a); s = reduce(s, a); }
const undone = undo.take();
check('the first drop undoes as one step', !!undone && undone.length === 4 && undone.every(a => a.type === 'item/delete'));
s = apply(s, undone!);
check('undo removes the whole drop', s.rooms.nursery.items.every(i => !String(i.id).startsWith('n')));
check('each delete is an ordinary edit', undone!.every(a => !!cleanAction(a)));

s = initialState();
const bed = s.rooms.bedroom.items.find(i => i.kind === 'bed')!;
const flip: Action = { type: 'item/flip', room: 'bedroom', id: bed.id };
undo.note(s, flip);
s = reduce(s, flip);
const unflip = undo.take();
check('rotate undo flips back', !!unflip && unflip[0].type === 'item/flip' && !!cleanAction(unflip[0]));
s = apply(s, unflip!);
check('the bed faces the way it started', s.rooms.bedroom.items.find(i => i.id === bed.id)!.flip === false);

const wall0 = s.rooms.living.wallpaper;
for (let i = 0; i < 25; i++) {
  const a: Action = { type: 'room/wallpaper', room: 'living', color: i % 2 ? '#aabbcc' : '#112233' };
  undo.note(s, a);
  s = reduce(s, a);
}
check('the undo stack keeps at least 20 and drops the oldest', undo.depth === UNDO_LIMIT && UNDO_LIMIT >= 20);
for (let i = 0; i < 20; i++) s = apply(s, undo.take()!);
check('twenty color undos stay ordinary edits', s.rooms.living.wallpaper !== wall0 && undo.depth === UNDO_LIMIT - 20);

s = initialState();
const plant = s.rooms.living.items.find(i => i.kind === 'plant')!;
const del: Action = { type: 'item/delete', room: 'living', id: plant.id };
undo.note(s, del);
s = reduce(s, del);
const restored = undo.take();
check('delete undo is an ordinary add', !!restored && restored[0].type === 'item/add' && !!cleanAction(restored[0]));
s = apply(s, restored!);
check('the plant comes back', s.rooms.living.items.some(i => i.id === plant.id && i.kind === 'plant'));

const fresh = initialState();
const no = inverseDecorate(fresh, { type: 'char/move', id: 'c1', room: 'living', x: 10, y: 500 });
check('walking a kid is not an undo step', no === null);

console.log(pass + ' passed');
