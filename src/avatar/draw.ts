// Assembled chibi. Nine layers, CSS-variable colors, radial-gradient blush, no blur filters.
// Idle tilt is baked into hip/head groups. Limb angles sit on .leg/.arm so CSS can swing them.
import type { Look2 } from '../shared/avatar';
import { fillLook2 } from '../shared/avatar';
import { S, SH, SH2, f, taper, limb, rot, darken, lighten, HAND, SHOULDER, type Pose } from './geom';
import { hairBack, hairFront } from './hair';
import { topLayer, bottomLayer, bottomOverLayer, dressLayer, shoesLayer, accessoryLayer } from './wardrobe';

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

function defs(u: string, rich: boolean): string {
  let d = `<defs><radialGradient id="${u}b"><stop offset="0" style="stop-color:var(--blush)" stop-opacity=".62"/><stop offset=".55" style="stop-color:var(--blush)" stop-opacity=".28"/><stop offset="1" style="stop-color:var(--blush)" stop-opacity="0"/></radialGradient>`;
  d += `<radialGradient id="${u}s"><stop offset="0" stop-color="#3a1d3c" stop-opacity=".3"/><stop offset=".6" stop-color="#3a1d3c" stop-opacity=".12"/><stop offset="1" stop-color="#3a1d3c" stop-opacity="0"/></radialGradient>`;
  d += `<radialGradient id="${u}k" cx=".42" cy=".36" r=".75"><stop offset=".55" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".16"/></radialGradient>`;
  if (rich) {
    d += `<linearGradient id="${u}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f1020" stop-opacity=".62"/><stop offset=".5" stop-color="#1f1020" stop-opacity=".05"/><stop offset=".62" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".55"/></linearGradient>`;
    d += `<linearGradient id="${u}c" gradientUnits="userSpaceOnUse" x1="58" y1="0" x2="146" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".32" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#3a1d3c" stop-opacity="0"/><stop offset="1" stop-color="#3a1d3c" stop-opacity=".2"/></linearGradient>`;
    d += `<radialGradient id="${u}h" cx=".38" cy=".28" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1f1020" stop-opacity=".28"/></radialGradient>`;
  }
  return d + '</defs>';
}

