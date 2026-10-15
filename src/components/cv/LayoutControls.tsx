import { RotateCcw, Sparkles, Type, Rows3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DEFAULT_LAYOUT, FONT_MIN, FONT_MAX, SPACING_MIN, SPACING_MAX, type CVLayout } from "@/lib/cv/layout";

export function LayoutControls({ value, onChange, onOptimize, optimizing, overflow }: {
  value: CVLayout; onChange: (value: CVLayout) => void; onOptimize: () => void; optimizing: boolean; overflow: boolean;
}) {
  return (
    <div className="mb-6 border-y py-4">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold">Mise en page A4</h2>
        <Button variant="ghost" size="icon" aria-label="Réinitialiser la mise en page" title="Réinitialiser la mise en page" onClick={() => onChange(DEFAULT_LAYOUT)}><RotateCcw /></Button>
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
    </div>
  );
}