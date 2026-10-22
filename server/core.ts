// Platform-agnostic, server-authoritative neighborhood. One instance per invite code.
// Adapters (server/node.ts, server/worker.ts) provide storage + sockets.
// Privacy: no emails, last names, or IP addresses are stored. Chat bubbles are relayed to nearby players only and never logged.
// Letters are kept on the server for up to 30 days: filtered more strictly than chat, first names only.
// A kid can leave three unread letters in one mailbox. A grown-up can clear them, or limit new letters to preset phrases.
import { reduce, initialState, ensureRooms, drawnScale, type GameState, type Dog, type Action } from '../src/shared/state';
import { pieceWidth, standBeside } from '../src/shared/sit';
import { babyOccupant } from '../src/shared/baby';
import { withRandomStarter } from '../src/shared/avatar';
import {
  MAX_PLAYERS, NICKNAMES, PHRASES, EMOTES, HOUSE_STYLES, cleanAction, cleanHouseState, cleanLook, applyLook, cleanPresence, cleanHouseName,
  filterSay, isNear, sameSpot, cleanFirstName, cleanDog, cleanFx, fxAllowedAt, PROTOCOL, PROTO_PETS, PROTO_RANCH, PROTO_GAMES, RANCH_FX, normCode, validInvite, MAX_ROSTER, cleanMailText, filterMailbox, mailColor, mailSticker, mailIsFree, type RosterEntry, type ClientMsg, type ServerMsg, type Presence, type PlayerPub, type HouseFull, type HouseMeta, type Look, type Bubble, type StreetSettings,
} from '../src/shared/hood';
import { MAIL_CAP, MAIL_RATE_MAX, MAIL_RATE_WINDOW_MS, keepMailbox, projectMailbox, type Letter, type Mailbox } from '../src/shared/mail';
import { GAMES, TABLES, NUDGE_MS, cleanTableOp, type TablePub, type TablePhase } from '../src/shared/games/index';
import { cleanBasket, cleanPlots, cleanRanchOp, ranchApply, BASKET_ITEM, type Basket, type Plot } from '../src/shared/ranch';

export interface KV { get<T>(k: string): Promise<T | undefined>; put(k: string, v: unknown): Promise<void>; delete(k: string): Promise<void> }
/** Maps invite codes (case-insensitive, unique across streets) to permanent street ids. */
export interface CodeRegistry { claim(code: string, id: string): Promise<boolean>; release(code: string, id: string): Promise<void> }
export interface Conn { send(s: string): void; close(code?: number, reason?: string): void; pid?: string; parent?: boolean; budget?: { t: number; n: number }; v?: number; pet?: number; mail?: number; sit?: number; fit?: number; baby?: number }
/** Not a real socket. Baby release is broadcast to every baby client, including the kid who just left. */
const RELEASE_SENDER: Conn = { send() {}, close() {} };

interface Player { pid: string; nickname: string; houseId: string; tokenHash: string; look: Look; joinedAt: number; dog?: Dog | null; basket?: Basket }
/** One table in the Game Room. Seats are kept by player id, so a kid who reconnects is still sitting there with her cards. */
interface TableRec { seats: (string | null)[]; host: string | null; phase: TablePhase; players: string[]; state: any; seq: number; winPid?: string | null }
const freshTable = (i: number): TableRec => ({ seats: Array(TABLES[i].seats).fill(null), host: null, phase: 'lobby', players: [], state: null, seq: 0 });
interface Meta { id?: string; code: string; roster?: string[]; createdAt: number; parentKeyHash: string; settings: StreetSettings; players: Record<string, Player>; houseOrder: string[]; nextStyle: number; ranch?: { plots: (Plot | null)[] } }

const enc = new TextEncoder();
export async function sha256(s: string) { const d = await crypto.subtle.digest('SHA-256', enc.encode(s)); return [...new Uint8Array(d)].map(b => b.toString(16).padStart(2, '0')).join(''); }
export function randomToken(bytes = 18) { const a = new Uint8Array(bytes); crypto.getRandomValues(a); return [...a].map(b => b.toString(16).padStart(2, '0')).join(''); }
export function randomCode(alphabet: string, len: number) { const a = new Uint8Array(len); crypto.getRandomValues(a); return [...a].map(b => alphabet[b % alphabet.length]).join(''); }

const MAX_MSG = 300_000;          // join with an imported house can be large-ish
const MAX_HOUSE_JSON = 400_000;
const MSGS_PER_SEC = 80;

export class Neighborhood {
  meta: Meta | null = null;
  houses = new Map<string, HouseFull>();
  conns = new Set<Conn>();
  presence = new Map<string, Presence>();
  private lastEgg = new Map<string, number>();
  tables: TableRec[] = TABLES.map((_, i) => freshTable(i));
  /** When each kid left the clubhouse or dropped her socket. Saved so a restart does not trap the table. */
  private awaySince = new Map<string, number>();
  private awayTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private mailTimes = new Map<string, number[]>();
  private loaded: Promise<void> | null = null;
  private dirty = new Set<string>(); private flushT: ReturnType<typeof setTimeout> | null = null;

  constructor(private kv: KV, private opts: { flushMs?: number; registry?: CodeRegistry } = {}) {}

  load() { return (this.loaded ??= (async () => {
    this.meta = (await this.kv.get<Meta>('meta')) ?? null;
    const t = await this.kv.get<TableRec[]>('tables');
    if (Array.isArray(t)) this.tables = TABLES.map((d, i) => t[i] && Array.isArray(t[i].seats) && t[i].seats.length === d.seats ? t[i] : freshTable(i));
    const away = await this.kv.get<Record<string, number>>('away');
    if (away && typeof away === 'object') for (const [pid, at] of Object.entries(away)) if (typeof at === 'number') this.awaySince.set(pid, at);
    // A restart with no saved time: she has been away since this process woke, so Play for her can still arrive.
    const now = Date.now(); let seeded = false;
    for (const tb of this.tables) if (tb.phase === 'play') for (const pid of tb.seats) if (pid && !this.awaySince.has(pid)) { this.awaySince.set(pid, now); seeded = true; }
    if (seeded) this.save('away');
    for (const pid of this.awaySince.keys()) this.armAwayPing(pid);
    // Missing rooms (nursery, backyard) are filled in memory only. Disk stays as stored until the next edit.
    if (this.meta) for (const id of this.meta.houseOrder) {
      const h = await this.kv.get<HouseFull>('house:' + id);
      if (h) {
        const state = h.state ? ensureRooms(h.state) : h.state;
        this.houses.set(id, state ? { ...h, state: this.storedMailbox(state) } : h);
      }
    }
  })()); }
  get exists() { return !!this.meta; }

