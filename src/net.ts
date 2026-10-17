import { storeKey } from './shared/storekey';
// Client side of the neighborhood. Server-ordered actions are applied to `confirmed`; this kid's own
// not-yet-confirmed actions sit in `pending` and are re-applied on top (optimistic UI that never diverges).
import type { Plot, RanchOp } from './shared/ranch';
import { reduce, type Action, type GameState, type RoomId } from './shared/state';
import { PROTOCOL, type ClientMsg, type ServerMsg, type PlayerPub, type HouseMeta, type Presence, type Bubble, type Look, type RosterEntry, type Fx } from './shared/hood';
import type { Dog } from './shared/state';

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
const coalesceKey = (a: Action) => a.type === 'item/move' ? 'im:' + a.id : a.type === 'char/move' ? 'cm:' + a.id : null;

export class HoodClient {
  ws: WebSocket | null = null;
  pid = ''; settings = { freeChat: true };
  players = new Map<string, PlayerPub>();
  houses = new Map<string, HouseRec>();
  presence = new Map<string, Presence>();
  status: 'connecting' | 'online' | 'offline' = 'offline';
  /** Rainbow Ranch garden (shared per street) + server clock offset so growth looks the same on every iPad. */
  ranch: { plots: (Plot | null)[]; skew: number } = { plots: [], skew: 0 };
  private handlers = new Map<string, Handler[]>();
  private cid = 1; private flushT = 0; private presT = 0; private lastPres: Presence | null = null; private presDirty = false;
  private closedByUs = false; private retry = 0;

  constructor(public cfg: HoodConfig) {}
  on(ev: string, fn: Handler) { (this.handlers.get(ev) ?? this.handlers.set(ev, []).get(ev)!).push(fn); }
  private emit(ev: string, ...a: any[]) { this.handlers.get(ev)?.forEach(f => f(...a)); }
  private send(m: ClientMsg) { if (this.ws?.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify(m)); }

  /** Open the socket. Resolves on welcome (or with an error code). Reconnects automatically afterwards. */
  connect(join?: { nickname: string; look: Look; house?: unknown; dog?: Dog | null }): Promise<'ok' | string> {
    this.closedByUs = false; this.status = 'connecting'; this.emit('status', this.status);
    return new Promise(resolve => {
      let settled = false; const done = (r: string) => { if (!settled) { settled = true; resolve(r); } };
      const ws = new WebSocket(this.cfg.url.replace(/^http/, 'ws') + '/ws/' + encodeURIComponent(this.cfg.id ?? this.cfg.code));
      this.ws = ws;
      ws.onopen = () => {
        if (join && !this.cfg.token) this.send({ t: 'join', ...join, v: PROTOCOL });
        else if (this.cfg.token) this.send({ t: 'hello', token: this.cfg.token, v: PROTOCOL });
        else done('notoken');
      };
      ws.onmessage = e => { const m: ServerMsg = JSON.parse(e.data); this.handle(m); if (m.t === 'welcome') { this.retry = 0; done('ok'); } if (m.t === 'error') done(m.code + (m.msg ? ':' + m.msg : '')); if (m.t === 'removed') done('removed'); };
      ws.onclose = () => {
        if (this.ws !== ws) return;
        this.status = 'offline'; this.emit('status', this.status); done('closed');
        if (!this.closedByUs && this.cfg.token) setTimeout(() => this.connect(), Math.min(15000, 800 * 2 ** this.retry++));
      };
      ws.onerror = () => {};
    });
  }
  close() { this.closedByUs = true; this.ws?.close(); this.ws = null; this.status = 'offline'; clearInterval(this.flushT); }

