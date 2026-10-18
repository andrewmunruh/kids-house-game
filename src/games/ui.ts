// Table overlay. Lobby, "play for her", and the winner banner live here.
// Each game fills #tblStage through a plug-in (src/games/*-ui.ts).
import { characterSVG } from '../character';
import { faceSVG } from '../map';
import type { HoodClient } from '../net';
import { GAMES, NUDGE_MS, type TablePub } from '../shared/games/index';
import { slayUI } from './slay-ui';
import { fourUI } from './four-ui';

export interface PlayCtx {
  table: TablePub;
  me: string;
  name: (pid: string) => string;
  /** Cropped face for a player chip. Empty if we don't know her look. */
  face: (pid: string) => string;
  move: (m: unknown) => void;
  /** She closed her iPad or left the clubhouse. */
  away: (pid: string) => boolean;
  toast: (s: string) => void;
  sfx: { click(): void; sparkle(): void; pop(): void; swish(): void };
}
export interface GamePlugin {
  id: string;
  render(host: HTMLElement, ctx: PlayCtx): void;
  /** A tap inside the play area. Return true if it belonged to this game. */
  handle(target: HTMLElement, ctx: PlayCtx): boolean;
}
const plugins: Record<string, GamePlugin> = { slay: slayUI, four: fourUI };

const esc = (t: string) => t.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const FAIL: Record<string, string> = {
  notHere: 'Come into the clubhouse first!',
  taken: 'Someone is sitting there!',
  playing: 'You are already in this game!',
  playingElsewhere: 'Finish your other game first!',
  notHost: 'Waiting for the host…',
  needMore: 'Play with friends on your street',
  tooMany: 'That table is full!',
  notPlaying: 'The game has not started!',
  notPlayer: 'Sit down to play!',
  illegal: "You can't play that!",
  notAway: 'She is still here!',
  tooSoon: 'Give her a moment!',
  notSeated: 'You are not at this table!',
  noMove: 'No move to play!',
};

export interface TableDeps {
  hood: () => HoodClient | null;
  toast: (s: string) => void;
  confetti: () => void;
  sfx: { click(): void; sparkle(): void; pop(): void; swish(): void };
}
export interface TableApi {
  open(tb: number): void;
  close(): void;
  refresh(): void;
  fail(tb: number, reason: string): void;
  isOpen(): number | null;
}

