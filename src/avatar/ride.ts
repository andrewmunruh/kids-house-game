// Near-side riding leg in the horse's 160×130 viewBox. Same class names as the classic leg
// (thigh, shin, shoe, knee) so the saddle checks can find them. Hips stay on the saddle;
// the near leg bends down the barrel and the far leg is not drawn.
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
  const draped = dressed || L.bottom === 'skirt' || L.bottom === 'tutu';
  let out = '';
  if (draped) {
    const cloth = dressed ? L.dressC : L.bottomC;
    out += `<path class="dress" d="M58 44 Q80 36 106 46 Q112 56 98 64 Q76 70 58 60 Q48 52 58 44 Z" fill="${cloth}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
  }
  out += tube('thigh', 'M70 50 Q90 46 108 60', thigh, 12, 7.6);
  out += `<circle class="knee" cx="108" cy="60" r="5.2" fill="${thigh}" stroke="${INK}" stroke-width="2.4"/>`;
  const boots = L.shoes === 'boots' || L.shoes === 'rainboots';
  if (boots) out += tube('shin', 'M108 64 Q122 80 116 100', shoe, 11, 7.2);
  else out += tube('shin', 'M108 64 Q122 78 116 96', skin, 10.5, 6.6);
  if (!boots && (L.shoes === 'sneakers' || L.shoes === 'maryjanes' || L.shoes === 'lightup')) {
    out += tube('shin', 'M118 86 Q117 92 116 96', sock, 10.5, 6.6);
  }
  const foot = L.shoes === 'sandals' ? skin : shoe;
  out += `<path class="shoe" d="M110 96 Q110 91 118 91 Q128 91 130 97 Q136 99 136 104 Q136 109 126 109 H114 Q108 109 110 102 Z" fill="${foot}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
  if (L.shoes === 'sandals') {
    out += `<path d="M110 109 H136" stroke="${shoe}" stroke-width="2.6" stroke-linecap="round"/>`;
    out += `<path d="M116 96 L126 104" stroke="${shoe}" stroke-width="2.2" stroke-linecap="round"/>`;
  }
  return `<svg class="rideleg" viewBox="0 0 160 130">${out}</svg>`;
}