  /** Create a fresh neighborhood. Returns the parent key (shown once to the grown-up). */
  async init(code: string, id?: string): Promise<string> {
    await this.load();
    if (this.meta) throw new Error('exists');
    const parentKey = randomToken(9);
    this.meta = { id, code, roster: [], createdAt: Date.now(), parentKeyHash: await sha256(parentKey), settings: { freeChat: true }, players: {}, houseOrder: [], nextStyle: Math.floor(Math.random() * HOUSE_STYLES) };
    await this.kv.put('meta', this.meta);
    return parentKey;
  }

  // ---------- persistence (debounced per key) ----------
  private save(key: 'meta' | string) {
    this.dirty.add(key);
    if (!this.flushT) this.flushT = setTimeout(() => this.flush(), this.opts.flushMs ?? 300);
  }
  async flush() {
    this.flushT && clearTimeout(this.flushT); this.flushT = null;
    const keys = [...this.dirty]; this.dirty.clear();
    for (const k of keys) {
      if (k === 'meta') { if (this.meta) await this.kv.put('meta', this.meta); continue; }
      if (k === 'tables') { await this.kv.put('tables', this.tables); continue; }
      if (k === 'away') { await this.kv.put('away', Object.fromEntries(this.awaySince)); continue; }
      const h = this.houses.get(k); if (h) await this.kv.put('house:' + k, h); else await this.kv.delete('house:' + k);
    }
  }

  // ---------- helpers ----------
  private pub(p: Player): PlayerPub { return { pid: p.pid, nickname: p.nickname, houseId: p.houseId, look: p.look, online: [...this.conns].some(c => c.pid === p.pid), dog: p.dog ?? null, basket: cleanBasket(p.basket) }; }
  private players() { return Object.values(this.meta!.players).sort((a, b) => a.joinedAt - b.joinedAt).map(p => this.pub(p)); }
  roster(): RosterEntry[] {
    const ps = Object.values(this.meta?.players ?? {});
    return (this.meta?.roster ?? []).map(name => { const p = ps.find(p => p.nickname === name); return { name, claimed: !!p && !!p.tokenHash, hasHouse: !!p }; });
  }
  private metaOf(h: HouseFull): HouseMeta { const { state: _s, ...m } = h; return m; }
  private send(c: Conn, m: ServerMsg) { try { c.send(JSON.stringify(m)); } catch { /* socket gone */ } }
  private broadcast(m: ServerMsg, filter: (c: Conn) => boolean = c => !!c.pid) { const s = JSON.stringify(m); for (const c of this.conns) if (filter(c)) try { c.send(s); } catch { } }
  private welcome(c: Conn) {
    const presence: Record<string, Presence> = {};
    this.presence.forEach((p, k) => { presence[k] = this.viewPresence(p, c); });
    this.send(c, { t: 'welcome', pid: c.pid!, settings: this.meta!.settings, players: this.players(), houses: this.meta!.houseOrder.map(id => this.houses.get(id)!).filter(Boolean).map(h => this.wireHouse(h, c)), presence, sit: 1, baby: 1, ranch: { plots: cleanPlots(this.meta!.ranch?.plots), now: Date.now() }, ...((c.v ?? 1) >= PROTO_GAMES ? { tables: this.tables.map((_, i) => this.tablePub(i, c.pid!)) } : {}) });
  }
  /** Clients that did not say sit:1 draw her standing. The seat field stays off their copy. */
  private viewPresence(p: Presence, c: Conn): Presence {
    if ((c.sit ?? 0) >= 1 || !p.seat) return p;
    const { seat: _drop, ...rest } = p;
    return rest;
  }
  private stripSeats(state: GameState): GameState {
    if (!state.characters.some(ch => ch.seat)) return state;
    return { ...state, characters: state.characters.map(ch => {
      if (!ch.seat) return ch;
      const { seat: _drop, ...rest } = ch;
      return rest;
    }) };
  }
  /** Drop expired letters in memory. A house with no mailbox is left byte-for-byte alone. */
  private storedMailbox(state: GameState): GameState {
    if (!state.mailbox) return state;
    const mailbox = filterMailbox(state.mailbox);
    if (mailbox) return mailbox === state.mailbox ? state : { ...state, mailbox };
    const { mailbox: _drop, ...rest } = state;
    return rest;
  }
  private freshen(h: HouseFull, now = Date.now()): Mailbox | null {
    const next = keepMailbox(h.state.mailbox, now);
    const prev = h.state.mailbox ?? null;
    if (JSON.stringify(prev) !== JSON.stringify(next)) {
      if (next) h.state = { ...h.state, mailbox: next };
      else {
        const { mailbox: _drop, ...rest } = h.state;
        h.state = rest;
      }
      this.save(h.id);
    }
    return h.state.mailbox ?? null;
  }
  /** Old clients (no mail:1) never receive the field. Other kids never receive someone else's words. Clients that did not say baby:1 never receive the baby. */
  private wireState(state: GameState, c: Conn, ownerId: string): GameState {
    const box = keepMailbox(state.mailbox);
    let view: GameState;
    if ((c.mail ?? 0) < 1 || !c.pid) {
      if (!state.mailbox) view = state;
      else { const { mailbox: _drop, ...rest } = state; view = rest; }
    } else {
      const mail = c.pid === ownerId ? box : projectMailbox(box, c.pid, ownerId);
      if (!mail) {
        if (!state.mailbox) view = state;
        else { const { mailbox: _drop, ...rest } = state; view = rest; }
      } else view = { ...state, mailbox: mail };
    }
    return (c.sit ?? 0) >= 1 ? this.withBaby(view, c) : this.withBaby(this.stripSeats(view), c);
  }
  private withBaby(state: GameState, c: Conn): GameState {
    if ((c.baby ?? 0) >= 1 || !state.baby) return state;
    const { baby: _drop, ...rest } = state;
    return rest;
  }
  /** seat is forwarded only to sit:1 clients. item/size only to fit:1. Baby actions only to baby:1, including the sender: a client that did not ask is nacked and must not see an action its reducer does not know. */
  private broadcastAct(houseId: string, by: string, cid: number, a: Action, sender: Conn, catAct: boolean, kennelAct: boolean) {
    const sizeAct = a.type === 'item/size';
    const babyAct = a.type.startsWith('baby/');
    for (const x of this.conns) {
      if (!x.pid) continue;
      if (catAct && (x.v ?? 1) < PROTO_PETS && x !== sender) continue;
      if (kennelAct && (x.pet ?? 0) < 1 && x !== sender) continue;
      if (sizeAct && (x.fit ?? 0) < 1 && x !== sender) continue;
      if (babyAct && (x.baby ?? 0) < 1) continue;
      const action = x === sender || (x.sit ?? 0) >= 1 ? a : this.withoutSeat(a);
      this.send(x, { t: 'act', houseId, by, cid, action });
    }
  }
  private withoutSeat(a: Action): Action {
    if (a.type === 'char/move' && 'seat' in a) {
      const { seat: _drop, ...rest } = a;
      return rest;
    }
    if (a.type === 'item/move' && a.stand) {
      const { stand: _drop, ...rest } = a;
      return rest;
    }
    return a;
  }
  private broadcastPresence(pid: string, p: Presence | null, except?: string) {
    for (const x of this.conns) {
      if (!x.pid || x.pid === except) continue;
      this.send(x, { t: 'pres', pid, p: p ? this.viewPresence(p, x) : null });
    }
  }
  /** Still in this house on a live socket. A map, another house, or a disconnect means she can be taken. */
  private babyHolderHere(pid: string, houseId: string): boolean {
    if (![...this.conns].some(x => x.pid === pid)) return false;
    const p = this.presence.get(pid);
    return !!p && p.where === 'house' && p.houseId === houseId;
  }

