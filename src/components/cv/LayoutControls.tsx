import { RotateCcw, Sparkles, Type, Rows3, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DEFAULT_LAYOUT, FONT_MIN, FONT_MAX, SPACING_MIN, SPACING_MAX, type CVLayout } from "@/lib/cv/layout";

export function LayoutControls({ value, onChange, onOptimize, optimizing, overflow }: {
  value: CVLayout; onChange: (value: CVLayout) => void; onOptimize: () => void; optimizing: boolean; overflow: boolean;
}) {
  return (
    <details className="group mt-8 rounded-xl border bg-card px-4 py-3 shadow-soft">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2 text-sm font-semibold"><SlidersHorizontal className="size-4 text-primary" />Ajuster la mise en page A4</span>
        <span className={`text-xs ${overflow ? "text-destructive" : "text-muted-foreground"}`}>{overflow ? "Hors page" : "Format A4"}<ChevronDown className="ml-1 inline size-3.5 transition group-open:rotate-180" /></span>
      </summary>
      <div className="mb-2 mt-4 flex justify-end">
        <Button variant="ghost" size="sm" aria-label="Réinitialiser la mise en page" onClick={() => onChange(DEFAULT_LAYOUT)}><RotateCcw />Réinitialiser</Button>
      </div>
      <div className="grid gap-5">
        <div>
          <div className="mb-3 flex items-center justify-between text-xs"><label id="cv-font-label" className="flex items-center gap-2"><Type className="size-3.5 text-primary" />Taille de police</label><output className="font-semibold tabular-nums">{value.fontSize} %</output></div>
          <Slider aria-labelledby="cv-font-label" min={FONT_MIN} max={FONT_MAX} step={1} value={[value.fontSize]} onValueChange={([fontSize]) => onChange({ ...value, fontSize: fontSize ?? 100 })} />
        </div>
        <div>
          <div className="mb-3 flex items-center justify-between text-xs"><label id="cv-sidebar-label" className="flex items-center gap-2"><Type className="size-3.5 text-primary" />Police colonne latérale</label><output className="font-semibold tabular-nums">{value.sidebarFontSize ?? value.fontSize} %</output></div>
          <Slider aria-labelledby="cv-sidebar-label" min={FONT_MIN} max={FONT_MAX} step={1} value={[value.sidebarFontSize ?? value.fontSize]} onValueChange={([sidebarFontSize]) => onChange({ ...value, sidebarFontSize: sidebarFontSize ?? 100 })} />
        </div>
        <div>
          <div className="mb-3 flex items-center justify-between text-xs"><label id="cv-spacing-label" className="flex items-center gap-2"><Rows3 className="size-3.5 text-primary" />Espacement entre sections</label><output className="font-semibold tabular-nums">{value.sectionSpacing} %</output></div>
          <Slider aria-labelledby="cv-spacing-label" min={SPACING_MIN} max={SPACING_MAX} step={1} value={[value.sectionSpacing]} onValueChange={([sectionSpacing]) => onChange({ ...value, sectionSpacing: sectionSpacing ?? 100 })} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Button size="sm" variant="outline" disabled={optimizing} onClick={onOptimize}><Sparkles />{optimizing ? "Ajustement…" : "Optimiser la page A4"}</Button>
          <span aria-live="polite" className={`text-xs ${overflow ? "text-destructive" : "text-muted-foreground"}`}>{overflow ? "Contenu hors page" : "Format A4"}</span>
        </div>
      </div>
    </details>
  );
}