import { storeKey } from './shared/storekey';
// Client side of the neighborhood. Server-ordered actions are applied to `confirmed`; this kid's own
// not-yet-confirmed actions sit in `pending` and are re-applied on top (optimistic UI that never diverges).
import type { Plot, RanchOp } from './shared/ranch';
import { reduce, migrate, type Action, type GameState, type RoomId } from './shared/state';
import { PROTOCOL, type ClientMsg, type ServerMsg, type PlayerPub, type HouseMeta, type Presence, type Bubble, type Look, type RosterEntry, type Fx, type StreetSettings } from './shared/hood';
import type { Dog } from './shared/state';
import type { TableOp, TablePub } from './shared/games/index';

/** Server houses are migrated like a local save: missing rooms gain the starter layout, existing rooms stay. */
function adoptHouse(state: GameState): GameState {
  try { return migrate(state); } catch { return state; }
}

/** `id` is the street's permanent id (sockets use it); `code` is the current invite code, shown to grown-ups. */
export interface HoodConfig { url: string; code: string; id?: string; token?: string; pid?: string; parentKey?: string }
const CFG_KEY = storeKey('cozy-hood');
export const loadHoodConfig = (): HoodConfig | null => { try { return JSON.parse(localStorage.getItem(CFG_KEY) ?? 'null'); } catch { return null; } };
export const saveHoodConfig = (c: HoodConfig | null) => { try { c ? localStorage.setItem(CFG_KEY, JSON.stringify(c)) : localStorage.removeItem(CFG_KEY); } catch { /* storage full: stays signed in this session */ } };

/** Where the neighborhood server lives: ?hood=… > build-time VITE_HOOD_URL > same machine on :8787 when developing. */
export function hoodServerUrl(): string | null {
  const q = new URLSearchParams(location.search).get('hood');
  if (q) return q.replace(/\/$/, '');
  const env = import.meta.env.VITE_HOOD_URL as string | undefined;
  if (env) return env.replace(/\/$/, '');
  if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) return `http://${location.hostname}:8787`;
  return null;
}
export async function createNeighborhood(url: string): Promise<{ code: string; id: string; parentKey: string }> {
  const r = await fetch(url + '/api/create', { method: 'POST' }); if (!r.ok) throw new Error('create failed ' + r.status); return r.json();
}
export type Lookup = { exists: false } | { exists: true; id: string; roster: RosterEntry[] } | { slow: true };
/** Find a street by invite code (case-insensitive). The server throttles lookups per device/network. */
export async function lookupNeighborhood(url: string, code: string): Promise<Lookup> {
  const r = await fetch(`${url}/api/hood/${encodeURIComponent(code)}`);
  if (r.status === 429) return { slow: true };
  if (!r.ok) throw new Error('lookup failed');
  return r.json();
}

/** `base` is the target (item, doll, or room look) as this kid saw it just before her edit, canonical JSON. null = no single target. */
type Pending = { cid: number; action: Action; sent: boolean; base?: string | null };
interface HouseRec { meta: HouseMeta; confirmed: GameState; pending: Pending[]; view: GameState | null }
type Handler = (...a: any[]) => void;
/** Sorted-key JSON, so two copies of the same item compare equal whatever order their fields arrived in. */
const canon = (v: unknown): string => v === undefined ? 'u' : JSON.stringify(v, (_k, x) => x && typeof x === 'object' && !Array.isArray(x) ? Object.fromEntries(Object.keys(x).sort().map(k => [k, x[k]])) : x);
/** What an edit changes, read from a house: the item in its room, the doll, or the room's colours. undefined = no single target. */
function targetOf(s: GameState, a: Action): string | undefined {
  if (a.type.startsWith('item/') && a.type !== 'item/add' && 'id' in a && 'room' in a) return canon(s.rooms[a.room]?.items.find(i => i.id === a.id) ?? null);
  if (a.type.startsWith('room/') && a.type !== 'room/switch' && 'room' in a) { const r = s.rooms[a.room]; return canon(r ? [r.wallpaper, r.floor, r.pattern, r.wallTile ?? null, r.floorTile ?? null] : null); }
  // Pets: re-sent only if the cat (or dog) still looks exactly as she last saw it, so a friend's newer move wins.
  if (a.type === 'cat/move' || a.type === 'cat/set') return canon(s.cat ?? null);
  if (a.type === 'dog/set') return canon(s.dog ?? null);
  if ((a.type === 'char/update' || a.type === 'char/move' || a.type === 'char/delete' || a.type === 'char/hold' || a.type === 'char/release') && 'id' in a) return canon(s.characters.find(c => c.id === a.id) ?? null);
  return undefined;
}
/**
 * Untargeted edits that are safe to send twice. Not item/add or char/add: if hers landed (ack lost) and a friend
 * deleted it before she reconnected, a re-send would bring it back. An add that never left the device is still sent.
 * Pets are targeted (see targetOf), so they are re-sent only when unchanged.
 */