  /**
   * The holder disconnected or left this house. She stands on the mat where they were.
   * Walking into another room of the same house does not drop her.
   */
  private releaseHeldBaby(pid: string, prev: Presence | null, stayed?: Presence | null) {
    for (const h of this.houses.values()) {
      const b = h.state.baby;
      if (!b || b.spot !== 'arms' || b.holder !== pid) continue;
      if (stayed && stayed.where === 'house' && stayed.houseId === h.id) continue;
      let room = b.room;
      let x = b.x;
      let y = b.y;
      if (prev && prev.where === 'house' && prev.houseId === h.id && prev.room && h.state.rooms[prev.room]) {
        room = prev.room;
        x = prev.x;
        y = prev.y;
      }
      if (!h.state.rooms[room]) room = h.state.rooms.nursery ? 'nursery' : 'living';
      const a: Action = { type: 'baby/hold', holder: null, room, x, y, now: Date.now() };
      const next = reduce(ensureRooms(h.state), a);
      if (next === h.state) continue;
      h.state = next;
      this.save(h.id);
      this.broadcastAct(h.id, pid, -1, a, RELEASE_SENDER, false, false);
    }
  }

  /** Furniture moved, flipped, deleted, or held. She stands on the floor beside where it was. */
  private dropPresenceSeats(houseId: string, room: string, item: { id: string; x: number; kind: string; scale: number; size?: number }) {
    const w = pieceWidth(item.kind) * drawnScale(item);
    for (const [pid, p] of this.presence) {
      if (p.where !== 'house' || p.houseId !== houseId || p.room !== room || p.seat?.id !== item.id) continue;
      const spot = standBeside(item.x, w, p.x);
      const { seat: _drop, ...rest } = p;
      const next = { ...rest, x: spot.x, y: spot.y };
      this.presence.set(pid, next);
      this.broadcastPresence(pid, next);
    }
  }
  private wireHouse(h: HouseFull, c: Conn): HouseFull {
    return { ...h, state: this.wireState(h.state, c, h.ownerId) };
  }
  private pushMail(h: HouseFull, also: string[] = []) {
    const box = this.freshen(h);
    const watch = new Set<string>([h.ownerId, ...(box?.letters.map(l => l.fromPid) ?? []), ...also]);
    for (const c of this.conns) {
      if (!c.pid || (c.mail ?? 0) < 1 || !watch.has(c.pid)) continue;
      const view = c.pid === h.ownerId ? (box ?? { letters: [] }) : (projectMailbox(box, c.pid, h.ownerId) ?? { letters: [] });
      this.send(c, { t: 'mailbox', houseId: h.id, mailbox: view });
    }
  }
  private mailRate(pid: string, now: number): boolean {
    const recent = (this.mailTimes.get(pid) ?? []).filter(t => now - t < MAIL_RATE_WINDOW_MS);
    if (recent.length >= MAIL_RATE_MAX) { this.mailTimes.set(pid, recent); return false; }
    recent.push(now);
    this.mailTimes.set(pid, recent);
    return true;
  }
  private rateOk(c: Conn) {
    const now = Date.now(); c.budget ??= { t: now, n: 0 };
    if (now - c.budget.t > 1000) { c.budget.t = now; c.budget.n = 0; }
    return ++c.budget.n <= MSGS_PER_SEC;
  }

