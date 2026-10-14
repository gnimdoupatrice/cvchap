import { sampleEmeraldTech } from "./samples";
import { type CVDocument, type TemplateId } from "./types";

const DOC_KEY = "cvflow.doc.v1";
const CREDITS_KEY = "cvflow.credits.v1";
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
});

export function loadDoc(): CVDocument {
  try {
    const raw = localStorage.getItem(DOC_KEY);
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
        cv: {
          ...fallback.cv,
          ...stored.cv,
          personal: { ...fallback.cv.personal, ...stored.cv?.personal },
          experiences:
            stored.cv?.experiences && stored.cv.experiences.length > 0
              ? stored.cv.experiences
              : fallback.cv.experiences,
          education:
            stored.cv?.education && stored.cv.education.length > 0
              ? stored.cv.education
              : fallback.cv.education,
          skills:
            stored.cv?.skills && stored.cv.skills.length > 0
              ? stored.cv.skills
              : fallback.cv.skills,
          languages:
            stored.cv?.languages && stored.cv.languages.length > 0
              ? stored.cv.languages
              : fallback.cv.languages,
          interests:
            stored.cv?.interests && stored.cv.interests.length > 0
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

export function saveDoc(doc: CVDocument) {
  try {
    localStorage.setItem(DOC_KEY, JSON.stringify(doc));
  } catch (e) {
    console.error("Impossible de sauvegarder le CV :", e);
  }
}

export function loadCredits(): number {
  try {
    const raw = localStorage.getItem(CREDITS_KEY);
    if (raw !== null) {
      const parsed = parseInt(raw, 10);
      return Number.isNaN(parsed) ? FREE_CREDITS : parsed;
    }
  } catch {}
  return FREE_CREDITS;
}

export function saveCredits(c: number) {
  try {
    localStorage.setItem(CREDITS_KEY, String(c));
  } catch {}
}
