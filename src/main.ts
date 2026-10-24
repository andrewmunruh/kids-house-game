import './style.css';
import './juice.css';
import './scenery.css';
import './mail.css';
import './avatar.css';
import './baby.css';
import { MAP_W, MAP_H, PARK, RANCH, SQUARE, CLUB, mapBgSVG, mapPortraitBgSVG, mapTreesSVG, portraitMeadowSVG, mapSkySVG, mapMeadowSVG, parkMiniSVG, ranchMiniSVG, clubhouseMiniSVG, mapIcon, faceSVG } from './map';
import { createStore, newCharacter, takeClearedFurniture, drawnScale, itemSizeOf, ITEM_SIZE_STEPS, ROOM_W, ROOM_H, V1_OFFSET, MAX_CHARS, type RoomId, type PlacedItem, type GameState, type Character, type Hand, type Action, type Cat, type Dog } from './shared/state';
import { HoodClient, houseStore, loadHoodConfig, saveHoodConfig, hoodServerUrl, createNeighborhood, lookupNeighborhood, type HoodConfig } from './net';
import { NICKNAMES, PHRASES, EMOTES, MAX_CHAT, CODE_MAX, ROSTER_SUGGEST, MAX_ROSTER, normCode, validInvite, filterSay, FILTER_MSG, isNear, streetWidth, slotX, cleanLook, cleanPetName, CAT_NAMES, DOG_NAMES, PARK_W, PARK_SPOTS, SLIDE, DOG_AREA, mailIsFree, type Presence, type Bubble, type Look, type Fx } from './shared/hood';
import { catSVG, dogSVG, catAt, kennelLook, towerFootY, CAT_COATS, DOG_BREEDS } from './pets';
import { mailboxArt, installMail } from './mail';
import { installPlayMode, playGesture } from './playmode';
import { anchorsOf, bedArt, lieBedKinds, lieOffset, lieSpot, pieceWidth, resolveDrop, seatFractions, standBeside, type DollSeat, type PresSeat, type SeatPiece } from './shared/sit';
import { babyOccupant } from './shared/baby';
import { installBaby } from './baby/view';
import { poseNamed } from './avatar/sit';
import { unreadCount } from './shared/mail';
import { parkSceneSVG, swingSVG, ballSVG, treeIcon, pawIcon, gateIcon, streetGateSVG, PARK_H, SWING_BAR } from './park';
import { houseSVG, ICONS, toast, adultCheck } from './hood-ui';
import { initEggs, foundSet, EGGS } from './eggs';
import { ITEMS, ITEM_MAP, svgOf, shelfThumb, hOf, installArtFallback, type Category, type ItemDef } from './items';
import { rasterOn, rasterUrl } from './art/cache';
import { artSolid, topHit } from './art/hit';
import { PATTERNS_FROM_PACKS, PATTERN_MAP, packLabel } from './packs';
import { characterSVG, cradleFrontSVG, handsFor, SIZE_SCALE } from './character';
import { lookStamp, look2FromLegacy, legacyFromLook2, randomLook2, patchFromLook2, sanitizeLook2, type Look2 } from './shared/avatar';
import { stampAvatar, richAvatars } from './avatar/motion';
import { avatarSheetHTML, avatarAct, avatarIntroPending, markAvatarIntro } from './avatar/sheet';
import { chibiRideLeg } from './avatar/ride';
import { sfx, setSound } from './sound';
import { setAmbientMusic, primeAmbientMusic } from './ambientMusic';
import { BEAT_MS, MUSIC_BOX_MS, isFridge, isPowerable, isTub, reactionsFor, roleOf, syncDelayMs, type AmbChar, type AmbItem, type Reaction, type ReactionKind } from './shared/ambient';
import './ambient.css';
import { catalogShows } from './roomfilter';
import { resolveFrame } from './framekid';
import { layoutNameTags } from './nametags';
import { installJuice, prefersReducedMotion, wiggleItem } from './juice';
import { emptyRoomStarters, setRoomScenery, syncScenery } from './scenery';
import { DOOR_CAT_X, DOOR_KID, LIVE_DOOR, YARD_CAM, YARD_CAT, YARD_DOG, YARD_DOOR, YARD_KID, YARD_STAGE, registerYardItems, yardBackyardScenery, yardCompareHTML, yardDoorMarkup, yardLookPatch, yardPreviewOn, yardSheetHTML, yardShot } from './yard';
import { whatsNewCheck, whatsNewHTML, markSeen } from './whatsnew';
import { isLightKind } from './sky';
import { dockSkyChrome, mountSkyToggle } from './sky-toggle';
import './sky.css';
import { BARN_W, BARN_ANIMAL_X, BARN_DOOR_X, RANCH_W, RANCH_Y0, RANCH_Y1, ANIMALS, ANIMAL_X, ANIMAL_Y, HORSES, HORSE_X, HORSE_Y, FOODS, PLOTS, PLOT_X, BASKET_KINDS, ranchApply, cleanPlots, cleanBasket, plotStage, emptyBasket, type RanchOp, type Basket, type BasketKind, type Plot } from './shared/ranch';
import { barnSceneSVG, windmillSVG, ranchSceneSVG, paddockFenceSVG, animalSVG, horseSVG, henHouseSVG, tractorSVG, appleTreeSVG, APPLE_SPOTS, appleSVG, FEED_SVG, bucketSVG, basketSVG, eggSVG, carrotSVG, flowerSVG, plotSVG, rainbowIcon, hopOffIcon, streetRanchGateSVG, ANIMAL_INFO, HORSE_COATS, RANCH_H, POND, FENCE_FOOT } from './ranch';
import { bindGameRoom, renderGameRoom, renderGamePeople, tickGameRoom, mySeat, grScale, tableApi, GR_PORTRAIT_VIEW } from './gameroom-view';

// The renderer talks to `store`, which forwards to either the offline localStorage house
// or a neighborhood house (server-authoritative) — same actions, same reducer.
type AnyStore = { get(): GameState; dispatch(a: Action): void; subscribe(l: (s: GameState, a: Action) => void): void };
const firstRun = whatsNewCheck(); // must run before the store loads/saves
const local = createStore();
if (local.born && typeof navigator !== 'undefined' && !navigator.webdriver && !local.get().baby) {
  local.dispatch({ type: 'baby/meet', now: Date.now() });
}
let inner: AnyStore = local;
const storeListeners: ((s: GameState, a: Action) => void)[] = [];
const hooked = new WeakSet<AnyStore>();
function hookStore(st: AnyStore) { if (hooked.has(st)) return; hooked.add(st); st.subscribe((s, a) => { if (inner === st) storeListeners.forEach(l => l(s, a)); }); }
hookStore(local);
const store: AnyStore = {
  get: () => inner.get(),
  dispatch(a) { inner.dispatch(a); },
  subscribe: l => { storeListeners.push(l); },
};
// World is ROOM_W x ROOM_H; the stage shows a VIEW_W-wide window onto it (fits the iPad).
const W = ROOM_W, H = ROOM_H, FLOOR_Y = 390;
let VIEW_W = 1000; // visible window; narrower in portrait so the room can fill the height
const maxCam = () => Math.max(0, W - VIEW_W);
const WALL_BOTTOM = 375; // wall items (manifest `wall: true`) snap so they sit on the wall
const snapY = (def: ItemDef, y: number) => def.wall ? Math.min(y, WALL_BOTTOM) : y;
// The stage is a 600px border-box with a 6px border, so the bottom 12px of the world is clipped.
// Floor pieces draw 12px higher. The stored y is left alone, so old saves stay valid.
const FLOOR_DRAW = 12;
const drawY = (def: ItemDef, y: number) => def.wall ? y : Math.min(y, H - FLOOR_DRAW);
const CHAR_W = 120, CHAR_H = 192;
const ROOMS: { id: RoomId; name: string; color: string }[] = [
  { id: 'living', name: 'Living Room', color: '#ff8fab' },
  { id: 'bedroom', name: 'Bedroom', color: '#b388d6' },
  { id: 'kitchen', name: 'Kitchen', color: '#5cc985' },
  { id: 'salon', name: 'Salon', color: '#f0a0d8' },
  { id: 'nursery', name: 'Nursery', color: '#9ad7f5' },
  { id: 'bathroom', name: 'Bathroom', color: '#7ec8d6' },
];
const roomColor = (r: string) => ROOMS.find(x => x.id === r)?.color ?? '#ccc';
// ?yard=1 stages the approval shots. The catalog itself is always registered.
const yardOn = yardPreviewOn();
registerYardItems(ITEMS, ITEM_MAP);

// ---------- drawer tabs: people, categories, then packs ----------
type Tab = { id: string; name: string; icon: string; kind: 'people' | 'cat' | 'pack' };
const TABS: Tab[] = [
  { id: '__people', name: 'People', icon: '', kind: 'people' },
  ...(['furniture', 'decor', 'plants', 'food', 'pets'] as Category[]).map((c, i) => ({ id: c, name: c, icon: ['armchair', 'balloon', 'flowers', 'donut', 'cat'][i], kind: 'cat' as const })),
];
TABS.push({ id: 'secrets', name: 'Secrets', icon: 'egg:chloe-starlamp', kind: 'cat' });
for (const it of ITEMS) if (!TABS.some(t => t.kind === 'cat' && t.id === it.cat)) TABS.push({ id: it.cat, name: it.cat, icon: it.kind, kind: 'cat' });
for (const it of ITEMS) if (it.pack && !TABS.some(t => t.id === 'pack:' + it.pack)) TABS.push({ id: 'pack:' + it.pack, name: packLabel(it.pack), icon: it.kind, kind: 'pack' });
const tabItems = (tab: string) => ITEMS.filter(i => catalogShows(i, tab, store.get().currentRoom, roomFilter === 'all', foundSet()));

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
  smaller: `<svg viewBox="0 0 48 48"><rect x="16" y="16" width="16" height="16" rx="4" fill="#bde0fe" stroke="#5a3d5c" stroke-width="3"/><path d="M8 24 H14 M34 24 H40" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>`,
  bigger: `<svg viewBox="0 0 48 48"><rect x="12" y="12" width="24" height="24" rx="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M24 6 V11 M24 37 V42 M6 24 H11 M37 24 H42" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>`,
};
const PEOPLE_ICON = `<svg viewBox="0 0 48 48"><circle cx="17" cy="18" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><circle cx="32" cy="20" r="7" fill="#ff8fab" stroke="#5a3d5c" stroke-width="3"/><path d="M5 42 Q6 28 17 28 Q28 28 29 42 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/><path d="M24 42 Q25 30 32 30 Q42 30 43 42 Z" fill="#c9a0dc" stroke="#5a3d5c" stroke-width="3" stroke-linejoin="round"/></svg>`;
const MENU_ICON = `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 15 H37 M11 24 H37 M11 33 H37" fill="none" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>`;
const MAIL_ICON = `<svg class="mailGlyph" viewBox="0 0 48 48" aria-hidden="true"><g transform="translate(0 2)"><rect x="6" y="14" width="36" height="24" rx="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/><path d="M6 16 L24 30 L42 16" fill="none" stroke="#5a3d5c" stroke-width="3"/><path d="M34 12 V6" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><path d="M34 6 H44 L40 10 L44 14 H34 Z" fill="#ff6b6b" stroke="#5a3d5c" stroke-width="2"/></g></svg>`;
const PLUS = `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#fff3b0" stroke="#5a3d5c" stroke-width="3"/><path d="M24 15 V33 M15 24 H33" stroke="#5a3d5c" stroke-width="4" stroke-linecap="round"/></svg>`;

// ---------- DOM skeleton ----------
const app = document.getElementById('app')!;
app.innerHTML = `
<div class="top">
  <div class="tabs" id="tabs"></div>
  <div class="minimap" id="minimap" aria-label="Room map"><div class="mmWall" id="mmWall"></div><div class="mmFloor" id="mmFloor"></div><div id="mmDots"></div><div class="mmView" id="mmView"></div></div>
  <div class="streetTitle" id="streetTitle">Our Neighborhood</div>
  <div class="tools">
    <button class="round hoodOnly" id="btnChat" aria-label="Talk">${ICONS.chat}<span class="badge" id="chatBadge"></span></button>
    <button class="round homeBtn" id="btnHome" aria-label="Home">${ICONS.home}</button>
    <button class="round barnOnly" id="btnLeavePark" aria-label="Go outside">${gateIcon}</button>
    <button class="round rideOnly" id="btnHopOff" aria-label="Hop off the horse">${hopOffIcon}</button>
    <button class="round mapBtn" id="btnMap" aria-label="Map">${mapIcon}<span class="badge" id="mapBadge"></span></button>
    <button class="round" id="btnMenu" aria-label="Menu" aria-expanded="false">${MENU_ICON}<span class="badge" id="menuBadge"></span></button>
  </div>
</div>
<div class="menuPop hidden" id="menuPop">
  <div class="menuCard" role="dialog" aria-label="Menu">
    <button type="button" class="close" id="menuClose" aria-label="Close">✕</button>
    <p class="menuGroup">My stuff</p>
    <button type="button" class="menuRow" id="btnPets" aria-label="Pets"><span class="mIco">${pawIcon}</span><span class="mLabel">Pets</span></button>
    <button type="button" class="menuRow" id="btnDress" aria-label="Characters"><span class="mIco">${ICON.shirt}</span><span class="mLabel">Characters</span></button>
    <button type="button" class="menuRow" id="btnPaint" aria-label="Colors"><span class="mIco">${ICON.paint}</span><span class="mLabel">Wall &amp; floor colors</span></button>
    <button type="button" class="menuRow" id="secrets" aria-label="Surprises, 0 of 5"><span class="mIco secGift">🎁</span><span class="mLabel"><span class="secWord">Surprises </span><span class="secCount">0/5</span></span></button>
    <p class="menuGroup houseGroup">House</p>
    <button type="button" class="menuRow lockRow" id="btnLock" aria-label="Lock house"><span class="mIco" id="lockIco">${ICONS.lockOff}</span><span class="mLabel" id="lockLabel">Lock my house</span></button>
    <button type="button" class="menuRow mailRow" id="btnMail" aria-label="Mailbox"><span class="mIco">${MAIL_ICON}</span><span class="mLabel">Mailbox</span><span class="menuNew" id="mailNew"></span></button>
    <!-- Day / Night / Auto. The clock stays on Auto until she taps. -->
    <div id="menuDaySlot" class="menuSlot" hidden></div>
    <p class="menuGroup streetGroup">Street</p>
    <button type="button" class="menuRow grownRow" id="btnParent" aria-label="Grown-ups"><span class="mIco">${ICONS.shield}</span><span class="mLabel">Grown-ups</span></button>
    <button type="button" class="menuRow soloLeave" id="btnSolo" aria-label="Play in my own house"><span class="mIco">${ICONS.solo}</span><span class="mLabel">Play in my own house</span></button>
    <button type="button" class="menuRow friendRow" id="btnHood" aria-label="Friends"><span class="mIco">${ICONS.street}</span><span class="mLabel">Friends</span></button>
    <p class="menuGroup">This iPad</p>
    <button type="button" class="menuRow" id="btnSound" aria-label="Sound"><span class="mIco" id="soundIco"></span><span class="mLabel">Sound</span></button>
  </div>
</div>
<div class="stageWrap" id="stageWrap">
  <div class="stage" id="stage">
    <div class="world" id="world">
      <div class="wall" id="wall"></div><div class="floor" id="floor"></div><div class="baseboard"></div>
      <div class="scenery" id="scenery"></div>
      <div class="layer" id="layer"></div>
      <div class="toolbar hidden" id="toolbar">
        <button data-a="smaller" aria-label="Smaller">${ICON.smaller}</button><button data-a="bigger" aria-label="Bigger">${ICON.bigger}</button><button data-a="flip" aria-label="Flip">${ICON.flip}</button><button data-a="front" aria-label="Bring forward">${ICON.front}</button><button data-a="back" aria-label="Send back">${ICON.back}</button><button data-a="delete" class="danger" aria-label="Put away">${ICON.trash}</button>
      </div>
    </div>
    <button class="nudge left" id="nudgeL" aria-label="Look left"><svg viewBox="0 0 40 40"><path d="M24 10 L14 20 L24 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="nudge right" id="nudgeR" aria-label="Look right"><svg viewBox="0 0 40 40"><path d="M16 10 L26 20 L16 30" fill="none" stroke="#5a3d5c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </div>
  <div class="bin" id="bin">${ICON.trash}</div>
  <div class="houseTag" id="houseTag"></div>
</div>
<div class="drawer">
  <div class="drawerBar" id="drawerBar">
    <div class="modeDock" id="modeDock">
      <div class="modeToggle" id="modeToggle">
        <button type="button" id="modePlay" data-mode="play" aria-label="Play" aria-pressed="false"><span class="modeIco"></span><span class="modeWord">Play</span></button>
        <button type="button" id="modeDecorate" data-mode="decorate" aria-label="Decorate" aria-pressed="true"><span class="modeIco"></span><span class="modeWord">Decorate</span></button>
      </div>
    </div>
    <div class="drawerTop">
      <div class="rooms" id="roomFilter"></div>
      <div class="cats" id="cats"></div>
    </div>
    <div class="chipCue" id="chipCue" aria-hidden="true">›</div>
  </div>
  <div class="shelf" id="shelf"></div>
</div>
<div class="street park ranch hidden" id="ranch"><div class="streetScroll" id="ranchScroll"><div class="parkWorld ranchWorld" id="ranchWorld"></div></div></div>
<button class="basketChip hidden" id="basketChip" aria-label="My basket"></button>
<div class="street park hidden" id="park"><div class="streetScroll" id="parkScroll"><div class="parkWorld" id="parkWorld"></div></div></div>
<div class="street grRoom hidden" id="gameroom"><div class="streetScroll" id="grScroll"><div class="parkWorld grWorld" id="grWorld"></div></div><div id="grSolo" class="grSolo hidden">Play with friends on your street</div></div>
<div id="tableOverlay" class="tableOverlay hidden"></div>
<div class="street mapView hidden" id="street"><div class="mapSky">${mapSkySVG}</div><div class="mapMeadow">${mapMeadowSVG}</div><button class="mailCue" id="mailCue" type="button">You've got mail!</button><div class="mapWorld" id="mapWorld"></div></div>
<div class="chatTray hidden" id="chatTray"></div>
<div class="sheet hidden" id="sheet"><div class="card" id="card"></div></div>
<div class="fx" id="fx"></div>
<div id="toastLane"></div>
<div class="phoneNote" id="phoneNote"><div class="card"><h2>Turn sideways</h2><p>Turn your phone sideways for more room to play!</p><button class="phoneOk" id="phoneOk" type="button">OK!</button></div></div>
<div class="elsewhere hidden" id="elsewhere"><div class="card"><h2>You're playing on another screen</h2><p>This screen can rest. Your house is safe.</p><button class="playHere" id="elsewhereGo" type="button">Tap to play here!</button></div></div>
<div id="skyMount"></div>`;

const $ = (id: string) => document.getElementById(id)!;
// preview builds (separate URL, separate server, prefixed saves) wear a little ribbon so nobody mixes them up
if (import.meta.env.VITE_STORE_PREFIX) { document.body.classList.add('is-preview'); document.body.insertAdjacentHTML('beforeend', '<div class="previewRibbon">PREVIEW</div>'); }
const stage = $('stage'), world = $('world'), layer = $('layer'), toolbar = $('toolbar'), bin = $('bin');
let selected: string | null = null;          // selected room item (UI only)
let activeChar: string | null = store.get().characters[0]?.id ?? null; // character being edited (UI only)
let currentTab = 'furniture';
let roomFilter = ''; // '' follows the room you're in; 'all' shows every room's things
let tabMode = '';
let uid = Date.now() % 100000;
const newId = (p: string) => `${p}-${Date.now().toString(36)}${(++uid).toString(36)}${Math.random().toString(36).slice(2, 5)}`;
const ME = '__me';
// ---------- neighborhood state (declared early: render functions consult it) ----------
let hood: HoodClient | null = null;
let view: 'house' | 'street' | 'park' | 'ranch' | 'gameroom' = 'house'; // 'street' is the neighborhood map
let inBarn = false; // inside Rainbow Ranch: the yard, or the barn (petting zoo)
let currentHouseId = '';
let houseStores = new Map<string, ReturnType<typeof houseStore>>();
let modeFit = false;
let pokeBaby = () => {};
const play = installPlayMode($('modeToggle'), {
  ownHouse: () => !hood || !currentHouseId || currentHouseId === hood.myHouseId(),
  onChange: () => { if (modeFit) { if (phoneMQ.matches) fitPhone(); else fit(); } pokeBaby(); },
});
const mailUI = installMail({
  send: (houseId, text, color, sticker) => hood?.sendMail(houseId, text, color, sticker),
  read: (houseId, id) => hood?.readMail(houseId, id),
  drop: (houseId, id) => hood?.dropMail(houseId, id),
  houseOf: pid => [...(hood?.players.values() ?? [])].find(p => p.pid === pid)?.houseId ?? '',
  houseName: houseId => hood?.houses.get(houseId)?.meta.name ?? 'My House',
  lettersOf: houseId => hood?.houses.get(houseId)?.confirmed.mailbox?.letters ?? [],
  mine: houseId => !!hood && hood.houses.get(houseId)?.meta.ownerId === hood.pid,
  toast,
  openOwn: () => { const id = hood?.myHouseId(); if (id) openMailbox(id); },
  freeType: () => !hood || mailIsFree(hood.settings),
});
play.sync(true);
const avatarEls = new Map<string, HTMLElement>();

// ---------- camera (view-only, not part of game state) ----------
const cams: Record<string, number> = {};
let camX = V1_OFFSET, inertia = 0;
modeFit = true;
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
  placePopups();
}
/** Pop-ups sit under the real header, on the phone and the iPad. A fixed 8px top covers the title and Chat. */
function placePopups() {
  const top = document.querySelector('.top');
  if (!top) return;
  const y = Math.ceil(top.getBoundingClientRect().bottom + 16) + 'px';
  const cue = document.getElementById('mailCue');
  if (cue) cue.style.top = y;
  const lane = document.getElementById('toastLane');
  if (lane) lane.style.top = y;
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
  const boxW = wrap.clientWidth;
  const boxH = wrap.clientHeight;
  const frameH = Math.max(1, boxH - careTopReserve());
  // Portrait uses the whole wrap. iPad keeps the original test. On a phone, a tall
  // tool row can make the stage almost square; still frame it as portrait so the room fills the screen.
  const portrait = phone ? boxH > boxW * 0.85 : boxH > boxW + 40;
  if (portrait) {
    const aspect = boxW / Math.max(1, boxH);
    VIEW_W = Math.round(Math.max(480, Math.min(860, H * aspect)));
  } else if (phone) {
    const aspect = boxW / Math.max(1, frameH);
    VIEW_W = Math.round(Math.max(480, Math.min(W, H * aspect)));
  } else VIEW_W = 1000;
  VIEW_W = withPlayZoomFloor(VIEW_W);
  stage.style.width = VIEW_W + 'px';
  stage.style.height = H + 'px';
  const sc = Math.min(boxW / VIEW_W, frameH / H);
  placeStage(sc);
  stage.style.setProperty('--yard-sc', String(sc || 1));
  if (phone) stage.style.setProperty('--fit', String(stageScale()));
  placePhoneNudges();
  if (camX > maxCam()) setCam(camX);
  else { const v = $('mmView'); v.style.left = camX / W * 100 + '%'; v.style.width = VIEW_W / W * 100 + '%'; }
  phoneShowKids();
  if (!phone && view === 'house') frameHouseKid(false);
  syncTabMode();
  if (view === 'ranch') requestAnimationFrame(frameRanchSign);
  if (view === 'gameroom') requestAnimationFrame(frameClubSign);
  clampPhoneBubbles();
  if (phone && view === 'ranch') layoutPaddock();
  placeSecretsPill();
  play.hint();
  frameYardCam();
  placeYardHints();
}
/** Phone arrows live on the wrap in screen pixels. Centre them on the stage, in the yard and indoors. */
function placePhoneNudges() {
  const wrap = $('stageWrap');
  const on = document.body.classList.contains('phone') && view === 'house';
  for (const n of [$('nudgeL'), $('nudgeR')]) {
    if (!on || n.parentElement !== wrap) {
      n.style.marginTop = ''; n.style.left = ''; n.style.right = '';
      n.style.top = '';
      continue;
    }
    const stageBox = stage.getBoundingClientRect();
    const wrapBox = wrap.getBoundingClientRect();
    const mid = (stageBox.top + stageBox.bottom) / 2 - wrapBox.top;
    n.style.top = mid + 'px';
    n.style.marginTop = (-n.offsetHeight / 2) + 'px';
    n.style.left = ''; n.style.right = '';
  }
}
/**
 * Short phone landscape letterboxes the room. The full Surprises pill is wider than
 * that side gutter, so it becomes a 44px stack of the gift and the count. A gutter
 * under 44px cannot hold even that, so the pill joins the top row. 844×390 is wide
 * enough to miss the 360px rule and still covers the sky, so it uses the same park.
 * iPad never has body.phone, and taller landscape phones keep the centred label.
 */
