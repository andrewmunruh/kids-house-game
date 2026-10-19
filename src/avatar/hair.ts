// 24 hairstyles. Volume gradient is full-quality only (rich). Braids use a wide lobe step so a kid stays under 8 KB gzip.
import { S, f, bumps } from './geom';

const L = 'var(--line)';

function strands(lst: string[], op = 0.8, w = 2.2): string {
  return lst.map(d => `<path d="${d}" fill="none" stroke="var(--hair-shade)" stroke-width="${w}" stroke-linecap="round" opacity="${op}"/>`).join('');
}
function hi(lst: string[], op = 0.32): string {
  return lst.map(d => `<path d="${d}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity="${op}"/>`).join('');
}
function gloss(): string {
  return '<path d="M54 72 Q62 44 92 38 Q70 50 63 74 Z" fill="#fff" opacity=".45"/><path d="M60 64 Q70 48 86 42" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".8"/><path d="M104 37 Q130 38 145 58 Q128 46 106 43 Z" fill="#fff" opacity=".3"/><circle cx="72" cy="50" r="2" fill="#fff" opacity=".85"/>';
}
function vol(d: string, u: string, rich: boolean): string {
  return rich ? `<path d="${d}" fill="url(#${u}h)"/>` : '';
}

const CAP = 'M34 112 Q28 28 100 28 Q172 28 166 112 Q164 146 146 156 L54 156 Q36 146 34 112 Z';
function cap(u: string, rich: boolean): string {
  return `<path d="${CAP}" fill="var(--hair)" ${S(3.2)}/>${vol(CAP, u, rich)}`;
}

function curlCloud(cx: number, cy: number, r: number, rot: number, u: string, rich: boolean, curls = 10): string {
  const back = bumps(cx + 2, cy + 3, r, 12, 7, rot + 0.1);
  const front = bumps(cx, cy, r - 1, 12, 7, rot);
  let out = `<path d="${back}" fill="var(--hair-shade)" ${S(3.2)}/><path d="${front}" fill="var(--hair)" ${S(3.2)}/>${vol(front, u, rich)}`;
  for (let i = 0; i < curls; i++) {
    const a = i * 2.5 + rot;
    const rr = (r - 6) * Math.sqrt((i + 0.5) / curls);
    const x = cx + rr * Math.cos(a), y = cy + rr * Math.sin(a);
    out += `<path d="M${f(x - 4)} ${f(y + 1)} q1 -5 4.5 -4.5 q3.5 1 2.5 4.5" fill="none" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>`;
    if (y < cy - 2 && x < cx + 6) out += `<path d="M${f(x - 2.5)} ${f(y - 2.5)} q2 -2 3.5 -1" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>`;
  }
  out += `<ellipse cx="${f(cx - 10)}" cy="${f(cy - 12)}" rx="6" ry="3.4" fill="#fff" opacity=".55" transform="rotate(-35 ${f(cx - 10)} ${f(cy - 12)})"/>`;
  out += `<path d="M${f(cx - 16)} ${f(cy - 6)} Q${f(cx - 6)} ${f(cy - 18)} ${f(cx + 4)} ${f(cy - 14)}" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".5"/>`;
  return out;
}

/** Interlocking braid. step ~9 keeps box braids inside the gzip budget. */
function braid(x: number, y0: number, y1: number, sw = 6, cuffs: number[] = [], step = 7): string {
  let out = `<path d="M${x} ${y0 - 6} V${y1}" stroke="${L}" stroke-width="${f(2 * sw + 4.6)}" stroke-linecap="round"/><path d="M${x} ${y0 - 6} V${y1}" stroke="var(--hair)" stroke-width="${f(2 * sw)}" stroke-linecap="round"/>`;
  let y = y0, i = 0;
  while (y < y1) {
    const s = i % 2 ? 1 : -1;
    out += `<path d="M${f(x - s)} ${f(y - 4)} Q${f(x + s * sw * 1.05)} ${f(y - 2)} ${f(x + s * sw * 0.55)} ${f(y + 4)} Q${f(x)} ${f(y + 5.5)} ${f(x - s * 1.4)} ${f(y + 1)}" fill="none" stroke="var(--hair-shade)" stroke-width="1.7" stroke-linecap="round"/>`;
    if (s > 0) out += `<path d="M${f(x + 1)} ${f(y - 2)} q2.2 -.5 3 1.4" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".4"/>`;
    y += step; i++;
  }
  for (let c = 0; c < cuffs.length; c++) {
    const cy = cuffs[c];
    out += `<rect x="${f(x - 6.2)}" y="${cy - 4}" width="12.4" height="8" rx="2.6" fill="var(--acc)" stroke="${L}" stroke-width="2"/><rect x="${f(x - 4)}" y="${cy - 2.5}" width="2.6" height="4.5" rx="1" fill="#fff" opacity=".6"/>`;
  }
  out += `<path d="M${x - 4} ${y1 + 2} q2 5 4 6 q2 -1 4 -6" fill="var(--hair)" stroke="${L}" stroke-width="2"/>`;
  return out;
}

