// Assembled chibi. Nine layers, CSS-variable colors, radial-gradient blush, no blur filters.
// Idle tilt is baked into hip/head groups. Limb angles sit on .leg/.arm so CSS can swing them.
import type { Look2 } from '../shared/avatar';
import { fillLook2 } from '../shared/avatar';
import { S, SH, SH2, f, taper, limb, rot, darken, lighten, HAND, SHOULDER, type Pose } from './geom';
import { hairBack, hairFront } from './hair';
import { topLayer, bottomLayer, bottomOverLayer, dressLayer, shoesLayer, accessoryLayer, hatHairMask } from './wardrobe';

const PRESETS: Pose[] = [
  { hip: 1.5, head: 4, armL: 3, armR: -2, legL: 0, legR: -3, legLLift: 0, legRLift: 0 },
  { hip: -2, head: -5, armL: 1, armR: -7, legL: 4, legR: 0, legLLift: 2, legRLift: 0 },
  { hip: 0, head: 3, armL: 2, armR: -2, legL: 0, legR: 0, legLLift: 0, legRLift: 0 },
  { hip: -1.5, head: -4, armL: 4, armR: -1, legL: 5, legR: 0, legLLift: 3, legRLift: 0 },
];
const POSE_HAIR: Record<string, number> = {
  puffs: 0, afro: 0,
  pony: 1, sidepony: 1, pigtails: 1, halfup: 1,
  braids: 2, boxbraids: 2, locs: 2, sidebraid: 2, crown: 2,
  buns: 3, topbun: 3, lowbun: 3,
};

export function poseFor(look: { hair?: string }): Pose {
  const id = look.hair || 'buns';
  let i = POSE_HAIR[id];
  if (i === undefined) {
    let h = 0;
    for (let k = 0; k < id.length; k++) h = (h + id.charCodeAt(k)) % 4;
    i = h;
  }
  return PRESETS[i];
}

export function handsOf(pose: Pose): { left: { x: number; y: number }; right: { x: number; y: number } } {
  const one = (hx: number, hy: number, sx: number, sy: number, arm: number) => {
    const a = rot(hx, hy, sx, sy, arm);
    const b = rot(a.x, a.y, 100, 238, pose.hip);
    return { x: b.x / 2, y: b.y / 2 };
  };
  return {
    left: one(HAND.l[0], HAND.l[1], SHOULDER.l[0], SHOULDER.l[1], pose.armL),
    right: one(HAND.r[0], HAND.r[1], SHOULDER.r[0], SHOULDER.r[1], pose.armR),
  };
}

export function hemOf(pose: Pose): number {
  const p = rot(100, 244, 100, 238, pose.hip);
  return Math.round(p.y / 2 * 10) / 10;
}

function channelSum(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  return ((n >> 16) & 255) + ((n >> 8) & 255) + (n & 255);
}
/** Near-black hair keeps the approved warm strand color so the lines stay visible. */
function hairShade(hex: string): string {
  const shaded = darken(hex, 0.32);
  return channelSum(shaded) < 80 ? '#5a3a2c' : shaded;
}
/** Soft plum on dark hair, like the approved faces. Lighter hair keeps a gentle match. */
function browOf(hex: string): string {
  return channelSum(hex) < 140 ? '#3b2340' : darken(hex, 0.12);
}

let seq = 0;
function nextUid(): string {
  seq += 1;
  return 'a' + seq.toString(36);
}

function wrapHip(inner: string, pose: Pose): string {
  return pose.hip ? `<g transform="rotate(${f(pose.hip)} 100 238)">${inner}</g>` : inner;
}
function wrapHead(inner: string, pose: Pose): string {
  const head = pose.head ? `<g transform="rotate(${f(pose.head)} 100 158)">${inner}</g>` : inner;
  return wrapHip(head, pose);
}

