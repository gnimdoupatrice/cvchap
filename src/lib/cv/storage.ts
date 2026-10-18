import { sampleEmeraldTech } from "./samples";
import { DEFAULT_LAYOUT, normalizeLayout } from "./layout";
import { type CVDocument, type TemplateId } from "./types";

// Legacy unowned drafts are deliberately not assigned to the next signed-in account.
const scopedKey = (kind: "doc" | "credits", userId?: string) =>
  `cvflow.${kind}.v2.${userId ? `user:${userId}` : "discovery"}`;
export const FREE_CREDITS = 5;

const VALID_TEMPLATES: TemplateId[] = [
  "emerald-tech",
  "juriste-navy",
  "alfred-bold",
  "adeline-capsule",
  "sacha-dubois",
  "michael-henson",
  "elvira-montanez",
  "emma-brooks",
  "drew-feig",
  "daniel-morton",
  "richard-sanchez",
  "daniel-gallego",
  "dani-martinez",
  "sanchez-product",
  "adeline-palmerston",
  "french-blue",
];

export const defaultDoc = (): CVDocument => ({
  cv: sampleEmeraldTech,
  template: "emerald-tech",
  mode: "form",
  scale: 1,
  layout: { ...DEFAULT_LAYOUT },
});

export function loadDoc(userId?: string): CVDocument {
  try {
    const raw = localStorage.getItem(scopedKey("doc", userId));
    if (raw) {
      const stored = JSON.parse(raw) as Partial<CVDocument>;
      const fallback = defaultDoc();
      const validTemplate: TemplateId =
        stored.template && VALID_TEMPLATES.includes(stored.template as TemplateId)
          ? (stored.template as TemplateId)
          : "emerald-tech";

      return {
        ...fallback,
        ...stored,
        template: validTemplate,
        layout: normalizeLayout(stored.layout),
        cv: {
          ...fallback.cv,
          ...stored.cv,
          personal: { ...fallback.cv.personal, ...stored.cv?.personal },
          experiences:
             Array.isArray(stored.cv?.experiences)
              ? stored.cv.experiences
              : fallback.cv.experiences,
          education:
             Array.isArray(stored.cv?.education)
              ? stored.cv.education
              : fallback.cv.education,
          skills:
             Array.isArray(stored.cv?.skills)
              ? stored.cv.skills
              : fallback.cv.skills,
          languages:
             Array.isArray(stored.cv?.languages)
              ? stored.cv.languages
              : fallback.cv.languages,
          interests:
             Array.isArray(stored.cv?.interests)
              ? stored.cv.interests
              : fallback.cv.interests,
        },
      };
    }
  } catch (e) {
    console.error("Impossible de lire le CV depuis le stockage :", e);
  }
  return defaultDoc();
}

export function saveDoc(doc: CVDocument, userId?: string) {
  try {
    localStorage.setItem(scopedKey("doc", userId), JSON.stringify(doc));
  } catch (e) {
    console.error("Impossible de sauvegarder le CV :", e);
  }
}

export function loadCredits(userId?: string): number {
  try {
    const raw = localStorage.getItem(scopedKey("credits", userId));
    if (raw !== null) {
      const parsed = parseInt(raw, 10);
      return Number.isNaN(parsed) ? FREE_CREDITS : parsed;
    }
  } catch {}
  return FREE_CREDITS;
}

export function saveCredits(c: number, userId?: string) {
  try {
    localStorage.setItem(scopedKey("credits", userId), String(c));
  } catch {}
}
