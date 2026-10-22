// In-world baby. The care card lives in the stage wrap, outside the scaled stage.
// The sprite is recreated when the room layer is wiped. Ease is one timer keyed by `since`.
import { loadArtKinds } from '../art/load';
import { rasterOn, rasterUrl } from '../art/cache';
import { toast } from '../hood-ui';
import { sfx } from '../sound';
import { cleanPetName } from '../shared/hood';
import { dollAnchorOffset, STAND_Y, type DollSeat, type SeatPiece } from '../shared/sit';
import { ROOM_W, ROOM_H, type Action, type GameState, type PlacedItem, type RoomId } from '../shared/state';
import {
  EASE_MS, babyBedKind, babyDragAllowed, bedLieCenter, blossomsFilled, moodLabel, resolveBabyDrop,
  type Baby, type BabyCare,
} from '../shared/baby';
import { babySVG } from './draw';

const BW = 110;
const BH = 148;
/**
 * Chest slot in the 120×192 doll box. 46 is about 80% of the classic shirt,
 * so she fills the torso and rests on the arms. 52 keeps her under the chin.
 */
const CRADLE_W = 46;
const CRADLE_H = 52;
const CRADLE_X = 60;
const CRADLE_Y = 126;
const CARES: BabyCare[] = ['feed', 'burp', 'change', 'rock'];
const PRESETS = ['Bean', 'Pip', 'Mochi', 'Bunny', 'Dot', 'Sunny'];

export interface BabyBox extends SeatPiece { z: number }

/** Feet of the doll who is holding her. Scale and pose are that doll's, not the viewer's. */
export interface HolderSpot {
  x: number;
  y: number;
  flip: boolean;
  scale?: number;
  pose?: 'sit' | 'lie' | null;
  /** The bed is flipped, so the body uses the pose-lie-r matrix. */
  lieFlip?: boolean;
}

export interface BabyHost {
  layer: HTMLElement;
  stageWrap: HTMLElement;
  get: () => GameState;
  dispatch: (a: Action) => void;
  clock: () => number;
  canSend: () => boolean;
  owner: () => boolean;
  inHouse: () => boolean;
  play: () => boolean;
  editable: () => boolean;
  toRoom: (cx: number, cy: number) => { x: number; y: number };
  box: (it: PlacedItem) => BabyBox | null;
  holderId: () => string;
  /** Pass a player or doll id to draw her on that avatar. Omit it for the viewer. */
  holderSpot: (id?: string) => HolderSpot | null;
  /** False once that holder has left the house or disconnected. */
  holderHere: (id: string) => boolean;
  occupied: () => { item: string; n: 0 | 1 }[];
  locked: () => void;
  seatAt: (room: RoomId, seat: DollSeat, at: { x: number; y: number }) => { x: number; y: number };
}

