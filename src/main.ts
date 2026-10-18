import './style.css';
import { MAP_W, MAP_H, PARK, RANCH, SQUARE, CLUB, mapBgSVG, mapTreesSVG, parkMiniSVG, ranchMiniSVG, clubhouseMiniSVG, mapIcon, faceSVG } from './map';
import { createStore, newCharacter, ROOM_W, ROOM_H, V1_OFFSET, MAX_CHARS, type RoomId, type PlacedItem, type GameState, type Character, type Hand, type Action, type Cat, type Dog } from './shared/state';
import { HoodClient, houseStore, loadHoodConfig, saveHoodConfig, hoodServerUrl, createNeighborhood, lookupNeighborhood, type HoodConfig } from './net';
import { NICKNAMES, PHRASES, EMOTES, MAX_CHAT, CODE_MAX, ROSTER_SUGGEST, MAX_ROSTER, normCode, validInvite, filterChat, FILTER_MSG, isNear, streetWidth, slotX, cleanLook, cleanPetName, CAT_NAMES, DOG_NAMES, PARK_W, PARK_SPOTS, SLIDE, DOG_AREA, type Presence, type Bubble, type Look, type Fx } from './shared/hood';
import { catSVG, dogSVG, catAt, kennelLook, towerFootY, CAT_COATS, DOG_BREEDS } from './pets';
import { parkSceneSVG, swingSVG, ballSVG, treeIcon, pawIcon, gateIcon, streetGateSVG, PARK_H, SWING_BAR } from './park';
import { houseSVG, ICONS, toast, adultCheck } from './hood-ui';
import { initEggs, foundSet, EGGS } from './eggs';
import { ITEMS, ITEM_MAP, svgOf, hOf, type Category, type ItemDef } from './items';
import { PATTERNS_FROM_PACKS, PATTERN_MAP, packLabel } from './packs';
import { characterSVG, SKINS, HAIRS, CLOTHES, HAIR_STYLES, ACCESSORIES, SIZES, SIZE_SCALE, HANDS } from './character';
import { sfx, setSound } from './sound';
import { whatsNewCheck, whatsNewHTML, markSeen } from './whatsnew';
import { BARN_W, BARN_ANIMAL_X, BARN_DOOR_X, RANCH_W, RANCH_Y0, RANCH_Y1, ANIMALS, ANIMAL_X, ANIMAL_Y, HORSES, HORSE_X, HORSE_Y, FOODS, PLOTS, PLOT_X, BASKET_KINDS, ranchApply, cleanPlots, cleanBasket, plotStage, emptyBasket, type RanchOp, type Basket, type BasketKind, type Plot } from './shared/ranch';
import { barnSceneSVG, windmillSVG, ranchSceneSVG, paddockFenceSVG, animalSVG, horseSVG, henHouseSVG, tractorSVG, appleTreeSVG, APPLE_SPOTS, appleSVG, FEED_SVG, bucketSVG, basketSVG, eggSVG, carrotSVG, flowerSVG, plotSVG, rainbowIcon, hopOffIcon, streetRanchGateSVG, ANIMAL_INFO, HORSE_COATS, RANCH_H, POND, FENCE_FOOT } from './ranch';
import { bindGameRoom, renderGameRoom, renderGamePeople, tickGameRoom, mySeat, grScale, tableApi } from './gameroom-view';

// The renderer talks to `store`, which forwards to either the offline localStorage house
// or a neighborhood house (server-authoritative) — same actions, same reducer.
type AnyStore = { get(): GameState; dispatch(a: Action): void; subscribe(l: (s: GameState, a: Action) => void): void };
const firstRun = whatsNewCheck(); // must run before the store loads/saves
const local = createStore();
let inner: AnyStore = local;
const storeListeners: ((s: GameState, a: Action) => void)[] = [];
const hooked = new WeakSet<AnyStore>();
function hookStore(st: AnyStore) { if (hooked.has(st)) return; hooked.add(st); st.subscribe((s, a) => { if (inner === st) storeListeners.forEach(l => l(s, a)); }); }
hookStore(local);
const store: AnyStore = { get: () => inner.get(), dispatch: a => inner.dispatch(a), subscribe: l => { storeListeners.push(l); } };
// World is ROOM_W x ROOM_H; the stage shows a VIEW_W-wide window onto it (fits the iPad).
const W = ROOM_W, H = ROOM_H, FLOOR_Y = 390;
let VIEW_W = 1000; // visible window; narrower in portrait so the room can fill the height
const maxCam = () => Math.max(0, W - VIEW_W);
const WALL_BOTTOM = 375; // wall items (manifest `wall: true`) snap so they sit on the wall
const snapY = (def: ItemDef, y: number) => def.wall ? Math.min(y, WALL_BOTTOM) : y;
const CHAR_W = 120, CHAR_H = 192;
const ROOMS: { id: RoomId; name: string; color: string }[] = [
  { id: 'living', name: 'Living Room', color: '#ff8fab' },
  { id: 'bedroom', name: 'Bedroom', color: '#b388d6' },
  { id: 'kitchen', name: 'Kitchen', color: '#5cc985' },
  { id: 'salon', name: 'Salon', color: '#f0a0d8' },
  { id: 'nursery', name: 'Nursery', color: '#9ad7f5' },
];
const roomColor = (r: string) => ROOMS.find(x => x.id === r)?.color ?? '#ccc';

// ---------- drawer tabs: people, categories, then packs ----------
type Tab = { id: string; name: string; icon: string; kind: 'people' | 'cat' | 'pack' };
const TABS: Tab[] = [
  { id: '__people', name: 'People', icon: '', kind: 'people' },
  ...(['furniture', 'decor', 'plants', 'food', 'pets'] as Category[]).map((c, i) => ({ id: c, name: c, icon: ['armchair', 'balloon', 'flowers', 'donut', 'cat'][i], kind: 'cat' as const })),
];
TABS.push({ id: 'secrets', name: 'Secrets', icon: 'egg:chloe-starlamp', kind: 'cat' });
for (const it of ITEMS) if (!TABS.some(t => t.kind === 'cat' && t.id === it.cat)) TABS.push({ id: it.cat, name: it.cat, icon: it.kind, kind: 'cat' });
for (const it of ITEMS) if (it.pack && !TABS.some(t => t.id === 'pack:' + it.pack)) TABS.push({ id: 'pack:' + it.pack, name: packLabel(it.pack), icon: it.kind, kind: 'pack' });
const matchesRoom = (rooms: string[] | undefined, f: string) => f === 'all' || !rooms || rooms.includes('any') || rooms.includes(f);
const tabItems = (tab: string, rf: string) => ITEMS.filter(i => (!i.secret || foundSet().has(i.secret)) && (tab.startsWith('pack:') ? i.pack === tab.slice(5) : i.cat === tab) && matchesRoom(i.rooms, rf));

const WALLS = ['#ffd6e0', '#d9ccff', '#cdf3dc', '#cfe8ff', '#fff1b8', '#ffe0c7', '#ffffff', '#f6c1ff'];
const FLOORS = ['#e8b98a', '#f2d0a4', '#c99366', '#ffe7a8', '#bfe3d0', '#d6d6f5', '#ffc8dd', '#9fb4c7'];
const ICON = {
  paint: `<svg viewBox="0 0 48 48"><path d="M10 30 L28 12 L36 20 L18 38 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M28 12 L34 6 L42 14 L36 20" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><circle cx="12" cy="40" r="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/></svg>`,
  shirt: `<svg viewBox="0 0 48 48"><path d="M16 8 L6 16 L11 24 L15 21 V42 H33 V21 L37 24 L42 16 L32 8 Q24 14 16 8 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>`,
  soundOn: `<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M32 17 Q37 24 32 31 M36 12 Q45 24 36 36" fill="none" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>`,
  soundOff: `<svg viewBox="0 0 48 48"><path d="M8 18 H16 L26 9 V39 L16 30 H8 Z" fill="#ddd" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M33 19 L43 29 M43 19 L33 29" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>`,
  flip: `<svg viewBox="0 0 48 48"><path d="M24 6 V42" stroke="#5a3d5c" stroke-width="3" stroke-dasharray="4 4"/><path d="M18 12 L6 36 H18 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M30 12 L42 36 H30 Z" fill="#fff" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>`,
  front: `<svg viewBox="0 0 48 48"><rect x="6" y="6" width="22" height="22" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="18" y="18" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>`,
  back: `<svg viewBox="0 0 48 48"><rect x="18" y="18" width="24" height="24" rx="5" fill="#ddd" stroke="#5a3d5c" stroke-width="3"/><rect x="6" y="6" width="22" height="22" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/></svg>`,
  trash: `<svg viewBox="0 0 48 48"><rect x="12" y="14" width="24" height="28" rx="5" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><rect x="8" y="9" width="32" height="7" rx="3.5" fill="#ffadad" stroke="#5a3d5c" stroke-width="3"/><path d="M20 21 V35 M28 21 V35" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>`,
};
const PEOPLE_ICON = `<svg viewBox="0 0 48 48"><circle cx="17" cy="18" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><circle cx="32" cy="20" r="7" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><path d="M5 42 Q6 28 17 28 Q28 28 29 42 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M24 42 Q25 30 32 30 Q42 30 43 42 Z" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>`;
const PLUS = `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#fff3b0" stroke="#5a3d5c" stroke-width="3"/><path d="M24 15 V33 M15 24 H33" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>`;

// ---------- DOM skeleton ----------
const app = document.getElementById('app')!;
app.innerHTML = `
<div class="top">
  <div class="tabs" id="tabs"></div>
  <div class="minimap" id="minimap" aria-label="Room map"><div class="mmWall" id="mmWall"></div><div class="mmFloor" id="mmFloor"></div><div id="mmDots"></div><div class="mmView" id="mmView"></div></div>
  <div class="streetTitle" id="streetTitle">Our Neighborhood</div>
  <div class="tools">
    <button class="round ownOnly" id="btnLock" aria-label="Lock house"></button>
    <button class="round hoodOnly" id="btnChat" aria-label="Talk">${ICONS.chat}</button>
    <button class="round soloOnly" id="btnHood" aria-label="Friends">${ICONS.street}</button>
    <button class="round homeBtn" id="btnHome" aria-label="Home">${ICONS.home}</button>
    <button class="round streetOnly" id="btnParent" aria-label="Grown-ups">${ICONS.shield}</button>
    <button class="round streetOnly" id="btnSolo" aria-label="Play in my own house">${ICONS.solo}</button>
    <button class="round barnOnly" id="btnLeavePark" aria-label="Go outside">${gateIcon}</button>
    <button class="round rideOnly" id="btnHopOff" aria-label="Hop off the horse">${hopOffIcon}</button>
    <button class="round" id="btnPets" aria-label="Pets">${pawIcon}</button>
    <button class="round" id="btnPaint" aria-label="Colors">${ICON.paint}</button>
    <button class="round" id="btnDress" aria-label="Characters">${ICON.shirt}</button>
    <button class="round" id="btnSound" aria-label="Sound"></button>
    <button class="round mapBtn" id="btnMap" aria-label="Map">${mapIcon}</button>
  </div>
</div>
<div class="stageWrap" id="stageWrap">
  <div class="stage" id="stage">
    <div class="world" id="world">
      <div class="wall" id="wall"></div><div class="floor" id="floor"></div><div class="baseboard"></div>
      <div class="layer" id="layer"></div>
      <div class="toolbar hidden" id="toolbar">
        <button data-a="flip">${ICON.flip}</button><button data-a="front">${ICON.front}</button><button data-a="back">${ICON.back}</button><button data-a="delete" class="danger">${ICON.trash}</button>
      </div>
    </div>
    <button class="nudge left" id="nudgeL" aria-label="Look left"><svg viewBox="0 0 40 40"><path d="M24 10 L14 20 L24 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="nudge right" id="nudgeR" aria-label="Look right"><svg viewBox="0 0 40 40"><path d="M16 10 L26 20 L16 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </div>
  <div class="bin" id="bin">${ICON.trash}</div>
  <div class="houseTag hoodOnly" id="houseTag"></div>
  <div class="secrets" id="secrets"></div>
</div>
<div class="drawer">
  <div class="drawerTop">
    <div class="rooms" id="roomFilter"></div>
    <div class="cats" id="cats"></div>
  </div>
  <div class="shelf" id="shelf"></div>
</div>
<div class="street park ranch hidden" id="ranch"><div class="streetScroll" id="ranchScroll"><div class="parkWorld ranchWorld" id="ranchWorld"></div></div></div>
<button class="basketChip hidden" id="basketChip" aria-label="My basket"></button>
<div class="street park hidden" id="park"><div class="streetScroll" id="parkScroll"><div class="parkWorld" id="parkWorld"></div></div></div>
<div class="street grRoom hidden" id="gameroom"><div class="streetScroll" id="grScroll"><div class="parkWorld grWorld" id="grWorld"></div></div><div id="grSolo" class="grSolo hidden">Play with friends on your street</div></div>
<div id="tableOverlay" class="tableOverlay hidden"></div>
<div class="street mapView hidden" id="street"><div class="mapWorld" id="mapWorld"></div></div>
<div class="chatTray hidden" id="chatTray"></div>
<div class="sheet hidden" id="sheet"><div class="card" id="card"></div></div>
<div class="fx" id="fx"></div>
<div class="phoneNote" id="phoneNote"><div class="card"><h2>Turn sideways</h2><p>Turn your phone sideways for more room to play!</p><button class="phoneOk" id="phoneOk" type="button">OK!</button></div></div>
<div class="elsewhere hidden" id="elsewhere"><div class="card"><h2>You're playing on another screen</h2><p>This screen can rest. Your house is safe.</p><button class="playHere" id="elsewhereGo" type="button">Tap to play here!</button></div></div>`;

const $ = (id: string) => document.getElementById(id)!;
// preview builds (separate URL, separate server, prefixed saves) wear a little ribbon so nobody mixes them up
if (import.meta.env.VITE_STORE_PREFIX) { document.body.classList.add('is-preview'); document.body.insertAdjacentHTML('beforeend', '<div class="previewRibbon">PREVIEW</div>'); }
const stage = $('stage'), world = $('world'), layer = $('layer'), toolbar = $('toolbar'), bin = $('bin');
let selected: string | null = null;          // selected room item (UI only)
let activeChar: string | null = store.get().characters[0]?.id ?? null; // character being edited (UI only)
let currentTab = 'furniture';
let roomFilter = ''; // '' follows the room you're in; 'all' shows every room's things
let uid = Date.now() % 100000;
const newId = (p: string) => `${p}-${Date.now().toString(36)}${(++uid).toString(36)}${Math.random().toString(36).slice(2, 5)}`;
const ME = '__me';
// ---------- neighborhood state (declared early: render functions consult it) ----------
let hood: HoodClient | null = null;
let view: 'house' | 'street' | 'park' | 'ranch' | 'gameroom' = 'house'; // 'street' is the neighborhood map
let inBarn = false; // inside Rainbow Ranch: the yard, or the barn (petting zoo)
let currentHouseId = '';
let houseStores = new Map<string, ReturnType<typeof houseStore>>();
const avatarEls = new Map<string, HTMLElement>();

// ---------- camera (view-only, not part of game state) ----------
const cams: Record<string, number> = {};
let camX = V1_OFFSET, inertia = 0;
let glideTarget: number | null = null;
const stopGlide = () => { cancelAnimationFrame(inertia); glideTarget = null; };
const clampCam = (x: number) => Math.max(0, Math.min(maxCam(), x));
function setCam(x: number) {
  camX = clampCam(x); cams[store.get().currentRoom] = camX;
  world.style.transform = `translate3d(${-camX}px,0,0)`;
  $('nudgeL').classList.toggle('off', camX <= 1);
  $('nudgeR').classList.toggle('off', camX >= maxCam() - 1);
  const v = $('mmView'); v.style.left = camX / W * 100 + '%'; v.style.width = VIEW_W / W * 100 + '%';
  if (selected) renderToolbar(store.get());
}
function glideTo(target: number) {
  cancelAnimationFrame(inertia); target = clampCam(target); glideTarget = target;
  const step = () => { const d = target - camX; if (Math.abs(d) < 0.5) { setCam(target); glideTarget = null; return; } setCam(camX + d * 0.18); inertia = requestAnimationFrame(step); };
  inertia = requestAnimationFrame(step);
}
const stageScale = () => stage.getBoundingClientRect().width / VIEW_W;

// Phones only. iPad sizes (1180×820, 1024×768, 820×1180) never match this, even with a coarse pointer.
const PHONE_MQ = '(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)';
const phoneMQ = window.matchMedia(PHONE_MQ);
function syncPhone() {
  const on = phoneMQ.matches;
  document.body.classList.toggle('phone', on);
  document.body.classList.toggle('phone-portrait', on && window.matchMedia('(orientation: portrait)').matches);
  // Nudge arrows live inside the scaled stage on iPad. On a phone the stage is small, so
  // they move onto the wrap (screen pixels, >= 44px) and back when the gate no longer matches.
  const wrap = $('stageWrap');
  for (const n of [$('nudgeL'), $('nudgeR')]) {
    const home = on ? wrap : stage;
    if (n.parentElement !== home) home.appendChild(n);
  }
}
function syncChrome() {
  const top = document.querySelector('.top');
  if (!top) return;
  const box = top.getBoundingClientRect();
  // iPad: height only, same as before. Phone: the bar's bottom, so fixed scenes start below the notch padding.
  const px = document.body.classList.contains('phone') ? box.bottom : box.height;
  document.documentElement.style.setProperty('--chrome-h', Math.ceil(px) + 'px');
}
/** Phone landscape only. Size #app from the visual viewport (Safari chrome), not 100vh. */
function applyPhoneViewport() {
  const root = document.documentElement;
  const appEl = document.getElementById('app')!;
  const land = document.body.classList.contains('phone') && !document.body.classList.contains('phone-portrait');
  if (!land) {
    appEl.style.top = ''; appEl.style.height = ''; appEl.style.bottom = '';
    root.style.removeProperty('--vvh'); root.style.removeProperty('--vvt');
    return;
  }
  const vv = window.visualViewport;
  const h = Math.round(vv ? vv.height : window.innerHeight);
  const top = Math.round(vv ? vv.offsetTop : 0);
  root.style.setProperty('--vvh', h + 'px');
  root.style.setProperty('--vvt', top + 'px');
  appEl.style.top = top + 'px';
  appEl.style.height = h + 'px';
  appEl.style.bottom = 'auto';
}
function fit() {
  syncPhone();
  applyPhoneViewport();
  syncChrome();
  const wrap = $('stageWrap');
  const phone = document.body.classList.contains('phone');
  // iPad keeps the original test. On a phone, a tall tool row can make the stage almost square;
  // still frame it as portrait so the room fills the screen instead of shrinking to a wide sliver.
  const portrait = phone
    ? wrap.clientHeight > wrap.clientWidth * 0.85
    : wrap.clientHeight > wrap.clientWidth + 40;
  if (portrait) {
    // Match the free space's shape so the room scales up and fills the height.
    const aspect = wrap.clientWidth / Math.max(1, wrap.clientHeight);
    VIEW_W = Math.round(Math.max(480, Math.min(860, H * aspect)));
  } else if (phone) {
    // Landscape phone: the free box is short and wide. Open the window to that shape
    // (never wider than the room, never stretched) so the stage uses the width and the height.
    const aspect = wrap.clientWidth / Math.max(1, wrap.clientHeight);
    VIEW_W = Math.round(Math.max(480, Math.min(W, H * aspect)));
  } else VIEW_W = 1000;
  stage.style.width = VIEW_W + 'px';
  stage.style.height = H + 'px';
  const sc = Math.min(wrap.clientWidth / VIEW_W, wrap.clientHeight / H);
  stage.style.transform = `translate(-50%,-50%) scale(${sc})`;
  if (document.body.classList.contains('phone')) stage.style.setProperty('--fit', String(sc));
  if (camX > maxCam()) setCam(camX);
  else { const v = $('mmView'); v.style.left = camX / W * 100 + '%'; v.style.width = VIEW_W / W * 100 + '%'; }
  // Phone portrait narrows the window after the camera was aimed at a wider view.
  phoneShowKids();
  if (view === 'ranch') requestAnimationFrame(frameRanchSign);
  clampPhoneBubbles();
  if (phone && view === 'ranch') layoutPaddock();
  placeSecretsPill();
}
/**
 * Short phone landscape letterboxes the room. The full Surprises pill is wider than
 * that side gutter, so it becomes a 44px stack of the gift and the count. A gutter
 * under 44px cannot hold even that, so the pill joins the top row. iPad never has
 * body.phone, and taller landscape phones keep the centred label.
 */
function placeSecretsPill() {
  const el = $('secrets');
  const wrap = $('stageWrap');
  const tools = document.querySelector('.tools');
  const short = document.body.classList.contains('phone')
    && !document.body.classList.contains('phone-portrait')
    && window.matchMedia('(orientation: landscape) and (max-height: 360px)').matches;
  el.classList.remove('compact');
  document.body.classList.remove('secrets-chrome');
  if (el.parentElement !== wrap) wrap.appendChild(el);
  if (!short || !tools) return;
  const full = el.getBoundingClientRect().width;
  const stageBox = stage.getBoundingClientRect();
  const gutter = window.innerWidth - stageBox.right;
  if (gutter >= full + 2) return;
  el.classList.add('compact');
  const box = el.getBoundingClientRect();
  const hits = box.left < stageBox.right - 0.5 && box.right > stageBox.left + 0.5
    && box.top < stageBox.bottom - 0.5 && box.bottom > stageBox.top + 0.5;
  if (!hits && gutter >= 44) return;
  document.body.classList.add('secrets-chrome');
  if (el.parentElement !== tools) tools.appendChild(el);
}
/**
 * Phone only. After layout, pan so the kid and her name tag are fully inside the
 * visible scene. Measures the real boxes (a name tag is wider than her body and is
 * not scaled with the room). iPad never has body.phone, so this never moves the camera.
 */
function phoneShowKids(tries = 0) {
  if (!document.body.classList.contains('phone')) return;
  if (view === 'house') { phoneShowHouseKid(); return; }
  const id = view === 'park' ? 'parkScroll' : view === 'ranch' ? 'ranchScroll' : view === 'gameroom' ? 'grScroll' : '';
  if (!id) return;
  const scroll = document.getElementById(id);
  if (!scroll || scroll.clientWidth < 20) {
    if (tries < 8) requestAnimationFrame(() => phoneShowKids(tries + 1));
    return;
  }
  const kid = scroll.querySelector<HTMLElement>('.savatar.mine') ?? scroll.querySelector<HTMLElement>('.savatar');
  if (!kid) {
    if (tries < 8) requestAnimationFrame(() => phoneShowKids(tries + 1));
    return;
  }
  const moved = nudgeScroll(scroll, [kid, ...kid.querySelectorAll<HTMLElement>('.nametag')]);
  if (moved && tries < 8) requestAnimationFrame(() => phoneShowKids(tries + 1));
  else if (view === 'ranch' && !inBarn) keepDoorHintOnScreen();
}
function nudgeScroll(scroll: HTMLElement, nodes: HTMLElement[]) {
  const pad = 8;
  const port = scroll.getBoundingClientRect();
  const rightLimit = Math.min(port.right, window.innerWidth) - pad;
  const leftLimit = Math.max(port.left, 0) + pad;
  let overflowR = 0, overflowL = 0;
  for (const el of nodes) {
    const b = el.getBoundingClientRect();
    if (b.width < 2 || b.height < 2) continue;
    overflowR = Math.max(overflowR, b.right - rightLimit);
    overflowL = Math.max(overflowL, leftLimit - b.left);
  }
  if (overflowR <= 1 && overflowL <= 1) return false;
  const before = scroll.scrollLeft;
  if (overflowR > 1 && overflowL > 1) scroll.scrollLeft -= overflowL;
  else if (overflowR > 1) scroll.scrollLeft += overflowR;
  else scroll.scrollLeft -= overflowL;
  return Math.abs(scroll.scrollLeft - before) > 0.5;
}
function phoneShowHouseKid() {
  const kid = document.querySelector<HTMLElement>('#layer .char.avatar.mine') ?? document.querySelector<HTMLElement>('#layer .char');
  if (!kid) return;
  const sc = stageScale() || 1;
  const stageBox = stage.getBoundingClientRect();
  const pad = 8;
  let rightLimit = Math.min(stageBox.right, window.innerWidth) - pad;
  let leftLimit = Math.max(stageBox.left, 0) + pad;
  // The ‹ › arrows sit on the stage edges. Keep her body and name tag out of them.
  for (const id of ['nudgeL', 'nudgeR'] as const) {
    const n = $(id);
    if (!n || n.classList.contains('off') || n.offsetParent === null) continue;
    const b = n.getBoundingClientRect();
    if (b.width < 2 || b.height < 2) continue;
    if (id === 'nudgeL') leftLimit = Math.max(leftLimit, b.right + 6);
    else rightLimit = Math.min(rightLimit, b.left - 6);
  }
  if (rightLimit - leftLimit < 48) {
    rightLimit = Math.min(stageBox.right, window.innerWidth) - pad;
    leftLimit = Math.max(stageBox.left, 0) + pad;
  }
  const nodes = [kid, ...kid.querySelectorAll<HTMLElement>('.nametag')];
  let overflowR = 0, overflowL = 0, minL = Infinity, maxR = -Infinity;
  for (const el of nodes) {
    const b = el.getBoundingClientRect();
    if (b.width < 2 || b.height < 2) continue;
    overflowR = Math.max(overflowR, b.right - rightLimit);
    overflowL = Math.max(overflowL, leftLimit - b.left);
    minL = Math.min(minL, b.left); maxR = Math.max(maxR, b.right);
  }
  // Portrait: she starts right of centre, so her name tag crowds ›. Centre her in the gap between the arrows.
  if (document.body.classList.contains('phone-portrait') && minL < Infinity) {
    const delta = (minL + maxR) / 2 - (leftLimit + rightLimit) / 2;
    if (Math.abs(delta) > 3) { setCam(camX + delta / sc); return; }
  }
  if (overflowR <= 1 && overflowL <= 1) return;
  if (overflowR > 1 && overflowL > 1) setCam(camX - overflowL / sc);
  else if (overflowR > 1) setCam(camX + overflowR / sc);
  else setCam(camX - overflowL / sc);
}
window.addEventListener('resize', fit);
phoneMQ.addEventListener('change', fit);
// Phone only. Coming home brings the room tabs back, and the own-house buttons can
// wrap the tool row, both without a window resize — the room then keeps the old scale
// and covers Map. iPad sizes never match PHONE_MQ, so this never calls fit() there.
let phoneFitKey = '';
let phoneFitting = false;
function phoneFitSnapshot() {
  const wrap = $('stageWrap');
  const topBar = document.querySelector('.top');
  const toolRow = document.querySelector('.tools');
  const box = (el: Element | null) => el ? el.clientWidth + 'x' + el.clientHeight : '0';
  const vv = window.visualViewport;
  const vvKey = vv ? Math.round(vv.offsetTop) + 'x' + Math.round(vv.height) + 'x' + Math.round(vv.width) : '';
  return vvKey + ' ' + box(wrap) + ' ' + box(topBar) + ' ' + box(toolRow);
}
function fitPhone() {
  if (phoneFitting || !phoneMQ.matches) return;
  const key = phoneFitSnapshot();
  if (key === phoneFitKey) return;
  phoneFitting = true;
  try { fit(); phoneFitKey = phoneFitSnapshot(); }
  finally { phoneFitting = false; }
}
if (typeof ResizeObserver !== 'undefined') {
  const ro = new ResizeObserver(() => fitPhone());
  const topBar = document.querySelector('.top');
  if (topBar) ro.observe(topBar);
  ro.observe($('stageWrap'));
  const toolRow = document.querySelector('.tools');
  if (toolRow) ro.observe(toolRow);
}
// Safari shows and hides its tab bar without a window resize. Feed that into the same refit.
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => fitPhone());
  window.visualViewport.addEventListener('scroll', () => fitPhone());
}
stage.addEventListener('scroll', () => { stage.scrollLeft = 0; stage.scrollTop = 0; });
const toRoom = (cx: number, cy: number) => {
  const r = stage.getBoundingClientRect();
  return { x: (cx - r.left) / r.width * VIEW_W + camX, y: (cy - r.top) / r.height * H };
};
const inStage = (cx: number, cy: number) => { const r = stage.getBoundingClientRect(); return cx > r.left && cx < r.right && cy > r.top && cy < r.bottom; };
const overBin = (cx: number, cy: number) => { const r = bin.getBoundingClientRect(); return cx > r.left - 20 && cx < r.right + 20 && cy > r.top - 20 && cy < r.bottom + 20; };

