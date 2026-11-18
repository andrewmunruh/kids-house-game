// B18 item 2: derived fridge open + table nibble. Never writes item.on. Clears when she leaves.
import { initialState, newCharacter, type GameState } from '../src/shared/state';
import { FRIDGE_RADIUS } from '../src/shared/ambient';
import { addTableNibbles, fridgeIsOpen, fridgeOnFlag, openFridges, tableNibbleFor } from '../src/eat-look';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++;
  else process.exitCode = 1;
};

const s0 = initialState();
const fridge = s0.rooms.kitchen.items.find(i => i.kind === 'fridge')!;
const table = s0.rooms.kitchen.items.find(i => i.kind === 'table')!;
const cake = s0.rooms.kitchen.items.find(i => i.kind === 'cake')!;
const chair = s0.rooms.kitchen.items.find(i => /chair/.test(i.kind))!;

check('fridge starts with no on flag', fridge.on === undefined && !fridgeOnFlag(s0.rooms.kitchen.items));
check('empty kitchen: fridge closed', !fridgeIsOpen(fridge, []) && openFridges(s0.rooms.kitchen.items, []).size === 0);

const at = { x: fridge.x + 40, y: fridge.y };
const away = { x: fridge.x + FRIDGE_RADIUS + 80, y: fridge.y };
check('doll at the fridge opens it', fridgeIsOpen(fridge, [at]) && openFridges([{ id: fridge.id, kind: 'fridge', x: fridge.x, y: fridge.y }], [at]).has(fridge.id));
check('doll who left closes it', !fridgeIsOpen(fridge, [away]) && openFridges([{ id: fridge.id, kind: 'fridge', x: fridge.x, y: fridge.y }], [away]).size === 0);

// "hold ends": after she walks away, even if we imagine a leftover local .opened, derived is closed.
check('reload with nobody there stays closed', openFridges(s0.rooms.kitchen.items, []).size === 0);

const seated: GameState = {
  ...s0,
  characters: [newCharacter({
    id: 'd1', room: 'kitchen', x: chair.x, y: chair.y,
    seat: { item: chair.id, pose: 'sit', n: 0 },
    held: { left: null, right: null },
  })],
};
check('seated at the table with cake on it nibbles', tableNibbleFor(seated, seated.characters[0])?.item === table.id);

const emptyHandsFar: GameState = {
  ...s0,
  characters: [newCharacter({
    id: 'd1', room: 'kitchen', x: 200, y: 540,
    held: { left: null, right: null },
  })],
};
check('far from the table does not nibble', tableNibbleFor(emptyHandsFar, emptyHandsFar.characters[0]) === null);

const holding: GameState = {
  ...s0,
  characters: [newCharacter({
    id: 'd1', room: 'kitchen', x: table.x + 40, y: table.y,
    held: { left: { ...cake, id: 'held-cake' }, right: null },
  })],
};
check('standing at the table holding food nibbles', tableNibbleFor(holding, holding.characters[0])?.item === table.id);

const dropped: GameState = {
  ...holding,
  characters: [newCharacter({
    id: 'd1', room: 'kitchen', x: table.x + 40, y: table.y,
    held: { left: null, right: null },
  })],
};
// cake is still on the table in starter state, and she is at the table but not seated — no nibble without a seat or a hold.
check('hold ends, standing, no seat: nibble stops', tableNibbleFor(dropped, dropped.characters[0]) === null);

const rx = new Map();
addTableNibbles(seated, [{ id: 'd1', x: chair.x, y: chair.y, seated: true }], rx);
check('addTableNibbles writes a nibble reaction', rx.get('d1')?.kind === 'nibble' && rx.get('d1')?.item === table.id);
rx.set('d1', { kind: 'dance', item: 'stereo-1', phase: 0, face: 1 });
addTableNibbles(seated, [{ id: 'd1', x: chair.x, y: chair.y, seated: true }], rx);
check('existing dance is not replaced by a nibble', rx.get('d1')?.kind === 'dance');

check('derived helpers never set item.on', !fridgeOnFlag(s0.rooms.kitchen.items));

console.log(`eat_look_test: ${pass} passed`);
