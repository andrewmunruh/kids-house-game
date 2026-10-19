# Mailboxes on the street, writing a letter, opening it. iPad 1024x768 and iPhone 390x844.
import asyncio, os, sys
from playwright.async_api import async_playwright
from testnav import SKIP_WN, local_page

URL = sys.argv[1] if len(sys.argv) > 1 else local_page()
SHOT = os.environ.get('MAIL_SHOTS', '/opt/cursor/artifacts/screenshots')
os.makedirs(SHOT, exist_ok=True)
res = {}

def check(name, ok, extra=''):
    res[name] = bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)

async def adult(pg):
    await pg.wait_for_selector('.adultCard .q')
    q = int(await pg.get_attribute('.adultCard .q', 'data-q'))
    for d in str(q):
        await pg.click(f'.adultCard [data-k="{d}"]')
    await pg.click('.adultCard [data-k="OK"]')

async def join(pg, code, nick, bring):
    await pg.click('#btnHood')
    await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code)
    await pg.click('#codeForm button')
    await pg.click(f'.nicks button:has-text("{nick}")')
    await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=8000)

async def shot(pg, name):
    path = os.path.join(SHOT, name + '.png')
    await pg.screenshot(path=path)
    print('SHOT', path, flush=True)

async def flow(browser, w, h, tag):
    ctx = await browser.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=True, is_mobile=(w < 500))
    await ctx.add_init_script(SKIP_WN)
    P = await ctx.new_page()
    K = await ctx.new_page()
    await P.goto(URL)
    await K.goto(URL)
    await P.wait_for_timeout(400)
    if await P.locator('#phoneOk').is_visible():
        await P.click('#phoneOk', force=True)
    if await K.locator('#phoneOk').is_visible():
        await K.click('#phoneOk', force=True)
    await P.click('#btnHood')
    await P.click('[data-m="create"]')
    await adult(P)
    await P.wait_for_selector('#newCode')
    code = (await P.inner_text('#newCode')).strip()
    await P.click('.hoodSheet [data-m="close"]')
    await join(P, code, 'Reagan', True)
    await join(K, code, 'Quinn', False)
    await P.wait_for_timeout(500)
    k_house = await K.evaluate('__hood().myHouseId()')
    await P.click(f'.mapMail[data-mail="{k_house}"]')
    await P.wait_for_selector('#mailText')
    await P.fill('#mailText', 'Come play today!')
    await P.click('.swatch[data-color="2"]')
    await P.click('.stick[data-sticker="1"]')
    await shot(P, f'{tag}-write-letter')
    await P.click('#mailSend')
    await P.wait_for_timeout(700)
    await K.wait_for_selector('.mapMail.up', timeout=8000)
    cue = await K.locator('#mailCue.show').count()
    check(f'{tag} mailbox flag and You have got mail', cue == 1 and await K.locator('.mapMail').count() >= 2, f'cue={cue}')
    await shot(K, f'{tag}-street-mailboxes')
    await K.click(f'.mapMail[data-mail="{k_house}"]')
    await K.wait_for_selector('[data-letter]')
    await K.click('[data-letter]')
    await K.wait_for_selector('.letter.open .words')
    words = await K.inner_text('.letter.open .words')
    who = await K.inner_text('.letter.open .who')
    check(f'{tag} letter opens with the sender and the words', 'Come play today!' in words and 'Reagan' in who, words + ' / ' + who)
    await shot(K, f'{tag}-open-letter')
    if tag == 'ipad':
        await K.click('[data-m="close"]')
        await K.wait_for_timeout(200)
        p_house = await P.evaluate('__hood().myHouseId()')
        await K.click(f'.mapHouse[data-go="house:{p_house}"]')
        await K.wait_for_selector('body.mode-play')
        before = await K.evaluate("__store.get().rooms.living.items[0].x")
        await K.evaluate("""() => {
          const el = document.querySelector('#layer .item');
          const r = el.getBoundingClientRect();
          const o = { clientX: r.left + 12, clientY: r.top + r.height / 2, pointerId: 1, bubbles: true, pointerType: 'mouse' };
          el.dispatchEvent(new PointerEvent('pointerdown', o));
          window.dispatchEvent(new PointerEvent('pointermove', { ...o, clientX: o.clientX + 80 }));
          window.dispatchEvent(new PointerEvent('pointerup', { ...o, clientX: o.clientX + 80 }));
        }""")
        await K.wait_for_timeout(300)
        after = await K.evaluate("__store.get().rooms.living.items[0].x")
        drawer = await K.evaluate("getComputedStyle(document.querySelector('.drawer')).display")
        check('play mode blocks a furniture drag and hides the drawer', before == after and drawer == 'none' and await K.evaluate("__ui().play") == 'play', f'{before}->{after} drawer={drawer}')
    await ctx.close()

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        await flow(browser, 1024, 768, 'ipad')
        await flow(browser, 390, 844, 'iphone')
        await browser.close()
    failed = [k for k, v in res.items() if not v]
    print('MAIL UI', 'ok' if not failed else 'FAILED ' + ', '.join(failed), flush=True)
    if failed:
        sys.exit(1)

asyncio.run(main())
