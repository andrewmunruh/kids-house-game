import './style.css';
import { createStore, newCharacter, ROOM_W, ROOM_H, V1_OFFSET, MAX_CHARS, type RoomId, type PlacedItem, type GameState, type Character, type Hand, type Action } from './shared/state';
import { HoodClient, houseStore, loadHoodConfig, saveHoodConfig, hoodServerUrl, createNeighborhood, lookupNeighborhood, type HoodConfig } from './net';
import { NICKNAMES, PHRASES, EMOTES, MAX_CHAT, CODE_MAX, ROSTER_SUGGEST, MAX_ROSTER, normCode, validInvite, filterChat, FILTER_MSG, isNear, streetWidth, slotX, cleanLook, type Presence, type Bubble, type Look } from './shared/hood';
import { houseSVG, ICONS, toast, adultCheck } from './hood-ui';
import { initEggs, foundSet, EGGS } from './eggs';
import { ITEMS, ITEM_MAP, svgOf, hOf, type Category, type ItemDef } from './items';
import { PATTERNS_FROM_PACKS, PATTERN_MAP, packLabel } from './packs';
import { characterSVG, SKINS, HAIRS, CLOTHES, HAIR_STYLES, ACCESSORIES, SIZES, SIZE_SCALE, HANDS } from './character';
import { sfx, setSound } from './sound';