  // ---------- Game Room tables (server-authoritative; hidden hands go only to their owner) ----------
  private online(pid: string) { return [...this.conns].some(c => c.pid === pid); }
  /** Away from the table: offline, or wandered out of the Game Room. */
  private away(pid: string) { return !this.online(pid) || this.presence.get(pid)?.where !== 'gameroom'; }
  /** Start the away clock once. Later presence updates must not push the 20s mark further out. */
  private noteAway(pid: string) {
    if (this.awaySince.has(pid)) { this.armAwayPing(pid); return; }
    this.awaySince.set(pid, Date.now());
    this.save('away'); this.armAwayPing(pid);
  }
  private clearAway(pid: string) {
    const timer = this.awayTimers.get(pid); if (timer) clearTimeout(timer);
    this.awayTimers.delete(pid);
    if (!this.awaySince.has(pid)) return;
    this.awaySince.delete(pid); this.save('away');
  }
  /** One resend about 20s after she left, so a client that does not tick locally still unlocks Play for her. */
  private armAwayPing(pid: string) {
    if (this.awayTimers.has(pid)) return;
    const since = this.awaySince.get(pid); if (since == null) return;
    const wait = Math.max(0, since + NUDGE_MS - Date.now());
    const timer = setTimeout(() => { this.awayTimers.delete(pid); this.pingAway(pid); }, wait);
    (timer as { unref?: () => void }).unref?.();
    this.awayTimers.set(pid, timer);
  }
  private pingAway(pid: string) {
    if (!this.away(pid) || !this.awaySince.has(pid)) return;
    this.tables.forEach((t, i) => {
      if (t.phase !== 'play' || !t.state) return;
      const turn = GAMES[TABLES[i].game].turn(t.state);
      if (turn >= 0 && t.players[turn] === pid) this.sendTable(i);
    });
  }
  tablePub(i: number, pid: string | null): TablePub {
    const t = this.tables[i], g = GAMES[TABLES[i].game];
    const me = pid ? t.players.indexOf(pid) : -1;
    const turnPid = t.phase === 'play' && t.state ? t.players[g.turn(t.state)] : undefined;
    const off = turnPid ? this.awaySince.get(turnPid) : undefined;
    return { tb: i, game: TABLES[i].game, seats: t.seats, host: t.host, phase: t.phase, players: t.players, seq: t.seq,
      view: t.state ? { ...(g.view(t.state, me >= 0 && t.phase !== 'lobby' ? me : null) as object), winPid: t.winPid ?? null } : null,
      you: me >= 0 ? me : null, ...(turnPid && this.away(turnPid) ? { away: Date.now() - (off ?? Date.now()) } : {}) };
  }
  private sendTable(i: number) {
    for (const c of this.conns) if (c.pid && (c.v ?? 1) >= PROTO_GAMES) this.send(c, { t: 'table', table: this.tablePub(i, c.pid) });
  }
  private fixHost(t: TableRec) { if (!t.host || !t.seats.includes(t.host)) t.host = t.seats.find(Boolean) ?? null; }
  /** Leave a table: free the seat; mid-game the rules module takes her out (or the game ends if too few are left). */
  private tableLeave(i: number, pid: string) {
    const t = this.tables[i], g = GAMES[TABLES[i].game];
    const s = t.seats.indexOf(pid); if (s < 0) return false;
    t.seats[s] = null;
    const p = t.players.indexOf(pid);
    if (t.phase === 'play' && p >= 0) {
      const next = g.removePlayer(t.state, p, Math.random);
      t.players.splice(p, 1);
      if (next) t.state = next;
      else { t.phase = 'over'; t.winPid = t.players.length === 1 ? t.players[0] : null; if (t.state) { t.state.winner = t.players.length === 1 ? 0 : null; if ('turn' in t.state) t.state.turn = -1; } }
    }
    if (!t.seats.some(Boolean)) { this.tables[i] = freshTable(i); this.tables[i].seq = t.seq + 1; } else { this.fixHost(t); t.seq++; }
    return true;
  }
  tableDropPlayer(pid: string) { this.tables.forEach((_, i) => { if (this.tableLeave(i, pid)) this.sendTable(i); }); this.save('tables'); }
  private tableOp(pid: string, o: ReturnType<typeof cleanTableOp> & {}): string | null {
    const i = o.tb, t = this.tables[i], g = GAMES[TABLES[i].game];
    switch (o.op) {
      case 'sit': {
        const where = this.presence.get(pid)?.where; if (where !== 'gameroom') return 'notHere';
        if (t.seats[o.seat]) return t.seats[o.seat] === pid ? null : 'taken';
        if (t.phase === 'play' && t.players.includes(pid)) return 'playing';
        // one table at a time: stand up from any other table first (not while playing a game there)
        for (let j = 0; j < this.tables.length; j++) if (j !== i && this.tables[j].seats.includes(pid)) {
          if (this.tables[j].phase === 'play' && this.tables[j].players.includes(pid)) return 'playingElsewhere';
          this.tableLeave(j, pid); this.sendTable(j);
        }
        const old = t.seats.indexOf(pid); if (old >= 0) t.seats[old] = null; // move to another seat at the same table
        t.seats[o.seat] = pid; this.fixHost(t); t.seq++; break;
      }
      case 'leave': if (!this.tableLeave(i, pid)) return 'notSeated'; break;
      case 'start': {
        if (t.host !== pid) return 'notHost';
        if (t.phase === 'play') return 'playing';
        const seated = t.seats.filter(Boolean) as string[];
        if (seated.length < g.minPlayers) return 'needMore';
        if (seated.length > g.maxPlayers) return 'tooMany';
        t.players = seated; t.state = g.setup(seated.length, Math.random); t.phase = 'play'; t.winPid = null; t.seq++; break;
      }
      case 'move': {
        if (t.phase !== 'play') return 'notPlaying';
        const p = t.players.indexOf(pid); if (p < 0) return 'notPlayer';
        const mv = g.cleanMove(o.m); if (!mv || !g.legal(t.state, p, mv)) return 'illegal';
        this.applyMove(i, p, mv); break;
      }
      case 'nudge': {
        // a friend went away on her turn: after a little while anyone at the table can have her turn played for her
        if (t.phase !== 'play' || !t.players.includes(pid)) return 'notPlayer';
        const p = g.turn(t.state), who = t.players[p]; if (p < 0 || !who || !this.away(who)) return 'notAway';
        if (Date.now() - (this.awaySince.get(who) ?? Date.now()) < NUDGE_MS) return 'tooSoon';
        const mv = g.autoMove(t.state, p); if (!mv || !g.legal(t.state, p, mv)) return 'noMove';
        this.applyMove(i, p, mv); break;
      }
    }
    this.save('tables'); this.sendTable(i); return null;
  }
  private applyMove(i: number, p: number, mv: unknown) {
    const t = this.tables[i], g = GAMES[TABLES[i].game];
    t.state = g.apply(t.state, p, mv, Math.random); t.seq++;
    const w = g.winner(t.state);
    if (w !== null || g.turn(t.state) < 0) { t.phase = 'over'; t.winPid = w !== null ? t.players[w] : null; }
  }

  // ---------- socket lifecycle ----------
  async onConnect(c: Conn) {
    await this.load();
    if (!this.meta) { this.send(c, { t: 'error', code: 'nohood' }); c.close(4404, 'no such neighborhood'); return; }
    this.conns.add(c);
  }
  /** Drop any earlier socket for this player. A late close from the one we replaced must not take the new session with it. */
  private supersede(pid: string, next: Conn) {
    for (const old of [...this.conns]) {
      if (old === next || old.pid !== pid) continue;
      old.pid = undefined; this.conns.delete(old);
      try { old.close(4000, 'replaced'); } catch { /* peer already gone */ }
    }
  }
  onClose(c: Conn) {
    // Only the socket still registered for this connection. A replaced socket, or a close that fires twice, leaves the live one alone.
    if (!this.conns.has(c)) return;
    this.conns.delete(c);
    if (c.pid && ![...this.conns].some(x => x.pid === c.pid)) {
      const pid = c.pid;
      const last = this.presence.get(pid) ?? null;
      this.presence.delete(pid); this.noteAway(pid);
      this.tables.forEach((t, i) => { if (t.seats.includes(pid)) this.sendTable(i); }); // friends see she's away
      this.broadcast({ t: 'pres', pid, p: null });
      this.broadcast({ t: 'players', players: this.players() });
      // After any act already in flight, so a pickup and a disconnect cannot interleave.
      this.queue = this.queue.then(() => { this.releaseHeldBaby(pid, last); }).catch(() => {});
    }
  }

