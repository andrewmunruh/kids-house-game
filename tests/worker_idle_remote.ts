// Batch 4 idle-drop check against a DEPLOYED Worker (real Cloudflare runtime). Creates one throwaway street.
//   npx tsx tests/worker_idle_remote.ts https://cozy-hood-preview.andrewmunruh.workers.dev
// hb:1 client silent -> closed 4001 at ~40 s; pinging hb:1 client kept; old (no hb) client silent ~62 s never dropped.
import WebSocket from 'ws';
import { NICKNAMES, PROTOCOL } from '../src/shared/hood';
const BASE = process.argv[2]; const ORIGIN = 'https://andrewmunruh.github.io';
const WSB = BASE.replace(/^http/, 'ws');
const look = { skin: '#f1c27d', hair: '#3b2219', hairStyle: 0, shirt: '#ff7aa8', pants: '#5b8def', size: 'kid', acc: 0 };
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
let fails = 0;
const check = (n: string, ok: boolean, x = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + n, x); if (!ok) fails++; };
type Sock = { ws: WebSocket; inbox: any[]; closed?: { code: number; at: number }; lastTx: number; send(o: unknown): void };
const open = (id: string) => new Promise<Sock>((res, rej) => {
  const ws = new WebSocket(`${WSB}/ws/${id}`, { headers: { Origin: ORIGIN } });
  const s: Sock = { ws, inbox: [], lastTx: Date.now(), send(o) { s.lastTx = Date.now(); ws.send(JSON.stringify(o)); } };
  ws.on('message', d => { try { s.inbox.push(JSON.parse(d.toString())); } catch { /* */ } });
  ws.on('close', code => { s.closed = { code, at: Date.now() }; });
  ws.on('open', () => res(s)); ws.on('error', rej);
});
const until = async (s: Sock, p: (m: any) => boolean, ms = 15000) => { const t = Date.now(); while (Date.now() - t < ms) { const m = s.inbox.find(p); if (m) return m; await sleep(30); } throw new Error('timeout'); };
async function joinAs(id: string, nick: string, hb: boolean) {
  const s = await open(id); s.send({ t: 'join', nickname: nick, look, v: PROTOCOL, mail: 1, ...(hb ? { hb: 1 } : {}) });
  const j = await until(s, m => m.t === 'joined' || m.t === 'error'); if (j.t !== 'joined') throw new Error(JSON.stringify(j));
  return { s, w: await until(s, m => m.t === 'welcome') };
}
(async () => {
  const r = await fetch(`${BASE}/api/create`, { method: 'POST', headers: { Origin: ORIGIN } }); const hood = await r.json() as { id: string; code: string };
  console.log('STREET', hood.code, hood.id);
  const A = await joinAs(hood.id, NICKNAMES[0], true), O = await joinAs(hood.id, NICKNAMES[1], false), C = await joinAs(hood.id, NICKNAMES[2], true);
  check('welcome hb:1 to hb clients only', A.w.hb === 1 && C.w.hb === 1 && O.w.hb === undefined);
  O.s.send({ t: 'ping' });
  const t0 = Date.now(); const pinger = setInterval(() => C.s.send({ t: 'ping' }), 10_000);
  while (Date.now() - t0 < 62_000) await sleep(250);
  clearInterval(pinger); const pongs = C.s.inbox.filter(m => m.t === 'pong').length;
  const aDrop = A.s.closed ? (A.s.closed.at - A.s.lastTx) / 1000 : null;
  check('silent hb:1 client closed 4001 at ~40 s', A.s.closed?.code === 4001 && aDrop !== null && aDrop >= 40 && aDrop <= 47, `code=${A.s.closed?.code} after ${aDrop?.toFixed(1)} s`);
  check('pinging hb:1 client kept and answered', !C.s.closed && pongs >= 5, `pongs=${pongs}`);
  check('old client silent 62 s never dropped, no pong', !O.s.closed && !O.s.inbox.some(m => m.t === 'pong'), `closed=${JSON.stringify(O.s.closed)}`);
  C.s.ws.close(); O.s.ws.close();
  console.log(fails ? `REMOTE FAIL (${fails})` : 'REMOTE PASS'); setTimeout(() => process.exit(fails ? 1 : 0), 500);
})().catch(e => { console.error(e); process.exit(1); });
