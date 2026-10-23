import { useState } from "react";
import { FileUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { readCVFile } from "@/lib/cv/import-document";
import type { MissingField } from "@/lib/cv/extraction";
import { VoiceInput } from "./VoiceInput";
import { TextField, type AskAI } from "./FormEditor";
import { toast } from "sonner";

/** Flux IA unique : importer, dicter ou écrire → l'IA remplit directement le CV. */
export function AssistantTools({ askAI, busy, onExtract }: { askAI: AskAI; busy: boolean; onExtract: (text: string) => Promise<void> }) {
  const [draft, setDraft] = useState("");
  const [reading, setReading] = useState(false);
  const load = async (file?: File) => {
    if (!file) return;
    setReading(true);
    try {
      const text = await readCVFile(file);
      if (text.length > 30000) throw new Error("Le document est trop long. Collez les passages utiles (30 000 caractères maximum).");
      setDraft(text);
      setReading(false);
      await onExtract(text);
    } catch (error) { toast.error(error instanceof Error ? error.message : "Le document ne peut pas être lu."); }
    finally { setReading(false); }
  };
  return <section>
    <p className="mb-3 text-xs text-muted-foreground">Déposez votre ancien CV, racontez votre parcours ou écrivez-le : l’IA remplit votre CV et ne vous demande que ce qui manque.</p>
    <div className="mb-3 flex flex-wrap items-center gap-2"><Button asChild variant="outline" size="sm" disabled={busy || reading}><label><FileUp />{reading ? "Lecture…" : busy ? "Remplissage…" : "Importer un ancien CV"}<input type="file" aria-label="Importer un ancien CV" className="sr-only" accept=".pdf,.docx,.txt" disabled={busy || reading} onChange={e => { void load(e.target.files?.[0]); e.target.value = ""; }} /></label></Button>
      <VoiceInput disabled={busy || reading} label="Raconter mon parcours en note vocale" onTranscript={text => setDraft(old => old ? `${old}\n${text}` : text)} />
    </div>
    <TextField label="Mon parcours ou mon brouillon" value={draft} onChange={setDraft} askAI={askAI} busy={busy || reading} multiline placeholder="Votre ancien CV, vos notes ou votre parcours…" />
    <Button className="mt-3 w-full" size="sm" disabled={busy || reading || !draft.trim()} onClick={() => onExtract(draft)}><Sparkles />{busy ? "Remplissage…" : "Remplir mon CV automatiquement"}</Button>
  </section>;
}

/** Questions ciblées uniquement sur les informations indispensables manquantes. */
export function MissingInfo({ fields, onApply, onSkip }: { fields: MissingField[]; onApply: (answers: Record<string, string>) => void; onSkip: () => void }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  return <div className="space-y-3">
    <p className="text-sm text-muted-foreground">Votre CV est rempli. Il manque seulement ces informations importantes :</p>
    {fields.map(f => <label key={f.key} className="block text-xs font-medium">{f.label}
      <input className="input mt-1" placeholder={f.placeholder} value={answers[f.key] ?? ""} onChange={e => setAnswers(a => ({ ...a, [f.key]: e.target.value }))} />
    </label>)}
    <div className="sticky bottom-0 flex flex-wrap justify-end gap-2 border-t bg-card pt-3"><Button variant="outline" onClick={onSkip}>Passer</Button><Button onClick={() => onApply(answers)}>Compléter mon CV</Button></div>
  </div>;
}
