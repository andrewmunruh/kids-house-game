(scene) => {
  if (scene === 'ranch' || scene === 'barn') {
    // Rainbow Ranch yard / barn: logical = the scene SVG viewBox (RW x 600), rects from the live DOM.
    const world = document.getElementById('ranchWorld'), svg = world.querySelector(':scope > svg.ranchScene');
    const [, , LW, LH] = svg.getAttribute('viewBox').split(/\s+/).map(Number);
    const r0 = world.getBoundingClientRect(), sx = LW / r0.width, sy = LH / r0.height;
    const box = el => { if (!el) return null; const r = el.getBoundingClientRect(); return [Math.round((r.left - r0.left) * sx * 10) / 10, Math.round((r.top - r0.top) * sy * 10) / 10, Math.round(r.width * sx * 10) / 10, Math.round(r.height * sy * 10) / 10]; };
    const spots = [...world.querySelectorAll('[data-r], .plot, .horse, .animal, .bucket')].map(e => ({ name: (e.dataset.r ? 'r:' + e.dataset.r : e.className.split(' ')[0] + ':' + (e.dataset.plot ?? e.dataset.horse ?? e.dataset.animal ?? e.dataset.feed + (e.style.left || ''))), box: box(e) }));
    const fence = world.querySelector(':scope > svg.fenceLayer');
    const g = { scene, logical: [LW, LH], spots, fence: fence ? box(fence) : null };
    if (scene === 'ranch') Object.assign(g, { floorLine: 410, door: [365, 330, 140, 140], doorTap: box(world.querySelector('.barnDoor')), fenceRails: [2400, 3080, 424, 459] });
    else Object.assign(g, { floorLine: 440, door: [24, 200, 206, 244], doorTap: box(world.querySelector('.barnExit')) });
    return g;
  }
  // Town scenes (map, map-portrait, park): the painting fills a host (map card clip / park world);
  // geometry = host size in logical units + the vector SVG (for the ink-alignment check) + every hotspot.
  if (scene === 'map' || scene === 'map-portrait' || scene === 'park') {
    const host = scene === 'park' ? document.getElementById('parkWorld') : document.querySelector('#mapWorld .mapClip');
    const svg = host && host.querySelector(scene === 'park' ? ':scope > svg.parkScene' : ':scope > svg.mapBg');
    if (!host || !svg) return { scene, missing: true };
    const vb = svg.viewBox.baseVal, r0 = host.getBoundingClientRect();
    const sx = vb.width / r0.width, sy = vb.height / r0.height;
    const box = el => { const r = el.getBoundingClientRect(); return [Math.round((r.left - r0.left) * sx * 10) / 10, Math.round((r.top - r0.top) * sy * 10) / 10, Math.round(r.width * sx * 10) / 10, Math.round(r.height * sy * 10) / 10]; };
    const sel = scene === 'park' ? '#parkWorld .pspot' : '#mapWorld [data-go], #mapWorld .mapMail, #mapWorld .mapKnock';
    const spots = [...document.querySelectorAll(sel)].map((e, i) => ({ name: e.dataset.go || (e.dataset.mail && 'mail:' + e.dataset.mail) || (e.dataset.knock && 'knock:' + e.dataset.knock) || e.dataset.act || ('spot' + e.dataset.spot), box: box(e) }));
    return { scene, logical: [vb.width, vb.height], svg: svg.outerHTML, spots };
  }
  // Logical-px geometry of a scene, read from the live DOM. Rooms + backyard: #world (2400x600).
  // clubhouse: #grWorld (GAMEROOM_W x 600). Shared by scene_guide.py, scene_layers.py and tests/scene_hotspot_test.py.
  const club = scene === 'clubhouse';
  const world = document.getElementById(club ? 'grWorld' : 'world');
  const LW = club ? 2600 : 2400;
  const r0 = world.getBoundingClientRect();
  const sx = LW / r0.width, sy = 600 / r0.height;
  const box = el => { if (!el) return null; const r = el.getBoundingClientRect(); return [Math.round((r.left - r0.left) * sx * 10) / 10, Math.round((r.top - r0.top) * sy * 10) / 10, Math.round(r.width * sx * 10) / 10, Math.round(r.height * sy * 10) / 10]; };
  if (club) {
    const svg = world.querySelector('svg.grScene');
    const mapDoor = svg && [...svg.children].find(g => g.tagName === 'g' && /MAP/.test(g.textContent || ''));
    const trim = svg && [...svg.children].find(e => e.tagName === 'rect' && e.getAttribute('y') === '464');
    return {
      scene, logical: [LW, 600],
      // painted things the test finds in the painting: the MAP door frame and the floor trim's ink line
      // the frame's outer ink edge: the fill box grown by half the stroke (4)
      door: mapDoor ? (b => [b[0] - 2, b[1] - 2, b[2] + 4, b[3] + 4])(box(mapDoor.querySelector('rect'))) : null,
      lines: trim ? [{ name: 'floor trim', y: box(trim)[1] }] : [],
      doorTap: box(world.querySelector('.grDoor')),
      spots: [...world.querySelectorAll('.grDoor, .grTable, .grChair')].map(e => ({ name: e.className + (e.dataset.tb ? ' ' + e.dataset.tb : '') + (e.dataset.seat ? '/' + e.dataset.seat : ''), box: box(e) })),
    };
  }
  const door = document.querySelector('#layer .yardDoor');
  const g = {
    scene, logical: [2400, 600],
    wall: box(document.getElementById('wall')), floor: box(document.getElementById('floor')),
    baseboard: box(document.querySelector('#world .baseboard')),
    door: door ? box(door.querySelector('.doorArt') || door) : null,
    doorTap: door ? box(door) : null,
    sceneWin: box(document.querySelector('#scenery .sceneWin')),
    eggs: [...document.querySelectorAll('#world .eggspot')].filter(e => e.offsetParent).map(e => ({ name: e.dataset.egg, box: box(e) })),
  };
  if (scene === 'backyard') {
    // No baseboard outdoors (hidden): the drift lines are the lawn's horizon and the house wall's foot.
    const svg = document.querySelector('#scenery svg.yardWorld');
    const lawn = svg && [...svg.children].find(e => e.tagName === 'rect' && e.getAttribute('y') === '360' && e.getAttribute('height') === '240');
    const wall = svg && [...svg.children].find(e => e.tagName === 'rect' && e.getAttribute('x') === '864' && e.getAttribute('y') === '150');
    g.baseboard = null;
    g.lines = [lawn && { name: 'lawn horizon', y: box(lawn)[1], x: [0, 840] }].filter(Boolean);
    g.house = wall ? box(wall) : null;
  }
  return g;
}
