# Play drop onto a non-seat table: she lands standing BESIDE it, in view, clear of the Paint button,
# the care bar and the room arrows. Webkit, 820x1180 and 1180x820.
# Run: WEB=http://127.0.0.1:5310/kids-house-game HOOD=http://127.0.0.1:5311 python tests/table_drop_ingame_test.py
# Optional: SHOTS=dir SEND=dir TAG=before|after write frames; EXPECT=pass|probe (probe prints, never fails).
import asyncio, json, os, sys
from pathlib import Path
from playwright.async_api import async_playwright

WEB = os.environ.get("WEB", "http://127.0.0.1:5310/kids-house-game").rstrip("/")
HOOD = os.environ.get("HOOD", "http://127.0.0.1:5311").rstrip("/")
SHOTS = Path(os.environ["SHOTS"]) if os.environ.get("SHOTS") else None
SEND = Path(os.environ["SEND"]) if os.environ.get("SEND") else None
SHOT_ALL = os.environ.get("SHOT_ALL") == "1"  # one frame per drop point/camera (yard) instead of one per scene
TAG = os.environ.get("TAG", "run")
PROBE = os.environ.get("EXPECT") == "probe"
SKIP = "for (const p of ['','preview:']) { localStorage.setItem(p+'cozy-whatsnew','999'); localStorage.setItem(p+'avatar-intro','1'); localStorage.setItem(p+'cozy-welcome','1'); }"
YARD_X, YARD_Y = 1104, 520
STAND_Y = 540
NORMAL_REACH = 230
WALK_OUT = 360
SIZES = ((820, 1180), (1180, 820))
# Yard cameras: where the table sits in view. 'left' (cam 805) puts it near the left edge, as in the QA frame;
# 'right' pans so the table's right end is just inside the right edge.
CAMS = ['left', 'right', 'panned']  # 'panned' = 'right' plus a real finger pan of the sky, so the game treats the view as hers

PASS = FAIL = 0
def check(name, ok, extra=""):
    global PASS, FAIL
    print(("PASS " if ok else "FAIL ") + name, extra, flush=True)
    if ok: PASS += 1
    else: FAIL += 1

SETUP = """
({x, y, room, kind, noChairs}) => {
  const s = __store;
  s.dispatch({type:'room/switch', room});
  const items = s.get().rooms[room].items;
  if (items.some(i => i.id === 'qa-pt')) s.dispatch({type:'item/delete', room, id:'qa-pt'});
  s.dispatch({type:'item/add', room, item:{id:'qa-pt', kind, x, y, flip:false, z:40, scale:1}});
  s.get().rooms[room].items.slice().forEach(i => {
    if (String(i.id).startsWith('qa-')) return;
    if (noChairs && /chair|stool|bench/.test(i.kind)) { s.dispatch({type:'item/delete', room, id:i.id}); return; }
    if (room === 'backyard') s.dispatch({type:'item/move', room, id:i.id, x:400, y:i.y});
  });
  const look2 = {v:1, hair:'buns', hairC:'#5b3a29', skin:'#f6d2b5', eyes:'big', eyeC:'#5a321c', blush:true, top:'classic', topC:'#ff7aa8', bottom:'pants', bottomC:'#5aa9e6', shoes:'classic'};
  let sitter = (s.get().characters||[]).find(c => c.look2) || (s.get().characters||[])[0];
  if (!sitter) {
    s.dispatch({type:'char/add', char:{
      id:'x1', skin:'#f2c9a0', hair:'#5a3d2b', hairStyle:2, shirt:'#ff7aa8', pants:'#5aa9e6', size:'kid', acc:0,
      room, x, y, flip:false, held:{left:null, right:null}, look2
    }});
    sitter = (s.get().characters||[]).find(c => c.id==='x1');
  }
  const sid = sitter.id;
  if (!sitter.look2) s.dispatch({type:'char/update', id:sid, patch:{look2}});
  (s.get().characters||[]).forEach(c => {
    if (c.id !== sid) s.dispatch({type:'char/move', id:c.id, room:'bedroom', x:400, y:560, seat:null});
  });
  s.dispatch({type:'char/move', id:sid, room, x: x - 124, y:578, seat:null});
  if (!s.get().baby) s.dispatch({type:'baby/meet', now: Date.now()});
  s.dispatch({type:'baby/place', room, x: x + 136, y:578, spot:'mat', bed:null, seat:null, now: Date.now()});
  try { s.dispatch({type:'cat/move', room:'kitchen', x:100}); } catch (e) {}
  try { if (s.get().dog) s.dispatch({type:'dog/move', room:'kitchen', x:120}); } catch (e) {}
  document.getElementById('modePlay')?.click();
  return sid;
}
"""
HIDE = "() => { if (!document.getElementById('qa-hide')) { const st = document.createElement('style'); st.id='qa-hide'; st.textContent = '.char.avatar.mine{display:none !important}'; document.head.appendChild(st); } }"

