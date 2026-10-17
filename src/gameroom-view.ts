// Game Room scene: walk around the clubhouse, sit, and open a table.
import { characterSVG, SIZE_SCALE } from './character';
import { confetti } from './eggs';
import { createTableUI, type TableApi } from './games/ui';
import { GR_H, gameRoomSVG, seatLayout } from './gameroom';
import type { HoodClient } from './net';
import type { Look, Presence } from './shared/hood';
import { GAMEROOM_W, GAMES, TABLES } from './shared/games/index';
import type { Dog } from './shared/state';

const CHAR_W = 120, CHAR_H = 192;
const esc = (t: string) => t.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export interface GRDeps {
  hood: () => HoodClient | null;
  view: () => string;
  solo: () => Presence | null;
  myPres: () => Presence | null;
  setPres: (p: Presence) => void;
  toast: (s: string) => void;
  sfx: { click(): void; sparkle(): void; pop(): void; swish(): void; drop(): void; pick(): void };
  goMap: () => void;
  soloLook: () => { look: Look; dog: Dog | null };
}

let D: GRDeps | null = null;
let api: TableApi | null = null;
let walkTarget: { x: number; y: number } | null = null;
let bound = false;

export const grScale = () => (document.getElementById('gameroom')?.clientHeight || 600) / GR_H;
export const tableApi = () => api;
export function mySeat(): { tb: number; seat: number; x: number; y: number } | null {
  const h = D?.hood(); if (!h) return null;
  for (const [tb, t] of h.tables) {
    const seat = t.seats.indexOf(h.pid);
    if (seat >= 0) { const c = seatLayout(Number(tb))[seat]; return { tb: Number(tb), seat, x: c.x, y: c.y }; }
  }
  return null;
}
export function friendsAround(): boolean {
  const h = D?.hood(); if (!h) return false;
  for (const [pid, p] of h.players) if (pid !== h.pid && p.online) return true;
  return false;
}

export function bindGameRoom(deps: GRDeps) {
  D = deps;
  api = createTableUI({ hood: deps.hood, toast: deps.toast, confetti: () => confetti(), sfx: deps.sfx });
  if (bound) return api;
  bound = true;
  const world = document.getElementById('grWorld')!;
  world.addEventListener('click', onClick);
  world.addEventListener('pointerdown', e => {
    if ((e.target as HTMLElement).closest('.grChair, .grTable, .grDoor, .pet')) e.stopPropagation();
  });
  return api;
}

export function renderGameRoom() {
  if (!D) return;
  const sc = grScale(), w = document.getElementById('grWorld')!;
  const px = (v: number) => v * sc + 'px';
  w.style.width = GAMEROOM_W * sc + 'px'; w.style.height = GR_H * sc + 'px'; w.style.setProperty('--sc', String(sc));
  let html = gameRoomSVG();
  html += `<button class="grDoor" data-gr="map" aria-label="Back to the map" style="left:${px(78)};top:${px(268)};width:${px(86)};height:${px(170)}"></button>`;
  TABLES.forEach((t, tb) => {
    const tw = t.seats >= 6 ? 560 : t.seats >= 4 ? 440 : 340;
    html += `<button class="grTable" data-tb="${tb}" aria-label="${GAMES[t.game].name} table" style="left:${px(t.x - tw / 2)};top:${px(456)};width:${px(tw)};height:${px(70)}"></button>`;
    seatLayout(tb).forEach((c, seat) => {
      // In front of the felt, so a tap on the tabletop still opens the game and a tap on the chair sits.
      html += `<button class="grChair" data-tb="${tb}" data-seat="${seat}" aria-label="Empty chair" style="left:${px(c.x - 38)};top:${px(c.y - 16)};width:${px(76)};height:${px(72)}"></button>`;
    });
  });
  html += '<div class="savatars" id="gavatars"></div>';
  w.innerHTML = html;
  renderGamePeople();
}