export function installBaby(host: BabyHost): { render: () => void } {
  let el: HTMLElement | null = null;
  let card: HTMLElement | null = null;
  let meet: HTMLButtonElement | null = null;
  let dragging = false;
  let easeKey = Number.NaN;
  let easeTimer = 0;
  let reactTimer = 0;
  let artAsked = false;
  let namesOpen = false;

  const driver = typeof navigator !== 'undefined' && !!navigator.webdriver;

  function place(node: HTMLElement, x: number, y: number, w: number, h: number) {
    node.style.left = (x - w / 2) / ROOM_W * 100 + '%';
    node.style.top = (y - h) / ROOM_H * 100 + '%';
    node.style.width = w / ROOM_W * 100 + '%';
    node.style.height = h / ROOM_H * 100 + '%';
  }

  /** Bottom-center of the cradle on this doll. The slot scales with her and follows sit and lie. */
  function cradleSpot(h: HolderSpot): { x: number; y: number; w: number; h: number } {
    const scale = h.scale && h.scale > 0 ? h.scale : 1;
    const pose = h.pose === 'sit' || h.pose === 'lie' ? h.pose : null;
    const off = dollAnchorOffset(CRADLE_X, CRADLE_Y, pose, !!h.lieFlip, scale);
    const dx = pose === 'lie' ? off.x : (h.flip ? -off.x : off.x);
    const w = CRADLE_W * scale;
    const hh = CRADLE_H * scale;
    return { x: h.x + dx, y: h.y + off.y + hh / 2, w, h: hh };
  }

  function latestCare(b: Baby, now: number): BabyCare | null {
    let best: BabyCare | null = null;
    let at = 0;
    for (let i = 0; i < CARES.length; i++) {
      const k = CARES[i];
      const t = b.at?.[k] ?? 0;
      if (t > 0 && now - t >= 0 && now - t < 1100 && t >= at) { best = k; at = t; }
    }
    return best;
  }

  function armEase(b: Baby) {
    if (b.mood <= 2 || !host.canSend()) { window.clearTimeout(easeTimer); easeKey = Number.NaN; return; }
    if (easeKey === b.since) return;
    window.clearTimeout(easeTimer);
    easeKey = b.since;
    const wait = Math.max(0, b.since + EASE_MS - host.clock());
    easeTimer = window.setTimeout(() => {
      easeKey = Number.NaN;
      const cur = host.get().baby;
      if (!cur || cur.mood <= 2 || !host.canSend()) return;
      host.dispatch({ type: 'baby/ease', now: host.clock() });
    }, wait);
  }

  function armReact(b: Baby, now: number) {
    window.clearTimeout(reactTimer);
    let latest = 0;
    for (let i = 0; i < CARES.length; i++) {
      const t = b.at?.[CARES[i]] ?? 0;
      if (now - t >= 0 && now - t < 1100 && t > latest) latest = t;
    }
    if (!latest) return;
    reactTimer = window.setTimeout(() => render(), Math.max(0, 1100 - (now - latest)));
  }

  function pieceUnder(cx: number, cy: number): PlacedItem | null {
    if (typeof document.elementsFromPoint !== 'function') return null;
    const list = document.elementsFromPoint(cx, cy);
    const s = host.get();
    const items = s.rooms[s.currentRoom]?.items ?? [];
    for (let i = 0; i < list.length; i++) {
      const node = list[i] as HTMLElement | null;
      if (!node || typeof node.closest !== 'function') continue;
      if (node.closest('.baby, .babyCare, .babyMeet')) continue;
      const itemEl = node.closest('.item') as HTMLElement | null;
      if (!itemEl) continue;
      const id = itemEl.dataset.id || '';
      for (let j = 0; j < items.length; j++) {
        const it = items[j];
        if (it.id !== id) continue;
        if (babyBedKind(it.kind) || host.box(it)) return it;
      }
    }
    return null;
  }

  function bindDrag(node: HTMLElement) {
    node.addEventListener('pointerdown', (e: PointerEvent) => {
      if (e.button !== 0) return;
      const b = host.get().baby;
      if (!b) return;
      e.preventDefault();
      e.stopPropagation();
      if (b.spot === 'arms' && b.holder && b.holder !== host.holderId() && host.holderHere(b.holder)) {
        toast('Someone is cuddling!');
        return;
      }
      if (!host.editable()) { host.locked(); return; }
      if (!host.canSend()) return;
      const owner = host.owner();
      const canDrag = babyDragAllowed(owner);
      const x0 = e.clientX, y0 = e.clientY, id = e.pointerId;
      let moved = false;
      const move = (ev: PointerEvent) => {
        if (ev.pointerId !== id) return;
        if (Math.hypot(ev.clientX - x0, ev.clientY - y0) > 6) moved = true;
        if (!canDrag || !moved) return;
        dragging = true;
        const p = host.toRoom(ev.clientX, ev.clientY);
        place(node, p.x, p.y, BW, BH);
      };
      const up = (ev: PointerEvent) => {
        if (ev.pointerId !== id) return;
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        window.removeEventListener('pointercancel', up);
        const wasDrag = dragging && moved && canDrag;
        dragging = false;
        if (ev.type === 'pointercancel') { render(); return; }
        if (wasDrag) {
          const p = host.toRoom(ev.clientX, ev.clientY);
          const hit = pieceUnder(ev.clientX, ev.clientY);
          const piece = hit ? host.box(hit) : null;
          const drop = resolveBabyDrop({
            mode: host.play() ? 'play' : 'decorate',
            releaseX: Math.max(0, Math.min(ROOM_W, p.x)),
            releaseY: Math.max(0, Math.min(ROOM_H, p.y)),
            piece,
            occupied: host.occupied(),
          });
          host.dispatch({
            type: 'baby/place', room: host.get().currentRoom, x: drop.x, y: drop.y,
            spot: drop.spot, bed: drop.bed, seat: drop.seat, now: host.clock(),
          });
          sfx.drop();
          return;
        }
        if (moved) { render(); return; }
        const cur = host.get().baby;
        if (!cur) return;
        if (cur.spot === 'arms' && cur.holder === host.holderId()) {
          const p = host.toRoom(ev.clientX, ev.clientY);
          host.dispatch({
            type: 'baby/hold', holder: null, room: host.get().currentRoom,
            x: Math.max(0, Math.min(ROOM_W, p.x)), y: Math.max(40, Math.min(ROOM_H, p.y)), now: host.clock(),
          });
          sfx.drop();
          return;
        }
        const hold = host.holderSpot();
        const at = hold ? cradleSpot(hold) : null;
        const x = at ? at.x : cur.x;
        const y = at ? Math.max(40, at.y) : cur.y;
        host.dispatch({ type: 'baby/hold', holder: host.holderId(), room: host.get().currentRoom, x, y, now: host.clock() });
        sfx.pick();
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
      window.addEventListener('pointercancel', up);
    });
  }

  function ensureSprite(): HTMLElement {
    if (el && el.isConnected) return el;
    el = document.createElement('div');
    el.className = 'baby';
    el.dataset.baby = '1';
    el.innerHTML = '<div class="hit"></div><div class="babySpin"><div class="babyRock"><div class="babyInner"></div></div></div><div class="babyZzz" hidden>z z z</div><div class="babyBurp" hidden><i></i></div>';
    host.layer.appendChild(el);
    bindDrag(el);
    return el;
  }

  function paintMeter(root: HTMLElement, mood: 2 | 3 | 4) {
    const word = root.querySelector('.babyWord');
    if (word) word.textContent = moodLabel(mood);
    const dots = root.querySelectorAll('.babyBlossom');
    const n = blossomsFilled(mood);
    for (let i = 0; i < dots.length; i++) dots[i].classList.toggle('on', i < n);
    const meter = root.querySelector('.babyMeter') as HTMLElement | null;
    if (meter) meter.dataset.mood = String(mood);
  }

  function saveName(raw: string) {
    const name = cleanPetName(raw);
    if (!name) { toast('Try another name!'); return; }
    const cur = host.get().baby;
    if (!cur || cur.name === name) return;
    host.dispatch({ type: 'baby/name', name });
    sfx.click();
  }

  function buildCard(b: Baby) {
    card = document.createElement('div');
    card.className = 'babyCare';
    card.dataset.babyCare = '1';
    const blossoms: string[] = [];
    for (let i = 0; i < 5; i++) blossoms.push('<i class="babyBlossom"></i>');
    const presets: string[] = [];
    for (let i = 0; i < PRESETS.length; i++) presets.push(`<button type="button" data-preset="${PRESETS[i]}">${PRESETS[i]}</button>`);
    card.innerHTML = `<p class="babyWord"></p><span class="babyMeter"><span class="babyBlossoms">${blossoms.join('')}</span></span>
      <button type="button" data-care="feed">Bottle</button>
      <button type="button" data-care="burp">Burp</button>
      <button type="button" data-care="change">Diaper</button>
      <button type="button" data-care="rock">Rock</button>
      <button type="button" data-baby-name-open>Name</button>
      <div class="babyNames" hidden>
        <input type="text" maxlength="14" autocomplete="off" enterkeyhint="done" aria-label="Baby name" value="">
        ${presets.join('')}
      </div>`;
    paintMeter(card, b.mood);
    card.addEventListener('pointerdown', ev => ev.stopPropagation());
    card.addEventListener('click', ev => {
      const t = ev.target as HTMLElement;
      const careBtn = t.closest('[data-care]') as HTMLElement | null;
      if (careBtn && careBtn.dataset.care) {
        if (!host.editable()) { host.locked(); return; }
        if (!host.canSend()) return;
        const care = careBtn.dataset.care as BabyCare;
        host.dispatch({ type: 'baby/care', care, now: host.clock() });
        if (care === 'rock') sfx.purr();
        else if (care === 'feed') sfx.sparkle();
        else sfx.click();
        return;
      }
      if (t.closest('[data-baby-name-open]')) {
        if (!host.owner()) return;
        namesOpen = !namesOpen;
        const box = card?.querySelector('.babyNames') as HTMLElement | null;
        if (box) box.hidden = !namesOpen;
        const input = card?.querySelector('input');
        if (namesOpen && input) {
          input.value = host.get().baby?.name ?? '';
          input.focus();
        }
        return;
      }
      const preset = t.closest('[data-preset]') as HTMLElement | null;
      if (preset && host.owner()) { saveName(preset.dataset.preset || ''); return; }
    });
    const input = card.querySelector('input');
    input?.addEventListener('keydown', ev => {
      if (ev.key === 'Enter') { ev.preventDefault(); saveName((ev.target as HTMLInputElement).value); }
    });
    host.stageWrap.appendChild(card);
  }

  function syncCard(b: Baby, owner: boolean) {
    if (!host.play()) { hideCard(); return; }
    const focused = card && document.activeElement && card.contains(document.activeElement);
    if (!card || !card.isConnected) buildCard(b);
    if (!card) return;
    card.hidden = false;
    paintMeter(card, b.mood);
    const nameBtn = card.querySelector('[data-baby-name-open]') as HTMLElement | null;
    if (nameBtn) nameBtn.hidden = !owner;
    const box = card.querySelector('.babyNames') as HTMLElement | null;
    if (box) box.hidden = !owner || !namesOpen;
    const input = card.querySelector('input') as HTMLInputElement | null;
    if (input && !focused) input.value = b.name;
  }

  function hideCard() {
    namesOpen = false;
    if (card) { card.remove(); card = null; }
  }

  function syncMeet(show: boolean) {
    if (!show || driver) { if (meet) { meet.remove(); meet = null; } return; }
    if (meet && meet.isConnected) { meet.hidden = false; return; }
    meet = document.createElement('button');
    meet.type = 'button';
    meet.className = 'babyMeet';
    meet.textContent = 'Meet the baby';
    meet.addEventListener('pointerdown', ev => ev.stopPropagation());
    meet.addEventListener('click', () => {
      if (!host.editable()) { host.locked(); return; }
      if (!host.canSend() || host.get().baby) return;
      host.dispatch({ type: 'baby/meet', now: host.clock() });
      sfx.sparkle();
    });
    host.stageWrap.appendChild(meet);
  }

  function hasCrib(): boolean {
    const items = host.get().rooms.nursery?.items ?? [];
    for (let i = 0; i < items.length; i++) if (babyBedKind(items[i].kind) === 'crib') return true;
    return false;
  }

  function position(node: HTMLElement, b: Baby) {
    node.classList.remove('baby-lie', 'baby-lie-r', 'baby-cradle', 'flipped');
    const room = host.get().currentRoom;
    if ((b.spot === 'crib' || b.spot === 'bassinet') && b.bed) {
      const it = host.get().rooms[b.room]?.items.find(i => i.id === b.bed) ?? null;
      const piece = it ? host.box(it) : null;
      if (it && piece) {
        const c = bedLieCenter(it.kind, piece);
        place(node, c.x, c.y + BH / 2, BW, BH);
        node.style.zIndex = String(1000 + it.z + 1);
        node.classList.add('baby-lie');
        if (it.flip) node.classList.add('baby-lie-r');
        return;
      }
    }
    if (b.spot === 'arms') {
      const h = b.holder ? host.holderSpot(b.holder) : null;
      const at = h ? cradleSpot(h) : null;
      const x = at ? at.x : b.x;
      const y = at ? at.y : b.y;
      place(node, x, y, at ? at.w : CRADLE_W, at ? at.h : CRADLE_H);
      node.style.zIndex = String(5000 + Math.round(h ? h.y : b.y) + 2);
      node.classList.add('baby-cradle');
      if (h && (h.pose === 'lie' ? h.lieFlip : h.flip)) node.classList.add('flipped');
      return;
    }
    if (b.spot === 'mat' && b.seat) {
      const at = host.seatAt(room, b.seat, b);
      place(node, at.x, at.y, BW, BH);
      const it = host.get().rooms[room]?.items.find(i => i.id === b.seat?.item);
      node.style.zIndex = String(1000 + (it?.z ?? 0) + 1);
      if (b.seat.pose === 'lie') {
        node.classList.add('baby-lie');
        if (it?.flip) node.classList.add('baby-lie-r');
      }
      return;
    }
    place(node, b.x, b.y, BW, BH);
    node.style.zIndex = String(5000 + Math.round(b.y));
  }

  /** A house doll, not a player id. Missing means the holder is someone on the street. */
  function dollLeftRoom(b: Baby): boolean {
    if (b.spot !== 'arms' || !b.holder) return false;
    const doll = host.get().characters.find(c => c.id === b.holder);
    return !!doll && doll.room !== b.room;
  }

  function dropIfDollLeft(b: Baby) {
    if (dragging || !dollLeftRoom(b)) return;
    if (!host.canSend() || !host.editable()) return;
    host.dispatch({
      type: 'baby/hold', holder: null, room: b.room,
      x: b.x, y: STAND_Y, now: host.clock(),
    });
  }

  function maybeFollow(b: Baby) {
    if (dragging || dollLeftRoom(b) || b.spot !== 'arms' || b.holder !== host.holderId()) return;
    if (!host.canSend() || !host.editable()) return;
    const spot = host.holderSpot();
    if (!spot) return;
    const room = host.get().currentRoom;
    if (b.room === room) return;
    const at = cradleSpot(spot);
    host.dispatch({
      type: 'baby/hold', holder: b.holder, room,
      x: at.x, y: Math.max(40, at.y), now: host.clock(),
    });
  }

  function render() {
    const s = host.get();
    const b = s.baby;
    const onHolder = !!b && b.spot === 'arms' && !!b.holder && !!host.holderSpot(b.holder);
    const carriedHere = !!b && b.spot === 'arms' && b.holder === host.holderId() && !!host.holderSpot();
    const here = !!(b && host.inHouse() && (b.room === s.currentRoom || onHolder || carriedHere));
    if (!b || !here) {
      if (el) { el.remove(); el = null; }
      dragging = false;
      hideCard();
      window.clearTimeout(easeTimer); easeKey = Number.NaN;
      const showMeet = !driver && !b && host.inHouse() && host.owner() && host.editable() && host.canSend() && s.currentRoom === 'nursery' && hasCrib();
      syncMeet(showMeet);
      return;
    }
    syncMeet(false);
    if (rasterOn() && !rasterUrl('baby') && !artAsked) {
      artAsked = true;
      void loadArtKinds(['baby']).then(() => render());
    }
    const node = ensureSprite();
    const now = host.clock();
    const care = latestCare(b, now);
    const shut = care === 'rock';
    const fresh = care === 'change';
    const url = !shut && !fresh && rasterOn() ? rasterUrl('baby') : '';
    const inner = node.querySelector('.babyInner') as HTMLElement;
    const look = (url || 'svg') + (shut ? 's' : '') + (fresh ? 'f' : '');
    if (inner && node.dataset.look !== look) {
      inner.innerHTML = url ? `<img class="artimg" alt="" draggable="false" src="${url}">` : babySVG(shut, fresh);
      node.dataset.look = look;
    }
    node.dataset.babySpot = b.spot;
    node.dataset.babyMood = String(b.mood);
    node.dataset.babyName = b.name;
    node.classList.toggle('is-feed', care === 'feed');
    node.classList.toggle('is-burp', care === 'burp');
    node.classList.toggle('is-change', care === 'change');
    node.classList.toggle('is-rock', care === 'rock');
    const zzz = node.querySelector('.babyZzz') as HTMLElement | null;
    const burp = node.querySelector('.babyBurp') as HTMLElement | null;
    const sleepy = (b.spot === 'crib' || b.spot === 'bassinet') && !care;
    if (zzz) zzz.hidden = !sleepy;
    if (burp) burp.hidden = care !== 'burp';
    if (!(dragging && node.isConnected)) position(node, b);
    syncCard(b, host.owner());
    armEase(b);
    armReact(b, now);
    dropIfDollLeft(b);
    maybeFollow(b);
  }

  return { render };
}
