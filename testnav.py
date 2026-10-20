# Shared helpers for the Playwright tests: map navigation + the localStorage prefix of the build under test.
# PFX="preview:" for the preview build (its keys are prefixed so it never touches the real save); "" for production.
import io, os
from PIL import Image
PFX = os.environ.get('PFX', '')
def local_page():
    """Default game URL. HOOD=http://localhost:8788 points the suite at `npm run worker:dev` (node server is :8787)."""
    hood = os.environ.get('HOOD', 'http://localhost:8787').rstrip('/')
    return f'http://localhost:4173/kids-house-game/?hood={hood}'
SKIP_WN = f"localStorage.getItem('{PFX}cozy-whatsnew') || localStorage.setItem('{PFX}cozy-whatsnew', '999')"  # skip the What's new popup
def K(k): return PFX + k
async def tap(pg, sel, **kwargs):
    """Click a control. Rows that live in the Menu are opened first."""
    in_menu = await pg.evaluate("""(sel) => {
      const el = document.querySelector(sel);
      return !!(el && el.closest('#menuPop'));
    }""", sel)
    if in_menu:
        hidden = await pg.evaluate("() => document.getElementById('menuPop').classList.contains('hidden')")
        if hidden:
            await pg.click('#btnMenu')
            await pg.wait_for_selector('#menuPop:not(.hidden)')
    await pg.click(sel, **kwargs)

async def to_map(pg):
    if not await pg.evaluate("document.body.classList.contains('view-map')"):
        await pg.click('#btnMap')
    await pg.wait_for_selector('body.view-map #mapWorld .mapSpot', timeout=8000); await pg.wait_for_timeout(450)
async def go(pg, place):
    """place: 'park' | 'ranch' | 'home' | 'house:<id>' (tap it on the map) or 'barn' (ranch, then the barn door)."""
    if place == 'barn':
        await go(pg, 'ranch'); await pg.click('.barnDoor'); await pg.wait_for_selector('body.in-barn #ranchWorld .barnScene'); await pg.wait_for_timeout(500); return
    await to_map(pg); await pg.click(f'[data-go="{place}"]')
    sel = {'park': 'body.view-park #parkWorld .parkScene', 'ranch': 'body.view-ranch #ranchWorld .ranchScene', 'gameroom': 'body.view-gameroom #grWorld .grScene'}.get(place, 'body:not(.view-street) #stage')
    await pg.wait_for_selector(sel, timeout=8000); await pg.wait_for_timeout(500)

# A pink 3, same paints as the Slay card face, so dim-card contrast is measured on the real number.
SLAY_PINK_3 = '''<svg viewBox="0 0 70 100"><rect x="2" y="2" width="66" height="96" rx="13" fill="#ff7eb3" stroke="#5a3d5c" stroke-width="3"/><rect x="6" y="6" width="58" height="88" rx="10" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/><ellipse cx="24" cy="20" rx="16" ry="8" fill="#fff" opacity=".38"/><text x="8" y="16" font-size="13" font-weight="900" fill="#9d174d" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">3</text><text x="62" y="94" font-size="13" font-weight="900" text-anchor="end" fill="#9d174d" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">3</text><text x="35" y="68" text-anchor="middle" font-size="48" font-weight="900" fill="#9d174d" stroke="#fff" stroke-width="6" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">3</text></svg>'''

def about_slay_card(box, tol=4):
    """iPad hand cards are about 90×130 CSS pixels."""
    return bool(box) and abs(box['width'] - 90) <= tol and abs(box['height'] - 130) <= tol

def _lin(c):
    x = c / 255.0
    return x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4

def contrast_ratio(a, b):
    def L(rgb):
        r, g, b = rgb
        return 0.2126 * _lin(r) + 0.7152 * _lin(g) + 0.0722 * _lin(b)
    hi, lo = max(L(a), L(b)), min(L(a), L(b))
    return (hi + 0.05) / (lo + 0.05)

