// Two cradle arms, drawn in the doll's own viewBox. One stays in her SVG (under
// the baby). One is a front layer (over the blanket). Hanging arms are separate.
// Each arm is a short bend: shoulder, an elbow beside the bundle, a hand on it.

const INK = '#5a3d5c';

export function cradleSkin(hex: string | undefined | null): string {
  return hex && /^#[0-9a-fA-F]{6}$/.test(hex) ? hex.toLowerCase() : '#f1c27d';
}

interface Bend { d: string; sleeve: string; hx: number; hy: number }

/**
 * Classic viewBox is 100×160. Stand and sit use the approved slot, about x 17–83, y 87–135.
 * Those two bends stay as they are.
 * Chibi viewBox is 200×320. Her slot is about x 66–134, y 190–240: chest width, on the chest.
 * Stand and sit lay the portrait with her head to the left, so the blanket is on the right.
 * Lie turns that slot head-up. The far arm would cross her eyes, so lie draws only the near arm.
 * The elbow stays just outside the bundle. The hand center stays on it, off the face.
 */
function bend(which: 'under' | 'over', chibi: boolean, lie: boolean): Bend | null {
  // The shoulder beside her crown cannot reach the blanket without covering an eye.
  if (lie && which === 'over') return null;
  if (chibi) {
    if (lie) {
      return { d: 'M72 172 C36 200 40 228 88 220', sleeve: 'M72 172 C52 186 44 196 42 204', hx: 88, hy: 220 };
    }
    return which === 'under'
      ? { d: 'M72 172 C40 190 46 220 108 228', sleeve: 'M72 172 C56 178 46 184 42 188', hx: 108, hy: 228 }
      : { d: 'M128 172 C154 192 150 214 118 208', sleeve: 'M128 172 C142 180 148 186 150 190', hx: 118, hy: 208 };
  }
  if (lie) {
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
  const a = bend(which, chibi, pose === 'lie');
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