const SAFE_AGAIN = new Set(['dog/kennel', 'baby/meet', 'baby/name']);
/** Chat bubbles and sparkles said while offline are dropped after this long instead of popping up late (MP-7). */
export const SAY_STALE_MS = 10_000;
/** Heartbeat (only when the welcome said hb:1): a ping every 10 s; two pings in a row with no reply within 5 s each mean the socket is dead. */
export const HB_EVERY_MS = 10_000, HB_WAIT_MS = 5_000, WAKE_WAIT_MS = 3_000;
const coalesceKey = (a: Action) => a.type === 'item/move' ? 'im:' + a.id : a.type === 'char/move' ? 'cm:' + a.id : a.type === 'item/size' ? 'is:' + ('id' in a ? a.id : '') : null;

export class HoodClient {
  ws: WebSocket | null = null;
  pid = ''; settings: StreetSettings = { freeChat: true };
  players = new Map<string, PlayerPub>();
  houses = new Map<string, HouseRec>();
  presence = new Map<string, Presence>();
  status: 'connecting' | 'online' | 'offline' = 'offline';
  /** The welcome said sit:1. An old Worker never does, so the pose stays on her screen only. */
  speaksSit = false;
  /** The welcome said baby:1. An old Worker never does, so this screen does not send baby actions. */
  speaksBaby = false;
  /** Server forwards item/power (ambient M1). */
  speaksAmb = false;
  /** The welcome said art:1 (Art Studio paintings are stored beside the house). */
  speaksArt = false;
  /** Server forwards need/* (M2). */
  speaksNeeds = false;
  /** The server closed this socket because the same sign-in connected somewhere else. Do not reconnect on our own. */
  replaced = false;
  /** Rainbow Ranch garden (shared per street) + server clock offset so growth looks the same on every iPad. */
  ranch: { plots: (Plot | null)[]; skew: number } = { plots: [], skew: 0 };
  /** Game Room tables. Each `view` is already personalized (your hand only). `receivedAt` is local, so away time can keep growing between messages. */
  tables = new Map<number, TablePub & { receivedAt?: number }>();
  private handlers = new Map<string, Handler[]>();
  private cid = 1; private flushT = 0; private presT = 0; private lastPres: Presence | null = null; private presDirty = false;
  private closedByUs = false; private retry = 0; private retryT = 0; private epoch = 0; private stableT = 0;
  /** One-shots (chat, lock, grown-up actions) sent while the socket is down. Capped; flushed after welcome, after presence. */
  private outbox: ClientMsg[] = [];
  /** When each say/fx entered the outbox (same objects), so stale ones can be dropped on flush. */
  private saidAt = new WeakMap<object, number>();
  /** The welcome said hb:1: the Worker answers ping with pong and drops a silent hb:1 socket after 40 s. */
  speaksHb = false;
  private lastRx = 0; private hbT = 0; private hbWaitT = 0; private hbMissed = 0; private hiddenAt = 0; private wakeOn = false;
  /** Test hook: how many sent-but-unanswered edits the last welcome sent again, and how many it let go. */
  resent = { again: 0, dropped: 0 };

