// D-12 / MP-11 (Batch 9): house size budget test. Tooling only, no server change.
//   npx tsx tests/house_size_test.ts node   [--port N]
//   npx tsx tests/house_size_test.ts worker [--port N]   (wrangler dev --local, SQLite-backed Durable Object)
// Facts this pins down:
//  - server/core.ts stores each house as ONE value `house:<id>` and refuses edits past MAX_HOUSE_JSON
//    (400,000 chars) with nack 'toobig'. The DO class is in `new_sqlite_classes` (wrangler.toml), whose
//    per-value limit is far above the legacy KV-backed DO limit of 128 KiB (131,072 bytes).
//  - The biggest house a client can build through the protocol (7 rooms x 80 items, longest ids and kinds)
//    must survive a server restart. Its size is printed and compared with the 128 KiB legacy limit, so a
//    move to a KV-backed store would show up here first.
//  - node mode also stores a ~390 kB house straight on disk and reads it back after a restart.
import { spawn, type ChildProcess } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import WebSocket from 'ws';
import { NICKNAMES, PROTOCOL } from '../src/shared/hood';
import { initialState, ROOM_IDS } from '../src/shared/state';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mode = process.argv[2];
const pi = process.argv.indexOf('--port');
const port = pi > 0 ? Number(process.argv[pi + 1]) : (mode === 'worker' ? 8812 : 8811);
const LEGACY_DO_VALUE = 128 * 1024;
const MAX_HOUSE_JSON = 400_000;
const wkt = readFileSync(resolve(ROOT, 'wrangler.toml'), 'utf8');
const core = readFileSync(resolve(ROOT, 'server/core.ts'), 'utf8');

let fails = 0;
const check = (name: string, ok: boolean, extra = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + name, extra); if (!ok) { fails++; process.exitCode = 1; } };

type Sock = { ws: WebSocket; inbox: any[]; send: (o: unknown) => void };
const openSock = (id: string) => new Promise<Sock>((res, rej) => {
  const ws = new WebSocket(`ws://127.0.0.1:${port}/ws/${id}`); const inbox: any[] = [];
  ws.on('message', d => { try { inbox.push(JSON.parse(d.toString())); } catch { /* */ } });
  ws.on('open', () => res({ ws, inbox, send: o => ws.send(JSON.stringify(o)) })); ws.on('error', rej);
});
const until = async (s: Sock, pred: (m: any) => boolean, ms = 30000) => {
  const t = Date.now();
  while (Date.now() - t < ms) { const hit = s.inbox.find(pred); if (hit) return hit; await new Promise(r => setTimeout(r, 30)); }
  throw new Error('no message');
};
const health = async (ms: number) => {
  const t = Date.now();
  while (Date.now() - t < ms) { try { if ((await fetch(`http://127.0.0.1:${port}/api/health`)).ok) return; } catch { /* */ } await new Promise(r => setTimeout(r, 250)); }
  throw new Error('health timeout');
};
const start = (cmd: string[], env: NodeJS.ProcessEnv): ChildProcess => {
  const c = spawn(cmd[0], cmd.slice(1), { cwd: ROOT, env: { ...process.env, ...env }, detached: true, stdio: ['ignore', 'pipe', 'pipe'] });
  c.stdout?.on('data', () => {}); c.stderr?.on('data', () => {}); return c;
};
const stop = (c: ChildProcess | null) => { if (c?.pid) try { process.kill(-c.pid, 'SIGTERM'); } catch { /* */ } };

function biggestHouse() {
  const s: any = initialState();
  const pad = (p: string, n: number) => (p + '_' + 'x'.repeat(n)).slice(0, n);
  for (const r of ROOM_IDS) {
    s.rooms[r].items = Array.from({ length: 80 }, (_, i) => ({
      id: pad(`${r}-${i}`, 80), kind: pad('sofa', 100), x: 100 + i, y: 400, flip: false, z: i, scale: 1,
    }));
  }
  return s;
}
async function create() { const r = await fetch(`http://127.0.0.1:${port}/api/create`, { method: 'POST' }); if (!r.ok) throw new Error('create ' + r.status); return r.json() as Promise<{ id: string }>; }
const look = { skin: '#f1c27d', hair: '#3b2219', hairStyle: 0, shirt: '#ff7aa8', pants: '#5b8def', size: 'kid', acc: 0 };

