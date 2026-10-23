import type { CV } from "./types";

/** Plain-text rendering of a CV used for ATS/job matching (no photo, no styling). */
export function cvToPlainText(cv: CV): string {
  const lines: string[] = [cv.personal.name, cv.title, cv.summary];
  for (const e of cv.experiences) lines.push(`${e.role} — ${e.company} (${e.start} - ${e.end})`, ...e.bullets);
  for (const e of cv.education) lines.push(`${e.degree} — ${e.school} (${e.start} - ${e.end})`);
  if (cv.skills.length) lines.push(`Compétences : ${cv.skills.join(", ")}`);
  if (cv.languages.length) lines.push(`Langues : ${cv.languages.join(", ")}`);
  if (cv.interests.length) lines.push(`Centres d'intérêt : ${cv.interests.join(", ")}`);
  return lines.map((l) => l?.trim()).filter(Boolean).join("\n").slice(0, 20000);
}