function defs(u: string, rich: boolean, mask: string): string {
  let d = `<defs><radialGradient id="${u}b"><stop offset="0" style="stop-color:var(--blush)" stop-opacity=".62"/><stop offset=".55" style="stop-color:var(--blush)" stop-opacity=".28"/><stop offset="1" style="stop-color:var(--blush)" stop-opacity="0"/></radialGradient>`;
  d += `<radialGradient id="${u}s"><stop offset="0" stop-color="#3a1d3c" stop-opacity=".3"/><stop offset=".6" stop-color="#3a1d3c" stop-opacity=".12"/><stop offset="1" stop-color="#3a1d3c" stop-opacity="0"/></radialGradient>`;
  d += `<radialGradient id="${u}k" cx=".42" cy=".36" r=".75"><stop offset=".55" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".16"/></radialGradient>`;
  if (rich) {
    d += `<linearGradient id="${u}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f1020" stop-opacity=".62"/><stop offset=".5" stop-color="#1f1020" stop-opacity=".05"/><stop offset=".62" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".55"/></linearGradient>`;
    d += `<linearGradient id="${u}c" gradientUnits="userSpaceOnUse" x1="58" y1="0" x2="146" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".32" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".2"/></linearGradient>`;
    d += `<radialGradient id="${u}h" cx=".38" cy=".28" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1f1020" stop-opacity=".28"/></radialGradient>`;
  }
  return d + mask + '</defs>';
}

function armPart(side: 'l' | 'r'): string {
  const m = side === 'l' ? -1 : 1;
  const sx = SHOULDER[side][0], sy = SHOULDER[side][1];
  const hx = HAND[side][0], hy = HAND[side][1];
  const wx = hx - m, wy = hy - 7;
  const t = -m;
  let out = `<path d="${taper([sx, sy], [wx, wy], 18, 13, -3 * m)}" fill="var(--skin)" ${S(3)}/>`;
  out += `<path class="hand" d="M${f(hx - 8)} ${f(hy - 4)} Q${f(hx - 8)} ${f(hy - 10)} ${f(hx)} ${f(hy - 10)} Q${f(hx + 8)} ${f(hy - 10)} ${f(hx + 8)} ${f(hy - 3)} Q${f(hx + 8.5)} ${f(hy + 9)} ${f(hx)} ${f(hy + 9.5)} Q${f(hx - 8.5)} ${f(hy + 9)} ${f(hx - 8)} ${f(hy - 4)} Z" fill="var(--skin)" ${S(2.8)}/>`;
  out += `<ellipse cx="${f(hx + 7 * t)}" cy="${f(hy - 1)}" rx="3.4" ry="5" fill="var(--skin)" ${S(2.4)} transform="rotate(${-20 * t} ${f(hx + 7 * t)} ${f(hy - 1)})"/>`;
  out += `<path d="M${f(hx - 3 * t)} ${f(hy + 3)} v4 M${f(hx + 0.5 * t)} ${f(hy + 3.5)} v4" stroke="var(--line)" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>`;
  out += `<ellipse cx="${f(hx - 3 * t)}" cy="${f(hy - 5)}" rx="3" ry="1.8" fill="#fff" opacity=".35"/>`;
  return out;
}

function legPart(side: 'l' | 'r'): string {
  const m = side === 'l' ? -1 : 1;
  const x = side === 'l' ? 88 : 112;
  let out = `<path d="${taper([x, 234], [x + m, 294], 21, 15, 1.5 * m)}" fill="var(--skin)" ${S(3)}/>`;
  out += `<path d="${taper([x + 5 * m, 244], [x + 5 * m, 290], 6, 4)}" ${SH}/>`;
  out += `<ellipse cx="${f(x + 0.5 * m)}" cy="268" rx="4.5" ry="2.6" fill="#3a1d3c" opacity=".12"/>`;
  out += `<path d="M${x - 4} 265 q4 -2.5 8 0" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".35"/>`;
  return out;
}

