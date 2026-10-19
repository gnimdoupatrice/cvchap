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
