import type { Character } from './state';
const O = '#5a3d5c';
const s = `stroke="${O}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`;

export const SKINS = ['#ffe0c4', '#f1c27d', '#e0ac69', '#c68642', '#8d5524', '#5c3a1e'];
export const HAIRS = ['#2b1d16', '#5b3a29', '#a0522d', '#f4d58d', '#ff8fab', '#8ecae6', '#b388d6', '#ff9f43'];
export const CLOTHES = ['#ff7aa8', '#ffd166', '#5aa9e6', '#80ed99', '#c9a0dc', '#ff9f68', '#ffffff', '#5a3d5c'];
export const HAIR_STYLES = 4;

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

export function characterSVG(c: Pick<Character, 'skin' | 'hair' | 'hairStyle' | 'shirt' | 'pants'>) {
  return `<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="50" cy="156" rx="28" ry="4" fill="#000" opacity=".12"/>
  ${hair(c.hairStyle, c.hair, true)}
  <rect x="34" y="118" width="13" height="34" rx="6" fill="${c.pants}" ${s}/>
  <rect x="53" y="118" width="13" height="34" rx="6" fill="${c.pants}" ${s}/>
  <ellipse cx="40" cy="152" rx="10" ry="5" fill="${O}"/><ellipse cx="60" cy="152" rx="10" ry="5" fill="${O}"/>
  <rect x="16" y="80" width="12" height="34" rx="6" fill="${c.skin}" ${s} transform="rotate(12 22 82)"/>
  <rect x="72" y="80" width="12" height="34" rx="6" fill="${c.skin}" ${s} transform="rotate(-12 78 82)"/>
  <path d="M28 82 Q28 74 40 74 H60 Q72 74 72 82 L74 126 H26 Z" fill="${c.shirt}" ${s}/>
  <circle cx="50" cy="96" r="5" fill="#fff" opacity=".7"/>
  <rect x="44" y="64" width="12" height="12" fill="${c.skin}" ${s}/>
  <circle cx="50" cy="44" r="30" fill="${c.skin}" ${s}/>
  ${hair(c.hairStyle, c.hair, false)}
  <ellipse cx="40" cy="48" rx="3.5" ry="4.5" fill="${O}"/><ellipse cx="60" cy="48" rx="3.5" ry="4.5" fill="${O}"/>
  <circle cx="41" cy="46.5" r="1.3" fill="#fff"/><circle cx="61" cy="46.5" r="1.3" fill="#fff"/>
  <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/><ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff8fab" opacity=".6"/>
  <path d="M44 60 Q50 66 56 60" ${s} fill="none"/>
</svg>`;
}
