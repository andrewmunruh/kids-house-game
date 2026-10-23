// Sit and lie. Pure rules, save migration, and the Worker. Never talks to production.
import { Neighborhood, type KV, type Conn } from '../server/core';
import { characterSVG } from '../src/character';
import { chibiSVG } from '../src/avatar/draw';
import { SIT_POSE } from '../src/avatar/sit';
import { fillLook2 } from '../src/shared/avatar';
import { NICKNAMES, PROTOCOL, cleanAction, cleanHouseState, cleanPresence } from '../src/shared/hood';
import { ensureRooms, initialState, migrate, newCharacter, reduce, type Character, type GameState } from '../src/shared/state';
import { anchorsOf, bedArt, dollAnchorOffset, furnitureClearsSeat, inLieRect, lieBedKinds, lieOffset, lieSpot, pieceWidth, resolveDrop, seatFractions, standBeside, STAND_Y, type SeatPiece } from '../src/shared/sit';
import { hOf, ITEM_MAP } from '../src/items';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + name, extra); if (ok) pass++; else process.exitCode = 1; };

const store = new Map<string, any>();
const kv: KV = {
  get: async k => store.has(k) ? JSON.parse(JSON.stringify(store.get(k))) : undefined,
  put: async (k, v) => { store.set(k, JSON.parse(JSON.stringify(v))); },
  delete: async k => { store.delete(k); },
};
type C = Conn & { inbox: any[]; last(t: string): any };
const mk = (): C => {
  const inbox: any[] = [];
  return { inbox, send(s: string) { inbox.push(JSON.parse(s)); }, close() {}, last(t: string) { return [...inbox].reverse().find(m => m.t === t); } } as any;
};
const look = { skin: '#f1c27d', hair: '#3b2219', hairStyle: 0, shirt: '#ff7aa8', pants: '#5b8def', size: 'kid' as const, acc: 0 };
const msg = (hood: Neighborhood, c: C, o: any) => { (c as any).budget = undefined; return hood.onMessage(c, JSON.stringify(o)); };

function piece(kind: string, id: string, x: number, footY: number, flip = false): SeatPiece {
  const spec = seatFractions(kind)!;
  const w = kind === 'bed' ? 300 : kind === 'chair' ? 100 : kind === 'bench' ? 220 : 260;
  const h = w;
  return { id, kind, x, footY, flip, scale: 1, w, h, ...{ pose: spec.pose } } as SeatPiece;
}

/** Pre-P1 migrate: newCharacter spreads extra fields, and nothing strips seat. */
function oldMigrate(raw: any): GameState {
  const base = initialState();
  const characters = (raw.characters || []).map((c: any, i: number) => newCharacter({ ...c, id: String(c.id ?? 'c' + (i + 1)), held: { left: null, right: null } }));
  return ensureRooms({ ...base, ...raw, version: 3, characters, rooms: { ...base.rooms, ...raw.rooms } });
}
/** Pre-P1 cleanHouseState rebuilt a character from known fields, so seat was dropped. */
function oldClean(raw: any) {
  const characters = (raw.characters || []).map((c: any) => {
    const ch = newCharacter({ skin: c.skin, hair: c.hair, hairStyle: c.hairStyle, shirt: c.shirt, pants: c.pants, size: c.size, acc: c.acc, id: c.id, room: c.room, x: c.x, y: c.y, flip: c.flip, held: { left: null, right: null } });
    return ch;
  });
  return { characters };
}
/** Pre-P1 char/move copied x and y and did not read seat. */
function oldMove(c: Character, a: { room: Character['room']; x: number; y: number; seat?: unknown }): Character {
  return { ...c, room: a.room, x: a.x, y: a.y };
}

const SIZES = [[820, 1180], [1180, 820], [1024, 768], [390, 844], [375, 667], [430, 932], [844, 390]];

