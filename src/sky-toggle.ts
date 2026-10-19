// Day / Night / Auto. One mount node, so the menu branch can move it without rewriting the clock.
import { storeKey } from './shared/storekey';
import { SKY_KEY, isSkyChoice, skyIsSimple, skyLook, type SkyChoice, type SkyLook } from './sky';

export interface SkyHandle {
  choice: () => SkyChoice;
  look: () => SkyLook;
  setChoice: (c: SkyChoice) => void;
  /** Hold the clock still (screenshots and tests). Pass null to follow the device again. */
  freeze: (at: Date | null) => void;
}

const ORDER: SkyChoice[] = ['day', 'night', 'auto'];
const NEXT: Record<SkyChoice, SkyChoice> = { day: 'night', night: 'auto', auto: 'day' };
const NAME: Record<SkyChoice, string> = { day: 'Day', night: 'Night', auto: 'Auto' };

const SUN = `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><g fill="none" stroke="#ffb15c" stroke-width="3" stroke-linecap="round"><path d="M24 7 V13 M24 35 V41 M7 24 H13 M35 24 H41 M12 12 L16 16 M32 32 L36 36 M36 12 L32 16 M16 32 L12 36"/></g></svg>`;
const MOON = `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M30 8 a14 14 0 1 0 0 32 a11 11 0 1 1 0 -32z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="3"/><circle cx="14" cy="16" r="1.7" fill="#ffd166"/><circle cx="18" cy="28" r="1.2" fill="#fff"/><circle cx="11" cy="24" r="1" fill="#fff"/></svg>`;
const AUTO = `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="18" cy="28" r="8" fill="#ffd166" stroke="#5a3d5c" stroke-width="3"/><path d="M34 8 a9 9 0 1 0 0 18 a7 7 0 1 1 0 -18z" fill="#fff6e4" stroke="#5a3d5c" stroke-width="2.5"/><circle cx="14" cy="16" r="1.3" fill="#ffd166"/></svg>`;
const ICON: Record<SkyChoice, string> = { day: SUN, night: MOON, auto: AUTO };

const PHONE_MQ = '(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (orientation: landscape) and (max-height: 500px)';