// ---------- character geometry ----------
const charScale = (c: Character) => SIZE_SCALE[c.size] ?? 1;
function handWorld(c: Character, hand: Hand) {
  const sc = charScale(c); let hx = HANDS[hand].x; if (c.flip) hx = 100 - hx;
  return { x: c.x + (hx - 50) / 100 * CHAR_W * sc, y: c.y - CHAR_H * sc + HANDS[hand].y / 160 * CHAR_H * sc };
}
/** Which character hand (if any) would catch a holdable item dropped at world point p. */
function holdTarget(p: { x: number; y: number }): { c: Character; hand: Hand } | null {
  const s = store.get(); let best: { c: Character; hand: Hand; d: number } | null = null;
  for (const c of s.characters) {
    if (c.room !== s.currentRoom) continue;
    const sc = charScale(c);
    const onBody = Math.abs(p.x - c.x) < CHAR_W * sc / 2 + 25 && p.y > c.y - CHAR_H * sc - 25 && p.y < c.y + 20;
    for (const hand of ['left', 'right'] as Hand[]) {
      if (c.held[hand]) continue;
      const h = handWorld(c, hand), d = Math.hypot(p.x - h.x, p.y - h.y);
      if ((onBody || d < 75) && (!best || d < best.d)) best = { c, hand, d };
    }
  }
  return best;
}

// ---------- render ----------
const PATTERNS = [
  'none',
  'radial-gradient(circle, rgba(255,255,255,.55) 7px, transparent 8px)',
  'repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 26px, transparent 26px 52px)',
  'linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%), linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%)',
];
const FLOOR_BOARDS = 'repeating-linear-gradient(90deg, rgba(90,61,92,.08) 0 3px, transparent 3px 125px), linear-gradient(rgba(0,0,0,.06), transparent 50%)';
// Single quotes: this value is dropped into style="…" attributes, and a " would end the attribute early.
const cssUrl = (u: string) => `url('${u.replace(/'/g, '%27')}')`;
function renderRoomBg(s: GameState) {
  const room = s.rooms[s.currentRoom];
  const wall = $('wall'), floor = $('floor');
  const wt = room.wallTile ? PATTERN_MAP[room.wallTile] : undefined; // missing pack asset -> falls back to colour/pattern
  wall.style.backgroundColor = room.wallpaper;
  if (wt) { wall.style.backgroundImage = cssUrl(wt.url); wall.style.backgroundSize = '220px auto'; wall.style.backgroundPosition = '0 0'; }
  else {
    wall.style.backgroundImage = PATTERNS[room.pattern] ?? 'none';
    wall.style.backgroundSize = room.pattern === 1 ? '44px 44px' : room.pattern === 3 ? '60px 60px' : 'auto';
    wall.style.backgroundPosition = room.pattern === 3 ? '0 0, 30px 30px' : '0 0';
  }
  const ft = room.floorTile ? PATTERN_MAP[room.floorTile] : undefined;
  floor.style.backgroundColor = room.floor;
  floor.style.backgroundImage = ft ? `${cssUrl(ft.url)}, linear-gradient(rgba(0,0,0,.06), transparent 50%)` : FLOOR_BOARDS;
  floor.style.backgroundSize = ft ? '180px auto, auto' : 'auto';
  $('mmWall').style.background = room.wallpaper; $('mmFloor').style.background = room.floor;
}
function renderMinimap(s: GameState) {
  const room = s.rooms[s.currentRoom];
  const dots = room.items.filter(i => ITEM_MAP[i.kind]).map(i => `<i style="left:${i.x / W * 100}%;top:${(i.y - hOf(ITEM_MAP[i.kind]) * i.scale / 2) / H * 100}%"></i>`).join('');
  const me = s.characters.filter(c => c.room === s.currentRoom).map(c => `<b style="left:${c.x / W * 100}%;top:${(c.y - 90) / H * 100}%;background:${c.shirt}"></b>`).join('');
  $('mmDots').innerHTML = dots + me;
}
function renderTabs(s: GameState) {
  $('tabs').innerHTML = ROOMS.map(r => `<button class="tab ${s.currentRoom === r.id ? 'on' : ''}" data-room="${r.id}" style="--c:${r.color}">${r.name}</button>`).join('');
}
function placeEl(el: HTMLElement, x: number, y: number, w: number, h: number) {
  el.style.left = (x - w / 2) / W * 100 + '%';
  el.style.top = (y - h) / H * 100 + '%';
  el.style.width = w / W * 100 + '%';
  el.style.height = h / H * 100 + '%';
}

/** Phone stage is CSS-scaled, so the kennel and tower grow until the tap box is 44px. iPad keeps the drawn size. */
function placedBox(def: ItemDef, scale: number) {
  let w = def.w * scale, h = hOf(def) * scale;
  if ((def.kind === 'kennel' || def.kind === 'cat-tower') && document.body.classList.contains('phone')) {
    const sc = Math.max(0.2, stageScale() || 1);
    const minW = 44 * W / (Math.max(1, VIEW_W) * sc);
    const minH = 44 / sc;
    if (w < minW) w = minW;
    if (h < minH) h = minH;
  }
  return { w, h };
}
function renderItems(s: GameState) {
  const room = s.rooms[s.currentRoom];
  const seen = new Set<string>();
  for (const it of room.items) {
    const def = ITEM_MAP[it.kind]; if (!def) continue; // unknown kind (e.g. removed pack) -> skipped, kept in save
    seen.add(it.id);
    let el = layer.querySelector<HTMLElement>(`.item[data-id="${it.id}"]`);
    if (!el) {
      el = document.createElement('div');
      el.className = 'item'; el.dataset.id = it.id;
      el.innerHTML = `<div class="inner">${svgOf(def)}</div>`;
      layer.appendChild(el);
      el.addEventListener('pointerdown', e => beginItemDrag(el!, e));
    }
    el.dataset.kind = it.kind;
    const box = placedBox(def, it.scale);
    placeEl(el, it.x, it.y, box.w, box.h);
    el.style.zIndex = String(1000 + it.z);
    el.classList.toggle('flipped', it.flip);
    el.classList.toggle('sel', selected === it.id);
  }
  layer.querySelectorAll<HTMLElement>('.item').forEach(el => { if (!seen.has(el.dataset.id!)) el.remove(); });
  renderToolbar(s); renderMinimap(s);
}

const charEls = new Map<string, HTMLElement>();
function heldHTML(c: Character) {
  const sc = charScale(c), bw = CHAR_W * sc, bh = CHAR_H * sc;
  return (['left', 'right'] as Hand[]).map(hand => {
    const it = c.held[hand]; const def = it && ITEM_MAP[it.kind]; if (!it || !def) return '';
    const k = Math.min(0.7, 120 * sc / Math.max(def.w, hOf(def)) / it.scale);
    const iw = def.w * it.scale * k, ih = hOf(def) * it.scale * k;
    const hx = HANDS[hand].x / 100 * bw, hy = HANDS[hand].y / 160 * bh;
    return `<div class="held ${it.flip ? 'flipped' : ''}" data-hand="${hand}" style="left:${(hx - iw / 2) / bw * 100}%;top:${(hy - ih * 0.62) / bh * 100}%;width:${iw / bw * 100}%;height:${ih / bh * 100}%"><div class="inner">${svgOf(def)}</div></div>`;
  }).join('');
}
function renderChars(s: GameState) {
  const here = s.characters.filter(c => c.room === s.currentRoom);
  for (const [id, el] of charEls) if (!here.some(c => c.id === id)) { el.remove(); charEls.delete(id); }
  for (const c of here) {
    let el = charEls.get(c.id);
    if (!el) {
      el = document.createElement('div'); el.className = 'char'; el.dataset.cid = c.id;
      el.innerHTML = `<div class="inner"></div><div class="hands"></div>`;
      layer.appendChild(el); charEls.set(c.id, el); attachCharDrag(el);
    }
    const look = [c.skin, c.hair, c.hairStyle, c.shirt, c.pants, c.acc].join('|');
    if (el.dataset.look !== look) { el.querySelector('.inner')!.innerHTML = characterSVG(c); el.dataset.look = look; }
    const heldKey = JSON.stringify([c.held.left?.id, c.held.left?.flip, c.held.right?.id, c.held.right?.flip, c.size]);
    if (el.dataset.held !== heldKey) { el.querySelector('.hands')!.innerHTML = heldHTML(c); el.dataset.held = heldKey; }
    const sc = charScale(c);
    placeEl(el, c.x, c.y, CHAR_W * sc, CHAR_H * sc);
    el.style.zIndex = String(5000 + Math.round(c.y));
    el.classList.toggle('flipped', c.flip);
    el.classList.toggle('active', c.id === activeChar);
  }
  renderMinimap(s);
}

function renderToolbar(s: GameState) {
  const it = selected && s.rooms[s.currentRoom].items.find(i => i.id === selected);
  if (!it || !ITEM_MAP[it.kind]) { toolbar.classList.add('hidden'); return; }
  const def = ITEM_MAP[it.kind];
  const top = it.y - hOf(def) * it.scale - 20;
  toolbar.classList.remove('hidden');
  toolbar.style.left = Math.max(camX + 130, Math.min(camX + VIEW_W - 130, it.x)) / W * 100 + '%';
  toolbar.style.top = Math.max(40, top) / H * 100 + '%';
}
function renderSoundBtn(s: GameState) { $('btnSound').innerHTML = s.soundOn ? ICON.soundOn : ICON.soundOff; setSound(s.soundOn); }

function renderAll() {
  const s = store.get();
  layer.innerHTML = ''; charEls.clear();
  renderTabs(s); renderRoomBg(s); renderItems(s); renderChars(s); renderSoundBtn(s);
  const first = s.characters.find(c => c.room === s.currentRoom);
  const me = hood && myPres();
  const focusX = me && me.where === 'house' ? me.x : first?.x;
  stopGlide(); setCam(cams[s.currentRoom] ?? clampCam(focusX !== undefined ? focusX - VIEW_W / 2 : V1_OFFSET));
  renderAvatars(); renderHoodChrome();
  if (document.body.classList.contains('phone') && view === 'house') requestAnimationFrame(() => phoneShowHouseKid());
}

store.subscribe((s, a) => {
  switch (a.type) {
    case 'room/switch': if (hood && inner !== local) moveMeToRoom(a.room); renderAll(); renderDrawer(); break;
    case 'game/reset': renderAll(); break;
    case 'room/wallpaper': case 'room/floor': case 'room/pattern': case 'room/wallTile': case 'room/floorTile': renderRoomBg(s); break;
    case 'char/update': case 'char/move': renderChars(s); if (view === 'ranch') renderRanchAvatars(); else if (view === 'park') renderParkAvatars(); break;
    case 'char/add': case 'char/delete': case 'char/hold': case 'char/release': renderItems(s); renderChars(s); if (currentTab === '__people') renderDrawer(); break;
    case 'settings/sound': renderSoundBtn(s); break;
    default: renderItems(s);
  }
});

// ---------- effects ----------
function bounce(el: Element | null | undefined) { if (!el) return; const i = el.querySelector(':scope > .inner') ?? el; i.classList.remove('bounce'); void (i as HTMLElement).offsetWidth; i.classList.add('bounce'); }
function sparkles(cx: number, cy: number, n = 7) {
  const fx = $('fx'); const cols = ['#ffd166', '#ff8fab', '#8ecae6', '#80ed99', '#c9a0dc'];
  for (let i = 0; i < n; i++) {
    const p = document.createElement('div'); p.className = 'spark';
    const ang = (Math.PI * 2 * i) / n + Math.random() * .5, d = 40 + Math.random() * 30;
    p.style.left = cx + 'px'; p.style.top = cy + 'px'; p.style.background = cols[i % cols.length];
    p.style.setProperty('--dx', Math.cos(ang) * d + 'px'); p.style.setProperty('--dy', Math.sin(ang) * d + 'px');
    fx.appendChild(p); setTimeout(() => p.remove(), 650);
  }
}
const sparkleAt = (el: Element | null | undefined) => { const r = el?.getBoundingClientRect(); if (r) sparkles(r.left + r.width / 2, r.top + r.height / 2); };
function poof(cx: number, cy: number) { sparkles(cx, cy, 10); sfx.pop(); }
function showHoldTarget(t: { c: Character; hand: Hand } | null) {
  charEls.forEach((el, id) => { el.classList.toggle('hold-target', !!t && t.c.id === id); el.dataset.hand = t && t.c.id === id ? t.hand : ''; });
}
function holdInto(t: { c: Character; hand: Hand }, itemId: string) {
  store.dispatch({ type: 'char/hold', id: t.c.id, hand: t.hand, room: t.c.room, itemId });
  selected = null; renderItems(store.get());
  const el = charEls.get(t.c.id); bounce(el); sparkleAt(el?.querySelector(`.held[data-hand="${t.hand}"]`)); sfx.sparkle();
}

// ---------- dragging ----------
type DragCtx = { onMove: (e: PointerEvent) => void; onUp: (e: PointerEvent) => void; edgeScroll?: boolean };
// Multi-touch tracking: two fingers anywhere on the stage = pan, and pauses any single-finger drag.
const touches = new Map<number, number>();
let twoFinger = false, twoLastX = 0;
const avgX = () => [...touches.values()].reduce((a, b) => a + b, 0) / touches.size;
stage.addEventListener('pointerdown', e => {
  if (e.pointerType !== 'touch') return;
  touches.set(e.pointerId, e.clientX);
  if (touches.size >= 2) { twoFinger = true; twoLastX = avgX(); stopGlide(); toolbar.classList.add('hidden'); }
}, true);
window.addEventListener('pointermove', e => {
  if (!touches.has(e.pointerId)) return;
  touches.set(e.pointerId, e.clientX);
  if (twoFinger && touches.size >= 2) { const a = avgX(); setCam(camX - (a - twoLastX) / stageScale()); twoLastX = a; }
}, true);
const endTouch = (e: PointerEvent) => { touches.delete(e.pointerId); if (touches.size < 2 && twoFinger) { if (touches.size === 0) twoFinger = false; else twoLastX = avgX(); } };
window.addEventListener('pointerup', endTouch, true); window.addEventListener('pointercancel', endTouch, true);

// Auto-scroll the camera while dragging near the left/right edge of the stage.
const EDGE = 80;
function edgeSpeed(cx: number, cy: number) {
  const r = stage.getBoundingClientRect();
  if (cy < r.top - 40 || cy > r.bottom + 10) return 0;
  if (cx < r.left + EDGE) return -Math.min(1, (r.left + EDGE - cx) / EDGE) * 16;
  if (cx > r.right - EDGE) return Math.min(1, (cx - (r.right - EDGE)) / EDGE) * 16;
  return 0;
}
function startDrag(e: PointerEvent, ctx: DragCtx) {
  let last = e, raf = 0;
  const tick = () => {
    const v = twoFinger ? 0 : edgeSpeed(last.clientX, last.clientY);
    if (v) { const before = camX; setCam(camX + v); if (camX !== before) ctx.onMove(last); }
    raf = requestAnimationFrame(tick);
  };
  if (ctx.edgeScroll !== false) raf = requestAnimationFrame(tick);
  const move = (ev: PointerEvent) => { if (ev.pointerId !== e.pointerId) return; ev.preventDefault(); last = ev; if (!twoFinger) ctx.onMove(ev); };
  const up = (ev: PointerEvent) => { if (ev.pointerId !== e.pointerId) return; cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); ctx.onUp(ev); };
  window.addEventListener('pointermove', move, { passive: false });
  window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
}

function beginItemDrag(el: HTMLElement, e: PointerEvent, forceMoved = false) {
  e.preventDefault(); e.stopPropagation();
  if (twoFinger) return;
  if (!canEdit()) { lockedNudge(el); return; }
  const s = store.get(); const room = s.currentRoom;
  const id = el.dataset.id!; const it = s.rooms[room].items.find(i => i.id === id); if (!it) return;
  const def = ITEM_MAP[it.kind];
  const p0 = toRoom(e.clientX, e.clientY); const off = { x: it.x - p0.x, y: it.y - p0.y };
  let moved = forceMoved, target: ReturnType<typeof holdTarget> = null;
  selected = id; store.dispatch({ type: 'item/front', room, id });
  el.classList.add('lifted'); sfx.pick();
  startDrag(e, {
    onMove(ev) {
      const p = toRoom(ev.clientX, ev.clientY);
      if (Math.hypot(p.x - p0.x, p.y - p0.y) > 6) moved = true;
      if (moved) { toolbar.classList.add('hidden'); bin.classList.add('show'); }
      bin.classList.toggle('hot', overBin(ev.clientX, ev.clientY));
      const half = def.w * it.scale / 2;
      store.dispatch({ type: 'item/move', room, id, x: Math.max(half * .6, Math.min(W - half * .6, p.x + off.x)), y: snapY(def, p.y + off.y) });
      if (moved) toolbar.classList.add('hidden');
      target = moved && def.holdable ? holdTarget(p) : null; showHoldTarget(target);
    },
    onUp(ev) {
      el.classList.remove('lifted'); bin.classList.remove('show', 'hot'); showHoldTarget(null);
      if (moved && overBin(ev.clientX, ev.clientY)) { selected = null; store.dispatch({ type: 'item/delete', room, id }); poof(ev.clientX, ev.clientY); return; }
      if (moved && target) { holdInto(target, id); return; }
      if (moved) sfx.drop(); else { sfx.click(); onPlaceTap(id); }
      bounce(el); renderItems(store.get());
    },
  });
}

/** Drag a held item off a hand: it is released into the room and becomes a normal dragged item. */
function beginHeldDrag(charEl: HTMLElement, heldEl: HTMLElement, e: PointerEvent) {
  e.preventDefault(); e.stopPropagation();
  if (twoFinger) return;
  const cid = charEl.dataset.cid!, hand = heldEl.dataset.hand as Hand;
  const c = store.get().characters.find(c => c.id === cid); const it = c?.held[hand]; if (!c || !it) return;
  const r = heldEl.getBoundingClientRect(); const p = toRoom(r.left + r.width / 2, r.bottom);
  store.dispatch({ type: 'char/release', id: cid, hand, x: p.x, y: p.y });
  const el = layer.querySelector<HTMLElement>(`.item[data-id="${it.id}"]`);
  if (el) beginItemDrag(el, e, true);
}

function attachCharDrag(el: HTMLElement) {
  el.addEventListener('pointerdown', e => {
    const heldEl = (e.target as HTMLElement).closest<HTMLElement>('.held');
    if (heldEl) { if (!canEdit()) { e.stopPropagation(); lockedNudge(el); return; } return beginHeldDrag(el, heldEl, e); }
    e.preventDefault(); e.stopPropagation();
    if (twoFinger) return;
    if (!canEdit()) { lockedNudge(el); return; }
    selected = null; renderItems(store.get());
    const id = el.dataset.cid!; activeChar = id;
    const s = store.get(); const c = s.characters.find(c => c.id === id); if (!c) return;
    const p0 = toRoom(e.clientX, e.clientY); const off = { x: c.x - p0.x, y: c.y - p0.y };
    let lastX = c.x, moved = false;
    el.classList.add('lifted'); sfx.pick(); renderChars(store.get());
    startDrag(e, {
      onMove(ev) {
        const p = toRoom(ev.clientX, ev.clientY); const nx = p.x + off.x;
        if (Math.hypot(p.x - p0.x, p.y - p0.y) > 6) moved = true;
        const cur = store.get().characters.find(x => x.id === id); if (!cur) return;
        if (Math.abs(nx - lastX) > 3) { const flip = nx < lastX; if (flip !== cur.flip) store.dispatch({ type: 'char/update', id, patch: { flip } }); lastX = nx; }
        store.dispatch({ type: 'char/move', id, room: s.currentRoom, x: nx, y: Math.max(FLOOR_Y + 40, p.y + off.y) });
        // hovering a room tab = "walk to that room"
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('drop'));
        (document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement | null)?.closest('.tab:not(.on)')?.classList.add('drop');
      },
      onUp(ev) {
        el.classList.remove('lifted'); document.querySelectorAll('.tab').forEach(t => t.classList.remove('drop'));
        const tab = (document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement | null)?.closest<HTMLElement>('[data-room]');
        const cur = store.get().characters.find(x => x.id === id);
        if (moved && cur && tab && tab.dataset.room !== s.currentRoom) {
          const r = tab.getBoundingClientRect(); sparkles(r.left + r.width / 2, r.top + r.height / 2, 9); sfx.swish();
          store.dispatch({ type: 'char/move', id, room: tab.dataset.room as RoomId, x: cur.x, y: cur.y });
          return;
        }
        sfx.drop(); bounce(el);
      },
    });
  });
}

// Drawer -> room (items)
function attachShelfDrag(btn: HTMLElement, def: ItemDef) {
  btn.addEventListener('pointerdown', e => {
    e.preventDefault();
    if (!canEdit()) { lockedNudge(btn); return; }
    const ghost = document.createElement('div'); ghost.className = 'ghost'; ghost.innerHTML = svgOf(def);
    document.body.appendChild(ghost);
    const k = Math.max(1, 60 / (Math.max(def.w, hOf(def)) * stageScale()));
    const gw = def.w * stageScale() * k, gh = hOf(def) * stageScale() * k;
    ghost.style.width = gw + 'px'; ghost.style.height = gh + 'px';
    let target: ReturnType<typeof holdTarget> = null;
    const pos = (ev: PointerEvent) => {
      ghost.style.left = ev.clientX - gw / 2 + 'px'; ghost.style.top = ev.clientY - gh * .8 + 'px';
      target = def.holdable && inStage(ev.clientX, ev.clientY) ? holdTarget(toRoom(ev.clientX, ev.clientY)) : null; showHoldTarget(target);
    };
    pos(e); sfx.pick(); btn.classList.add('pressed');
    const sx = e.clientX, sy = e.clientY;
    startDrag(e, {
      onMove: pos,
      onUp(ev) {
        ghost.remove(); btn.classList.remove('pressed'); showHoldTarget(null);
        const room = store.get().currentRoom;
        const tapped = Math.hypot(ev.clientX - sx, ev.clientY - sy) < 8;
        let x: number, y: number;
        if (tapped) { x = camX + 380 + Math.random() * 240; y = def.wall ? Math.min(WALL_BOTTOM, 200 + hOf(def) / 2) : 500 + Math.random() * 40; }
        else if (inStage(ev.clientX, ev.clientY)) { const p = toRoom(ev.clientX, ev.clientY); x = p.x; y = snapY(def, p.y + hOf(def) * .2); }
        else return;
        const item: PlacedItem = { id: newId(def.kind.replace(/[^a-z0-9-]/gi, '')), kind: def.kind, x, y, flip: false, z: 0, scale: 1 };
        store.dispatch({ type: 'item/add', room, item });
        if (!tapped && target) { holdInto(target, item.id); return; }
        selected = item.id; renderItems(store.get());
        const el = layer.querySelector(`.item[data-id="${item.id}"]`); bounce(el); sparkleAt(el); sfx.sparkle();
      },
    });
  });
}

