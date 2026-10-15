export interface CVLayout {
  fontSize: number;
  sectionSpacing: number;
}

export const DEFAULT_LAYOUT: CVLayout = { fontSize: 100, sectionSpacing: 100 };
export const FONT_MIN = 80;
export const FONT_MAX = 140;
export const SPACING_MIN = 60;
export const SPACING_MAX = 180;

export function normalizeLayout(value?: Partial<CVLayout>): CVLayout {
  const clamp = (n: number | undefined, min: number, max: number) =>
    Number.isFinite(n) ? Math.min(max, Math.max(min, n ?? 100)) : 100;
  return {
    fontSize: clamp(value?.fontSize, FONT_MIN, FONT_MAX),
    sectionSpacing: clamp(value?.sectionSpacing, SPACING_MIN, SPACING_MAX),
  };
}

/** Find the largest readable setting that fits; never modify document content. */
export function findOptimalLayout(fits: (layout: CVLayout) => boolean): CVLayout | null {
  if (!fits({ fontSize: FONT_MIN, sectionSpacing: SPACING_MIN })) return null;
  let low = FONT_MIN;
  let high = FONT_MAX;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    if (fits({ fontSize: mid, sectionSpacing: 100 })) low = mid;
    else high = mid - 1;
  }
  let spacingLow = SPACING_MIN;
  let spacingHigh = SPACING_MAX;
  while (spacingLow < spacingHigh) {
    const mid = Math.ceil((spacingLow + spacingHigh) / 2);
    if (fits({ fontSize: low, sectionSpacing: mid })) spacingLow = mid;
    else spacingHigh = mid - 1;
  }
  return { fontSize: low, sectionSpacing: spacingLow };
}