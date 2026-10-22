// Two cradle arms, drawn in the doll's own viewBox. One stays in her SVG (under
// the baby). One is a front layer (over the blanket). Hanging arms are separate.
// Each arm is a short bend: shoulder, an elbow beside the bundle, a hand on it.

const INK = '#5a3d5c';

export function cradleSkin(hex: string | undefined | null): string {
  return hex && /^#[0-9a-fA-F]{6}$/.test(hex) ? hex.toLowerCase() : '#f1c27d';
}

interface Bend { d: string; sleeve: string; hx: number; hy: number }

/**
 * Classic viewBox is 100×160. The chest slot is about x 17–83, y 87–135.
 * Chibi viewBox is 200×320. The same slot is about x 33–167, y 174–269.
 * Stand and sit lay the portrait with her head to the left, so the blanket is on the right.
 * Lie turns that same slot head-up, so the blanket is on the left of the slot.
 * The under elbow stays just outside the bundle. The hand center stays on it.
 */
function bend(which: 'under' | 'over', chibi: boolean, lie: boolean): Bend {
  if (chibi) {
    if (lie) {
      return which === 'under'
        ? { d: 'M72 176 C36 214 40 258 96 252', sleeve: 'M72 176 C54 194 46 206 44 214', hx: 96, hy: 252 }
        : { d: 'M128 176 C118 200 100 220 92 232', sleeve: 'M128 176 C122 188 118 196 114 204', hx: 92, hy: 232 };
    }
    return which === 'under'
      ? { d: 'M72 176 C40 206 38 248 78 252', sleeve: 'M72 176 C56 190 48 200 46 208', hx: 78, hy: 252 }
      : { d: 'M128 176 C150 198 148 220 132 226', sleeve: 'M128 176 C140 186 146 194 148 200', hx: 132, hy: 226 };
  }
  if (lie) {
    return which === 'under'
      ? { d: 'M22 84 C10 112 14 136 46 130', sleeve: '', hx: 46, hy: 130 }
      : { d: 'M78 84 C68 98 52 108 48 118', sleeve: '', hx: 48, hy: 118 };
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
