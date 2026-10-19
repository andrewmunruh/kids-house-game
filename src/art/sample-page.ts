// Standalone before/after board. The game catalog does not load this file.
import { ITEMS, ITEM_MAP, hOf, svgOf } from '../items';
import { setArtV2 } from './flag';
import { ART_ROOMS, artV2Markup, loadArtRooms } from './catalog';

const ROOM_H = 600;

interface Spot { kind: string; x: number; y: number; z: number }

// Wider than the portrait camera so each piece has a gap. Same spots for before and after.
const LIVING_W = 1120;
const LIVING: Spot[] = [
  { kind: 'rug', x: 520, y: 548, z: 0 },
  { kind: 'window', x: 500, y: 200, z: 2 },
  { kind: 'bookshelf', x: 150, y: 488, z: 3 },
  { kind: 'lamp', x: 320, y: 478, z: 4 },
  { kind: 'sofa', x: 560, y: 492, z: 5 },
  { kind: 'table', x: 860, y: 528, z: 6 },
  { kind: 'plant', x: 1040, y: 500, z: 7 },
];

const BED_W = 1000;
const BEDROOM: Spot[] = [
  { kind: 'window', x: 430, y: 186, z: 2 },
  { kind: 'lamp', x: 130, y: 478, z: 3 },
  { kind: 'bed', x: 430, y: 500, z: 4 },
  { kind: 'teddy', x: 680, y: 540, z: 5 },
  { kind: 'pack:wardrobe', x: 870, y: 492, z: 6 },
];

const KITCHEN_W = 1120;
const KITCHEN: Spot[] = [
  { kind: 'fridge', x: 160, y: 490, z: 2 },
  { kind: 'stove', x: 420, y: 490, z: 3 },
  { kind: 'table', x: 720, y: 530, z: 4 },
  { kind: 'chair', x: 560, y: 520, z: 5 },
  { kind: 'chair', x: 900, y: 520, z: 6 },
  { kind: 'cake', x: 700, y: 400, z: 7 },
  { kind: 'juice', x: 780, y: 400, z: 8 },
  { kind: 'plant', x: 1060, y: 500, z: 9 },
];

const SALON_W = 1120;
const SALON: Spot[] = [
  { kind: 'rug', x: 520, y: 548, z: 0 },
  { kind: 'mirror', x: 500, y: 180, z: 2 },
  { kind: 'vanity', x: 500, y: 490, z: 3 },
  { kind: 'stool', x: 500, y: 560, z: 6 },
  { kind: 'perfume', x: 390, y: 360, z: 5 },
  { kind: 'lamp', x: 180, y: 480, z: 4 },
  { kind: 'flowers', x: 860, y: 500, z: 7 },
  { kind: 'hairdryer', x: 700, y: 500, z: 8 },
];

const NURSERY_W = 1000;
const NURSERY: Spot[] = [
  { kind: 'cloud-rug', x: 480, y: 548, z: 0 },
  { kind: 'crib-mobile', x: 430, y: 170, z: 2 },
  { kind: 'crib', x: 430, y: 500, z: 3 },
  { kind: 'rocker', x: 780, y: 510, z: 4 },
];

const YARD_W = 1200;
const YARD: Spot[] = [
  { kind: 'pack:apple-tree', x: 180, y: 500, z: 2 },
  { kind: 'pack:mini-greenhouse', x: 460, y: 500, z: 3 },
  { kind: 'pack:fire-pit', x: 740, y: 530, z: 4 },
  { kind: 'pack:picnic-basket', x: 940, y: 540, z: 5 },
  { kind: 'pack:sale-sign', x: 1100, y: 500, z: 6 },
];

