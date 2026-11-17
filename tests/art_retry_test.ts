// Batch 12: withRetry (src/art/retry.ts). Run: npx vite-node tests/art_retry_test.ts
import { withRetry, importWithRetry, ART_RETRY_MS } from '../src/art/retry';
let pass = 0, fail = 0;
const check = (name: string, ok: boolean) => { if (ok) pass++; else fail++; console.log((ok ? 'PASS ' : 'FAIL ') + name); };
const fast = [20, 40, 80];

// 503 once, then fine
{
  let n = 0; const t0 = Date.now();
  const v = await withRetry(async () => { n++; if (n === 1) throw new Error('503'); return 'url'; }, fast);
  const dt = Date.now() - t0;
  check('503 then success: resolves with the value', v === 'url');
  check('503 then success: 2 tries', n === 2);
  check('503 then success: waited the first backoff (' + dt + ' ms)', dt >= 18 && dt < 400);
}
// two 503s, then fine
{
  let n = 0;
  const v = await withRetry(async () => { n++; if (n < 3) throw new Error('503'); return 7; }, fast);
  check('two 503s then success: 3 tries', v === 7 && n === 3);
}
// always failing
{
  let n = 0; const t0 = Date.now(); let err: unknown = null;
  try { await withRetry(async () => { n++; throw new Error('503 #' + n); }, fast); } catch (e) { err = e; }
  const dt = Date.now() - t0;
  check('permanent failure: rejects', err instanceof Error);
  check('permanent failure: rejects with the last error', err instanceof Error && err.message === '503 #4');
  check('permanent failure: 1 try + 3 retries, no more', n === 4);
  check('permanent failure: waits add up (' + dt + ' ms >= 140)', dt >= 135);
}
// success first time: no wait
{
  let n = 0; const t0 = Date.now();
  await withRetry(async () => { n++; return 1; }, [5000]);
  check('first-try success: 1 try, no wait', n === 1 && Date.now() - t0 < 100);
}
check('default backoff grows and stays under 10 s in total', ART_RETRY_MS.length === 3 && ART_RETRY_MS[0] === 600 && ART_RETRY_MS[1] === 1800 && ART_RETRY_MS[2] === 4500 && ART_RETRY_MS.reduce((a, b) => a + b, 0) < 10000);

{
  let n = 0;
  const v = await importWithRetry(async () => { n++; if (n === 1) throw new Error('503'); return 'mod'; }, fast);
  check('importWithRetry 503 once: resolves', v === 'mod' && n === 2);
}
{
  let n = 0; let err: unknown = null;
  try { await importWithRetry(async () => { n++; throw new Error('gone'); }, fast); } catch (e) { err = e; }
  check('importWithRetry always-503: 1 try + 3 retries, then rejects', n === 4 && err instanceof Error);
}

console.log(`ART_RETRY: ${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
