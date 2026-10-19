// Near-side riding leg in the horse's 160×130 viewBox. Same class names as the classic leg
// (thigh, shin, shoe, knee) so the saddle checks can find them. Shorter, and dressed for the outfit.
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
  const sock = '#ffffff';
  let out = tube('thigh', 'M72 58 L89 62', thigh, 10.5, 6.5);
  const boots = L.shoes === 'boots' || L.shoes === 'rainboots';
  if (boots) out += tube('shin', 'M89 63 L90.6 80', shoe, 11, 7.2);
  else out += tube('shin', 'M89 63 L90.5 77', skin, 10, 6.2);
  if (!boots && (L.shoes === 'sneakers' || L.shoes === 'maryjanes' || L.shoes === 'lightup')) {
    out += tube('shin', 'M90.2 74 L90.6 79', sock, 10, 6.2);
  }
  const foot = L.shoes === 'sandals' ? skin : shoe;
  out += `<path class="shoe" d="M85.5 81 Q85.5 77 90.5 77 Q95.5 77 96 80 Q100 81 100 83.5 Q100 86 97 86 H87 Q85 86 85.5 83 Z" fill="${foot}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
  out += `<circle class="knee" cx="89" cy="62" r="4.2" fill="${thigh}" stroke="${INK}" stroke-width="2.4"/>`;
  if (L.shoes === 'sandals') {
    out += `<path d="M85 86.5 H100" stroke="${shoe}" stroke-width="2.6" stroke-linecap="round"/>`;
    out += `<path d="M88 80 L94 83" stroke="${shoe}" stroke-width="2.2" stroke-linecap="round"/>`;
  }
  if (dressed) {
    out += `<path d="M66 52 Q80 54 86 62 Q80 68 68 66 Z" fill="${L.dressC}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
  }
  return `<svg class="rideleg" viewBox="0 0 160 130">${out}</svg>`;
}
