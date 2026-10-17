import './style.css';
import { createStore, ROOM_W, ROOM_H, V1_OFFSET, type RoomId, type PlacedItem, type GameState } from './state';
import { ITEMS, ITEM_MAP, svgOf, type Category } from './items';
import { characterSVG, SKINS, HAIRS, CLOTHES, HAIR_STYLES } from './character';
import { sfx, setSound } from './sound';

const store = createStore();
// World is ROOM_W x ROOM_H; the stage shows a VIEW_W-wide window onto it (fits the iPad).
const W = ROOM_W, H = ROOM_H, VIEW_W = 1000, FLOOR_Y = 390;
const MAX_CAM = W - VIEW_W;
const ROOMS: { id: RoomId; name: string; color: string }[] = [
  { id: 'living', name: 'Living Room', color: '#ff8fab' },
  { id: 'bedroom', name: 'Bedroom', color: '#b388d6' },
  { id: 'kitchen', name: 'Kitchen', color: '#5cc985' },
];
const BASE_CATS: { id: Category; name: string; icon: string }[] = [
  { id: 'furniture', name: 'Furniture', icon: 'armchair' },
  { id: 'decor', name: 'Decor', icon: 'balloon' },
  { id: 'plants', name: 'Plants', icon: 'flowers' },
  { id: 'food', name: 'Food', icon: 'donut' },
  { id: 'pets', name: 'Pets', icon: 'cat' },
];
// Pack items may introduce new categories / rooms.
const CATS = [...BASE_CATS];
for (const it of ITEMS) if (!CATS.some(c => c.id === it.cat)) CATS.push({ id: it.cat, name: it.cat, icon: it.kind });
const ROOM_FILTERS: { id: string; name: string }[] = [{ id: 'all', name: 'All' }, { id: 'living', name: 'Living' }, { id: 'bedroom', name: 'Bed' }, { id: 'kitchen', name: 'Kitchen' }];
for (const it of ITEMS) for (const r of it.rooms ?? []) if (r !== 'any' && !ROOM_FILTERS.some(f => f.id === r)) ROOM_FILTERS.push({ id: r, name: r[0].toUpperCase() + r.slice(1) });
const matchesRoom = (rooms: string[] | undefined, f: string) => f === 'all' || !rooms || rooms.includes('any') || rooms.includes(f);
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

// ---------- DOM skeleton ----------
const app = document.getElementById('app')!;
app.innerHTML = `
<div class="top">
  <div class="tabs" id="tabs"></div>
  <div class="minimap" id="minimap" aria-label="Room map"><div class="mmWall" id="mmWall"></div><div class="mmFloor" id="mmFloor"></div><div id="mmDots"></div><div class="mmView" id="mmView"></div></div>
  <div class="tools">
    <button class="round" id="btnPaint" aria-label="Colors">${ICON.paint}</button>
    <button class="round" id="btnDress" aria-label="Dress up">${ICON.shirt}</button>
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
</div>
<div class="drawer">
  <div class="rooms" id="roomFilter"></div>
  <div class="cats" id="cats"></div>
  <div class="shelf" id="shelf"></div>
</div>
<div class="sheet hidden" id="sheet"><div class="card" id="card"></div></div>
<div class="fx" id="fx"></div>`;

const $ = (id: string) => document.getElementById(id)!;
const stage = $('stage'), world = $('world'), layer = $('layer'), toolbar = $('toolbar'), bin = $('bin');
let selected: string | null = null;
let currentCat: Category = 'furniture';
let roomFilter = 'all';

// ---------- camera (view-only, not part of game state) ----------
const cams: Record<string, number> = {};
let camX = V1_OFFSET;
let inertia = 0;
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
let glideTarget: number | null = null;
function glideTo(target: number) {
  cancelAnimationFrame(inertia); target = clampCam(target); glideTarget = target;
  const step = () => { const d = target - camX; if (Math.abs(d) < 0.5) { setCam(target); glideTarget = null; return; } setCam(camX + d * 0.18); inertia = requestAnimationFrame(step); };
  inertia = requestAnimationFrame(step);
}
const stageScale = () => stage.getBoundingClientRect().width / VIEW_W;

