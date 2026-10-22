import type { Character } from './shared/state';
import type { Look2 } from './shared/avatar';
import { chibiCradleFront, chibiSVG, handsOf, poseFor } from './avatar/draw';
import { cradleArm, cradleSkin } from './baby/arms';
import { poseNamed } from './avatar/sit';
import type { Pose } from './avatar/geom';
import { richAvatars } from './avatar/motion';
const O = '#5a3d5c';
const s = `stroke="${O}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`;

export const SKINS = ['#ffe0c4', '#f1c27d', '#e0ac69', '#c68642', '#8d5524', '#5c3a1e'];
export const HAIRS = ['#2b1d16', '#5b3a29', '#a0522d', '#f4d58d', '#ff8fab', '#8ecae6', '#b388d6', '#ff9f43'];
export const CLOTHES = ['#ff7aa8', '#ffd166', '#5aa9e6', '#80ed99', '#c9a0dc', '#ff9f68', '#ffffff', '#5a3d5c'];
export const HAIR_STYLES = 4;
export const ACCESSORIES = 4; // none, bow, glasses, cap
export const SIZES: Character['size'][] = ['little', 'kid', 'adult'];
export const SIZE_SCALE: Record<Character['size'], number> = { little: 0.78, kid: 1, adult: 1.28 };
/** Hand anchor points in the character's 100x160 viewBox (unflipped). */
export const HANDS = { left: { x: 15, y: 113 }, right: { x: 85, y: 113 } } as const;
export function handsFor(c: { look2?: Look2 | null }, pose?: Pose | null) {
  if (c.look2) return handsOf(pose ?? poseFor(c.look2));
  if (pose) return { left: { x: 22, y: 96 }, right: { x: 78, y: 96 } };
  return HANDS;
}

function accessory(a: number, c: string) {
  if (a === 1) return `<path d="M62 16 L76 8 L76 26 Z M62 16 L50 6 L48 24 Z" fill="#ff7aa8" stroke="${O}" stroke-width="3" stroke-linejoin="round"/><circle cx="62" cy="16" r="5" fill="#ffd166" stroke="${O}" stroke-width="3"/>`;
  if (a === 2) return `<circle cx="40" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${O}" stroke-width="3"/><circle cx="60" cy="48" r="9" fill="#fff" fill-opacity=".35" stroke="${O}" stroke-width="3"/><path d="M49 48 h2" stroke="${O}" stroke-width="3"/>`;
  if (a === 3) return `<path d="M20 30 Q22 8 50 8 Q78 8 80 30 Z" fill="${c}" stroke="${O}" stroke-width="3.5" stroke-linejoin="round"/><path d="M60 28 Q84 26 92 32 Q80 36 60 34 Z" fill="${c}" stroke="${O}" stroke-width="3.5" stroke-linejoin="round"/><circle cx="50" cy="9" r="4" fill="#fff" stroke="${O}" stroke-width="3"/>`;
  return '';
}

function hair(style: number, c: string, back: boolean) {
  if (back) {
    if (style === 1) return `<path d="M20 40 Q16 86 30 92 L70 92 Q84 86 80 40 Z" fill="${c}" ${s}/>`;
    if (style === 2) return `<circle cx="18" cy="34" r="12" fill="${c}" ${s}/><circle cx="82" cy="34" r="12" fill="${c}" ${s}/>`;
    if (style === 3) return `<circle cx="50" cy="8" r="13" fill="${c}" ${s}/>`;
    return '';
  }
  if (style === 3) return `<path d="M22 42 Q20 14 50 12 Q80 14 78 42 Q66 26 50 30 Q34 26 22 42 Z" fill="${c}" ${s}/>`;
  return `<path d="M21 46 Q18 12 50 12 Q82 12 79 46 Q72 30 58 28 Q50 36 36 30 Q26 34 21 46 Z" fill="${c}" ${s}/>`;
}

