// Standalone before/after board. The game catalog does not load this file.
import { ITEM_MAP, hOf, svgOf } from '../items';
import { SAMPLE_KINDS, setArtV2, v2Mark } from './v2-sample';

const VIEW_W = 860;
const ROOM_H = 600;

interface Spot { kind: string; x: number; y: number; z: number }

const LIVING: Spot[] = [
  { kind: 'rug', x: 540, y: 560, z: 0 },
  { kind: 'window', x: 540, y: 200, z: 2 },
  { kind: 'bookshelf', x: 150, y: 495, z: 3 },
  { kind: 'lamp', x: 310, y: 480, z: 4 },
  { kind: 'sofa', x: 540, y: 500, z: 6 },
  { kind: 'plant', x: 780, y: 500, z: 7 },
  { kind: 'table', x: 540, y: 558, z: 8 },
];

const BEDROOM: Spot[] = [
  { kind: 'window', x: 370, y: 188, z: 2 },
  { kind: 'lamp', x: 120, y: 480, z: 3 },
  { kind: 'bed', x: 370, y: 505, z: 4 },
  { kind: 'teddy', x: 600, y: 535, z: 5 },
  { kind: 'pack:wardrobe', x: 760, y: 495, z: 6 },
];

function draw(kind: string, v2: boolean): string {
  const before = ITEM_MAP[kind]?.svg;
  setArtV2(v2);
  const html = svgOf(ITEM_MAP[kind]);
  setArtV2(false);
  if (ITEM_MAP[kind].svg !== before) throw new Error('sample mutated ' + kind);
  return html;
}

function card(kind: string): string {
  const d = ITEM_MAP[kind];
  const mark = v2Mark(kind);
  return `<article class="card">
    <h2>${d.name}</h2>
    <p class="kind">${kind}${mark ? ' · ' + mark.vb : ''}</p>
    <div class="pair">
      <figure class="before"><div class="art">${draw(kind, false)}</div><figcaption>Before</figcaption></figure>
      <figure class="after"><div class="art">${draw(kind, true)}</div><figcaption>After</figcaption></figure>
    </div>
  </article>`;
}

function sheet(night: boolean): void {
  const root = document.getElementById('app')!;
  root.innerHTML = `<div id="sheet" class="${night ? 'night' : ''}">
    <header>
      <h1>Art sample · before / after</h1>
      <p class="sub">${night ? 'After column under a light indigo tint, so night can still read the shapes.' : 'Twelve pieces. The game still draws Before unless you open it with ?art=v2.'}</p>
    </header>
    <div class="grid">${SAMPLE_KINDS.map(card).join('')}</div>
  </div>`;
}

function mountWorld(frame: HTMLElement, spots: Spot[], v2: boolean, wall: string, floor: string, pattern: 'dots' | 'stripes'): void {
  frame.dataset.viewW = String(VIEW_W);
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
    el.style.left = (s.x - w / 2) / VIEW_W * 100 + '%';
    el.style.top = (s.y - h) / ROOM_H * 100 + '%';
    el.style.width = w / VIEW_W * 100 + '%';
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
    const scale = Math.min(frame.clientWidth / viewW, frame.clientHeight / ROOM_H);
    world.style.width = viewW + 'px';
    world.style.height = ROOM_H + 'px';
    world.style.transformOrigin = '0 0';
    world.style.transform = 'scale(' + scale + ')';
    scaler.style.width = (viewW * scale) + 'px';
    scaler.style.height = (ROOM_H * scale) + 'px';
  }
}

function room(which: 'living' | 'bedroom'): void {
  const living = which === 'living';
  const spots = living ? LIVING : BEDROOM;
  const title = living ? 'Living room' : 'Bedroom';
  const names = spots.map(s => ITEM_MAP[s.kind].name).join(', ');
  const root = document.getElementById('app')!;
  root.innerHTML = `<div id="shot">
    <header><h1>${title}</h1><p class="sub">${names}. Same sizes, staged in one frame.</p></header>
    <div class="block"><h2>Before</h2><div class="frame" id="before"></div></div>
    <div class="block"><h2>After</h2><div class="frame" id="after"></div></div>
  </div>`;
  const wall = living ? '#ffd6e0' : '#d9ccff';
  const floor = living ? '#e8b98a' : '#f2d0a4';
  const pattern = living ? 'dots' : 'stripes';
  mountWorld(document.getElementById('before')!, spots, false, wall, floor, pattern);
  mountWorld(document.getElementById('after')!, spots, true, wall, floor, pattern);
  fitFrames();
}

function pct(samples: number[], q: number): number {
  const i = Math.min(samples.length - 1, Math.max(0, Math.round(q * (samples.length - 1))));
  return samples[i];
}

function paintCost(v2: boolean, n: number): Promise<{ build: number; p50: number; p95: number; max: number }> {
  const layer = document.createElement('div');
  layer.style.cssText = 'position:absolute;left:0;top:0;width:2400px;height:600px;';
  const t0 = performance.now();
  for (let i = 0; i < n; i++) {
    const kind = SAMPLE_KINDS[i % SAMPLE_KINDS.length];
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
  for (let i = 0; i < SAMPLE_KINDS.length; i++) {
    const k = SAMPLE_KINDS[i];
    bytes[k] = v2Mark(k)!.body.length;
  }
  const before48 = await paintCost(false, 48);
  const after48 = await paintCost(true, 48);
  const before80 = await paintCost(false, 80);
  const after80 = await paintCost(true, 80);
  const out = {
    bytes,
    items48: { before: before48, after: after48 },
    items80: { before: before80, after: after80 },
  };
  document.getElementById('bench')!.textContent = JSON.stringify(out, null, 2);
  (window as unknown as { __artBench: typeof out }).__artBench = out;
}

const view = new URLSearchParams(location.search).get('view') || 'sheet';

if (view === 'living' || view === 'bedroom') room(view);
else if (view === 'night') sheet(true);
else if (view === 'bench') { /* filled below */ }
else sheet(false);

async function finish(): Promise<void> {
  if (view === 'bench') await bench();
  const imgs = document.images;
  const waits: Promise<void>[] = [];
  for (let i = 0; i < imgs.length; i++) waits.push(imgs[i].decode().then(() => undefined, () => undefined));
  await Promise.all(waits);
  if (view === 'living' || view === 'bedroom') fitFrames();
  await new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())));
  (window as unknown as { __artReady: boolean }).__artReady = true;
}

finish();
