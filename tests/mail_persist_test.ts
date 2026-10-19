// Send about 30 ordinary letters, restart the hood, and read them back.
//   npx tsx tests/mail_persist_test.ts node
//   npx tsx tests/mail_persist_test.ts worker
//   npx tsx tests/mail_persist_test.ts b0
//   PORT=8800 npx tsx tests/mail_persist_test.ts node
//   npx tsx tests/mail_persist_test.ts worker --port 8801
// The repo root is the directory above this file, so the script works from any cwd.
// node and worker use this build. b0 writes a mailbox with the fbd04db server, then this build reloads it.
// B0_TREE overrides the old checkout (default /tmp/b0tree).
import { spawn, type ChildProcess } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import WebSocket from 'ws';
import { NICKNAMES, PROTOCOL } from '../src/shared/hood';
import { KID_OK, LEAKS } from './filter_lines';

const require = createRequire(import.meta.url);
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const B0 = process.env.B0_TREE || '/tmp/b0tree';
const mode = process.argv[2];
function portOf(fallback: number): number {
  const flag = process.argv.indexOf('--port');
  const raw = flag >= 0 ? process.argv[flag + 1] : process.env.PORT;
  if (raw && /^\d+$/.test(raw)) return Number(raw);
  return fallback;
}
const SURVIVE = [
  'fat', 'ugly sweater day', 'my cat is fat', 'fat cat', 'ugly duckling', 'the fat pony is cute',
  "Hell's Kitchen is a show", 'go to hell', 'add me on fortnite', 'loser', 'shut up', 'go away',
  'I live on Maple St', 'my number is 5', 'Rachel', 'Michelle', 'Ethel', 'the lamp is pretty',
  'silly', 'dummy', 'meanie', 'stinky', 'you are silly', 'damn', 'see you at school',
  'my favorite number is seven', 'Come see my Ring Light!', 'roblox user Jane2016', 'Ava Smith', 'call 12345',
];
const SWEARS = ['f*ck', 'nigger', 'shit'];
const look = { skin: '#f1c27d', hair: '#3b2219', hairStyle: 0, shirt: '#ff7aa8', pants: '#5b8def', size: 'kid', acc: 0 };

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++; else process.exitCode = 1;
};

type Sock = { ws: WebSocket; inbox: any[]; send: (o: unknown) => void };
const openSock = (port: number, id: string) => new Promise<Sock>((resolve, reject) => {
  const ws = new WebSocket(`ws://127.0.0.1:${port}/ws/${id}`);
  const inbox: any[] = [];
  const sock: Sock = { ws, inbox, send: o => ws.send(JSON.stringify(o)) };
  ws.on('message', d => { try { inbox.push(JSON.parse(d.toString())); } catch { /* ignore */ } });
  ws.on('open', () => resolve(sock));
  ws.on('error', reject);
});
const until = async (sock: Sock, pred: (m: any) => boolean, ms = 8000) => {
  const start = Date.now();
  while (Date.now() - start < ms) {
    const hit = [...sock.inbox].reverse().find(pred);
    if (hit) return hit;
    await new Promise(r => setTimeout(r, 30));
  }
  throw new Error('no message');
};
const waitNew = async (sock: Sock, pred: (m: any) => boolean, ms = 8000) => {
  const from = sock.inbox.length;
  const start = Date.now();
  while (Date.now() - start < ms) {
    const hit = sock.inbox.slice(from).find(pred);
    if (hit) return hit;
    await new Promise(r => setTimeout(r, 20));
  }
  throw new Error('no message');
};
const waitHealth = async (port: number, ms = 60000) => {
  const start = Date.now();
  while (Date.now() - start < ms) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/api/health`);
      if (r.ok) return;
    } catch { /* not up yet */ }
    await new Promise(r => setTimeout(r, 200));
  }
  throw new Error('health timeout ' + port);
};
function start(cmd: string[], cwd: string, env: NodeJS.ProcessEnv): ChildProcess {
  const child = spawn(cmd[0], cmd.slice(1), { cwd, env: { ...process.env, ...env }, detached: true, stdio: ['ignore', 'pipe', 'pipe'] });
  child.stdout?.on('data', () => {});
  child.stderr?.on('data', () => {});
  return child;
}
function stop(child: ChildProcess | null) {
  if (!child?.pid) return;
  try { process.kill(-child.pid, 'SIGTERM'); } catch { /* already gone */ }
}

async function createHood(port: number) {
  const r = await fetch(`http://127.0.0.1:${port}/api/create`, { method: 'POST' });
  if (!r.ok) throw new Error('create ' + r.status);
  return await r.json() as { code: string; id: string; parentKey: string };
}
async function join(port: number, id: string, nickname: string) {
  const sock = await openSock(port, id);
  sock.send({ t: 'join', nickname, look, v: PROTOCOL, mail: 1 });
  const joined = await until(sock, m => m.t === 'joined' || m.t === 'error');
  if (joined.t !== 'joined') throw new Error('join ' + nickname + ' ' + JSON.stringify(joined));
  const welcome = await until(sock, m => m.t === 'welcome');
  const hid = (welcome.houses as any[]).find(h => h.ownerId === joined.pid).id as string;
  return { sock, pid: joined.pid as string, token: joined.token as string, hid };
}