export function mountSkyToggle(host: HTMLElement): SkyHandle {
  const simple = skyIsSimple();
  let choice: SkyChoice = loadChoice();
  let frozen: Date | null = null;
  let shown: SkyLook = skyLook(new Date(), choice);
  let timer = 0;

  host.innerHTML = `<button type="button" class="skyBtn" aria-label="Day. Tap for night.">${SUN}</button>`;
  const btn = host.querySelector('button')!;

  const paint = (look: SkyLook) => {
    shown = look;
    const root = document.documentElement;
    const g = Math.max(0, Math.min(1, look.glow));
    root.style.setProperty('--sky-opacity', look.opacity.toFixed(3));
    root.style.setProperty('--sky-map-opacity', look.map.toFixed(3));
    root.style.setProperty('--sky-glow', g.toFixed(3));
    root.style.setProperty('--sky-stars', look.stars.toFixed(3));
    root.style.setProperty('--sky-glass', look.glass.toFixed(3));
    root.style.setProperty('--sky-tint', look.tint);
    root.style.setProperty('--sky-body', look.body);
    root.style.setProperty('--sky-page-a', look.pageA);
    root.style.setProperty('--sky-page-b', look.pageB);
    root.style.setProperty('--sky-spot', look.spot);
    root.style.setProperty('--sky-field-a', look.fieldA);
    root.style.setProperty('--sky-field-b', look.fieldB);
    root.style.setProperty('--sky-win', look.win);
    root.style.setProperty('--sky-win-2', look.win2);
    root.style.setProperty('--sky-house-win', look.house);
    root.style.setProperty('--sky-map-tint', look.mapTint);
    // Plain rgba so Safari 16 can paint them. Hot centers stay nearly solid so the pool still reads through a dim room.
    root.style.setProperty('--sky-glow-soft', `rgba(255, 186, 80, ${(g * 0.72).toFixed(3)})`);
    root.style.setProperty('--sky-glow-hot', `rgba(255, 220, 120, ${(g * 0.96).toFixed(3)})`);
    root.style.setProperty('--sky-glow-wash', `rgba(255, 170, 70, ${(g * 0.55).toFixed(3)})`);
    root.style.setProperty('--sky-glow-map', `rgba(255, 196, 110, ${(g * 0.7).toFixed(3)})`);
    const sh = look.phase === 'golden' ? 0.82 : look.phase === 'dawn' ? 0.22 : 0;
    root.style.setProperty('--sky-shadow', `rgba(140, 62, 18, ${sh.toFixed(3)})`);
    const vig = look.phase === 'night' ? 0.55 : look.phase === 'golden' ? 0.22 : look.phase === 'dawn' ? 0.16 : 0;
    root.style.setProperty('--sky-vig', `rgba(12, 10, 32, ${vig.toFixed(3)})`);
    const orb = look.phase === 'golden' ? '255, 196, 80' : look.phase === 'dawn' ? '255, 214, 230' : '255, 246, 214';
    root.style.setProperty('--sky-orb', `rgba(${orb}, ${(Math.min(1, look.glass)).toFixed(3)})`);
    root.dataset.sky = look.phase;
    root.dataset.skyChoice = choice;
    root.classList.toggle('sky-static', simple);
    root.classList.toggle('sky-live', !simple);
    btn.innerHTML = ICON[choice];
    btn.setAttribute('aria-label', `${NAME[choice]}. Tap for ${NAME[NEXT[choice]].toLowerCase()}.`);
  };

  const targetNow = () => skyLook(frozen ?? new Date(), choice);
  const go = () => paint(targetNow());

  const arm = () => {
    if (timer) clearInterval(timer);
    timer = window.setInterval(() => { if (!frozen) go(); }, simple ? 60000 : 1000);
  };

  const pick = (c: SkyChoice) => {
    choice = c;
    try { localStorage.setItem(storeKey(SKY_KEY), choice); } catch { /* private mode */ }
    go();
  };

  btn.addEventListener('click', () => pick(NEXT[choice]));

  document.documentElement.classList.toggle('sky-static', simple);
  go();
  arm();
  const map = document.getElementById('mapWorld');
  if (map) keepStreetBits(map);
  try {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener?.('change', () => {
      const quiet = skyIsSimple();
      document.documentElement.classList.toggle('sky-static', quiet);
      document.documentElement.classList.toggle('sky-live', !quiet);
    });
  } catch { /* old matchMedia */ }
  try { matchMedia(PHONE_MQ).addEventListener?.('change', () => dockSkyChrome()); } catch { /* old matchMedia */ }
  window.addEventListener('resize', () => dockSkyChrome());
  // The map covers the drawer, so the sun/moon button has to hop back to the top bar.
  new MutationObserver(() => dockSkyChrome()).observe(document.body, { attributes: true, attributeFilter: ['class'] });

  return {
    choice: () => choice,
    look: () => shown,
    setChoice(c: SkyChoice) { pick(c); },
    freeze(at: Date | null) { frozen = at; go(); },
  };
}

/**
 * The top bar has no spare gap once Lock and Chat are showing, so in a house
 * both mounts sit in the decorate row, after Play / Decorate. That row scrolls
 * instead of growing, so the stage stays the same size. The map covers that
 * row, so the sun/moon button returns to the top bar there. The menu branch
 * can move the nodes later.
 */