/** Surprises live in the Menu now. fit() still calls this; it must not park a pill on the stage. */
function placeSecretsPill() {
  document.body.classList.remove('secrets-chrome');
  $('secrets')?.classList.remove('compact');
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
  else finishPortraitFrame();
}
/** After the kid is on screen, pull the clubhouse sign into that same view.
 *  Ranch signs stay painted on the gate and the barn. Sliding them into the
 *  portrait camera lifts the barn banner off the barn and shows both at once. */
function finishPortraitFrame() {
  if (!portraitPlace()) return;
  if (view === 'gameroom') framePlaceArts([...document.querySelectorAll<HTMLElement>('.neonSignArt')], document.getElementById('grScroll'));
  if (view === 'ranch' && !inBarn) { keepDoorHintOnScreen(); settleRanchSigns(); }
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
function phoneShowHouseKid() { frameHouseKid(false); }
/**
 * Play on a short screen. The widest floor piece stays at most about 55% of the view,
 * so a bed does not fill a phone. iPad sizes are over 500 on the short side.
 */
function widestFloorPiece(items: { kind: string; scale: number; size?: number }[]): number {
  let piece = 0;
  for (const it of items) {
    const def = ITEM_MAP[it.kind];
    if (!def || def.wall) continue;
    piece = Math.max(piece, def.w * drawnScale(it));
  }
  return piece;
}
function playZoomFloor(): number {
  if (view !== 'house' || !play.isPlay()) return 0;
  if (Math.min(window.innerWidth, window.innerHeight) >= 500) return 0;
  // This room's widest piece, so a bedroom is not shrunk to fit the nursery rug.
  // The yard stays at least as wide as the busiest indoor room, so the door and
  // the play set still share one frame with the living room.
  const rooms = store.get().rooms;
  const here = store.get().currentRoom;
  let piece = widestFloorPiece(rooms[here]?.items ?? []);
  if (here === 'backyard') {
    for (const id of Object.keys(rooms) as RoomId[]) {
      if (id === 'backyard') continue;
      piece = Math.max(piece, widestFloorPiece(rooms[id].items));
    }
  }
  if (piece < 40) return 0;
  return Math.min(W, Math.ceil(piece / 0.55));
}
function withPlayZoomFloor(viewW: number): number {
  const floor = playZoomFloor();
  return floor && viewW < floor ? floor : viewW;
}
/** Raise the view when Play on a short screen would let a piece fill it. */
function raisePlayZoom() {
  const next = withPlayZoomFloor(VIEW_W);
  if (next <= VIEW_W + 0.5) return;
  VIEW_W = next;
  stage.style.width = VIEW_W + 'px';
  const wrap = $('stageWrap');
  const frameH = Math.max(1, wrap.clientHeight - careTopReserve());
  const sc = Math.min(wrap.clientWidth / VIEW_W, frameH / H);
  placeStage(sc);
  if (document.body.classList.contains('phone')) stage.style.setProperty('--fit', String(sc));
  if (camX > maxCam()) setCam(camX);
  else { const v = $('mmView'); v.style.left = camX / W * 100 + '%'; v.style.width = VIEW_W / W * 100 + '%'; }
}
/** The piece she is sitting on, or the one under her finger in Play. */
let playAim: string | null = null;
/** True while her finger is down on a doll. Panning during that drag slides the furniture under the finger. */
let charDrag = false;
function playPairBounds(): { minX: number; maxX: number } | null {
  if (view !== 'house' || !play.isPlay()) return null;
  if (Math.min(window.innerWidth, window.innerHeight) >= 500) return null;
  const s = store.get();
  if (s.currentRoom === 'backyard') return null;
  let dollX: number | null = null;
  let targetId: string | null = playAim;
  if (hood && inner !== local) {
    const me = myPres();
    if (me && me.where === 'house' && me.room === s.currentRoom) {
      dollX = seatedAt(s.currentRoom, presSeat(hood.pid, me), me).x;
      if (!targetId) targetId = presSeat(hood.pid, me)?.item ?? null;
    }
  }
  if (dollX === null) {
    const c = s.characters.find(ch => ch.id === activeChar && ch.room === s.currentRoom) ?? s.characters.find(ch => ch.room === s.currentRoom);
    if (!c) return null;
    dollX = seatedAt(s.currentRoom, dollSeat(c), c).x;
    if (!targetId) targetId = dollSeat(c)?.item ?? null;
  }
  if (!targetId) return null;
  const it = s.rooms[s.currentRoom].items.find(i => i.id === targetId);
  const def = it && ITEM_MAP[it.kind];
  if (!it || !def) return null;
  const half = def.w * drawnScale(it) / 2;
  return { minX: Math.min(dollX - 100, it.x - half), maxX: Math.max(dollX + 100, it.x + half) };
}
/** Pan so the kid and her name tag sit inside the stage. On a drop, step her inward if the camera is already at the end of the room. */
function frameHouseKid(nudgeX: boolean) {
  if (view !== 'house' || doorPress) return;
  // The yard camera is staged. Centring her here pans the starter bench off a phone.
  if (store.get().currentRoom === 'backyard') {
    if (Math.abs(camX - YARD_CAM) > 0.5) setCam(YARD_CAM);
    placeYardHints();
    return;
  }
  if (charDrag) return;
  const pair = playPairBounds();
  if (pair) {
    const pad = 20;
    const span = pair.maxX - pair.minX;
    let cam = camX;
    if (span + pad * 2 > VIEW_W) cam = pair.minX - pad;
    else {
      if (pair.minX - pad < cam) cam = pair.minX - pad;
      if (pair.maxX + pad > cam + VIEW_W) cam = pair.maxX + pad - VIEW_W;
    }
    cam = Math.max(0, Math.min(maxCam(), cam));
    if (Math.abs(cam - camX) > 0.5) setCam(cam);
    placeYardHints();
    return;
  }
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
    if (Math.abs(delta) > 3) { setCam(camX + delta / sc); placeYardHints(); return; }
  }
  const curX = kidWorldX(kid);
  const res = resolveFrame({ cam: camX, maxCam: maxCam(), kidX: curX, overflowL, overflowR, scale: sc, nudgeX });
  if (Math.abs(res.cam - camX) > 0.5) setCam(res.cam);
  if (nudgeX && Math.abs(res.kidX - curX) > 0.5) moveKidX(kid, res.kidX);
  placeYardHints();
}
function kidWorldX(kid: HTMLElement): number {
  if (kid.dataset.pid && hood) {
    const p = kid.dataset.pid === hood.pid ? myPres() : hood.presence.get(kid.dataset.pid);
    if (p && p.where === 'house') return p.x;
  }
  return store.get().characters.find(ch => ch.id === kid.dataset.cid)?.x ?? 0;
}
function moveKidX(kid: HTMLElement, x: number) {
  if (kid.dataset.pid && hood && kid.classList.contains('mine')) {
    const cur = myPres(); if (!cur || cur.where !== 'house') return;
    setMyPres({ ...cur, x }); renderAvatars(); return;
  }
  const id = kid.dataset.cid; if (!id) return;
  const c = store.get().characters.find(ch => ch.id === id); if (!c) return;
  store.dispatch({ type: 'char/move', id, room: store.get().currentRoom, x, y: c.y });
}
const TAB_SHORT: Record<string, string> = { living: 'Living', bedroom: 'Bed', kitchen: 'Kitchen', salon: 'Salon', nursery: 'Nursery', bathroom: 'Bath' };
/** Minimap shows in Decorate, or whenever the room is wider than the window. Phone portrait Play hides it so the stage can grow. */
function syncMinimap() {
  const inHouse = view === 'house';
  const portrait = document.body.classList.contains('phone-portrait');
  const decorate = inHouse && !play.isPlay();
  const wider = inHouse && VIEW_W + 1 < W;
  const show = inHouse && (portrait ? decorate : (decorate || wider));
  document.body.classList.toggle('show-minimap', show);
}
const TAB_ICO = `<svg class="tabIco" width="14" height="12" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6 L8 1 L15 6 V11 H1 Z" fill="currentColor"/></svg>`;
function tabsCompact() {
  // Every phone uses the short names so six tabs, Menu, Map, and Chat share one row.
  // A wide landscape phone (844×390) still has body.phone; full names overlap the minimap once Chat is up.
  // iPad never has body.phone, so it keeps the full names at 14px.
  return document.body.classList.contains('phone');
}
function syncTabMode() {
  const next = tabsCompact() ? 'c' : 'f';
  syncMinimap();
  if (next === tabMode) return;
  tabMode = next;
  renderTabs(store.get());
}
function fitNow() { if (phoneMQ.matches) fitPhone(); else fit(); }
window.addEventListener('resize', fitNow);
window.addEventListener('resize', () => requestAnimationFrame(syncTabFade));
$('tabs').addEventListener('scroll', syncTabFade, { passive: true });
phoneMQ.addEventListener('change', fitNow);
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
  const card = document.body.classList.contains('baby-card') ? 'c' : '';
  return vvKey + ' ' + box(wrap) + ' ' + box(topBar) + ' ' + box(toolRow) + card;
}
/** Landscape phone Play draws the care card over the sky. The stage starts below it, so wall art stays visible. */
function careTopReserve(): number {
  const body = document.body;
  if (!body.classList.contains('baby-card') || !body.classList.contains('phone') || body.classList.contains('phone-portrait')) return 0;
  const card = document.querySelector('.babyCare') as HTMLElement | null;
  const h = card && !card.hidden ? card.getBoundingClientRect().height : 0;
  return Math.ceil(8 + (h > 8 ? h : 72) + 8);
}
function placeStage(sc: number) {
  const reserve = careTopReserve();
  const wrapH = $('stageWrap').clientHeight;
  stage.style.left = '';
  if (reserve > 0) stage.style.top = (reserve + Math.max(0, wrapH - reserve) / 2) + 'px';
  else stage.style.top = '';
  stage.style.transform = `translate(-50%,-50%) scale(${sc})`;
}
/** Phone landscape parks Play/Decorate in the top row. Phone portrait keeps them in the
 *  dock beside the scrolling chips. iPad leads the chip row with them, the way the
 *  room did before the Menu, so the drawer stays two rows and the stage still fills. */
function placeModeToggle() {
  const toggle = $('modeToggle');
  const tools = document.querySelector('.tools');
  const dock = document.getElementById('modeDock');
  const top = document.querySelector('.drawerTop');
  if (!toggle || !tools || !dock || !top) return false;
  const phone = document.body.classList.contains('phone');
  const land = phone && !document.body.classList.contains('phone-portrait');
  const home = land ? tools : phone ? dock : top;
  const parked = toggle.parentElement === home;
  dock.hidden = !phone || land;
  if (parked) return false;
  if (land) tools.insertBefore(toggle, tools.firstChild);
  else if (phone) dock.appendChild(toggle);
  else top.insertBefore(toggle, top.firstChild);
  return true;
}
/**
 * Phone Play portrait only. fit() will not zoom past a 480-wide view, which letterboxes a tall phone.
 * Narrow the view here so the room fills the free box. iPad never reaches this function.
 */
function growPhonePlayStage() {
  // The yard keeps fit()'s 480-wide view. Zooming in further crops the door and the play set together.
  if (store.get().currentRoom === 'backyard') return;
  if (!document.body.classList.contains('phone-portrait') || !document.body.classList.contains('mode-play') || view !== 'house') return;
  const wrap = $('stageWrap');
  const boxW = wrap.clientWidth, boxH = wrap.clientHeight;
  if (boxW < 20 || boxH < 20 || !(boxH > boxW * 0.85)) return;
  const next = Math.min(W, withPlayZoomFloor(Math.max(280, Math.min(860, Math.round(H * boxW / boxH)))));
  if (Math.abs(next - VIEW_W) < 2) return;
  VIEW_W = next;
  stage.style.width = VIEW_W + 'px';
  stage.style.height = H + 'px';
  const sc = Math.min(boxW / VIEW_W, boxH / H);
  stage.style.transform = `translate(-50%,-50%) scale(${sc})`;
  stage.style.setProperty('--fit', String(stageScale()));
  if (camX > maxCam()) setCam(camX);
  else { const v = $('mmView'); v.style.left = camX / W * 100 + '%'; v.style.width = VIEW_W / W * 100 + '%'; }
  placePhoneNudges();
  syncMinimap();
}
function fitPhone() {
  if (phoneFitting || !phoneMQ.matches) return;
  const moved = placeModeToggle();
  const key = phoneFitSnapshot() + (document.body.classList.contains('mode-play') ? 'p' : 'd');
  if (!moved && key === phoneFitKey) return;
  phoneFitting = true;
  try { fit(); growPhonePlayStage(); phoneShowKids(); phoneFitKey = phoneFitSnapshot() + (document.body.classList.contains('mode-play') ? 'p' : 'd'); }
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
/** Pose remembered on this screen when the Worker did not say sit:1. It is not sent. */
const localPose = new Map<string, DollSeat>();
function ownsDolls(): boolean {
  if (!hood || inner === local) return true;
  return hood.houses.get(currentHouseId)?.meta.ownerId === hood.pid;
}
function seatPieceOf(it: PlacedItem): SeatPiece | null {
  const def = ITEM_MAP[it.kind];
  if (!def || !seatFractions(it.kind)) return null;
  return { id: it.id, kind: it.kind, x: it.x, footY: drawY(def, it.y), flip: !!it.flip, scale: drawnScale(it), w: def.w, h: hOf(def) };
}
/** Where a saved seat draws. The anchor is a fraction of the piece, so a resize moves her with it. */
function seatedAt(room: RoomId, seat: DollSeat | null, at: { x: number; y: number }): { x: number; y: number } {
  if (!seat) return at;
  const it = store.get().rooms[room]?.items.find(i => i.id === seat.item);
  const piece = it && seatPieceOf(it);
  if (!piece) return at;
  const spot = anchorsOf(piece).find(a => a.n === seat.n);
  return spot ? { x: spot.x, y: spot.y } : at;
}
function takenSeats(skipChar?: string, skipPid?: string, skipBaby = false): { item: string; n: 0 | 1 }[] {
  const s = store.get();
  const out: { item: string; n: 0 | 1 }[] = [];
  for (const c of s.characters) {
    if (c.id === skipChar || c.room !== s.currentRoom) continue;
    const seat = dollSeat(c);
    if (!seat) continue;
    out.push({ item: seat.item, n: seat.n });
  }
  if (!skipBaby) {
    const occ = babyOccupant(s.baby, s.currentRoom);
    if (occ) out.push(occ);
  }
  if (hood && view === 'house') {
    const add = (pid: string, p: Presence) => {
      if (pid === skipPid || p.where !== 'house' || p.houseId !== currentHouseId || p.room !== s.currentRoom) return;
      const seat = presSeat(pid, p);
      if (!seat) return;
      out.push({ item: seat.item, n: seat.n });
    };
    hood.presence.forEach((p, pid) => add(pid, p));
    const me = myPres();
    if (me && hood.pid !== skipPid) add(hood.pid, me);
  }
  return out;
}
function remembered(key: string, seat: DollSeat | null) {
  if (seat) localPose.set(key, seat); else localPose.delete(key);
}
/** A seat object goes on the wire only after welcome said sit:1. Solo play always saves it. */
function moveDoll(id: string, room: RoomId, x: number, y: number, seat: DollSeat | null) {
  const offline = !hood || inner === local;
  const sendSeat = offline || !!hood?.speaksSit;
  if (!sendSeat) remembered('c:' + id, seat);
  else localPose.delete('c:' + id);
  if (sendSeat) store.dispatch({ type: 'char/move', id, room, x, y, seat });
  else store.dispatch({ type: 'char/move', id, room, x, y });
}
function placeMe(cur: Presence, x: number, y: number, flip: boolean, seat: PresSeat | null) {
  const { seat: _prev, ...rest } = cur;
  if (hood && !hood.speaksSit) {
    remembered('p:' + hood.pid, seat ? { item: seat.id, pose: seat.pose, n: seat.n } : null);
    setMyPres({ ...rest, x, y, flip });
    return;
  }
  if (hood) localPose.delete('p:' + hood.pid);
  setMyPres(seat ? { ...rest, x, y, flip, seat } : { ...rest, x, y, flip });
}
function dollSeat(c: Character): DollSeat | null {
  if (c.seat) return c.seat;
  return localPose.get('c:' + c.id) ?? null;
}
function presSeat(pid: string, p: Presence): DollSeat | null {
  if (p.seat) return { item: p.seat.id, pose: p.seat.pose, n: p.seat.n };
  return localPose.get('p:' + pid) ?? null;
}
function seatUnderPointer(cx: number, cy: number): PlacedItem | null {
  const s = store.get();
  const list = document.elementsFromPoint(cx, cy);
  const seen = new Set<string>();
  for (let i = 0; i < list.length; i++) {
    const node = list[i];
    if (!node || !node.closest) continue;
    const itemEl = node.closest('.item') as HTMLElement | null;
    if (!itemEl) continue;
    const id = itemEl.dataset.id;
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const it = s.rooms[s.currentRoom].items.find(it => it.id === id);
    if (it && seatFractions(it.kind)) return it;
  }
  return null;
}
function seatFrontClass(kind: string): string {
  const art = bedArt(kind);
  if (art) return 'k-bed k-bed-' + art.clip;
  const k = kind.toLowerCase();
  if (/sofa|couch|loveseat/.test(k)) return 'k-sofa';
  if (/bench/.test(k)) return 'k-bench';
  if (/chair|stool|rocker/.test(k)) return 'k-chair';
  return '';
}
function seatedHere(): Map<string, number> {
  const s = store.get();
  const ids = new Map<string, number>();
  const note = (item: string, n: number) => { const prev = ids.get(item); ids.set(item, prev === undefined ? n : Math.max(prev, n)); };
  for (const c of s.characters) {
    const seat = c.room === s.currentRoom ? dollSeat(c) : null;
    if (seat) note(seat.item, seat.n);
  }
  if (hood && view === 'house') {
    const add = (pid: string, p: Presence) => {
      const seat = p.where === 'house' && p.houseId === currentHouseId && p.room === s.currentRoom ? presSeat(pid, p) : null;
      if (seat) note(seat.item, seat.n);
    };
    hood.presence.forEach((p, pid) => add(pid, p));
    const me = myPres();
    if (me) add(hood.pid, me);
  }
  return ids;
}
function handWorld(c: Character, hand: Hand) {
  const sc = charScale(c); const pt = handsFor(c, poseNamed(dollSeat(c)?.pose))[hand]; let hx = pt.x; if (c.flip) hx = 100 - hx;
  const at = seatedAt(c.room, dollSeat(c), c);
  return { x: at.x + (hx - 50) / 100 * CHAR_W * sc, y: at.y - CHAR_H * sc + pt.y / 160 * CHAR_H * sc };
}
/** Which character hand (if any) would catch a holdable item dropped at world point p. */
function holdTarget(p: { x: number; y: number }): { c: Character; hand: Hand } | null {
  const s = store.get(); let best: { c: Character; hand: Hand; d: number } | null = null;
  for (const c of s.characters) {
    if (c.room !== s.currentRoom) continue;
    const sc = charScale(c);
    const at = seatedAt(c.room, dollSeat(c), c);
    const onBody = Math.abs(p.x - at.x) < CHAR_W * sc / 2 + 25 && p.y > at.y - CHAR_H * sc - 25 && p.y < at.y + 20;
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
  paintScenery(s);
}
function renderMinimap(s: GameState) {
  const room = s.rooms[s.currentRoom];
  const dots = room.items.filter(i => ITEM_MAP[i.kind]).map(i => {
    const def = ITEM_MAP[i.kind];
    return `<i style="left:${i.x / W * 100}%;top:${(drawY(def, i.y) - hOf(def) * drawnScale(i) / 2) / H * 100}%"></i>`;
  }).join('');
  const me = s.characters.filter(c => c.room === s.currentRoom).map(c => {
    const at = seatedAt(s.currentRoom, dollSeat(c), c);
    return `<b style="left:${at.x / W * 100}%;top:${(at.y - 90) / H * 100}%;background:${c.shirt}"></b>`;
  }).join('');
  $('mmDots').innerHTML = dots + me;
}
function renderTabs(s: GameState) {
  const compact = tabsCompact();
  tabMode = compact ? 'c' : 'f';
  document.body.classList.toggle('tabs-compact', compact);
  $('tabs').innerHTML = ROOMS.map(r => {
    const label = compact ? (TAB_SHORT[r.id] ?? r.name) : r.name;
    const on = s.currentRoom === r.id || (s.currentRoom === 'backyard' && r.id === 'living');
    return `<button class="tab ${on ? 'on' : ''}" data-room="${r.id}" style="--c:${r.color}" aria-label="${r.name}">${compact ? TAB_ICO : ''}${label}</button>`;
  }).join('');
  requestAnimationFrame(() => { showTabOn(); syncTabFade(); });
}
/** The tab row scrolls sideways when it can't fit. Fade the edge that has more tabs past it. */
function syncTabFade() {
  const t = document.getElementById('tabs'); if (!t) return;
  const max = t.scrollWidth - t.clientWidth;
  t.classList.toggle('fadeL', max > 2 && t.scrollLeft > 2);
  t.classList.toggle('fadeR', max > 2 && t.scrollLeft < max - 2);
}
/** Keep the current room's tab in view (only scrolls the tab row itself). */
function showTabOn() {
  const t = document.getElementById('tabs'), on = t?.querySelector<HTMLElement>('.tab.on');
  if (!t || !on || t.scrollWidth <= t.clientWidth + 2) return;
  const l = on.offsetLeft - t.offsetLeft, r = l + on.offsetWidth;
  if (l < t.scrollLeft + 24) t.scrollLeft = Math.max(0, l - 24);
  else if (r > t.scrollLeft + t.clientWidth - 24) t.scrollLeft = r - t.clientWidth + 24;
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
      el.innerHTML = `<div class="inner">${svgOf(def, true)}</div>`;
      layer.appendChild(el);
      el.addEventListener('pointerdown', e => onItemPointer(el!, e));
    }
    el.dataset.kind = it.kind;
    el.classList.toggle('is-light', isLightKind(it.kind, !!def.light));
    const box = placedBox(def, drawnScale(it));
    placeEl(el, it.x, drawY(def, it.y), box.w, box.h);
    const iz = 1000 + it.z;
    el.style.zIndex = String(iz);
    el.style.setProperty('--iz', String(iz));
    el.classList.toggle('flipped', it.flip);
    el.classList.toggle('sel', selected === it.id);
  }
  layer.querySelectorAll<HTMLElement>('.item').forEach(el => { if (!seen.has(el.dataset.id!)) el.remove(); });
  paintScenery(s);
  syncSkyPuddles();
  syncSeatFronts();
  renderToolbar(s); renderMinimap(s);
  queueAmbient();
}
/** Paint-only front of an occupied seat. The saved item and its z stay one object. */
function syncSeatFronts() {
  const s = store.get();
  const occ = seatedHere();
  const seen = new Set<string>();
  occ.forEach((_n, id) => {
    const it = s.rooms[s.currentRoom]?.items.find(i => i.id === id);
    const def = it && ITEM_MAP[it.kind];
    const cls = it && seatFrontClass(it.kind);
    if (!it || !def || !cls) return;
    seen.add(id);
    let el = layer.querySelector<HTMLElement>(`.seatFront[data-id="${id}"]`);
    if (!el) {
      el = document.createElement('div');
      el.className = 'seatFront';
      el.dataset.id = id;
      layer.appendChild(el);
    }
    const src = layer.querySelector<HTMLElement>(`.item[data-id="${id}"] .inner`);
    const inner = el.querySelector('.inner');
    if (!inner || (src && inner.innerHTML !== src.innerHTML)) el.innerHTML = `<div class="inner">${src ? src.innerHTML : svgOf(def, true)}</div>`;
    el.className = 'seatFront ' + cls + (it.flip ? ' flipped' : '');
    const box = placedBox(def, drawnScale(it));
    placeEl(el, it.x, drawY(def, it.y), box.w, box.h);
    el.style.zIndex = String(1000 + it.z + 3);
  });
  layer.querySelectorAll<HTMLElement>('.seatFront').forEach(el => { if (!seen.has(el.dataset.id || '')) el.remove(); });
}

