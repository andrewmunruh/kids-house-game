// Cloudflare Workers + Durable Objects adapter (free plan, SQLite-backed DOs). One Durable Object per neighborhood.
//   POST /api/create   GET /api/hood/:code   WS /ws/:code   (same API as server/node.ts)
// Nothing is logged; chat is relayed in memory only.
import { Neighborhood, randomCode, type KV, type Conn } from './core';
import { CODE_ALPHABET, CODE_LEN } from '../src/shared/hood';

interface Env { HOOD: any; ALLOWED_ORIGIN?: string }
const validCode = (c: string) => c.length === CODE_LEN && [...c].every(ch => CODE_ALPHABET.includes(ch));
const corsFor = (env: Env) => ({ 'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'content-type' });
const json = (env: Env, status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...corsFor(env) } });
const stub = (env: Env, code: string) => env.HOOD.get(env.HOOD.idFromName(code));

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsFor(env) });
    if (url.pathname === '/api/health') return json(env, 200, { ok: true });
    if (url.pathname === '/api/create' && req.method === 'POST') {
      for (let i = 0; i < 20; i++) {
        const code = randomCode(CODE_ALPHABET, CODE_LEN);
        const r = await stub(env, code).fetch('https://do/init', { method: 'POST', headers: { 'x-code': code } });
        if (r.status === 409) continue;
        const { parentKey } = await r.json() as { parentKey: string };
        return json(env, 200, { code, parentKey });
      }
      return json(env, 500, { error: 'no code' });
    }
    const m = url.pathname.match(/^\/api\/hood\/([A-Z0-9]+)$/);
    if (m) {
      if (!validCode(m[1])) return json(env, 200, { exists: false });
      const r = await stub(env, m[1]).fetch('https://do/exists'); return json(env, 200, await r.json());
    }
    const w = url.pathname.match(/^\/ws\/([A-Z0-9]+)$/);
    if (w && req.headers.get('Upgrade') === 'websocket') {
      if (!validCode(w[1])) return new Response('not found', { status: 404 });
      return stub(env, w[1]).fetch(req);
    }
    return json(env, 404, { error: 'not found' });
  },
};

export class HoodDO {
  hood: Neighborhood;
  constructor(state: any) {
    const st = state.storage;
    const kv: KV = { get: k => st.get(k), put: (k, v) => st.put(k, v), delete: async k => { await st.delete(k); } };
    this.hood = new Neighborhood(kv);
  }
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname === '/init') {
      await this.hood.load(); if (this.hood.exists) return new Response('exists', { status: 409 });
      const parentKey = await this.hood.init(req.headers.get('x-code') ?? '');
      return Response.json({ parentKey });
    }
    if (url.pathname === '/exists') { await this.hood.load(); return Response.json({ exists: this.hood.exists }); }
    await this.hood.load(); if (!this.hood.exists) return new Response('not found', { status: 404 });
    const pair = new (globalThis as any).WebSocketPair(); const [client, server] = Object.values(pair) as any[];
    server.accept();
    const conn: Conn = { send: s => { try { server.send(s); } catch {} }, close: (c, r) => { try { server.close(c ?? 1000, r ?? ''); } catch {} } };
    const ready = this.hood.onConnect(conn);
    server.addEventListener('message', async (e: MessageEvent) => { await ready; if (typeof e.data === 'string' && e.data.length < 400_000) this.hood.onMessage(conn, e.data); });
    const bye = () => { this.hood.onClose(conn); void this.hood.flush(); };
    server.addEventListener('close', bye); server.addEventListener('error', bye);
    return new Response(null, { status: 101, webSocket: client } as any);
  }
}