export function characterSVG(c: Pick<Character, 'skin' | 'hair' | 'hairStyle' | 'shirt' | 'pants'> & { acc?: number; look2?: Look2 | null }, poseName?: 'sit' | 'lie' | null, holding?: boolean) {
  const pose = poseNamed(poseName);
  if (c.look2) return chibiSVG(c.look2, { rich: richAvatars(), pose: pose ?? undefined, poseName: poseName || undefined, holding });
  if (poseName === 'sit' || poseName === 'lie') return classicPose(c, poseName, holding);
  return `<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
  <ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${hair(c.hairStyle, c.hair, true)}
  <rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${c.pants}" ${s}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${c.pants}" ${s}/>
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${O}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${O}"/>
  <rect class="arm hang" x="16" y="80" width="12" height="34" rx="6" fill="${c.skin}" ${s} transform="rotate(12 22 82)"/>
  <rect class="arm hang" x="72" y="80" width="12" height="34" rx="6" fill="${c.skin}" ${s} transform="rotate(-12 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${c.shirt}" ${s}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${c.skin}" ${s}/>
  <circle cx="50" cy="44" r="30" fill="${c.skin}" ${s}/>
  ${hair(c.hairStyle, c.hair, false)}
  <ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${O}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${O}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${s} fill="none"/>
  ${accessory(c.acc ?? 0, c.shirt)}
  <circle class="hand hang" cx="${HANDS.left.x}" cy="${HANDS.left.y}" r="6" fill="${c.skin}" ${s}/><circle class="hand hang" cx="${HANDS.right.x}" cy="${HANDS.right.y}" r="6" fill="${c.skin}" ${s}/>
  ${holding ? cradleArm('under', false, cradleSkin(c.skin)) : ''}
</svg>`;
}

/** The arm that rests on the blanket, in a layer above the baby. */
export function cradleFrontSVG(c: Pick<Character, 'skin'> & { look2?: Look2 | null }, poseName?: 'sit' | 'lie' | null): string {
  if (c.look2) return chibiCradleFront(c.look2, poseName);
  return `<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">${cradleArm('over', false, cradleSkin(c.skin))}</svg>`;
}

/** Classic dolls have no chibi look. Sit bends the legs. Lie closes the eyes. The CSS pose turns the body once. */
function classicPose(c: { skin: string; hair: string; hairStyle: number; shirt: string; pants: string; acc?: number }, poseName: 'sit' | 'lie', holding?: boolean): string {
  const legs = poseName === 'sit'
    ? `<rect class="leg" x="34" y="108" width="13" height="28" rx="6" fill="${c.pants}" ${s} transform="rotate(-68 40 112)"/>
  <rect class="leg" x="53" y="108" width="13" height="28" rx="6" fill="${c.pants}" ${s} transform="rotate(68 60 112)"/>`
    : `<rect class="leg" x="34" y="118" width="13" height="34" rx="6" fill="${c.pants}" ${s}/>
  <rect class="leg" x="53" y="118" width="13" height="34" rx="6" fill="${c.pants}" ${s}/>`;
  const eyes = poseName === 'lie'
    ? `<path d="M34 48 Q40 52 46 48" fill="none" ${s}/><path d="M54 48 Q60 52 66 48" fill="none" ${s}/>`
    : `<ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${O}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${O}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>`;
  const body = `<ellipse class="shadow" cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${hair(c.hairStyle, c.hair, true)}
  ${legs}
  <ellipse class="foot" cx="40" cy="152" rx="10" ry="5" fill="${O}"/><ellipse class="foot" cx="60" cy="152" rx="10" ry="5" fill="${O}"/>
  <rect class="arm hang" x="16" y="80" width="12" height="34" rx="6" fill="${c.skin}" ${s} transform="rotate(28 22 82)"/>
  <rect class="arm hang" x="72" y="80" width="12" height="34" rx="6" fill="${c.skin}" ${s} transform="rotate(-28 78 82)"/>
  <path class="shirt" data-hem="126" d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${c.shirt}" ${s}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${c.skin}" ${s}/>
  <g class="dollhead">
  <circle class="dollhead" data-dollhead="1" cx="50" cy="44" r="30" fill="${c.skin}" ${s}/>
  ${hair(c.hairStyle, c.hair, false)}
  ${eyes}
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${s} fill="none"/>
  ${accessory(c.acc ?? 0, c.shirt)}
  </g>
  <circle class="hand hang" cx="22" cy="96" r="6" fill="${c.skin}" ${s}/><circle class="hand hang" cx="78" cy="96" r="6" fill="${c.skin}" ${s}/>
  ${holding ? cradleArm('under', false, cradleSkin(c.skin)) : ''}`;
  // The lie turn is the pose-lie class. Rotating again here would spin her to -156°.
  return `<svg data-pose="${poseName}" viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}