const STAGES: Record<string, { w: number; spots: Spot[]; wall: string; floor: string; pattern: 'dots' | 'stripes'; title: string }> = {
  living: { w: LIVING_W, spots: LIVING, wall: '#ffd6e0', floor: '#e8b98a', pattern: 'dots', title: 'Living room' },
  bedroom: { w: BED_W, spots: BEDROOM, wall: '#d9ccff', floor: '#f2d0a4', pattern: 'stripes', title: 'Bedroom' },
  kitchen: { w: KITCHEN_W, spots: KITCHEN, wall: '#cdf3dc', floor: '#ffe7a8', pattern: 'dots', title: 'Kitchen' },
  salon: { w: SALON_W, spots: SALON, wall: '#ffe0f0', floor: '#f6d6ff', pattern: 'stripes', title: 'Salon' },
  nursery: { w: NURSERY_W, spots: NURSERY, wall: '#d6f3ff', floor: '#f3ddc4', pattern: 'dots', title: 'Nursery' },
  backyard: { w: YARD_W, spots: YARD, wall: '#c5ecff', floor: '#b6e3a8', pattern: 'stripes', title: 'Backyard' },
};

function draw(kind: string, v2: boolean): string {
  const before = ITEM_MAP[kind]?.svg;
  setArtV2(v2);
  const html = svgOf(ITEM_MAP[kind]);
  setArtV2(false);
  if (ITEM_MAP[kind].svg !== before) throw new Error('sample mutated ' + kind);
  return html;
}

function kindsFor(room: string): string[] {
  const out: string[] = [];
  for (let i = 0; i < ITEMS.length; i++) {
    const it = ITEMS[i];
    if (it.cat === 'pets') continue;
    const rooms = it.rooms || [];
    if (room === 'ranch') { if (it.cat === 'ranch') out.push(it.kind); continue; }
    if (room === 'any') { if (rooms.length === 1 && rooms[0] === 'any' && it.cat !== 'ranch') out.push(it.kind); continue; }
    if (rooms.indexOf(room) >= 0) out.push(it.kind);
  }
  return out;
}

function card(kind: string): string {
  const d = ITEM_MAP[kind];
  setArtV2(true);
  const mark = artV2Markup(kind);
  setArtV2(false);
  return `<article class="card">
    <h2>${d.name}</h2>
    <p class="kind">${kind}${mark ? ' · ' + mark.vb : ''}</p>
    <div class="pair">
      <figure class="before"><div class="art">${draw(kind, false)}</div><figcaption>Before</figcaption></figure>
      <figure class="after"><div class="art">${draw(kind, true)}</div><figcaption>After</figcaption></figure>
    </div>
  </article>`;
}

function sheet(night: boolean, room: string): void {
  const kinds = room === 'sample' ? ['sofa', 'bed', 'fridge', 'lamp', 'bookshelf', 'rug', 'plant', 'table', 'pack:wardrobe', 'teddy', 'window', 'crib'] : kindsFor(room);
  const root = document.getElementById('app')!;
  root.innerHTML = `<div id="sheet" class="${night ? 'night' : ''}">
    <header>
      <h1>${room} · before / after</h1>
      <p class="sub">${night ? 'After column under a light indigo tint, so night can still read the shapes.' : kinds.length + ' pieces. Same ids and footprints. ?art=v1 draws the old set.'}</p>
    </header>
    <div class="grid">${kinds.map(card).join('')}</div>
  </div>`;
}

function mountWorld(frame: HTMLElement, spots: Spot[], v2: boolean, wall: string, floor: string, pattern: 'dots' | 'stripes', viewW: number): void {
  frame.dataset.viewW = String(viewW);
  const world = document.createElement('div');
  world.className = 'world';
  world.innerHTML = `<div class="wall ${pattern}" style="background-color:${wall}"></div><div class="floor" style="background-color:${floor}"></div><div class="baseboard"></div><div class="layer"></div>`;
  const layer = world.querySelector('.layer')!;
  const ordered = spots.slice().sort((a, b) => a.z - b.z);
  for (let i = 0; i < ordered.length; i++) {
    const s = ordered[i];
    const d = ITEM_MAP[s.kind];
    const w = d.w;
    const h = hOf(d);
    const el = document.createElement('div');
    el.className = 'piece';
    el.style.left = (s.x - w / 2) / viewW * 100 + '%';
    el.style.top = (s.y - h) / ROOM_H * 100 + '%';
    el.style.width = w / viewW * 100 + '%';
    el.style.height = h / ROOM_H * 100 + '%';
    el.style.zIndex = String(s.z);
    el.innerHTML = draw(s.kind, v2);
    layer.appendChild(el);
  }
  const scaler = document.createElement('div');
  scaler.className = 'scaler';
  scaler.appendChild(world);
  frame.appendChild(scaler);
}

