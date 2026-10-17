// Local / any-Node-host adapter: HTTP + WebSocket on one port, JSON files for storage.
//   POST /api/create         -> { code, parentKey }
//   GET  /api/hood/:code     -> { exists }
//   WS   /ws/:code
import { createServer } from 'node:http';
import { mkdirSync, readFileSync, writeFileSync, existsSync, renameSync } from 'node:fs';
import { join } from 'node:path';
import { WebSocketServer, type WebSocket } from 'ws';
import { Neighborhood, randomCode, type KV, type Conn } from './core';
import { CODE_ALPHABET, CODE_LEN } from '../src/shared/hood';

const PORT = Number(process.env.PORT ?? 8787);
const DATA = process.env.HOOD_DATA ?? join(process.cwd(), 'server', 'data');
mkdirSync(DATA, { recursive: true });

function fileKV(code: string): KV {
  const file = join(DATA, code + '.json');
  let cache: Record<string, unknown> = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {};
  const persist = () => { const tmp = file + '.tmp'; writeFileSync(tmp, JSON.stringify(cache)); renameSync(tmp, file); };
  return {
    async get<T>(k: string) { return cache[k] as T | undefined; },
    async put(k, v) { cache[k] = v; persist(); },
    async delete(k) { delete cache[k]; persist(); },
  };
}
const hoods = new Map<string, Neighborhood>();
const hood = (code: string) => { let h = hoods.get(code); if (!h) { h = new Neighborhood(fileKV(code)); hoods.set(code, h); } return h; };
const validCode = (c: string) => c.length === CODE_LEN && [...c].every(ch => CODE_ALPHABET.includes(ch));
const exists = (c: string) => validCode(c) && (hoods.get(c)?.exists || existsSync(join(DATA, c + '.json')));

// tiny per-IP rate limit for creating neighborhoods / probing codes (kept in memory only)
const hits = new Map<string, number[]>();
const limited = (ip: string, max: number) => { const now = Date.now(); const a = (hits.get(ip) ?? []).filter(t => now - t < 60_000); a.push(now); hits.set(ip, a); return a.length > max; };

const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'content-type' };
const server = createServer(async (req, res) => {
  const ip = req.socket.remoteAddress ?? '';
  const url = new URL(req.url ?? '/', 'http://x');
  const json = (status: number, body: unknown) => { res.writeHead(status, { 'content-type': 'application/json', ...cors }); res.end(JSON.stringify(body)); };
  if (req.method === 'OPTIONS') { res.writeHead(204, cors); res.end(); return; }
  if (url.pathname === '/api/health') return json(200, { ok: true });
  if (url.pathname === '/api/create' && req.method === 'POST') {
    if (limited(ip, 5)) return json(429, { error: 'slow down' });
    for (let i = 0; i < 20; i++) {
      const code = randomCode(CODE_ALPHABET, CODE_LEN); if (exists(code)) continue;
      const parentKey = await hood(code).init(code); return json(200, { code, parentKey });
    }
    return json(500, { error: 'no code' });
  }
  const m = url.pathname.match(/^\/api\/hood\/([A-Z0-9]+)$/);
  if (m) { if (limited(ip, 30)) return json(429, { error: 'slow down' }); return json(200, { exists: exists(m[1]) }); }
  json(404, { error: 'not found' });
});

const wss = new WebSocketServer({ noServer: true, maxPayload: 400_000 });
server.on('upgrade', (req, socket, head) => {
  const m = (req.url ?? '').match(/^\/ws\/([A-Z0-9]+)/);
  const ip = req.socket.remoteAddress ?? '';
  if (!m || limited(ip + ':ws', 60) || !exists(m[1])) { socket.write('HTTP/1.1 404 Not Found\r\n\r\n'); socket.destroy(); return; }
  wss.handleUpgrade(req, socket, head, (ws: WebSocket) => {
    const h = hood(m[1]);
    const conn: Conn = { send: s => ws.readyState === ws.OPEN && ws.send(s), close: (code, reason) => ws.close(code, reason) };
    const ready = h.onConnect(conn);
    ws.on('message', async d => { await ready; h.onMessage(conn, d.toString()); });
    ws.on('close', () => h.onClose(conn));
    ws.on('error', () => {});
  });
});
server.listen(PORT, () => console.log(`neighborhood server on :${PORT}`)); // no request/chat logging by design
const shutdown = async () => { for (const h of hoods.values()) await h.flush(); process.exit(0); };
process.on('SIGINT', shutdown); process.on('SIGTERM', shutdown);
