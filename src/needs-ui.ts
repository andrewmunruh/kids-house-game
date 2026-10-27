// M2 gentle needs on screen: thought bubbles, care sparkles, a sleepy snooze, a hint toward the right spot,
// and the visible-play-time drift timer. main.ts only calls installNeeds() once; everything else lives here.
import './needs.css';
import type { Action, GameState, Character } from './shared/state';
import { DRIFT_MS, NEEDS, driftPick, levelOf, meetableHere, wishOf, isFood, isToy, type Need } from './shared/needs';
import { isFridge, isTub } from './shared/ambient';
import { prefersReducedMotion } from './juice';
import { sfx } from './sound';

export interface NeedsDeps {
  get(): GameState;
  dispatch(a: Action): void;
  subscribe(fn: (s: GameState, a: Action) => void): void;
  /** True when this screen may propose drift: her own house (or solo), the house view, Play or Build. */
  canDrift(): boolean;
  /** True when this screen speaks need/* (solo, or the server said needs:1). */
  speaks(): boolean;
  layer: HTMLElement;
  menuAfter: HTMLElement | null;
}

const KEY = 'khg.showWishes';
const showWishes = () => { try { return localStorage.getItem(KEY) !== '0'; } catch { return true; } };

// Simple shapes drawn in code. No faces.
const ICON: Record<Need, string> = {
  sleepy: `<svg viewBox="0 0 40 40"><rect x="5" y="20" width="30" height="10" rx="3" fill="#8fb8ff" stroke="#5a3d5c" stroke-width="2.5"/><rect x="7" y="15" width="10" height="7" rx="3" fill="#fff" stroke="#5a3d5c" stroke-width="2.5"/><path d="M6 30 V34 M34 30 V34" stroke="#5a3d5c" stroke-width="2.5" stroke-linecap="round"/><path d="M24 6 H31 L24 13 H31" fill="none" stroke="#5a3d5c" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/></svg>`,
  hungry: `<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="12" fill="#ff6b6b" stroke="#5a3d5c" stroke-width="2.5"/><path d="M20 11 V6" stroke="#5a3d5c" stroke-width="2.5" stroke-linecap="round"/><path d="M21 9 Q28 4 31 9 Q26 13 21 9 Z" fill="#7bd389" stroke="#5a3d5c" stroke-width="2"/></svg>`,
  playful: `<svg viewBox="0 0 40 40"><ellipse cx="20" cy="16" rx="10" ry="12" fill="#ffd166" stroke="#5a3d5c" stroke-width="2.5"/><path d="M18 28 L22 28 L20 31 Z" fill="#ffd166" stroke="#5a3d5c" stroke-width="2"/><path d="M20 31 Q16 34 20 37" fill="none" stroke="#5a3d5c" stroke-width="2" stroke-linecap="round"/></svg>`,
  clean: `<svg viewBox="0 0 40 40"><circle cx="15" cy="23" r="9" fill="#bfe9ff" stroke="#5a3d5c" stroke-width="2.5"/><circle cx="27" cy="14" r="6" fill="#bfe9ff" stroke="#5a3d5c" stroke-width="2.5"/><circle cx="29" cy="29" r="4" fill="#bfe9ff" stroke="#5a3d5c" stroke-width="2"/><path d="M11 19 Q13 17 15 17" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>`,
};
const LABEL: Record<Need, string> = { sleepy: 'wants a nap', hungry: 'wants a snack', playful: 'wants to play', clean: 'wants a bath' };
const EYE_OPEN = `<svg viewBox="0 0 48 48"><path d="M6 28 Q24 8 42 28" fill="none" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/><ellipse cx="24" cy="30" rx="14" ry="11" fill="#fff" stroke="#5a3d5c" stroke-width="3"/><circle cx="20" cy="30" r="5" fill="#ffd166" stroke="#5a3d5c" stroke-width="2.5"/><circle cx="31" cy="24" r="3" fill="#fff" stroke="#5a3d5c" stroke-width="2"/></svg>`;
const EYE_OFF = `<svg viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="14" ry="11" fill="#eee" stroke="#5a3d5c" stroke-width="3"/><path d="M10 40 L38 18" stroke="#5a3d5c" stroke-width="3" stroke-linecap="round"/></svg>`;

