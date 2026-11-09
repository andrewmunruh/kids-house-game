# Batch 11 item 5: cross-room wish pulses exactly one room tab in Play when wishes are on.
# Hungry doll in Living Room with fridge only in Kitchen → Kitchen tab pulses (not Bedroom,
# even if cake/juice sits there). Clears when fridge is added to living, wishes off, or Decorate.
# usage: WEB=http://127.0.0.1:PORT python tests/needs_elsewhere_tab_test.py
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
        await page.click('#modePlay')
        await page.wait_for_timeout(200)
        # Wishes on
        await page.evaluate("""() => {
          try { localStorage.setItem('khg.showWishes','1'); localStorage.setItem('preview:khg.showWishes','1'); } catch(e){}
          const b=document.getElementById('btnWishes');
          if (b && b.getAttribute('aria-pressed')==='false') b.click();
        }""")
        # Living, hungry; no fridge in living; plant a cake in bedroom (must NOT steal Kitchen)
        loc = await page.evaluate("""() => {
          const S = __store;
          S.dispatch({type:'room/switch', room:'living'});
          for (const it of (S.get().rooms.living.items||[]).filter(i=>/fridge/.test(i.kind)))
            S.dispatch({type:'item/delete', room:'living', id:it.id});
          // leftover snack in bedroom (regression for the old isFood match)
          if (!(S.get().rooms.bedroom.items||[]).some(i=>i.id==='qa-cake-else'))
            S.dispatch({type:'item/add', room:'bedroom', item:{id:'qa-cake-else', kind:'cake', x:400, y:500, flip:false}});
          const me = S.get().characters[0];
          S.dispatch({type:'char/move', id:me.id, room:'living', x:900, y:520, seat:null});
          S.dispatch({type:'char/update', id:me.id, patch:{needs:{sleepy:3,hungry:0,playful:3,clean:3}}});
          const fridges = {};
          for (const [rid, room] of Object.entries(S.get().rooms))
            fridges[rid] = (room.items||[]).filter(i=>/fridge$/i.test(String(i.kind).replace(/^pack:/,''))).map(i=>i.kind);
          return {fridges, kitchenHasFridge: (fridges.kitchen||[]).length>0};
        }""")
        check('starter fridge is in Kitchen', loc['kitchenHasFridge'], str(loc['fridges']))
        await page.wait_for_timeout(500)
        await page.evaluate("() => __store.dispatch({type:'char/update', id:__store.get().characters[0].id, patch:{}})")
        await page.wait_for_timeout(400)
        pulsed = await page.evaluate("""() => {
          const tabs = [...document.querySelectorAll('#tabs [data-room]')];
          return { play: document.body.classList.contains('mode-play'),
            pulsed: tabs.filter(t=>t.classList.contains('need-elsewhere')).map(t=>t.dataset.room) };
        }""")
        check('play mode on', pulsed['play'])
        check('exactly Kitchen tab pulses (not Bedroom)', pulsed['pulsed'] == ['kitchen'], str(pulsed))

        # Decorate: off
        await page.click('#modeDecorate'); await page.wait_for_timeout(300)
        await page.evaluate("() => __store.dispatch({type:'char/update', id:__store.get().characters[0].id, patch:{}})")
        await page.wait_for_timeout(300)
        deco = await page.evaluate("() => [...document.querySelectorAll('#tabs .need-elsewhere')].map(t=>t.dataset.room)")
        check('Decorate: no pulse', deco == [], str(deco))

        await page.click('#modePlay'); await page.wait_for_timeout(300)
        await page.evaluate("() => __store.dispatch({type:'char/update', id:__store.get().characters[0].id, patch:{}})")
        await page.wait_for_timeout(300)

        # Wishes off
        await page.evaluate("""() => {
          const b = document.getElementById('btnWishes');
          if (b && b.getAttribute('aria-pressed')==='true') b.click();
          else try { localStorage.setItem('khg.showWishes','0'); } catch(e){}
          __store.dispatch({type:'char/update', id:__store.get().characters[0].id, patch:{}});
        }""")
        await page.wait_for_timeout(400)
        off = await page.evaluate("() => [...document.querySelectorAll('#tabs .need-elsewhere')].map(t=>t.dataset.room)")
        check('Wishes off: no pulse', off == [], str(off))

        # Wishes on again
        await page.evaluate("""() => {
          const b = document.getElementById('btnWishes');
          if (b && b.getAttribute('aria-pressed')==='false') b.click();
          else try { localStorage.setItem('khg.showWishes','1'); } catch(e){}
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

        await page.evaluate("""() => {
          __store.dispatch({type:'char/update', id:__store.get().characters[0].id, patch:{needs:{}}});
        }""")
        await page.wait_for_timeout(300)
        met = await page.evaluate("() => [...document.querySelectorAll('#tabs .need-elsewhere')].map(t=>t.dataset.room)")
        check('need met: still clear', met == [], str(met))

        # Remove living fridge, restore hungry → Kitchen again
        await page.evaluate("""() => {
          const fr=(__store.get().rooms.living.items||[]).find(i=>i.id==='qa-fridge'||i.kind==='fridge');
          if (fr) __store.dispatch({type:'item/delete', room:'living', id:fr.id});
          __store.dispatch({type:'char/update', id:__store.get().characters[0].id, patch:{needs:{sleepy:3,hungry:0,playful:3,clean:3}}});
        }""")
        await page.wait_for_timeout(500)
        again = await page.evaluate("() => [...document.querySelectorAll('#tabs .need-elsewhere')].map(t=>t.dataset.room)")
        check('fridge removed: Kitchen pulses again', again == ['kitchen'], str(again))

        await b.close()
    print('ALL OK' if ok_all else 'SOME FAILED')
    sys.exit(0 if ok_all else 1)
asyncio.run(main())
