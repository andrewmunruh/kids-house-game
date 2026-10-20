// Builds the planning mockups. Not part of the game.
// Run: npx tsx docs/mockups/render.ts
import { mkdirSync, writeFileSync } from 'node:fs';
import { chibiSVG } from '../../src/avatar/draw';
import { SIT_POSE } from '../../src/avatar/sit';
import { fillLook2, type Look2 } from '../../src/shared/avatar';

const OUT = new URL('./html/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const kidLook: Look2 = {
  v: 1, hair: 'puffs', hairC: '#5b3a29', skin: '#f1c27d', eyes: 'big', eyeC: '#5a321c', blush: true,
  top: 'classic', topC: '#ff7aa8', bottom: 'leggings', bottomC: '#5aa9e6', shoes: 'maryjanes', shoesC: '#ff7aa8',
  acc: ['bow'], accC: '#ffd166',
};
const chairLook: Look2 = {
  v: 1, hair: 'long', hairC: '#2b1d16', skin: '#c68642', eyes: 'sparkle', eyeC: '#3d7ec4', blush: true,
  dress: 'sundress', dressC: '#ffd166', shoes: 'sandals', shoesC: '#ff8fab', acc: ['sunhat'], accC: '#fff6e6',
};
const bedLook: Look2 = {
  v: 1, hair: 'braids', hairC: '#5b3a29', skin: '#e0ac69', eyes: 'sleepy', eyeC: '#5a321c', blush: true,
  dress: 'nightgown', dressC: '#c9a0dc', shoes: 'slippers', shoesC: '#ff8fab', acc: ['flower'], accC: '#ff8fab',
};

const kidSit = chibiSVG(fillLook2(kidLook), { pose: SIT_POSE, poseName: 'sit', rich: true, uid: 'sofa' });
const chairSit = chibiSVG(fillLook2(chairLook), { pose: SIT_POSE, poseName: 'sit', rich: true, uid: 'chair' });
const kidLie = chibiSVG(fillLook2(bedLook), { rich: true, uid: 'bed' });