  constructor(public cfg: HoodConfig) {}
  on(ev: string, fn: Handler) { (this.handlers.get(ev) ?? this.handlers.set(ev, []).get(ev)!).push(fn); }
  private emit(ev: string, ...a: any[]) { this.handlers.get(ev)?.forEach(f => f(...a)); }
  private send(m: ClientMsg): boolean {
    if (this.ws?.readyState !== WebSocket.OPEN) return false;
    this.ws.send(JSON.stringify(m)); return true;
  }
  /** Hold a message until the next welcome when the socket isn't open. Latest lock/look/dog replaces an older one. */
  private reliable(m: ClientMsg) {
    if (this.send(m)) return;
    if (m.t === 'lock') this.outbox = this.outbox.filter(x => !(x.t === 'lock' && x.houseId === m.houseId));
    else if (m.t === 'look' || m.t === 'dog') this.outbox = this.outbox.filter(x => x.t !== m.t);
    if (m.t === 'say' || m.t === 'fx') this.saidAt.set(m, Date.now());
    this.outbox.push(m);
    if (this.outbox.length > 8) this.outbox.splice(0, this.outbox.length - 8);
  }
  private flushOutbox() {
    if (this.ws?.readyState !== WebSocket.OPEN || !this.outbox.length) return;
    const q = this.outbox; this.outbox = []; const now = Date.now();
    for (const m of q) {
      const at = this.saidAt.get(m);
      if (at !== undefined && now - at > SAY_STALE_MS) continue; // said too long ago: showing it now would be out of context
      if (!this.send(m)) this.outbox.push(m);
    }
  }
  /** One timer. 400ms, 800ms, 1.6s … capped at 15s. Cancelled by close() so a left street stays disconnected. */
  private scheduleRetry() {
    if (this.closedByUs || this.replaced || !this.cfg.token || this.retryT) return;
    const epoch = this.epoch;
    const delay = Math.min(15000, 400 * 2 ** Math.min(this.retry, 6));
    this.retry++;
    this.retryT = window.setTimeout(() => {
      this.retryT = 0;
      if (epoch !== this.epoch || this.closedByUs || this.replaced || !this.cfg.token) return;
      void this.connect();
    }, delay);
  }
  /** A welcome that dies immediately must not snap the backoff back to 400ms. Only a socket that stays up counts as stable. */
  private armStable() {
    if (this.stableT) clearTimeout(this.stableT);
    this.stableT = window.setTimeout(() => { this.stableT = 0; this.retry = 0; }, 10_000);
  }
  private clearStable() { if (this.stableT) { clearTimeout(this.stableT); this.stableT = 0; } }

  // ---------- heartbeat + wake (MP-1) ----------
  private stopHb() { clearInterval(this.hbT); this.hbT = 0; this.hbMissed = 0; if (this.hbWaitT) { clearTimeout(this.hbWaitT); this.hbWaitT = 0; } }
  private startHb() { this.stopHb(); if (this.speaksHb) this.hbT = window.setInterval(() => this.probe(HB_WAIT_MS), HB_EVERY_MS); }
  /** Ping and wait. Any message back proves the socket is alive; silence means it died without telling us. */
  private probe(wait: number) {
    if (!this.speaksHb || this.status !== 'online' || this.hbWaitT) return;
    const at = Date.now();
    if (!this.send({ t: 'ping' })) return;
    this.hbWaitT = window.setTimeout(() => {
      this.hbWaitT = 0; if (this.status !== 'online') return;
      if (this.lastRx >= at) { this.hbMissed = 0; return; }
      // Two misses in a row, not one: a main thread frozen >5 s (big art decode) can run this timer before the queued pong.
      if (++this.hbMissed >= 2) { this.hbMissed = 0; this.dropDead(); } else this.probe(wait);
    }, wait);
  }
  /** The socket is silently dead (wifi gone, iPad slept). Do not wait for the browser's own close, which can take minutes. */
  private dropDead() {
    const ws = this.ws; if (!ws) return;
    ws.onclose = null; ws.onmessage = null; ws.onopen = null;
    try { ws.close(); } catch { /* already closing */ }
    this.ws = null; this.clearStable(); this.stopHb(); this.status = 'offline';
    this.emit('status', this.status);
    this.retry = 0; this.scheduleRetry();
  }
  /** Woken up (screen on, tab back, page restored, wifi back): reconnect now instead of waiting out the backoff. */
  private wake = (ev: Event) => {
    if (ev.type === 'visibilitychange' && document.visibilityState === 'hidden') { this.hiddenAt = Date.now(); return; }
    if (this.closedByUs || this.replaced || !this.cfg.token) return;
    const away = this.hiddenAt ? Date.now() - this.hiddenAt : 0; this.hiddenAt = 0;
    if (this.status === 'offline') { this.retry = 0; void this.connect(); return; }
    if (this.status !== 'online') return;
    if (this.speaksHb) { if (this.hbWaitT) { clearTimeout(this.hbWaitT); this.hbWaitT = 0; } this.probe(WAKE_WAIT_MS); return; }
    // A Worker without ping: a short look away keeps the socket; a long one, a page restore, or wifi coming back starts fresh.
    if (ev.type === 'online' || (ev.type === 'pageshow' && (ev as PageTransitionEvent).persisted) || away > 3_000) this.dropDead();
  };
  private listenWake(on: boolean) {
    if (on === this.wakeOn || typeof document === 'undefined') return; this.wakeOn = on;
    const f = on ? 'addEventListener' : 'removeEventListener';
    document[f]('visibilitychange', this.wake); window[f]('pageshow', this.wake); window[f]('online', this.wake);
  }