async function joinWith(id: string, house: unknown) {
  const s = await openSock(id);
  s.send({ t: 'join', nickname: NICKNAMES[0], look, v: PROTOCOL, mail: 1, house });
  const j = await until(s, m => m.t === 'joined' || m.t === 'error');
  if (j.t !== 'joined') throw new Error('join ' + JSON.stringify(j));
  const w = await until(s, m => m.t === 'welcome');
  const hid = (w.houses as any[]).find(h => h.ownerId === j.pid).id as string;
  return { s, token: j.token as string, pid: j.pid as string, hid };
}
async function readBack(id: string, token: string, hid: string) {
  const s = await openSock(id);
  s.send({ t: 'hello', token, v: PROTOCOL, mail: 1 });
  const w = await until(s, m => m.t === 'welcome' || m.t === 'error');
  s.ws.close();
  if (w.t !== 'welcome') throw new Error('hello ' + JSON.stringify(w));
  return (w.houses as any[]).find(h => h.id === hid);
}
const itemCount = (st: any) => ROOM_IDS.reduce((n, r) => n + (st?.rooms?.[r]?.items?.length ?? 0), 0);

async function run() {
  check('wrangler.toml keeps the hood DO on new_sqlite_classes', /new_sqlite_classes/.test(wkt));
  check('server/core.ts still caps a house at 400,000 chars', /MAX_HOUSE_JSON\s*=\s*400_000/.test(core));
  const dir = `/tmp/house-size-${mode}-${port}`; rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
  const cmd = mode === 'worker'
    ? ['npx', '-y', 'node@22', 'node_modules/wrangler/bin/wrangler.js', 'dev', '--local', '--port', String(port), '--persist-to', dir, '--var', 'ALLOWED_ORIGIN:*']
    : ['npx', 'tsx', 'server/node.ts'];
  const env = mode === 'worker' ? {} : { PORT: String(port), HOOD_DATA: dir };
  const wait = mode === 'worker' ? 120000 : 30000;
  let child: ChildProcess | null = start(cmd, env);
  try {
    await health(wait);
    const hood = await create();
    const big = biggestHouse();
    const sent = JSON.stringify(big).length;
    const a = await joinWith(hood.id, big);
    await new Promise(r => setTimeout(r, 1500)); a.s.ws.close();
    stop(child); child = null; await new Promise(r => setTimeout(r, 1500));
    child = start(cmd, env); await health(wait);
    const h = await readBack(hood.id, a.token, a.hid);
    const size = JSON.stringify(h?.state ?? null).length;
    console.log(`biggest protocol house: sent ${sent} chars, stored ${size} chars, items ${itemCount(h?.state)}; legacy DO value limit ${LEGACY_DO_VALUE}, MAX_HOUSE_JSON ${MAX_HOUSE_JSON}`);
    check(`${mode} biggest protocol house (7x80 items) survives a restart`, itemCount(h?.state) === ROOM_IDS.length * 80, 'items=' + itemCount(h?.state));
    check(`${mode} biggest protocol house fits under MAX_HOUSE_JSON`, size > 0 && size < MAX_HOUSE_JSON, String(size));
    console.log(`note: biggest protocol house is ${size > LEGACY_DO_VALUE ? 'ABOVE' : 'below'} the legacy 128 KiB DO value limit (${(size / 1024).toFixed(1)} KiB)`);
    if (mode === 'node') {
      stop(child); child = null; await new Promise(r => setTimeout(r, 800));
      const file = `${dir}/${hood.id}.json`; const disk = JSON.parse(readFileSync(file, 'utf8'));
      const key = Object.keys(disk).find(k => k === 'house:' + a.hid)!;
      const extra = Array.from({ length: 1030 }, (_, i) => ({ id: ('pad-' + i + '_' + 'y'.repeat(80)).slice(0, 80), kind: ('lamp_' + 'z'.repeat(100)).slice(0, 100), x: 50, y: 300, flip: false, z: 0, scale: 1 }));
      disk[key].state.rooms.backyard.items.push(...extra);
      const onDisk = JSON.stringify(disk[key].state).length;
      writeFileSync(file, JSON.stringify(disk));
      child = start(cmd, env); await health(wait);
      const h2 = await readBack(hood.id, a.token, a.hid);
      const n2 = itemCount(h2?.state), size2 = JSON.stringify(h2?.state ?? null).length;
      console.log(`stored-on-disk house: ${onDisk} chars written, ${size2} chars read back, items ${n2}`);
      check('node a ~390 kB stored house reads back whole after a restart', onDisk >= 380_000 && onDisk < MAX_HOUSE_JSON && n2 === ROOM_IDS.length * 80 + 1030, `onDisk=${onDisk} items=${n2}`);
    }
  } finally { stop(child); }
  console.log(fails ? `${fails} failed` : 'all passed');
}
if (mode !== 'node' && mode !== 'worker') { console.error('use node or worker'); process.exit(2); }
run().catch(e => { console.log('FAIL harness ' + (e instanceof Error ? e.message : e)); process.exitCode = 1; });
