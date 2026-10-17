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

const crown = `<g transform="translate(16 30)"><path d="M2 24 L7 8 L14 16 L20 2 L26 16 L33 8 L38 24 Z" fill="#ffd43b" stroke="${O}" stroke-width="2" stroke-linejoin="round"/><rect x="2" y="24" width="36" height="7" rx="2" fill="#ffd43b" stroke="${O}" stroke-width="2"/><circle cx="7" cy="8" r="2.2" fill="#ff7eb3"/><circle cx="20" cy="3" r="2.2" fill="#66d9e8"/><circle cx="33" cy="8" r="2.2" fill="#d0bfff"/></g>`;
const heart = (x: number, y: number) => `<path d="M${x} ${y + 4} C${x - 4} ${y - 2} ${x - 8} ${y} ${x - 6} ${y + 5} C${x - 4} ${y + 8} ${x} ${y + 11} ${x} ${y + 11} C${x} ${y + 11} ${x + 4} ${y + 8} ${x + 6} ${y + 5} C${x + 8} ${y} ${x + 4} ${y - 2} ${x} ${y + 4} Z" fill="#ff4d94" stroke="${O}" stroke-width="1"/>`;
const faceIcon = (card: Card, ink: string) => {
  if (card.v === 'wild' || card.v === 'w4') return crown + (card.v === 'w4' ? `<text x="35" y="78" text-anchor="middle" font-size="16" font-weight="900" fill="${ink}">+4</text>` : '');
  if (card.v === 'd2') return `<g transform="translate(17 32)"><circle cx="18" cy="16" r="16" fill="#ffe0ef" stroke="${O}" stroke-width="2"/>${heart(12, 8)}${heart(24, 8)}<path d="M10 24 Q18 30 26 24" fill="none" stroke="${O}" stroke-width="2" stroke-linecap="round"/></g>`;
  if (card.v === 'rev') return `<g fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"><path d="M18 36 C40 22 50 48 34 54 C20 60 16 44 28 40"/><path d="M16 34 L22 28 L24 38"/></g><circle cx="48" cy="30" r="3" fill="#ffd43b" stroke="${O}" stroke-width="1"/><circle cx="22" cy="58" r="2.4" fill="#ff7eb3"/><circle cx="50" cy="52" r="2.2" fill="#66d9e8"/>`;
  if (card.v === 'skip') return `<g transform="translate(14 32)"><circle cx="21" cy="16" r="16" fill="#fff6d8" stroke="${O}" stroke-width="2"/><rect x="8" y="12" width="12" height="8" rx="3" fill="#2b1430"/><rect x="22" y="12" width="12" height="8" rx="3" fill="#2b1430"/><path d="M20 16 H22 M6 14 H4 M38 14 H40" stroke="${O}" stroke-width="2" stroke-linecap="round"/><path d="M12 24 Q21 28 30 24" fill="none" stroke="${O}" stroke-width="2" stroke-linecap="round"/></g>`;
  return `<text x="35" y="64" text-anchor="middle" font-size="40" font-weight="900" fill="${ink}" font-family="Nunito, ui-rounded, system-ui, sans-serif">${card.v}</text>`;
};
const faceWord = (card: Card) => card.v === 'skip' ? 'Nope' : card.v === 'rev' ? 'Flip' : card.v === 'd2' ? '+2' : card.v === 'wild' ? 'Crown' : card.v === 'w4' ? 'Crown' : '';
const corner = (card: Card) => typeof card.v === 'number' ? String(card.v) : card.v === 'skip' ? '✕' : card.v === 'rev' ? '↻' : card.v === 'd2' ? '+2' : card.v === 'w4' ? '+4' : '♛';

export function cardSVG(card: Card): string {
  const wild = card.c === 4;
  const pal = wild ? { fill: '#fff', ink: O } : PAL[card.c] ?? PAL[0];
  const frame = wild
    ? `<rect x="3" y="3" width="64" height="94" rx="14" fill="#fff6fb" stroke="#ff7eb3" stroke-width="4"/><rect x="6" y="6" width="58" height="88" rx="12" fill="none" stroke="#d0bfff" stroke-width="2"/><rect x="8" y="8" width="54" height="84" rx="10" fill="none" stroke="#66d9e8" stroke-width="2"/><rect x="10" y="10" width="50" height="80" rx="8" fill="none" stroke="#ffd43b" stroke-width="2"/>`
    : `<rect x="3" y="3" width="64" height="94" rx="14" fill="${pal.fill}" stroke="${O}" stroke-width="3"/>`;
  return `<svg viewBox="0 0 70 100">${frame}<rect x="9" y="9" width="52" height="82" rx="10" fill="#fff" opacity=".93"/>
    <text x="14" y="22" font-size="11" font-weight="900" fill="${pal.ink}" font-family="Nunito, ui-rounded, system-ui, sans-serif">${corner(card)}</text>
    ${faceIcon(card, pal.ink)}
    <text x="35" y="88" text-anchor="middle" font-size="11" font-weight="900" fill="${pal.ink}" font-family="Nunito, ui-rounded, system-ui, sans-serif">${faceWord(card)}</text></svg>`;
}
const backSVG = `<svg viewBox="0 0 70 100"><rect x="3" y="3" width="64" height="94" rx="14" fill="#ff7eb3" stroke="${O}" stroke-width="3"/><rect x="10" y="10" width="50" height="80" rx="10" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 3"/>${heart(35, 40)}</svg>`;

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
    <div class="slayOpps">${table.players.map((pid, i) => i === you ? '' : `<div class="slayOpp ${v.turn === i ? 'isTurn' : ''}" data-p="${i}" data-count="${v.counts?.[i] ?? 0}"><b>${esc(ctx.name(pid))}</b><span class="cnt">${v.counts?.[i] ?? 0}</span>${v.slay?.[i] ? '<em>SLAY!</em>' : ''}</div>`).join('')}</div>
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
