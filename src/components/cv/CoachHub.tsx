import { useState } from "react";
import { FileUp, Sparkles, SkipForward, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { readCVFile } from "@/lib/cv/import-document";
import type { ExtractedCV } from "@/lib/cv/extraction";
import { VoiceInput } from "./VoiceInput";

export type Gap = { level: "essential" | "impact"; text: string };

/** Detect missing information in an extracted CV; essentials first. */
export function findGaps(cv: ExtractedCV): Gap[] {
  const gaps: Gap[] = [];
  const p = cv.personal;
  if (!p.name.trim()) gaps.push({ level: "essential", text: "Votre nom complet" });
  if (!p.email.trim() && !p.phone.trim()) gaps.push({ level: "essential", text: "Un moyen de contact (e-mail ou téléphone)" });
  if (!cv.title.trim()) gaps.push({ level: "essential", text: "Le poste que vous visez" });
  if (!cv.experiences.length) gaps.push({ level: "essential", text: "Au moins une expérience (poste, entreprise, dates)" });
  cv.experiences.forEach((x) => {
    const name = x.role || x.company || "une expérience";
    if (!x.start.trim()) gaps.push({ level: "essential", text: `Les dates de « ${name} »` });
    if (!x.bullets.some((b) => /\d/.test(b))) gaps.push({ level: "impact", text: `Un résultat chiffré pour « ${name} » (%, nombre, budget…)` });
  });
  if (!cv.education.length) gaps.push({ level: "essential", text: "Votre formation ou diplôme" });
  if (!cv.summary.trim()) gaps.push({ level: "impact", text: "Une phrase sur votre profil et vos forces" });
  if (cv.skills.length < 5) gaps.push({ level: "impact", text: "Plus de compétences clés (au moins 5)" });
  if (!cv.languages.length) gaps.push({ level: "impact", text: "Les langues que vous parlez" });
  return gaps;
}

export function strengthScore(gaps: Gap[]) {
  const penalty = gaps.reduce((s, g) => s + (g.level === "essential" ? 12 : 5), 0);
  return Math.max(10, 100 - penalty);
}

type Extract = (text: string) => Promise<ExtractedCV | null>;

export function CoachHub({ busy, extract, onApply }: { busy: boolean; extract: Extract; onApply: (cv: ExtractedCV) => void }) {
  const [draft, setDraft] = useState("");
  const [extra, setExtra] = useState("");
  const [reading, setReading] = useState(false);
  const [result, setResult] = useState<ExtractedCV | null>(null);
  const disabled = busy || reading;

  const load = async (file?: File) => {
    if (!file) return;
    setReading(true);
    try {
      const text = await readCVFile(file);
      if (text.length > 30000) throw new Error("Le document est trop long (30 000 caractères maximum).");
      setDraft(text);
      toast.success("Document lu. Lancez l’analyse quand vous êtes prêt.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Le document ne peut pas être lu.");
    } finally { setReading(false); }
  };

  const analyse = async (text: string) => {
    const r = await extract(text);
    if (r) setResult(r);
  };

  const gaps = result ? findGaps(result) : [];
  const score = strengthScore(gaps);
  const reset = () => { setResult(null); setExtra(""); };

  return (
    <section className="space-y-4 rounded-2xl border bg-card p-5 shadow-soft">
      <div>
        <h2 className="flex items-center gap-2 text-base font-semibold"><Sparkles className="size-4 text-primary" />Coach IA</h2>
        <p className="mt-1 text-sm text-muted-foreground">Importez un ancien CV, racontez votre parcours au micro ou écrivez librement. Le coach remplit votre CV et vous signale ce qui manque.</p>
      </div>

      {!result ? (
        <>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm" disabled={disabled}>
              <label><FileUp />{reading ? "Lecture…" : "Importer un ancien CV"}
                <input type="file" aria-label="Importer un ancien CV" className="sr-only" accept=".pdf,.docx,.txt" disabled={disabled} onChange={(e) => { void load(e.target.files?.[0]); e.target.value = ""; }} />
              </label>
            </Button>
            <VoiceInput disabled={disabled} label="Note vocale" onTranscript={(t) => setDraft((o) => (o ? `${o}\n${t}` : t))} />
          </div>
          <textarea className="input min-h-44" aria-label="Mon parcours" placeholder="Ex. Je suis comptable depuis 5 ans chez Ecobank à Lomé, j’ai réduit les délais de clôture de 30 %…" value={draft} onChange={(e) => setDraft(e.target.value)} />
          <Button className="w-full" disabled={disabled || draft.trim().length < 20} onClick={() => void analyse(draft)}>
            <Sparkles />{busy ? "Analyse en cours…" : "Analyser et optimiser"}
          </Button>
        </>
      ) : (
        <>
          <div className="rounded-xl border p-4">
            <div className="flex items-center justify-between text-sm font-semibold"><span>Force du CV</span><span className="tabular-nums text-primary">{score} %</span></div>
            <div className="mt-2 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${score}%` }} /></div>
            <p className="mt-2 text-xs text-muted-foreground">
              {result.experiences.length} expérience(s), {result.education.length} formation(s), {result.skills.length} compétence(s) détectées.
            </p>
          </div>

          {gaps.length ? (
            <div className="space-y-3">
              <p className="text-sm font-semibold">Pour un CV plus fort, il manque :</p>
              <ul className="space-y-1.5 text-sm">
                {gaps.map((g) => (
                  <li key={g.text} className="flex gap-2">
                    <AlertCircle className={`mt-0.5 size-4 shrink-0 ${g.level === "essential" ? "text-destructive" : "text-primary"}`} />
                    <span>{g.text}{g.level === "essential" && <b className="ml-1 text-xs text-destructive">indispensable</b>}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">Répondez ici (texte ou voix)</span>
                <VoiceInput disabled={busy} label="Répondre au micro" onTranscript={(t) => setExtra((o) => (o ? `${o}\n${t}` : t))} />
              </div>
              <textarea className="input min-h-28" aria-label="Informations complémentaires" placeholder="Ex. Mon e-mail : … J’ai géré une équipe de 6 personnes…" value={extra} onChange={(e) => setExtra(e.target.value)} />
              <div className="grid gap-2 sm:grid-cols-2">
                <Button disabled={busy || !extra.trim()} onClick={() => void analyse(`${draft}\n\nInformations complémentaires :\n${extra}`).then(() => { setDraft((d) => `${d}\n\n${extra}`); setExtra(""); })}>
                  <RefreshCw />{busy ? "Analyse…" : "Compléter et réanalyser"}
                </Button>
                <Button variant="outline" disabled={busy} onClick={() => { onApply(result); reset(); }}>
                  <SkipForward />Passer et remplir mon CV
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-sm font-semibold text-primary"><CheckCircle2 className="size-4" />Votre parcours est complet.</p>
              <Button className="w-full" onClick={() => { onApply(result); reset(); }}><Sparkles />Remplir mon CV</Button>
            </div>
          )}
          <button className="text-xs text-muted-foreground underline" onClick={reset}>Recommencer avec un autre texte</button>
        </>
      )}
    </section>
  );
}
