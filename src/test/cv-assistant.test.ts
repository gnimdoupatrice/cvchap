import { describe, expect, it } from "vitest";
import { applyAnswers, missingEssentials } from "@/lib/cv/extraction";
import { auditStyle, harmonizeStyle } from "@/lib/cv/style";
import { defaultDoc } from "@/lib/cv/storage";

describe("flux IA direct", () => {
  it("ne pose aucune question quand l'essentiel est présent", () => {
    const cv = defaultDoc().cv;
    const filled = { ...cv, personal: { ...cv.personal, name: "A", email: "a@b.c", phone: "1" }, title: "T", experiences: cv.experiences.map(x => ({ ...x, role: x.role || "R", start: x.start || "2020" })) };
    expect(missingEssentials(filled)).toEqual([]);
  });
  it("demande le nom manquant puis l'applique", () => {
    const cv = { ...defaultDoc().cv, personal: { ...defaultDoc().cv.personal, name: "" } };
    expect(missingEssentials(cv).map(x => x.key)).toContain("name");
    expect(applyAnswers(cv, { name: "Awa" }).personal.name).toBe("Awa");
  });
});

describe("harmonisation avant export", () => {
  it("signale plus de deux couleurs personnalisées", () => {
    const style = { elements: { a: { color: "blue" as const }, b: { color: "red" as const }, c: { color: "green" as const } } };
    expect(auditStyle(style).length).toBe(1);
    expect(auditStyle(harmonizeStyle(style))).toEqual([]);
  });
});