const ALLOW_PER_HOOD = 12 * 5;

async function checkLines(port: number, lines: string[], bad: string[]) {
  const hood = await createHood(port);
  const owner = await join(port, hood.id, NICKNAMES[0]);
  const pals = [];
  const slots = Math.ceil(lines.length / 5);
  for (let i = 1; i < slots && i < 12; i++) pals.push(await join(port, hood.id, NICKNAMES[i]));
  const senders = [owner, ...pals];
  try {
    for (let i = 0; i < lines.length; i++) {
      const text = lines[i];
      const pal = senders[Math.floor(i / 5)];
      pal.sock.send({ t: 'say', b: { kind: 'text', v: text } });
      const say = await waitNew(pal.sock, m => m.t === 'sayFail');
      if (say.reason !== 'nowhere') bad.push('say ' + text + ' ' + say.reason);
      pal.sock.send({ t: 'mail', op: 'send', houseId: owner.hid, text, color: 0, sticker: 0 });
      const sentAt = pal.sock.inbox.length;
      let box: any;
      try {
        box = await waitNew(owner.sock, m => m.t === 'mailbox' && (m.mailbox?.letters ?? []).some((l: { text: string }) => l.text === text));
      } catch {
        const fail = pal.sock.inbox.slice(sentAt).find(m => m.t === 'mailFail');
        bad.push('mail ' + text + ' ' + (fail?.reason ?? 'missing'));
        continue;
      }
      const letter = (box.mailbox.letters as { id: string; text: string }[]).find(l => l.text === text)!;
      owner.sock.send({ t: 'mail', op: 'drop', houseId: owner.hid, id: letter.id });
      await waitNew(owner.sock, m => m.t === 'mailbox' && !(m.mailbox?.letters ?? []).some((l: { id: string }) => l.id === letter.id));
    }
  } finally {
    for (const p of senders) p.sock.ws.close();
  }
}

async function gate(port: number, label: string) {
  const hood = await createHood(port);
  const owner = await join(port, hood.id, NICKNAMES[0]);
  const bad: string[] = [];
  try {
    for (const text of LEAKS) {
      owner.sock.send({ t: 'say', b: { kind: 'text', v: text } });
      const say = await waitNew(owner.sock, m => m.t === 'sayFail');
      if (say.reason !== 'words') bad.push('say ' + text + ' ' + say.reason);
      owner.sock.send({ t: 'mail', op: 'send', houseId: owner.hid, text, color: 0, sticker: 0 });
      const mail = await waitNew(owner.sock, m => m.t === 'mailFail');
      if (mail.reason !== 'mail') bad.push('mail ' + text + ' ' + mail.reason);
    }
  } finally { owner.sock.ws.close(); }
  for (let i = 0; i < KID_OK.length; i += ALLOW_PER_HOOD) await checkLines(port, KID_OK.slice(i, i + ALLOW_PER_HOOD), bad);
  check(label + ' blocks every leak and accepts every ordinary line', bad.length === 0 && KID_OK.length >= 40, bad.slice(0, 8).join(' | '));
}

