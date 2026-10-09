export type TemplateId =
  | "french-blue"
  | "emerald-tech"
  | "juriste-navy"
  | "alfred-bold"
  | "adeline-capsule"
  | "sacha-dubois"
  | "michael-henson"
  | "elvira-montanez"
  | "emma-brooks"
  | "drew-feig";

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
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
    link: string;
    photo?: string;
  };
  title: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  languages: string[];
  interests: string[];
  /** Champs optionnels utilisés par certains modèles. */
  highlight?: string;
  footnote?: string;
  highlights?: { title: string; text: string }[];
  certifications?: string[];
  references?: { name: string; company: string; contact: string }[];
}

export interface CVDocument {
  cv: CV;
  template: TemplateId;
  mode: InputMode;
  /** Facteur de densité A4 (1 = normal, inférieur = plus serré).   ok ok ok ok  */
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
  languages: [],
  interests: [],
});
