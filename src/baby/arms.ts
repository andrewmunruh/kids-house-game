// Two cradle arms, drawn in the doll's own viewBox. One stays in her SVG (under
// the baby). One is a front layer (over the blanket). Hanging arms are separate.

const INK = '#5a3d5c';

export function cradleSkin(hex: string | undefined | null): string {
  return hex && /^#[0-9a-fA-F]{6}$/.test(hex) ? hex.toLowerCase() : '#f1c27d';
}

/**
 * Shoulder, elbow outside the bundle, then a hand.
 * Classic viewBox is 100×160. The chest slot is about x 18–82, y 88–133.
 * Chibi viewBox is 200×320. The same slot is about x 37–163, y 177–267.
 * The upper arm rides just above the bundle so it still meets the shoulder.
 * The under hand sits below the bundle. The over hand rests on the blanket,
 * on the right, clear of the baby's face (the head is the left end).
 */
function bend(which: 'under' | 'over', chibi: boolean): { d: string; hx: number; hy: number; sw: number; ow: number; hr: number; hs: number } {
  if (chibi) {
    // Shoulder width ~18 plus a 4.2 outline. Hand matches that mitten.
    // Elbows sit beside the bundle. The under hand is below it. The over hand is on the blanket.
    return which === 'under'
      ? { d: 'M72 174 L8 226 L96 282', hx: 96, hy: 282, sw: 16, ow: 20.2, hr: 10, hs: 4.2 }
      : { d: 'M128 174 L194 226 L124 232', hx: 124, hy: 232, sw: 16, ow: 20.2, hr: 10, hs: 4.2 };
  }
  // Classic arm rect is 12 wide with a 3.5 outline. Hand circle matches that width.
  return which === 'under'
    ? { d: 'M22 84 L0 118 L48 150', hx: 48, hy: 150, sw: 12, ow: 15.5, hr: 7, hs: 3.5 }
    : { d: 'M78 84 L100 118 L54 118', hx: 54, hy: 118, sw: 12, ow: 15.5, hr: 7, hs: 3.5 };
}

/** One arm: outline, skin, then the hand. No l/r class, so it does not swing. */
export function cradleArm(which: 'under' | 'over', chibi: boolean, skin: string): string {
  const a = bend(which, chibi);
  const tone = cradleSkin(skin);
  const cap = 'fill="none" stroke-linecap="round" stroke-linejoin="round"';
  return `<g class="arm cradle">`
    + `<path d="${a.d}" ${cap} stroke="${INK}" stroke-width="${a.ow}"/>`
    + `<path d="${a.d}" ${cap} stroke="${tone}" stroke-width="${a.sw}"/>`
    + `<circle cx="${a.hx}" cy="${a.hy}" r="${a.hr}" fill="${tone}" stroke="${INK}" stroke-width="${a.hs}"/>`
    + `</g>`;
}
