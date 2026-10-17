import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderLock,
  UserRound,
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

  const uniqueSamples = useMemo(() => {
    const seen = new Set<string>();
    return samples.filter((s) => (seen.has(s.label) ? false : (seen.add(s.label), true)));
  }, []);

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
      <header className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-4 sm:flex sm:justify-between sm:px-6 sm:py-5">
        <div className="flex min-w-0 items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="h-4 w-4" />
          </span>
          <span className="truncate">CVflow</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate({ to: "/editor" })}
            className="btn-ghost border bg-card px-3 py-2 text-sm"
            aria-label="Se connecter"
          >
            <UserRound className="h-4 w-4" />
            <span className="hidden sm:inline">Se connecter</span>
          </button>
          <button onClick={scrollToCatalogue} className="btn-primary hidden px-4 py-2 text-sm sm:inline-flex">
            Découvrir les modèles <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-6 pt-6 text-center sm:pb-8 sm:pt-16">
        <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-soft sm:text-xs">
          <Ruler className="h-3.5 w-3.5 shrink-0 text-primary" /> 15 modèles A4 · zéro débordement
        </span>
        <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:mt-6 sm:text-6xl">
          Des CV conçus au millimètre, prêts à être personnalisés.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted-foreground sm:mt-5 sm:text-lg">
          Chaque modèle respecte strictement la géométrie A4 et se remplit harmonieusement.
          Personnalisez-le en quelques minutes, puis retrouvez-le sauvegardé dans votre espace personnel.
        </p>
        <button onClick={scrollToCatalogue} className="btn-primary mt-6 px-5 py-2.5 text-sm sm:hidden">
          Découvrir les modèles <ArrowRight className="h-4 w-4" />
        </button>

        {/* Profils rapides — ruban défilable sur mobile */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Démarrer avec un profil type
          </p>
          <div className="no-scrollbar fade-x -mx-6 flex w-[calc(100%+3rem)] snap-x gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:w-full sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
            {uniqueSamples.map((s) => (
              <button
                key={s.id}
                onClick={() => start(s.id as TemplateId)}
                className="btn-ghost shrink-0 snap-start whitespace-nowrap border bg-card shadow-soft hover:border-primary/50 text-xs py-2 px-3"
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
        <div className="no-scrollbar -mx-6 mb-8 flex snap-x gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:mb-10 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
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
                aria-pressed={active}
                className={`shrink-0 snap-start whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition ${
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

        <div className="flex flex-wrap justify-center gap-5 sm:gap-8">
          {visibleTemplates.map((t) => (
            <div
              key={t.id}
              className="group relative flex w-full max-w-[380px] flex-col rounded-2xl border bg-card p-3 shadow-soft transition-all duration-200 hover:shadow-md sm:p-4 sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
            >
              {/* Miniature A4 cliquable : toute la vignette ouvre l'aperçu */}
              <button
                onClick={() => setExploringTemplate(t.id)}
                className="relative w-full overflow-hidden rounded-xl border bg-muted/30 p-2.5 text-left sm:p-3"
                aria-label={`Aperçu du modèle ${t.name}`}
              >
                <div className="overflow-hidden rounded-sm shadow-md ring-1 ring-border">
                  <A4Thumbnail>
                    <CVTemplate cv={sampleMap[t.id]} template={t.id} />
                  </A4Thumbnail>
                </div>
                <span className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-background/90 shadow backdrop-blur-xs transition group-hover:bg-background">
                  <ZoomIn className="h-4 w-4 text-primary" />
                </span>
              </button>

              {/* Pied de carte : nom + action unique */}
              <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {t.category}
                  </span>
                  <h3 className="truncate text-sm font-bold leading-snug text-foreground sm:text-base">{t.name}</h3>
                </div>
                <button
                  onClick={() => start(t.id)}
                  className="flex shrink-0 items-center gap-1 rounded-xl bg-primary px-3.5 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Personnaliser <ArrowRight className="h-3.5 w-3.5" />
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
