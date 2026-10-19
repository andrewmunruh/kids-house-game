// Raw websocket letters, on the node server and the worker.
//   npx tsx tests/raw_mail.ts node
//   npx tsx tests/raw_mail.ts worker
// Names, schools, addresses, phones, emails, and links used to be a strict block list. They must be delivered.
// The block list is the swear and slur forms in tests/filter_corpus.ts.
import { spawn, type ChildProcess } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import WebSocket from 'ws';
import { NICKNAMES, PROTOCOL } from '../src/shared/hood';
import { BLOCK_LINES } from './filter_corpus';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mode = process.argv[2];
function portOf(fallback: number): number {
  const flag = process.argv.indexOf('--port');
  const raw = flag >= 0 ? process.argv[flag + 1] : process.env.PORT;
  if (raw && /^\d+$/.test(raw)) return Number(raw);
  return fallback;
}

/** Lines the old letter rules refused. A kid can send these now. */
const OPEN_LINES = [
  'Ava Smith', 'Rachel', 'Michelle', 'Ethel',
  'I go to Lincoln Elementary', 'Lincoln School', 'Lincoln Academy', 'Lincoln Middle', 'Lincoln High',
  'see you at school', 'I live on Maple St', 'my house is on Maple street',
  "what's your address", 'whats ur last name', 'my address is 12 Oak Street',
  'call me 555 123 4567', 'call 12345', 'my number is 5',
  'my email is kid@example.com', 'write me at a@b.com', 'go to www.example.com', 'come see www.example.com',
];

const look = { skin: '#f1c27d', hair: '#3b2219', hairStyle: 0, shirt: '#ff7aa8', pants: '#5b8def', size: 'kid', acc: 0 };
let pass = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++; else process.exitCode = 1;
};

type Sock = { ws: WebSocket; inbox: any[]; send: (o: unknown) => void };
const openSock = (port: number, id: string) => new Promise<Sock>((resolveSock, reject) => {
  const ws = new WebSocket(`ws://127.0.0.1:${port}/ws/${id}`);
  const inbox: any[] = [];
  const sock: Sock = { ws, inbox, send: o => ws.send(JSON.stringify(o)) };
  ws.on('message', d => { try { inbox.push(JSON.parse(d.toString())); } catch { /* ignore */ } });
  ws.on('open', () => resolveSock(sock));
  ws.on('error', reject);
});
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
const until = async (sock: Sock, pred: (m: any) => boolean, ms = 8000) => {
  const start = Date.now();
  while (Date.now() - start < ms) {
    const hit = [...sock.inbox].reverse().find(pred);
    if (hit) return hit;
    await new Promise(r => setTimeout(r, 30));
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
  for (let attempt = 0; attempt < 4; attempt++) {
    const r = await fetch(`http://127.0.0.1:${port}/api/create`, { method: 'POST' });
    if (r.status === 429) {
      await new Promise(res => setTimeout(res, 61_000));
      continue;
    }
    if (!r.ok) throw new Error('create ' + r.status);
    return await r.json() as { code: string; id: string; parentKey: string };
  }
  throw new Error('create 429');
}
async function join(port: number, id: string, nickname: string) {
  const sock = await openSock(port, id);
  sock.send({ t: 'join', nickname, look, v: PROTOCOL, mail: 1 });
  const joined = await until(sock, m => m.t === 'joined' || m.t === 'error');
  if (joined.t !== 'joined') throw new Error('join ' + nickname + ' ' + JSON.stringify(joined));
  const welcome = await until(sock, m => m.t === 'welcome');
  const hid = (welcome.houses as any[]).find(h => h.ownerId === joined.pid).id as string;
  return { sock, pid: joined.pid as string, hid };
}

async function letters(port: number, label: string) {
  const bad: string[] = [];
  const hood = await createHood(port);
  const owner = await join(port, hood.id, NICKNAMES[0]);
  let blocks = 0;
  for (const text of BLOCK_LINES) {
    try {
      owner.sock.send({ t: 'mail', op: 'send', houseId: owner.hid, text, color: 0, sticker: 0 });
      const mail = await waitNew(owner.sock, m => m.t === 'mailFail');
      if (mail.reason === 'mail') blocks++;
      else bad.push('block ' + JSON.stringify(text) + ' ' + mail.reason);
    } catch (err) {
      bad.push('block ' + JSON.stringify(text) + ' ' + (err instanceof Error ? err.message : 'error'));
    }
  }

  const senders = [await join(port, hood.id, NICKNAMES[1])];
  const slots = Math.ceil(OPEN_LINES.length / 5);
  for (let i = 2; i < slots + 1 && i < 12; i++) senders.push(await join(port, hood.id, NICKNAMES[i]));
  let opens = 0;
  try {
    for (let i = 0; i < OPEN_LINES.length; i++) {
      const text = OPEN_LINES[i];
      const pal = senders[Math.floor(i / 5)];
      pal.sock.send({ t: 'mail', op: 'send', houseId: owner.hid, text, color: 0, sticker: 0 });
      const sentAt = pal.sock.inbox.length;
      let box: any;
      try {
        box = await waitNew(owner.sock, m => m.t === 'mailbox' && (m.mailbox?.letters ?? []).some((l: { text: string }) => l.text === text));
      } catch {
        const fail = pal.sock.inbox.slice(sentAt).find(m => m.t === 'mailFail');
        bad.push('open ' + JSON.stringify(text) + ' ' + (fail?.reason ?? 'missing'));
        continue;
      }
      opens++;
      const letter = (box.mailbox.letters as { id: string; text: string }[]).find(l => l.text === text)!;
      owner.sock.send({ t: 'mail', op: 'drop', houseId: owner.hid, id: letter.id });
      await waitNew(owner.sock, m => m.t === 'mailbox' && !(m.mailbox?.letters ?? []).some((l: { id: string }) => l.id === letter.id));
    }
  } finally {
    owner.sock.ws.close();
    for (const p of senders) p.sock.ws.close();
  }
  check(
    label + ' refuses ' + blocks + '/' + BLOCK_LINES.length + ' swears and delivers ' + opens + '/' + OPEN_LINES.length + ' names, schools, and addresses',
    bad.length === 0 && blocks === BLOCK_LINES.length && opens === OPEN_LINES.length,
    bad.slice(0, 6).join(' | '),
  );
}

async function nodeMode() {
  const port = portOf(8791);
  const data = '/tmp/raw-mail-node-' + port;
  mkdirSync(data, { recursive: true });
  const child = start(['npx', 'tsx', 'server/node.ts'], ROOT, { PORT: String(port), HOOD_DATA: data });
  try {
    await waitHealth(port, 20000);
    await letters(port, 'node');
  } finally { stop(child); }
}

async function workerMode() {
  const port = portOf(8792);
  const persist = '/tmp/raw-mail-worker-' + port;
  mkdirSync(persist, { recursive: true });
  const cmd = ['npx', '-y', 'node@22', 'node_modules/wrangler/bin/wrangler.js', 'dev', '--local', '--port', String(port), '--persist-to', persist, '--var', 'ALLOWED_ORIGIN:*'];
  const child = start(cmd, ROOT, {});
  try {
    await waitHealth(port, 90000);
    await letters(port, 'worker');
  } finally { stop(child); }
}

async function main() {
  if (mode === 'node') await nodeMode();
  else if (mode === 'worker') await workerMode();
  else { console.error('use node or worker'); process.exitCode = 1; return; }
  console.log(pass + ' passed');
  if (process.exitCode) process.exit(process.exitCode);
}
main().catch(err => { console.error(err); process.exit(1); });
