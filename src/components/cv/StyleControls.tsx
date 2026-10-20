import { CV_FONTS, CV_COLORS, COLOR_LABELS, type CVStyle, type ElementStyle } from "@/lib/cv/style";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Palette, RotateCcw } from "lucide-react";
import type { CVElement } from "./TemplateLayout";
function StyleFields({ value, onChange, individual }: { value: ElementStyle; onChange: (value: ElementStyle) => void; individual?: boolean }) {
  return <div className="space-y-4">
    <label className="block text-xs font-medium">Police d’écriture<select className="input mt-2" aria-label={individual ? "Police de l’élément" : "Police globale"} value={value.fontFamily ?? "Modèle"} onChange={e => onChange({ ...value, fontFamily: e.target.value as NonNullable<ElementStyle["fontFamily"]> })}>{CV_FONTS.map(font => <option key={font}>{font}</option>)}</select></label>
    {individual && <div><div className="mb-3 flex justify-between text-xs"><span>Taille de l’élément</span><output>{value.fontSize ?? 100} %</output></div><Slider aria-label="Taille de l’élément" min={60} max={180} step={1} value={[value.fontSize ?? 100]} onValueChange={([fontSize]) => onChange({ ...value, fontSize: fontSize ?? 100 })} /></div>}
    <div><span className="mb-2 block text-xs font-medium">Couleur du texte</span><div className="flex flex-wrap gap-2">{CV_COLORS.map(color => <Button key={color} size="icon" variant="outline" className={`cv-swatch size-7 rounded-full ${(value.color ?? "original") === color ? "ring-2 ring-ring ring-offset-2" : ""}`} data-color={color} title={COLOR_LABELS[color]} aria-label={`${individual ? "Élément" : "Global"} : ${COLOR_LABELS[color]}`} aria-pressed={(value.color ?? "original") === color} onClick={() => onChange({ ...value, color })} />)}</div></div>
  </div>;
}
export function StyleControls({ value, onChange, elements, selected, onSelect }: { value: CVStyle; onChange: (value: CVStyle) => void; elements: CVElement[]; selected: string; onSelect: (key: string) => void }) {
  return <details className="group mt-4 rounded-lg border bg-card p-4" open={Boolean(selected)}><summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold"><Palette className="size-4 text-primary" />Polices et couleurs</summary>
    <div className="mt-5"><h3 className="mb-3 text-xs font-semibold">Tout le CV</h3><StyleFields value={value} onChange={next => onChange({ ...value, ...next })} /></div>
    <div className="mt-6 border-t pt-4"><label className="text-xs font-semibold">Élément individuel<select className="input mt-2" aria-label="Élément individuel" value={selected} onChange={e => onSelect(e.target.value)}><option value="">Choisir un élément</option>{elements.map((element, i) => <option key={element.key} value={element.key}>{i + 1}. {element.label}</option>)}</select></label>
      {selected && <div className="mt-4"><StyleFields individual value={value.elements?.[selected] ?? {}} onChange={next => onChange({ ...value, elements: { ...value.elements, [selected]: next } })} /><Button className="mt-3" size="sm" variant="ghost" onClick={() => { const elements = { ...value.elements }; delete elements[selected]; onChange({ ...value, elements }); }}><RotateCcw />Réinitialiser cet élément</Button></div>}
    </div>
  </details>;
}