// ---------- scaling ----------
function fit() {
  const wrap = $('stageWrap');
  const sc = Math.min(wrap.clientWidth / VIEW_W, wrap.clientHeight / H);
  stage.style.transform = `translate(-50%,-50%) scale(${sc})`;
}
window.addEventListener('resize', fit);
const toRoom = (cx: number, cy: number) => {
  const r = stage.getBoundingClientRect();
  return { x: (cx - r.left) / r.width * VIEW_W + camX, y: (cy - r.top) / r.height * H };
};
const inStage = (cx: number, cy: number) => { const r = stage.getBoundingClientRect(); return cx > r.left && cx < r.right && cy > r.top && cy < r.bottom; };
const overBin = (cx: number, cy: number) => { const r = bin.getBoundingClientRect(); return cx > r.left - 20 && cx < r.right + 20 && cy > r.top - 20 && cy < r.bottom + 20; };

// ---------- render ----------
const PATTERNS = [
  'none',
  'radial-gradient(circle, rgba(255,255,255,.55) 7px, transparent 8px)',
  'repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 26px, transparent 26px 52px)',
  'linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%), linear-gradient(45deg, rgba(255,255,255,.35) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.35) 75%)',
];
function renderRoomBg(s: GameState) {
  const room = s.rooms[s.currentRoom];
  const wall = $('wall');
  wall.style.backgroundColor = room.wallpaper;
  wall.style.backgroundImage = PATTERNS[room.pattern] ?? 'none';
  wall.style.backgroundSize = room.pattern === 1 ? '44px 44px' : room.pattern === 3 ? '60px 60px' : 'auto';
  wall.style.backgroundPosition = room.pattern === 3 ? '0 0, 30px 30px' : '0 0';
  $('floor').style.backgroundColor = room.floor;
  $('mmWall').style.background = room.wallpaper; $('mmFloor').style.background = room.floor;
}
function renderMinimap(s: GameState) {
  const room = s.rooms[s.currentRoom];
  const dots = room.items.filter(i => ITEM_MAP[i.kind]).map(i => `<i style="left:${i.x / W * 100}%;top:${(i.y - ITEM_MAP[i.kind].w * i.scale / 2) / H * 100}%"></i>`).join('');
  const c = s.character; const me = c.room === s.currentRoom ? `<b style="left:${c.x / W * 100}%;top:${(c.y - 90) / H * 100}%"></b>` : '';
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
    const def = ITEM_MAP[it.kind]; if (!def) continue;
    seen.add(it.id);
    let el = layer.querySelector<HTMLElement>(`[data-id="${it.id}"]`);
    if (!el) {
      el = document.createElement('div');
      el.className = 'item'; el.dataset.id = it.id;
      el.innerHTML = `<div class="inner">${svgOf(def)}</div>`;
      layer.appendChild(el);
      attachItemDrag(el);
    }
    const w = def.w * it.scale;
    placeEl(el, it.x, it.y, w, w);
    el.style.zIndex = String(1000 + it.z);
    el.classList.toggle('flipped', it.flip);
    el.classList.toggle('sel', selected === it.id);
  }
  layer.querySelectorAll<HTMLElement>('.item').forEach(el => { if (!seen.has(el.dataset.id!)) el.remove(); });
  renderToolbar(s); renderMinimap(s);
}

let charEl: HTMLElement | null = null;
const CHAR_W = 120, CHAR_H = 192;
function renderChar(s: GameState) {
  const c = s.character;
  if (c.room !== s.currentRoom) { charEl?.remove(); charEl = null; return; }
  if (!charEl) {
    charEl = document.createElement('div');
    charEl.className = 'char';
    charEl.innerHTML = `<div class="inner"></div>`;
    layer.appendChild(charEl);
    attachCharDrag(charEl);
  }
  charEl.querySelector('.inner')!.innerHTML = characterSVG(c);
  placeEl(charEl, c.x, c.y, CHAR_W, CHAR_H);
  charEl.style.zIndex = '5000';
  charEl.classList.toggle('flipped', c.flip);
  renderMinimap(s);
}

function renderToolbar(s: GameState) {
  const it = selected && s.rooms[s.currentRoom].items.find(i => i.id === selected);
  if (!it) { toolbar.classList.add('hidden'); return; }
  const def = ITEM_MAP[it.kind];
  const top = it.y - def.w * it.scale - 20;
  toolbar.classList.remove('hidden');
  toolbar.style.left = Math.max(camX + 130, Math.min(camX + VIEW_W - 130, it.x)) / W * 100 + '%';
  toolbar.style.top = Math.max(40, top) / H * 100 + '%';
}

