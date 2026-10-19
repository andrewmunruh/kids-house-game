// Build the v2 catalog drawings from the current SVG files and the inline catalog.
// The old files stay on disk so ART_V2 = false still draws them.
// Usage: node scripts/restyle-art.mjs [room...]
import { createServer } from 'vite';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const O = '#5a3d5c';
const SKIP_PETS = new Set(['cat', 'dog', 'bunny', 'fish', 'kennel', 'cat-tower']);
// These twelve are the approved hand drawings. The generator must not replace them.
const SKIP_HAND = new Set(['sofa', 'bed', 'fridge', 'lamp', 'bookshelf', 'rug', 'plant', 'table', 'pack:wardrobe', 'teddy', 'window', 'crib', 'armchair', 'picture', 'clock', 'tree', 'chair', 'stove', 'cake', 'juice', 'stars', 'tub', 'flowers', 'vanity', 'mirror', 'perfume', 'polish', 'hairdryer', 'stool', 'cloud-rug', 'crib-mobile', 'rocker']);

function parseVB(vb) {
  const [x, y, w, h] = vb.trim().split(/[\s,]+/).map(Number);
  return { x, y, w, h, r: x + w, b: y + h };
}

function hexOf(fill) {
  if (!fill) return null;
  const m = String(fill).trim().match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  return h.toLowerCase();
}

function rgb(hex) {
  return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
}

function toHex(r, g, b) {
  const c = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return '#' + c(r) + c(g) + c(b);
}

function hsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return [h, s, l];
}
function fromHsl(h, s, l) {
  const hue = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  let r, g, b;
  if (s === 0) r = g = b = l;
  else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue(p, q, h + 1 / 3);
    g = hue(p, q, h);
    b = hue(p, q, h - 1 / 3);
  }
  return [r * 255, g * 255, b * 255];
}

/** One pastel step darker, same hue. Stays light enough for an indigo night tint. */
function darken(fill) {
  const h = hexOf(fill);
  if (!h) return null;
  const [r, g, b] = rgb(h);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (max < 55) return null;
  if (max > 242 && min > 228) return null;
  let [hh, s, l] = hsl(r, g, b);
  l = Math.max(0.46, l * 0.78);
  s = Math.min(0.78, Math.max(s, 0.28));
  const [rr, gg, bb] = fromHsl(hh, s, l);
  return toHex(rr, gg, bb);
}

function attr(tag, name) {
  const m = tag.match(new RegExp('\\b' + name + '\\s*=\\s*"([^"]*)"', 'i'))
    || tag.match(new RegExp("\\b" + name + "\\s*=\\s*'([^']*)'", 'i'));
  return m ? m[1] : null;
}

