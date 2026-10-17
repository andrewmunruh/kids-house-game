// "Slay": an original match-the-color-or-number card game (glam pastel style).
// 4 colors (pink, lilac, aqua, gold), numbers 0-9, and action cards: Nope (skip), Flip (reverse), +2,
// Crown (wild: pick a color) and Crown +4. Say "SLAY!" when you're down to your last card.
import { shuffle, type GameRules, type Rng } from './types';

export const SLAY_COLORS = 4; // 0 pink, 1 lilac, 2 aqua, 3 gold; 4 = wild (no color)
export type Face = number | 'skip' | 'rev' | 'd2' | 'wild' | 'w4';
export interface Card { id: number; c: number; v: Face }
export const HAND = 7;
export const MAX_HAND = 30; // safety cap so nobody drowns in cards

export function makeDeck(): Card[] {
  const d: Card[] = []; let id = 0;
  for (let c = 0; c < SLAY_COLORS; c++) {
    d.push({ id: id++, c, v: 0 });
    for (let n = 1; n <= 9; n++) for (let k = 0; k < 2; k++) d.push({ id: id++, c, v: n });
    for (const v of ['skip', 'rev', 'd2'] as const) for (let k = 0; k < 2; k++) d.push({ id: id++, c, v });
  }
  for (let k = 0; k < 4; k++) d.push({ id: id++, c: 4, v: 'wild' });
  for (let k = 0; k < 4; k++) d.push({ id: id++, c: 4, v: 'w4' });
  return d; // 108 cards
}

export interface SlayEvent { n: number; p: number; k: 'play' | 'draw' | 'pass' | 'slay' | 'forgot' | 'start' | 'left'; card?: Card; drew?: number; victim?: number; vdrew?: number; color?: number; skipped?: number }
export interface SlayState {
  deck: Card[]; discard: Card[]; hands: Card[][];
  color: number; turn: number; dir: 1 | -1;
  drawn: number | null;        // id of the card the current player just drew (she may play it or pass)
  slay: boolean[];             // called SLAY! for her current last card
  owe: number | null;          // player who went down to 1 card without calling: penalty when the next player moves
  winner: number | null;
  ev: SlayEvent;               // the latest thing that happened (for animations)
}
export type SlayMove = { k: 'play'; id: number; color?: number } | { k: 'draw' } | { k: 'pass' } | { k: 'slay' };

const top = (s: SlayState) => s.discard[s.discard.length - 1];
export const canPlay = (s: SlayState, card: Card) => card.c === 4 || card.c === s.color || (card.v === top(s).v && top(s).c !== 4);
const next = (s: SlayState, from: number, steps = 1) => { const n = s.hands.length; return (((from + s.dir * steps) % n) + n) % n; };
function draw(s: SlayState, p: number, k: number, rng: Rng): Card[] {
  const got: Card[] = [];
  for (let i = 0; i < k && s.hands[p].length < MAX_HAND; i++) {
    if (!s.deck.length) { const t = s.discard.pop()!; s.deck = shuffle(s.discard.map(c => c), rng); s.discard = [t]; if (!s.deck.length) break; }
    const c = s.deck.pop()!; s.hands[p].push(c); got.push(c);
  }
  if (s.hands[p].length > 1) s.slay[p] = false;
  return got;
}
function settleOwed(s: SlayState, rng: Rng) {
  // she went down to one card and nobody heard "SLAY!" before the next player moved: draw 2 (gentle penalty)
  if (s.owe !== null && s.hands[s.owe]?.length === 1 && !s.slay[s.owe]) { const v = s.owe; s.owe = null; return { victim: v, vdrew: draw(s, v, 2, rng).length }; }
  s.owe = null; return {};
}
const wildColor = (hand: Card[]) => { const n = [0, 0, 0, 0]; hand.forEach(c => { if (c.c < 4) n[c.c]++; }); return n.indexOf(Math.max(...n)); };

