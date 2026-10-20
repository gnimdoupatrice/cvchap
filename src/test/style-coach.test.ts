import { describe, expect, it } from "vitest";
import { auditStyle, harmonizeStyle, normalizeStyle } from "@/lib/cv/style";
import { cascadeOverride, parentElementKey } from "@/components/cv/TemplateLayout";
import { findGaps, strengthScore } from "@/components/cv/CoachHub";
import type { ExtractedCV } from "@/lib/cv/extraction";

const complete: ExtractedCV = {
  personal: { name: "Awa Koffi", email: "awa@example.com", phone: "", location: "Lomé", link: "" },
  title: "Comptable",
  summary: "Comptable rigoureuse.",
  experiences: [{ role: "Comptable", company: "Ecobank", start: "2020", end: "2025", bullets: ["Réduit les délais de clôture de 30 %"] }],
  education: [{ degree: "Licence", school: "Université de Lomé", start: "2016", end: "2019" }],
  skills: ["Sage", "Excel", "IFRS", "Audit", "Fiscalité"],
  languages: ["Français"],
  interests: [],
};

describe("Style audit and harmonisation", () => {
  it("flags more than two custom colours", () => {
    expect(auditStyle({ color: "blue", elements: { a: { color: "red" } }, words: [{ text: "+35 %", color: "green" }] }))
      .toContain("Plus de deux couleurs personnalisées.");
  });
  it("flags more than two custom fonts", () => {
    expect(auditStyle({ fontFamily: "Arial", elements: { a: { fontFamily: "Georgia" }, b: { fontFamily: "Verdana" } } }))
      .toContain("Plus de deux polices personnalisées.");
  });
  it("flags element sizes outside 80–140 %", () => {
    expect(auditStyle({ elements: { a: { fontSize: 150 } } })).toContain("Écarts de taille importants entre les éléments.");
    expect(auditStyle({ elements: { a: { fontSize: 140 } } })).toEqual([]);
  });
  it("flags more than 6 accented words", () => {
    const words = Array.from({ length: 7 }, (_, i) => ({ text: `mot${i}`, color: "blue" as const }));
    expect(auditStyle({ words })).toHaveLength(1);
    expect(auditStyle({ words: words.slice(0, 6) })).toEqual([]);
  });
  it("harmonising keeps the global charter and drops local overrides", () => {
    const result = harmonizeStyle({ fontFamily: "Georgia", color: "ink", elements: { a: { fontSize: 170, color: "red" } }, words: [{ text: "+35 %", color: "green" }, { text: "React", color: "red" }] });
    expect(result).toEqual({ fontFamily: "Georgia", color: "ink", words: [{ text: "+35 %", color: "green" }, { text: "React", color: "green" }] });
    expect(auditStyle(result)).toEqual([]);
  });
  it("rejects invalid or duplicate word accents", () => {
    expect(normalizeStyle({ words: [{ text: "  ", color: "blue" }, { text: "A", color: "blue" }, { text: "A", color: "red" }] }).words)
      .toEqual([{ text: "A", color: "blue" }]);
  });
});

describe("Section-level style cascade", () => {
  it("finds the containing block of an element", () => {
    expect(parentElementKey("tpl:0.3.1")).toBe("tpl:0.3");
    expect(parentElementKey("tpl:0")).toBeNull();
  });
  it("applies a section style to its children, closest override winning", () => {
    const elements = { "tpl:0.3": { color: "blue" as const, fontSize: 120, fontFamily: "Arial" as const }, "tpl:0.3.1": { color: "red" as const, fontSize: 50 } };
    expect(cascadeOverride("tpl:0.3.1", elements)).toEqual({ color: "red", fontFamily: "Arial", fontSize: 60 });
    expect(cascadeOverride("tpl:0.3.2", elements)).toEqual({ color: "blue", fontFamily: "Arial", fontSize: 120 });
  });
});

describe("Coach completeness check", () => {
  it("reports nothing missing for a complete profile", () => {
    expect(findGaps(complete)).toEqual([]);
    expect(strengthScore([])).toBe(100);
  });
  it("lists missing contact and dates as essential", () => {
    const gaps = findGaps({ ...complete, personal: { ...complete.personal, email: "" }, experiences: [{ ...complete.experiences[0]!, start: "" }] });
    expect(gaps.filter((g) => g.level === "essential").map((g) => g.text)).toEqual(["Un moyen de contact (e-mail ou téléphone)", "Les dates de « Comptable »"]);
  });
  it("asks for a figure when an experience has no measurable result", () => {
    const gaps = findGaps({ ...complete, experiences: [{ ...complete.experiences[0]!, bullets: ["Tenu la comptabilité"] }] });
    expect(gaps).toEqual([{ level: "impact", text: "Un résultat chiffré pour « Comptable » (%, nombre, budget…)" }]);
    expect(strengthScore(gaps)).toBe(95);
  });
});
