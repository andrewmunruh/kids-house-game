// Near-side riding leg in the horse's 160×130 viewBox. Same class names as the classic leg
// (thigh, shin, shoe, knee) so the saddle checks can find them.
// The chibi kid is much smaller than the horse, so these strokes stay at standing-leg size:
// a short bend down the barrel, a shoe about mid-side, never a disc or a leg to the ground.
import type { Look2 } from '../shared/avatar';
import { fillLook2 } from '../shared/avatar';

const INK = '#5a3d5c';

function tube(cls: string, d: string, col: string, outer: number, inner: number): string {
  return `<path class="${cls}" d="${d}" fill="none" stroke="${INK}" stroke-width="${outer}" stroke-linecap="round"/>`
    + `<path class="${cls} cloth" d="${d}" fill="none" stroke="${col}" stroke-width="${inner}" stroke-linecap="round"/>`;
}

export function chibiRideLeg(look: Look2): string {
  const L = fillLook2(look);
  const skin = L.skin;
  const dressed = L.dress !== '';
  const bare = dressed || L.bottom === 'skirt' || L.bottom === 'tutu';
  const thigh = bare ? skin : L.bottomC;
  const shoe = L.shoesC;
  const draped = dressed || L.bottom === 'skirt' || L.bottom === 'tutu';
  let out = '';
  if (draped) {
    const cloth = dressed ? L.dressC : L.bottomC;
    out += `<path class="dress" d="M75 46 L89 46 L91 53 L73 53 Z" fill="${cloth}" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round"/>`;
  }
  out += tube('thigh', 'M76 44 Q83 48 88 54', thigh, 6.2, 4.8);
  out += `<circle class="knee" cx="88" cy="56" r="2.3" fill="${thigh}" stroke="${INK}" stroke-width="1.1"/>`;
  const boots = L.shoes === 'boots' || L.shoes === 'rainboots';
  out += tube('shin', boots ? 'M88 58 Q90 64 91 68' : 'M88 58 Q90 65 91 70', bare ? skin : thigh, 5.8, 4.4);
  if (!boots && (L.shoes === 'sneakers' || L.shoes === 'maryjanes' || L.shoes === 'lightup')) {
    out += tube('shin', 'M90 66 Q90.6 68 91 70', '#ffffff', 5.4, 4);
  }
  const foot = L.shoes === 'sandals' ? skin : shoe;
  const y0 = boots ? 66 : 69;
  out += `<path class="shoe" d="M90 ${y0} Q90 ${y0 - 2} 94 ${y0 - 2} Q99 ${y0 - 2} 100 ${y0 + 1} Q100 ${y0 + 5} 95 ${y0 + 5} Q90 ${y0 + 5} 90 ${y0 + 2} Z" fill="${foot}" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round"/>`;
  if (L.shoes === 'sandals') {
    out += `<path d="M90 ${y0 + 5} L100 ${y0 + 5}" stroke="${shoe}" stroke-width="1.3" stroke-linecap="round"/>`;
    out += `<path d="M93 ${y0} L97 ${y0 + 3}" stroke="${shoe}" stroke-width="1.1" stroke-linecap="round"/>`;
  }
  return `<svg class="rideleg" viewBox="0 0 160 130">${out}</svg>`;
}