function fitFrames(): void {
  const frames = document.querySelectorAll<HTMLElement>('.frame');
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const world = frame.querySelector<HTMLElement>('.world');
    const scaler = frame.querySelector<HTMLElement>('.scaler');
    if (!world || !scaler) continue;
    const viewW = Number(frame.dataset.viewW);
    const innerW = frame.clientWidth;
    if (innerW < 20) continue;
    const scale = innerW / viewW;
    const innerH = Math.round(ROOM_H * scale);
    const border = frame.offsetHeight - frame.clientHeight;
    frame.style.flex = '0 0 auto';
    frame.style.height = (innerH + border) + 'px';
    world.style.width = viewW + 'px';
    world.style.height = ROOM_H + 'px';
    world.style.transformOrigin = '0 0';
    world.style.transform = 'scale(' + scale + ')';
    scaler.style.width = innerW + 'px';
    scaler.style.height = innerH + 'px';
  }
}

function room(which: string, phone: boolean): void {
  const stage = STAGES[which];
  const names = stage.spots.map(s => ITEM_MAP[s.kind].name).join(', ');
  const root = document.getElementById('app')!;
  root.innerHTML = `<div id="shot"${phone ? ' class="phone"' : ''}>
    <header><h1>${stage.title}</h1><p class="sub">${names}. Same spots in both rooms.</p></header>
    <div class="block"><h2>Before</h2><div class="frame" id="before"></div></div>
    <div class="block"><h2>After</h2><div class="frame" id="after"></div></div>
  </div>`;
  mountWorld(document.getElementById('before')!, stage.spots, false, stage.wall, stage.floor, stage.pattern, stage.w);
  mountWorld(document.getElementById('after')!, stage.spots, true, stage.wall, stage.floor, stage.pattern, stage.w);
  fitFrames();
}

function pct(samples: number[], q: number): number {
  const i = Math.min(samples.length - 1, Math.max(0, Math.round(q * (samples.length - 1))));
  return samples[i];
}

function v2Kinds(): string[] {
  const kinds: string[] = [];
  setArtV2(true);
  for (let i = 0; i < ITEMS.length; i++) if (artV2Markup(ITEMS[i].kind)) kinds.push(ITEMS[i].kind);
  setArtV2(false);
  return kinds;
}

function paintCost(v2: boolean, n: number, kinds: string[]): Promise<{ build: number; p50: number; p95: number; max: number }> {
  const layer = document.createElement('div');
  layer.style.cssText = 'position:absolute;left:0;top:0;width:2400px;height:600px;';
  const t0 = performance.now();
  for (let i = 0; i < n; i++) {
    const kind = kinds[i % kinds.length];
    const d = ITEM_MAP[kind];
    const el = document.createElement('div');
    el.style.cssText = 'position:absolute;width:' + d.w + 'px;height:' + hOf(d) + 'px;left:' + ((i % 12) * 190) + 'px;top:' + ((i % 5) * 70) + 'px';
    el.innerHTML = draw(kind, v2);
    layer.appendChild(el);
  }
  document.body.appendChild(layer);
  layer.getBoundingClientRect();
  const build = performance.now() - t0;
  return new Promise(resolve => {
    const samples: number[] = [];
    let last = performance.now();
    let frames = 0;
    const tick = (now: number) => {
      samples.push(now - last);
      last = now;
      layer.style.transform = 'translate3d(' + (-(frames % 40)) + 'px,0,0)';
      frames++;
      if (frames < 72) requestAnimationFrame(tick);
      else {
        layer.remove();
        samples.shift();
        samples.sort((a, b) => a - b);
        resolve({ build: Math.round(build * 10) / 10, p50: Math.round(pct(samples, .5) * 10) / 10, p95: Math.round(pct(samples, .95) * 10) / 10, max: Math.round(samples[samples.length - 1] * 10) / 10 });
      }
    };
    requestAnimationFrame(tick);
  });
}

