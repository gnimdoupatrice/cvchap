import { afterEach, describe, expect, it } from "vitest";
import { DEFAULT_LAYOUT, findOptimalLayout, normalizeLayout } from "@/lib/cv/layout";
import { defaultDoc, loadDoc, saveDoc } from "@/lib/cv/storage";
import { A4_H, A4_W } from "@/components/cv/A4Preview";

afterEach(() => localStorage.clear());

describe("A4 layout", () => {
  it("retains the required fixed A4 dimensions", () => {
    expect(A4_W).toBe(794);
    expect(A4_H).toBe(1123);
  });
  it("keeps older guest documents readable with default settings", () => {
    localStorage.setItem("cvflow.doc.v1", JSON.stringify({ ...defaultDoc(), layout: undefined }));
    expect(loadDoc().layout).toEqual(DEFAULT_LAYOUT);
  });
  it("persists font size and section spacing without changing content", () => {
    const doc = { ...defaultDoc(), layout: { fontSize: 125, sectionSpacing: 150 } };
    saveDoc(doc);
    expect(loadDoc().layout).toEqual({ fontSize: 125, sectionSpacing: 150 });
    expect(loadDoc().cv).toEqual(doc.cv);
  });
  it("rejects unsafe and invalid layout values", () => {
    expect(normalizeLayout({ fontSize: Infinity, sectionSpacing: -10 })).toEqual({ fontSize: 100, sectionSpacing: 60 });
  });
  it("enlarges sparse content instead of only shrinking it", () => {
    const fits = ({ fontSize, sectionSpacing }: { fontSize: number; sectionSpacing: number }) => fontSize * 6 + sectionSpacing <= 1000;
    const result = findOptimalLayout(fits);
    expect(result).toEqual({ fontSize: 140, sidebarFontSize: 140, sectionSpacing: 160 });
    expect(result && fits(result)).toBe(true);
    expect(fits({ fontSize: 140, sectionSpacing: 161 })).toBe(false);
  });
  it("reports impossible one-page content without discarding text", () => {
    expect(findOptimalLayout(() => false)).toBeNull();
  });
  it("enlarges the main column even when the sidebar is already full", () => {
    const fits = (layout: { fontSize: number; sectionSpacing: number; sidebarFontSize?: number }) => layout.fontSize <= 135 && (layout.sidebarFontSize ?? layout.fontSize) <= 95 && layout.sectionSpacing <= 110;
    expect(findOptimalLayout(fits)).toEqual({ fontSize: 135, sidebarFontSize: 95, sectionSpacing: 110 });
  });
});