  /** Open the socket. Resolves on welcome (or with an error code). Reconnects automatically afterwards. */
  connect(join?: { nickname: string; look: Look; house?: unknown; dog?: Dog | null }): Promise<'ok' | string> {
    if (this.retryT) { clearTimeout(this.retryT); this.retryT = 0; }
    this.closedByUs = false; this.replaced = false; this.status = 'connecting'; this.emit('status', this.status);
    this.stopHb(); this.listenWake(true);
    const prev = this.ws;
    return new Promise(resolve => {
      let settled = false; const done = (r: string) => { if (!settled) { settled = true; resolve(r); } };
      const ws = new WebSocket(this.cfg.url.replace(/^http/, 'ws') + '/ws/' + encodeURIComponent(this.cfg.id ?? this.cfg.code));
      this.ws = ws;
      if (prev && prev !== ws) { try { prev.close(); } catch { /* already closed */ } }
      ws.onopen = () => {
        if (join && !this.cfg.token) this.send({ t: 'join', ...join, v: PROTOCOL, pet: 1, mail: 1, sit: 1, fit: 1, baby: 1, amb: 1, halloween: 1, cos: 1, needs: 1, art: 1, hb: 1 });
        else if (this.cfg.token) this.send({ t: 'hello', token: this.cfg.token, v: PROTOCOL, pet: 1, mail: 1, sit: 1, fit: 1, baby: 1, amb: 1, halloween: 1, cos: 1, needs: 1, art: 1, hb: 1 });
        else done('notoken');
      };
      ws.onmessage = e => { this.lastRx = Date.now(); this.hbMissed = 0; const m: ServerMsg = JSON.parse(e.data); this.handle(m); if (m.t === 'welcome') { this.armStable(); done('ok'); } if (m.t === 'error') done(m.code + (m.msg ? ':' + m.msg : '')); if (m.t === 'removed') done('removed'); };
      ws.onclose = (ev: CloseEvent) => {
        if (this.ws !== ws) return;
        this.clearStable();
        this.ws = null; this.status = 'offline'; this.stopHb(); done('closed');
        // 4000 is "replaced": the same sign-in is live on another screen. Retrying would just kick that screen, and it would kick us back.
        if (ev.code === 4000) { this.replaced = true; this.emit('status', this.status); this.emit('replaced'); return; }
        this.emit('status', this.status);
        this.scheduleRetry();
      };
      ws.onerror = () => {};
    });
  }
  close() {
    this.closedByUs = true; this.replaced = false; this.epoch++; this.outbox = []; this.clearStable(); this.stopHb(); this.listenWake(false);
    if (this.retryT) { clearTimeout(this.retryT); this.retryT = 0; }
    if (this.presT) { clearTimeout(this.presT); this.presT = 0; }
    try { this.ws?.close(); } catch { /* already closed */ }
    this.ws = null; this.status = 'offline'; clearInterval(this.flushT);
  }