  private handle(m: ServerMsg) {
    switch (m.t) {
      case 'joined': this.cfg.token = m.token; this.cfg.pid = m.pid; saveHoodConfig(this.cfg); break;
      case 'welcome':
        this.pid = m.pid; this.settings = m.settings; this.status = 'online';
        this.players = new Map(m.players.map(p => [p.pid, p]));
        { const old = this.houses; this.houses = new Map();
          for (const h of m.houses) { const { state, ...meta } = h; const prev = old.get(h.id);
            // keep this kid's unsent edits across a reconnect; anything already sent was lost with the socket
            this.houses.set(h.id, { meta, confirmed: state, pending: prev ? prev.pending.filter(p => !p.sent) : [], view: null }); } }
        this.presence = new Map(Object.entries(m.presence)); this.presence.delete(this.pid);
        if (m.ranch) this.ranch = { plots: m.ranch.plots, skew: m.ranch.now - Date.now() };
        clearInterval(this.flushT); this.flushT = window.setInterval(() => this.flush(), 60);
        this.emit('welcome'); this.emit('status', this.status);
        if (this.lastPres) { this.presDirty = true; this.flushPres(); }
        break;
      case 'act': {
        const h = this.houses.get(m.houseId); if (!h) return;
        h.confirmed = reduce(h.confirmed, m.action);
        const mine = m.by === this.pid && h.pending[0]?.cid === m.cid;
        if (mine) h.pending.shift();
        h.view = null;
        if (!mine) this.emit('act', m.houseId, m.action);
        break;
      }
      case 'nack': {
        const h = this.houses.get(m.houseId); if (!h) return;
        h.pending = h.pending.filter(p => p.cid !== m.cid); if (m.state) h.confirmed = m.state; h.view = null;
        this.emit('reset', m.houseId, m.reason); break;
      }
      case 'pres': if (m.pid !== this.pid) { m.p ? this.presence.set(m.pid, m.p) : this.presence.delete(m.pid); this.emit('pres', m.pid); } break;
      case 'players': this.players = new Map(m.players.map(p => [p.pid, p])); this.emit('players'); break;
      case 'house': { const { state, ...meta } = m.house; this.houses.set(meta.id, { meta, confirmed: state, pending: [], view: null }); this.emit('houses'); break; }
      case 'houseMeta': { const h = this.houses.get(m.meta.id); if (h) { h.meta = m.meta; this.emit('houses'); this.emit('houseMeta', m.meta.id); } break; }
      case 'houseGone': this.houses.delete(m.houseId); this.emit('houses'); this.emit('houseGone', m.houseId); break;
      case 'settings': this.settings = m.settings; this.emit('settings'); break;
      case 'bubble': this.emit('bubble', m.pid, m.b); break;
      case 'fx': this.emit('fx', m.pid, m.fx); break;
      case 'ranch': this.ranch = { plots: m.plots, skew: m.now - Date.now() }; this.emit('ranch'); break;
      case 'ranchFail': this.ranch = { plots: m.plots, skew: m.now - Date.now() }; this.emit('ranch'); this.emit('ranchFail', m.reason); break;
      case 'noride': this.emit('noride', m.ride); break;
      case 'sayFail': this.emit('sayFail', m.reason); break;
      case 'parentInfo': this.emit('parentInfo', m); break;
      case 'error': this.emit('error', m.code); if (m.code === 'badtoken') { this.cfg.token = undefined; this.cfg.pid = undefined; saveHoodConfig(this.cfg); } break;
      case 'removed': this.closedByUs = true; this.emit('removed'); break;
    }
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
    for (const [houseId, h] of this.houses) for (const p of h.pending) if (!p.sent && this.ws?.readyState === WebSocket.OPEN) { this.send({ t: 'act', houseId, cid: p.cid, action: p.action }); p.sent = true; }
    this.flushPres();
  }

  // ---------- presence / chat / misc ----------
  setPresence(p: Presence) { this.lastPres = p; this.presDirty = true; if (!this.presT) this.flushPres(); }
  private flushPres() {
    if (!this.presDirty || !this.lastPres) return; this.presDirty = false; this.send({ t: 'pres', p: this.lastPres });
    this.presT = window.setTimeout(() => { this.presT = 0; this.flushPres(); }, 90);
  }
  myPresence() { return this.lastPres; }
  say(b: Bubble) { this.send({ t: 'say', b }); }
  lock(houseId: string, locked: boolean) { this.send({ t: 'lock', houseId, locked }); }
  setLook(look: Look) { this.send({ t: 'look', look }); const me = this.players.get(this.pid); if (me) me.look = look; }
  setDog(dog: Dog | null) { this.send({ t: 'dog', dog }); const me = this.players.get(this.pid); if (me) me.dog = dog; }
  fx(fx: Fx) { this.send({ t: 'fx', fx }); }
  ranchOp(o: RanchOp) { this.send({ t: 'ranch', o }); }
  now() { return Date.now() + this.ranch.skew; }
  parent(op: any) { if (this.cfg.parentKey) this.send({ t: 'parent', key: this.cfg.parentKey, ...op }); }
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
      else { if (!client.canEdit(houseId)) return; client.dispatch(houseId, a); }
      emit(a);
    },
  };
}