function eye(cx: number, cy: number, flip: boolean, u: string, style: string, rich: boolean): string {
  const s = flip ? -1 : 1;
  const sc = style === 'big' || style === 'bright' ? 1.08 : style === 'soft' ? 0.94 : 1;
  const P = (dx: number, dy: number) => `${f(cx + dx * sc)} ${f(cy + dy * sc)}`;
  const rx = 13.5 * sc, ry = 17 * sc;
  let streaks = '';
  if (rich && style !== 'soft') {
    const angs = [0.35, 0.95, 1.57, 2.2, 2.8];
    for (let i = 0; i < angs.length; i++) {
      const a = angs[i];
      streaks += `<path d="M${f(cx + 5.5 * Math.cos(a) * sc)} ${f(cy + (4 + 6.5 * Math.sin(a)) * sc)} L${f(cx + 11.5 * Math.cos(a) * sc)} ${f(cy + (2 + 14 * Math.sin(a)) * sc)}" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".28"/>`;
    }
  }
  const lashW = style === 'soft' ? 2 : 2.6;
  const flicks = style === 'soft' ? ''
    : `<path d="M${P(-16 * s, -8)} q${f(-6 * s * sc)} -2 ${f(-9 * s * sc)} ${f(-9 * sc)} M${P(-17 * s, -2)} q${f(-6 * s * sc)} ${f(-0.5 * sc)} ${f(-10 * s * sc)} ${f(-5 * sc)} M${P(-12 * s, -15)} q${f(-3 * s * sc)} ${f(-4 * sc)} ${f(-4 * s * sc)} ${f(-9 * sc)}" fill="none" stroke="var(--lash)" stroke-width="2.2" stroke-linecap="round"/>`;
  const extra = style === 'sparkle' || style === 'bright'
    ? `<path d="M${P(-9 * s, -8)} l.7 1.6 1.6 .7 -1.6 .7 -.7 1.6 -.7 -1.6 -1.6 -.7 1.6 -.7 Z" fill="#fff" opacity=".9"/>`
    : '';
  const iris = rich ? `<ellipse cx="${cx}" cy="${f(cy + sc)}" rx="${f(rx)}" ry="${f(ry)}" fill="url(#${u}i)"/>` : '';
  const lid = style === 'sleepy'
    ? `<path d="M${P(-17, -4)} Q${cx} ${f(cy + sc)} ${P(17, -4)} L${P(18, -16)} Q${cx} ${f(cy - 20 * sc)} ${P(-18, -16)} Z" fill="var(--skin)"/>`
    : '';
  return `<path d="M${P(-16, -2)} Q${P(-16, -20)} ${P(0, -20)} Q${P(16, -20)} ${P(16, -2)} Q${P(16, 19)} ${P(0, 19)} Q${P(-16, 19)} ${P(-16, -2)} Z" fill="#fff"/>`
    + `<path d="M${P(-15, -4)} Q${cx} ${f(cy - 21 * sc)} ${P(15, -4)} Q${cx} ${f(cy - 14 * sc)} ${P(-15, -4)} Z" fill="#3a1d3c" opacity=".12"/>`
    + `<ellipse data-iris="1" cx="${cx}" cy="${f(cy + sc)}" rx="${f(rx)}" ry="${f(ry)}" fill="var(--eye)"/>${iris}${streaks}`
    + `<ellipse cx="${cx}" cy="${f(cy + 3 * sc)}" rx="${f(7 * sc)}" ry="${f(9 * sc)}" fill="#1f1020" opacity=".8"/>`
    + `<ellipse cx="${cx}" cy="${f(cy + sc)}" rx="${f(11.3 * sc)}" ry="${f(14.8 * sc)}" fill="none" stroke="#fff" stroke-width="1" opacity=".22"/>`
    + `<ellipse cx="${cx}" cy="${f(cy + sc)}" rx="${f(rx)}" ry="${f(ry)}" fill="none" stroke="#1f1020" stroke-width="2" opacity=".55"/>`
    + `<path d="M${P(-9, 12)} Q${cx} ${f(cy + 19.5 * sc)} ${P(9, 12)} Q${cx} ${f(cy + 15.5 * sc)} ${P(-9, 12)} Z" fill="#fff" opacity=".5"/>`
    + `<ellipse cx="${f(cx - 6 * s * sc)}" cy="${f(cy - 6 * sc)}" rx="${f(5.8 * sc)}" ry="${f(6.8 * sc)}" fill="#fff" transform="rotate(${-15 * s} ${f(cx - 6 * s * sc)} ${f(cy - 6 * sc)})"/>`
    + `<circle cx="${f(cx + 6 * s * sc)}" cy="${f(cy + 8 * sc)}" r="${f(2.8 * sc)}" fill="#fff"/>`
    + `<circle cx="${f(cx - 4 * s * sc)}" cy="${f(cy + 10 * sc)}" r="${f(1.3 * sc)}" fill="#fff" opacity=".85"/>`
    + `<path d="M${P(7 * s, -10)} l${f(sc)} ${f(2.4 * sc)} ${f(2.4 * sc)} ${f(sc)} ${f(-2.4 * sc)} ${f(sc)} ${f(-sc)} ${f(2.4 * sc)} ${f(-sc)} ${f(-2.4 * sc)} ${f(-2.4 * sc)} ${f(-sc)} ${f(2.4 * sc)} ${f(-sc)} Z" fill="#fff"/>`
    + extra + lid
    + `<path d="M${P(-17, -1)} Q${P(-16, -21)} ${P(0, -21)} Q${P(16, -21)} ${P(17, -3)} Q${P(14.5, -18.6)} ${P(0, -18.8)} Q${P(-14.5, -18.6)} ${P(-15.5, -1)} Z" fill="var(--lash)" stroke="var(--lash)" stroke-width="${lashW}" stroke-linejoin="round"/>`
    + flicks
    + `<path d="M${P(-11, -23)} Q${cx} ${f(cy - 27 * sc)} ${P(11, -23)}" fill="none" stroke="var(--line)" stroke-width="1.3" stroke-linecap="round" opacity=".22"/>`
    + `<path d="M${P(-5, 20.5)} Q${cx} ${f(cy + 22 * sc)} ${P(5, 20.5)}" fill="none" stroke="var(--lash)" stroke-width="1.3" stroke-linecap="round" opacity=".28"/>`;
}