  private handle(m: ServerMsg) {
    switch (m.t) {
      case 'joined': this.cfg.token = m.token; this.cfg.pid = m.pid; saveHoodConfig(this.cfg); break;
      case 'welcome':
        this.pid = m.pid; this.settings = m.settings; this.status = 'online';
        this.speaksSit = m.sit === 1;
        this.speaksBaby = m.baby === 1;
        this.speaksAmb = m.amb === 1;
        this.speaksArt = m.art === 1;
        this.speaksNeeds = m.needs === 1;
        this.speaksHb = m.hb === 1;
        this.players = new Map(m.players.map(p => [p.pid, p]));
        { const old = this.houses; this.houses = new Map();
          for (const h of m.houses) { const { state, ...meta } = h; const prev = old.get(h.id);
            // migrate fills nursery/backyard when an older Worker stored a 4-room house
            const confirmed = adoptHouse(state);
            this.houses.set(h.id, { meta, confirmed, pending: prev ? this.carry(confirmed, prev.pending) : [], view: null }); } }
        this.presence = new Map(Object.entries(m.presence)); this.presence.delete(this.pid);
        if (m.ranch) this.ranch = { plots: m.ranch.plots, skew: m.ranch.now - Date.now() };
        { const next = new Map<number, TablePub & { receivedAt?: number }>();
          for (const t of m.tables ?? []) next.set(t.tb, this.stampTable(t));
          this.tables = next; }
        clearInterval(this.flushT); this.flushT = window.setInterval(() => this.flush(), 60);
        // Presence first, then anything said or locked during the gap, then listeners (they may move her again).
        if (this.lastPres) this.presDirty = true;
        this.flushPres();
        this.flushOutbox();
        this.startHb();
        this.emit('welcome'); this.emit('status', this.status);
        break;
      case 'act': {
        const h = this.houses.get(m.houseId); if (!h) return;
        h.confirmed = reduce(adoptHouse(h.confirmed), m.action);
        const mine = m.by === this.pid && h.pending[0]?.cid === m.cid;
        if (mine) h.pending.shift();
        h.view = null;
        if (!mine) this.emit('act', m.houseId, m.action);
        break;
      }
      case 'nack': {
        const h = this.houses.get(m.houseId); if (!h) return;
        h.pending = h.pending.filter(p => p.cid !== m.cid); if (m.state) h.confirmed = adoptHouse(m.state); h.view = null;
        this.emit('reset', m.houseId, m.reason); break;
      }
      case 'pres': if (m.pid !== this.pid) { m.p ? this.presence.set(m.pid, m.p) : this.presence.delete(m.pid); this.emit('pres', m.pid); } break;
      case 'players': this.players = new Map(m.players.map(p => [p.pid, p])); this.emit('players'); break;
      case 'house': { const { state, ...meta } = m.house; this.houses.set(meta.id, { meta, confirmed: adoptHouse(state), pending: [], view: null }); this.emit('houses'); break; }
      case 'houseMeta': { const h = this.houses.get(m.meta.id); if (h) { h.meta = m.meta; this.emit('houses'); this.emit('houseMeta', m.meta.id); } break; }
      case 'houseGone': this.houses.delete(m.houseId); this.emit('houses'); this.emit('houseGone', m.houseId); break;
      case 'settings': this.settings = m.settings; this.emit('settings'); break;
      case 'bubble': this.emit('bubble', m.pid, m.b); break;
      case 'fx': this.emit('fx', m.pid, m.fx); break;
      case 'knocked': this.emit('knocked', m.houseId, m.name); break;
      case 'ranch': this.ranch = { plots: m.plots, skew: m.now - Date.now() }; this.emit('ranch'); break;
      case 'ranchFail': this.ranch = { plots: m.plots, skew: m.now - Date.now() }; this.emit('ranch'); this.emit('ranchFail', m.reason); break;
      case 'noride': this.emit('noride', m.ride); break;
      case 'table': { const t = this.stampTable(m.table); this.tables.set(t.tb, t); this.emit('table', t); break; }
      case 'tblFail': this.emit('tblFail', m.tb, m.reason); break;
      case 'sayFail': this.emit('sayFail', m.reason); break;
      case 'mailbox': {
        const h = this.houses.get(m.houseId); if (!h) return;
        if (m.mailbox?.letters?.length) h.confirmed = { ...h.confirmed, mailbox: m.mailbox };
        else { const { mailbox: _drop, ...rest } = h.confirmed; h.confirmed = rest; }
        h.view = null; this.emit('mailbox', m.houseId); break;
      }
      case 'mailFail': this.emit('mailFail', m.reason); break;
      case 'art': this.emit('art', m.houseId, m.arts); break;
      case 'artFail': this.emit('artFail', m.houseId, m.id, m.reason); break;
      case 'parentInfo': this.emit('parentInfo', m); break;
      case 'error': this.emit('error', m.code); if (m.code === 'badtoken') { this.cfg.token = undefined; this.cfg.pid = undefined; saveHoodConfig(this.cfg); } break;
      case 'pong': break;
      case 'removed': this.closedByUs = true; this.emit('removed'); break;
    }
  }

