// Four in a Row: pink hearts against aqua stars. Tap a column to drop.
import type { GamePlugin, PlayCtx } from './ui';

const O = '#5a3d5c';
const esc = (t: string) => t.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const heart = `<svg viewBox="0 0 48 48"><path d="M24 42 C8 30 2 22 7 13 C11 6 20 8 24 16 C28 8 37 6 41 13 C46 22 40 30 24 42 Z" fill="#ff4d94" stroke="${O}" stroke-width="3" stroke-linejoin="round"/><path d="M16 16 Q20 12 22 18" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></svg>`;
const star = `<svg viewBox="0 0 48 48"><path d="M24 3 L29 17 H44 L32 26 L37 42 L24 33 L11 42 L16 26 L4 17 H19 Z" fill="#66d9e8" stroke="${O}" stroke-width="3" stroke-linejoin="round"/><path d="M24 12 L26 18 H22 Z" fill="#fff" opacity=".8"/></svg>`;

export const fourUI: GamePlugin = {
  id: 'four',
  render(host, ctx) {
    const table = ctx.table;
    const v = table.view;
    if (!v || !Array.isArray(v.b)) { host.innerHTML = ''; return; }
    const you = table.you;
    const yours = you !== null && v.turn === you && table.phase === 'play';
    const line = new Set<string>(((v.line ?? []) as [number, number][]).map(([c, r]) => c + ':' + r));
    const last = v.last as { col: number; row: number } | null;
    let cols = '';
    for (let c = 0; c < 7; c++) {
      const col = v.b[c] as number[];
      let cells = '';
      for (let r = 5; r >= 0; r--) {
        const owner = r < col.length ? col[r] : null;
        const hot = line.has(c + ':' + r) ? ' hot' : '';
        const just = last && last.col === c && last.row === r ? ' just' : '';
        const piece = owner === 0 ? heart : owner === 1 ? star : '';
        cells += `<span class="fourCell${owner === 0 ? ' heart' : owner === 1 ? ' star' : ''}${hot}${just}">${piece}</span>`;
      }
      const open = yours && col.length < 6;
      cols += `<button type="button" class="fourCol" data-col="${c}" ${open ? '' : 'disabled'} aria-label="Drop in column ${c + 1}">${cells}<span class="dropHint">${open ? '▼' : ''}</span></button>`;
    }
    const turnPid = v.turn >= 0 ? table.players[v.turn] : '';
    const turnLine = v.turn < 0 ? (v.draw ? "It's a tie!" : '') : yours ? 'Your turn!' : `${esc(ctx.name(turnPid))}'s turn`;
    const legend = you === 0 ? 'You are <b>pink hearts</b>' : you === 1 ? 'You are <b>aqua stars</b>' : 'Pink hearts and aqua stars';
    const chips = table.players.map((pid, i) => `<div class="playerChip ${v.turn === i ? 'isTurn' : ''}"><span class="chipFace">${ctx.face(pid)}</span><b>${i === 0 ? 'Hearts' : 'Stars'}</b></div>`).join('');
    host.innerHTML = `<div class="fourPlay">
      <div class="whose ${yours ? 'yours' : ''}" id="whoseTurn">${turnLine}</div>
      <div class="fourChips">${chips}</div>
      <p class="fourLegend">${legend}</p>
      <div class="fourBoard" id="fourBoard">${cols}</div>
    </div>`;
  },
  handle(target, ctx) {
    const col = target.closest<HTMLElement>('.fourCol');
    if (!col) return false;
    const v = ctx.table.view;
    const you = ctx.table.you;
    if (col.hasAttribute('disabled') || !v || you === null || v.turn !== you || ctx.table.phase !== 'play') return true;
    const i = +col.dataset.col!;
    if (!Number.isInteger(i) || v.b[i].length >= 6) return true;
    ctx.move({ col: i }); ctx.sfx.click();
    return true;
  },
};
