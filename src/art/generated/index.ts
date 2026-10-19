import type { V2Mark } from '../v2-sample';
import { LIVING } from './living';
import { BEDROOM } from './bedroom';
import { KITCHEN } from './kitchen';
export const GENERATED: Record<string, V2Mark> = {
  ...LIVING,
  ...BEDROOM,
  ...KITCHEN,
};
