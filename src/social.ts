// M3 client side: the rest of the ambient items and social reactions (dolls, pets, baby).
// Everything here is local and visual. Nothing is dispatched or sent, and no stored position moves.
import { BEAT_MS, syncDelayMs, type Reaction, type ReactionKind } from './shared/ambient';
import { KEYS_MS, isDucky, moreRoleOf, type MoreKind } from './shared/ambientMore';
import { socialFor, type SocDoll, type SocPet } from './shared/social';
import './social.css';

export const MORE_PERIOD: Record<MoreKind, number> = { play: BEAT_MS, listen: BEAT_MS * 4, stir: BEAT_MS * 2, swing: BEAT_MS * 3, slide: BEAT_MS * 4, look: BEAT_MS * 5, kneel: BEAT_MS * 3 };
export const MORE_CHAR_FX: Partial<Record<ReactionKind, string>> = { play: '<span>♪</span><span>♩</span>', listen: '<span>♪</span>' };
export const MORE_ITEM_FX: Record<string, string> = {
  keys: '<span>♪</span><span>♫</span><span>♩</span>',
  stove: '<span class="steam"></span><span class="steam"></span><span class="steam"></span>',
  water: '<span class="bub"></span><span class="bub"></span><span class="ripple"></span>',
  ducky: '',
};

// ---- piano / keyboard: a tap plays a short tune on this iPad only ----
const keysUntil = new Map<string, number>();
let actx: AudioContext | null = null;
function tune(seed: number) {
  try {
    actx ??= new (window.AudioContext || (window as any).webkitAudioContext)();
    const t0 = actx.currentTime + 0.02;
    const scale = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];
    for (let i = 0; i < 6; i++) {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = 'triangle'; o.frequency.value = scale[(seed + i * (i % 2 ? 2 : 3)) % scale.length];
      const t = t0 + i * 0.28;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.06, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0008, t + 0.6);
      o.connect(g).connect(actx.destination); o.start(t); o.stop(t + 0.65);
    }
  } catch { /* no audio: visuals only */ }
}
/** Play-mode tap on one of the new items. Returns true when it handled the tap. */
export function tapMore(kind: string, id: string, soundOn: boolean, onChange: () => void): boolean {
  if (moreRoleOf(kind) !== 'keys') return false;
  const now = Date.now();
  if ((keysUntil.get(id) ?? 0) > now) keysUntil.delete(id);
  else {
    keysUntil.set(id, now + KEYS_MS);
    if (soundOn) tune(now % 6);
    setTimeout(onChange, KEYS_MS + 60);
  }
  onChange();
  return true;
}
export function keysPlaying(now = Date.now()): Set<string> {
  const out = new Set<string>();
  keysUntil.forEach((t, id) => { if (t > now) out.add(id); else keysUntil.delete(id); });
  return out;
}

/** Item effect key for the new items, or null. */
export function moreItemFx(kind: string, id: string, rx: Map<string, Reaction>, playing: Set<string>, opened: Set<string>, bathing: boolean): string | null {
  const role = moreRoleOf(kind);
  if (role === 'keys') return playing.has(id) ? 'keys' : null;
  if (role === 'stove') return opened.has(id) ? 'stove' : null;
  if (role === 'water') { for (const r of rx.values()) if (r.item === id && r.kind === 'look') return 'water'; return null; }
  if (isDucky(kind)) return bathing ? 'ducky' : null;
  return null;
}

// ---- social ----
export interface SocialCtx {
  layer: HTMLElement; roomW: number; seed: string; now: number; reduced: boolean;
  /** id -> element and synced doll facts, for dolls in this room (lifted ones already left out). */
  dolls: Map<string, { el: HTMLElement; d: SocDoll }>;
  baby: { x: number; y: number } | null;
}
const SOC = ['soc-wave', 'soc-hop', 'soc-heart', 'soc-l', 'soc-r', 'soc-duet', 'soc-baby'];
let prevNear = new Map<string, Set<string>>();
let seen = new Set<string>();
const greetUntil = new Map<string, number>();

function footOf(el: HTMLElement, k: number) { return { x: (el.offsetLeft + el.offsetWidth / 2) / k, y: (el.offsetTop + el.offsetHeight) / k }; }

