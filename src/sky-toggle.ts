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
const LABEL: Record<SkyChoice, string> = { day: 'Day', night: 'Night', auto: 'Auto' };

export function mountSkyToggle(host: HTMLElement): SkyHandle {
  const simple = skyIsSimple();
  let choice: SkyChoice = loadChoice();
  let frozen: Date | null = null;
  let shown: SkyLook = skyLook(new Date(), choice);
  let timer = 0;

  host.innerHTML = `<div class="skyToggle" role="group" aria-label="Day or night">${ORDER.map(c =>
    `<button type="button" data-sky="${c}" aria-pressed="false">${LABEL[c]}</button>`).join('')}</div>`;
  const buttons = [...host.querySelectorAll<HTMLButtonElement>('[data-sky]')];

  const paint = (look: SkyLook) => {
    shown = look;
    const root = document.documentElement;
    const g = Math.max(0, Math.min(1, look.glow));
    root.style.setProperty('--sky-opacity', look.opacity.toFixed(3));
    root.style.setProperty('--sky-glow', g.toFixed(3));
    root.style.setProperty('--sky-stars', look.stars.toFixed(3));
    root.style.setProperty('--sky-tint', look.tint);
    root.style.setProperty('--sky-glow-soft', `rgba(255, 214, 140, ${(g * 0.55).toFixed(3)})`);
    root.style.setProperty('--sky-glow-hot', `rgba(255, 236, 180, ${(g * 0.9).toFixed(3)})`);
    root.style.setProperty('--sky-glow-wash', `rgba(255, 186, 96, ${(g * 0.35).toFixed(3)})`);
    root.style.setProperty('--sky-glow-map', `rgba(255, 196, 120, ${(g * 0.28).toFixed(3)})`);
    root.dataset.sky = look.phase;
    root.dataset.skyChoice = choice;
    root.classList.toggle('sky-static', simple);
    root.classList.toggle('sky-live', !simple);
    for (const b of buttons) {
      const on = b.dataset.sky === choice;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  };

  const targetNow = () => skyLook(frozen ?? new Date(), choice);

  const go = () => paint(targetNow());

  const arm = () => {
    if (timer) clearInterval(timer);
    timer = window.setInterval(() => { if (!frozen) go(); }, simple ? 60000 : 1000);
  };

  host.addEventListener('click', e => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-sky]');
    if (!b || !isSkyChoice(b.dataset.sky)) return;
    choice = b.dataset.sky;
    try { localStorage.setItem(storeKey(SKY_KEY), choice); } catch { /* private mode */ }
    go();
  });

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

  return {
    choice: () => choice,
    look: () => shown,
    setChoice(c: SkyChoice) {
      choice = c;
      try { localStorage.setItem(storeKey(SKY_KEY), c); } catch { /* private mode */ }
      go();
    },
    freeze(at: Date | null) { frozen = at; go(); },
  };
}

/** Stars and fireflies live on the map. renderMap replaces its HTML, so put the layer back. */
function keepStreetBits(world: HTMLElement) {
  const bits = document.createElement('div');
  bits.className = 'skyBits';
  bits.setAttribute('aria-hidden', 'true');
  bits.innerHTML = '<i></i><i></i><i></i><i></i><i></i>';
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
