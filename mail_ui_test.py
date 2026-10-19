# Mailboxes on the street, writing a letter, opening it. iPad 1024x768 and iPhone 390x844.
import asyncio, os, re, sys, time
from playwright.async_api import async_playwright
from testnav import SKIP_WN, local_page

URL = sys.argv[1] if len(sys.argv) > 1 else local_page()
SHOT = os.environ.get('MAIL_SHOTS', '/opt/cursor/artifacts/screenshots')
os.makedirs(SHOT, exist_ok=True)
res = {}
# Hold mailbox pushes for 1100ms (inside the 300-1500ms server-latency window).
SLOW_MAIL = """
(() => {
  const O = WebSocket;
  const delayMs = 1100;
  const native = Object.getOwnPropertyDescriptor(O.prototype, 'onmessage');
  function W(url, protocols) {
    const ws = protocols === undefined ? new O(url) : new O(url, protocols);
    Object.defineProperty(ws, 'onmessage', {
      configurable: true,
      enumerable: true,
      get() { return native.get.call(ws); },
      set(fn) {
        native.set.call(ws, function (ev) {
          let delay = 0;
          try {
            if (typeof ev.data === 'string' && ev.data.indexOf('"mailbox"') !== -1) {
              const m = JSON.parse(ev.data);
              if (m && m.t === 'mailbox') delay = delayMs;
            }
          } catch (e) {}
          if (!delay) { fn.call(ws, ev); return; }
          window.setTimeout(() => fn.call(ws, ev), delay);
        });
      }
    });
    return ws;
  }
  W.prototype = O.prototype;
  W.CONNECTING = O.CONNECTING; W.OPEN = O.OPEN; W.CLOSING = O.CLOSING; W.CLOSED = O.CLOSED;
  window.WebSocket = W;
})();
"""

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

async def presets_and_parent(P, k_house, suffix):
    """freeChat off: phrase chips instead of a text box, and the grown-up can see and clear letters."""
    await P.click('#btnParent')
    await adult(P)
    await P.wait_for_selector('#pFree')
    if await P.get_attribute('#pFree', 'data-on') == '1':
        await P.click('#pFree')
        await P.wait_for_function("() => { const b = document.querySelector('#pFree'); return b && b.getAttribute('data-on') === '0'; }")
    await P.click('.hoodSheet [data-m="close"]')
    await P.wait_for_function("() => !document.querySelector('.sheet:not(.hidden)')")
    await P.click(f'.mapMail[data-mail="{k_house}"]')
    await P.wait_for_selector('.mailPhrases button')
    chips = await P.locator('.mailPhrases button').count()
    sticks = await P.locator('#mailSheet .stick').count()
    no_box = await P.locator('#mailText').count()
    check('preset composer has phrases and stickers and no text box', no_box == 0 and chips == 16 and sticks == 6, f'text={no_box} chips={chips} sticks={sticks}')
    await P.click('#mailSend')
    asked = await P.inner_text('#mailErr')
    check('preset composer asks for a phrase', 'Pick a phrase' in asked, asked)
    await P.click('.mailPhrases button:has-text("Come over!")')
    await P.click('.stick[data-sticker="2"]')
    chosen = await P.evaluate("""() => {
      const on = document.querySelector('.mailPhrases button.on');
      return {phrase: on ? on.textContent : '', sticker: !!document.querySelector('.stick.on'), box: !!document.querySelector('#mailText')};
    }""")
    check('a preset chip and a sticker can be picked', chosen['phrase'] == 'Come over!' and chosen['sticker'] and not chosen['box'], str(chosen))
    path = os.path.join(SHOT, 'preset-composer-' + suffix + '.png')
    await P.screenshot(path=path)
    print('SHOT', path, flush=True)
    await P.click('#mailSend')
    await P.wait_for_function("() => !document.querySelector('#mailSheet')")
    await P.click('#btnParent')
    await adult(P)
    await P.wait_for_selector('#parentMail')
    await P.evaluate("() => { const c = document.querySelector('.parent .card'); if (c) c.scrollTop = 0; }")
    text = await P.inner_text('#parentMail')
    check('grown-up mail lists the name, the words, and a date', 'Reagan' in text and 'Come over!' in text and 'Come play today!' in text and re.search(r'(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2}, \d{4}', text) is not None, text[:300])
    path = os.path.join(SHOT, 'grownup-mail-' + suffix + '.png')
    await P.screenshot(path=path)
    print('SHOT', path, flush=True)
    btn = P.locator('.pLetter', has_text='Come over!').locator('[data-p="mailClear"]')
    await btn.click()
    await btn.click()
    await P.wait_for_function("""() => {
      const el = document.querySelector('#parentMail');
      return el && el.textContent.indexOf('Come over!') < 0 && el.textContent.indexOf('Come play today!') >= 0;
    }""")
    left = await P.inner_text('#parentMail')
    check('clearing one letter leaves the others', 'Come over!' not in left and 'Come play today!' in left, left[:240])
    await P.click('[data-p="mailClearAll"]')
    await P.click('[data-p="mailClearAll"]')
    await P.wait_for_function("""() => {
      const el = document.querySelector('#parentMail');
      return el && el.textContent.indexOf('Come play today!') < 0 && el.textContent.indexOf('Come over!') < 0;
    }""")
    await P.reload()
    await P.wait_for_selector('body.view-map #btnParent', timeout=12000)
    await P.click('#btnParent')
    await adult(P)
    await P.wait_for_selector('#parentMail')
    gone = await P.inner_text('#parentMail')
    check('cleared letters stay gone after reload', 'Come over!' not in gone and 'Come play today!' not in gone, gone[:200])