# Where she stands, and what is around her, in screen px.
MEASURE = """
async ({tableId}) => {
  const R = e => { if (!e) return null; const b = e.getBoundingClientRect(); return {l:b.left, r:b.right, t:b.top, b:b.bottom, w:b.width, h:b.height}; };
  const vis = e => { if (!e || e.hidden || e.offsetParent === null && getComputedStyle(e).position !== 'fixed') return null; const r = R(e); return r.w > 2 && r.h > 2 && getComputedStyle(e).visibility !== 'hidden' ? r : null; };
  const stage = R(document.getElementById('stage'));
  const c = (__store.get().characters||[]).find(x => x.room === __store.get().currentRoom);
  const el = document.querySelector('.char[data-cid]') || document.querySelector('.char:not(.avatar)');
  const t = document.querySelector('.item[data-id="'+tableId+'"]');
  // her whole DRAWN body: the element and every part of it (hair buns, both arms), sampled for a second so a waving arm is counted
  const full = {l: 1e9, r: -1e9, t: 1e9, b: -1e9};
  for (let k = 0; k < 12; k++) {
    for (const n of el ? [el, ...el.querySelectorAll('*')] : []) { const r = n.getBoundingClientRect(); if (r.width < 1 || r.height < 1) continue;
      full.l = Math.min(full.l, r.left); full.r = Math.max(full.r, r.right); full.t = Math.min(full.t, r.top); full.b = Math.max(full.b, r.bottom); }
    await new Promise(r => setTimeout(r, 80));
  }
  const pieces = [...document.querySelectorAll('.item')].map(e => ({id: e.dataset.id, kind: e.dataset.kind, ...R(e)}));
  const nudges = ['nudgeL','nudgeR'].map(i => document.getElementById(i)).filter(e => e && !e.classList.contains('off')).map(vis).filter(Boolean);
  return {
    seat: c ? (c.seat||null) : 'none', x: c && c.x, y: c && c.y,
    cam: window.__cam && __cam.get(),
    doll: R(el), table: R(t), stage,
    paint: vis(document.getElementById('artFab')),
    care: vis(document.querySelector('.babyCare')),
    nudges,
    baby: R(document.querySelector('.baby')),
    full: full.l > 1e8 ? null : {l: full.l, r: full.r, t: full.t, b: full.b, w: full.r - full.l, h: full.b - full.t},
    pieces,
    opened: [...document.querySelectorAll('.item.opened')].map(e => e.dataset.kind),
    fridges: document.querySelectorAll('.item[data-kind*=fridge]').length,
  };
}
"""

def inter(a, b, pad=0):
    return bool(a and b and a["l"] < b["r"] + pad and a["r"] > b["l"] - pad and a["t"] < b["b"] + pad and a["b"] > b["t"] - pad)

async def close_sheet(pg):
    await pg.evaluate("""() => {
      const s = document.getElementById('sheet');
      if (s && !s.classList.contains('hidden')) s.querySelector('[data-act=close]')?.click();
      document.querySelectorAll('button').forEach(b => /^OK/.test((b.textContent||'').trim()) && b.offsetParent && b.click());
      document.querySelectorAll('[class*=welcome], [class*=toast], .hello').forEach(e => { e.style.display='none'; });
    }""")
    await pg.wait_for_timeout(200)

async def boot(browser, w, h):
    ctx = await browser.new_context(viewport={"width": w, "height": h})
    await ctx.add_init_script(SKIP)
    pg = await ctx.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)[:200]))
    await pg.goto(f"{WEB}/?hood={HOOD}", wait_until="domcontentloaded")
    await pg.wait_for_selector("#stage", timeout=20000)
    await pg.wait_for_timeout(1100)
    await close_sheet(pg)
    return ctx, pg, errs