async function bench(): Promise<void> {
  const root = document.getElementById('app')!;
  root.innerHTML = '<div id="bench">Measuring…</div>';
  const bytes: Record<string, number> = {};
  const kinds = v2Kinds();
  setArtV2(true);
  for (let i = 0; i < kinds.length; i++) bytes[kinds[i]] = artV2Markup(kinds[i])!.body.length;
  setArtV2(false);
  const before48 = await paintCost(false, 48, kinds);
  const after48 = await paintCost(true, 48, kinds);
  const before80 = await paintCost(false, 80, kinds);
  const after80 = await paintCost(true, 80, kinds);
  const out = {
    bytes,
    items48: { before: before48, after: after48 },
    items80: { before: before80, after: after80 },
  };
  document.getElementById('bench')!.textContent = JSON.stringify(out, null, 2);
  (window as unknown as { __artBench: typeof out }).__artBench = out;
}

function foot(): void {
  const root = document.getElementById('app')!;
  root.innerHTML = '<div id="bench"></div>';
  const rows: { kind: string; w0: number; h0: number; w1: number; h1: number }[] = [];
  for (let i = 0; i < ITEMS.length; i++) {
    const d = ITEMS[i];
    if (d.cat === 'pets') continue;
    const host = document.createElement('div');
    host.style.cssText = 'position:absolute;left:0;top:0;width:2400px;height:600px;';
    const box = (v2: boolean) => {
      const el = document.createElement('div');
      el.className = 'piece';
      el.style.position = 'absolute';
      el.style.left = (1200 - d.w / 2) / 2400 * 100 + '%';
      el.style.top = (500 - hOf(d)) / 600 * 100 + '%';
      el.style.width = d.w / 2400 * 100 + '%';
      el.style.height = hOf(d) / 600 * 100 + '%';
      el.innerHTML = draw(d.kind, v2);
      host.appendChild(el);
      const r = el.getBoundingClientRect();
      return { w: Math.round(r.width * 100) / 100, h: Math.round(r.height * 100) / 100, bottom: Math.round(r.bottom * 100) / 100 };
    };
    document.body.appendChild(host);
    const a = box(false);
    const b = box(true);
    host.remove();
    if (a.w !== b.w || a.h !== b.h || a.bottom !== b.bottom) rows.push({ kind: d.kind, w0: a.w, h0: a.h, w1: b.w, h1: b.h });
  }
  const out = { checked: ITEMS.length, mismatches: rows };
  document.getElementById('bench')!.textContent = JSON.stringify(out);
  (window as unknown as { __artFoot: typeof out }).__artFoot = out;
}

const params = new URLSearchParams(location.search);
const view = params.get('view') || 'sheet';
const roomName = params.get('room') || 'living';
const phone = params.get('size') === '390';

async function boot(): Promise<void> {
  await loadArtRooms(ART_ROOMS);
  if (STAGES[view]) room(view, phone);
  else if (view === 'night') sheet(true, roomName);
  else if (view === 'bench' || view === 'foot') { /* filled below */ }
  else sheet(false, roomName);
  await finish();
}

async function finish(): Promise<void> {
  if (view === 'bench') await bench();
  if (view === 'foot') foot();
  const imgs = document.images;
  const waits: Promise<void>[] = [];
  for (let i = 0; i < imgs.length; i++) waits.push(imgs[i].decode().then(() => undefined, () => undefined));
  await Promise.all(waits);
  if (STAGES[view]) fitFrames();
  await new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())));
  (window as unknown as { __artReady: boolean }).__artReady = true;
}

void boot();