function renderSoundBtn(s: GameState) { $('btnSound').innerHTML = s.soundOn ? ICON.soundOn : ICON.soundOff; setSound(s.soundOn); }

function renderAll() {
  const s = store.get();
  layer.innerHTML = ''; charEl = null;
  renderTabs(s); renderRoomBg(s); renderItems(s); renderChar(s); renderSoundBtn(s);
  stopGlide(); setCam(cams[s.currentRoom] ?? clampCam(s.character.room === s.currentRoom ? s.character.x - VIEW_W / 2 : V1_OFFSET));
}

store.subscribe((s, a) => {
  switch (a.type) {
    case 'room/switch': case 'game/reset': renderAll(); break;
    case 'room/wallpaper': case 'room/floor': case 'room/pattern': renderRoomBg(s); break;
    case 'char/update': case 'char/move': renderChar(s); break;
    case 'settings/sound': renderSoundBtn(s); break;
    default: renderItems(s);
  }
});

// ---------- effects ----------
function bounce(el: Element | null) { if (!el) return; const i = el.querySelector('.inner') ?? el; i.classList.remove('bounce'); void (i as HTMLElement).offsetWidth; i.classList.add('bounce'); }
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
function poof(cx: number, cy: number) { sparkles(cx, cy, 10); sfx.pop(); }

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

function attachItemDrag(el: HTMLElement) {
  el.addEventListener('pointerdown', e => {
    e.preventDefault(); e.stopPropagation();
    if (twoFinger) return;
    const s = store.get(); const room = s.currentRoom;
    const id = el.dataset.id!; const it = s.rooms[room].items.find(i => i.id === id); if (!it) return;
    const p0 = toRoom(e.clientX, e.clientY); const off = { x: it.x - p0.x, y: it.y - p0.y };
    let moved = false;
    selected = id; store.dispatch({ type: 'item/front', room, id });
    el.classList.add('lifted'); sfx.pick();
    startDrag(e, {
      onMove(ev) {
        const p = toRoom(ev.clientX, ev.clientY);
        if (Math.hypot(p.x - p0.x, p.y - p0.y) > 6) { moved = true; toolbar.classList.add('hidden'); bin.classList.add('show'); }
        bin.classList.toggle('hot', overBin(ev.clientX, ev.clientY));
        const half = ITEM_MAP[it.kind].w * it.scale / 2;
        store.dispatch({ type: 'item/move', room, id, x: Math.max(half * .6, Math.min(W - half * .6, p.x + off.x)), y: p.y + off.y });
        if (moved) toolbar.classList.add('hidden');
      },
      onUp(ev) {
        el.classList.remove('lifted'); bin.classList.remove('show', 'hot');
        if (moved && overBin(ev.clientX, ev.clientY)) { selected = null; store.dispatch({ type: 'item/delete', room, id }); poof(ev.clientX, ev.clientY); return; }
        if (moved) sfx.drop(); else sfx.click();
        bounce(el); renderItems(store.get());
      },
    });
  });
}

function attachCharDrag(el: HTMLElement) {
  el.addEventListener('pointerdown', e => {
    e.preventDefault(); e.stopPropagation();
    if (twoFinger) return;
    selected = null; renderItems(store.get());
    const s = store.get(); const c = s.character;
    const p0 = toRoom(e.clientX, e.clientY); const off = { x: c.x - p0.x, y: c.y - p0.y };
    let lastX = c.x;
    el.classList.add('lifted'); sfx.pick();
    startDrag(e, {
      onMove(ev) {
        const p = toRoom(ev.clientX, ev.clientY); const nx = p.x + off.x;
        if (Math.abs(nx - lastX) > 3) { const flip = nx < lastX; if (flip !== store.get().character.flip) store.dispatch({ type: 'char/update', patch: { flip } }); lastX = nx; }
        store.dispatch({ type: 'char/move', room: s.currentRoom, x: nx, y: Math.max(FLOOR_Y + 40, p.y + off.y) });
      },
      onUp() { el.classList.remove('lifted'); sfx.drop(); bounce(el); },
    });
  });
}

