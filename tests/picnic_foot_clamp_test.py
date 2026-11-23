# B17a: a house saved with picnic-table foot y=580 must paint at PICNIC_FOOT_MAX=520
# without rewriting the stored y, until a Decorate move saves the capped y.
# Run: WEB_NEW=... HOOD=... HOOD_DATA=... python tests/picnic_foot_clamp_test.py
import asyncio, json, os, sys
from pathlib import Path

from playwright.async_api import async_playwright

WEB = os.environ.get("WEB_NEW", "http://127.0.0.1:5352/kids-house-game").rstrip("/")
HOOD = os.environ.get("HOOD", "http://127.0.0.1:5353").rstrip("/")
HOOD_DATA = Path(os.environ.get("HOOD_DATA", ""))
SHOTS = Path(os.environ.get("SHOTS", ""))
SEND = Path(os.environ.get("SEND", ""))
ART_PAD_TOP, ART_PAD_BOT = 113 / 330, 2 / 330
FENCE_Y = 372.5
CAP, SAVED = 520, 580
YARD_X = 1104
STANDING = {"kidX": 980, "kidY": 578, "babyX": 1240, "babyY": 578}
SKIP = "for (const p of ['','preview:']) { localStorage.setItem(p+'cozy-whatsnew','999'); localStorage.setItem(p+'avatar-intro','1'); localStorage.setItem(p+'cozy-welcome','1'); }"
SIZES = ((820, 1180), (1180, 820))

PASS = FAIL = 0

def check(name, ok, extra=""):
    global PASS, FAIL
    print(("PASS " if ok else "FAIL ") + name, extra, flush=True)
    if ok:
        PASS += 1
    else:
        FAIL += 1
        sys.exitcode = 1

SETUP = f"""
({{x, y, standing}}) => {{
  const s = __store;
  s.dispatch({{type:'room/switch', room:'backyard'}});
  const items = s.get().rooms.backyard.items;
  if (items.some(i => i.id === 'qa-pt')) s.dispatch({{type:'item/delete', room:'backyard', id:'qa-pt'}});
  s.dispatch({{type:'item/add', room:'backyard', item:{{id:'qa-pt', kind:'picnic-table', x, y, flip:false, z:40, scale:1}}}});
  s.get().rooms.backyard.items.forEach(i => {{
    if (String(i.id).startsWith('qa-')) return;
    s.dispatch({{type:'item/move', room:'backyard', id:i.id, x:400, y:i.y}});
  }});
  const look2 = {{v:1, hair:'buns', hairC:'#5b3a29', skin:'#f6d2b5', eyes:'big', eyeC:'#5a321c', blush:true, top:'classic', topC:'#ff7aa8', bottom:'pants', bottomC:'#5aa9e6', shoes:'classic'}};
  let sitter = (s.get().characters||[]).find(c => c.look2) || (s.get().characters||[])[0];
  if (!sitter) {{
    s.dispatch({{type:'char/add', char:{{
      id:'x1', skin:'#f2c9a0', hair:'#5a3d2b', hairStyle:2,
      shirt:'#ff7aa8', pants:'#5aa9e6', size:'kid', acc:0,
      room:'backyard', x, y, flip:false, held:{{left:null, right:null}}, look2
    }}}});
    sitter = (s.get().characters||[]).find(c => c.id==='x1');
  }}
  const sid = sitter.id;
  if (!sitter.look2) s.dispatch({{type:'char/update', id:sid, patch:{{look2}}}});
  (s.get().characters||[]).forEach(c => {{
    if (c.id !== sid) s.dispatch({{type:'char/move', id:c.id, room:'bedroom', x:400, y:560, seat:null}});
  }});
  s.dispatch({{type:'char/move', id:sid, room:'backyard', x:standing.kidX, y:standing.kidY, seat:null}});
  if (!s.get().baby) s.dispatch({{type:'baby/meet', now: Date.now()}});
  s.dispatch({{type:'baby/place', room:'backyard', x:standing.babyX, y:standing.babyY, spot:'mat', bed:null, seat:null, now: Date.now()}});
  try {{ s.dispatch({{type:'cat/move', room:'kitchen', x:100}}); }} catch (e) {{}}
  try {{ if (s.get().dog) s.dispatch({{type:'dog/move', room:'kitchen', x:120}}); }} catch (e) {{}}
  return s.get().rooms.backyard.items.find(i => i.id==='qa-pt');
}}
"""

