import { PACK_ITEMS } from './packs';
import { SECRET_ITEMS } from './eggs';
import { NURSERY_ITEMS } from './nursery';
import { YARD_ITEMS } from './yard';
import { BATH_ITEMS, EXTRA_ITEMS } from './bathroom';
import { rasterOn, rasterUrl } from './art/cache';
// Original rounded SVG art. Each item: viewBox 0 0 100 100, anchored bottom-center.
export type Category = string; // built-ins: furniture | decor | plants | food | pets (packs may add more)
export interface ItemDef { kind: string; name: string; cat: Category; w: number; h?: number; svg: string; wall?: boolean; img?: string; rooms?: string[]; pack?: string; holdable?: boolean; secret?: string; vb?: string; light?: boolean }

const O = '#5a3d5c'; // soft plum outline
const s = `stroke="${O}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`;
const eyes = (x1: number, x2: number, y: number) =>
  `<circle cx="${x1}" cy="${y}" r="3" fill="${O}"/><circle cx="${x2}" cy="${y}" r="3" fill="${O}"/><circle cx="${x1 + 1}" cy="${y - 1}" r="1" fill="#fff"/><circle cx="${x2 + 1}" cy="${y - 1}" r="1" fill="#fff"/>`;
const blush = (x1: number, x2: number, y: number) => `<ellipse cx="${x1}" cy="${y}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/><ellipse cx="${x2}" cy="${y}" rx="4" ry="2.5" fill="#ff9bb5" opacity=".7"/>`;
const shadow = `<ellipse cx="50" cy="97" rx="38" ry="3" fill="#000" opacity=".12"/>`;

