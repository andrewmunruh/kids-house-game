import { defineConfig, type Plugin } from 'vite';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// One id per build. It names the service worker's app cache and lets an open tab tell that a
// newer build has taken over ("New stuff! Tap to refresh").
const BUILD = process.env.COZY_BUILD || Date.now().toString(36);
// Emergency only: COZY_SW_KILL=1 ships sw/kill.js as sw.js and turns sw-switch.json off.
const KILL = process.env.COZY_SW_KILL === '1';

function cozySW(): Plugin {
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

export default defineConfig({
  base: process.env.VITE_BASE ?? '/kids-house-game/',
  define: { __COZY_BUILD__: JSON.stringify(BUILD) },
  plugins: [cozySW()],
  // keep art as separate files (loaded lazily as drawer tabs/rooms show them) instead of inlining into the JS bundle
  // Oldest iPad: Pro 9.7" (2016) on iPadOS 16.6, Safari 16. esbuild downlevels syntax to that.
  // It does not polyfill findLast, toSorted, or structuredClone, so those stay unused.
  build: { assetsInlineLimit: 0, target: 'safari16', cssTarget: 'safari16' },
});