MEASURE = """
({fenceY, padTop, padBot}) => {
  const stage = document.querySelector('.stage, #stage');
  const sr = stage.getBoundingClientRect();
  const scY = sr.height / 600;
  const boxOf = (e) => {
    if (!e) return null;
    const r = e.getBoundingClientRect();
    const cs = getComputedStyle(e);
    return {w:+r.width.toFixed(1), h:+r.height.toFixed(1), left:+r.left.toFixed(1), right:+r.right.toFixed(1),
            top:+r.top.toFixed(1), bottom:+r.bottom.toFixed(1),
            vis: r.width>2 && cs.visibility!=='hidden' && cs.display!=='none',
            cls: String(e.className||'')};
  };
  const el = document.querySelector('.item[data-id="qa-pt"], .item[data-kind="picnic-table"]');
  const table = boxOf(el);
  const care = boxOf(document.querySelector('.babyCare'));
  const kid = boxOf(document.querySelector('.char'));
  const baby = boxOf(document.querySelector('.baby'));
  const st = __store.get();
  const it = ((st.rooms.backyard||{}).items||[]).find(i => i.id==='qa-pt' || i.kind==='picnic-table');
  const painted = table ? {
    top: +(table.top + padTop * table.h).toFixed(1),
    bottom: +(table.bottom - padBot * table.h).toFixed(1),
  } : null;
  const fenceCss = +(sr.top + fenceY * scY).toFixed(1);
  let paintFoot = null;
  if (el && el.style.height) {
    const sc = parseFloat(el.style.height) / 220;
    if (sc > 0) paintFoot = +((parseFloat(el.style.top) + parseFloat(el.style.height)) / sc).toFixed(2);
  }
  const hitPainted = painted ? document.elementFromPoint((table.left+table.right)/2, painted.bottom - 8) : null;
  const hitLow = painted ? document.elementFromPoint((table.left+table.right)/2, painted.bottom + 50 * scY) : null;
  const kindOf = (n) => {
    let cur = n;
    while (cur && cur !== document.documentElement) {
      if (cur.getAttribute && cur.getAttribute('data-kind')) return cur.getAttribute('data-kind');
      cur = cur.parentElement || cur.parentNode;
    }
    return null;
  };
  return {
    stage:{w:+sr.width.toFixed(1), h:+sr.height.toFixed(1), top:+sr.top.toFixed(1), left:+sr.left.toFixed(1)},
    table, care, kid, baby, painted, fenceCss, paintFoot,
    storedY: it ? it.y : null, storedX: it ? it.x : null,
    scale:+scY.toFixed(4),
    care_clearance: (care && painted) ? +(care.top - painted.bottom).toFixed(1) : null,
    fence_clearance: painted ? +(painted.top - fenceCss).toFixed(1) : null,
    hitPainted: kindOf(hitPainted),
    hitDesc: hitPainted ? (hitPainted.tagName + '.' + String(hitPainted.className && hitPainted.className.baseVal !== undefined ? hitPainted.className.baseVal : hitPainted.className).slice(0,60) + ' parent=' + (hitPainted.parentElement ? hitPainted.parentElement.tagName + '.' + String(hitPainted.parentElement.className).slice(0,60) : '') + ' cam=' + (window.__cam ? __cam.get() : '?') + ' charsAt=' + JSON.stringify([...document.querySelectorAll('.char,.baby')].map(e => {const b=e.getBoundingClientRect(); return [e.className.slice(0,30), Math.round(b.left), Math.round(b.right), Math.round(b.top), Math.round(b.bottom)];}))) : 'elementFromPoint=null',
    hitPt: table ? [Math.round((table.left+table.right)/2), Math.round(painted.bottom - 8)] : null,
    hitLow: kindOf(hitLow),
    hitLow: kindOf(hitLow),
    hitLow: kindOf(hitLow),
    careVis: !!(care && care.vis),
  };
}
"""