export const ITEMS: ItemDef[] = [
  // ---------- furniture ----------
  { kind: 'sofa', name: 'Sofa', cat: 'furniture', w: 260, svg: `${shadow}<rect x="6" y="40" width="88" height="40" rx="16" fill="#ff8fab" ${s}/><rect x="16" y="28" width="68" height="30" rx="12" fill="#ffb3c6" ${s}/><rect x="2" y="48" width="18" height="38" rx="9" fill="#ff7096" ${s}/><rect x="80" y="48" width="18" height="38" rx="9" fill="#ff7096" ${s}/><rect x="20" y="60" width="60" height="18" rx="8" fill="#ffc2d1" ${s}/><rect x="14" y="86" width="6" height="10" rx="2" fill="${O}"/><rect x="80" y="86" width="6" height="10" rx="2" fill="${O}"/>` },
  { kind: 'armchair', name: 'Armchair', cat: 'furniture', w: 150, svg: `${shadow}<rect x="18" y="20" width="64" height="50" rx="20" fill="#8ecae6" ${s}/><rect x="6" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${s}/><rect x="72" y="46" width="22" height="40" rx="10" fill="#5fb0d8" ${s}/><rect x="24" y="58" width="52" height="24" rx="10" fill="#b8e0f2" ${s}/><rect x="20" y="86" width="6" height="10" rx="2" fill="${O}"/><rect x="74" y="86" width="6" height="10" rx="2" fill="${O}"/>` },
  { kind: 'bed', name: 'Bed', cat: 'furniture', w: 300, svg: `${shadow}<rect x="4" y="22" width="18" height="72" rx="8" fill="#c99366" ${s}/><rect x="80" y="44" width="16" height="50" rx="7" fill="#c99366" ${s}/><rect x="14" y="54" width="76" height="30" rx="10" fill="#fff" ${s}/><rect x="40" y="50" width="54" height="36" rx="12" fill="#a78bfa" ${s}/><circle cx="56" cy="64" r="3" fill="#fff"/><circle cx="72" cy="72" r="3" fill="#fff"/><circle cx="84" cy="60" r="3" fill="#fff"/><rect x="18" y="42" width="24" height="16" rx="8" fill="#fde2e4" ${s}/>` },
  { kind: 'table', name: 'Table', cat: 'furniture', w: 200, svg: `${shadow}<rect x="4" y="30" width="92" height="14" rx="7" fill="#f4a261" ${s}/><rect x="14" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${s}/><rect x="76" y="42" width="10" height="54" rx="5" fill="#e07a3f" ${s}/><path d="M8 40 h84" stroke="#fff" stroke-width="2" opacity=".5"/>` },
  { kind: 'chair', name: 'Chair', cat: 'furniture', w: 100, svg: `${shadow}<rect x="22" y="6" width="56" height="50" rx="14" fill="#90e0a8" ${s}/><rect x="16" y="52" width="68" height="14" rx="7" fill="#5cc985" ${s}/><rect x="22" y="64" width="9" height="32" rx="4" fill="#5cc985" ${s}/><rect x="69" y="64" width="9" height="32" rx="4" fill="#5cc985" ${s}/><circle cx="50" cy="30" r="8" fill="#fff" opacity=".6"/>` },
  { kind: 'lamp', name: 'Lamp', cat: 'furniture', w: 90, svg: `${shadow}<path d="M24 40 L34 6 H66 L76 40 Z" fill="#ffd166" ${s}/><rect x="46" y="40" width="8" height="48" rx="4" fill="#c9a0dc" ${s}/><ellipse cx="50" cy="92" rx="22" ry="6" fill="#b388d6" ${s}/><circle cx="44" cy="20" r="3" fill="#fff" opacity=".8"/>` },
  { kind: 'fridge', name: 'Fridge', cat: 'furniture', w: 150, svg: `${shadow}<rect x="16" y="4" width="68" height="90" rx="14" fill="#bde0fe" ${s}/><path d="M16 38 H84" ${s}/><rect x="70" y="14" width="5" height="16" rx="2" fill="${O}"/><rect x="70" y="46" width="5" height="22" rx="2" fill="${O}"/><circle cx="32" cy="22" r="5" fill="#ff8fab" ${s}/><rect x="28" y="54" width="12" height="12" rx="3" fill="#ffd166" ${s}/>` },
  { kind: 'stove', name: 'Stove', cat: 'furniture', w: 170, svg: `${shadow}<rect x="8" y="26" width="84" height="68" rx="12" fill="#ffadad" ${s}/><rect x="8" y="18" width="84" height="14" rx="6" fill="#ffd6a5" ${s}/><rect x="20" y="46" width="60" height="36" rx="8" fill="#5a3d5c" opacity=".85"/><rect x="26" y="52" width="48" height="8" rx="4" fill="#fff" opacity=".25"/><circle cx="22" cy="38" r="3" fill="${O}"/><circle cx="36" cy="38" r="3" fill="${O}"/><circle cx="78" cy="38" r="3" fill="${O}"/>` },
  { kind: 'bookshelf', name: 'Shelf', cat: 'furniture', w: 170, svg: `${shadow}<rect x="10" y="4" width="80" height="90" rx="10" fill="#d4a373" ${s}/><path d="M10 34 H90 M10 64 H90" ${s}/><rect x="18" y="12" width="8" height="22" rx="2" fill="#ff8fab" ${s}/><rect x="28" y="16" width="8" height="18" rx="2" fill="#8ecae6" ${s}/><rect x="38" y="12" width="8" height="22" rx="2" fill="#ffd166" ${s}/><rect x="60" y="42" width="8" height="22" rx="2" fill="#90e0a8" ${s}/><rect x="70" y="46" width="8" height="18" rx="2" fill="#c9a0dc" ${s}/><circle cx="34" cy="80" r="8" fill="#ffadad" ${s}/>` },
  { kind: 'tub', name: 'Bathtub', cat: 'furniture', w: 240, svg: `${shadow}<circle cx="30" cy="40" r="7" fill="#bde0fe" ${s}/><circle cx="44" cy="34" r="9" fill="#e0f2ff" ${s}/><circle cx="60" cy="40" r="7" fill="#bde0fe" ${s}/><path d="M4 48 H96 V62 Q96 90 70 90 H30 Q4 90 4 62 Z" fill="#fff" ${s}/><rect x="2" y="44" width="96" height="10" rx="5" fill="#ffc8dd" ${s}/><rect x="22" y="88" width="8" height="8" rx="2" fill="${O}"/><rect x="70" y="88" width="8" height="8" rx="2" fill="${O}"/>` },
  // ---------- decor ----------
  { kind: 'rug', name: 'Rug', cat: 'decor', w: 320, svg: `<ellipse cx="50" cy="82" rx="48" ry="14" fill="#ffc8dd" ${s}/><ellipse cx="50" cy="82" rx="34" ry="9" fill="#bde0fe" ${s}/><ellipse cx="50" cy="82" rx="18" ry="4.5" fill="#fff" ${s}/>` },
  { kind: 'picture', name: 'Picture', cat: 'decor', w: 130, wall: true, svg: `<rect x="10" y="20" width="80" height="64" rx="8" fill="#ffd166" ${s}/><rect x="18" y="28" width="64" height="48" rx="4" fill="#bde0fe"/><circle cx="66" cy="40" r="7" fill="#fff3b0"/><path d="M18 76 L38 50 L52 64 L62 54 L82 76 Z" fill="#90e0a8" ${s}/>` },
  { kind: 'window', name: 'Window', cat: 'decor', w: 180, wall: true, svg: `<rect class="winGlass" x="12" y="8" width="76" height="76" rx="38" fill="#a2d2ff" ${s}/><g class="winDay"><circle cx="34" cy="32" r="8" fill="#fff" opacity=".7"/></g><g class="winNight"><circle cx="62" cy="28" r="7" fill="#fff6d8"/><circle cx="28" cy="24" r="1.4" fill="#fff"/><circle cx="44" cy="20" r="1.1" fill="#fff"/><circle cx="70" cy="42" r="1.2" fill="#fff"/><circle cx="36" cy="46" r="1" fill="#fff"/></g><path d="M50 8 V84 M12 50 H88" ${s}/><path d="M4 8 Q20 40 10 90 M96 8 Q80 40 90 90" stroke="#ff8fab" stroke-width="9" fill="none" stroke-linecap="round"/>` },
  { kind: 'clock', name: 'Clock', cat: 'decor', w: 90, wall: true, svg: `<circle cx="50" cy="50" r="38" fill="#fff" ${s}/><circle cx="50" cy="50" r="30" fill="#fff3b0"/><path d="M50 50 V28 M50 50 L64 58" ${s}/><circle cx="50" cy="50" r="3" fill="${O}"/>${blush(30, 70, 66)}` },
  { kind: 'stars', name: 'Stars', cat: 'decor', w: 140, wall: true, svg: `<path d="M30 20 l5 10 11 2 -8 8 2 11 -10 -5 -10 5 2 -11 -8 -8 11 -2z" fill="#ffd166" ${s}/><path d="M70 40 l4 8 9 1 -6 6 1 9 -8 -4 -8 4 1 -9 -6 -6 9 -1z" fill="#ffadad" ${s}/><path d="M40 66 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill="#a2d2ff" ${s}/>` },
  { kind: 'balloon', name: 'Balloons', cat: 'decor', w: 110, svg: `<path d="M38 52 Q44 74 50 96 M64 46 Q58 72 50 96" stroke="${O}" stroke-width="2" fill="none"/><ellipse cx="36" cy="32" rx="18" ry="22" fill="#ff8fab" ${s}/><ellipse cx="66" cy="28" rx="18" ry="22" fill="#a2d2ff" ${s}/><ellipse cx="30" cy="24" rx="4" ry="7" fill="#fff" opacity=".6"/>` },
  { kind: 'teddy', name: 'Teddy', cat: 'decor', w: 100, svg: `${shadow}<circle cx="26" cy="22" r="10" fill="#d4a373" ${s}/><circle cx="74" cy="22" r="10" fill="#d4a373" ${s}/><ellipse cx="50" cy="72" rx="28" ry="24" fill="#d4a373" ${s}/><circle cx="50" cy="38" r="26" fill="#e6b88a" ${s}/>${eyes(40, 60, 36)}<ellipse cx="50" cy="48" rx="8" ry="6" fill="#fff3e0"/><circle cx="50" cy="46" r="2.5" fill="${O}"/>${blush(32, 68, 46)}` },
  { kind: 'ball', name: 'Ball', cat: 'decor', w: 70, svg: `${shadow}<circle cx="50" cy="58" r="36" fill="#ffd166" ${s}/><path d="M18 46 Q50 66 82 46 M26 82 Q50 60 74 82" stroke="#ff7096" stroke-width="7" fill="none"/>` },
  { kind: 'tv', name: 'TV', cat: 'decor', w: 170, svg: `${shadow}<rect x="6" y="14" width="88" height="62" rx="14" fill="#c9a0dc" ${s}/><rect x="16" y="22" width="68" height="46" rx="8" fill="#a2d2ff"/><path d="M30 6 L44 14 M70 6 L56 14" ${s}/><rect x="36" y="78" width="28" height="16" rx="4" fill="#b388d6" ${s}/>${eyes(42, 58, 42)}<path d="M44 52 q6 5 12 0" ${s} fill="none"/>` },
  // ---------- plants ----------
  { kind: 'plant', name: 'Plant', cat: 'plants', w: 110, svg: `${shadow}<ellipse cx="34" cy="38" rx="12" ry="26" fill="#74c69d" ${s} transform="rotate(-25 34 38)"/><ellipse cx="66" cy="38" rx="12" ry="26" fill="#52b788" ${s} transform="rotate(25 66 38)"/><ellipse cx="50" cy="30" rx="12" ry="28" fill="#95d5b2" ${s}/><path d="M24 62 H76 L70 94 H30 Z" fill="#ff9f68" ${s}/><rect x="20" y="58" width="60" height="10" rx="5" fill="#ffb385" ${s}/>` },
  { kind: 'cactus', name: 'Cactus', cat: 'plants', w: 80, svg: `${shadow}<rect x="36" y="12" width="28" height="64" rx="14" fill="#80ed99" ${s}/><path d="M36 50 H24 a8 8 0 0 1 -8 -8 V34" fill="none" stroke="${O}" stroke-width="3.5"/><rect x="12" y="26" width="12" height="22" rx="6" fill="#80ed99" ${s}/><circle cx="50" cy="12" r="6" fill="#ff8fab" ${s}/>${eyes(44, 56, 40)}<path d="M28 74 H72 L66 96 H34 Z" fill="#c9a0dc" ${s}/>` },
  { kind: 'flowers', name: 'Flowers', cat: 'plants', w: 90, svg: `${shadow}<path d="M50 70 V30 M50 60 Q30 50 30 30 M50 60 Q70 50 70 30" stroke="#52b788" stroke-width="4" fill="none"/><circle cx="50" cy="26" r="10" fill="#ff8fab" ${s}/><circle cx="30" cy="28" r="9" fill="#ffd166" ${s}/><circle cx="70" cy="28" r="9" fill="#a2d2ff" ${s}/><circle cx="50" cy="26" r="3" fill="#fff"/><path d="M32 66 H68 L62 96 H38 Z" fill="#a2d2ff" ${s}/>` },
  { kind: 'tree', name: 'Mini Tree', cat: 'plants', w: 140, svg: `${shadow}<rect x="44" y="54" width="12" height="30" rx="4" fill="#b07d54" ${s}/><circle cx="50" cy="36" r="30" fill="#52b788" ${s}/><circle cx="38" cy="30" r="5" fill="#ff8fab"/><circle cx="62" cy="40" r="5" fill="#ff8fab"/><circle cx="52" cy="22" r="5" fill="#ff8fab"/><path d="M28 80 H72 L66 96 H34 Z" fill="#ffd166" ${s}/>` },
  // ---------- food ----------
  { kind: 'cake', name: 'Cake', cat: 'food', w: 100, svg: `<rect x="16" y="50" width="68" height="40" rx="10" fill="#ffc8dd" ${s}/><path d="M16 58 q8 10 17 0 q8 10 17 0 q8 10 17 0 q8 10 17 0" fill="#fff" ${s}/><rect x="46" y="28" width="8" height="22" rx="3" fill="#a2d2ff" ${s}/><path d="M50 14 q6 8 0 12 q-6 -4 0 -12" fill="#ffd166" ${s}/><ellipse cx="50" cy="92" rx="40" ry="5" fill="#fff" ${s}/>` },
  { kind: 'apple', name: 'Apple', cat: 'food', w: 60, svg: `<path d="M50 30 C20 18 8 50 22 74 C32 92 44 90 50 86 C56 90 68 92 78 74 C92 50 80 18 50 30 Z" fill="#ff6b6b" ${s}/><path d="M50 30 Q52 16 58 10" ${s} fill="none"/><ellipse cx="64" cy="18" rx="9" ry="5" fill="#80ed99" ${s} transform="rotate(-20 64 18)"/><ellipse cx="34" cy="46" rx="5" ry="9" fill="#fff" opacity=".5"/>` },
  { kind: 'donut', name: 'Donut', cat: 'food', w: 70, svg: `<circle cx="50" cy="58" r="36" fill="#e9c46a" ${s}/><path d="M18 52 Q20 26 50 24 Q80 26 82 52 Q76 62 66 56 Q56 66 46 58 Q34 66 24 58 Z" fill="#ff8fab" ${s}/><circle cx="50" cy="52" r="10" fill="#fff" ${s}/><rect x="30" y="36" width="6" height="3" rx="1.5" fill="#a2d2ff" transform="rotate(30 33 37)"/><rect x="64" y="38" width="6" height="3" rx="1.5" fill="#ffd166"/><rect x="56" y="30" width="6" height="3" rx="1.5" fill="#80ed99" transform="rotate(-30 59 31)"/>` },
  { kind: 'pizza', name: 'Pizza', cat: 'food', w: 80, svg: `<path d="M10 20 Q50 6 90 20 L50 94 Z" fill="#ffd166" ${s}/><path d="M10 20 Q50 6 90 20 L86 28 Q50 16 14 28 Z" fill="#e9a96a" ${s}/><circle cx="42" cy="38" r="7" fill="#ff6b6b" ${s}/><circle cx="62" cy="44" r="6" fill="#ff6b6b" ${s}/><circle cx="50" cy="62" r="6" fill="#ff6b6b" ${s}/>` },
  { kind: 'juice', name: 'Juice', cat: 'food', w: 55, svg: `<path d="M24 26 H76 L70 92 H30 Z" fill="#fff" ${s}/><path d="M27 44 H73 L70 92 H30 Z" fill="#ffb347"/><path d="M24 26 H76 L70 92 H30 Z" fill="none" ${s}/><path d="M58 30 L66 4" stroke="#ff8fab" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="60" r="4" fill="#fff" opacity=".6"/>` },
  // ---------- pets ----------
  { kind: 'cat', name: 'Toy cat', cat: 'pets', w: 110, svg: `${shadow}<path d="M78 80 Q98 70 90 50" stroke="#ffb347" stroke-width="8" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="30" ry="20" fill="#ffb347" ${s}/><path d="M22 30 L26 8 L40 22 M78 30 L74 8 L60 22" fill="#ffb347" ${s}/><circle cx="50" cy="42" r="28" fill="#ffc46b" ${s}/>${eyes(40, 60, 40)}<path d="M46 50 q4 4 8 0" ${s} fill="none"/>${blush(32, 68, 50)}` },
  { kind: 'dog', name: 'Puppy', cat: 'pets', w: 120, svg: `${shadow}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#f5ebe0" ${s}/><circle cx="50" cy="42" r="28" fill="#fff" ${s}/><ellipse cx="22" cy="44" rx="10" ry="18" fill="#b07d54" ${s}/><ellipse cx="78" cy="44" rx="10" ry="18" fill="#b07d54" ${s}/><circle cx="60" cy="34" r="8" fill="#e6b88a" opacity=".7"/>${eyes(40, 60, 40)}<ellipse cx="50" cy="52" rx="5" ry="4" fill="${O}"/><path d="M50 56 v6" ${s}/>` },
  { kind: 'bunny', name: 'Bunny', cat: 'pets', w: 90, svg: `${shadow}<ellipse cx="36" cy="22" rx="8" ry="20" fill="#fff" ${s}/><ellipse cx="64" cy="22" rx="8" ry="20" fill="#fff" ${s}/><ellipse cx="36" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="64" cy="24" rx="3" ry="12" fill="#ffc8dd"/><ellipse cx="50" cy="76" rx="28" ry="20" fill="#fff" ${s}/><circle cx="50" cy="52" r="22" fill="#fff" ${s}/>${eyes(42, 58, 50)}<path d="M47 58 l3 3 3 -3" ${s} fill="none"/>${blush(36, 64, 58)}` },
  { kind: 'fish', name: 'Fish Bowl', cat: 'pets', w: 100, svg: `${shadow}<circle cx="50" cy="54" r="40" fill="#cdeffd" ${s}/><path d="M14 46 H86" stroke="#8ecae6" stroke-width="3"/><path d="M60 64 l14 -8 v16 z" fill="#ff9f68" ${s}/><ellipse cx="46" cy="64" rx="16" ry="11" fill="#ffb347" ${s}/><circle cx="40" cy="62" r="2.5" fill="${O}"/><circle cx="32" cy="38" r="3" fill="#fff" opacity=".8"/><rect x="24" y="10" width="52" height="8" rx="4" fill="#cdeffd" ${s}/>` },
  { kind: 'kennel', name: 'Dog Kennel', cat: 'pets', w: 210, h: 175, holdable: false, vb: '0 0 120 100', svg: `<ellipse cx="60" cy="97" rx="48" ry="3.2" fill="#000" opacity=".12"/><path d="M14 50 L60 12 L106 50 Z" fill="#ff8fab" ${s}/><path d="M28 46 L60 22 L92 46 Z" fill="#ffd6e4"/><rect x="20" y="46" width="80" height="50" rx="10" fill="#fff6ea" ${s}/><path d="M20 56 H100" stroke="#ffc2d4" stroke-width="7"/><path d="M34 96 V58 Q60 36 86 58 V96 Z" fill="#f3e4ff" ${s}/><path d="M40 96 V64 Q60 46 80 64 V96 Z" fill="#ffe8c7"/><circle cx="86" cy="64" r="8" fill="#bde0fe" ${s}/><circle cx="84" cy="62" r="2.2" fill="#fff" opacity=".9"/><path d="M28 62 l2.4 2.4 2.4-2.4 2.4 2.4 2.4-2.4-2.4-2.4-2.4 2.4z" fill="#ff8fab" ${s}/><circle cx="30" cy="90" r="3.2" fill="#fff" ${s}/><rect x="32" y="88.4" width="14" height="3.4" rx="1.7" fill="#fff" ${s}/><circle cx="48" cy="90" r="3.2" fill="#fff" ${s}/>` },
  { kind: 'cat-tower', name: 'Cat Tower', cat: 'pets', w: 150, h: 225, holdable: false, vb: '0 0 100 150', svg: `<ellipse cx="50" cy="146" rx="36" ry="3.4" fill="#000" opacity=".12"/><rect x="44" y="30" width="12" height="104" rx="6" fill="#c9a0dc" ${s}/><ellipse cx="50" cy="136" rx="34" ry="10" fill="#ffc8dd" ${s}/><ellipse cx="50" cy="132" rx="26" ry="6" fill="#fff6ea"/><ellipse cx="50" cy="102" rx="30" ry="8" fill="#bde0fe" ${s}/><ellipse cx="50" cy="98" rx="22" ry="4" fill="#fff" opacity=".8"/><ellipse cx="50" cy="64" rx="28" ry="8" fill="#ffd166" ${s}/><ellipse cx="50" cy="60" rx="20" ry="4" fill="#fff6d0"/><circle cx="50" cy="22" r="8" fill="#ff8fab" ${s}/><circle cx="47" cy="19" r="2.2" fill="#fff" opacity=".75"/><g class="dangle"><circle cx="22" cy="126" r="8" fill="#ffb3c6" ${s}/><path d="M22 126 q12 5 7 16" fill="none" stroke="#ff8fab" stroke-width="3.2" stroke-linecap="round"/></g><circle cx="80" cy="92" r="3.4" fill="#ffd166" ${s}/>` },
  // ---------- salon ----------
  { kind: 'vanity', name: 'Vanity', cat: 'furniture', w: 230, svg: `${shadow}<ellipse cx="50" cy="26" rx="24" ry="22" fill="#fff" ${s}/><ellipse cx="50" cy="26" rx="18" ry="16" fill="#cdeffd"/><path d="M38 18 l6 -6 M42 26 l10 -10" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="26" cy="12" r="3" fill="#ffd166" ${s}/><circle cx="74" cy="12" r="3" fill="#ffd166" ${s}/><rect x="6" y="48" width="88" height="14" rx="7" fill="#ffc8dd" ${s}/><rect x="10" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${s}/><rect x="62" y="60" width="28" height="30" rx="6" fill="#ffe0ec" ${s}/><circle cx="24" cy="75" r="3" fill="${O}"/><circle cx="76" cy="75" r="3" fill="${O}"/><rect x="12" y="90" width="6" height="7" rx="2" fill="${O}"/><rect x="82" y="90" width="6" height="7" rx="2" fill="${O}"/>` },
  { kind: 'stool', name: 'Vanity Stool', cat: 'furniture', w: 90, svg: `${shadow}<ellipse cx="50" cy="48" rx="34" ry="14" fill="#c9a0dc" ${s}/><ellipse cx="50" cy="44" rx="28" ry="9" fill="#e4ccf2"/><path d="M28 58 L22 94 M72 58 L78 94 M50 62 V94" ${s}/><ellipse cx="50" cy="78" rx="22" ry="4" fill="none" ${s}/>` },
  { kind: 'perfume', name: 'Perfume', cat: 'decor', w: 50, svg: `<rect x="40" y="8" width="20" height="14" rx="5" fill="#ffd166" ${s}/><rect x="46" y="20" width="8" height="10" fill="#fff" ${s}/><path d="M20 50 Q20 30 50 30 Q80 30 80 50 V80 Q80 94 66 94 H34 Q20 94 20 80 Z" fill="#ff8fab" ${s}/><ellipse cx="36" cy="52" rx="5" ry="10" fill="#fff" opacity=".6"/><path d="M50 56 l4 8 8 1 -6 6 2 8 -8 -4 -8 4 2 -8 -6 -6 8 -1z" fill="#fff" opacity=".8"/>` },
  { kind: 'polish', name: 'Nail Polish', cat: 'decor', w: 40, svg: `<rect x="38" y="4" width="24" height="40" rx="8" fill="${O}"/><path d="M24 54 Q24 42 36 42 H64 Q76 42 76 54 V84 Q76 96 64 96 H36 Q24 96 24 84 Z" fill="#b388d6" ${s}/><ellipse cx="38" cy="62" rx="5" ry="12" fill="#fff" opacity=".55"/>` },
  { kind: 'hairdryer', name: 'Hair Dryer', cat: 'decor', w: 90, svg: `<path d="M60 52 L70 92 Q70 96 64 96 H58 Q52 96 52 90 L46 56 Z" fill="#a2d2ff" ${s}/><rect x="6" y="20" width="62" height="40" rx="20" fill="#bde0fe" ${s}/><ellipse cx="82" cy="40" rx="12" ry="20" fill="#ffc8dd" ${s}/><ellipse cx="82" cy="40" rx="6" ry="11" fill="#fff" ${s}/><circle cx="24" cy="40" r="7" fill="#fff" opacity=".7"/>` },
  { kind: 'mirror', name: 'Mirror', cat: 'decor', w: 120, wall: true, svg: `<path d="M50 6 C74 6 88 24 88 50 C88 76 72 94 50 94 C28 94 12 76 12 50 C12 24 26 6 50 6 Z" fill="#ffd166" ${s}/><ellipse cx="50" cy="50" rx="30" ry="36" fill="#e0f4ff" ${s}/><path d="M36 34 l10 -10 M36 46 l20 -20" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="6" r="6" fill="#ff8fab" ${s}/>` },
];

