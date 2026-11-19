# B17b step 1 light in-game checks (no soak/gate locks).
# A new client sends picnic:1 on hello and join; picnic seats are not offered;
# an old prod-equivalent Worker ignores the flag; mixed old/new stays up.
# Run: WEB_NEW=... WEB_OLD=... HOOD=... python tests/picnic_flag_ingame_test.py
import asyncio, json, os, sys
from pathlib import Path

from playwright.async_api import async_playwright

WEB_NEW = os.environ.get("WEB_NEW", "http://127.0.0.1:5350/kids-house-game").rstrip("/")
WEB_OLD = os.environ.get("WEB_OLD", "http://127.0.0.1:5352/kids-house-game").rstrip("/")
HOOD = os.environ.get("HOOD", "http://127.0.0.1:5351").rstrip("/")
SHOTS = Path(os.environ.get("SHOTS", "/workspace/t-b17/shots/b17b1"))
SEND = Path(os.environ.get("SEND", "/workspace/t-b17/send/b17b1"))
SKIP = "for (const p of ['','preview:']) { localStorage.setItem(p+'cozy-whatsnew','999'); localStorage.setItem(p+'avatar-intro','1'); localStorage.setItem(p+'cozy-welcome','1'); }"
STANDING = {"kidX": 980, "kidY": 578, "babyX": 1240, "babyY": 578}
YARD_X, YARD_Y = 1104, 520
ART_PAD_TOP, ART_PAD_BOT = 113 / 330, 2 / 330
FENCE_Y = 372.5

PASS = FAIL = 0

def check(name, ok, extra=""):
    global PASS, FAIL
    print(("PASS " if ok else "FAIL ") + name, extra, flush=True)
    if ok:
        PASS += 1
    else:
        FAIL += 1

SETUP = """
({x, y, standing}) => {
  const s = __store;
  s.dispatch({type:'room/switch', room:'backyard'});
  const items = s.get().rooms.backyard.items;
  if (items.some(i => i.id === 'qa-pt')) s.dispatch({type:'item/delete', room:'backyard', id:'qa-pt'});
  s.dispatch({type:'item/add', room:'backyard', item:{id:'qa-pt', kind:'picnic-table', x, y, flip:false, z:40, scale:1}});
  s.get().rooms.backyard.items.forEach(i => {
    if (String(i.id).startsWith('qa-')) return;
    s.dispatch({type:'item/move', room:'backyard', id:i.id, x:400, y:i.y});
  });
  const look2 = {v:1, hair:'buns', hairC:'#5b3a29', skin:'#f6d2b5', eyes:'big', eyeC:'#5a321c', blush:true, top:'classic', topC:'#ff7aa8', bottom:'pants', bottomC:'#5aa9e6', shoes:'classic'};
  let sitter = (s.get().characters||[]).find(c => c.look2) || (s.get().characters||[])[0];
  if (!sitter) {
    s.dispatch({type:'char/add', char:{
      id:'x1', skin:'#f2c9a0', hair:'#5a3d2b', hairStyle:2, shirt:'#ff7aa8', pants:'#5aa9e6', size:'kid', acc:0,
      room:'backyard', x, y, flip:false, held:{left:null, right:null}, look2
    }});
    sitter = (s.get().characters||[]).find(c => c.id==='x1');
  }
  const sid = sitter.id;
  if (!sitter.look2) s.dispatch({type:'char/update', id:sid, patch:{look2}});
  (s.get().characters||[]).forEach(c => {
    if (c.id !== sid) s.dispatch({type:'char/move', id:c.id, room:'bedroom', x:400, y:560, seat:null});
  });
  s.dispatch({type:'char/move', id:sid, room:'backyard', x:standing.kidX, y:standing.kidY, seat:null});
  if (!s.get().baby) s.dispatch({type:'baby/meet', now: Date.now()});
  s.dispatch({type:'baby/place', room:'backyard', x:standing.babyX, y:standing.babyY, spot:'mat', bed:null, seat:null, now: Date.now()});
  try { s.dispatch({type:'cat/move', room:'kitchen', x:100}); } catch (e) {}
  try { if (s.get().dog) s.dispatch({type:'dog/move', room:'kitchen', x:120}); } catch (e) {}
  document.getElementById('modePlay')?.click();
  return sid;
}
"""

