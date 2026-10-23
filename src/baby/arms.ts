// Two cradle arms, drawn in the doll's own viewBox. One stays in her SVG (under
// the baby). One is a front layer (over the blanket). Hanging arms are separate.
// Each arm is a short bend: shoulder, an elbow beside the bundle, a hand on it.

const INK = '#5a3d5c';

export function cradleSkin(hex: string | undefined | null): string {
  return hex && /^#[0-9a-fA-F]{6}$/.test(hex) ? hex.toLowerCase() : '#f1c27d';
}

interface Bend { d: string; sleeve: string; hx: number; hy: number }

/**
 * Standing chibi only, in the 120×192 doll box. Her chest point is y 114 and her
 * waist is y 138. This slot is a little larger than her shirt and centered on the chest.
 * Sit and lie keep their own slot.
 */
export const CHIBI_STAND_SLOT = { x: 60, y: 118, w: 56, h: 40 };

/**
 * Classic viewBox is 100×160. Stand and sit use the approved slot, about x 17–83, y 87–135.
 * Those two bends stay as they are. Classic lying stays the near arm only.
 * Chibi viewBox is 200×320. Sit keeps the chest-width slot. Lie keeps the near arm.
 * Standing holds a slightly larger bundle on the chest, and both mittens land on it.
 * The elbow stays just outside the bundle. The hand center stays on it, off the face.
 */
function bend(which: 'under' | 'over', chibi: boolean, pose?: 'sit' | 'lie' | null): Bend | null {
  // The shoulder beside her crown cannot reach the blanket without covering an eye.
  if (pose === 'lie' && which === 'over') return null;
  if (chibi && pose === 'lie') {
    return { d: 'M72 172 C36 200 40 228 88 220', sleeve: 'M72 172 C52 186 44 196 42 204', hx: 88, hy: 220 };
  }
  if (chibi && pose === 'sit') {
    return which === 'under'
      ? { d: 'M72 172 C40 190 46 220 108 228', sleeve: 'M72 172 C56 178 46 184 42 188', hx: 108, hy: 228 }
      : { d: 'M128 172 C154 192 150 214 118 208', sleeve: 'M128 172 C142 180 148 186 150 190', hx: 118, hy: 208 };
  }
  if (chibi) {
    // The upper mitten sits on the blanket. The lower hand comes up onto the same bundle.
    return which === 'under'
      ? { d: 'M72 172 C40 196 48 222 112 214', sleeve: 'M72 172 C56 178 46 184 42 188', hx: 112, hy: 214 }
      : { d: 'M128 172 C158 180 154 200 124 196', sleeve: 'M128 172 C144 178 150 184 154 188', hx: 124, hy: 196 };
  }
  if (pose === 'lie') {
    return { d: 'M22 84 C10 112 14 136 46 130', sleeve: '', hx: 46, hy: 130 };
  }
  return which === 'under'
    ? { d: 'M22 84 C14 104 12 128 44 130', sleeve: '', hx: 44, hy: 130 }
    : { d: 'M78 84 C90 98 86 118 64 114', sleeve: '', hx: 64, hy: 114 };
}

function mitten(hx: number, hy: number, skin: string): string {
  const d = `M${hx - 8} ${hy - 1} Q${hx - 9} ${hy - 11} ${hx} ${hy - 11} Q${hx + 9} ${hy - 11} ${hx + 9} ${hy} Q${hx + 9} ${hy + 9} ${hx} ${hy + 10} Q${hx - 9} ${hy + 9} ${hx - 8} ${hy - 1} Z`;
  const thumb = `<ellipse cx="${hx + 8}" cy="${hy - 2}" rx="3.2" ry="5" fill="${skin}" stroke="${INK}" stroke-width="3.4" transform="rotate(-24 ${hx + 8} ${hy - 2})"/>`;
  return `<path class="cradle-hand" data-cx="${hx}" data-cy="${hy}" d="${d}" fill="${skin}" stroke="${INK}" stroke-width="3.9"/>${thumb}`;
}

/** One arm. No l/r class, so it does not swing. Chibi arms wear her sleeve and a mitten. */
export function cradleArm(which: 'under' | 'over', chibi: boolean, skin: string, pose?: 'sit' | 'lie' | null, sleeve?: string): string {
  const a = bend(which, chibi, pose);
  if (!a) return '';
  const tone = cradleSkin(skin);
  const cloth = sleeve && /^#[0-9a-fA-F]{6}$/.test(sleeve) ? sleeve.toLowerCase() : '';
  const cap = 'fill="none" stroke-linecap="round" stroke-linejoin="round"';
  const sw = chibi ? 16 : 12;
  const ow = chibi ? 20.2 : 15.5;
  let arm = `<path d="${a.d}" ${cap} stroke="${INK}" stroke-width="${ow}"/>`
    + `<path d="${a.d}" ${cap} stroke="${tone}" stroke-width="${sw}"/>`;
  if (chibi && a.sleeve && cloth) {
    arm += `<path d="${a.sleeve}" ${cap} stroke="${INK}" stroke-width="29"/>`
      + `<path d="${a.sleeve}" ${cap} stroke="${cloth}" stroke-width="22"/>`;
  }
  const hand = chibi
    ? mitten(a.hx, a.hy, tone)
    : `<circle class="cradle-hand" data-cx="${a.hx}" data-cy="${a.hy}" cx="${a.hx}" cy="${a.hy}" r="7" fill="${tone}" stroke="${INK}" stroke-width="3.5"/>`;
  return `<g class="arm cradle">${arm}${hand}</g>`;
}
