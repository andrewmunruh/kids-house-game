// Regression: arms (and their sleeves) draw over the clothes for every clothing item and pose.
// Run: npx vite-node tests/arm_layer_test.ts
import { cases } from './arm_layer_cases';
import { chibiSVG, liftSleeves } from '../src/avatar/draw';
import { costumeParts } from '../src/avatar/costume';
import type { CostumeId } from '../src/shared/costume';
import { LOOK2_DEFAULTS } from '../src/shared/avatar';

let pass = 0, fail = 0;
function check(name: string, ok: boolean, info = ''): void {
  if (ok) pass++; else { fail++; console.log('FAIL', name, info); }
}

const all = cases();
for (const c of all) {
  const s = c.svg;
  const armsAt = s.indexOf('data-layer="arms"');
  if (c.item === 'ghost') {
    // The sheet drapes over her arms on purpose: arms stay in the body, under the sheet.
    check(`${c.id} ghost keeps arms under the sheet`, armsAt < 0 && s.indexOf('class="arm l') < s.indexOf('ghost-sheet'));
    continue;
  }
  check(`${c.id} has an arms layer`, armsAt > 0);
  const shirtAt = s.lastIndexOf('class="shirt"');
  check(`${c.id} arms draw after the shirt/dress`, shirtAt >= 0 && armsAt > shirtAt, `${shirtAt} ${armsAt}`);
  const over = s.indexOf('data-layer="bottom-over"');
  check(`${c.id} arms draw after bottom-over (tutu, overalls)`, over < 0 || armsAt > over);
  const cos = s.indexOf('data-layer="costume"');
  check(`${c.id} arms draw after the costume body`, cos < 0 || armsAt > cos);
  const face = s.indexOf('data-layer="face"');
  check(`${c.id} arms draw under the face and hair`, face > armsAt);
  // No bare arm or sleeve left before the arms layer.
  const before = s.slice(0, armsAt);
  check(`${c.id} no arm group under the clothes`, before.indexOf('class="arm ') < 0);
  // Every sleeve lives inside its arm group (so it swings with it): a bare arm's first child is the hand.
  for (const side of ['l', 'r']) {
    const re = new RegExp(`<g class="arm ${side} hang"[^>]*><g class="hand">[\\s\\S]*?</g>(<g class="arm sleeve ${side} hang">)?`);
    const m = s.slice(armsAt).match(re);
    check(`${c.id} ${side} arm present over clothes`, !!m);
    const sleeveCount = (s.match(new RegExp(`class="arm sleeve ${side} hang"`, 'g')) || []).length;
    const nested = m && m[1] ? 1 : 0;
    check(`${c.id} ${side} sleeve is nested in its arm`, sleeveCount === nested, `${sleeveCount} ${nested}`);
    // A nested sleeve carries no transform of its own.
    check(`${c.id} ${side} nested sleeve has no own transform`, !/class="arm sleeve [lr] hang"[^>]*transform=/.test(s));
  }
}
// Sleeved items still get sleeves; sleeveless ones do not.
const sleeveless = new Set(['top-tank', 'top-bib', 'dress-sundress', 'dress-pinafore']);
const sleevesIn = (svg: string) => { const a = svg.indexOf('data-layer="arms"'); return a < 0 ? svg : svg.slice(a, svg.indexOf('data-layer="face"')); };
const baseTop = LOOK2_DEFAULTS.top; // costume cases wear the default top under the costume
for (const c of all.filter(c => c.pose === 'idle' && c.kind !== 'bottom')) {
  const n = (c.svg.match(/class="arm sleeve [lr] hang"/g) || []).length;
  if (c.kind !== 'costume') {
    const want = !sleeveless.has(`${c.kind}-${c.item}`);
    check(`${c.kind}-${c.item} sleeves ${want ? 'present (2)' : 'absent'}`, n === (want ? 2 : 0), String(n));
    continue;
  }
  // Costume: its own sleeves replace the wardrobe ones; without any, the default top's sleeves stay.
  const parts = costumeParts(c.item as CostumeId, {} as never, '#000');
  const want = parts.over.includes('class="arm sleeve') || !sleeveless.has(`top-${baseTop}`);
  check(`costume-${c.item} sleeves ${want ? 'present (2)' : 'absent'}`, n === (want ? 2 : 0), String(n));
  if (parts.sleeve && !parts.coversArms && parts.over.includes('class="arm sleeve')) {
    check(`costume-${c.item} arms wear the costume sleeve colour`, sleevesIn(c.svg).includes(parts.sleeve));
  }
}
// liftSleeves keeps a sleeve's nested groups whole.
const nest = liftSleeves('<a/><g class="arm sleeve l hang" transform="x"><g><path/></g><circle/></g><b/><g class="arm sleeve r hang"><g><g/></g></g>');
check('liftSleeves tolerates nested groups', nest.rest === '<a/><b/>' && nest.l === '<g><path/></g><circle/>' && nest.r === '<g><g/></g>', JSON.stringify(nest));
// Holding: cradle arm still above the clothes, hanging arms still tagged hang (CSS hides them).
const held = chibiSVG({ ...LOOK2_DEFAULTS, top: 'hoodie' }, { uid: 'h', poseName: 'sit', holding: true });
check('holding: cradle arm after arms layer', held.indexOf('class="arm cradle') > held.indexOf('data-layer="arms"') || held.indexOf('cradle') > held.indexOf('data-layer="arms"'));
check('holding: 4 hang parts (2 arms + 2 sleeves)', (held.match(/class="arm (sleeve )?[lr] hang"/g) || []).length === 4);

console.log(`arm_layer_test: ${pass} passed, ${fail} failed (${all.length} item x pose cases)`);
if (fail) process.exit(1);
