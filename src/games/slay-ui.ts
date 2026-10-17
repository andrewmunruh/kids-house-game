// Slay table: girly glam cards, a big SLAY! button, Crown color picker.
// Only this player's hand is drawn. Everyone else is a name and a count.
import type { Card, Face } from '../shared/games/slay';
import type { GamePlugin, PlayCtx } from './ui';

const PAL = [
  { name: 'Pink', fill: '#ff7eb3', ink: '#9d174d' },
  { name: 'Lilac', fill: '#c9b3ff', ink: '#5f3dc4' },
  { name: 'Aqua', fill: '#66d9e8', ink: '#0b7285' },
  { name: 'Gold', fill: '#ffd43b', ink: '#e67700' },
];
const O = '#5a3d5c';
const esc = (t: string) => t.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const rank = (f: Face) => typeof f === 'number' ? f : ({ skip: 10, rev: 11, d2: 12, wild: 13, w4: 14 } as Record<string, number>)[f] ?? 0;

const pip = (card: Card) => typeof card.v === 'number' ? String(card.v) : card.v === 'skip' ? '✕' : card.v === 'rev' ? '↻' : card.v === 'd2' ? '+2' : card.v === 'w4' ? '+4' : '♛';
const faceWord = (card: Card) => card.v === 'skip' ? 'Nope' : card.v === 'rev' ? 'Flip' : card.v === 'd2' ? '+2' : card.v === 'wild' ? 'Crown' : card.v === 'w4' ? 'Crown' : '';
const spark = (x: number, y: number, s = 1, fill = '#ffd43b') => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -6 L1.4 -1.4 L6 -1 L1.6 1.4 L3 6 L0 3 L-3 6 L-1.6 1.4 L-6 -1 L-1.4 -1.4 Z" fill="${fill}" stroke="${O}" stroke-width="1" stroke-linejoin="round"/>`;
const heartBit = (x: number, y: number, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 1.2 C-2.2 -1.6 -5.2 -0.6 -3.6 2.2 C-2.4 4 0 5.2 0 5.2 C0 5.2 2.4 4 3.6 2.2 C5.2 -0.6 2.2 -1.6 0 1.2 Z" fill="#ff4d94" stroke="${O}" stroke-width="1"/>`;

/** Big illustrated icon for an action card. Number cards use a bubbly numeral instead. */
function actionIcon(card: Card): string {
  if (card.v === 'wild' || card.v === 'w4') return `<g transform="translate(14 28)">
      <path d="M4 26 L10 8 L18 16 L24 2 L30 16 L38 8 L44 26 Z" fill="#ffd43b" stroke="${O}" stroke-width="2.2" stroke-linejoin="round"/>
      <rect x="4" y="26" width="40" height="8" rx="2" fill="#ffd43b" stroke="${O}" stroke-width="2.2"/>
      <circle cx="10" cy="8" r="2.4" fill="#ff7eb3"/><circle cx="24" cy="3" r="2.4" fill="#66d9e8"/><circle cx="38" cy="8" r="2.4" fill="#d0bfff"/>
      ${spark(-2, 0, 0.7)}${spark(46, 4, 0.65, '#fff')}${spark(22, -4, 0.55, '#ff7eb3')}
    </g>${card.v === 'w4' ? `<text x="35" y="78" text-anchor="middle" font-size="16" font-weight="900" fill="${O}" font-family="Nunito, ui-rounded, system-ui, sans-serif">+4</text>` : ''}`;
  if (card.v === 'd2') return `<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff" stroke="${O}" stroke-width="2.4"/>
      ${heartBit(14, 8, 1.35)}${heartBit(32, 8, 1.35)}
      <path d="M12 26 Q23 34 34 26" fill="none" stroke="${O}" stroke-width="2.4" stroke-linecap="round"/>
      ${heartBit(40, 22, 0.8)}
    </g>`;
  if (card.v === 'rev') return `<g fill="none" stroke="${O}" stroke-width="3.2" stroke-linecap="round">
      <path d="M16 40 C42 22 54 52 34 60 C16 68 12 46 30 40"/>
      <path d="M14 38 L22 30 L24 42" stroke-linejoin="round"/>
    </g>${spark(48, 28, 0.85)}${spark(20, 62, 0.6, '#ff7eb3')}${spark(50, 58, 0.55, '#66d9e8')}`;
  if (card.v === 'skip') return `<g transform="translate(12 30)">
      <circle cx="23" cy="18" r="18" fill="#fff6d8" stroke="${O}" stroke-width="2.4"/>
      <rect x="8" y="12" width="14" height="9" rx="3" fill="#2b1430"/><rect x="24" y="12" width="14" height="9" rx="3" fill="#2b1430"/>
      <path d="M22 16.5 H24 M5 14 H2 M41 14 H44" stroke="${O}" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 27 Q23 32 34 27" fill="none" stroke="${O}" stroke-width="2.2" stroke-linecap="round"/>
    </g>`;
  return '';
}

export function cardSVG(card: Card): string {
  const wild = card.c === 4;
  const pal = wild ? { fill: '#fff8ee', ink: O } : PAL[card.c] ?? PAL[0];
  const num = typeof card.v === 'number';
  const label = faceWord(card);
  const frame = wild
    ? `<rect x="2" y="2" width="66" height="96" rx="13" fill="#fff8ee" stroke="#ff7eb3" stroke-width="4"/><rect x="5" y="5" width="60" height="90" rx="11" fill="none" stroke="#d0bfff" stroke-width="2"/><rect x="7.5" y="7.5" width="55" height="85" rx="9" fill="none" stroke="#66d9e8" stroke-width="1.6"/><rect x="9.5" y="9.5" width="51" height="81" rx="8" fill="none" stroke="#ffd43b" stroke-width="1.6"/>`
    : `<rect x="2" y="2" width="66" height="96" rx="13" fill="${pal.fill}" stroke="${O}" stroke-width="3"/><rect x="6" y="6" width="58" height="88" rx="10" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>`;
  const shine = `<ellipse cx="24" cy="20" rx="16" ry="8" fill="#fff" opacity=".38"/>`;
  const inkText = `fill="${pal.ink}" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif"`;
  const corners = `<text x="8" y="16" font-size="13" font-weight="900" ${inkText}>${pip(card)}</text>`
    + (num ? `<text x="62" y="94" font-size="13" font-weight="900" text-anchor="end" ${inkText}>${pip(card)}</text>` : '');
  const center = num
    ? `<text x="35" y="68" text-anchor="middle" font-size="48" font-weight="900" fill="${pal.ink}" stroke="#fff" stroke-width="6" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">${card.v}</text>`
    : `${actionIcon(card)}${label ? `<text x="35" y="92" text-anchor="middle" font-size="12" font-weight="900" ${inkText}>${label}</text>` : ''}`;
  return `<svg viewBox="0 0 70 100">${frame}${shine}${corners}${center}</svg>`;
}
const backHearts = [[18, 28], [40, 28], [29, 46], [18, 64], [40, 64], [29, 78]].map(([x, y]) => heartBit(x, y, 0.9)).join('');
const backSVG = `<svg viewBox="0 0 70 100"><rect x="2" y="2" width="66" height="96" rx="13" fill="#ff4d94" stroke="${O}" stroke-width="3"/>
  <rect x="7" y="7" width="56" height="86" rx="10" fill="none" stroke="#ffd43b" stroke-width="3"/>
  <rect x="11" y="11" width="48" height="78" rx="8" fill="#ff7eb3"/>
  ${backHearts}
  <circle cx="35" cy="50" r="14" fill="#fff6fb" stroke="${O}" stroke-width="2.4"/>
  ${spark(35, 50, 1.15, '#ffd43b')}
</svg>`;

const playable = (card: Card, v: any) => {
  if (v.turn < 0) return false;
  if (v.drawn != null && card.id !== v.drawn) return false;
  const top = v.top as Card;
  return card.c === 4 || card.c === v.color || (card.v === top.v && top.c !== 4);
};

let hostEl: HTMLElement | null = null;
let pendingId: number | null = null;
let lastEv = -1;
let lastTb = -1;

function render(host: HTMLElement, ctx: PlayCtx) {
  hostEl = host;
  const table = ctx.table;
  const v = table.view;
  if (!v || !v.top) { host.innerHTML = ''; return; }
  if (table.tb !== lastTb) { pendingId = null; lastEv = -1; lastTb = table.tb; }
  const you = table.you;
  const hand: Card[] = you !== null && Array.isArray(v.hand) ? v.hand.slice() : [];
  if (pendingId !== null && !hand.some(c => c.id === pendingId)) pendingId = null;
  const ev = v.ev;
  let from: DOMRect | null = null;
  const fresh = ev && ev.n !== lastEv && lastEv >= 0;
  if (fresh && ev.k === 'play' && ev.card) {
    const src = host.querySelector<HTMLElement>(`[data-card="${ev.card.id}"]`) || host.querySelector<HTMLElement>(`[data-p="${ev.p}"]`);
    if (src) from = src.getBoundingClientRect();
  }
  const yours = you !== null && v.turn === you;
  const slayOk = you !== null && hand.length <= 2 && hand.length > 0 && !v.slay?.[you] && v.turn >= 0 && table.phase === 'play';
  const drawOk = yours && v.drawn == null && table.phase === 'play';
  const passOk = yours && v.drawn != null && table.phase === 'play';
  const sorted = hand.sort((a, b) => a.c - b.c || rank(a.v) - rank(b.v));
  const turnPid = v.turn >= 0 ? table.players[v.turn] : '';
  const turnLine = v.turn < 0 ? '' : yours ? 'Your turn!' : `${esc(ctx.name(turnPid))}'s turn`;
  const pal = PAL[v.color] ?? PAL[0];
  host.innerHTML = `<div class="slayFelt">
    <div class="whose ${yours ? 'yours' : ''}" id="whoseTurn">${turnLine}<span class="slayDir" aria-hidden="true">${v.dir === 1 ? '→' : '←'}</span></div>
    <div class="slayOpps">${table.players.map((pid, i) => i === you ? '' : `<div class="slayOpp ${v.turn === i ? 'isTurn' : ''}" data-p="${i}" data-count="${v.counts?.[i] ?? 0}"><span class="chipFace">${ctx.face(pid)}</span><b>${esc(ctx.name(pid))}</b><span class="cnt">${v.counts?.[i] ?? 0}</span>${v.slay?.[i] ? '<em>SLAY!</em>' : ''}</div>`).join('')}</div>
    <div class="slayPile">
      <button type="button" id="slayDeck" class="slayDeck" ${drawOk ? '' : 'disabled'} aria-label="Draw a card">${backSVG}<span>${v.deck ?? 0}</span></button>
      <div id="slayDiscard" class="slayDiscard" data-top="${v.top.id}">${cardSVG(v.top)}</div>
      <div class="nowColor" data-color="${v.color}" style="background:${pal.fill}" aria-label="${pal.name}"></div>
    </div>
    ${you === null ? '<p class="watching">You are watching</p>' : ''}
    ${pendingId !== null ? `<div id="crownPick" class="crownPick"><p>Pick a color for your Crown!</p><div class="crownRow">${PAL.map((p, i) => `<button type="button" data-color="${i}" aria-label="${p.name}" style="background:${p.fill}"><span>${p.name}</span></button>`).join('')}</div></div>` : ''}
    <div id="slayHand" class="slayHand ${yours ? 'isTurn' : ''}">${sorted.map(c => {
      const ok = yours && table.phase === 'play' && playable(c, v);
      const word = typeof c.v === 'number' ? PAL[c.c].name + ' ' + c.v : (c.v === 'wild' ? 'Crown' : c.v === 'w4' ? 'Crown plus 4' : c.v === 'd2' ? 'plus 2' : c.v === 'rev' ? 'Flip' : 'Nope');
      return `<button type="button" class="slayCard ${ok ? 'can' : 'dim'} ${c.id === v.drawn ? 'justDrew' : ''} ${c.id === pendingId ? 'picked' : ''}" data-card="${c.id}" data-c="${c.c}" data-v="${c.v}" aria-label="${esc(word)}" ${ok ? '' : 'disabled'}>${cardSVG(c)}</button>`;
    }).join('')}</div>
    ${you !== null ? `<button type="button" id="slayCall" class="slayCall ${slayOk ? 'ready' : ''}" ${slayOk ? '' : 'disabled'}>SLAY!</button>` : ''}
    <button type="button" id="slayPass" class="slayPass ${passOk ? '' : 'hidden'}" ${passOk ? '' : 'disabled'}>Pass</button>
  </div>`;
  if (ev && ev.n !== lastEv) {
    const prev = lastEv; lastEv = ev.n;
    if (prev >= 0) {
      if (ev.k === 'play' && ev.card) {
        const to = host.querySelector('#slayDiscard');
        if (to) fly(from, ev.card, to.getBoundingClientRect());
        if (ev.card.v === 'skip') ctx.toast('Nope!');
        else if (ev.card.v === 'rev') ctx.toast('Flip!');
        else if (ev.card.v === 'd2') ctx.toast('+2!');
        else if (ev.card.v === 'w4') ctx.toast('Crown +4!');
        ctx.sfx.swish();
      }
      if (ev.vdrew) ctx.toast('Forgot to say SLAY! Draw 2');
      if (ev.k === 'slay') ctx.sfx.sparkle();
    }
  }
}

function fly(from: DOMRect | null, card: Card, to: DOMRect) {
  const el = document.createElement('div');
  el.className = 'flyCard'; el.innerHTML = cardSVG(card);
  const w = from?.width || 70, h = from?.height || 100;
  Object.assign(el.style, { left: (from?.left ?? innerWidth / 2) + 'px', top: (from?.top ?? 80) + 'px', width: w + 'px', height: h + 'px' });
  document.body.appendChild(el);
  requestAnimationFrame(() => { el.style.left = to.left + 'px'; el.style.top = to.top + 'px'; el.style.width = Math.max(to.width, 70) + 'px'; el.style.height = Math.max(to.height, 96) + 'px'; });
  setTimeout(() => el.remove(), 560);
}

export const slayUI: GamePlugin = {
  id: 'slay',
  render,
  handle(target, ctx) {
    const v = ctx.table.view;
    const you = ctx.table.you;
    if (!v || ctx.table.phase !== 'play' || you === null) return false;
    const hand: Card[] = v.hand ?? [];
    if (target.closest('#slayCall')) {
      if (hand.length <= 2 && hand.length > 0 && !v.slay?.[you]) { ctx.move({ k: 'slay' }); ctx.sfx.sparkle(); }
      return true;
    }
    if (target.closest('#slayDeck')) {
      if (v.turn === you && v.drawn == null) { pendingId = null; ctx.move({ k: 'draw' }); ctx.sfx.click(); }
      return true;
    }
    if (target.closest('#slayPass')) {
      if (v.turn === you && v.drawn != null) { pendingId = null; ctx.move({ k: 'pass' }); ctx.sfx.click(); }
      return true;
    }
    const colorBtn = target.closest<HTMLElement>('#crownPick [data-color]');
    if (colorBtn && pendingId !== null) {
      ctx.move({ k: 'play', id: pendingId, color: +colorBtn.dataset.color! });
      pendingId = null; ctx.sfx.sparkle(); return true;
    }
    const cardEl = target.closest<HTMLElement>('#slayHand [data-card]');
    if (!cardEl || cardEl.hasAttribute('disabled')) return !!cardEl;
    const id = +cardEl.dataset.card!;
    const card = hand.find(c => c.id === id);
    if (!card || v.turn !== you || !playable(card, v)) return true;
    if (card.c === 4) { pendingId = id; ctx.sfx.pop(); if (hostEl) render(hostEl, ctx); }
    else { pendingId = null; ctx.move({ k: 'play', id }); ctx.sfx.click(); }
    return true;
  },
};
