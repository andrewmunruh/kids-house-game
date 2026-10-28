import { storeKey } from './shared/storekey';
import { artRasterOn } from './art/flag';
// Hidden surprises: one per name. Tap a small, innocent-looking detail a few times to reveal it.
// Progress is saved only on this device. Nothing in the UI explains where they are.
import type { ItemDef } from './items';
import type { RoomId } from './shared/state';

const O = '#5a3d5c';
const s = `stroke="${O}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`;
const shadow = `<ellipse cx="50" cy="97" rx="34" ry="3" fill="#000" opacity=".12"/>`;

interface Egg { name: string; room: RoomId; x: number; y: number; w: number; h: number; taps: number; spot: string; item: ItemDef; hello?: string }

// tappable details (viewBox sized to w x h in room units; positioned bottom-centre at x,y)
const MOUSEHOLE = `<svg viewBox="0 0 40 30"><path d="M4 30 V16 Q4 2 20 2 Q36 2 36 16 V30 Z" fill="#3b2a3d" ${s}/><circle cx="14" cy="18" r="1.6" fill="#fff" opacity=".8"/><circle cx="22" cy="18" r="1.6" fill="#fff" opacity=".8"/></svg>`;
const SNAIL = `<svg viewBox="0 0 48 30"><path d="M4 27 Q10 22 22 23 L42 23 Q46 27 42 28 H6 Z" fill="#cdeccf" ${s}/><circle cx="26" cy="15" r="11" fill="#ffb3c6" ${s}/><path d="M26 15 m-5 0 a5 5 0 1 1 5 5" fill="none" ${s}/><path d="M8 23 L5 13 M12 23 L12 13" ${s}/></svg>`;
const STAR = `<svg viewBox="0 0 30 30"><path d="M15 2 l3.6 8 8.4 1 -6.3 5.8 1.8 8.4 -7.5 -4.4 -7.5 4.4 1.8 -8.4 L3 11 l8.4 -1z" fill="#fff3b0" ${s}/></svg>`;
const COOKIE = `<svg viewBox="0 0 30 22"><ellipse cx="15" cy="13" rx="13" ry="8" fill="#e6b88a" ${s}/><circle cx="10" cy="11" r="1.8" fill="${O}"/><circle cx="18" cy="14" r="1.8" fill="${O}"/><circle cx="16" cy="9" r="1.5" fill="${O}"/></svg>`;
const HEART = `<svg viewBox="0 0 30 28"><path d="M15 26 C3 18 1 10 6 5 C10 1 14 4 15 7 C16 4 20 1 24 5 C29 10 27 18 15 26 Z" fill="#ffc8dd" ${s}/></svg>`;

