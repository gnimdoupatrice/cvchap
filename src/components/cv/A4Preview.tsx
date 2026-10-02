import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CVDocument } from "@/lib/cv/types";
import { CVTemplate } from "./templates";

export const A4_W = 794; // 210mm @ 96dpi
export const A4_H = 1123; // 297mm @ 96dpi

/** Realistic A4 sheet with adaptive zoom and live overflow detection. */
export function A4Preview({
  doc,
  onOverflowChange,
}: {
  doc: CVDocument;
  onOverflowChange: (overflow: boolean) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.6);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth - 32;
      setZoom(Math.min(1, Math.max(0.3, w / A4_W)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (el) onOverflowChange(el.scrollHeight > A4_H + 1);
  });

  const s = doc.scale;
  const height = Math.max(A4_H, contentRef.current?.scrollHeight ?? A4_H);

  return (
    <div ref={wrapRef} className="flex w-full justify-center py-4">
      <div style={{ width: A4_W * zoom, height: height * zoom }}>
        <div className="cv-zoom origin-top-left" style={{ transform: `scale(${zoom})`, width: A4_W }}>
          <div id="cv-page" className="cv-paper relative shadow-paper" style={{ width: A4_W, minHeight: A4_H }}>
            <div
              ref={contentRef}
              style={{
                fontSize: `${13 * s}px`,
                lineHeight: 1.25 + 0.25 * s,
                ["--cv-gap" as string]: `${1.3 * s}em`,
                ["--cv-pad" as string]: `${56 * s}px`,
              }}
            >
              <CVTemplate cv={doc.cv} template={doc.template} />
            </div>
            {height > A4_H && (
              <div
                className="cv-pagebreak pointer-events-none absolute inset-x-0 border-t-2 border-dashed border-destructive"
                style={{ top: A4_H }}
              >
                <span className="absolute right-2 -top-6 rounded bg-destructive px-2 py-0.5 text-xs text-destructive-foreground">
                  Fin de la page 1
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
