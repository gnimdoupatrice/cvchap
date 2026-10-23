import { z } from "zod";
import { uid, type CV } from "./types";
const text = z.string();
export const extractedCVSchema = z.object({
  personal: z.object({ name: text, email: text, phone: text, location: text, link: text }).strict(),
  title: text, summary: text,
  experiences: z.array(z.object({ role: text, company: text, start: text, end: text, bullets: z.array(text) }).strict()),
  education: z.array(z.object({ degree: text, school: text, start: text, end: text }).strict()),
  skills: z.array(text), languages: z.array(text), interests: z.array(text),
}).strict();
export type ExtractedCV = z.infer<typeof extractedCVSchema>;
export function mergeExtractedCV(current: CV, draft: ExtractedCV): CV {
  const personal = { ...current.personal };
  for (const key of ["name", "email", "phone", "location", "link"] as const) if (draft.personal[key].trim()) personal[key] = draft.personal[key];
  return { ...current, personal,
    title: draft.title.trim() || current.title, summary: draft.summary.trim() || current.summary,
    experiences: draft.experiences.length ? draft.experiences.map(x => ({ ...x, id: uid() })) : current.experiences,
    education: draft.education.length ? draft.education.map(x => ({ ...x, id: uid() })) : current.education,
    skills: draft.skills.length ? draft.skills : current.skills,
    languages: draft.languages.length ? draft.languages : current.languages,
    interests: draft.interests.length ? draft.interests : current.interests,
  };
}

/** Informations indispensables encore absentes après extraction : seules celles-ci donnent lieu à une question. */
export type MissingField = { key: string; label: string; placeholder?: string };
export function missingEssentials(cv: CV): MissingField[] {
  const out: MissingField[] = [];
  if (!cv.personal.name.trim()) out.push({ key: "name", label: "Votre nom complet", placeholder: "Ex. Awa Mensah" });
  if (!cv.title.trim()) out.push({ key: "title", label: "Le poste que vous visez", placeholder: "Ex. Comptable junior" });
  if (!cv.personal.email.trim()) out.push({ key: "email", label: "Votre e-mail", placeholder: "nom@exemple.com" });
  if (!cv.personal.phone.trim()) out.push({ key: "phone", label: "Votre téléphone", placeholder: "+228 …" });
  cv.experiences.forEach((x, i) => {
    const name = x.role.trim() || `Expérience ${i + 1}`;
    if (!x.role.trim()) out.push({ key: `exp:${x.id}:role`, label: `Intitulé du poste (expérience ${i + 1})` });
    if (!x.start.trim()) out.push({ key: `exp:${x.id}:start`, label: `Date de début — ${name}`, placeholder: "Ex. 2021" });
  });
  return out;
}
export function applyAnswers(cv: CV, answers: Record<string, string>): CV {
  const next: CV = { ...cv, personal: { ...cv.personal }, experiences: cv.experiences.map(x => ({ ...x })) };
  for (const [key, raw] of Object.entries(answers)) {
    const value = raw.trim();
    if (!value) continue;
    if (key === "title") next.title = value;
    else if (key === "name" || key === "email" || key === "phone") next.personal[key] = value;
    else if (key.startsWith("exp:")) {
      const [, id, field] = key.split(":");
      const exp = next.experiences.find(x => x.id === id);
      if (exp && (field === "role" || field === "start")) exp[field] = value;
    }
  }
  return next;
}
