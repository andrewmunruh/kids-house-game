// "Make your look!" Presets only: swatches and names, no photos and no free text.
import { storeKey } from '../shared/storekey';
import type { Character } from '../shared/state';
import {
  HAIR_IDS, HAIR2, SKIN2, EYE_IDS, EYE2, CLOTH2, TOP_IDS, BOTTOM_IDS, DRESS_IDS, SHOE_IDS, ACC_IDS,
  fillLook2, accSlot, type Look2, type AccId,
} from '../shared/avatar';
import { characterSVG, SIZES } from '../character';

export type AvTab = 'hair' | 'face' | 'clothes' | 'shoes' | 'extras';
const TABS: { id: AvTab; name: string }[] = [
  { id: 'hair', name: 'Hair' },
  { id: 'face', name: 'Face' },
  { id: 'clothes', name: 'Clothes' },
  { id: 'shoes', name: 'Shoes' },
  { id: 'extras', name: 'Extras' },
];

const HAIR_NAME: Record<string, string> = {
  short: 'Short', pixie: 'Pixie', coily: 'Coily', afro: 'Afro', bangs: 'Bangs', bob: 'Bob', wavybob: 'Wavy bob',
  curlybob: 'Curly bob', sidebangs: 'Side bangs', long: 'Long', wavy: 'Wavy', braids: 'Braids', boxbraids: 'Box braids',
  locs: 'Locs', sidebraid: 'Side braid', crown: 'Crown', pony: 'Ponytail', sidepony: 'Side pony', pigtails: 'Pigtails',
  halfup: 'Half-up', buns: 'Buns', puffs: 'Puffs', topbun: 'Top bun', lowbun: 'Low bun',
};
const TOP_NAME: Record<string, string> = {
  classic: 'Tee', stripes: 'Stripes', hoodie: 'Hoodie', sweater: 'Sweater', tank: 'Tank', puff: 'Puff',
  ruffle: 'Ruffle', button: 'Buttons', jersey: 'Jersey', cardigan: 'Cardigan', bib: 'Bib', raincoat: 'Raincoat',
};
const BOTTOM_NAME: Record<string, string> = {
  pants: 'Pants', jeans: 'Jeans', shorts: 'Shorts', skirt: 'Skirt', tutu: 'Tutu', leggings: 'Leggings', overalls: 'Overalls', joggers: 'Joggers',
};
const DRESS_NAME: Record<string, string> = {
  '': 'No dress', twirl: 'Twirl', sundress: 'Sundress', party: 'Party', pinafore: 'Pinafore', jumper: 'Jumper', ballet: 'Ballet', nightgown: 'Nightgown', raindress: 'Rain',
};
const SHOE_NAME: Record<string, string> = {
  classic: 'Classic', sneakers: 'Sneakers', lightup: 'Light-up', boots: 'Boots', rainboots: 'Rain boots', sandals: 'Sandals', maryjanes: 'Mary Janes', slippers: 'Slippers',
};
const EYE_NAME: Record<string, string> = { round: 'Round', big: 'Big', sleepy: 'Sleepy', sparkle: 'Sparkle', soft: 'Soft', bright: 'Bright' };
const ACC_NAME: Record<string, string> = {
  glasses: 'Glasses', square: 'Square', sunnies: 'Sunnies', bow: 'Bow', bigbow: 'Big bow', headband: 'Headband',
  flower: 'Flower', cap: 'Cap', beanie: 'Beanie', sunhat: 'Sun hat', catears: 'Cat ears', earmuffs: 'Earmuffs',
};
const SIZE_NAME: Record<string, string> = { little: 'Little', kid: 'Kid', adult: 'Grown-up' };

let tab: AvTab = 'hair';

function opt(act: string, v: string, label: string, on: boolean): string {
  return `<button type="button" class="avOpt${on ? ' on' : ''}" data-act="${act}" data-v="${v}">${label}</button>`;
}
function swatch(act: string, c: string, on: boolean): string {
  return `<button type="button" class="avSw${on ? ' on' : ''}" style="background:${c}" data-act="${act}" data-v="${c}" aria-label="Color"></button>`;
}
function grid(html: string): string { return `<div class="avGrid">${html}</div>`; }
function colors(act: string, cur: string): string {
  return `<div class="avColors">${CLOTH2.map(c => swatch(act, c, c === cur)).join('')}</div>`;
}

