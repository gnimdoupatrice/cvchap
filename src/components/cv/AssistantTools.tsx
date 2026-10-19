import { useState } from "react";
import { FileUp, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { readCVFile } from "@/lib/cv/import-document";
import type { ExtractedCV } from "@/lib/cv/extraction";
import type { CV } from "@/lib/cv/types";
import { VoiceInput } from "./VoiceInput";
import { TextField, type AskAI } from "./FormEditor";
import { toast } from "sonner";
export type AskCoach = (input: { role: string; company: string; challenge: string; action: string; result: string }, before: string, apply: (text: string) => void) => void;
export function AssistantTools({ cv, onChange, askAI, askCoach, busy, onExtract }: { cv: CV; onChange: (cv: CV) => void; askAI: AskAI; askCoach: AskCoach; busy: boolean; onExtract: (text: string) => Promise<void> }) {
  const [draft, setDraft] = useState("");
  const [reading, setReading] = useState(false);
  const [experienceId, setExperienceId] = useState(cv.experiences[0]?.id ?? "");
  const [answers, setAnswers] = useState({ challenge: "", action: "", result: "" });
  const experience = cv.experiences.find(x => x.id === experienceId) ?? cv.experiences[0];
  const load = async (file?: File) => {
    if (!file) return;
    setReading(true);
    try { const text = await readCVFile(file); if (text.length > 30000) throw new Error("Le document est trop long. Collez les passages utiles (30 000 caractères maximum)."); setDraft(text); toast.success("Document lu. Vérifiez le texte avant de le répartir."); }
    catch (error) { toast.error(error instanceof Error ? error.message : "Le document ne peut pas être lu."); }
    finally { setReading(false); }
  };
  return <section className="mb-6 border-b pb-6">
    <div className="mb-3 flex items-center gap-2"><Sparkles className="size-4 text-primary" /><h2 className="text-sm font-semibold">Assistant de rédaction</h2></div>
    <div className="mb-3 flex flex-wrap items-center gap-2"><Button asChild variant="outline" size="sm" disabled={busy || reading}><label><FileUp />{reading ? "Lecture…" : "Importer un ancien CV"}<input type="file" aria-label="Importer un ancien CV" className="sr-only" accept=".pdf,.docx,.txt" disabled={busy || reading} onChange={e => { void load(e.target.files?.[0]); e.target.value = ""; }} /></label></Button>
      <VoiceInput disabled={busy || reading} label="Raconter mon parcours en note vocale" onTranscript={text => setDraft(old => old ? `${old}\n${text}` : text)} />
    </div>
    <TextField label="Mon parcours ou mon brouillon" value={draft} onChange={setDraft} askAI={askAI} busy={busy || reading} multiline placeholder="Votre ancien CV, vos notes ou votre parcours…" />
    <Button className="mt-3 w-full" size="sm" disabled={busy || reading || !draft.trim()} onClick={() => onExtract(draft)}><Sparkles />{busy ? "Préparation…" : "Répartir dans mon CV"}</Button>
    <details className="group mt-5"><summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold">Préparer une expérience avec le coach<ChevronDown className="size-4 group-open:rotate-180" /></summary>
      <div className="mt-3 space-y-3">
        <label className="block text-xs text-muted-foreground">Expérience<select className="input mt-1" aria-label="Expérience pour le coach" value={experience?.id ?? ""} onChange={e => setExperienceId(e.target.value)}>{cv.experiences.map((x, i) => <option key={x.id} value={x.id}>{x.role || `Expérience ${i + 1}`}</option>)}</select></label>
        {([['challenge', 'Le défi rencontré'], ['action', 'Mes actions concrètes'], ['result', 'Les résultats obtenus']] as const).map(([key, label]) => <TextField key={key} label={label} value={answers[key]} onChange={text => setAnswers(old => ({ ...old, [key]: text }))} askAI={askAI} busy={busy} multiline context={experience?.role} />)}
        <Button variant="outline" size="sm" disabled={busy || !experience?.role.trim() || Object.values(answers).some(text => !text.trim())} onClick={() => {
          if (!experience) return;
          askCoach({ role: experience.role, company: experience.company, ...answers }, experience.bullets.join("\n"), text => onChange({ ...cv, experiences: cv.experiences.map(x => x.id === experience.id ? { ...x, bullets: text.split("\n").map(l => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean) } : x) }));
        }}><Sparkles />Proposer mes réalisations</Button>
      </div>
    </details>
  </section>;
}
export function ImportReview({ draft, onAccept, onCancel }: { draft: ExtractedCV; onAccept: () => void; onCancel: () => void }) {
  const groups = [
    ["Coordonnées", Object.values(draft.personal).filter(Boolean).join(" · ")], ["Titre", draft.title], ["Résumé", draft.summary],
    ["Expériences", draft.experiences.map(x => `${x.role} — ${x.company} (${x.start} – ${x.end})\n${x.bullets.join("\n")}`).join("\n\n")],
    ["Formations", draft.education.map(x => `${x.degree} — ${x.school} (${x.start} – ${x.end})`).join("\n")],
    ["Compétences", draft.skills.join(", ")], ["Langues", draft.languages.join(", ")], ["Centres d’intérêt", draft.interests.join(", ")],
  ];
  return <div className="space-y-4">{groups.map(([label, text]) => <section key={label}><h3 className="mb-1 text-xs font-semibold text-primary">{label}</h3><p className="whitespace-pre-wrap break-words text-sm">{text || "Non renseigné — contenu actuel conservé"}</p></section>)}
    <div className="sticky bottom-0 flex flex-wrap justify-end gap-2 border-t bg-card py-3"><Button variant="outline" onClick={onCancel}>Annuler</Button><Button onClick={onAccept}>Appliquer sur mon CV</Button></div>
  </div>;
}