MEASURE = """
({fenceY, padTop, padBot}) => {
  const stage = document.querySelector('.stage, #stage');
  const sr = stage.getBoundingClientRect();
  const scY = sr.height / 600;
  const el = document.querySelector('.item[data-id="qa-pt"], .item[data-kind="picnic-table"]');
  const care = document.querySelector('.babyCare');
  const box = (e) => e && e.getBoundingClientRect();
  const tr = box(el), cr = box(care);
  const painted = tr ? { top: tr.top + padTop * tr.height, bottom: tr.bottom - padBot * tr.height } : null;
  let paintFoot = null;
  if (el && el.style.height) {
    const sc = parseFloat(el.style.height) / 220;
    if (sc > 0) paintFoot = +((parseFloat(el.style.top) + parseFloat(el.style.height)) / sc).toFixed(2);
  }
  const it = ((__store.get().rooms.backyard||{}).items||[]).find(i => i.id==='qa-pt');
  return {
    paintFoot, storedY: it && it.y, catalogW: it && null,
    care_clearance: (cr && painted) ? +(cr.top - painted.bottom).toFixed(1) : null,
    fence_clearance: painted ? +(painted.top - (sr.top + fenceY * scY)).toFixed(1) : null,
    seats: (__store.get().characters||[]).map(c => ({id:c.id, seat:c.seat||null, x:c.x, y:c.y, room:c.room})),
    babySeat: (__store.get().baby && __store.get().baby.seat) || null,
  };
}
"""

def parse_ws(raw):
    if raw is None:
        return None
    if isinstance(raw, (bytes, bytearray)):
        try:
            raw = raw.decode()
        except Exception:
            return None
    if not isinstance(raw, str) or not raw.startswith('{'):
        return None
    try:
        return json.loads(raw)
    except Exception:
        return None

class Wire:
    def __init__(self):
        self.sent, self.recv = [], []
    def attach(self, page):
        def on_ws(ws):
            ws.on("framesent", lambda ev: self.sent.append(parse_ws(ev)))
            ws.on("framereceived", lambda ev: self.recv.append(parse_ws(ev)))
        page.on("websocket", on_ws)
    def of(self, typ, side="sent"):
        bag = self.sent if side == "sent" else self.recv
        return [m for m in bag if m and m.get("t") == typ]

async def close_sheet(pg):
    await pg.evaluate("""() => {
      const s = document.getElementById('sheet');
      if (s && !s.classList.contains('hidden')) s.querySelector('[data-act=close]')?.click();
      document.querySelectorAll('button').forEach(b => /^OK/.test((b.textContent||'').trim()) && b.offsetParent && b.click());
      document.querySelectorAll('[class*=welcome], [class*=toast], .hello').forEach(e => { e.style.display='none'; });
    }""")
    await pg.wait_for_timeout(200)

async def boot(browser, root, w, h, wire=None):
    ctx = await browser.new_context(viewport={"width": w, "height": h})
    await ctx.add_init_script(SKIP)
    pg = await ctx.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)[:200]))
    if wire:
        wire.attach(pg)
    await pg.goto(f"{root}/?hood={HOOD}", wait_until="domcontentloaded")
    await pg.wait_for_selector("#stage", timeout=20000)
    await pg.wait_for_timeout(1100)
    await close_sheet(pg)
    return ctx, pg, errs