// Which room filter each built-in item shows up under ('any' = every room).
const BUILTIN_ROOMS: Record<string, string[]> = {
  sofa: ['living'], armchair: ['living'], lamp: ['living', 'bedroom'], tv: ['living'], rug: ['living', 'bedroom'], picture: ['living', 'bedroom'],
  bookshelf: ['living', 'bedroom'], bed: ['bedroom'], teddy: ['bedroom'], stars: ['bedroom'], tub: ['bedroom'], balloon: ['any'], clock: ['any'],
  window: ['any'], ball: ['any'], vanity: ['salon'], stool: ['salon'], perfume: ['salon'], polish: ['salon'], hairdryer: ['salon'], mirror: ['salon', 'bedroom'], fridge: ['kitchen'], stove: ['kitchen'], table: ['kitchen', 'living'], chair: ['kitchen', 'living'],
};
for (const n of NURSERY_ITEMS) BUILTIN_ROOMS[n.kind] = ['nursery'];
for (const n of YARD_ITEMS) BUILTIN_ROOMS[n.kind] = ['backyard'];
for (const n of BATH_ITEMS) BUILTIN_ROOMS[n.kind] = ['bathroom'];
BUILTIN_ROOMS['floor-cushion'] = ['living'];
BUILTIN_ROOMS['story-pillow'] = ['bedroom'];
BUILTIN_ROOMS['berry-basket'] = ['kitchen'];
BUILTIN_ROOMS['ribbon-tray'] = ['salon'];
ITEMS.push(...NURSERY_ITEMS, ...YARD_ITEMS, ...BATH_ITEMS, ...EXTRA_ITEMS);
for (const i of ITEMS) i.rooms = BUILTIN_ROOMS[i.kind] ?? (['food'].includes(i.cat) ? ['kitchen'] : ['any']);
// Holdable by default: small/medium, non-wall, non-furniture items.
const NOT_HOLDABLE = new Set(['rug', 'tv', 'tree']);
for (const i of ITEMS) i.holdable ??= !i.wall && i.cat !== 'furniture' && i.w <= 150 && !NOT_HOLDABLE.has(i.kind);