async def join(pg, code):
    await close_sheet(pg)
    await pg.evaluate("document.querySelector('#btnHood')?.click()")
    await pg.wait_for_timeout(200)
    await pg.evaluate("document.querySelector('[data-m=join]')?.click()")
    await pg.wait_for_selector("#codeInput", timeout=10000)
    await pg.fill("#codeInput", code.lower())
    await pg.evaluate("document.querySelector('#codeForm button')?.click()")
    await pg.wait_for_selector(".nicks button:not([disabled])", timeout=15000)
    await pg.evaluate("() => { const b = [...document.querySelectorAll('.nicks button:not([disabled])')]; b[0]?.click(); }")
    await pg.wait_for_timeout(300)
    await pg.wait_for_function("""() => { const b = document.querySelector('[data-m=bring]') || document.querySelector('[data-m=fresh]'); return !!(b && b.offsetParent); }""", timeout=10000)
    await pg.evaluate("""() => { const b = document.querySelector('[data-m=bring]') || document.querySelector('[data-m=fresh]'); if (b) b.click(); }""")
    await pg.wait_for_selector("body.view-map .mapHouse", timeout=20000)

async def enter_own(pg):
    await pg.evaluate("document.querySelector('#mapWorld .mapHouse.mine').click()")
    await pg.wait_for_timeout(1000)
    await close_sheet(pg)

async def cam_for(pg, which, tx=None):
    if which == 'left': return 805 if tx is None else max(0, tx - 150)
    # screen px per room px, from two cameras; then pan so the table's right end sits 40px inside the stage's right edge.
    m = await pg.evaluate("""() => { __cam.set(0); const t = document.querySelector('.item[data-id="qa-pt"]').getBoundingClientRect();
      const a = t.right; __cam.set(100); const b = document.querySelector('.item[data-id="qa-pt"]').getBoundingClientRect().right;
      return {a, sc: (a - b) / 100, stageR: document.getElementById('stage').getBoundingClientRect().right}; }""")
    return max(0, (m["a"] - (m["stageR"] - 40)) / m["sc"])

SCENES = [
    # name, room, kind, x, y, noChairs, cam anchors, shot name
    dict(name="yard picnic table", room="backyard", kind="picnic-table", x=1104, y=520, noChairs=False, shot="yard_drop_on_table"),
    dict(name="kitchen table (no chairs)", room="kitchen", kind="table", x=1200, y=500, noChairs=True, shot="kitchen_drop_on_table"),
]

async def settle(pg, cam):
    await pg.evaluate("""(cam) => { try { window.__sky && (__sky.freeze(null), __sky.setChoice('day')); } catch(e) {}
      document.getElementById('modePlay')?.click(); if (cam !== null) window.__cam && __cam.set(cam); }""", cam)
    await pg.wait_for_timeout(1500)
    await pg.evaluate("(cam) => { if (cam !== null) window.__cam && __cam.set(cam); }", cam)
    await pg.wait_for_timeout(1500)

async def drag_to_table(pg, frac_x):
    """Real Play drag of her doll onto the table at frac_x across its width (0 = left edge, 1 = right edge)."""
    pts = await pg.evaluate("""(f) => {
      const c = document.querySelector('.char[data-cid]') || document.querySelector('.char:not(.avatar)');
      const t = document.querySelector('.item[data-id="qa-pt"]');
      const a = c.getBoundingClientRect(), b = t.getBoundingClientRect();
      return {cx: a.left+a.width/2, cy: a.top+a.height*0.7, tx: b.left+b.width*f, ty: b.top+b.height*0.55};
    }""", frac_x)
    await pg.mouse.move(pts["cx"], pts["cy"]); await pg.mouse.down()
    await pg.mouse.move(pts["tx"], pts["ty"], steps=10); await pg.mouse.up()
    await pg.wait_for_timeout(700)

def to_jpg(src, dest, limit=1_000_000):
    from PIL import Image
    im = Image.open(src).convert("RGB")
    Path(dest).parent.mkdir(parents=True, exist_ok=True)
    for q in (90, 85, 80, 75, 70, 65, 60, 55, 50):
        im.save(dest, "JPEG", quality=q, optimize=True)
        if Path(dest).stat().st_size <= limit: return
    w, h = im.size
    im.resize((int(w*0.85), int(h*0.85))).save(dest, "JPEG", quality=40, optimize=True)

async def shot(pg, name, w, h):
    if not SHOTS: return
    SHOTS.mkdir(parents=True, exist_ok=True)
    p = SHOTS / f"{TAG}_webkit_{w}x{h}_{name}.png"
    await pg.screenshot(path=str(p), full_page=False)
    if SEND: to_jpg(p, SEND / f"{TAG}_webkit_{w}x{h}_{name}.jpg")

def visible(d):
    """The doll's element box has transparent padding: about 12px each side and a 22px shadow under her feet."""
    return d and {"l": d["l"] + 12, "r": d["r"] - 12, "t": d["t"], "b": d["b"] - 22, "w": d["w"] - 24, "h": d["h"] - 22}