// The renderer talks to `store`, which forwards to either the offline localStorage house
// or a neighborhood house (server-authoritative) — same actions, same reducer.
type AnyStore = { get(): GameState; dispatch(a: Action): void; subscribe(l: (s: GameState, a: Action) => void): void };
const local = createStore();
let inner: AnyStore = local;
const storeListeners: ((s: GameState, a: Action) => void)[] = [];
const hooked = new WeakSet<AnyStore>();
function hookStore(st: AnyStore) { if (hooked.has(st)) return; hooked.add(st); st.subscribe((s, a) => { if (inner === st) storeListeners.forEach(l => l(s, a)); }); }
hookStore(local);
const store: AnyStore = { get: () => inner.get(), dispatch: a => inner.dispatch(a), subscribe: l => { storeListeners.push(l); } };
// World is ROOM_W x ROOM_H; the stage shows a VIEW_W-wide window onto it (fits the iPad).
const W = ROOM_W, H = ROOM_H, VIEW_W = 1000, FLOOR_Y = 390;
const MAX_CAM = W - VIEW_W;
const WALL_BOTTOM = 375; // wall items (manifest `wall: true`) snap so they sit on the wall
const snapY = (def: ItemDef, y: number) => def.wall ? Math.min(y, WALL_BOTTOM) : y;
const CHAR_W = 120, CHAR_H = 192;
const ROOMS: { id: RoomId; name: string; color: string }[] = [
  { id: 'living', name: 'Living Room', color: '#ff8fab' },
  { id: 'bedroom', name: 'Bedroom', color: '#b388d6' },
  { id: 'kitchen', name: 'Kitchen', color: '#5cc985' },
  { id: 'salon', name: 'Salon', color: '#f0a0d8' },
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
const ROOM_FILTERS: { id: string; name: string }[] = [{ id: 'all', name: 'All' }, { id: 'living', name: 'Living' }, { id: 'bedroom', name: 'Bed' }, { id: 'kitchen', name: 'Kitchen' }, { id: 'salon', name: 'Salon' }];
for (const it of ITEMS) for (const r of it.rooms ?? []) if (r !== 'any' && !ROOM_FILTERS.some(f => f.id === r)) ROOM_FILTERS.push({ id: r, name: r[0].toUpperCase() + r.slice(1) });
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
  <div class="streetTitle" id="streetTitle">Our Street</div>
  <div class="tools">
    <button class="round hoodOnly" id="btnStreet" aria-label="Go outside">${ICONS.street}</button>
    <button class="round ownOnly" id="btnLock" aria-label="Lock house"></button>
    <button class="round hoodOnly" id="btnChat" aria-label="Talk">${ICONS.chat}</button>
    <button class="round soloOnly" id="btnHood" aria-label="Neighborhood">${ICONS.street}</button>
    <button class="round streetOnly" id="btnParent" aria-label="Grown-ups">${ICONS.shield}</button>
    <button class="round streetOnly" id="btnSolo" aria-label="Play in my own house">${ICONS.solo}</button>
    <button class="round" id="btnPaint" aria-label="Colors">${ICON.paint}</button>
    <button class="round" id="btnDress" aria-label="Characters">${ICON.shirt}</button>
    <button class="round" id="btnSound" aria-label="Sound"></button>
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
  <div class="rooms" id="roomFilter"></div>
  <div class="cats" id="cats"></div>
  <div class="shelf" id="shelf"></div>
</div>
<div class="street hidden" id="street"><div class="streetScroll" id="streetScroll"><div class="streetWorld" id="streetWorld"></div></div></div>
<div class="chatTray hidden" id="chatTray"></div>
<div class="sheet hidden" id="sheet"><div class="card" id="card"></div></div>
<div class="fx" id="fx"></div>`;

const $ = (id: string) => document.getElementById(id)!;
const stage = $('stage'), world = $('world'), layer = $('layer'), toolbar = $('toolbar'), bin = $('bin');
let selected: string | null = null;          // selected room item (UI only)
let activeChar: string | null = store.get().characters[0]?.id ?? null; // character being edited (UI only)
let currentTab = 'furniture';
let roomFilter = 'all';
let uid = Date.now() % 100000;
const newId = (p: string) => `${p}-${Date.now().toString(36)}${(++uid).toString(36)}${Math.random().toString(36).slice(2, 5)}`;
const ME = '__me';
// ---------- neighborhood state (declared early: render functions consult it) ----------
let hood: HoodClient | null = null;
let view: 'house' | 'street' = 'house';
let currentHouseId = '';
let houseStores = new Map<string, ReturnType<typeof houseStore>>();
const avatarEls = new Map<string, HTMLElement>();

// ---------- camera (view-only, not part of game state) ----------
const cams: Record<string, number> = {};
let camX = V1_OFFSET, inertia = 0;
let glideTarget: number | null = null;
const stopGlide = () => { cancelAnimationFrame(inertia); glideTarget = null; };
const clampCam = (x: number) => Math.max(0, Math.min(MAX_CAM, x));
function setCam(x: number) {
  camX = clampCam(x); cams[store.get().currentRoom] = camX;
  world.style.transform = `translate3d(${-camX}px,0,0)`;
  $('nudgeL').classList.toggle('off', camX <= 1);
  $('nudgeR').classList.toggle('off', camX >= MAX_CAM - 1);
  const v = $('mmView'); v.style.left = camX / W * 100 + '%'; v.style.width = VIEW_W / W * 100 + '%';
  if (selected) renderToolbar(store.get());
}
function glideTo(target: number) {
  cancelAnimationFrame(inertia); target = clampCam(target); glideTarget = target;
  const step = () => { const d = target - camX; if (Math.abs(d) < 0.5) { setCam(target); glideTarget = null; return; } setCam(camX + d * 0.18); inertia = requestAnimationFrame(step); };
  inertia = requestAnimationFrame(step);
}
const stageScale = () => stage.getBoundingClientRect().width / VIEW_W;

function fit() {
  const wrap = $('stageWrap');
  const sc = Math.min(wrap.clientWidth / VIEW_W, wrap.clientHeight / H);
  stage.style.transform = `translate(-50%,-50%) scale(${sc})`;
}
window.addEventListener('resize', fit);
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
const cssUrl = (u: string) => `url("${u.replace(/"/g, '%22')}")`;
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
    placeEl(el, it.x, it.y, def.w * it.scale, hOf(def) * it.scale);
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
}