  /** Messages are processed strictly one at a time so validation can't race (e.g. two kids picking the same nickname). */
  private queue: Promise<void> = Promise.resolve();
  onMessage(c: Conn, raw: string): Promise<void> {
    const run = this.queue.then(() => this.handle(c, raw)).catch(() => {});
    this.queue = run; return run;
  }
  private async handle(c: Conn, raw: string) {
    await this.load();
    if (!this.meta || typeof raw !== 'string' || raw.length > MAX_MSG) return;
    if (!this.rateOk(c)) return;
    let m: ClientMsg; try { m = JSON.parse(raw); } catch { return; }
    if (!m || typeof m !== 'object') return;
    const meta = this.meta;
    switch (m.t) {
      case 'hello': {
        c.v = typeof m.v === 'number' ? m.v : 1;
        c.pet = m.pet === 1 ? 1 : 0;
        c.mail = m.mail === 1 ? 1 : 0;
        c.sit = m.sit === 1 ? 1 : 0;
        c.fit = m.fit === 1 ? 1 : 0;
        c.baby = m.baby === 1 ? 1 : 0;
        const h = typeof m.token === 'string' ? await sha256(m.token) : '';
        const p = h ? Object.values(meta.players).find(p => p.tokenHash === h) : undefined;
        if (!p) { this.send(c, { t: 'error', code: 'badtoken' }); return; }
        c.pid = p.pid; this.supersede(p.pid, c); this.welcome(c); this.tables.forEach((t, i) => { if (t.seats.includes(p.pid)) this.sendTable(i); }); this.broadcast({ t: 'players', players: this.players() });
        return;
      }
      case 'join': {
        if (c.pid) return;
        c.v = typeof m.v === 'number' ? m.v : 1;
        c.pet = m.pet === 1 ? 1 : 0;
        c.mail = m.mail === 1 ? 1 : 0;
        c.sit = m.sit === 1 ? 1 : 0;
        c.fit = m.fit === 1 ? 1 : 0;
        c.baby = m.baby === 1 ? 1 : 0;
        const roster = meta.roster ?? [];
        let nickname: string;
        if (roster.length) {
          // sign in with a first name from the grown-up's roster; one device per name
          const want = String(m.nickname ?? '').toLowerCase(); const name = roster.find(n => n.toLowerCase() === want);
          if (!name) { this.send(c, { t: 'error', code: 'nickname', msg: 'notOnList' }); return; }
          const prev = Object.values(meta.players).find(p => p.nickname === name);
          if (prev && prev.tokenHash) { this.send(c, { t: 'error', code: 'nickname', msg: 'taken' }); return; }
          if (prev) { // claim was reset by a grown-up: this device takes over her player + house
            const token = randomToken(); prev.tokenHash = await sha256(token); prev.look = cleanLook(m.look); this.save('meta');
            c.pid = prev.pid; this.supersede(prev.pid, c); this.send(c, { t: 'joined', token, pid: prev.pid });
            this.welcome(c); this.broadcast({ t: 'players', players: this.players() }); return;
          }
          nickname = name;
        } else {
          if (!NICKNAMES.includes(m.nickname)) { this.send(c, { t: 'error', code: 'nickname', msg: 'pick a nickname from the list' }); return; }
          if (Object.values(meta.players).some(p => p.nickname === m.nickname)) { this.send(c, { t: 'error', code: 'nickname', msg: 'taken' }); return; }
          nickname = m.nickname;
        }
        if (Object.keys(meta.players).length >= MAX_PLAYERS) { this.send(c, { t: 'error', code: 'full' }); return; }
        const token = randomToken(), pid = 'p' + randomToken(5), houseId = 'h' + randomToken(5);
        const brought = m.house ? cleanHouseState(m.house) : withRandomStarter(initialState());
        // Letters are stamped by the server from the connection, never imported from a client save.
        const { mailbox: _brought, ...state } = brought;
        const slot = meta.houseOrder.length;
        const house: HouseFull = { id: houseId, ownerId: pid, name: `${nickname}'s House`, locked: false, style: (meta.nextStyle + slot) % HOUSE_STYLES, slot, state };
        meta.players[pid] = { dog: cleanDog(m.dog), pid, nickname, houseId, tokenHash: await sha256(token), look: cleanLook(m.look), joinedAt: Date.now() };
        meta.houseOrder.push(houseId); this.houses.set(houseId, house);
        this.save('meta'); this.save(houseId);
        c.pid = pid;
        this.send(c, { t: 'joined', token, pid });
        for (const x of this.conns) if (x.pid && x !== c) this.send(x, { t: 'house', house: this.wireHouse(house, x) });
        this.welcome(c); this.broadcast({ t: 'players', players: this.players() });
        return;
      }
      case 'parent': return this.onParent(c, m);
    }
    if (!c.pid || !meta.players[c.pid]) return; // everything below needs a joined player
    const me = meta.players[c.pid];
    switch (m.t) {
      case 'act': {
        const cid = typeof m.cid === 'number' ? m.cid : -1;
        const h = typeof m.houseId === 'string' ? this.houses.get(m.houseId) : undefined;
        const nack = (reason: string, withState = true) => this.send(c, { t: 'nack', houseId: String(m.houseId).slice(0, 40), cid, reason, state: withState && h ? this.wireState(h.state, c, h.ownerId) : undefined });
        if (!h) return nack('nohouse', false);
        if (h.locked && h.ownerId !== me.pid) return nack('locked');
        let a = cleanAction(m.action); if (!a) return nack('invalid');
        const catAct = a.type.startsWith('cat/');
        const kennelAct = a.type === 'dog/kennel';
        if ((catAct || kennelAct) && h.ownerId !== me.pid) return nack('notyours'); // only she can adopt her cat, or kennel her own dog
        // A forged move of another girl's avatar never lands. Player ids are not doll ids.
        if (a.type === 'char/move' && meta.players[a.id]) return nack('notyours');
        // A seat object is the house owner's. A visitor may still place a doll, with no seat.
        if (a.type === 'char/move' && a.seat && typeof a.seat === 'object' && h.ownerId !== me.pid) return nack('notyours');
        if (a.type === 'char/move' && a.seat && typeof a.seat === 'object') {
          const seat = a.seat;
          const babyOn = babyOccupant(h.state.baby, a.room);
          const taken = h.state.characters.some(ch => ch.id !== a.id && ch.room === a.room && ch.seat?.item === seat.item && ch.seat.n === seat.n)
            || [...this.presence].some(([, q]) => q.where === 'house' && q.houseId === h.id && q.room === a.room && q.seat?.id === seat.item && q.seat.n === seat.n)
            || (!!babyOn && babyOn.item === seat.item && babyOn.n === seat.n);
          if (taken) a = { ...a, seat: null };
        }
        if (a.type.startsWith('baby/')) {
          if ((c.baby ?? 0) < 1) return nack('invalid');
          if (!h.state.baby && a.type !== 'baby/meet') return nack('noop');
          if ((a.type === 'baby/name' || a.type === 'baby/place' || a.type === 'baby/meet') && h.ownerId !== me.pid) return nack('notyours');
          if (a.type === 'baby/hold') {
            const cur = h.state.baby;
            const heldBy = cur?.spot === 'arms' ? cur.holder : '';
            // A holder who disconnected or left the house is not cuddling. Anyone may take her.
            const gone = !!heldBy && !this.babyHolderHere(heldBy, h.id);
            if (a.holder && heldBy && heldBy !== me.pid && !gone) return nack('cuddling');
            if (a.holder === null && heldBy && heldBy !== me.pid && h.ownerId !== me.pid) return nack('notyours');
            a = { ...a, holder: a.holder ? me.pid : null, now: Date.now() };
          } else if (a.type === 'baby/care' || a.type === 'baby/ease' || a.type === 'baby/meet' || a.type === 'baby/place') {
            a = { ...a, now: Date.now() };
          }
          if (a.type === 'baby/place' && a.seat) {
            const seat = a.seat;
            const taken = [...this.presence].some(([, q]) => q.where === 'house' && q.houseId === h.id && q.room === a.room && q.seat?.id === seat.item && q.seat.n === seat.n);
            if (taken) a = { ...a, seat: null, spot: 'mat' };
          }
        }
        // An old stored house may still be missing a room if it was loaded before this process filled it.
        // Fill first so reduce never throws, and so a living-room edit cannot save a copy that dropped the nursery.
        const ready = ensureRooms(h.state);
        // item/size does not stand anyone up. The seat is a fraction of the piece and draws at the new scale.
        const standId = a.type === 'item/flip' || a.type === 'item/delete' || (a.type === 'item/move' && a.stand) ? a.id
          : a.type === 'char/hold' ? a.itemId : '';
        const stoodOn = standId ? ready.rooms[a.room]?.items.find(i => i.id === standId) : undefined;
        const next: GameState = reduce(ready, a);
        if (next === h.state) return nack('noop');
        if (JSON.stringify(next).length > MAX_HOUSE_JSON) return nack('toobig');
        h.state = next; this.save(h.id);
        // Cat acts stay off clients older than pets. dog/kennel stays off clients that did not say pet:1:
        // an old reducer has no default and would wipe the house if it saw an unknown action.
        // seat rides only to clients that said sit:1. Everyone else gets the same x and y.
        // item/size rides only to clients that said fit:1. Baby actions ride only to clients that said baby:1.
        // An old reducer has no default and would wipe the house.
        this.broadcastAct(h.id, me.pid, cid, a, c, catAct, kennelAct);
        if (stoodOn) this.dropPresenceSeats(h.id, a.room, stoodOn);
        return;
      }
      case 'pres': {
        // A pres that names another pid is rejected. Her place, and the sender's, stay as they were.
        const named = (m as { pid?: unknown }).pid;
        if (typeof named === 'string' && named !== me.pid) return;
        const p = cleanPresence(m.p, id => this.houses.has(id), (houseId, room, itemId) => {
          const house = this.houses.get(houseId);
          return !!house?.state.rooms[room]?.items.some(i => i.id === itemId);
        }); if (!p) return;
        if (p.ride !== undefined && [...this.presence].some(([pid, q]) => pid !== me.pid && q.where === 'ranch' && q.ride === p.ride)) {
          this.send(c, { t: 'noride', ride: p.ride }); delete p.ride; // one rider per horse
        }
        let pres = p;
        if (pres.seat && pres.where === 'house') {
          const house = this.houses.get(pres.houseId);
          const seat = pres.seat;
          const dollThere = !!house?.state.characters.some(ch => ch.room === pres.room && ch.seat?.item === seat.id && ch.seat.n === seat.n);
          const kidThere = [...this.presence].some(([pid, q]) => pid !== me.pid && q.where === 'house' && q.houseId === pres.houseId && q.room === pres.room && q.seat?.id === seat.id && q.seat.n === seat.n);
          const babyOn = babyOccupant(house?.state.baby, pres.room || '');
          if (dollThere || kidThere || (!!babyOn && babyOn.item === seat.id && babyOn.n === seat.n)) {
            const { seat: _drop, ...rest } = pres;
            pres = rest;
          }
        }
        const wasIn = this.presence.get(me.pid)?.where === 'gameroom';
        const prevPres = this.presence.get(me.pid) ?? null;
        this.presence.set(me.pid, pres);
        this.broadcastPresence(me.pid, pres, me.pid);
        this.releaseHeldBaby(me.pid, prevPres, pres);
        if (wasIn !== (p.where === 'gameroom')) {
          if (p.where === 'gameroom') this.clearAway(me.pid); else this.noteAway(me.pid);
          // walking out of the Game Room gives up a seat at a table that isn't playing; mid-game she keeps it and can come back
          this.tables.forEach((t, i) => { if (!t.seats.includes(me.pid)) return; if (p.where !== 'gameroom' && t.phase !== 'play') { this.tableLeave(i, me.pid); this.save('tables'); } this.sendTable(i); });
        }
        return;
      }
      case 'tbl': {
        if ((c.v ?? 1) < PROTO_GAMES) return;
        const o = cleanTableOp(m); if (!o) return;
        const r = this.tableOp(me.pid, o); if (r) this.send(c, { t: 'tblFail', tb: o.tb, reason: r });
        return;
      }
      case 'dog': {
        const d = m.dog === null ? null : cleanDog(m.dog); if (m.dog !== null && !d) return;
        me.dog = d; this.save('meta'); this.broadcast({ t: 'players', players: this.players() }); return;
      }
      case 'fx': {
        // tricks, purrs, ball throws, splashes: relayed live to kids in the same place; nothing is stored
        const fx = cleanFx(m.fx); const mine = this.presence.get(me.pid); if (!fx || !mine) return;
        if (RANCH_FX.has(fx.k) && !fxAllowedAt(fx.k, mine.where)) return;
        const need = RANCH_FX.has(fx.k) ? PROTO_RANCH : PROTO_PETS;
        this.broadcast({ t: 'fx', pid: me.pid, fx }, x => !!x.pid && x !== c && (x.v ?? 1) >= need && (() => { const p = this.presence.get(x.pid!); return !!p && sameSpot(mine, p); })());
        return;
      }
      case 'ranch': {
        // garden, hen house and basket: validated here so every kid sees the same ranch
        const o = cleanRanchOp(m.o); if (!o || (c.v ?? 1) < PROTO_RANCH) return;
        const mine = this.presence.get(me.pid);
        const plots = cleanPlots(meta.ranch?.plots), now = Date.now();
        const fail = (reason: string) => this.send(c, { t: 'ranchFail', reason, plots, now });
        if (o.op !== 'take' && o.op !== 'use' && mine?.where !== 'ranch') return fail('away');
        let house: HouseFull | undefined;
        if (o.op === 'take') { // put a basket item in a room of her own house
          house = this.houses.get(me.houseId);
          if (!house || !house.state.rooms[o.room as keyof GameState['rooms']]) return fail('nohouse');
          if (house.state.rooms[o.room as keyof GameState['rooms']].items.some(i => i.id === o.id)) return fail('dup');
        }
        const r = ranchApply(plots, cleanBasket(me.basket), o, now, this.lastEgg.get(me.pid) ?? 0);
        if (typeof r === 'string') return fail(r);
        if (o.op === 'egg') this.lastEgg.set(me.pid, now);
        me.basket = r.basket; this.save('meta');
        if (r.garden) { meta.ranch = { plots: r.plots }; this.broadcast({ t: 'ranch', plots: r.plots, now }, x => !!x.pid && (x.v ?? 1) >= PROTO_RANCH); }
        this.broadcast({ t: 'players', players: this.players() });
        if (o.op === 'egg' && mine) this.broadcast({ t: 'fx', pid: me.pid, fx: { k: 'hen' } }, x => !!x.pid && x !== c && (x.v ?? 1) >= PROTO_RANCH && (() => { const q = this.presence.get(x.pid!); return !!q && sameSpot(mine, q); })());
        if (o.op === 'take' && house) {
          const a = { type: 'item/add' as const, room: o.room as keyof GameState['rooms'], item: { id: o.id, kind: BASKET_ITEM[o.kind], x: o.x, y: 560, flip: false, z: 0, scale: 1 } };
          const next = reduce(house.state, a);
          if (next !== house.state) { house.state = next; this.save(house.id); this.broadcast({ t: 'act', houseId: house.id, by: me.pid, cid: -1, action: a }); }
        }
        return;
      }
      case 'look': { me.look = applyLook(me.look, m.look); this.save('meta'); this.broadcast({ t: 'players', players: this.players() }); return; }
      case 'lock': {
        const h = this.houses.get(m.houseId); if (!h || h.ownerId !== me.pid || typeof m.locked !== 'boolean') return;
        h.locked = m.locked; this.save(h.id); this.broadcast({ t: 'houseMeta', meta: this.metaOf(h) }); return;
      }
      case 'mail': return this.onMail(c, me, m);
      case 'say': {
        const b = this.cleanBubble(m.b);
        if (typeof b === 'string') { this.send(c, { t: 'sayFail', reason: b }); return; }
        const mine = this.presence.get(me.pid); if (!mine) { this.send(c, { t: 'sayFail', reason: 'nowhere' }); return; }
        // relay only to players standing nearby (same house+room or street spot); nothing is stored or logged
        const near = new Set([me.pid]); this.presence.forEach((p, pid) => { if (isNear(mine, p)) near.add(pid); });
        this.broadcast({ t: 'bubble', pid: me.pid, b }, x => !!x.pid && near.has(x.pid));
        return;
      }
    }
  }

