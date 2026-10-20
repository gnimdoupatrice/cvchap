import { useState } from "react";
import { CV_FONTS, CV_COLORS, COLOR_LABELS, WORD_COLORS, MAX_WORDS, type CVStyle, type ElementStyle, type WordColor } from "@/lib/cv/style";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Palette, RotateCcw, ArrowUpLeft, Highlighter, X, MousePointerClick } from "lucide-react";
import { parentElementKey, type CVElement } from "./TemplateLayout";

function StyleFields({ value, onChange, individual }: { value: ElementStyle; onChange: (value: ElementStyle) => void; individual?: boolean }) {
  return <div className="space-y-4">
    <label className="block text-xs font-medium">Police d’écriture<select className="input mt-2" aria-label={individual ? "Police de la sélection" : "Police globale"} value={value.fontFamily ?? "Modèle"} onChange={e => onChange({ ...value, fontFamily: e.target.value as NonNullable<ElementStyle["fontFamily"]> })}>{CV_FONTS.map(font => <option key={font}>{font}</option>)}</select></label>
    {individual && <div><div className="mb-3 flex justify-between text-xs"><span>Taille de la sélection</span><output>{value.fontSize ?? 100} %</output></div><Slider aria-label="Taille de la sélection" min={60} max={180} step={1} value={[value.fontSize ?? 100]} onValueChange={([fontSize]) => onChange({ ...value, fontSize: fontSize ?? 100 })} /></div>}
    <div><span className="mb-2 block text-xs font-medium">Couleur du texte</span><div className="flex flex-wrap gap-2">{CV_COLORS.map(color => <Button key={color} size="icon" variant="outline" className={`cv-swatch size-7 rounded-full ${(value.color ?? "original") === color ? "ring-2 ring-ring ring-offset-2" : ""}`} data-color={color} title={COLOR_LABELS[color]} aria-label={`${individual ? "Sélection" : "Global"} : ${COLOR_LABELS[color]}`} aria-pressed={(value.color ?? "original") === color} onClick={() => onChange({ ...value, color })} />)}</div></div>
  </div>;
}

/** Label of a block that has no text of its own: name it after its first text. */
function describe(key: string, elements: CVElement[]) {
  const own = elements.find(e => e.key === key);
  if (own) return own.label;
  const inner = elements.filter(e => e.key.startsWith(`${key}.`));
  return inner.length ? `Bloc « ${inner[0]?.label.slice(0, 40)} » (${inner.length} éléments)` : "Bloc";
}

export function StyleControls({ value, onChange, elements, selected, onSelect, pickedText }: {
  value: CVStyle; onChange: (value: CVStyle) => void; elements: CVElement[]; selected: string; onSelect: (key: string) => void; pickedText: string;
}) {
  const [word, setWord] = useState("");
  const [wordColor, setWordColor] = useState<WordColor>("blue");
  const [mark, setMark] = useState(false);
  const parent = selected ? parentElementKey(selected) : null;
  const listed = elements.some(e => e.key === selected);
  const words = value.words ?? [];
  const candidate = (word || pickedText).trim();
  const addWord = () => {
    if (!candidate) return;
    onChange({ ...value, words: [...words.filter(w => w.text !== candidate), { text: candidate, color: wordColor, ...(mark ? { mark: true } : {}) }].slice(-MAX_WORDS) });
    setWord("");
  };

  return <details className="group mt-4 rounded-xl border bg-card px-4 py-3 shadow-soft" open={Boolean(selected) || undefined}>
    <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold [&::-webkit-details-marker]:hidden"><Palette className="size-4 text-primary" />Polices, couleurs et mise en valeur</summary>

    <div className="mt-5"><h3 className="mb-3 text-xs font-semibold">1. Tout le CV</h3><StyleFields value={value} onChange={next => onChange({ ...value, ...next })} /></div>

    <div className="mt-6 border-t pt-4">
      <h3 className="text-xs font-semibold">2. Une section ou un élément</h3>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><MousePointerClick className="size-3.5" />Cliquez sur un texte de l’aperçu, ou choisissez-le ici.</p>
      <select className="input mt-2" aria-label="Élément individuel" value={selected} onChange={e => onSelect(e.target.value)}>
        <option value="">Choisir un élément</option>
        {selected && !listed && <option value={selected}>{describe(selected, elements)}</option>}
        {elements.map((element, i) => <option key={element.key} value={element.key}>{i + 1}. {element.label}</option>)}
      </select>
      {selected && <div className="mt-3 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" disabled={!parent} onClick={() => parent && onSelect(parent)}><ArrowUpLeft />Sélectionner le bloc qui le contient</Button>
          <Button size="sm" variant="ghost" onClick={() => onSelect("")}><X />Désélectionner</Button>
        </div>
        <p className="rounded-md bg-muted/50 px-2 py-1.5 text-xs">Sélection : <b>{describe(selected, elements)}</b>. Les réglages s’appliquent aussi à tout ce qu’elle contient.</p>
        <StyleFields individual value={value.elements?.[selected] ?? {}} onChange={next => onChange({ ...value, elements: { ...value.elements, [selected]: next } })} />
        <Button size="sm" variant="ghost" onClick={() => { const next = { ...value.elements }; delete next[selected]; onChange({ ...value, elements: next }); }}><RotateCcw />Réinitialiser cette sélection</Button>
      </div>}
    </div>

    <div className="mt-6 border-t pt-4">
      <h3 className="flex items-center gap-1.5 text-xs font-semibold"><Highlighter className="size-3.5 text-primary" />3. Un mot ou un chiffre</h3>
      <p className="mt-1 text-xs text-muted-foreground">Surlignez un mot dans l’aperçu ou tapez-le, ex. « +35 % ». Toutes ses occurrences changent de couleur.</p>
      <input className="input mt-2" aria-label="Mot ou chiffre à mettre en valeur" placeholder={pickedText || "Ex. +35 %"} value={word} onChange={e => setWord(e.target.value)} maxLength={60} />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {WORD_COLORS.map(color => <Button key={color} size="icon" variant="outline" className={`cv-swatch size-7 rounded-full ${wordColor === color ? "ring-2 ring-ring ring-offset-2" : ""}`} data-color={color} title={COLOR_LABELS[color]} aria-label={`Mot : ${COLOR_LABELS[color]}`} aria-pressed={wordColor === color} onClick={() => setWordColor(color)} />)}
        <label className="ml-1 flex items-center gap-1.5 text-xs"><input type="checkbox" checked={mark} onChange={e => setMark(e.target.checked)} />Surligner</label>
      </div>
      <Button className="mt-3" size="sm" disabled={!candidate} onClick={addWord}><Highlighter />Mettre en valeur{candidate ? ` « ${candidate.slice(0, 24)} »` : ""}</Button>
      {words.length > 0 && <ul className="mt-3 flex flex-wrap gap-1.5">
        {words.map(w => <li key={w.text} className="flex items-center gap-1 rounded-full border py-0.5 pl-2 pr-0.5 text-xs">
          <span className="cv-swatch size-2.5 rounded-full" data-color={w.color} />{w.text}{w.mark && " (surligné)"}
          <Button size="icon" variant="ghost" className="size-5" aria-label={`Retirer ${w.text}`} onClick={() => onChange({ ...value, words: words.filter(x => x.text !== w.text) })}><X className="size-3" /></Button>
        </li>)}
      </ul>}
    </div>
  </details>;
}