function locs(x: number, y0: number, y1: number, sw = 5.5): string {
  let out = `<path d="M${x} ${y0} V${y1}" stroke="${L}" stroke-width="${f(2 * sw + 4)}" stroke-linecap="round"/><path d="M${x} ${y0} V${y1}" stroke="var(--hair)" stroke-width="${f(2 * sw)}" stroke-linecap="round"/>`;
  for (let y = y0 + 8; y < y1; y += 16) {
    out += `<path d="M${f(x - sw * 0.7)} ${y} Q${x} ${y + 5} ${f(x + sw * 0.7)} ${y}" fill="none" stroke="var(--hair-shade)" stroke-width="1.6" opacity=".8"/>`;
  }
  out += `<circle cx="${x}" cy="${y1 + 3}" r="${f(sw * 0.55)}" fill="var(--hair)" stroke="${L}" stroke-width="2"/>`;
  return out;
}

function tail(d: string, u: string, rich: boolean, strand: string[]): string {
  return `<path d="${d}" fill="var(--hair)" ${S(3)}/>${vol(d, u, rich)}${strands(strand)}${hi(strand.slice(0, 2), 0.45)}`;
}

function tie(cx: number, cy: number, rot: number): string {
  return `<ellipse cx="${cx}" cy="${cy}" rx="8" ry="5.5" fill="var(--acc)" ${S(2.4)} transform="rotate(${rot} ${cx} ${cy})"/><ellipse cx="${cx - 1}" cy="${cy - 2}" rx="2.4" ry="1.3" fill="#fff" opacity=".6" transform="rotate(${rot} ${cx - 1} ${cy - 2})"/>`;
}

const SHADOW = '<path d="M42 104 Q44 76 70 66 Q86 74 100 58 Q114 74 130 66 Q156 76 158 104" fill="none" stroke="#3a1d3c" stroke-width="9" opacity=".12"/>';

type Fam = 'puffs' | 'afro' | 'braids' | 'box' | 'locs' | 'sidebraid' | 'crown' | 'pony' | 'sidepony' | 'pigtails' | 'halfup' | 'buns' | 'topbun' | 'lowbun' | 'long' | 'wavy' | 'bob' | 'short' | 'pixie' | 'bangs';

function family(h: string): Fam {
  if (h === 'puffs' || h === 'coily') return 'puffs';
  if (h === 'afro') return 'afro';
  if (h === 'braids') return 'braids';
  if (h === 'boxbraids') return 'box';
  if (h === 'locs') return 'locs';
  if (h === 'sidebraid') return 'sidebraid';
  if (h === 'crown') return 'crown';
  if (h === 'pony') return 'pony';
  if (h === 'sidepony') return 'sidepony';
  if (h === 'pigtails') return 'pigtails';
  if (h === 'halfup') return 'halfup';
  if (h === 'buns') return 'buns';
  if (h === 'topbun') return 'topbun';
  if (h === 'lowbun') return 'lowbun';
  if (h === 'long') return 'long';
  if (h === 'wavy' || h === 'wavybob') return h === 'wavy' ? 'wavy' : 'bob';
  if (h === 'bob' || h === 'curlybob' || h === 'sidebangs') return 'bob';
  if (h === 'pixie') return 'pixie';
  if (h === 'bangs' || h === 'short') return h === 'bangs' ? 'bangs' : 'short';
  return 'short';
}

