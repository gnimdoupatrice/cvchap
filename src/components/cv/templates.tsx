import type { CV, TemplateId } from "@/lib/cv/types";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

export const templateMeta: { id: TemplateId; name: string; hint: string }[] = [
  { id: "french-blue", name: "Français Simple Moderne Bleu", hint: "Le gabarit principal" },
];

const dates = (start: string, end: string) => [start, end].filter(Boolean).join(" – ");

function BlueSectionTitle({ children }: { children: string }) {
  return <h2 className="cv-blue-heading">{children}</h2>;
}

const languageLevel = (language: string) => {
  const normalized = language.toLocaleLowerCase("fr");
  if (normalized.includes("maternel") || normalized.includes("bilingue")) return "100%";
  if (normalized.includes("courant") || normalized.includes("c1") || normalized.includes("c2")) return "88%";
  if (normalized.includes("professionnel") || normalized.includes("b2")) return "78%";
  if (normalized.includes("intermédiaire") || normalized.includes("b1")) return "65%";
  return "72%";
};

function FrenchBlue({ cv }: { cv: CV }) {
  const experiences = cv.experiences.filter((e) => e.role || e.company || e.bullets.some(Boolean));
  const education = cv.education.filter((e) => e.degree || e.school);
  const contacts = [
    { value: cv.personal.phone, Icon: Phone },
    { value: cv.personal.email, Icon: Mail },
    { value: cv.personal.location, Icon: MapPin },
    { value: cv.personal.link, Icon: Globe },
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
          {cv.languages.length > 0 && <section><h2>Langues</h2><div className="cv-blue-languages">{cv.languages.filter(Boolean).map((item) => {
            const [name = item] = item.split(/\s+[—–-]\s+/);
            return <div className="cv-blue-language" key={item}><span>{name}</span><i><b style={{ width: languageLevel(item) }} /></i></div>;
          })}</div></section>}
          {cv.skills.length > 0 && <section><h2>Compétences</h2><ul>{cv.skills.filter(Boolean).map((item) => <li key={item}>{item}</li>)}</ul></section>}
          {cv.interests.length > 0 && <section><h2>Centres d’intérêt</h2><ul>{cv.interests.filter(Boolean).map((item) => <li key={item}>{item}</li>)}</ul></section>}
        </div>
      </aside>

      <main className="cv-blue-main">
        <header className="cv-blue-header">
          <h1>{cv.personal.name || "Votre nom"}</h1>
          {cv.title && <p>{cv.title}</p>}
        </header>

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

export function CVTemplate({ cv, template }: { cv: CV; template: TemplateId }) {
  void template;
  return <FrenchBlue cv={cv} />;
}
