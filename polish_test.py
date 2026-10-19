# Clamp, name-tag lanes, reduced motion, nursery shelf, and empty-room dressing.
# Local preview only. Never calls the production Worker.
import asyncio, os, sys
from playwright.async_api import async_playwright
from testnav import local_page

URL = sys.argv[1] if len(sys.argv) > 1 else local_page()
res = {}

def check(name, ok, extra=''):
    res[name] = bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)

INSIDE = """() => {
  const kid = document.querySelector('#layer .char');
  const name = kid && kid.querySelector('.nametag');
  const stage = document.querySelector('.stage').getBoundingClientRect();
  const box = el => { const b = el.getBoundingClientRect(); return {l:b.left, t:b.top, r:b.right, b:b.bottom, w:b.width, h:b.height}; };
  const kb = kid && box(kid), tb = name && box(name);
  const inside = b => !!(b && b.w > 8 && b.h > 8 && b.l >= stage.left - 2 && b.r <= stage.right + 2 && b.t >= stage.top - 2 && b.b <= stage.bottom + 2);
  return {ok: inside(kb) && inside(tb), kid: kb && {l:Math.round(kb.l), r:Math.round(kb.r)}, tag: tb && {l:Math.round(tb.l), r:Math.round(tb.r), t:Math.round(tb.t)},
    stage: {l:Math.round(stage.left), r:Math.round(stage.right)}, x: Math.round(__store.get().characters[0].x)};
}"""

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 820, 'height': 1180}, has_touch=True, device_scale_factor=1)
        await ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999')")
        pg = await ctx.new_page()
        await pg.goto(URL, wait_until='networkidle')
        await pg.wait_for_selector('#stage .char')
        await pg.evaluate("""() => {
          const kid = document.querySelector('#layer .char');
          if (!kid.querySelector('.nametag')) {
            const d = document.createElement('div'); d.className = 'nametag'; d.textContent = 'Sunny Bunny'; kid.appendChild(d);
          }
          window.__frameHouseKid();
        }""")
        await pg.wait_for_timeout(80)
        framed = await pg.evaluate(INSIDE)
        check('820x1180 kid and name tag stay inside the stage', framed['ok'], str(framed))

        await pg.evaluate("""() => {
          const s = __store.get(); const c = s.characters[0];
          __store.dispatch({type:'char/move', id:c.id, room:s.currentRoom, x:20, y:c.y});
          __cam.set(0);
        }""")
        await pg.wait_for_timeout(40)
        before = await pg.evaluate("__store.get().characters[0].x")
        await pg.evaluate("window.__frameHouseKid()")
        await pg.wait_for_timeout(80)
        edged = await pg.evaluate(INSIDE)
        check('dragging into the corner clamps the kid back inside', edged['ok'] and edged['x'] > before, str(edged))

        lanes = await pg.evaluate("""() => {
          const layer = document.getElementById('layer');
          const mk = (name, left) => {
            const el = document.createElement('div'); el.className = 'char';
            el.style.cssText = 'left:' + left + '%;top:40%;width:80px;height:100px;position:absolute';
            el.innerHTML = '<div class="nametag">' + name + '</div>';
            layer.appendChild(el); return el;
          };
          const a = mk('Sunny Bunny', 40), b = mk('Sparkle Kitty', 42);
          window.__layoutNameTags();
          const lane = el => getComputedStyle(el.querySelector('.nametag')).getPropertyValue('--tag-lane').trim();
          const text = el => el.querySelector('.nametag').textContent;
          return {la: lane(a), lb: lane(b), ta: text(a), tb: text(b)};
        }""")
        spread = lanes['la'] != lanes['lb'] or len(lanes['ta']) <= 3 or len(lanes['tb']) <= 3
        check('close name tags take lanes or initials', spread, str(lanes))

        await pg.click('.tab[data-room="nursery"]')
        await pg.click('.cat[data-cat="decor"]')
        await pg.wait_for_timeout(100)
        shelf = await pg.evaluate("""() => ({
          n: document.querySelectorAll('#shelf .thing').length,
          names: [...document.querySelectorAll('#shelf .thing')].map(el => el.getAttribute('aria-label'))
        })""")
        check('nursery decor is nursery pieces plus generic decor', shelf['n'] < 45 and shelf['n'] > 8 and 'Balloons' not in shelf['names'] and 'Wood Bookshelf' not in shelf['names'], str(shelf['n']))
        win = await pg.evaluate("() => !!document.querySelector('#scenery .builtin-window')")
        check('the nursery shows a painted window', win)

        await pg.evaluate("""() => {
          const s = __store.get();
          for (const it of [...s.rooms.kitchen.items]) __store.dispatch({type:'item/delete', room:'kitchen', id:it.id});
          __store.dispatch({type:'room/switch', room:'kitchen'});
        }""")
        await pg.wait_for_timeout(80)
        empty = await pg.evaluate("""() => ({
          items: __store.get().rooms.kitchen.items.length,
          rug: !!document.querySelector('#scenery .sceneRug'),
          lamp: !!document.querySelector('#scenery .sceneLamp'),
          plant: !!document.querySelector('#scenery .scenePlant'),
          win: !!document.querySelector('#scenery .builtin-window')
        })""")
        check('an emptied room is still empty in the save and wears starter touches', empty['items'] == 0 and empty['rug'] and empty['lamp'] and empty['plant'] and empty['win'], str(empty))
        await ctx.close()

        quiet = await browser.new_context(viewport={'width': 1024, 'height': 768}, reduced_motion='reduce')
        await quiet.add_init_script("localStorage.setItem('cozy-whatsnew','999')")
        q = await quiet.new_page()
        await q.goto(URL, wait_until='networkidle')
        await q.wait_for_selector('#stage .char')
        motion = await q.evaluate("""() => {
          const el = document.querySelector('.char > .inner');
          const d = getComputedStyle(el).animationDuration;
          const ms = d.endsWith('ms') ? parseFloat(d) : parseFloat(d) * 1000;
          return {d, ms, reduce: matchMedia('(prefers-reduced-motion: reduce)').matches};
        }""")
        check('reduced motion collapses animations', motion['reduce'] and motion['ms'] <= 1, str(motion))
        await quiet.close()
        await browser.close()
    bad = [k for k, v in res.items() if not v]
    print(f"{len(res) - len(bad)} passed, {len(bad)} failed")
    if bad: sys.exit(1)

if __name__ == '__main__':
    asyncio.run(main())