async function roundTrip(port: number, label: string) {
  const hood = await createHood(port);
  const owner = await join(port, hood.id, NICKNAMES[0]);
  const pals = [];
  for (let i = 0; i < 10; i++) pals.push(await join(port, hood.id, NICKNAMES[i + 1]));
  for (let i = 0; i < pals.length; i++) {
    for (const text of SURVIVE.slice(i * 3, i * 3 + 3)) {
      pals[i].sock.send({ t: 'mail', op: 'send', houseId: owner.hid, text, color: i % 5, sticker: 0 });
    }
  }
  const box = await until(owner.sock, m => m.t === 'mailbox' && (m.mailbox?.letters?.length ?? 0) >= SURVIVE.length);
  for (const text of SWEARS) pals[0].sock.send({ t: 'mail', op: 'send', houseId: owner.hid, text, color: 0, sticker: 0 });
  await until(pals[0].sock, m => m.t === 'mailFail' && m.reason === 'mail');
  await new Promise(r => setTimeout(r, 1000));
  const fails = pals[0].sock.inbox.filter(m => m.t === 'mailFail' && m.reason === 'mail').length;
  const sent = (box.mailbox.letters as { text: string }[]).map(l => l.text);
  const missing = SURVIVE.filter(t => !sent.includes(t));
  check(label + ' accepted the ordinary letters and refused the swears', missing.length === 0 && fails >= SWEARS.length && !SWEARS.some(t => sent.includes(t)), missing.join(' | ') + ' fails=' + fails);
  for (const p of [owner, ...pals]) p.sock.ws.close();
  return { hood, owner, sent };
}

async function readBack(port: number, id: string, token: string, pid: string, hid: string) {
  const sock = await openSock(port, id);
  sock.send({ t: 'hello', token, v: PROTOCOL, mail: 1 });
  const welcome = await until(sock, m => m.t === 'welcome' || m.t === 'error');
  if (welcome.t !== 'welcome') throw new Error('hello ' + JSON.stringify(welcome));
  const house = (welcome.houses as any[]).find(h => h.id === hid || h.ownerId === pid);
  const texts = (house?.state?.mailbox?.letters ?? []).map((l: { text: string }) => l.text) as string[];
  sock.ws.close();
  return texts;
}

async function nodeMode() {
  const port = portOf(8791);
  const data = '/tmp/mail-persist-node-' + port;
  mkdirSync(data, { recursive: true });
  const cmd = ['npx', 'tsx', 'server/node.ts'];
  let child = start(cmd, ROOT, { PORT: String(port), HOOD_DATA: data });
  try {
    await waitHealth(port, 20000);
    await gate(port, 'node');
    const trip = await roundTrip(port, 'node');
    stop(child); child = null;
    await new Promise(r => setTimeout(r, 400));
    child = start(cmd, ROOT, { PORT: String(port), HOOD_DATA: data });
    await waitHealth(port, 20000);
    const texts = await readBack(port, trip.hood.id, trip.owner.token, trip.owner.pid, trip.owner.hid);
    const missing = SURVIVE.filter(t => !texts.includes(t));
    check('node reload still has every ordinary letter', missing.length === 0 && !SWEARS.some(t => texts.includes(t)), missing.join(' | ') + ' n=' + texts.length);
  } finally { stop(child); }
}

async function workerMode() {
  const port = portOf(8792);
  const persist = '/tmp/mail-persist-worker-' + port;
  mkdirSync(persist, { recursive: true });
  const cmd = ['npx', '-y', 'node@22', 'node_modules/wrangler/bin/wrangler.js', 'dev', '--local', '--port', String(port), '--persist-to', persist, '--var', 'ALLOWED_ORIGIN:*'];
  let child = start(cmd, ROOT, {});
  try {
    await waitHealth(port, 90000);
    await gate(port, 'worker');
    const trip = await roundTrip(port, 'worker');
    stop(child); child = null;
    await new Promise(r => setTimeout(r, 800));
    child = start(cmd, ROOT, {});
    await waitHealth(port, 90000);
    const texts = await readBack(port, trip.hood.id, trip.owner.token, trip.owner.pid, trip.owner.hid);
    const missing = SURVIVE.filter(t => !texts.includes(t));
    check('worker reload still has every ordinary letter', missing.length === 0 && !SWEARS.some(t => texts.includes(t)), missing.join(' | ') + ' n=' + texts.length);
  } finally { stop(child); }
}

