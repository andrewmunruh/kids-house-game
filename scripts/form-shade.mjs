// Give each generated drawing one soft form gradient on its largest face.
// Rugs get a radial pile gradient, a highlight, and a couple of nap strokes.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

function hexOf(fill) {
  const m = String(fill).match(/^#([0-9a-fA-F]{6})$/);
  return m ? m[1].toLowerCase() : null;
}
function rgb(hex) {
  return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
}
function toHex(r, g, b) {
  const c = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return '#' + c(r) + c(g) + c(b);
}
function mix(hex, toward, t) {
  const a = rgb(hex), b = rgb(toward);
  return toHex(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t);
}
function attr(tag, name) {
  const m = tag.match(new RegExp('\\b' + name + '\\s*=\\s*"([^"]*)"', 'i'));
  return m ? m[1] : null;
}
function num(tag, name, d = 0) {
  const v = attr(tag, name);
  return v == null ? d : Number(v);
}
function pathArea(d) {
  if (!d) return 0;
  const nums = (d.match(/-?\d*\.?\d+/g) || []).map(Number);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i + 1 < nums.length; i += 2) {
    minX = Math.min(minX, nums[i]); maxX = Math.max(maxX, nums[i]);
    minY = Math.min(minY, nums[i + 1]); maxY = Math.max(maxY, nums[i + 1]);
  }
  if (!Number.isFinite(minX)) return 0;
  return Math.abs((maxX - minX) * (maxY - minY));
}
function areaOf(tag) {
  const name = tag.match(/^<([a-zA-Z]+)/)?.[1];
  if (name === 'rect') return Math.abs(num(tag, 'width') * num(tag, 'height'));
  if (name === 'ellipse') return Math.abs(num(tag, 'rx') * num(tag, 'ry')) * 3;
  if (name === 'circle') { const r = num(tag, 'r'); return r * r * 3; }
  if (name === 'path' || name === 'polygon') return pathArea(attr(tag, 'd') || attr(tag, 'points') || '') * 0.5;
  return 0;
}
function isShadow(tag) {
  const op = attr(tag, 'opacity');
  if (op != null && Number(op) < 0.2) return true;
  if (tag.includes('<ellipse') && num(tag, 'ry') > 0 && num(tag, 'ry') < 5 && num(tag, 'cy') > 80) return true;
  return false;
}
function setFill(tag, fill) {
  if (/\bfill\s*=\s*"/.test(tag)) return tag.replace(/\bfill\s*=\s*"[^"]*"/, `fill="${fill}"`);
  return tag.replace(/^(<[a-zA-Z]+)/, `$1 fill="${fill}"`);
}
function isRug(slug) {
  return /rug|runner|play-mat|carpet/.test(slug);
}

function shade(kind, body) {
  if (/<(?:linear|radial)Gradient\b/.test(body)) return hoist(body);
  const re = /<(?:rect|ellipse|circle|path|polygon)\b[^>]*\/?>/g;
  let m;
  let best = null;
  while ((m = re.exec(body))) {
    const tag = m[0];
    const fill = attr(tag, 'fill');
    if (!fill || fill === 'none' || fill.startsWith('url(') || !hexOf(fill)) continue;
    if (isShadow(tag)) continue;
    const area = areaOf(tag);
    if (!best || area > best.area) best = { tag, index: m.index, fill, area };
  }
  if (!best || best.area < 40) return hoist(body);
  const hex = hexOf(best.fill);
  const light = mix(hex, 'ffffff', 0.55);
  const dark = mix(hex, '5a3d5c', 0.28);
  const id = 'a2sh' + kind.replace(/[^a-zA-Z0-9]/g, '');
  const rug = isRug(kind);
  const grad = rug
    ? `<radialGradient id="${id}" cx="36%" cy="32%" r="72%"><stop offset="0" stop-color="${light}"/><stop offset=".62" stop-color="${best.fill}"/><stop offset="1" stop-color="${dark}"/></radialGradient>`
    : `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${light}"/><stop offset=".58" stop-color="${best.fill}"/><stop offset="1" stop-color="${dark}"/></linearGradient>`;
  const next = setFill(best.tag, `url(#${id})`);
  let out = body.slice(0, best.index) + next + body.slice(best.index + best.tag.length);
  out = `<defs>${grad}</defs>` + out;
  if (rug && !/opacity="\.55"|opacity="\.6"|opacity="\.7"/.test(out)) {
    out += `<ellipse cx="40" cy="78" rx="12" ry="2.2" fill="#fff" opacity=".55"/>`;
    out += `<path d="M28 80 h10 M48 84 h12" fill="none" stroke="#5a3d5c" stroke-width="1" stroke-linecap="round" opacity=".2"/>`;
  }
  return hoist(out);
}

function hoist(body) {
  if (body.startsWith('<g stroke-linejoin="round"')) return body;
  const stripped = body.replace(/ stroke-linejoin="round"/g, '').replace(/ stroke-linecap="round"/g, '');
  if (stripped === body) return body;
  return `<g stroke-linejoin="round" stroke-linecap="round">${stripped}</g>`;
}

const files = readdirSync('src/art/generated').filter(f => f.endsWith('.ts') && f !== 'index.ts');
let n = 0;
for (const f of files) {
  const file = 'src/art/generated/' + f;
  const raw = readFileSync(file, 'utf8');
  const eq = raw.indexOf('=');
  const marks = JSON.parse(raw.slice(eq + 1).replace(/;\s*$/, ''));
  for (const [kind, mark] of Object.entries(marks)) {
    const next = shade(kind, mark.body);
    if (next !== mark.body) { mark.body = next; n++; }
  }
  const head = raw.slice(0, eq + 1);
  writeFileSync(file, head + JSON.stringify(marks) + ';\n');
}
console.log('shaded', n);
