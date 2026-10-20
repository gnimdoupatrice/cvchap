export const CV_FONTS = ["Modèle", "Arial", "Verdana", "Georgia", "IBM Plex Sans", "Manrope"] as const;
export const CV_COLORS = ["original", "ink", "blue", "green", "red", "violet", "light"] as const;
export type CVFont = typeof CV_FONTS[number];
export type CVColor = typeof CV_COLORS[number];
export type ElementStyle = { fontSize?: number; fontFamily?: CVFont; color?: CVColor };
export type CVStyle = { fontFamily?: CVFont; color?: CVColor; elements?: Record<string, ElementStyle> };
export const COLOR_LABELS: Record<CVColor, string> = { original: "Modèle", ink: "Encre", blue: "Bleu", green: "Vert", red: "Bordeaux", violet: "Prune", light: "Blanc" };
export function normalizeStyle(style?: CVStyle): CVStyle {
  if (!style) return {};
  const elements: Record<string, ElementStyle> = {};
  for (const [key, value] of Object.entries(style.elements ?? {}).slice(0, 1000)) {
    elements[key] = {
      ...(Number.isFinite(value.fontSize) ? { fontSize: Math.max(60, Math.min(180, value.fontSize ?? 100)) } : {}),
      ...(CV_FONTS.includes(value.fontFamily as CVFont) ? { fontFamily: value.fontFamily } : {}),
      ...(CV_COLORS.includes(value.color as CVColor) ? { color: value.color } : {}),
    };
  }
  return { ...(CV_FONTS.includes(style.fontFamily as CVFont) ? { fontFamily: style.fontFamily } : {}), ...(CV_COLORS.includes(style.color as CVColor) ? { color: style.color } : {}), ...(Object.keys(elements).length ? { elements } : {}) };
}
export function harmonizeStyle(style?: CVStyle): CVStyle {
  const value = normalizeStyle(style);
  return { ...(value.fontFamily ? { fontFamily: value.fontFamily } : {}), ...(value.color ? { color: value.color } : {}) };
}
export function auditStyle(style?: CVStyle): string[] {
  const value = normalizeStyle(style);
  const entries = Object.values(value.elements ?? {});
  const issues: string[] = [];
  const fonts = new Set([value.fontFamily, ...entries.map(x => x.fontFamily)].filter(x => x && x !== "Modèle"));
  const colors = new Set([value.color, ...entries.map(x => x.color)].filter(x => x && x !== "original"));
  if (fonts.size > 2) issues.push("Plus de deux polices personnalisées.");
  if (colors.size > 2) issues.push("Plus de deux couleurs personnalisées.");
  if (entries.some(x => (x.fontSize ?? 100) < 80 || (x.fontSize ?? 100) > 140)) issues.push("Écarts de taille importants entre les éléments.");
  return issues;
}
