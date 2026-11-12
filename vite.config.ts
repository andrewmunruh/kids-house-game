import { defineConfig, type Plugin } from 'vite';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

// One id per build. It names the service worker's app cache and lets an open tab tell that a
// newer build has taken over ("New stuff! Tap to refresh").
// It must be REPRODUCIBLE: scripts/guarded-deploy.sh builds every deploy twice and refuses unless the two builds
// are byte-identical, so the id never comes from the clock. Sources, first match wins:
//   COZY_BUILD         explicit id (local test fixtures that need two different builds of one commit)
//   SOURCE_DATE_EPOCH  reproducible-builds convention (integer seconds) -> 'e' + base36
//   git rev-parse --short=12 HEAD of this checkout (works in the guard's git worktree; env -i keeps PATH and HOME)
// A real build (vite build) with none of these fails loudly. Only the dev server falls back to 'dev'.
function buildId(command: string): string {
  const explicit = process.env.COZY_BUILD;
  if (explicit) {
    if (!/^[A-Za-z0-9._-]{1,40}$/.test(explicit)) throw new Error(`COZY_BUILD must be 1-40 of A-Z a-z 0-9 . _ - (got '${explicit}')`);
    return explicit;
  }
  const sde = process.env.SOURCE_DATE_EPOCH;
  if (sde !== undefined && sde !== '') {
    if (!/^\d+$/.test(sde)) throw new Error(`SOURCE_DATE_EPOCH must be integer seconds (got '${sde}')`);
    return 'e' + Number(sde).toString(36);
  }
  try {
    const h = execFileSync('git', ['rev-parse', '--short=12', 'HEAD'], {
      cwd: dirname(fileURLToPath(import.meta.url)), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
    if (/^[0-9a-f]{12}$/.test(h)) return h;
    throw new Error(`unexpected git rev-parse output '${h}'`);
  } catch (err) {
    if (command !== 'build') return 'dev';
    throw new Error('cozy build id: no COZY_BUILD, no SOURCE_DATE_EPOCH, and `git rev-parse --short=12 HEAD` failed ('
      + (err instanceof Error ? err.message.split('\n')[0] : String(err)) + '). Refusing to build with a clock-based id.');
  }
}
// Emergency only: COZY_SW_KILL=1 ships sw/kill.js as sw.js and turns sw-switch.json off.
const KILL = process.env.COZY_SW_KILL === '1';

function cozySW(BUILD: string): Plugin {
  let outDir = 'dist';
  return {
    name: 'cozy-sw',
    apply: 'build',
    configResolved(c) { outDir = c.build.outDir; },
    closeBundle() {
      const sw = join(outDir, 'sw.js');
      if (!existsSync(sw)) return;
      if (KILL) {
        writeFileSync(sw, readFileSync(fileURLToPath(new URL('./sw/kill.js', import.meta.url)), 'utf8'));
        writeFileSync(join(outDir, 'sw-switch.json'), '{"sw":"off"}\n');
      } else {
        writeFileSync(sw, readFileSync(sw, 'utf8').replace('__COZY_BUILD__', BUILD));
      }
    },
  };
}

export default defineConfig(({ command }) => {
  const BUILD = buildId(command);
  return {
    base: process.env.VITE_BASE ?? '/kids-house-game/',
    define: { __COZY_BUILD__: JSON.stringify(BUILD) },
    plugins: [cozySW(BUILD)],
    // keep art as separate files (loaded lazily as drawer tabs/rooms show them) instead of inlining into the JS bundle
    // Oldest iPad: Pro 9.7" (2016) on iPadOS 16.6, Safari 16. esbuild downlevels syntax to that.
    // It does not polyfill findLast, toSorted, or structuredClone, so those stay unused.
    build: { assetsInlineLimit: 0, target: 'safari16', cssTarget: 'safari16' },
  };
});
