// "Four in a Row": drop hearts and stars; first to line up four wins. 7 columns x 6 rows, 2 players.
import type { GameRules } from './types';
export const COLS = 7, ROWS = 6;
export interface FourState { b: number[][]; turn: number; winner: number | null; draw: boolean; line: [number, number][] | null; last: { col: number; row: number; p: number } | null; n: number }
export type FourMove = { col: number };
const lines = (b: number[][], c: number, r: number): [number, number][] | null => {
  const p = b[c][r];
  for (const [dc, dr] of [[1, 0], [0, 1], [1, 1], [1, -1]]) {
    const run: [number, number][] = [[c, r]];
    for (const sgn of [1, -1]) for (let k = 1; k < 4; k++) { const x = c + dc * k * sgn, y = r + dr * k * sgn; if (x < 0 || x >= COLS || y < 0 || y >= ROWS || b[x][y] !== p) break; run.push([x, y]); }
    if (run.length >= 4) return run;
  }
  return null;
};
export const four: GameRules<FourState, FourMove> = {
  id: 'four', name: 'Four in a Row', minPlayers: 2, maxPlayers: 2,
  setup: (_n, rng) => ({ b: Array.from({ length: COLS }, () => [] as number[]), turn: rng() < 0.5 ? 0 : 1, winner: null, draw: false, line: null, last: null, n: 0 }),
  cleanMove: (m: any) => m && Number.isInteger(m.col) && m.col >= 0 && m.col < COLS ? { col: m.col } : null,
  legal: (s, p, m) => s.winner === null && !s.draw && p === s.turn && s.b[m.col].length < ROWS,
  apply(s, p, m) {
    s.b[m.col].push(p); const row = s.b[m.col].length - 1; s.last = { col: m.col, row, p }; s.n++;
    const line = lines(s.b, m.col, row);
    if (line) { s.winner = p; s.line = line; s.turn = -1; }
    else if (s.b.every(col => col.length >= ROWS)) { s.draw = true; s.turn = -1; }
    else s.turn = 1 - p;
    return s;
  },
  turn: s => s.turn,
  winner: s => s.winner,
  view: s => s,
  autoMove: (s, p) => { if (p !== s.turn) return null; const order = [3, 2, 4, 1, 5, 0, 6]; const col = order.find(c => s.b[c].length < ROWS); return col === undefined ? null : { col }; },
  removePlayer: () => null,
};
