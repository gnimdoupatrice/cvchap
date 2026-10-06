import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, Download, FileText, LayoutTemplate, Maximize2, PenLine, Sparkles, Wand2, X } from "lucide-react";
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
      { name: "description", content: "Rédigez votre CV avec un formulaire ou le Coach IA, prévisualisez la page A4 en direct et exportez un PDF lisible par les ATS." },
      { property: "og:title", content: "Éditeur de CV — CVflow" },
      { property: "og:description", content: "Formulaire ou Coach IA, aperçu A4 en direct et export PDF compatible ATS." },
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

  const spend = async (run: () => Promise<{ ok: true; text: string } | { ok: false; error: string; status: number }>, before: string, apply: (t: string) => void) => {
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

  const askAI: AskAI = (kind, text, context, apply) => spend(() => improve({ data: { kind, text, context } }), text, apply);

  if (!doc) return <div className="min-h-screen bg-background" />;

  const preview = <A4Preview doc={doc} onOverflowChange={onOverflow} />;

  return (
    <div className="flex h-dvh flex-col bg-background">
      <Toaster position="top-center" />
      <header className="no-print flex h-14 shrink-0 items-center gap-3 border-b bg-card/80 px-4 backdrop-blur">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground"><FileText className="h-4 w-4" /></span>
          <span className="hidden sm:inline">CVflow</span>
        </Link>

        {/* Sélecteur de modèle */}
        <div className="flex items-center gap-2 ml-2">
          <LayoutTemplate className="h-4 w-4 text-muted-foreground hidden sm:inline" />
          <select
            value={doc.template}
            onChange={(e) => update({ template: e.target.value as TemplateId })}
            className="rounded-lg border bg-background px-2.5 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {templateMeta.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full border bg-card px-3 py-1 text-xs font-medium" title="Crédits d'optimisation IA offerts">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> {credits}/{FREE_CREDITS}
          </span>
          <button onClick={() => window.print()} className="btn-primary hidden md:inline-flex"><Download className="h-4 w-4" /> Exporter en PDF</button>
        </div>
      </header>

      <div className="no-print flex border-b bg-card md:hidden">
        {(["write", "preview"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3 text-sm font-medium ${tab === t ? "border-b-2 border-primary text-foreground" : "text-muted-foreground"}`}>
            {t === "write" ? "Écrire" : "Aperçu A4"}
          </button>
        ))}
      </div>

      <div className="flex min-h-0 flex-1">
        <div className={`no-print min-h-0 w-full overflow-y-auto md:block md:w-[46%] md:max-w-[640px] md:border-r ${tab === "write" ? "block" : "hidden"}`}>
          <div className="space-y-4 p-4 pb-28 md:p-6">
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-muted p-1">
              {([["form", "Formulaire", PenLine], ["coach", "Coach IA", Wand2]] as const).map(([m, label, Icon]) => (
                <button key={m} onClick={() => update({ mode: m })} className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition ${doc.mode === m ? "bg-card shadow-soft" : "text-muted-foreground"}`}>
                  <Icon className="h-4 w-4" /> {label}
                </button>
              ))}
            </div>
            {doc.mode === "form" ? (
              <FormEditor cv={doc.cv} onChange={(cv) => update({ cv })} askAI={askAI} busy={busy} />
            ) : (
              <CoachEditor cv={doc.cv} onChange={(cv) => update({ cv })} busy={busy} askCoach={(input, before, apply) => spend(() => coach({ data: input }), before, apply)} />
            )}
          </div>
        </div>

        <div className={`min-h-0 flex-1 overflow-y-auto bg-muted/40 md:block ${tab === "preview" ? "block" : "hidden"}`}>
          {overflow && (
            <div className="no-print sticky top-0 z-10 mx-4 mt-4 flex items-center gap-3 rounded-xl border border-destructive/30 bg-card p-3 shadow-soft">
              <AlertTriangle className="h-5 w-5 shrink-0 text-destructive" />
              <p className="flex-1 text-sm">Votre CV dépasse une page A4.</p>
              <button onClick={fitToPage} className="btn-primary text-xs"><Maximize2 className="h-3.5 w-3.5" /> Adapter à 1 page</button>
            </div>
          )}
          {!overflow && doc.scale < 1 && (
            <div className="no-print flex justify-end px-4 pt-3">
              <button className="btn-ghost text-xs" onClick={() => update({ scale: 1 })}>Rétablir l'espacement d'origine</button>
            </div>
          )}
          <div className="px-2 pb-28 md:pb-6">{preview}</div>
        </div>
      </div>

      <div className="no-print fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t bg-card/95 p-3 backdrop-blur md:hidden">
        {overflow && <button onClick={fitToPage} className="btn-ghost flex-1 border">Adapter à 1 page</button>}
        <button onClick={() => window.print()} className="btn-primary flex-1"><Download className="h-4 w-4" /> Exporter PDF</button>
      </div>

      {pending && (
        <BeforeAfter
          before={pending.before}
          after={pending.after}
          onReject={() => setPending(null)}
          onAccept={() => {
            pending.apply(pending.after);
            setPending(null);
            toast.success("Suggestion appliquée");
          }}
        />
      )}

      {upsell && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-6 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border bg-card p-6 text-center shadow-soft">
            <button className="absolute right-3 top-3 text-muted-foreground" onClick={() => setUpsell(false)} aria-label="Fermer"><X className="h-4 w-4" /></button>
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10"><Sparkles className="h-6 w-6 text-primary" /></div>
            <h3 className="mt-4 text-lg font-semibold">Vos 5 optimisations offertes sont utilisées</h3>
            <p className="mt-2 text-sm text-muted-foreground">Votre CV reste modifiable et exportable gratuitement. Pour continuer avec l'IA, créez un compte ou passez à la formule Premium — bientôt disponibles.</p>
            <button className="btn-primary mt-5 w-full justify-center" onClick={() => setUpsell(false)}>Continuer sans IA</button>
          </div>
        </div>
      )}
    </div>
  );
}