store.subscribe((s, a) => {
  switch (a.type) {
    case 'room/switch': if (hood && inner !== local) moveMeToRoom(a.room); renderAll(); break;
    case 'game/reset': renderAll(); break;
    case 'room/wallpaper': case 'room/floor': case 'room/pattern': case 'room/wallTile': case 'room/floorTile': renderRoomBg(s); break;
    case 'char/update': case 'char/move': renderChars(s); break;
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
      if (moved) sfx.drop(); else sfx.click();
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

function renderDrawer() {
  // the secrets tab lives in the spare slot of the room column so the pack tabs keep their room
  const hasSecrets = tabItems('secrets', 'all').length > 0;
  $('roomFilter').innerHTML = ROOM_FILTERS.map(f => `<button class="rf ${f.id === roomFilter ? 'on' : ''}" data-rf="${f.id}">${f.name}</button>`).join('')
    + (hasSecrets ? `<button class="rf secretTab ${currentTab === 'secrets' ? 'on' : ''}" data-cat="secrets" aria-label="Secrets" title="Secrets">🎁</button>` : '');
  const visible = TABS.filter(t => t.id !== 'secrets' && (t.kind === 'people' || tabItems(t.id, roomFilter).length));
  if (!(currentTab === 'secrets' && hasSecrets) && !visible.some(t => t.id === currentTab)) currentTab = visible[1]?.id ?? '__people';
  $('cats').innerHTML = visible.map(t => `<button class="cat ${t.kind} ${t.id === currentTab ? 'on' : ''}" data-cat="${t.id}" aria-label="${t.name}" title="${t.name}">${t.kind === 'people' ? PEOPLE_ICON : t.kind === 'pack' ? `<span class="packicon">${svgOf(ITEM_MAP[t.icon])}</span><span class="packname">${t.name}</span>` : svgOf(ITEM_MAP[t.icon])}</button>`).join('');
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
  const list = tabItems(currentTab, roomFilter);
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
      <div class="row2"><div><h3>Size</h3><div class="sw">${SIZES.map(z => `<button class="dot sz ${z === c.size ? 'on' : ''}" data-act="size" data-v="${z}"><div style="height:${SIZE_SCALE[z] * 70}%">${characterSVG(c)}</div></button>`).join('')}</div></div>
      <div><h3>Extras</h3><div class="sw">${Array.from({ length: ACCESSORIES }, (_, i) => `<button class="dot hs ${i === c.acc ? 'on' : ''}" data-act="acc" data-v="${i}">${thumb({ acc: i })}</button>`).join('')}</div></div></div>
      <h3>Skin</h3>${swatches(SKINS, c.skin, 'skin')}
      <h3>Hair</h3>${swatches(HAIRS, c.hair, 'hair')}
      <div class="sw" style="margin-top:8px">${Array.from({ length: HAIR_STYLES }, (_, i) => `<button class="dot hs ${i === c.hairStyle ? 'on' : ''}" data-act="hs" data-v="${i}">${thumb({ hairStyle: i, acc: 0 })}</button>`).join('')}</div>
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
  roomFilter = b.dataset.rf!; sfx.click(); renderDrawer();
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
  if (id === ME) { const l = myLook(); if (!l || !hood) return; hood.setLook(cleanLook({ ...l, ...patch })); renderAvatars(); if (view === 'street') renderStreetAvatars(); return; }
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
function showBubble(pid: string, b: Bubble) {
  const el0 = view === 'street' ? document.querySelector<HTMLElement>(`#streetWorld .savatar[data-pid="${pid}"]`) : avatarEls.get(pid);
  const targets = el0 ? [el0] : [];
  for (const el of targets) {
    el.querySelector('.bubble')?.remove();
    const d = document.createElement('div'); d.className = 'bubble' + (b.kind === 'emote' ? ' emote' : '');
    d.textContent = bubbleText(b); el.appendChild(d);
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
  b.toggle('mode-hood', !!hood); b.toggle('view-street', !!hood && view === 'street');
  b.toggle('own-house', own); b.toggle('locked', !!h && !canEdit()); b.toggle('has-hood', !!hoodServerUrl());
  if (h) {
    const owner = hood!.players.get(h.meta.ownerId)?.nickname ?? '';
    $('houseTag').innerHTML = `${h.meta.locked ? '🔒 ' : ''}<b>${esc(h.meta.name)}</b>${own ? ' · yours' : owner ? ' · ' + esc(owner) : ''}`;
    $('btnLock').innerHTML = h.meta.locked ? ICONS.lockOn : ICONS.lockOff;
    $('btnLock').setAttribute('aria-label', h.meta.locked ? 'Unlock house' : 'Lock house');
  }
  updateNear();
}
$('btnLock').addEventListener('click', () => {
  const h = hood?.houses.get(currentHouseId); if (!h || h.meta.ownerId !== hood!.pid) return;
  hood!.lock(h.meta.id, !h.meta.locked); sfx.click(); toast(h.meta.locked ? 'Unlocked: friends can decorate!' : 'Locked: friends can look but not change things');
});

// ---------- street ----------
const STREET_H = 600;
function streetScale() { return $('street').clientHeight / STREET_H; }
function renderStreet() {
  if (!hood) return;
  const houses = [...hood.houses.values()].map(h => h.meta).sort((a, b) => a.slot - b.slot);
  const SW = streetWidth(houses.length), sc = streetScale();
  const world = $('streetWorld');
  world.style.width = SW * sc + 'px'; world.style.height = STREET_H * sc + 'px'; world.style.setProperty('--sc', String(sc));
  const trees = Array.from({ length: Math.ceil(SW / 520) + 1 }, (_, i) => `<div class="tree" style="left:${(i * 520 + 250) * sc}px"></div>`).join('');
  world.innerHTML = `<div class="sky"></div><div class="hill h1"></div><div class="hill h2"></div><div class="lawn"></div><div class="sidewalk"></div><div class="road"><div class="dash"></div></div>${trees}` +
    houses.map(h => {
      const owner = hood!.players.get(h.ownerId);
      const mine = h.ownerId === hood!.pid;
      return `<button class="house ${mine ? 'mine' : ''}" data-hid="${h.id}" style="left:${(slotX(h.slot) - 160) * sc}px;top:${(400 - 300) * sc}px;width:${320 * sc}px;height:${300 * sc}px" aria-label="${esc(h.name)}">
        ${houseSVG(h.style, { lit: !!owner?.online })}${h.locked ? '<span class="lockBadge">🔒</span>' : ''}${mine ? '<span class="homeBadge">★</span>' : ''}</button>
        <div class="sign" style="left:${slotX(h.slot) * sc}px;top:${405 * sc}px">${esc(h.name)}</div>`;
    }).join('') + `<div class="savatars" id="savatars"></div>`;
  renderStreetAvatars();
}
function renderStreetAvatars() {
  if (!hood) return; const box = document.getElementById('savatars'); if (!box) return;
  const sc = streetScale(); const keep = new Set<string>();
  const entries: [string, Presence][] = [...hood.presence.entries()]; const mine = myPres(); if (mine) entries.push([hood.pid, mine]);
  for (const [pid, p] of entries) {
    const pl = hood.players.get(pid); if (!pl || p.where !== 'street') continue;
    keep.add(pid);
    let el = box.querySelector<HTMLElement>(`.savatar[data-pid="${pid}"]`);
    if (!el) { el = document.createElement('div'); el.className = 'savatar ' + (pid === hood.pid ? 'mine' : 'other'); el.dataset.pid = pid; box.appendChild(el); if (pid === hood.pid) attachStreetDrag(el); }
    const key = JSON.stringify(pl.look) + pl.nickname;
    if (el.dataset.look !== key) { const b = el.querySelector('.bubble'); el.innerHTML = avatarHTML(pl.look, pl.nickname); if (b) el.appendChild(b); el.dataset.look = key; }
    const k = (SIZE_SCALE[pl.look.size] ?? 1) * sc * 0.95, w = CHAR_W * k, h = CHAR_H * k;
    el.style.left = p.x * sc - w / 2 + 'px'; el.style.top = p.y * sc - h + 'px'; el.style.width = w + 'px'; el.style.height = h + 'px';
    el.style.zIndex = String(100 + Math.round(p.y)); el.classList.toggle('flipped', p.flip);
  }
  box.querySelectorAll<HTMLElement>('.savatar').forEach(el => { if (!keep.has(el.dataset.pid!)) el.remove(); });
  updateNear();
}
function attachStreetDrag(el: HTMLElement) {
  el.addEventListener('pointerdown', e => {
    e.preventDefault(); e.stopPropagation(); const p0 = myPres(); if (!p0 || p0.where !== 'street' || !hood) return;
    const scroll = $('streetScroll'); const sc = streetScale();
    const toW = (ev: PointerEvent) => { const r = $('streetWorld').getBoundingClientRect(); return { x: (ev.clientX - r.left) / sc, y: (ev.clientY - r.top) / sc }; };
    const q0 = toW(e), off = { x: p0.x - q0.x, y: p0.y - q0.y }; let last = e, raf = 0, lastX = p0.x;
    const SW = streetWidth(hood.houses.size);
    const apply = (ev: PointerEvent) => {
      const q = toW(ev), cur = myPres(); if (!cur) return;
      const x = Math.max(60, Math.min(SW - 60, q.x + off.x)), y = Math.max(470, Math.min(590, q.y + off.y));
      const flip = Math.abs(x - lastX) > 3 ? x < lastX : cur.flip; if (Math.abs(x - lastX) > 3) lastX = x;
      setMyPres({ where: 'street', x, y, flip }); renderStreetAvatars();
    };
    const tick = () => { const r = scroll.getBoundingClientRect(); const v = last.clientX < r.left + 70 ? -10 : last.clientX > r.right - 70 ? 10 : 0; if (v) { scroll.scrollLeft += v; apply(last); } raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); el.classList.add('lifted'); sfx.pick();
    const move = (ev: PointerEvent) => { if (ev.pointerId !== e.pointerId) return; last = ev; apply(ev); };
    const up = (ev: PointerEvent) => { if (ev.pointerId !== e.pointerId) return; cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); el.classList.remove('lifted'); sfx.drop(); };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  });
}
$('streetWorld').addEventListener('click', e => {
  const hb = (e.target as HTMLElement).closest<HTMLElement>('.house'); if (hb) enterHouse(hb.dataset.hid!);
});
function goStreet() {
  if (!hood) return;
  const from = hood.houses.get(currentHouseId)?.meta ?? hood.houses.get(hood.myHouseId())?.meta;
  const x = from ? slotX(from.slot) + 205 : 600; // stand beside the door, clear of the name sign
  setMyPres({ where: 'street', x, y: 540, flip: false });
  view = 'street'; $('street').classList.remove('hidden'); $('chatTray').classList.add('hidden');
  renderHoodChrome(); renderStreet();
  requestAnimationFrame(() => { const sc = streetScale(); $('streetScroll').scrollLeft = x * sc - $('streetScroll').clientWidth / 2; });
  sfx.swish();
}
function enterHouse(houseId: string) {
  if (!hood || !hood.houses.has(houseId)) return;
  currentHouseId = houseId; view = 'house';
  let st = houseStores.get(houseId);
  if (!st) { st = houseStore(hood, houseId, { get: () => local.get().soundOn, set: on => local.dispatch({ type: 'settings/sound', on }) }); houseStores.set(houseId, st); }
  st.dispatch({ type: 'room/switch', room: 'living' });
  setMyPres({ where: 'house', houseId, room: 'living', x: 900 + Math.random() * 300, y: 540, flip: false });
  $('street').classList.add('hidden'); $('chatTray').classList.add('hidden');
  useStore(st); sfx.sparkle();
}
function goSolo() {
  hood?.close(); hood = null; houseStores = new Map(); view = 'house'; currentHouseId = '';
  $('street').classList.add('hidden'); $('chatTray').classList.add('hidden');
  useStore(local); renderHoodChrome();
}
$('btnStreet').addEventListener('click', () => goStreet());
$('btnSolo').addEventListener('click', () => { goSolo(); toast('Playing in your own house 🏠'); });
window.addEventListener('resize', () => { if (view === 'street' && hood) renderStreet(); });

// ---------- connecting ----------
function enterNeighborhood(client: HoodClient) {
  hood = client; houseStores = new Map();
  client.on('players', () => { if (hood !== client) return; if (view === 'street') renderStreet(); else { renderAvatars(); renderHoodChrome(); } if (sheetMode === 'dress') renderSheet(); });
  client.on('houses', () => {
    if (hood !== client) return;
    if (view === 'street') renderStreet();
    else if (!client.houses.has(currentHouseId)) { toast('That house is gone now'); goStreet(); }
  });
  client.on('houseMeta', (id: string) => { if (hood !== client || id !== currentHouseId || view !== 'house') return; selected = null; renderHoodChrome(); renderItems(store.get()); renderDrawer(); if (!canEdit()) $('sheet').classList.add('hidden'); });
  client.on('pres', () => { if (hood !== client) return; view === 'street' ? renderStreetAvatars() : renderAvatars(); });
  client.on('bubble', (pid: string, b: Bubble) => { if (hood === client) showBubble(pid, b); });
  client.on('sayFail', (r: string) => toast(r === 'presetsOnly' ? 'Typing is turned off: pick a bubble!' : FILTER_MSG[r] || "Couldn't send that"));
  client.on('settings', () => { if (!$('chatTray').classList.contains('hidden')) renderChatTray(); });
  client.on('removed', () => { toast('A grown-up took this iPad off the street'); const c = client.cfg; saveHoodConfig({ url: c.url, code: c.code, id: c.id, parentKey: c.parentKey }); goSolo(); });
  client.on('status', (st: string) => document.body.classList.toggle('reconnecting', hood === client && st !== 'online'));
  client.on('welcome', () => { if (hood !== client) return; if (view === 'street') renderStreet(); else if (client.houses.has(currentHouseId)) renderAll(); else goStreet(); });
  goStreet();
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
  const c = new HoodClient(cfg); const r = await c.connect({ nickname, look, house });
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
(window as any).__hood = () => hood;
(window as any).__hood_url = () => hoodServerUrl();
(window as any).__ui = () => ({ view, currentHouseId, mode: hood ? 'hood' : 'solo' });

// ---------- start ----------
renderAll(); renderDrawer(); fit(); requestAnimationFrame(fit);
// ---------- hidden surprises ----------
const renderSecrets = () => { $('secrets').textContent = `Secrets found: ${foundSet().size}/${EGGS.length}`; };
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