async def close_sheet(pg):
    await pg.evaluate("""() => {
      const s = document.getElementById('sheet');
      if (s && !s.classList.contains('hidden')) s.querySelector('[data-act=close]')?.click();
      document.querySelectorAll('button').forEach(b => /^OK/.test((b.textContent||'').trim()) && b.offsetParent && b.click());
      document.querySelectorAll('[class*=welcome], [class*=toast], .hello').forEach(e => { e.style.display='none'; });
    }""")
    await pg.wait_for_timeout(200)


async def wait_client_ready(pg, timeout=25000):
    """Land far enough to click chrome.

    Do not wait for #stage to be visible: body.view-map (and view-street on
    the map) keeps #stage { visibility: hidden }. After a reload the owner
    often reconnects to the map; waiting for a visible #stage then times
    out even though the house is ready (#btnMenu is up, hood is online).
    Same fix as the B16 concurrency harness: wait for #btnMenu or a
    house-ready store.
    """
    await pg.wait_for_function(
        """() => {
          const menu = document.getElementById('btnMenu');
          const menuOn = !!(menu && menu.getClientRects().length);
          const hoodBtn = document.getElementById('btnHood');
          const onMap = document.body.classList.contains('view-map')
            && document.querySelectorAll('#mapWorld .mapHouse, #mapWorld .mapSpot').length > 0;
          const ready = !!(window.__store || window.__hood);
          return (menuOn && hoodBtn) || onMap || ready;
        }""",
        timeout=timeout,
    )

async def boot(browser, w, h, storage=None):
    kw = {"viewport": {"width": w, "height": h}}
    if storage:
        kw["storage_state"] = storage
    ctx = await browser.new_context(**kw)
    await ctx.add_init_script(SKIP)
    pg = await ctx.new_page()
    await pg.goto(f"{WEB}/?hood={HOOD}", wait_until="domcontentloaded")
    await wait_client_ready(pg)
    await pg.wait_for_timeout(1100)
    await close_sheet(pg)
    return ctx, pg

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

AVATAR_NO_HIT = """() => { if (!document.getElementById('qa-nohit')) { const st = document.createElement('style'); st.id = 'qa-nohit';
  // She enters a house at a random x in 900..1200 (main.ts), which can put her right on the bench's hit-test point
  // (table centre, 8px above the painted bottom) and make elementFromPoint answer with her, not the table: a flaky 'hit=None'.
  // Taking her out of hit-testing keeps the check about the painted table art; nothing else about her changes.
  st.textContent = '.char.avatar.mine, .char.avatar.mine *{pointer-events:none !important}'; document.head.appendChild(st); } }"""

async def measure(pg):
    await pg.evaluate(AVATAR_NO_HIT)
    return await pg.evaluate(MEASURE, {"fenceY": FENCE_Y, "padTop": ART_PAD_TOP, "padBot": ART_PAD_BOT})

