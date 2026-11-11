// Batch 4 idle-drop smoke in the REAL Workers runtime (wrangler dev --local = workerd). Local only, nothing is deployed.
//   npx tsx tests/worker_idle_smoke.ts [--port 8794] [--external]   (--external: a worker:dev already listens on --port)
// Part 1 (Node, in-process): the sweep interval is armed by an hb:1 hello and cleared once no hb:1 socket is left.
// Part 2 (workerd): an hb:1 client that goes silent is closed 4001 at ~40 s; a pinging hb:1 client stays;
//   an old client (no hb) silent for 60 s is never dropped and never sees pong/hb; after the last hb client
//   leaves, a fresh hb:1 client is again dropped at ~40 s (timer re-armed, not left running or stuck).
import { spawn, type ChildProcess } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join as pjoin, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import WebSocket from 'ws';
import { NICKNAMES, PROTOCOL } from '../src/shared/hood';
import { Neighborhood, IDLE_MS, type Conn, type KV } from '../server/core';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (f: string) => { const i = process.argv.indexOf(f); return i >= 0 ? process.argv[i + 1] : undefined; };
const PORT = Number(arg('--port') ?? 8794), EXTERNAL = process.argv.includes('--external');
const look = { skin: '#f1c27d', hair: '#3b2219', hairStyle: 0, shirt: '#ff7aa8', pants: '#5b8def', size: 'kid', acc: 0 };
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
let fails = 0;
const check = (name: string, ok: boolean, extra = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + name, extra); if (!ok) { fails++; process.exitCode = 1; } };

async function part1() {
  const mem = new Map<string, unknown>();
  const kv: KV = { async get<T>(k: string) { return mem.get(k) as T | undefined; }, async put(k, v) { mem.set(k, v); }, async delete(k) { mem.delete(k); } };
  const h = new Neighborhood(kv); await h.init('ABCDEF', 'smoke1');
  const mk = (): Conn & { out: any[]; closed?: number } => { const c: any = { out: [], send(s: string) { c.out.push(JSON.parse(s)); }, close(code?: number) { c.closed = code; } }; return c; };
  const old = mk(); await h.onConnect(old); await h.onMessage(old, JSON.stringify({ t: 'join', nickname: NICKNAMES[0], look, v: PROTOCOL }));
  check('node: old client join does not arm the sweep', (h as any).idleT === null || (h as any).idleT === undefined);
  const a = mk(); await h.onConnect(a); await h.onMessage(a, JSON.stringify({ t: 'join', nickname: NICKNAMES[1], look, v: PROTOCOL, hb: 1 }));
  check('node: hb:1 join arms the sweep', !!(h as any).idleT);
  h.onClose(a); h.sweepIdle();
  check('node: sweep cleared after the last hb:1 socket left (old client still connected)', !(h as any).idleT);
  const b = mk(); await h.onConnect(b); await h.onMessage(b, JSON.stringify({ t: 'join', nickname: NICKNAMES[2], look, v: PROTOCOL, hb: 1 }));
  h.sweepIdle(Date.now() + IDLE_MS + 1);
  check('node: silent hb:1 closed 4001 and sweep cleared; old client untouched', b.closed === 4001 && !(h as any).idleT && old.closed === undefined, `b.closed=${b.closed} old.closed=${old.closed}`);
}

type Sock = { ws: WebSocket; inbox: any[]; closed?: { code: number; at: number }; lastTx: number; send(o: unknown): void };
const open = (id: string) => new Promise<Sock>((res, rej) => {
  const ws = new WebSocket(`ws://127.0.0.1:${PORT}/ws/${id}`);
  const s: Sock = { ws, inbox: [], lastTx: Date.now(), send(o) { s.lastTx = Date.now(); ws.send(JSON.stringify(o)); } };
  ws.on('message', d => { try { s.inbox.push(JSON.parse(d.toString())); } catch { /* */ } });
  ws.on('close', code => { s.closed = { code, at: Date.now() }; });
  ws.on('open', () => res(s)); ws.on('error', rej);
});
const until = async (s: Sock, p: (m: any) => boolean, ms = 10000) => { const t = Date.now(); while (Date.now() - t < ms) { const m = s.inbox.find(p); if (m) return m; await sleep(30); } throw new Error('timeout'); };
async function joinAs(id: string, nick: string, hb: boolean) {
  const s = await open(id); s.send({ t: 'join', nickname: nick, look, v: PROTOCOL, mail: 1, ...(hb ? { hb: 1 } : {}) });
  const j = await until(s, m => m.t === 'joined' || m.t === 'error'); if (j.t !== 'joined') throw new Error(JSON.stringify(j));
  const w = await until(s, m => m.t === 'welcome'); return { s, w };
}
async function waitHealth(ms = 120000) { const t = Date.now(); while (Date.now() - t < ms) { try { if ((await fetch(`http://127.0.0.1:${PORT}/api/health`)).ok) return; } catch { /* */ } await sleep(300); } throw new Error('health timeout'); }

