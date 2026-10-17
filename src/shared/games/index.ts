// The game catalog and the tables in the Game Room. Add a game: import its rules here and give it a table.
import type { GameRules } from './types';
import { slay } from './slay';
import { four } from './four';
export const GAMES: Record<string, GameRules> = { slay, four };
export interface TableDef { game: string; seats: number; x: number }
export const GAMEROOM_W = 2600;
export const TABLES: TableDef[] = [
  { game: 'slay', seats: 6, x: 720 },
  { game: 'four', seats: 2, x: 1500 },
  { game: 'slay', seats: 4, x: 2150 },
];
export type TablePhase = 'lobby' | 'play' | 'over';
/** What everyone sees about a table; `view` is personalized by the rules module (your own hand only). */
export interface TablePub { tb: number; game: string; seats: (string | null)[]; host: string | null; phase: TablePhase; players: string[]; seq: number; view: any; you: number | null; away?: number }
export type TableOp = { op: 'sit'; tb: number; seat: number } | { op: 'leave'; tb: number } | { op: 'start'; tb: number } | { op: 'move'; tb: number; m: unknown } | { op: 'nudge'; tb: number };
export function cleanTableOp(o: any): TableOp | null {
  if (!o || typeof o !== 'object' || !Number.isInteger(o.tb) || o.tb < 0 || o.tb >= TABLES.length) return null;
  if (o.op === 'sit') return Number.isInteger(o.seat) && o.seat >= 0 && o.seat < TABLES[o.tb].seats ? { op: 'sit', tb: o.tb, seat: o.seat } : null;
  if (o.op === 'leave' || o.op === 'start' || o.op === 'nudge') return { op: o.op, tb: o.tb };
  if (o.op === 'move') return { op: 'move', tb: o.tb, m: o.m };
  return null;
}
export const NUDGE_MS = 20_000; // a friend who went away for this long can have her turn played for her
