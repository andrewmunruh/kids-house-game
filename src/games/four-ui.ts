// Four in a Row: pink hearts against aqua stars. Tap a column to drop.
import type { GamePlugin, PlayCtx } from './ui';

const O = '#5a3d5c';
const esc = (t: string) => t.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const heart = `<svg viewBox="0 0 48 48"><path d="M24 40 C10 30 4 22 8 14 C12 8 20 10 24 16 C28 10 36 8 40 14 C44 22 38 30 24 40 Z" fill="#ff4d94" stroke="${O}" stroke-width="3" stroke-linejoin="round"/></svg>`;
const star = `<svg viewBox="0 0 48 48"><path d="M24 4 L29 18 H44 L32 27 L36 42 L24 33 L12 42 L16 27 L4 18 H19 Z" fill="#66d9e8" stroke="${O}" stroke-width="3" stroke-linejoin="round"/></svg>`;

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
    host.innerHTML = `<div class="fourPlay">
      <div class="whose ${yours ? 'yours' : ''}" id="whoseTurn">${turnLine}</div>
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