// Drawer -> room (people): drag a card to bring that character here; tap to edit.
function attachPersonCard(btn: HTMLElement, id: string) {
  btn.addEventListener('pointerdown', e => {
    e.preventDefault();
    if (!canEdit()) { lockedNudge(btn); return; }
    const c = store.get().characters.find(c => c.id === id); if (!c) return;
    const sc = charScale(c), gw = CHAR_W * sc * stageScale(), gh = CHAR_H * sc * stageScale();
    const ghost = document.createElement('div'); ghost.className = 'ghost'; ghost.innerHTML = characterSVG(c);
    ghost.style.width = gw + 'px'; ghost.style.height = gh + 'px'; document.body.appendChild(ghost);
    const pos = (ev: PointerEvent) => { ghost.style.left = ev.clientX - gw / 2 + 'px'; ghost.style.top = ev.clientY - gh * .85 + 'px'; };
    const sx = e.clientX, sy = e.clientY; let moved = false;
    ghost.style.visibility = 'hidden';
    startDrag(e, {
      onMove(ev) { if (Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) { moved = true; ghost.style.visibility = ''; } pos(ev); },
      onUp(ev) {
        ghost.remove();
        if (!moved) { sfx.click(); activeChar = id; openSheet('dress'); return; }
        if (!inStage(ev.clientX, ev.clientY)) return;
        const p = toRoom(ev.clientX, ev.clientY), room = store.get().currentRoom;
        store.dispatch({ type: 'char/move', id, room, x: p.x, y: Math.max(FLOOR_Y + 40, p.y + CHAR_H * sc * .15) });
        activeChar = id; renderChars(store.get());
        const el = charEls.get(id); bounce(el); sparkleAt(el); sfx.sparkle();
      },
    });
  });
}

const pick = <T,>(a: readonly T[]) => a[Math.floor(Math.random() * a.length)];
function addCharacter(): string | null {
  if (!canEdit()) { lockedNudge(null); return null; }
  const s = store.get(); if (s.characters.length >= MAX_CHARS) return null;
  const id = newId('c');
  store.dispatch({ type: 'char/add', char: newCharacter({ id, skin: pick(SKINS), hair: pick(HAIRS), hairStyle: Math.floor(Math.random() * HAIR_STYLES), shirt: pick(CLOTHES), pants: pick(CLOTHES), room: s.currentRoom, x: camX + 300 + Math.random() * 400, y: 520 + Math.random() * 40 }) });
  activeChar = id; renderChars(store.get());
  const el = charEls.get(id); bounce(el); sparkleAt(el); sfx.sparkle();
  return id;
}

function activeRoomFilter() { return roomFilter === 'all' ? 'all' : store.get().currentRoom; }
function renderDrawer() {
  const room = store.get().currentRoom;
  const rf = activeRoomFilter();
  const rname = ROOMS.find(r => r.id === room)?.name ?? 'This room';
  const all = rf === 'all';
  $('roomFilter').innerHTML = `<button class="rf ${all ? 'on' : ''}" data-rf="${all ? 'room' : 'all'}">${all ? 'Just ' + rname : 'All rooms'}</button>`;
  const hasSecrets = tabItems('secrets', 'all').length > 0;
  // Pack tabs stay on screen in every room (Glossy is all salon pieces, and kids still need to see it).
  const visible = TABS.filter(t => t.id !== 'secrets' && (t.kind === 'people' || t.kind === 'pack' || tabItems(t.id, rf).length));
  if (!(currentTab === 'secrets' && hasSecrets) && !visible.some(t => t.id === currentTab)) currentTab = visible[1]?.id ?? '__people';
  $('cats').innerHTML = visible.map(t => `<button class="cat ${t.kind} ${t.id === currentTab ? 'on' : ''}" data-cat="${t.id}" aria-label="${t.name}" title="${t.name}">${t.kind === 'people' ? PEOPLE_ICON : t.kind === 'pack' ? `<span class="packicon">${svgOf(ITEM_MAP[t.icon])}</span><span class="packname">${t.name}</span>` : svgOf(ITEM_MAP[t.icon])}</button>`).join('')
    + (hasSecrets ? `<button class="cat secretTab ${currentTab === 'secrets' ? 'on' : ''}" data-cat="secrets" aria-label="Secrets" title="Secrets">🎁</button>` : '');
  const shelf = $('shelf'); shelf.innerHTML = '';
  if (!canEdit()) { shelf.innerHTML = `<div class="empty locked">🔒 This house is look-only right now</div>`; return; }
  if (currentTab === '__people') {
    const s = store.get();
    const meLook = myLook();
    if (meLook) {
      const b = document.createElement('button'); b.className = 'thing person me'; b.setAttribute('aria-label', 'Me');
      b.innerHTML = `<div class="face">${characterSVG(meLook)}</div><span class="meStar">★</span>`;
      b.addEventListener('click', () => { sfx.click(); activeChar = ME; openSheet('dress'); }); shelf.appendChild(b);
    }
    for (const c of s.characters) {
      const b = document.createElement('button'); b.className = 'thing person'; b.setAttribute('aria-label', 'Character');
      b.innerHTML = `<div class="face">${characterSVG(c)}</div><span class="where" style="background:${roomColor(c.room)}"></span>`;
      shelf.appendChild(b); attachPersonCard(b, c.id);
    }
    if (s.characters.length < MAX_CHARS) {
      const b = document.createElement('button'); b.className = 'thing add'; b.setAttribute('aria-label', 'New character'); b.innerHTML = PLUS;
      b.addEventListener('click', () => { if (addCharacter()) { renderDrawer(); openSheet('dress'); } });
      shelf.appendChild(b);
    }
    return;
  }
  const list = tabItems(currentTab, currentTab.startsWith('pack:') ? 'all' : rf);
  if (!list.length) shelf.innerHTML = `<div class="empty">Nothing here yet!</div>`;
  for (const d of list) {
    const b = document.createElement('button'); b.className = 'thing'; b.setAttribute('aria-label', d.name);
    b.innerHTML = svgOf(d); shelf.appendChild(b); attachShelfDrag(b, d);
  }
  shelf.scrollLeft = 0;
}

// ---------- panels ----------
function swatches(list: string[], cur: string, act: string) {
  return `<div class="sw">${list.map(c => `<button class="dot ${c === cur ? 'on' : ''}" style="background:${c}" data-act="${act}" data-v="${c}"></button>`).join('')}</div>`;
}
let sheetMode: 'paint' | 'dress' | null = null;
let confirmDelete = false;
function renderSheet() {
  const s = store.get(); const card = $('card');
  if (sheetMode === 'paint') {
    const r = s.rooms[s.currentRoom];
    const wallTiles = PATTERNS_FROM_PACKS.filter(p => p.kind === 'wallpaper'), floorTiles = PATTERNS_FROM_PACKS.filter(p => p.kind === 'floor');
    const tile = (p: typeof wallTiles[0], cur: string | null | undefined, act: string, bg: string) =>
      `<button class="dot pat tile ${p.id === cur ? 'on' : ''}" data-act="${act}" data-v="${p.id}" title="${p.name} (${packLabel(p.pack)})" style="background-color:${bg};background-image:${cssUrl(p.url)};background-size:48px auto"></button>`;
    card.innerHTML = `<button class="close" data-act="close">✕</button><h2>Paint the room</h2>
      <h3>Walls</h3>${swatches(WALLS, r.wallpaper, 'wall')}
      <h3>Wallpaper</h3><div class="sw">${PATTERNS.map((p, i) => `<button class="dot pat ${!r.wallTile && i === r.pattern ? 'on' : ''}" data-act="pat" data-v="${i}" style="background-color:${r.wallpaper};background-image:${p};background-size:${i === 1 ? '16px 16px' : i === 3 ? '20px 20px' : 'auto'}"></button>`).join('')}${wallTiles.map(p => tile(p, r.wallTile, 'wtile', r.wallpaper)).join('')}</div>
      <h3>Floor</h3>${swatches(FLOORS, r.floor, 'floor')}
      ${floorTiles.length ? `<h3>Floor style</h3><div class="sw"><button class="dot pat ${!r.floorTile ? 'on' : ''}" data-act="ftile" data-v="" style="background-color:${r.floor};background-image:${FLOOR_BOARDS}"></button>${floorTiles.map(p => tile(p, r.floorTile, 'ftile', r.floor)).join('')}</div>` : ''}`;
  } else if (sheetMode === 'dress') {
    const meLook = myLook();
    const meChar = meLook ? newCharacter({ id: ME, ...meLook }) : null;
    let c = activeChar === ME && meChar ? meChar : s.characters.find(x => x.id === activeChar) ?? meChar ?? s.characters[0];
    const picker = `<div class="picker">${meChar ? `<button class="pk me ${c?.id === ME ? 'on' : ''}" data-act="pickc" data-v="${ME}"><div class="face">${characterSVG(meChar)}</div><span class="meStar">★</span></button>` : ''}${s.characters.map(x => `<button class="pk ${x.id === c?.id ? 'on' : ''}" data-act="pickc" data-v="${x.id}"><div class="face">${characterSVG(x)}</div><span class="where" style="background:${roomColor(x.room)}"></span></button>`).join('')}${s.characters.length < MAX_CHARS ? `<button class="pk add" data-act="newc">${PLUS}</button>` : ''}</div>`;
    if (!c) { card.innerHTML = `<button class="close" data-act="close">✕</button><h2>Characters</h2>${picker}<p class="hint">Tap + to make someone new!</p>`; return; }
    activeChar = c.id;
    const thumb = (patch: Partial<Character>) => characterSVG({ ...c, ...patch }).replace('<svg ', '<svg preserveAspectRatio="xMidYMin slice" ');
    card.innerHTML = `<button class="close" data-act="close">✕</button>${picker}<div class="dress"><div class="previewCol"><div class="preview"><div style="height:${SIZE_SCALE[c.size] * 78}%">${characterSVG(c)}</div></div>
        ${c.id === ME ? `<div class="meNote">This is you!</div>` : `<button class="del ${confirmDelete ? 'sure' : ''}" data-act="delc">`}${c.id === ME ? '' : `${ICON.trash}<span>${confirmDelete ? 'Tap again' : ''}</span></button>`}</div><div class="opts">
      <div class="row2"><div class="optCol"><h3>Size</h3><div class="sw">${SIZES.map(z => `<button class="dot sz ${z === c.size ? 'on' : ''}" data-act="size" data-v="${z}"><div style="height:${SIZE_SCALE[z] * 70}%">${characterSVG(c)}</div></button>`).join('')}</div></div>
      <div class="optCol"><h3>Extras</h3><div class="sw">${Array.from({ length: ACCESSORIES }, (_, i) => `<button class="dot hs ${i === c.acc ? 'on' : ''}" data-act="acc" data-v="${i}">${thumb({ acc: i })}</button>`).join('')}</div></div></div>
      <h3>Skin</h3>${swatches(SKINS, c.skin, 'skin')}
      <h3>Hair</h3>${swatches(HAIRS, c.hair, 'hair')}
      <h3>Hair style</h3><div class="sw">${Array.from({ length: HAIR_STYLES }, (_, i) => `<button class="dot hs ${i === c.hairStyle ? 'on' : ''}" data-act="hs" data-v="${i}">${thumb({ hairStyle: i, acc: 0 })}</button>`).join('')}</div>
      <h3>Shirt</h3>${swatches(CLOTHES, c.shirt, 'shirt')}
      <h3>Pants</h3>${swatches(CLOTHES, c.pants, 'pants')}</div></div>`;
  }
}
function openSheet(m: 'paint' | 'dress') { sheetMode = m; confirmDelete = false; renderSheet(); $('sheet').classList.remove('hidden'); sfx.swish(); }
$('sheet').addEventListener('click', e => {
  const t = (e.target as HTMLElement).closest<HTMLElement>('[data-act]');
  if (e.target === $('sheet') || t?.dataset.act === 'close') { $('sheet').classList.add('hidden'); sheetMode = null; sfx.click(); if (currentTab === '__people') renderDrawer(); return; }
  if (!t) return;
  const s = store.get(), room = s.currentRoom, v = t.dataset.v!, id = activeChar ?? '';
  const act = t.dataset.act;
  if (act !== 'delc') confirmDelete = false;
  switch (act) {
    case 'wall': store.dispatch({ type: 'room/wallpaper', room, color: v }); break;
    case 'floor': store.dispatch({ type: 'room/floor', room, color: v }); break;
    case 'pat': store.dispatch({ type: 'room/pattern', room, pattern: +v }); break;
    case 'wtile': store.dispatch({ type: 'room/wallTile', room, tile: v }); break;
    case 'ftile': store.dispatch({ type: 'room/floorTile', room, tile: v || null }); break;
    case 'skin': case 'hair': case 'shirt': case 'pants': updateChar(id, { [act]: v }); break;
    case 'hs': updateChar(id, { hairStyle: +v }); break;
    case 'acc': updateChar(id, { acc: +v }); break;
    case 'size': updateChar(id, { size: v as Character['size'] }); renderChars(store.get()); break;
    case 'pickc': activeChar = v; renderChars(store.get()); sfx.click(); renderSheet(); return;
    case 'newc': if (!addCharacter()) return; break;
    case 'delc':
      if (id === ME || !canEdit()) return;
      if (!confirmDelete) { confirmDelete = true; sfx.click(); renderSheet(); return; }
      confirmDelete = false;
      { const el = charEls.get(id); const r = el?.getBoundingClientRect(); store.dispatch({ type: 'char/delete', id }); if (r) poof(r.left + r.width / 2, r.top + r.height / 2); else sfx.pop(); }
      activeChar = store.get().characters[0]?.id ?? null; renderSheet(); return;
  }
  sfx.sparkle(); renderSheet(); bounce(document.querySelector('.preview'));
});

// ---------- wiring ----------
$('tabs').addEventListener('click', e => {
  const b = (e.target as HTMLElement).closest<HTMLElement>('[data-room]'); if (!b) return;
  const room = b.dataset.room as RoomId; if (room === store.get().currentRoom) return;
  selected = null; sfx.swish();
  stage.classList.remove('swap'); void stage.offsetWidth; stage.classList.add('swap');
  store.dispatch({ type: 'room/switch', room });
});
$('cats').addEventListener('click', e => {
  const b = (e.target as HTMLElement).closest<HTMLElement>('[data-cat]'); if (!b) return;
  currentTab = b.dataset.cat!; sfx.click(); renderDrawer();
});
$('roomFilter').addEventListener('click', e => {
  const sec = (e.target as HTMLElement).closest<HTMLElement>('[data-cat]'); if (sec) { currentTab = sec.dataset.cat!; sfx.click(); renderDrawer(); return; }
  const b = (e.target as HTMLElement).closest<HTMLElement>('[data-rf]'); if (!b) return;
  roomFilter = b.dataset.rf === 'all' ? 'all' : ''; sfx.click(); renderDrawer();
});
toolbar.addEventListener('pointerdown', e => e.stopPropagation());
toolbar.addEventListener('click', e => {
  const b = (e.target as HTMLElement).closest<HTMLElement>('[data-a]'); if (!b || !selected) return;
  if (!canEdit()) { lockedNudge(null); return; }
  const room = store.get().currentRoom, id = selected, el = layer.querySelector(`.item[data-id="${id}"]`);
  switch (b.dataset.a) {
    case 'flip': store.dispatch({ type: 'item/flip', room, id }); sfx.swish(); bounce(el); break;
    case 'front': store.dispatch({ type: 'item/front', room, id }); sfx.click(); bounce(el); break;
    case 'back': store.dispatch({ type: 'item/back', room, id }); sfx.click(); bounce(el); break;
    case 'delete': { const r = el?.getBoundingClientRect(); selected = null; store.dispatch({ type: 'item/delete', room, id }); if (r) poof(r.left + r.width / 2, r.top + r.height / 2); break; }
  }
});
// One finger on empty wall/floor pans the room (with a little momentum); a tap deselects.
stage.addEventListener('pointerdown', e => {
  if ((e.target as HTMLElement).closest('.nudge')) return;
  stopGlide();
  const x0 = e.clientX, cam0 = camX; let moved = false, vx = 0, lx = e.clientX, lt = performance.now();
  startDrag(e, {
    edgeScroll: false,
    onMove(ev) {
      if (Math.abs(ev.clientX - x0) > 6) moved = true;
      if (!moved) return;
      const now = performance.now(); vx = (ev.clientX - lx) / Math.max(1, now - lt); lx = ev.clientX; lt = now;
      setCam(cam0 - (ev.clientX - x0) / stageScale());
    },
    onUp() {
      if (!moved) { if (selected) { selected = null; renderItems(store.get()); } return; }
      if (twoFinger) return;
      let v = -vx * 16 / stageScale();
      const coast = () => { if (Math.abs(v) < 0.3) return; setCam(camX + v); v *= 0.92; inertia = requestAnimationFrame(coast); };
      inertia = requestAnimationFrame(coast);
    },
  });
});
stage.addEventListener('wheel', e => { e.preventDefault(); stopGlide(); setCam(camX + (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) / stageScale()); }, { passive: false });
$('nudgeL').addEventListener('pointerdown', e => { e.stopPropagation(); sfx.swish(); glideTo((glideTarget ?? camX) - VIEW_W * 0.6); });
$('nudgeR').addEventListener('pointerdown', e => { e.stopPropagation(); sfx.swish(); glideTo((glideTarget ?? camX) + VIEW_W * 0.6); });
const mm = $('minimap');
mm.addEventListener('pointerdown', e => {
  e.stopPropagation(); e.preventDefault();
  const jump = (ev: PointerEvent) => { const r = mm.getBoundingClientRect(); glideTo((ev.clientX - r.left) / r.width * W - VIEW_W / 2); };
  jump(e); sfx.click();
  startDrag(e, { edgeScroll: false, onMove: jump, onUp() {} });
});
$('btnPaint').addEventListener('click', () => { if (!canEdit()) return lockedNudge(null); openSheet('paint'); });
$('btnDress').addEventListener('click', () => openSheet('dress'));
$('btnSound').addEventListener('click', () => { store.dispatch({ type: 'settings/sound', on: !store.get().soundOn }); sfx.click(); });
document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('contextmenu', e => e.preventDefault());


if ('serviceWorker' in navigator && import.meta.env.PROD) navigator.serviceWorker.register(import.meta.env.BASE_URL + 'sw.js');
(window as any).__store = store; // handy for debugging / tests
(window as any).__items = Object.fromEntries(ITEMS.filter(i => i.img).map(i => [i.kind, { w: i.w, h: hOf(i), cat: i.cat, holdable: i.holdable, svg: i.img!.includes('.svg') }]));
(window as any).__cam = { get: () => camX, set: setCam };
(window as any).__phoneShowKids = () => phoneShowKids();


// =====================================================================================
// Neighborhood (multiplayer). Offline play above keeps working when `hood` is null.
// =====================================================================================
const esc = (t: string) => t.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
function canEdit() { return !hood || inner === local || hood.canEdit(currentHouseId); }
function lockedNudge(el: Element | null) {
  sfx.pop(); const tag = $('houseTag'); tag.classList.remove('wiggle'); void tag.offsetWidth; tag.classList.add('wiggle');
  if (el) { el.classList.remove('nope'); void (el as HTMLElement).offsetWidth; el.classList.add('nope'); }
  toast('🔒 Look-only house: ask the owner to unlock it!', 1800);
}
const myPres = () => hood?.myPresence() ?? null;
const myLook = (): Look | null => (hood ? hood.players.get(hood.pid)?.look ?? null : null);
function updateChar(id: string, patch: Partial<Character>) {
  if (id === ME) { const l = myLook(); if (!l || !hood) return; hood.setLook(cleanLook({ ...l, ...patch })); renderAvatars(); if (view === 'street') renderMapFaces(); if (view === 'park') renderParkAvatars(); if (view === 'ranch') renderRanchAvatars(); return; }
  store.dispatch({ type: 'char/update', id, patch });
}
function setMyPres(p: Presence) { hood?.setPresence(p); }
function moveMeToRoom(room: RoomId) { const p = myPres(); if (p && p.where === 'house') setMyPres({ ...p, room }); }

function useStore(next: AnyStore) {
  inner = next; hookStore(next); selected = null; setTimeout(() => eggs.update());
  for (const k of Object.keys(cams)) delete cams[k];
  activeChar = next === local ? next.get().characters[0]?.id ?? null : ME;
  renderAll(); renderDrawer();
}

// ---------- avatars (other kids, and me) inside a house ----------
function avatarHTML(look: Look, name: string) {
  return `<div class="inner">${characterSVG(look)}</div><div class="nametag">${esc(name)}</div>`;
}
function renderAvatars() {
  const keep = new Set<string>();
  if (hood && inner !== local && view === 'house') {
    const room = store.get().currentRoom;
    const entries: [string, Presence][] = [...hood.presence.entries()];
    const mine = myPres(); if (mine) entries.push([hood.pid, mine]);
    for (const [pid, p] of entries) {
      const pl = hood.players.get(pid);
      if (!pl || p.where !== 'house' || p.houseId !== currentHouseId || p.room !== room) continue;
      keep.add(pid);
      let el = avatarEls.get(pid);
      if (!el || !el.isConnected) {
        el = document.createElement('div'); el.className = 'char avatar ' + (pid === hood.pid ? 'mine' : 'other'); el.dataset.pid = pid;
        layer.appendChild(el); avatarEls.set(pid, el);
        if (pid === hood.pid) attachMyAvatarDrag(el);
      }
      const look = pl.look, key = JSON.stringify(look) + pl.nickname;
      if (el.dataset.look !== key) { const b = el.querySelector('.bubble'); el.innerHTML = avatarHTML(look, pl.nickname); if (b) el.appendChild(b); el.dataset.look = key; }
      const sc = SIZE_SCALE[look.size] ?? 1;
      placeEl(el, p.x, p.y, CHAR_W * sc, CHAR_H * sc);
      el.style.zIndex = String(5000 + Math.round(p.y));
      el.classList.toggle('flipped', p.flip);
    }
  }
  for (const [pid, el] of avatarEls) if (!keep.has(pid) || !el.isConnected) { if (!keep.has(pid)) el.remove(); avatarEls.delete(pid); }
  updateNear();
}
function attachMyAvatarDrag(el: HTMLElement) {
  el.addEventListener('pointerdown', e => {
    e.preventDefault(); e.stopPropagation(); if (twoFinger || !hood) return;
    const p0 = myPres(); if (!p0 || p0.where !== 'house') return;
    const q0 = toRoom(e.clientX, e.clientY), off = { x: p0.x - q0.x, y: p0.y - q0.y };
    let lastX = p0.x; el.classList.add('lifted'); sfx.pick();
    startDrag(e, {
      onMove(ev) {
        const q = toRoom(ev.clientX, ev.clientY), cur = myPres(); if (!cur || cur.where !== 'house') return;
        const x = Math.max(40, Math.min(W - 40, q.x + off.x)), y = Math.max(FLOOR_Y + 40, Math.min(H, q.y + off.y));
        const flip = Math.abs(x - lastX) > 3 ? x < lastX : cur.flip; if (Math.abs(x - lastX) > 3) lastX = x;
        setMyPres({ ...cur, x, y, flip }); renderAvatars(); renderMinimap(store.get());
      },
      onUp() { el.classList.remove('lifted'); sfx.drop(); bounce(el); },
    });
  });
}

