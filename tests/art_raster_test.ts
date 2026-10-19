// The ?art=v1 switch, a lazy 2× WebP, and SVG fallback. No catalog drawing changes.
import { createServer } from 'vite';
import { execFile, execSync } from 'node:child_process';
import { ART_RASTER, artRasterOn, setArtFromSearch, setArtRaster } from '../src/art/flag';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++; else process.exitCode = 1;
};

check('the one-line switch is on', ART_RASTER === true);
check('an empty search follows the switch', setArtFromSearch('') === true && artRasterOn());
check('art=v1 forces the svg', setArtFromSearch('?art=v1') === false && !artRasterOn());
check('art=v2 forces raster', setArtFromSearch('?art=v2') === true && artRasterOn());
setArtRaster(false);
check('a test can turn raster off', !artRasterOn());
setArtFromSearch('');

const py = ['/tmp/pwvenv/bin/python', '/workspace/.pwvenv/bin/python'].find(p => { try { execSync(`test -x ${p}`); return true; } catch { return false; } });
check('raster browser is available', !!py, 'playwright python');

if (py) {
  process.env.VITE_BASE = '/';
  const server = await createServer({
    configFile: '/workspace/vite.config.ts',
    cacheDir: '/tmp/vite-raster-test',
    server: { host: '127.0.0.1', port: 5199, strictPort: true },
    logLevel: 'error',
  });
  await server.listen();
  try {
    await new Promise<void>((resolve, reject) => {
      execFile(py, ['tests/raster_fallback.py', 'http://127.0.0.1:5199/tests/raster-harness.html'], { timeout: 60000 }, (err, stdout, stderr) => {
        if (stdout) process.stdout.write(stdout);
        if (stderr) process.stderr.write(stderr);
        if (err) reject(err);
        else resolve();
      });
    });
    check('dummy webp loads, art=v1 skips it, and a broken url falls back', true);
  } catch {
    check('dummy webp loads, art=v1 skips it, and a broken url falls back', false);
  } finally {
    await server.close();
  }
}

console.log(pass + ' passed');