async function part2() {
  let child: ChildProcess | null = null;
  if (!EXTERNAL) {
    const persist = mkdtempSync(pjoin(tmpdir(), 'b4-idle-'));
    child = spawn('npx', ['-y', 'node@22', 'node_modules/wrangler/bin/wrangler.js', 'dev', '--local', '--port', String(PORT), '--persist-to', persist, '--var', 'ALLOWED_ORIGIN:*'], { cwd: ROOT, detached: true, stdio: ['ignore', 'pipe', 'pipe'] });
    let log = ''; child.stdout?.on('data', d => { log += d; }); child.stderr?.on('data', d => { log += d; });
    process.on('exit', () => { if (log.match(/error|exception/i)) console.log('--- wrangler log (errors seen) ---\n' + log.slice(-3000)); });
  }
  try {
    await waitHealth();
    const r = await fetch(`http://127.0.0.1:${PORT}/api/create`, { method: 'POST' }); const hood = await r.json() as { id: string };
    const A = await joinAs(hood.id, NICKNAMES[0], true), O = await joinAs(hood.id, NICKNAMES[1], false), C = await joinAs(hood.id, NICKNAMES[2], true);
    check('workerd: welcome says hb:1 to hb clients only', A.w.hb === 1 && C.w.hb === 1 && O.w.hb === undefined);
    O.s.send({ t: 'ping' }); // old clients never ping; even if one did it gets nothing
    const t0 = Date.now(); let pongs = 0;
    const pinger = setInterval(() => C.s.send({ t: 'ping' }), 10_000);
    while (Date.now() - t0 < 62_000) { await sleep(250); }
    clearInterval(pinger); pongs = C.s.inbox.filter(m => m.t === 'pong').length;
    const aDrop = A.s.closed ? (A.s.closed.at - A.s.lastTx) / 1000 : null;
    check('workerd: silent hb:1 client closed 4001 at ~40 s', A.s.closed?.code === 4001 && aDrop !== null && aDrop >= 40 && aDrop <= 47, `code=${A.s.closed?.code} after ${aDrop?.toFixed(1)} s of silence`);
    check('workerd: pinging hb:1 client kept open and answered', !C.s.closed && pongs >= 5, `pongs=${pongs}`);
    check('workerd: old client silent 62 s never dropped, no pong/hb', !O.s.closed && !O.s.inbox.some(m => m.t === 'pong'), `closed=${JSON.stringify(O.s.closed)}`);
    // last hb client leaves -> timer must stop; then a new hb client must be swept again (re-armed cleanly)
    C.s.ws.close(); await sleep(12_000);
    check('workerd: old client still connected after last hb client left', !O.s.closed);
    const D = await joinAs(hood.id, NICKNAMES[3], true); const t1 = Date.now();
    while (!D.s.closed && Date.now() - t1 < 55_000) await sleep(250);
    const dDrop = D.s.closed ? (D.s.closed.at - D.s.lastTx) / 1000 : null;
    check('workerd: after re-arm, a new silent hb:1 client is closed 4001 at ~40 s', D.s.closed?.code === 4001 && dDrop !== null && dDrop >= 40 && dDrop <= 47, `code=${D.s.closed?.code} after ${dDrop?.toFixed(1)} s`);
    check('workerd: old client never dropped over the whole run', !O.s.closed, `${((Date.now() - t0) / 1000).toFixed(0)} s total`);
    O.s.ws.close();
  } finally { if (child?.pid) { try { process.kill(-child.pid, 'SIGTERM'); } catch { /* gone */ } } }
}

(async () => { await part1(); await part2(); console.log(fails ? `SMOKE FAIL (${fails})` : 'SMOKE PASS'); setTimeout(() => process.exit(process.exitCode ?? 0), 500); })().catch(e => { console.error(e); process.exit(1); });
