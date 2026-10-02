import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, FileCheck2, FileText, PenLine, ShieldCheck, Sparkles, Wand2 } from "lucide-react";
import { CVTemplate, templateMeta } from "@/components/cv/templates";
import { samples } from "@/lib/cv/samples";
import { defaultDoc, saveDoc } from "@/lib/cv/storage";
import type { InputMode, TemplateId } from "@/lib/cv/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CVflow — Créez un CV percutant avec l'IA, sans compte" },
      { name: "description", content: "Générez un CV professionnel en quelques minutes : 3 modèles, Coach IA, aperçu A4 en direct et export PDF lisible par les ATS. Gratuit, sans inscription." },
      { property: "og:title", content: "CVflow — Le CV intelligent, prêt en quelques minutes" },
      { property: "og:description", content: "Coach IA, 3 modèles soignés et export PDF compatible ATS. Testez sans créer de compte." },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [template, setTemplate] = useState<TemplateId>("minimal");
  const [mode, setMode] = useState<InputMode>("form");

  const start = (sampleId?: string) => {
    const doc = defaultDoc();
    const s = samples.find((x) => x.id === sampleId);
    saveDoc({ ...doc, cv: s ? s.cv : doc.cv, template, mode });
    navigate({ to: "/editor" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground"><FileText className="h-4 w-4" /></span>
          CVflow
        </div>
        <button onClick={() => start()} className="btn-ghost text-sm">Ouvrir mon brouillon</button>
      </header>

      <section className="mx-auto max-w-4xl px-6 pb-10 pt-12 text-center sm:pt-20">
        <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> 5 optimisations IA offertes · sans compte
        </span>
        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">Un CV qui raconte vos résultats.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
          Rédigez en formulaire ou laissez le Coach IA vous interviewer. Aperçu A4 en direct, export PDF propre et lisible par les robots de recrutement.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-sm font-medium">Charger un profil d'exemple</p>
          <div className="flex flex-wrap justify-center gap-2">
            {samples.map((s) => (
              <button key={s.id} onClick={() => start(s.id)} className="btn-ghost border bg-card shadow-soft">
                {s.label} <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <h2 className="mb-1 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">1. Choisissez un modèle</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {templateMeta.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`group rounded-2xl border bg-card p-3 text-left shadow-soft transition ${template === t.id ? "ring-2 ring-primary" : "hover:-translate-y-0.5"}`}
            >
              <div className="relative h-64 overflow-hidden rounded-lg border bg-muted/40">
                <div className="cv-paper pointer-events-none absolute left-1/2 top-3 origin-top -translate-x-1/2" style={{ width: 794, transform: "translateX(-50%) scale(0.3)", fontSize: 13, lineHeight: 1.5, ["--cv-gap" as string]: "1.3em", ["--cv-pad" as string]: "56px", minHeight: 1123 }}>
                  <CVTemplate cv={samples[0].cv} template={t.id} />
                </div>
              </div>
              <p className="mt-3 font-medium">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.hint}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <h2 className="mb-5 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">2. Choisissez votre façon d'écrire</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {([
            ["form", PenLine, "Formulaire classique", "Saisie structurée : coordonnées, titre, résumé, expériences, formations, compétences."],
            ["coach", Wand2, "Coach IA", "Une interview guidée : 3 questions simples par expérience (défi, action, résultat)."],
          ] as const).map(([m, Icon, title, desc]) => (
            <button key={m} onClick={() => setMode(m)} className={`rounded-2xl border bg-card p-6 text-left shadow-soft transition ${mode === m ? "ring-2 ring-primary" : ""}`}>
              <Icon className="h-6 w-6 text-primary" />
              <p className="mt-3 font-semibold">{title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </button>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button onClick={() => start()} className="btn-primary px-6 py-3 text-base">Commencer mon CV <ArrowRight className="h-4 w-4" /></button>
        </div>
      </section>

      <section className="border-t bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
          {[
            [ShieldCheck, "Mode invité", "Vos données restent dans votre navigateur. Aucun compte requis pour exporter."],
            [FileCheck2, "PDF compatible ATS", "Texte vectoriel sélectionnable, structure claire lue par les robots."],
            [Sparkles, "IA qui valorise", "Verbes d'action et résultats chiffrés, avec comparatif avant / après."],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof ShieldCheck;
            return (
              <div key={t as string}>
                <I className="h-5 w-5 text-primary" />
                <p className="mt-3 font-medium">{t as string}</p>
                <p className="mt-1 text-sm text-muted-foreground">{d as string}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
