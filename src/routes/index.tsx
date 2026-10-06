import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Eye,
  FileCheck2,
  FileText,
  PenLine,
  ShieldCheck,
  Sparkles,
  Wand2,
  X,
  ZoomIn,
} from "lucide-react";
import { CVTemplate, templateMeta } from "@/components/cv/templates";
import { sampleEmeraldTech, sampleFrenchBlue, samples } from "@/lib/cv/samples";
import { defaultDoc, saveDoc } from "@/lib/cv/storage";
import type { InputMode, TemplateId } from "@/lib/cv/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CVflow — Créez un CV percutant avec l'IA, sans compte" },
      {
        name: "description",
        content:
          "Explorez nos modèles A4 fidèles, rédigez avec le Coach IA et exportez un PDF propre, lisible par les robots de recrutement ATS.",
      },
      { property: "og:title", content: "CVflow — Le CV intelligent et élégant" },
      {
        property: "og:description",
        content: "Modèles A4 haute fidélité, Coach IA et export PDF compatible ATS sans inscription.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("french-blue");
  const [exploringTemplate, setExploringTemplate] = useState<TemplateId | null>(null);
  const [mode, setMode] = useState<InputMode>("form");

  const getSampleForTemplate = (t: TemplateId) =>
    t === "emerald-tech" ? sampleEmeraldTech : sampleFrenchBlue;

  const start = (templateToUse?: TemplateId) => {
    const t = templateToUse ?? selectedTemplate;
    const doc = defaultDoc();
    const cvData = getSampleForTemplate(t);
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
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Modèles A4 prêts à l'emploi · 100 % remplis
        </span>
        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          Des CV conçus au millimètre, prêts à être personnalisés.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
          Explorez chaque modèle dans ses moindres détails. Cliquez pour l'examiner en grand format, puis adaptez-le à votre parcours.
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
                onClick={() => {
                  const t: TemplateId = s.id === "emerald-tech" ? "emerald-tech" : "french-blue";
                  start(t);
                }}
                className="btn-ghost border bg-card shadow-soft hover:border-primary/50"
              >
                {s.label} <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grille des 2 modèles avec exploration */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Choisissez votre modèle</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Cliquez sur <b>« Explorer le modèle »</b> pour inspecter le document A4 en pleine taille.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {templateMeta.map((t) => {
            const isSelected = selectedTemplate === t.id;
            const previewCV = getSampleForTemplate(t.id);

            return (
              <div
                key={t.id}
                className={`group relative flex flex-col rounded-2xl border bg-card p-5 shadow-soft transition-all duration-200 ${
                  isSelected ? "ring-2 ring-primary border-transparent" : "hover:shadow-md"
                }`}
              >
                {/* En-tête de la carte */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{t.name}</h3>
                    <p className="text-xs text-muted-foreground">{t.hint}</p>
                  </div>
                  {isSelected && (
                    <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                      <Check className="h-3.5 w-3.5" /> Actif
                    </span>
                  )}
                </div>

                {/* Aperçu A4 réduit avec superposition d'exploration */}
                <div className="relative h-[420px] w-full overflow-hidden rounded-xl border bg-muted/30">
                  <div
                    className="pointer-events-none absolute left-1/2 top-3 origin-top"
                    style={{
                      width: 794,
                      transform: "translateX(-50%) scale(0.36)",
                      minHeight: 1123,
                    }}
                  >
                    <CVTemplate cv={previewCV} template={t.id} />
                  </div>

                  {/* Voile interactif au survol pour ouvrir l'explorateur */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-foreground/10 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
                    <button
                      onClick={() => setExploringTemplate(t.id)}
                      className="flex items-center gap-2 rounded-xl bg-background px-4 py-2.5 text-sm font-semibold shadow-lg hover:bg-muted"
                    >
                      <Eye className="h-4 w-4 text-primary" /> Explorer le modèle en grand
                    </button>
                  </div>
                </div>

                {/* Actions sous la carte */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setExploringTemplate(t.id)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border bg-card px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <ZoomIn className="h-3.5 w-3.5" /> Aperçu détaillé
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTemplate(t.id);
                      start(t.id);
                    }}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Utiliser ce modèle <ArrowRight className="h-3.5 w-3.5" />
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
          {([
            [
              "form",
              PenLine,
              "Formulaire classique",
              "Saisie directe et structurée : coordonnées, résumé, expériences, formations, compétences.",
            ],
            [
              "coach",
              Wand2,
              "Coach IA",
              "Interview interactive : 3 questions ciblées par expérience pour faire ressortir vos réussites chiffrées.",
            ],
          ] as const).map(([m, Icon, title, desc]) => (
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
            Commencer à éditer <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Réassurance */}
      <section className="border-t bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
          {[
            [
              ShieldCheck,
              "Mode invité permanent",
              "Vos données restent stockées sur votre appareil. Aucun compte obligatoire pour créer et exporter.",
            ],
            [
              FileCheck2,
              "Format A4 & ATS garanti",
              "Mise en page vectorielle nette et lisible par les algorithmes de recrutement et les recruteurs.",
            ],
            [
              Sparkles,
              "Coach IA intégré",
              "Optimisation des formulations avec verbes d'action percutants et comparatif avant / après.",
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

      {/* MODALE D'EXPLORATION GRAND FORMAT */}
      {exploringTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm">
          <div className="relative flex h-[92vh] w-full max-w-5xl flex-col rounded-2xl border bg-card shadow-2xl">
            {/* Barre supérieure de la modale */}
            <div className="flex shrink-0 items-center justify-between border-b px-6 py-4">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    {templateMeta.find((t) => t.id === exploringTemplate)?.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Format A4 rigoureux (210 × 297 mm) · Contenu d'exemple intégral
                  </p>
                </div>

                {/* Bascule rapide entre les deux modèles dans la modale */}
                <div className="hidden sm:flex rounded-lg border bg-muted p-1">
                  {templateMeta.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setExploringTemplate(t.id)}
                      className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
                        exploringTemplate === t.id
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const chosen = exploringTemplate;
                    setExploringTemplate(null);
                    setSelectedTemplate(chosen);
                    start(chosen);
                  }}
                  className="btn-primary text-xs"
                >
                  Utiliser ce modèle <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setExploringTemplate(null)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Fermer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Corps défilable avec aperçu A4 haute fidélité */}
            <div className="flex-1 overflow-auto bg-muted/40 p-6 flex justify-center items-start">
              <div
                className="rounded-lg bg-card shadow-2xl overflow-hidden border"
                style={{
                  width: 794,
                  minHeight: 1123,
                  boxShadow: "0 20px 40px -15px rgba(0,0,0,0.25)",
                }}
              >
                <CVTemplate
                  cv={getSampleForTemplate(exploringTemplate)}
                  template={exploringTemplate}
                />
              </div>
            </div>

            {/* Pied de la modale */}
            <div className="flex shrink-0 items-center justify-between border-t bg-card/80 px-6 py-3 text-xs text-muted-foreground">
              <span>Faites défiler pour voir l'ensemble du CV jusqu'en bas de page.</span>
              <button
                onClick={() => {
                  const chosen = exploringTemplate;
                  setExploringTemplate(null);
                  setSelectedTemplate(chosen);
                  start(chosen);
                }}
                className="font-semibold text-primary hover:underline"
              >
                Personnaliser ce modèle maintenant →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}