export function renderGamePeople() {
  if (!D || D.view() !== 'gameroom') return;
  const box = document.getElementById('gavatars'); if (!box) return;
  const sc = grScale(), keep = new Set<string>();
  for (const w of people()) {
    keep.add(w.key);
    let el = box.querySelector<HTMLElement>(`.savatar[data-pid="${w.key}"]`);
    if (!el) {
      el = document.createElement('div'); el.className = 'savatar ' + (w.mine ? 'mine' : 'other'); el.dataset.pid = w.key;
      box.appendChild(el); if (w.mine) attachDrag(el);
    }
    const lk = JSON.stringify(w.look) + w.name + (w.away ? ':away' : '');
    if (el.dataset.look !== lk) {
      const b = el.querySelector('.bubble');
      el.innerHTML = `<div class="inner">${characterSVG(w.look)}</div>${w.name ? `<div class="nametag">${esc(w.name)}${w.away ? '<i class="awayBadge">away</i>' : ''}</div>` : ''}`;
      if (b) el.appendChild(b); el.dataset.look = lk;
    }
    const k = (SIZE_SCALE[w.look.size] ?? 1) * sc * 0.95, wd = CHAR_W * k, h = CHAR_H * k;
    const feet = w.seated ? w.y - 8 : w.y;
    el.style.left = w.x * sc - wd / 2 + 'px'; el.style.top = feet * sc - h + 'px';
    el.style.width = wd + 'px'; el.style.height = h + 'px';
    el.style.zIndex = String(100 + Math.round(w.y));
    el.classList.toggle('flipped', w.flip); el.classList.toggle('away', w.away); el.classList.toggle('seated', w.seated);
  }
  box.querySelectorAll<HTMLElement>('.savatar').forEach(el => { if (!keep.has(el.dataset.pid!)) el.remove(); });
  const h = D.hood();
  document.querySelectorAll<HTMLElement>('#grWorld .grChair').forEach(el => {
    const pid = h?.tables.get(+el.dataset.tb!)?.seats[+el.dataset.seat!];
    el.classList.toggle('taken', !!pid);
    const who = pid ? h!.players.get(pid)?.nickname : '';
    el.setAttribute('aria-label', who ? who + ' is sitting' : 'Empty chair');
  });
  const solo = document.getElementById('grSolo');
  if (solo) solo.classList.toggle('hidden', friendsAround());
}

function people() {
  const out: { key: string; look: Look; name: string; x: number; y: number; flip: boolean; mine: boolean; away: boolean; seated: boolean }[] = [];
  const h = D!.hood();
  if (h) {
    const seated = new Map<string, { x: number; y: number }>();
    for (const [tb, t] of h.tables) t.seats.forEach((pid, seat) => { if (pid) seated.set(pid, seatLayout(Number(tb))[seat]); });
    const entries: [string, Presence][] = [...h.presence.entries()];
    const mine = D!.myPres(); if (mine) entries.push([h.pid, mine]);
    const seen = new Set<string>();
    for (const [pid, p] of entries) {
      if (p.where !== 'gameroom') continue;
      const pl = h.players.get(pid); if (!pl) continue;
      seen.add(pid);
      const chair = seated.get(pid);
      out.push({ key: pid, look: pl.look, name: pl.nickname, x: chair?.x ?? p.x, y: chair?.y ?? p.y, flip: p.flip, mine: pid === h.pid, away: false, seated: !!chair });
    }
    for (const [pid, chair] of seated) {
      if (seen.has(pid)) continue;
      const pl = h.players.get(pid); if (!pl) continue;
      out.push({ key: pid, look: pl.look, name: pl.nickname, x: chair.x, y: chair.y, flip: false, mine: false, away: true, seated: true });
    }
  } else {
    const p = D!.solo();
    if (p?.where === 'gameroom') {
      const s = D!.soloLook();
      out.push({ key: 'solo', look: s.look, name: '', x: p.x, y: p.y, flip: p.flip, mine: true, away: false, seated: false });
    }
  }
  return out;
}

function onClick(e: MouseEvent) {
  if (!D || D.view() !== 'gameroom') return;
  const t = e.target as HTMLElement;
  const av = t.closest<HTMLElement>('.savatar');
  if (av) {
    const h = D.hood(); const pid = av.dataset.pid;
    if (h && pid) for (const [tb, table] of h.tables) if (table.seats.includes(pid)) { api?.open(Number(tb)); return; }
    return;
  }
  if (t.closest('[data-gr="map"]')) { D.goMap(); return; }
  const chair = t.closest<HTMLElement>('.grChair');
  if (chair) { sit(+chair.dataset.tb!, +chair.dataset.seat!); return; }
  const tbl = t.closest<HTMLElement>('.grTable');
  if (tbl) {
    if (!D.hood()) { pulseSolo(); return; }
    api?.open(+tbl.dataset.tb!); D.sfx.click(); return;
  }
  if (t.closest('.pet') || mySeat()) return;
  const rect = document.getElementById('grWorld')!.getBoundingClientRect(), sc = grScale();
  const x = (e.clientX - rect.left) / sc, y = (e.clientY - rect.top) / sc;
  if (y < 430) return;
  walkTarget = { x: Math.max(60, Math.min(GAMEROOM_W - 60, x)), y: Math.max(470, Math.min(590, y)) };
}

