import type { CV, TemplateId } from "@/lib/cv/types";
import { Mail, MapPin, Phone } from "lucide-react";

export const templateMeta: { id: TemplateId; name: string; hint: string }[] = [
  { id: "french-blue", name: "Français Simple Moderne Bleu", hint: "Élégant, structuré et professionnel" },
  { id: "minimal", name: "Minimaliste épuré", hint: "Une colonne, beaucoup d'air" },
  { id: "corporate", name: "Corporate institutionnel", hint: "Serif, sobre et classique" },
  { id: "modern", name: "Moderne bicolonne", hint: "Barre latérale structurée" },
];

const dates = (start: string, end: string) => [start, end].filter(Boolean).join(" – ");

function BlueSectionTitle({ children }: { children: string }) {
  return <h2 className="cv-blue-heading">{children}</h2>;
}

function FrenchBlue({ cv }: { cv: CV }) {
  const experiences = cv.experiences.filter((e) => e.role || e.company || e.bullets.some(Boolean));
  const education = cv.education.filter((e) => e.degree || e.school);
  const contacts = [
    { value: cv.personal.phone, Icon: Phone },
    { value: cv.personal.email, Icon: Mail },
    { value: cv.personal.location, Icon: MapPin },
  ].filter(({ value }) => Boolean(value));

  return (
    <div className="cv-blue-layout font-cv-sans">
      <aside className="cv-blue-sidebar">
        <div className="cv-blue-portrait-wrap">
          <div className="cv-blue-portrait">
            {cv.personal.photo ? <img src={cv.personal.photo} alt="" /> : <span>{cv.personal.name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("") || "CV"}</span>}
          </div>
        </div>
        <div className="cv-blue-sidebar-content">
          {contacts.length > 0 && (
            <section>
              <h2>Coordonnées</h2>
              <div className="cv-blue-contacts">
                {contacts.map(({ value, Icon }) => <p key={value}><Icon aria-hidden="true" /><span>{value}</span></p>)}
              </div>
            </section>
          )}
          {cv.languages.length > 0 && <section><h2>Langues</h2><ul>{cv.languages.filter(Boolean).map((item) => <li key={item}>{item}</li>)}</ul></section>}
          {cv.skills.length > 0 && <section><h2>Compétences</h2><ul>{cv.skills.filter(Boolean).map((item) => <li key={item}>{item}</li>)}</ul></section>}
          {cv.interests.length > 0 && <section><h2>Centres d’intérêt</h2><ul>{cv.interests.filter(Boolean).map((item) => <li key={item}>{item}</li>)}</ul></section>}
        </div>
      </aside>

      <main className="cv-blue-main">
        <header className="cv-blue-header">
          <h1>{cv.personal.name || "Votre nom"}</h1>
          {cv.title && <p>{cv.title}</p>}
        </header>

        {cv.summary && <p className="cv-blue-summary">{cv.summary}</p>}

        {education.length > 0 && (
          <section className="cv-blue-section">
            <BlueSectionTitle>Formation</BlueSectionTitle>
            <div className="cv-blue-timeline">
              {education.map((item) => (
                <article key={item.id} className="cv-blue-entry">
                  <span className="cv-blue-dot" />
                  <div><h3>{item.degree}</h3><p>{item.school}</p></div>
                  <time>{dates(item.start, item.end)}</time>
                </article>
              ))}
            </div>
          </section>
        )}

        {experiences.length > 0 && (
          <section className="cv-blue-section">
            <BlueSectionTitle>Expérience professionnelle</BlueSectionTitle>
            <div className="cv-blue-timeline">
              {experiences.map((item) => (
                <article key={item.id} className="cv-blue-entry">
                  <span className="cv-blue-dot" />
                  <div>
                    <h3>{item.role}</h3>
                    {item.company && <p className="cv-blue-company">{item.company}</p>}
                    {item.bullets.some(Boolean) && <ul className="cv-blue-bullets">{item.bullets.filter(Boolean).map((bullet, index) => <li key={`${item.id}-${index}`}>{bullet}</li>)}</ul>}
                  </div>
                  <time>{dates(item.start, item.end)}</time>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

const contact = (cv: CV) =>
  [cv.personal.email, cv.personal.phone, cv.personal.location, cv.personal.link].filter(Boolean);

function Experiences({ cv, titleClass }: { cv: CV; titleClass: string }) {
  const items = cv.experiences.filter((e) => e.role || e.company || e.bullets.length);
  if (!items.length) return null;
  return (
    <section className="cv-section">
      <h2 className={titleClass}>Expériences professionnelles</h2>
      {items.map((e) => (
        <div key={e.id} className="cv-item">
          <div className="flex items-baseline justify-between gap-[1em]">
            <h3 className="font-semibold">
              {e.role}
              {e.company && <span className="font-normal"> — {e.company}</span>}
            </h3>
            <span className="cv-muted shrink-0 text-[0.9em]">{[e.start, e.end].filter(Boolean).join(" – ")}</span>
          </div>
          {e.bullets.length > 0 && (
            <ul className="mt-[0.3em] list-disc pl-[1.2em]">
              {e.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}

function EducationList({ cv, titleClass }: { cv: CV; titleClass: string }) {
  const items = cv.education.filter((e) => e.degree || e.school);
  if (!items.length) return null;
  return (
    <section className="cv-section">
      <h2 className={titleClass}>Formation</h2>
      {items.map((e) => (
        <div key={e.id} className="cv-item">
          <h3 className="font-semibold">{e.degree}</h3>
          <p className="cv-muted text-[0.92em]">
            {e.school}
            {(e.start || e.end) && ` · ${[e.start, e.end].filter(Boolean).join(" – ")}`}
          </p>
        </div>
      ))}
    </section>
  );
}

function Minimal({ cv }: { cv: CV }) {
  const t = "cv-title-min";
  return (
    <div className="cv-pad font-cv-sans">
      <header className="mb-[1.6em]">
        <h1 className="text-[2.3em] font-semibold leading-tight tracking-tight">{cv.personal.name || "Votre nom"}</h1>
        {cv.title && <p className="cv-accent mt-[0.2em] text-[1.15em]">{cv.title}</p>}
        <p className="cv-muted mt-[0.6em] text-[0.9em]">{contact(cv).join("   ·   ")}</p>
      </header>
      {cv.summary && (
        <section className="cv-section">
          <h2 className={t}>Profil</h2>
          <p>{cv.summary}</p>
        </section>
      )}
      <Experiences cv={cv} titleClass={t} />
      <EducationList cv={cv} titleClass={t} />
      {cv.skills.length > 0 && (
        <section className="cv-section">
          <h2 className={t}>Compétences</h2>
          <p>{cv.skills.join(" · ")}</p>
        </section>
      )}
    </div>
  );
}

function Corporate({ cv }: { cv: CV }) {
  const t = "cv-title-corp";
  return (
    <div className="cv-pad font-cv-serif">
      <header className="mb-[1.2em] border-b-2 border-paper-ink pb-[0.9em] text-center">
        <h1 className="text-[2.1em] font-bold uppercase tracking-[0.08em]">{cv.personal.name || "Votre nom"}</h1>
        {cv.title && <p className="mt-[0.2em] text-[1.1em] italic">{cv.title}</p>}
        <p className="cv-muted mt-[0.5em] text-[0.88em]">{contact(cv).join("  |  ")}</p>
      </header>
      {cv.summary && (
        <section className="cv-section">
          <h2 className={t}>Synthèse</h2>
          <p className="text-justify">{cv.summary}</p>
        </section>
      )}
      <Experiences cv={cv} titleClass={t} />
      <EducationList cv={cv} titleClass={t} />
      {cv.skills.length > 0 && (
        <section className="cv-section">
          <h2 className={t}>Compétences</h2>
          <p>{cv.skills.join(", ")}</p>
        </section>
      )}
    </div>
  );
}

function Modern({ cv }: { cv: CV }) {
  const t = "cv-title-mod";
  return (
    <div className="flex min-h-[1123px] font-cv-sans">
      <aside className="w-[34%] bg-paper-tint px-[1.6em] py-[2.4em]">
        <h1 className="text-[1.9em] font-bold leading-tight">{cv.personal.name || "Votre nom"}</h1>
        {cv.title && <p className="cv-accent mt-[0.4em] font-medium">{cv.title}</p>}
        <section className="cv-section mt-[1.6em]">
          <h2 className={t}>Contact</h2>
          {contact(cv).map((c) => (
            <p key={c} className="break-words text-[0.9em]">{c}</p>
          ))}
        </section>
        {cv.skills.length > 0 && (
          <section className="cv-section">
            <h2 className={t}>Compétences</h2>
            <ul>
              {cv.skills.map((s) => (
                <li key={s} className="text-[0.92em]">{s}</li>
              ))}
            </ul>
          </section>
        )}
        <EducationList cv={cv} titleClass={t} />
      </aside>
      <main className="flex-1 px-[2em] py-[2.4em]">
        {cv.summary && (
          <section className="cv-section">
            <h2 className={t}>Profil</h2>
            <p>{cv.summary}</p>
          </section>
        )}
        <Experiences cv={cv} titleClass={t} />
      </main>
    </div>
  );
}

export function CVTemplate({ cv, template }: { cv: CV; template: TemplateId }) {
  if (template === "french-blue") return <FrenchBlue cv={cv} />;
  if (template === "corporate") return <Corporate cv={cv} />;
  if (template === "modern") return <Modern cv={cv} />;
  return <Minimal cv={cv} />;
}