/** True from pointerdown on the back door until pointerup. Framing must not move the door mid-tap. */
let doorPress = false;
let doorWent = 0;
function goDoor(go: 'backyard' | 'living') {
  if (performance.now() - doorWent < 80) return;
  doorWent = performance.now();
  goThroughYardDoor(go);
}
/** The door and its label win a tap even when a pet or a piece is painted across them. */
function doorAtPoint(x: number, y: number): HTMLElement | null {
  const door = stage.querySelector<HTMLElement>('.yardDoor');
  if (!door) return null;
  const hit = (el: Element | null) => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.width > 2 && r.height > 2 && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  };
  return hit(door.querySelector('.yardHintLabel')) || hit(door.querySelector('.doorArt')) || hit(door) ? door : null;
}
/** A touch tap never relies on click: portrait framing can move the door before click fires. */
function bindYardDoor(btn: HTMLElement) {
  btn.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    e.stopPropagation();
    const go: 'backyard' | 'living' = btn.dataset.yardGo === 'backyard' ? 'backyard' : 'living';
    const x0 = e.clientX, y0 = e.clientY, id = e.pointerId;
    doorPress = true;
    const end = (ev: PointerEvent) => {
      if (ev.pointerId !== id) return;
      window.removeEventListener('pointerup', end, true);
      window.removeEventListener('pointercancel', end, true);
      doorPress = false;
      if (ev.type === 'pointercancel') return;
      if (Math.hypot(ev.clientX - x0, ev.clientY - y0) > 14) return;
      ev.preventDefault();
      ev.stopPropagation();
      goDoor(go);
    };
    window.addEventListener('pointerup', end, true);
    window.addEventListener('pointercancel', end, true);
  });
}
stage.addEventListener('pointerdown', e => {
  if (e.button !== 0) return;
  const door = doorAtPoint(e.clientX, e.clientY);
  if (!door) return;
  if (e.target instanceof Node && door.contains(e.target)) return;
  e.stopPropagation();
  e.preventDefault();
  const go: 'backyard' | 'living' = door.dataset.yardGo === 'backyard' ? 'backyard' : 'living';
  const x0 = e.clientX, y0 = e.clientY, id = e.pointerId;
  doorPress = true;
  const end = (ev: PointerEvent) => {
    if (ev.pointerId !== id) return;
    window.removeEventListener('pointerup', end, true);
    window.removeEventListener('pointercancel', end, true);
    doorPress = false;
    if (ev.type === 'pointercancel') return;
    if (Math.hypot(ev.clientX - x0, ev.clientY - y0) > 14) return;
    ev.preventDefault();
    ev.stopPropagation();
    goDoor(go);
  };
  window.addEventListener('pointerup', end, true);
  window.addEventListener('pointercancel', end, true);
}, true);

function boxesOverlap(a: DOMRect, b: DOMRect) {
  return a.width > 2 && b.width > 2 && a.left < b.right - 1 && a.right > b.left + 1 && a.top < b.bottom - 1 && a.bottom > b.top + 1;
}
/** The door sits under furniture, the same as when it lived in the scenery, until a floor piece
    actually covers its tap target. A lamp stays in front so a phone slide cannot hide the shade. */
function liftDoorOverFurniture(door: HTMLElement) {
  const tap = door.getBoundingClientRect();
  let maxZ = 0;
  layer.querySelectorAll<HTMLElement>('.item').forEach(el => {
    if (el.classList.contains('is-light')) return;
    const def = ITEM_MAP[el.dataset.kind || ''];
    if (!def || def.wall) return;
    if (!boxesOverlap(el.getBoundingClientRect(), tap)) return;
    const z = parseInt(el.style.zIndex || '0', 10) || 0;
    if (z > maxZ) maxZ = z;
  });
  door.style.zIndex = maxZ ? String(maxZ + 2) : '2';
}
/** Indoor dressing, and the outdoor paint plus the back door when she is home.
    The door lives in the item layer (scenery is a lower stacking context) so a sofa or rug cannot cover it. */
function paintScenery(s: GameState) {
  const room = s.rooms[s.currentRoom];
  syncScenery($('scenery'), s.currentRoom, room.items);
  $('scenery').querySelectorAll('.yardDoor').forEach(n => n.remove());
  const go = s.currentRoom === 'living' ? 'backyard' : s.currentRoom === 'backyard' ? 'living' : '';
  const have = layer.querySelector<HTMLElement>('.yardDoor');
  if (!go) layer.querySelectorAll('.yardDoor').forEach(n => n.remove());
  else if (!have || have.dataset.yardGo !== go) {
    layer.querySelectorAll('.yardDoor').forEach(n => n.remove());
    layer.insertAdjacentHTML('beforeend', yardDoorMarkup(go === 'backyard' ? 'living' : 'yard'));
    const door = layer.querySelector<HTMLElement>('.yardDoor');
    if (door) bindYardDoor(door);
  }
  stage.classList.toggle('room-yard', s.currentRoom === 'backyard');
  syncSwingPose();
  if (!doorPress) placeYardHints();
}

const charEls = new Map<string, HTMLElement>();
function heldHTML(c: Character) {
  const sc = charScale(c), bw = CHAR_W * sc, bh = CHAR_H * sc;
  const pts = handsFor(c, poseNamed(dollSeat(c)?.pose)), shrink = c.look2 ? 0.85 : 1;
  return (['left', 'right'] as Hand[]).map(hand => {
    const it = c.held[hand]; const def = it && ITEM_MAP[it.kind]; if (!it || !def) return '';
    const fit = drawnScale(it);
    const k = Math.min(0.7, 120 * sc / Math.max(def.w, hOf(def)) / fit) * shrink;
    const iw = def.w * fit * k, ih = hOf(def) * fit * k;
    const hx = pts[hand].x / 100 * bw, hy = pts[hand].y / 160 * bh;
    return `<div class="held ${it.flip ? 'flipped' : ''}" data-hand="${hand}" style="left:${(hx - iw / 2) / bw * 100}%;top:${(hy - ih * 0.62) / bh * 100}%;width:${iw / bw * 100}%;height:${ih / bh * 100}%"><div class="inner">${svgOf(def)}</div></div>`;
  }).join('');
}
/** Warm pools just under each lamp and window, so furniture in the glow is lit and the glass stays on top. */
function syncSkyPuddles() {
  let host = layer.querySelector<HTMLElement>('#skyPuddles');
  if (!host) {
    host = document.createElement('div');
    host.id = 'skyPuddles';
    host.className = 'skyPuddles';
  }
  layer.appendChild(host);
  const lights = [...layer.querySelectorAll<HTMLElement>('.item.is-light')];
  while (host.children.length > lights.length) host.lastElementChild!.remove();
  while (host.children.length < lights.length) host.appendChild(document.createElement('i'));
  lights.forEach((el, i) => {
    const puddle = host.children[i] as HTMLElement;
    const l = parseFloat(el.style.left), t = parseFloat(el.style.top);
    const w = parseFloat(el.style.width), h = parseFloat(el.style.height);
    const win = el.dataset.kind === 'window' || el.dataset.kind === 'tv';
    puddle.style.left = (l - 0.6 * w) + '%';
    puddle.style.top = (t - (win ? 0.38 : 0.5) * h) + '%';
    puddle.style.width = (2.2 * w) + '%';
    puddle.style.height = (2 * h) + '%';
    // Same band as the furniture. At night and golden the lamp itself steps one above this, so the shade and glass stay clear.
    puddle.style.zIndex = String(parseInt(el.style.zIndex || '1000', 10));
  });
}

let renderBaby = () => {};
function babyHolderId(s: GameState): string {
  const b = s.baby;
  return b && b.spot === 'arms' && b.holder ? b.holder : '';
}
const cradleFronts = new Map<string, HTMLElement>();
function clearCradleSlot(slot: string) {
  for (const [key, node] of cradleFronts) {
    if (key.indexOf(slot + ':') !== 0) continue;
    node.remove();
    cradleFronts.delete(key);
  }
}
function dropCradleFront(slot: string, id: string) {
  const key = slot + ':' + id;
  const node = cradleFronts.get(key);
  if (!node) return;
  node.remove();
  cradleFronts.delete(key);
}
/** The hand on the blanket. A child of the doll cannot paint above the baby. */
function paintCradleFront(slot: string, id: string, host: HTMLElement, svg: string, feetY: number) {
  const key = slot + ':' + id;
  for (const [k, old] of cradleFronts) {
    if (k.indexOf(slot + ':') === 0 && k !== key) { old.remove(); cradleFronts.delete(k); }
  }
  let node = cradleFronts.get(key);
  if (!node || !node.isConnected) {
    node = document.createElement('div');
    node.className = 'cradle-front';
    node.dataset.for = id;
    node.innerHTML = '<div class="inner"></div>';
    layer.appendChild(node);
    cradleFronts.set(key, node);
  }
  if (node.dataset.arm !== svg) {
    const inner = node.querySelector('.inner');
    if (inner) inner.innerHTML = svg;
    node.dataset.arm = svg;
  }
  node.style.left = host.style.left;
  node.style.top = host.style.top;
  node.style.width = host.style.width;
  node.style.height = host.style.height;
  node.style.zIndex = String(5000 + Math.round(feetY) + 4);
  node.classList.toggle('flipped', host.classList.contains('flipped'));
  node.classList.toggle('pose-sit', host.classList.contains('pose-sit'));
  node.classList.toggle('pose-lie', host.classList.contains('pose-lie'));
  node.classList.toggle('pose-lie-r', host.classList.contains('pose-lie-r'));
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
    const seat = dollSeat(c);
    const pose = seat?.pose ?? null;
    const holding = babyHolderId(s) === c.id;
    const look = lookStamp(c) + (pose || '') + (holding ? 'h' : '');
    if (el.dataset.look !== look) { el.querySelector('.inner')!.innerHTML = characterSVG(c, pose, holding); el.dataset.look = look; }
    el.classList.toggle('holding', holding);
    const heldKey = JSON.stringify([c.held.left?.id, c.held.left?.flip, c.held.right?.id, c.held.right?.flip, c.size, pose]);
    if (el.dataset.held !== heldKey) { el.querySelector('.hands')!.innerHTML = heldHTML(c); el.dataset.held = heldKey; }
    const sc = charScale(c);
    const at = seatedAt(s.currentRoom, seat, c);
    placeEl(el, at.x, at.y, CHAR_W * sc, CHAR_H * sc);
    el.style.zIndex = seat ? String(1000 + (s.rooms[s.currentRoom].items.find(i => i.id === seat.item)?.z ?? 0) + 1 + seat.n) : String(5000 + Math.round(c.y));
    el.classList.toggle('flipped', c.flip);
    el.classList.toggle('pose-sit', pose === 'sit');
    el.classList.toggle('pose-lie', pose === 'lie');
    el.classList.toggle('pose-lie-r', pose === 'lie' && !!s.rooms[s.currentRoom].items.find(i => i.id === seat?.item)?.flip);
    el.classList.toggle('active', c.id === activeChar);
    stampAvatar(el, c, c.id === activeChar);
    el.classList.toggle('pose-swing', swingPose?.id === c.id);
    if (holding) {
      const arm = cradleFrontSVG(c, pose);
      if (arm) paintCradleFront('doll', c.id, el, arm, at.y);
      else dropCradleFront('doll', c.id);
    }
    const pts = handsFor(c);
    el.style.setProperty('--hx-l', pts.left.x + '%');
    el.style.setProperty('--hx-r', pts.right.x + '%');
  }
  if (babyHolderId(s) === '' || !here.some(c => c.id === babyHolderId(s))) clearCradleSlot('doll');
  queueAmbient();
  renderMinimap(s);
  renderBaby();
}

/** Screen box of the toolbar's resting transform (the pop animation is not part of this). */
function toolbarScreenBox() {
  const stageR = stage.getBoundingClientRect();
  const sc = stageR.width / Math.max(1, VIEW_W);
  const border = 6;
  const phone = document.body.classList.contains('phone');
  const k = phone ? 1 / Math.max(0.2, sc) : 1;
  const Lw = toolbar.offsetWidth;
  const Lh = toolbar.offsetHeight;
  const anchorX = parseFloat(toolbar.style.left) / 100 * W;
  const anchorY = parseFloat(toolbar.style.top) / 100 * H;
  const below = toolbar.classList.contains('below');
  const cx = anchorX;
  const cy = below ? anchorY + Lh / 2 : anchorY - Lh / 2;
  const hw = k * Lw / 2;
  const hh = k * Lh / 2;
  const sx = (wx: number) => stageR.left + (border + wx - camX) * sc;
  const sy = (wy: number) => stageR.top + (border + wy) * sc;
  const left = sx(cx - hw), right = sx(cx + hw), top = sy(cy - hh), bottom = sy(cy + hh);
  return { left, right, top, bottom, width: right - left, height: bottom - top };
}
/** Visible stage, pulled in so the bar sits between the room arrows. */
function toolbarLimits() {
  const stageR = stage.getBoundingClientRect();
  const pad = 4;
  let left = Math.max(stageR.left, 0) + pad;
  let right = Math.min(stageR.right, window.innerWidth) - pad;
  let top = Math.max(stageR.top, 0) + pad;
  let bottom = Math.min(stageR.bottom, window.innerHeight) - pad;
  for (const id of ['nudgeL', 'nudgeR'] as const) {
    const n = $(id);
    if (!n || n.classList.contains('off') || n.offsetParent === null) continue;
    const r = n.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    if (id === 'nudgeL') left = Math.max(left, r.right + 4);
    else right = Math.min(right, r.left - 4);
  }
  if (right - left < 48) {
    left = Math.max(stageR.left, 0) + pad;
    right = Math.min(stageR.right, window.innerWidth) - pad;
  }
  return { left, right, top, bottom };
}
function placeToolbarAnchor(x: number, y: number) {
  toolbar.style.left = (x / W) * 100 + '%';
  toolbar.style.top = (y / H) * 100 + '%';
}
function renderToolbar(s: GameState) {
  const it = selected && s.rooms[s.currentRoom].items.find(i => i.id === selected);
  if (play.isPlay() || !it || !ITEM_MAP[it.kind]) {
    toolbar.classList.add('hidden');
    toolbar.classList.remove('below');
    toolbar.style.maxWidth = '';
    return;
  }
  const def = ITEM_MAP[it.kind];
  const foot = drawY(def, it.y);
  const pieceTop = foot - hOf(def) * drawnScale(it);
  const gap = 12;
  toolbar.classList.remove('hidden');
  toolbar.style.maxWidth = '';
  toolbar.classList.remove('below');
  placeToolbarAnchor(it.x, pieceTop - gap);
  const limits = toolbarLimits();
  // No room above the piece: hang the bar under it (a high towel bar, a two-row phone bar).
  if (toolbarScreenBox().top < limits.top) {
    toolbar.classList.add('below');
    placeToolbarAnchor(it.x, foot + gap);
  }
  let box = toolbarScreenBox();
  const gapW = limits.right - limits.left;
  if (box.width > gapW - 2 && gapW > 60) {
    const next = toolbar.offsetWidth * ((gapW - 8) / Math.max(1, box.width));
    toolbar.style.maxWidth = Math.max(76, next) + 'px';
    if (!toolbar.classList.contains('below') && toolbarScreenBox().top < limits.top) {
      toolbar.classList.add('below');
      placeToolbarAnchor(it.x, foot + gap);
    }
    box = toolbarScreenBox();
  }
  let dx = 0, dy = 0;
  if (box.left < limits.left) dx = limits.left - box.left;
  if (box.right + dx > limits.right) dx = limits.right - box.right;
  if (box.width > limits.right - limits.left) dx = (limits.left + limits.right) / 2 - (box.left + box.right) / 2;
  if (box.top < limits.top) dy = limits.top - box.top;
  if (box.bottom + dy > limits.bottom) dy = limits.bottom - box.bottom;
  if (Math.abs(dx) >= 0.5 || Math.abs(dy) >= 0.5) {
    const sc = stage.getBoundingClientRect().width / Math.max(1, VIEW_W) || 1;
    const ax = parseFloat(toolbar.style.left) / 100 * W + dx / sc;
    const ay = parseFloat(toolbar.style.top) / 100 * H + dy / sc;
    placeToolbarAnchor(ax, ay);
  }
  const step = itemSizeOf(it.size);
  const at = ITEM_SIZE_STEPS.indexOf(step);
  const smaller = toolbar.querySelector<HTMLButtonElement>('[data-a="smaller"]');
  const bigger = toolbar.querySelector<HTMLButtonElement>('[data-a="bigger"]');
  if (smaller) smaller.disabled = at <= 0;
  if (bigger) bigger.disabled = at >= ITEM_SIZE_STEPS.length - 1;
}
function renderSoundBtn(s: GameState) {
  const ico = $('soundIco'); if (ico) ico.innerHTML = s.soundOn ? ICON.soundOn : ICON.soundOff;
  $('btnSound').setAttribute('aria-label', s.soundOn ? 'Sound on' : 'Sound off');
  setSound(s.soundOn);
}

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

// Shelf paintings load when a card is near the tray. Two at a time, so a long
// pack does not decode every WebP during the fling (iPad 10th gen, 60fps).
// A card keeps its SVG until its painting has loaded in a detached <img>; then the
// card's contents swap in one step. The shelf is never rebuilt for this, so its
// scroll position and the card's drag handler stay as they are.
const SHELF_AHEAD = 200;
const SHELF_LOADS = 2;
const shelfWaiters: HTMLElement[] = [];
let shelfActive = 0;
let shelfPumping = false;
let shelfFrame = 0;
// Paintings that have loaded and decoded on the shelf, keyed by item kind. A tab
// switch reuses these nodes directly (they are already decoded), so a cached
// painting is on screen on the very first frame with no SVG flash. One card per kind
// is on the shelf at a time; renderDrawer empties the shelf before reusing a node.
const shelfDecoded = new Map<string, Node[]>();

function shelfNear(card: HTMLElement): boolean {
  const shelf = document.getElementById('shelf');
  if (!shelf) return false;
  const sr = shelf.getBoundingClientRect();
  if (sr.width < 2 || sr.height < 2) return false;
  const ir = card.getBoundingClientRect();
  return ir.right > sr.left - SHELF_AHEAD && ir.left < sr.right + SHELF_AHEAD && ir.bottom > sr.top - 8 && ir.top < sr.bottom + 8;
}
// A painting whose fetch failed (dropped connection, server hiccup) is tried again on a
// later scan, up to SHELF_TRIES times, instead of leaving the card on its SVG for good.
const SHELF_TRIES = 3;
const shelfFails = new Map<string, number>();
function retryShelf(card: HTMLElement, kind: string): void {
  const n = (shelfFails.get(kind) || 0) + 1;
  shelfFails.set(kind, n);
  delete card.dataset.shelfq;
  if (n >= SHELF_TRIES) { delete card.dataset.artq; return; }
  setTimeout(scheduleShelf, 300 * n);
}
function releaseShelf(): void {
  shelfActive--;
  if (shelfPumping) return;
  pumpShelf();
}
/** Load the painting detached; swap it into the card only once it has loaded. */
function swapShelfCard(card: HTMLElement, d: ItemDef): void {
  const hold = document.createElement('div');
  hold.innerHTML = svgOf(d);
  const img = hold.querySelector<HTMLImageElement>('img.artimg');
  if (!img) { delete card.dataset.artq; releaseShelf(); return; }
  // A retry asks past any cached failure for the same URL.
  const tries = shelfFails.get(d.kind) || 0;
  if (tries > 0) { const src = img.getAttribute('src') || ''; img.setAttribute('src', src + (src.indexOf('?') >= 0 ? '&' : '?') + 'retry=' + tries); }
  let done = false;
  const finish = (ok: boolean) => {
    if (done) return;
    done = true;
    if (ok) {
      // Cache by kind as soon as it has loaded, even if this card was re-rendered meanwhile.
      const nodes = Array.prototype.slice.call(hold.childNodes) as Node[];
      shelfDecoded.set(d.kind, nodes);
      shelfFails.delete(d.kind);
      if (card.isConnected && card.dataset.artq === '1') {
        delete card.dataset.artq;
        card.innerHTML = '';
        for (let i = 0; i < nodes.length; i++) card.appendChild(nodes[i]);
      } else {
        // The shelf was rebuilt while this loaded: give the painting to the current card for this kind.
        const now = document.querySelector<HTMLElement>(`#shelf button.thing[data-artq="1"][data-kind="${CSS.escape(d.kind)}"]`);
        if (now) { delete now.dataset.artq; now.innerHTML = ''; for (let i = 0; i < nodes.length; i++) now.appendChild(nodes[i]); }
      }
    } else if (card.isConnected && card.dataset.artq === '1') retryShelf(card, d.kind);
    releaseShelf();
  };
  const loaded = () => {
    // decode() keeps the first painted frame from being blank on Safari; older engines skip it.
    if (typeof img.decode === 'function') img.decode().then(() => finish(true), () => finish(true));
    else finish(true);
  };
  img.onload = loaded;
  img.onerror = () => finish(false);
  if (img.complete && img.naturalWidth > 0) loaded();
}
function pumpShelf(): void {
  if (shelfPumping) return;
  shelfPumping = true;
  while (shelfActive < SHELF_LOADS && shelfWaiters.length) {
    const card = shelfWaiters.shift();
    if (!card || !card.isConnected || card.dataset.artq !== '1') continue;
    if (!shelfNear(card)) { delete card.dataset.shelfq; continue; }
    const kind = card.dataset.kind || '';
    const d = ITEM_MAP[kind];
    if (!d) { delete card.dataset.artq; continue; }
    shelfActive++;
    if (rasterUrl(kind)) { swapShelfCard(card, d); continue; }
    void import('./art/load').then(m => m.loadArtKinds([kind])).then(() => {
      if (!card.isConnected || card.dataset.artq !== '1') { releaseShelf(); return; }
      if (!rasterUrl(kind)) { retryShelf(card, kind); releaseShelf(); return; }
      if (!shelfNear(card)) { delete card.dataset.shelfq; releaseShelf(); return; }
      swapShelfCard(card, d);
    }, () => { if (card.isConnected && card.dataset.artq === '1') retryShelf(card, kind); releaseShelf(); });
  }
  shelfPumping = false;
}
function scanShelf(): void {
  const shelf = document.getElementById('shelf');
  if (!shelf || !rasterOn()) return;
  const cards = shelf.querySelectorAll<HTMLElement>('button.thing[data-artq="1"]');
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    if (card.dataset.shelfq === '1') continue;
    if (!shelfNear(card)) continue;
    card.dataset.shelfq = '1';
    shelfWaiters.push(card);
  }
  pumpShelf();
}
function scheduleShelf(): void {
  if (shelfFrame) return;
  shelfFrame = requestAnimationFrame(() => { shelfFrame = 0; scanShelf(); });
}
function bindShelfScroll(): void {
  const shelf = document.getElementById('shelf');
  if (!shelf || shelf.dataset.artscroll === '1') return;
  shelf.dataset.artscroll = '1';
  shelf.addEventListener('scroll', scheduleShelf, { passive: true });
}
/** Mark cards that have a painting not shown yet, without rebuilding the shelf. */
function markShelfArt(): void {
  const shelf = document.getElementById('shelf');
  if (!shelf || !rasterOn()) return;
  const cards = shelf.querySelectorAll<HTMLElement>('button.thing[data-kind]');
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const kind = card.dataset.kind || '';
    if (card.querySelector('img.artimg') || !(artHas(kind) || rasterUrl(kind))) continue;
    card.dataset.artq = '1';
  }
  scheduleShelf();
}
/** Paintings finished loading: update the shelf in place (scroll stays). */
function refreshShelfArt(): void {
  if (currentTab === '__people') { renderDrawer(); return; }
  markShelfArt();
}

