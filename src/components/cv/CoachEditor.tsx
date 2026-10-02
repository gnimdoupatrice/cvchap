import { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { uid, type CV } from "@/lib/cv/types";
import { Section } from "./FormEditor";

const QUESTIONS = [
  { key: "challenge", q: "Quel défi ou problème deviez-vous résoudre ?", ph: "Ex. Le site de paiement était trop lent et les clients abandonnaient." },
  { key: "action", q: "Qu'avez-vous fait concrètement ?", ph: "Ex. J'ai refait l'interface en React et optimisé les requêtes." },
  { key: "result", q: "Quel résultat mesurable avez-vous obtenu ?", ph: "Ex. Temps de chargement divisé par deux, +15 % de conversions." },
] as const;

type Answers = Record<(typeof QUESTIONS)[number]["key"], string>;

export function CoachEditor({
  cv,
  onChange,
  busy,
  askCoach,
}: {
  cv: CV;
  onChange: (cv: CV) => void;
  busy: boolean;
  askCoach: (input: { role: string; company: string } & Answers, before: string, apply: (t: string) => void) => void;
}) {
  const [expId, setExpId] = useState<string>(cv.experiences[0]?.id ?? "new");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ challenge: "", action: "", result: "" });
  const exp = cv.experiences.find((e) => e.id === expId);
  const [draft, setDraft] = useState({ role: "", company: "", start: "", end: "" });
  const role = exp?.role ?? draft.role;
  const company = exp?.company ?? draft.company;
  const current = QUESTIONS[step];

  const apply = (t: string) => {
    const bullets = t.split("\n").map((l) => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
    if (exp) onChange({ ...cv, experiences: cv.experiences.map((e) => (e.id === exp.id ? { ...e, bullets } : e)) });
    else {
      const id = uid();
      onChange({ ...cv, experiences: [...cv.experiences.filter((e) => e.role || e.company), { id, ...draft, bullets }] });
      setExpId(id);
    }
    setStep(0);
    setAnswers({ challenge: "", action: "", result: "" });
  };

  return (
    <div className="space-y-4">
      <Section title="Coach IA — interview guidée">
        <p className="text-sm text-muted-foreground">
          Répondez simplement à 3 questions par expérience. Le coach transforme vos réponses en réalisations percutantes. Les coordonnées, formations et compétences se remplissent en mode Formulaire.
        </p>
        <select className="input" value={expId} onChange={(e) => { setExpId(e.target.value); setStep(0); }}>
          {cv.experiences.map((e, i) => (
            <option key={e.id} value={e.id}>{e.role || `Expérience ${i + 1}`}{e.company ? ` — ${e.company}` : ""}</option>
          ))}
          <option value="new">+ Nouvelle expérience</option>
        </select>
        {!exp && (
          <div className="grid gap-3 sm:grid-cols-2">
            <input className="input" placeholder="Poste" value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} />
            <input className="input" placeholder="Entreprise" value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} />
            <input className="input" placeholder="Début" value={draft.start} onChange={(e) => setDraft({ ...draft, start: e.target.value })} />
            <input className="input" placeholder="Fin" value={draft.end} onChange={(e) => setDraft({ ...draft, end: e.target.value })} />
          </div>
        )}
      </Section>

      <section className="rounded-2xl border bg-card p-6 shadow-soft">
        <div className="mb-5 flex gap-1.5">
          {QUESTIONS.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Question {step + 1} sur 3</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight">{current.q}</h3>
        <textarea
          key={current.key}
          autoFocus
          className="input mt-4 min-h-32"
          placeholder={current.ph}
          value={answers[current.key]}
          onChange={(e) => setAnswers({ ...answers, [current.key]: e.target.value })}
        />
        <div className="mt-4 flex justify-between">
          <button className="btn-ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>
            <ArrowLeft className="h-4 w-4" /> Précédent
          </button>
          {step < 2 ? (
            <button className="btn-primary" disabled={!answers[current.key].trim()} onClick={() => setStep(step + 1)}>
              Suivant <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              className="btn-primary"
              disabled={busy || !answers.result.trim() || !role.trim()}
              onClick={() => askCoach({ role, company, ...answers }, exp?.bullets.join("\n") ?? "", apply)}
            >
              <Sparkles className="h-4 w-4" /> {busy ? "Rédaction…" : "Générer mes réalisations"}
            </button>
          )}
        </div>
        {step === 2 && !role.trim() && <p className="mt-2 text-xs text-destructive">Indiquez d'abord l'intitulé du poste.</p>}
      </section>
    </div>
  );
}
