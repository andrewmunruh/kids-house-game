import { defineConfig } from 'vite';
export default defineConfig({
  base: process.env.VITE_BASE ?? '/kids-house-game/',
  // keep art as separate files (loaded lazily as drawer tabs/rooms show them) instead of inlining into the JS bundle
  // Oldest iPad: Pro 9.7" (2016) on iPadOS 16.6, Safari 16. esbuild downlevels syntax to that.
  // It does not polyfill findLast, toSorted, or structuredClone, so those stay unused.
  build: { assetsInlineLimit: 0, target: 'safari16', cssTarget: 'safari16' },
});