  /** What a grown-up may see: first name, words, and date. Nothing else from the letter. */
  private parentMail(): { houseId: string; name: string; letters: { id: string; from: string; text: string; at: number }[] }[] {
    const mail: { houseId: string; name: string; letters: { id: string; from: string; text: string; at: number }[] }[] = [];
    for (const id of this.meta!.houseOrder) {
      const h = this.houses.get(id);
      if (!h) continue;
      this.freshen(h);
      const letters: { id: string; from: string; text: string; at: number }[] = [];
      for (const l of h.state.mailbox?.letters ?? []) {
        if (!l.text) continue;
        letters.push({ id: l.id, from: l.from, text: l.text, at: l.at });
      }
      mail.push({ houseId: h.id, name: h.name, letters });
    }
    return mail;
  }
  /** Drop one letter, or the whole mailbox when id is empty. The key comes off the house when nothing is left. */
  private clearLetters(h: HouseFull, id: string) {
    this.freshen(h);
    const letters = h.state.mailbox?.letters ?? [];
    if (!letters.length) return;
    if (id && !letters.some(l => l.id === id)) return;
    const keep = id ? letters.filter(l => l.id !== id) : [];
    const dropped = id ? letters.filter(l => l.id === id) : letters.slice();
    if (keep.length) h.state = { ...h.state, mailbox: { letters: keep } };
    else {
      const { mailbox: _drop, ...rest } = h.state;
      h.state = rest;
    }
    this.save(h.id);
    this.pushMail(h, dropped.map(l => l.fromPid));
  }

