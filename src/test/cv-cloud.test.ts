import { describe, expect, it } from "vitest";
import { defaultDoc, normalizeDoc } from "@/lib/cv/storage";
import { cvToPlainText } from "@/lib/cv/plain-text";

describe("online CV documents", () => {
  it("falls back to a valid document when the stored payload is empty", () => {
    expect(normalizeDoc({}).template).toBe("emerald-tech");
    expect(normalizeDoc(null).cv.personal.name).toBe(defaultDoc().cv.personal.name);
  });
  it("rejects unknown templates from stored online documents", () => {
    expect(normalizeDoc({ template: "hack" as never }).template).toBe("emerald-tech");
  });
  it("job matching text never includes the portrait image", () => {
    const doc = defaultDoc();
    const text = cvToPlainText({ ...doc.cv, personal: { ...doc.cv.personal, photo: "data:image/png;base64,AAAA" } });
    expect(text).not.toContain("data:image");
  });
});