export function createTableUI(deps: TableDeps): TableApi {
  const root = document.getElementById('tableOverlay')!;
  let openTb: number | null = null;
  let celebrated = '';
  let clock = 0;
  const awayMs = (table: TablePub & { receivedAt?: number }) => table.away == null ? 0 : table.away + Math.max(0, Date.now() - (table.receivedAt ?? Date.now()));
  const stopClock = () => { if (clock) { clearInterval(clock); clock = 0; } };
  /** Redraw once a second while someone is away, so Play for her does not wait for another table message. */
  const syncClock = (table: TablePub | null) => {
    const on = !!table && table.phase === 'play' && table.away != null && openTb !== null;
    if (on && !clock) clock = window.setInterval(() => render(), 1000);
    if (!on) stopClock();
  };

  const hood = () => deps.hood();
  const current = (): TablePub | null => {
    const h = hood();
    if (!h || openTb === null) return null;
    return h.tables.get(openTb) ?? null;
  };
  const playCtx = (table: TablePub): PlayCtx => {
    const h = hood()!;
    return {
      table, me: h.pid,
      name: pid => h.players.get(pid)?.nickname ?? 'friend',
      face: pid => { const look = h.players.get(pid)?.look; return look ? faceSVG(characterSVG(look)) : ''; },
      move: m => h.tbl({ op: 'move', tb: table.tb, m }),
      away: pid => {
        if (pid === h.pid) return false;
        const pl = h.players.get(pid);
        if (pl && !pl.online) return true;
        const p = h.presence.get(pid);
        return !p || p.where !== 'gameroom';
      },
      toast: deps.toast, sfx: deps.sfx,
    };
  };

  root.addEventListener('click', e => {
    const el = e.target as HTMLElement;
    if (el.closest('#tblBack')) { close(); deps.sfx.swish(); return; }
    if (el.closest('#tblLeave')) { leave(); return; }
    if (el.closest('#tblStart')) { start(); return; }
    if (el.closest('#tblNudge')) { nudge(); return; }
    const table = current();
    if (!table) return;
    plugins[table.game]?.handle(el, playCtx(table));
  });

  function render() {
    const h = hood();
    const table = current();
    if (!h || !table) { root.classList.add('hidden'); root.innerHTML = ''; stopClock(); return; }
    const game = GAMES[table.game];
    const me = h.pid;
    const seated = table.seats.includes(me);
    const count = table.seats.filter(Boolean).length;
    const yourTurn = table.phase === 'play' && table.you !== null && table.view && table.view.turn === table.you;
    const winPid: string | null = table.view?.winPid ?? null;
    let win = '';
    if (table.phase === 'over') {
      const who = winPid ? (h.players.get(winPid)?.nickname ?? 'Friend') : '';
      if (table.game === 'slay') win = !winPid ? "It's a tie!" : winPid === me ? 'You slayed!' : `${esc(who)} slayed!`;
      else win = table.view?.draw || !winPid ? "It's a tie!" : winPid === me ? 'You got four!' : `${esc(who)} got four!`;
      const key = table.tb + ':' + table.seq;
      if (winPid === me && celebrated !== key) { celebrated = key; deps.confetti(); deps.sfx.sparkle(); }
    }
    const away = awayMs(table);
    const showNudge = table.phase === 'play' && seated && away >= NUDGE_MS && table.you !== null && !!table.view && table.view.turn !== table.you && table.view.turn >= 0;
    const canStart = table.phase !== 'play' && table.host === me && count >= game.minPlayers && count <= game.maxPlayers;
    const waitingHost = seated && table.phase === 'lobby' && table.host !== me && count >= game.minPlayers;
    const needFriend = seated && table.phase === 'lobby' && count < game.minPlayers;
    root.classList.remove('hidden');
    root.dataset.tb = String(table.tb);
    root.dataset.phase = table.phase;
    root.dataset.game = table.game;
    root.dataset.you = table.you === null ? '' : String(table.you);
    root.innerHTML = `<div class="tblCard ${yourTurn ? 'yourTurn' : ''} game-${table.game}">
      <div class="tblTop"><h2>${esc(game.name)}</h2><div class="seatDots">${table.seats.map(pid => `<i class="${pid ? 'on' : ''} ${pid === me ? 'me' : ''}"></i>`).join('')}</div></div>
      ${win ? `<div class="winWrap"><div class="winBanner" id="winBanner">${win}</div></div>` : ''}
      <div id="tblStage"></div>
      <div class="tblBar">
        ${canStart ? '<button type="button" id="tblStart">Start</button>' : ''}
        ${waitingHost ? '<p class="tblWait">Waiting for the host…</p>' : ''}
        ${needFriend ? '<p class="tblWait" id="needFriend">Play with friends on your street</p>' : ''}
        ${showNudge ? '<button type="button" id="tblNudge">Play for her</button>' : ''}
        <button type="button" id="tblBack">Back to room</button>
        <button type="button" id="tblLeave">Leave table</button>
      </div>
    </div>`;
    const stage = root.querySelector<HTMLElement>('#tblStage')!;
    if (table.phase === 'lobby' || !table.view) stage.innerHTML = lobbyHTML(table, h, me);
    else plugins[table.game]?.render(stage, playCtx(table));
    syncClock(table);
  }

  function lobbyHTML(table: TablePub, h: HoodClient, me: string) {
    return `<div class="lobby">${table.seats.map((pid, i) => `<div class="lobbySeat ${pid ? 'filled' : ''} ${pid === me ? 'me' : ''}">
      <span>${i + 1}</span><b>${pid ? esc(h.players.get(pid)?.nickname ?? 'friend') : 'Empty'}</b>
      ${pid && pid === table.host ? '<i>host</i>' : ''}${pid === me ? '<i>you</i>' : ''}
    </div>`).join('')}</div>`;
  }

  function close() { openTb = null; stopClock(); root.classList.add('hidden'); root.innerHTML = ''; }
  function leave() {
    const h = hood(); const table = current();
    if (h && table && table.seats.includes(h.pid)) h.tbl({ op: 'leave', tb: table.tb });
    deps.sfx.click(); close();
  }
  function start() { const h = hood(); const table = current(); if (h && table) { h.tbl({ op: 'start', tb: table.tb }); deps.sfx.sparkle(); } }
  function nudge() { const h = hood(); const table = current(); if (h && table) { h.tbl({ op: 'nudge', tb: table.tb }); deps.sfx.click(); } }

  return {
    open(tb: number) { openTb = tb; render(); },
    close, refresh: render,
    fail(tb, reason) { deps.toast(FAIL[reason] || 'Try that again!'); deps.sfx.pop(); if (openTb === tb) render(); },
    isOpen: () => openTb,
  };
}
