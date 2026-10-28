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
export const saveHoodConfig = (c: HoodConfig | null) => { c ? localStorage.setItem(CFG_KEY, JSON.stringify(c)) : localStorage.removeItem(CFG_KEY); };

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

type Pending = { cid: number; action: Action; sent: boolean };
interface HouseRec { meta: HouseMeta; confirmed: GameState; pending: Pending[]; view: GameState | null }
type Handler = (...a: any[]) => void;
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
    this.outbox.push(m);
    if (this.outbox.length > 8) this.outbox.splice(0, this.outbox.length - 8);
  }
  private flushOutbox() {
    if (this.ws?.readyState !== WebSocket.OPEN || !this.outbox.length) return;
    const q = this.outbox; this.outbox = [];
    for (const m of q) if (!this.send(m)) this.outbox.push(m);
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

  /** Open the socket. Resolves on welcome (or with an error code). Reconnects automatically afterwards. */
  connect(join?: { nickname: string; look: Look; house?: unknown; dog?: Dog | null }): Promise<'ok' | string> {
    if (this.retryT) { clearTimeout(this.retryT); this.retryT = 0; }
    this.closedByUs = false; this.replaced = false; this.status = 'connecting'; this.emit('status', this.status);
    const prev = this.ws;
    return new Promise(resolve => {
      let settled = false; const done = (r: string) => { if (!settled) { settled = true; resolve(r); } };
      const ws = new WebSocket(this.cfg.url.replace(/^http/, 'ws') + '/ws/' + encodeURIComponent(this.cfg.id ?? this.cfg.code));
      this.ws = ws;
      if (prev && prev !== ws) { try { prev.close(); } catch { /* already closed */ } }
      ws.onopen = () => {
        if (join && !this.cfg.token) this.send({ t: 'join', ...join, v: PROTOCOL, pet: 1, mail: 1, sit: 1, fit: 1, baby: 1, amb: 1, halloween: 1, cos: 1, needs: 1, art: 1 });
        else if (this.cfg.token) this.send({ t: 'hello', token: this.cfg.token, v: PROTOCOL, pet: 1, mail: 1, sit: 1, fit: 1, baby: 1, amb: 1, halloween: 1, cos: 1, needs: 1, art: 1 });
        else done('notoken');
      };
      ws.onmessage = e => { const m: ServerMsg = JSON.parse(e.data); this.handle(m); if (m.t === 'welcome') { this.armStable(); done('ok'); } if (m.t === 'error') done(m.code + (m.msg ? ':' + m.msg : '')); if (m.t === 'removed') done('removed'); };
      ws.onclose = (ev: CloseEvent) => {
        if (this.ws !== ws) return;
        this.clearStable();
        this.ws = null; this.status = 'offline'; done('closed');
        // 4000 is "replaced": the same sign-in is live on another screen. Retrying would just kick that screen, and it would kick us back.
        if (ev.code === 4000) { this.replaced = true; this.emit('status', this.status); this.emit('replaced'); return; }
        this.emit('status', this.status);
        this.scheduleRetry();
      };
      ws.onerror = () => {};
    });
  }
  close() {
    this.closedByUs = true; this.replaced = false; this.epoch++; this.outbox = []; this.clearStable();
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
        this.players = new Map(m.players.map(p => [p.pid, p]));
        { const old = this.houses; this.houses = new Map();
          for (const h of m.houses) { const { state, ...meta } = h; const prev = old.get(h.id);
            // keep this kid's unsent edits across a reconnect; anything already sent was lost with the socket
            // migrate fills nursery/backyard when an older Worker stored a 4-room house
            this.houses.set(h.id, { meta, confirmed: adoptHouse(state), pending: prev ? prev.pending.filter(p => !p.sent) : [], view: null }); } }
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
      case 'removed': this.closedByUs = true; this.emit('removed'); break;
    }
  }

  /** Keep the original receipt time when the server repeats the same away value, so the local clock is not reset. */
  private stampTable(t: TablePub): TablePub & { receivedAt?: number } {
    const prev = this.tables.get(t.tb);
    const receivedAt = prev && prev.away === t.away && prev.receivedAt ? prev.receivedAt : Date.now();
    return { ...t, receivedAt };
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
    else h.pending.push({ cid: this.cid++, action, sent: false });
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
