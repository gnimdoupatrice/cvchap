import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CVDocument } from "@/lib/cv/types";
import { CVTemplate } from "./templates";
import { applyTemplateLayout, measureTemplate } from "./TemplateLayout";
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
}: {
  doc: CVDocument;
  onOverflowChange: (overflow: boolean) => void;
  optimizeRequest?: number;
  onOptimized?: (layout: CVLayout | null) => void;
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
    const observer = new ResizeObserver(check);
    observer.observe(el);
    void document.fonts.ready.then(check);
    return () => { active = false; observer.disconnect(); };
  }, [doc, zoom, onOverflowChange]);

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
      });
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
            style={{ width: A4_W, minHeight: A4_H }}
          >
            <div ref={contentRef}>
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
