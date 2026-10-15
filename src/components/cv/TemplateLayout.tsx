import { useLayoutEffect, useRef, type ReactNode } from "react";
import { normalizeLayout, type CVLayout } from "@/lib/cv/layout";

type Baseline = { element: HTMLElement; style: string | null; font: number; line: number; top: number; bottom: number; gap: number };
const baselines = new WeakMap<HTMLElement, Baseline[]>();

export function applyTemplateLayout(root: HTMLElement, value: CVLayout) {
  let entries = baselines.get(root);
  if (!entries) {
    entries = Array.from(root.querySelectorAll<HTMLElement>("*"))
      .filter((el) => el instanceof HTMLElement && !["STYLE", "IMG", "SCRIPT"].includes(el.tagName))
      .map((element) => {
        const css = getComputedStyle(element);
        return { element, style: element.getAttribute("style"), font: parseFloat(css.fontSize), line: parseFloat(css.lineHeight), top: parseFloat(css.marginTop), bottom: parseFloat(css.marginBottom), gap: parseFloat(css.rowGap) };
      });
    baselines.set(root, entries);
  }
  const settings = normalizeLayout(value);
  for (const entry of entries) {
    const { element } = entry;
    const factor = entry.font >= 24 ? Math.min(1.15, settings.fontSize / 100) : settings.fontSize / 100;
    element.style.setProperty("font-size", `${entry.font * factor}px`, "important");
    if (Number.isFinite(entry.line)) element.style.setProperty("line-height", `${entry.line * factor}px`, "important");
    for (const [property, size] of [["margin-top", entry.top], ["margin-bottom", entry.bottom], ["row-gap", entry.gap]] as const) {
      if (size >= 16) element.style.setProperty(property, `${size * settings.sectionSpacing / 100}px`, "important");
    }
  }
}

export function restoreTemplateLayout(root: HTMLElement) {
  for (const entry of baselines.get(root) ?? []) {
    if (entry.style === null) entry.element.removeAttribute("style");
    else entry.element.setAttribute("style", entry.style);
  }
  baselines.delete(root);
}

/** Measure actual text, even inside fixed-height, clipped and transformed templates. */
export function measureTemplate(root: HTMLElement) {
  const page = root.getBoundingClientRect();
  const zoom = page.width / 794;
  if (!zoom) return { overflow: false, usedHeight: 0 };
  let usedHeight = 0;
  let overflow = false;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    const parent = node.parentElement;
    if (node.textContent?.trim() && parent && !["STYLE", "SCRIPT"].includes(parent.tagName)) {
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const rect of Array.from(range.getClientRects())) {
        if (!rect.width || !rect.height) continue;
        const bottom = (rect.bottom - page.top) / zoom;
        usedHeight = Math.max(usedHeight, bottom);
        if (bottom > 1095 || rect.left < page.left - zoom || rect.right > page.right + zoom) overflow = true;
        let ancestor = parent;
        while (ancestor !== root && root.contains(ancestor)) {
          const css = getComputedStyle(ancestor);
          if (["hidden", "clip"].includes(css.overflowY)) {
            const bounds = ancestor.getBoundingClientRect();
            if (rect.bottom > bounds.bottom + zoom || rect.top < bounds.top - zoom) overflow = true;
          }
          if (!ancestor.parentElement) break;
          ancestor = ancestor.parentElement;
        }
      }
    }
    node = walker.nextNode();
  }
  return { overflow, usedHeight };
}

export function TemplateLayout({ children, settings }: { children: ReactNode; settings?: CVLayout }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !settings) return;
    applyTemplateLayout(root, settings);
    return () => restoreTemplateLayout(root);
  }, [children, settings]);
  return <div ref={ref} data-cv-layout>{children}</div>;
}