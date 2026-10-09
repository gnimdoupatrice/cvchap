import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  FileCheck2,
  FileText,
  Maximize2,
  PenLine,
  ShieldCheck,
  Sparkles,
  Wand2,
  X,
  ZoomIn,
} from "lucide-react";
import { CVTemplate, templateMeta } from "@/components/cv/templates";
import { A4Thumbnail } from "@/components/cv/A4Thumbnail";
import { sampleMap, samples } from "@/lib/cv/samples";
import { defaultDoc, saveDoc } from "@/lib/cv/storage";
import type { InputMode, TemplateId } from "@/lib/cv/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CVflow — Créez un CV percutant avec l'IA, sans compte" },
      {
        name: "description",
        content:
          "4 modèles A4 fidèles, Coach IA et export PDF compatible ATS sans inscription.",
      },
      { property: "og:title", content: "CVflow — Le catalogue de CV intelligent" },
      {
        property: "og:description",
        content: "Modèles A4 haute fidélité, Coach IA et export PDF instantané.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("emerald-tech");
  const [exploringTemplate, setExploringTemplate] = useState<TemplateId | null>(null);
  const [mode, setMode] = useState<InputMode>("form");

  const start = (templateToUse?: TemplateId) => {
    const t = templateToUse ?? selectedTemplate;
    const doc = defaultDoc();
    const cvData = sampleMap[t] || sampleMap["emerald-tech"];
    saveDoc({ ...doc, cv: cvData, template: t, mode });
    navigate({ to: "/editor" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* En-tête */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="h-4 w-4" />
          </span>
          CVflow
        </div>
        <button onClick={() => start()} className="btn-ghost text-sm">
          Ouvrir mon éditeur
        </button>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-8 pt-10 text-center sm:pt-16">
        <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> 4 modèles A4 haute fidélité · 100 % remplis
        </span>
        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          Des CV conçus au millimètre, prêts à être personnalisés.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
          Chaque modèle est visible en direct ci-dessous. Choisissez votre design préféré, examinez-le en plein écran ou commencez à rédiger immédiatement.
        </p>

        {/* Profils rapides */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Démarrer directement avec un profil type
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {samples.map((s) => (
              <button
                key={s.id}
                onClick={() => start(s.id as TemplateId)}
                className="btn-ghost border bg-card shadow-soft hover:border-primary/50 text-xs py-1.5 px-3"
              >
                {s.label} <ArrowRight className="h-3 w-3" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grille des 4 modèles avec miniature A4 visible immédiatement */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight">Catalogue de nos 4 modèles</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            L'aperçu miniature de chaque feuille A4 est chargé en direct.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {templateMeta.map((t) => {
            const isSelected = selectedTemplate === t.id;
            const previewCV = sampleMap[t.id];

            return (
              <div
                key={t.id}
                className={`group relative flex flex-col rounded-2xl border bg-card p-4 shadow-soft transition-all duration-200 ${
                  isSelected ? "ring-2 ring-primary border-transparent" : "hover:shadow-md"
                }`}
              >
                {/* En-tête de la carte */}
                <div className="flex items-start justify-between mb-3 min-h-[46px]">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {t.category}
                    </span>
                    <h3 className="text-base font-bold text-foreground leading-snug">{t.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{t.hint}</p>
                  </div>
                  {isSelected && (
                    <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary shrink-0">
                      <Check className="h-3 w-3" /> Actif
                    </span>
                  )}
                </div>

                {/* Cadre de la miniature A4 VISIBLE IMMÉDIATEMENT */}
                <div className="relative w-full overflow-hidden rounded-xl border bg-muted/30 p-3">
                  <div className="overflow-hidden rounded-sm shadow-md ring-1 ring-border">
                    <A4Thumbnail>
                      <CVTemplate cv={previewCV} template={t.id} />
                    </A4Thumbnail>
                  </div>

                  {/* Bouton rapide plein écran en haut à droite */}
                  <button
                    onClick={() => setExploringTemplate(t.id)}
                    className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-lg bg-background/90 px-2.5 py-1 text-xs font-semibold shadow hover:bg-background backdrop-blur-xs transition"
                  >
                    <ZoomIn className="h-3.5 w-3.5 text-primary" /> Zoom
                  </button>
                </div>

                {/* Actions sous la carte */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setExploringTemplate(t.id)}
                    className="flex flex-1 items-center justify-center gap-1 rounded-xl border bg-card px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <Maximize2 className="h-3.5 w-3.5" /> Explorer
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTemplate(t.id);
                      start(t.id);
                    }}
                    className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Utiliser <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mode de saisie */}
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-4">
        <h2 className="mb-5 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Choisissez votre façon d'écrire
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              [
                "form",
                PenLine,
                "Formulaire classique",
                "Saisie structurée : coordonnées, résumé, expériences, formations, compétences et langues.",
              ],
              [
                "coach",
                Wand2,
                "Coach IA",
                "Une interview guidée pas à pas : 3 questions concrètes par expérience (défi, action, résultat).",
              ],
            ] as const
          ).map(([m, Icon, title, desc]) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-2xl border bg-card p-6 text-left shadow-soft transition ${
                mode === m ? "ring-2 ring-primary" : ""
              }`}
            >
              <Icon className="h-6 w-6 text-primary" />
              <p className="mt-3 font-semibold">{title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </button>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button onClick={() => start()} className="btn-primary px-6 py-3 text-base">
            Commencer mon CV <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Avantages */}
      <section className="border-t bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
          {[
            [
              ShieldCheck,
              "Mode invité sans compte",
              "Vos données restent dans votre navigateur. Créez et exportez librement.",
            ],
            [
              FileCheck2,
              "PDF 100 % vectoriel & ATS",
              "Texte sélectionnable et polices professionnelles lues sans erreur par les recruteurs.",
            ],
            [
              Sparkles,
              "Coach IA orienté résultats",
              "Reformulation avec verbes d'action puissants et métriques concrètes.",
            ],
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

      {/* Modale d'exploration plein écran */}
      {exploringTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6">
          <div className="flex h-[92vh] w-full max-w-5xl flex-col rounded-2xl border bg-background shadow-2xl overflow-hidden">
            {/* Barre supérieure */}
            <div className="flex items-center justify-between border-b px-6 py-4 bg-card">
              <div>
                <h3 className="text-lg font-bold">
                  {templateMeta.find((x) => x.id === exploringTemplate)?.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Gabarit A4 officiel (794 × 1123 px) — Défilez pour inspecter chaque section
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const t = exploringTemplate;
                    setExploringTemplate(null);
                    setSelectedTemplate(t);
                    start(t);
                  }}
                  className="btn-primary px-4 py-2 text-xs font-semibold"
                >
                  Utiliser ce modèle <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setExploringTemplate(null)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Corps défilable */}
            <div className="flex-1 overflow-auto bg-muted/40 p-6 flex justify-center">
              <div
                className="bg-white shadow-xl origin-top"
                style={{
                  width: 794,
                  minHeight: 1123,
                }}
              >
                <CVTemplate
                  cv={sampleMap[exploringTemplate]}
                  template={exploringTemplate}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
