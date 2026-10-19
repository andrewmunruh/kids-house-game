// Canvas is 200×320, exactly twice the game's 100×160 frame. Game units are canvas / 2.
// Shading is a fixed plum at low opacity or white. No color-mix(), no blur filters.

export const LINE = 'var(--line)';
const LINE_K = 1.4;
export const SH = 'fill="#3a1d3c" opacity=".14"';
export const SH2 = 'fill="#3a1d3c" opacity=".22"';

export const SHOULDER = { l: [72, 172] as const, r: [128, 172] as const };
export const HAND = { l: [50, 233] as const, r: [150, 233] as const };
export const HIP = { l: [88, 238] as const, r: [112, 238] as const };
export const SEAT = [100, 244] as const;

export function S(w = 3): string {
  return `stroke="${LINE}" stroke-width="${(w * LINE_K).toFixed(2)}" stroke-linejoin="round" stroke-linecap="round"`;
}

export function f(v: number): string {
  const n = Math.round(v * 10) / 10;
  const s = n.toFixed(1);
  return s.endsWith('.0') ? s.slice(0, -2) : s;
}

export function rot(x: number, y: number, cx: number, cy: number, deg: number): { x: number; y: number } {
  const a = deg * Math.PI / 180;
  const dx = x - cx, dy = y - cy;
  const c = Math.cos(a), s = Math.sin(a);
  return { x: cx + dx * c - dy * s, y: cy + dx * s + dy * c };
}

export function darken(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  const r = ((n >> 16) & 255) * (1 - amt);
  const g = ((n >> 8) & 255) * (1 - amt);
  const b = (n & 255) * (1 - amt);
  return '#' + ch(r) + ch(g) + ch(b);
}

export function lighten(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  const r = ((n >> 16) & 255);
  const g = ((n >> 8) & 255);
  const b = n & 255;
  return '#' + ch(r + (255 - r) * amt) + ch(g + (255 - g) * amt) + ch(b + (255 - b) * amt);
}

/** Filled tapered limb. w0/w1 are full widths. bend pushes the midpoint along the left normal. */
export function taper(p0: readonly [number, number], p1: readonly [number, number], w0: number, w1: number, bend = 0): string {
  const x0 = p0[0], y0 = p0[1], x1 = p0[0] === p1[0] && p0[1] === p1[1] ? p1[0] + 0.01 : p1[0], y1 = p1[1];
  const dx = x1 - x0, dy = y1 - y0;
  const ln = Math.hypot(dx, dy) || 1;
  const nx = -dy / ln, ny = dx / ln;
  const mx = (x0 + x1) / 2 + nx * bend, my = (y0 + y1) / 2 + ny * bend;
  const r0 = w0 / 2, r1 = w1 / 2, rm = (r0 + r1) / 2 * 1.04;
  const a = [x0 + nx * r0, y0 + ny * r0];
  const b = [x1 + nx * r1, y1 + ny * r1];
  const c = [x1 - nx * r1, y1 - ny * r1];
  const e = [x0 - nx * r0, y0 - ny * r0];
  return `M${f(a[0])} ${f(a[1])} Q${f(mx + nx * rm)} ${f(my + ny * rm)} ${f(b[0])} ${f(b[1])} A${f(r1)} ${f(r1)} 0 0 1 ${f(c[0])} ${f(c[1])} Q${f(mx - nx * rm)} ${f(my - ny * rm)} ${f(e[0])} ${f(e[1])} A${f(r0)} ${f(r0)} 0 0 1 ${f(a[0])} ${f(a[1])} Z`;
}

export function scallop(x0: number, x1: number, y: number, n: number, depth: number): string {
  const seg: string[] = [];
  const w = (x1 - x0) / n;
  for (let i = 0; i < n; i++) {
    const xa = x0 + i * w, xb = xa + w;
    seg.push(`Q${f((xa + xb) / 2)} ${f(y + depth)} ${f(xb)} ${f(y)}`);
  }
  return seg.join(' ');
}

export function bumps(cx: number, cy: number, r: number, n: number, amp: number, rotA = 0): string {
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a0 = rotA + 2 * Math.PI * i / n;
    const a1 = rotA + 2 * Math.PI * (i + 1) / n;
    const am = (a0 + a1) / 2;
    const p0x = cx + r * Math.cos(a0), p0y = cy + r * Math.sin(a0);
    const p1x = cx + r * Math.cos(a1), p1y = cy + r * Math.sin(a1);
    const qx = cx + (r + amp) * Math.cos(am), qy = cy + (r + amp) * Math.sin(am);
    if (i === 0) pts.push(`M${f(p0x)} ${f(p0y)}`);
    pts.push(`Q${f(qx)} ${f(qy)} ${f(p1x)} ${f(p1y)}`);
  }
  return pts.join(' ') + ' Z';
}

export interface Pose {
  hip: number;
  head: number;
  armL: number;
  armR: number;
  legL: number;
  legR: number;
  legLLift: number;
  legRLift: number;
}

export function limb(cls: 'arm' | 'leg', side: 'l' | 'r', inner: string, pose: Pose): string {
  const piv = cls === 'arm' ? SHOULDER[side] : HIP[side];
  const ang = cls === 'arm' ? (side === 'l' ? pose.armL : pose.armR) : (side === 'l' ? pose.legL : pose.legR);
  const lift = cls === 'leg' ? (side === 'l' ? pose.legLLift : pose.legRLift) : 0;
  const attr = ang || lift ? ` transform="translate(0 ${f(-lift)}) rotate(${f(ang)} ${piv[0]} ${piv[1]})"` : '';
  return `<g class="${cls} ${side}"${attr} style="transform-box:view-box;transform-origin:${piv[0]}px ${piv[1]}px">${inner}</g>`;
}