export function syncSocial(ctx: SocialCtx, ambient: Map<string, Reaction>) {
  const k = ctx.layer.offsetWidth / ctx.roomW || 1;
  const pets: SocPet[] = [];
  const petEls = new Map<string, HTMLElement>();
  ctx.layer.querySelectorAll<HTMLElement>(':scope > .pet').forEach((el, i) => {
    if (el.classList.contains('lifted')) return;
    const key = el.classList.contains('pet-cat') ? 'cat' : (el.dataset.dog || 'pet' + i);
    pets.push({ key, ...footOf(el, k) }); petEls.set(key, el);
  });
  const dolls: SocDoll[] = [];
  for (const [id, { d }] of ctx.dolls) {
    const r = ambient.get(id);
    dolls.push({ ...d, id, busy: !!r, dancingAt: r?.kind === 'dance' ? r.item : undefined });
  }
  const out = socialFor(ctx.seed, dolls, pets, ctx.baby, ctx.now);

  // Arrivals: a friend who just came into reach gets a head-turn and a wave from both.
  const near = new Map<string, Set<string>>();
  for (const a of dolls) for (const b of dolls) if (a !== b && Math.hypot(a.x - b.x, (a.y - b.y) * 1.5) <= 200) (near.get(a.id) ?? near.set(a.id, new Set()).get(a.id)!).add(b.id);
  for (const [id, set] of near) for (const f of set) {
    if (!prevNear.get(id)?.has(f) && seen.has(id) && seen.has(f)) greetUntil.set(id, ctx.now + 1800);
  }
  prevNear = near; seen = new Set(dolls.map(d => d.id));

  for (const [id, { el }] of ctx.dolls) {
    const amb = ambient.get(id);
    const p = out.pair.get(id), duet = out.duet.get(id), bf = out.nearBaby.get(id);
    const greet = (greetUntil.get(id) ?? 0) > ctx.now;
    let want = '';
    let face: -1 | 1 | 0 = 0, phase = 0;
    if (duet && amb) { want = 'soc-duet'; face = duet.face; phase = duet.phase; }
    else if (!amb && greet) { want = 'soc-wave'; const f = [...(near.get(id) ?? [])][0]; const o = f ? ctx.dolls.get(f)?.d : undefined; face = o ? (o.x < ctx.dolls.get(id)!.d.x ? -1 : 1) : 0; }
    else if (!amb && p) { want = 'soc-' + p.kind; face = p.face; phase = p.phase; }
    else if (!amb && bf) { want = 'soc-baby'; face = bf; }
    const key = want + face;
    if (el.dataset.soc === key) continue;
    el.classList.remove(...SOC);
    if (!want) { delete el.dataset.soc; continue; }
    el.dataset.soc = key;
    el.classList.add(want);
    if (face) el.classList.add(face < 0 ? 'soc-l' : 'soc-r');
    const period = want === 'soc-duet' ? BEAT_MS * 2 : BEAT_MS * 2;
    // Duet partners share a phase so they step together; other pairs are offset.
    el.style.setProperty('--soc-delay', syncDelayMs(phase, period, ctx.now) + 'ms');
    if (want === 'soc-duet') el.style.setProperty('--amb-delay', syncDelayMs(phase, BEAT_MS * 2, ctx.now) + 'ms');
  }
  for (const el of ctx.layer.querySelectorAll<HTMLElement>('[data-soc]')) {
    const id = el.dataset.id || el.dataset.pid;
    if (![...ctx.dolls.values()].some(v => v.el === el)) { el.classList.remove(...SOC); delete el.dataset.soc; void id; }
  }

  for (const [key, el] of petEls) {
    const r = out.pets.get(key);
    const dx = r && !ctx.reduced ? r.dx * k : r ? r.dx * k : 0;
    const prev = parseFloat(el.dataset.socDx || '0');
    if (Math.abs(dx - prev) < 1) continue;
    el.dataset.socDx = String(dx);
    el.classList.toggle('soc-trot', Math.abs(dx - prev) > 12 && !ctx.reduced);
    el.classList.toggle('soc-snug', !!r);
    el.style.translate = dx ? `${dx.toFixed(1)}px 0` : '';
    if (Math.abs(dx - prev) > 12) setTimeout(() => el.classList.remove('soc-trot'), 1300);
  }

  const babyEl = ctx.layer.querySelector<HTMLElement>(':scope > .baby');
  if (babyEl) babyEl.classList.toggle('soc-coo', out.babyCoo);
}