  /** Send, open, or throw away a letter. The name is stamped from the connection, never from the payload. */
  private onMail(c: Conn, me: Player, m: Extract<ClientMsg, { t: 'mail' }>) {
    const houseId = typeof m.houseId === 'string' ? m.houseId : '';
    const h = this.houses.get(houseId);
    const fail = (reason: string) => this.send(c, { t: 'mailFail', houseId: houseId.slice(0, 40), reason });
    if (!h || (c.mail ?? 0) < 1) return fail('nohouse');
    const now = Date.now();
    if (m.op === 'send') {
      const raw = (m as { text?: unknown }).text;
      let text = '';
      if (!mailIsFree(this.meta!.settings)) {
        // The same phrase list as chat bubbles. Exact text only: a crafted message cannot sneak a sentence in.
        if (typeof raw !== 'string' || PHRASES.indexOf(raw) < 0) return fail('presetsOnly');
        text = raw;
      } else {
        const cleaned = cleanMailText(raw, this.meta?.roster ?? []);
        if (!cleaned.ok) return fail(cleaned.reason);
        text = cleaned.text;
      }
      const color = mailColor((m as { color?: unknown }).color);
      const sticker = mailSticker((m as { sticker?: unknown }).sticker);
      if (color < 0 || sticker < 0) return fail('bad');
      this.freshen(h, now);
      const letters = h.state.mailbox?.letters ?? [];
      // Three unread letters from the same kid. Reading one opens the slot again.
      if (letters.filter(l => l.fromPid === me.pid && !l.read).length >= 3) return fail('unread');
      if (!this.mailRate(me.pid, now)) return fail('slow');
      if (letters.length >= MAIL_CAP) return fail('full');
      const letter: Letter = { id: 'm' + randomToken(8), from: me.nickname, fromPid: me.pid, text, color, sticker, at: now };
      const next: GameState = { ...h.state, mailbox: { letters: [...letters, letter] } };
      if (JSON.stringify(next).length > MAX_HOUSE_JSON) return fail('toobig');
      h.state = next; this.save(h.id); this.pushMail(h);
      return;
    }
    if (m.op !== 'read' && m.op !== 'drop') return;
    if (h.ownerId !== me.pid) return fail('notyours');
    const id = typeof (m as { id?: unknown }).id === 'string' ? (m as { id: string }).id : '';
    this.freshen(h, now);
    const letters = h.state.mailbox?.letters ?? [];
    const cur = letters.find(l => l.id === id);
    if (!cur) return fail('gone');
    if (m.op === 'read') {
      if (!cur.read) h.state = { ...h.state, mailbox: { letters: letters.map(l => l.id === id ? { ...l, read: true } : l) } };
    } else if (letters.length === 1) {
      const { mailbox: _drop, ...rest } = h.state;
      h.state = rest;
    } else h.state = { ...h.state, mailbox: { letters: letters.filter(l => l.id !== id) } };
    this.save(h.id);
    this.pushMail(h, [cur.fromPid]);
  }