export function dockSkyChrome() {
  const sky = document.getElementById('skyMount');
  const undo = document.getElementById('undoMount');
  if (!sky || !undo) return;
  const street = document.body.classList.contains('view-street');
  const bar = document.querySelector('.drawerTop');
  const app = document.getElementById('app');
  if (!street && bar) {
    const mode = document.getElementById('modeToggle');
    if (mode && mode.parentElement === bar) {
      mode.after(sky);
      sky.after(undo);
    } else if (sky.parentElement !== bar) bar.append(sky, undo);
    sky.style.left = '';
    sky.style.top = '';
    undo.style.left = '';
    undo.style.top = '';
  } else if (app && (sky.parentElement !== app || undo.parentElement !== app)) {
    app.append(sky, undo);
  }
  if (street) placeStreetSky(sky);
}

/** The map title and the tool row change width together, so the sun/moon button takes the first free 44px slot in the top bar. */
function placeStreetSky(sky: HTMLElement) {
  const size = 44;
  const gap = 6;
  const blocks: { left: number; right: number; top: number; bottom: number }[] = [];
  const title = document.querySelector('.streetTitle');
  if (title && getComputedStyle(title).display !== 'none') {
    const range = document.createRange();
    range.selectNodeContents(title);
    const r = range.getBoundingClientRect();
    if (r.width > 2) blocks.push({ left: r.left, right: r.right, top: r.top, bottom: r.bottom });
  }
  const nodes = document.querySelectorAll('.tools button, .tab, #minimap');
  for (let i = 0; i < nodes.length; i++) {
    const el = nodes[i] as HTMLElement;
    if (getComputedStyle(el).display === 'none') continue;
    const r = el.getBoundingClientRect();
    if (r.width > 2 && r.height > 2) blocks.push({ left: r.left, right: r.right, top: r.top, bottom: r.bottom });
  }
  const bar = document.querySelector('.top');
  if (!bar) return;
  const top = bar.getBoundingClientRect();
  const hit = (x: number, y: number) => {
    for (let i = 0; i < blocks.length; i++) {
      const o = blocks[i];
      if (x + size > o.left + 1 && x < o.right - 1 && y + size > o.top + 1 && y < o.bottom - 1) return true;
    }
    return false;
  };
  const spots: number[][] = [];
  if (blocks.length) {
    const words = blocks[0];
    spots.push([words.right + gap, words.top + (words.bottom - words.top - size) / 2]);
  }
  const bottom = top.bottom;
  for (let y = top.top; y + size <= bottom + 1; y += 4) {
    for (let x = top.left + 2; x + size <= top.right - 2; x += 4) spots.push([x, y]);
  }
  for (let i = 0; i < spots.length; i++) {
    const x = Math.round(Math.max(top.left, Math.min(spots[i][0], top.right - size)));
    const y = Math.round(Math.max(0, spots[i][1]));
    if (y + size > bottom + 2) continue;
    if (!hit(x, y)) {
      sky.style.left = x + 'px';
      sky.style.top = y + 'px';
      return;
    }
  }
}

/** Tint, streetlamps, stars, and fireflies live on the map. renderMap replaces its HTML, so put the layers back. */
function keepStreetBits(world: HTMLElement) {
  const tint = document.createElement('div');
  tint.className = 'skyTint';
  tint.setAttribute('aria-hidden', 'true');
  const lamps = document.createElement('div');
  lamps.className = 'skyLamps';
  lamps.setAttribute('aria-hidden', 'true');
  const bits = document.createElement('div');
  bits.className = 'skyBits';
  bits.setAttribute('aria-hidden', 'true');
  bits.innerHTML = '<i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i>';
  const ensure = () => {
    if (!world.contains(tint)) world.appendChild(tint);
    if (!world.contains(lamps)) world.appendChild(lamps);
    if (!world.contains(bits)) world.appendChild(bits);
  };
  ensure();
  new MutationObserver(ensure).observe(world, { childList: true });
}

function loadChoice(): SkyChoice {
  try {
    const v = localStorage.getItem(storeKey(SKY_KEY));
    if (isSkyChoice(v)) return v;
  } catch { /* private mode */ }
  return 'auto';
}
