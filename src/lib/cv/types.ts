export type TemplateId = "minimal" | "corporate" | "modern";
export type InputMode = "form" | "coach";

export interface Experience {
  id: string;
  role: string;
  company: string;
  start: string;
  end: string;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  start: string;
  end: string;
}

export interface CV {
  personal: { name: string; email: string; phone: string; location: string; link: string };
  title: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
}

export interface CVDocument {
  cv: CV;
  template: TemplateId;
  mode: InputMode;
  /** Density factor for the A4 page (1 = default, lower = tighter). */
  scale: number;
}

export const uid = () => Math.random().toString(36).slice(2, 10);

export const emptyCV = (): CV => ({
  personal: { name: "", email: "", phone: "", location: "", link: "" },
  title: "",
  summary: "",
  experiences: [{ id: uid(), role: "", company: "", start: "", end: "", bullets: [] }],
  education: [{ id: uid(), degree: "", school: "", start: "", end: "" }],
  skills: [],
});
