# Bathroom starter. Pieces spread across the room, so a wide opening view is not
# a left-hand clump and a narrow one may leave some pieces off to the side.
# Anything on the stage stays clear of the nav arrows and the Surprises chip.
# Wall pieces stay off the window and off each other. Nothing overlaps.
# The mat sits in front of the tub. The shower stays much taller than the tub.
# Fresh page per size so the camera is the one the room opens with.
import asyncio, sys
from playwright.async_api import async_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:4173/kids-house-game/'
SIZES = [(1180, 820), (1024, 768), (820, 1180), (390, 844), (375, 667), (844, 390), (430, 932)]

CHECK = """() => {
  const stage = document.querySelector('.stage');
  const sb = stage.getBoundingClientRect();
  const hits = (a, b) => a.right > b.left + 0.5 && a.left < b.right - 0.5 && a.bottom > b.top + 0.5 && a.top < b.bottom - 0.5;
  const live = (el) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0 || el.classList.contains('off')) return null;
    const b = el.getBoundingClientRect();
    return b.width >= 2 && b.height >= 2 ? b : null;
  };
  const obstacles = ['nudgeL', 'nudgeR', 'secrets'].map(id => [id, live(document.getElementById(id))]).filter(([, b]) => b && hits(b, sb));
  const win = live(document.querySelector('.sceneWin'));
  const items = [...document.querySelectorAll('#layer .item')];
  const problems = [];
  const onStage = (b) => b.right > sb.left + 1 && b.left < sb.right - 1 && b.bottom > sb.top + 1 && b.top < sb.bottom - 1;
  let minL = Infinity, maxR = -Infinity;
  for (const el of items) {
    const b = el.getBoundingClientRect();
    const kind = el.dataset.kind;
    minL = Math.min(minL, b.left); maxR = Math.max(maxR, b.right);
    if (!onStage(b)) continue;
    for (const [id, o] of obstacles) if (hits(b, o)) problems.push(kind + ' hits ' + id);
  }
  if (maxR < sb.left + sb.width * 0.62) problems.push('bunched left');
  if (minL > sb.left + sb.width * 0.2) problems.push('bunched right');
  const walls = items.filter(el => el.dataset.wall === '1');
  for (let i = 0; i < walls.length; i++) {
    const a = walls[i].getBoundingClientRect();
    if (win && hits(a, win)) problems.push(walls[i].dataset.kind + ' hits window');
    for (let j = i + 1; j < walls.length; j++) {
      if (hits(a, walls[j].getBoundingClientRect())) problems.push(walls[i].dataset.kind + ' hits ' + walls[j].dataset.kind);
    }
  }
  let mat = null, tub = null, shower = null;
  for (let i = 0; i < items.length; i++) {
    const k = items[i].dataset.kind;
    const b = items[i].getBoundingClientRect();
    if (k === 'puddle-mat') mat = b;
    if (k === 'clawfoot-tub') tub = b;
    if (k === 'rain-shower') shower = b;
    for (let j = i + 1; j < items.length; j++) {
      if (hits(b, items[j].getBoundingClientRect())) problems.push(k + ' overlaps ' + items[j].dataset.kind);
    }
  }
  if (mat && tub) {
    const xOverlap = mat.right > tub.left + 1 && mat.left < tub.right - 1;
    if (!(mat.top >= tub.bottom - 1 && xOverlap)) problems.push('mat is not in front of the tub');
  }
  if (shower && tub && shower.height < tub.height * 1.6) problems.push('shower is short');
  return { n: items.length, problems };
}"""

res = {}

def check(name, ok, extra=''):
    res[name] = bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for w, h in SIZES:
            phone = (h > w * 0.85 and w <= 500) or (w > h and h <= 500)
            ctx = await browser.new_context(viewport={'width': w, 'height': h}, has_touch=True, is_mobile=bool(phone), device_scale_factor=1)
            await ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999')")
            pg = await ctx.new_page()
            await pg.goto(URL, wait_until='domcontentloaded')
            await pg.wait_for_selector('#stage .char')
            if await pg.locator('#phoneOk').is_visible():
                await pg.click('#phoneOk', force=True)
            await pg.evaluate("() => window.__store.dispatch({ type: 'room/switch', room: 'bathroom' })")
            await pg.wait_for_timeout(60)
            for mode in ('decorate', 'play'):
                if mode == 'play':
                    await pg.click('#modePlay')
                    await pg.wait_for_timeout(40)
                data = await pg.evaluate(CHECK)
                tag = f'bathroom starter {w}x{h} {mode}'
                check(tag + ' has the nine pieces', data['n'] == 9, str(data['n']))
                check(tag + ' stays inside', data['problems'] == [], ' '.join(data['problems']))
            await ctx.close()
        await browser.close()
    failed = [k for k, v in res.items() if not v]
    print(f'{len(res) - len(failed)}/{len(res)} passed', flush=True)
    if failed:
        print('FAILED:', *failed, sep='\n  ')
        sys.exit(1)

asyncio.run(main())
