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

/** Artwork tint. A colour matrix keeps transparent padding clear, so there is no box around an item.
 *  In an external stylesheet url(#id) points at the CSS file, so these rules live in the page. */
function mountInk() {
  if (document.getElementById('skyInk')) return;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = 'skyInk';
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.style.cssText = 'position:fixed;left:0;top:0;width:0;height:0;overflow:hidden;pointer-events:none';
  // 28% and 16% toward #2a2350. 18% and 12% toward #ffb38a. Alpha stays put.
  svg.innerHTML = `
    <filter id="skyNightInk" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.72 0 0 0 0.046  0 0.72 0 0 0.038  0 0 0.72 0 0.088  0 0 0 1 0"/></filter>
    <filter id="skyNightKid" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.84 0 0 0 0.026  0 0.84 0 0 0.022  0 0 0.84 0 0.050  0 0 0 1 0"/></filter>
    <filter id="skyGoldInk" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.82 0 0 0 0.180  0 0.82 0 0 0.126  0 0 0.82 0 0.097  0 0 0 1 0"/></filter>
    <filter id="skyGoldKid" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.88 0 0 0 0.120  0 0.88 0 0 0.084  0 0 0.88 0 0.065  0 0 0 1 0"/></filter>`;
  document.body.appendChild(svg);
  const style = document.createElement('style');
  style.id = 'skyInkCss';
  style.textContent = `
    html[data-sky="night"] #layer > .item:not(.is-light) > .inner,
    html[data-sky="night"] #layer > .pet > .inner,
    html[data-sky="night"] .scenery .sceneRug svg,
    html[data-sky="night"] .scenery .scenePlant svg,
    html[data-sky="night"] .scenery .sceneWin svg { filter: url("#skyNightInk"); }
    html[data-sky="night"] #layer > .char > .inner,
    html[data-sky="night"] #layer > .char > .hands { filter: url("#skyNightKid"); }
    html[data-sky="night"] #layer > .item.sel:not(.is-light) > .inner { filter: url("#skyNightInk") drop-shadow(0 0 0 #fff) drop-shadow(0 0 6px #fff) drop-shadow(0 0 3px #ffd166); }
    html[data-sky="night"] #layer > .item.lifted:not(.is-light) > .inner { filter: url("#skyNightInk") drop-shadow(0 14px 8px rgba(0,0,0,.18)); }
    html[data-sky="night"] #layer > .char.active > .inner { filter: url("#skyNightKid") drop-shadow(0 0 4px #fff) drop-shadow(0 0 2px #ffd166); }
    html[data-sky="night"] #layer > .char.hold-target > .inner { filter: url("#skyNightKid") drop-shadow(0 0 6px #fff) drop-shadow(0 0 8px #80ed99); }
    html[data-sky="golden"] #layer > .item:not(.is-light) > .inner,
    html[data-sky="golden"] #layer > .pet > .inner,
    html[data-sky="golden"] .scenery .sceneRug svg,
    html[data-sky="golden"] .scenery .scenePlant svg,
    html[data-sky="golden"] .scenery .sceneWin svg { filter: url("#skyGoldInk"); }
    html[data-sky="golden"] #layer > .char > .inner,
    html[data-sky="golden"] #layer > .char > .hands { filter: url("#skyGoldKid"); }
    html[data-sky="golden"] #layer > .item.sel:not(.is-light) > .inner { filter: url("#skyGoldInk") drop-shadow(0 0 0 #fff) drop-shadow(0 0 6px #fff) drop-shadow(0 0 3px #ffd166); }
    html[data-sky="golden"] #layer > .item.lifted:not(.is-light) > .inner { filter: url("#skyGoldInk") drop-shadow(0 14px 8px rgba(0,0,0,.18)); }
    html[data-sky="golden"] #layer > .char.active > .inner { filter: url("#skyGoldKid") drop-shadow(0 0 4px #fff) drop-shadow(0 0 2px #ffd166); }
    html[data-sky="golden"] #layer > .char.hold-target > .inner { filter: url("#skyGoldKid") drop-shadow(0 0 6px #fff) drop-shadow(0 0 8px #80ed99); }
  `;
  document.head.appendChild(style);
}

export function mountSkyToggle(host: HTMLElement): SkyHandle {
  mountInk();
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
    root.style.setProperty('--sky-glow-clear', 'rgba(255, 186, 80, 0)');
    root.style.setProperty('--sky-glow-wash', `rgba(255, 170, 70, ${(g * 0.55).toFixed(3)})`);
    root.style.setProperty('--sky-glow-map', `rgba(255, 196, 110, ${(g * 0.7).toFixed(3)})`);
    const sh = look.phase === 'golden' ? 0.24 : look.phase === 'dawn' ? 0.22 : 0;
    const shRgb = look.phase === 'golden' ? '186, 110, 52' : '140, 62, 18';
    root.style.setProperty('--sky-shadow', `rgba(${shRgb}, ${sh.toFixed(3)})`);
    const vig = look.phase === 'night' ? 0.55 : look.phase === 'golden' ? 0.08 : look.phase === 'dawn' ? 0.16 : 0;
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
 * Day / Night / Auto lives in the Menu slot the declutter branch left open, so
 * the top bar stays Chat, Menu, and Map. Undo sits beside Play / Decorate.
 * A sideways phone hides that dock and the tool row is already full, so Undo
 * rides in the Menu there. Neither button is fixed over the stage.
 */
export function dockSkyChrome() {
  const sky = document.getElementById('skyMount');
  const undo = document.getElementById('undoMount');
  const day = document.getElementById('menuDaySlot');
  const undoSlot = document.getElementById('decorateUndoSlot');
  const menuUndo = document.getElementById('menuUndoSlot');
  if (sky && day && sky.parentElement !== day) day.appendChild(sky);
  if (day) day.hidden = false;
  if (sky) { sky.style.left = ''; sky.style.top = ''; }
  if (!undo || !undoSlot) return;
  const land = document.body.classList.contains('phone') && !document.body.classList.contains('phone-portrait');
  const home = land && menuUndo ? menuUndo : undoSlot;
  if (undo.parentElement !== home) home.appendChild(undo);
  undo.style.left = '';
  undo.style.top = '';
  const decorate = !document.body.classList.contains('mode-play') && !document.body.classList.contains('view-street');
  undoSlot.hidden = !decorate || home !== undoSlot;
  if (menuUndo) menuUndo.hidden = !decorate || home !== menuUndo;
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