async def flow(browser, w, h, tag):
    async def ctx(slow=False):
        c = await browser.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=True, is_mobile=(w < 500))
        await c.add_init_script(SKIP_WN)
        if slow: await c.add_init_script(SLOW_MAIL)
        return c
    P = await (await ctx()).new_page()
    K = await (await ctx(True)).new_page()
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
    await P.click('[data-m="setup"]')
    await P.wait_for_selector('#pCode')
    for n in ('Reagan', 'Quinn'):
        await P.click(f'.sugg button:has-text("{n}")')
        await P.wait_for_timeout(200)
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
    if tag in ('ipad820', 'iphone'):
        suffix = '820x1180' if tag == 'ipad820' else '390x844'
        path = os.path.join(SHOT, 'free-text-composer-' + suffix + '.png')
        await P.screenshot(path=path)
        print('SHOT', path, flush=True)
    await P.click('#mailSend')
    await P.wait_for_timeout(700)
    await K.wait_for_selector('.mapMail.up', timeout=8000)
    cue = await K.locator('#mailCue.show').count()
    check(f'{tag} mailbox flag and You have got mail', cue == 1 and await K.locator('.mapMail').count() >= 2, f'cue={cue}')
    await shot(K, f'{tag}-street-mailboxes')
    await K.click(f'.mapMail[data-mail="{k_house}"]')
    await K.wait_for_selector('[data-letter]')
    t0 = time.monotonic()
    await K.click('[data-letter]')
    await K.wait_for_selector('.letter.open .words')
    words = await K.inner_text('.letter.open .words')
    who = await K.inner_text('.letter.open .who')
    check(f'{tag} letter opens with the sender and the words', 'Come play today!' in words and 'Reagan' in who, words + ' / ' + who)
    left = 2000 - int((time.monotonic() - t0) * 1000)
    if left > 0: await K.wait_for_timeout(left)
    stayed = await K.evaluate("""() => {
      const open = document.querySelector('.letter.open');
      const words = open && open.querySelector('.words');
      const id = open && open.getAttribute('data-id');
      let read = false;
      try {
        const house = __hood().myHouseId();
        const letters = (((__hood().houses.get(house) || {}).confirmed || {}).mailbox || {}).letters || [];
        const L = letters.filter(l => l.id === id)[0];
        read = !!(L && L.read);
      } catch (e) {}
      return {open: !!(open && words && (words.textContent || '').indexOf('Come play today!') >= 0), read, text: words ? words.textContent : ''};
    }""")
    check(f'{tag} unread letter stays open at 2s after the mailbox push', stayed['open'] and stayed['read'], str(stayed))
    await shot(K, f'{tag}-open-letter')
    if tag == 'ipad820':
        path = os.path.join(SHOT, 'open-letter-820x1180.png')
        await K.screenshot(path=path)
        print('SHOT', path, flush=True)
    if tag in ('ipad820', 'iphone'):
        suffix = '820x1180' if tag == 'ipad820' else '390x844'
        await P.click(f'.mapMail[data-mail="{k_house}"]')
        await P.wait_for_selector('#mailText')
        await P.fill('#mailText', 'roblox user Jane2016')
        await P.click('#mailSend')
        await P.wait_for_selector('.mailErr')
        err = await P.inner_text('.mailErr')
        check(f'{tag} a tricky letter gets a friendly oops', err == 'Oops, try different words!' and 'roblox' not in err.lower() and 'school' not in err.lower(), err)
        path = os.path.join(SHOT, 'rejected-letter-' + suffix + '.png')
        await P.screenshot(path=path)
        print('SHOT', path, flush=True)
        await P.click('.mailSheet [data-m="close"]')
        await P.wait_for_function("() => !document.querySelector('.sheet:not(.hidden)')")
        await shots_house(P, suffix)
        await presets_and_parent(P, k_house, suffix)
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
        shelf = await K.evaluate("getComputedStyle(document.querySelector('.shelf')).display")
        toggle = await K.evaluate("getComputedStyle(document.getElementById('modeToggle')).display")
        check('play mode blocks a furniture drag and hides the shelf', before == after and shelf == 'none' and toggle !== 'none' and await K.evaluate("__ui().play") == 'play', f'{before}->{after} shelf={shelf} toggle={toggle}')
    await P.context.close()
    await K.context.close()