export const slay: GameRules<SlayState, SlayMove> = {
  id: 'slay', name: 'Slay', minPlayers: 2, maxPlayers: 6,
  setup(n, rng) {
    const deck = shuffle(makeDeck(), rng);
    const hands = Array.from({ length: n }, () => deck.splice(-HAND, HAND));
    // flip a number card to start (action cards go back into the deck)
    let i = deck.length - 1; while (typeof deck[i].v !== 'number') i--;
    const first = deck.splice(i, 1)[0];
    return { deck, discard: [first], hands, color: first.c, turn: Math.floor(rng() * n), dir: 1, drawn: null, slay: hands.map(() => false), owe: null, winner: null, ev: { n: 0, p: -1, k: 'start', card: first } };
  },
  cleanMove(m: any) {
    if (!m || typeof m !== 'object') return null;
    if (m.k === 'play' && Number.isInteger(m.id) && m.id >= 0 && m.id < 108) return { k: 'play', id: m.id, ...(Number.isInteger(m.color) && m.color >= 0 && m.color < SLAY_COLORS ? { color: m.color } : {}) };
    if (m.k === 'draw' || m.k === 'pass' || m.k === 'slay') return { k: m.k };
    return null;
  },
  legal(s, p, m) {
    if (s.winner !== null) return false;
    if (m.k === 'slay') return s.hands[p].length <= 2 && !s.slay[p]; // any time with 2 (about to play) or 1 card
    if (p !== s.turn) return false;
    if (m.k === 'draw') return s.drawn === null;
    if (m.k === 'pass') return s.drawn !== null;
    const card = s.hands[p].find(c => c.id === m.id); if (!card) return false;
    if (s.drawn !== null && card.id !== s.drawn) return false; // after drawing you may only play the card you drew
    if (card.c === 4 && m.color === undefined) return false;
    return canPlay(s, card);
  },
  apply(s, p, m, rng) {
    const n = s.ev.n + 1;
    if (m.k === 'slay') { s.slay[p] = true; if (s.owe === p) s.owe = null; s.ev = { n, p, k: 'slay' }; return s; }
    const owed = settleOwed(s, rng);
    if (m.k === 'draw') {
      const got = draw(s, p, 1, rng);
      const c = got[0];
      if (c && canPlay(s, c)) { s.drawn = c.id; s.ev = { n, p, k: 'draw', drew: 1, ...owed }; }
      else { s.drawn = null; s.turn = next(s, p); s.ev = { n, p, k: 'draw', drew: got.length, ...owed }; } // nothing to play: turn passes on its own
      return s;
    }
    if (m.k === 'pass') { s.drawn = null; s.turn = next(s, p); s.ev = { n, p, k: 'pass', ...owed }; return s; }
    const hand = s.hands[p], card = hand.splice(hand.findIndex(c => c.id === m.id), 1)[0];
    s.discard.push(card); s.drawn = null;
    s.color = card.c === 4 ? m.color! : card.c;
    const ev: SlayEvent = { n, p, k: 'play', card, color: s.color, ...owed };
    if (!hand.length) { s.winner = p; s.turn = -1; s.ev = ev; return s; }
    if (hand.length === 1 && !s.slay[p]) s.owe = p;
    const two = s.hands.length === 2;
    if (card.v === 'rev') { s.dir = (s.dir === 1 ? -1 : 1); s.turn = two ? p : next(s, p); }
    else if (card.v === 'skip') { ev.skipped = next(s, p); s.turn = next(s, p, 2); }
    else if (card.v === 'd2' || card.v === 'w4') { const v = next(s, p); ev.skipped = v; const k = card.v === 'd2' ? 2 : 4; ev.drew = draw(s, v, k, rng).length; s.turn = next(s, p, 2); }
    else s.turn = next(s, p);
    s.ev = ev; return s;
  },
  turn: s => s.winner !== null ? -1 : s.turn,
  winner: s => s.winner,
  view(s, p) {
    return {
      top: top(s), color: s.color, turn: s.winner !== null ? -1 : s.turn, dir: s.dir, deck: s.deck.length,
      counts: s.hands.map(h => h.length), slay: s.slay, winner: s.winner, ev: s.ev,
      ...(p !== null && s.hands[p] ? { hand: s.hands[p], drawn: p === s.turn ? s.drawn : null } : {}),
    };
  },
  autoMove(s, p) {
    if (p !== s.turn) return null;
    if (s.drawn !== null) { const c = s.hands[p].find(c => c.id === s.drawn)!; return c && canPlay(s, c) ? { k: 'play', id: c.id, ...(c.c === 4 ? { color: wildColor(s.hands[p]) } : {}) } : { k: 'pass' }; }
    const c = s.hands[p].find(c => canPlay(s, c) && c.c !== 4) ?? s.hands[p].find(c => canPlay(s, c));
    return c ? { k: 'play', id: c.id, ...(c.c === 4 ? { color: wildColor(s.hands[p]) } : {}) } : { k: 'draw' };
  },
  removePlayer(s, p, rng) {
    if (s.hands.length <= 2) return null;
    const wasTurn = s.turn === p;
    s.deck.unshift(...s.hands[p]); shuffle(s.deck, rng);
    s.hands.splice(p, 1); s.slay.splice(p, 1);
    if (s.owe === p) s.owe = null; else if (s.owe !== null && s.owe > p) s.owe--;
    if (s.turn > p) s.turn--;
    if (wasTurn) { s.drawn = null; if (s.dir === -1) s.turn = ((p - 1) % s.hands.length + s.hands.length) % s.hands.length; else s.turn = p % s.hands.length; }
    s.ev = { n: s.ev.n + 1, p, k: 'left' };
    return s;
  },
};