const O = '#5a3d5c';
const s = `stroke="${O}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`;
const shadow = `<ellipse cx="50" cy="97" rx="38" ry="3" fill="#000" opacity=".12"/>`;
const sofa = `<svg viewBox="0 0 100 100">${shadow}<rect x="6" y="40" width="88" height="40" rx="16" fill="#ff8fab" ${s}/><rect x="16" y="28" width="68" height="30" rx="12" fill="#ffb3c6" ${s}/><rect x="2" y="48" width="18" height="38" rx="9" fill="#ff7096" ${s}/><rect x="80" y="48" width="18" height="38" rx="9" fill="#ff7096" ${s}/><rect x="20" y="60" width="60" height="18" rx="8" fill="#ffc2d1" ${s}/><rect x="14" y="86" width="6" height="10" rx="2" fill="${O}"/><rect x="80" y="86" width="6" height="10" rx="2" fill="${O}"/></svg>`;
const chair = `<svg viewBox="0 0 100 100">${shadow}<rect x="22" y="6" width="56" height="50" rx="14" fill="#90e0a8" ${s}/><rect x="16" y="52" width="68" height="14" rx="7" fill="#5cc985" ${s}/><rect x="22" y="64" width="9" height="32" rx="4" fill="#5cc985" ${s}/><rect x="69" y="64" width="9" height="32" rx="4" fill="#5cc985" ${s}/><circle cx="50" cy="30" r="8" fill="#fff" opacity=".6"/></svg>`;
const bed = `<svg viewBox="0 0 100 100">${shadow}<rect x="4" y="22" width="18" height="72" rx="8" fill="#c99366" ${s}/><rect x="80" y="44" width="16" height="50" rx="7" fill="#c99366" ${s}/><rect x="14" y="54" width="76" height="30" rx="10" fill="#fff" ${s}/><rect x="40" y="50" width="54" height="36" rx="12" fill="#a78bfa" ${s}/><circle cx="56" cy="64" r="3" fill="#fff"/><circle cx="72" cy="72" r="3" fill="#fff"/><circle cx="84" cy="60" r="3" fill="#fff"/><rect x="18" y="42" width="24" height="16" rx="8" fill="#fde2e4" ${s}/></svg>`;
const lamp = `<svg viewBox="0 0 100 100">${shadow}<path d="M24 40 L34 6 H66 L76 40 Z" fill="#ffd166" ${s}/><rect x="46" y="40" width="8" height="48" rx="4" fill="#c9a0dc" ${s}/><ellipse cx="50" cy="92" rx="22" ry="6" fill="#b388d6" ${s}/></svg>`;
const plant = `<svg viewBox="0 0 100 100">${shadow}<ellipse cx="34" cy="38" rx="12" ry="26" fill="#74c69d" ${s} transform="rotate(-25 34 38)"/><ellipse cx="66" cy="38" rx="12" ry="26" fill="#52b788" ${s} transform="rotate(25 66 38)"/><ellipse cx="50" cy="30" rx="12" ry="28" fill="#95d5b2" ${s}/><path d="M24 62 H76 L70 94 H30 Z" fill="#ff9f68" ${s}/></svg>`;
const rug = `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="82" rx="48" ry="14" fill="#ffc8dd" ${s}/><ellipse cx="50" cy="82" rx="34" ry="9" fill="#bde0fe" ${s}/></svg>`;
const teddy = `<svg viewBox="0 0 100 100">${shadow}<circle cx="26" cy="22" r="10" fill="#d4a373" ${s}/><circle cx="74" cy="22" r="10" fill="#d4a373" ${s}/><ellipse cx="50" cy="72" rx="28" ry="24" fill="#d4a373" ${s}/><circle cx="50" cy="38" r="26" fill="#e6b88a" ${s}/><circle cx="40" cy="36" r="3" fill="${O}"/><circle cx="60" cy="36" r="3" fill="${O}"/><path d="M44 48 Q50 54 56 48" fill="none" ${s}/></svg>`;
const crib = `<svg viewBox="0 0 100 100">${shadow}<rect x="8" y="28" width="84" height="58" rx="10" fill="#fff" ${s}/><path d="M8 42 H92 M20 28 V86 M36 28 V86 M50 28 V86 M64 28 V86 M80 28 V86" ${s}/><rect x="6" y="22" width="88" height="12" rx="6" fill="#9ad7f5" ${s}/><rect x="14" y="48" width="72" height="16" rx="6" fill="#ffe0ec"/></svg>`;
const rocker = `<svg viewBox="0 0 100 100">${shadow}<path d="M16 88 Q50 98 84 88" fill="none" ${s}/><rect x="30" y="28" width="40" height="36" rx="12" fill="#e4ccf2" ${s}/><path d="M22 48 Q18 70 30 80 H70 Q82 70 78 48 Z" fill="#f6e6ff" ${s}/><rect x="36" y="58" width="28" height="12" rx="6" fill="#ffc8dd" ${s}/></svg>`;
const mobile = `<svg viewBox="0 0 100 100"><path d="M50 6 V22" ${s}/><ellipse cx="50" cy="28" rx="28" ry="8" fill="#fff" ${s}/><path d="M28 32 V48 M50 36 V58 M72 32 V48" ${s}/><circle cx="28" cy="56" r="8" fill="#ffd166" ${s}/><circle cx="50" cy="68" r="9" fill="#ff8fab" ${s}/><circle cx="72" cy="56" r="8" fill="#8ecae6" ${s}/></svg>`;
const cloud = `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="78" rx="46" ry="16" fill="#e7f6ff" ${s}/><circle cx="28" cy="70" r="16" fill="#f4fbff" ${s}/><circle cx="50" cy="62" r="18" fill="#fff" ${s}/><circle cx="72" cy="70" r="16" fill="#f4fbff" ${s}/></svg>`;
const bottle = `<svg viewBox="0 0 100 100">${shadow}<rect x="36" y="8" width="28" height="12" rx="4" fill="#c9a0dc" ${s}/><path d="M30 30 H70 L66 88 Q50 96 34 88 Z" fill="#e7f6ff" ${s}/><path d="M32 48 H68 L66 80 Q50 88 34 80 Z" fill="#fff" opacity=".85"/></svg>`;