def judge(label, m, w, h, sc=None):
    d, t, st = visible(m["doll"]), m["table"], m["stage"]
    ok_seat = m["seat"] is None
    check(f"{label}: stands (no seat)", ok_seat, json.dumps(m["seat"]))
    check(f"{label}: feet on the ground plane y={STAND_Y}", m["y"] == STAND_Y, f"y={m['y']}")
    in_view = bool(d) and d["l"] >= st["l"] + 4 and d["r"] <= st["r"] - 4
    check(f"{label}: fully inside the stage", in_view, f"doll {d and (round(d['l']),round(d['r']))} stage {round(st['l'])}-{round(st['r'])}")
    check(f"{label}: clear of Paint button", not inter(d, m["paint"]), f"doll={d and (round(d['l']),round(d['r']),round(d['t']),round(d['b']))} paint={m['paint'] and (round(m['paint']['l']),round(m['paint']['r']),round(m['paint']['t']),round(m['paint']['b']))}")
    check(f"{label}: clear of the care bar", not inter(d, m["care"]), f"care={m['care'] and (round(m['care']['l']),round(m['care']['r']),round(m['care']['t']),round(m['care']['b']))}")
    check(f"{label}: clear of the room arrows", not any(inter(d, n) for n in m["nudges"]), "")
    # beside the table: her body is next to it, not in the middle of it. How far out she may walk (past a fridge or the baby) is judged by the "lands within 230+360px" check.
    near = bool(d and t)
    outside = bool(d and t) and ((d["l"]+d["r"])/2 < t["l"] or (d["l"]+d["r"])/2 > t["r"])
    check(f"{label}: beside the table (next to it, not on top of it)", near and outside, f"doll mid {d and round((d['l']+d['r'])/2)} table {t and (round(t['l']),round(t['r']))}")
    # her whole drawn body (hair buns, arms in any pose) is inside the stage with a 24px margin all round
    f = m["full"]
    check(f"{label}: whole drawn body inside the stage with a 24px margin", bool(f) and f["l"] >= st["l"] + 24 and f["r"] <= st["r"] - 24 and f["t"] >= st["t"] + 24 and f["b"] <= st["b"] - 24,
          f"body {f and (round(f['l']),round(f['r']),round(f['t']),round(f['b']))} stage {round(st['l']),round(st['r']),round(st['t']),round(st['b'])}")
    # not on the baby, and not on the table or any other piece (bounding boxes, whole drawn body)
    bb = m["baby"]
    if bb and f: check(f"{label}: does not overlap the baby's box", not inter(f, bb), f"body {round(f['l'])}-{round(f['r'])} baby {round(bb['l'])}-{round(bb['r'])}")
    if f:
        hit = [p for p in m["pieces"] if inter(f, p)]
        check(f"{label}: does not overlap any piece's box", not hit, f"overlaps {[(p['id'], round(p['l']), round(p['r'])) for p in hit]} body {round(f['l'])}-{round(f['r'])}")
    # the side away from the baby (the baby is always put beside the table in these scenes, and the far side is showable)
    if bb and t and d: check(f"{label}: on the side of the table away from the baby", ((d['l']+d['r'])/2 < (t['l']+t['r'])/2) != ((bb['l']+bb['r'])/2 < (t['l']+t['r'])/2), f"doll {round((d['l']+d['r'])/2)} table {round((t['l']+t['r'])/2)} baby {round((bb['l']+bb['r'])/2)}")
    # at most the normal reach plus the walk-out budget from the table (she only walks out when a fridge zone, the baby or a piece is in the way) (standBeside's 160 + 70 for a 320 piece): the camera slides, she does not wander off.
    if sc: check(f"{label}: lands within {NORMAL_REACH}+{WALK_OUT}px of the table middle", m["x"] is not None and abs(m["x"] - sc["x"]) <= NORMAL_REACH + WALK_OUT + 2, f"x={m['x']} table x={sc['x']}")
    # a table drop never opens a fridge (B18 derives fridge-open from where dolls stand)
    if sc and sc["room"] == "kitchen": check(f"{label}: the kitchen has a fridge for that check to mean something", m["fridges"] >= 1, f"fridges={m['fridges']}")
    check(f"{label}: no fridge opened by the drop", not m["opened"], f"opened={m['opened']} fridges_in_room={m['fridges']}")


_last_create = [0.0]
async def create_house(pg):
    # The hood throttles /api/create to 5 a minute per IP and counts refused tries too, so space the creates out.
    import time
    for attempt in range(3):
        wait = 13.5 - (time.time() - _last_create[0])
        if wait > 0: await pg.wait_for_timeout(int(wait * 1000))
        _last_create[0] = time.time()
        info = await pg.evaluate(f'fetch("{HOOD}/api/create", {{method:"POST"}}).then(r => r.json())')
        if info.get("code"): return info
        await pg.wait_for_timeout(65000)
    return info