function clearMySeatIfFurniture(a: Action) {
  const piece = takeClearedFurniture();
  if (!hood) return;
  const me = myPres();
  if (!me || me.where !== 'house' || !me.seat) return;
  let id = '';
  if (a.type === 'item/flip' || a.type === 'item/delete') id = a.id;
  else if (a.type === 'item/move' && a.stand) id = a.id;
  else if (a.type === 'char/hold') id = a.itemId;
  else return;
  if (!id || me.seat.id !== id || a.room !== me.room) return;
  const where = piece && piece.id === id ? piece : null;
  const w = where ? pieceWidth(where.kind) * (where.scale || 1) : pieceWidth('bed');
  const spot = standBeside(where ? where.x : me.x, w, me.x);
  localPose.delete('p:' + hood.pid);
  const { seat: _drop, ...rest } = me;
  setMyPres({ ...rest, x: spot.x, y: spot.y });
}
store.subscribe((s, a) => {
  clearMySeatIfFurniture(a);
  switch (a.type) {
    case 'room/switch': {
      const wasYard = stage.classList.contains('room-yard');
      if (hood && inner !== local) moveMeToRoom(a.room);
      renderAll(); renderDrawer();
      // Phone Play refits so a smaller room can use the height the previous room gave up.
      if (a.room === 'backyard' || wasYard || (play.isPlay() && Math.min(window.innerWidth, window.innerHeight) < 500)) fit();
      void refreshArt(a.room);
      break;
    }
    case 'item/add': renderItems(s); raisePlayZoom(); void loadNewArt(); break;
    case 'game/reset': renderAll(); break;
    case 'room/wallpaper': case 'room/floor': case 'room/pattern': case 'room/wallTile': case 'room/floorTile': renderRoomBg(s); break;
    case 'char/update': case 'char/move':
      if (a.type === 'char/move' && swingPose && !swingLock && a.id === swingPose.id) swingPose = null;
      renderChars(s); syncSeatFronts(); syncSwingPose(); if (view === 'ranch') renderRanchAvatars(); else if (view === 'park') renderParkAvatars(); break;
    case 'char/add': case 'char/delete': case 'char/hold': case 'char/release': renderItems(s); renderChars(s); renderAvatars(); if (currentTab === '__people') renderDrawer(); break;
    case 'item/move': case 'item/flip': case 'item/delete': case 'item/size': renderItems(s); renderChars(s); renderAvatars(); break;
    case 'baby/meet': case 'baby/name': case 'baby/care': case 'baby/hold': case 'baby/place': case 'baby/ease': renderChars(s); renderAvatars(); break;
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

function forwardPointer(e: PointerEvent): PointerEvent {
  return new PointerEvent('pointerdown', {
    bubbles: true, cancelable: true, clientX: e.clientX, clientY: e.clientY,
    pointerId: e.pointerId, pointerType: e.pointerType, button: e.button, buttons: e.buttons, isPrimary: e.isPrimary,
  });
}

/** A clear part of a painting does not grab. The tap lands on the item or kid behind it, or pans the room. */
function onItemPointer(el: HTMLElement, e: PointerEvent) {
  const t = e.target as Element | null;
  const img = t && t.closest ? t.closest('img.artimg') as HTMLImageElement | null : null;
  if (img && !artSolid(img, e.clientX, e.clientY)) {
    const next = topHit(e.clientX, e.clientY);
    const item = next?.closest('.item') as HTMLElement | null;
    const ch = next?.closest('.char') as HTMLElement | null;
    if (item && item !== el) { e.stopPropagation(); beginItemDrag(item, e); }
    else if (ch) { e.stopPropagation(); ch.dispatchEvent(forwardPointer(e)); }
    return;
  }
  beginItemDrag(el, e);
}

/** Play waits for pointerup. A slip past 6px does not sit her and does not drag the piece. */
function watchPlayTap(el: HTMLElement, e: PointerEvent) {
  e.preventDefault(); e.stopPropagation();
  if (twoFinger) return;
  const id = el.dataset.id!;
  const x0 = e.clientX, y0 = e.clientY;
  startDrag(e, {
    edgeScroll: false,
    onMove() {},
    onUp(ev) {
      if (Math.hypot(ev.clientX - x0, ev.clientY - y0) > 6) return;
      onPlayTap(el, id);
    },
  });
}

function beginItemDrag(el: HTMLElement, e: PointerEvent, forceMoved = false) {
  e.preventDefault(); e.stopPropagation();
  if (twoFinger) return;
  if (play.isPlay()) { watchPlayTap(el, e); return; }
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
      const half = def.w * drawnScale(it) / 2;
      store.dispatch({ type: 'item/move', room, id, x: Math.max(half * .6, Math.min(W - half * .6, p.x + off.x)), y: snapY(def, p.y + off.y), ...(moved ? { stand: true as const } : {}) });
      if (moved) toolbar.classList.add('hidden');
      target = moved && def.holdable ? holdTarget(p) : null; showHoldTarget(target);
    },
    onUp(ev) {
      el.classList.remove('lifted'); bin.classList.remove('show', 'hot'); showHoldTarget(null);
      if (moved && overBin(ev.clientX, ev.clientY)) { selected = null; store.dispatch({ type: 'item/delete', room, id }); poof(ev.clientX, ev.clientY); return; }
      if (moved && target) { holdInto(target, id); return; }
      if (moved) { sfx.drop(); bounce(el); } else { sfx.click(); onPlaceTap(id); wiggleItem(el); }
      renderItems(store.get());
    },
  });
}

/** Drag a held item off a hand: it is released into the room and becomes a normal dragged item. */
function beginHeldDrag(charEl: HTMLElement, heldEl: HTMLElement, e: PointerEvent) {
  e.preventDefault(); e.stopPropagation();
  if (twoFinger || play.isPlay()) return;
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
    const heldImg = heldEl?.querySelector('img.artimg') as HTMLImageElement | null;
    const heldClear = !!heldImg && !artSolid(heldImg, e.clientX, e.clientY);
    if (heldEl && !heldClear) { if (play.isPlay()) { e.preventDefault(); e.stopPropagation(); return; } if (!canEdit()) { e.stopPropagation(); lockedNudge(el); return; } return beginHeldDrag(el, heldEl, e); }
    e.preventDefault(); e.stopPropagation();
    if (twoFinger) return;
    // A visitor in Play does not drag the host's dolls. Another girl's avatar is not a doll.
    if (play.isPlay() && !ownsDolls()) return;
    if (!canEdit()) { lockedNudge(el); return; }
    selected = null; renderItems(store.get());
    const id = el.dataset.cid!; activeChar = id;
    const s = store.get(); const c = s.characters.find(c => c.id === id); if (!c) return;
    const p0 = toRoom(e.clientX, e.clientY);
    const at0 = seatedAt(s.currentRoom, dollSeat(c), c);
    const off = { x: at0.x - p0.x, y: at0.y - p0.y };
    let lastX = at0.x, moved = false;
    el.classList.add('lifted'); sfx.pick(); renderChars(store.get());
    charDrag = true;
    startDrag(e, {
      onMove(ev) {
        const p = toRoom(ev.clientX, ev.clientY); const nx = p.x + off.x;
        if (Math.hypot(p.x - p0.x, p.y - p0.y) > 6) moved = true;
        if (!moved) return;
        const cur = store.get().characters.find(x => x.id === id); if (!cur) return;
        if (Math.abs(nx - lastX) > 3) { const flip = nx < lastX; if (flip !== cur.flip) store.dispatch({ type: 'char/update', id, patch: { flip } }); lastX = nx; }
        const y = Math.max(FLOOR_Y + 40, p.y + off.y);
        moveDoll(id, s.currentRoom, nx, y, null);
        if (play.isPlay()) playAim = seatUnderPointer(ev.clientX, ev.clientY)?.id ?? null;
        // hovering a room tab = "walk to that room"
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('drop'));
        (document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement | null)?.closest('.tab:not(.on)')?.classList.add('drop');
      },
      onUp(ev) {
        charDrag = false;
        playAim = null;
        el.classList.remove('lifted'); document.querySelectorAll('.tab').forEach(t => t.classList.remove('drop'));
        const tab = (document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement | null)?.closest<HTMLElement>('[data-room]');
        const cur = store.get().characters.find(x => x.id === id);
        if (!moved || !cur) { sfx.click(); return; }
        if (tab && tab.dataset.room !== s.currentRoom) {
          const r = tab.getBoundingClientRect(); sparkles(r.left + r.width / 2, r.top + r.height / 2, 9); sfx.swish();
          moveDoll(id, tab.dataset.room as RoomId, cur.x, cur.y, null);
          return;
        }
        const p = toRoom(ev.clientX, ev.clientY);
        const releaseX = p.x + off.x;
        const releaseY = Math.max(FLOOR_Y + 40, p.y + off.y);
        if (play.isPlay()) {
          const hit = seatUnderPointer(ev.clientX, ev.clientY);
          const drop = resolveDrop({ mode: 'play', via: 'drag', releaseX, releaseY, piece: hit ? seatPieceOf(hit) : null, occupied: takenSeats(id) });
          moveDoll(id, s.currentRoom, drop.x, drop.y, drop.seat);
        } else moveDoll(id, s.currentRoom, releaseX, releaseY, null);
        sfx.drop(); bounce(el);
        requestAnimationFrame(() => frameHouseKid(true));
      },
    });
  });
}