const baby = `<svg viewBox="0 0 140 120">
  <ellipse cx="70" cy="108" rx="40" ry="6" fill="#000" opacity=".12"/>
  <ellipse cx="70" cy="86" rx="40" ry="24" fill="#fff" ${s}/>
  <path d="M34 74 Q70 56 106 74 V88 Q70 108 34 88 Z" fill="#ffe0ec" ${s}/>
  <path d="M48 78 Q70 90 92 78" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <circle cx="70" cy="46" r="26" fill="#f6d3b0" ${s}/>
  <path d="M52 30 Q70 14 88 30 Q78 24 70 26 Q62 24 52 30 Z" fill="#e0ac69" ${s}/>
  <ellipse cx="60" cy="48" rx="3.6" ry="4.4" fill="${O}"/><ellipse cx="80" cy="48" rx="3.6" ry="4.4" fill="${O}"/>
  <circle cx="61.2" cy="46.4" r="1.3" fill="#fff"/><circle cx="81.2" cy="46.4" r="1.3" fill="#fff"/>
  <ellipse cx="50" cy="56" rx="5" ry="2.6" fill="#ff9bb5" opacity=".8"/><ellipse cx="90" cy="56" rx="5" ry="2.6" fill="#ff9bb5" opacity=".8"/>
  <path d="M62 60 Q70 68 78 60" fill="none" stroke="${O}" stroke-width="2.6" stroke-linecap="round"/>
</svg>`;

function blossoms(filled: number): string {
  return [0, 1, 2, 3, 4].map(i => {
    const on = i < filled;
    const c = on ? '#ff8fab' : '#ffe0ec';
    const x = 16 + i * 30;
    return `<g transform="translate(${x} 18)">
      <circle cx="0" cy="-4" r="5" fill="${c}" stroke="${O}" stroke-width="1.6"/>
      <circle cx="-5" cy="1" r="5" fill="${c}" stroke="${O}" stroke-width="1.6"/>
      <circle cx="5" cy="1" r="5" fill="${c}" stroke="${O}" stroke-width="1.6"/>
      <circle cx="-3" cy="6" r="5" fill="${c}" stroke="${O}" stroke-width="1.6"/>
      <circle cx="3" cy="6" r="5" fill="${c}" stroke="${O}" stroke-width="1.6"/>
      <circle cx="0" cy="1.5" r="3.2" fill="${on ? '#ffd166' : '#fff'}" stroke="${O}" stroke-width="1.4"/>
    </g>`;
  }).join('');
}

const ROOMS: Record<string, { wall: string; floor: string; tab: string }> = {
  living: { wall: '#ffd6e0', floor: '#e8b98a', tab: 'living' },
  bedroom: { wall: '#d9ccff', floor: '#f2d0a4', tab: 'bedroom' },
  nursery: { wall: '#d6f3ff', floor: '#f3ddc4', tab: 'nursery' },
};
const TABS = [
  ['living', 'Living', '#ff8fab'],
  ['bedroom', 'Bed', '#b388d6'],
  ['kitchen', 'Kitchen', '#5cc985'],
  ['salon', 'Salon', '#f0a0d8'],
  ['nursery', 'Nursery', '#9ad7f5'],
] as const;

