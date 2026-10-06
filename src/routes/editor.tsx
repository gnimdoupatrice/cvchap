import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Download,
  FileText,
  LayoutTemplate,
  Maximize2,
  PenLine,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { A4Preview } from "@/components/cv/A4Preview";
import { BeforeAfter } from "@/components/cv/BeforeAfter";
import { CoachEditor } from "@/components/cv/CoachEditor";
import { FormEditor, type AskAI } from "@/components/cv/FormEditor";
import { coachExperience, improveText } from "@/lib/ai.functions";
import { FREE_CREDITS, loadCredits, loadDoc, saveCredits, saveDoc } from "@/lib/cv/storage";
import type { CVDocument, TemplateId } from "@/lib/cv/types";
import { templateMeta } from "@/components/cv/templates";

export const Route = createFileRoute("/editor")({
  head: () => ({
    meta: [
      { title: "Éditeur de CV — Rédigez et exportez en PDF | CVflow" },
      {
        name: "description",
        content:
          "Rédigez votre CV avec un formulaire ou le Coach IA, prévisualisez la page A4 en direct et exportez un PDF lisible par les ATS.",
      },
      { property: "og:title", content: "Éditeur de CV — CVflow" },
      {
        property: "og:description",
        content: "Formulaire ou Coach IA, aperçu A4 en direct et export PDF compatible ATS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Editor,
});

type Pending = { before: string; after: string; apply: (t: string) => void };

function Editor() {
  const [doc, setDoc] = useState<CVDocument | null>(null);
  const [credits, setCredits] = useState(FREE_CREDITS);
  const [overflow, setOverflow] = useState(false);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [busy, setBusy] = useState(false);
  const [pending, setPending] = useState<Pending | null>(null);
  const [upsell, setUpsell] = useState(false);
  const fitting = useRef(false);
  const improve = useServerFn(improveText);
  const coach = useServerFn(coachExperience);

  useEffect(() => {
    setDoc(loadDoc());
    setCredits(loadCredits());
  }, []);

  useEffect(() => {
    if (doc) saveDoc(doc);
  }, [doc]);

  const update = (patch: Partial<CVDocument>) => setDoc((d) => (d ? { ...d, ...patch } : d));

  const onOverflow = useCallback((o: boolean) => {
    setOverflow(o);
    if (!fitting.current) return;
    setDoc((d) => {
      if (!d) return d;
      if (!o || d.scale <= 0.72) {
        fitting.current = false;
        if (o) toast.error("Le contenu reste trop long : raccourcissez quelques lignes.");
        else toast.success("Votre CV tient sur une page.");
        return d;
      }
      return { ...d, scale: Math.round((d.scale - 0.03) * 100) / 100 };
    });
  }, []);

  const fitToPage = () => {
    fitting.current = true;
    update({ scale: doc && doc.scale > 0.72 ? Math.round((doc.scale - 0.03) * 100) / 100 : 0.72 });
  };

  const spend = async (
    run: () => Promise<{ ok: true; text: string } | { ok: false; error: string; status: number }>,
    before: string,
    apply: (t: string) => void
  ) => {
    if (credits <= 0) return setUpsell(true);
    setBusy(true);
    try {
      const r = await run();
      if (!r.ok) return void toast.error(r.error);
      const left = credits - 1;
      setCredits(left);
      saveCredits(left);
      setPending({ before, after: r.text, apply });
    } catch {
      toast.error("Impossible de joindre le service IA.");
    } finally {
      setBusy(false);
    }
  };

  const askAI: AskAI = (kind, text, context, apply) =>
    spend(() => improve({ data: { kind, text, context } }), text, apply);

  const print = () => window.print();

  if (!doc) return <div className="grid min-h-screen place-items-center">Chargement…</div>;

  return (
    <div className="flex h-screen flex-col bg-background">
      <Toaster />
      {/* Barre supérieure */}
      <header className="flex h-14 items-center justify-between border-b px-4 no-print sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold tracking-tight text-foreground"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="h-3.5 w-3.5" />
            </span>
            <span className="hidden sm:inline">CVflow</span>
          </Link>
          <span className="text-muted-foreground/40">/</span>

          {/* Sélecteur parmi les 5 modèles */}
          <div className="flex items-center gap-1.5 rounded-lg border bg-card px-2 py-1 shadow-soft">
            <LayoutTemplate className="h-3.5 w-3.5 text-primary" />
            <select
              value={doc.template}
              onChange={(e) => update({ template: e.target.value as TemplateId })}
              className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
            >
              {templateMeta.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions à droite */}
        <div className="flex items-center gap-2">
          {overflow && (
            <button
              onClick={fitToPage}
              className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-700 hover:bg-amber-500/20"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Adapter à 1 page</span>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1 rounded-full border bg-card px-2.5 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>
              <b>{credits}</b> IA restantes
            </span>
          </div>

          <button onClick={print} className="btn-primary text-xs py-1.5 px-3">
            <Download className="h-3.5 w-3.5" />
            <span>Exporter en PDF</span>
          </button>
        </div>
      </header>

      {/* Onglets mobile */}
      <div className="flex border-b bg-card sm:hidden no-print">
        <button
          onClick={() => setTab("write")}
          className={`flex-1 py-2.5 text-center text-xs font-semibold ${
            tab === "write" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
          }`}
        >
          Écrire
        </button>
        <button
          onClick={() => setTab("preview")}
          className={`flex-1 py-2.5 text-center text-xs font-semibold ${
            tab === "preview" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
          }`}
        >
          Aperçu A4
        </button>
      </div>

      {/* Corps Split Screen */}
      <div className="flex flex-1 overflow-hidden">
        {/* Colonne gauche : Saisie */}
        <section
          className={`w-full overflow-y-auto border-r p-4 sm:w-1/2 lg:w-5/12 sm:p-6 no-print ${
            tab === "write" ? "block" : "hidden sm:block"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex rounded-lg border bg-muted/40 p-0.5">
              <button
                onClick={() => update({ mode: "form" })}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold ${
                  doc.mode === "form" ? "bg-card shadow-soft text-foreground" : "text-muted-foreground"
                }`}
              >
                <PenLine className="h-3 w-3" /> Formulaire
              </button>
              <button
                onClick={() => update({ mode: "coach" })}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold ${
                  doc.mode === "coach" ? "bg-card shadow-soft text-foreground" : "text-muted-foreground"
                }`}
              >
                <Wand2 className="h-3 w-3 text-primary" /> Coach IA
              </button>
            </div>
          </div>

          {doc.mode === "form" ? (
            <FormEditor cv={doc.cv} onChange={(cv) => update({ cv })} askAI={askAI} busy={busy} />
          ) : (
            <CoachEditor
              cv={doc.cv}
              onChange={(cv) => update({ cv })}
              onGenerateBullets={async (expId, answers) => {
                await spend(
                  () => coach({ data: answers }),
                  "",
                  (text) => {
                    const bullets = text
                      .split("\n")
                      .map((s) => s.replace(/^[•\-\*]\s*/, "").trim())
                      .filter(Boolean);
                    update({
                      cv: {
                        ...doc.cv,
                        experiences: doc.cv.experiences.map((e) =>
                          e.id === expId ? { ...e, bullets } : e
                        ),
                      },
                    });
                  }
                );
              }}
              busy={busy}
            />
          )}
        </section>

        {/* Colonne droite : Aperçu A4 en direct */}
        <section
          className={`flex-1 overflow-y-auto bg-muted/30 p-4 sm:p-6 flex justify-center ${
            tab === "preview" ? "block" : "hidden sm:flex"
          }`}
        >
          <A4Preview
            cv={doc.cv}
            template={doc.template}
            scale={doc.scale}
            onOverflowChange={onOverflow}
          />
        </section>
      </div>

      {/* Modale avant/après IA */}
      {pending && (
        <BeforeAfter
          before={pending.before}
          after={pending.after}
          onApply={() => {
            pending.apply(pending.after);
            setPending(null);
            toast.success("Optimisation appliquée.");
          }}
          onDiscard={() => setPending(null)}
        />
      )}

      {/* Modale Quota IA */}
      {upsell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-xl">
            <div className="flex justify-between items-start">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </span>
              <button
                onClick={() => setUpsell(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <h3 className="mt-4 text-lg font-bold">Vos 5 crédits IA offerts ont été utilisés</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Vous pouvez continuer à éditer manuellement votre CV et l'exporter en PDF sans aucune
              limite. La formule Premium illimitée arrive très prochainement.
            </p>
            <button
              onClick={() => setUpsell(false)}
              className="mt-6 w-full btn-primary py-2.5 text-sm"
            >
              Continuer en mode gratuit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}