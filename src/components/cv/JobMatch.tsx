import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Target } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { compareJobOffer } from "@/lib/ai.functions";
import { cvToPlainText } from "@/lib/cv/plain-text";
import type { CV } from "@/lib/cv/types";

type Match = { score: number; summary: string; matched: string[]; missing: string[]; suggestions: string[] };

export function JobMatch({ open, onOpenChange, cv }: { open: boolean; onOpenChange: (o: boolean) => void; cv: CV }) {
  const compare = useServerFn(compareJobOffer);
  const [offer, setOffer] = useState("");
  const [busy, setBusy] = useState(false);
  const [match, setMatch] = useState<Match | null>(null);

  const run = async () => {
    if (offer.trim().length < 30) { toast.error("Collez l’offre complète (au moins quelques lignes)."); return; }
    setBusy(true);
    try {
      const r = await compare({ data: { cv: cvToPlainText(cv), offer: offer.trim().slice(0, 15000) } });
      if (!r.ok) { toast.error(r.error); return; }
      setMatch(r.match);
    } catch { toast.error("Impossible de joindre le service IA."); }
    finally { setBusy(false); }
  };

  const tone = !match ? "" : match.score >= 70 ? "text-primary" : match.score >= 45 ? "text-foreground" : "text-destructive";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Target className="h-4 w-4 text-primary" />Comparer avec une offre d’emploi</DialogTitle>
          <DialogDescription>Collez l’annonce : l’IA mesure la correspondance avec votre CV et liste les mots-clés manquants.</DialogDescription>
        </DialogHeader>
        <textarea value={offer} onChange={(e) => setOffer(e.target.value)} rows={7} maxLength={15000}
          placeholder="Collez ici le texte de l’offre d’emploi…" aria-label="Texte de l’offre d’emploi"
          className="w-full rounded-lg border bg-card p-3 text-sm" />
        <Button onClick={run} disabled={busy}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Target className="h-4 w-4" />}Analyser la correspondance</Button>
        {match && (
          <div className="space-y-4 border-t pt-4 text-sm">
            <div className="flex items-center gap-4">
              <div className={`text-4xl font-bold ${tone}`}>{match.score}<span className="text-base text-muted-foreground">/100</span></div>
              <p className="text-muted-foreground">{match.summary}</p>
            </div>
            {match.missing.length > 0 && (
              <div><h4 className="mb-1.5 font-semibold">Mots-clés absents de votre CV</h4>
                <div className="flex flex-wrap gap-1.5">{match.missing.map((k) => <span key={k} className="rounded-full border border-destructive/40 px-2 py-0.5 text-xs">{k}</span>)}</div></div>
            )}
            {match.matched.length > 0 && (
              <div><h4 className="mb-1.5 font-semibold">Déjà présents</h4>
                <div className="flex flex-wrap gap-1.5">{match.matched.map((k) => <span key={k} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{k}</span>)}</div></div>
            )}
            {match.suggestions.length > 0 && (
              <div><h4 className="mb-1.5 font-semibold">Suggestions</h4>
                <ul className="list-disc space-y-1 pl-5">{match.suggestions.map((s) => <li key={s}>{s}</li>)}</ul></div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
