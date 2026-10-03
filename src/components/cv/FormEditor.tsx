import { ImagePlus, Plus, Sparkles, Trash2 } from "lucide-react";
import { uid, type CV } from "@/lib/cv/types";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export type AskAI = (kind: "summary" | "bullets", text: string, context: string, apply: (t: string) => void) => void;

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

export function Section({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="rounded-2xl border bg-card p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold">{title}</h2>
        {action}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function FormEditor({ cv, onChange, askAI, busy }: { cv: CV; onChange: (cv: CV) => void; askAI: AskAI; busy: boolean }) {
  const set = <K extends keyof CV>(k: K, v: CV[K]) => onChange({ ...cv, [k]: v });
  const p = cv.personal;
  const readPhoto = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set("personal", { ...p, photo: typeof reader.result === "string" ? reader.result : undefined });
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <Section title="Coordonnées">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nom complet"><input className="input" value={p.name} onChange={(e) => set("personal", { ...p, name: e.target.value })} /></Field>
          <Field label="E-mail"><input className="input" value={p.email} onChange={(e) => set("personal", { ...p, email: e.target.value })} /></Field>
          <Field label="Téléphone"><input className="input" value={p.phone} onChange={(e) => set("personal", { ...p, phone: e.target.value })} /></Field>
          <Field label="Ville"><input className="input" value={p.location} onChange={(e) => set("personal", { ...p, location: e.target.value })} /></Field>
          <div className="sm:col-span-2"><Field label="Lien (LinkedIn, portfolio…)"><input className="input" value={p.link} onChange={(e) => set("personal", { ...p, link: e.target.value })} /></Field></div>
          <div className="sm:col-span-2">
            <Field label="Photo de profil">
              <div className="flex items-center gap-3">
                {p.photo && <img src={p.photo} alt="Aperçu du portrait" className="h-14 w-14 rounded-full object-cover" />}
                <Button asChild variant="outline" size="sm">
                  <label><ImagePlus /> {p.photo ? "Changer" : "Choisir une photo"}<input className="sr-only" type="file" accept="image/*" onChange={(e) => readPhoto(e.target.files?.[0])} /></label>
                </Button>
                {p.photo && <Button type="button" variant="ghost" size="sm" onClick={() => set("personal", { ...p, photo: undefined })}>Retirer</Button>}
              </div>
            </Field>
          </div>
        </div>
      </Section>

      <Section title="Titre du CV">
        <input className="input" placeholder="Ex. Développeuse Full-Stack" value={cv.title} onChange={(e) => set("title", e.target.value)} />
      </Section>

      <Section
        title="Résumé"
        action={
          <button disabled={busy || !cv.summary.trim()} className="btn-ai" onClick={() => askAI("summary", cv.summary, cv.title, (t) => set("summary", t))}>
            <Sparkles className="h-3.5 w-3.5" /> Optimiser
          </button>
        }
      >
        <textarea className="input min-h-24" value={cv.summary} onChange={(e) => set("summary", e.target.value)} placeholder="2 à 3 phrases sur votre profil" />
      </Section>

      <Section
        title="Expériences"
        action={
          <button className="btn-ghost text-xs" onClick={() => set("experiences", [...cv.experiences, { id: uid(), role: "", company: "", start: "", end: "", bullets: [] }])}>
            <Plus className="h-3.5 w-3.5" /> Ajouter
          </button>
        }
      >
        {cv.experiences.map((x, i) => {
          const upd = (patch: Partial<typeof x>) => set("experiences", cv.experiences.map((e) => (e.id === x.id ? { ...e, ...patch } : e)));
          return (
            <div key={x.id} className="space-y-3 rounded-xl border p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Poste"><input className="input" value={x.role} onChange={(e) => upd({ role: e.target.value })} /></Field>
                <Field label="Entreprise"><input className="input" value={x.company} onChange={(e) => upd({ company: e.target.value })} /></Field>
                <Field label="Début"><input className="input" value={x.start} onChange={(e) => upd({ start: e.target.value })} /></Field>
                <Field label="Fin"><input className="input" value={x.end} onChange={(e) => upd({ end: e.target.value })} /></Field>
              </div>
              <Field label="Réalisations (une par ligne)">
                <textarea className="input min-h-24" value={x.bullets.join("\n")} onChange={(e) => upd({ bullets: e.target.value.split("\n") })} />
              </Field>
              <div className="flex justify-between">
                <button className="btn-ghost text-xs text-destructive" onClick={() => set("experiences", cv.experiences.filter((e) => e.id !== x.id))}>
                  <Trash2 className="h-3.5 w-3.5" /> Supprimer
                </button>
                <button
                  disabled={busy || !x.bullets.join("").trim()}
                  className="btn-ai"
                  onClick={() =>
                    askAI("bullets", x.bullets.filter(Boolean).join("\n"), `${x.role} chez ${x.company}`, (t) =>
                      upd({ bullets: t.split("\n").map((l) => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean) }),
                    )
                  }
                >
                  <Sparkles className="h-3.5 w-3.5" /> Optimiser l'expérience {i + 1}
                </button>
              </div>
            </div>
          );
        })}
      </Section>

      <Section
        title="Formations"
        action={
          <button className="btn-ghost text-xs" onClick={() => set("education", [...cv.education, { id: uid(), degree: "", school: "", start: "", end: "" }])}>
            <Plus className="h-3.5 w-3.5" /> Ajouter
          </button>
        }
      >
        {cv.education.map((x) => {
          const upd = (patch: Partial<typeof x>) => set("education", cv.education.map((e) => (e.id === x.id ? { ...e, ...patch } : e)));
          return (
            <div key={x.id} className="grid gap-3 rounded-xl border p-4 sm:grid-cols-2">
              <Field label="Diplôme"><input className="input" value={x.degree} onChange={(e) => upd({ degree: e.target.value })} /></Field>
              <Field label="Établissement"><input className="input" value={x.school} onChange={(e) => upd({ school: e.target.value })} /></Field>
              <Field label="Début"><input className="input" value={x.start} onChange={(e) => upd({ start: e.target.value })} /></Field>
              <Field label="Fin"><input className="input" value={x.end} onChange={(e) => upd({ end: e.target.value })} /></Field>
              <button className="btn-ghost justify-self-start text-xs text-destructive" onClick={() => set("education", cv.education.filter((e) => e.id !== x.id))}>
                <Trash2 className="h-3.5 w-3.5" /> Supprimer
              </button>
            </div>
          );
        })}
      </Section>

      <Section title="Compétences">
        <input
          className="input"
          placeholder="Séparées par des virgules"
          value={cv.skills.join(", ")}
          onChange={(e) => set("skills", e.target.value.split(",").map((s) => s.trimStart()))}
          onBlur={() => set("skills", cv.skills.map((s) => s.trim()).filter(Boolean))}
        />
      </Section>

      <Section title="Langues">
        <textarea
          className="input min-h-20"
          placeholder="Une langue par ligne, par exemple : Anglais — courant"
          value={cv.languages.join("\n")}
          onChange={(e) => set("languages", e.target.value.split("\n"))}
          onBlur={() => set("languages", cv.languages.map((s) => s.trim()).filter(Boolean))}
        />
      </Section>

      <Section title="Centres d’intérêt / Loisirs">
        <input
          className="input"
          placeholder="Séparés par des virgules"
          value={cv.interests.join(", ")}
          onChange={(e) => set("interests", e.target.value.split(",").map((s) => s.trimStart()))}
          onBlur={() => set("interests", cv.interests.map((s) => s.trim()).filter(Boolean))}
        />
      </Section>
    </div>
  );
}
