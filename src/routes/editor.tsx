import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ChevronDown,
  Download,
  FileText,
  LayoutTemplate,
  Maximize2,
  Palette,
  PenLine,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { A4Preview } from "@/components/cv/A4Preview";
import { BeforeAfter } from "@/components/cv/BeforeAfter";
import { FormEditor, type AskAI } from "@/components/cv/FormEditor";
import { extractDraft, improveText } from "@/lib/ai.functions";
import { AssistantTools, MissingInfo } from "@/components/cv/AssistantTools";
import { StyleControls } from "@/components/cv/StyleControls";
import { ElementToolbar } from "@/components/cv/ElementToolbar";
import type { CVElement } from "@/components/cv/TemplateLayout";
import { applyAnswers, mergeExtractedCV, missingEssentials, type MissingField } from "@/lib/cv/extraction";
import { auditStyle, harmonizeStyle, type CVStyle } from "@/lib/cv/style";
import { FREE_CREDITS, hasStoredDoc, loadCredits, loadDoc, saveCredits, saveDoc } from "@/lib/cv/storage";
import type { CVDocument, TemplateId } from "@/lib/cv/types";
import { templateMeta } from "@/components/cv/templates";
import { LayoutControls } from "@/components/cv/LayoutControls";
import { normalizeLayout, type CVLayout } from "@/lib/cv/layout";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/cv/AuthDialog";
import { ContentGate } from "@/components/cv/ContentGate";
import { useSession } from "@/hooks/use-session";
import { supabase } from "@/lib/supabase";
import { LogOut, Target, UserRound } from "lucide-react";
import { CvSwitcher, type SyncState } from "@/components/cv/CvSwitcher";
import { JobMatch } from "@/components/cv/JobMatch";
import { createCv, deleteCv, fetchCv, getActiveId, listCvs, renameCv, saveCv, setActiveId as storeActiveId, type CloudCV } from "@/lib/cv/cloud";
import { defaultDoc } from "@/lib/cv/storage";

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
  const [optimizeRequest, setOptimizeRequest] = useState(0);
  const [optimizing, setOptimizing] = useState(false);
  const [elements, setElements] = useState<CVElement[]>([]);
  const [selected, setSelected] = useState("");
  const [styleOpen, setStyleOpen] = useState(false);
  const [missing, setMissing] = useState<MissingField[]>([]);
  const [exportIssues, setExportIssues] = useState<string[] | null>(null);
  const extract = useServerFn(extractDraft);
  const improve = useServerFn(improveText);

  const { user, ready: sessionReady } = useSession();
  const [authOpen, setAuthOpen] = useState(false);
  const [documentOwner, setDocumentOwner] = useState<string | null>(null);
  const owner = user?.id ?? null;
  const editable = sessionReady && Boolean(user) && documentOwner === owner;
  const [cvs, setCvs] = useState<CloudCV[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sync, setSync] = useState<SyncState>("offline");
  const [jobOpen, setJobOpen] = useState(false);
  const loadedRef = useRef<string | null>(null);

  // Online bootstrap: the account's online CVs win; the local draft seeds the first one.
  useEffect(() => {
    if (!sessionReady || !user) { setCvs([]); setActiveId(null); setSync("offline"); return; }
    const uid = user.id;
    let cancelled = false;
    (async () => {
      try {
        let list = await listCvs();
        if (!list.length) {
          const seed = hasStoredDoc(uid) ? loadDoc(uid) : loadDoc();
          list = [await createCv(uid, seed.cv.personal.name ? `CV ${seed.cv.personal.name}` : "Mon CV", seed)];
        }
        const preferred = getActiveId(uid);
        const target = list.find((c) => c.id === preferred) ?? list[0]!;
        const full = await fetchCv(target.id);
        if (cancelled || !full) return;
        loadedRef.current = JSON.stringify(full.doc);
        setCvs(list); setActiveId(full.id); storeActiveId(uid, full.id);
        setDoc(full.doc); saveDoc(full.doc, uid); setSync("saved");
      } catch { if (!cancelled) { setSync("error"); toast.error("Sauvegarde en ligne indisponible : votre brouillon reste sur cet appareil."); } }
    })();
    return () => { cancelled = true; };
  }, [sessionReady, user?.id]);

  // Debounced online autosave of the active CV.
  useEffect(() => {
    if (!doc || !activeId || !user || documentOwner !== user.id) return;
    const snapshot = JSON.stringify(doc);
    if (snapshot === loadedRef.current) return;
    setSync("saving");
    const t = setTimeout(async () => {
      try { await saveCv(activeId, doc); loadedRef.current = snapshot; setSync("saved"); }
      catch { setSync("error"); }
    }, 1200);
    return () => clearTimeout(t);
  }, [doc, activeId, user, documentOwner]);

  const flush = async () => {
    if (doc && activeId && JSON.stringify(doc) !== loadedRef.current) { await saveCv(activeId, doc); }
  };
  const openCv = async (id: string) => {
    if (!user) return;
    try {
      await flush();
      const full = await fetchCv(id);
      if (!full) return;
      loadedRef.current = JSON.stringify(full.doc);
      setActiveId(id); storeActiveId(user.id, id); setDoc(full.doc); setSync("saved"); setSelected("");
    } catch { toast.error("Impossible d’ouvrir ce CV."); }
  };
  const addCv = async (base: CVDocument, name: string) => {
    if (!user) return;
    try {
      await flush();
      const created = await createCv(user.id, name, base);
      setCvs((l) => [created, ...l]);
      loadedRef.current = JSON.stringify(base);
      setActiveId(created.id); storeActiveId(user.id, created.id); setDoc(base); setSync("saved");
      toast.success(`« ${created.name} » créé.`);
    } catch { toast.error("Impossible de créer le CV."); }
  };
  const activeName = cvs.find((c) => c.id === activeId)?.name ?? "Mon CV";
  const onRename = async (name: string) => {
    if (!activeId || !name.trim()) return;
    try { await renameCv(activeId, name); setCvs((l) => l.map((c) => c.id === activeId ? { ...c, name: name.trim().slice(0, 80) } : c)); }
    catch { toast.error("Impossible de renommer ce CV."); }
  };
  const onDelete = async () => {
    if (!activeId) return;
    try {
      await deleteCv(activeId);
      const rest = cvs.filter((c) => c.id !== activeId);
      setCvs(rest);
      loadedRef.current = null;
      if (rest[0]) await openCv(rest[0].id);
      toast.success("CV supprimé.");
    } catch { toast.error("Impossible de supprimer ce CV."); }
  };

  useEffect(() => {
    if (!sessionReady) return;
    const id = user?.id;
    // A new account starts from the public sample; an existing draft always wins.
    setDoc(id && hasStoredDoc(id) ? loadDoc(id) : loadDoc());
    setDocumentOwner(id ?? null);
    setCredits(loadCredits(id));
    setPending(null);
    setUpsell(false);
    if (id) setAuthOpen(false);
  }, [sessionReady, user?.id]);

  useEffect(() => {
    if (doc && sessionReady && documentOwner === owner) saveDoc(doc, owner ?? undefined);
  }, [doc, sessionReady, documentOwner, owner]);

  const update = (patch: Partial<CVDocument>) => setDoc((d) => (d ? { ...d, ...patch } : d));
  const updateCV = (cv: CVDocument["cv"]) => {
    if (!editable) { setAuthOpen(true); return; }
    update({ cv });
  };
  const signOut = async () => {
    if (doc && user) saveDoc(doc, user.id);
    try { await flush(); } catch { /* local copy kept */ }
    const { error } = await supabase.auth.signOut();
    if (error) { toast.error("La déconnexion a échoué. Réessayez."); return; }
    setDoc(loadDoc());
    setDocumentOwner(null);
    setPending(null);
    toast.success("Déconnecté. Votre brouillon reste séparé sur cet appareil.");
  };

  const onOverflow = useCallback((o: boolean) => {
    setOverflow(o);
  }, []);

  const fitToPage = () => {
    if (!editable) { setAuthOpen(true); return; }
    setOptimizing(true);
    setOptimizeRequest((n) => n + 1);
  };
  const onOptimized = useCallback((layout: CVLayout | null) => {
    setOptimizing(false);
    if (!layout) {
      toast.error("Le contenu est trop long pour une page lisible. Raccourcissez quelques lignes.");
      return;
    }
    setDoc((d) => d ? { ...d, layout } : d);
    toast.success("Police et espacements ajustés au format A4.");
  }, []);

  const spend = async (
    run: () => Promise<{ ok: true; text: string } | { ok: false; error: string; status: number }>,
    before: string,
    apply: (t: string) => void
  ) => {
    if (!editable || !user) { setAuthOpen(true); return; }
    if (busy) return;
    const requestOwner = user.id;
    if (credits <= 0) return setUpsell(true);
    setBusy(true);
    try {
      const r = await run();
      const { data } = await supabase.auth.getUser();
      if (data.user?.id !== requestOwner) return;
      if (!r.ok) return void toast.error(r.error);
      const left = credits - 1;
      setCredits(left);
      saveCredits(left, requestOwner);
      setPending({ before, after: r.text, apply });
    } catch {
      toast.error("Impossible de joindre le service IA.");
    } finally {
      setBusy(false);
    }
  };

  const askAI: AskAI = (kind, text, context, apply) =>
    spend(() => improve({ data: { kind, text, context } }), text, apply);

  const setStyle = (style: CVStyle) => {
    if (!editable) { setAuthOpen(true); return; }
    setDoc((d) => d ? { ...d, layout: { ...normalizeLayout(d.layout), style } } : d);
  };
  const selectElement = (key: string) => {
    if (!editable) { setAuthOpen(true); return; }
    setSelected(key);
    requestAnimationFrame(() => document.getElementById("style-controls")?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  };
  const onExtract = async (text: string) => {
    if (!editable || !user || !doc) { setAuthOpen(true); return; }
    setBusy(true);
    try {
      const r = await extract({ data: { text } });
      if (!r.ok) { toast.error(r.error); return; }
      const next = mergeExtractedCV(doc.cv, r.cv);
      updateCV(next);
      const gaps = missingEssentials(next);
      setMissing(gaps);
      if (!gaps.length) toast.success("Votre CV a été rempli automatiquement.");
    } catch { toast.error("Impossible de joindre le service IA."); }
    finally { setBusy(false); }
  };

  const print = () => {
    if (!editable || !doc) { setAuthOpen(true); return; }
    const issues = [...(overflow ? ["Le contenu dépasse la page A4 unique."] : []), ...auditStyle(normalizeLayout(doc.layout).style)];
    if (issues.length) { setExportIssues(issues); return; }
    window.print();
  };
  const harmonize = () => {
    if (!doc) return;
    setStyle(harmonizeStyle(normalizeLayout(doc.layout).style));
    setExportIssues(null);
    if (overflow) fitToPage();
    toast.success("Styles harmonisés. Vérifiez l’aperçu puis exportez.");
  };

  if (!doc || !sessionReady || documentOwner !== owner) return <div className="grid min-h-screen place-items-center">Chargement…</div>;

  const visualControls = (
    <>
      <StyleControls value={normalizeLayout(doc.layout).style ?? {}} onChange={setStyle} elements={elements} selected={selected} onSelect={selectElement} />
      <LayoutControls value={normalizeLayout(doc.layout)} onChange={(layout) => { if (!editable) { setAuthOpen(true); return; } update({ layout }); }} onOptimize={fitToPage} optimizing={optimizing} overflow={overflow} />
    </>
  );

  return (
    <div className="flex h-dvh flex-col overflow-hidden overscroll-none bg-background">
      <Toaster />
      {/* Barre supérieure */}
      <header className="flex h-14 items-center justify-between border-b px-4 no-print sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
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
          <div className="flex min-w-0 items-center gap-1.5 rounded-lg border bg-card px-2 py-1 shadow-soft">
            <LayoutTemplate className="h-3.5 w-3.5 text-primary" />
            <select
              value={doc.template}
              onChange={(e) => update({ template: e.target.value as TemplateId })}
              aria-label="Modèle de CV"
              className="min-w-0 w-full max-w-40 bg-transparent text-xs font-semibold focus:outline-none cursor-pointer sm:max-w-64"
            >
              {templateMeta.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          {user && activeId && (
            <CvSwitcher cvs={cvs} activeId={activeId} sync={sync} onSwitch={openCv}
              onCreate={() => addCv({ ...defaultDoc(), template: doc.template }, `CV ${cvs.length + 1}`)}
              onDuplicate={() => addCv(structuredClone(doc), `${activeName} (copie)`)}
              onRename={onRename} onDelete={onDelete} />
          )}
        </div>

        {/* Actions à droite */}
        <div className="flex items-center gap-2">
          {overflow && (
            <Button
              onClick={fitToPage}
              disabled={optimizing}
              variant="outline" size="sm"
              className="text-destructive"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Adapter à 1 page</span>
            </Button>
          )}

          <div className="hidden sm:flex items-center gap-1 rounded-full border bg-card px-2.5 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>
              <b>{credits}</b> essais IA sur cet appareil
            </span>
          </div>

          {user ? (
            <div className="flex items-center gap-1 rounded-full border bg-card py-0.5 pl-2.5 pr-0.5 text-xs">
              <UserRound className="h-3 w-3 text-primary" />
              <span className="hidden max-w-40 truncate md:inline" title={user.email ?? ""}>{user.email}</span>
              <Button variant="ghost" size="sm" className="h-7 px-2" onClick={signOut} aria-label="Se déconnecter" title="Se déconnecter">
                <LogOut className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setAuthOpen(true)} aria-label="Se connecter">
              <UserRound className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Se connecter</span>
            </Button>
          )}

          <Button variant="outline" size="sm" onClick={() => editable ? setJobOpen(true) : setAuthOpen(true)} aria-label="Comparer avec une offre" title="Comparer avec une offre d’emploi">
            <Target className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Comparer à une offre</span>
          </Button>
          <Button onClick={print} size="sm" aria-label="Exporter en PDF" title="Exporter en PDF">
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Exporter en PDF</span>
          </Button>
        </div>
      </header>

      {/* Corps Split Screen */}
      <div className="relative flex min-h-0 flex-1 overflow-hidden overscroll-none">
        {/* Colonne gauche : Saisie (largeur fixe sur ordinateur, l'aperçu prend le reste) */}
        <section
          className={`min-h-0 w-full overflow-y-auto overscroll-contain border-r p-4 pb-[5.5rem] sm:p-6 sm:pb-[5.5rem] lg:w-[440px] lg:shrink-0 lg:pb-6 xl:w-[480px] no-print ${
            tab === "write" ? "block" : "hidden lg:block"
          }`}
        >
          <p className="mb-3 text-xs text-muted-foreground">
            {editable ? (sync === "saved" || sync === "saving" ? "Votre CV est enregistré en ligne automatiquement et retrouvable sur tous vos appareils." : "Sauvegarde en ligne indisponible pour le moment : brouillon conservé sur cet appareil.") : "Connectez-vous ou créez votre compte pour remplir votre CV, utiliser l’IA et exporter."}
          </p>
          <ContentGate key={owner ?? "discovery"} locked={!editable} onRequestAuth={() => setAuthOpen(true)}>
          {/* Assistant IA replié par défaut : les champs du CV restent visibles dès l'arrivée */}
          <details className="group mb-4 rounded-xl border bg-primary/5">
            <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2.5 text-sm font-semibold text-primary [&::-webkit-details-marker]:hidden">
              <Sparkles className="h-4 w-4 shrink-0" />
              <span className="min-w-0 flex-1">Importer un CV ou dicter mon parcours</span>
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <div className="border-t px-3 pb-3 pt-3">
              <AssistantTools askAI={askAI} busy={busy} onExtract={onExtract} />
            </div>
          </details>
          <FormEditor cv={doc.cv} onChange={updateCV} askAI={askAI} busy={busy} />

          {/* Réglages visuels : à côté de l'aperçu sur ordinateur uniquement ; sur mobile/tablette ils vivent dans l'onglet Aperçu A4 */}
          <div id="style-controls" className="mt-6 hidden space-y-4 rounded-lg border p-3 lg:block">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Personnaliser l’apparence</h2>
            {visualControls}
          </div>
          </ContentGate>
        </section>

        {/* Colonne droite : Aperçu A4 en direct */}
        <section
          className={`min-h-0 min-w-0 flex-1 items-start justify-center overflow-y-auto overscroll-contain bg-muted/30 px-1 pb-24 pt-1 [scrollbar-gutter:stable] sm:px-4 sm:pt-3 lg:px-6 lg:pb-6 ${
            tab === "preview" ? "flex" : "hidden lg:flex"
          }`}
        >
          <A4Preview doc={doc} onOverflowChange={onOverflow} optimizeRequest={optimizeRequest} onOptimized={onOptimized}
            onElements={setElements} onSelectElement={selectElement} selectedElement={selected}
            toolbar={editable && selected ? <ElementToolbar style={normalizeLayout(doc.layout).style ?? {}} selected={selected} onChange={setStyle} onSelect={selectElement} onClose={() => setSelected("")} /> : null} />
        </section>
      </div>

      {/* Bouton des réglages visuels (mobile/tablette, onglet Aperçu A4) */}
      {tab === "preview" && !selected && (
        <button
          type="button"
          onClick={() => { if (!editable) { setAuthOpen(true); return; } setStyleOpen(true); }}
          className="fixed right-3 top-[4.25rem] z-30 flex items-center gap-1.5 rounded-full border bg-card px-3 py-2 text-xs font-semibold text-primary shadow-soft lg:hidden no-print"
          aria-label="Personnaliser l’apparence du CV"
        >
          <Palette className="h-3.5 w-3.5" /> Style
        </button>
      )}

      <Sheet open={styleOpen} onOpenChange={setStyleOpen}>
        <SheetContent side="bottom" className="max-h-[80dvh] overflow-y-auto rounded-t-2xl p-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
          <SheetHeader className="mb-3 text-left">
            <SheetTitle className="text-base">Personnaliser l’apparence</SheetTitle>
            <SheetDescription className="text-xs">Police, couleurs et mise en page A4. Touchez un texte sur l’aperçu pour le modifier seul.</SheetDescription>
          </SheetHeader>
          <div className="space-y-4">{visualControls}</div>
        </SheetContent>
      </Sheet>

      {/* Barre d'action basse (mobile) */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2.5 shadow-soft backdrop-blur lg:hidden no-print">
        <div className="mb-2 flex items-center justify-center gap-1.5 text-[11px] font-medium">
          {overflow ? (
            <button onClick={fitToPage} disabled={optimizing} className="flex items-center gap-1 text-destructive">
              <AlertTriangle className="h-3 w-3" /> Contenu hors page · Ajuster automatiquement
            </button>
          ) : (
            <span className="text-muted-foreground">{editable ? `${sync === "saved" ? "Enregistré en ligne" : sync === "saving" ? "Enregistrement…" : "Brouillon local"} · ${credits} essais IA` : "Exploration des modèles"}</span>
          )}
        </div>
        <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
          <button
            onClick={() => setTab("write")}
            aria-pressed={tab === "write"}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold ${tab === "write" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
          >
            <PenLine className="h-3.5 w-3.5" /> Écrire
          </button>
          <button
            onClick={() => setTab("preview")}
            aria-pressed={tab === "preview"}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold ${tab === "preview" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
          >
            <Maximize2 className="h-3.5 w-3.5" /> Aperçu A4
          </button>
          <Button onClick={print} className="h-auto rounded-xl px-4 text-xs">
            <Download className="h-3.5 w-3.5" /> PDF
          </Button>
        </div>
      </nav>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
      {editable && <JobMatch open={jobOpen} onOpenChange={setJobOpen} cv={doc.cv} />}

      {missing.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4">
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border bg-card p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-bold">Encore quelques détails</h3>
            <MissingInfo fields={missing} onSkip={() => setMissing([])} onApply={(answers) => { updateCV(applyAnswers(doc.cv, answers)); setMissing([]); toast.success("Votre CV est complété."); }} />
          </div>
        </div>
      )}

      {exportIssues && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4">
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border bg-card p-6 shadow-xl">
            <h3 className="mb-2 text-lg font-bold">Vérification avant export</h3>
            <p className="mb-3 text-sm text-muted-foreground">Quelques points peuvent nuire à la lisibilité de votre CV :</p>
            <ul className="mb-4 list-disc space-y-1 pl-5 text-sm">{exportIssues.map((x) => <li key={x}>{x}</li>)}</ul>
            <div className="flex flex-wrap justify-end gap-2 border-t pt-3">
              <Button variant="outline" onClick={() => { setExportIssues(null); window.print(); }}>Exporter quand même</Button>
              <Button onClick={harmonize}><Sparkles className="h-3.5 w-3.5" />Harmoniser{overflow ? " et adapter à 1 page" : ""}</Button>
            </div>
          </div>
        </div>
      )}

      {/* Modale avant/après IA */}
      {pending && (
        <BeforeAfter
          before={pending.before}
          after={pending.after}
          onAccept={() => {
            if (!editable) { setPending(null); setAuthOpen(true); return; }
            pending.apply(pending.after);
            setPending(null);
            toast.success("Optimisation appliquée.");
          }}
          onReject={() => setPending(null)}
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
            <h3 className="mt-4 text-lg font-bold">Vos essais IA sur cet appareil sont épuisés</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Vous pouvez continuer à rédiger votre CV et l'exporter avec votre compte.
              Ce compteur est local : il n’est pas encore synchronisé entre vos appareils.
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