async def open_house(wk, w, h):
    """One browser page per size: the hood allows 20 code lookups per 10 minutes per IP, so scenes share a page."""
    ctx, pg, errs = await boot(wk, w, h)
    info = await create_house(pg)
    await join(pg, info["code"])
    await enter_own(pg)
    return ctx, pg

async def run_scene(pg, sc, w, h, which, frac):
    label = f"{sc['name']} {w}x{h} cam={which} drop@{int(frac*100)}%"
    await pg.evaluate(SETUP, {"x": sc["x"], "y": sc["y"], "room": sc["room"], "kind": sc["kind"], "noChairs": sc["noChairs"]})
    await pg.wait_for_timeout(800)
    await pg.evaluate(HIDE)
    cam = await cam_for(pg, which, sc["x"])
    await settle(pg, cam)
    if which == 'panned':
        box = await pg.evaluate("() => { const r = document.getElementById('stage').getBoundingClientRect(); return {x: r.left + r.width * 0.5, y: r.top + 60}; }")
        await pg.mouse.move(box["x"], box["y"]); await pg.mouse.down()
        await pg.mouse.move(box["x"] + 70, box["y"], steps=8); await pg.wait_for_timeout(400); await pg.mouse.move(box["x"] + 71, box["y"]); await pg.mouse.up()  # a slow last move so the pan does not coast
        await pg.wait_for_timeout(1200)
    await drag_to_table(pg, frac)
    await pg.wait_for_timeout(2200)  # the game may slide the camera a little to keep her in view
    m = await pg.evaluate(MEASURE, {"tableId": "qa-pt"})
    if PROBE: print(label, json.dumps({k: m[k] for k in ("seat","x","y","cam")}), "doll", m["doll"] and (round(m["doll"]["l"]),round(m["doll"]["r"])), "paint", m["paint"] and (round(m["paint"]["l"]),round(m["paint"]["r"])), flush=True)
    else: judge(label, m, w, h, sc)
    if SHOT_ALL:
        await shot(pg, f"{sc['shot']}_cam-{which}_drop{int(frac*100)}", w, h)
    elif frac == 0.15 and which == 'left': await shot(pg, sc["shot"], w, h)

async def run_control(pg, w, h):
    """A real seat still seats her: the yard bench, same drag."""
    label = f"control yard bench {w}x{h}"
    await pg.evaluate(SETUP, {"x": 1104, "y": 520, "room": "backyard", "kind": "yard-bench", "noChairs": False})
    await pg.wait_for_timeout(800)
    await pg.evaluate(HIDE)
    await settle(pg, await cam_for(pg, 'left', 1104))
    await drag_to_table(pg, 0.5)
    await pg.wait_for_timeout(1800)
    m = await pg.evaluate(MEASURE, {"tableId": "qa-pt"})
    seat = m["seat"]
    d, st = m["doll"], m["stage"]
    if PROBE: print(label, json.dumps(seat), flush=True)
    else:
        check(f"{label}: she is seated on the bench", bool(seat) and seat.get("item") == "qa-pt" and seat.get("pose") == "sit", json.dumps(seat))
        check(f"{label}: seated doll is in view", bool(d) and d["l"] >= st["l"] and d["r"] <= st["r"], f"{d and (round(d['l']), round(d['r']))}")
    await shot(pg, "control_bench_seated", w, h)

async def main():
    async with async_playwright() as p:
        wk = await p.webkit.launch()
        for (w, h) in SIZES:
            ctx, pg = await open_house(wk, w, h)
            # Order matters: the yard camera is only 'hers' (panned) after a real pan, so 'panned' runs last.
            for sc in ([] if os.environ.get("ONLY") == "panned" else [x for x in SCENES if os.environ.get("ONLY") != "kitchen" or x["room"] == "kitchen"]):
                for which in ('left', 'right'):
                    for frac in (0.15, 0.5, 0.85):
                        await run_scene(pg, sc, w, h, which, frac)
            if os.environ.get("ONLY") not in ("panned", "kitchen"): await run_control(pg, w, h)
            for frac in ((0.15, 0.5, 0.85) if os.environ.get("ONLY") != "kitchen" else ()):
                await run_scene(pg, SCENES[0], w, h, 'panned', frac)
            await ctx.close()
        await wk.close()
    print(f"RESULT {PASS} passed, {FAIL} failed", flush=True)
    sys.exit(1 if FAIL else 0)

asyncio.run(main())