// Rainbow Ranch goods: never in the drawer (no 'ranch' tab); they arrive from her basket.
const RANCH_ITEMS: ItemDef[] = [
  { kind: 'ranch-egg', name: 'Fresh Egg', cat: 'ranch', w: 50, holdable: true, rooms: ['any'], svg: `${shadow}<path d="M50 30 C70 30 80 62 80 74 C80 90 66 96 50 96 C34 96 20 90 20 74 C20 62 30 30 50 30 Z" fill="#fff6e6" ${s}/><ellipse cx="40" cy="52" rx="6" ry="9" fill="#fff"/>` },
  { kind: 'ranch-carrot', name: 'Garden Carrot', cat: 'ranch', w: 70, holdable: true, rooms: ['any'], svg: `${shadow}<path d="M30 40 L78 34 L40 96 Z" fill="#ff922b" ${s}/><path d="M44 50 l10 -2 M42 64 l8 -2 M44 78 l6 -1" ${s}/><path d="M72 36 Q80 14 92 14 M72 36 Q68 14 76 4 M72 36 Q90 30 96 36" fill="none" stroke="#40c057" stroke-width="7" stroke-linecap="round"/>` },
  { kind: 'ranch-bouquet', name: 'Ranch Flowers', cat: 'ranch', w: 80, holdable: true, rooms: ['any'], svg: `${shadow}<path d="M50 94 L40 50 M50 94 L50 44 M50 94 L62 50" stroke="#40c057" stroke-width="5" stroke-linecap="round"/><path d="M36 78 L64 78 L56 96 L44 96 Z" fill="#c9a0dc" ${s}/>${[[38, 40, '#ff8fab'], [50, 30, '#ffd43b'], [64, 40, '#74c0fc'], [44, 52, '#ff922b'], [58, 52, '#c9a0dc']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="9" fill="${c}" ${s}/><circle cx="${x}" cy="${y}" r="3" fill="#fff3b0"/>`).join('')}` },
];
ITEMS.push(...PACK_ITEMS, ...SECRET_ITEMS, ...RANCH_ITEMS);
export const ITEM_MAP: Record<string, ItemDef> = Object.fromEntries(ITEMS.map(i => [i.kind, i]));
const esc = (t: string) => t.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
/** Height in room units (square unless the art says otherwise). */
export const hOf = (d: ItemDef) => d.h ?? d.w;
/** The drawing shipped before raster art: an inline SVG, or a pack image.
 *  Winter Cheer is a pack WebP with no SVG, so ?art=v1 still loads that file. */
export const svgMarkup = (d: ItemDef) => d.img
  ? `<img class="packimg" src="${esc(d.img)}" alt="${esc(d.name)}" draggable="false" />`
  : `<svg viewBox="${d.vb ?? '0 0 100 100'}" xmlns="http://www.w3.org/2000/svg">${d.svg}</svg>`;
// A 3× WebP replaces the SVG only when this page asked for raster and the file loaded.
// The footprint stays the item's w/h. A broken image falls back through installArtFallback.
// A contact shadow is only for a piece standing on the stage. Tray thumbnails, tab
// icons, and the drag ghost stay the clean painting.
export const svgOf = (d: ItemDef, shade = false) => {
  const url = rasterOn() ? rasterUrl(d.kind) : undefined;
  if (!url) return svgMarkup(d);
  const shadow = shade && !d.wall ? '<i class="artshade" aria-hidden="true"></i>' : '';
  const night = d.kind === 'window' ? '<i class="artnight" aria-hidden="true"></i>' : '';
  return `${shadow}${night}<img class="packimg artimg" data-kind="${esc(d.kind)}" src="${esc(url)}" alt="${esc(d.name)}" draggable="false" />`;
};

// A pack that ships only a painting has nothing to draw until that file decodes.
// This tile is not item art. The painting replaces it, so the card never flashes empty.
const PAINT_WAIT = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="22" y="22" width="56" height="56" rx="14" fill="#fff6ea" stroke="#5a3d5c" stroke-width="4"/></svg>`;

