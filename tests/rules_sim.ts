import { slay, type SlayState } from '../src/shared/games/slay';
import { four } from '../src/shared/games/four';
import type { Rng } from '../src/shared/games/types';

// One stream for a whole run, so `npx tsx tests/rules_sim.ts <seed>` replays exactly.
function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const seed0 = Number(process.argv[2] ?? 1);
const runs = Number(process.argv[3] ?? 1);
if (!Number.isInteger(seed0) || !Number.isInteger(runs) || runs < 1) {
  console.error('usage: tsx tests/rules_sim.ts [seed] [runs]');
  process.exit(1);
}

const total = (s: SlayState) => s.deck.length + s.discard.length + s.hands.reduce((a, h) => a + h.length, 0);
const fail = (seed: number, m: string) => { console.error('FAIL', m, 'seed', seed); process.exit(1); };

/** A live leave: cards stay unique, and the turn still points at someone seated. */
function leaveProblem(s: SlayState, playersBefore: number): string {
  const n = s.hands.length;
  if (n !== playersBefore - 1) return 'hands ' + n;
  if (total(s) !== 108) return 'total ' + total(s);
  const ids = [...s.deck, ...s.discard, ...s.hands.flat()].map(c => c.id);
  if (new Set(ids).size !== 108) return 'dup cards';
  if (s.winner !== null || s.turn < 0 || s.turn >= n) return 'turn ' + s.turn;
  if (s.slay.length !== n) return 'slay flags';
  if (s.owe !== null && (s.owe < 0 || s.owe >= n)) return 'owe ' + s.owe;
  if (s.drawn !== null && !s.hands[s.turn].some(c => c.id === s.drawn)) return 'drawn missing';
  return '';
}

function run(seed: number) {
  const rng = mulberry32(seed);
  let games = 0, moves = 0, wins = 0, maxMoves = 0, slays = 0, forgot = 0, leftOk = 0, leftSkip = 0;
  for (let g = 0; g < 600; g++) {
    const n = 2 + (g % 5); let s = slay.setup(n, rng); let players = n; games++;
    if (s.hands.some(h => h.length !== 7) || total(s) !== 108) fail(seed, 'setup');
    let k = 0;
    while (slay.winner(s) === null && k < 3000) {
      const p = slay.turn(s);
      if (s.hands[p].length === 2 && rng() < 0.6 && slay.legal(s, p, { k: 'slay' })) { s = slay.apply(s, p, { k: 'slay' }, rng); slays++; }
      const m = slay.autoMove(s, p)!; if (!m || !slay.legal(s, p, m)) fail(seed, 'automove illegal ' + JSON.stringify(m));
      // the same move must not also be legal for the next kid (turn is part of the rules)
      if (players > 1 && m.k !== 'slay' && slay.legal(s, (p + 1) % players, m)) fail(seed, 'out of turn allowed');
      s = slay.apply(s, p, m, rng); k++; moves++;
      if (s.ev.victim !== undefined) forgot++;
      if (total(s) !== 108) fail(seed, 'cards not conserved ' + total(s));
      const ids = new Set([...s.deck, ...s.discard, ...s.hands.flat()].map(c => c.id)); if (ids.size !== 108) fail(seed, 'dup cards');
      const v = slay.view(s, null) as any; if ('hand' in v || 'deckCards' in v || JSON.stringify(v).includes('"hands"')) fail(seed, 'watcher sees hidden');
      if (g % 7 === 0 && k === 15 && n > 2) {
        // Move 15 can be the winning play. The hand is empty, turn is -1, and the server
        // has already ended the table, so it never calls removePlayer. Checking it here
        // used to fail at random whenever a 3-player game finished on that exact move.
        if (s.winner !== null || s.turn < 0) leftSkip++;
        else {
          const r = slay.removePlayer(s, 1, rng);
          const why = !r ? 'null' : leaveProblem(r, players);
          if (why) fail(seed, 'removePlayer ' + why);
          s = r!; players = s.hands.length; leftOk++;
        }
      }
    }
    if (slay.winner(s) === null) fail(seed, 'no winner after ' + k); wins++; maxMoves = Math.max(maxMoves, k);
  }
  let fw = 0, fd = 0;
  for (let g = 0; g < 500; g++) {
    let s = four.setup(2, rng); let k = 0;
    while (four.turn(s) >= 0) {
      const p = four.turn(s);
      const legal = [0, 1, 2, 3, 4, 5, 6].filter(c => four.legal(s, p, { col: c }));
      const col = legal[Math.floor(rng() * legal.length)];
      s = four.apply(s, p, { col }, rng);
      if (++k > 42) fail(seed, 'four too long');
    }
    if (s.winner !== null) fw++; else if (s.draw) fd++; else fail(seed, 'four end');
  }
  console.log(JSON.stringify({ seed, games, moves, wins, maxMoves, slays, forgot, leftOk, leftSkip, fourWins: fw, fourDraws: fd }));
}

for (let i = 0; i < runs; i++) run(seed0 + i);
console.log('rules sim OK');
