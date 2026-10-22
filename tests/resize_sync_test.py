# Two browsers, one house: a doll seated on the bath stool stays seated when it
# is resized to 1.5x and then 0.75x. Chromium owns the house. WebKit is in the room.
# Never calls the production Worker.
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from urllib.parse import urlparse
from playwright.async_api import async_playwright
from testnav import tap, SKIP_WN, local_page

URL = sys.argv[1] if len(sys.argv) > 1 else local_page()
PROD_WORKER = 'cozy-hood.andrewmunruh.workers.dev'

def hits_prod(url):
    try:
        return (urlparse(url).hostname or '') == PROD_WORKER
    except Exception:
        return False

problems = []
prod = []

def fail(msg):
    problems.append(msg)
    print('FAIL', msg, flush=True)

async def adult(pg):
    await pg.wait_for_selector('.adultCard .q')
    q = int(await pg.get_attribute('.adultCard .q', 'data-q'))
    for d in str(q):
        await pg.click(f'.adultCard [data-k="{d}"]')
    await pg.click('.adultCard [data-k="OK"]')

async def join(pg, code, nth, bring):
    await tap(pg, '#btnHood')
    await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower())
    await pg.click('#codeForm button')
    await pg.locator('.nicks button').nth(nth).click()
    if bring is not None:
        await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=8000)

async def seat_view(pg):
    return await pg.evaluate("""() => {
      const s = __store.get();
      const stool = s.rooms.bathroom && s.rooms.bathroom.items.find(i => i.id === 'sync-stool');
      const doll = s.characters.find(c => c.id === 'sync-doll');
      return {
        size: stool ? (stool.size ?? 1) : null,
        scale: stool ? stool.scale : null,
        seat: doll && doll.seat ? { item: doll.seat.item, pose: doll.seat.pose, n: doll.seat.n } : null,
        x: doll ? doll.x : null,
        y: doll ? doll.y : null,
        room: doll ? doll.room : null,
      };
    }""")

async def main():
    async with async_playwright() as p:
        chromium = await p.chromium.launch()
        webkit = await p.webkit.launch()
        browsers = [('chromium', chromium), ('webkit', webkit)]
        ctxs = []
        pages = []
        for name, b in browsers:
            ctx = await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=1)
            await ctx.add_init_script(SKIP_WN)
            pg = await ctx.new_page()
            pg.on('pageerror', lambda e, n=name: fail(f'{n} pageerror {e}'))
            pg.on('request', lambda r: prod.append(r.url) if hits_prod(r.url) else None)
            ctxs.append(ctx)
            pages.append(pg)
        host, guest = pages
        await host.goto(URL, wait_until='networkidle')
        await guest.goto(URL, wait_until='networkidle')
        await host.wait_for_timeout(400)
        await tap(host, '#btnHood')
        await host.click('[data-m="create"]')
        await adult(host)
        await host.wait_for_selector('#newCode', timeout=8000)
        code = (await host.inner_text('#newCode')).strip()
        await host.click('.hoodSheet [data-m="close"]')
        await join(host, code, 0, True)
        await join(guest, code, 1, False)
        await host.wait_for_timeout(500)
        hid = await host.evaluate('__hood().myHouseId()')
        await host.click('#mapWorld .mapHouse.mine')
        await host.wait_for_selector('#stage', timeout=8000)
        await guest.wait_for_selector(f'#mapWorld .mapHouse[data-go="house:{hid}"]', timeout=8000)
        await guest.click(f'#mapWorld .mapHouse[data-go="house:{hid}"]')
        await guest.wait_for_selector('#stage', timeout=8000)
        await host.wait_for_function("() => __store.get().rooms.bathroom && __store.get().rooms.bathroom.items")
        seated = await host.evaluate("""() => {
          const s = __store;
          s.dispatch({type:'room/switch', room:'bathroom'});
          s.dispatch({type:'item/add', room:'bathroom', item:{id:'sync-stool', kind:'bath-stool', x:1200, y:520, flip:false, z:30, scale:1}});
          // Bringing a house turns the first doll into the kid on the street, so this doll is added in the room.
          s.dispatch({type:'char/add', char:{id:'sync-doll', room:'bathroom', x:1200, y:470, flip:false, skin:'#f1c27d', hair:'#3b2219', hairStyle:0, shirt:'#ff7aa8', pants:'#5b8def', size:'kid', acc:0, held:{left:null, right:null}}});
          s.dispatch({type:'char/move', id:'sync-doll', room:'bathroom', x:1200, y:470, seat:{item:'sync-stool', pose:'sit', n:0}});
          s.dispatch({type:'item/size', room:'bathroom', id:'sync-stool', size:1.5});
          s.dispatch({type:'item/size', room:'bathroom', id:'sync-stool', size:0.75});
          return true;
        }""")
        if not seated:
            fail('host could not seat the doll')
        for _ in range(20):
            a, b = await seat_view(host), await seat_view(guest)
            if a == b and a.get('seat') and a['seat']['item'] == 'sync-stool' and a['size'] == 0.75:
                break
            await host.wait_for_timeout(150)
        a, b = await seat_view(host), await seat_view(guest)
        ok = (
            a.get('seat') and b.get('seat')
            and a['seat']['item'] == 'sync-stool' and b['seat']['item'] == 'sync-stool'
            and a['seat']['pose'] == 'sit' and b['seat']['pose'] == 'sit'
            and a['seat']['n'] == 0 and b['seat']['n'] == 0
            and a['size'] == 0.75 and b['size'] == 0.75
            and a['scale'] == 1 and b['scale'] == 1
            and a['x'] == b['x'] and a['y'] == b['y']
        )
        if not ok:
            fail(f'she did not stay seated on both browsers {a} {b}')
        else:
            print('PASS doll stays seated on chromium and webkit after 1.5x then 0.75x', flush=True)
        if prod:
            fail('tests called the production Worker')
        else:
            print('PASS tests never called the production Worker', flush=True)
        for ctx in ctxs:
            await ctx.close()
        await chromium.close()
        await webkit.close()
    if problems:
        print(f'{len(problems)} problems', flush=True)
        sys.exit(1)
    print('PASS two-browser resize sync', flush=True)

if __name__ == '__main__':
    asyncio.run(main())