const hintFor = (n: Need, k: string) => n === 'sleepy' ? /(^|-|:)bed$|bunk-bed|canopy-bed/.test(k) : n === 'hungry' ? isFridge(k) : n === 'clean' ? isTub(k) : isToy(k);
/** Where the thing she wishes for is, in this room (for the lean hint). */
function spotX(s: GameState, c: Character, n: Need): number | null {
  const items = s.rooms[c.room]?.items ?? [];
  const ok = (k: string) => n === 'sleepy' ? /bed|crib|cot/.test(k) : n === 'hungry' ? isFridge(k) || isFood(k) : n === 'clean' ? isTub(k) : isToy(k);
  let best: number | null = null, bd = Infinity;
  for (const it of items) if (ok(it.kind)) { const d = Math.abs(it.x - c.x); if (d < bd) { bd = d; best = it.x; } }
  return best;
}

export function installNeeds(d: NeedsDeps) {
  const prev = new Map<string, Record<Need, number>>();
  const asked = new Map<string, number>(); // id|need -> time a meet was sent (stops a resend storm)
  let visibleMs = 0, last = performance.now(), turn = 0;

  // ---- Menu: "Show wishes" (this iPad only) ----
  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'menuRow'; btn.id = 'btnWishes';
  btn.innerHTML = `<span class="mIco" id="wishIco"></span><span class="mLabel">Wishes</span>`;
  const paintBtn = () => { const on = showWishes(); btn.querySelector('#wishIco')!.innerHTML = on ? EYE_OPEN : EYE_OFF; btn.setAttribute('aria-label', on ? 'Wishes on' : 'Wishes off'); btn.setAttribute('aria-pressed', String(on)); };
  btn.addEventListener('click', () => { try { localStorage.setItem(KEY, showWishes() ? '0' : '1'); } catch { /* private mode */ } paintBtn(); sfx.click(); paint(); });
  d.menuAfter?.insertAdjacentElement('afterend', btn); paintBtn();

  function burst(el: HTMLElement) {
    if (prefersReducedMotion()) { el.classList.add('need-glow'); setTimeout(() => el.classList.remove('need-glow'), 900); return; }
    const b = document.createElement('div'); b.className = 'need-burst'; b.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 7; i++) {
      const p = document.createElement('i'); p.className = i % 2 ? 'nb-heart' : 'nb-spark';
      p.style.setProperty('--a', (i / 7 * 360 + 15) + 'deg'); p.style.setProperty('--dl', i * 40 + 'ms');
      b.appendChild(p);
    }
    el.appendChild(b); setTimeout(() => b.remove(), 1400);
    const inner = el.querySelector(':scope > .inner'); inner?.classList.remove('need-hop'); void (inner as HTMLElement | null)?.offsetWidth; inner?.classList.add('need-hop');
  }

  /** Lying dolls are drawn sideways, so the bubble goes over her head on the pillow instead of where a standing head would be. */
  function anchor(el: HTMLElement, bub: HTMLElement, lying: boolean) {
    if (!lying) { bub.style.left = ''; bub.style.bottom = ''; return; }
    const head = el.querySelector('.inner svg .dollhead'); if (!head) return;
    const r = el.getBoundingClientRect(), h = head.getBoundingClientRect(); if (!r.width || !r.height || !h.width) return;
    bub.style.left = ((h.left + h.width / 2 - r.left) / r.width * 100).toFixed(1) + '%';
    bub.style.bottom = ((r.bottom - h.top) / r.height * 100 + 4).toFixed(1) + '%';
  }

  /** The little z floats just past her head on the pillow. */
  function snoozeAt(el: HTMLElement) {
    const head = el.querySelector('.inner svg .dollhead'); if (!head) return;
    const r = el.getBoundingClientRect(), h = head.getBoundingClientRect(); if (!r.width || !r.height || !h.width) return;
    el.style.setProperty('--zx', ((h.left + h.width * 0.7 - r.left) / r.width * 100).toFixed(1) + '%');
    el.style.setProperty('--zy', ((h.top - r.top) / r.height * 100 - 14).toFixed(1) + '%');
  }

  function paint() {
    const s = d.get(); const on = showWishes();
    for (const el of d.layer.querySelectorAll<HTMLElement>('.char[data-cid]')) {
      const c = s.characters.find(x => x.id === el.dataset.cid); if (!c) continue;
      const now: Record<Need, number> = { sleepy: 3, hungry: 3, playful: 3, clean: 3 };
      for (const n of NEEDS) now[n] = levelOf(c, n);
      const was = prev.get(c.id);
      if (was && NEEDS.some(n => now[n] > was[n])) { burst(el); sfx.sparkle(); }
      prev.set(c.id, now);
      const w = wishOf(c);
      const lying = !!(c as any).seat && (c as any).seat.pose === 'lie';
      el.classList.toggle('need-snooze', lying);
      if (lying) requestAnimationFrame(() => snoozeAt(el)); else { el.style.removeProperty('--zx'); el.style.removeProperty('--zy'); }
      el.classList.toggle('need-sleepy', w === 'sleepy' && !lying);
      let bub = el.querySelector<HTMLElement>(':scope > .need-bubble');
      if (!w || !on) { if (bub) { bub.classList.remove('show'); const b = bub; setTimeout(() => { if (!b.classList.contains('show')) b.remove(); }, 450); } continue; }
      if (!bub) { bub = document.createElement('div'); bub.className = 'need-bubble'; bub.innerHTML = `<i class="nb-dot1"></i><i class="nb-dot2"></i><span class="nb-cloud"></span>`; el.appendChild(bub); }
      if (bub.dataset.need !== w) { bub.dataset.need = w; bub.querySelector('.nb-cloud')!.innerHTML = ICON[w]; bub.setAttribute('role', 'img'); bub.setAttribute('aria-label', LABEL[w]); }
      const sx = spotX(s, c, w); const lean = sx == null ? 0 : Math.max(-1, Math.min(1, (sx - c.x) / 300));
      bub.style.setProperty('--lean', String(Math.round(lean * 100) / 100));
      const b2 = bub;
      requestAnimationFrame(() => { anchor(el, b2, lying); b2.classList.add('show'); });
    }
    for (const id of prev.keys()) if (!s.characters.some(c => c.id === id)) prev.delete(id);
    // A soft shimmer on the spot that would help (the fridge for a hungry doll, the bed for a sleepy one...).
    const want = new Set<string>();
    if (on) for (const c of s.characters) { if (c.room !== s.currentRoom) continue; if (!wishOf(c)) continue;
      for (const n of NEEDS) if (levelOf(c, n) <= 1) for (const it of s.rooms[s.currentRoom]?.items ?? []) if (hintFor(n, it.kind)) want.add(it.id); }
    for (const el of d.layer.querySelectorAll<HTMLElement>('.item[data-id]')) el.classList.toggle('need-hint', want.has(el.dataset.id!));
  }

  /** Care: a doll at the right spot with a need below full gets it met. Anyone may do this, visitors too. */
  function care() {
    if (!d.speaks()) return;
    const s = d.get(); const t = Date.now();
    for (const c of s.characters) {
      if (c.room !== s.currentRoom) continue;
      for (const n of meetableHere(s, c)) {
        const k = c.id + '|' + n;
        if (t - (asked.get(k) ?? 0) < 2500) continue;
        asked.set(k, t); d.dispatch({ type: 'need/meet', id: c.id, need: n });
      }
    }
  }

  /** Drift: only visible play time in her own house counts. Nothing moves while the app is closed or hidden. */
  function tick(add?: number) {
    const t = performance.now(); const dt = add ?? Math.min(t - last, 5000); last = t;
    if (add == null && document.visibilityState !== 'visible') return;
    if (!d.canDrift() || !d.speaks()) { visibleMs = 0; return; } // a visit never counts toward her own house either
    visibleMs += dt;
    if (visibleMs < DRIFT_MS) return;
    visibleMs = 0;
    const p = driftPick(d.get(), turn++);
    if (p) d.dispatch({ type: 'need/drift', id: p.id, need: p.need });
  }

  // Care is sent after this render settles, so the burst lands on the redrawn doll.
  d.subscribe(() => { paint(); setTimeout(care, 0); });
  // Tapping a doll that already sits at the right spot (a visitor tucking her in, say) gives the care too.
  d.layer.addEventListener('pointerup', e => { if ((e.target as HTMLElement).closest?.('.char[data-cid]')) { asked.clear(); care(); } });
  setInterval(() => { tick(); paint(); }, 1000);
  document.addEventListener('visibilitychange', () => { last = performance.now(); });
  paint();
  // Test hook only with ?needsqa=1, so a normal session never sees it.
  if (new URLSearchParams(location.search).has('needsqa')) (window as any).__needs = { tick: (ms: number) => tick(ms), visible: () => visibleMs, paint, care };
}