export const EGGS: Egg[] = [
  { name: 'Cada', room: 'living', x: 150, y: 382, w: 40, h: 30, taps: 3, spot: MOUSEHOLE, hello: 'Squeak! Hi Cada!',
    item: { kind: 'egg:cada-mouse', name: "Cada's Mouse", cat: 'secrets', w: 80, holdable: true, svg: `${shadow}<path d="M78 74 Q96 68 92 52" stroke="#ff9bb5" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="54" cy="76" rx="28" ry="18" fill="#d6d6e8" ${s}/><circle cx="28" cy="40" r="13" fill="#d6d6e8" ${s}/><circle cx="62" cy="38" r="13" fill="#d6d6e8" ${s}/><circle cx="28" cy="40" r="7" fill="#ffc8dd"/><circle cx="62" cy="38" r="7" fill="#ffc8dd"/><circle cx="45" cy="56" r="20" fill="#e4e4f2" ${s}/><text x="50" y="96" font-size="11" font-weight="900" text-anchor="middle" fill="${O}">C</text>` } },
  { name: 'Sloane', room: 'living', x: 2290, y: 383, w: 48, h: 30, taps: 3, spot: SNAIL, hello: 'Hi Sloane! ✨',
    item: { kind: 'egg:sloane-snail', name: "Sloane's Rainbow Snail", cat: 'secrets', w: 110, holdable: true, svg: `${shadow}<path d="M6 92 Q14 80 36 82 L84 82 Q94 90 84 94 H10 Z" fill="#cdeccf" ${s}/><circle cx="56" cy="52" r="32" fill="#ff8fab" ${s}/><circle cx="56" cy="52" r="24" fill="#ffd166"/><circle cx="56" cy="52" r="17" fill="#80ed99"/><circle cx="56" cy="52" r="10" fill="#8ecae6"/><circle cx="56" cy="52" r="4" fill="#c9a0dc"/><circle cx="56" cy="52" r="32" fill="none" ${s}/><path d="M14 82 L8 60 M24 82 L24 60" ${s}/><circle cx="8" cy="58" r="4" fill="${O}"/><circle cx="24" cy="58" r="4" fill="${O}"/>` } },
  { name: 'Chloe', room: 'bedroom', x: 2230, y: 92, w: 30, h: 30, taps: 5, spot: STAR,
    item: { kind: 'egg:chloe-starlamp', name: "Chloe's Star Lamp", cat: 'secrets', w: 100, holdable: true, svg: `${shadow}<circle cx="50" cy="38" r="34" fill="#fff3b0" opacity=".6"/><path d="M50 6 l8 17 19 2.5 -14 13 4 19 -17 -9.5 -17 9.5 4 -19 -14 -13 19 -2.5z" fill="#ffd166" ${s}/><rect x="46" y="66" width="8" height="22" rx="4" fill="#c9a0dc" ${s}/><ellipse cx="50" cy="90" rx="22" ry="6" fill="#b388d6" ${s}/><text x="50" y="93" font-size="8" font-weight="900" text-anchor="middle" fill="#fff">CHLOE</text>` } },
  { name: 'Quinn', room: 'kitchen', x: 80, y: 588, w: 30, h: 22, taps: 4, spot: COOKIE, hello: 'Woof! Hi Quinn!',
    item: { kind: 'egg:quinn-pup', name: "Quinn's Cookie Pup", cat: 'secrets', w: 110, holdable: true, svg: `${shadow}<ellipse cx="56" cy="76" rx="30" ry="20" fill="#e6b88a" ${s}/><circle cx="50" cy="44" r="27" fill="#f2d0a4" ${s}/><ellipse cx="24" cy="46" rx="10" ry="17" fill="#b07d54" ${s}/><ellipse cx="76" cy="46" rx="10" ry="17" fill="#b07d54" ${s}/><circle cx="84" cy="80" r="10" fill="#e6b88a" ${s}/><circle cx="81" cy="78" r="1.8" fill="${O}"/><circle cx="87" cy="82" r="1.8" fill="${O}"/><text x="50" y="30" font-size="10" font-weight="900" text-anchor="middle" fill="${O}">Q</text>` } },
  { name: 'Reagan', room: 'salon', x: 2300, y: 352, w: 30, h: 28, taps: 5, spot: HEART,
    item: { kind: 'egg:reagan-frame', name: "Reagan's Frame", cat: 'secrets', w: 120, wall: true, svg: `<rect x="8" y="10" width="84" height="84" rx="16" fill="#ff8fab" ${s}/><rect x="18" y="20" width="64" height="64" rx="10" fill="#fff3f7" ${s}/><text x="50" y="72" font-size="52" font-weight="900" text-anchor="middle" fill="#e879c6" stroke="${O}" stroke-width="2.5">R</text><circle cx="14" cy="16" r="6" fill="#ffd166" ${s}/><circle cx="86" cy="88" r="6" fill="#ffd166" ${s}/><path d="M76 24 l2 4 4 .5 -3 3 .7 4 -3.7 -2 -3.7 2 .7 -4 -3 -3 4 -.5z" fill="#ffd166"/>` } },
];
export const SECRET_ITEMS: ItemDef[] = EGGS.map(e => ({ ...e.item, rooms: ['any'], secret: e.name } as ItemDef & { secret: string }));

const KEY = storeKey('cozy-secrets');
export const foundSet = (): Set<string> => { try { return new Set(JSON.parse(localStorage.getItem(KEY) ?? '[]')); } catch { return new Set(); } };
const saveFound = (f: Set<string>) => localStorage.setItem(KEY, JSON.stringify([...f]));