export function avatarSheetHTML(c: Character, picker: string, confirm: boolean, trash: string): string {
  const L = fillLook2(c.look2);
  const me = c.id === '__me';
  const pane = tab === 'hair'
    ? `<h3>Style</h3>${grid(HAIR_IDS.map(id => opt('av-hair', id, HAIR_NAME[id], L.hair === id)).join(''))}<h3>Color</h3><div class="avColors">${HAIR2.map(col => swatch('av-hairC', col, L.hairC === col)).join('')}</div>`
    : tab === 'face'
      ? `<h3>Skin</h3><div class="avColors">${SKIN2.map(col => swatch('av-skin', col, L.skin === col)).join('')}</div><h3>Eyes</h3>${grid(EYE_IDS.map(id => opt('av-eyes', id, EYE_NAME[id], L.eyes === id)).join(''))}<h3>Eye color</h3><div class="avColors">${EYE2.map(col => swatch('av-eyeC', col, L.eyeC === col)).join('')}</div><div class="avToggles">${opt('av-freckles', L.freckles ? '0' : '1', 'Freckles', L.freckles)}${opt('av-blush', L.blush ? '0' : '1', 'Blush', L.blush)}</div>`
      : tab === 'clothes'
        ? `<h3>Top</h3>${grid(TOP_IDS.map(id => opt('av-top', id, TOP_NAME[id], !L.dress && L.top === id)).join(''))}${colors('av-topC', L.topC)}<h3>Bottom</h3>${grid(BOTTOM_IDS.map(id => opt('av-bottom', id, BOTTOM_NAME[id], !L.dress && L.bottom === id)).join(''))}${colors('av-bottomC', L.bottomC)}<h3>Dress</h3>${grid(DRESS_IDS.map(id => opt('av-dress', id, DRESS_NAME[id], L.dress === id)).join(''))}${colors('av-dressC', L.dressC)}`
        : tab === 'shoes'
          ? `<h3>Shoes</h3>${grid(SHOE_IDS.map(id => opt('av-shoes', id, SHOE_NAME[id], L.shoes === id)).join(''))}${colors('av-shoesC', L.shoesC)}`
          : `<h3>Extras</h3><p class="avHint">Pick up to two</p>${grid(ACC_IDS.map(id => opt('av-acc', id, ACC_NAME[id], L.acc.indexOf(id) >= 0)).join(''))}${colors('av-accC', L.accC)}`;
  const sizes = SIZES.map(z => `<button type="button" class="avOpt sz${z === c.size ? ' on' : ''}" data-act="size" data-v="${z}">${SIZE_NAME[z]}</button>`).join('');
  const del = me ? '<div class="meNote">This is you!</div>' : `<button type="button" class="del${confirm ? ' sure' : ''}" data-act="delc">${trash}<span>${confirm ? 'Tap again' : ''}</span></button>`;
  return `<button class="close" data-act="close">✕</button><h2>Make your look!</h2>${picker}<div class="dress avLook"><div class="avStageWrap"><div class="avStage chibi-move">${characterSVG(c)}</div>${del}<div class="avSizes">${sizes}</div></div><div class="avSide"><div class="avTabs">${TABS.map(t => `<button type="button" class="avTab${t.id === tab ? ' on' : ''}" data-act="av-tab" data-v="${t.id}">${t.name}</button>`).join('')}</div><div class="avPane">${pane}</div><div class="avBar"><button type="button" class="avSurprise" data-act="av-surprise">🎲 Surprise me</button><button type="button" class="avDone" data-act="close">Done</button></div></div></div>`;
}

/** Returns the next look, or null when the click only changed the tab. */
export function avatarAct(look: Look2, act: string, v: string): Look2 | null {
  if (act === 'av-tab') {
    if (v === 'hair' || v === 'face' || v === 'clothes' || v === 'shoes' || v === 'extras') tab = v;
    return null;
  }
  const L = fillLook2(look);
  if (act === 'av-hair' && (HAIR_IDS as readonly string[]).indexOf(v) >= 0) return { ...L, hair: v as Look2['hair'] };
  if (act === 'av-hairC') return { ...L, hairC: v };
  if (act === 'av-skin') return { ...L, skin: v };
  if (act === 'av-eyes' && (EYE_IDS as readonly string[]).indexOf(v) >= 0) return { ...L, eyes: v as Look2['eyes'] };
  if (act === 'av-eyeC') return { ...L, eyeC: v };
  if (act === 'av-freckles') return { ...L, freckles: v === '1' };
  if (act === 'av-blush') return { ...L, blush: v === '1' };
  if (act === 'av-top' && (TOP_IDS as readonly string[]).indexOf(v) >= 0) return { ...L, top: v as Look2['top'], dress: '' };
  if (act === 'av-topC') return { ...L, topC: v };
  if (act === 'av-bottom' && (BOTTOM_IDS as readonly string[]).indexOf(v) >= 0) return { ...L, bottom: v as Look2['bottom'], dress: '' };
  if (act === 'av-bottomC') return { ...L, bottomC: v };
  if (act === 'av-dress' && (DRESS_IDS as readonly string[]).indexOf(v) >= 0) return { ...L, dress: v as Look2['dress'] };
  if (act === 'av-dressC') return { ...L, dressC: v };
  if (act === 'av-shoes' && (SHOE_IDS as readonly string[]).indexOf(v) >= 0) return { ...L, shoes: v as Look2['shoes'] };
  if (act === 'av-shoesC') return { ...L, shoesC: v };
  if (act === 'av-accC') return { ...L, accC: v };
  if (act === 'av-acc' && (ACC_IDS as readonly string[]).indexOf(v) >= 0) {
    const id = v as AccId;
    const cur = L.acc.slice();
    const at = cur.indexOf(id);
    if (at >= 0) cur.splice(at, 1);
    else {
      const slot = accSlot(id);
      const next = cur.filter(a => accSlot(a) !== slot);
      next.push(id);
      return { ...L, acc: next.slice(0, 2) };
    }
    return { ...L, acc: cur };
  }
  return null;
}

export function avatarIntroPending(): boolean {
  try {
    if (typeof navigator !== 'undefined' && navigator.webdriver && !(window as unknown as { __forceAvatarIntro?: boolean }).__forceAvatarIntro) return false;
    return localStorage.getItem(storeKey('avatar-intro')) !== '1';
  } catch { return false; }
}

export function markAvatarIntro(): void {
  try { localStorage.setItem(storeKey('avatar-intro'), '1'); } catch { /* private mode */ }
}
