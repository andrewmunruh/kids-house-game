import { defineConfig } from 'vite';
export default defineConfig({
  base: process.env.VITE_BASE ?? '/kids-house-game/',
  // keep art as separate files (loaded lazily as drawer tabs/rooms show them) instead of inlining into the JS bundle
  build: { assetsInlineLimit: 0, target: 'safari16', cssTarget: 'safari16' },
});