async def set_mode(pg, play=True):
    await pg.evaluate("""(play) => { document.getElementById(play ? 'modePlay' : 'modeDecorate')?.click(); }""", play)
    await pg.wait_for_timeout(400)
    await close_sheet(pg)
    if not play:
        await pg.evaluate("""() => {
          const st = document.getElementById('studio');
          if (st) st.classList.add('hidden');
          document.querySelector('#studio .close, [data-act=closeStudio]')?.click();
        }""")
        await pg.wait_for_timeout(150)

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
      (exact || btns[nick] || btns[0])?.click();
    }""", str(nick_i))
    await pg.wait_for_timeout(300)
    # If that name is already on the street, pick the next free one.
    taken = await pg.evaluate("() => /already signed in/i.test(document.body.innerText)")
    if taken:
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

async def visit_host(pg):
    await pg.evaluate("""() => {
      const mine = document.querySelector('#mapWorld .mapHouse.mine');
      const other = [...document.querySelectorAll('#mapWorld .mapHouse')].find(e => e !== mine);
      (other || mine)?.click();
    }""")
    await pg.wait_for_timeout(1200)
    await close_sheet(pg)
    await pg.evaluate("""() => {
      if (__store.get().currentRoom !== 'backyard') __store.dispatch({type:'room/switch', room:'backyard'});
      document.getElementById('modePlay')?.click();
    }""")
    await pg.wait_for_timeout(400)

def server_picnic_y(street_id=None):
    if not HOOD_DATA or not HOOD_DATA.exists():
        return None, "no HOOD_DATA"
    found = []
    files = [HOOD_DATA / f"{street_id}.json"] if street_id else list(HOOD_DATA.glob("*.json"))
    for f in files:
        if not f.exists() or f.name.startswith("_"):
            continue
        try:
            data = json.loads(f.read_text())
        except Exception as e:
            continue
        def walk(o):
            if isinstance(o, dict):
                if o.get("kind") == "picnic-table" and "y" in o:
                    found.append((f.name, o.get("id"), o["y"]))
                for v in o.values():
                    walk(v)
            elif isinstance(o, list):
                for v in o:
                    walk(v)
        walk(data)
    qa = [x for x in found if x[1] == "qa-pt"]
    pick = qa or found
    if not pick:
        return None, "no picnic-table in hood data"
    return pick[-1][2], pick

def annotate(src, dest, m, title):
    from PIL import Image, ImageDraw, ImageFont
    im = Image.open(src).convert("RGB")
    st = m.get("stage") or {}
    ox, oy = st.get("left", 0), st.get("top", 0)
    draw = ImageDraw.Draw(im, "RGBA")
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 16)
        font2 = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 18)
    except Exception:
        font = font2 = ImageFont.load_default()
    def rect(box, color, label, width=3):
        if not box:
            return
        l, t, r, b = box["left"]-ox, box["top"]-oy, box["right"]-ox, box["bottom"]-oy
        draw.rectangle([l, t, r, b], outline=color, width=width)
        draw.text((l+4, max(0, t-20)), label, fill=color, font=font)
    table, painted = m.get("table"), m.get("painted")
    if table and painted:
        rect({"left": table["left"], "right": table["right"], "top": painted["top"], "bottom": painted["bottom"]}, (40, 160, 40), "painted table", 3)
    rect(m.get("care"), (200, 30, 30), "care bar")
    if m.get("fenceCss") is not None:
        fy = m["fenceCss"] - oy
        draw.line([(0, fy), (im.size[0], fy)], fill=(80, 40, 140), width=2)
        draw.text((8, max(0, fy-20)), "fence bottoms", fill=(80, 40, 140), font=font)
    cc, fc = m.get("care_clearance"), m.get("fence_clearance")
    lines = [
        title,
        f"care vs painted bench: {cc}px clear" if cc is not None else "care n/a",
        f"painted top vs fence: {fc}px clear" if fc is not None else "fence n/a",
        f"stored y={m.get('storedY')}  paintFoot={m.get('paintFoot')}",
    ]
    draw.rectangle([6, 6, min(im.size[0]-6, 820), 6+18*len(lines)+10], fill=(255, 246, 251, 230))
    for i, line in enumerate(lines):
        draw.text((14, 12+i*18), line, fill=(90, 61, 92), font=font2)
    Path(dest).parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "PNG")

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

async def backyard_play(pg):
    await pg.evaluate("""() => {
      if (__store.get().currentRoom !== 'backyard') __store.dispatch({type:'room/switch', room:'backyard'});
    }""")
    await set_mode(pg, True)
    await wait_art(pg)


async def load_host(browser, w, h, nick_i=0):
    """Create a street, place a y=580 picnic table, reload, and stay in that house as the owner."""
    ctx, pg = await boot(browser, w, h)
    info = await pg.evaluate(f'fetch("{HOOD}/api/create", {{method:"POST"}}).then(r => r.json())')
    await join(pg, info["code"], True, nick_i)
    await enter_own(pg)
    added = await pg.evaluate(SETUP, {"x": YARD_X, "y": SAVED, "standing": STANDING})
    await backyard_play(pg)
    await pg.wait_for_timeout(800)
    # Reload the saved house.
    await pg.reload(wait_until="domcontentloaded")
    await wait_client_ready(pg)
    await pg.wait_for_timeout(1500)
    await close_sheet(pg)
    has = await pg.evaluate("() => !!(window.__store && __store.get().rooms.backyard.items.some(i=>i.id==='qa-pt'))")
    if not has:
        try:
            await enter_own(pg)
        except Exception:
            await join(pg, info["code"], True, nick_i)
            await enter_own(pg)
    await backyard_play(pg)
    return ctx, pg, info, added

async def measure_sizes(pg, browser_name, sizes=SIZES):
    out = {}
    for w, h in sizes:
        await pg.set_viewport_size({"width": w, "height": h})
        await pg.wait_for_timeout(500)
        await backyard_play(pg)
        m = await measure(pg)
        out[(w, h)] = m
        tag = f"{browser_name} {w}x{h}"
        check(f"{tag} paints foot at 520", m.get("paintFoot") is not None and abs(m["paintFoot"] - CAP) <= 1.5, f"paintFoot={m.get('paintFoot')}")
        check(f"{tag} stored y still 580", m.get("storedY") == SAVED, f"storedY={m.get('storedY')}")
        check(f"{tag} care-bar clearance >= 8px", (m.get("care_clearance") is not None) and m["care_clearance"] >= 8, f"care={m.get('care_clearance')} fence={m.get('fence_clearance')} careVis={m.get('careVis')}")
        check(f"{tag} hit-test on painted bench", m.get("hitPainted") == "picnic-table", f"hit={m.get('hitPainted')} {m.get('hitDesc')} pt={m.get('hitPt')}")
        check(f"{tag} hit-test below cap is not the table", m.get("hitLow") != "picnic-table", f"hit={m.get('hitLow')}")
        if SHOTS:
            raw = SHOTS / f"{browser_name}_{w}x{h}_loaded_y580.png"
            ann = SHOTS / f"{browser_name}_{w}x{h}_loaded_y580_annotated.png"
            await pg.screenshot(path=str(raw), full_page=False)
            annotate(raw, ann, m, f"B17a loaded y=580 paints at 520  {w}×{h}")
            if SEND:
                to_jpg(ann, SEND / f"{browser_name}_{w}x{h}_loaded_y580_annotated.jpg")
    return out

async def drag_and_save(pg, tag, street_id=None):
    await pg.set_viewport_size({"width": 820, "height": 1180})
    await pg.wait_for_timeout(400)
    await backyard_play(pg)
    await set_mode(pg, False)
    await wait_art(pg)
    before = await measure(pg)
    check(f"{tag} pre-drag stored y still 580", before.get("storedY") == SAVED, str(before.get("storedY")))
    table = before.get("table") or {}
    painted = before.get("painted") or {}
    gx = (table["left"] + table["right"]) / 2
    gy = (painted["top"] + painted["bottom"]) / 2  # tabletop, above the Decorate drawer
    dy_css = 40
    decorate_on = await pg.evaluate("() => document.getElementById('modeDecorate')?.getAttribute('aria-pressed') === 'true' || document.body.classList.contains('decorate') || !document.querySelector('.babyCare')?.offsetParent")
    if not decorate_on:
        await set_mode(pg, False)
    # Dispatch on the item so WebKit does not miss the img hit-test, and startDrag sees the same pointerId.
    await pg.evaluate("""({x0,y0,x1,y1}) => {
      const el = document.querySelector('.item[data-id="qa-pt"]');
      const base = {bubbles:true, cancelable:true, pointerId:1, pointerType:'mouse', isPrimary:true, button:0, buttons:1};
      el.dispatchEvent(new PointerEvent('pointerdown', {...base, clientX:x0, clientY:y0}));
      const steps = 8;
      for (let i = 1; i <= steps; i++) {
        const x = x0 + (x1-x0)*i/steps, y = y0 + (y1-y0)*i/steps;
        window.dispatchEvent(new PointerEvent('pointermove', {...base, clientX:x, clientY:y}));
      }
    }""", {"x0": gx, "y0": gy, "x1": gx, "y1": gy - dy_css})
    await pg.wait_for_timeout(150)
    mid = await measure(pg)
    await pg.evaluate("""({x1,y1}) => {
      window.dispatchEvent(new PointerEvent('pointerup', {bubbles:true, cancelable:true, pointerId:1, pointerType:'mouse', isPrimary:true, button:0, buttons:0, clientX:x1, clientY:y1}));
    }""", {"x1": gx, "y1": gy - dy_css})
    await pg.wait_for_timeout(600)
    after = await measure(pg)
    moved_up = (mid.get("table") and table) and (table["top"] - mid["table"]["top"]) > 15
    check(f"{tag} grab point followed the painted table (moved up with the pointer)", moved_up,
          f"before.top={table.get('top')} mid.top={(mid.get('table') or {}).get('top')} afterY={after.get('storedY')}")
    check(f"{tag} after Decorate drag saved y is capped", after.get("storedY") is not None and after["storedY"] <= CAP,
          f"storedY={after.get('storedY')} paintFoot={after.get('paintFoot')}")
    if after.get("paintFoot") is not None and after.get("storedY") is not None:
        check(f"{tag} saved y matches the painted foot after the move", abs(after["storedY"] - after["paintFoot"]) <= 2,
              f"stored={after['storedY']} paint={after['paintFoot']}")
    await pg.wait_for_timeout(800)
    sy, detail = server_picnic_y(street_id)
    check(f"{tag} server saved y is capped after the move", sy is not None and sy <= CAP, f"y={sy} {detail}")
    return after

async def main():
    async with async_playwright() as p:
        wk = await p.webkit.launch()
        cr = await p.chromium.launch()

        ctx, pg, info, added = await load_host(wk, 820, 1180, 0)
        check("item/add stored y=580 (no snap on add)", added and added.get("y") == SAVED, str(added))
        sy, detail = server_picnic_y(info["id"])
        check("server stored y=580 after load, still unmoved", sy == SAVED, f"y={sy} {detail}")
        client_y = await pg.evaluate("() => (__store.get().rooms.backyard.items.find(i=>i.id==='qa-pt')||{}).y")
        check("client stored y=580 after load", client_y == SAVED, f"y={client_y}")
        await measure_sizes(pg, "webkit")
        await drag_and_save(pg, "webkit", info["id"])
        await ctx.close()

        cctx, cpg, cinfo, cadded = await load_host(cr, 820, 1180, 0)
        check("chromium item/add stored y=580", cadded and cadded.get("y") == SAVED, str(cadded))
        client_y = await cpg.evaluate("() => (__store.get().rooms.backyard.items.find(i=>i.id==='qa-pt')||{}).y")
        check("chromium client stored y=580 after load", client_y == SAVED, f"y={client_y}")
        await measure_sizes(cpg, "chromium")
        await drag_and_save(cpg, "chromium", cinfo["id"])
        await cctx.close()

        await wk.close()
        await cr.close()

    print(f"RESULT {PASS} pass {FAIL} fail", flush=True)
    if FAIL:
        sys.exit(1)

if __name__ == "__main__":
    os.environ.setdefault("TZ", "America/Chicago")
    asyncio.run(main())
