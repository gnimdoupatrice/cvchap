export const CV_FONTS = ["Modèle", "Arial", "Verdana", "Georgia", "IBM Plex Sans", "Manrope"] as const;
export const CV_COLORS = ["original", "ink", "blue", "green", "red", "violet", "light"] as const;
/** Colours usable to accent a single word or figure (white and "template" make no sense there). */
export const WORD_COLORS = ["ink", "blue", "green", "red", "violet"] as const;
export type CVFont = typeof CV_FONTS[number];
export type CVColor = typeof CV_COLORS[number];
export type WordColor = typeof WORD_COLORS[number];
export type ElementStyle = { fontSize?: number; fontFamily?: CVFont; color?: CVColor };
export type WordAccent = { text: string; color: WordColor; mark?: boolean };
export type CVStyle = { fontFamily?: CVFont; color?: CVColor; elements?: Record<string, ElementStyle>; words?: WordAccent[] };
export const COLOR_LABELS: Record<CVColor, string> = { original: "Modèle", ink: "Encre", blue: "Bleu", green: "Vert", red: "Bordeaux", violet: "Prune", light: "Blanc" };
export const MAX_WORDS = 30;
/** Above this many accented words or figures, the page starts looking busy. */
export const WORD_LIMIT = 6;

export function normalizeStyle(style?: CVStyle): CVStyle {
  if (!style) return {};
  const elements: Record<string, ElementStyle> = {};
  for (const [key, value] of Object.entries(style.elements ?? {}).slice(0, 1000)) {
    const clean: ElementStyle = {
      ...(Number.isFinite(value.fontSize) ? { fontSize: Math.max(60, Math.min(180, value.fontSize ?? 100)) } : {}),
      ...(CV_FONTS.includes(value.fontFamily as CVFont) ? { fontFamily: value.fontFamily } : {}),
      ...(CV_COLORS.includes(value.color as CVColor) ? { color: value.color } : {}),
    };
    if (Object.keys(clean).length) elements[key] = clean;
  }
  const seen = new Set<string>();
  const words: WordAccent[] = [];
  for (const word of style.words ?? []) {
    const text = typeof word?.text === "string" ? word.text.trim().slice(0, 60) : "";
    if (!text || seen.has(text) || !WORD_COLORS.includes(word.color as WordColor)) continue;
    seen.add(text);
    words.push({ text, color: word.color, ...(word.mark ? { mark: true } : {}) });
    if (words.length >= MAX_WORDS) break;
  }
  return {
    ...(CV_FONTS.includes(style.fontFamily as CVFont) ? { fontFamily: style.fontFamily } : {}),
    ...(CV_COLORS.includes(style.color as CVColor) ? { color: style.color } : {}),
    ...(Object.keys(elements).length ? { elements } : {}),
    ...(words.length ? { words } : {}),
  };
}

/** Realign every local change on the global charter, without touching any text. */
export function harmonizeStyle(style?: CVStyle): CVStyle {
  const value = normalizeStyle(style);
  const words = value.words ?? [];
  const accent = words[0]?.color;
  return {
    ...(value.fontFamily ? { fontFamily: value.fontFamily } : {}),
    ...(value.color ? { color: value.color } : {}),
    ...(accent ? { words: words.slice(0, WORD_LIMIT).map((w) => ({ ...w, color: accent })) } : {}),
  };
}

export function auditStyle(style?: CVStyle): string[] {
  const value = normalizeStyle(style);
  const entries = Object.values(value.elements ?? {});
  const words = value.words ?? [];
  const issues: string[] = [];
  const fonts = new Set([value.fontFamily, ...entries.map(x => x.fontFamily)].filter(x => x && x !== "Modèle"));
  const colors = new Set([value.color, ...entries.map(x => x.color), ...words.map(x => x.color)].filter(x => x && x !== "original"));
  if (fonts.size > 2) issues.push("Plus de deux polices personnalisées.");
  if (colors.size > 2) issues.push("Plus de deux couleurs personnalisées.");
  if (entries.some(x => (x.fontSize ?? 100) < 80 || (x.fontSize ?? 100) > 140)) issues.push("Écarts de taille importants entre les éléments.");
  if (words.length > WORD_LIMIT) issues.push(`Trop de mots mis en valeur (${words.length}, ${WORD_LIMIT} maximum conseillés).`);
  return issues;
}