async def shots_house(P, suffix):
    """Play / Decorate in the catalog row, and the nursery starters after one more item."""
    hid = await P.evaluate('__hood().myHouseId()')
    await P.click(f'.mapHouse[data-go="house:{hid}"]')
    await P.wait_for_selector('#modeToggle')
    words = await P.evaluate("""() => [...document.querySelectorAll('#modeToggle .modeWord')].map(el => (el.textContent || '').trim())""")
    box = await P.evaluate("""() => {
      const b = document.getElementById('modeToggle').getBoundingClientRect();
      const row = document.querySelector('.drawerTop').getBoundingClientRect();
      return { y: Math.round(b.y), row: Math.round(row.y), h: Math.round(b.height), same: Math.abs(b.y - row.y) < 8 };
    }""")
    check(f'{suffix} Play and Decorate sit in the catalog row', ' '.join(words) == 'Play Decorate' and box['same'] and box['h'] <= 56, str(words) + ' ' + str(box))
    path = os.path.join(SHOT, 'play-decorate-' + suffix + '.png')
    await P.screenshot(path=path)
    print('SHOT', path, flush=True)
    await P.click('.tab[data-room="nursery"]')
    await P.wait_for_timeout(200)
    await P.evaluate("""() => {
      __store.dispatch({ type: 'item/add', room: 'nursery', item: { id: 'shot-ball', kind: 'ball', x: 1100, y: 520, flip: false, z: 9, scale: 1 } });
    }""")
    await P.wait_for_timeout(200)
    kinds = await P.evaluate("""() => __store.get().rooms.nursery.items.map(i => i.kind)""")
    check(f'{suffix} nursery starters stay after a new item', all(k in kinds for k in ('cloud-rug', 'crib', 'crib-mobile', 'rocker', 'ball')), str(kinds))
    path = os.path.join(SHOT, 'nursery-starters-' + suffix + '.png')
    await P.screenshot(path=path)
    print('SHOT', path, flush=True)
    await P.click('#btnMap')
    await P.wait_for_selector('body.view-map .mapHouse')

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        await flow(browser, 1024, 768, 'ipad')
        await flow(browser, 390, 844, 'iphone')
        await flow(browser, 820, 1180, 'ipad820')
        await browser.close()
    failed = [k for k, v in res.items() if not v]
    print('MAIL UI', 'ok' if not failed else 'FAILED ' + ', '.join(failed), flush=True)
    if failed:
        sys.exit(1)

asyncio.run(main())
