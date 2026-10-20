// Sit and lie drawings for the planning mockups. Not used by the game.
// The spike pose swings each leg out as one bone. These pictures bend the knee:
// hips on the cushion, thighs toward the viewer, lower legs hanging, feet at the bottom.
import { chibiSVG } from '../../src/avatar/draw';
import type { Look2 } from '../../src/shared/avatar';
import { fillLook2 } from '../../src/shared/avatar';
import type { Pose } from '../../src/avatar/geom';

/** Taller than the standing frame so the shins and shoes fit under the lap. */
export const SIT_VB = { w: 200, h: 400 };
/** Where the cushion meets the hips, in that viewBox. */
export const SIT_HIP = { x: 100, y: 242 };
/** Standing frame. Lie rotates this whole drawing. */
export const LIE_VB = { w: 200, h: 320 };
export const LIE_CENTER = { x: 100, y: 168 };

const REST: Pose = {
  hip: 0, head: 2, armL: 8, armR: -6, legL: 0, legR: 0, legLLift: 0, legRLift: 0,
};

function removeGroups(svg: string, drop: (open: string) => boolean): string {
  let i = 0;
  let out = '';
  while (i < svg.length) {
    if (svg.startsWith('<g', i) && (i + 2 === svg.length || /[\s>]/.test(svg[i + 2]))) {
      const end = svg.indexOf('>', i);
      const open = svg.slice(i, end + 1);
      if (drop(open)) {
        let depth = 1;
        let j = end + 1;
        while (depth > 0 && j < svg.length) {
          const nextOpen = svg.indexOf('<g', j);
          const nextClose = svg.indexOf('</g>', j);
          if (nextClose < 0) break;
          const openOk = nextOpen >= 0 && /[\s>]/.test(svg[nextOpen + 2] ?? '>');
          if (openOk && nextOpen < nextClose) {
            depth += 1;
            j = nextOpen + 2;
          } else {
            depth -= 1;
            j = nextClose + 4;
          }
        }
        i = j;
        continue;
      }
    }
    out += svg[i];
    i += 1;
  }
  return out;
}

/** Thigh forward, shin down, shoe overlapping the ankle. Everything stays in the viewBox. */
function sitLeg(side: 'l' | 'r', cloth: 'pants' | 'shorts' | 'skin'): string {
  const m = side === 'l' ? -1 : 1;
  const hipX = 100 + 16 * m;
  const kneeX = 100 + 46 * m;
  const ankleX = 100 + 40 * m;
  const shoeX = 100 + 34 * m;
  const thigh = cloth === 'skin' ? 'var(--skin)' : 'var(--bottom)';
  const shin = cloth === 'pants' ? 'var(--bottom)' : 'var(--skin)';
  const ink = '#5a3d5c';
  const tube = (d: string, color: string, width: number) =>
    `<path d="${d}" fill="none" stroke="${ink}" stroke-width="${width + 6}" stroke-linecap="round"/>`
    + `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
  const thighD = `M${hipX} 246 Q${100 + 28 * m} 268 ${kneeX} 292`;
  const shinD = `M${kneeX} 292 L${ankleX} 366`;
  const shoe = `M${shoeX - 18} 368 Q${shoeX - 20} 356 ${shoeX} 354 Q${shoeX + 20} 356 ${shoeX + 22} 368 Q${shoeX + 24} 382 ${shoeX + 8} 384 H${shoeX - 14} Q${shoeX - 22} 382 ${shoeX - 18} 368 Z`;
  return `<g class="sit-leg ${side}">`
    + tube(thighD, thigh, 22)
    + tube(shinD, shin, 16)
    + `<path d="${shoe}" fill="var(--shoe)" stroke="${ink}" stroke-width="3.5" stroke-linejoin="round"/>`
    + `</g>`;
}

function clothOf(look: Look2): 'pants' | 'shorts' | 'skin' {
  if (look.dress) return 'skin';
  if (look.bottom === 'shorts' || look.bottom === 'skirt' || look.bottom === 'tutu') return 'shorts';
  return 'pants';
}

/** Real chibi head, hair, clothes, and arms, with a knee bend drawn in the same group. */
export function seatedSVG(look: Look2, uid: string): string {
  const filled = fillLook2(look);
  const raw = chibiSVG(filled, { pose: REST, rich: true, uid });
  const stripped = removeGroups(raw, open => /class="leg[\s"]/.test(open) || /class="shadow"/.test(open));
  const tall = stripped.replace('viewBox="0 0 200 320"', `viewBox="0 0 ${SIT_VB.w} ${SIT_VB.h}"`);
  const legs = sitLeg('l', clothOf(filled)) + sitLeg('r', clothOf(filled));
  const withLegs = tall.replace('<g data-layer="shoes">', `<g data-layer="sit-legs">${legs}</g><g data-layer="shoes">`);
  return withLegs.replace(/^(<svg\b)/, '$1 class="avatar"').replace(/^(<svg\b[^>]*>)/, '$1<g class="avatar">').replace(/<\/svg>$/, '</g></svg>');
}

/** Standing chibi, shadow removed, ready to be turned onto the blanket. */
export function lyingSVG(look: Look2, uid: string): string {
  const raw = chibiSVG(fillLook2(look), { rich: true, uid });
  const stripped = removeGroups(raw, open => /class="shadow"/.test(open));
  return stripped.replace(/^(<svg\b)/, '$1 class="avatar"').replace(/^(<svg\b[^>]*>)/, '$1<g class="avatar">').replace(/<\/svg>$/, '</g></svg>');
}

export function artImg(file: string): string {
  return `<img class="art" alt="" src="../../../assets/art/any/${file}.webp">`;
}