export function hairBack(hair: string, u: string, rich: boolean): string {
  const fam = family(hair);
  if (fam === 'puffs') {
    const r = hair === 'coily' ? 26 : 30;
    return curlCloud(48, 52, r, 0, u, rich, 12) + curlCloud(152, 52, r, 0.3, u, rich, 12)
      + `<path d="M42 112 Q38 48 100 44 Q162 48 158 112 Q154 144 100 146 Q46 144 42 112 Z" fill="var(--hair)" ${S(3.2)}/>`
      + tie(66, 68, -35) + tie(134, 68, 35);
  }
  if (fam === 'afro') {
    return curlCloud(100, 78, 78, 0.2, u, rich, 14);
  }
  if (fam === 'braids') {
    return cap(u, rich) + braid(34, 108, 230, 5.4, [196]) + braid(166, 108, 230, 5.4, [196]);
  }
  if (fam === 'box') {
    return cap(u, rich) + braid(30, 110, 228, 5, [200], 10) + braid(170, 110, 228, 5, [200], 10);
  }
  if (fam === 'locs') {
    return cap(u, rich) + locs(32, 112, 236) + locs(168, 112, 236);
  }
  if (fam === 'sidebraid') return cap(u, rich);
  if (fam === 'pony' || fam === 'sidepony' || fam === 'halfup') {
    const d = fam === 'sidepony'
      ? 'M118 78 Q150 70 158 120 Q164 160 150 200 Q136 188 138 160 Q132 120 124 96 Z'
      : 'M126 40 Q178 28 180 92 Q184 132 168 168 Q160 196 174 220 Q148 212 145 182 Q140 156 152 124 Q160 90 132 64 Z';
    const y = fam === 'halfup' ? 70 : fam === 'sidepony' ? 86 : 44;
    return cap(u, rich) + tail(d, u, rich, fam === 'sidepony'
      ? ['M130 96 Q150 120 146 160', 'M138 110 Q154 140 148 180']
      : ['M146 56 Q170 88 160 130', 'M156 66 Q176 100 166 140', 'M150 150 Q148 180 160 206'])
      + tie(fam === 'sidepony' ? 124 : 128, y, fam === 'sidepony' ? -20 : 25);
  }
  if (fam === 'pigtails') {
    const Ltail = 'M40 100 Q22 120 28 168 Q34 200 48 214 Q58 196 52 160 Q58 124 56 108 Z';
    const Rtail = 'M160 100 Q178 120 172 168 Q166 200 152 214 Q142 196 148 160 Q142 124 144 108 Z';
    return cap(u, rich) + tail(Ltail, u, rich, ['M40 120 Q32 150 40 184']) + tail(Rtail, u, rich, ['M160 120 Q168 150 160 184']) + tie(52, 96, 20) + tie(148, 96, -20);
  }
  if (fam === 'buns') {
    let out = '';
    for (const cx of [52, 148]) {
      out += `<circle cx="${cx}" cy="44" r="24" fill="var(--hair)" ${S(3.2)}/>${rich ? `<circle cx="${cx}" cy="44" r="24" fill="url(#${u}h)"/>` : ''}`;
      out += strands([`M${cx - 14} 48 Q${cx - 14} 28 ${cx} 26 Q${cx + 16} 30 ${cx + 14} 48`, `M${cx - 8} 54 Q${cx + 8} 56 ${cx + 12} 48`]);
      out += `<path d="M${cx - 12} 34 Q${cx - 4} 24 ${cx + 4} 26" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".45"/>`;
    }
    return out + cap(u, rich);
  }
  if (fam === 'topbun') {
    return `<circle cx="100" cy="30" r="26" fill="var(--hair)" ${S(3.2)}/>${rich ? `<circle cx="100" cy="30" r="26" fill="url(#${u}h)"/>` : ''}<path d="M82 28 Q100 12 118 28" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/>${strands(['M86 36 Q100 24 114 36', 'M90 42 Q100 34 110 42'])}${cap(u, rich)}`;
  }
  if (fam === 'lowbun') {
    return cap(u, rich) + `<circle cx="100" cy="168" r="22" fill="var(--hair)" ${S(3)}/>${rich ? `<circle cx="100" cy="168" r="22" fill="url(#${u}h)"/>` : ''}${tie(100, 148, 0)}`;
  }
  if (fam === 'long' || fam === 'wavy') {
    const d = fam === 'wavy'
      ? 'M36 108 Q28 160 40 210 Q52 250 46 286 Q70 270 78 230 Q60 180 58 140 Q52 120 48 108 Z M164 108 Q172 160 160 210 Q148 250 154 286 Q130 270 122 230 Q140 180 142 140 Q148 120 152 108 Z'
      : 'M38 110 Q30 170 36 240 Q42 280 34 300 L70 292 Q64 240 66 180 Q62 140 56 112 Z M162 110 Q170 170 164 240 Q158 280 166 300 L130 292 Q136 240 134 180 Q138 140 144 112 Z';
    return `<path d="${d}" fill="var(--hair)" ${S(3)}/>${vol(d, u, rich)}${cap(u, rich)}`;
  }
  if (fam === 'bob') {
    const shape = hair === 'curlybob'
      ? 'M30 120 Q24 170 48 196 Q70 210 100 206 Q130 210 152 196 Q176 170 170 120 Q150 150 100 156 Q50 150 30 120 Z'
      : 'M32 116 Q26 168 50 190 Q78 204 100 200 Q122 204 150 190 Q174 168 168 116 Q150 148 100 154 Q50 148 32 116 Z';
    return `<path d="${shape}" fill="var(--hair)" ${S(3.2)}/>${vol(shape, u, rich)}${cap(u, rich)}`;
  }
  return cap(u, rich);
}