// ---------- speech bubbles ----------
function bubbleText(b: Bubble): string { if (b.kind === 'text') return b.v; return (b.kind === 'phrase' ? PHRASES : EMOTES)[b.v] ?? ''; }
// On a phone the stage is scaled down, so a bubble centered on someone near the edge
// can draw past the screen. Nudge it back. iPad never has body.phone, so this is a no-op there.
function clampPhoneBubbles() {
  const nodes = document.querySelectorAll<HTMLElement>('.bubble');
  if (!document.body.classList.contains('phone')) {
    nodes.forEach(el => { if (el.style.marginLeft || el.style.marginTop) { el.style.marginLeft = ''; el.style.marginTop = ''; } });
    return;
  }
  const view = stage.getBoundingClientRect();
  const sc = stageScale() || 1;
  nodes.forEach(el => {
    el.style.marginLeft = '0px';
    el.style.marginTop = '0px';
    const r = el.getBoundingClientRect();
    let dx = 0;
    if (r.width >= view.width - 8) dx = view.left + 4 - r.left;
    else if (r.left < view.left + 4) dx = view.left + 4 - r.left;
    else if (r.right > view.right - 4) dx = view.right - 4 - r.right;
    let dy = 0;
    if (r.top < view.top + 4) dy = view.top + 4 - r.top;
    else if (r.bottom > view.bottom - 4) dy = view.bottom - 4 - r.bottom;
    if (dx) el.style.marginLeft = dx / sc + 'px';
    if (dy) el.style.marginTop = dy / sc + 'px';
  });
}
function showBubble(pid: string, b: Bubble) {
  const el0 = view === 'street' ? document.querySelector<HTMLElement>(`#mapFaces .mapFace[data-pid="${pid}"]`)
    : view === 'park' ? document.querySelector<HTMLElement>(`#pavatars .savatar[data-pid="${pid}"]`)
    : view === 'ranch' ? document.querySelector<HTMLElement>(`#ravatars .savatar[data-pid="${pid}"]`)
    : view === 'gameroom' ? document.querySelector<HTMLElement>(`#gavatars .savatar[data-pid="${pid}"]`)
    : avatarEls.get(pid);
  const targets = el0 ? [el0] : [];
  for (const el of targets) {
    el.querySelector('.bubble')?.remove();
    const d = document.createElement('div'); d.className = 'bubble' + (b.kind === 'emote' ? ' emote' : '');
    d.textContent = bubbleText(b); el.appendChild(d);
    clampPhoneBubbles();
    setTimeout(() => d.classList.add('out'), 4600); setTimeout(() => d.remove(), 5000);
  }
  if (pid !== hood?.pid) sfx.click();
}
function nearbyCount() {
  const me = myPres(); if (!hood || !me) return 0;
  let n = 0; hood.presence.forEach(p => { if (isNear(me, p)) n++; }); return n;
}
function updateNear() {
  const n = nearbyCount(); $('btnChat').classList.toggle('glow', n > 0);
  const st = document.getElementById('chatNear'); if (st) { st.textContent = n ? `${n} friend${n > 1 ? 's' : ''} nearby can hear you` : 'Walk closer to a friend to talk!'; $('chatTray').classList.toggle('nobody', !n); }
}
function renderChatTray() {
  const tray = $('chatTray'); if (!hood) return;
  tray.innerHTML = `<div class="chatHead"><span id="chatNear"></span><button class="close" data-chat="close">✕</button></div>
    <div class="emotes">${EMOTES.map((e, i) => `<button data-emote="${i}">${e}</button>`).join('')}</div>
    <div class="phrases">${PHRASES.map((p, i) => `<button data-phrase="${i}">${esc(p)}</button>`).join('')}</div>
    ${hood.settings.freeChat ? `<form class="typed" id="chatForm"><input id="chatInput" maxlength="${MAX_CHAT}" autocomplete="off" autocorrect="on" enterkeyhint="send" placeholder="Type a message…"/><button type="submit">Send</button></form><div class="chatWarn" id="chatWarn"></div>` : `<div class="presetsOnly">Picking from the bubbles above 💬</div>`}`;
  updateNear();
  const form = document.getElementById('chatForm') as HTMLFormElement | null;
  form?.addEventListener('submit', e => {
    e.preventDefault(); const inp = $('chatInput') as HTMLInputElement;
    const f = filterChat(inp.value);
    if (!f.ok) { $('chatWarn').textContent = FILTER_MSG[f.reason] ?? ''; sfx.pop(); return; }
    if (!nearbyCount()) { toast('Walk closer to a friend to talk!'); return; }
    hood!.say({ kind: 'text', v: f.text }); inp.value = ''; $('chatWarn').textContent = ''; inp.blur();
  });
}
$('chatTray').addEventListener('click', e => {
  const t = e.target as HTMLElement; if (!hood) return;
  if (t.closest('[data-chat="close"]')) { $('chatTray').classList.add('hidden'); return; }
  const em = t.closest<HTMLElement>('[data-emote]'), ph = t.closest<HTMLElement>('[data-phrase]');
  if (!em && !ph) return;
  if (!nearbyCount()) { toast('Walk closer to a friend to talk!'); return; }
  hood.say(em ? { kind: 'emote', v: +em.dataset.emote! } : { kind: 'phrase', v: +ph!.dataset.phrase! }); sfx.click();
});
$('btnChat').addEventListener('click', () => { const t = $('chatTray'); if (t.classList.toggle('hidden')) return; renderChatTray(); sfx.swish(); });

// ---------- chrome: buttons, house tag ----------
function renderHoodChrome() {
  const b = document.body.classList;
  const inHouse = !!hood && inner !== local && view === 'house';
  const h = inHouse ? hood!.houses.get(currentHouseId) : undefined;
  const own = !!h && h.meta.ownerId === hood!.pid;
  b.toggle('mode-hood', !!hood); b.toggle('view-street', view !== 'house'); b.toggle('view-park', view === 'park'); b.toggle('view-ranch', view === 'ranch'); b.toggle('view-map', view === 'street'); b.toggle('view-gameroom', view === 'gameroom'); b.toggle('in-barn', view === 'ranch' && inBarn); renderBasketChip();
  b.toggle('own-house', own); b.toggle('locked', !!h && !canEdit()); b.toggle('has-hood', !!hoodServerUrl());
  if (h) {
    const owner = hood!.players.get(h.meta.ownerId)?.nickname ?? '';
    $('houseTag').innerHTML = `${h.meta.locked ? '🔒 ' : ''}<b>${esc(h.meta.name)}</b>${own ? ' · yours' : owner ? ' · ' + esc(owner) : ''}`;
    $('btnLock').innerHTML = h.meta.locked ? ICONS.lockOn : ICONS.lockOff;
    $('btnLock').setAttribute('aria-label', h.meta.locked ? 'Unlock house' : 'Lock house');
  }
  updateNear();
  if (document.body.classList.contains('phone')) syncChrome();
}
$('btnLock').addEventListener('click', () => {
  const h = hood?.houses.get(currentHouseId); if (!h || h.meta.ownerId !== hood!.pid) return;
  hood!.lock(h.meta.id, !h.meta.locked); sfx.click(); toast(h.meta.locked ? 'Unlocked: friends can decorate!' : 'Locked: friends can look but not change things');
});

// ---------- the neighborhood map (one tap takes you anywhere; side-scrolling only inside a scene) ----------
type Place = { kind: 'house'; houseId: string; room?: RoomId } | { kind: 'home' } | { kind: 'park' } | { kind: 'ranch' } | { kind: 'barn' } | { kind: 'square' } | { kind: 'gameroom' };
const mapAnchors = new Map<string, { x: number; y: number }>(); // where face markers stand for each place (map units)
let mapKey = '';
let fakeHouses = 0; // test hook only: draw a pretend street with this many houses
function mapScale() { const r = $('street'); return Math.min(r.clientWidth / MAP_W, r.clientHeight / MAP_H); }
function mapHouses() { return hood ? [...hood.houses.values()].map(h => h.meta).sort((a, b) => a.slot - b.slot) : []; }
function renderMap(force = false) {
  if (view !== 'street') return;
  const sc = mapScale(), w = $('mapWorld');
  const houses = mapHouses();
  const key = sc.toFixed(3) + JSON.stringify(houses) + (hood ? houses.map(h => (hood!.players.get(h.ownerId)?.online ? 1 : 0)).join('') + hood.pid : 'solo');
  if (!force && key === mapKey && w.querySelector('#mapFaces')) { renderMapFaces(); return; }
  mapKey = key;
  w.style.width = MAP_W * sc + 'px'; w.style.height = MAP_H * sc + 'px'; w.style.setProperty('--sc', String(sc));
  w.innerHTML = mapBgSVG();
  const road = w.querySelector<SVGPathElement>('#mapRoad')!, L = road.getTotalLength();
  const samples = Array.from({ length: 160 }, (_, i) => road.getPointAtLength(L * i / 159));
  const onRoad = (x: number, y: number) => samples.some(p => Math.hypot(p.x - x, p.y - y) < 50);
  const px = (v: number) => v * sc + 'px';
  const taken = baseTaken();
  mapAnchors.clear();
  // houses along the road, alternating sides (whichever side has more room)
  const list: ({ id: string; name: string; style: number; locked: boolean; mine: boolean; lit: boolean } | null)[] = hood
    ? houses.map(h => ({ id: h.id, name: h.name, style: h.style, locked: h.locked, mine: h.ownerId === hood!.pid, lit: !!hood!.players.get(h.ownerId)?.online }))
    : fakeHouses ? Array.from({ length: fakeHouses }, (_, i) => ({ id: 'fake' + i, name: ['Reagan', 'Quinn', 'Chloe', 'Sloane', 'Cada', 'Emma', 'Olivia', 'Charlotte', 'Amelia', 'Sophia', 'Isabella', 'Mia'][i % 12] + "'s House", style: i, locked: i === 3, mine: i === 0, lit: i % 3 !== 1 })) : [null];
  const n = list.length, hw = n > 8 ? 80 : 94, hh = hw * 300 / 320;
  let html = '';
  const spotsXY = houseSpots(road, n, taken);
  list.forEach((h, i) => {
    const c = spotsXY[i];
    const go = h ? `house:${h.id}` : 'home', name = h ? h.name : 'My House';
    mapAnchors.set(h ? 'house:' + h.id : 'home', { x: c.x, y: c.y - hh / 2 - 4 });
    html += `<button class="mapSpot mapHouse ${h?.mine || !h ? 'mine' : ''}" data-go="${go}" aria-label="${esc(name)}" style="left:${px(c.x - hw / 2)};top:${px(c.y - hh / 2)};width:${px(hw)};height:${px(hh)}">${houseSVG(h ? h.style : 0, { lit: h ? h.lit : true })}${h?.locked ? '<span class="lockBadge">🔒</span>' : ''}${h?.mine || !h ? '<span class="homeBadge">★</span>' : ''}</button>
      <div class="mapSign ${h?.mine || !h ? 'mine' : ''} ${c.x > MAP_W - 130 ? 'edgeR' : c.x < 130 ? 'edgeL' : ''}" style="left:${px(c.x > MAP_W - 130 ? MAP_W - 8 : c.x < 130 ? 8 : c.x)};top:${px(c.y + hh / 2 - 2)}">${esc(name)}</div>`;
  });
  html += `<button class="mapSpot mapPark" data-go="park" aria-label="The park" style="left:${px(PARK.x - 100)};top:${px(PARK.y - 85)};width:${px(200)};height:${px(170)}">${parkMiniSVG}</button><div class="mapSign place" style="left:${px(PARK.x)};top:${px(PARK.y + 70)}">Park</div>`;
  html += `<button class="mapSpot mapRanch" data-go="ranch" aria-label="Rainbow Ranch" style="left:${px(RANCH.x - 110)};top:${px(RANCH.y - 90)};width:${px(220)};height:${px(180)}">${ranchMiniSVG}</button><div class="mapSign place" style="left:${px(RANCH.x)};top:${px(RANCH.y + 78)}">Rainbow Ranch</div>`;
  html += `<button class="mapSpot mapClub" data-go="gameroom" aria-label="The clubhouse" style="left:${px(CLUB.x - 95)};top:${px(CLUB.y - 78)};width:${px(190)};height:${px(156)}">${clubhouseMiniSVG}</button><div class="mapSign place" style="left:${px(CLUB.x)};top:${px(CLUB.y + 82)}">Clubhouse</div>`;
  mapAnchors.set('park', { x: PARK.x, y: PARK.y - 60 }); mapAnchors.set('ranch', { x: RANCH.x - 30, y: RANCH.y - 60 }); mapAnchors.set('barn', { x: RANCH.x + 10, y: RANCH.y + 10 });
  mapAnchors.set('gameroom', { x: CLUB.x, y: CLUB.y - 52 });
  w.insertAdjacentHTML('beforeend', mapTreesSVG(taken, onRoad) + html + '<div class="mapFaces" id="mapFaces"></div>');
  renderMapFaces();
}
const baseTaken = () => [{ x: PARK.x, y: PARK.y, r: 115 }, { x: RANCH.x, y: RANCH.y, r: 125 }, { x: SQUARE.x, y: SQUARE.y, r: 100 }, { x: CLUB.x, y: CLUB.y, r: 90 }];
/** Where n houses go: evenly along the road, on whichever side has more room (never on the park, ranch or square). */
function houseSpots(road: SVGPathElement, n: number, taken: { x: number; y: number; r: number }[]) {
  const L = road.getTotalLength(), out: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.2 : 0.05 + 0.75 * i / (n - 1);
    const p = road.getPointAtLength(L * t), q = road.getPointAtLength(Math.min(L, L * t + 3));
    let nx = -(q.y - p.y), ny = q.x - p.x; const d = Math.hypot(nx, ny) || 1; nx /= d; ny /= d;
    const cand = [1, -1].map(side => ({ x: p.x + nx * 72 * side, y: p.y + ny * 72 * side }))
      .map(c => ({ ...c, score: Math.min(...taken.map(o => Math.hypot(o.x - c.x, o.y - c.y) - o.r), c.x - 50, MAP_W - 50 - c.x, c.y - 60, MAP_H - 40 - c.y) }));
    const prefer = i % 2 ? cand : [cand[1], cand[0]];
    const c = prefer[0].score > 0 || prefer[0].score >= prefer[1].score ? prefer[0] : prefer[1];
    c.x = Math.max(60, Math.min(MAP_W - 60, c.x)); c.y = Math.max(62, Math.min(MAP_H - 72, c.y)); // the house and its name sign stay on the map
    taken.push({ x: c.x, y: c.y, r: 70 }); out.push({ x: c.x, y: c.y });
  }
  return out;
}
/** Test hook: lay out n houses on the current map and report the closest gaps (map units). */
(window as any).__mapFake = (n: number) => { fakeHouses = n; renderMap(true); };
(window as any).__mapLayout = (n: number) => {
  const road = document.querySelector<SVGPathElement>('#mapRoad'); if (!road) return null;
  const pts = houseSpots(road, n, baseTaken()); let minHouse = 1e9, minSpot = 1e9, inside = true;
  pts.forEach((a, i) => { pts.forEach((b, j) => { if (j > i) minHouse = Math.min(minHouse, Math.hypot(a.x - b.x, a.y - b.y)); });
    baseTaken().forEach(o => { minSpot = Math.min(minSpot, Math.hypot(a.x - o.x, a.y - o.y) - o.r); });
    if (a.x < 55 || a.x > MAP_W - 55 || a.y < 60 || a.y > MAP_H - 70) inside = false; });
  return { n, minHouse, minSpot, inside };
};
function placeOf(p: Presence): Place {
  if (p.where === 'house' && p.houseId) return { kind: 'house', houseId: p.houseId, room: p.room };
  if (p.where === 'park' || p.where === 'ranch' || p.where === 'barn' || p.where === 'gameroom') return { kind: p.where };
  return { kind: 'square' };
}
const placeKey = (pl: Place) => (pl.kind === 'house' ? 'house:' + pl.houseId : pl.kind);
function renderMapFaces() {
  const box = document.getElementById('mapFaces'); if (!box || view !== 'street') return;
  const sc = mapScale(), keep = new Set<string>();
  const who: { key: string; look: Look; name: string; mine: boolean; place: Place }[] = [];
  if (hood) {
    const entries: [string, Presence][] = [...hood.presence.entries()]; const mine = myPres(); if (mine) entries.push([hood.pid, mine]);
    for (const [pid, p] of entries) { const pl = hood.players.get(pid); if (pl) who.push({ key: pid, look: pl.look, name: pl.nickname, mine: pid === hood.pid, place: placeOf(p) }); }
  } else { const c = local.get().characters[0]; if (c) who.push({ key: 'solo', look: cleanLook(c), name: 'You', mine: true, place: { kind: 'square' } }); }
  const groups = new Map<string, typeof who>();
  for (const x of who) { const k = placeKey(x.place); if (!groups.has(k)) groups.set(k, []); groups.get(k)!.push(x); }
  for (const [k, g] of groups) {
    g.sort((a, b) => (a.mine ? -1 : b.mine ? 1 : a.name.localeCompare(b.name)));
    g.forEach((x, j) => {
      let fx: number, fy: number;
      if (k === 'square') { const a = -Math.PI / 2 + j * (Math.PI * 2 / Math.max(5, g.length)); fx = SQUARE.x + Math.cos(a) * 50; fy = SQUARE.y + Math.sin(a) * 50; }
      else { const an = mapAnchors.get(k) ?? { x: SQUARE.x, y: SQUARE.y }; const per = 4, row = Math.floor(j / per), col = j % per, m = Math.min(per, g.length - row * per); fx = an.x + (col - (m - 1) / 2) * 40; fy = an.y - row * 40; }
      keep.add(x.key);
      let el = box.querySelector<HTMLElement>(`.mapFace[data-pid="${x.key}"]`);
      if (!el) { el = document.createElement('button'); el.className = 'mapFace ' + (x.mine ? 'mine' : 'other'); el.dataset.pid = x.key; el.setAttribute('aria-label', x.mine ? 'You' : x.name); box.appendChild(el); }
      const lk = JSON.stringify(x.look) + x.name;
      if (el.dataset.look !== lk) { const b = el.querySelector('.bubble'); el.innerHTML = `<span class="face">${faceSVG(characterSVG(x.look))}</span><span class="fname">${esc(x.mine ? 'You' : x.name)}</span>`; if (b) el.appendChild(b); el.dataset.look = lk; }
      el.dataset.place = k; const s = 46;
      el.style.left = (fx - s / 2) * sc + 'px'; el.style.top = (fy - s / 2) * sc + 'px'; el.style.width = el.style.height = s * sc + 'px';
    });
  }
  box.querySelectorAll<HTMLElement>('.mapFace').forEach(el => { if (!keep.has(el.dataset.pid!)) el.remove(); });
  updateNear();
}
/** Zoom into the tapped spot, then go there (the new scene fades in). */
function mapGo(target: Place, from?: HTMLElement) {
  const w = $('mapWorld');
  if (from && !w.classList.contains('zoomIn')) {
    const r = from.getBoundingClientRect(), wr = w.getBoundingClientRect();
    w.style.transformOrigin = `${r.left + r.width / 2 - wr.left}px ${r.top + r.height / 2 - wr.top}px`;
    w.classList.remove('mapIn'); w.classList.add('zoomIn'); sfx.swish();
    setTimeout(() => { w.classList.remove('zoomIn'); goPlace(target); }, 360);
  } else goPlace(target);
}
function sceneIn(el: HTMLElement) { el.classList.remove('sceneIn'); void el.offsetWidth; el.classList.add('sceneIn'); setTimeout(() => el.classList.remove('sceneIn'), 600); }
function goPlace(t: Place) {
  if (t.kind === 'house') enterHouse(t.houseId, t.room);
  else if (t.kind === 'home') goHome();
  else if (t.kind === 'park') goPark();
  else if (t.kind === 'ranch') goRanch(false);
  else if (t.kind === 'barn') goRanch(true);
  else if (t.kind === 'gameroom') goGameRoom();
}
/** Tap a friend's face: go to where she is and stand next to her. */
function goToFriend(pid: string) {
  const p = hood?.presence.get(pid); if (!hood || !p) return;
  const pl = placeOf(p), name = hood.players.get(pid)?.nickname ?? 'your friend';
  if (pl.kind === 'square') { toast(`${name} is on the map too! 👋`); return; }
  const face = document.querySelector<HTMLElement>(`#mapFaces .mapFace[data-pid="${pid}"]`) ?? undefined;
  mapGo(pl, face);
  setTimeout(() => {
    const me = myPres(); if (!me || !hood) return;
    const x = p.x + (p.x > 300 ? -110 : 110);
    if (pl.kind === 'house' && me.where === 'house') { setMyPres({ ...me, x, y: p.y }); renderAvatars(); glideTo(x - VIEW_W / 2); }
    else if ((pl.kind === 'park' || pl.kind === 'ranch' || pl.kind === 'barn') && me.where === pl.kind) {
      setParkPres({ ...me, x, y: Math.max(RANCH_Y0, Math.min(RANCH_Y1, p.y)), flip: x > p.x } as Presence);
      const sc = pl.kind === 'park' ? parkScale() : ranchScale(), scroll = $(pl.kind === 'park' ? 'parkScroll' : 'ranchScroll');
      requestAnimationFrame(() => { scroll.scrollLeft = p.x * sc - scroll.clientWidth / 2; phoneShowKids(); });
    } else if (pl.kind === 'gameroom' && me.where === 'gameroom') {
      const seat = mySeat();
      if (!seat) setParkPres({ where: 'gameroom', x, y: Math.max(RANCH_Y0, Math.min(RANCH_Y1, p.y)), flip: x > p.x });
      const sc = grScale(), scroll = $('grScroll'), fx = seat?.x ?? p.x;
      requestAnimationFrame(() => { scroll.scrollLeft = fx * sc - scroll.clientWidth / 2; phoneShowKids(); });
    }
    toast(`You found ${name}! 💕`);
  }, 420);
}
$('mapWorld').addEventListener('click', e => {
  const t = e.target as HTMLElement; if (view !== 'street') return;
  const f = t.closest<HTMLElement>('.mapFace');
  if (f) { if (f.classList.contains('mine')) { bounce(f); sfx.pop(); toast("That's you! Tap a place to go there"); } else goToFriend(f.dataset.pid!); return; }
  const sp = t.closest<HTMLElement>('[data-go]'); if (!sp) return;
  const g = sp.dataset.go!;
  mapGo(g.startsWith('house:') ? { kind: 'house', houseId: g.slice(6) } : { kind: g as 'home' | 'park' | 'ranch' | 'gameroom' }, sp);
});
function hideScenes() { $('street').classList.add('hidden'); $('park').classList.add('hidden'); $('ranch').classList.add('hidden'); $('gameroom').classList.add('hidden'); tableApi()?.close(); $('chatTray').classList.add('hidden'); $('sheet').classList.add('hidden'); }
function goMap() {
  fetchSt = null; walkQueue = []; inBarn = false;
  if (hood) setMyPres({ where: 'street', x: 600, y: 540, flip: false }); else soloPark = null;
  hideScenes(); view = 'street'; $('street').classList.remove('hidden');
  $('streetTitle').textContent = hood ? 'Our Neighborhood' : 'My Map';
  renderHoodChrome(); renderMap(true);
  const w = $('mapWorld'); w.style.transformOrigin = '50% 50%'; w.classList.remove('zoomIn', 'mapIn'); void w.offsetWidth; w.classList.add('mapIn');
  sfx.swish();
}
/** Back to her own house (solo: the local house; neighborhood: her house on the street). */
function goHome() {
  if (hood) { const id = hood.myHouseId(); if (id && hood.houses.has(id)) enterHouse(id); return; }
  hideScenes(); view = 'house'; soloPark = null; renderHoodChrome(); renderAll(); sceneIn($('stageWrap')); sfx.sparkle();
  fitPhone();
}
function enterHouse(houseId: string, room: RoomId = 'living') {
  if (!hood || !hood.houses.has(houseId)) return;
  currentHouseId = houseId; view = 'house'; inBarn = false;
  let st = houseStores.get(houseId);
  if (!st) { st = houseStore(hood, houseId, { get: () => local.get().soundOn, set: on => local.dispatch({ type: 'settings/sound', on }) }); houseStores.set(houseId, st); }
  st.dispatch({ type: 'room/switch', room });
  setMyPres({ where: 'house', houseId, room, x: 900 + Math.random() * 300, y: 540, flip: false });
  hideScenes();
  useStore(st); sceneIn($('stageWrap')); sfx.sparkle();
  fitPhone();
}
function goSolo() {
  hood?.close(); hood = null; houseStores = new Map(); view = 'house'; currentHouseId = ''; soloPark = null; fetchSt = null; walkQueue = []; inBarn = false; $('elsewhere').classList.add('hidden');
  hideScenes();
  useStore(local); renderHoodChrome();
}
$('btnMap').addEventListener('click', () => { if (view === 'street') { sfx.pop(); return; } goMap(); });
$('btnHome').addEventListener('click', () => { if (view === 'house' && (!hood || currentHouseId === hood.myHouseId())) { sfx.pop(); return; } goHome(); });
$('phoneOk').addEventListener('click', () => { $('phoneNote').classList.add('hidden'); sfx.click(); });
$('elsewhereGo').addEventListener('click', () => { sfx.click(); void hood?.connect(); });
$('btnSolo').addEventListener('click', () => { goSolo(); toast('Playing in your own house 🏠'); });
window.addEventListener('resize', () => {
  if (view === 'street') renderMap(true);
  if (view === 'park') renderPark();
  if (view === 'ranch') renderRanch();
  if (view === 'gameroom') renderGameRoom();
  // A phone viewport applied after she was framed for a wider window leaves scroll at 0.
  phoneShowKids();
});