export interface EggCtx {
  world: HTMLElement; roomW: number; roomH: number;
  currentRoom: () => RoomId;
  sparkle: () => void; tap: () => void;
  onFound: (name: string, isNew: boolean) => void;
}
export function initEggs(ctx: EggCtx) {
  const box = document.createElement('div'); box.className = 'eggs'; ctx.world.appendChild(box);
  const counts = new Map<string, { n: number; t: number }>();
  for (const e of EGGS) {
    const el = document.createElement('div'); el.className = 'eggspot'; el.dataset.egg = e.name;
    el.style.left = (e.x - e.w / 2) / ctx.roomW * 100 + '%'; el.style.top = (e.y - e.h) / ctx.roomH * 100 + '%';
    el.style.width = e.w / ctx.roomW * 100 + '%'; el.style.height = e.h / ctx.roomH * 100 + '%';
    el.innerHTML = e.spot; box.appendChild(el);
    el.addEventListener('pointerdown', ev => ev.stopPropagation()); // a tap here is not a pan
    el.addEventListener('click', ev => {
      ev.stopPropagation();
      const now = Date.now(), c = counts.get(e.name) ?? { n: 0, t: 0 };
      c.n = now - c.t < 1500 ? c.n + 1 : 1; c.t = now; counts.set(e.name, c);
      el.classList.remove('poke'); void el.offsetWidth; el.classList.add('poke'); ctx.tap();
      if (c.n < e.taps) return;
      c.n = 0;
      const f = foundSet(), isNew = !f.has(e.name); f.add(e.name); saveFound(f);
      reveal(e, el); ctx.sparkle(); ctx.onFound(e.name, isNew);
    });
  }
  const update = () => { const r = ctx.currentRoom(); box.querySelectorAll<HTMLElement>('.eggspot').forEach(el => { el.style.display = EGGS.find(e => e.name === el.dataset.egg)!.room === r ? '' : 'none'; }); };
  update();
  return { update };
}

// Pop-up paintings, seen from behind so they have no faces. The leading _ keeps the
// art loader from treating them as item art (the in-room paintings stay as they are).
const POP_FILES = import.meta.glob('../assets/art/living/_pop~*.webp', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const POP_ART: Record<string, string> = {};
for (const p in POP_FILES) POP_ART['egg:' + p.split('_pop~').pop()!.slice(0, -5)] = POP_FILES[p];

function reveal(e: Egg, spot: HTMLElement) {
  // a friend pops out and says hi (where it makes sense)
  if (e.hello) {
    const pop = document.createElement('div'); pop.className = 'eggpop';
    const pic = artRasterOn() ? POP_ART[e.item.kind] : undefined;
    pop.innerHTML = `<div class="eggcritter"><svg viewBox="0 0 100 100">${e.item.svg}</svg></div><div class="bubble">${e.hello}</div>`;
    if (pic) {
      // a faceless painting for the pop-up; the SVG stays if it fails to load
      const box = pop.querySelector('.eggcritter')!, svg = box.innerHTML, img = new Image();
      img.alt = ''; img.className = 'eggpic'; img.onerror = () => { box.innerHTML = svg; };
      img.src = pic; box.replaceChildren(img);
    }
    spot.appendChild(pop); setTimeout(() => pop.remove(), 3200);
  }
  const banner = document.createElement('div'); banner.className = 'eggbanner';
  banner.innerHTML = `<span class="sp">✨</span><span class="nm">${[...e.name].map((ch, i) => `<i style="animation-delay:${i * 70}ms">${ch}</i>`).join('')}</span><span class="sp">✨</span>`;
  document.body.appendChild(banner); setTimeout(() => banner.classList.add('out'), 2600); setTimeout(() => banner.remove(), 3100);
  confetti();
}
export function confetti(n = 70) {
  const cols = ['#ff8fab', '#ffd166', '#8ecae6', '#80ed99', '#c9a0dc', '#ff9f68'];
  const box = document.createElement('div'); box.className = 'confetti'; document.body.appendChild(box);
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i'); p.style.left = Math.random() * 100 + 'vw'; p.style.background = cols[i % cols.length];
    p.style.animationDelay = Math.random() * 0.5 + 's'; p.style.animationDuration = 1.6 + Math.random() * 1.2 + 's';
    p.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg'); p.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
    if (i % 3 === 0) p.style.borderRadius = '50%';
    box.appendChild(p);
  }
  setTimeout(() => box.remove(), 3600);
}
