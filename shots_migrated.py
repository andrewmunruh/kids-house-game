"""Full-frame before/after shots of a migrated saved house, plus the old-client view of the migrated house."""
import asyncio, json, os, sys, copy
from pathlib import Path
from playwright.async_api import async_playwright

BEFORE = os.environ.get('BEFORE_URL', 'http://127.0.0.1:5300/kids-house-game/').rstrip('/')
AFTER = os.environ.get('AFTER_URL', 'http://127.0.0.1:5302/kids-house-game/').rstrip('/')
OUT = Path(os.environ.get('SHOTS', '/workspace/t-bench-refit/shots'))
BROWSERS = [x for x in os.environ.get('BROWSERS', 'webkit,chromium').split(',') if x]
SIZES = [(820, 1180), (1180, 820)]
FIXTURE = Path('/workspace/t-bench-refit/tests/fixtures/save_v3_old10.json')

def saves():
    raw = json.loads(FIXTURE.read_text())
    raw['currentRoom'] = 'backyard'
    seed = copy.deepcopy(raw)
    migrated = copy.deepcopy(raw)
    for it in migrated['rooms']['backyard']['items']:
        if it.get('kind') == 'yard-bench' and it.get('x') == 1122 and it.get('y') == 372:
            it['x'] = 1420
    migrated['yardBenchRefit'] = 1
    return seed, migrated

SEED_SAVE, MIGRATED_SAVE = saves()

def init_for(house):
    return (
        "localStorage.setItem('cozy-whatsnew','999');"
        "localStorage.setItem('preview:cozy-whatsnew','999');"
        "localStorage.setItem('avatar-intro','1');"
        "localStorage.setItem('cozy-welcome','1');"
        "localStorage.setItem('cozy-house', " + json.dumps(json.dumps(house)) + ");"
    )

CLEAR = r"""() => {
  const s = __store;
  if (s.get().currentRoom !== 'backyard') s.dispatch({type:'room/switch', room:'backyard'});
  s.get().characters.forEach(c => {
    if (c.room !== 'kitchen') s.dispatch({type:'char/move', id:c.id, room:'kitchen', x:200, y:540, seat:null});
  });
  try { if (s.get().cat) s.dispatch({type:'cat/move', room:'kitchen', x:100}); } catch(e) {}
  const bench = s.get().rooms.backyard.items.find(i => i.kind === 'yard-bench');
  return { x: bench && bench.x, y: bench && bench.y, flag: s.get().yardBenchRefit || null, scale: (bench && bench.scale) || 1 };
}"""

MEASURE = r"""() => {
  const box = el => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { l: r.left, r: r.right, t: r.top, b: r.bottom, w: r.width, h: r.height };
  };
  const overlap = (a, b) => {
    if (!a || !b) return null;
    const w = Math.max(0, Math.min(a.r, b.r) - Math.max(a.l, b.l));
    const h = Math.max(0, Math.min(a.b, b.b) - Math.max(a.t, b.t));
    return w * h > 0.5 ? { w, h, area: w * h } : { w: 0, h: 0, area: 0 };
  };
  const bench = box(document.querySelector('.item[data-kind="yard-bench"]'));
  const tulips = box(document.querySelector('.item[data-kind="tulip-bed"]'));
  const door = box(document.querySelector('.yardDoor'));
  const tree = box(document.querySelector('#yardTree'));
  const trunk = (() => {
    const g = document.querySelector('#yardTree');
    const rect = g && g.querySelector('rect');
    return box(rect);
  })();
  const vw = parseFloat(document.getElementById('stage') && document.getElementById('stage').style.width) || 1000;
  const cam = (window.__cam && typeof __cam.get === 'function' && __cam.get()) || null;
  const store = (() => { try {
    const b = __store.get().rooms.backyard.items.find(i => i.kind === 'yard-bench');
    return { x: b && b.x, y: b && b.y, flag: __store.get().yardBenchRefit || null };
  } catch(e) { return null; } })();
  const oDoor = overlap(bench, door), oTulips = overlap(bench, tulips), oTrunk = overlap(bench, trunk);
  const clear = !!(bench && door && tulips && trunk)
    && oDoor.area === 0 && oTulips.area === 0 && oTrunk.area === 0;
  return { bench, tulips, door, tree, trunk, oDoor, oTulips, oTrunk, clear, vw, cam, store };
}"""

