import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CVDocument } from "@/lib/cv/types";
import { CVTemplate } from "./templates";
import { applyTemplateLayout, measureTemplate, listTemplateElements, type CVElement } from "./TemplateLayout";
import { findOptimalLayout, normalizeLayout, type CVLayout } from "@/lib/cv/layout";

export const A4_W = 794; // 210mm @ 96dpi
export const A4_H = 1123; // 297mm @ 96dpi

/**
 * Feuille A4 réaliste avec zoom adaptatif à la largeur de l'écran
 * et préservation stricte de la typographie de chaque gabarit.
 */
export function A4Preview({
  doc,
  onOverflowChange,
  optimizeRequest = 0,
  onOptimized,
  onElements,
  onSelectElement,
  selectedElement,
  onPickText,
}: {
  doc: CVDocument;
  onOverflowChange: (overflow: boolean) => void;
  optimizeRequest?: number;
  onOptimized?: (layout: CVLayout | null) => void;
  onElements?: (elements: CVElement[]) => void;
  onSelectElement?: (key: string) => void;
  selectedElement?: string;
  onPickText?: (text: string) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.6);
  const [overflow, setOverflow] = useState(false);
  const handledRequest = useRef(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth - 32;
      setZoom(Math.min(1, Math.max(0.1, w / A4_W)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    let active = true;
    const check = () => {
      if (!active) return;
      const measured = measureTemplate(el);
      setOverflow(measured.overflow);
      onOverflowChange(measured.overflow);
    };
    check();
    const layoutRoot = el.querySelector<HTMLElement>("[data-cv-layout]");
    if (layoutRoot) onElements?.(listTemplateElements(layoutRoot));
    const observer = new ResizeObserver(check);
    observer.observe(el);
    void document.fonts.ready.then(check);
    return () => { active = false; observer.disconnect(); };
  }, [doc, zoom, onOverflowChange, onElements]);

  // Word accents use the CSS Highlight API: no DOM mutation inside React-managed templates, and it prints.
  useLayoutEffect(() => {
    const root = contentRef.current;
    const words = normalizeLayout(doc.layout).style?.words ?? [];
    const registry = typeof CSS !== "undefined" && "highlights" in CSS ? CSS.highlights : null;
    if (!root || !registry || typeof Highlight === "undefined") return;
    const groups = new Map<string, Range[]>();
    const push = (name: string, range: Range) => groups.set(name, [...(groups.get(name) ?? []), range]);
    if (words.length) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const text = node.textContent ?? "";
        for (const word of words) {
          for (let at = text.indexOf(word.text); at >= 0; at = text.indexOf(word.text, at + word.text.length)) {
            const range = new Range();
            range.setStart(node, at);
            range.setEnd(node, at + word.text.length);
            push(`cv-word-${word.color}`, range);
            if (word.mark) push("cv-word-mark", range);
          }
        }
      }
    }
    for (const [name, ranges] of groups) registry.set(name, new Highlight(...ranges));
    return () => { for (const name of groups.keys()) registry.delete(name); };
  });

  useLayoutEffect(() => {
    const root = contentRef.current;
    if (!root || !selectedElement) return;
    const element = root.querySelector<HTMLElement>(`[data-cv-element="${CSS.escape(selectedElement)}"]`);
    element?.classList.add("cv-selected");
    return () => element?.classList.remove("cv-selected");
  });

  useEffect(() => {
    if (!optimizeRequest || handledRequest.current === optimizeRequest) return;
    const el = contentRef.current?.querySelector<HTMLElement>("[data-cv-layout]");
    if (!el) return;
    handledRequest.current = optimizeRequest;
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (cancelled) return;
      const result = findOptimalLayout((layout) => {
        applyTemplateLayout(el, layout);
        return !measureTemplate(el).overflow;
      }, normalizeLayout(doc.layout));
      applyTemplateLayout(el, normalizeLayout(doc.layout));
      onOptimized?.(result);
    });
    return () => { cancelled = true; };
  }, [optimizeRequest, doc.layout, onOptimized]);

  return (
    <div ref={wrapRef} className="flex w-full justify-center py-4">
      <div style={{ width: A4_W * zoom, height: A4_H * zoom }}>
        <div
          className="cv-zoom origin-top-left"
          style={{ transform: `scale(${zoom})`, width: A4_W }}
        >
          <div
            id="cv-page"
            className="cv-paper relative shadow-paper"
            style={{ width: A4_W, height: A4_H }}
          >
            <div ref={contentRef} onClick={(event) => {
              if (!(event.target instanceof Element)) return;
              const element = event.target.closest<HTMLElement>("[data-cv-element]");
              if (element?.dataset["cvElement"]) onSelectElement?.(element.dataset["cvElement"]);
            }} onPointerOver={(event) => {
              if (!(event.target instanceof Element)) return;
              const element = event.target.closest<HTMLElement>("[data-cv-element]");
              if (element) element.title = "Personnaliser cet élément";
            }} onMouseUp={() => {
              const picked = window.getSelection()?.toString().trim() ?? "";
              if (picked && picked.length <= 60 && !picked.includes("\n")) onPickText?.(picked);
            }} className={onSelectElement ? "cursor-pointer" : undefined}>
              <CVTemplate cv={doc.cv} template={doc.template} layout={normalizeLayout(doc.layout)} />
            </div>
            {overflow && (
              <div
                className="cv-pagebreak pointer-events-none absolute inset-x-0 border-t-2 border-dashed border-destructive"
                style={{ top: A4_H }}
              >
                <span className="absolute right-2 -top-6 rounded bg-destructive px-2 py-0.5 text-xs text-destructive-foreground">
                  Fin de la page 1 (dépassement A4)
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