function face(look: ReturnType<typeof fillLook2>, u: string, rich: boolean): string {
  const blush = look.blush
    ? `<ellipse cx="64" cy="135" rx="16" ry="10" fill="url(#${u}b)"/><ellipse cx="136" cy="135" rx="16" ry="10" fill="url(#${u}b)"/>`
      + '<path d="M60 133 l3 -3 M66 134 l3 -3 M132 133 l3 -3 M138 134 l3 -3" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".75"/>'
    : '';
  let fr = '';
  if (look.freckles) {
    const dots: [number, number][] = [[58, 132], [64, 136], [70, 131], [130, 131], [136, 136], [142, 132]];
    for (let i = 0; i < dots.length; i++) fr += `<circle cx="${dots[i][0]}" cy="${dots[i][1]}" r="1.5" fill="var(--freckle)" opacity=".7"/>`;
  }
  return blush + fr
    + '<path data-brow="l" d="M64 86 Q74 80 85 84" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/>'
    + '<path data-brow="r" d="M115 84 Q126 80 136 86" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/>'
    + eye(76, 112, false, u, look.eyes, rich) + eye(124, 112, true, u, look.eyes, rich)
    + '<path d="M98 131 q2 1.8 4 0" fill="none" stroke="var(--line)" stroke-width="2" stroke-linecap="round" opacity=".55"/>'
    + '<ellipse cx="101.5" cy="128.5" rx="1.6" ry="1" fill="#fff" opacity=".6"/>'
    + '<path d="M92 140 Q100 147.5 108 140" fill="none" stroke="var(--line)" stroke-width="2.8" stroke-linecap="round"/>'
    + '<path d="M96 142.6 Q100 145.4 104 142.6 Q100 144 96 142.6 Z" fill="#ff8fa8"/>';
}

function headShape(u: string): string {
  const d = 'M40 102 Q38 38 100 38 Q162 38 160 102 Q160 140 132 153 Q116 160 100 160 Q84 160 68 153 Q40 140 40 102 Z';
  return `<ellipse cx="39" cy="114" rx="9" ry="11" fill="var(--skin)" ${S(3)}/><ellipse cx="161" cy="114" rx="9" ry="11" fill="var(--skin)" ${S(3)}/>`
    + `<ellipse cx="40" cy="115" rx="4" ry="6" ${SH2}/><ellipse cx="160" cy="115" rx="4" ry="6" ${SH2}/>`
    + `<path d="${d}" fill="var(--skin)" ${S(3.2)}/><path d="${d}" fill="url(#${u}k)"/>`;
}

