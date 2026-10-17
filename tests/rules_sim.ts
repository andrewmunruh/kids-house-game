import { slay, type SlayState } from '../src/shared/games/slay';
import { four } from '../src/shared/games/four';
let games = 0, moves = 0, wins = 0, maxMoves = 0, slays = 0, forgot = 0, leftOk = 0;
const fail = (m: string) => { console.error('FAIL', m); process.exit(1); };
const total = (s: SlayState) => s.deck.length + s.discard.length + s.hands.reduce((a, h) => a + h.length, 0);
for (let g = 0; g < 600; g++) {
  const n = 2 + (g % 5); let s = slay.setup(n, Math.random); games++;
  if (s.hands.some(h => h.length !== 7) || total(s) !== 108) fail('setup');
  let k = 0;
  while (slay.winner(s) === null && k < 3000) {
    const p = slay.turn(s);
    // sometimes call SLAY, sometimes forget
    if (s.hands[p].length === 2 && Math.random() < 0.6 && slay.legal(s, p, { k: 'slay' })) { s = slay.apply(s, p, { k: 'slay' }, Math.random); slays++; }
    const m = slay.autoMove(s, p)!; if (!m || !slay.legal(s, p, m)) fail('automove illegal ' + JSON.stringify(m));
    // an illegal move is refused
    if (slay.legal(s, (p + 1) % n, m) && n > 1 && m.k !== 'slay') fail('out of turn allowed');
    s = slay.apply(s, p, m, Math.random); k++; moves++;
    if (s.ev.victim !== undefined) forgot++;
    if (total(s) !== 108) fail('cards not conserved ' + total(s));
    const ids = new Set([...s.deck, ...s.discard, ...s.hands.flat()].map(c => c.id)); if (ids.size !== 108) fail('dup cards');
    const v = slay.view(s, null) as any; if ('hand' in v || 'deckCards' in v || JSON.stringify(v).includes('"hands"')) fail('watcher sees hidden');
    if (g % 7 === 0 && k === 15 && n > 2) { const r = slay.removePlayer(s, 1, Math.random); if (!r || r.hands.length !== n - 1 || total(r) !== 108 || r.turn < 0 || r.turn >= n - 1) fail('removePlayer'); s = r; leftOk++; }
  }
  if (slay.winner(s) === null) fail('no winner after ' + k); wins++; maxMoves = Math.max(maxMoves, k);
}
let fw = 0, fd = 0;
for (let g = 0; g < 500; g++) { let s = four.setup(2, Math.random); let k = 0;
  while (four.turn(s) >= 0) { const p = four.turn(s); const legal = [0,1,2,3,4,5,6].filter(c => four.legal(s, p, { col: c })); const col = legal[Math.floor(Math.random() * legal.length)]; s = four.apply(s, p, { col }, Math.random); if (++k > 42) fail('four too long'); }
  if (s.winner !== null) fw++; else if (s.draw) fd++; else fail('four end'); }
console.log(JSON.stringify({ games, moves, wins, maxMoves, slays, forgot, leftOk, fourWins: fw, fourDraws: fd }));
console.log('rules sim OK');