async def dismiss(pg):
    await pg.wait_for_selector('#stage', timeout=25000)
    await pg.wait_for_timeout(400)
    await pg.evaluate("""() => {
      document.querySelector('#phoneOk')?.click();
      document.querySelector('#wnGo')?.click();
      document.querySelector('.whatsNew .wnGo')?.click();
      document.getElementById('modePlay')?.click();
      if (window.__sky) { try { __sky.freeze(null); __sky.setChoice('day'); } catch(e) {} }
    }""")
    await pg.wait_for_timeout(300)

async def frame_yard(pg, bench_x):
    """Use the real portrait/landscape VIEW_W. Keep YARD_CAM when the whole bench
    is already on screen and clear of the right arrow. Otherwise pan the way a
    kid would with ›: just far enough that the bench's right edge sits left of
    the arrow (or at the right of the window if the arrow is off)."""
    await pg.evaluate("""(bx) => {
      const stage = document.getElementById('stage');
      const vw = parseFloat(stage && stage.style.width) || 1000;
      const YARD_CAM = 864;
      const half = (bx && bx > 1300) ? 160 : 80; // wide new catalog vs small old catalog
      const rightNeed = (bx || 1420) + half + 8;
      let cam = window.__cam && typeof __cam.get === 'function' ? __cam.get() : YARD_CAM;
      const nudge = document.getElementById('nudgeR');
      const sc = stage.getBoundingClientRect().width / vw || 1;
      const arrowW = (nudge && !nudge.classList.contains('off') && nudge.getBoundingClientRect().width > 2)
        ? (nudge.getBoundingClientRect().width / sc) : 0;
      const shownRight = cam + vw - arrowW - 8;
      if (shownRight < rightNeed) cam = rightNeed - vw + arrowW + 8;
      if (cam < 0) cam = 0;
      window.__cam && __cam.set(cam);
    }""", bench_x)
    await pg.wait_for_timeout(500)

async def capture(p, engine, url, house, label, w, h):
    browser = await p.webkit.launch() if engine == 'webkit' else await p.chromium.launch()
    ctx = await browser.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2,
                                    has_touch=True, service_workers='block')
    await ctx.add_init_script(init_for(house))
    pg = await ctx.new_page()
    await pg.goto(url, wait_until='domcontentloaded')
    await dismiss(pg)
    info = await pg.evaluate(CLEAR)
    await frame_yard(pg, info.get('x'))
    dest = OUT / f'{engine}_{w}x{h}_{label}.png'
    await pg.screenshot(path=str(dest), type='png', full_page=False)
    meas = await pg.evaluate(MEASURE)
    meas['info'] = info
    await ctx.close(); await browser.close()
    st = meas.get('store') or {}
    print(f"SHOT {dest.name} bench={st.get('x')} flag={st.get('flag')} clear={meas.get('clear')} "
          f"door={meas.get('oDoor')} trunk={meas.get('oTrunk')} tulips={meas.get('oTulips')}", flush=True)
    return str(dest), meas

async def main():
    os.environ.setdefault('GIO_MODULE_DIR', '/workspace/tools/gio-mods')
    OUT.mkdir(parents=True, exist_ok=True)
    report = {}
    async with async_playwright() as p:
        for engine in BROWSERS:
            for w, h in SIZES:
                key = f'{engine}_{w}x{h}'
                path, meas = await capture(p, engine, BEFORE, SEED_SAVE, 'migrated_before', w, h)
                report[f'{key}_before'] = {**meas, 'shot': path}
                path, meas = await capture(p, engine, AFTER, SEED_SAVE, 'migrated_after', w, h)
                report[f'{key}_after'] = {**meas, 'shot': path}
                path, meas = await capture(p, engine, BEFORE, MIGRATED_SAVE, 'migrated_oldclient', w, h)
                report[f'{key}_oldclient'] = {**meas, 'shot': path}
    (OUT / 'migrated_measure.json').write_text(json.dumps(report, default=str, indent=2))
    print('WROTE', OUT / 'migrated_measure.json', flush=True)
    # The 1122 seed ("before") overlaps the trunk; that is why option (1) exists.
    bad = [k for k, v in report.items() if not v.get('clear') and 'before' not in k]
    if bad:
        print('NOT_CLEAR', bad, flush=True)
        sys.exit(2)
    print('AFTER_AND_OLDCLIENT_CLEAR', flush=True)

asyncio.run(main())