function setFill(tag, fill) {
  if (/\bfill\s*=\s*"/.test(tag)) return tag.replace(/\bfill\s*=\s*"[^"]*"/, `fill="${fill}"`);
  if (/\bfill\s*=\s*'/.test(tag)) return tag.replace(/\bfill\s*=\s*'[^']*'/, `fill="${fill}"`);
  return tag.replace(/^(<\w+)/, `$1 fill="${fill}"`);
}

function num(tag, name, d = 0) {
  const v = attr(tag, name);
  return v == null ? d : Number(v);
}

function pathBBox(d) {
  if (!d) return null;
  const tok = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/gi);
  if (!tok) return null;
  let i = 0, cmd = 'M', x = 0, y = 0, sx = 0, sy = 0;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const set = (px, py) => {
    if (!Number.isFinite(px) || !Number.isFinite(py)) return;
    minX = Math.min(minX, px); maxX = Math.max(maxX, px);
    minY = Math.min(minY, py); maxY = Math.max(maxY, py);
    x = px; y = py;
  };
  const num = () => (i < tok.length && !/^[a-zA-Z]$/.test(tok[i]) ? Number(tok[i++]) : null);
  while (i < tok.length) {
    if (/^[a-zA-Z]$/.test(tok[i])) cmd = tok[i++];
    const rel = cmd === cmd.toLowerCase();
    const c = cmd.toUpperCase();
    if (c === 'Z') { x = sx; y = sy; continue; }
    if (c === 'H') { const n = num(); if (n == null) break; set(rel ? x + n : n, y); continue; }
    if (c === 'V') { const n = num(); if (n == null) break; set(x, rel ? y + n : n); continue; }
    const pairs = { M: 1, L: 1, T: 1, Q: 2, S: 2, C: 3, A: 0 }[c];
    if (c === 'A') {
      const rx = num(), ry = num(), rot = num(), large = num(), sweep = num(), nx = num(), ny = num();
      if (ny == null) break;
      set(rel ? x + nx : nx, rel ? y + ny : ny);
      continue;
    }
    if (!pairs) { i++; continue; }
    while (i < tok.length && !/^[a-zA-Z]$/.test(tok[i])) {
      const pts = [];
      for (let k = 0; k < pairs; k++) { const px = num(), py = num(); if (py == null) return null; pts.push([px, py]); }
      const last = pts[pts.length - 1];
      const nx = rel ? x + last[0] : last[0];
      const ny = rel ? y + last[1] : last[1];
      for (const p of pts) set(rel ? x + p[0] : p[0], rel ? y + p[1] : p[1]);
      set(nx, ny);
      if (c === 'M') { sx = x; sy = y; cmd = rel ? 'l' : 'L'; }
      if (i < tok.length && /^[a-zA-Z]$/.test(tok[i])) break;
    }
  }
  if (!Number.isFinite(minX)) return null;
  const w = Math.max(4, maxX - minX), h = Math.max(4, maxY - minY);
  return { x: minX, y: minY, w, h, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, area: w * h * 0.5 };
}

function bboxOf(tag) {
  const name = tag.match(/^<([a-zA-Z]+)/)?.[1];
  if (!name) return null;
  if (name === 'rect') {
    const x = num(tag, 'x'), y = num(tag, 'y'), w = num(tag, 'width'), h = num(tag, 'height');
    return { x, y, w, h, cx: x + w / 2, cy: y + h / 2, area: Math.abs(w * h) };
  }
  if (name === 'ellipse') {
    const cx = num(tag, 'cx'), cy = num(tag, 'cy'), rx = num(tag, 'rx'), ry = num(tag, 'ry');
    return { x: cx - rx, y: cy - ry, w: rx * 2, h: ry * 2, cx, cy, area: Math.abs(rx * ry) * 3 };
  }
  if (name === 'circle') {
    const cx = num(tag, 'cx'), cy = num(tag, 'cy'), r = num(tag, 'r');
    return { x: cx - r, y: cy - r, w: r * 2, h: r * 2, cx, cy, area: r * r * 3 };
  }
  if (name === 'path' || name === 'polygon' || name === 'polyline') {
    return pathBBox(attr(tag, 'd') || attr(tag, 'points') || '');
  }
  const nums = (tag.match(/-?\d*\.?\d+/g) || []).map(Number).filter(n => Number.isFinite(n));
  if (nums.length < 2) return { x: 0, y: 0, w: 10, h: 10, cx: 5, cy: 5, area: 40 };
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i + 1 < nums.length; i += 2) {
    minX = Math.min(minX, nums[i]); maxX = Math.max(maxX, nums[i]);
    minY = Math.min(minY, nums[i + 1]); maxY = Math.max(maxY, nums[i + 1]);
  }
  const w = Math.max(4, maxX - minX), h = Math.max(4, maxY - minY);
  return { x: minX, y: minY, w, h, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, area: w * h * 0.45 };
}

function prefixIds(svg, prefix) {
  const ids = new Set();
  svg.replace(/\bid\s*=\s*"([^"]+)"/g, (_, id) => { ids.add(id); return ''; });
  let out = svg;
  for (const id of ids) {
    const nid = prefix + id.replace(/[^a-zA-Z0-9_-]/g, '');
    out = out.split(`id="${id}"`).join(`id="${nid}"`);
    out = out.split(`url(#${id})`).join(`url(#${nid})`);
  }
  return out;
}

function isRug(slug) {
  return /rug|runner|carpet|play-mat|cloud-rug|mat$/.test(slug);
}