// Drawer -> room
let uid = Date.now() % 100000;
function attachShelfDrag(btn: HTMLElement, kind: string) {
  btn.addEventListener('pointerdown', e => {
    e.preventDefault();
    const def = ITEM_MAP[kind];
    const ghost = document.createElement('div'); ghost.className = 'ghost'; ghost.innerHTML = svgOf(def);
    document.body.appendChild(ghost);
    const sc = stageScale(); const gw = Math.max(60, def.w * sc);
    ghost.style.width = ghost.style.height = gw + 'px';
    const pos = (ev: PointerEvent) => { ghost.style.left = ev.clientX - gw / 2 + 'px'; ghost.style.top = ev.clientY - gw * .8 + 'px'; };
    pos(e); sfx.pick(); btn.classList.add('pressed');
    const sx = e.clientX, sy = e.clientY;
    startDrag(e, {
      onMove: pos,
      onUp(ev) {
        ghost.remove(); btn.classList.remove('pressed');
        const s = store.get(); const room = s.currentRoom;
        const tapped = Math.hypot(ev.clientX - sx, ev.clientY - sy) < 8;
        let x: number, y: number;
        if (tapped) { x = camX + 380 + Math.random() * 240; y = def.wall ? 260 : 500 + Math.random() * 40; }
        else if (inStage(ev.clientX, ev.clientY)) { const p = toRoom(ev.clientX, ev.clientY); x = p.x; y = p.y + def.w * .3; }
        else return;
        const item: PlacedItem = { id: `${kind}-${++uid}`, kind, x, y, flip: false, z: 0, scale: 1 };
        selected = item.id;
        store.dispatch({ type: 'item/add', room, item });
        const el = layer.querySelector(`[data-id="${item.id}"]`); bounce(el);
        const r = el?.getBoundingClientRect(); if (r) sparkles(r.left + r.width / 2, r.top + r.height / 2);
        sfx.sparkle();
      },
    });
  });
}

function renderDrawer() {
  $('roomFilter').innerHTML = ROOM_FILTERS.map(f => `<button class="rf ${f.id === roomFilter ? 'on' : ''}" data-rf="${f.id}">${f.name}</button>`).join('');
  const visibleCats = CATS.filter(c => ITEMS.some(i => i.cat === c.id && matchesRoom(i.rooms, roomFilter)));
  if (!visibleCats.some(c => c.id === currentCat) && visibleCats.length) currentCat = visibleCats[0].id;
  $('cats').innerHTML = visibleCats.map(c => `<button class="cat ${c.id === currentCat ? 'on' : ''}" data-cat="${c.id}" aria-label="${c.name}">${svgOf(ITEM_MAP[c.icon])}</button>`).join('');
  const shelf = $('shelf'); shelf.innerHTML = '';
  const list = ITEMS.filter(i => i.cat === currentCat && matchesRoom(i.rooms, roomFilter));
  if (!list.length) shelf.innerHTML = `<div class="empty">Nothing here yet!</div>`;
  for (const d of list) {
    const b = document.createElement('button'); b.className = 'thing'; b.setAttribute('aria-label', d.name);
    b.innerHTML = svgOf(d); shelf.appendChild(b); attachShelfDrag(b, d.kind);
  }
  shelf.scrollLeft = 0;
}

