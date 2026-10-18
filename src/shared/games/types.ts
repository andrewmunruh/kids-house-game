// Table-game plug-in interface. A rules module is pure data + functions (no DOM, no Node), so the same code runs
// on the server (authoritative) and in tests. To add a game: write a module that implements GameRules and list it in ./index.ts.
export type Rng = () => number;
export interface GameRules<S = any, M = any> {
  id: string;
  name: string;
  minPlayers: number;
  maxPlayers: number;
  /** A fresh game for `n` seated players (players are numbered 0..n-1 in seat order). */
  setup(n: number, rng: Rng): S;
  /** Turn an untrusted move from the network into a well-formed one, or null. */
  cleanMove(raw: unknown): M | null;
  /** Is `m` legal for player `p` right now? (Includes "is it her turn" where that matters.) */
  legal(s: S, p: number, m: M): boolean;
  /** Apply a legal move. May mutate and return `s`. */
  apply(s: S, p: number, m: M, rng: Rng): S;
  /** Whose turn it is (player index), or -1 when nobody's (game over). */
  turn(s: S): number;
  /** The winning player index, or null while the game is on. */
  winner(s: S): number | null;
  /** What player `p` may see (null = a watcher). Hidden information (other hands, the deck order) must not appear here. */
  view(s: S, p: number | null): unknown;
  /** A sensible move for a player who has gone away, so friends aren't stuck waiting. */
  autoMove(s: S, p: number): M | null;
  /** A player leaves mid-game: remove her and keep going (renumbering players > p down by one). Return null to end the game. */
  removePlayer(s: S, p: number, rng: Rng): S | null;
}
export function shuffle<T>(a: T[], rng: Rng): T[] { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