function boost(slug, box, vb) {
  const inset = (n) => Math.max(vb.x + 2, Math.min(vb.r - 2, n));
  const x = inset(box.x + box.w * 0.28);
  const y = Math.max(vb.y + 2, Math.min(vb.b - 8, box.y + box.h * 0.35));
  const s = slug.replace(/^pack:/, '');
  if (isRug(s)) {
    const cx = box.cx;
    const cy = box.cy;
    const rx = Math.max(8, Math.min(box.w * 0.32, vb.w * 0.28));
    const ry = Math.max(2.2, Math.min(box.h * 0.2, vb.h * 0.22));
    const tRx = Math.max(5, Math.min(10, box.w * 0.08));
    const tRy = Math.max(2.4, Math.min(3.6, Math.max(box.h, 14) * 0.11));
    const left = Math.max(vb.x + tRx * 0.8, box.x + tRx * 0.15);
    const right = Math.min(vb.r - tRx * 0.8, box.x + box.w - tRx * 0.15);
    const y1 = cy - tRy * 1.15;
    const y2 = cy + tRy * 1.15;
    const pill = (x, y, fill) => `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${tRx.toFixed(1)}" ry="${tRy.toFixed(1)}" fill="${fill}"/>`;
    return `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="none" stroke="#fff" stroke-width="2"/>` +
      `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="none" stroke="#e45d88" stroke-width="2" stroke-dasharray="1.6 3.2"/>` +
      pill(left, y1, '#ffc8dd') + pill(left - 1.2, y2, '#ffb7cc') +
      pill(right, y1, '#ffb7cc') + pill(right + 1.2, y2, '#e888a8');
  }
  if (/lamp|light|sconce/.test(s)) {
    return `<path d="M${(box.cx - 8).toFixed(1)} ${(box.y + 6).toFixed(1)} V${(box.y + box.h * 0.55).toFixed(1)} M${box.cx.toFixed(1)} ${(box.y + 4).toFixed(1)} V${(box.y + box.h * 0.6).toFixed(1)} M${(box.cx + 8).toFixed(1)} ${(box.y + 6).toFixed(1)} V${(box.y + box.h * 0.55).toFixed(1)}" fill="none" stroke="${O}" stroke-width="1.6" stroke-linecap="round" opacity=".35"/>`;
  }
  if (/bed|crib|bassinet|duvet/.test(s)) {
    return `<path d="M${x.toFixed(1)} ${(y + 6).toFixed(1)} l3.2 3.2 -3.2 3.2 -3.2 -3.2 z M${(x + 12).toFixed(1)} ${(y + 10).toFixed(1)} l3.2 3.2 -3.2 3.2 -3.2 -3.2 z" fill="#efe8ff" stroke="${O}" stroke-width="1.2"/>`;
  }
  if (/sofa|chair|armchair|pouf|bean|stool|cushion|seat/.test(s)) {
    return `<circle cx="${x.toFixed(1)}" cy="${(y + 4).toFixed(1)}" r="2.4" fill="#ff8fab" stroke="${O}" stroke-width="1.4"/><path d="M${(x - 8).toFixed(1)} ${(y + 12).toFixed(1)} H${(x + 14).toFixed(1)}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".8"/>`;
  }
  if (/table|desk|counter|bench/.test(s)) {
    return `<path d="M${(box.x + 6).toFixed(1)} ${(box.y + 5).toFixed(1)} H${(box.x + box.w * 0.55).toFixed(1)} M${(box.x + 10).toFixed(1)} ${(box.y + 9).toFixed(1)} H${(box.x + box.w * 0.4).toFixed(1)}" fill="none" stroke="${O}" stroke-width="1.1" stroke-linecap="round" opacity=".22"/>`;
  }
  if (/plant|flower|tree|leaf|cactus|herb|tulip|monstera|succulent|fig/.test(s)) {
    return `<path d="M${box.cx.toFixed(1)} ${(box.y + 4).toFixed(1)} V${(box.y + box.h * 0.55).toFixed(1)}" fill="none" stroke="#2f7a52" stroke-width="1.3" stroke-linecap="round" opacity=".45"/>`;
  }
  if (/fridge|stove|oven|microwave|toaster|mixer/.test(s)) {
    return `<path d="M${(box.x + 8).toFixed(1)} ${(box.cy).toFixed(1)} C${(box.x + 4).toFixed(1)} ${(box.cy - 6).toFixed(1)} ${(box.x + 12).toFixed(1)} ${(box.cy - 6).toFixed(1)} ${(box.x + 10).toFixed(1)} ${box.cy.toFixed(1)} C${(box.x + 14).toFixed(1)} ${(box.cy - 6).toFixed(1)} ${(box.x + 16).toFixed(1)} ${(box.cy - 2).toFixed(1)} ${(box.x + 8).toFixed(1)} ${(box.cy + 4).toFixed(1)} Z" fill="#ff8fab" stroke="${O}" stroke-width="1.4"/>`;
  }
  if (/shelf|book|wardrobe|dresser|cabinet|drawer|pantry/.test(s)) {
    return `<circle cx="${(box.x + box.w - 8).toFixed(1)}" cy="${box.cy.toFixed(1)}" r="2.2" fill="#f4f1f8" stroke="${O}" stroke-width="1.4"/>`;
  }
  if (/clock|watch/.test(s)) {
    return `<path d="M${box.cx.toFixed(1)} ${(box.cy - 6).toFixed(1)} V${box.cy.toFixed(1)} H${(box.cx + 5).toFixed(1)}" fill="none" stroke="${O}" stroke-width="1.6" stroke-linecap="round"/>`;
  }
  return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} H${(x + 10).toFixed(1)} M${x.toFixed(1)} ${(y + 4).toFixed(1)} H${(x + 7).toFixed(1)}" fill="none" stroke="${O}" stroke-width="1.1" stroke-linecap="round" opacity=".2"/>`;
}

