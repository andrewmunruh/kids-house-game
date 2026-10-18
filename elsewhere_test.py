# Two screens signed in as the same kid. The one that loses must sit still (no ping-pong)
# and show "Tap to play here!". Tapping it takes the street back; the other screen gets the card.
import asyncio, sys
from playwright.async_api import async_playwright
from testnav import SKIP_WN, local_page

URL = sys.argv[1] if len(sys.argv) > 1 else local_page()
COUNT = """
(() => {
  const O = WebSocket;
  let n = 0;
  window.__sockets = () => n;
  function W(url, protocols) {
    n++;
    return protocols === undefined ? new O(url) : new O(url, protocols);
  }
  W.prototype = O.prototype;
  W.CONNECTING = O.CONNECTING; W.OPEN = O.OPEN; W.CLOSING = O.CLOSING; W.CLOSED = O.CLOSED;
  window.WebSocket = W;
})();
"""
res = {}
def check(name, ok, extra=''):
    res[name] = bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)

async def join(pg, code):
    await pg.click('#btnHood'); await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower()); await pg.click('#codeForm button')
    await pg.click('.nicks button:has-text("Sunny Bunny")')
    await pg.click('[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=8000)

async def card_on(pg):
    return await pg.locator('#elsewhere:not(.hidden)').count() == 1

async def playing(pg):
    return await pg.evaluate("""() => {
      try { return __hood().status === 'online' && document.getElementById('elsewhere').classList.contains('hidden'); }
      catch (e) { return false; }
    }""")

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctxA = await b.new_context(viewport={'width': 1024, 'height': 768}, has_touch=True)
        await ctxA.add_init_script(SKIP_WN); await ctxA.add_init_script(COUNT)
        A = await ctxA.new_page(); A.set_default_timeout(10000)
        errs = []
        A.on('pageerror', lambda e: errs.append('A ' + str(e)))
        await A.goto(URL); await A.wait_for_timeout(400)
        created = await A.evaluate("""async () => {
          const r = await fetch(__hood_url() + '/api/create', { method: 'POST' });
          if (!r.ok) throw new Error('create ' + r.status);
          return await r.json();
        }""")
        await join(A, created['code'])
        await A.wait_for_timeout(500)
        state = await ctxA.storage_state()
        a_before = await A.evaluate('__sockets()')
        ctxB = await b.new_context(viewport={'width': 1024, 'height': 768}, has_touch=True, storage_state=state)
        await ctxB.add_init_script(SKIP_WN); await ctxB.add_init_script(COUNT)
        B = await ctxB.new_page(); B.set_default_timeout(10000)
        B.on('pageerror', lambda e: errs.append('B ' + str(e)))
        await B.goto(URL)
        settled = False
        for _ in range(50):
            if await card_on(A) and await playing(B):
                settled = True; break
            await A.wait_for_timeout(200)
        check('second screen takes the street and the first shows the card', settled)
        if not settled:
            print('A', await A.evaluate("() => ({ status: (__hood() && __hood().status), card: document.getElementById('elsewhere').className, sockets: __sockets() })"))
            print('B', await B.evaluate("() => { try { return { status: __hood() && __hood().status, card: document.getElementById('elsewhere').className, sockets: __sockets() }; } catch (e) { return String(e); } }"))
            print('errors', errs)
            raise SystemExit(1)
        text = await A.inner_text('#elsewhere')
        check('card says she is playing on another screen', "You're playing on another screen" in text and 'Tap to play here!' in text, text.replace('\n', ' '))
        quiet_a = await A.evaluate('__sockets()')
        quiet_b = await B.evaluate('__sockets()')
        check('the resting screen opened no extra socket', quiet_a == a_before, f'{a_before} -> {quiet_a}')
        check('the new screen connected once', quiet_b == 1, str(quiet_b))
        await asyncio.sleep(30)
        later = await A.evaluate('__sockets()') + await B.evaluate('__sockets()')
        opened = later - (quiet_a + quiet_b)
        check('no more than 2 reconnects in 30s', opened <= 2, str(opened))
        await A.click('#elsewhereGo')
        took = False
        for _ in range(40):
            if await playing(A) and await card_on(B):
                took = True; break
            await A.wait_for_timeout(200)
        check('tap to play here takes over and the other screen shows the card', took)
        if not took:
            print('A', await A.evaluate("() => ({ status: __hood() && __hood().status, card: document.getElementById('elsewhere').className })"))
            print('B', await B.evaluate("() => ({ status: __hood() && __hood().status, card: document.getElementById('elsewhere').className })"))
            raise SystemExit(1)
        held = await A.evaluate('__sockets()') + await B.evaluate('__sockets()')
        await asyncio.sleep(3)
        still = await A.evaluate('__sockets()') + await B.evaluate('__sockets()')
        check('after the tap they stay put', still == held, f'+{still - held}')
        check('no JS errors', errs == [], str(errs))
        fails = [k for k, v in res.items() if not v]
        print(f'{len(res) - len(fails)}/{len(res)} checks passed', flush=True)
        if fails: raise SystemExit(1)

if __name__ == '__main__':
    asyncio.run(main())
