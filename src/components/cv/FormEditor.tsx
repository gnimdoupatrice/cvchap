import { ImagePlus, Plus, Sparkles, Trash2, Wand2 } from "lucide-react";
import { uid, type CV } from "@/lib/cv/types";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { VoiceInput } from "./VoiceInput";

export type AskAI = (kind: "summary" | "bullets" | "rephrase", text: string, context: string, apply: (t: string) => void) => void;
export function Section({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return <section className="border-b pb-6 pt-2"><div className="mb-4 flex flex-wrap items-center justify-between gap-2"><h2 className="text-sm font-semibold">{title}</h2>{action}</div><div className="space-y-3">{children}</div></section>;
}
export function TextField({ label, value, onChange, askAI, busy, context = "", multiline = false, placeholder = "" }: {
  label: string; value: string; onChange: (text: string) => void; askAI: AskAI; busy: boolean; context?: string; multiline?: boolean; placeholder?: string;
}) {
  return <div className="min-w-0"><div className="mb-1 flex items-center justify-between gap-2"><label className="text-xs font-medium text-muted-foreground">{label}</label><div className="flex shrink-0 gap-1">
    <VoiceInput disabled={busy} label={`Dicter : ${label}`} onTranscript={(text) => onChange(multiline && value.trim() ? `${value}\n${text}` : text)} />
    <Button type="button" size="icon" variant="ghost" className="size-8 text-primary" title={`Reformuler : ${label}`} aria-label={`Reformuler : ${label}`} disabled={busy || !value.trim()} onClick={() => askAI("rephrase", value, `${context} — Champ ${label}. Conserver exactement noms, contacts et dates ; reformuler seulement si pertinent.`, onChange)}><Wand2 className="size-3.5" /></Button>
  </div></div>
  {multiline ? <textarea aria-label={label} className="input min-h-24" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} /> : <input aria-label={label} className="input" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />}
  </div>;
}
export function FormEditor({ cv, onChange, askAI, busy }: { cv: CV; onChange: (cv: CV) => void; askAI: AskAI; busy: boolean }) {
  const set = <K extends keyof CV>(key: K, value: CV[K]) => onChange({ ...cv, [key]: value });
  const p = cv.personal;
  const field = (label: string, value: string, onChange: (text: string) => void, multiline = false) => <TextField label={label} value={value} onChange={onChange} multiline={multiline} askAI={askAI} busy={busy} context={cv.title} />;
  const readPhoto = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => { if (typeof reader.result === "string") set("personal", { ...p, photo: reader.result }); };
    reader.readAsDataURL(file);
  };
  return <div className="space-y-6">
    <Section title="Coordonnées"><div className="grid gap-3 sm:grid-cols-2">
      {field("Nom complet", p.name, (name) => set("personal", { ...p, name }))}
      {field("E-mail", p.email, (email) => set("personal", { ...p, email }))}
      {field("Téléphone", p.phone, (phone) => set("personal", { ...p, phone }))}
      {field("Ville", p.location, (location) => set("personal", { ...p, location }))}
      <div className="sm:col-span-2">{field("Lien (LinkedIn, portfolio…)", p.link, (link) => set("personal", { ...p, link }))}</div>
      <div className="sm:col-span-2"><span className="mb-2 block text-xs text-muted-foreground">Photo de profil</span><div className="flex flex-wrap items-center gap-3">
        {p.photo && <img src={p.photo} alt="Aperçu du portrait" className="size-14 rounded-full object-cover" />}
        <Button asChild variant="outline" size="sm"><label><ImagePlus />{p.photo ? "Changer" : "Choisir une photo"}<input aria-label="Photo de profil" className="sr-only" type="file" accept="image/*" onChange={(e) => readPhoto(e.target.files?.[0])} /></label></Button>
        {p.photo && <Button variant="ghost" size="sm" onClick={() => { const { photo: _photo, ...rest } = p; set("personal", rest); }}>Retirer</Button>}
      </div></div>
    </div></Section>
    <Section title="Titre du CV">{field("Titre professionnel", cv.title, text => set("title", text))}</Section>
    <Section title="Résumé" action={<Button variant="outline" size="sm" disabled={busy || !cv.summary.trim()} onClick={() => askAI("summary", cv.summary, cv.title, text => set("summary", text))}><Sparkles />Optimiser</Button>}>
      {field("Présentation du profil", cv.summary, text => set("summary", text), true)}
    </Section>
    <Section title="Expériences" action={<Button variant="ghost" size="sm" onClick={() => set("experiences", [...cv.experiences, { id: uid(), role: "", company: "", start: "", end: "", bullets: [] }])}><Plus />Ajouter</Button>}>
      {cv.experiences.map((x, i) => {
        const upd = (patch: Partial<typeof x>) => set("experiences", cv.experiences.map(e => e.id === x.id ? { ...e, ...patch } : e));
        return <div key={x.id} className="space-y-3 border-l-2 pl-3"><div className="flex items-center justify-between"><h3 className="text-xs font-semibold">Expérience {i + 1}</h3><Button size="icon" variant="ghost" className="size-8 text-destructive" aria-label={`Supprimer l’expérience ${i + 1}`} onClick={() => set("experiences", cv.experiences.filter(e => e.id !== x.id))}><Trash2 className="size-3.5" /></Button></div>
          <div className="grid gap-3 sm:grid-cols-2">{field("Poste", x.role, role => upd({ role }))}{field("Entreprise", x.company, company => upd({ company }))}{field("Début de l’expérience", x.start, start => upd({ start }))}{field("Fin de l’expérience", x.end, end => upd({ end }))}</div>
          {field("Réalisations (une par ligne)", x.bullets.join("\n"), text => upd({ bullets: text.split("\n") }), true)}
          <Button variant="outline" size="sm" className="max-w-full whitespace-normal" disabled={busy || !x.bullets.join("").trim()} onClick={() => askAI("bullets", x.bullets.filter(Boolean).join("\n"), `${x.role} chez ${x.company}`, text => upd({ bullets: text.split("\n").map(l => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean) }))}><Sparkles />Optimiser les réalisations</Button>
        </div>;
      })}
    </Section>
    <Section title="Formations" action={<Button variant="ghost" size="sm" onClick={() => set("education", [...cv.education, { id: uid(), degree: "", school: "", start: "", end: "" }])}><Plus />Ajouter</Button>}>
      {cv.education.map((x, i) => {
        const upd = (patch: Partial<typeof x>) => set("education", cv.education.map(e => e.id === x.id ? { ...e, ...patch } : e));
        return <div key={x.id} className="space-y-3 border-l-2 pl-3"><div className="flex items-center justify-between"><h3 className="text-xs font-semibold">Formation {i + 1}</h3><Button size="icon" variant="ghost" className="size-8 text-destructive" aria-label={`Supprimer la formation ${i + 1}`} onClick={() => set("education", cv.education.filter(e => e.id !== x.id))}><Trash2 className="size-3.5" /></Button></div>
          <div className="grid gap-3 sm:grid-cols-2">{field("Diplôme", x.degree, degree => upd({ degree }))}{field("Établissement", x.school, school => upd({ school }))}{field("Début de la formation", x.start, start => upd({ start }))}{field("Fin de la formation", x.end, end => upd({ end }))}</div>
          {field("Précision sur la formation", x.note ?? "", note => upd({ note }))}
        </div>;
      })}
    </Section>
    <Section title="Compétences">{field("Compétences (une par ligne)", cv.skills.join("\n"), text => set("skills", text.split("\n")), true)}</Section>
    <Section title="Langues">{field("Langues et niveaux (une par ligne)", cv.languages.join("\n"), text => set("languages", text.split("\n")), true)}</Section>
    <Section title="Centres d’intérêt / Loisirs">{field("Centres d’intérêt (un par ligne)", cv.interests.join("\n"), text => set("interests", text.split("\n")), true)}</Section>
  </div>;
}