/**
 * Shelf card markup: always the SVG first. When a painting exists, the shelf loads it
 * in a detached image and swaps it in only after it has loaded, so a card is never
 * empty, even on a re-render while the file is still coming in.
 */
export const shelfThumb = (d: ItemDef, painted: boolean) => {
  void painted;
  if (d.img && /\.webp(?:$|\?)/i.test(d.img)) return PAINT_WAIT;
  return svgMarkup(d);
};

let artFallbackOn = false;
/** Swap a raster image that failed to load for the current SVG. One listener for the page. */
export function installArtFallback(): void {
  if (artFallbackOn || typeof window === 'undefined') return;
  artFallbackOn = true;
  window.addEventListener('error', ev => {
    const img = ev.target;
    if (!(img instanceof HTMLImageElement) || !img.classList.contains('artimg') || img.dataset.fell === '1') return;
    const d = ITEM_MAP[img.dataset.kind || ''];
    if (!d) return;
    img.dataset.fell = '1';
    img.parentElement?.querySelector('.artshade')?.remove();
    img.parentElement?.querySelector('.artnight')?.remove();
    const hold = document.createElement('div');
    hold.innerHTML = svgMarkup(d);
    const next = hold.firstElementChild;
    if (next) img.replaceWith(next);
  }, true);
}
