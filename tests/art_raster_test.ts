// The ?art=v1 switch, lazy WebP paintings, and SVG fallback.
import { execFile, execSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { ART_RASTER, artRasterOn, setArtFromSearch, setArtRaster } from '../src/art/flag';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const port = Number(process.env.ART_PORT || 5199);

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

const names: string[] = [];
const walk = (dir: string) => {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else names.push(ent.name);
  }
};
walk(join(root, 'assets/art'));
check('no probe asset is shipped', !names.some(n => n.includes('_probe')));

const py = process.env.ART_PYTHON || ['/tmp/pwvenv/bin/python', 'python3'].find(p => { try { execSync(`test -x ${p}`); return true; } catch { return p === 'python3'; } });
check('raster browser is available', !!py, 'playwright python');

if (py) {
  process.env.VITE_BASE = '/';
  const server = await createServer({
    configFile: join(root, 'vite.config.ts'),
    cacheDir: join(process.env.TMPDIR || '/tmp', 'vite-raster-test'),
    server: { host: '127.0.0.1', port, strictPort: true },
    logLevel: 'error',
  });
  await server.listen();
  try {
    await new Promise<void>((resolve, reject) => {
      execFile(py, [join(root, 'tests/raster_fallback.py'), `http://127.0.0.1:${port}/tests/raster-harness.html`], { timeout: 60000 }, (err, stdout, stderr) => {
        if (stdout) process.stdout.write(stdout);
        if (stderr) process.stderr.write(stderr);
        if (err) reject(err);
        else resolve();
      });
    });
    check('living rasters load, art=v1 skips them, and a broken url falls back', true);
  } catch {
    check('living rasters load, art=v1 skips them, and a broken url falls back', false);
  } finally {
    await server.close();
  }
}

console.log(pass + ' passed');
