import { CV_FONTS, CV_COLORS, COLOR_LABELS, type CVStyle, type ElementStyle } from "@/lib/cv/style";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { MousePointerClick, RotateCcw, X } from "lucide-react";
import type { CVElement } from "./TemplateLayout";
function StyleFields({ value, onChange, individual }: { value: ElementStyle; onChange: (value: ElementStyle) => void; individual?: boolean }) {
  return <div className="space-y-3">
    <label className="flex items-center justify-between gap-3 text-xs font-medium">Police<select className="input h-8 max-w-44 py-0 text-xs" aria-label={individual ? "Police de l’élément" : "Police globale"} value={value.fontFamily ?? "Modèle"} onChange={e => onChange({ ...value, fontFamily: e.target.value as NonNullable<ElementStyle["fontFamily"]> })}>{CV_FONTS.map(font => <option key={font}>{font}</option>)}</select></label>
    {individual && <div><div className="mb-2 flex justify-between text-xs"><span>Taille</span><output>{value.fontSize ?? 100} %</output></div><Slider aria-label="Taille de l’élément" min={60} max={180} step={1} value={[value.fontSize ?? 100]} onValueChange={([fontSize]) => onChange({ ...value, fontSize: fontSize ?? 100 })} /></div>}
    <div className="flex flex-wrap items-center gap-1.5"><span className="mr-1 text-xs font-medium">Couleur</span>{CV_COLORS.map(color => <Button key={color} size="icon" variant="outline" className={`cv-swatch size-6 rounded-full ${(value.color ?? "original") === color ? "ring-2 ring-ring ring-offset-1" : ""}`} data-color={color} title={COLOR_LABELS[color]} aria-label={`${individual ? "Élément" : "Global"} : ${COLOR_LABELS[color]}`} aria-pressed={(value.color ?? "original") === color} onClick={() => onChange({ ...value, color })} />)}</div>
  </div>;
}
export function StyleControls({ value, onChange, elements, selected, onSelect }: { value: CVStyle; onChange: (value: CVStyle) => void; elements: CVElement[]; selected: string; onSelect: (key: string) => void }) {
  const label = elements.find(e => e.key === selected)?.label;
  return <div className="space-y-4">
    <div><h3 className="mb-2 text-xs font-semibold">Tout le CV</h3><StyleFields value={value} onChange={next => onChange({ ...value, ...next })} /></div>
    <div className="border-t pt-3">
      {selected ? <>
        <div className="mb-2 flex items-center justify-between gap-2"><h3 className="min-w-0 truncate text-xs font-semibold">Élément : {label ?? "sélection"}</h3><Button size="icon" variant="ghost" className="size-7" aria-label="Désélectionner" onClick={() => onSelect("")}><X className="size-3.5" /></Button></div>
        <StyleFields individual value={value.elements?.[selected] ?? {}} onChange={next => onChange({ ...value, elements: { ...value.elements, [selected]: next } })} />
        <Button className="mt-2" size="sm" variant="ghost" onClick={() => { const els = { ...value.elements }; delete els[selected]; onChange({ ...value, elements: els }); }}><RotateCcw />Réinitialiser cet élément</Button>
      </> : <p className="flex items-center gap-2 text-xs text-muted-foreground"><MousePointerClick className="size-3.5 shrink-0 text-primary" />Touchez un texte ou une section sur l’aperçu A4 pour le personnaliser.</p>}
    </div>
  </div>;
}
