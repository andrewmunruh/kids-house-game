// Platform-agnostic, server-authoritative neighborhood. One instance per invite code.
// Adapters (server/node.ts, server/worker.ts) provide storage + sockets.
// Privacy: no emails, names, IPs or chat are stored; chat is relayed to nearby players only and never logged.
import { reduce, initialState, type GameState } from '../src/shared/state';
import {
  MAX_PLAYERS, NICKNAMES, PHRASES, EMOTES, HOUSE_STYLES, cleanAction, cleanHouseState, cleanLook, cleanPresence, cleanHouseName,
  filterChat, isNear, cleanFirstName, normCode, validInvite, MAX_ROSTER, type RosterEntry, type ClientMsg, type ServerMsg, type Presence, type PlayerPub, type HouseFull, type HouseMeta, type Look, type Bubble,
} from '../src/shared/hood';

export interface KV { get<T>(k: string): Promise<T | undefined>; put(k: string, v: unknown): Promise<void>; delete(k: string): Promise<void> }
/** Maps invite codes (case-insensitive, unique across streets) to permanent street ids. */
export interface CodeRegistry { claim(code: string, id: string): Promise<boolean>; release(code: string, id: string): Promise<void> }
export interface Conn { send(s: string): void; close(code?: number, reason?: string): void; pid?: string; parent?: boolean; budget?: { t: number; n: number } }