export function hairFront(hair: string, u: string, rich: boolean): string {
  const fam = family(hair);
  const part = '<path d="M100 34 V56" stroke="var(--hair-shade)" stroke-width="2.2" stroke-linecap="round"/>';
  if (fam === 'puffs' || fam === 'braids' || fam === 'box' || fam === 'locs' || fam === 'afro' || fam === 'bangs') {
    const sh = fam === 'afro'
      ? 'M48 100 Q52 48 100 40 Q148 48 152 100 Q140 78 100 70 Q60 78 48 100 Z'
      : fam === 'bangs'
        ? 'M40 108 Q36 40 100 34 Q164 40 160 108 L150 96 Q130 108 100 100 Q70 108 50 96 Z'
        : 'M40 106 Q36 36 100 32 Q164 36 160 106 Q154 74 130 62 Q112 70 100 52 Q88 70 70 62 Q46 74 40 106 Z';
    let out = SHADOW + `<path d="${sh}" fill="var(--hair)" ${S(3.2)}/>${vol(sh, u, rich)}${part}`;
    out += strands(['M84 44 Q70 52 60 70', 'M116 44 Q130 52 140 70', 'M92 40 Q80 48 74 58', 'M108 40 Q120 48 126 58', 'M76 42 Q58 56 52 82', 'M124 42 Q142 56 148 82']);
    out += hi(['M90 36 Q78 42 70 52', 'M112 36 Q124 42 132 52']);
    if (fam === 'puffs') {
      out += `<path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="${L}" stroke-width="7" stroke-linecap="round"/><path d="M44 96 q-6 4 -2 10 q4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`;
      out += `<path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="${L}" stroke-width="7" stroke-linecap="round"/><path d="M156 96 q6 4 2 10 q-4 4 0 8" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`;
    } else if (fam === 'braids' || fam === 'box') {
      out += braid(48, 114, 200, 5, [156], fam === 'box' ? 10 : 7);
      out += braid(152, 114, 200, 5, [156], fam === 'box' ? 10 : 7);
    } else if (fam === 'locs') {
      out += locs(46, 116, 210, 4.6) + locs(154, 116, 210, 4.6);
    }
    return out + gloss();
  }
  if (fam === 'sidebraid') {
    const sh = 'M40 108 Q36 36 100 32 Q164 36 160 100 Q140 78 100 70 Q70 80 40 108 Z';
    return SHADOW + `<path d="${sh}" fill="var(--hair)" ${S(3.2)}/>${vol(sh, u, rich)}${strands(['M70 46 Q86 60 96 74', 'M120 44 Q136 58 146 74'])}${braid(150, 100, 210, 5.6, [168], 7)}${gloss()}`;
  }
  if (fam === 'crown') {
    const sh = 'M40 106 Q36 36 100 32 Q164 36 160 106 Q150 80 100 74 Q50 80 40 106 Z';
    let arc = '';
    for (let i = 0; i < 7; i++) {
      const x = 58 + i * 14;
      arc += `<path d="M${x} 58 Q${x + 7} 46 ${x + 14} 58" fill="none" stroke="var(--hair-shade)" stroke-width="3.2" stroke-linecap="round"/>`;
    }
    return SHADOW + `<path d="${sh}" fill="var(--hair)" ${S(3.2)}/>${vol(sh, u, rich)}${arc}${gloss()}`;
  }
  if (fam === 'pony' || fam === 'sidepony' || fam === 'halfup' || fam === 'pigtails') {
    const sh = fam === 'sidepony'
      ? 'M40 108 Q34 36 100 32 Q166 34 160 108 Q150 86 120 78 Q90 90 60 74 Q48 90 40 108 Z'
      : 'M40 108 Q34 34 100 32 Q166 34 160 108 Q156 84 144 72 Q128 86 104 80 Q86 78 72 68 Q60 84 48 84 Q42 94 40 108 Z';
    let out = SHADOW + `<path d="${sh}" fill="var(--hair)" ${S(3.2)}/>${vol(sh, u, rich)}`;
    out += `<path d="M40 104 Q36 120 44 132 Q46 116 50 106 Z" fill="var(--hair)" ${S(2.4)}/><path d="M160 104 Q164 120 156 132 Q154 116 150 106 Z" fill="var(--hair)" ${S(2.4)}/>`;
    out += strands(['M70 46 Q90 60 104 74', 'M128 46 Q140 60 146 74', 'M96 40 Q110 56 116 66']);
    out += hi(['M76 42 Q92 52 100 62']);
    return out + gloss();
  }
  if (fam === 'buns' || fam === 'topbun' || fam === 'lowbun') {
    const sh = fam === 'topbun'
      ? 'M44 108 Q40 50 100 46 Q160 50 156 108 Q148 82 100 74 Q52 82 44 108 Z'
      : 'M40 106 Q36 36 100 32 Q164 36 160 106 Q152 80 138 70 Q126 80 112 76 Q104 82 100 74 Q96 82 88 76 Q74 80 62 70 Q48 80 40 106 Z';
    let out = SHADOW + `<path d="${sh}" fill="var(--hair)" ${S(3.2)}/>${vol(sh, u, rich)}`;
    out += strands(['M80 42 Q72 56 68 68', 'M120 42 Q128 56 132 68', 'M100 36 Q98 56 100 70', 'M90 38 Q84 56 86 72', 'M110 38 Q116 56 114 72']);
    out += hi(['M86 38 Q80 46 78 54', 'M114 38 Q120 46 122 54']);
    if (fam === 'buns') {
      for (const [x, sg] of [[42, 1], [158, -1]] as const) {
        const d = `M${x} 100 q${-8 * sg} 14 ${-2 * sg} 24 q${5 * sg} 8 ${-1 * sg} 14`;
        out += `<path d="${d}" fill="none" stroke="${L}" stroke-width="7" stroke-linecap="round"/><path d="${d}" fill="none" stroke="var(--hair)" stroke-width="3.6" stroke-linecap="round"/>`;
      }
    }
    return out + gloss();
  }
  if (fam === 'long' || fam === 'wavy' || fam === 'bob') {
    const bang = hair === 'sidebangs' || hair === 'wavybob'
      ? 'M38 108 Q34 40 70 36 Q100 34 112 48 Q90 70 48 78 Q36 90 38 108 Z M112 48 Q140 36 164 50 Q166 100 150 108 Q130 80 112 70 Z'
      : 'M40 108 Q34 36 100 32 Q166 36 160 108 Q152 78 128 68 Q112 78 100 60 Q88 78 72 68 Q48 78 40 108 Z';
    return SHADOW + `<path d="${bang}" fill="var(--hair)" ${S(3.2)}/>${vol(bang, u, rich)}${strands(['M78 46 Q68 64 64 80', 'M122 46 Q132 64 136 80', 'M100 38 V64'])}${hi(['M88 40 Q80 50 76 60'])}${gloss()}`;
  }
  if (fam === 'pixie') {
    const sh = 'M48 104 Q44 48 100 40 Q140 46 150 78 Q156 100 140 108 Q120 86 100 90 Q70 84 52 104 Z';
    return SHADOW + `<path d="${sh}" fill="var(--hair)" ${S(3.2)}/>${vol(sh, u, rich)}${strands(['M70 56 Q86 70 96 84', 'M118 52 Q132 66 138 82'])}${gloss()}`;
  }
  const sh = 'M46 106 Q42 46 100 38 Q158 46 154 106 Q140 80 100 76 Q60 80 46 106 Z';
  return SHADOW + `<path d="${sh}" fill="var(--hair)" ${S(3.2)}/>${vol(sh, u, rich)}${part}${gloss()}`;
}