// ---------- panels ----------
function swatches(list: string[], cur: string, act: string) {
  return `<div class="sw">${list.map(c => `<button class="dot ${c === cur ? 'on' : ''}" style="background:${c}" data-act="${act}" data-v="${c}"></button>`).join('')}</div>`;
}
let sheetMode: 'paint' | 'dress' | null = null;
function renderSheet() {
  const s = store.get(); const card = $('card');
  if (sheetMode === 'paint') {
    const r = s.rooms[s.currentRoom];
    card.innerHTML = `<button class="close" data-act="close">✕</button><h2>Paint the room</h2>
      <h3>Walls</h3>${swatches(WALLS, r.wallpaper, 'wall')}
      <h3>Pattern</h3><div class="sw">${PATTERNS.map((p, i) => `<button class="dot pat ${i === r.pattern ? 'on' : ''}" data-act="pat" data-v="${i}" style="background-color:${r.wallpaper};background-image:${p};background-size:${i === 1 ? '16px 16px' : i === 3 ? '20px 20px' : 'auto'}"></button>`).join('')}</div>
      <h3>Floor</h3>${swatches(FLOORS, r.floor, 'floor')}`;
  } else if (sheetMode === 'dress') {
    const c = s.character;
    card.innerHTML = `<button class="close" data-act="close">✕</button><div class="dress"><div class="preview">${characterSVG(c)}</div><div class="opts">
      <h3>Skin</h3>${swatches(SKINS, c.skin, 'skin')}
      <h3>Hair</h3>${swatches(HAIRS, c.hair, 'hair')}
      <div class="sw">${Array.from({ length: HAIR_STYLES }, (_, i) => `<button class="dot hs ${i === c.hairStyle ? 'on' : ''}" data-act="hs" data-v="${i}">${characterSVG({ ...c, hairStyle: i }).replace('<svg ', '<svg preserveAspectRatio="xMidYMin slice" ')}</button>`).join('')}</div>
      <h3>Shirt</h3>${swatches(CLOTHES, c.shirt, 'shirt')}
      <h3>Pants</h3>${swatches(CLOTHES, c.pants, 'pants')}</div></div>`;
  }
}
function openSheet(m: 'paint' | 'dress') { sheetMode = m; renderSheet(); $('sheet').classList.remove('hidden'); sfx.swish(); }
$('sheet').addEventListener('click', e => {
  const t = (e.target as HTMLElement).closest<HTMLElement>('[data-act]');
  if (e.target === $('sheet') || t?.dataset.act === 'close') { $('sheet').classList.add('hidden'); sheetMode = null; sfx.click(); return; }
  if (!t) return;
  const s = store.get(), room = s.currentRoom, v = t.dataset.v!;
  switch (t.dataset.act) {
    case 'wall': store.dispatch({ type: 'room/wallpaper', room, color: v }); break;
    case 'floor': store.dispatch({ type: 'room/floor', room, color: v }); break;
    case 'pat': store.dispatch({ type: 'room/pattern', room, pattern: +v }); break;
    case 'skin': store.dispatch({ type: 'char/update', patch: { skin: v } }); break;
    case 'hair': store.dispatch({ type: 'char/update', patch: { hair: v } }); break;
    case 'hs': store.dispatch({ type: 'char/update', patch: { hairStyle: +v } }); break;
    case 'shirt': store.dispatch({ type: 'char/update', patch: { shirt: v } }); break;
    case 'pants': store.dispatch({ type: 'char/update', patch: { pants: v } }); break;
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
  // bring the character along to the new room
  const c = store.get().character; store.dispatch({ type: 'char/move', room, x: c.x, y: c.y });
});
$('cats').addEventListener('click', e => {
  const b = (e.target as HTMLElement).closest<HTMLElement>('[data-cat]'); if (!b) return;
  currentCat = b.dataset.cat as Category; sfx.click(); renderDrawer();
});
$('roomFilter').addEventListener('click', e => {
  const b = (e.target as HTMLElement).closest<HTMLElement>('[data-rf]'); if (!b) return;
  roomFilter = b.dataset.rf!; sfx.click(); renderDrawer();
});
toolbar.addEventListener('pointerdown', e => e.stopPropagation());
toolbar.addEventListener('click', e => {
  const b = (e.target as HTMLElement).closest<HTMLElement>('[data-a]'); if (!b || !selected) return;
  const room = store.get().currentRoom, id = selected, el = layer.querySelector(`[data-id="${id}"]`);
  switch (b.dataset.a) {
    case 'flip': store.dispatch({ type: 'item/flip', room, id }); sfx.swish(); bounce(el); break;
    case 'front': store.dispatch({ type: 'item/front', room, id }); sfx.click(); bounce(el); break;
    case 'back': store.dispatch({ type: 'item/back', room, id }); sfx.click(); bounce(el); break;
    case 'delete': { const r = el?.getBoundingClientRect(); selected = null; store.dispatch({ type: 'item/delete', room, id }); if (r) poof(r.left + r.width / 2, r.top + r.height / 2); break; }
  }
});
// One finger on empty wall/floor pans the room (with a little momentum); a tap deselects.
stage.addEventListener('pointerdown', e => {
  if ((e.target as HTMLElement).closest('.nudge,.minimap')) return;
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
      let v = -vx * 16 / stageScale(); // units per frame
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
$('btnPaint').addEventListener('click', () => openSheet('paint'));
$('btnDress').addEventListener('click', () => openSheet('dress'));
$('btnSound').addEventListener('click', () => { store.dispatch({ type: 'settings/sound', on: !store.get().soundOn }); sfx.click(); });
document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('contextmenu', e => e.preventDefault());

renderAll(); renderDrawer(); fit(); requestAnimationFrame(fit);
if ('serviceWorker' in navigator && import.meta.env.PROD) navigator.serviceWorker.register(import.meta.env.BASE_URL + 'sw.js');
(window as any).__store = store; // handy for debugging / tests
(window as any).__cam = { get: () => camX, set: setCam };
