import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
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
  toolbar,
}: {
  doc: CVDocument;
  onOverflowChange: (overflow: boolean) => void;
  optimizeRequest?: number;
  onOptimized?: (layout: CVLayout | null) => void;
  onElements?: (elements: CVElement[]) => void;
  onSelectElement?: (key: string) => void;
  selectedElement?: string;
  toolbar?: ReactNode;
}) {
  const [rect, setRect] = useState<{ top: number; left: number } | null>(null);
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

  useLayoutEffect(() => {
    const root = contentRef.current;
    const wrap = wrapRef.current;
    root?.querySelectorAll(".cv-selected").forEach((el) => el.classList.remove("cv-selected"));
    if (!root || !wrap || !selectedElement) { setRect(null); return; }
    const target = Array.from(root.querySelectorAll<HTMLElement>("[data-cv-element]")).find((el) => el.dataset["cvElement"] === selectedElement);
    if (!target) { setRect(null); return; }
    target.classList.add("cv-selected");
    const r = target.getBoundingClientRect();
    const w = wrap.getBoundingClientRect();
    setRect({ top: r.top - w.top, left: Math.max(4, Math.min(r.left - w.left, w.width - 300)) });
  }, [selectedElement, doc, zoom]);

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
    <div ref={wrapRef} className="relative flex w-full justify-center py-4">
      {toolbar && rect && (
        <>
          <div className="absolute z-30 hidden no-print sm:block" style={{ top: Math.max(0, rect.top - 48), left: rect.left }} onClick={(e) => e.stopPropagation()}>
            {toolbar}
          </div>
          <div className="fixed inset-x-2 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-50 flex justify-center no-print sm:hidden" onClick={(e) => e.stopPropagation()}>
            {toolbar}
          </div>
        </>
      )}
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
            }} data-selected-element={selectedElement}>
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
