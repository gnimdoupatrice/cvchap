import { ArrowUpToLine, Minus, Plus, RotateCcw, X } from "lucide-react";
import { CV_COLORS, CV_FONTS, COLOR_LABELS, type CVStyle, type ElementStyle } from "@/lib/cv/style";

/** Parent key of an element: drops the last path segment ("tpl:0.1.2" -> "tpl:0.1"). */
export function parentElementKey(key: string): string | null {
  const [template, path] = key.split(":");
  if (!path || !path.includes(".")) return null;
  return `${template}:${path.slice(0, path.lastIndexOf("."))}`;
}

export function ElementToolbar({ style, selected, onChange, onSelect, onClose }: {
  style: CVStyle; selected: string; onChange: (style: CVStyle) => void; onSelect: (key: string) => void; onClose: () => void;
}) {
  const current: ElementStyle = style.elements?.[selected] ?? {};
  const set = (next: ElementStyle) => onChange({ ...style, elements: { ...style.elements, [selected]: next } });
  const scale = (f: number) => set({ ...current, fontSize: Math.max(60, Math.min(180, Math.round((current.fontSize ?? 100) * f))) });
  const reset = () => { const elements = { ...style.elements }; delete elements[selected]; onChange({ ...style, elements }); };
  const parent = parentElementKey(selected);
  const btn = "grid size-7 place-items-center rounded-md hover:bg-muted";
  return (
    <div role="toolbar" aria-label="Retouche rapide" className="flex flex-wrap items-center gap-1 rounded-lg border bg-card p-1 shadow-xl">
      <button className={btn} onClick={() => scale(0.9)} aria-label="Réduire (A-)" title="Réduire"><Minus className="size-3.5" /></button>
      <span className="w-9 text-center text-[11px] tabular-nums">{current.fontSize ?? 100}%</span>
      <button className={btn} onClick={() => scale(1.1)} aria-label="Agrandir (A+)" title="Agrandir"><Plus className="size-3.5" /></button>
      <span className="mx-1 h-5 w-px bg-border" />
      <select aria-label="Police de l’élément" className="h-7 max-w-28 rounded-md border bg-card px-1 text-[11px]"
        value={current.fontFamily ?? "Modèle"}
        onChange={(e) => set({ ...current, fontFamily: e.target.value as NonNullable<ElementStyle["fontFamily"]> })}>
        {CV_FONTS.map((f) => <option key={f}>{f}</option>)}
      </select>
      <span className="mx-1 h-5 w-px bg-border" />
      {CV_COLORS.map((color) => (
        <button key={color} data-color={color} title={COLOR_LABELS[color]} aria-label={`Couleur : ${COLOR_LABELS[color]}`}
          className={`cv-swatch size-5 rounded-full border ${(current.color ?? "original") === color ? "ring-2 ring-ring ring-offset-1" : ""}`}
          onClick={() => set({ ...current, color })} />
      ))}
      <span className="mx-1 h-5 w-px bg-border" />
      {parent && <button className={btn} onClick={() => onSelect(parent)} aria-label="Sélectionner toute la section" title="Sélectionner toute la section"><ArrowUpToLine className="size-3.5" /></button>}
      <button className={btn} onClick={reset} aria-label="Réinitialiser l’élément" title="Réinitialiser"><RotateCcw className="size-3.5" /></button>
      <button className={btn} onClick={onClose} aria-label="Fermer" title="Fermer"><X className="size-3.5" /></button>
    </div>
  );
}