// ---------- connecting ----------
function enterNeighborhood(client: HoodClient) {
  hood = client; houseStores = new Map();
  client.on('players', () => { if (hood !== client) return; if (view === 'street') renderMap(); else if (view === 'park') renderParkAvatars(); else if (view === 'ranch') { renderRanchAvatars(); renderBasketChip(); } else if (view === 'gameroom') renderGamePeople(); else { renderAvatars(); renderHoodChrome(); } if (sheetMode === 'dress') renderSheet(); });
  client.on('houses', () => {
    if (hood !== client) return;
    if (view === 'street') renderMap();
    else if (view === 'house' && !client.houses.has(currentHouseId)) { toast('That house is gone now'); goMap(); }
  });
  client.on('houseMeta', (id: string) => { if (hood !== client || id !== currentHouseId || view !== 'house') return; selected = null; renderHoodChrome(); renderItems(store.get()); renderDrawer(); if (!canEdit()) $('sheet').classList.add('hidden'); });
  client.on('pres', () => { if (hood !== client) return; view === 'street' ? renderMapFaces() : view === 'park' ? renderParkAvatars() : view === 'ranch' ? renderRanchAvatars() : view === 'gameroom' ? renderGamePeople() : renderAvatars(); });
  client.on('ranch', () => { if (hood === client && view === 'ranch') renderPlots(true); });
  client.on('ranchFail', (r: string) => { if (hood === client) ranchFailToast(r); });
  client.on('noride', () => { if (hood !== client) return; const p = myPres(); if (p?.ride !== undefined) { const { ride: _r, ...q } = p; setMyPres(q); renderRanchAvatars(); } toast('Someone is riding that horse!'); });
  client.on('fx', (pid: string, fx: Fx) => { if (hood === client) onFx(pid, fx); });
  client.on('bubble', (pid: string, b: Bubble) => { if (hood === client) showBubble(pid, b); });
  client.on('sayFail', (r: string) => toast(r === 'presetsOnly' ? 'Typing is turned off: pick a bubble!' : FILTER_MSG[r] || "Couldn't send that"));
  client.on('settings', () => { if (!$('chatTray').classList.contains('hidden')) renderChatTray(); });
  client.on('removed', () => { toast('A grown-up took this iPad off the street'); const c = client.cfg; saveHoodConfig({ url: c.url, code: c.code, id: c.id, parentKey: c.parentKey }); goSolo(); });
  client.on('status', (st: string) => {
    if (hood !== client) return;
    document.body.classList.toggle('reconnecting', st !== 'online' && !client.replaced);
    if (st === 'online' || st === 'connecting') $('elsewhere').classList.add('hidden');
  });
  client.on('replaced', () => { if (hood === client) $('elsewhere').classList.remove('hidden'); });
  client.on('table', () => {
    if (hood !== client) return;
    if (view === 'gameroom') {
      const seat = mySeat(), me = myPres();
      if (seat && me?.where === 'gameroom' && Math.hypot(me.x - seat.x, me.y - seat.y) > 40) setMyPres({ where: 'gameroom', x: seat.x, y: Math.max(RANCH_Y0, Math.min(RANCH_Y1, seat.y)), flip: me.flip });
      renderGamePeople();
    }
    tableApi()?.refresh();
  });
  client.on('tblFail', (tb: number, reason: string) => { if (hood === client) tableApi()?.fail(tb, reason); });
  client.on('welcome', () => { if (hood !== client) return; if (view === 'street') renderMap(true); else if (view === 'park' || view === 'ranch') { const p = myPres(); if (p) setMyPres(p); view === 'park' ? renderPark() : renderRanch(); phoneShowKids(); } else if (view === 'gameroom') { const p = myPres(); if (p) setMyPres(p); renderGameRoom(); phoneShowKids(); tableApi()?.refresh(); } else if (client.houses.has(currentHouseId)) renderAll(); else goMap(); });
  goMap();
}
async function initHood() {
  renderHoodChrome();
  const url = hoodServerUrl(), cfg = loadHoodConfig();
  if (!url || !cfg?.token || cfg.url !== url) return;
  const c = new HoodClient(cfg); const r = await c.connect();
  if (r === 'ok') enterNeighborhood(c); else { c.close(); if (r !== 'closed') toast("Couldn't reach the street. Playing at home!"); }
}

