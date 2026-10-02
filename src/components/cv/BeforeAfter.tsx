import { Check, X } from "lucide-react";
import type { ReactNode } from "react";

/** Bold the leading action verb and any figures in an AI suggestion. */
function highlight(line: string): ReactNode {
  const [first, ...rest] = line.split(" ");
  const tail = rest.join(" ");
  const parts = tail.split(/(\d[\d\s.,]*\s?(?:%|k€|M€|€|x|ans|mois|semaines)?)/g);
  return (
    <>
      <strong className="text-primary">{first}</strong>{" "}
      {parts.map((p, i) => (/\d/.test(p) ? <mark key={i} className="rounded bg-highlight px-0.5 text-foreground">{p}</mark> : p))}
    </>
  );
}

export function BeforeAfter({
  before,
  after,
  onAccept,
  onReject,
}: {
  before: string;
  after: string;
  onAccept: () => void;
  onReject: () => void;
}) {
  const lines = (t: string) => t.split("\n").map((l) => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/30 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-t-2xl border bg-card p-6 shadow-soft sm:rounded-2xl">
        <h3 className="text-lg font-semibold">Suggestion de l'IA</h3>
        <p className="mt-1 text-sm text-muted-foreground">Comparez puis validez. Les verbes d'action et résultats sont mis en valeur.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-muted/50 p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Avant</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {lines(before).length ? lines(before).map((l, i) => <li key={i}>{l}</li>) : <li className="italic">Vide</li>}
            </ul>
          </div>
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">Après</p>
            <ul className="space-y-2 text-sm">
              {lines(after).map((l, i) => (
                <li key={i}>{highlight(l)}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onReject} className="btn-ghost"><X className="h-4 w-4" /> Garder l'original</button>
          <button onClick={onAccept} className="btn-primary"><Check className="h-4 w-4" /> Appliquer</button>
        </div>
      </div>
    </div>
  );
}