// Drawer -> room (items)
function attachShelfDrag(btn: HTMLElement, def: ItemDef) {
  btn.addEventListener('pointerdown', e => {
    e.preventDefault();
    if (play.isPlay()) { e.stopPropagation(); return; }
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
        if (room !== 'backyard' && store.get().rooms[room].items.length === 0) {
          const starters = emptyRoomStarters(kind => newId(kind), room);
          for (let i = 0; i < starters.length; i++) store.dispatch({ type: 'item/add', room, item: starters[i] });
        }
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
    if (play.isPlay()) return;
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

function addCharacter(): string | null {
  if (!canEdit()) { lockedNudge(null); return null; }
  const s = store.get(); if (s.characters.length >= MAX_CHARS) return null;
  const id = newId('c');
  const look2 = randomLook2();
  store.dispatch({ type: 'char/add', char: newCharacter({ id, ...legacyFromLook2(look2), look2, room: s.currentRoom, x: camX + 300 + Math.random() * 400, y: 520 + Math.random() * 40 }) });
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
  const hasSecrets = tabItems('secrets').length > 0;
  // Pack tabs stay on screen in every room (Glossy is all salon pieces, and kids still need to see it).
  // Indoors, pack tabs stay up even when this room has none of that pack. In the yard, an empty style tab is hidden.
  const visible = TABS.filter(t => t.id !== 'secrets' && (t.kind === 'people' || (t.kind === 'pack' && room !== 'backyard') || tabItems(t.id).length));
  if (!(currentTab === 'secrets' && hasSecrets) && !visible.some(t => t.id === currentTab)) currentTab = visible[1]?.id ?? '__people';
  $('cats').innerHTML = visible.map(t => `<button class="cat ${t.kind} ${t.id === currentTab ? 'on' : ''}" data-cat="${t.id}" aria-label="${t.name}" title="${t.name}">${t.kind === 'people' ? PEOPLE_ICON : t.kind === 'pack' ? `<span class="packicon">${svgOf(ITEM_MAP[t.icon])}</span><span class="packname">${t.name}</span>` : svgOf(ITEM_MAP[t.icon])}</button>`).join('')
    + (hasSecrets ? `<button class="cat secretTab ${currentTab === 'secrets' ? 'on' : ''}" data-cat="secrets" aria-label="Secrets" title="Secrets">🎁</button>` : '');
  const shelf = $('shelf'); shelfWaiters.length = 0; shelf.innerHTML = '';
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
  const list = tabItems(currentTab);
  if (!list.length) shelf.innerHTML = `<div class="empty">Nothing here yet!</div>`;
  for (const d of list) {
    const b = document.createElement('button'); b.className = 'thing'; b.setAttribute('aria-label', d.name); b.dataset.kind = d.kind;
    const ready = rasterOn() && rasterUrl(d.kind) ? shelfDecoded.get(d.kind) : undefined;
    if (ready) for (let i = 0; i < ready.length; i++) b.appendChild(ready[i]);
    else b.innerHTML = shelfThumb(d, artHas(d.kind));
    shelf.appendChild(b); attachShelfDrag(b, d);
  }
  shelf.scrollLeft = 0;
  updateChipCue();
  bindShelfScroll();
  markShelfArt();
}
function updateChipCue() {
  const row = document.querySelector<HTMLElement>('.drawerTop');
  const bar = document.getElementById('drawerBar');
  if (!row || !bar) return;
  bar.classList.toggle('more', row.scrollWidth - row.clientWidth - row.scrollLeft > 6);
}
document.querySelector('.drawerTop')!.addEventListener('scroll', updateChipCue, { passive: true });
window.addEventListener('resize', updateChipCue);

// ---------- panels ----------
function swatches(list: string[], cur: string, act: string) {
  return `<div class="sw">${list.map(c => `<button class="dot ${c === cur ? 'on' : ''}" style="background:${c}" data-act="${act}" data-v="${c}"></button>`).join('')}</div>`;
}
let sheetMode: 'paint' | 'dress' | null = null;
let confirmDelete = false;
function ensureLook(id: string) {
  if (id === ME) {
    const l = myLook(); if (!l || l.look2) return;
    updateChar(ME, patchFromLook2(look2FromLegacy(l)));
    return;
  }
  const cur = store.get().characters.find(x => x.id === id);
  if (!cur || cur.look2) return;
  updateChar(id, { ...patchFromLook2(look2FromLegacy(cur)), size: cur.size });
}
function renderSheet() {
  const s = store.get(); const card = $('card');
  if (sheetMode === 'paint') {
    card.classList.remove('avCard');
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
    card.classList.add('avCard');
    let snap = s;
    let meLook = myLook();
    let meChar = meLook ? newCharacter({ id: ME, ...meLook }) : null;
    let c = activeChar === ME && meChar ? meChar : snap.characters.find(x => x.id === activeChar) ?? meChar ?? snap.characters[0];
    if (c && !c.look2) ensureLook(c.id);
    snap = store.get();
    meLook = myLook();
    meChar = meLook ? newCharacter({ id: ME, ...meLook }) : null;
    c = activeChar === ME && meChar ? meChar : snap.characters.find(x => x.id === activeChar) ?? meChar ?? snap.characters[0];
    const picker = `<div class="picker">${meChar ? `<button class="pk me ${c?.id === ME ? 'on' : ''}" data-act="pickc" data-v="${ME}"><div class="face">${characterSVG(meChar)}</div><span class="meStar">★</span></button>` : ''}${snap.characters.map(x => `<button class="pk ${x.id === c?.id ? 'on' : ''}" data-act="pickc" data-v="${x.id}"><div class="face">${characterSVG(x)}</div><span class="where" style="background:${roomColor(x.room)}"></span></button>`).join('')}${snap.characters.length < MAX_CHARS ? `<button class="pk add" data-act="newc">${PLUS}</button>` : ''}</div>`;
    if (!c) { card.innerHTML = `<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${picker}<div class="dress"><p class="hint">Tap + to make someone new!</p></div>`; return; }
    activeChar = c.id;
    card.innerHTML = avatarSheetHTML(c, picker, confirmDelete, ICON.trash);
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
  if (act && act.indexOf('av-') === 0) {
    const cur = id === ME ? myLook() : store.get().characters.find(x => x.id === id);
    if (act === 'av-surprise') {
      updateChar(id, { ...patchFromLook2(randomLook2()), size: cur?.size ?? 'kid' });
      sfx.sparkle(); renderSheet(); bounce(document.querySelector('.avStage')); return;
    }
    const base = cur?.look2 ?? look2FromLegacy(cur ?? {});
    const next = avatarAct(base, act, v ?? '');
    if (!next) { sfx.click(); renderSheet(); return; }
    updateChar(id, { ...patchFromLook2(next), size: cur?.size ?? 'kid' });
    sfx.sparkle(); renderSheet(); bounce(document.querySelector('.avStage')); return;
  }
  switch (act) {
    case 'wall': store.dispatch({ type: 'room/wallpaper', room, color: v }); break;
    case 'floor': store.dispatch({ type: 'room/floor', room, color: v }); break;
    case 'pat': store.dispatch({ type: 'room/pattern', room, pattern: +v }); break;
    case 'wtile': store.dispatch({ type: 'room/wallTile', room, tile: v }); break;
    case 'ftile': store.dispatch({ type: 'room/floorTile', room, tile: v || null }); break;
    case 'skin': case 'hair': case 'shirt': case 'pants': updateChar(id, { [act]: v }); break;
    case 'hs': updateChar(id, { hairStyle: +v }); break;
    case 'acc': updateChar(id, { acc: +v }); break;
    case 'size': {
      const cur = id === ME ? myLook() : store.get().characters.find(x => x.id === id);
      updateChar(id, { size: v as Character['size'], ...(cur?.look2 ? { look2: cur.look2 } : {}) });
      renderChars(store.get()); break;
    }
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
    case 'smaller': case 'bigger': {
      const cur = store.get().rooms[room].items.find(i => i.id === id);
      if (!cur) break;
      const at = ITEM_SIZE_STEPS.indexOf(itemSizeOf(cur.size));
      const n = b.dataset.a === 'smaller' ? at - 1 : at + 1;
      if (n < 0 || n >= ITEM_SIZE_STEPS.length) break;
      store.dispatch({ type: 'item/size', room, id, size: ITEM_SIZE_STEPS[n] });
      sfx.click(); bounce(el); break;
    }
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
(window as any).__avatar = { richAvatars, randomLook2, look2FromLegacy, legacyFromLook2, sanitizeLook2, handsFor };
(window as any).__frameHouseKid = () => frameHouseKid(true);
(window as any).__layoutNameTags = () => layoutNameTags();
(window as any).__lie = {
  bedArt, lieBedKinds, lieOffset, lieSpot,
  box(kind: string) { const d = ITEM_MAP[kind]; return d ? { w: d.w, h: hOf(d) } : null; },
};
(window as any).__paint = () => { renderAvatars(); };


// =====================================================================================
// Neighborhood (multiplayer). Offline play above keeps working when `hood` is null.
// =====================================================================================
const esc = (t: string) => t.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
function canEdit() { return !hood || inner === local || hood.canEdit(currentHouseId); }
function lockedNudge(el: Element | null) {
  sfx.pop(); const tag = $('houseTag'); tag.classList.add('show'); tag.classList.remove('wiggle'); void tag.offsetWidth; tag.classList.add('wiggle');
  window.clearTimeout(houseTagTimer);
  houseTagTimer = window.setTimeout(() => { if (!(view === 'house' && hood && !document.body.classList.contains('own-house'))) tag.classList.remove('show'); }, 2000);
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
function avatarHTML(look: Look, name: string, pose?: 'sit' | 'lie' | null, holding?: boolean) {
  return `<div class="inner">${characterSVG(look, pose, holding)}</div><div class="nametag">${esc(name)}</div>`;
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
        else el.addEventListener('pointerdown', ev => { ev.preventDefault(); ev.stopPropagation(); });
      }
      const look = pl.look;
      const seat = presSeat(pid, p);
      const pose = seat?.pose ?? null;
      const holding = babyHolderId(store.get()) === pid;
      const key = JSON.stringify(look) + pl.nickname + (pose || '') + (holding ? 'h' : '');
      if (el.dataset.look !== key) { const b = el.querySelector('.bubble'); el.innerHTML = avatarHTML(look, pl.nickname, pose, holding); if (b) el.appendChild(b); el.dataset.look = key; }
      el.classList.toggle('holding', holding);
      const sc = SIZE_SCALE[look.size] ?? 1;
      const at = seatedAt(room, seat, p);
      placeEl(el, at.x, at.y, CHAR_W * sc, CHAR_H * sc);
      const piece = seat && store.get().rooms[room].items.find(i => i.id === seat.item);
      el.style.zIndex = piece ? String(1000 + piece.z + 1 + seat.n) : String(5000 + Math.round(p.y));
      el.classList.toggle('flipped', p.flip);
      el.classList.toggle('pose-sit', pose === 'sit');
      el.classList.toggle('pose-lie', pose === 'lie');
      el.classList.toggle('pose-lie-r', pose === 'lie' && !!piece?.flip);
      stampAvatar(el, look, pid === hood.pid);
      if (holding) {
        const arm = cradleFrontSVG(look, pose);
        if (arm) paintCradleFront('avatar', pid, el, arm, at.y);
        else dropCradleFront('avatar', pid);
      }
    }
  }
  const hid = babyHolderId(store.get());
  if (!(hood && view === 'house' && hid && keep.has(hid))) clearCradleSlot('avatar');
  for (const [pid, el] of avatarEls) if (!keep.has(pid) || !el.isConnected) { if (!keep.has(pid)) el.remove(); avatarEls.delete(pid); }
  syncSeatFronts();
  updateNear();
  renderBaby();
  queueAmbient();
}
function attachMyAvatarDrag(el: HTMLElement) {
  el.addEventListener('pointerdown', e => {
    e.preventDefault(); e.stopPropagation(); if (twoFinger || !hood) return;
    const p0 = myPres(); if (!p0 || p0.where !== 'house') return;
    const q0 = toRoom(e.clientX, e.clientY);
    const at0 = seatedAt(store.get().currentRoom, presSeat(hood.pid, p0), p0);
    const off = { x: at0.x - q0.x, y: at0.y - q0.y };
    let lastX = at0.x, moved = false; el.classList.add('lifted'); sfx.pick();
    charDrag = true;
    startDrag(e, {
      onMove(ev) {
        const q = toRoom(ev.clientX, ev.clientY), cur = myPres(); if (!cur || cur.where !== 'house') return;
        if (Math.hypot(q.x - q0.x, q.y - q0.y) > 6) moved = true;
        if (!moved) return;
        const x = Math.max(40, Math.min(W - 40, q.x + off.x)), y = Math.max(FLOOR_Y + 40, Math.min(H, q.y + off.y));
        const flip = Math.abs(x - lastX) > 3 ? x < lastX : cur.flip; if (Math.abs(x - lastX) > 3) lastX = x;
        placeMe(cur, x, y, flip, null); renderAvatars(); renderMinimap(store.get());
        if (play.isPlay()) playAim = seatUnderPointer(ev.clientX, ev.clientY)?.id ?? null;
      },
      onUp(ev) {
        charDrag = false;
        playAim = null;
        el.classList.remove('lifted');
        const cur = myPres();
        if (!moved || !cur || cur.where !== 'house') { sfx.click(); return; }
        const q = toRoom(ev.clientX, ev.clientY);
        const releaseX = Math.max(40, Math.min(W - 40, q.x + off.x));
        const releaseY = Math.max(FLOOR_Y + 40, Math.min(H, q.y + off.y));
        if (play.isPlay()) {
          const hit = seatUnderPointer(ev.clientX, ev.clientY);
          const drop = resolveDrop({ mode: 'play', via: 'drag', releaseX, releaseY, piece: hit ? seatPieceOf(hit) : null, occupied: takenSeats(undefined, hood!.pid) });
          const seat = drop.seat ? { id: drop.seat.item, pose: drop.seat.pose, n: drop.seat.n } : null;
          placeMe(cur, drop.x, drop.y, cur.flip, seat);
        } else placeMe(cur, releaseX, releaseY, cur.flip, null);
        renderAvatars(); renderMinimap(store.get());
        sfx.drop(); bounce(el); requestAnimationFrame(() => frameHouseKid(true));
      },
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
  paintBadges();
  const st = document.getElementById('chatNear'); if (st) { st.textContent = n ? `${n} friend${n > 1 ? 's' : ''} nearby can hear you` : 'Walk closer to a friend to talk!'; $('chatTray').classList.toggle('nobody', !n); }
}
function renderChatTray() {
  const tray = $('chatTray'); if (!hood) return;
  const phone = document.body.classList.contains('phone');
  const phrases = `<div class="phrases">${PHRASES.map((p, i) => `<button data-phrase="${i}">${esc(p)}</button>`).join('')}</div>`;
  const typed = hood.settings.freeChat
    ? `<form class="typed" id="chatForm"><input id="chatInput" maxlength="${MAX_CHAT}" autocomplete="off" autocorrect="on" enterkeyhint="send" placeholder="Type a message…"/><button type="submit">Send</button></form><div class="chatWarn" id="chatWarn"></div>`
    : `<div class="presetsOnly">Picking from the bubbles above 💬</div>`;
  const more = phone ? `<button type="button" class="chatMore" data-chat="more">more</button>` : '';
  tray.innerHTML = `<div class="chatHead"><span id="chatNear"></span><button class="close" data-chat="close">✕</button></div>
    <div class="emotes">${EMOTES.map((e, i) => `<button data-emote="${i}">${e}</button>`).join('')}</div>
    ${more}
    <div class="chatExtra${phone ? ' hidden' : ''}">${phrases}${typed}</div>`;
  updateNear();
  const form = document.getElementById('chatForm') as HTMLFormElement | null;
  form?.addEventListener('submit', e => {
    e.preventDefault(); const inp = $('chatInput') as HTMLInputElement;
    const f = filterSay(inp.value);
    if (!f.ok) { $('chatWarn').textContent = FILTER_MSG[f.reason] ?? ''; sfx.pop(); return; }
    if (!nearbyCount()) { toast('Walk closer to a friend to talk!'); return; }
    hood!.say({ kind: 'text', v: f.text }); inp.value = ''; $('chatWarn').textContent = ''; inp.blur();
  });
}
$('chatTray').addEventListener('click', e => {
  const t = e.target as HTMLElement; if (!hood) return;
  if (t.closest('[data-chat="close"]')) { $('chatTray').classList.add('hidden'); return; }
  const more = t.closest<HTMLElement>('[data-chat="more"]');
  if (more) {
    const extra = $('chatTray').querySelector('.chatExtra');
    extra?.classList.toggle('hidden');
    more.textContent = extra && !extra.classList.contains('hidden') ? 'less' : 'more';
    return;
  }
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
  b.toggle('mode-hood', !!hood); b.toggle('view-street', view !== 'house'); b.toggle('view-park', view === 'park'); b.toggle('view-ranch', view === 'ranch'); b.toggle('view-map', view === 'street'); b.toggle('view-gameroom', view === 'gameroom'); b.toggle('in-barn', view === 'ranch' && inBarn); b.toggle('mode-play', view === 'house' && play.isPlay()); renderBasketChip(); syncMailCue();
  b.toggle('own-house', own); b.toggle('locked', !!h && !canEdit()); b.toggle('has-hood', !!hoodServerUrl());
  paintBadges();
  if (h) {
    const owner = hood!.players.get(h.meta.ownerId)?.nickname ?? '';
    $('houseTag').innerHTML = `${h.meta.locked ? '🔒 ' : ''}<b>${esc(h.meta.name)}</b>${own ? ' · yours' : owner ? ' · ' + esc(owner) : ''}`;
    const ico = $('lockIco'); if (ico) ico.innerHTML = h.meta.locked ? ICONS.lockOn : ICONS.lockOff;
    const label = h.meta.locked ? 'Unlock my house' : 'Lock my house';
    $('btnLock').setAttribute('aria-label', h.meta.locked ? 'Unlock house' : 'Lock house');
    const lab = $('lockLabel'); if (lab) lab.textContent = label;
  }
  updateNear();
  flashHouseTag();
  if (document.body.classList.contains('phone')) syncChrome();
}
let houseTagFor = '';
let houseTagTimer = 0;
/** Two seconds on entering your house. A visit keeps the name up so you can see whose house it is. */
function flashHouseTag() {
  const tag = $('houseTag');
  const visiting = !!hood && view === 'house' && !document.body.classList.contains('own-house');
  if (view !== 'house' || !hood) {
    houseTagFor = '';
    tag.classList.remove('show');
    return;
  }
  if (visiting) { tag.classList.add('show'); return; }
  const key = currentHouseId || 'solo';
  if (houseTagFor === key) return;
  houseTagFor = key;
  tag.classList.add('show');
  window.clearTimeout(houseTagTimer);
  houseTagTimer = window.setTimeout(() => tag.classList.remove('show'), 2000);
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
/** iPad and phone landscape keep the 1000×700 street. Phone portrait uses a tall board. */
let activeMap = { w: MAP_W, h: MAP_H, portrait: false };
function phonePortraitMap() { return document.body.classList.contains('phone-portrait'); }
/** Fit the whole street in the window. Sky and grass around the card are scenery, never a crop. */
function mapScale() {
  const r = $('street');
  const w = Math.max(1, r.clientWidth), h = Math.max(1, r.clientHeight);
  return Math.min(w / activeMap.w, h / activeMap.h);
}
/** Center the fitted map. No panning: every house, the Ranch and the Clubhouse stay in view. */
function placeMap(sc: number) {
  const r = $('street'), w = $('mapWorld');
  const mw = activeMap.w * sc, mh = activeMap.h * sc;
  w.style.marginLeft = Math.max(0, Math.floor((r.clientWidth - mw) / 2)) + 'px';
  w.style.marginTop = Math.max(0, Math.floor((r.clientHeight - mh) / 2)) + 'px';
  r.scrollLeft = 0;
  r.scrollTop = 0;
  fitMapLabels();
}
/** Name plates stay fully readable. Nudge any that would hang off the street. */
function fitMapLabels() {
  const street = $('street'), world = $('mapWorld');
  const pad = 4;
  const maxR = street.clientWidth - pad, maxB = street.clientHeight - pad;
  const baseL = world.offsetLeft, baseT = world.offsetTop;
  world.querySelectorAll<HTMLElement>('.mapSign').forEach(sign => {
    sign.style.transform = 'translateX(-50%)';
    const width = sign.offsetWidth, height = sign.offsetHeight;
    const left = baseL + sign.offsetLeft - width / 2;
    const top = baseT + sign.offsetTop;
    let dx = 0, dy = 0;
    if (left < pad) dx = pad - left;
    if (left + width + dx > maxR) dx -= left + width + dx - maxR;
    if (top < pad) dy = pad - top;
    if (top + height + dy > maxB) dy -= top + height + dy - maxB;
    separateSignFromMail(sign, dx, dy, baseL, baseT, pad, maxR, maxB);
  });
}
/** A wide name can still sit on a mailbox after it is nudged onto the screen. */
function separateSignFromMail(sign: HTMLElement, dx: number, dy: number, baseL: number, baseT: number, pad: number, maxR: number, maxB: number) {
  const mails = [...sign.parentElement!.querySelectorAll<HTMLElement>('.mapMail')];
  const place = () => {
    const width = sign.offsetWidth, height = sign.offsetHeight;
    const left = baseL + sign.offsetLeft - width / 2 + dx;
    const top = baseT + sign.offsetTop + dy;
    return { left, top, right: left + width, bottom: top + height, width, height };
  };
  for (let pass = 0; pass < 6; pass++) {
    const box = place();
    const mail = mails.find(m => {
      const ml = baseL + m.offsetLeft, mt = baseT + m.offsetTop;
      const mr = ml + m.offsetWidth, mb = mt + m.offsetHeight;
      return box.right > ml + 2 && box.left < mr - 2 && box.bottom > mt + 2 && box.top < mb - 2;
    });
    if (!mail) break;
    const ml = baseL + mail.offsetLeft, mt = baseT + mail.offsetTop;
    const mb = mt + mail.offsetHeight;
    const boxNow = place();
    const down = mb + 4 - boxNow.top;
    const up = boxNow.bottom - (mt - 4);
    if (boxNow.top + down + boxNow.height <= maxB) dy += down;
    else if (boxNow.top - up >= pad) dy -= up;
    else dx -= (Math.min(boxNow.right, ml + mail.offsetWidth) - Math.max(boxNow.left, ml)) + 6;
  }
  const box = place();
  if (box.left < pad) dx += pad - box.left;
  if (box.right > maxR) dx -= box.right - maxR;
  if (box.top < pad) dy += pad - box.top;
  if (box.bottom > maxB) dy -= box.bottom - maxB;
  sign.style.transform = Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5
    ? `translate(calc(-50% + ${dx.toFixed(1)}px), ${dy.toFixed(1)}px)`
    : 'translateX(-50%)';
}
document.fonts?.ready.then(() => { if (view === 'street') fitMapLabels(); });
function mapHouses() { return hood ? [...hood.houses.values()].map(h => h.meta).sort((a, b) => a.slot - b.slot) : []; }
type MapHouse = { id: string; name: string; style: number; locked: boolean; mine: boolean; lit: boolean } | null;
/**
 * Phone portrait board. Two columns of houses under a landmark row, tall enough
 * that a 390-wide phone draws each house at least 60px. iPad never calls this.
 */
function portraitPlan(n: number) {
  const w = 560, hw = 104, hh = Math.round(hw * 300 / 320);
  const rows = Math.max(1, Math.ceil(n / (n === 1 ? 1 : 2)));
  const pitch = 158;
  const top = 318;
  const lastY = top + (rows - 1) * pitch;
  const contentSquare = lastY + hh / 2 + 108;
  const h = Math.max(1020, contentSquare + 78);
  const squareY = Math.max(contentSquare, Math.min(h - 88, Math.round(h * 0.74)));
  const cols = n === 1 ? [280] : [150, 410];
  const per = n === 1 ? 1 : 2;
  const houses = Array.from({ length: n }, (_, i) => ({ x: cols[i % per], y: top + Math.floor(i / per) * pitch }));
  return {
    w, h, hw, hh, houses, square: { x: 280, y: squareY },
    park: { x: 96, y: 122 }, club: { x: 280, y: 116 }, ranch: { x: 458, y: 120 },
  };
}
function renderMap(force = false) {
  if (view !== 'street') return;
  const w = $('mapWorld');
  const houses = mapHouses();
  const list: MapHouse[] = hood
    ? houses.map(h => ({ id: h.id, name: h.name, style: h.style, locked: h.locked, mine: h.ownerId === hood!.pid, lit: !!hood!.players.get(h.ownerId)?.online }))
    : fakeHouses ? Array.from({ length: fakeHouses }, (_, i) => ({ id: 'fake' + i, name: ['Reagan', 'Quinn', 'Chloe', 'Sloane', 'Cada', 'Emma', 'Olivia', 'Charlotte', 'Amelia', 'Sophia', 'Isabella', 'Mia'][i % 12] + "'s House", style: i, locked: i === 3, mine: i === 0, lit: i % 3 !== 1 })) : [null];
  const plan = phonePortraitMap() ? portraitPlan(Math.max(1, list.length)) : null;
  activeMap = plan ? { w: plan.w, h: plan.h, portrait: true } : { w: MAP_W, h: MAP_H, portrait: false };
  const sc = mapScale();
  const key = (activeMap.portrait ? 'P' : 'L') + activeMap.w + 'x' + activeMap.h + ':' + sc.toFixed(3) + JSON.stringify(houses) + (hood ? houses.map(h => (hood!.players.get(h.ownerId)?.online ? 1 : 0) + (houseUnread(h.id) ? 'u' : '')).join('') + hood.pid : 'solo');
  if (!force && key === mapKey && w.querySelector('#mapFaces')) { renderMapFaces(); return; }
  mapKey = key;
  w.style.width = activeMap.w * sc + 'px'; w.style.height = activeMap.h * sc + 'px'; w.style.setProperty('--sc', String(sc));
  // Spots and their hit pads live in a clip so a 48px pad cannot widen the street.
  // Name plates stay outside it, in the sky and grass letterbox.
  w.innerHTML = `<div class="mapClip">${plan ? mapPortraitBgSVG(plan.w, plan.h) : mapBgSVG()}</div>`;
  const clip = w.querySelector('.mapClip')!;
  const px = (v: number) => v * sc + 'px';
  mapAnchors.clear();
  const n = list.length;
  let spots = '', signs = '';
  if (plan) {
    const { hw, hh } = plan;
    const mw = 34, mh = 40;
    list.forEach((h, i) => {
      const c = plan.houses[i] ?? plan.houses[0];
      const go = h ? `house:${h.id}` : 'home', name = h ? h.name : 'My House';
      mapAnchors.set(h ? 'house:' + h.id : 'home', { x: c.x, y: c.y - hh / 2 - 8 });
      const flag = !!(h && houseUnread(h.id));
      const leftCol = c.x < plan.w / 2;
      const mx = leftCol
        ? Math.max(4, c.x - hw / 2 - mw - 8)
        : Math.min(plan.w - mw - 4, c.x + hw / 2 + 8);
      const my = Math.max(4, Math.min(plan.h - mh - 4, c.y - hh * 0.42));
      spots += `<button class="mapSpot mapHouse ${h?.mine || !h ? 'mine' : ''}" data-go="${go}" aria-label="${esc(name)}" style="left:${px(c.x - hw / 2)};top:${px(c.y - hh / 2)};width:${px(hw)};height:${px(hh)}">${houseSVG(h ? h.style : 0, { lit: h ? h.lit : true })}${h?.locked ? '<span class="lockBadge">🔒</span>' : ''}${h?.mine || !h ? '<span class="homeBadge">★</span>' : ''}</button>
        <button class="mapMail ${flag ? 'up' : ''}" data-mail="${h ? h.id : 'home'}" aria-label="${esc(name)} mailbox" style="left:${px(mx)};top:${px(my)};width:${px(mw)};height:${px(mh)}">${mailboxArt(flag)}</button>`;
      signs += `<div class="mapSign ${h?.mine || !h ? 'mine' : ''}" style="left:${px(c.x)};top:${px(c.y + hh / 2 + 2)}">${esc(name)}</div>`;
    });
    const place = (cls: string, go: string, label: string, art: string, x: number, y: number, wd: number, ht: number, signDy: number) => {
      spots += `<button class="mapSpot ${cls}" data-go="${go}" aria-label="${label}" style="left:${px(x - wd / 2)};top:${px(y - ht / 2)};width:${px(wd)};height:${px(ht)}">${art}</button>`;
      signs += `<div class="mapSign place" style="left:${px(x)};top:${px(y + signDy)}">${label === 'The park' ? 'Park' : label === 'Rainbow Ranch' ? 'Rainbow Ranch' : 'Clubhouse'}</div>`;
    };
    place('mapPark', 'park', 'The park', parkMiniSVG, plan.park.x, plan.park.y, 148, 126, 68);
    place('mapRanch', 'ranch', 'Rainbow Ranch', ranchMiniSVG, plan.ranch.x, plan.ranch.y, 156, 128, 72);
    place('mapClub', 'gameroom', 'The clubhouse', clubhouseMiniSVG, plan.club.x, plan.club.y, 146, 120, 68);
    mapAnchors.set('park', { x: plan.park.x, y: plan.park.y - 78 });
    mapAnchors.set('ranch', { x: plan.ranch.x, y: plan.ranch.y - 80 });
    mapAnchors.set('barn', { x: plan.ranch.x, y: plan.ranch.y + 8 });
    mapAnchors.set('gameroom', { x: plan.club.x, y: plan.club.y - 74 });
    mapAnchors.set('square', plan.square);
    const taken = [
      { x: plan.park.x, y: plan.park.y, r: 90 }, { x: plan.ranch.x, y: plan.ranch.y, r: 96 },
      { x: plan.club.x, y: plan.club.y, r: 88 }, { x: plan.square.x, y: plan.square.y, r: 70 },
      ...plan.houses.map(c => ({ x: c.x, y: c.y, r: 78 })),
    ];
    const mid = plan.w / 2;
    clip.insertAdjacentHTML('beforeend', mapTreesSVG(taken, (x, y) => Math.abs(x - mid) < 34, plan.w, plan.h) + portraitMeadowSVG(plan.w, plan.h, taken) + spots + '<div class="mapFaces" id="mapFaces"></div>');
  } else {
    const road = w.querySelector<SVGPathElement>('#mapRoad')!, L = road.getTotalLength();
    const samples = Array.from({ length: 160 }, (_, i) => road.getPointAtLength(L * i / 159));
    const onRoad = (x: number, y: number) => samples.some(p => Math.hypot(p.x - x, p.y - y) < 50);
    const taken = baseTaken();
    const hw = n > 8 ? 80 : 94, hh = hw * 300 / 320;
    const spotsXY = houseSpots(road, n, taken);
    list.forEach((h, i) => {
      const c = spotsXY[i];
      const go = h ? `house:${h.id}` : 'home', name = h ? h.name : 'My House';
      mapAnchors.set(h ? 'house:' + h.id : 'home', { x: c.x, y: c.y - hh / 2 - 4 });
      const flag = !!(h && houseUnread(h.id));
      // Just right of the house, above the name plate, so the picture does not cover
      // the label and a tap on the door still opens the house.
      const mw = 34, mh = 40;
      const slop = 14 / sc;
      const mx = Math.max(4, Math.min(MAP_W - mw - 4, c.x + hw / 2 + slop));
      const my = Math.max(4, Math.min(MAP_H - mh - 4, c.y - hh * 0.22));
      spots += `<button class="mapSpot mapHouse ${h?.mine || !h ? 'mine' : ''}" data-go="${go}" aria-label="${esc(name)}" style="left:${px(c.x - hw / 2)};top:${px(c.y - hh / 2)};width:${px(hw)};height:${px(hh)}">${houseSVG(h ? h.style : 0, { lit: h ? h.lit : true })}${h?.locked ? '<span class="lockBadge">🔒</span>' : ''}${h?.mine || !h ? '<span class="homeBadge">★</span>' : ''}</button>
        <button class="mapMail ${flag ? 'up' : ''}" data-mail="${h ? h.id : 'home'}" aria-label="${esc(name)} mailbox" style="left:${px(mx)};top:${px(my)};width:${px(mw)};height:${px(mh)}">${mailboxArt(flag)}</button>`;
      signs += `<div class="mapSign ${h?.mine || !h ? 'mine' : ''}" style="left:${px(c.x)};top:${px(c.y + hh / 2 - 2)}">${esc(name)}</div>`;
    });
    spots += `<button class="mapSpot mapPark" data-go="park" aria-label="The park" style="left:${px(PARK.x - 100)};top:${px(PARK.y - 85)};width:${px(200)};height:${px(170)}">${parkMiniSVG}</button>`;
    signs += `<div class="mapSign place" style="left:${px(PARK.x)};top:${px(PARK.y + 70)}">Park</div>`;
    spots += `<button class="mapSpot mapRanch" data-go="ranch" aria-label="Rainbow Ranch" style="left:${px(RANCH.x - 110)};top:${px(RANCH.y - 90)};width:${px(220)};height:${px(180)}">${ranchMiniSVG}</button>`;
    signs += `<div class="mapSign place" style="left:${px(RANCH.x)};top:${px(RANCH.y + 78)}">Rainbow Ranch</div>`;
    spots += `<button class="mapSpot mapClub" data-go="gameroom" aria-label="The clubhouse" style="left:${px(CLUB.x - 95)};top:${px(CLUB.y - 78)};width:${px(190)};height:${px(156)}">${clubhouseMiniSVG}</button>`;
    signs += `<div class="mapSign place" style="left:${px(CLUB.x)};top:${px(CLUB.y + 82)}">Clubhouse</div>`;
    mapAnchors.set('park', { x: PARK.x, y: PARK.y - 60 }); mapAnchors.set('ranch', { x: RANCH.x - 30, y: RANCH.y - 60 }); mapAnchors.set('barn', { x: RANCH.x + 10, y: RANCH.y + 10 });
    mapAnchors.set('gameroom', { x: CLUB.x, y: CLUB.y - 52 });
    clip.insertAdjacentHTML('beforeend', mapTreesSVG(taken, onRoad) + spots + '<div class="mapFaces" id="mapFaces"></div>');
  }
  w.insertAdjacentHTML('beforeend', signs);
  renderMapFaces();
  placeMap(sc);
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
      const home = mapAnchors.get('square') ?? { x: SQUARE.x, y: SQUARE.y };
      if (k === 'square') {
        if (activeMap.portrait) {
          const per = 3, gap = 176, row = Math.floor(j / per), col = j % per, m = Math.min(per, g.length - row * per);
          fx = home.x + (col - (m - 1) / 2) * gap; fy = home.y + row * 112;
        } else if (g.length === 1) { fx = SQUARE.x; fy = SQUARE.y; }
        else { const a = -Math.PI / 2 + j * (Math.PI * 2 / g.length); fx = SQUARE.x + Math.cos(a) * 78; fy = SQUARE.y + Math.sin(a) * 78; }
      } else {
        const an = mapAnchors.get(k) ?? home;
        const per = activeMap.portrait ? 2 : 3, step = activeMap.portrait ? 150 : 64;
        const row = Math.floor(j / per), col = j % per, m = Math.min(per, g.length - row * per);
        fx = an.x + (col - (m - 1) / 2) * step; fy = an.y - row * (activeMap.portrait ? 108 : 64);
      }
      if (activeMap.portrait) { fx = Math.max(100, Math.min(activeMap.w - 100, fx)); fy = Math.max(48, Math.min(activeMap.h - 84, fy)); }
      keep.add(x.key);
      let el = box.querySelector<HTMLElement>(`.mapFace[data-pid="${x.key}"]`);
      if (!el) { el = document.createElement('button'); el.className = 'mapFace ' + (x.mine ? 'mine' : 'other'); el.dataset.pid = x.key; el.setAttribute('aria-label', x.mine ? 'You' : x.name); box.appendChild(el); }
      const lk = JSON.stringify(x.look) + x.name;
      if (el.dataset.look !== lk) { const b = el.querySelector('.bubble'); el.innerHTML = `<span class="face">${faceSVG(characterSVG(x.look))}</span><span class="fname">${esc(x.mine ? 'You' : x.name)}</span>`; if (b) el.appendChild(b); el.dataset.look = lk; }
      el.dataset.place = k; const s = activeMap.portrait ? 62 : 46;
      el.style.left = (fx - s / 2) * sc + 'px'; el.style.top = (fy - s / 2) * sc + 'px'; el.style.width = el.style.height = s * sc + 'px';
    });
  }
  box.querySelectorAll<HTMLElement>('.mapFace').forEach(el => { if (!keep.has(el.dataset.pid!)) el.remove(); });
  updateNear();
}
/** Zoom into the tapped spot, then go there (the new scene fades in). */
/** Clear a leftover zoom class (older builds zoomed for 360ms before going; now the trip is instant and the new scene fades in). */
function cancelMapGo() { $('mapWorld').classList.remove('zoomIn'); }
/** Go to the tapped spot right away. The new scene fades in (sceneIn, 200ms, none with reduced motion), so input is never held. */
function mapGo(target: Place, _from?: HTMLElement) { cancelMapGo(); sfx.swish(); goPlace(target); }
function sceneIn(el: HTMLElement) { if (prefersReducedMotion()) return; el.classList.remove('sceneIn'); void el.offsetWidth; el.classList.add('sceneIn'); setTimeout(() => el.classList.remove('sceneIn'), 260); }
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
  if (pl.kind === 'square') { toast(`${name} is on the map too! 👋`); sfx.pop(); return; }
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
function houseUnread(id: string) {
  if (!hood) return false;
  const h = hood.houses.get(id);
  return !!h && h.meta.ownerId === hood.pid && unreadCount(h.confirmed.mailbox) > 0;
}
let mailPopFor = 0;
/** One pop-up when new mail arrives. It does not stay on the map. */
function syncMailCue() {
  placePopups();
  const cue = document.getElementById('mailCue');
  const id = hood?.myHouseId() ?? '';
  const n = hood && id ? unreadCount(hood.houses.get(id)?.confirmed.mailbox) : 0;
  if (!hood || view !== 'street' || n <= 0) {
    if (n <= 0) mailPopFor = 0;
    cue?.classList.remove('show');
    return;
  }
  if (mailPopFor === n) return;
  mailPopFor = n;
  cue?.classList.add('show');
  window.setTimeout(() => { if (mailPopFor === n) cue?.classList.remove('show'); }, 8000);
}
/**
 * Menu dot = unread letters only. Invites are not in the welcome/players/presence
 * payload, so there is no invite badge (it would always say 0). Map dot = kids in presence.
 */
function paintBadges() {
  const id = hood?.myHouseId() ?? '';
  const mail = hood && id ? unreadCount(hood.houses.get(id)?.confirmed.mailbox) : 0;
  const menu = $('menuBadge');
  menu.textContent = mail > 9 ? '9+' : String(mail);
  menu.classList.toggle('on', mail > 0);
  const neu = document.getElementById('mailNew');
  if (neu) {
    neu.textContent = mail > 0 ? (mail === 1 ? '1 new' : mail + ' new') : '';
    neu.classList.toggle('on', mail > 0);
  }
  const friends = hood ? hood.presence.size : 0;
  const map = $('mapBadge');
  map.textContent = friends > 9 ? '9+' : String(friends);
  map.classList.toggle('on', friends > 0);
  $('btnMap').setAttribute('aria-label', friends > 0 ? `Map, ${friends} friends online` : 'Map');
  const near = nearbyCount();
  const chat = $('chatBadge');
  chat.textContent = near > 9 ? '9+' : String(near);
  chat.classList.toggle('on', near > 0);
}
function setMenuOpen(open: boolean) {
  if (open) document.querySelectorAll('.toast').forEach(el => el.remove());
  $('menuPop').classList.toggle('hidden', !open);
  $('btnMenu').setAttribute('aria-expanded', open ? 'true' : 'false');
  if (open) paintBadges();
  placeHouseTag();
}
/** The menu card sits over the top of the stage. Slide the house name clear of it. */
function placeHouseTag() {
  const tag = $('houseTag');
  tag.style.top = '';
  if (!tag.classList.contains('show') || $('menuPop').classList.contains('hidden')) return;
  const card = document.querySelector('.menuCard');
  if (!card) return;
  const wrap = $('stageWrap').getBoundingClientRect();
  const menu = card.getBoundingClientRect();
  const box = tag.getBoundingClientRect();
  const overlaps = box.top < menu.bottom - 2 && box.bottom > menu.top + 2 && box.left < menu.right - 2 && box.right > menu.left + 2;
  if (!overlaps) return;
  const below = menu.bottom - wrap.top + 8;
  if (below + box.height < wrap.height - 8) tag.style.top = below + 'px';
  else tag.style.top = Math.max(8, wrap.height - box.height - 10) + 'px';
}
$('btnMenu').addEventListener('click', () => { setMenuOpen($('menuPop').classList.contains('hidden')); sfx.click(); });
$('menuPop').addEventListener('click', e => {
  const t = e.target as HTMLElement;
  if (t.id === 'menuPop' || t.closest('#menuClose')) { setMenuOpen(false); return; }
  if (t.closest('.menuRow')) setMenuOpen(false);
});
$('btnMail').addEventListener('click', () => {
  const id = hood?.myHouseId();
  if (id) openMailbox(id);
  else toast('Join a street to send letters!');
});
$('secrets').addEventListener('click', () => {
  if (view !== 'house') { toast('Surprises are hiding in your house!'); return; }
  if (play.isPlay()) $('modeDecorate').click();
  currentTab = 'secrets'; renderDrawer();
  toast('Surprises are in your drawer!');
});
function openMailbox(id: string) {
  if (!hood || id === 'home' || !hood.houses.has(id)) { toast('Join a street to send letters!'); return; }
  const h = hood.houses.get(id)!;
  mailUI.open(id, h.meta.name, h.meta.ownerId === hood.pid, h.confirmed.mailbox?.letters ?? []);
  sfx.click();
}
$('mapWorld').addEventListener('click', e => {
  const t = e.target as HTMLElement; if (view !== 'street') return;
  const box = t.closest<HTMLElement>('.mapMail');
  if (box) { openMailbox(box.dataset.mail || 'home'); return; }
  const f = t.closest<HTMLElement>('.mapFace');
  if (f) { if (f.classList.contains('mine')) { bounce(f); sfx.pop(); toast("That's you! Tap a place to go there"); } else goToFriend(f.dataset.pid!); return; }
  const sp = t.closest<HTMLElement>('[data-go]'); if (!sp) return;
  const g = sp.dataset.go!;
  mapGo(g.startsWith('house:') ? { kind: 'house', houseId: g.slice(6) } : { kind: g as 'home' | 'park' | 'ranch' | 'gameroom' }, sp);
});
function hideScenes() { cancelMapGo(); $('street').classList.add('hidden'); $('park').classList.add('hidden'); $('ranch').classList.add('hidden'); $('gameroom').classList.add('hidden'); tableApi()?.close(); $('chatTray').classList.add('hidden'); $('sheet').classList.add('hidden'); }
function goMap() {
  cancelMapGo(); fetchSt = null; walkQueue = []; inBarn = false;
  if (hood) setMyPres({ where: 'street', x: 600, y: 540, flip: false }); else soloPark = null;
  hideScenes(); view = 'street'; $('street').classList.remove('hidden');
  $('streetTitle').textContent = hood ? 'Our Neighborhood' : 'My Map';
  renderHoodChrome(); renderMap(true);
  const w = $('mapWorld'); w.style.transformOrigin = '50% 50%'; w.classList.remove('zoomIn', 'mapIn'); if (!prefersReducedMotion()) { void w.offsetWidth; w.classList.add('mapIn'); }
  sfx.swish();
}
/** Back to her own house (solo: the local house; neighborhood: her house on the street). */
function goHome() {
  if (hood) { const id = hood.myHouseId(); if (id && hood.houses.has(id)) enterHouse(id); return; }
  hideScenes(); view = 'house'; soloPark = null; play.sync(true); renderHoodChrome(); renderAll(); sceneIn($('stageWrap')); sfx.sparkle();
  fitPhone();
}
function enterHouse(houseId: string, room: RoomId = 'living') {
  if (!hood || !hood.houses.has(houseId)) return;
  currentHouseId = houseId; view = 'house'; inBarn = false;
  play.sync(houseId === hood.myHouseId());
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
  play.sync(true); useStore(local); renderHoodChrome();
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
  client.on('mailbox', () => { if (hood !== client) return; if (view === 'street') renderMap(true); syncMailCue(); mailUI.refresh(); paintBadges(); });
  client.on('mailFail', (r: string) => { if (hood === client) mailUI.fail(r); });
  client.on('settings', () => { if (hood !== client) return; if (!$('chatTray').classList.contains('hidden')) renderChatTray(); mailUI.refresh(); });
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
  client.on('reset', (_hid: string, reason: string) => { if (hood === client && reason === 'cuddling') toast('Someone is cuddling!'); });
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
  if (r === 'ok') {
    saveHoodConfig(c.cfg); enterNeighborhood(c); toast(`Welcome to the street, ${nickname}!`);
    if (avatarIntroPending()) { markAvatarIntro(); activeChar = ME; openSheet('dress'); }
    return;
  }
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
    if (op === 'freeMail') c.parent({ op: 'freeMail', on: a.dataset.on !== '1' });
    if (op === 'rename') c.parent({ op: 'rename', houseId: a.dataset.hid, name: val(`input[data-hid="${a.dataset.hid}"]`) });
    if (op === 'add') c.parent({ op: 'rosterAdd', name: a.dataset.name ?? val('#rosterInput') });
    if (op === 'unname') c.parent({ op: 'rosterRemove', name: a.dataset.name });
    if (op === 'unclaim') { if (a.dataset.sure !== '1') { a.dataset.sure = '1'; a.textContent = 'Tap again'; return; } c.parent({ op: 'unclaim', name: a.dataset.name }); }
    if (op === 'setcode') c.parent({ op: 'setCode', code: val('#codeEdit') });
    if (op === 'remove') { if (a.dataset.sure !== '1') { a.dataset.sure = '1'; a.textContent = 'Tap again to remove'; return; } c.parent({ op: 'remove', pid: a.dataset.pid }); }
    if (op === 'mailClear' || op === 'mailClearAll') {
      if (a.dataset.sure !== '1') { a.dataset.sure = '1'; a.textContent = op === 'mailClearAll' ? 'Tap again to clear every mailbox' : (a.dataset.id ? 'Tap again' : 'Tap again to clear this mailbox'); return; }
      if (op === 'mailClearAll') c.parent({ op: 'mailClearAll' });
      else c.parent({ op: 'mailClear', houseId: a.dataset.hid, ...(a.dataset.id ? { id: a.dataset.id } : {}) });
    }
    if (op === 'leave') { if (a.dataset.sure !== '1') { a.dataset.sure = '1'; a.textContent = 'Tap again: forget this street here'; return; } saveHoodConfig(null); m.close(); goSolo(); toast('This iPad left the street'); }
  }, 'wide parent');
  m.root.addEventListener('submit', e => { e.preventDefault(); const f = (e.target as HTMLElement).id; if (f === 'rosterForm') c.parent({ op: 'rosterAdd', name: val('#rosterInput') }); if (f === 'codeForm2') c.parent({ op: 'setCode', code: val('#codeEdit') }); });
  const letterDate = (at: number) => {
    const d = new Date(at);
    if (!Number.isFinite(d.getTime())) return '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  };
  c.on('parentInfo', (info: any) => {
    const body = m.root.querySelector('#parentBody'); if (!body) return;
    // remember the current code on this device (sockets use the permanent id, so changing the code never kicks anyone)
    const saved = loadHoodConfig(); if (saved && saved.code !== info.code) { saved.code = info.code; saveHoodConfig(saved); } c.cfg.code = info.code;
    const roster: { name: string; claimed: boolean; hasHouse: boolean }[] = info.roster ?? [];
    const names = new Set(roster.map(r => r.name.toLowerCase()));
    const sugg = ROSTER_SUGGEST.filter(n => !names.has(n.toLowerCase()));
    const firstName = roster[0]?.name ?? 'Reagan';
    const boxes: { houseId: string; name: string; letters: { id: string; from: string; text: string; at: number }[] }[] = Array.isArray(info.mail) ? info.mail : [];
    const anyLetters = boxes.some(b => b.letters && b.letters.length);
    const mailOn = mailIsFree(info.settings);
    const mailHtml = boxes.map(b => `<div class="pMailHouse"><div class="pMailName">${esc(b.name || 'House')}</div>${
      (b.letters || []).slice().reverse().map(l => `<div class="pLetter"><b>${esc(l.from)}</b><span class="pWhen">${esc(letterDate(l.at))}</span><p>${esc(l.text)}</p><button type="button" class="danger" data-p="mailClear" data-hid="${esc(b.houseId)}" data-id="${esc(l.id)}">Clear</button></div>`).join('')
      || '<p class="hint">No letters.</p>'
    }${(b.letters || []).length ? `<button type="button" class="danger" data-p="mailClear" data-hid="${esc(b.houseId)}">Clear this mailbox</button>` : ''}</div>`).join('');
    body.innerHTML = `${info.note ? `<p class="err" id="pNote">${esc(PARENT_NOTES[info.note] ?? info.note)}</p>` : ''}
      <div class="pRow"><div><div class="label">Invite code</div><div class="code small" id="pCode">${esc(info.code)}</div></div>
        <div><div class="label">Free typing</div><button class="toggle ${info.settings.freeChat ? 'on' : ''}" data-p="free" data-on="${info.settings.freeChat ? 1 : 0}" id="pFree">${info.settings.freeChat ? 'On' : 'Off (presets only)'}</button><p class="hint small">Chat bubbles. Off means preset phrases only.</p></div>
        <div><div class="label">Let kids type their own letters</div><button class="toggle ${mailOn ? 'on' : ''}" data-p="freeMail" data-on="${mailOn ? 1 : 0}" id="pFreeMail">${mailOn ? 'On' : 'Off (presets only)'}</button><p class="hint small">Letters only. Off means preset phrases only.</p></div></div>
      <div class="label">Letters</div><div id="parentMail">${mailHtml || '<p class="hint">No letters right now.</p>'}${anyLetters ? '<button type="button" class="danger" data-p="mailClearAll" id="mailClearAll">Clear every mailbox</button>' : ''}</div>
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
      <p class="hint small">Letters stay on the server for up to 30 days. They are filtered, and only a first name is stored. You can clear them here, or turn off “Let kids type their own letters” so new letters use preset phrases. Chat bubbles are only relayed to kids standing nearby and are not saved. No emails or last names. "Reset" signs a name out of its iPad so it can sign in again on another one (her house stays).</p>
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
    stampAvatar(el, w.look, w.mine);
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
  if (t.closest('#ball')) { if (!fetchSt) sfx.boing(); throwBall(); return; }
  const sp = t.closest<HTMLElement>('[data-spot]');
  if (sp) {
    const i = +sp.dataset.spot!, s = PARK_SPOTS[i];
    if (me.spot === i && me.pose) { setParkPres({ where: 'park', x: s.x, y: Math.min(590, s.y + 40), flip: me.flip }); sfx.drop(); return; } // tap again to hop off
    if (parkPeople().some(w => !w.mine && w.p.spot === i && w.p.pose)) { toast('Someone is already there!'); sfx.pop(); return; }
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
/** Portrait iPad: the clubhouse is fitted to the width (see grScale), so the camera can show door to first table. */
function grWide() { return portraitPlace() && !document.body.classList.contains('phone'); }
function grSpawnX() { return portraitPlace() ? 520 : 280; }
function goGameRoom() {
  hideScenes(); walkQueue = []; inBarn = false;
  view = 'gameroom'; $('gameroom').classList.remove('hidden');
  const seat = mySeat();
  const p: Presence = seat
    ? { where: 'gameroom', x: seat.x, y: Math.max(RANCH_Y0, Math.min(RANCH_Y1, seat.y)), flip: false }
    : { where: 'gameroom', x: grSpawnX(), y: 560, flip: false };
  if (hood) setMyPres(p); else soloPark = p;
  $('streetTitle').textContent = 'The Clubhouse'; renderHoodChrome(); renderGameRoom();
  requestAnimationFrame(() => {
    const sc = grScale(), scroll = $('grScroll');
    const focus = seat?.x ?? (grWide() ? 60 + GR_PORTRAIT_VIEW / 2 : grSpawnX());
    scroll.scrollLeft = Math.max(0, focus * sc - scroll.clientWidth / 2);
    phoneShowKids();
    frameClubSign();
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
      for (const [pid, p] of entries) {
        const d = hood.players.get(pid)?.dog;
        if (d && p.where === 'house' && p.houseId === currentHouseId && p.room === s.currentRoom) {
          const at = seatedAt(s.currentRoom, presSeat(pid, p), p);
          out.push({ key: pid, dog: d, x: at.x, y: at.y, flip: p.flip, ...house });
        }
      }
    } else if (s.dog) {
      const c = s.characters.find(c => c.id === s.dog!.owner) ?? s.characters[0];
      if (c && c.room === s.currentRoom) {
        const at = seatedAt(c.room, dollSeat(c), c);
        out.push({ key: 'solo', dog: s.dog, x: at.x, y: at.y, flip: c.flip, ...house });
      }
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
    const yardDog = !o.riding && view === 'house' && store.get().currentRoom === 'backyard';
    const behind = o.riding ? 200 : 78;
    let homeX = yardDog ? YARD_DOG.x : o.x + side * behind;
    if (o.riding) homeX = Math.max(50, Math.min(RANCH_W - 50, homeX));
    else if (view === 'house' && !yardDog) homeX = clearDoorX(homeX, 46);
    const homeY = yardDog ? YARD_DOG.y : Math.min(595, o.y + (o.riding ? 28 : 6));
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
    if (d > (fetchSt ? 4 : 10) && !tricking) { const step = prefersReducedMotion() ? d : Math.min(d, speed * dt); r.x += dx / d * step; r.y += dy / d * step; moving = true; if (Math.abs(dx) > 1.5) r.flip = dx < 0; r.idle = 0; }
    else { r.idle += dt; if (!tricking && r.idle > 0.3 && Math.abs(o.x - r.x) > 4) r.flip = o.x < r.x; }
    const pose = tricking && r.sitTrick ? 'sit' : moving ? 'stand' : r.idle > 0.9 ? 'sit' : 'stand';
    const look = pose + o.dog.breed;
    if (r.pose + r.look !== pose + look) {
      // Leave the speech bubble where it is. Detaching it restarted the pop, so one
      // approach played the bubble again each time the dog stood or sat.
      for (const node of [...r.el.children]) if (!node.matches('.bubble, .kennelBtn')) node.remove();
      r.el.insertAdjacentHTML('afterbegin', `<div class="inner">${dogSVG(o.dog.breed, pose as 'stand' | 'sit')}</div>`);
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
function onPlayTap(el: HTMLElement, id: string) {
  const s = store.get();
  const it = s.rooms[s.currentRoom]?.items.find(i => i.id === id); if (!it) return;
  const g = playGesture(it.kind);
  el.classList.remove('wiggle'); void el.offsetWidth; el.classList.add('wiggle');
  sfx.click();
  if (g === 'kennel' || g === 'tower') { onPlaceTap(id); return; }
  if (isPowerable(it.kind)) {
    // Explicit on/off, so two kids tapping at once settle on the same state.
    primeAmbientMusic();
    const on = !it.on;
    store.dispatch({ type: 'item/power', room: s.currentRoom, id, on });
    if (on && roleOf(it.kind) === 'tv') tvSeat(it);
    queueAmbient();
    return;
  }
  if (g === 'open') { el.classList.toggle('opened'); queueAmbient(); return; }
  if (g === 'lamp') { el.classList.toggle('lamp-on'); return; }
  if (g === 'sit') sitAt(it);
  if (g === 'swing') swingAt(it);
}
// ---------- ambient reactions (M1) ----------
// Only an item's `on` flag is synced. Every iPad derives the same reactions from the same state.
const AMB_PERIOD: Record<ReactionKind, number> = { dance: BEAT_MS * 2, sway: BEAT_MS * 4, watch: BEAT_MS * 5, warm: BEAT_MS * 3, hug: BEAT_MS * 2, bounce: BEAT_MS, bathe: BEAT_MS * 3, nibble: BEAT_MS };
const AMB_CHAR_FX: Partial<Record<ReactionKind, string>> = {
  dance: '<span>♪</span><span>♫</span>', sway: '<span>♪</span>', hug: '<span>♥</span>',
  bathe: '<span class="bub"></span><span class="bub"></span><span class="bub"></span>', nibble: '<span>✦</span>',
};
const AMB_ITEM_FX: Record<string, string> = {
  stereo: '<span>♪</span><span>♫</span><span>♪</span>', musicbox: '<span>♪</span><span>♩</span>',
  tv: '<span class="glow"></span>', fire: '<span class="glow"></span><span class="ember"></span><span class="ember"></span>',
  tub: '<span class="bub"></span><span class="bub"></span><span class="bub"></span><span class="bub"></span>',
  fridge: '<span class="food">🍓</span><span class="food">🧁</span>',
};
const musicBoxSince = new Map<string, number>();
let ambRaf = 0;
// A slow heartbeat catches a view change, a lifted kid, and the music box winding down.
setInterval(() => queueAmbient(), 1000);
function queueAmbient() { if (!ambRaf) ambRaf = requestAnimationFrame(() => { ambRaf = 0; syncAmbient(); }); }
function setFx(el: HTMLElement, html: string | null, key: string) {
  let fx = el.querySelector<HTMLElement>(':scope > .ambFx');
  if (!html) { fx?.remove(); return; }
  if (!fx) { fx = document.createElement('i'); fx.className = 'ambFx'; fx.setAttribute('aria-hidden', 'true'); el.appendChild(fx); }
  if (fx.dataset.k !== key) { fx.innerHTML = html; fx.dataset.k = key; fx.className = 'ambFx fx-' + key; }
}
function applyReaction(el: HTMLElement, r: Reaction | undefined, now: number) {
  const key = r ? r.kind + '|' + r.item : '';
  const was = el.dataset.amb || '';
  if (was === key) return;
  if (was) el.classList.remove('amb-' + was.split('|')[0], 'amb-l', 'amb-r');
  if (was.startsWith('bathe|') && !r) {
    // One sparkle as she steps out of the bath.
    el.classList.add('amb-sparkle');
    setTimeout(() => el.classList.remove('amb-sparkle'), 1200);
  }
  if (!r) { delete el.dataset.amb; setFx(el, null, ''); return; }
  el.dataset.amb = key;
  el.style.setProperty('--amb-delay', syncDelayMs(r.phase, AMB_PERIOD[r.kind], now) + 'ms');
  el.style.setProperty('--amb-period', AMB_PERIOD[r.kind] + 'ms');
  el.classList.add('amb-' + r.kind, r.face < 0 ? 'amb-l' : 'amb-r');
  setFx(el, AMB_CHAR_FX[r.kind] ?? null, r.kind);
}
function syncAmbient() {
  const s = store.get();
  const room = s.rooms[s.currentRoom];
  if (view !== 'house' || !room) { setAmbientMusic(null); return; }
  const now = Date.now();
  const done = new Set<string>();
  for (const it of room.items) {
    if (roleOf(it.kind) !== 'musicbox') continue;
    if (!it.on) { musicBoxSince.delete(it.id); continue; }
    const t0 = musicBoxSince.get(it.id) ?? (musicBoxSince.set(it.id, now), setTimeout(queueAmbient, MUSIC_BOX_MS + 60), now);
    if (now - t0 >= MUSIC_BOX_MS) done.add(it.id);
  }
  const fridgesOpen = new Set<string>();
  layer.querySelectorAll<HTMLElement>('.item.opened').forEach(el => { if (el.dataset.id) fridgesOpen.add(el.dataset.id); });
  const items: AmbItem[] = room.items.map(it => {
    const def = ITEM_MAP[it.kind];
    return { id: it.id, kind: it.kind, x: it.x, y: it.y, on: !!it.on, w: def ? placedBox(def, drawnScale(it)).w : 200 };
  });
  const chars: AmbChar[] = [];
  const els = new Map<string, HTMLElement>();
  for (const c of s.characters) {
    const el = charEls.get(c.id);
    if (c.room !== s.currentRoom || !el || el.classList.contains('lifted')) continue;
    const pose = dollSeat(c)?.pose;
    chars.push({ id: c.id, x: c.x, y: c.y, seated: pose === 'sit', lying: pose === 'lie' }); els.set(c.id, el);
  }
  if (hood && inner !== local) {
    const entries: [string, Presence][] = [...hood.presence.entries()];
    const mine = myPres(); if (mine) entries.push([hood.pid, mine]);
    for (const [pid, p] of entries) {
      const el = avatarEls.get(pid);
      if (!el || !el.isConnected || p.where !== 'house' || p.houseId !== currentHouseId || p.room !== s.currentRoom || el.classList.contains('lifted')) continue;
      const pose = presSeat(pid, p)?.pose;
      chars.push({ id: 'p:' + pid, x: p.x, y: p.y, seated: pose === 'sit', lying: pose === 'lie' }); els.set('p:' + pid, el);
    }
  }
  const rx = reactionsFor(items, chars, { fridgesOpen, musicBoxDone: done });
  for (const el of [...charEls.values(), ...avatarEls.values()]) if (![...els.values()].includes(el)) applyReaction(el, undefined, now);
  els.forEach((el, id) => applyReaction(el, rx.get(id), now));
  const bathing = new Set([...rx.values()].filter(r => r.kind === 'bathe').map(r => r.item));
  let music: 'stereo' | 'musicbox' | null = null;
  for (const it of room.items) {
    const el = layer.querySelector<HTMLElement>(`.item[data-id="${it.id}"]`);
    if (!el) continue;
    const role = roleOf(it.kind);
    const live = !!it.on && !!role && !done.has(it.id);
    el.classList.toggle('amb-on', live);
    if (live) {
      el.dataset.amb = role!;
      if (!el.style.getPropertyValue('--amb-delay')) el.style.setProperty('--amb-delay', syncDelayMs(0, BEAT_MS, now) + 'ms');
      if (role === 'stereo') music = 'stereo'; else if (role === 'musicbox' && !music) music = 'musicbox';
      setFx(el, AMB_ITEM_FX[role!], role!);
    } else if (isTub(it.kind) && bathing.has(it.id)) setFx(el, AMB_ITEM_FX.tub, 'tub');
    else if (isFridge(it.kind) && fridgesOpen.has(it.id)) setFx(el, AMB_ITEM_FX.fridge, 'fridge');
    else { delete el.dataset.amb; setFx(el, null, ''); }
  }
  setAmbientMusic(music);
}
/** TV on: the tapper's own kid sits on the nearest free seat if she may, otherwise everyone just stands and watches. */
function tvSeat(tv: PlacedItem) {
  const s = store.get();
  if (hood && view === 'house') { const me = myPres(); if (!me || me.where !== 'house' || me.seat) return; }
  else {
    const c = s.characters.find(ch => ch.id === activeChar && ch.room === s.currentRoom) ?? s.characters.find(ch => ch.room === s.currentRoom);
    if (!c || c.seat) return;
  }
  const seat = s.rooms[s.currentRoom].items
    .filter(i => seatFractions(i.kind)?.pose === 'sit' && Math.abs(i.x - tv.x) < 520)
    .sort((a, b) => Math.abs(a.x - tv.x) - Math.abs(b.x - tv.x))[0];
  if (seat) sitAt(seat);
}
/** She is rocking on this swing. Local only: house presence does not carry a pose. */
let swingPose: { id: string; item: string } | null = null;
let swingLock = false;
function syncSwingPose() {
  layer.querySelectorAll<HTMLElement>('.item.swinging').forEach(el => { if (!swingPose || el.dataset.id !== swingPose.item) el.classList.remove('swinging'); });
  if (swingPose) layer.querySelector<HTMLElement>(`.item[data-id="${swingPose.item}"]`)?.classList.add('swinging');
}
function swingAt(it: PlacedItem) {
  const s = store.get();
  const c = s.characters.find(ch => ch.id === activeChar && ch.room === s.currentRoom) ?? s.characters.find(ch => ch.room === s.currentRoom);
  if (!c) return;
  if (swingPose?.id === c.id && swingPose.item === it.id) {
    swingPose = null;
    swingLock = true;
    store.dispatch({ type: 'char/move', id: c.id, room: s.currentRoom, x: it.x + 70, y: Math.max(it.y, 520) });
    swingLock = false;
    syncSwingPose();
    return;
  }
  const def = ITEM_MAP[it.kind];
  const seatY = it.y - (def ? hOf(def) * drawnScale(it) * 0.26 : 40);
  swingPose = { id: c.id, item: it.id };
  swingLock = true;
  store.dispatch({ type: 'char/move', id: c.id, room: s.currentRoom, x: it.x, y: seatY });
  swingLock = false;
  syncSwingPose();
}
function sitAt(it: PlacedItem) {
  const piece = seatPieceOf(it);
  if (!piece) return;
  if (hood && view === 'house') {
    const me = myPres();
    if (!me || me.where !== 'house') return;
    if (!hood.speaksSit) {
      const key = 'p:' + hood.pid;
      const on = localPose.get(key)?.item === it.id;
      const y = Math.max(FLOOR_Y + 40, piece.footY - 8);
      if (on) localPose.delete(key);
      else localPose.set(key, { item: it.id, pose: piece && seatFractions(it.kind)!.pose, n: 0 });
      const { seat: _prev, ...rest } = me;
      setMyPres({ ...rest, x: it.x, y, flip: false });
      renderAvatars();
      return;
    }
    const drop = resolveDrop({
      mode: 'play', via: 'tap', releaseX: it.x, releaseY: piece.footY, piece,
      occupied: takenSeats(undefined, hood.pid),
      alreadyOn: me.seat?.id === it.id ? it.id : null,
    });
    if (drop.toast) { toast(drop.toast); sfx.pop(); return; }
    if (!drop.moved) return;
    placeMe(me, drop.x, drop.y, false, drop.seat ? { id: drop.seat.item, pose: drop.seat.pose, n: drop.seat.n } : null);
    renderAvatars();
    frameHouseKid(false);
    return;
  }
  const s = store.get();
  const c = s.characters.find(ch => ch.id === activeChar && ch.room === s.currentRoom) ?? s.characters.find(ch => ch.room === s.currentRoom);
  if (!c) return;
  const drop = resolveDrop({
    mode: 'play', via: 'tap', releaseX: it.x, releaseY: piece.footY, piece,
    occupied: takenSeats(c.id),
    alreadyOn: c.seat?.item === it.id ? it.id : null,
  });
  if (drop.toast) { toast(drop.toast); sfx.pop(); return; }
  if (!drop.moved) return;
  moveDoll(c.id, s.currentRoom, drop.x, drop.y, drop.seat);
  frameHouseKid(false);
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
  placeKennelBtn(b);
}
/** Keep the Kennel chip inside the stage, off the kid, the cat, the sandbox, and the other pieces. The dog stands on either side of her, and a short phone clips a chip that only hangs left. */
function placeKennelBtn(btn: HTMLButtonElement) {
  if (view !== 'house') {
    btn.style.left = btn.style.right = btn.style.top = btn.style.bottom = btn.style.transform = '';
    return;
  }
  const dog = btn.parentElement;
  if (!dog) return;
  const sc = stage.getBoundingClientRect().width / stage.offsetWidth || 1;
  const stageR = stage.getBoundingClientRect();
  const pad = 4;
  const bounds = { l: stageR.left + pad, t: stageR.top + pad, r: stageR.right - pad, b: stageR.bottom - pad };
  const kidR = layer.querySelector<HTMLElement>('.char')?.getBoundingClientRect();
  const sofaR = layer.querySelector<HTMLElement>('.item[data-kind="sofa"]')?.getBoundingClientRect();
  const extra = [...layer.querySelectorAll<HTMLElement>('.pet-cat, .item')].map(el => el.getBoundingClientRect()).filter(r => r.width > 2 && r.height > 2);
  const hits = (a: DOMRect, b?: DOMRect) => !!b && a.left < b.right - 1 && a.right > b.left + 1 && a.top < b.bottom - 1 && a.bottom > b.top + 1;
  const area = (a: DOMRect, b?: DOMRect) => {
    if (!hits(a, b)) return 0;
    return Math.max(0, Math.min(a.right, b!.right) - Math.max(a.left, b!.left)) * Math.max(0, Math.min(a.bottom, b!.bottom) - Math.max(a.top, b!.top));
  };
  const penalty = (r: DOMRect) => {
    let p = 0;
    if (r.left < bounds.l) p += (bounds.l - r.left) * 8;
    if (r.right > bounds.r) p += (r.right - bounds.r) * 8;
    if (r.top < bounds.t) p += (bounds.t - r.top) * 8;
    if (r.bottom > bounds.b) p += (r.bottom - bounds.b) * 8;
    p += area(r, kidR) * 4;
    p += area(r, sofaR) * 4;
    for (const b of extra) p += area(r, b) * 4;
    return p;
  };
  const dogR = dog.getBoundingClientRect();
  const awayLeft = !kidR || (dogR.left + dogR.width / 2) <= (kidR.left + kidR.width / 2);
  const side = (left: boolean): Partial<CSSStyleDeclaration> => ({
    left: left ? '0px' : 'auto', right: left ? 'auto' : '0px', top: '46%', bottom: 'auto',
    transform: left ? 'translate(-108%, -50%)' : 'translate(108%, -50%)',
  });
  const options: Partial<CSSStyleDeclaration>[] = [
    side(awayLeft),
    side(!awayLeft),
    { left: '50%', right: 'auto', top: '0px', bottom: 'auto', transform: 'translate(-50%, -115%)' },
  ];
  let best = options[0], bestP = Infinity;
  for (const css of options) {
    Object.assign(btn.style, css);
    const p = penalty(btn.getBoundingClientRect());
    if (p < bestP) { bestP = p; best = css; }
  }
  Object.assign(btn.style, best);
  let r = btn.getBoundingClientRect();
  let dx = 0, dy = 0;
  if (r.left < bounds.l) dx += bounds.l - r.left;
  if (r.right > bounds.r) dx -= r.right - bounds.r;
  if (r.top < bounds.t) dy += bounds.t - r.top;
  if (r.bottom > bounds.b) dy -= r.bottom - bounds.b;
  const shove = (block?: DOMRect) => {
    if (!block) return;
    const moved = () => new DOMRect(r.left + dx, r.top + dy, r.width, r.height);
    if (!hits(moved(), block)) return;
    const overlapY = Math.min(moved().bottom, block.bottom) - Math.max(moved().top, block.top);
    const below = block.bottom + 4 - moved().top;
    const above = block.top - 4 - moved().bottom;
    const fits = (delta: number) => moved().top + delta >= bounds.t && moved().bottom + delta <= bounds.b;
    // A thin overlap is the chip grazing the sofa or the kid. Step off vertically so it stays with the dog.
    if (overlapY < r.height * 0.5 && fits(below)) { dy += below; return; }
    if (overlapY < r.height * 0.5 && fits(above)) { dy += above; return; }
    const spaceL = block.left - bounds.l;
    const spaceR = bounds.r - block.right;
    const other = block === sofaR ? kidR : sofaR;
    const landsOn = (edge: number, leftSide: boolean) => {
      if (!other) return false;
      const left = leftSide ? edge - r.width : edge;
      const next = new DOMRect(left, moved().top, r.width, r.height);
      return hits(next, other);
    };
    if (spaceR >= r.width + 4 && !landsOn(block.right + 4, false)) dx += block.right + 4 - moved().left;
    else if (spaceL >= r.width + 4 && !landsOn(block.left - 4, true)) dx += (block.left - 4) - moved().right;
    else if (fits(below)) dy += below;
    else if (fits(above)) dy += above;
  };
  shove(kidR);
  shove(sofaR);
  // Stay next to the dog, on the grass, not covering her body. A spot across the lawn is worse.
  const body = dog.querySelector<HTMLElement>('.inner')?.getBoundingClientRect();
  const bodyR = body && body.width > 2 ? body : dogR;
  const catR = layer.querySelector<HTMLElement>('.pet-cat')?.getBoundingClientRect();
  const sandR = layer.querySelector<HTMLElement>('.item[data-kind="sandbox"]')?.getBoundingClientRect();
  const benchR = layer.querySelector<HTMLElement>('.item[data-kind="yard-bench"]')?.getBoundingClientRect();
  const yardRects = [...layer.querySelectorAll<HTMLElement>('.item[data-kind="yard-swing"], .item[data-kind="picnic-blanket"], .item[data-kind="lemonade-cart"], .item[data-kind="tulip-bed"]')].map(el => el.getBoundingClientRect());
  const doorEl = stage.querySelector<HTMLElement>('.yardDoor');
  const doorRects = doorEl ? [doorEl, doorEl.querySelector('.yardHintLabel'), doorEl.querySelector('.doorArt')].map(el => el?.getBoundingClientRect()) : [];
  const secEl = document.getElementById('secrets');
  const secBox = secEl && secEl.offsetParent ? secEl.getBoundingClientRect() : undefined;
  const secNear = secBox && secBox.width > 2 && secBox.left < bounds.r && secBox.right > bounds.l && secBox.top < bounds.b && secBox.bottom > bounds.t ? secBox : undefined;
  const secR = secNear ? new DOMRect(secNear.left - 8, secNear.top - 8, secNear.width + 16, secNear.height + 16) : undefined;
  const hard = [kidR, sofaR, catR, sandR, benchR, secR, ...yardRects, ...doorRects].filter((b): b is DOMRect => !!b && b.width > 2 && b.height > 2);
  const home = new DOMRect(r.left + dx, r.top + dy, r.width, r.height);
  const dcx = bodyR.left + bodyR.width / 2, dcy = bodyR.top + bodyR.height / 2;
  const near = (box: DOMRect) => Math.hypot(box.left + box.width / 2 - dcx, box.top + box.height / 2 - dcy);
  const coversBody = (box: DOMRect) => {
    const iw = Math.min(box.right, bodyR.right) - Math.max(box.left, bodyR.left);
    const ih = Math.min(box.bottom, bodyR.bottom) - Math.max(box.top, bodyR.top);
    return iw > 1 && ih > 1;
  };
  const fits = (box: DOMRect) => box.left >= bounds.l - 0.5 && box.right <= bounds.r + 0.5 && box.top >= bounds.t - 0.5 && box.bottom <= bounds.b + 0.5 && hard.every(b => !hits(box, b)) && !coversBody(box);
  let choice = home;
  if (!fits(home) || near(home) > 150) {
    const seats: DOMRect[] = [];
    const park = (x: number, y: number) => {
      let nx = x, ny = y;
      if (nx < bounds.l) nx = bounds.l;
      if (ny < bounds.t) ny = bounds.t;
      if (nx + r.width > bounds.r) nx = Math.max(bounds.l, bounds.r - r.width);
      if (ny + r.height > bounds.b) ny = Math.max(bounds.t, bounds.b - r.height);
      seats.push(new DOMRect(nx, ny, r.width, r.height));
    };
    park(bodyR.left + (bodyR.width - r.width) / 2, bodyR.top - r.height - 8);
    park(bodyR.right - r.width, bodyR.top - r.height - 6);
    park(bodyR.left, bodyR.top - r.height - 6);
    if (kidR) park(kidR.right + 6, bodyR.top - r.height - 8);
    if (benchR) park(benchR.left - r.width - 6, benchR.top - r.height - 6);
    if (kidR && benchR) park(kidR.right + 6, benchR.top - r.height - 6);
    // Phone landscape squeezes the dog against the bench. The pocket above her head still fits.
    if (kidR) {
      park(kidR.left - 12, kidR.top - r.height - 8);
      park(bounds.l, kidR.top - r.height - 10);
      park(kidR.left + (kidR.width - r.width) / 2, kidR.top - r.height - 8);
    }
    park(bounds.r - r.width, bodyR.top - r.height - 6);
    park(bodyR.right + 8, bodyR.top + (bodyR.height - r.height) / 2);
    park(bodyR.left - r.width - 8, bodyR.top + (bodyR.height - r.height) / 2);
    park(home.left, home.top);
    for (const dist of [r.width * 0.65, r.width * 1.05, 88, 120, 155]) {
      for (let a = 0; a < 8; a++) {
        const ang = (a * Math.PI) / 4;
        park(dcx + Math.cos(ang) * dist - r.width / 2, dcy + Math.sin(ang) * dist - r.height / 2);
      }
    }
    const pick = (limit: number) => {
      let bestRank = Infinity;
      let found: DOMRect | null = null;
      for (const box of seats) {
        if (!fits(box) || near(box) > limit) continue;
        const rank = near(box);
        if (rank < bestRank) { bestRank = rank; found = box; }
      }
      return found;
    };
    const found = pick(170) ?? pick(360);
    if (found) choice = found;
    else if (!fits(home)) {
      let bestBox: DOMRect | null = null;
      let bestScore = Infinity;
      for (const box of seats) {
        if (box.left < bounds.l - 0.5 || box.right > bounds.r + 0.5 || box.top < bounds.t - 0.5 || box.bottom > bounds.b + 0.5) continue;
        const cover = coversBody(box) ? 10000 : 0;
        const score = cover + hard.reduce((sum, block) => sum + area(box, block), 0) + near(box);
        if (score < bestScore) { bestScore = score; bestBox = box; }
      }
      if (bestBox) choice = bestBox;
    }
  }
  dx += choice.left - home.left;
  dy += choice.top - home.top;
  if (dx || dy) btn.style.transform = `${btn.style.transform} translate(${(dx / sc).toFixed(1)}px, ${(dy / sc).toFixed(1)}px)`;
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
    const kennelDef = ITEM_MAP[spot.item.kind];
    const foot = kennelDef ? drawY(kennelDef, spot.item.y) : Math.min(spot.item.y, H - FLOOR_DRAW);
    // Sit in the doorway: feet on the drawn floor of the opening, peeking lifts the head over the arch.
    const y = foot - (look === 'peek' ? 24 : 2);
    let r = kennelRuns.get(spot.key);
    if (!r || !r.el.isConnected) {
      r?.el.remove();
      const el = document.createElement('div');
      el.className = 'pet pet-dog kenneled'; el.dataset.dog = 'kennel:' + spot.key; layer.appendChild(el);
      el.addEventListener('pointerdown', ev => { if ((ev.target as HTMLElement).closest('.kennelBtn')) return; ev.stopPropagation(); ev.preventDefault(); });
      el.addEventListener('click', ev => { if ((ev.target as HTMLElement).closest('.kennelBtn')) return; ev.stopPropagation(); petBubble(el, `${el.dataset.name ?? 'Puppy'} is resting`); });
      r = { el, pose: '', look: '', x: spot.item.x, y }; kennelRuns.set(spot.key, r);
    }
    const pose = look === 'rest' ? 'sleep' : 'sit';
    if (r.pose !== pose || r.look !== look + spot.dog.breed) {
      // Swap only the drawing. Detaching and re-adding the speech bubble restarted its pop
      // animation, so a rest/peek flip made the bubble shrink and bounce again mid-sentence.
      for (const node of [...r.el.children]) if (!node.matches('.bubble, .kennelBtn')) node.remove();
      r.el.insertAdjacentHTML('afterbegin', `<div class="inner">${dogSVG(spot.dog.breed, pose)}</div>${look === 'rest' ? '<div class="zzz"><b>Zzz</b><i>z</i><i>z</i><i>z</i></div>' : ''}`);
      r.pose = pose; r.look = look + spot.dog.breed;
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
function petBedKind(kind: string) {
  return kind === 'cat-bed' || kind === 'pet-bed' || kind === 'dog-bed' || kind === 'pack:cat-bed' || /(?:^|:)cat-bed$|(?:^|:)pet-bed$/.test(kind);
}
function roomBed(s: GameState): { x: number; y: number; h: number; pet: boolean } | null {
  const items = s.rooms[s.currentRoom]?.items ?? [];
  const pets = items.filter(i => petBedKind(i.kind));
  const beds = items.filter(i => i.kind === 'bed');
  const pick = (pets.length ? pets : beds).reduce<PlacedItem | null>((a, b) => !a || b.z >= a.z ? b : a, null);
  if (!pick) return null;
  const def = ITEM_MAP[pick.kind];
  return { x: pick.x, y: pick.y, h: def ? hOf(def) * drawnScale(pick) : 80, pet: petBedKind(pick.kind) };
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
  const bed = tower ? null : roomBed(s);
  const def = tower ? ITEM_MAP[tower.kind] : undefined;
  const th = tower && def ? hOf(def) * drawnScale(tower) : 0;
  const b = catAt(cat, Date.now(), tower ? { x: tower.x } : null, bed ? { x: bed.x } : null, prefersReducedMotion());
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
  catEl.dataset.name = cat.name; catEl.dataset.mood = mood; catEl.dataset.perch = String(perch); catEl.dataset.leap = leaping ? '1' : '0'; catEl.dataset.curl = b.curl ? '1' : '0';
  catEl.classList.toggle('walking', mood === 'walk'); catEl.classList.toggle('groom', mood === 'groom'); catEl.classList.toggle('play', mood === 'play' && !leaping); catEl.classList.toggle('leap', leaping); catEl.classList.toggle('flipped', b.flip); catEl.classList.toggle('curl', b.curl === 1);
  layer.querySelectorAll<HTMLElement>('.item.toy-live').forEach(el => el.classList.remove('toy-live'));
  if (tower && mood === 'play' && perch && !leaping) layer.querySelector<HTMLElement>(`.item[data-id="${tower.id}"]`)?.classList.add('toy-live');
  // __pinCat holds her on a character's feet for tests. She stays under characters (5000 + y).
  const pin = (window as any).__pinCat as { x: number; y?: number } | null;
  const pinned = !!(pin && Number.isFinite(pin.x));
  const pinY = pinned && Number.isFinite(pin!.y) ? pin!.y! : CAT_Y;
  const foot = !pinned && perch && tower ? towerFootY(tower.y, th, perch as 1 | 2) : !pinned && b.curl && bed ? bed.y - bed.h * (bed.pet ? 0.38 : 0.2) : pinY;
  const yardCat = s.currentRoom === 'backyard' && !perch;
  const catH = !pinned && perch ? 92 : yardCat ? 115 : 128;
  const catW = !pinned && perch ? 110 : yardCat ? 135 : 150;
  // A pin may stand her on the door for the tap test. An unpinned yard cat stays on her lawn spot, off the fence and the swing.
  const placeX = pinned ? pin!.x : s.currentRoom === 'backyard' ? YARD_CAT.x : clearDoorX(x, catW / 2);
  const placeY = !pinned && s.currentRoom === 'backyard' && !perch ? YARD_CAT.y : foot;
  placeEl(catEl, placeX, placeY, catW, catH);
  catEl.style.zIndex = String(4000 + Math.round(placeY));
  catSpot = { x: placeX, perch, leap: leaping };
}
/** Push a pet's idle spot out of the doorway so she does not stand on the back door. A test pin is left alone. */
function clearDoorX(x: number, half: number): number {
  const room = store.get().currentRoom;
  const door = room === 'backyard' ? YARD_DOOR : room === 'living' ? LIVE_DOOR : null;
  if (!door) return x;
  const left = door.x - door.w / 2 - half - 16;
  const right = door.x + door.w / 2 + half + 16;
  if (x <= left || x >= right) return x;
  return x < door.x ? left : right;
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
  try { tickDogs(now, dt); tickKennels(); tickCat(); tickRanch(now, dt); tickGameRoom(dt); layoutNameTags(); } catch { /* never let an animation frame break the game */ }
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
  return { dogs: [...dogRuns.keys()], dogPos: Object.fromEntries([...dogRuns].map(([k, r]) => [k, { x: Math.round(r.x), y: Math.round(r.y) }])), cat: catEl ? { mood: catEl.dataset.mood, name: catEl.dataset.name, perch: catSpot.perch, x: Math.round(catSpot.x), leap: catSpot.leap, curl: catEl.dataset.curl === '1' } : null, kennel: spot && run ? { x: Math.round(run.x), y: Math.round(run.y), pose: run.pose, name: spot.dog.name, item: spot.item.id } : null, dogKennel: store.get().dogKennel ?? null, fetch: fetchSt?.phase ?? null, ball: ballPos, view };
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
function rideLegHTML(look: { pants: string; look2?: Look2 | null }) {
  if (look.look2) return chibiRideLeg(look.look2);
  const pants = look.pants;
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
      if (ride !== undefined) el.insertAdjacentHTML('afterbegin', `<div class="mount" data-mount="${ride}">${horseSVG(ride, true)}${rideLegHTML(w.look)}</div>`);
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
    stampAvatar(el, w.look, w.mine);
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
  const home = view === 'house' && (!hood || inner === local || currentHouseId === hood.myHouseId());
  const b = myBasket(), any = b.egg + b.carrot + b.flower > 0;
  const show = any && (view === 'ranch' || home);
  chip.classList.toggle('hidden', !show); chip.classList.toggle('inHouse', view === 'house'); if (!show) return;
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
(window as any).__ui = () => ({ view, currentHouseId, mode: hood ? 'hood' : 'solo', play: play.mode() });
bindGameRoom({
  hood: () => hood, view: () => view, solo: () => soloPark, myPres, setPres: setParkPres, toast, refreshNear: updateNear, sfx, goMap,
  soloLook: () => { const s = local.get(); return { look: cleanLook(s.characters[0] ?? {}), dog: s.dog ?? null }; },
});

// Paintings for items already in the save (any room, or in a hand) load once,
// after the SVG is already on screen. Shelf cards load the same painting when
// they scroll near the tray, two at a time. ?art=v1 never asks for the raster
// files. Winter Cheer has no SVG, so v1 still loads those pack WebPs.
function artKinds(s: GameState): string[] {
  const kinds = new Set<string>();
  for (const room of Object.values(s.rooms)) for (const item of room.items) kinds.add(item.kind);
  for (const c of s.characters) {
    if (c.held.left) kinds.add(c.held.left.kind);
    if (c.held.right) kinds.add(c.held.right.kind);
  }
  if (s.baby) kinds.add('baby');
  return [...kinds];
}
let artBoot: Promise<void> | null = null;
let artHas: (kind: string) => boolean = () => false;
function refreshArt(_room?: string): Promise<void> {
  if (artBoot) return artBoot;
  artBoot = import('./art/load').then(m => {
    artHas = m.hasArt;
    return m.boot(location.search, artKinds(store.get()));
  }).then(ids => {
    for (let i = 0; i < ids.length; i++) if (ITEM_MAP[ids[i]]) { renderAll(); break; }
    refreshShelfArt();
  });
  return artBoot;
}
function paintLoaded(ids: string[]): void {
  const want = new Set(ids);
  const s = store.get();
  let changed = false;
  for (const it of s.rooms[s.currentRoom].items) {
    const def = ITEM_MAP[it.kind];
    if (!want.has(it.kind) || !def) continue;
    const inner = layer.querySelector<HTMLElement>(`.item[data-id="${it.id}"] .inner`);
    if (!inner || inner.querySelector('img.artimg')) continue;
    inner.innerHTML = svgOf(def, true);
    changed = true;
  }
  if (!changed) return;
  charEls.forEach(el => { delete el.dataset.held; });
  renderChars(s);
  refreshShelfArt();
}
function loadNewArt(): Promise<void> {
  return import('./art/load').then(m => m.boot(location.search, artKinds(store.get()))).then(ids => {
    paintLoaded(ids.filter(id => !!ITEM_MAP[id]));
  });
}

// ---------- start ----------
installArtFallback();
installJuice();
setRoomScenery(room => (room === 'backyard' ? yardBackyardScenery() : null));
$('scenery').addEventListener('click', e => {
  const b = (e.target as HTMLElement).closest<HTMLElement>('[data-yard-go]');
  if (!b) return;
  goDoor(b.dataset.yardGo === 'backyard' ? 'backyard' : 'living');
});
const skyHandle = mountSkyToggle($('skyMount'));
(window as any).__sky = skyHandle;
renderBaby = installBaby({
  layer,
  stageWrap: $('stageWrap'),
  get: () => store.get(),
  dispatch: a => store.dispatch(a),
  clock: () => (hood && inner !== local ? hood.now() : Date.now()),
  canSend: () => !hood || inner === local || !!hood.speaksBaby,
  owner: () => ownsDolls(),
  inHouse: () => view === 'house',
  play: () => play.isPlay(),
  editable: () => canEdit(),
  toRoom,
  box: (it) => {
    const def = ITEM_MAP[it.kind];
    if (!def) return null;
    return { id: it.id, kind: it.kind, x: it.x, footY: drawY(def, it.y), flip: !!it.flip, scale: drawnScale(it), w: def.w, h: hOf(def), z: it.z };
  },
  holderId: () => (hood && inner !== local && hood.pid) ? hood.pid : (activeChar || store.get().characters[0]?.id || 'c1'),
  holderSpot: (who?: string) => {
    const s = store.get();
    const self = (hood && inner !== local && hood.pid) ? hood.pid : (activeChar || s.characters[0]?.id || '');
    const id = who || self;
    const spot = (at: { x: number; y: number }, flip: boolean, scale: number, seat: DollSeat | null, skin?: string, chibi?: boolean) => {
      const pose = seat?.pose === 'sit' || seat?.pose === 'lie' ? seat.pose : null;
      const piece = pose === 'lie' ? s.rooms[s.currentRoom]?.items.find(i => i.id === seat?.item) : undefined;
      const tone = skin && /^#[0-9a-fA-F]{6}$/.test(skin) ? skin : '#f1c27d';
      return { x: at.x, y: at.y, flip, scale: scale > 0 ? scale : 1, pose, lieFlip: !!(pose === 'lie' && piece?.flip), skin: tone, chibi: !!chibi };
    };
    const doll = s.characters.find(c => c.id === id && c.room === s.currentRoom);
    if (doll) {
      const seat = dollSeat(doll);
      return spot(seatedAt(s.currentRoom, seat, doll), doll.flip, SIZE_SCALE[doll.size] ?? 1, seat, (doll.look2 && doll.look2.skin) || doll.skin, !!doll.look2);
    }
    if (hood && view === 'house') {
      const p = id === hood.pid ? myPres() : hood.presence.get(id);
      if (p && p.where === 'house' && p.houseId === currentHouseId && p.room === s.currentRoom) {
        const seat = presSeat(id, p);
        const look = hood.players.get(id)?.look;
        const size = look?.size ?? 'kid';
        return spot(seatedAt(s.currentRoom, seat, p), p.flip, SIZE_SCALE[size] ?? 1, seat, (look?.look2 && look.look2.skin) || look?.skin || '#f1c27d', !!look?.look2);
      }
    }
    return null;
  },
  holderHere: (id: string) => {
    if (!id) return false;
    const s = store.get();
    if (s.characters.some(c => c.id === id)) return true;
    if (!hood || inner === local) return false;
    const p = id === hood.pid ? myPres() : hood.presence.get(id);
    return !!(p && p.where === 'house' && p.houseId === currentHouseId);
  },
  occupied: () => takenSeats(undefined, hood?.pid, true),
  locked: () => lockedNudge(null),
  seatAt: (room, seat, at) => seatedAt(room, seat, at),
}).render;
pokeBaby = () => renderBaby();
renderAll(); renderDrawer(); fit();
bootYardPreview();

fit();
frameYardCam();
placeModeToggle(); dockSkyChrome(); if (phoneMQ.matches) fitPhone(); else fit();
requestAnimationFrame(() => { fit(); frameYardCam(); fitNow(); });

/** ?yard=1 only. Stages the approval yard in the real renderer and does not run otherwise. */
function bootYardPreview() {
  if (!yardOn) return;
  const shot = yardShot();
  const kid = store.get().characters[0];
  if (!kid) return;
  const door = shot === 'door';
  store.dispatch({ type: 'char/update', id: kid.id, patch: { ...yardLookPatch(), flip: door ? DOOR_KID.flip : YARD_KID.flip } });
  store.dispatch({ type: 'cat/set', cat: { name: 'Clover', coat: 3, room: door ? 'living' : 'backyard', x: door ? DOOR_CAT_X : YARD_CAT.x } });
  store.dispatch({ type: 'dog/set', dog: { name: 'Sunny', breed: 3, owner: kid.id } });
  if (!store.get().rooms.backyard.items.some(i => i.kind === 'yard-swing')) {
    for (const p of YARD_STAGE) {
      store.dispatch({
        type: 'item/add', room: 'backyard',
        item: { id: 'yp-' + p.kind, kind: p.kind, x: p.x, y: p.y, flip: false, z: 1, scale: p.scale ?? 1 },
      });
    }
  }
  if (shot !== 'sheet') {
    const spot = door ? DOOR_KID : YARD_KID;
    store.dispatch({ type: 'char/move', id: kid.id, room: door ? 'living' : 'backyard', x: spot.x, y: spot.y });
    store.dispatch({ type: 'room/switch', room: door ? 'living' : 'backyard' });
  }
  (window as any).__pinCat = door ? { x: DOOR_CAT_X } : { x: YARD_CAT.x, y: YARD_CAT.y };
  if (shot === 'play') $('modePlay').click();
  else if (shot === 'decorate' || shot === 'door') $('modeDecorate').click();
  if (shot === 'sheet') document.body.insertAdjacentHTML('beforeend', yardSheetHTML());
  if (shot === 'compare') document.body.insertAdjacentHTML('beforeend', yardCompareHTML());
  document.body.dataset.yard = 'ready';
}
/** The living-room back door, and the matching door on the house wall. Not a map pin. */
function goThroughYardDoor(go: 'backyard' | 'living') {
  const s = store.get();
  const spot = go === 'backyard' ? YARD_KID : DOOR_KID;
  swingPose = null;
  const who = s.characters.find(c => c.id === activeChar && c.room === s.currentRoom) ?? s.characters.find(c => c.room === s.currentRoom);
  if (who) {
    store.dispatch({ type: 'char/update', id: who.id, patch: { flip: spot.flip } });
    store.dispatch({ type: 'char/move', id: who.id, room: go, x: spot.x, y: spot.y });
  }
  if (yardOn && s.cat) {
    store.dispatch({ type: 'cat/move', room: go, x: go === 'backyard' ? YARD_CAT.x : DOOR_CAT_X });
    (window as any).__pinCat = go === 'backyard' ? { x: YARD_CAT.x, y: YARD_CAT.y } : { x: DOOR_CAT_X };
  }
  store.dispatch({ type: 'room/switch', room: go });
  if (hood && inner !== local) {
    const p = myPres();
    if (p && p.where === 'house') setMyPres({ ...p, room: go, x: spot.x, y: spot.y, flip: spot.flip });
  }
  requestAnimationFrame(() => frameYardCam());
}
function frameYardCam() {
  if (store.get().currentRoom === 'backyard') {
    setCam(YARD_CAM);
    placeYardHints();
    return;
  }
  if (!yardOn || yardShot() === 'sheet' || yardShot() === 'compare') return;
  const kid = store.get().characters.find(c => c.room === store.get().currentRoom);
  if (kid) setCam(kid.x - VIEW_W / 2);
  placeYardHints();
}
/** Slide the door, not the room, so the whole door and its label sit on the stage and clear of the pan arrows. The arrows stay where production puts them. */
function placeYardHints() {
  if (doorPress) return;
  const stageBox = stage.getBoundingClientRect();
  if (stageBox.width < 20) return;
  const sc = stageScale() || parseFloat(stage.style.getPropertyValue('--yard-sc')) || 1;
  stage.style.setProperty('--yard-sc', String(sc));
  const doors = [...stage.querySelectorAll<HTMLElement>('.yardDoor')];
  for (const door of doors) {
    door.style.minWidth = '';
    door.style.transform = '';
    const hint = door.querySelector<HTMLElement>('.yardHintLabel');
    if (!hint) continue;
    hint.style.transform = '';
    hint.style.translate = '';
    const span = hint.querySelector<HTMLElement>('span');
    if (span) span.style.transform = '';
    const fontLocal = Math.max(13, 16 / sc);
    hint.style.fontSize = fontLocal + 'px';
    hint.style.lineHeight = '1';
    const pill = 38 / sc;
    hint.style.height = pill + 'px';
    const border = 3 / sc;
    const padY = Math.max(0, (pill - border * 2 - fontLocal) / 2);
    hint.style.padding = `${padY.toFixed(2)}px ${(14 / sc).toFixed(2)}px`;
  }
  const door = doors[0];
  if (!door) return;
  const art = door.querySelector<HTMLElement>('.doorArt');
  const hint = door.querySelector<HTMLElement>('.yardHintLabel');
  const pad = 6;
  const limits = () => {
    const box = stage.getBoundingClientRect();
    const doorR = door.getBoundingClientRect();
    const artR = art?.getBoundingClientRect();
    const hintR = hint?.getBoundingClientRect();
    const rects = [doorR, artR, hintR].filter((r): r is DOMRect => !!r && r.width > 2 && r.height > 2);
    const top = Math.min(...rects.map(r => r.top));
    const bottom = Math.max(...rects.map(r => r.bottom));
    let leftLimit = box.left + pad;
    let rightLimit = box.right - pad;
    for (const id of ['nudgeL', 'nudgeR'] as const) {
      const n = $(id);
      if (!n || n.classList.contains('off') || n.offsetParent === null) continue;
      const b = n.getBoundingClientRect();
      if (b.width < 2 || b.height < 2) continue;
      const hitsY = (r: DOMRect) => r.top < b.bottom - 1 && r.bottom > b.top + 1;
      const blocked = [doorR, artR].some(r => r && r.width > 2 && hitsY(r));
      if (!blocked && (top >= b.bottom - 1 || bottom <= b.top + 1)) continue;
      if (id === 'nudgeL' && blocked) leftLimit = Math.max(leftLimit, b.right + 8);
      else if (id === 'nudgeR' && blocked) rightLimit = Math.min(rightLimit, b.left - 8);
    }
    return { leftLimit, rightLimit, doorR, artR, hintR };
  };
  let guard = 0;
  let dx = 0;
  while (guard++ < 4) {
    const { leftLimit, rightLimit, doorR, artR } = limits();
    let step = 0;
    const left = Math.min(doorR.left, artR && artR.width > 2 ? artR.left : doorR.left);
    const right = Math.max(doorR.right, artR && artR.width > 2 ? artR.right : doorR.right);
    if (left < leftLimit) step += leftLimit - left;
    if (right + step > rightLimit) step -= right + step - rightLimit;
    if (Math.abs(step) < 0.5) break;
    dx += step;
    door.style.transform = `translate(${(dx / sc).toFixed(1)}px, 0)`;
  }
  if (!hint) { liftDoorOverFurniture(door); return; }
  const span = hint.querySelector('span');
  if (span) {
    const range = document.createRange();
    range.selectNodeContents(span);
    const ink = range.getBoundingClientRect();
    const box = hint.getBoundingClientRect();
    const dy = ((box.top + box.bottom) - (ink.top + ink.bottom)) / 2;
    const el = span as HTMLElement;
    if (ink.height > 2 && Math.abs(dy) >= 0.1) el.style.transform = `translateY(${(dy / sc).toFixed(2)}px)`;
    else el.style.transform = '';
  }
  const h2 = hint.getBoundingClientRect();
  const stage2 = stage.getBoundingClientRect();
  let hx = 0;
  // The yard door grows into the house. Keep the label centered on the drawing, then on the stage.
  if (store.get().currentRoom === 'backyard' && art) {
    const artR = art.getBoundingClientRect();
    if (artR.width > 2) hx += (artR.left + artR.right) / 2 - (h2.left + h2.right) / 2;
  }
  if (h2.left + hx < stage2.left + pad) hx += stage2.left + pad - (h2.left + hx);
  else if (h2.right + hx > stage2.right - pad) hx -= h2.right + hx - (stage2.right - pad);
  if (Math.abs(hx) > 0.5) hint.style.translate = `calc(-50% + ${(hx / sc).toFixed(1)}px) 0`;
  else hint.style.translate = '';
  // Stack from the slide she can actually tap. Doing it last keeps the label's own nudge put.
  liftDoorOverFurniture(door);
}void refreshArt(store.get().currentRoom);
// ---------- hidden surprises ----------
const renderSecrets = () => {
  const n = foundSet().size, total = EGGS.length;
  const el = $('secrets');
  const count = el.querySelector('.secCount');
  if (count) count.textContent = `${n}/${total}`;
  el.setAttribute('aria-label', `Surprises, ${n} of ${total}`);
  placeSecretsPill();
};

/** Portrait iPad and phone: the scene is taller than it is wide, so a wide sign gets cropped. */
function portraitPlace() { return window.innerHeight > window.innerWidth + 40; }
/**
 * Scale sign art so the group fits the viewport, then scroll just enough to keep it on screen.
 * Landscape clears the tweak and leaves the camera alone.
 */
function framePlaceArts(arts: HTMLElement[], scroll: HTMLElement | null) {
  for (const a of arts) a.style.transform = '';
  if (!portraitPlace() || !arts.length) return;
  const port = scroll && scroll.clientWidth > 20 ? scroll.getBoundingClientRect()
    : { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight, width: window.innerWidth, height: window.innerHeight };
  if (port.width < 20) return;
  const pad = 8;
  const availL = Math.max(port.left, 0) + pad;
  const availR = Math.min(port.right, window.innerWidth) - pad;
  const availT = Math.max(port.top, 0) + pad;
  const availB = Math.min(port.bottom, window.innerHeight) - pad;
  const availW = Math.max(40, availR - availL);
  const availH = Math.max(40, availB - availT);
  const boxes = () => arts.map(a => a.getBoundingClientRect()).filter(b => b.width > 2 && b.height > 2);
  const list = boxes();
  if (!list.length) return;
  const l = Math.min(...list.map(b => b.left)), r = Math.max(...list.map(b => b.right));
  const t = Math.min(...list.map(b => b.top)), btm = Math.max(...list.map(b => b.bottom));
  const uw = Math.max(1, r - l), uh = Math.max(1, btm - t);
  const s = Math.min(1, availW / uw, availH / uh);
  const fits = s > 0.995 && l >= availL - 1 && r <= availR + 1 && t >= availT - 1 && btm <= availB + 1;
  if (fits) return;
  // CSS translate on an SVG group is in user units, then the scene scale turns it into
  // screen pixels. Divide by that scale or the sign jumps about twice as far as asked.
  const ctm = (arts[0] as unknown as SVGGraphicsElement).getScreenCTM();
  const px = ctm ? Math.hypot(ctm.a, ctm.b) || 1 : 1;
  const cx = (l + r) / 2, cy = (t + btm) / 2;
  const tw = uw * s, th = uh * s;
  const destCx = (availL + availR) / 2;
  const destCy = t >= availT && btm <= availB ? cy : Math.min(Math.max(cy, availT + th / 2), availB - th / 2);
  for (const a of arts) {
    const box = a.getBoundingClientRect();
    const ex = (box.left + box.right) / 2, ey = (box.top + box.bottom) / 2;
    const nx = destCx + (ex - cx) * s;
    const ny = destCy + (ey - cy) * s;
    a.style.transformBox = 'fill-box';
    a.style.transformOrigin = 'center';
    a.style.transform = `translate(${((nx - ex) / px).toFixed(2)}px, ${((ny - ey) / px).toFixed(2)}px) scale(${s.toFixed(3)})`;
  }
}
function frameClubSign() {
  if (view !== 'gameroom') return;
  const scroll = document.getElementById('grScroll');
  framePlaceArts([...document.querySelectorAll<HTMLElement>('.neonSignArt')], scroll);
}
/** Ranch signs stay painted where they were drawn. The petting-zoo bubble can
 *  slide onto the screen, but it must not land on the kid or pull the barn
 *  banner off the barn. */
function frameRanchSign() {
  if (view !== 'ranch' || inBarn) return;
  document.querySelectorAll<HTMLElement>('.ranchSignArt').forEach(a => { a.style.transform = ''; });
  phoneShowKids();
  keepDoorHintOnScreen();
  settleRanchSigns();
}
/** A sliced banner looks like a second sign hanging off the barn. Show a sign only when the whole of it is in view. */
function settleRanchSigns() {
  if (view !== 'ranch' || inBarn) return;
  const scroll = document.getElementById('ranchScroll');
  if (!scroll) return;
  const port = scroll.getBoundingClientRect();
  document.querySelectorAll<HTMLElement>('.ranchSignArt').forEach(a => {
    const r = a.getBoundingClientRect();
    const edge = Math.min(port.right, innerWidth);
    const cut = Math.max(0, port.left - r.left) + Math.max(0, r.right - edge);
    a.style.visibility = r.width > 20 && cut < 8 ? 'visible' : 'hidden';
  });
}
$('ranchScroll').addEventListener('scroll', () => { if (view === 'ranch' && !inBarn) settleRanchSigns(); }, { passive: true });
function keepDoorHintOnScreen() {
  const hint = document.querySelector<HTMLElement>('.doorHint');
  const scroll = document.getElementById('ranchScroll');
  if (!hint || !scroll) return;
  hint.style.transform = 'translateX(-50%)';
  const port = scroll.getBoundingClientRect();
  const pad = 8;
  const availL = Math.max(port.left, 0) + pad;
  const availR = Math.min(port.right, innerWidth) - pad;
  const availT = Math.max(port.top, 0) + pad;
  const availB = Math.min(port.bottom, innerHeight) - pad;
  const b = hint.getBoundingClientRect();
  let dx = 0;
  if (b.right > availR) dx -= b.right - availR;
  if (b.left + dx < availL) dx += availL - (b.left + dx);
  let dy = 0;
  const kid = scroll.querySelector<HTMLElement>('.savatar');
  if (kid) {
    const kb = kid.getBoundingClientRect();
    const tag = kid.querySelector<HTMLElement>('.nametag');
    const tb = tag?.getBoundingClientRect();
    const hasTag = !!(tb && tb.width > 4 && tb.height > 4);
    const blockTop = hasTag ? Math.min(kb.top, tb!.top) : kb.top;
    const blockL = hasTag ? Math.min(kb.left, tb!.left) : kb.left;
    const blockR = hasTag ? Math.max(kb.right, tb!.right) : kb.right;
    const left = b.left + dx, right = b.right + dx;
    const overlaps = right > blockL - 6 && left < blockR + 6 && b.bottom + dy > blockTop - 6 && b.top < kb.top + kb.height * 0.72;
    if (overlaps) dy += (blockTop - 48) - (b.bottom + dy);
  }
  if (b.top + dy < availT) dy += availT - (b.top + dy);
  // Phone portrait pulls this label left onto the gate, and clearing the nametag
  // then drops it on the rainbow arch. Sit it above the arch instead.
  if (document.body.classList.contains('phone-portrait')) {
    const gate = document.querySelector<HTMLElement>('.ranchSign .ranchSignArt');
    if (gate) {
      const g = gate.getBoundingClientRect();
      const left = b.left + dx, right = b.right + dx, top = b.top + dy, bottom = b.bottom + dy;
      const onGate = g.width > 20 && g.height > g.width * 0.7
        && right > g.left + 4 && left < g.right - 4 && bottom > g.top + 4 && top < g.bottom - 4;
      if (onGate) {
        let lift = (g.top - 16) - bottom;
        if (top + lift < availT) lift += availT - (top + lift);
        const tag = kid?.querySelector<HTMLElement>('.nametag');
        const tb = tag?.getBoundingClientRect();
        const liftedBottom = bottom + lift;
        const clearsTag = !(tb && tb.width > 4 && tb.height > 4
          && liftedBottom > tb.top - 12 && right > tb.left - 6 && left < tb.right + 6);
        if (clearsTag && liftedBottom <= availB) dy += lift;
      }
    }
  }
  if (dx || dy) hint.style.transform = `translate(calc(-50% + ${dx.toFixed(1)}px), ${dy.toFixed(1)}px)`;
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
