import { Neighborhood, type KV, type Conn } from '../server/core';
import { NICKNAMES } from '../src/shared/hood';
const store = new Map<string, any>();
const kv: KV = { get: async k => store.has(k) ? JSON.parse(JSON.stringify(store.get(k))) : undefined, put: async (k, v) => { store.set(k, JSON.parse(JSON.stringify(v))); }, delete: async k => { store.delete(k); } };
let pass = 0; const check = (name: string, ok: boolean, extra = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + name, extra); if (ok) pass++; else process.exitCode = 1; };
type C = Conn & { inbox: any[]; last(t: string): any };
const mk = (): C => { const inbox: any[] = []; return { inbox, send(s: string) { inbox.push(JSON.parse(s)); }, close() {}, last(t: string) { return [...inbox].reverse().find(m => m.t === t); } } as any; };
const look = { skin: '#f1c27d', hair: '#3b2219', hairStyle: 0, shirt: '#ff7aa8', pants: '#5b8def', size: 'kid', acc: 0 };
async function main() {
  let hood = new Neighborhood(kv, { flushMs: 5 }); await hood.init('TBLTEST');
  const kids: C[] = [], tokens: string[] = [];
  for (let i = 0; i < 4; i++) { const c = mk(); await hood.onConnect(c); await hood.onMessage(c, JSON.stringify({ t: 'join', nickname: NICKNAMES[i], look, v: 4 })); tokens.push(c.last('joined').token); kids.push(c); }
  const [A, B, Cc, W] = kids; const pid = (c: C) => c.pid!;
  check('welcome carries the tables', Array.isArray(A.last('welcome').tables) && A.last('welcome').tables.length === 3);
  // the server allows 80 messages/second per iPad; this test fires faster than any kid can tap, so reset the budget
  const msg = (c: C, o: any) => { (c as any).budget = undefined; return hood.onMessage(c, JSON.stringify({ t: 'tbl', ...o })); };
  const pres = (c: C, where: string) => hood.onMessage(c, JSON.stringify({ t: 'pres', p: { where, x: 300, y: 560, flip: false } }));
  await msg(A, { op: 'sit', tb: 0, seat: 0 }); check('must be in the Game Room to sit', A.last('tblFail')?.reason === 'notHere');
  for (const c of kids) await pres(c, 'gameroom');
  await msg(A, { op: 'sit', tb: 0, seat: 0 }); await msg(B, { op: 'sit', tb: 0, seat: 2 });
  await msg(B, { op: 'sit', tb: 0, seat: 0 }); check('a taken seat stays taken', B.last('tblFail')?.reason === 'taken');
  let t = W.last('table').table; check('everyone sees who sits where; first to sit is host', t.seats[0] === pid(A) && t.seats[2] === pid(B) && t.host === pid(A));
  await msg(B, { op: 'start', tb: 0 }); check('only the host can start', B.last('tblFail')?.reason === 'notHost');
  await msg(Cc, { op: 'sit', tb: 0, seat: 4 });
  await msg(A, { op: 'start', tb: 0 });
  const tA = A.last('table').table, tB = B.last('table').table, tC = Cc.last('table').table, tW = W.last('table').table;
  check('host starts with 3 seated', tA.phase === 'play' && tA.players.length === 3);
  check('each player gets her own 7 cards', [tA, tB, tC].every(x => x.view.hand?.length === 7) && tA.view.hand[0].id !== tB.view.hand[0].id);
  const ids = (x: any) => new Set(x.view.hand.map((c: any) => c.id));
  const sA = ids(tA), sB = ids(tB);
  check('nobody receives anyone else\'s cards', ![...sA].some(id => sB.has(id)) && !JSON.stringify(B.inbox.filter(m => m.t === 'table').map(m => m.table.view?.hand ?? [])).includes(JSON.stringify(tA.view.hand[0])) );
  check('watchers see counts only, no hand', tW.you === null && !('hand' in tW.view) && tW.view.counts.join() === '7,7,7');
  // play the round to the end with the server rejecting anything illegal
  const byPid = new Map([[pid(A), A], [pid(B), B], [pid(Cc), Cc]]);
  const { slay } = await import('../src/shared/games/slay');
  let moves = 0, refused = 0, reconnected = false;
  while (hood.tables[0].phase === 'play' && moves < 3000) {
    const T = hood.tables[0]; const p = slay.turn(T.state); const who = T.players[p];
    // an out-of-turn move is refused
    const other = byPid.get(T.players[(p + 1) % T.players.length])!;
    if (moves % 25 === 0) { const before = T.seq; await msg(other, { op: 'move', tb: 0, m: { k: 'draw' } }); if (T.seq === before && other.last('tblFail')?.reason === 'illegal') refused++; }
    if (moves === 6 && !reconnected) {
      // reconnect mid-game: B's iPad drops and comes back
      const bHandBefore = JSON.stringify(hood.tables[0].state.hands[T.players.indexOf(pid(B))]);
      hood.onClose(B); const nb = mk(); await hood.onConnect(nb); await hood.onMessage(nb, JSON.stringify({ t: 'hello', token: tokens[1], v: 4 }));
      const wt = nb.last('welcome').tables[0];
      check('reconnect mid-game: same seat, same cards, game goes on', wt.phase === 'play' && wt.you === T.players.indexOf(pid(B)) && JSON.stringify(wt.view.hand) === bHandBefore);
      byPid.set(pid(nb), nb); kids[1] = nb; reconnected = true; await pres(nb, 'gameroom'); continue;
    }
    const c = byPid.get(who)!; const s = T.state;
    if (s.hands[p].length === 2 && moves % 3) await msg(c, { op: 'move', tb: 0, m: { k: 'slay' } });
    const m = slay.autoMove(s, p)!; await msg(c, { op: 'move', tb: 0, m }); moves++;
  }
  const end = W.last('table').table;
  check('a full round ends with a winner everyone sees', end.phase === 'over' && typeof end.view.winPid === 'string' && end.view.winner !== null, `${moves} moves`);
  check('out-of-turn moves are refused by the server', refused > 0, `${refused}`);
  // nudge: someone away on her turn
  await msg(A, { op: 'start', tb: 0 });
  const T2 = hood.tables[0]; const awayP = slay.turn(T2.state); const awayPid = T2.players[awayP]; const awayC = byPid.get(awayPid)!;
  const helper = byPid.get(T2.players[(awayP + 1) % 3])!;
  await pres(awayC, 'street'); const seqBefore = T2.seq;
  await msg(helper, { op: 'nudge', tb: 0 }); check('can\'t skip a friend\'s turn right away', helper.last('tblFail')?.reason === 'tooSoon' && T2.seq === seqBefore);
  (hood as any).awaySince.set(awayPid, Date.now() - 21000);
  await msg(helper, { op: 'nudge', tb: 0 }); check('after 20s away, a friend can play her turn for her (she keeps her seat)', T2.seq > seqBefore && T2.seats.includes(awayPid));
  await pres(awayC, 'gameroom');
  // leaving mid-game gives up the seat; the game goes on with 2
  const leaver = byPid.get(T2.players[0])!; await msg(leaver, { op: 'leave', tb: 0 });
  check('leaving mid-game gives up the seat, others keep playing', !T2.seats.includes(pid(leaver)) && T2.players.length === 2 && T2.phase === 'play' && T2.state.hands.length === 2);
  const leaver2 = byPid.get(T2.players[0])!; await msg(leaver2, { op: 'leave', tb: 0 });
  check('down to one player: she wins', T2.phase === 'over' && T2.winPid === T2.players[0]);
  // Four in a Row on the same framework
  await msg(A, { op: 'leave', tb: 0 }); await msg(B, { op: 'leave', tb: 0 }); await msg(kids[1], { op: 'leave', tb: 0 }); await msg(Cc, { op: 'leave', tb: 0 });
  await msg(A, { op: 'sit', tb: 1, seat: 0 }); await msg(Cc, { op: 'sit', tb: 1, seat: 1 }); await msg(W, { op: 'sit', tb: 1, seat: 2 });
  check('Four in a Row has exactly 2 seats (a third seat is refused)', hood.tables[1].seats.length === 2 && !hood.tables[1].seats.includes(pid(W)));
  await msg(A, { op: 'start', tb: 1 }); const F = hood.tables[1]; let fm = 0;
  while (F.phase === 'play' && fm < 50) { const p = F.state.turn; const c = F.players[p] === pid(A) ? A : Cc; const col = [0,1,2,3,4,5,6].find(x => F.state.b[x].length < 6)!; await msg(c, { op: 'move', tb: 1, m: { col: (fm * 3) % 7 } }); if (F.state.n === fm) await msg(c, { op: 'move', tb: 1, m: { col } }); fm++; }
  check('Four in a Row plays to the end on the same framework', F.phase === 'over', `${F.state.n} pieces, winner ${F.winPid ? 'yes' : 'draw'}`);
  // persistence: a fresh server instance (Durable Object restart) restores the tables
  await hood.flush(); const hood2 = new Neighborhood(kv); await hood2.load();
  check('tables survive a server restart', hood2.tables[1].phase === 'over' && hood2.tables[1].players.length === 2);
  console.log(`${pass}/19 passed`); if (pass !== 19) process.exitCode = 1;
}
main();
