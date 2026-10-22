// Local / any-Node-host adapter: HTTP + WebSocket on one port, JSON files for storage.
//   POST /api/create         -> { code, parentKey }
//   GET  /api/hood/:code     -> { exists }
//   WS   /ws/:code
import { createServer } from 'node:http';
import { mkdirSync, readFileSync, writeFileSync, existsSync, renameSync } from 'node:fs';
import { join } from 'node:path';
import { WebSocketServer, type WebSocket } from 'ws';
import { Neighborhood, randomCode, randomToken, type KV, type Conn, type CodeRegistry } from './core';
import { CODE_ALPHABET, CODE_LEN, normCode, validInvite, validHoodId } from '../src/shared/hood';

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
// invite code -> permanent street id (codes can be changed by the grown-up; ids never change)
const REG_FILE = join(DATA, '_codes.json');
const codes: Record<string, string> = existsSync(REG_FILE) ? JSON.parse(readFileSync(REG_FILE, 'utf8')) : {};
const saveCodes = () => { writeFileSync(REG_FILE + '.tmp', JSON.stringify(codes)); renameSync(REG_FILE + '.tmp', REG_FILE); };
const registry: CodeRegistry = {
  async claim(code, id) { if (codes[code] && codes[code] !== id) return false; codes[code] = id; saveCodes(); return true; },
  async release(code, id) { if (codes[code] === id) { delete codes[code]; saveCodes(); } },
};
const hoods = new Map<string, Neighborhood>();
const hood = (id: string) => { let h = hoods.get(id); if (!h) { h = new Neighborhood(fileKV(id), { registry }); hoods.set(id, h); } return h; };
const existsId = (id: string) => validHoodId(id) && (hoods.get(id)?.exists || existsSync(join(DATA, id + '.json')));

// per-IP limits (memory only): code lookups are throttled hard so invite codes can't be guessed
const hits = new Map<string, number[]>();
const limited = (key: string, max: number, windowMs = 60_000) => { const now = Date.now(); const a = (hits.get(key) ?? []).filter(t => now - t < windowMs); a.push(now); hits.set(key, a); return a.length > max; };
const peek = (key: string, max: number, windowMs: number) => (hits.get(key) ?? []).filter(t => Date.now() - t < windowMs).length >= max;

const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'content-type' };
const server = createServer(async (req, res) => {
  const ip = req.socket.remoteAddress ?? '';
  const url = new URL(req.url ?? '/', 'http://x');
  const json = (status: number, body: unknown) => { res.writeHead(status, { 'content-type': 'application/json', ...cors }); res.end(JSON.stringify(body)); };
  if (req.method === 'OPTIONS') { res.writeHead(204, cors); res.end(); return; }
  if (url.pathname === '/api/health') return json(200, { ok: true });
  if (url.pathname === '/api/create' && req.method === 'POST') {
    if (limited(ip + ':create', 5)) return json(429, { error: 'slow down' });
    const id = randomToken(8);
    for (let i = 0; i < 20; i++) {
      const code = randomCode(CODE_ALPHABET, CODE_LEN); if (!(await registry.claim(code, id))) continue;
      const parentKey = await hood(id).init(code, id); return json(200, { code, id, parentKey });
    }
    return json(500, { error: 'no code' });
  }
  const m = url.pathname.match(/^\/api\/hood\/([^/]+)$/);
  if (m) {
    // Wrong codes: 8 per 10 min, then more guesses are refused. A real code still opens
    // the street, so one device's typos don't lock the rest of the family out.
    // Real lookups: 120 per 10 min per IP. Still far too slow to guess a 6-letter code.
    const code = normCode(decodeURIComponent(m[1])); const id = validInvite(code) ? codes[code] : undefined;
    if (!id || !existsId(id)) {
      if (peek(ip + ':miss', 8, 600_000)) return json(429, { error: 'slow down' });
      limited(ip + ':miss', 99, 600_000); return json(200, { exists: false });
    }
    if (limited(ip + ':look', 120, 600_000)) return json(429, { error: 'slow down' });
    const h = hood(id); await h.load();
    return json(200, { exists: true, id, roster: h.roster() });
  }
  json(404, { error: 'not found' });
});

const wss = new WebSocketServer({ noServer: true, maxPayload: 400_000 });
server.on('upgrade', (req, socket, head) => {
  const m = (req.url ?? '').match(/^\/ws\/([A-Za-z0-9]+)/);
  const ip = req.socket.remoteAddress ?? '';
  if (!m || limited(ip + ':ws', 60) || !existsId(m[1])) { socket.write('HTTP/1.1 404 Not Found\r\n\r\n'); socket.destroy(); return; }
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
