# P1 regression: a posed limb must turn about its own joint. The limb groups carry an
# inline transform-origin at the joint, which browsers also apply to the transform
# attribute, so a rotate() that repeats the pivot sent sitting legs/sleeves off the body
# (Reagan's helper costume on iPad). Renders real chibi SVGs in WebKit and Chromium and
# checks each shoulder/hip point stays put (apart from the pose's own lift) (within 1 view-box px). No server needed.
import asyncio, json, os, subprocess, sys
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JOINT = {('arm', 'l'): (72, 172), ('arm', 'r'): (128, 172), ('leg', 'l'): (88, 238), ('leg', 'r'): (112, 238)}
MEASURE = r"""(joint) => {
  const svg = document.querySelector('svg'); const out = [];
  for (const g of svg.querySelectorAll('g.leg, g.arm')) {
    const side = g.classList.contains('l') ? 'l' : 'r', kind = g.classList.contains('leg') ? 'leg' : 'arm';
    const [x, y] = joint[kind + side];
    const p = svg.createSVGPoint(); p.x = x; p.y = y;
    // the limb's rendered local transform (attribute + CSS origin), joint through it
    const m = g.parentNode.getScreenCTM().inverse().multiply(g.getScreenCTM());
    const q = p.matrixTransform(m);
    const t = /translate\(0 (-?[\d.]+)\)/.exec(g.getAttribute('transform') || '');
    const lift = t ? parseFloat(t[1]) : 0;  // the pose's deliberate step-lift
    out.push({ kind, side, cls: g.getAttribute('class'), dx: q.x - x, dy: q.y - y - lift });
  }
  return out;
}"""

async def main():
    gen = subprocess.run(['npx', 'tsx', 'tests/sit_limbs_gen.ts'], cwd=ROOT, capture_output=True, text=True, check=True)
    svgs = json.loads(gen.stdout)
    joint = {k + s: v for (k, s), v in JOINT.items()}
    bad = checked = 0
    async with async_playwright() as p:
        for eng in ('webkit', 'chromium'):
            b = await getattr(p, eng).launch()
            pg = await b.new_page(viewport={'width': 400, 'height': 640}, device_scale_factor=2)
            for name, svg in svgs.items():
                await pg.set_content(f'<html><body style="margin:0"><div style="width:200px;height:320px">{svg}</div></body></html>')
                await pg.evaluate("() => { const s = document.querySelector('svg'); s.setAttribute('width','200'); s.setAttribute('height','320'); }")
                rows = await pg.evaluate(MEASURE, joint)
                legs = [r for r in rows if r['kind'] == 'leg']
                if not legs:
                    print('FAIL', eng, name, 'no legs drawn'); bad += 1
                for r in rows:
                    checked += 1
                    off = (r['dx'] ** 2 + r['dy'] ** 2) ** 0.5
                    if off > 1.0:
                        bad += 1
                        print(f"FAIL {eng} {name} {r['cls']} joint moved {off:.1f}px ({r['dx']:.1f},{r['dy']:.1f})")
            await b.close()
    print(f'{checked} limbs checked, {bad} detached')
    print('PASS' if bad == 0 else 'FAILED')
    sys.exit(1 if bad else 0)

asyncio.run(main())
