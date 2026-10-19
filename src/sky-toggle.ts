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
    // Plain rgba so Safari 16 can paint them. Hot centers stay nearly solid so the pool still reads through a dim room.
    root.style.setProperty('--sky-glow-soft', `rgba(255, 186, 80, ${(g * 0.72).toFixed(3)})`);
    root.style.setProperty('--sky-glow-hot', `rgba(255, 220, 120, ${(g * 0.96).toFixed(3)})`);
    root.style.setProperty('--sky-glow-wash', `rgba(255, 170, 70, ${(g * 0.55).toFixed(3)})`);
    root.style.setProperty('--sky-glow-map', `rgba(255, 196, 110, ${(g * 0.7).toFixed(3)})`);
    const sh = look.phase === 'golden' ? 0.9 : look.phase === 'dawn' ? 0.28 : 0;
    root.style.setProperty('--sky-shadow', `rgba(120, 64, 28, ${sh.toFixed(3)})`);
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

  return {
    choice: () => choice,
    look: () => shown,
    setChoice(c: SkyChoice) { pick(c); },
    freeze(at: Date | null) { frozen = at; go(); },
  };
}

/**
 * Phones have no spare pixels in the top bar, so the two mounts sit in the
 * scrolling decorate row (it does not grow the stage). iPad keeps them fixed
 * in the gaps of the top bar. The menu branch can move the nodes later.
 */
export function dockSkyChrome() {
  const sky = document.getElementById('skyMount');
  const undo = document.getElementById('undoMount');
  if (!sky || !undo) return;
  const phone = document.body.classList.contains('phone');
  const bar = document.querySelector('.drawerTop');
  const app = document.getElementById('app');
  if (phone && bar) {
    const mode = document.getElementById('modeToggle');
    if (mode && mode.parentElement === bar) {
      mode.after(sky);
      sky.after(undo);
    } else if (sky.parentElement !== bar) bar.append(sky, undo);
  } else if (app && sky.parentElement !== app) {
    app.append(sky, undo);
  }
}

/** Stars, the moon, and fireflies live on the map. renderMap replaces its HTML, so put the layer back. */
function keepStreetBits(world: HTMLElement) {
  const bits = document.createElement('div');
  bits.className = 'skyBits';
  bits.setAttribute('aria-hidden', 'true');
  bits.innerHTML = '<i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i><i class="fly"></i>';
  const ensure = () => { if (!world.contains(bits)) world.appendChild(bits); };
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