// ---------- menus: join / create / parent ----------
function modal(html: string, onClick: (t: HTMLElement, close: () => void, root: HTMLElement) => void, cls = '') {
  const wrap = document.createElement('div'); wrap.className = 'sheet hoodSheet ' + cls; wrap.innerHTML = `<div class="card">${html}</div>`;
  document.body.appendChild(wrap); sfx.swish();
  const close = () => wrap.remove();
  wrap.addEventListener('click', e => { const t = e.target as HTMLElement; if (t === wrap || t.closest('[data-m="close"]')) return close(); onClick(t, close, wrap); });
  return { root: wrap, close };
}
const X = `<button class="close" data-m="close">✕</button>`;
$('btnHood').addEventListener('click', () => openHoodMenu());
function openHoodMenu() {
  const url = hoodServerUrl();
  if (!url) { modal(`${X}<h2>Neighborhood</h2><p class="hint">The street isn't open yet. Ask a grown-up to set it up!</p>`, () => {}); return; }
  const cfg = loadHoodConfig()?.url === url ? loadHoodConfig() : null;
  modal(`${X}<h2>Neighborhood</h2><div class="bigBtns">
      ${cfg?.token ? `<button class="big go" data-m="go">${ICONS.street}<span>Go to my street</span></button>` : `<button class="big go" data-m="join">${ICONS.street}<span>Join a friend's street</span></button>`}
      <button class="big grown" data-m="create">${ICONS.shield}<span>${cfg?.parentKey ? 'Grown-ups' : 'Grown-ups: start a street'}</span></button></div>`,
    async (t, close) => {
      const m = t.closest<HTMLElement>('[data-m]')?.dataset.m;
      if (m === 'go') { close(); const c = new HoodClient(cfg!); const r = await c.connect(); if (r === 'ok') enterNeighborhood(c); else { c.close(); toast(r.startsWith('badtoken') ? 'Please join again' : "Couldn't reach the street"); } }
      if (m === 'join') { close(); askCode(url); }
      if (m === 'create') { close(); if (await adultCheck()) cfg?.parentKey ? parentScreen() : createFlow(url); }
    });
}
async function createFlow(url: string) {
  let res: { code: string; id: string; parentKey: string };
  try { res = await createNeighborhood(url); } catch { toast("Couldn't create a street right now"); return; }
  saveHoodConfig({ url, code: res.code, id: res.id, parentKey: res.parentKey });
  modal(`${X}<h2>Your street is ready!</h2><p class="hint">Kids join with this code (you can pick your own on the grown-up screen):</p><div class="code" id="newCode">${res.code}</div>
    <p class="hint small">Grown-up key (keep it private; it opens the grown-up screen on another device):<br><b class="key" id="parentKey">${res.parentKey}</b></p>
    <div class="bigBtns"><button class="big grown" data-m="setup">${ICONS.shield}<span>Add kids' names &amp; code</span></button>
    <button class="big go" data-m="joinhere">${ICONS.street}<span>Join on this iPad</span></button></div>`,
    (t, close) => {
      if (t.closest('[data-m="joinhere"]')) { close(); joinWithCode(url, res.code); }
      if (t.closest('[data-m="setup"]')) { close(); parentScreen(); }
    });
}
function askCode(url: string, err = '') {
  const m = modal(`${X}<h2>Join a street</h2><p class="hint">Type the code a grown-up gave you</p>
    <form id="codeForm" class="codeForm"><input id="codeInput" maxlength="${CODE_MAX}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="CODE"/><button type="submit" class="go">Next</button></form>
    <p class="err">${esc(err)}</p>`, () => {});
  const inp = m.root.querySelector<HTMLInputElement>('#codeInput')!; setTimeout(() => inp.focus(), 50);
  inp.addEventListener('input', () => { inp.value = normCode(inp.value); });
  m.root.querySelector('#codeForm')!.addEventListener('submit', e => {
    e.preventDefault(); const code = normCode(inp.value);
    if (!validInvite(code)) { m.close(); askCode(url, 'That code looks wrong. Try again!'); return; }
    m.close(); joinWithCode(url, code);
  });
}
async function joinWithCode(url: string, code: string, err = '') {
  let r; try { r = await lookupNeighborhood(url, code); } catch { askCode(url, "Couldn't reach the street. Try again!"); return; }
  if ('slow' in r) { askCode(url, 'Too many tries. Ask a grown-up and try again in a few minutes.'); return; }
  if (!r.exists) { askCode(url, "Hmm, we couldn't find that street."); return; }
  (window as any).__lastLookupId = r.id;
  pickNickname(url, code, r.id, r.roster, err);
}
function pickNickname(url: string, code: string, id: string, roster: { name: string; claimed: boolean; hasHouse: boolean }[], err = '') {
  if (roster.length) {
    // sign in with the first name a grown-up added; a name already signed in on another iPad can't be picked
    modal(`${X}<h2>Who are you?</h2>${err ? `<p class="err">${esc(err)}</p>` : '<p class="hint">Tap your name</p>'}<div class="nicks roster">${roster.map((r, i) =>
      `<button data-nick="${i}" ${r.claimed ? 'disabled' : ''}>${esc(r.name)}${r.claimed ? '<small>signed in</small>' : ''}</button>`).join('')}</div>
      <p class="hint small">Not on the list? Ask a grown-up to add your name.</p>`,
      (t, close) => {
        const b = t.closest<HTMLButtonElement>('[data-nick]'); if (!b || b.disabled) return; close();
        const e = roster[+b.dataset.nick!];
        e.hasHouse ? connectJoin(url, code, id, e.name, undefined) : bringHouse(url, code, id, e.name);
      }, 'wide');
    return;
  }
  modal(`${X}<h2>Pick your street name</h2>${err ? `<p class="err">${esc(err)}</p>` : ''}<div class="nicks">${NICKNAMES.map((n, i) => `<button data-nick="${i}">${esc(n)}</button>`).join('')}</div>`,
    (t, close) => { const b = t.closest<HTMLElement>('[data-nick]'); if (!b) return; close(); bringHouse(url, code, id, NICKNAMES[+b.dataset.nick!]); }, 'wide');
}
function bringHouse(url: string, code: string, id: string, nickname: string) {
  modal(`${X}<h2>Hi, ${esc(nickname)}!</h2><p class="hint">What should your house on the street be?</p>
    <div class="bigBtns"><button class="big go" data-m="bring">${houseSVG(2)}<span>Bring my house</span></button>
    <button class="big" data-m="fresh">${houseSVG(5)}<span>Start a new one</span></button></div>`,
    (t, close) => { const m = t.closest<HTMLElement>('[data-m]')?.dataset.m; if (!m) return; close(); connectJoin(url, code, id, nickname, m === 'bring'); });
}
async function connectJoin(url: string, code: string, id: string, nickname: string, bring: boolean | undefined) {
  const s = local.get(); const meChar = s.characters[0];
  // your first character becomes "you" on the street; the rest stay in the house
  const look = cleanLook(meChar ?? {});
  let house: GameState | undefined;
  if (bring) { house = s; if (meChar) { const { reduce } = await import('./shared/state'); house = reduce(s, { type: 'char/delete', id: meChar.id }); } }
  const prev = loadHoodConfig();
  const cfg: HoodConfig = { url, code, id, parentKey: prev?.id === id || prev?.code === code ? prev.parentKey : undefined };
  const dog = s.dog ? { name: s.dog.name, breed: s.dog.breed } : null; // her solo dog comes along
  const c = new HoodClient(cfg); const r = await c.connect({ nickname, look, house, dog });
  if (r === 'ok') { saveHoodConfig(c.cfg); enterNeighborhood(c); toast(`Welcome to the street, ${nickname}!`); return; }
  c.close();
  if (r.startsWith('nickname')) joinWithCode(url, code, r.endsWith('notOnList') ? 'That name is not on the list anymore.' : 'That name is already signed in on another iPad. Ask a grown-up!');
  else toast(r === 'full' ? 'That street is full' : "Couldn't join right now");
}
$('btnParent').addEventListener('click', async () => { if (await adultCheck()) parentScreen(); });
const PARENT_NOTES: Record<string, string> = {
  codeTaken: 'That code is already used by another street. Try adding a number!', badCode: 'Codes are 4–16 letters or numbers.',
  badName: 'Use a first name only (letters).', rosterFull: `Up to ${MAX_ROSTER} names.`, nameInUse: 'Remove that player first.', codeFixed: "This street's code can't be changed.",
};
async function parentScreen() {
  const cfg = loadHoodConfig();
  if (!cfg) return;
  if (!cfg.parentKey) {
    const m = modal(`${X}<h2>Grown-up key</h2><p class="hint">Enter the key you got when the street was made</p><form id="keyForm" class="codeForm"><input id="keyInput" autocomplete="off" spellcheck="false"/><button class="go">OK</button></form>`, () => {});
    m.root.querySelector('#keyForm')!.addEventListener('submit', e => { e.preventDefault(); cfg.parentKey = (m.root.querySelector('#keyInput') as HTMLInputElement).value.trim(); saveHoodConfig(cfg); if (hood) hood.cfg.parentKey = cfg.parentKey; m.close(); parentScreen(); });
    return;
  }
  // the grown-up screen works whether or not this device has joined as a kid
  let client = hood;
  if (!client) { client = new HoodClient({ ...cfg, token: undefined }); await client.connect(); }
  const c = client;
  const val = (sel: string) => m.root.querySelector<HTMLInputElement>(sel)!.value;
  const m = modal(`${X}<h2>Grown-up screen</h2><div id="parentBody"><p class="hint">Loading…</p></div>`, async (t) => {
    const a = t.closest<HTMLElement>('[data-p]'); if (!a) return;
    const op = a.dataset.p;
    if (op === 'free') c.parent({ op: 'freeChat', on: a.dataset.on !== '1' });
    if (op === 'rename') c.parent({ op: 'rename', houseId: a.dataset.hid, name: val(`input[data-hid="${a.dataset.hid}"]`) });
    if (op === 'add') c.parent({ op: 'rosterAdd', name: a.dataset.name ?? val('#rosterInput') });
    if (op === 'unname') c.parent({ op: 'rosterRemove', name: a.dataset.name });
    if (op === 'unclaim') { if (a.dataset.sure !== '1') { a.dataset.sure = '1'; a.textContent = 'Tap again'; return; } c.parent({ op: 'unclaim', name: a.dataset.name }); }
    if (op === 'setcode') c.parent({ op: 'setCode', code: val('#codeEdit') });
    if (op === 'remove') { if (a.dataset.sure !== '1') { a.dataset.sure = '1'; a.textContent = 'Tap again to remove'; return; } c.parent({ op: 'remove', pid: a.dataset.pid }); }
    if (op === 'leave') { if (a.dataset.sure !== '1') { a.dataset.sure = '1'; a.textContent = 'Tap again: forget this street here'; return; } saveHoodConfig(null); m.close(); goSolo(); toast('This iPad left the street'); }
  }, 'wide parent');
  m.root.addEventListener('submit', e => { e.preventDefault(); const f = (e.target as HTMLElement).id; if (f === 'rosterForm') c.parent({ op: 'rosterAdd', name: val('#rosterInput') }); if (f === 'codeForm2') c.parent({ op: 'setCode', code: val('#codeEdit') }); });
  c.on('parentInfo', (info: any) => {
    const body = m.root.querySelector('#parentBody'); if (!body) return;
    // remember the current code on this device (sockets use the permanent id, so changing the code never kicks anyone)
    const saved = loadHoodConfig(); if (saved && saved.code !== info.code) { saved.code = info.code; saveHoodConfig(saved); } c.cfg.code = info.code;
    const roster: { name: string; claimed: boolean; hasHouse: boolean }[] = info.roster ?? [];
    const names = new Set(roster.map(r => r.name.toLowerCase()));
    const sugg = ROSTER_SUGGEST.filter(n => !names.has(n.toLowerCase()));
    const firstName = roster[0]?.name ?? 'Reagan';
    body.innerHTML = `${info.note ? `<p class="err" id="pNote">${esc(PARENT_NOTES[info.note] ?? info.note)}</p>` : ''}
      <div class="pRow"><div><div class="label">Invite code</div><div class="code small" id="pCode">${esc(info.code)}</div></div>
        <div><div class="label">Free typing in chat</div><button class="toggle ${info.settings.freeChat ? 'on' : ''}" data-p="free" data-on="${info.settings.freeChat ? 1 : 0}" id="pFree">${info.settings.freeChat ? 'On' : 'Off (presets only)'}</button></div></div>
      <form class="pAdd" id="codeForm2"><input id="codeEdit" maxlength="${CODE_MAX}" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="e.g. ${esc(normCode(firstName))}${7}"/><button data-p="setcode" type="button">Use this code</button></form>
      <p class="hint small">Tip: a word plus a number (like ${esc(normCode(firstName))}7) is easy to remember and harder to guess. Not case-sensitive.</p>
      <div class="label">Kids' names (sign-in list)</div>
      <div class="roster">${roster.map(r => `<span class="rName ${r.claimed ? 'claimed' : ''}"><b>${esc(r.name)}</b>${r.claimed
        ? `<i>signed in</i><button data-p="unclaim" data-name="${esc(r.name)}">Reset</button>`
        : r.hasHouse ? '<i>not signed in</i>' : `<button class="x" data-p="unname" data-name="${esc(r.name)}" aria-label="Remove name">×</button>`}</span>`).join('') || '<p class="hint">No names yet: kids pick a fun nickname instead.</p>'}</div>
      <form class="pAdd" id="rosterForm"><input id="rosterInput" maxlength="20" autocomplete="off" placeholder="First name"/><button data-p="add" type="button">Add</button></form>
      ${sugg.length ? `<div class="sugg">${sugg.map(n => `<button data-p="add" data-name="${n}">+ ${n}</button>`).join('')}</div>` : ''}
      <div class="label">Houses</div>${info.houses.map((h: any) => `<div class="pHouse"><input data-hid="${h.id}" value="${esc(h.name)}" maxlength="24"/><button data-p="rename" data-hid="${h.id}">Rename</button></div>`).join('') || '<p class="hint">No houses yet.</p>'}
      <div class="label">Players</div>${info.players.map((p: any) => `<div class="pPlayer"><span class="dot ${p.online ? 'on' : ''}"></span>${esc(p.nickname)}<button class="danger" data-p="remove" data-pid="${p.pid}">Remove</button></div>`).join('') || '<p class="hint">Nobody has joined yet.</p>'}
      <p class="hint small">Only the first names you add here are stored: no emails, last names, or chat history. "Reset" signs a name out of its iPad so it can sign in again on another one (her house stays). Chat bubbles are only relayed to kids standing nearby.</p>
      <button class="danger wideBtn" data-p="leave">Forget this street on this device</button>`;
  });
  c.on('error', (code: string) => { if (code === 'badkey') { toast("That grown-up key didn't work"); cfg.parentKey = undefined; saveHoodConfig(cfg); m.close(); } });
  c.parent({ op: 'info' });
}
// =====================================================================================
// Park + pets
// =====================================================================================
let soloPark: Presence | null = null;
type Walker = { key: string; look: Look; name: string; p: Presence; mine: boolean; dog: Dog | null };
function parkScale() { return $('park').clientHeight / PARK_H; }
const parkWalker = (): Character | undefined => { const s = local.get(); return s.characters.find(c => c.id === s.dog?.owner) ?? s.characters[0]; };
const myParkPres = (): Presence | null => (hood ? myPres() : soloPark);
function setParkPres(p: Presence) { if (hood) setMyPres(p); else soloPark = p; view === 'ranch' ? renderRanchAvatars() : view === 'gameroom' ? renderGamePeople() : renderParkAvatars(); }
function parkPeople(where: 'park' | 'ranch' | 'barn' | 'gameroom' = 'park'): Walker[] {
  if (hood) {
    const out: Walker[] = []; const entries: [string, Presence][] = [...hood.presence.entries()]; const mine = myPres(); if (mine) entries.push([hood.pid, mine]);
    for (const [pid, p] of entries) { const pl = hood.players.get(pid); if (pl && p.where === where) out.push({ key: pid, look: pl.look, name: pl.nickname, p, mine: pid === hood.pid, dog: pl.dog ?? null }); }
    return out;
  }
  const w = parkWalker();
  return soloPark && soloPark.where === where ? [{ key: 'solo', look: cleanLook(w ?? {}), name: '', p: soloPark, mine: true, dog: local.get().dog ?? null }] : [];
}
function renderPark() {
  const sc = parkScale(), w = $('parkWorld'), px = (v: number) => v * sc + 'px';
  w.style.width = PARK_W * sc + 'px'; w.style.height = PARK_H * sc + 'px'; w.style.setProperty('--sc', String(sc));
  w.innerHTML = parkSceneSVG()
    + PARK_SPOTS.map((sp, i) => sp.kind === 'swing' ? `<div class="swing" data-swing="${i}" style="left:${px(sp.x - 30)};top:${px(SWING_BAR)};width:${px(60)};height:${px(240)}">${swingSVG}</div>` : '').join('')
    + PARK_SPOTS.map((sp, i) => `<button class="pspot k-${sp.kind}" data-spot="${i}" aria-label="${sp.kind}" style="left:${px(sp.x - 50)};top:${px(sp.y - (sp.kind === 'swing' ? 70 : 55))};width:${px(100)};height:${px(sp.kind === 'swing' ? 90 : 65)}"></button>`).join('')
    + `<button class="pspot slide" data-act="slide" aria-label="Slide" style="left:${px(SLIDE.ladder - 45)};top:${px(SLIDE.top.y - 30)};width:${px(130)};height:${px(560 - SLIDE.top.y + 30)}"></button>`
    + `<button class="pspot pond" data-act="splash" aria-label="Pond" style="left:${px(1235)};top:${px(462)};width:${px(370)};height:${px(105)}"></button>`
    + `<button class="pspot gate" data-act="exit" aria-label="Back to the street" style="left:${px(25)};top:${px(240)};width:${px(180)};height:${px(260)}"></button>`
    + `<div class="ripples" id="ripples"></div><button class="ball" id="ball" aria-label="Ball">${ballSVG}</button><div class="savatars" id="pavatars"></div>`;
  placeBall(); renderParkAvatars();
  phoneShowKids();
}
const SWING_MS = 2400;
function renderParkAvatars() {
  const box = document.getElementById('pavatars'); if (!box || view !== 'park') return;
  const sc = parkScale(); const keep = new Set<string>(); const busy = new Set<number>();
  for (const w of parkPeople()) {
    keep.add(w.key);
    let el = box.querySelector<HTMLElement>(`.savatar[data-pid="${w.key}"]`);
    if (!el) { el = document.createElement('div'); el.className = 'savatar ' + (w.mine ? 'mine' : 'other'); el.dataset.pid = w.key; box.appendChild(el); if (w.mine) attachParkDrag(el); }
    const key = JSON.stringify(w.look) + w.name;
    if (el.dataset.look !== key) { const b = el.querySelector('.bubble'); el.innerHTML = w.name ? avatarHTML(w.look, w.name) : `<div class="inner">${characterSVG(w.look)}</div>`; if (b) el.appendChild(b); el.dataset.look = key; }
    const k = (SIZE_SCALE[w.look.size] ?? 1) * sc * 0.95, wd = CHAR_W * k, h = CHAR_H * k;
    el.style.left = w.p.x * sc - wd / 2 + 'px'; el.style.top = w.p.y * sc - h + 'px'; el.style.width = wd + 'px'; el.style.height = h + 'px';
    el.style.zIndex = String(100 + Math.round(w.p.y)); el.classList.toggle('flipped', w.p.flip);
    const pose = w.p.pose ?? '';
    if (el.dataset.pose !== pose) {
      el.classList.remove('pose-sit', 'pose-swing', 'pose-slide'); void el.offsetWidth;
      if (pose === 'slide') { el.style.setProperty('--sx', (SLIDE.top.x - SLIDE.bottom.x) * sc + 'px'); el.style.setProperty('--sy', (SLIDE.top.y - SLIDE.bottom.y) * sc + 'px'); }
      if (pose) el.classList.add('pose-' + pose);
      el.dataset.pose = pose;
    }
    if (pose === 'swing') { el.style.transformOrigin = `50% ${(SWING_BAR - w.p.y) * sc + h}px`; el.style.animationDelay = -(Date.now() % SWING_MS) / 1000 + 's'; busy.add(w.p.spot ?? -1); }
    else { el.style.transformOrigin = ''; el.style.animationDelay = ''; }
  }
  box.querySelectorAll<HTMLElement>('.savatar').forEach(el => { if (!keep.has(el.dataset.pid!)) el.remove(); });
  document.querySelectorAll<HTMLElement>('#parkWorld .swing').forEach(s => {
    const on = busy.has(+s.dataset.swing!); if (on && !s.classList.contains('swinging')) s.style.animationDelay = -(Date.now() % SWING_MS) / 1000 + 's';
    s.classList.toggle('swinging', on);
  });
  updateNear();
}
function attachParkDrag(el: HTMLElement) {
  el.addEventListener('pointerdown', e => {
    e.preventDefault(); e.stopPropagation(); const p0 = myParkPres(); if (!p0 || (p0.where !== 'park' && p0.where !== 'ranch' && p0.where !== 'barn')) return;
    const R = p0.where !== 'park', where = p0.where; walkQueue = [];
    const scroll = $(R ? 'ranchScroll' : 'parkScroll'); const sc = R ? ranchScale() : parkScale(), SWW = where === 'barn' ? BARN_W : R ? RANCH_W : PARK_W;
    const toW = (ev: PointerEvent) => { const r = $(R ? 'ranchWorld' : 'parkWorld').getBoundingClientRect(); return { x: (ev.clientX - r.left) / sc, y: (ev.clientY - r.top) / sc }; };
    const q0 = toW(e), off = { x: p0.x - q0.x, y: p0.y - q0.y }; let last = e, raf = 0, lastX = p0.x, moved = false;
    const apply = (ev: PointerEvent) => {
      const q = toW(ev), cur = myParkPres(); if (!cur) return;
      const x = Math.max(60, Math.min(SWW - 60, q.x + off.x)), y = Math.max(470, Math.min(590, q.y + off.y));
      if (!moved && Math.hypot(x - cur.x, y - cur.y) < 6) return; moved = true;
      const flip = Math.abs(x - lastX) > 3 ? x < lastX : cur.flip; if (Math.abs(x - lastX) > 3) lastX = x;
      setParkPres(where === 'barn' ? { where: 'barn', x, y, flip } : R ? { where: 'ranch', x, y, flip, ...(cur.ride !== undefined ? { ride: cur.ride } : {}) } : { where: 'park', x, y, flip });
    };
    const tick = () => { const r = scroll.getBoundingClientRect(); const v = last.clientX < r.left + 70 ? -10 : last.clientX > r.right - 70 ? 10 : 0; if (v && moved) { scroll.scrollLeft += v; apply(last); } raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); el.classList.add('lifted'); sfx.pick();
    const move = (ev: PointerEvent) => { if (ev.pointerId !== e.pointerId) return; last = ev; apply(ev); };
    const up = (ev: PointerEvent) => { if (ev.pointerId !== e.pointerId) return; cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); el.classList.remove('lifted'); sfx.drop(); };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  });
}
$('parkWorld').addEventListener('pointerdown', e => { if ((e.target as HTMLElement).closest('.pspot, .ball, .pet')) e.stopPropagation(); });
$('parkWorld').addEventListener('click', e => {
  const t = e.target as HTMLElement; const me = myParkPres(); if (!me) return;
  if (t.closest('#ball')) { throwBall(); return; }
  const sp = t.closest<HTMLElement>('[data-spot]');
  if (sp) {
    const i = +sp.dataset.spot!, s = PARK_SPOTS[i];
    if (me.spot === i && me.pose) { setParkPres({ where: 'park', x: s.x, y: Math.min(590, s.y + 40), flip: me.flip }); return; } // tap again to hop off
    if (parkPeople().some(w => !w.mine && w.p.spot === i && w.p.pose)) { toast('Someone is already there!'); return; }
    setParkPres({ where: 'park', x: s.x, y: s.y, flip: me.flip, pose: s.kind === 'swing' ? 'swing' : 'sit', spot: i }); s.kind === 'swing' ? sfx.boing() : sfx.drop(); return;
  }
  const act = t.closest<HTMLElement>('[data-act]')?.dataset.act;
  if (act === 'slide') {
    setParkPres({ where: 'park', x: SLIDE.bottom.x, y: SLIDE.bottom.y, flip: false, pose: 'slide' }); sfx.swish();
    setTimeout(() => { const c = myParkPres(); if (c?.pose === 'slide') setParkPres({ where: 'park', x: c.x, y: c.y, flip: c.flip }); }, 1500);
  }
  if (act === 'splash') { const r = $('parkWorld').getBoundingClientRect(); const x = (e.clientX - r.left) / parkScale(); splashAt(x); hood?.fx({ k: 'splash', x }); }
  if (act === 'exit') leavePark();
});
function splashAt(x: number) {
  const box = document.getElementById('ripples'); if (!box || view !== 'park') return; const sc = parkScale();
  for (let i = 0; i < 2; i++) { const r = document.createElement('div'); r.className = 'ripple'; const w = (120 + i * 70) * sc; Object.assign(r.style, { left: x * sc - w / 2 + 'px', top: 512 * sc - w * 0.18 + 'px', width: w + 'px', height: w * 0.36 + 'px', animationDelay: i * 0.15 + 's' }); box.appendChild(r); setTimeout(() => r.remove(), 1400); }
  for (let i = 0; i < 6; i++) { const d = document.createElement('div'); d.className = 'drop'; Object.assign(d.style, { left: x * sc + 'px', top: 505 * sc + 'px' }); d.style.setProperty('--dx', (i - 2.5) * 14 + 'px'); box.appendChild(d); setTimeout(() => d.remove(), 900); }
  sfx.splash();
}
function goPark() {
  hideScenes(); walkQueue = []; inBarn = false;
  view = 'park'; $('park').classList.remove('hidden'); sceneIn($('park'));
  const p: Presence = { where: 'park', x: 290, y: 548, flip: false };
  if (hood) setMyPres(p); else soloPark = p;
  $('streetTitle').textContent = 'The Park'; renderHoodChrome(); renderPark();
  requestAnimationFrame(() => { const scroll = $('parkScroll'); scroll.scrollLeft = 0; phoneShowKids(); });
  sfx.sparkle();
}
function leavePark() { goMap(); }
function goGameRoom() {
  hideScenes(); walkQueue = []; inBarn = false;
  view = 'gameroom'; $('gameroom').classList.remove('hidden');
  const seat = mySeat();
  const p: Presence = seat
    ? { where: 'gameroom', x: seat.x, y: Math.max(RANCH_Y0, Math.min(RANCH_Y1, seat.y)), flip: false }
    : { where: 'gameroom', x: 280, y: 560, flip: false };
  if (hood) setMyPres(p); else soloPark = p;
  $('streetTitle').textContent = 'The Clubhouse'; renderHoodChrome(); renderGameRoom();
  requestAnimationFrame(() => {
    const sc = grScale(), scroll = $('grScroll');
    scroll.scrollLeft = Math.max(0, ((seat?.x ?? 520) * sc) - scroll.clientWidth / 2);
    phoneShowKids();
  });
  sceneIn($('gameroom')); sfx.sparkle();
}
$('btnLeavePark').addEventListener('click', () => { if (view === 'ranch' && inBarn) goRanch(false); else leavePark(); });

// ---------- ball + fetch (each iPad animates the same throw) ----------
let ballPos = { x: 2620, y: 565 };
let fetchSt: { thrower: string; phase: 'fly' | 'chase' | 'carry'; dog: string | null; until: number } | null = null;
function placeBall(anim = false) {
  const el = document.getElementById('ball'); if (!el) return; const sc = parkScale(), s = 34 * sc;
  if (!anim) el.classList.remove('flying');
  el.style.left = ballPos.x * sc - s / 2 + 'px'; el.style.top = ballPos.y * sc - s + 'px'; el.style.width = el.style.height = s + 'px';
}
function throwBall() {
  if (fetchSt) return;
  const x = DOG_AREA.x0 + 40 + Math.random() * (DOG_AREA.x1 - DOG_AREA.x0 - 80), y = DOG_AREA.y0 + 25 + Math.random() * (DOG_AREA.y1 - DOG_AREA.y0 - 35);
  startFetch(hood ? hood.pid : 'solo', x, y); hood?.fx({ k: 'ball', x, y });
}
function startFetch(thrower: string, x: number, y: number) {
  if (view !== 'park') return;
  const el = document.getElementById('ball'); ballPos = { x, y }; fetchSt = { thrower, phase: 'fly', dog: null, until: performance.now() + 12000 };
  if (el) { el.classList.remove('flying'); void el.offsetWidth; el.classList.add('flying'); placeBall(true); }
  sfx.boing();
  setTimeout(() => { if (fetchSt?.phase === 'fly') { fetchSt.phase = 'chase'; document.getElementById('ball')?.classList.remove('flying'); if (!dogRuns.size) fetchSt = null; } }, 650);
}
function walkerPos(key: string): { x: number; y: number } | null {
  if (!hood) return soloPark;
  const p = key === hood.pid ? myPres() : hood.presence.get(key); return p && p.where === 'park' ? p : null;
}

// ---------- dogs follow their walker everywhere (house, street, park) ----------
interface DogRun { el: HTMLElement; box: HTMLElement; x: number; y: number; flip: boolean; pose: string; look: string; idle: number; trickUntil: number; sitTrick: boolean }
interface DogOwner { key: string; dog: Dog; x: number; y: number; flip: boolean; box: HTMLElement; place: (el: HTMLElement, x: number, y: number, w: number, h: number) => void; z: (y: number) => string; scale: number; riding?: boolean }
const dogRuns = new Map<string, DogRun>();
const pxPlace = (sc: number) => (el: HTMLElement, x: number, y: number, w: number, h: number) => { el.style.left = (x - w / 2) * sc + 'px'; el.style.top = (y - h) * sc + 'px'; el.style.width = w * sc + 'px'; el.style.height = h * sc + 'px'; };
function dogOwners(): DogOwner[] {
  const out: DogOwner[] = [];
  if (view === 'house') {
    const s = store.get();
    // Pets stay under every character (characters are 5000 + y, and y is at least the floor).
    const house = { box: layer, place: placeEl, z: (y: number) => String(4000 + Math.round(y)), scale: 1 };
    if (hood && inner !== local) {
      const entries: [string, Presence][] = [...hood.presence.entries()]; const mine = myPres(); if (mine) entries.push([hood.pid, mine]);
      for (const [pid, p] of entries) { const d = hood.players.get(pid)?.dog; if (d && p.where === 'house' && p.houseId === currentHouseId && p.room === s.currentRoom) out.push({ key: pid, dog: d, x: p.x, y: p.y, flip: p.flip, ...house }); }
    } else if (s.dog) {
      const c = s.characters.find(c => c.id === s.dog!.owner) ?? s.characters[0];
      if (c && c.room === s.currentRoom) out.push({ key: 'solo', dog: s.dog, x: c.x, y: c.y, flip: c.flip, ...house });
    }
  } else if (view === 'park') {
    const box = document.getElementById('pavatars'); if (!box) return out; const sc = parkScale();
    for (const w of parkPeople()) if (w.dog) out.push({ key: w.key, dog: w.dog, x: w.p.x, y: w.p.y, flip: w.p.flip, box, place: pxPlace(sc), z: y => String(Math.round(y) - 200), scale: 0.95 });
  } else if (view === 'ranch') {
    const box = document.getElementById('ravatars'); if (!box) return out; const sc = ranchScale();
    for (const w of parkPeople(inBarn ? 'barn' : 'ranch')) if (w.dog) out.push({ key: w.key, dog: w.dog, x: w.p.x, y: w.p.y, flip: w.p.flip, box, place: pxPlace(sc), z: y => String(100 + Math.round(y)), scale: 0.95, riding: w.p.ride !== undefined });
  } else if (view === 'gameroom') {
    const box = document.getElementById('gavatars'); if (!box) return out; const sc = grScale();
    for (const w of parkPeople('gameroom')) if (w.dog) out.push({ key: w.key, dog: w.dog, x: w.p.x, y: w.p.y, flip: w.p.flip, box, place: pxPlace(sc), z: y => String(Math.round(y) - 200), scale: 0.95 });
  }
  return out;
}
let lastTick = performance.now();
function tickDogs(now: number, dt: number) {
  const seen = new Set<string>();
  for (const o of dogOwners()) {
    if (isKenneled(o.key)) continue;
    seen.add(o.key);
    let r = dogRuns.get(o.key);
    const side = o.flip ? 1 : -1;
    const behind = o.riding ? 200 : 78;
    let homeX = o.x + side * behind;
    if (o.riding) homeX = Math.max(50, Math.min(RANCH_W - 50, homeX));
    const homeY = Math.min(595, o.y + (o.riding ? 28 : 6));
    if (!r || r.box !== o.box || !r.el.isConnected) {
      r?.el.remove();
      const el = document.createElement('div'); el.className = 'pet pet-dog'; el.dataset.dog = o.key; o.box.appendChild(el); attachDogTap(el, o.key);
      r = { el, box: o.box, x: homeX, y: homeY, flip: o.flip, pose: '', look: '', idle: 1, trickUntil: 0, sitTrick: false }; dogRuns.set(o.key, r);
    }
    let tx = homeX, ty = homeY, speed = o.riding ? 980 : 320;
    if (fetchSt && now > fetchSt.until) { fetchSt = null; placeBall(); }
    if (fetchSt && view === 'park') {
      if (fetchSt.phase === 'chase') { tx = ballPos.x; ty = ballPos.y; speed = 950; if (Math.hypot(r.x - tx, r.y - ty) < 28) { fetchSt.phase = 'carry'; fetchSt.dog = o.key; sfx.woof(); } }
      else if (fetchSt.phase === 'carry' && fetchSt.dog === o.key) {
        const tp = walkerPos(fetchSt.thrower) ?? { x: (DOG_AREA.x0 + DOG_AREA.x1) / 2, y: 540 }; tx = tp.x + 60; ty = Math.min(590, tp.y + 6); speed = 750;
        ballPos = { x: r.x + (r.flip ? -40 : 40), y: r.y - 30 * o.scale };
        if (Math.hypot(r.x - tx, r.y - ty) < 26) { ballPos = { x: tp.x + 70, y: Math.min(590, tp.y + 12) }; fetchSt = null; dogBubble(r, '♥'); sfx.sparkle(); }
        placeBall();
      }
    }
    const tricking = now < r.trickUntil;
    const dx = tx - r.x, dy = ty - r.y, d = Math.hypot(dx, dy); let moving = false;
    if (d > (fetchSt ? 4 : 10) && !tricking) { const step = Math.min(d, speed * dt); r.x += dx / d * step; r.y += dy / d * step; moving = true; if (Math.abs(dx) > 1.5) r.flip = dx < 0; r.idle = 0; }
    else { r.idle += dt; if (!tricking && r.idle > 0.3 && Math.abs(o.x - r.x) > 4) r.flip = o.x < r.x; }
    const pose = tricking && r.sitTrick ? 'sit' : moving ? 'stand' : r.idle > 0.9 ? 'sit' : 'stand';
    const look = pose + o.dog.breed;
    if (r.pose + r.look !== pose + look) {
      const keep = [...r.el.querySelectorAll('.bubble, .kennelBtn')];
      r.el.innerHTML = `<div class="inner">${dogSVG(o.dog.breed, pose as 'stand' | 'sit')}</div>`;
      for (const node of keep) r.el.appendChild(node);
      r.pose = pose; r.look = look;
    }
    r.el.dataset.name = o.dog.name;
    r.el.classList.toggle('walking', moving); r.el.classList.toggle('flipped', r.flip);
    o.place(r.el, r.x, r.y, 92 * o.scale, 71 * o.scale); r.el.style.zIndex = o.z(r.y + 1);
    syncKennelBtn(r.el, o.key, false);
  }
  for (const [k, r] of dogRuns) if (!seen.has(k)) { r.el.remove(); dogRuns.delete(k); }
}
function dogBubble(r: DogRun, text: string) {
  r.el.querySelector('.bubble')?.remove(); const b = document.createElement('div'); b.className = 'bubble petBubble'; b.textContent = text; r.el.appendChild(b); clampPhoneBubbles();
  setTimeout(() => b.classList.add('out'), 1300); setTimeout(() => b.remove(), 1700);
}
const trickCount = new Map<string, number>();
function doTrick(key: string, v: number) {
  const r = dogRuns.get(key); if (!r) return;
  const name = r.el.dataset.name ?? '';
  r.trickUntil = performance.now() + 1400; r.sitTrick = v === 0;
  r.el.classList.remove('spin', 'hop'); void r.el.offsetWidth;
  if (v === 0) { dogBubble(r, `${name} sits! 🐾`); sfx.pop(); }
  if (v === 1) { r.el.classList.add('spin'); dogBubble(r, 'Wheee! ✨'); sfx.spin(); }
  if (v === 2) { r.el.classList.add('hop'); dogBubble(r, 'Woof! Woof!'); sfx.woof(); }
}
function attachDogTap(el: HTMLElement, key: string) {
  el.addEventListener('pointerdown', e => { e.stopPropagation(); e.preventDefault(); });
  el.addEventListener('click', e => {
    e.stopPropagation(); const v = (trickCount.get(key) ?? 0) % 3; trickCount.set(key, v + 1);
    doTrick(key, v); if (hood) hood.fx({ k: 'trick', owner: key, v });
  });
}

// ---------- kennel: the house owner's dog can rest instead of following ----------
function kennelItem(state: GameState | null | undefined): PlacedItem | null {
  const id = state?.dogKennel?.item;
  if (!id || !state) return null;
  for (const room of Object.values(state.rooms)) {
    const it = room.items.find(i => i.id === id && i.kind === 'kennel');
    if (it) return it;
  }
  return null;
}
function ownerHouse(key: string): GameState | null {
  if (key === 'solo') return local.get();
  if (!hood) return null;
  const hid = hood.players.get(key)?.houseId;
  return hid ? hood.view(hid) : null;
}
function isKenneled(key: string) { return !!kennelItem(ownerHouse(key)); }
function myHouseState(): GameState | null {
  if (hood) { const id = hood.myHouseId(); return id ? hood.view(id) : null; }
  return local.get();
}
function kennelSpot(): { key: string; dog: Dog; item: PlacedItem } | null {
  if (view !== 'house') return null;
  const s = store.get();
  const item = kennelItem(s);
  if (!item || !s.rooms[s.currentRoom]?.items.some(i => i.id === item.id)) return null;
  if (hood && inner !== local) {
    const owner = hood.houses.get(currentHouseId)?.meta.ownerId;
    const dog = owner ? hood.players.get(owner)?.dog ?? null : null;
    if (!owner || !dog) return null;
    return { key: owner, dog, item };
  }
  if (!s.dog) return null;
  return { key: 'solo', dog: s.dog, item };
}
function pickKennel(): PlacedItem | null {
  const s = myHouseState(); if (!s) return null;
  const here = inMyHouse() ? store.get().currentRoom : null;
  let best: PlacedItem | null = null, roomBest: PlacedItem | null = null;
  for (const [rid, room] of Object.entries(s.rooms)) {
    for (const it of room.items) if (it.kind === 'kennel') {
      if (!best || it.z >= best.z) best = it;
      if (rid === here && (!roomBest || it.z >= roomBest.z)) roomBest = it;
    }
  }
  return roomBest ?? best;
}
function setKennel(item: string | null) {
  if (!myDog()) { toast('Adopt a dog first!'); return; }
  catDispatch({ type: 'dog/kennel', item });
  if (item) { sfx.pop(); toast('Rest well, puppy!'); } else { sfx.woof(); toast('Come on, puppy!'); }
}
function toggleKennel(itemId?: string) {
  if (!myDog()) { toast('Adopt a dog first!'); return; }
  const cur = kennelItem(myHouseState());
  if (itemId === undefined) {
    if (cur) { setKennel(null); return; }
    const pick = pickKennel();
    if (!pick) { toast('Put a dog kennel down first!'); return; }
    setKennel(pick.id); return;
  }
  if (cur?.id === itemId) setKennel(null); else setKennel(itemId);
}
function onPlaceTap(id: string) {
  const s = store.get();
  const it = s.rooms[s.currentRoom]?.items.find(i => i.id === id); if (!it) return;
  if (it.kind === 'kennel') { if (inMyHouse()) toggleKennel(it.id); return; }
  if (it.kind === 'cat-tower') tapTower();
}
function syncKennelBtn(el: HTMLElement, key: string, inside: boolean) {
  const mine = hood ? key === hood.pid : key === 'solo';
  let b = el.querySelector<HTMLButtonElement>('.kennelBtn');
  if (!mine) { b?.remove(); return; }
  if (!b) {
    b = document.createElement('button'); b.type = 'button'; b.className = 'kennelBtn';
    b.addEventListener('pointerdown', ev => { ev.stopPropagation(); ev.preventDefault(); });
    b.addEventListener('click', ev => { ev.stopPropagation(); ev.preventDefault(); toggleKennel(); });
    el.appendChild(b);
  }
  b.textContent = inside ? 'Out' : 'Kennel';
}
function petBubble(el: HTMLElement, text: string) {
  el.querySelector('.bubble')?.remove();
  const b = document.createElement('div'); b.className = 'bubble petBubble'; b.textContent = text; el.appendChild(b); clampPhoneBubbles();
  setTimeout(() => b.classList.add('out'), 1300); setTimeout(() => b.remove(), 1700);
}
interface KennelRun { el: HTMLElement; pose: string; look: string; x: number; y: number }
const kennelRuns = new Map<string, KennelRun>();
function tickKennels() {
  const seen = new Set<string>();
  const spot = kennelSpot();
  if (spot) {
    seen.add(spot.key);
    const look = kennelLook(spot.dog.name, Date.now());
    // Sit in the doorway: feet on the floor of the opening, peeking lifts the head over the arch.
    const y = spot.item.y - (look === 'peek' ? 24 : 2);
    let r = kennelRuns.get(spot.key);
    if (!r || !r.el.isConnected) {
      r?.el.remove();
      const el = document.createElement('div');
      el.className = 'pet pet-dog kenneled'; el.dataset.dog = 'kennel:' + spot.key; layer.appendChild(el);
      el.addEventListener('pointerdown', ev => { if ((ev.target as HTMLElement).closest('.kennelBtn')) return; ev.stopPropagation(); ev.preventDefault(); });
      el.addEventListener('click', ev => { if ((ev.target as HTMLElement).closest('.kennelBtn')) return; ev.stopPropagation(); petBubble(el, `${el.dataset.name ?? 'Puppy'} is resting`); });
      r = { el, pose: '', look: '', x: spot.item.x, y }; kennelRuns.set(spot.key, r);
    }
    if (r.pose !== 'sit' || r.look !== look + spot.dog.breed) {
      const keep = [...r.el.querySelectorAll('.bubble, .kennelBtn')];
      r.el.innerHTML = `<div class="inner">${dogSVG(spot.dog.breed, 'sit')}</div>${look === 'rest' ? '<div class="zzz"><i>z</i><i>z</i><i>z</i></div>' : ''}`;
      for (const node of keep) r.el.appendChild(node);
      r.pose = 'sit'; r.look = look + spot.dog.breed;
    }
    r.el.dataset.name = spot.dog.name;
    r.el.classList.toggle('rest', look === 'rest'); r.el.classList.toggle('peek', look === 'peek');
    r.x = spot.item.x; r.y = y;
    placeEl(r.el, spot.item.x, y, 100, 77); r.el.style.zIndex = String(1000 + spot.item.z + 1);
    syncKennelBtn(r.el, spot.key, true);
  }
  for (const [k, r] of kennelRuns) if (!seen.has(k)) { r.el.remove(); kennelRuns.delete(k); }
}

// ---------- the house cat (wanders + naps on its own; same on every iPad) ----------
let catEl: HTMLElement | null = null, catKey = '', catPerch = 0, leapUntil = 0;
let catSpot = { x: 0, perch: 0, leap: false };
const CAT_Y = 562;
function roomTower(s: GameState): PlacedItem | null {
  const items = s.rooms[s.currentRoom]?.items.filter(i => i.kind === 'cat-tower') ?? [];
  return items.reduce<PlacedItem | null>((a, b) => !a || b.z >= a.z ? b : a, null);
}
function tapTower() {
  const s = store.get();
  if (!s.cat || s.cat.room !== s.currentRoom || !roomTower(s)) return;
  leapUntil = performance.now() + 900; sfx.boing(); hood?.fx({ k: 'leap' });
}
function tickCat() {
  const s = store.get(); const cat = view === 'house' ? s.cat : null;
  if (!cat || cat.room !== s.currentRoom) { if (catEl) { catEl.remove(); catEl = null; catKey = ''; catPerch = 0; } return; }
  if (!catEl || !catEl.isConnected) {
    catEl = document.createElement('div'); catEl.className = 'pet pet-cat'; layer.appendChild(catEl); catKey = '';
    catEl.addEventListener('pointerdown', ev => { ev.stopPropagation(); ev.preventDefault(); });
    catEl.addEventListener('click', ev => { ev.stopPropagation(); purr(); if (hood) hood.fx({ k: 'purr' }); });
  }
  const tower = roomTower(s);
  const def = tower ? ITEM_MAP[tower.kind] : undefined;
  const th = tower && def ? hOf(def) * tower.scale : 0;
  const b = catAt(cat, Date.now(), tower ? { x: tower.x } : null);
  const leaping = !!tower && performance.now() < leapUntil;
  const perch = leaping ? 2 : b.perch;
  const x = leaping && tower ? tower.x : b.x;
  const mood = leaping ? 'play' : b.mood;
  const pose = mood === 'walk' ? 'stand' : mood === 'nap' ? 'nap' : 'sit';
  const key = pose + cat.coat + (perch ? 'p' : '');
  if (key !== catKey) {
    // Pose changes every few seconds. Keep the purr (bubble + hearts); replacing the
    // whole node used to throw the hearts away mid-animation.
    const keep = [...catEl.querySelectorAll('.bubble, .heart')];
    catEl.innerHTML = `<div class="inner">${catSVG(cat.coat, pose)}</div>${pose === 'nap' ? '<div class="zzz"><i>z</i><i>z</i><i>z</i></div>' : ''}`;
    for (const node of keep) catEl.appendChild(node);
    catKey = key;
  }
  if (perch > 0 && catPerch === 0) { catEl.classList.add('hop'); const el = catEl; setTimeout(() => el.classList.remove('hop'), 420); }
  catPerch = perch;
  catEl.dataset.name = cat.name; catEl.dataset.mood = mood; catEl.dataset.perch = String(perch); catEl.dataset.leap = leaping ? '1' : '0';
  catEl.classList.toggle('walking', mood === 'walk'); catEl.classList.toggle('groom', mood === 'groom'); catEl.classList.toggle('play', mood === 'play' && !leaping); catEl.classList.toggle('leap', leaping); catEl.classList.toggle('flipped', b.flip);
  // __pinCat holds her on a character's feet for tests. She stays under characters (5000 + y).
  const pin = (window as any).__pinCat as { x: number } | null;
  const pinned = !!(pin && Number.isFinite(pin.x));
  const foot = !pinned && perch && tower ? towerFootY(tower.y, th, perch as 1 | 2) : CAT_Y;
  placeEl(catEl, pinned ? pin!.x : x, foot, !pinned && perch ? 110 : 150, !pinned && perch ? 92 : 128);
  catEl.style.zIndex = String(4000 + Math.round(foot));
  catSpot = { x: pinned ? pin!.x : x, perch, leap: leaping };
}
function purr() {
  if (!catEl) return; sfx.purr(); setTimeout(() => sfx.meow(), 250);
  catEl.querySelector('.bubble')?.remove(); const b = document.createElement('div'); b.className = 'bubble petBubble'; b.textContent = `${catEl.dataset.name} purrs ♥`; catEl.appendChild(b); clampPhoneBubbles();
  setTimeout(() => b.classList.add('out'), 1500); setTimeout(() => b.remove(), 1900);
  catEl.classList.remove('happy'); void catEl.offsetWidth; catEl.classList.add('happy');
  for (let i = 0; i < 5; i++) { const h = document.createElement('div'); h.className = 'heart'; h.textContent = '♥'; h.style.left = 20 + Math.random() * 60 + '%'; h.style.animationDelay = i * 0.12 + 's'; h.style.color = ['#ff6b9a', '#ff8fab', '#e879c6'][i % 3]; catEl.appendChild(h); setTimeout(() => h.remove(), 1800); }
}
function onFx(pid: string, fx: Fx) {
  if (fx.k === 'zoo' || fx.k === 'apple' || fx.k === 'honk' || fx.k === 'hen') { onRanchFx(fx); return; }
  if (fx.k === 'trick') doTrick(fx.owner, fx.v);
  else if (fx.k === 'purr') { if (view === 'house') purr(); }
  else if (fx.k === 'leap') { if (view === 'house') leapUntil = performance.now() + 900; }
  else if (fx.k === 'ball') startFetch(pid, fx.x, fx.y);
  else if (fx.k === 'splash') splashAt(fx.x);
}
function petTick(now: number) {
  const dt = Math.min(0.05, Math.max(0, (now - lastTick) / 1000)); lastTick = now;
  try { tickDogs(now, dt); tickKennels(); tickCat(); tickRanch(now, dt); tickGameRoom(dt); } catch { /* never let an animation frame break the game */ }
  requestAnimationFrame(petTick);
}

// ---------- adopting ----------
function myCat(): Cat | null { if (hood) return hood.view(hood.myHouseId())?.cat ?? null; return local.get().cat ?? null; }
function myDog(): Dog | null { if (hood) return hood.players.get(hood.pid)?.dog ?? null; return local.get().dog ?? null; }
function catDispatch(a: Action) { if (hood) { const id = hood.myHouseId(); if (id) hood.dispatch(id, a); } else local.dispatch(a); }
const inMyHouse = () => view === 'house' && (!hood || inner === local || currentHouseId === hood.myHouseId());
function openPets(tab: 'cat' | 'dog' = 'cat') {
  const cat0 = myCat(), dog0 = myDog(), chars = local.get().characters;
  const d = { tab, coat: cat0?.coat ?? 0, catName: cat0?.name ?? '', breed: dog0?.breed ?? 0, dogName: dog0?.name ?? '', owner: dog0?.owner ?? chars[0]?.id, err: '', bye: false };
  const m = modal('', (t, close) => {
    const g = (a: string) => t.closest<HTMLElement>(`[${a}]`)?.getAttribute(a);
    if (g('data-pt')) { d.tab = g('data-pt') as 'cat' | 'dog'; d.err = ''; d.bye = false; render(); return; }
    if (g('data-coat') != null) { d.coat = +g('data-coat')!; sfx.click(); render(); return; }
    if (g('data-breed') != null) { d.breed = +g('data-breed')!; sfx.click(); render(); return; }
    if (g('data-cname')) { d.catName = g('data-cname')!; sfx.click(); render(); return; }
    if (g('data-dname')) { d.dogName = g('data-dname')!; sfx.click(); render(); return; }
    if (g('data-owner')) { d.owner = g('data-owner')!; sfx.click(); render(); return; }
    const act = g('data-pa'); if (!act) return;
    const typed = (m.root.querySelector<HTMLInputElement>('#petName')?.value ?? '').trim();
    if (act === 'adoptCat' || act === 'adoptDog') {
      const raw = typed || (act === 'adoptCat' ? d.catName : d.dogName);
      const name = cleanPetName(raw); if (!name) { d.err = raw ? 'Hmm, try a different name!' : 'Pick a name first!'; sfx.pop(); render(); return; }
      if (act === 'adoptCat') {
        const here = inMyHouse();
        const cat: Cat = { name, coat: d.coat, room: here ? store.get().currentRoom : cat0?.room ?? 'living', x: here ? Math.max(200, Math.min(W - 200, camX + VIEW_W / 2)) : cat0?.x ?? 1200 };
        catDispatch({ type: 'cat/set', cat }); sfx.meow(); close();
        toast(cat0 ? `${name} looks great! 🐱` : here ? `${name} moved in! 🐱` : `${name} is waiting at your house! 🐱`);
      } else {
        const dog: Dog = hood ? { name, breed: d.breed } : { name, breed: d.breed, owner: d.owner };
        if (hood) { hood.setDog(dog); if (view === 'park') renderParkAvatars(); } else local.dispatch({ type: 'dog/set', dog });
        sfx.woof(); close(); toast(dog0 ? `${name} looks great! 🐶` : `${name} is your new best friend! 🐶`);
      }
      return;
    }
    if (act === 'callCat') { catDispatch({ type: 'cat/move', room: store.get().currentRoom, x: Math.max(200, Math.min(W - 200, camX + VIEW_W / 2)) }); sfx.meow(); close(); return; }
    if (act === 'kennelDog') { toggleKennel(); close(); return; }
    if (act === 'bye') { if (!d.bye) { d.bye = true; render(); return; }
      if (d.tab === 'cat') catDispatch({ type: 'cat/set', cat: null });
      else { catDispatch({ type: 'dog/kennel', item: null }); if (hood) hood.setDog(null); else local.dispatch({ type: 'dog/set', dog: null }); }
      close(); toast('They went to live with a kind friend 💛'); return; }
  }, 'wide pets');
  const card = m.root.querySelector('.card')!;
  function render() {
    const isCat = d.tab === 'cat', have = isCat ? cat0 : dog0;
    const names = isCat ? CAT_NAMES : DOG_NAMES, cur = isCat ? d.catName : d.dogName;
    const prev = (m.root.querySelector<HTMLInputElement>('#petName')?.value ?? '');
    card.innerHTML = `${X}<h2>Pets</h2>
      <div class="petTabs"><button data-pt="cat" class="${isCat ? 'on' : ''}">🐱 Cat</button><button data-pt="dog" class="${isCat ? '' : 'on'}">🐶 Dog</button></div>
      <p class="hint small">${isCat ? (hood ? 'Your cat lives in your house. Friends can see her when they visit!' : 'Your cat lives in your house. She naps, purrs, and plays!') : (hood ? 'Your dog follows you everywhere: the street, friends\' houses, and the park!' : 'Your dog follows you around the house and to the park!')}</p>
      <div class="petRow"><div class="petPreview">${isCat ? catSVG(d.coat, 'sit') : dogSVG(d.breed, 'stand')}</div>
        <div class="swatches">${(isCat ? CAT_COATS : DOG_BREEDS).map((c, i) => `<button ${isCat ? 'data-coat' : 'data-breed'}="${i}" class="${i === (isCat ? d.coat : d.breed) ? 'on' : ''}"><div>${isCat ? catSVG(i, 'sit') : dogSVG(i, 'stand')}</div><span>${c.name}</span></button>`).join('')}</div></div>
      <div class="label">Name</div>
      <div class="nameChips">${names.map(n => `<button ${isCat ? 'data-cname' : 'data-dname'}="${n}" class="${n === cur ? 'on' : ''}">${n}</button>`).join('')}</div>
      <input id="petName" class="petName" maxlength="14" autocomplete="off" placeholder="…or type a name" value="${esc(prev)}"/>
      ${d.err ? `<p class="err" id="petErr">${esc(d.err)}</p>` : ''}
      ${!isCat && !hood && chars.length > 1 ? `<div class="label">Who does your dog follow?</div><div class="walkers">${chars.map(c => `<button data-owner="${c.id}" class="${c.id === d.owner ? 'on' : ''}">${characterSVG(c)}</button>`).join('')}</div>` : ''}
      <div class="petBtns"><button class="go" data-pa="${isCat ? 'adoptCat' : 'adoptDog'}" id="adoptBtn">${have ? 'Save' : 'Adopt! 💛'}</button>
        ${isCat && cat0 && inMyHouse() ? '<button data-pa="callCat" id="callCat">Here, kitty!</button>' : ''}
        ${!isCat && dog0 ? `<button data-pa="kennelDog" id="kennelDog">${kennelItem(myHouseState()) ? 'Come, puppy!' : 'Kennel'}</button>` : ''}
        ${have ? `<button class="danger" data-pa="bye">${d.bye ? 'Tap again to say goodbye' : 'Find a new home'}</button>` : ''}</div>`;
  }
  render();
}
$('btnPets').addEventListener('click', () => openPets(view === 'house' ? 'cat' : 'dog'));
requestAnimationFrame(petTick);
(window as any).__pets = () => {
  const spot = kennelSpot(); const run = spot ? kennelRuns.get(spot.key) : undefined;
  return { dogs: [...dogRuns.keys()], dogPos: Object.fromEntries([...dogRuns].map(([k, r]) => [k, { x: Math.round(r.x), y: Math.round(r.y) }])), cat: catEl ? { mood: catEl.dataset.mood, name: catEl.dataset.name, perch: catSpot.perch, x: Math.round(catSpot.x), leap: catSpot.leap } : null, kennel: spot && run ? { x: Math.round(run.x), y: Math.round(run.y), pose: run.pose, name: spot.dog.name, item: spot.item.id } : null, dogKennel: store.get().dogKennel ?? null, fetch: fetchSt?.phase ?? null, ball: ballPos, view };
};

// =====================================================================================
// Rainbow Ranch
// =====================================================================================
function ranchScale() { return $('ranch').clientHeight / RANCH_H; }
let walkQueue: { x: number; y: number }[] = [];
/** Sprites in the yard share one depth order: bigger foot-y (closer to the camera) paints in front. */
const depthZ = (foot: number) => String(100 + Math.round(foot));
// The paddock horse is 150×122. Mounted, the horse grows and the kid shrinks so she looks like a rider.
const RIDE_HORSE_W = 220;
const RIDE_HORSE_H = RIDE_HORSE_W * 130 / 160;
/** Portrait-phone idle horse is 131×106. A 220-wide mount jumps to about 290×236px. */
const PHONE_RIDE_W = 156;
const PHONE_RIDE_H = PHONE_RIDE_W * 130 / 160;
const RIDE_RIDER_SCALE = 0.6;
const SHIRT_STROKE = 3.5, SADDLE_STROKE = 3;
const POND_PAD = 10;
const trotting = new Map<number, { x: number; y: number }>();
const lastRideAt = new Map<number, { x: number; y: number }>();
function inPond(x: number, y: number, pad = POND_PAD) {
  const dx = (x - POND.x) / (POND.rx + pad), dy = (y - POND.y) / (POND.ry + pad);
  return dx * dx + dy * dy < 1;
}
function segHitsPond(x0: number, y0: number, x1: number, y1: number) {
  for (let i = 0; i <= 18; i++) {
    const t = i / 18;
    if (inPond(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t)) return true;
  }
  return false;
}
function clampField(x: number, y: number) {
  return { x: Math.max(70, Math.min(RW() - 70, x)), y: Math.max(RANCH_Y0, Math.min(RANCH_Y1, y)) };
}
/** Straight gallop, or a path along the back or the front of the field when the line would splash through the pond. */
function routeRide(from: { x: number; y: number }, to: { x: number; y: number }): { x: number; y: number }[] | null {
  const dest = clampField(to.x, to.y);
  if (inPond(dest.x, dest.y, 6)) return null;
  if (!segHitsPond(from.x, from.y, dest.x, dest.y)) return [dest];
  const left = POND.x - POND.rx - POND_PAD - 28, right = POND.x + POND.rx + POND_PAD + 28;
  let best: { x: number; y: number }[] | null = null, bestLen = Infinity;
  for (const lane of [RANCH_Y0 + 1, RANCH_Y1 - 2]) {
    const pts: { x: number; y: number }[] = [];
    let cx = from.x, cy = from.y;
    const push = (x: number, y: number) => { const q = clampField(x, y); pts.push(q); cx = q.x; cy = q.y; };
    if (segHitsPond(cx, cy, cx, lane)) push(cx < POND.x ? left : right, cy);
    if (Math.abs(cy - lane) > 3) push(cx, lane);
    if (Math.abs(cx - dest.x) > 3) push(dest.x, lane);
    pts.push(dest);
    let ok = true, x = from.x, y = from.y, len = 0;
    for (const p of pts) {
      if (segHitsPond(x, y, p.x, p.y) || inPond(p.x, p.y, 4)) { ok = false; break; }
      len += Math.hypot(p.x - x, p.y - y); x = p.x; y = p.y;
    }
    if (ok && len < bestLen) { best = pts; bestLen = len; }
  }
  return best;
}
function goWalk(x: number, y: number) {
  const me = myParkPres(); if (!me) return;
  const dest = { x: Math.max(60, Math.min(RW() - 60, x)), y: Math.max(RANCH_Y0, Math.min(RANCH_Y1, y)) };
  if (me.ride !== undefined && me.where === 'ranch') {
    const path = routeRide(me, dest);
    if (!path) { toast('The horse won\'t splash through the pond!'); sfx.pop(); return; }
    walkQueue = path;
  } else walkQueue = [dest];
}
/** Near-side riding leg, in the horse's 160×130 viewBox. Hip under the saddle, thigh forward along the seat, shin down by the front legs. */
function rideLegHTML(pants: string) {
  const ink = '#5a3d5c';
  const tube = (cls: string, d: string, outer: number, inner: number) =>
    `<path class="${cls}" d="${d}" fill="none" stroke="${ink}" stroke-width="${outer}" stroke-linecap="round"/>` +
    `<path class="${cls} cloth" d="${d}" fill="none" stroke="${pants}" stroke-width="${inner}" stroke-linecap="round"/>`;
  return `<svg class="rideleg" viewBox="0 0 160 130">${tube('thigh', 'M66 56 L102 66', 13, 8)}${tube('shin', 'M102 68 L106 104', 12, 7.2)}<circle class="knee" cx="102" cy="67" r="6.2" fill="${pants}" stroke="${ink}" stroke-width="3.5"/><ellipse class="shoe" cx="116" cy="106" rx="11" ry="5.2" fill="${ink}"/></svg>`;
}
/** Portrait phones only. Fewer stalls, about a kid tall, so the ground between them stays walkable. */
function phonePaddock() {
  return document.body.classList.contains('phone') && document.body.classList.contains('phone-portrait') && !inBarn;
}
/** Chestnut, Midnight, and the rainbow pony. A horse she is already riding stays out too. */
function shownHorseIds(): number[] {
  if (!phonePaddock()) return HORSE_X.map((_, i) => i);
  const ids = [0, 2, 4];
  for (const w of parkPeople('ranch')) {
    const ride = w.p.ride;
    if (ride !== undefined && ids.indexOf(ride) < 0) ids.push(ride);
  }
  return ids;
}
function horseHome(i: number) {
  if (!phonePaddock()) return HORSE_X[i];
  const shown = shownHorseIds();
  const idx = shown.indexOf(i);
  const n = shown.length;
  const slot = idx < 0 ? 0 : idx;
  const half = horseSize().w / 2;
  const x0 = 2400 + half + 18, x1 = 3080 - half - 18; // inside the fence posts
  if (n <= 1) return Math.round((x0 + x1) / 2);
  return Math.round(x0 + (x1 - x0) * slot / (n - 1));
}
function horseSize() {
  // 131×106 is the 160×130 horse. At ranch scale ~1.32 (a tall portrait phone) that is ~140px,
  // about as tall as the kid in the house, so mounting does not jump up from a tiny pony.
  return phonePaddock() ? { w: 131, h: 106 } : { w: 150, h: 122 };
}
function placeHorseEl(el: HTMLElement, x: number, y: number) {
  const sc = ranchScale();
  const { w, h } = horseSize();
  el.style.left = (x - w / 2) * sc + 'px'; el.style.top = (y - h) * sc + 'px';
  el.style.width = w * sc + 'px'; el.style.height = h * sc + 'px';
  el.style.zIndex = depthZ(y);
}
/** After a rotate, restall horses that are still in the paddock. iPad never has body.phone. */
function layoutPaddock() {
  if (view !== 'ranch' || inBarn || !document.body.classList.contains('phone')) return;
  const show = new Set(shownHorseIds());
  document.querySelectorAll<HTMLElement>('#ranchWorld .horse').forEach(el => {
    const i = +el.dataset.horse!;
    el.classList.toggle('stallOff', phonePaddock() && !show.has(i));
    if (!show.has(i) || trotting.has(i) || el.classList.contains('away')) return;
    placeHorseEl(el, horseHome(i), HORSE_Y);
  });
}
function beginTrot(h: number, x: number, y: number) {
  if (trotting.has(h) || Math.hypot(x - horseHome(h), y - HORSE_Y) < 26) return;
  trotting.set(h, { x, y });
  const el = document.querySelector<HTMLElement>(`#ranchWorld .horse[data-horse="${h}"]`);
  if (!el) return;
  el.classList.add('trotting'); el.classList.remove('away');
  el.classList.toggle('flipped', horseHome(h) < x);
  placeHorseEl(el, x, y);
}
function dismountSpot(x: number, y: number, flip: boolean) {
  const dir = flip ? -1 : 1;
  for (const dx of [dir * 118, -dir * 118, dir * 160, -dir * 78]) {
    for (const dy of [0, 30, -26, 48]) {
      const p = clampField(x + dx, y + dy);
      if (Math.hypot(p.x - x, p.y - y) < 50) continue;
      if (!inPond(p.x, p.y, 8)) return p;
    }
  }
  return clampField(x, y);
}
let lastEggLocal = 0, feedDragEnd = 0;
const ranchNow = () => (hood ? hood.now() : Date.now());
const ranchPlots = (): (Plot | null)[] => cleanPlots(hood ? hood.ranch.plots : local.get().garden);
const myBasket = (): Basket => cleanBasket(hood ? hood.players.get(hood.pid)?.basket : local.get().basket);
const RW = () => (inBarn ? BARN_W : RANCH_W);
const RWHERE = (): 'ranch' | 'barn' => (inBarn ? 'barn' : 'ranch');
const ridersOf = () => { const m = new Map<number, Walker>(); for (const w of parkPeople('ranch')) if (w.p.ride !== undefined) m.set(w.p.ride, w); return m; };
function ranchFailToast(r: string) {
  const msg: Record<string, string> = { taken: 'A friend just planted there!', wet: 'Already watered 💧', notReady: 'Still growing! 🌱', full: 'Your basket is full!', slow: 'The hen is laying… try again!', none: 'Your basket has none left', nohouse: 'Go home to put it in your room' };
  if (msg[r]) { toast(msg[r]); sfx.pop(); }
}
/** Every ranch interaction goes through the same rules as the server (instant feedback here, the server decides). */
function doRanch(o: RanchOp): boolean {
  if (hood) {
    const r = ranchApply(ranchPlots(), myBasket(), o, ranchNow(), o.op === 'egg' ? lastEggLocal : 0);
    if (typeof r === 'string') { ranchFailToast(r); return false; }
    if (o.op === 'egg') lastEggLocal = Date.now();
    hood.ranchOp(o); return true;
  }
  const s = local.get(), now = Date.now();
  const r = ranchApply(cleanPlots(s.garden), cleanBasket(s.basket), o, now, s.lastEgg ?? 0);
  if (typeof r === 'string') { ranchFailToast(r); return false; }
  local.dispatch({ type: 'ranch/op', op: o, now }); renderPlots(true); renderBasketChip(); return true;
}

/** Rainbow Ranch: the yard (horses, hen house, garden) or, with barn=true, inside the barn (petting zoo). */
function goRanch(barn = false) {
  const fromBarn = view === 'ranch' && inBarn && !barn;
  hideScenes(); $('ranch').classList.remove('hidden');
  fetchSt = null; walkQueue = []; view = 'ranch'; inBarn = barn;
  // Arrive left of the barn door so she never covers the "Petting zoo inside!" sign.
  // Stepping back out of the barn still stands in the doorway (the ranch test checks that spot).
  const p: Presence = barn ? { where: 'barn', x: 170, y: 560, flip: false } : { where: 'ranch', x: fromBarn ? BARN_DOOR_X : 130, y: fromBarn ? 520 : 565, flip: false };
  if (hood) setMyPres(p); else soloPark = p;
  $('streetTitle').textContent = barn ? 'The Barn' : 'Rainbow Ranch'; renderHoodChrome(); renderRanch();
  requestAnimationFrame(() => {
    const scroll = $('ranchScroll'), sc = ranchScale();
    scroll.scrollLeft = fromBarn ? Math.max(0, BARN_DOOR_X * sc - scroll.clientWidth / 2) : 0;
    frameRanchSign();
  });
  setTimeout(frameRanchSign, 650);
  sceneIn($('ranch')); barn ? sfx.swish() : sfx.sparkle();
}
$('btnHopOff').addEventListener('click', () => hopOff());

function renderRanch() {
  const sc = ranchScale(), w = $('ranchWorld'), px = (v: number) => v * sc + 'px';
  const box = (x: number, bottom: number, wd: number, ht: number) => `left:${px(x - wd / 2)};top:${px(bottom - ht)};width:${px(wd)};height:${px(ht)};z-index:${depthZ(bottom)}`;
  w.style.width = RW() * sc + 'px'; w.style.height = RANCH_H * sc + 'px'; w.style.setProperty('--sc', String(sc));
  if (inBarn) {
    w.innerHTML = barnSceneSVG()
      + `<button class="rprop barnExit" data-r="exit" aria-label="Go outside" style="${box(127, 444, 206, 244)}"><span class="exitHint"><span>Outside ☀️</span></span></button>`
      + ANIMALS.map((_, i) => `<button class="animal" data-animal="${i}" aria-label="${ANIMAL_INFO[i].name}" style="${box(BARN_ANIMAL_X[i], ANIMAL_Y + 30, 128, 107)}">${animalSVG(i)}</button>`).join('')
      + [300, 1244].map(x0 => (['carrot', 'apple', 'hay'] as const).map((f, i) => `<button class="bucket" data-feed="${f}" aria-label="${f} bucket" style="${box(x0 + i * 56, 592, 54, 62)}">${bucketSVG(f)}</button>`).join('')).join('') // by the door + in the middle
      + `<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>`;
    renderRanchAvatars(); phoneShowKids(); return;
  }
  w.innerHTML = ranchSceneSVG()
    + paddockFenceSVG().replace('<svg ', `<svg style="z-index:${depthZ(FENCE_FOOT)}" `)
    + `<button class="rprop barnDoor" data-r="barn" aria-label="Go into the barn" style="${box(BARN_DOOR_X, 472, 150, 150)}"><span class="doorHint"><span>Petting zoo inside! 🐐</span></span></button>`
    + `<button class="rprop windmill" data-r="mill" aria-label="Windmill" style="${box(1540, 478, 150, 240)}">${windmillSVG}</button>`
    + `<button class="rprop henHouse" data-r="egg" aria-label="Hen house" style="${box(715, 482, 180, 170)}">${henHouseSVG}</button>`
    + `<button class="rprop tractor" data-r="honk" aria-label="Tractor" style="${box(900, 580, 170, 130)}">${tractorSVG}</button>`
    + `<button class="rprop appleTree" data-r="apple" aria-label="Apple tree" style="${box(2085, 482, 240, 300)}">${appleTreeSVG}</button>`
    + HORSES.map((_, i) => { const hs = horseSize(); const off = phonePaddock() && shownHorseIds().indexOf(i) < 0 ? ' stallOff' : ''; return `<button class="horse${off}" data-horse="${i}" aria-label="${HORSE_COATS[i].name} horse" style="${box(horseHome(i), HORSE_Y, hs.w, hs.h)}">${horseSVG(i)}</button>`; }).join('')
    + Array.from({ length: PLOTS }, (_, i) => `<button class="plot" data-plot="${i}" aria-label="Garden plot" style="${box(PLOT_X(i), 594, 66, 86)}"></button>`).join('')
    + `<div class="rfx" id="rfx"></div><div class="savatars" id="ravatars"></div>`;
  renderPlots(true); renderRanchAvatars();
  phoneShowKids();
}
const plotKey: string[] = [];
function renderPlots(force = false) {
  if (view !== 'ranch' || inBarn) return;
  const plots = ranchPlots(), now = ranchNow();
  document.querySelectorAll<HTMLElement>('#ranchWorld .plot').forEach(el => {
    const i = +el.dataset.plot!, p = plots[i] ?? null, stg = plotStage(p, now), key = JSON.stringify(p) + stg;
    if (!force && plotKey[i] === key) return;
    if (plotKey[i] !== undefined && plotKey[i] !== key && stg > 0) { el.classList.remove('grow'); void el.offsetWidth; el.classList.add('grow'); }
    plotKey[i] = key; el.innerHTML = plotSVG(p, stg, i); el.dataset.stage = p ? String(stg) : 'empty';
  });
}
function renderRanchAvatars() {
  const box = document.getElementById('ravatars'); if (!box || view !== 'ranch') return;
  const sc = ranchScale(); const keep = new Set<string>(); const ridden = new Set<number>(); let meRiding = false;
  for (const w of parkPeople(RWHERE())) {
    keep.add(w.key);
    let el = box.querySelector<HTMLElement>(`.savatar[data-pid="${w.key}"]`);
    if (!el) { el = document.createElement('div'); el.className = 'savatar ' + (w.mine ? 'mine' : 'other'); el.dataset.pid = w.key; box.appendChild(el); if (w.mine) attachParkDrag(el); }
    const key = JSON.stringify(w.look) + w.name;
    if (el.dataset.look !== key) { const b = el.querySelector('.bubble'); el.innerHTML = w.name ? avatarHTML(w.look, w.name) : `<div class="inner">${characterSVG(w.look)}</div>`; if (b) el.appendChild(b); el.dataset.look = key; el.dataset.ride = ''; }
    const ride = w.p.ride;
    const k = (SIZE_SCALE[w.look.size] ?? 1) * sc * 0.95 * (ride !== undefined ? RIDE_RIDER_SCALE : 1), wd = CHAR_W * k, h = CHAR_H * k;
    if (el.dataset.ride !== String(ride ?? '')) {
      el.querySelector('.mount')?.remove();
      if (ride !== undefined) el.insertAdjacentHTML('afterbegin', `<div class="mount" data-mount="${ride}">${horseSVG(ride, true)}${rideLegHTML(w.look.pants)}</div>`);
      el.dataset.ride = String(ride ?? '');
    }
    el.classList.toggle('riding', ride !== undefined);
    if (ride !== undefined) {
      ridden.add(ride); if (w.mine) meRiding = true;
      lastRideAt.set(ride, { x: w.p.x, y: w.p.y });
      const rw = phonePaddock() ? PHONE_RIDE_W : RIDE_HORSE_W, rh = phonePaddock() ? PHONE_RIDE_H : RIDE_HORSE_H;
      const mw = rw * sc, mh = rh * sc; const m = el.querySelector<HTMLElement>('.mount')!;
      m.style.width = mw + 'px'; m.style.height = mh + 'px'; m.style.left = (wd - mw) / 2 + 'px'; m.style.top = (h - mh) + 'px';
      const hemY = Number(el.querySelector('.shirt')?.getAttribute('data-hem') ?? 126);
      const sadY = Number(m.querySelector('.saddle')?.getAttribute('data-top') ?? 43);
      const hem = (hemY + SHIRT_STROKE / 2) / 160 * h;
      const saddleTop = (h - mh) + (sadY - SADDLE_STROKE / 2) / 130 * mh;
      el.style.setProperty('--lift', (hem - saddleTop) + 'px');
      const leg = m.querySelector<SVGElement>('.rideleg');
      if (leg) { leg.style.left = '0'; leg.style.top = '0'; leg.style.width = '100%'; leg.style.height = '100%'; }
    } else el.style.removeProperty('--lift');
    const lx = parseFloat(el.dataset.lx ?? 'NaN');
    if (Number.isFinite(lx) && Math.abs(lx - w.p.x) > 2) { el.classList.add('moving'); clearTimeout(+(el.dataset.mt ?? 0)); el.dataset.mt = String(window.setTimeout(() => el!.classList.remove('moving'), 260)); }
    el.dataset.lx = String(w.p.x);
    el.style.left = w.p.x * sc - wd / 2 + 'px'; el.style.top = w.p.y * sc - h + 'px'; el.style.width = wd + 'px'; el.style.height = h + 'px';
    el.style.zIndex = depthZ(w.p.y); el.classList.toggle('flipped', w.p.flip);
  }
  box.querySelectorAll<HTMLElement>('.savatar').forEach(el => { if (!keep.has(el.dataset.pid!)) el.remove(); });
  if (document.body.classList.contains('phone')) {
    const show = new Set(shownHorseIds());
    document.querySelectorAll<HTMLElement>('#ranchWorld .horse').forEach(el => {
      el.classList.toggle('stallOff', phonePaddock() && !show.has(+el.dataset.horse!));
    });
  }
  document.querySelectorAll<HTMLElement>('#ranchWorld .horse').forEach(h => {
    const id = +h.dataset.horse!;
    if (!ridden.has(id)) h.classList.remove('away');
    else { h.classList.add('away'); trotting.delete(id); }
  });
  for (const [h, pos] of [...lastRideAt]) if (!ridden.has(h)) { beginTrot(h, pos.x, pos.y); lastRideAt.delete(h); }
  document.body.classList.toggle('riding', meRiding);
  updateNear();
}
function mount(h: number) {
  const me = myParkPres(); if (!me || me.where !== 'ranch') return;
  const rider = ridersOf().get(h);
  if (rider && !rider.mine) { toast('Someone is riding!'); sfx.pop(); return; }
  if (me.ride !== undefined) {
    if (rider?.mine || me.ride === h) { hopOff(); return; }
    goWalk(horseHome(h), Math.min(RANCH_Y1, HORSE_Y + 8)); // already riding: gallop over, don't swap horses
    return;
  }
  walkQueue = [];
  trotting.delete(h);
  setParkPres({ where: 'ranch', x: horseHome(h), y: Math.min(RANCH_Y1, HORSE_Y + 8), flip: false, ride: h }); sfx.neigh();
  toast(`You're riding ${HORSE_COATS[h].name}! Tap the ground to gallop 🐴`);
}
function hopOff() {
  const me = myParkPres(); if (!me || me.ride === undefined) return;
  const ride = me.ride;
  const { ride: _r, ...q } = me;
  walkQueue = [];
  const land = dismountSpot(q.x, q.y, q.flip);
  lastRideAt.set(ride, { x: q.x, y: q.y });
  setParkPres({ ...q, x: land.x, y: land.y });
  sfx.drop();
}
function reactAnimal(idx: number, food: number) {
  const el = idx < ANIMALS.length ? document.querySelector<HTMLElement>(`#ranchWorld .animal[data-animal="${idx}"]`)
    : (document.querySelector<HTMLElement>(`#ranchWorld .horse[data-horse="${idx - ANIMALS.length}"]:not(.away)`) ?? document.querySelector<HTMLElement>(`#ravatars .mount[data-mount="${idx - ANIMALS.length}"]`));
  if (!el || view !== 'ranch') return;
  const horse = idx >= ANIMALS.length, info = horse ? { say: 'Neigh! ♥', snd: 'neigh' } : ANIMAL_INFO[idx];
  el.classList.remove('hop', 'munch'); void el.offsetWidth; el.classList.add(food ? 'munch' : 'hop');
  setTimeout(() => el.classList.remove('hop', 'munch'), 1400);
  el.querySelector('.abubble')?.remove();
  const b = document.createElement('div'); b.className = 'bubble petBubble abubble'; b.textContent = food ? `Yum! Munch munch ${food === 1 ? '🥕' : food === 2 ? '🍎' : '🌾'}` : info.say; el.appendChild(b); clampPhoneBubbles();
  setTimeout(() => b.classList.add('out'), 1400); setTimeout(() => b.remove(), 1800);
  for (let i = 0; i < (food ? 6 : 4); i++) { const h = document.createElement('div'); h.className = 'heart'; h.textContent = '♥'; h.style.left = 15 + Math.random() * 70 + '%'; h.style.animationDelay = i * 0.12 + 's'; h.style.color = ['#ff6b9a', '#ff8fab', '#e879c6', '#b197fc'][i % 4]; el.appendChild(h); setTimeout(() => h.remove(), 1900); }
  (sfx as any)[info.snd]?.(); if (food) setTimeout(() => sfx.munch(), 250);
}
function henBob() { const h = document.querySelector<HTMLElement>('#ranchWorld .henHouse'); if (!h) return; h.classList.remove('lay'); void h.offsetWidth; h.classList.add('lay'); sfx.cluck(); }
function eggPop() {
  const hh = document.querySelector<HTMLElement>('#ranchWorld .henHouse'), chip = $('basketChip'); if (!hh) return;
  const a = hh.getBoundingClientRect(), b = chip.getBoundingClientRect();
  const e = document.createElement('div'); e.className = 'flyEgg'; e.innerHTML = eggSVG; document.body.appendChild(e);
  Object.assign(e.style, { left: a.left + a.width / 2 - 18 + 'px', top: a.top + a.height * 0.6 + 'px' });
  requestAnimationFrame(() => { e.style.left = b.left + b.width / 2 - 18 + 'px'; e.style.top = b.top + 'px'; e.style.transform = 'scale(.6) rotate(200deg)'; });
  setTimeout(() => { e.remove(); chip.classList.remove('bump'); void chip.offsetWidth; chip.classList.add('bump'); }, 650);
}
function dropApple(v: number) {
  const fx = document.getElementById('rfx'); if (!fx || view !== 'ranch') return; const sc = ranchScale();
  const [ax, ay] = APPLE_SPOTS[v] ?? APPLE_SPOTS[0]; const x0 = 2085 - 120 + ax, y0 = 482 - 300 + ay, x1 = x0 + (v % 2 ? 26 : -22), y1 = 575 + v * 4;
  const el = document.createElement('button'); el.className = 'fallenApple'; el.dataset.feed = 'apple'; el.setAttribute('aria-label', 'Apple'); el.innerHTML = appleSVG;
  const s = 32 * sc; Object.assign(el.style, { width: s + 'px', height: s + 'px', left: x0 * sc - s / 2 + 'px', top: y0 * sc - s / 2 + 'px', zIndex: depthZ(y1) });
  fx.appendChild(el); requestAnimationFrame(() => { el.style.left = x1 * sc - s / 2 + 'px'; el.style.top = y1 * sc - s + 'px'; el.classList.add('fallen'); });
  const t = document.querySelector<HTMLElement>('#ranchWorld .appleTree'); t?.classList.remove('shake'); void t?.offsetWidth; t?.classList.add('shake');
  sfx.boing(); setTimeout(() => el.remove(), 12000);
}
function honk() { const t = document.querySelector<HTMLElement>('#ranchWorld .tractor'); t?.classList.remove('bounce'); void t?.offsetWidth; t?.classList.add('bounce'); sfx.honk(); }
function onRanchFx(fx: Fx) {
  if (fx.k === 'zoo') reactAnimal(fx.a, fx.f);
  else if (fx.k === 'apple') dropApple(fx.v);
  else if (fx.k === 'honk') honk();
  else if (fx.k === 'hen') henBob();
}

// ---------- feeding: drag food from a bucket (or a fallen apple / a garden carrot) onto an animal ----------
function feedTargetAt(x: number, y: number): number | null {
  const t = document.elementFromPoint(x, y) as HTMLElement | null; if (!t) return null;
  const a = t.closest<HTMLElement>('[data-animal]'); if (a) return +a.dataset.animal!;
  const h = t.closest<HTMLElement>('.horse:not(.away)'); if (h) return ANIMALS.length + +h.dataset.horse!;
  const r = t.closest<HTMLElement>('.savatar.riding'); if (r?.dataset.ride) return ANIMALS.length + +r.dataset.ride;
  return null;
}
function startFeedDrag(e: PointerEvent, feed: 'carrot' | 'apple' | 'hay', src: 'bucket' | 'basket' | HTMLElement) {
  e.preventDefault(); e.stopPropagation();
  const ghost = document.createElement('div'); ghost.className = 'feedGhost'; ghost.innerHTML = FEED_SVG[feed]; document.body.appendChild(ghost);
  const place = (ev: PointerEvent) => { ghost.style.left = ev.clientX - 30 + 'px'; ghost.style.top = ev.clientY - 50 + 'px'; };
  place(e); sfx.pick(); let moved = 0; const x0 = e.clientX, y0 = e.clientY;
  if (src instanceof HTMLElement) src.style.visibility = 'hidden';
  // near the screen edge the scene scrolls, so food can reach animals that are further along
  let lastX = e.clientX, raf = 0; const scroll = $('ranchScroll');
  const edge = () => { const r = scroll.getBoundingClientRect(); const v = lastX < r.left + 60 ? -12 : lastX > r.right - 60 ? 12 : 0; if (v && moved > 12 && view === 'ranch') scroll.scrollLeft += v; raf = requestAnimationFrame(edge); };
  raf = requestAnimationFrame(edge);
  const move = (ev: PointerEvent) => { if (ev.pointerId !== e.pointerId) return; lastX = ev.clientX; moved = Math.max(moved, Math.hypot(ev.clientX - x0, ev.clientY - y0)); place(ev);
    document.querySelectorAll('.feedHover').forEach(x => x.classList.remove('feedHover'));
    const idx = feedTargetAt(ev.clientX, ev.clientY); if (idx !== null) (document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement)?.closest('.animal, .horse, .savatar')?.classList.add('feedHover'); };
  const up = (ev: PointerEvent) => {
    if (ev.pointerId !== e.pointerId) return; cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); ghost.remove(); feedDragEnd = Date.now(); // the click that follows a drag is not a tap on the ground
    document.querySelectorAll('.feedHover').forEach(x => x.classList.remove('feedHover'));
    const idx = feedTargetAt(ev.clientX, ev.clientY);
    if (idx === null) { if (src instanceof HTMLElement) src.style.visibility = ''; if (moved < 12) toast('Drag the food onto an animal! 🥕'); else sfx.drop(); return; }
    if (src === 'basket' && !doRanch({ op: 'use', kind: 'carrot' })) return;
    if (src instanceof HTMLElement) src.remove();
    const f = FOODS.indexOf(feed); reactAnimal(idx, f); hood?.fx({ k: 'zoo', a: idx, f });
  };
  window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
}
$('ranchWorld').addEventListener('pointerdown', e => {
  const t = e.target as HTMLElement;
  const b = t.closest<HTMLElement>('.bucket'); if (b) return startFeedDrag(e, b.dataset.feed as 'carrot', 'bucket');
  const ap = t.closest<HTMLElement>('.fallenApple'); if (ap) return startFeedDrag(e, 'apple', ap);
  if (t.closest('.rprop, .animal, .horse, .plot, .pet')) e.stopPropagation();
});
$('ranchWorld').addEventListener('click', e => {
  const t = e.target as HTMLElement; const me = myParkPres(); if (!me || view !== 'ranch' || Date.now() - feedDragEnd < 400) return;
  const a = t.closest<HTMLElement>('[data-animal]'); if (a) { const i = +a.dataset.animal!; reactAnimal(i, 0); hood?.fx({ k: 'zoo', a: i, f: 0 }); return; }
  const h = t.closest<HTMLElement>('[data-horse]'); if (h) { mount(+h.dataset.horse!); return; }
  const r = t.closest<HTMLElement>('[data-r]')?.dataset.r;
  if (r === 'egg') { henBob(); if (doRanch({ op: 'egg' })) { eggPop(); sfx.pickup(); } return; }
  if (r === 'honk') { honk(); hood?.fx({ k: 'honk' }); return; }
  if (r === 'apple') { const v = Math.floor(Math.random() * 4); dropApple(v); hood?.fx({ k: 'apple', v }); return; }
  if (r === 'barn') { goRanch(true); return; }
  if (r === 'exit') { goRanch(false); return; }
  if (r === 'mill') { const m = t.closest<HTMLElement>('.windmill'); m?.classList.remove('whirl'); void m?.offsetWidth; m?.classList.add('whirl'); sfx.swish(); return; }
  const pl = t.closest<HTMLElement>('[data-plot]'); if (pl) { tapPlot(+pl.dataset.plot!, pl); return; }
  if (t.closest('.bucket, .fallenApple, .savatar, .pet')) return;
  // tap the ground to walk (or gallop) there
  const rect = $('ranchWorld').getBoundingClientRect(), sc = ranchScale();
  const x = (e.clientX - rect.left) / sc, y = (e.clientY - rect.top) / sc;
  if (y < 400) return;
  goWalk(x, y);
});
function tapPlot(i: number, el: HTMLElement) {
  const p = ranchPlots()[i] ?? null, stg = plotStage(p, ranchNow());
  document.querySelector('.seedPick')?.remove();
  if (!p) {
    const pick = document.createElement('div'); pick.className = 'seedPick';
    pick.innerHTML = `<button data-seed="carrot">${carrotSVG}<span>Carrot</span></button><button data-seed="flower">${flowerSVG()}<span>Flower</span></button>`;
    el.parentElement!.appendChild(pick); pick.style.left = el.offsetLeft + el.offsetWidth / 2 + 'px'; pick.style.top = el.offsetTop - 8 + 'px';
    pick.addEventListener('pointerdown', ev => ev.stopPropagation());
    pick.addEventListener('click', ev => { ev.stopPropagation(); const s = (ev.target as HTMLElement).closest<HTMLElement>('[data-seed]')?.dataset.seed as 'carrot' | 'flower' | undefined; pick.remove();
      if (s && doRanch({ op: 'plant', i, seed: s })) { sfx.plant(); toast('Planted! Now tap it to water 💧'); } });
    setTimeout(() => pick.remove(), 6000);
    return;
  }
  if (!p.wet) { if (doRanch({ op: 'water', i })) { sfx.water(); el.classList.remove('watering'); void el.offsetWidth; el.classList.add('watering'); } return; }
  if (stg < 3) { toast('Still growing! 🌱'); sfx.pop(); return; }
  if (doRanch({ op: 'pick', i })) { sfx.pickup(); toast(p.seed === 'carrot' ? 'A carrot for your basket! 🥕' : 'Pretty flowers for your basket! 🌸'); }
}
let plotTick = 0;
function tickRanch(now: number, dt: number) {
  if (view !== 'ranch') return;
  const t = Date.now();
  document.querySelectorAll<HTMLElement>('#ranchWorld .animal').forEach(el => {
    const i = +el.dataset.animal!, sc = ranchScale(), ph = t / 5200 + i * 1.7;
    const x = (inBarn ? BARN_ANIMAL_X : ANIMAL_X)[i] + Math.sin(ph) * 32; el.style.left = (x - el.offsetWidth / sc / 2) * sc + 'px'; el.classList.toggle('flipped', Math.cos(ph) < 0);
    el.classList.toggle('walking', Math.abs(Math.cos(ph)) > 0.35);
  });
  if (now - plotTick > 1000) { plotTick = now; renderPlots(); }
  if (walkQueue.length) {
    const me = myParkPres();
    if (!me || me.where !== RWHERE()) walkQueue = [];
    else {
      const target = walkQueue[0];
      const speed = me.ride !== undefined ? 720 : 300;
      const dx = target.x - me.x, dy = target.y - me.y, d = Math.hypot(dx, dy);
      if (d < 6) walkQueue.shift();
      else {
        const step = Math.min(d, speed * dt);
        const next: Presence = { ...me, x: me.x + dx / d * step, y: me.y + dy / d * step, flip: Math.abs(dx) > 2 ? dx < 0 : me.flip };
        setParkPres(next);
        const sc = ranchScale(), scroll = $('ranchScroll'), sx = next.x * sc - scroll.scrollLeft;
        if (sx > -40 && sx < scroll.clientWidth + 40 && (sx < scroll.clientWidth * 0.2 || sx > scroll.clientWidth * 0.8)) scroll.scrollLeft = next.x * sc - scroll.clientWidth / 2;
      }
    }
  }
  for (const [h, tr] of trotting) {
    const el = document.querySelector<HTMLElement>(`#ranchWorld .horse[data-horse="${h}"]`);
    if (!el || el.classList.contains('away')) { trotting.delete(h); continue; }
    const dx = horseHome(h) - tr.x, dy = HORSE_Y - tr.y, d = Math.hypot(dx, dy);
    if (d < 8) { trotting.delete(h); el.classList.remove('trotting', 'flipped'); placeHorseEl(el, horseHome(h), HORSE_Y); continue; }
    const step = Math.min(d, 460 * dt);
    tr.x += dx / d * step; tr.y += dy / d * step;
    el.classList.add('trotting'); el.classList.toggle('flipped', dx < 0);
    placeHorseEl(el, tr.x, tr.y);
  }
}