async function main() {
  check('protocol stays 4', PROTOCOL === 4);
  check('save version stays 3', initialState().version === 3);
  check('a standing kid has no seat key', !Object.prototype.hasOwnProperty.call(initialState().characters[0], 'seat') && !JSON.stringify(initialState().characters[0]).includes('"seat"'));

  const fresh = initialState();
  const blob = JSON.parse(JSON.stringify(fresh));
  blob.characters.push({ ...blob.characters[0], id: 'c2', x: 400, y: 520, seat: { item: 'missing-chair', pose: 'sit', n: 0 } });
  blob.characters[0] = { ...blob.characters[0], seat: { item: 'sofa-1', pose: 'sit', n: 1 } };
  const loaded = migrate(blob);
  check('a version-3 save with no seat loads unchanged', JSON.stringify(migrate(fresh).characters[0]) === JSON.stringify(fresh.characters[0]) && migrate(fresh).version === 3);
  check('a seat on a second doll is kept and version stays 3', loaded.version === 3 && loaded.characters[1].id === 'c2' && loaded.characters[0].seat?.item === 'sofa-1' && loaded.characters[0].seat?.n === 1 && loaded.characters[0].seat?.pose === 'sit');
  check('a missing item clears that seat', !loaded.characters[1].seat && !JSON.stringify(loaded.characters[1]).includes('"seat"'));
  const stood = reduce(loaded, { type: 'char/move', id: 'c1', room: 'living', x: loaded.characters[0].x, y: loaded.characters[0].y, seat: null });
  check('standing clears the key', !('seat' in stood.characters[0]) && !JSON.stringify(stood.characters[0]).includes('"seat"'));

  const oldKept = oldMigrate(blob);
  check('old migrate keeps seat and does not throw', oldKept.characters[0].seat?.item === 'sofa-1' && oldKept.characters[1].seat?.item === 'missing-chair');
  const oldDropped = oldClean(blob);
  check('old cleanHouseState drops seat', oldDropped.characters.every((c: Character) => !c.seat));
  const movedOld = oldMove(loaded.characters[0], { room: 'living', x: 12, y: 340, seat: null });
  check('an old char/move only copies x and y', movedOld.x === 12 && movedOld.y === 340 && movedOld.seat?.item === 'sofa-1');
  const keptByNew = reduce(loaded, { type: 'char/move', id: 'c1', room: 'living', x: 12, y: 340 });
  check('a new char/move with no seat field keeps her seated', keptByNew.characters[0].x === 12 && keptByNew.characters[0].seat?.item === 'sofa-1');

  const cleaned = cleanHouseState(blob);
  check('cleanHouseState keeps a real seat and drops a dangling one', cleaned.characters[0].seat?.item === 'sofa-1' && !cleaned.characters.find(c => c.id === 'c2')!.seat);
  check('cleanHouseState of a standing house has no seat key', !JSON.stringify(cleanHouseState(fresh).characters[0]).includes('"seat"'));

  const sofa = piece('sofa', 'sofa-1', 800, 560);
  const chair = piece('chair', 'chair-1', 400, 560);
  const bed = piece('bed', 'bed-1', 500, 560);
  const sofaAnchors = anchorsOf(sofa);
  check('a sofa has two sit anchors', sofaAnchors.length === 2 && sofaAnchors[0].n === 0 && sofaAnchors[1].n === 1 && sofaAnchors[0].pose === 'sit' && Math.abs(sofaAnchors[0].x - (800 - 0.18 * 260)) < 0.01 && Math.abs(sofaAnchors[0].y - (560 - 0.33 * 260)) < 0.01);
  const flipped = anchorsOf({ ...sofa, flip: true });
  check('a flip mirrors the sofa anchors', Math.abs(flipped[0].x - (800 + 0.18 * 260)) < 0.01 && flipped[0].n === 0);
  const bedHead = lieSpot('bed', 300, 300, 'head', false)!;
  const bedAnchor = anchorsOf(bed)[0];
  check('a chair and a bed have one anchor', anchorsOf(chair).length === 1 && anchorsOf(chair)[0].pose === 'sit' && anchorsOf(bed).length === 1 && bedAnchor.pose === 'lie' && Math.abs(bedAnchor.x + lieOffset('head', false).x - (500 - 150 + bedHead.x * 300)) < 0.05);
  const chest = (pose: 'sit' | 'lie' | null, flip: boolean, scale: number) => dollAnchorOffset(60, 126, pose, flip, scale);
  const kidChest = chest(null, false, 1), grown = chest(null, false, 1.28), seated = chest('sit', false, 1);
  const flat = chest('lie', false, 1), flatFlip = chest('lie', true, 1), flatLittle = chest('lie', false, 0.78);
  check('the cradle anchor sits on the chest and scales with the doll', Math.abs(kidChest.x) < 0.01 && Math.abs(kidChest.y - -66) < 0.01 && Math.abs(grown.y - -66 * 1.28) < 0.01 && Math.abs(grown.x) < 0.01);
  check('sitting drops the cradle with the 26% pose', Math.abs(seated.y - (-66 + 0.26 * 192)) < 0.01 && Math.abs(seated.x) < 0.01);
  check('lying uses the mattress turn, and a flipped bed mirrors at kid size', Math.abs(flat.x - -24.24) < 0.05 && Math.abs(flat.y - -65.76) < 0.05 && Math.abs(flatFlip.x - 24.24) < 0.05 && Math.abs(flatFlip.y - flat.y) < 0.05 && Math.abs(flatLittle.x - flat.x * 0.78) < 0.05);
  check('crib, high chair, and pet beds are not seats', !seatFractions('crib') && !seatFractions('high-chair') && !seatFractions('cat-bed') && !seatFractions('pet-bed') && !seatFractions('dog-bed') && !seatFractions('tulip-bed') && !seatFractions('bedtime-snack'));
  check('a bunk lies on one anchor', seatFractions('bunk-bed')?.pose === 'lie' && seatFractions('bunk-bed')?.spots.length === 1);
  check('a daybed lies down', seatFractions('pack:cc-canopy-daybed')?.pose === 'lie');
  check('the winter bed lies down and the window seat and ottoman sit', seatFractions('pack:wc-plaid-bed')?.pose === 'lie' && seatFractions('pack:wc-window-seat')?.spots.length === 2 && seatFractions('pack:wc-mitten-ottoman')?.spots.length === 1 && seatFractions('pack:wc-plaid-sofa')?.spots.length === 2 && seatFractions('pack:wc-knit-armchair')?.spots.length === 1 && seatFractions('pack:wc-penguin-chair')?.pose === 'sit' && seatFractions('pack:wc-log-bench')?.spots.length === 2);
  for (const kind of lieBedKinds()) {
    const def = ITEM_MAP[kind];
    const art = bedArt(kind)!;
    const w = def.w, h = hOf(def);
    for (const flip of [false, true]) {
      const mirror = (r: { x: number; y: number; w: number; h: number }) => flip ? { x: 1 - (r.x + r.w), y: r.y, w: r.w, h: r.h } : r;
      const head = lieSpot(kind, w, h, 'head', flip)!;
      const classic = lieSpot(kind, w, h, 'classic', flip)!;
      const chest = lieSpot(kind, w, h, 'chest', flip)!;
      const hip = lieSpot(kind, w, h, 'hip', flip)!;
      const tag = kind + (flip ? ' flip' : '');
      check(tag + ' head is on the pillow', inLieRect(head, mirror(art.pillow)) && inLieRect(classic, mirror(art.pillow)), JSON.stringify({ head, classic }));
      check(tag + ' body is on the mattress', inLieRect(chest, mirror(art.mattress)) && inLieRect(hip, mirror(art.mattress)), JSON.stringify({ chest, hip }));
      if (flip) check(tag + ' mirrors the pillow', Math.abs(head.x - (1 - art.head.x)) < 0.002 && Math.abs(head.y - art.head.y) < 0.002);
    }
  }
  for (const [w, h] of SIZES) {
    const a = anchorsOf(chair);
    check(`anchors stay in room space at ${w}x${h}`, a[0].x === anchorsOf(chair)[0].x && a[0].y === anchorsOf(chair)[0].y);
  }

  const onChair = resolveDrop({ mode: 'play', via: 'drag', releaseX: 410, releaseY: 500, piece: chair, occupied: [] });
  check('play drop on a chair sits', onChair.seat?.item === 'chair-1' && onChair.seat?.pose === 'sit' && onChair.seat?.n === 0 && onChair.x === anchorsOf(chair)[0].x);
  const onBed = resolveDrop({ mode: 'play', via: 'drag', releaseX: 480, releaseY: 500, piece: bed, occupied: [] });
  check('play drop on a bed lies', onBed.seat?.pose === 'lie' && onBed.seat?.item === 'bed-1');
  const second = resolveDrop({ mode: 'play', via: 'drag', releaseX: sofaAnchors[1].x, releaseY: sofaAnchors[1].y, piece: sofa, occupied: [{ item: 'sofa-1', n: 0 }] });
  check('the second sofa sitter takes the free anchor', second.seat?.n === 1 && second.seat?.pose === 'sit');
  const full = resolveDrop({ mode: 'play', via: 'drag', releaseX: 20, releaseY: 30, piece: sofa, occupied: [{ item: 'sofa-1', n: 0 }, { item: 'sofa-1', n: 1 }] });
  check('a full sofa drops her standing at the release point', full.seat === null && full.x === 20 && full.y === 30 && full.toast === null);
  const takenTap = resolveDrop({ mode: 'play', via: 'tap', releaseX: 1, releaseY: 2, piece: chair, occupied: [{ item: 'chair-1', n: 0 }] });
  check('a tap on a full chair toasts and does not move her', takenTap.toast === 'Someone is already there!' && takenTap.moved === false);
  const off = resolveDrop({ mode: 'play', via: 'drag', releaseX: 15, releaseY: 25, piece: null, occupied: [] });
  check('a drag off the piece stands her', off.seat === null && off.x === 15 && off.y === 25);
  const deco = resolveDrop({ mode: 'decorate', via: 'drag', releaseX: 15, releaseY: 25, piece: chair, occupied: [] });
  check('decorate does not sit', deco.seat === null && deco.x === 15 && deco.y === 25 && deco.toast === null);
  const again = resolveDrop({ mode: 'play', via: 'tap', releaseX: 1, releaseY: 2, piece: chair, occupied: [], alreadyOn: 'chair-1' });
  check('a second tap stands her at the piece', again.seat === null && again.x === chair.x && again.y === chair.footY);
  check('furniture edits stand her only past a real move', furnitureClearsSeat('move', 6) === false && furnitureClearsSeat('move', 7) === true && furnitureClearsSeat('flip', 0) && furnitureClearsSeat('delete', 0) && furnitureClearsSeat('hold', 0) && !furnitureClearsSeat('front', 99) && !furnitureClearsSeat('tap', 0));

  let s = initialState();
  s = reduce(s, { type: 'char/add', char: newCharacter({ id: 'c2', room: 'living', x: 200, y: 520 }) });
  s = reduce(s, { type: 'char/move', id: 'c2', room: 'living', x: onChair.x, y: onChair.y, seat: { item: 'sofa-1', pose: 'sit', n: 0 } });
  check('a non-active doll stores sit', s.characters.find(c => c.id === 'c2')!.seat?.pose === 'sit' && s.characters[0].id !== 'c2');
  const anchor = { x: s.characters.find(c => c.id === 'c2')!.x, y: s.characters.find(c => c.id === 'c2')!.y };
  const nudged = reduce(s, { type: 'item/move', room: 'living', id: 'sofa-1', x: s.rooms.living.items.find(i => i.id === 'sofa-1')!.x + 4, y: s.rooms.living.items.find(i => i.id === 'sofa-1')!.y });
  check('a tap under 6px leaves her seated', nudged.characters.find(c => c.id === 'c2')!.seat?.item === 'sofa-1');
  const sofaItem = s.rooms.living.items.find(i => i.id === 'sofa-1')!;
  const besideSofa = standBeside(sofaItem.x, pieceWidth('sofa') * sofaItem.scale, anchor.x);
  const shifted = reduce(s, { type: 'item/move', room: 'living', id: 'sofa-1', x: 900, y: 500, stand: true });
  const stoodDoll = shifted.characters.find(c => c.id === 'c2')!;
  check('moving the piece stands her on the floor beside where it was', !stoodDoll.seat && stoodDoll.x === besideSofa.x && stoodDoll.y === STAND_Y && stoodDoll.x !== 900 && Math.abs(stoodDoll.x - sofaItem.x) > pieceWidth('sofa') / 2 && shifted.rooms.living.items.find(i => i.id === 'sofa-1')!.x === 900);
  const flippedSeat = reduce(s, { type: 'item/flip', room: 'living', id: 'sofa-1' });
  const flippedDoll = flippedSeat.characters.find(c => c.id === 'c2')!;
  check('flipping stands her on the floor beside the sofa', !flippedDoll.seat && flippedDoll.x === besideSofa.x && flippedDoll.y === STAND_Y);
  const front = reduce(s, { type: 'item/front', room: 'living', id: 'sofa-1' });
  check('item/front leaves her seated', front.characters.find(c => c.id === 'c2')!.seat?.n === 0);
  const held = reduce(s, { type: 'char/hold', id: 'c1', hand: 'left', room: 'living', itemId: 'sofa-1' });
  const heldDoll = held.characters.find(c => c.id === 'c2')!;
  check('holding the piece stands her on the floor', !heldDoll.seat && heldDoll.y === STAND_Y && heldDoll.x === besideSofa.x && held.characters.find(c => c.id === 'c1')!.held.left?.id === 'sofa-1');
  const gone = reduce(s, { type: 'item/delete', room: 'living', id: 'sofa-1' });
  const goneDoll = gone.characters.find(c => c.id === 'c2')!;
  check('deleting the piece stands her on the floor', !goneDoll.seat && goneDoll.y === STAND_Y && goneDoll.x === besideSofa.x && !gone.rooms.living.items.some(i => i.id === 'sofa-1'));
  const bedItem = s.rooms.bedroom.items.find(i => i.id === 'bed-1')!;
  const onBedDoll = reduce(s, { type: 'char/move', id: 'c2', room: 'bedroom', x: bedItem.x - 40, y: 470, seat: { item: 'bed-1', pose: 'lie', n: 0 } });
  const bedSpot = standBeside(bedItem.x, pieceWidth('bed'), bedItem.x - 40);
  const bedMoved = reduce(onBedDoll, { type: 'item/move', room: 'bedroom', id: 'bed-1', x: bedItem.x + 80, y: bedItem.y, stand: true });
  const bedStood = bedMoved.characters.find(c => c.id === 'c2')!;
  check('moving a bed stands her on the floor beside the old bed', !bedStood.seat && bedStood.y === STAND_Y && bedStood.x === bedSpot.x && bedStood.x !== bedItem.x + 80);
  const bedFlip = reduce(onBedDoll, { type: 'item/flip', room: 'bedroom', id: 'bed-1' });
  const bedFlipped = bedFlip.characters.find(c => c.id === 'c2')!;
  check('flipping a bed stands her on the floor beside it', !bedFlipped.seat && bedFlipped.y === STAND_Y && bedFlipped.x === bedSpot.x);
  const chairItem = s.rooms.kitchen.items.find(i => i.kind === 'chair')!;
  const onKitchen = reduce(s, { type: 'char/move', id: 'c2', room: 'kitchen', x: chairItem.x, y: 500, seat: { item: chairItem.id, pose: 'sit', n: 0 } });
  const chairSpot = standBeside(chairItem.x, pieceWidth('chair'), chairItem.x);
  const chairMoved = reduce(onKitchen, { type: 'item/move', room: 'kitchen', id: chairItem.id, x: chairItem.x + 100, y: chairItem.y, stand: true });
  const chairStood = chairMoved.characters.find(c => c.id === 'c2')!;
  check('moving a chair stands her on the floor beside it', !chairStood.seat && chairStood.y === STAND_Y && chairStood.x === chairSpot.x && Math.abs(chairStood.x - chairItem.x) > pieceWidth('chair') / 2);
  const wall = standBeside(2360, 300, 2360);
  check('a bed against the wall stands her on the open side', wall.x < 2360 - 150 && wall.y === STAND_Y);
  const tab = reduce(s, { type: 'char/move', id: 'c2', room: 'bedroom', x: anchor.x, y: anchor.y, seat: null });
  check('a room-tab drop clears seat', tab.characters.find(c => c.id === 'c2')!.room === 'bedroom' && !tab.characters.find(c => c.id === 'c2')!.seat);

  const classic = characterSVG(look);
  const classicSit = characterSVG(look, 'sit');
  const classicLie = characterSVG(look, 'lie');
  check('classic standing svg has no pose', classic.indexOf('data-pose') < 0 && classic.indexOf('data-chibi') < 0);
  check('a classic doll gets a bent-leg sit', classicSit.indexOf('data-pose="sit"') >= 0 && classicSit.indexOf('rotate(-68') >= 0);
  check('a classic doll lies with closed eyes and one turn', classicLie.indexOf('data-pose="lie"') >= 0 && classicLie.indexOf('rotate(-78') < 0 && classicLie.indexOf('data-dollhead') >= 0 && classicLie.indexOf('Q40 52') >= 0);
  const chibiLook = fillLook2({ v: 1, hair: 'braids', dress: 'party', dressC: '#f4a3c8', acc: ['bow'], bottom: 'skirt' });
  const standing = chibiSVG(chibiLook, { rich: true, uid: 'st' });
  const sitting = chibiSVG(chibiLook, { rich: true, uid: 'si', pose: SIT_POSE, poseName: 'sit' });
  const lying = chibiSVG(chibiLook, { rich: true, uid: 'ly', poseName: 'lie' });
  const order = ['hair-back', 'body', 'face', 'hair-front'];
  const at = (svg: string, name: string) => svg.indexOf(`data-layer="${name}"`);
  check('hair, hat, and clothes keep their order', order.every((n, i) => at(sitting, n) > (i ? at(sitting, order[i - 1]) : -1)) && sitting.indexOf('data-pose="sit"') >= 0 && standing.indexOf('data-pose') < 0);
  const legAt = sitting.indexOf('class="leg ');
  const skirtAt = sitting.indexOf('class="skirt"');
  check('a skirt does not ride inside a leg', legAt >= 0 && skirtAt > legAt && sitting.slice(legAt, skirtAt).indexOf('</g>') >= 0);
  check('lie draws sleepy eyes for that frame', lying.indexOf('data-pose="lie"') >= 0 && lying.split('fill="var(--skin)"').length > standing.split('fill="var(--skin)"').length);

  const hood = new Neighborhood(kv, { flushMs: 5 });
  await hood.init('SITTEST');
  const A = mk();
  await hood.onConnect(A);
  await msg(hood, A, { t: 'join', nickname: NICKNAMES[0], look, v: PROTOCOL, pet: 1, mail: 1, sit: 1 });
  const pidA = A.last('joined').pid as string;
  const hidA = A.last('welcome').houses.find((h: { ownerId: string }) => h.ownerId === pidA).id as string;
  check('welcome tells a sit client', A.last('welcome').sit === 1);
  const B = mk();
  await hood.onConnect(B);
  await msg(hood, B, { t: 'join', nickname: NICKNAMES[1], look, v: PROTOCOL, pet: 1, mail: 1, sit: 1 });
  const pidB = B.last('joined').pid as string;
  const C = mk();
  await hood.onConnect(C);
  await msg(hood, C, { t: 'join', nickname: NICKNAMES[2], look, v: PROTOCOL, pet: 1, mail: 1 });
  check('an old client house has no seat to draw', !JSON.stringify(C.last('welcome').houses.find((h: { id: string }) => h.id === hidA).state.characters).includes('"seat"'));

  await msg(hood, A, { t: 'act', houseId: hidA, cid: 1, action: { type: 'item/add', room: 'living', item: { id: 'chair-a', kind: 'chair', x: 700, y: 560, flip: false, z: 3, scale: 1 } } });
  await msg(hood, A, { t: 'act', houseId: hidA, cid: 2, action: { type: 'item/add', room: 'living', item: { id: 'sofa-a', kind: 'sofa', x: 1100, y: 560, flip: false, z: 4, scale: 1 } } });
  await msg(hood, A, { t: 'act', houseId: hidA, cid: 3, action: { type: 'item/add', room: 'bedroom', item: { id: 'bed-a', kind: 'bed', x: 900, y: 560, flip: false, z: 4, scale: 1 } } });
  const presA = { where: 'house', houseId: hidA, room: 'living', x: 700, y: 512, flip: false, seat: { id: 'chair-a', pose: 'sit', n: 0 } };
  await msg(hood, A, { t: 'pres', p: presA });
  const beforeA = JSON.stringify(hood.presence.get(pidA));
  const beforeB = hood.presence.get(pidB);
  await msg(hood, B, { t: 'pres', pid: pidA, p: { where: 'house', houseId: hidA, room: 'living', x: 10, y: 80, flip: true, seat: { id: 'chair-a', pose: 'lie', n: 0 } } });
  check('a forged pres for another girl is rejected', JSON.stringify(hood.presence.get(pidA)) === beforeA && hood.presence.get(pidB) === beforeB);
  const doll = hood.houses.get(hidA)!.state.characters[0];
  const dollBefore = JSON.stringify(hood.houses.get(hidA)!.state.characters);
  await msg(hood, B, { t: 'act', houseId: hidA, cid: 9, action: { type: 'char/move', id: pidA, room: 'living', x: 40, y: 400, seat: { item: 'chair-a', pose: 'sit', n: 0 } } });
  check('a forged move of another girl is notyours', B.last('nack')?.reason === 'notyours' && JSON.stringify(hood.presence.get(pidA)) === beforeA && JSON.stringify(hood.houses.get(hidA)!.state.characters) === dollBefore);
  await msg(hood, B, { t: 'pres', p: { where: 'house', houseId: hidA, room: 'living', x: 1147, y: 474, flip: false, seat: { id: 'sofa-a', pose: 'sit', n: 1 } } });
  check('her own pres seats her and leaves the other girl seated', hood.presence.get(pidB)?.seat?.n === 1 && JSON.stringify(hood.presence.get(pidA)) === beforeA);
  await msg(hood, B, { t: 'act', houseId: hidA, cid: 10, action: { type: 'char/move', id: doll.id, room: 'living', x: 1140, y: 470, seat: { item: 'sofa-a', pose: 'sit', n: 0 } } });
  check('a visitor cannot seat a doll', B.last('nack')?.reason === 'notyours' && !hood.houses.get(hidA)!.state.characters.find(c => c.id === doll.id)!.seat);
  await msg(hood, B, { t: 'act', houseId: hidA, cid: 11, action: { type: 'char/move', id: doll.id, room: 'living', x: 640, y: 520 } });
  const placed = hood.houses.get(hidA)!.state.characters.find(c => c.id === doll.id)!;
  check('a visitor can still place a doll without a seat', placed.x === 640 && placed.y === 520 && !placed.seat && JSON.stringify(hood.presence.get(pidA)) === beforeA);

  B.inbox.length = 0; C.inbox.length = 0;
  await msg(hood, A, { t: 'act', houseId: hidA, cid: 4, action: { type: 'char/move', id: doll.id, room: 'bedroom', x: 876, y: 470, seat: { item: 'bed-a', pose: 'lie', n: 0 } } });
  const bAct = B.last('act');
  const cAct = C.last('act');
  check('a sit client sees the doll lying', bAct?.action?.seat?.pose === 'lie' && hood.houses.get(hidA)!.state.characters.find(c => c.id === doll.id)!.seat?.pose === 'lie');
  check('an old client gets the move without seat', cAct?.action?.type === 'char/move' && !('seat' in cAct.action) && cAct.action.x === 876);
  const ownerSeat = A.inbox.filter(m => m.t === 'act' && m.action?.type === 'char/move').pop();
  check('no unknown action is broadcast', A.inbox.filter(m => m.t === 'act').every(m => typeof m.action?.type === 'string' && !String(m.action.type).startsWith('char/seat')) && ownerSeat.action.seat.pose === 'lie');
  await hood.flush();
  const disk = JSON.parse(JSON.stringify(store.get('house:' + hidA)));
  const hood2 = new Neighborhood(kv, { flushMs: 5 });
  await hood2.load();
  const reloaded = hood2.houses.get(hidA)!.state.characters.find(c => c.id === doll.id)!;
  check('reload keeps the doll lying', reloaded.seat?.item === 'bed-a' && reloaded.seat?.pose === 'lie' && disk.state.characters.find((c: Character) => c.id === doll.id).seat.pose === 'lie');

  await msg(hood, A, { t: 'act', houseId: hidA, cid: 5, action: { type: 'char/move', id: doll.id, room: 'living', x: 700, y: 512, seat: { item: 'chair-a', pose: 'sit', n: 0 } } });
  const sat = hood.houses.get(hidA)!.state.characters.find(c => c.id === doll.id)!;
  await msg(hood, A, { t: 'act', houseId: hidA, cid: 6, action: { type: 'item/move', room: 'living', id: 'chair-a', x: 760, y: 560, stand: true } });
  const afterMove = hood.houses.get(hidA)!.state.characters.find(c => c.id === doll.id)!;
  const chairSpotServer = standBeside(700, pieceWidth('chair'), 700);
  const presAfter = hood.presence.get(pidA);
  check('the server stands the seated player on the floor when the chair moves', !presAfter?.seat && presAfter?.x === chairSpotServer.x && presAfter?.y === STAND_Y && !afterMove.seat && afterMove.x === sat.x && afterMove.y === sat.y);
  await msg(hood, A, { t: 'act', houseId: hidA, cid: 13, action: { type: 'char/move', id: doll.id, room: 'living', x: 1100, y: 480, seat: { item: 'sofa-a', pose: 'sit', n: 0 } } });
  const sofaSat = hood.houses.get(hidA)!.state.characters.find(c => c.id === doll.id)!;
  await msg(hood, A, { t: 'act', houseId: hidA, cid: 14, action: { type: 'item/move', room: 'living', id: 'sofa-a', x: 1400, y: 560, stand: true } });
  const sofaAfter = hood.houses.get(hidA)!.state.characters.find(c => c.id === doll.id)!;
  const sofaSpot = standBeside(1100, pieceWidth('sofa'), sofaSat.x);
  check('the server stands a doll on the floor when the sofa moves', sofaSat.seat?.item === 'sofa-a' && !sofaAfter.seat && sofaAfter.x === sofaSpot.x && sofaAfter.y === STAND_Y && sofaAfter.x !== 1400);
  await msg(hood, A, { t: 'pres', p: { where: 'house', houseId: hidA, room: 'bedroom', x: 860, y: 470, flip: false, seat: { id: 'bed-a', pose: 'lie', n: 0 } } });
  await msg(hood, A, { t: 'act', houseId: hidA, cid: 12, action: { type: 'item/flip', room: 'bedroom', id: 'bed-a' } });
  const bedFloor = standBeside(900, pieceWidth('bed'), 860);
  check('the server stands her on the floor when the bed flips', !hood.presence.get(pidA)?.seat && hood.presence.get(pidA)?.x === bedFloor.x && hood.presence.get(pidA)?.y === STAND_Y);
  check('an old client does not see stand', C.inbox.filter(m => m.t === 'act' && m.action?.type === 'item/move').pop().action.stand === undefined);
  await msg(hood, A, { t: 'act', houseId: hidA, cid: 7, action: { type: 'char/move', id: doll.id, room: 'living', x: sat.x, y: sat.y, seat: { item: 'chair-a', pose: 'sit', n: 0 } } });
  await msg(hood, A, { t: 'act', houseId: hidA, cid: 8, action: { type: 'item/front', room: 'living', id: 'chair-a' } });
  check('front leaves the doll seated', hood.houses.get(hidA)!.state.characters.find(c => c.id === doll.id)!.seat?.pose === 'sit');
  await msg(hood, A, { t: 'pres', p: { where: 'house', houseId: hidA, room: 'living', x: sat.x, y: sat.y, flip: false, seat: { id: 'chair-a', pose: 'sit', n: 0 } } });
  check('a player cannot take a seat a doll already has', !hood.presence.get(pidA)?.seat);
  await msg(hood, A, { t: 'pres', p: { where: 'house', houseId: hidA, room: 'living', x: 1100, y: 480, flip: false, seat: { id: 'sofa-a', pose: 'sit', n: 0 } } });
  check('a free seat still accepts her', hood.presence.get(pidA)?.seat?.id === 'sofa-a' && hood.presence.get(pidA)?.seat?.n === 0);

  const bad = cleanPresence({ where: 'house', houseId: 'h', room: 'living', x: 1, y: 2, flip: false, seat: { id: 'nope', pose: 'fly', n: 3 } }, () => true, () => false);
  check('a bad seat is dropped and the presence still arrives', !!bad && bad.x === 1 && !bad.seat);
  const good = cleanPresence({ where: 'house', houseId: 'h', room: 'living', x: 3, y: 4, flip: false, seat: { id: 'chair-a', pose: 'sit', n: 0 } }, () => true, () => true);
  check('a real seat is kept on house presence', good?.seat?.id === 'chair-a' && good?.seat?.pose === 'sit');
  check('cleanAction keeps a lie seat and drops a bad one', cleanAction({ type: 'char/move', id: 'c1', room: 'bedroom', x: 10, y: 400, seat: { item: 'bed-a', pose: 'lie', n: 0 } })?.seat?.pose === 'lie');
  const stripped = cleanAction({ type: 'char/move', id: 'c1', room: 'living', x: 10, y: 400, seat: { item: '!!!', pose: 'sit', n: 0 } });
  check('a bad seat on char/move still moves her, standing', stripped?.type === 'char/move' && stripped.seat === null && stripped.x === 10);

  console.log(pass + ' passed');
}

main().catch(err => { console.error(err); process.exitCode = 1; });
