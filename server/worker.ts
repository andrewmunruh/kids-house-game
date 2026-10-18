// Cloudflare Workers + Durable Objects adapter (free plan, SQLite-backed DOs).
//   HoodDO: one per street (keyed by a permanent random id).  CodeRegistry: one singleton mapping invite codes -> ids,
//   which also does the per-IP throttling of code lookups so codes can't be guessed.
//   POST /api/create   GET /api/hood/:code   WS /ws/:id   (same API as server/node.ts). Nothing is logged.
import { Neighborhood, randomCode, randomToken, type KV, type Conn, type CodeRegistry } from './core';
import { CODE_ALPHABET, CODE_LEN, normCode, validInvite, validHoodId } from '../src/shared/hood';

interface Env { HOOD: any; CODES: any; ALLOWED_ORIGIN?: string }
const corsFor = (env: Env) => ({ 'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'content-type' });
const json = (env: Env, status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...corsFor(env) } });
const hoodStub = (env: Env, id: string) => env.HOOD.get(env.HOOD.idFromName(id));
const codesStub = (env: Env) => env.CODES.get(env.CODES.idFromName('codes'));
const call = async (stub: any, path: string, body?: unknown) => { const r = await stub.fetch('https://do' + path, body === undefined ? undefined : { method: 'POST', body: JSON.stringify(body) }); return { status: r.status, data: await r.json().catch(() => ({})) as any }; };
const registryFor = (env: Env): CodeRegistry => ({
  async claim(code, id) { return (await call(codesStub(env), '/claim', { code, id })).data.ok === true; },
  async release(code, id) { await call(codesStub(env), '/release', { code, id }); },
});

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url); const ip = req.headers.get('CF-Connecting-IP') ?? '';
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsFor(env) });
    if (url.pathname === '/api/health') return json(env, 200, { ok: true });
    if (url.pathname === '/api/create' && req.method === 'POST') {
      if ((await call(codesStub(env), '/limit', { key: ip + ':create', max: 5, win: 60_000 })).data.limited) return json(env, 429, { error: 'slow down' });
      const id = randomToken(8), reg = registryFor(env);
      for (let i = 0; i < 20; i++) {
        const code = randomCode(CODE_ALPHABET, CODE_LEN); if (!(await reg.claim(code, id))) continue;
        const r = await call(hoodStub(env, id), '/init', { code, id });
        return json(env, 200, { code, id, parentKey: r.data.parentKey });
      }
      return json(env, 500, { error: 'no code' });
    }
    const m = url.pathname.match(/^\/api\/hood\/([^/]+)$/);
    if (m) {
      const code = normCode(decodeURIComponent(m[1]));
      const r = await call(codesStub(env), '/resolve', { code, ip });
      if (r.status === 429) return json(env, 429, { error: 'slow down' });
      if (!r.data.id) return json(env, 200, { exists: false });
      const h = await call(hoodStub(env, r.data.id), '/roster');
      return h.data.exists ? json(env, 200, { exists: true, id: r.data.id, roster: h.data.roster }) : json(env, 200, { exists: false });
    }
    const w = url.pathname.match(/^\/ws\/([A-Za-z0-9]+)$/);
    if (w && req.headers.get('Upgrade') === 'websocket') {
      if (!validHoodId(w[1])) return new Response('not found', { status: 404 });
      return hoodStub(env, w[1]).fetch(req);
    }
    return json(env, 404, { error: 'not found' });
  },
};

export class HoodDO {
  hood: Neighborhood;
  constructor(state: any, env: Env) {
    const st = state.storage;
    const kv: KV = { get: k => st.get(k), put: (k, v) => st.put(k, v), delete: async k => { await st.delete(k); } };
    this.hood = new Neighborhood(kv, { registry: registryFor(env) });
  }
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    await this.hood.load();
    if (url.pathname === '/init') {
      if (this.hood.exists) return Response.json({ error: 'exists' }, { status: 409 });
      const b = await req.json() as { code: string; id: string };
      return Response.json({ parentKey: await this.hood.init(b.code, b.id) });
    }
    if (url.pathname === '/roster') return Response.json({ exists: this.hood.exists, roster: this.hood.exists ? this.hood.roster() : [] });
    if (!this.hood.exists || req.headers.get('Upgrade') !== 'websocket') return new Response('not found', { status: 404 });
    const pair = new (globalThis as any).WebSocketPair(); const [client, server] = Object.values(pair) as any[];
    // Non-hibernating accept(): the DO stays awake and in-memory conns stay valid. Hibernation (state.acceptWebSocket)
    // would drop those listeners on sleep, so it is not used here. The runtime does not answer a client close on its
    // own — until we close our side the browser stays in CLOSING and never fires onclose, so it never reconnects.
    server.accept();
    let finished = false;
    const legal = (code?: number) => (code && code >= 1000 && code <= 4999 && code !== 1004 && code !== 1005 && code !== 1006 && code !== 1015 ? code : 1000);
    const conn: Conn = { send: s => { try { server.send(s); } catch { /* peer already gone */ } }, close: (code, reason) => end(code, reason) };
    const ready = this.hood.onConnect(conn);
    const end = (code?: number, reason?: string) => {
      if (finished) return; finished = true;
      try { server.close(legal(code), (reason ?? '').slice(0, 120)); } catch { /* already closing */ }
      this.hood.onClose(conn); void this.hood.flush();
    };
    server.addEventListener('message', async (e: MessageEvent) => { await ready; if (typeof e.data === 'string' && e.data.length < 400_000) this.hood.onMessage(conn, e.data); });
    server.addEventListener('close', (e: CloseEvent) => end(e.code, e.reason));
    server.addEventListener('error', () => end(1011, 'error'));
    return new Response(null, { status: 101, webSocket: client } as any);
  }
}

export class CodeRegistryDO {
  private hits = new Map<string, number[]>();
  constructor(private state: any) {}
  private limited(key: string, max: number, win: number, count = true) {
    const now = Date.now(); const a = (this.hits.get(key) ?? []).filter(t => now - t < win);
    if (count) a.push(now); this.hits.set(key, a);
    if (this.hits.size > 5000) for (const [k, v] of this.hits) if (!v.some(t => now - t < 600_000)) this.hits.delete(k);
    return count ? a.length > max : a.length >= max;
  }
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url); const b: any = req.method === 'POST' ? await req.json() : {};
    const st = this.state.storage;
    switch (url.pathname) {
      case '/claim': {
        const code = normCode(b.code); if (!validInvite(code) || !validHoodId(String(b.id))) return Response.json({ ok: false });
        const cur = await st.get('c:' + code); if (cur && cur !== b.id) return Response.json({ ok: false });
        await st.put('c:' + code, b.id); return Response.json({ ok: true });
      }
      case '/release': { const code = normCode(b.code); if ((await st.get('c:' + code)) === b.id) await st.delete('c:' + code); return Response.json({ ok: true }); }
      case '/limit': return Response.json({ limited: this.limited(String(b.key), Number(b.max) || 5, Number(b.win) || 60_000) });
      case '/resolve': {
        // 20 lookups / 10 min and at most 8 wrong codes / 10 min, per IP
        const ip = String(b.ip ?? '');
        if (this.limited(ip + ':miss', 8, 600_000, false) || this.limited(ip + ':look', 20, 600_000)) return Response.json({ error: 'slow down' }, { status: 429 });
        const code = normCode(b.code); const id = validInvite(code) ? await st.get('c:' + code) : undefined;
        if (!id) this.limited(ip + ':miss', 99, 600_000);
        return Response.json({ id: id ?? null });
      }
    }
    return new Response('not found', { status: 404 });
  }
}