function sit(tb: number, seat: number) {
  if (!D) return;
  const h = D.hood();
  if (!h) { pulseSolo(); return; }
  const who = h.tables.get(tb)?.seats[seat];
  if (who && who !== h.pid) { D.toast((h.players.get(who)?.nickname ?? 'Someone') + ' is sitting there!'); D.sfx.pop(); api?.open(tb); return; }
  walkTarget = null;
  h.tbl({ op: 'sit', tb, seat });
  const c = seatLayout(tb)[seat];
  D.setPres({ where: 'gameroom', x: c.x, y: Math.max(470, Math.min(590, c.y)), flip: false });
  api?.open(tb); D.sfx.click();
}

function pulseSolo() {
  if (!D) return;
  const el = document.getElementById('grSolo');
  if (el) { el.classList.remove('hidden'); el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
  D.toast('Play with friends on your street'); D.sfx.pop();
}

export function tickGameRoom(dt: number) {
  if (!D || D.view() !== 'gameroom' || !walkTarget) return;
  if (mySeat()) { walkTarget = null; return; }
  const me = D.hood() ? D.myPres() : D.solo();
  if (!me || me.where !== 'gameroom') { walkTarget = null; return; }
  const dx = walkTarget.x - me.x, dy = walkTarget.y - me.y, d = Math.hypot(dx, dy);
  if (d < 4) { walkTarget = null; return; }
  const step = Math.min(d, 300 * dt);
  const next: Presence = { where: 'gameroom', x: me.x + (dx / d) * step, y: me.y + (dy / d) * step, flip: Math.abs(dx) > 2 ? dx < 0 : me.flip };
  D.setPres(next);
  const sc = grScale(), scroll = document.getElementById('grScroll')!;
  const sx = next.x * sc - scroll.scrollLeft;
  if (sx < scroll.clientWidth * 0.22 || sx > scroll.clientWidth * 0.78) scroll.scrollLeft = next.x * sc - scroll.clientWidth / 2;
}

function attachDrag(el: HTMLElement) {
  el.addEventListener('pointerdown', e => {
    if (!D || mySeat()) return;
    const p0 = D.hood() ? D.myPres() : D.solo();
    if (!p0 || p0.where !== 'gameroom') return;
    e.preventDefault(); e.stopPropagation(); walkTarget = null;
    const sc = grScale(), world = document.getElementById('grWorld')!, scroll = document.getElementById('grScroll')!;
    const toW = (ev: PointerEvent) => { const r = world.getBoundingClientRect(); return { x: (ev.clientX - r.left) / sc, y: (ev.clientY - r.top) / sc }; };
    const q0 = toW(e), off = { x: p0.x - q0.x, y: p0.y - q0.y };
    let last = e, raf = 0, lastX = p0.x, moved = false;
    const apply = (ev: PointerEvent) => {
      const cur = D!.hood() ? D!.myPres() : D!.solo(); if (!cur || cur.where !== 'gameroom') return;
      const q = toW(ev);
      const x = Math.max(60, Math.min(GAMEROOM_W - 60, q.x + off.x)), y = Math.max(470, Math.min(590, q.y + off.y));
      if (!moved && Math.hypot(x - cur.x, y - cur.y) < 6) return;
      moved = true;
      const flip = Math.abs(x - lastX) > 3 ? x < lastX : cur.flip; if (Math.abs(x - lastX) > 3) lastX = x;
      D!.setPres({ where: 'gameroom', x, y, flip });
    };
    const edge = () => {
      const r = scroll.getBoundingClientRect();
      const v = last.clientX < r.left + 70 ? -12 : last.clientX > r.right - 70 ? 12 : 0;
      if (v && moved) { scroll.scrollLeft += v; apply(last); }
      raf = requestAnimationFrame(edge);
    };
    raf = requestAnimationFrame(edge); el.classList.add('lifted'); D.sfx.pick();
    const move = (ev: PointerEvent) => { if (ev.pointerId !== e.pointerId) return; last = ev; apply(ev); };
    const up = (ev: PointerEvent) => {
      if (ev.pointerId !== e.pointerId) return;
      cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up);
      el.classList.remove('lifted'); if (moved) D!.sfx.drop();
    };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  });
}
