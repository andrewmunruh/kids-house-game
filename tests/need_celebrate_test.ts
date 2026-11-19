// B18 item 1: need-met celebration helpers. Duration, one-at-a-time, queue, no faces.
import { NEEDS, wishOf } from '../src/shared/needs';
import {
  CELEBRATE_MS,
  burstMarkup,
  celebrationNeed,
  emptyCelebrateQueue,
  enqueueCelebrate,
  raisedNeeds,
  tickCelebrate,
} from '../src/need-celebrate';

let pass = 0;
const check = (name: string, ok: boolean, extra = '') => {
  console.log((ok ? 'PASS ' : 'FAIL ') + name, extra);
  if (ok) pass++;
  else process.exitCode = 1;
};

check('celebration lasts at most 1.5s', CELEBRATE_MS <= 1500 && CELEBRATE_MS > 0);
check('no rises when either side is missing', raisedNeeds(undefined, { hungry: 3 }).length === 0 && raisedNeeds({ hungry: 0 }, undefined).length === 0);
check('a rise is detected', raisedNeeds({ hungry: 0, sleepy: 3 }, { hungry: 3, sleepy: 3 }).join() === 'hungry');
check('a drop is not a celebration', raisedNeeds({ hungry: 3 }, { hungry: 0 }).length === 0);
check('two rises in one frame are both listed, in NEEDS order', raisedNeeds({ sleepy: 0, hungry: 0, playful: 3, clean: 3 }, { sleepy: 3, hungry: 3, playful: 3, clean: 3 }).join() === 'sleepy,hungry');

const two = raisedNeeds({ sleepy: 0, hungry: 0 }, { sleepy: 3, hungry: 3 });
check('one celebration when two needs are met at once (NEEDS order)', celebrationNeed(two) === 'sleepy');
check('one celebration prefers the current wish when it also rose', celebrationNeed(two, 'hungry') === 'hungry');
check('wish that did not rise does not win', celebrationNeed(two, 'clean') === 'sleepy');
check('empty list is null', celebrationNeed([]) === null);
check('wishOf still hides leftover at 3', wishOf({ needs: { hungry: 3 } }) === null);

let q = emptyCelebrateQueue();
const a = enqueueCelebrate(q, 'hungry', 1000);
check('first rise starts immediately', a.start === 'hungry' && a.q.playing === 'hungry' && a.q.until === 1000 + CELEBRATE_MS);
const b = enqueueCelebrate(a.q, 'clean', 1200);
check('a second rise during the first is queued, not stacked', b.start === null && b.q.playing === 'hungry' && b.q.pending === 'clean');
const c = enqueueCelebrate(b.q, 'playful', 1300);
check('a third rise replaces the pending one (still one queue slot)', c.start === null && c.q.pending === 'playful' && c.q.playing === 'hungry');
const mid = tickCelebrate(c.q, 1000 + CELEBRATE_MS - 1);
check('tick before the end leaves the current playing', mid.start === null && mid.q.playing === 'hungry');
const next = tickCelebrate(c.q, 1000 + CELEBRATE_MS);
check('when the first ends, the queued one starts', next.start === 'playful' && next.q.playing === 'playful' && next.q.pending === null);
const done = tickCelebrate(next.q, next.q.until);
check('the queue empties after the follow-up', done.start === null && done.q.playing === null && done.q.pending === null);

const after = enqueueCelebrate(done.q, 'sleepy', 5000);
check('a later rise starts again', after.start === 'sleepy');

for (const n of NEEDS) {
  const html = burstMarkup(n);
  check(`${n} burst has no face marks`, !/face|eye|mouth|smile|😀|😊/i.test(html) && html.includes(`need-burst-${n}`) && html.includes('pointer-events') === false);
  check(`${n} burst is marked for tests`, html.includes(`data-need-cele="${n}"`));
}
check('hungry crumbs have no apple face', burstMarkup('hungry').includes('nb-crumb') && !burstMarkup('hungry').includes('<svg'));
check('burst includes a central aura and stays faceless', burstMarkup('hungry').includes('nb-aura') && !/face|eye|mouth|smile/i.test(burstMarkup('hungry')));

console.log(`need_celebrate_test: ${pass} passed`);