async def join(pg, code, bring=True, nick_i=0):
    await close_sheet(pg)
    await pg.evaluate("document.querySelector('#btnHood')?.click()")
    await pg.wait_for_timeout(200)
    await pg.evaluate("document.querySelector('[data-m=join]')?.click()")
    await pg.wait_for_selector("#codeInput", timeout=10000)
    await pg.fill("#codeInput", code.lower())
    await pg.evaluate("document.querySelector('#codeForm button')?.click()")
    await pg.wait_for_selector(".nicks button:not([disabled])", timeout=15000)
    await pg.evaluate("""(nick) => {
      const exact = document.querySelector('.nicks button[data-nick="'+nick+'"]:not([disabled])');
      const btns = [...document.querySelectorAll('.nicks button:not([disabled])')];
      (exact || btns[Number(nick)] || btns[0])?.click();
    }""", str(nick_i))
    await pg.wait_for_timeout(300)
    if await pg.evaluate("() => /already signed in/i.test(document.body.innerText)"):
        await pg.evaluate("""(nick) => {
          const btns = [...document.querySelectorAll('.nicks button:not([disabled])')];
          const next = btns.find(b => b.dataset.nick !== String(nick)) || btns[1] || btns[0];
          next?.click();
        }""", str(nick_i))
        await pg.wait_for_timeout(300)
    await pg.wait_for_function("""(bring) => {
      const b = document.querySelector(bring ? '[data-m=bring]' : '[data-m=fresh]') || document.querySelector('[data-m=bring], [data-m=fresh]');
      return !!(b && b.offsetParent);
    }""", arg=bring, timeout=10000)
    await pg.evaluate("""(bring) => {
      const b = document.querySelector(bring ? '[data-m=bring]' : '[data-m=fresh]') || document.querySelector('[data-m=bring], [data-m=fresh]');
      if (b) b.click();
    }""", bring)
    await pg.wait_for_selector("body.view-map .mapHouse", timeout=20000)

async def enter_own(pg):
    await pg.evaluate("document.querySelector('#mapWorld .mapHouse.mine').click()")
    await pg.wait_for_timeout(1000)
    await close_sheet(pg)

async def wait_art(pg, timeout=15000):
    try:
        await pg.wait_for_function("""() => {
          const t = document.querySelector('.item[data-kind="picnic-table"] img.artimg, .item[data-id="qa-pt"] img.artimg');
          return !!(t && (t.complete ? t.naturalWidth > 0 : true));
        }""", timeout=timeout)
        await pg.wait_for_timeout(200)
        return True
    except Exception:
        return False

async def drag_onto_table(pg):
    """Play drag of the first doll onto the picnic table: real mouse, then the same pointer path via events."""
    pts = await pg.evaluate("""() => {
      const c = document.querySelector('.char');
      const t = document.querySelector('.item[data-id="qa-pt"]');
      if (!c || !t) return null;
      const a = c.getBoundingClientRect(), b = t.getBoundingClientRect();
      return {cx: a.left+a.width/2, cy: a.top+a.height*0.7, tx: (b.left+b.right)/2, ty: b.top+b.height*0.55};
    }""")
    if pts:
        await pg.mouse.move(pts["cx"], pts["cy"])
        await pg.mouse.down()
        await pg.mouse.move(pts["tx"], pts["ty"], steps=10)
        await pg.mouse.up()
        await pg.wait_for_timeout(500)
    await pg.evaluate("""() => {
      const c = document.querySelector('.char');
      const t = document.querySelector('.item[data-id="qa-pt"]');
      if (!c || !t) return;
      const a = c.getBoundingClientRect(), b = t.getBoundingClientRect();
      const base = {bubbles:true, cancelable:true, pointerId:7, pointerType:'mouse', isPrimary:true, button:0, buttons:1};
      c.dispatchEvent(new PointerEvent('pointerdown', {...base, clientX:a.left+a.width/2, clientY:a.top+a.height*0.7}));
      window.dispatchEvent(new PointerEvent('pointermove', {...base, clientX:(b.left+b.right)/2, clientY:b.top+b.height*0.55}));
      window.dispatchEvent(new PointerEvent('pointerup', {...base, buttons:0, clientX:(b.left+b.right)/2, clientY:b.top+b.height*0.55}));
    }""")
    await pg.wait_for_timeout(500)

DOLL_STATE = """() => {
  const c = (__store.get().characters||[]).find(x => x.room === 'backyard');
  const el = document.querySelector('.char');
  return {seat: c ? (c.seat||null) : 'none', room: c && c.room, x: c && c.x, y: c && c.y, onScreen: !!el};
}"""

def to_jpg(src, dest, limit=1_000_000):
    from PIL import Image
    im = Image.open(src).convert("RGB")
    Path(dest).parent.mkdir(parents=True, exist_ok=True)
    for q in (90, 85, 80, 75, 70, 65, 60, 55, 50):
        im.save(dest, "JPEG", quality=q, optimize=True)
        if dest.stat().st_size <= limit:
            return
    w, h = im.size
    im.resize((int(w*0.85), int(h*0.85)), Image.Resampling.LANCZOS).save(dest, "JPEG", quality=40, optimize=True)