function page(w: number, h: number, room: keyof typeof ROOMS, stage: string, care = false): string {
  const phone = w < 500;
  const r = ROOMS[room];
  const tabs = TABS.map(([id, name, color]) =>
    `<div class="tab${id === r.tab ? ' on' : ''}" style="--c:${color}">${name}</div>`).join('');
  const tool = (d: string) => `<div class="round"><svg viewBox="0 0 48 48">${d}</svg></div>`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; }
    html, body { margin: 0; width: ${w}px; height: ${h}px; overflow: hidden;
      font-family: "Nunito", ui-rounded, "Trebuchet MS", system-ui, sans-serif; color: #5a3d5c; }
    body { display: flex; flex-direction: column;
      background: radial-gradient(circle at 15% 10%, #fff6fa 0 18%, transparent 19%), linear-gradient(160deg, #ffe0ec, #e6ddff);
      padding: ${phone ? '6px' : '10px 12px 12px'}; }
    .top { display: flex; align-items: center; gap: ${phone ? 4 : 8}px; min-height: ${phone ? 48 : 58}px; }
    .tabs { display: flex; gap: ${phone ? 3 : 6}px; flex: 1; min-width: 0; }
    .tab { padding: ${phone ? '0 4px' : '0 12px'}; height: ${phone ? 44 : 48}px; border-radius: 22px; background: #fff;
      font-weight: 800; font-size: ${phone ? 13 : 16}px; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 0 #e6c9d8; border: 3px solid transparent; white-space: nowrap; }
    .tab.on { background: var(--c); color: #fff; border-color: #5a3d5c; }
    .mm { flex: 0 0 ${phone ? 56 : 112}px; height: ${phone ? 36 : 44}px; border-radius: 12px; overflow: hidden; border: 3px solid #5a3d5c; position: relative; background: #fff; }
    .mm i { position: absolute; left: 0; right: 0; top: 0; height: 62%; background: ${r.wall}; }
    .mm b { position: absolute; left: 0; right: 0; bottom: 0; height: 38%; background: ${r.floor}; }
    .mm s { position: absolute; top: 4px; bottom: 4px; left: 28%; width: 36%; border: 2px solid #fff; border-radius: 6px; box-shadow: 0 0 0 2px #5a3d5c; }
    .tools { display: flex; gap: ${phone ? 4 : 8}px; }
    .round { width: ${phone ? 44 : 52}px; height: ${phone ? 44 : 52}px; border-radius: 50%; background: #fff; border: 3px solid #5a3d5c;
      box-shadow: 0 4px 0 #e6c9d8; padding: 8px; }
    .round svg { width: 100%; height: 100%; display: block; }
    .stage { position: relative; flex: 1; margin: ${phone ? 6 : 8}px 0; border-radius: ${phone ? 22 : 34}px; overflow: hidden; }
    .wall { position: absolute; left: 0; right: 0; top: 0; height: 62%; background: ${r.wall}; }
    .floor { position: absolute; left: 0; right: 0; top: 62%; bottom: 0; background: ${r.floor}; }
    .base { position: absolute; left: 0; right: 0; top: 60%; height: 12px; background: #fff; border-top: 4px solid #5a3d5c; border-bottom: 4px solid #5a3d5c; }
    .thing { position: absolute; }
    .thing svg, .kid svg { width: 100%; height: 100%; display: block; overflow: visible; }
    .kid { position: absolute; z-index: 3; }
    .kid .tag { position: absolute; left: 50%; top: -8px; transform: translate(-50%, -100%); background: #fff; border: 3px solid #5a3d5c;
      border-radius: 14px; padding: 2px 8px; font-weight: 800; font-size: ${phone ? 12 : 14}px; white-space: nowrap; }
    .zzz { position: absolute; z-index: 4; font-weight: 900; color: #b388d6; }
    .zzz b { font-size: ${phone ? 22 : 28}px; } .zzz i { font-style: normal; font-size: ${phone ? 14 : 16}px; margin-left: 2px; }
    .drawer { display: flex; align-items: center; gap: 8px; height: ${phone ? 52 : 64}px; }
    .modes { display: flex; gap: 4px; background: #fff; border-radius: 18px; padding: 4px; border: 3px solid #5a3d5c; }
    .modes span { height: ${phone ? 36 : 40}px; padding: 0 ${phone ? 8 : 12}px; border-radius: 14px; font-weight: 800; font-size: ${phone ? 14 : 16}px;
      display: flex; align-items: center; }
    .modes .on { background: #fff3b0; }
    .care { position: absolute; z-index: 6; left: 50%; bottom: ${phone ? 10 : 16}px; transform: translateX(-50%);
      width: ${phone ? '94%' : 'min(560px, 86%)'}; background: #fff; border: 4px solid #5a3d5c; border-radius: 28px;
      box-shadow: 0 8px 0 rgba(90,61,92,.25); padding: ${phone ? '8px 8px 10px' : '12px 14px 14px'}; }
    .meter { display: flex; align-items: center; justify-content: center; gap: 8px; }
    .meter svg { width: ${phone ? 150 : 188}px; height: ${phone ? 36 : 44}px; overflow: visible; }
    .meter em { font-style: normal; font-weight: 900; font-size: ${phone ? 16 : 20}px; color: #ff7aa8; }
    .acts { display: flex; gap: ${phone ? 6 : 8}px; margin-top: 6px; }
    .acts button { flex: 1; min-height: 44px; border-radius: 16px; border: 3px solid #5a3d5c; background: #fff6ea;
      font: inherit; font-weight: 800; font-size: ${phone ? 13 : 15}px; color: #5a3d5c; }
    .acts button.on { background: #ffe0ec; }
    .babyname { position: absolute; z-index: 5; background: #fff; border: 3px solid #5a3d5c; border-radius: 14px;
      padding: 2px 10px; font-weight: 800; font-size: ${phone ? 13 : 16}px; }
  </style></head><body>
  <div class="top">
    <div class="tabs">${tabs}</div>
    <div class="mm" aria-hidden="true"><i></i><b></b><s></s></div>
    <div class="tools">
      ${tool('<path d="M10 30 L28 12 L36 20 L18 38 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><circle cx="12" cy="40" r="4" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/>')}
      ${phone ? '' : tool('<path d="M16 8 L6 16 L11 24 L15 21 V42 H33 V21 L37 24 L42 16 L32 8 Q24 14 16 8 Z" fill="#8ecae6" stroke="#5a3d5c" stroke-width="3"/>')}
    </div>
  </div>
  <div class="stage"><div class="wall"></div><div class="floor"></div><div class="base"></div>${stage}${care ? carePanel(phone) : ''}</div>
  <div class="drawer"><div class="modes"><span class="on">Play</span><span>Decorate</span></div></div>
  </body></html>`;
}

function carePanel(_phone: boolean): string {
  return `<div class="care">
    <div class="meter"><svg viewBox="0 0 156 36">${blossoms(4)}</svg><em>Cozy</em></div>
    <div class="acts">
      <button class="on">Bottle</button><button>Burp</button><button>Diaper</button><button>Rock</button>
    </div>
  </div>`;
}

function piece(svg: string, x: number, y: number, w: number, h: number, z = 1): string {
  return `<div class="thing" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;z-index:${z}">${svg}</div>`;
}
function kidBox(svg: string, x: number, y: number, w: number, h: number, extra = '', tag = 'Sunny Bunny'): string {
  return `<div class="kid" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"><div class="tag">${tag}</div><div style="width:100%;height:100%;${extra}">${svg}</div></div>`;
}

interface Box { w: number; h: number }
function stageBox(w: number, h: number): Box {
  const phone = w < 500;
  const header = phone ? 60 : 78;
  const footer = phone ? 64 : 76;
  const pad = phone ? 12 : 20;
  return { w: w - (phone ? 12 : 24), h: h - header - footer - pad };
}

const shots: { name: string; w: number; h: number; html: string }[] = [];

function add(name: string, w: number, h: number, room: keyof typeof ROOMS, inner: (b: Box) => string, care = false) {
  const b = stageBox(w, h);
  shots.push({ name: `${name}-${w}x${h}`, w, h, html: page(w, h, room, inner(b), care) });
}

for (const [w, h] of [[820, 1180], [390, 844]] as const) {
  add('sit-sofa', w, h, 'living', b => {
    const sw = b.w * 0.62, sh = sw;
    const sx = (b.w - sw) / 2, sy = b.h * 0.40;
    const kh = sh * 0.72, kw = kh * (200 / 320);
    const kx = sx + sw / 2 - kw / 2, ky = sy + sh * 0.34;
    return piece(rug, sx - 20, sy + sh * 0.72, sw + 40, sh * 0.28, 0)
      + piece(lamp, sx - sw * 0.28, sy + sh * 0.15, sw * 0.28, sw * 0.28, 1)
      + piece(plant, sx + sw * 0.92, sy + sh * 0.2, sw * 0.26, sw * 0.26, 1)
      + piece(sofa, sx, sy, sw, sh, 2)
      + kidBox(kidSit, kx, ky, kw, kh);
  });
  add('sit-chair', w, h, 'living', b => {
    const cw = b.w * 0.34, ch = cw;
    const cx = (b.w - cw) / 2, cy = b.h * 0.46;
    const kh = ch * 1.55, kw = kh * (200 / 320);
    const kx = cx + cw / 2 - kw / 2 - kw * 0.02, ky = cy - kh * 0.42;
    return piece(rug, cx - 40, cy + ch * 0.55, cw + 80, ch * 0.4, 0)
      + piece(chair, cx, cy, cw, ch, 2)
      + kidBox(chairSit, kx, ky, kw, kh);
  });
  add('lie-bed', w, h, 'bedroom', b => {
    const bw = b.w * 0.78, bh = bw * 0.72;
    const bx = (b.w - bw) / 2, by = b.h * 0.36;
    const kh = bw * 0.5, kw = kh * (200 / 320);
    const kx = bx + bw * 0.28, ky = by + bh * 0.28;
    return piece(rug, bx, by + bh * 0.78, bw, bh * 0.22, 0)
      + piece(teddy, bx + bw * 0.78, by + bh * 0.55, bw * 0.22, bw * 0.22, 2)
      + piece(bed, bx, by, bw, bh, 2)
      + kidBox(kidLie, kx, ky, kw, kh, `transform:rotate(-82deg);transform-origin:50% 46%;`, 'Sunny Bunny')
      + `<div class="zzz" style="left:${bx + bw * 0.62}px;top:${by + bh * 0.08}px"><b>Zzz</b><i>z</i></div>`;
  });
  add('baby-care', w, h, 'nursery', b => nurseryScene(b, true), true);
  add('nursery', w, h, 'nursery', b => nurseryScene(b, false), false);
}

function nurseryScene(b: Box, care: boolean): string {
  const cw = b.w * (care ? 0.62 : 0.46), ch = cw * 0.92;
  const cx = care ? (b.w - cw) / 2 : b.w * 0.18, cy = b.h * (care ? 0.08 : 0.22);
  const babyW = cw * 0.62, babyH = babyW * (120 / 140);
  const bx = cx + (cw - babyW) / 2, by = cy + ch * 0.34;
  const rw = b.w * 0.28;
  return piece(cloud, cx - 10, cy + ch * 0.72, cw + 30, ch * 0.28, 0)
    + piece(mobile, cx + cw * 0.2, cy - ch * 0.22, cw * 0.55, cw * 0.4, 1)
    + (care ? '' : piece(rocker, cx + cw * 0.95, cy + ch * 0.35, rw, rw, 2))
    + (care ? '' : piece(bottle, cx + cw * 1.15, cy + ch * 0.85, rw * 0.45, rw * 0.45, 2))
    + piece(crib, cx, cy, cw, ch, 2)
    + `<div class="thing" style="left:${bx}px;top:${by}px;width:${babyW}px;height:${babyH}px;z-index:4">${baby}</div>`
    + `<div class="babyname" style="left:${bx + babyW * 0.5}px;top:${by - (b.w < 500 ? 28 : 36)}px;transform:translateX(-50%)">Bean</div>`;
}

for (const shot of shots) {
  writeFileSync(OUT + shot.name + '.html', shot.html);
  console.log(shot.name, shot.w, shot.h);
}
console.log('wrote', shots.length, 'pages to', OUT);
