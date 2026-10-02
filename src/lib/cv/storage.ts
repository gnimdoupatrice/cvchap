import { emptyCV, type CVDocument } from "./types";

const DOC_KEY = "cvflow.doc.v1";
const CREDITS_KEY = "cvflow.credits.v1";
export const FREE_CREDITS = 5;

export const defaultDoc = (): CVDocument => ({ cv: emptyCV(), template: "minimal", mode: "form", scale: 1 });

export function loadDoc(): CVDocument {
  try {
    const raw = localStorage.getItem(DOC_KEY);
    if (raw) return { ...defaultDoc(), ...JSON.parse(raw) };
  } catch {}
  return defaultDoc();
}

export function saveDoc(doc: CVDocument) {
  try {
    localStorage.setItem(DOC_KEY, JSON.stringify(doc));
  } catch {}
}

export function loadCredits(): number {
  const v = Number(localStorage.getItem(CREDITS_KEY));
  return localStorage.getItem(CREDITS_KEY) === null || Number.isNaN(v) ? FREE_CREDITS : v;
}

export function saveCredits(n: number) {
  localStorage.setItem(CREDITS_KEY, String(Math.max(0, n)));
}