async function b0Mode() {
  const port = portOf(8793);
  const data = '/tmp/mail-persist-b0-' + port;
  mkdirSync(data, { recursive: true });
  const b0cmd = [require.resolve('tsx/cli'), 'server/node.ts'];
  let child = start(b0cmd, B0, { PORT: String(port), HOOD_DATA: data });
  const kept = ['Come play in the yard!', 'the lamp is pretty', 'Ethel', 'go to hell'];
  try {
    await waitHealth(port, 20000);
    const hood = await createHood(port);
    const owner = await join(port, hood.id, NICKNAMES[0]);
    const pal = await join(port, hood.id, NICKNAMES[1]);
    const pal2 = await join(port, hood.id, NICKNAMES[2]);
    for (const text of kept.slice(0, 3)) pal.sock.send({ t: 'mail', op: 'send', houseId: owner.hid, text, color: 0, sticker: 0 });
    pal2.sock.send({ t: 'mail', op: 'send', houseId: owner.hid, text: kept[3], color: 1, sticker: 0 });
    await until(owner.sock, m => m.t === 'mailbox' && (m.mailbox?.letters?.length ?? 0) >= kept.length);
    await new Promise(r => setTimeout(r, 1000));
    owner.sock.ws.close(); pal.sock.ws.close(); pal2.sock.ws.close();
    stop(child); child = null;
    await new Promise(r => setTimeout(r, 400));
    const file = data + '/' + hood.id + '.json';
    const disk = JSON.parse(readFileSync(file, 'utf8'));
    const key = Object.keys(disk).find(k => k.startsWith('house:') && disk[k]?.id === owner.hid);
    if (!key) throw new Error('house missing in ' + file);
    const extra = [
      { id: 'moldfck01', from: 'Quinn', fromPid: 'poldkid0001', text: 'f*ck', color: 0, sticker: 0, at: Date.now() },
      { id: 'moldfat001', from: 'Rachel', fromPid: 'poldkid0002', text: 'my cat is fat', color: 1, sticker: 0, at: Date.now() },
      { id: 'moldhell01', from: 'Ethel', fromPid: 'poldkid0003', text: "Hell's Kitchen is a show", color: 2, sticker: 0, at: Date.now() },
      { id: 'moldlose1', from: 'Michelle', fromPid: 'poldkid0004', text: 'loser', color: 3, sticker: 0, at: Date.now() },
      { id: 'moldfuck1', from: 'Quinn', fromPid: 'poldkid0001', text: 'fuck', color: 0, sticker: 0, at: Date.now() },
    ];
    disk[key].state.mailbox.letters.push(...extra);
    writeFileSync(file, JSON.stringify(disk));
    child = start(['npx', 'tsx', 'server/node.ts'], ROOT, { PORT: String(port), HOOD_DATA: data });
    await waitHealth(port, 20000);
    const texts = await readBack(port, hood.id, owner.token, owner.pid, owner.hid);
    const want = [...kept, 'f*ck', 'my cat is fat', "Hell's Kitchen is a show", 'loser'];
    const missing = want.filter(t => !texts.includes(t));
    check('fbd04db letters survive on this server', missing.length === 0 && !texts.includes('fuck'), missing.join(' | ') + ' got=' + texts.join('|'));
  } finally { stop(child); }
}

async function main() {
  if (mode === 'node') await nodeMode();
  else if (mode === 'worker') await workerMode();
  else if (mode === 'b0') await b0Mode();
  else { console.error('use node, worker, or b0'); process.exitCode = 1; return; }
  console.log(pass + ' passed');
  if (process.exitCode) process.exit(process.exitCode);
}
main().catch(err => { console.error(err); process.exit(1); });