function restyle(inner, vbStr, slug, wall) {
  const vb = parseVB(vbStr);
  let svg = inner.replace(/<!--[\s\S]*?-->/g, '').trim();
  svg = prefixIds(svg, 'a2' + slug.replace(/[^a-zA-Z0-9]/g, '') + '-');
  const rug = isRug(slug);
  // Swap the flat black contact shadow for two plum ellipses, same center.
  svg = svg.replace(/<ellipse\b[^>]*fill="#000(?:000)?"[^>]*\/?>/gi, (tag) => {
    if (wall || rug) return '';
    const cx = attr(tag, 'cx') || '50';
    const cy = attr(tag, 'cy') || String(vb.b - 3);
    const rx = Number(attr(tag, 'rx') || 36);
    const innerRx = Math.max(8, Math.round(rx * 0.62));
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="3.2" fill="${O}" opacity=".08"/><ellipse cx="${cx}" cy="${cy}" rx="${innerRx}" ry="1.5" fill="${O}" opacity=".12"/>`;
  });

  const tags = [];
  const re = /<([a-zA-Z][\w:-]*)\b[^>]*\/?>/g;
  let m;
  while ((m = re.exec(svg))) {
    const tag = m[0];
    if (tag.startsWith('</')) continue;
    const name = m[1].toLowerCase();
    if (['clippath', 'defs', 'lineargradient', 'radialgradient', 'stop', 'g', 'svg', 'mask'].includes(name)) continue;
    const fill = attr(tag, 'fill');
    if (!fill || fill === 'none' || fill.startsWith('url(')) continue;
    const box = bboxOf(tag);
    if (!box) continue;
    tags.push({ tag, index: m.index, name, fill, box });
  }
  if (!tags.length) return svg;

  const largest = tags.reduce((a, b) => (a.box.area > b.box.area ? a : b));
  let recolored = 0;
  const replacements = [];
  for (const t of tags) {
    if (t.box.area < Math.max(80, largest.box.area * 0.08)) continue;
    if (t.box.w > vb.w * 0.55) continue;
    if (t.box.cx < vb.x + vb.w * 0.64) continue;
    const next = darken(t.fill);
    if (!next || next.toLowerCase() === hexOf(t.fill)) continue;
    replacements.push({ index: t.index, from: t.tag, to: setFill(t.tag, next) });
    recolored++;
    if (recolored >= 3) break;
  }
  // Apply from the end so indexes stay put.
  replacements.sort((a, b) => b.index - a.index);
  for (const r of replacements) {
    svg = svg.slice(0, r.index) + r.to + svg.slice(r.index + r.from.length);
  }

  if (!recolored) {
    const side = darken(largest.fill) || '#e888a8';
    const x = Math.max(vb.x, largest.box.x + largest.box.w * 0.62);
    const y = largest.box.y + 2;
    const w = Math.max(6, Math.min(vb.r - x - 1, largest.box.w * 0.3));
    const h = Math.max(8, largest.box.h - 6);
    const id = 'a2' + slug.replace(/[^a-zA-Z0-9]/g, '') + 'side';
    svg += `<clipPath id="${id}"><rect x="${x.toFixed(1)}" y="${vb.y}" width="${(vb.r - x).toFixed(1)}" height="${vb.h}"/></clipPath>`;
    svg += `<g clip-path="url(#${id})">${setFill(largest.tag.replace(/\sstroke="[^"]*"/, '').replace(/\sstroke-width="[^"]*"/, ''), side)}</g>`;
    if (svg.length > 5200) {
      // The duplicate was too heavy. A hard-edged slab stays inside the body instead.
      svg = svg.replace(new RegExp(`<clipPath id="${id}">[\\s\\S]*$`), '');
      svg += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="4" fill="${side}"/>`;
    }
  }

  let box = largest.box;
  if (rug) {
    const ell = tags.filter(t => t.name === 'ellipse').sort((a, b) => b.box.area - a.box.area)[0];
    if (ell) box = ell.box;
  }
  const hx = Math.max(vb.x + 3, Math.min(vb.r - 16, box.x + 6));
  const hy = Math.max(vb.y + 3, Math.min(vb.b - 8, box.y + 5));
  svg += `<path d="M${hx.toFixed(1)} ${hy.toFixed(1)} q6 -2 12 1" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".75"/>`;
  svg += boost(slug, box, vb);
  return svg.replace(/\s+/g, ' ').trim();
}