  /** Keep the original receipt time when the server repeats the same away value, so the local clock is not reset. */
  private stampTable(t: TablePub): TablePub & { receivedAt?: number } {
    const prev = this.tables.get(t.tb);
    const receivedAt = prev && prev.away === t.away && prev.receivedAt ? prev.receivedAt : Date.now();
    return { ...t, receivedAt };
  }

  /**
   * MP-2: keep her edits across a reconnect, including ones sent into a socket that had silently died.
   * Walk them in order on top of the server's house. An edit whose target (item, doll, room look) still looks
   * exactly as it did when she made it is sent again with a fresh cid. If the target changed, either her edit
   * already landed (its answer was lost) or a friend changed it since: the server's copy wins, so it is let go.
   * A sent edit with no single target is sent again only if a second copy is a no-op (duplicate id, explicit value).
   */
  private carry(confirmed: GameState, pending: Pending[]): Pending[] {
    const out: Pending[] = []; let s = confirmed;
    for (const p of pending) {
      const now = targetOf(s, p.action);
      let keep: boolean;
      if (now !== undefined && p.base !== undefined && p.base !== null) keep = now === p.base;
      else keep = !p.sent || SAFE_AGAIN.has(p.action.type);
      if (p.sent) { if (keep) this.resent.again++; else this.resent.dropped++; }
      if (!keep) continue;
      out.push({ cid: this.cid++, action: p.action, sent: false, base: p.base });
      try { s = reduce(s, p.action); } catch { /* the server will judge it */ }
    }
    return out;
  }

  // ---------- houses ----------
  view(houseId: string): GameState | null {
    const h = this.houses.get(houseId); if (!h) return null;
    return (h.view ??= h.pending.reduce((s, p) => reduce(s, p.action), h.confirmed));
  }
  myHouseId() { return this.players.get(this.pid)?.houseId ?? ''; }
  canEdit(houseId: string) { const h = this.houses.get(houseId); return !!h && (!h.meta.locked || h.meta.ownerId === this.pid); }
  dispatch(houseId: string, action: Action) {
    const h = this.houses.get(houseId); if (!h) return;
    const key = coalesceKey(action), last = h.pending[h.pending.length - 1];
    if (key && last && !last.sent && coalesceKey(last.action) === key) last.action = action; // drags: only the latest position is sent
    else { const before = this.view(houseId); h.pending.push({ cid: this.cid++, action, sent: false, base: before ? targetOf(before, action) ?? null : null }); }
    h.view = null;
  }
  private flush() {
    for (const [houseId, h] of this.houses) for (const p of h.pending) if (!p.sent && this.send({ t: 'act', houseId, cid: p.cid, action: p.action })) p.sent = true;
    this.flushPres();
  }