// ---------- her basket (eggs, garden carrots, flowers) ----------
function renderBasketChip() {
  const chip = document.getElementById('basketChip'); if (!chip) return;
  const show = view === 'ranch' || (view === 'house' && (!hood || inner === local || currentHouseId === hood.myHouseId()));
  const b = myBasket(), any = b.egg + b.carrot + b.flower > 0;
  chip.classList.toggle('hidden', !show || (view === 'house' && !any)); chip.classList.toggle('inHouse', view === 'house'); if (!show) return;
  chip.innerHTML = `<span class="bIcon">${basketSVG}</span><span class="bcount" data-kind="egg">${eggSVG}<b>${b.egg}</b></span><span class="bcount" data-kind="carrot">${carrotSVG}<b>${b.carrot}</b></span><span class="bcount" data-kind="flower">${flowerSVG()}<b>${b.flower}</b></span>`;
}
$('basketChip').addEventListener('pointerdown', e => {
  const c = (e.target as HTMLElement).closest<HTMLElement>('.bcount[data-kind="carrot"]');
  if (c && view === 'ranch' && myBasket().carrot > 0) startFeedDrag(e, 'carrot', 'basket');
});
$('basketChip').addEventListener('click', () => openBasket());
function openBasket() {
  const home = view === 'house' && (!hood || inner === local || currentHouseId === hood.myHouseId());
  const names: Record<BasketKind, [string, string]> = { egg: ['Eggs', eggSVG], carrot: ['Carrots', carrotSVG], flower: ['Flowers', flowerSVG()] };
  const m = modal('', (t, close) => {
    const k = t.closest<HTMLElement>('[data-take]')?.dataset.take as BasketKind | undefined; if (!k) return;
    if (!home) { toast('Take it home to put it in your room! 🏠'); return; }
    const id = 'r' + Math.random().toString(36).slice(2, 10);
    const x = Math.max(120, Math.min(W - 120, camX + VIEW_W / 2 + (Math.random() - 0.5) * 300));
    if (doRanch({ op: 'take', kind: k, id, room: store.get().currentRoom, x })) { sfx.drop(); close(); toast('It\'s in your room! Drag it to a hand to carry it ✋'); }
  }, 'basketSheet');
  const b = myBasket();
  m.root.querySelector('.card')!.innerHTML = `${X}<h2>My Basket</h2><p class="hint small">${home ? 'Tap one to put it in your room.' : 'Collect eggs, carrots and flowers at Rainbow Ranch, then take them home!'}</p>
    <div class="basketRows">${BASKET_KINDS.map(k => `<button class="bRow" data-take="${k}" ${b[k] ? '' : 'disabled'}>${names[k][1]}<b>${b[k]}</b><span>${names[k][0]}</span></button>`).join('')}</div>`;
}
(window as any).__ranch = () => ({ view, inBarn, plots: ranchPlots().map(p => (p ? { seed: p.seed, stage: plotStage(p, ranchNow()), wet: !!p.wet } : null)), basket: myBasket(), me: myParkPres(), ridden: [...ridersOf().keys()] });