  private cleanBubble(b: any): Bubble | string {
    if (!b || typeof b !== 'object') return 'bad';
    if (b.kind === 'phrase' || b.kind === 'emote') { const list = b.kind === 'phrase' ? PHRASES : EMOTES; return Number.isInteger(b.v) && b.v >= 0 && b.v < list.length ? { kind: b.kind, v: b.v } : 'bad'; }
    if (b.kind === 'text') { if (!this.meta!.settings.freeChat) return 'presetsOnly'; const f = filterSay(b.v); return f.ok ? { kind: 'text', v: f.text } : f.reason; }
    return 'bad';
  }

  private async onParent(c: Conn, m: Extract<ClientMsg, { t: 'parent' }>) {
    const meta = this.meta!;
    if (typeof m.key !== 'string' || (await sha256(m.key)) !== meta.parentKeyHash) { this.send(c, { t: 'error', code: 'badkey' }); return; }
    c.parent = true;
    let note: string | undefined;
    const kick = (pid: string) => { for (const x of [...this.conns]) if (x.pid === pid) { this.send(x, { t: 'removed' }); x.pid = undefined; x.close(4000, 'removed'); this.conns.delete(x); } };
    switch (m.op) {
      case 'rosterAdd': {
        const name = cleanFirstName(m.name); const r = meta.roster ??= [];
        if (!name) { note = 'badName'; break; }
        if (r.some(n => n.toLowerCase() === name.toLowerCase())) break;
        if (r.length >= MAX_ROSTER) { note = 'rosterFull'; break; }
        r.push(name); this.save('meta'); break;
      }
      case 'rosterRemove': {
        const r = meta.roster ?? []; const name = r.find(n => n === m.name); if (!name) break;
        if (Object.values(meta.players).some(p => p.nickname === name)) { note = 'nameInUse'; break; }
        meta.roster = r.filter(n => n !== name); this.save('meta'); break;
      }
      case 'unclaim': { // sign this name out of its device; the next device to pick the name gets her house back
        const p = Object.values(meta.players).find(p => p.nickname === m.name && (meta.roster ?? []).includes(p.nickname)); if (!p) break;
        p.tokenHash = ''; this.save('meta');
        const last = this.presence.get(p.pid) ?? null;
        this.releaseHeldBaby(p.pid, last, null);
        kick(p.pid);
        this.presence.delete(p.pid); this.broadcast({ t: 'pres', pid: p.pid, p: null }); this.broadcast({ t: 'players', players: this.players() });
        break;
      }
      case 'setCode': {
        const code = normCode(m.code); const reg = this.opts.registry;
        if (!validInvite(code)) { note = 'badCode'; break; }
        if (code === meta.code) break;
        if (!reg || !meta.id) { note = 'codeFixed'; break; }
        if (!(await reg.claim(code, meta.id))) { note = 'codeTaken'; break; }
        const old = meta.code; meta.code = code; await this.kv.put('meta', meta); await reg.release(old, meta.id);
        break;
      }
      case 'rename': { const h = this.houses.get(m.houseId), name = cleanHouseName(m.name); if (!h || !name) break; h.name = name; this.save(h.id); this.broadcast({ t: 'houseMeta', meta: this.metaOf(h) }); break; }
      case 'freeChat': { if (typeof m.on !== 'boolean') break; meta.settings.freeChat = m.on; this.save('meta'); this.broadcast({ t: 'settings', settings: meta.settings }); break; }
      case 'freeMail': { if (typeof m.on !== 'boolean') break; meta.settings.freeMail = m.on; this.save('meta'); this.broadcast({ t: 'settings', settings: meta.settings }); break; }
      case 'mailClear': {
        const houseId = typeof m.houseId === 'string' ? m.houseId : '';
        const h = this.houses.get(houseId); if (!h) break;
        const id = typeof m.id === 'string' ? m.id : '';
        this.clearLetters(h, id);
        break;
      }
      case 'mailClearAll': {
        for (const id of meta.houseOrder) {
          const h = this.houses.get(id);
          if (h) this.clearLetters(h, '');
        }
        break;
      }
      case 'remove': {
        const p = meta.players[m.pid]; if (!p) break;
        for (const id of meta.houseOrder) {
          if (id === p.houseId) continue;
          const h = this.houses.get(id);
          if (!h) continue;
          this.freshen(h);
          const letters = h.state.mailbox?.letters ?? [];
          if (!letters.some(l => l.fromPid === p.pid)) continue;
          const keep = letters.filter(l => l.fromPid !== p.pid);
          if (keep.length) h.state = { ...h.state, mailbox: { letters: keep } };
          else {
            const { mailbox: _drop, ...rest } = h.state;
            h.state = rest;
          }
          this.save(h.id);
          this.pushMail(h, [p.pid]);
        }
        const last = this.presence.get(p.pid) ?? null;
        this.releaseHeldBaby(p.pid, last, null);
        delete meta.players[p.pid]; this.houses.delete(p.houseId); meta.houseOrder = meta.houseOrder.filter(id => id !== p.houseId);
        meta.houseOrder.forEach((id, i) => { const h = this.houses.get(id); if (h && h.slot !== i) { h.slot = i; this.save(id); } });
        this.presence.delete(p.pid); this.save('meta'); this.save(p.houseId);
        kick(p.pid); this.tableDropPlayer(p.pid);
        this.broadcast({ t: 'houseGone', houseId: p.houseId }); this.broadcast({ t: 'pres', pid: p.pid, p: null });
        this.broadcast({ t: 'players', players: this.players() });
        meta.houseOrder.forEach(id => { const h = this.houses.get(id); if (h) this.broadcast({ t: 'houseMeta', meta: this.metaOf(h) }); });
        break;
      }
    }
    this.send(c, { t: 'parentInfo', code: meta.code, settings: meta.settings, players: this.players(), houses: meta.houseOrder.map(id => this.metaOf(this.houses.get(id)!)), roster: this.roster(), mail: this.parentMail(), note });
  }
}