  // ---------- presence / chat / misc ----------
  setPresence(p: Presence) { this.lastPres = p; this.presDirty = true; if (!this.presT) this.flushPres(); }
  private flushPres() {
    if (!this.presDirty || !this.lastPres) return;
    if (!this.send({ t: 'pres', p: this.lastPres })) {
      if (!this.closedByUs && !this.presT) this.presT = window.setTimeout(() => { this.presT = 0; this.flushPres(); }, 90);
      return; // stay dirty so the next welcome or reopen still announces where she is
    }
    this.presDirty = false;
    if (this.presT) clearTimeout(this.presT);
    this.presT = window.setTimeout(() => { this.presT = 0; this.flushPres(); }, 90);
  }
  myPresence() { return this.lastPres; }
  say(b: Bubble) { this.reliable({ t: 'say', b }); }
  lock(houseId: string, locked: boolean) { this.reliable({ t: 'lock', houseId, locked }); }
  setLook(look: Look) { this.reliable({ t: 'look', look }); const me = this.players.get(this.pid); if (me) me.look = look; }
  setDog(dog: Dog | null) { this.reliable({ t: 'dog', dog }); const me = this.players.get(this.pid); if (me) me.dog = dog; }
  fx(fx: Fx) { this.reliable({ t: 'fx', fx }); }
  /** Trick-or-treat knock. Fire and forget: the treat never waits on the server. */
  knock(houseId: string) { this.send({ t: 'knock', houseId }); }
  ranchOp(o: RanchOp) { this.reliable({ t: 'ranch', o }); }
  tbl(op: TableOp) { this.reliable({ t: 'tbl', ...op }); }
  /** Paintings: save one (her house only, sent in order before the item/add) or ask for some by id. */
  saveArt(houseId: string, id: string, data: string) { return this.send({ t: 'art', op: 'save', houseId, id, data }); }
  getArt(houseId: string, ids: string[]) { return this.send({ t: 'art', op: 'get', houseId, ids }); }
  sendMail(houseId: string, text: string, color: number, sticker: number) { this.reliable({ t: 'mail', op: 'send', houseId, text, color, sticker }); }
  readMail(houseId: string, id: string) { this.reliable({ t: 'mail', op: 'read', houseId, id }); }
  dropMail(houseId: string, id: string) { this.reliable({ t: 'mail', op: 'drop', houseId, id }); }
  now() { return Date.now() + this.ranch.skew; }
  parent(op: any) { if (this.cfg.parentKey) this.reliable({ t: 'parent', key: this.cfg.parentKey, ...op }); }
}

/** A Store-compatible view of one house, for the existing renderer. Room choice + sound stay local to this device. */
export function houseStore(client: HoodClient, houseId: string, localSound: { get: () => boolean; set: (on: boolean) => void }, startRoom: RoomId = 'living') {
  let currentRoom: RoomId = startRoom;
  const listeners: ((s: GameState, a: Action) => void)[] = [];
  const get = (): GameState => { const v = client.view(houseId)!; return { ...v, currentRoom, soundOn: localSound.get() }; };
  const emit = (a: Action) => { if (client.houses.has(houseId)) { const s = get(); listeners.forEach(l => l(s, a)); } };
  client.on('act', (hid: string, a: Action) => { if (hid === houseId) emit(a); });
  client.on('reset', (hid: string) => { if (hid === houseId) emit({ type: 'game/reset' }); });
  return {
    houseId,
    get,
    subscribe(l: (s: GameState, a: Action) => void) { listeners.push(l); },
    dispatch(a: Action) {
      if (a.type === 'room/switch') currentRoom = a.room;
      else if (a.type === 'settings/sound') localSound.set(a.on);
      else if (a.type === 'game/reset') return;
      else {
        if (!client.canEdit(houseId)) return;
        if (a.type.startsWith('baby/') && !client.speaksBaby) return;
        if (a.type === 'item/power' && !client.speaksAmb) return;
        if (a.type.startsWith('need/') && !client.speaksNeeds) return;
        client.dispatch(houseId, a);
      }
      emit(a);
    },
  };
}
