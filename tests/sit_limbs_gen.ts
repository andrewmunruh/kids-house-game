// Emits chibi SVGs in sit, lie and standing poses (plain and costumed) for sit_limbs_attached_test.py.
import { chibiSVG, poseFor } from '../src/avatar/draw';
import { SIT_POSE, LIE_POSE } from '../src/avatar/sit';
const reagan = { v: 1, hair: 'buns', hairC: '#e8c46a', skin: '#ffe0c4', top: 'tee', topC: '#ffd166', bottom: 'overalls', bottomC: '#4a6fd0' } as any;
const poses: Record<string, any> = { sit: SIT_POSE, lie: LIE_POSE };
for (const h of ['puffs', 'pony', 'braids', 'buns']) poses['stand-' + h] = poseFor({ hair: h });
const out: Record<string, { svg: string; pose: any }> = {};
for (const [name, pose] of Object.entries(poses))
  for (const costume of ['', 'helper-yellow', 'helper-blue', 'skeleton'])
    out[`${name}:${costume || 'plain'}`] = { pose, svg: chibiSVG(reagan, { pose, poseName: name === 'sit' || name === 'lie' ? name : undefined, costume: (costume || null) as any }) };
console.log(JSON.stringify(out));