function innerOf(file) {
  const raw = readFileSync(file, 'utf8');
  const vb = (raw.match(/viewBox="([^"]+)"/) || [])[1];
  const inner = raw.replace(/^[\s\S]*?<svg\b[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  return { vb, inner };
}

const roomsWanted = process.argv.slice(2);

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const mod = await vite.ssrLoadModule('/src/items.ts');
const manifest = JSON.parse(readFileSync('assets/items/manifest.json', 'utf8'));
const bySlug = Object.fromEntries(manifest.map(e => [e.slug, e]));

const groups = {};
function add(room, kind, mark) {
  if (!groups[room]) groups[room] = {};
  groups[room][kind] = mark;
}

for (const item of mod.ITEMS) {
  if (SKIP_PETS.has(item.kind) || item.cat === 'pets' || SKIP_HAND.has(item.kind)) continue;
  if (item.kind.startsWith('pack:')) {
    const slug = item.kind.slice(5);
    const entry = bySlug[slug];
    if (!entry) continue;
    if ((entry.category || '').toLowerCase() === 'pets') continue;
    const file = 'assets/items/' + entry.svg;
    const { vb, inner } = innerOf(file);
    const useVb = vb || (entry.viewBox || []).join(' ');
    if (!useVb) { console.warn('no viewBox', slug); continue; }
    const room = item.cat === 'ranch' ? 'ranch' : ((item.rooms && item.rooms[0]) || entry.room || 'any');
    add(room, item.kind, { vb: useVb, body: restyle(inner, useVb, slug, item.wall === true || entry.wall === true) });
    continue;
  }
  if (!item.svg) continue;
  const room = item.cat === 'ranch' ? 'ranch' : ((item.rooms && item.rooms[0]) || 'any');
  const vb = item.vb || '0 0 100 100';
  add(room, item.kind, { vb, body: restyle(item.svg, vb, item.kind, item.wall === true) });
}

await vite.close();

mkdirSync('src/art/generated', { recursive: true });
const names = [];
for (const room of Object.keys(groups).sort()) {
  if (roomsWanted.length && !roomsWanted.includes(room)) continue;
  const id = room.replace(/[^a-z0-9]/gi, '') || 'any';
  const file = `src/art/generated/${id}.ts`;
  const body = `import type { V2Mark } from '../v2-sample';\nexport const ${id.toUpperCase()}: Record<string, V2Mark> = ${JSON.stringify(groups[room])};\n`;
  writeFileSync(file, body);
  names.push(id);
  const lens = Object.values(groups[room]).map(m => m.body.length);
  console.log(room, Object.keys(groups[room]).length, 'min', Math.min(...lens), 'max', Math.max(...lens));
}

const allRooms = ['living', 'bedroom', 'kitchen', 'salon', 'nursery', 'backyard', 'any', 'ranch'];
const have = allRooms.filter(r => {
  try { readFileSync(`src/art/generated/${r}.ts`); return true; } catch { return false; }
});
const index = `import type { V2Mark } from '../v2-sample';\n` +
  have.map(r => `import { ${r.toUpperCase()} } from './${r}';\n`).join('') +
  `export const GENERATED: Record<string, V2Mark> = {\n` +
  have.map(r => `  ...${r.toUpperCase()},`).join('\n') +
  `\n};\n`;
writeFileSync('src/art/generated/index.ts', index);
console.log('index', have.join(','));
