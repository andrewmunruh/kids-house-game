import type { V2Mark } from '../v2-sample';
import { LIVING } from './living';
import { BEDROOM } from './bedroom';
import { KITCHEN } from './kitchen';
import { SALON } from './salon';
import { NURSERY } from './nursery';
import { BACKYARD } from './backyard';
import { ANY } from './any';
import { RANCH } from './ranch';
export const GENERATED: Record<string, V2Mark> = {
  ...LIVING,
  ...BEDROOM,
  ...KITCHEN,
  ...SALON,
  ...NURSERY,
  ...BACKYARD,
  ...ANY,
  ...RANCH,
};
