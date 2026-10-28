(scene) => {
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
  const world = document.getElementById('world');
  const r0 = world.getBoundingClientRect();
  const sx = 2400 / r0.width, sy = 600 / r0.height;
  const box = el => { if (!el) return null; const r = el.getBoundingClientRect(); return [Math.round((r.left - r0.left) * sx * 10) / 10, Math.round((r.top - r0.top) * sy * 10) / 10, Math.round(r.width * sx * 10) / 10, Math.round(r.height * sy * 10) / 10]; };
  const door = document.querySelector('#layer .yardDoor');
  return {
    scene, logical: [2400, 600],
    wall: box(document.getElementById('wall')), floor: box(document.getElementById('floor')),
    baseboard: box(document.querySelector('#world .baseboard')),
    door: door ? box(door.querySelector('.doorArt') || door) : null,
    doorTap: door ? box(door) : null,
    sceneWin: box(document.querySelector('#scenery .sceneWin')),
    eggs: [...document.querySelectorAll('#world .eggspot')].filter(e => e.offsetParent).map(e => ({ name: e.dataset.egg, box: box(e) })),
  };
}
