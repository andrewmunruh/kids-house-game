# Batch 11 item 5: cross-room wish pulses exactly one room tab in Play when wishes are on.
# Clears when the matching item is added to the current room, when wishes are off, or in Decorate.
# usage: flock /workspace/surprise/gate.lock /workspace/.pwvenv/bin/python tests/needs_elsewhere_tab_test.py
#   env WEB=http://127.0.0.1:PORT
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
try:
    from testnav import SKIP_WN
except Exception:
    SKIP_WN = "localStorage.setItem('cozy-whatsnew','999'); localStorage.setItem('avatar-intro','1');"
WEB = os.environ.get('WEB', 'http://127.0.0.1:7811').rstrip('/')
assert 'workers.dev' not in WEB
ok_all = True
def check(name, ok, extra=''):
    global ok_all; ok_all &= bool(ok); print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)

async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch()
        ctx = await b.new_context(viewport={'width': 820, 'height': 1180})
        await ctx.add_init_script(SKIP_WN)
        page = await ctx.new_page()
        await page.clock.set_fixed_time('2026-06-15T12:00:00Z')
        await page.goto(f'{WEB}/kids-house-game/', wait_until='load')
        await page.wait_for_selector('#stage')
        await page.wait_for_timeout(400)
        # Play mode
        await page.click('#modePlay')
        await page.wait_for_timeout(200)
        # Ensure wishes on
        await page.evaluate("""() => { try { localStorage.setItem((window.__storeKey&&__storeKey('khg.showWishes'))||'khg.showWishes','1'); } catch(e){} }""")
        # Living, hungry, no fridge in living (delete any), kitchen keeps fridge
        info = await page.evaluate("""() => {
          const S = __store;
          S.dispatch({type:'room/switch', room:'living'});
          for (const it of (S.get().rooms.living.items||[]).filter(i=>/fridge/.test(i.kind)))
            S.dispatch({type:'item/delete', room:'living', id:it.id});
          const me = S.get().characters[0];
          S.dispatch({type:'char/move', id:me.id, room:'living', x:900, y:520, seat:null});
          S.dispatch({type:'char/update', id:me.id, patch:{needs:{sleepy:3,hungry:0,playful:3,clean:3}}});
          const kit = (S.get().rooms.kitchen?.items||[]).some(i=>/fridge/.test(i.kind));
          return {kit, room:S.get().currentRoom};
        }""")
        await page.wait_for_timeout(800)
        # Trigger paint
        await page.evaluate("() => { try { __needs && __needs.paint(); } catch(e){} }")
        # Force paint via subscribe by noop dispatch
        await page.evaluate("() => __store.dispatch({type:'char/update', id:__store.get().characters[0].id, patch:{}})")
        await page.wait_for_timeout(400)
        pulsed = await page.evaluate("""() => {
          const tabs = [...document.querySelectorAll('#tabs [data-room]')];
          return { play: document.body.classList.contains('mode-play'),
            pulsed: tabs.filter(t=>t.classList.contains('need-elsewhere')).map(t=>t.dataset.room),
            all: tabs.map(t=>({r:t.dataset.room, else:t.classList.contains('need-elsewhere')})) };
        }""")
        check('play mode on', pulsed['play'])
        check('exactly one tab pulses (kitchen)', pulsed['pulsed'] == ['kitchen'], str(pulsed))

        # Decorate: off
        await page.click('#modeDecorate'); await page.wait_for_timeout(300)
        await page.evaluate("() => __store.dispatch({type:'char/update', id:__store.get().characters[0].id, patch:{}})")
        await page.wait_for_timeout(300)
        deco = await page.evaluate("() => [...document.querySelectorAll('#tabs .need-elsewhere')].map(t=>t.dataset.room)")
        check('Decorate: no pulse', deco == [], str(deco))

        # Back to Play
        await page.click('#modePlay'); await page.wait_for_timeout(300)
        await page.evaluate("() => __store.dispatch({type:'char/update', id:__store.get().characters[0].id, patch:{}})")
        await page.wait_for_timeout(300)

        # Wishes off
        await page.evaluate("""() => {
          const KEY = (typeof storeKey==='function') ? null : null;
          // click the wishes button if present
          const b = document.getElementById('btnWishes');
          if (b && b.getAttribute('aria-pressed')==='true') b.click();
          else try { localStorage.setItem('khg.showWishes','0'); localStorage.setItem('preview:khg.showWishes','0'); } catch(e){}
          __store.dispatch({type:'char/update', id:__store.get().characters[0].id, patch:{}});
        }""")
        await page.wait_for_timeout(400)
        off = await page.evaluate("() => [...document.querySelectorAll('#tabs .need-elsewhere')].map(t=>t.dataset.room)")
        check('Wishes off: no pulse', off == [], str(off))

        # Wishes on again
        await page.evaluate("""() => {
          const b = document.getElementById('btnWishes');
          if (b && b.getAttribute('aria-pressed')==='false') b.click();
          else try { localStorage.setItem('khg.showWishes','1'); localStorage.setItem('preview:khg.showWishes','1'); } catch(e){}
          __store.dispatch({type:'char/update', id:__store.get().characters[0].id, patch:{}});
        }""")
        await page.wait_for_timeout(400)

        # Add fridge to living → clears
        await page.evaluate("""() => {
          __store.dispatch({type:'item/add', room:'living', item:{id:'qa-fridge', kind:'fridge', x:1000, y:470, flip:false}});
          __store.dispatch({type:'char/update', id:__store.get().characters[0].id, patch:{needs:{sleepy:3,hungry:0,playful:3,clean:3}}});
        }""")
        await page.wait_for_timeout(500)
        cleared = await page.evaluate("() => [...document.querySelectorAll('#tabs .need-elsewhere')].map(t=>t.dataset.room)")
        check('fridge in living: pulse cleared', cleared == [], str(cleared))

        # Meet need → still clear
        await page.evaluate("""() => {
          __store.dispatch({type:'char/update', id:__store.get().characters[0].id, patch:{needs:{}}});
        }""")
        await page.wait_for_timeout(300)
        met = await page.evaluate("() => [...document.querySelectorAll('#tabs .need-elsewhere')].map(t=>t.dataset.room)")
        check('need met: still clear', met == [], str(met))

        # Remove fridge, restore hungry → pulse kitchen again
        await page.evaluate("""() => {
          const fr=(__store.get().rooms.living.items||[]).find(i=>i.id==='qa-fridge'||i.kind==='fridge');
          if (fr) __store.dispatch({type:'item/delete', room:'living', id:fr.id});
          __store.dispatch({type:'char/update', id:__store.get().characters[0].id, patch:{needs:{sleepy:3,hungry:0,playful:3,clean:3}}});
        }""")
        await page.wait_for_timeout(500)
        again = await page.evaluate("() => [...document.querySelectorAll('#tabs .need-elsewhere')].map(t=>t.dataset.room)")
        check('fridge removed: kitchen pulses again', again == ['kitchen'], str(again))

        await b.close()
    print('ALL OK' if ok_all else 'SOME FAILED')
    sys.exit(0 if ok_all else 1)
asyncio.run(main())
