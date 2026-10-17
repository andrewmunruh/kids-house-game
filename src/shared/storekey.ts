// Every localStorage key goes through here. A preview build sets VITE_STORE_PREFIX (e.g. "preview:")
// so trying the preview on a kid's iPad never reads or writes her real save (same origin as production).
// Production has no prefix, so its keys are exactly what they always were.
export const storeKey = (k: string): string => ((import.meta as any).env?.VITE_STORE_PREFIX ?? '') + k;