// ---------- "What's new!" (once per device per update) / welcome on a brand-new device ----------
function showWhatsNew() {
  if (firstRun.kind === 'none') return;
  markSeen();
  const m = modal(whatsNewHTML(firstRun.kind, firstRun.entries), (t, close) => { if (t.closest('#wnGo')) { sfx.sparkle(); close(); } }, 'whatsNew ' + firstRun.kind);
  m.root.querySelector('.card')!.insertAdjacentHTML('afterbegin', X);
}
setTimeout(showWhatsNew, 500);
(window as any).__whatsnew = firstRun;
(window as any).__hood = () => hood;
(window as any).__hood_url = () => hoodServerUrl();
(window as any).__ui = () => ({ view, currentHouseId, mode: hood ? 'hood' : 'solo' });
bindGameRoom({
  hood: () => hood, view: () => view, solo: () => soloPark, myPres, setPres: setParkPres, toast, refreshNear: updateNear, sfx, goMap,
  soloLook: () => { const s = local.get(); return { look: cleanLook(s.characters[0] ?? {}), dog: s.dog ?? null }; },
});

// ---------- start ----------
renderAll(); renderDrawer(); fit(); requestAnimationFrame(fit);
// ---------- hidden surprises ----------
const renderSecrets = () => {
  const n = foundSet().size, total = EGGS.length;
  const el = $('secrets');
  el.innerHTML = `<span class="secGift">🎁</span><span class="secWord"> Surprises: </span><span class="secCount">${n}/${total}</span>`;
  el.setAttribute('aria-label', `Surprises, ${n} of ${total}`);
  placeSecretsPill();
};

/** Keep the petting-zoo label on screen. Scroll a little if the girl still fits, then slide the label. */
function frameRanchSign() {
  if (view !== 'ranch' || inBarn) return;
  const scroll = $('ranchScroll');
  const hint = document.querySelector<HTMLElement>('.doorHint');
  if (!hint || !scroll.clientWidth) return;
  const sc = ranchScale(), pad = 14, vw = scroll.clientWidth, hw = hint.offsetWidth;
  const need = Math.max(0, BARN_DOOR_X * sc + hw / 2 + pad - vw);
  if (scroll.scrollLeft < need) {
    const me = myParkPres();
    const maxForGirl = me && me.where === 'ranch' ? Math.max(0, me.x * sc - 60 * sc - pad) : need;
    scroll.scrollLeft = Math.min(need, maxForGirl);
  }
  phoneShowKids();
  keepDoorHintOnScreen();
}
function keepDoorHintOnScreen() {
  const hint = document.querySelector<HTMLElement>('.doorHint');
  const scroll = document.getElementById('ranchScroll');
  if (!hint || !scroll) return;
  const sc = ranchScale();
  const doorX = BARN_DOOR_X * sc - scroll.scrollLeft;
  const hw = hint.offsetWidth, pad = 12;
  const right = doorX + hw / 2, left = doorX - hw / 2;
  let dx = 0;
  if (right > innerWidth - pad) dx -= right - (innerWidth - pad);
  if (left + dx < pad) dx += pad - (left + dx);
  hint.style.transform = `translateX(calc(-50% + ${dx}px))`;
}
const eggs = initEggs({
  world, roomW: W, roomH: H, currentRoom: () => store.get().currentRoom,
  sparkle: () => sfx.sparkle(), tap: () => sfx.click(),
  onFound: (_name, isNew) => {
    renderSecrets();
    if (isNew) { const t = $('secrets'); t.classList.remove('pulse'); void t.offsetWidth; t.classList.add('pulse'); setTimeout(() => toast('🎁 A secret surprise appeared in your drawer!'), 1400); renderDrawer(); }
  },
});
store.subscribe((_s, a) => { if (a.type === 'room/switch' || a.type === 'game/reset') eggs.update(); });
renderSecrets();
(window as any).__eggs = () => ({ found: [...foundSet()] });
initHood();