def face_chroma(png):
    """How colored the upper card face is. Grey is near 0; a pink Slay card stays high."""
    im = Image.open(io.BytesIO(png)).convert('RGB')
    w, h = im.size
    pix = im.load()
    rs = gs = bs = n = 0
    y0, y1 = int(h * 0.14), max(int(h * 0.14) + 1, int(h * 0.42))
    x0, x1 = int(w * 0.16), max(int(w * 0.16) + 1, int(w * 0.84))
    for y in range(y0, y1):
        for x in range(x0, x1):
            r, g, b = pix[x, y]
            rs += r; gs += g; bs += b; n += 1
    n = max(1, n)
    r, g, b = rs // n, gs // n, bs // n
    return max(r, g, b) - min(r, g, b), (r, g, b)

def dim_card_contrast(png):
    """Contrast of the numeral ink against the card face, from a rendered dim card."""
    im = Image.open(io.BytesIO(png)).convert('RGB')
    w, h = im.size
    pix = im.load()
    samples = []
    x0, x1 = int(w * 0.22), max(int(w * 0.22) + 1, int(w * 0.78))
    y0, y1 = int(h * 0.32), max(int(h * 0.32) + 1, int(h * 0.76))
    for y in range(y0, y1):
        for x in range(x0, x1):
            r, g, b = pix[x, y]
            samples.append((0.2126 * r + 0.7152 * g + 0.0722 * b, (r, g, b)))
    samples.sort(key=lambda t: t[0])
    n = len(samples)
    ink_ps = [p for _, p in samples[:max(1, n // 14)]]
    face_ps = [p for _, p in samples[int(n * 0.42):int(n * 0.72)]]
    def avg(ps):
        k = max(1, len(ps))
        return tuple(sum(p[i] for p in ps) // k for i in range(3))
    ink, face = avg(ink_ps), avg(face_ps)
    return contrast_ratio(ink, face), ink, face

# The street note must stay off the seat row (the table).
NOTE_VS_TABLE_JS = """() => {
  const note = document.getElementById('needFriend');
  const lobby = document.querySelector('.lobby');
  if (!note || !lobby) return { missing: true };
  const a = note.getBoundingClientRect();
  const hit = (r) => a.left < r.right - 0.5 && a.right > r.left + 0.5 && a.top < r.bottom - 0.5 && a.bottom > r.top + 0.5;
  const seats = [...document.querySelectorAll('.lobbySeat')].map(el => el.getBoundingClientRect());
  const lb = lobby.getBoundingClientRect();
  return { overlap: hit(lb) || seats.some(hit), gap: a.top - lb.bottom };
}"""

async def inject_slay_hand(pg, n, mode):
    """Drop a fake Slay hand into the overlay. mode is 'wait' or 'turn'."""
    await pg.evaluate("""({svg, n, mode}) => {
      const root = document.getElementById('tableOverlay');
      root.classList.remove('hidden');
      const cards = Array.from({length: n}, (_, i) => {
        const cls = mode === 'wait' ? 'slayCard wait' : (i % 2 ? 'slayCard can' : 'slayCard dim');
        const dis = cls.includes('can') ? '' : 'disabled';
        return `<button type="button" class="${cls}" data-card="${i}" ${dis}>${svg}</button>`;
      }).join('');
      const whose = mode === 'wait' ? '<div class="whose">Mia\\'s turn</div>' : '<div class="whose yours">Your turn!</div>';
      root.innerHTML = `<div class="tblCard game-slay"><div class="tblTop"><h2>Slay</h2></div>
        <div id="tblStage"><div class="slayFelt">${whose}
        <div class="slayOpps"><div class="slayOpp"><b>Mia</b><span class="cnt">7</span></div><div class="slayOpp"><b>Lou</b><span class="cnt">6</span></div></div>
        <div class="slayPile"><button type="button" class="slayDeck" disabled></button><div class="slayDiscard">${svg}</div><div class="nowColor" style="background:#ff7eb3"></div></div>
        <div id="slayHand" class="slayHand ${mode === 'wait' ? '' : 'isTurn'}">${cards}</div>
        <button type="button" id="slayCall" class="slayCall" disabled>SLAY!</button></div></div>
        <div class="tblBar"><button type="button" id="tblBack">Back to room</button><button type="button" id="tblLeave">Leave table</button></div></div>`;
    }""", {'svg': SLAY_PINK_3, 'n': n, 'mode': mode})

async def read_slay_hand(pg):
    """Clip, tap, row count, and how the table sits in a tall portrait panel."""
    return await pg.evaluate("""() => {
      const table = document.querySelector('.tblCard').getBoundingClientRect();
      const hand = document.getElementById('slayHand');
      const call = document.getElementById('slayCall').getBoundingClientRect();
      const phone = document.body.classList.contains('phone');
      const cards = [...hand.querySelectorAll('.slayCard')];
      const hitCard = (el) => {
        const b = el.getBoundingClientRect();
        const x = Math.min(innerWidth - 2, Math.max(1, b.left + b.width / 2));
        const y = Math.min(innerHeight - 2, Math.max(1, b.top + b.height * 0.42));
        const hit = document.elementFromPoint(x, y);
        const id = hit && hit.closest('.slayCard') ? hit.closest('.slayCard').dataset.card : null;
        const visH = Math.min(b.bottom, table.bottom) - Math.max(b.top, table.top);
        const visW = Math.min(b.right, table.right) - Math.max(b.left, table.left);
        return {id: el.dataset.card, own: id === el.dataset.card, clipped: visH < b.height - 2 || visW < b.width - 2, top: Math.round(b.top)};
      };
      let measured;
      if (phone) {
        measured = [];
        for (const el of cards) {
          hand.scrollLeft = Math.max(0, el.offsetLeft - hand.clientWidth / 2 + el.offsetWidth / 2);
          measured.push(hitCard(el));
        }
        hand.scrollLeft = 0;
      } else measured = cards.map(hitCard);
      const tops = measured.map(m => m.top);
      const cx = Math.min(innerWidth - 2, Math.max(1, call.left + call.width / 2));
      const cy = Math.min(innerHeight - 2, Math.max(1, call.top + call.height / 2));
      const ch = document.elementFromPoint(cx, cy);
      const top = document.querySelector('.tblTop').getBoundingClientRect();
      const bar = document.querySelector('.tblBar').getBoundingClientRect();
      const margin = cards.length ? parseFloat(getComputedStyle(cards[0]).marginTop) : 0;
      return {
        n: cards.length,
        bad: measured.filter(m => !m.own || m.clipped).map(m => m.id + (m.clipped ? ':clip' : ':tap')),
        rows: Math.max(...tops) - Math.min(...tops) > 40 ? 2 : 1,
        margin,
        callIn: call.top >= table.top - 1 && call.bottom <= table.bottom + 1 && call.top >= -1 && call.bottom <= innerHeight + 1,
        callHit: !!(ch && ch.closest('#slayCall')),
        above: Math.round(top.top - table.top),
        below: Math.round(table.bottom - bar.bottom),
      };
    }""")

async def read_wait_style(pg):
    return await pg.evaluate("""() => {
      const el = document.querySelector('#slayHand .slayCard.wait');
      if (!el) return {missing: true};
      const s = getComputedStyle(el);
      const shape = el.querySelector('svg rect, svg path, svg circle');
      const allWait = [...document.querySelectorAll('#slayHand .slayCard')].every(c => c.classList.contains('wait') && !c.classList.contains('dim'));
      return {opacity: Number(s.opacity), filter: shape ? getComputedStyle(shape).filter : s.filter, allWait};
    }""")

async def read_secrets(pg):
    """Where the Surprises pill sits relative to the top centre of the wall."""
    return await pg.evaluate("""() => {
      const pill = document.getElementById('secrets').getBoundingClientRect();
      const stage = document.querySelector('.stage').getBoundingClientRect();
      const cx = stage.left + stage.width / 2;
      const y = stage.top + 14;
      const el = document.getElementById('secrets');
      const mid = (pill.left + pill.right) / 2;
      const ox = Math.min(pill.right, stage.right) - Math.max(pill.left, stage.left);
      const oy = Math.min(pill.bottom, stage.bottom) - Math.max(pill.top, stage.top);
      return {
        on: pill.width > 20 && pill.height > 16 && pill.left >= -1 && pill.top >= -1 && pill.right <= innerWidth + 1 && pill.bottom <= innerHeight + 1,
        coversCenter: pill.left <= cx && pill.right >= cx && pill.top <= y + 8 && pill.bottom >= stage.top - 1,
        side: mid > innerWidth * 0.62,
        centered: Math.abs(mid - innerWidth / 2) < 36,
        overlap: ox > 0.5 && oy > 0.5,
        overlapBox: {w: Math.round(Math.max(0, ox)), h: Math.round(Math.max(0, oy))},
        gutter: Math.round(innerWidth - stage.right),
        text: (el.textContent || '').replace(/\\s+/g, ' ').trim(),
        compact: el.classList.contains('compact'),
        chrome: document.body.classList.contains('secrets-chrome'),
        mid: Math.round(mid), vw: innerWidth,
        pill: {x: Math.round(pill.x), y: Math.round(pill.y), w: Math.round(pill.width), h: Math.round(pill.height)},
      };
    }""")

async def read_door_hint(pg):
    return await pg.evaluate("""() => {
      const el = document.querySelector('.barnDoor .doorHint');
      if (!el) return {missing: true};
      const b = el.getBoundingClientRect();
      return {
        fs: parseFloat(getComputedStyle(el).fontSize),
        text: (el.textContent || '').trim(),
        on: b.width > 20 && b.left >= -1 && b.top >= -1 && b.right <= innerWidth + 1 && b.bottom <= innerHeight + 1,
        w: Math.round(b.width), h: Math.round(b.height),
      };
    }""")

async def read_paddock(pg):
    """Portrait-phone horses: size, gaps, a mount point, and a ground tap that is not the horse."""
    return await pg.evaluate("""() => {
      const scEl = document.getElementById('ranchScroll');
      const all = [...document.querySelectorAll('#ranchWorld .horse')];
      const horses = all.filter(el => getComputedStyle(el).display !== 'none');
      if (!horses.length) return {dom: all.length, n: 0};
      const mid = horses[Math.floor(horses.length / 2)];
      scEl.scrollLeft = mid.offsetLeft - scEl.clientWidth / 2 + mid.offsetWidth / 2;
      const port = scEl.getBoundingClientRect();
      let horse = 0, open = 0;
      const y0 = port.top + port.height * 0.72;
      const y1 = Math.min(port.bottom - 4, innerHeight - 1);
      for (let x = port.left + 8; x < port.right - 8; x += 16) {
        for (let y = y0; y < y1; y += 14) {
          const el = document.elementFromPoint(x, y);
          if (el && el.closest('.horse')) horse++; else open++;
        }
      }
      const boxes = horses.map(el => el.getBoundingClientRect()).sort((a, b) => a.left - b.left);
      let minGap = 999;
      for (let i = 1; i < boxes.length; i++) minGap = Math.min(minGap, boxes[i].left - boxes[i - 1].right);
      const b = mid.getBoundingClientRect();
      const mountHit = document.elementFromPoint(b.left + b.width / 2, b.top + b.height * 0.45);
      const blocked = (el) => !!(el && el.closest('.horse, .animal, .rprop, .savatar, .pet, .plot, .bucket, .fallenApple, .basketChip, .top, .drawer'));
      let clear = null;
      for (let x = b.left + 4; x < b.right - 4 && !clear; x += 8) {
        for (let y = b.top + 4; y < b.bottom - 4; y += 8) {
          const el = document.elementFromPoint(x, y);
          if (!blocked(el) && el && el.closest('#ranchWorld')) { clear = {x, y}; break; }
        }
      }
      const candidates = [
        [Math.min(innerWidth - 8, b.right + 18), b.bottom - 8],
        [Math.max(8, b.left - 18), b.bottom - 8],
        [b.left + b.width / 2, Math.min(innerHeight - 8, b.bottom + 16)],
      ];
      let ground = null;
      for (const [x, y] of candidates) {
        if (x < 4 || y < 4 || x > innerWidth - 4 || y > innerHeight - 4) continue;
        const el = document.elementFromPoint(x, y);
        if (blocked(el) || !el || !el.closest('#ranchWorld')) continue;
        ground = {x, y};
        break;
      }
      const me = window.__ranch && __ranch().me;
      return {
        dom: all.length, n: horses.length, horse, open, minGap: Math.round(minGap),
        heights: boxes.map(r => Math.round(r.height)), widths: boxes.map(r => Math.round(r.width)),
        mounts: !!(mountHit && mountHit.closest('.horse')),
        tap: clear || ground, clear: !!clear,
        me: me && {x: me.x, ride: me.ride == null ? null : me.ride},
      };
    }""")