function torso(): string {
  return `<path d="M91 146 h18 v22 q-9 5 -18 0 Z" fill="var(--skin)" ${S(3)}/><path d="M91 150 h18 v9 q-9 6 -18 0 Z" ${SH2}/>`
    + `<path d="M70 168 Q74 160 92 160 H108 Q126 160 130 168 L134 236 Q100 244 66 236 Z" fill="var(--skin)" ${S(3)}/>`;
}

export function chibiSVG(look: Look2, opt?: { uid?: string; rich?: boolean }): string {
  const L = fillLook2(look);
  const pose = poseFor(L);
  const rich = opt?.rich !== false;
  const u = opt?.uid ?? nextUid();
  const hem = hemOf(pose);
  const shoe = L.shoesC;
  const shoeTrim = shoe.toLowerCase() === '#ffffff' ? (L.dress ? L.dressC : L.topC) : lighten(shoe, 0.28);
  const topHex = L.dress ? L.dressC : L.topC;
  const topTrim = channelSum(topHex) > 700 ? '#8fdcc0' : darken(topHex, 0.18);
  const style = [
    '--line:#5a3d5c',
    `--skin:${L.skin}`,
    `--hair:${L.hairC}`,
    `--hair-shade:${hairShade(L.hairC)}`,
    `--brow:${browOf(L.hairC)}`,
    `--eye:${L.eyeC}`,
    '--lash:#3b2340',
    '--blush:#ff6f91',
    `--freckle:${darken(L.skin, 0.35)}`,
    `--top:${topHex}`,
    `--top-trim:${topTrim}`,
    `--bottom:${L.dress ? L.dressC : L.bottomC}`,
    `--bottom-trim:${darken(L.dress ? L.dressC : L.bottomC, 0.16)}`,
    `--shoe:${shoe}`,
    `--shoe-trim:${shoeTrim}`,
    '--sock:#ffffff',
    `--acc:${L.accC}`,
    `--acc2:${lighten(L.accC, 0.18)}`,
    '--frame:#6e4a5e',
  ].join(';');
  const legs = limb('leg', 'l', legPart('l'), pose) + limb('leg', 'r', legPart('r'), pose);
  const arms = limb('arm', 'l', `<g class="hand">${armPart('l')}</g>`, pose) + limb('arm', 'r', `<g class="hand">${armPart('r')}</g>`, pose);
  const body = `<g data-layer="body">${legs}${wrapHip(torso() + arms, pose)}${wrapHead(headShape(u), pose)}</g>`;
  const top = L.dress ? dressLayer(pose, L, u, rich, hem) : topLayer(pose, L, u, rich, hem);
  const shadow = `<g class="shadow"><ellipse cx="100" cy="308" rx="52" ry="9" fill="url(#${u}s)"/><ellipse cx="87" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/><ellipse cx="113" cy="307" rx="15" ry="3.6" fill="#3a1d3c" opacity=".16"/></g>`;
  const mask = hatHairMask(u, L.hair, L.acc);
  const clip = mask ? ` mask="url(#${u}hm)"` : '';
  const layers = [
    `<g data-layer="hair-back">${wrapHead(`<g${clip}>${hairBack(L.hair, u, rich)}</g>`, pose)}</g>`,
    body,
    shoesLayer(pose, L),
    wrapHip(bottomLayer(pose, L, u, rich), pose),
    wrapHip(top, pose),
    wrapHip(bottomOverLayer(pose, L, u, rich), pose),
    `<g data-layer="face">${wrapHead(face(L, u, rich), pose)}</g>`,
    `<g data-layer="hair-front">${wrapHead(`<g${clip}>${hairFront(L.hair, u, rich)}</g>`, pose)}</g>`,
    wrapHead(accessoryLayer(L), pose),
  ].join('');
  const shownTop = L.dress || L.top;
  return `<svg data-chibi="1" data-hair="${L.hair}" data-top="${shownTop}" viewBox="0 0 200 320" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" style="${style}">${defs(u, rich, mask)}${shadow}${layers}</svg>`;
}