function armPart(side: 'l' | 'r'): string {
  const m = side === 'l' ? -1 : 1;
  const sx = SHOULDER[side][0], sy = SHOULDER[side][1];
  const hx = HAND[side][0], hy = HAND[side][1];
  const wx = hx - m, wy = hy - 7;
  const t = -m;
  let out = `<path d="${taper([sx, sy], [wx, wy], 18, 13, -3 * m)}" fill="var(--skin)" ${S(3)}/>`;
  out += `<path d="${taper([sx + 4 * m, sy + 4], [wx + 2.5 * m, wy - 2], 6, 3.5, -2 * m)}" ${SH}/>`;
  const ex = (sx + wx) / 2 + 2 * m, ey = (sy + wy) / 2;
  out += `<ellipse cx="${f(ex)}" cy="${f(ey)}" rx="3" ry="2" fill="#3a1d3c" opacity=".12"/>`;
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
  const big = style === 'big' || style === 'bright' ? 1.08 : 1;
  const rx = 13.5 * big, ry = 17 * big;
  let streaks = '';
  if (rich && style !== 'soft') {
    const angs = [0.4, 1.1, 1.7, 2.4, 3];
    for (let i = 0; i < angs.length; i++) {
      const a = angs[i];
      streaks += `<path d="M${f(cx + 5 * Math.cos(a))} ${f(cy + 4 + 6 * Math.sin(a))} L${f(cx + 11 * Math.cos(a))} ${f(cy + 2 + 13 * Math.sin(a))}" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".28"/>`;
    }
  }
  const lid = style === 'sleepy'
    ? `<path d="M${cx - 16} ${cy - 2} Q${cx} ${cy + 6} ${cx + 16} ${cy - 2} L${cx + 16} ${cy - 18} Q${cx} ${cy - 24} ${cx - 16} ${cy - 18} Z" fill="var(--skin)"/>`
    : '';
  const spark = style === 'sparkle' || style === 'bright'
    ? `<path d="M${cx + 8 * s} ${cy - 12} l1 2.2 2.2 1 -2.2 1 -1 2.2 -1 -2.2 -2.2 -1 2.2 -1 Z" fill="#fff"/>`
    : '';
  const iris = rich ? `<ellipse cx="${cx}" cy="${cy + 1}" rx="${f(rx)}" ry="${f(ry)}" fill="url(#${u}i)"/>` : '';
  return `<ellipse cx="${cx}" cy="${cy + 1}" rx="${f(rx + 2)}" ry="${f(ry + 2)}" fill="#fff"/>`
    + `<ellipse cx="${cx}" cy="${cy + 1}" rx="${f(rx)}" ry="${f(ry)}" fill="var(--eye)"/>${iris}${streaks}`
    + `<ellipse cx="${cx}" cy="${cy + 3}" rx="${f(7 * big)}" ry="${f(9 * big)}" fill="#1f1020" opacity=".8"/>`
    + `<ellipse cx="${cx}" cy="${cy + 1}" rx="${f(rx)}" ry="${f(ry)}" fill="none" stroke="#1f1020" stroke-width="1.6" opacity=".5"/>`
    + `<ellipse cx="${cx - 5 * s}" cy="${cy - 6}" rx="5" ry="6" fill="#fff" transform="rotate(${-12 * s} ${cx - 5 * s} ${cy - 6})"/>`
    + `<circle cx="${cx + 5 * s}" cy="${cy + 7}" r="2.4" fill="#fff"/>${spark}`
    + `<path d="M${cx - 16} ${cy - 2} Q${cx} ${cy - 22} ${cx + 16} ${cy - 4}" fill="none" stroke="var(--lash)" stroke-width="${style === 'soft' ? 3.2 : 4.2}" stroke-linecap="round"/>`
    + (style === 'soft' ? '' : `<path d="M${cx - 15 * s} ${cy - 6} q${-5 * s} -2 ${-8 * s} -7" fill="none" stroke="var(--lash)" stroke-width="2.2" stroke-linecap="round"/>`)
    + lid;
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
    + '<path d="M64 86 q10 -6 21 -2" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/><path d="M115 84 q11 -4 21 2" fill="none" stroke="var(--brow)" stroke-width="3.2" stroke-linecap="round"/>'
    + eye(76, 112, false, u, look.eyes, rich) + eye(124, 112, true, u, look.eyes, rich)
    + '<path d="M98 131 q2 1.6 4 0" fill="none" stroke="var(--line)" stroke-width="2" stroke-linecap="round" opacity=".55"/>'
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
  const style = [
    '--line:#5a3d5c',
    `--skin:${L.skin}`,
    `--hair:${L.hairC}`,
    `--hair-shade:${darken(L.hairC, 0.32)}`,
    `--brow:${darken(L.hairC, 0.2)}`,
    `--eye:${L.eyeC}`,
    '--lash:#3b2340',
    '--blush:#ff6f91',
    `--freckle:${darken(L.skin, 0.35)}`,
    `--top:${L.dress ? L.dressC : L.topC}`,
    `--top-trim:${darken(L.dress ? L.dressC : L.topC, 0.18)}`,
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
  const shadow = `<g class="shadow"><ellipse cx="100" cy="308" rx="52" ry="8" fill="url(#${u}s)"/><ellipse cx="87" cy="307" rx="14" ry="3.2" fill="#3a1d3c" opacity=".16"/><ellipse cx="113" cy="307" rx="14" ry="3.2" fill="#3a1d3c" opacity=".16"/></g>`;
  const layers = [
    `<g data-layer="hair-back">${wrapHead(hairBack(L.hair, u, rich), pose)}</g>`,
    body,
    shoesLayer(pose, L),
    wrapHip(bottomLayer(pose, L, u, rich), pose),
    wrapHip(top, pose),
    wrapHip(bottomOverLayer(pose, L, u, rich), pose),
    `<g data-layer="face">${wrapHead(face(L, u, rich), pose)}</g>`,
    `<g data-layer="hair-front">${wrapHead(hairFront(L.hair, u, rich), pose)}</g>`,
    wrapHead(accessoryLayer(L), pose),
  ].join('');
  const shownTop = L.dress || L.top;
  return `<svg data-chibi="1" data-hair="${L.hair}" data-top="${shownTop}" viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" style="${style}">${defs(u, rich)}${shadow}${layers}</svg>`;
}