async def main():
    global PASS, FAIL
    SHOTS.mkdir(parents=True, exist_ok=True)
    SEND.mkdir(parents=True, exist_ok=True)
    async with async_playwright() as p:
        wk = await p.webkit.launch()
        wire = Wire()
        ctx, pg, errs = await boot(wk, WEB_NEW, 820, 1180, wire)
        info = await pg.evaluate(f'fetch("{HOOD}/api/create", {{method:"POST"}}).then(r => r.json())')
        await join(pg, info["code"], True, 0)
        await enter_own(pg)

        joins = wire.of("join", "sent")
        check("client sent join with picnic:1", bool(joins) and joins[0].get("picnic") == 1 and joins[0].get("sit") == 1 and joins[0].get("baby") == 1,
              json.dumps({k: joins[0].get(k) for k in ("t","picnic","sit","baby","v")} if joins else {}))
        welcomes = wire.of("welcome", "recv")
        errors = wire.of("error", "recv")
        check("prod-equivalent Worker welcomed the join (no error, no disconnect)",
              bool(welcomes) and not errors and await pg.evaluate("() => !!(window.__hood && __hood() && (__hood().status === 'online' || __hood().pid))"),
              f"welcome={len(welcomes)} errors={errors} status errs={errs[:2]}")

        # Reload so the next cap is a hello (token already stored).
        await pg.reload(wait_until="domcontentloaded")
        await pg.wait_for_function("() => !!document.getElementById('stage')", timeout=20000)
        await pg.wait_for_timeout(2000)
        await close_sheet(pg)
        hellos = wire.of("hello", "sent")
        check("client sent hello with picnic:1 after reload",
              bool(hellos) and any(h.get("picnic") == 1 and h.get("sit") == 1 for h in hellos),
              json.dumps([{k: h.get(k) for k in ("t","picnic","sit","baby")} for h in hellos[:3]]))
        check("prod-equivalent Worker still online after hello with picnic:1",
              not wire.of("error", "recv") and await pg.evaluate("() => { const h = window.__hood && __hood(); return !!(h && (h.status === 'online' || h.pid)); }"),
              f"errors={wire.of('error','recv')} recv_types={[m.get('t') for m in wire.recv if m][-8:]}")

        # Enter house if reload landed on the map.
        has = await pg.evaluate("() => !!(window.__store && document.querySelector('#stage'))")
        view = await pg.evaluate("() => document.body.className")
        if "view-map" in view:
            try:
                await enter_own(pg)
            except Exception:
                await join(pg, info["code"], True, 0)
                await enter_own(pg)

        await pg.evaluate(SETUP, {"x": YARD_X, "y": YARD_Y, "standing": STANDING})
        await pg.wait_for_timeout(600)
        await pg.evaluate("document.getElementById('modePlay')?.click()")
        await wait_art(pg)

        # Tap the painted table in Play: she must not sit.
        loc = await pg.evaluate("""() => {
          const el = document.querySelector('.item[data-id="qa-pt"]');
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {x: (r.left+r.right)/2, y: r.top + r.height * 0.55};
        }""")
        if loc:
            await pg.mouse.click(loc["x"], loc["y"])
            await pg.wait_for_timeout(400)
        seats = await pg.evaluate("""() => ({
          chars: (__store.get().characters||[]).map(c => c.seat||null),
          baby: (__store.get().baby && __store.get().baby.seat) || null,
        })""")
        picnic_seats = [s for s in (seats.get("chars") or []) if s and s.get("item") == "qa-pt"]
        check("tapping the picnic table does not sit the kid", not picnic_seats and not (seats.get("baby") and seats["baby"].get("item") == "qa-pt"),
              json.dumps(seats))

        # Drag the kid onto the table (Play).
        await drag_onto_table(pg)
        seats2 = await pg.evaluate("""() => (__store.get().characters||[]).map(c => ({seat: c.seat||null, room: c.room, x: c.x, y: c.y}))""")
        check("dragging the kid onto the picnic table does not sit her",
              not any(c["seat"] and c["seat"].get("item") == "qa-pt" for c in seats2), json.dumps(seats2))

        # Mixed old/new: old 5909d53 client joins the same prod-equivalent Worker street.
        old_wire = Wire()
        octx, opg, oerr = await boot(wk, WEB_OLD, 820, 1180, old_wire)
        await join(opg, info["code"], False, 1)
        old_join = old_wire.of("join", "sent")
        old_hello = old_wire.of("hello", "sent")
        old_welcome = old_wire.of("welcome", "recv")
        old_error = old_wire.of("error", "recv")
        check("old client did not send picnic:1",
              all(m.get("picnic") is None for m in old_join + old_hello),
              json.dumps({"join":[m.get("picnic") for m in old_join], "hello":[m.get("picnic") for m in old_hello]}))
        check("mixed old/new: both stay online, no Worker error",
              bool(old_welcome) and not old_error
              and await pg.evaluate("() => { const h = window.__hood && __hood(); return !!(h && (h.status === 'online' || h.pid)); }")
              and await opg.evaluate("() => { const h = window.__hood && __hood(); return !!(h && (h.status === 'online' || h.pid)); }"),
              f"old_welcome={len(old_welcome)} old_err={old_error} new_err={wire.of('error','recv')} oerr={oerr[:2]}")

        # Frames at both sizes: 2× table at foot 520, same look as B17a.
        for w, h in ((820, 1180), (1180, 820)):
            await pg.set_viewport_size({"width": w, "height": h})
            await pg.wait_for_timeout(500)
            await pg.evaluate("""() => {
              if (__store.get().currentRoom !== 'backyard') __store.dispatch({type:'room/switch', room:'backyard'});
              document.getElementById('modePlay')?.click();
            }""")
            await wait_art(pg)
            m = await pg.evaluate(MEASURE, {"fenceY": FENCE_Y, "padTop": ART_PAD_TOP, "padBot": ART_PAD_BOT})
            expect_care = 50.3 if w == 820 else 11.1
            expect_fence = 14.6 if w == 820 else 10.0
            check(f"webkit {w}x{h} paints like B17a (foot 520, care ~{expect_care}, fence ~{expect_fence})",
                  m.get("paintFoot") is not None and abs(m["paintFoot"] - 520) <= 1.5
                  and m.get("care_clearance") is not None and abs(m["care_clearance"] - expect_care) <= 1.5
                  and m.get("fence_clearance") is not None and abs(m["fence_clearance"] - expect_fence) <= 1.5,
                  json.dumps({k: m.get(k) for k in ("paintFoot","storedY","care_clearance","fence_clearance")}))
            path = SHOTS / f"webkit_{w}x{h}_play.png"
            await pg.screenshot(path=str(path), full_page=False)
            to_jpg(path, SEND / f"webkit_{w}x{h}_play.jpg")
            print("FRAME", path, flush=True)

            # Doll dropped on the table: stand her at her start spot, then Play-drag her onto the table. She must stand, not sit.
            await pg.evaluate("""({st}) => {
              const s = __store; const c = (s.get().characters||[]).find(x => x.room === 'backyard') || s.get().characters[0];
              s.dispatch({type:'char/move', id:c.id, room:'backyard', x:st.kidX, y:st.kidY, seat:null});
              document.getElementById('modePlay')?.click();
            }""", {"st": STANDING})
            await pg.wait_for_timeout(500)
            await drag_onto_table(pg)
            d = await pg.evaluate(DOLL_STATE)
            check(f"webkit {w}x{h} doll dropped on the table stands (not seated)",
                  d.get("seat") is None and d.get("room") == "backyard" and d.get("onScreen") and d.get("x") is not None, json.dumps(d))
            path = SHOTS / f"webkit_{w}x{h}_play_doll_on_table.png"
            await pg.screenshot(path=str(path), full_page=False)
            to_jpg(path, SEND / f"webkit_{w}x{h}_play_doll_on_table.jpg")
            print("FRAME", path, flush=True)

        await octx.close()
        await ctx.close()
        await wk.close()

    print(f"RESULT {PASS} pass {FAIL} fail", flush=True)
    if FAIL:
        sys.exit(1)

if __name__ == "__main__":
    os.environ.setdefault("TZ", "America/Chicago")
    asyncio.run(main())
