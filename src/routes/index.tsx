import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderLock,
  Maximize2,
  Ruler,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";
import { CVTemplate, templateMeta } from "@/components/cv/templates";
import { A4Thumbnail } from "@/components/cv/A4Thumbnail";
import { sampleMap, samples } from "@/lib/cv/samples";
import { defaultDoc, saveDoc } from "@/lib/cv/storage";
import type { TemplateId } from "@/lib/cv/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CVflow — Créez un CV percutant avec l'IA" },
      {
        name: "description",
        content:
          "15 modèles A4 fidèles au millimètre, Coach IA, sauvegarde dans votre espace personnel et export PDF compatible ATS.",
      },
      { property: "og:title", content: "CVflow — Le catalogue de CV intelligent" },
      {
        property: "og:description",
        content:
          "Modèles A4 haute fidélité, Coach IA et export PDF instantané, sauvegardés dans votre espace personnel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [exploringTemplate, setExploringTemplate] = useState<TemplateId | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Tous");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(templateMeta.map((t) => t.category)));
    return ["Tous", ...cats];
  }, []);

  const visibleTemplates = useMemo(
    () =>
      activeCategory === "Tous"
        ? templateMeta
        : templateMeta.filter((t) => t.category === activeCategory),
    [activeCategory],
  );

  const start = (templateToUse: TemplateId) => {
    const doc = defaultDoc();
    const cvData = sampleMap[templateToUse] || sampleMap["emerald-tech"];
    saveDoc({ ...doc, cv: cvData, template: templateToUse });
    navigate({ to: "/editor" });
  };

  const scrollToCatalogue = () => {
    document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" });
  };

  const exploringIndex = exploringTemplate
    ? templateMeta.findIndex((t) => t.id === exploringTemplate)
    : -1;
  const goToTemplate = (delta: number) => {
    if (exploringIndex < 0) return;
    const next = (exploringIndex + delta + templateMeta.length) % templateMeta.length;
    const nextTemplate = templateMeta[next];
    if (nextTemplate) setExploringTemplate(nextTemplate.id);
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
        <div className="flex items-center gap-2">
          <button onClick={() => navigate({ to: "/editor" })} className="btn-ghost text-sm">
            Se connecter
          </button>
          <button onClick={scrollToCatalogue} className="btn-primary px-4 py-2 text-sm">
            Découvrir les modèles <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-8 pt-10 text-center sm:pt-16">
        <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
          <Ruler className="h-3.5 w-3.5 text-primary" /> 15 modèles A4 calés au millimètre · zéro débordement
        </span>
        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          Des CV conçus au millimètre, prêts à être personnalisés.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
          Chaque modèle respecte strictement la géométrie A4 et se remplit harmonieusement.
          Personnalisez-le en quelques minutes, puis retrouvez-le sauvegardé dans votre espace personnel.
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

      {/* Catalogue des 15 modèles avec filtres */}
      <section id="catalogue" className="mx-auto max-w-7xl scroll-mt-6 px-6 py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Catalogue de nos 15 modèles</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            L'aperçu miniature de chaque feuille A4 est chargé en direct.
          </p>
        </div>

        {/* Barre de filtres */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const count =
              cat === "Tous"
                ? templateMeta.length
                : templateMeta.filter((t) => t.category === cat).length;
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {visibleTemplates.map((t) => (
            <div
              key={t.id}
              className="group relative flex w-full max-w-[380px] flex-col rounded-2xl border bg-card p-4 shadow-soft transition-all duration-200 hover:shadow-md sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
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
              </div>

              {/* Miniature A4 cliquable */}
              <button
                onClick={() => setExploringTemplate(t.id)}
                className="relative w-full overflow-hidden rounded-xl border bg-muted/30 p-3 text-left"
                aria-label={`Aperçu du modèle ${t.name}`}
              >
                <div className="overflow-hidden rounded-sm shadow-md ring-1 ring-border">
                  <A4Thumbnail>
                    <CVTemplate cv={sampleMap[t.id]} template={t.id} />
                  </A4Thumbnail>
                </div>
                <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-lg bg-background/90 px-2.5 py-1 text-xs font-semibold shadow backdrop-blur-xs transition group-hover:bg-background">
                  <ZoomIn className="h-3.5 w-3.5 text-primary" /> Aperçu
                </span>
              </button>

              {/* Actions sous la carte */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setExploringTemplate(t.id)}
                  className="flex flex-1 items-center justify-center gap-1 rounded-xl border bg-card px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Maximize2 className="h-3.5 w-3.5" /> Explorer
                </button>
                <button
                  onClick={() => start(t.id)}
                  className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Personnaliser ce modèle <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Réassurance */}
      <section className="border-t bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
          {[
            [
              Ruler,
              "Rendu A4 strict au millimètre",
              "Géométrie 794 × 1123 px garantie : chaque modèle remplit la page sans débordement ni texte coupé.",
            ],
            [
              FolderLock,
              "Espace privé et sauvegarde",
              "Vos CV personnalisés sont sauvegardés dans votre espace personnel, retrouvez-les à tout moment.",
            ],
            [
              Sparkles,
              "Import intelligent & IA",
              "Importez votre texte ou vos documents : l'IA vous aide à remplir votre CV rapidement.",
            ],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof Ruler;
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
                  Gabarit A4 officiel (794 × 1123 px) — Modèle {exploringIndex + 1} sur {templateMeta.length}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const t = exploringTemplate;
                    setExploringTemplate(null);
                    start(t);
                  }}
                  className="btn-primary px-4 py-2 text-xs font-semibold"
                >
                  Utiliser ce modèle <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setExploringTemplate(null)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
                  aria-label="Fermer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Corps défilable avec navigation */}
            <div className="relative flex-1 overflow-auto bg-muted/40 p-6 flex justify-center">
              <button
                onClick={() => goToTemplate(-1)}
                className="sticky top-1/2 left-0 z-10 -translate-y-1/2 self-start rounded-full border bg-background/90 p-2.5 shadow backdrop-blur-xs hover:bg-background"
                aria-label="Modèle précédent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div
                className="bg-white shadow-xl origin-top"
                style={{ width: 794, minHeight: 1123 }}
              >
                <CVTemplate
                  cv={sampleMap[exploringTemplate]}
                  template={exploringTemplate}
                />
              </div>
              <button
                onClick={() => goToTemplate(1)}
                className="sticky top-1/2 right-0 z-10 -translate-y-1/2 self-start rounded-full border bg-background/90 p-2.5 shadow backdrop-blur-xs hover:bg-background"
                aria-label="Modèle suivant"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Barre inférieure de navigation */}
            <div className="flex items-center justify-between border-t bg-card px-6 py-3">
              <button
                onClick={() => goToTemplate(-1)}
                className="btn-ghost text-xs"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Précédent
              </button>
              <span className="text-xs text-muted-foreground">
                {templateMeta.find((x) => x.id === exploringTemplate)?.category}
              </span>
              <button
                onClick={() => goToTemplate(1)}
                className="btn-ghost text-xs"
              >
                Suivant <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