interface Player { pid: string; nickname: string; houseId: string; tokenHash: string; look: Look; joinedAt: number }
interface Meta { id?: string; code: string; roster?: string[]; createdAt: number; parentKeyHash: string; settings: { freeChat: boolean }; players: Record<string, Player>; houseOrder: string[]; nextStyle: number }

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
  private loaded: Promise<void> | null = null;
  private dirty = new Set<string>(); private flushT: ReturnType<typeof setTimeout> | null = null;

  constructor(private kv: KV, private opts: { flushMs?: number; registry?: CodeRegistry } = {}) {}

  load() { return (this.loaded ??= (async () => {
    this.meta = (await this.kv.get<Meta>('meta')) ?? null;
    if (this.meta) for (const id of this.meta.houseOrder) { const h = await this.kv.get<HouseFull>('house:' + id); if (h) this.houses.set(id, h); }
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
      const h = this.houses.get(k); if (h) await this.kv.put('house:' + k, h); else await this.kv.delete('house:' + k);
    }
  }

  // ---------- helpers ----------
  private pub(p: Player): PlayerPub { return { pid: p.pid, nickname: p.nickname, houseId: p.houseId, look: p.look, online: [...this.conns].some(c => c.pid === p.pid) }; }
  private players() { return Object.values(this.meta!.players).sort((a, b) => a.joinedAt - b.joinedAt).map(p => this.pub(p)); }
  roster(): RosterEntry[] {
    const ps = Object.values(this.meta?.players ?? {});
    return (this.meta?.roster ?? []).map(name => { const p = ps.find(p => p.nickname === name); return { name, claimed: !!p && !!p.tokenHash, hasHouse: !!p }; });
  }
  private metaOf(h: HouseFull): HouseMeta { const { state: _s, ...m } = h; return m; }
  private send(c: Conn, m: ServerMsg) { try { c.send(JSON.stringify(m)); } catch { /* socket gone */ } }
  private broadcast(m: ServerMsg, filter: (c: Conn) => boolean = c => !!c.pid) { const s = JSON.stringify(m); for (const c of this.conns) if (filter(c)) try { c.send(s); } catch { } }
  private welcome(c: Conn) {
    const presence: Record<string, Presence> = {}; this.presence.forEach((p, k) => { presence[k] = p; });
    this.send(c, { t: 'welcome', pid: c.pid!, settings: this.meta!.settings, players: this.players(), houses: this.meta!.houseOrder.map(id => this.houses.get(id)!).filter(Boolean), presence });
  }
  private rateOk(c: Conn) {
    const now = Date.now(); c.budget ??= { t: now, n: 0 };
    if (now - c.budget.t > 1000) { c.budget.t = now; c.budget.n = 0; }
    return ++c.budget.n <= MSGS_PER_SEC;
  }

  // ---------- socket lifecycle ----------
  async onConnect(c: Conn) {
    await this.load();
    if (!this.meta) { this.send(c, { t: 'error', code: 'nohood' }); c.close(4404, 'no such neighborhood'); return; }
    this.conns.add(c);
  }
  onClose(c: Conn) {
    this.conns.delete(c);
    if (c.pid && ![...this.conns].some(x => x.pid === c.pid)) {
      this.presence.delete(c.pid);
      this.broadcast({ t: 'pres', pid: c.pid, p: null });
      this.broadcast({ t: 'players', players: this.players() });
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
        const h = typeof m.token === 'string' ? await sha256(m.token) : '';
        const p = h ? Object.values(meta.players).find(p => p.tokenHash === h) : undefined;
        if (!p) { this.send(c, { t: 'error', code: 'badtoken' }); return; }
        c.pid = p.pid; this.welcome(c); this.broadcast({ t: 'players', players: this.players() });
        return;
      }
      case 'join': {
        if (c.pid) return;
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
            c.pid = prev.pid; this.send(c, { t: 'joined', token, pid: prev.pid });
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
        const state = m.house ? cleanHouseState(m.house) : initialState();
        const slot = meta.houseOrder.length;
        const house: HouseFull = { id: houseId, ownerId: pid, name: `${nickname}'s House`, locked: false, style: (meta.nextStyle + slot) % HOUSE_STYLES, slot, state };
        meta.players[pid] = { pid, nickname, houseId, tokenHash: await sha256(token), look: cleanLook(m.look), joinedAt: Date.now() };
        meta.houseOrder.push(houseId); this.houses.set(houseId, house);
        this.save('meta'); this.save(houseId);
        c.pid = pid;
        this.send(c, { t: 'joined', token, pid });
        this.broadcast({ t: 'house', house }, x => !!x.pid && x !== c);
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
        const nack = (reason: string, withState = true) => this.send(c, { t: 'nack', houseId: String(m.houseId).slice(0, 40), cid, reason, state: withState && h ? h.state : undefined });
        if (!h) return nack('nohouse', false);
        if (h.locked && h.ownerId !== me.pid) return nack('locked');
        const a = cleanAction(m.action); if (!a) return nack('invalid');
        const next: GameState = reduce(h.state, a);
        if (next === h.state) return nack('noop');
        if (JSON.stringify(next).length > MAX_HOUSE_JSON) return nack('toobig');
        h.state = next; this.save(h.id);
        this.broadcast({ t: 'act', houseId: h.id, by: me.pid, cid, action: a });
        return;
      }
      case 'pres': {
        const p = cleanPresence(m.p, id => this.houses.has(id)); if (!p) return;
        this.presence.set(me.pid, p);
        this.broadcast({ t: 'pres', pid: me.pid, p }, x => !!x.pid && x.pid !== me.pid);
        return;
      }
      case 'look': { me.look = cleanLook(m.look); this.save('meta'); this.broadcast({ t: 'players', players: this.players() }); return; }
      case 'lock': {
        const h = this.houses.get(m.houseId); if (!h || h.ownerId !== me.pid || typeof m.locked !== 'boolean') return;
        h.locked = m.locked; this.save(h.id); this.broadcast({ t: 'houseMeta', meta: this.metaOf(h) }); return;
      }
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

  private cleanBubble(b: any): Bubble | string {
    if (!b || typeof b !== 'object') return 'bad';
    if (b.kind === 'phrase' || b.kind === 'emote') { const list = b.kind === 'phrase' ? PHRASES : EMOTES; return Number.isInteger(b.v) && b.v >= 0 && b.v < list.length ? { kind: b.kind, v: b.v } : 'bad'; }
    if (b.kind === 'text') { if (!this.meta!.settings.freeChat) return 'presetsOnly'; const f = filterChat(b.v); return f.ok ? { kind: 'text', v: f.text } : f.reason; }
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
        p.tokenHash = ''; this.save('meta'); kick(p.pid);
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
      case 'remove': {
        const p = meta.players[m.pid]; if (!p) break;
        delete meta.players[p.pid]; this.houses.delete(p.houseId); meta.houseOrder = meta.houseOrder.filter(id => id !== p.houseId);
        meta.houseOrder.forEach((id, i) => { const h = this.houses.get(id); if (h && h.slot !== i) { h.slot = i; this.save(id); } });
        this.presence.delete(p.pid); this.save('meta'); this.save(p.houseId);
        kick(p.pid);
        this.broadcast({ t: 'houseGone', houseId: p.houseId }); this.broadcast({ t: 'pres', pid: p.pid, p: null });
        this.broadcast({ t: 'players', players: this.players() });
        meta.houseOrder.forEach(id => { const h = this.houses.get(id); if (h) this.broadcast({ t: 'houseMeta', meta: this.metaOf(h) }); });
        break;
      }
    }
    this.send(c, { t: 'parentInfo', code: meta.code, settings: meta.settings, players: this.players(), houses: meta.houseOrder.map(id => this.metaOf(this.houses.get(id)!)), roster: this.roster(), note });
  }
}
