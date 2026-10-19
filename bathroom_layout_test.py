# Bathroom starter. Every piece stays inside the stage at the seven sizes,
# clear of the nav arrows and the Surprises chip. Wall pieces stay off the
# window and off each other. Fresh page per size so the camera is the one
# the room opens with.
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
  for (const el of items) {
    const b = el.getBoundingClientRect();
    const kind = el.dataset.kind;
    if (b.left < sb.left - 1 || b.top < sb.top - 1 || b.right > sb.right + 1 || b.bottom > sb.bottom + 1)
      problems.push(kind + ' outside');
    for (const [id, o] of obstacles) if (hits(b, o)) problems.push(kind + ' hits ' + id);
  }
  const walls = items.filter(el => el.dataset.wall === '1');
  for (let i = 0; i < walls.length; i++) {
    const a = walls[i].getBoundingClientRect();
    if (win && hits(a, win)) problems.push(walls[i].dataset.kind + ' hits window');
    for (let j = i + 1; j < walls.length; j++) {
      if (hits(a, walls[j].getBoundingClientRect())) problems.push(walls[i].dataset.kind + ' hits ' + walls[j].dataset.kind);
    }
  }
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
                check(tag + ' has the six pieces', data['n'] == 6, str(data['n']))
                check(tag + ' stays inside', data['problems'] == [], ' '.join(data['problems']))
            await ctx.close()
        await browser.close()
    failed = [k for k, v in res.items() if not v]
    print(f'{len(res) - len(failed)}/{len(res)} passed', flush=True)
    if failed:
        print('FAILED:', *failed, sep='\n  ')
        sys.exit(1)

asyncio.run(main())
