import type { CV, TemplateId } from "@/lib/cv/types";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

export const templateMeta: { id: TemplateId; name: string; hint: string }[] = [
  { id: "french-blue", name: "Français Simple Moderne Bleu", hint: "Le gabarit principal A4" },
  { id: "emerald-tech", name: "Émeraude & Nuit Tech", hint: "Gabarit développeur, projets & portfolio" },
];

const dates = (start: string, end: string) => [start, end].filter(Boolean).join(" – ");

/* ========================================================
   MODÈLE 1 : Français Simple Moderne Bleu
   ======================================================== */
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
            {cv.personal.photo ? (
              <img src={cv.personal.photo} alt="" />
            ) : (
              <span>{cv.personal.name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("") || "CV"}</span>
            )}
          </div>
        </div>
        <div className="cv-blue-sidebar-content">
          {contacts.length > 0 && (
            <section>
              <h2>Coordonnées</h2>
              <div className="cv-blue-contacts">
                {contacts.map(({ value, Icon }) => (
                  <p key={value}><Icon aria-hidden="true" /><span>{value}</span></p>
                ))}
              </div>
            </section>
          )}
          {cv.languages.length > 0 && (
            <section>
              <h2>Langues</h2>
              <div className="cv-blue-languages">
                {cv.languages.filter(Boolean).map((item) => {
                  const [name = item] = item.split(/\s+[—–-]\s+/);
                  return (
                    <div className="cv-blue-language" key={item}>
                      <span>{name}</span>
                      <i><b style={{ width: languageLevel(item) }} /></i>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
          {cv.skills.length > 0 && (
            <section>
              <h2>Compétences</h2>
              <ul>{cv.skills.filter(Boolean).map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          )}
          {cv.interests.length > 0 && (
            <section>
              <h2>Centres d’intérêt</h2>
              <ul>{cv.interests.filter(Boolean).map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          )}
        </div>
      </aside>

      <main className="cv-blue-main">
        <header className="cv-blue-header">
          <h1>{cv.personal.name || "Votre nom"}</h1>
          {cv.title && <p>{cv.title}</p>}
        </header>

        {education.length > 0 && (
          <section className="cv-blue-section">
            <h2 className="cv-blue-heading">Formation</h2>
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
            <h2 className="cv-blue-heading">Expérience professionnelle</h2>
            <div className="cv-blue-timeline">
              {experiences.map((item) => (
                <article key={item.id} className="cv-blue-entry">
                  <span className="cv-blue-dot" />
                  <div>
                    <h3>{item.role}</h3>
                    {item.company && <p className="cv-blue-company">{item.company}</p>}
                    {item.bullets.some(Boolean) && (
                      <ul className="cv-blue-bullets">
                        {item.bullets.filter(Boolean).map((bullet, index) => (
                          <li key={`${item.id}-${index}`}>{bullet}</li>
                        ))}
                      </ul>
                    )}
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

/* ========================================================
   MODÈLE 2 : Émeraude & Nuit Tech (Votre HTML / CSS exact)
   ======================================================== */
function EmeraldTech({ cv }: { cv: CV }) {
  const experiences = cv.experiences.filter((e) => e.role || e.company || e.bullets.some(Boolean));
  const education = cv.education.filter((e) => e.degree || e.school);

  // Formattage du nom (première partie / suite)
  const nameParts = (cv.personal.name || "Votre Nom").trim().split(" ");
  const firstName = nameParts.slice(0, 2).join(" ");
  const restName = nameParts.slice(2).join(" ");

  return (
    <div className="em-page">
      <style>{`
        .em-page {
          width: 794px;
          min-height: 1123px;
          height: 1123px;
          display: flex;
          overflow: hidden;
          position: relative;
          background: #faf8f3;
          color: #2b2b2b;
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
          text-align: left;
        }
        .em-page * { box-sizing: border-box; margin: 0; padding: 0; }

        /* SIDEBAR */
        .em-sidebar {
          width: 257px;
          height: 1123px;
          background: linear-gradient(180deg, #14213d 0%, #101a33 100%);
          color: #e9edf5;
          padding: 42px 30px 34px 30px;
          position: relative;
          flex-shrink: 0;
        }
        .em-sidebar::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 9px;
          height: 100%;
          background: linear-gradient(180deg, #2f9e6f 0%, #c9932e 100%);
        }
        .em-photo-wrap {
          width: 121px;
          height: 121px;
          border-radius: 50%;
          margin: 0 auto 19px auto;
          padding: 4.5px;
          background: conic-gradient(from 210deg, #2f9e6f, #c9932e, #2f9e6f);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .em-photo-wrap img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 2.2px solid #101a33;
          display: block;
        }
        .em-photo-placeholder {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #101a33;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7fd6ab;
          font-weight: 700;
          font-size: 24px;
          font-family: 'Lora', serif;
        }
        .em-sb-name {
          font-family: 'Lora', serif;
          font-weight: 700;
          font-size: 19.3px;
          text-align: center;
          line-height: 1.18;
          color: #ffffff;
          letter-spacing: 0.2px;
        }
        .em-sb-role {
          text-align: center;
          font-size: 10.1px;
          letter-spacing: 1.1px;
          text-transform: uppercase;
          color: #7fd6ab;
          margin-top: 8px;
          font-weight: 600;
        }
        .em-sb-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.14);
          margin: 21px 0 19px 0;
        }
        .em-sb-block { margin-bottom: 21px; }
        .em-sb-title {
          font-size: 10.1px;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: #c9932e;
          font-weight: 700;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .em-sb-title::before { content: "◆"; font-size: 8px; color: #2f9e6f; }
        .em-sb-row {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
          align-items: flex-start;
          font-size: 10.2px;
          line-height: 1.35;
        }
        .em-sb-row .em-ic { color: #7fd6ab; font-size: 11px; width: 14px; flex-shrink: 0; }
        .em-sb-row .em-txt { color: #dbe2ee; word-break: break-word; }
        .em-sb-row .em-lbl {
          display: block;
          color: #8fa0bf;
          font-size: 8.8px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 1.5px;
        }

        .em-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .em-chip {
          font-family: monospace;
          font-size: 8.8px;
          color: #e9edf5;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(127, 214, 171, 0.35);
          border-radius: 8px;
          padding: 5px 8px;
          line-height: 1.2;
        }
        .em-edu-item { font-size: 10.6px; font-weight: 600; color: #f1f4f9; line-height: 1.3; }
        .em-edu-sub { font-size: 9.3px; color: #8fa0bf; margin-top: 2.5px; }
        .em-lang-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10.4px;
          margin-bottom: 8px;
        }
        .em-lang-name { color: #f1f4f9; font-weight: 600; }
        .em-lang-lvl { color: #8fa0bf; font-size: 8.9px; font-style: italic; }

        /* MAIN */
        .em-main { flex: 1; padding: 38px 42px 30px 38px; position: relative; }
        .em-mh-topline { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
        .em-mh-name { font-family: 'Lora', serif; font-weight: 700; font-size: 26px; color: #14213d; line-height: 1.1; }
        .em-mh-tag { font-size: 12.4px; font-style: italic; color: #55617a; margin-top: 6px; }
        .em-badge {
          background: #2f9e6f;
          color: #fff;
          font-size: 10.1px;
          font-weight: 700;
          letter-spacing: 0.6px;
          padding: 8px 15px;
          border-radius: 5px;
          white-space: nowrap;
          margin-top: 4px;
          text-transform: uppercase;
        }
        .em-hr-name { height: 2px; background: #14213d; margin: 11px 0 17px 0; width: 100%; }

        .em-highlight {
          background: #eef7f1;
          border-left: 3px solid #2f9e6f;
          border-radius: 5px;
          padding: 13px 17px;
          margin-bottom: 19px;
          font-size: 11.5px;
          line-height: 1.45;
          color: #233;
        }
        .em-highlight b { color: #186b45; }

        .em-sec-title {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 10px;
          margin-top: 4px;
        }
        .em-sec-num {
          background: #14213d;
          color: #fff;
          font-size: 10.6px;
          font-weight: 700;
          width: 23px;
          height: 23px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .em-sec-label { font-size: 15px; font-weight: 700; color: #14213d; letter-spacing: 0.2px; }
        .em-sec-line { flex: 1; height: 1px; background: #dcd6c8; margin-left: 6px; }

        .em-profile-text {
          font-size: 11.5px;
          line-height: 1.52;
          color: #3a3f4a;
          text-align: justify;
          margin-bottom: 19px;
        }

        .em-projects { display: flex; flex-direction: column; gap: 11px; }
        .em-proj-card {
          border: 1px solid #e4ddc9;
          border-radius: 7px;
          padding: 11px 15px;
          background: #ffffff;
          position: relative;
        }
        .em-proj-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 11px; margin-bottom: 4px; }
        .em-proj-title { font-size: 12.8px; font-weight: 700; color: #14213d; }
        .em-proj-title .em-diamond { color: #2f9e6f; margin-right: 5px; font-size: 9.3px; }
        .em-proj-tag {
          font-size: 8.6px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 22px;
          white-space: nowrap;
          letter-spacing: 0.2px;
          margin-top: 1.5px;
          background: #e8f3ec;
          color: #186b45;
          border: 1px solid #b9dfc9;
        }

        .em-proj-desc { font-size: 10.4px; line-height: 1.42; color: #4a5063; margin-bottom: 5.5px; text-align: justify; }
        .em-proj-tech { font-size: 9.1px; color: #8a7a4a; font-family: monospace; letter-spacing: 0.1px; }

        .em-footnote {
          margin-top: 15px;
          font-size: 9.6px;
          font-style: italic;
          color: #8a8672;
          text-align: center;
          border-top: 1px solid #e4ddc9;
          padding-top: 10px;
        }
      `}</style>

      {/* SIDEBAR GAUCHE */}
      <div className="em-sidebar">
        <div className="em-photo-wrap">
          {cv.personal.photo ? (
            <img src={cv.personal.photo} alt={cv.personal.name} />
          ) : (
            <div className="em-photo-placeholder">
              {cv.personal.name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("") || "CV"}
            </div>
          )}
        </div>

        <div className="em-sb-name">
          {firstName}
          {restName && <><br />{restName}</>}
        </div>
        <div className="em-sb-role">{cv.title || "Poste recherché"}</div>

        <div className="em-sb-divider" />

        {/* Coordonnées */}
        <div className="em-sb-block">
          <div className="em-sb-title">Contact</div>
          {cv.personal.phone && (
            <div className="em-sb-row">
              <span className="em-ic">&#9742;</span>
              <span className="em-txt"><span className="em-lbl">Téléphone</span>{cv.personal.phone}</span>
            </div>
          )}
          {cv.personal.email && (
            <div className="em-sb-row">
              <span className="em-ic">&#9993;</span>
              <span className="em-txt"><span className="em-lbl">Courriel</span>{cv.personal.email}</span>
            </div>
          )}
          {cv.personal.link && (
            <div className="em-sb-row">
              <span className="em-ic">&#127760;</span>
              <span className="em-txt"><span className="em-lbl">Portfolio</span>{cv.personal.link}</span>
            </div>
          )}
          {cv.personal.location && (
            <div className="em-sb-row">
              <span className="em-ic">&#8982;</span>
              <span className="em-txt"><span className="em-lbl">Adresse</span>{cv.personal.location}</span>
            </div>
          )}
        </div>

        {/* Compétences techniques */}
        {cv.skills.length > 0 && (
          <>
            <div className="em-sb-divider" />
            <div className="em-sb-block">
              <div className="em-sb-title">Compétences techniques</div>
              <div className="em-chips">
                {cv.skills.filter(Boolean).map((s) => (
                  <span className="em-chip" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Formation */}
        {education.length > 0 && (
          <>
            <div className="em-sb-divider" />
            <div className="em-sb-block">
              <div className="em-sb-title">Formation</div>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: 8 }}>
                  <div className="em-edu-item">{edu.degree}</div>
                  <div className="em-edu-sub">{edu.school} {dates(edu.start, edu.end) && `· ${dates(edu.start, edu.end)}`}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Langues */}
        {cv.languages.length > 0 && (
          <>
            <div className="em-sb-divider" />
            <div className="em-sb-block">
              <div className="em-sb-title">Langues</div>
              {cv.languages.filter(Boolean).map((lang) => {
                const parts = lang.split(/\s+[—–-]\s+/);
                const name = parts[0];
                const lvl = parts[1] || "";
                return (
                  <div className="em-lang-row" key={lang}>
                    <span className="em-lang-name">{name}</span>
                    {lvl && <span className="em-lang-lvl">{lvl}</span>}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* CONTENU PRINCIPAL DROITE */}
      <div className="em-main">
        <div className="em-mh-topline">
          <div>
            <div className="em-mh-name">{cv.personal.name || "Votre Nom et Prénom"}</div>
            <div className="em-mh-tag">{cv.title || "Titre ou spécialité"}</div>
          </div>
          <div className="em-badge">Profil Tech</div>
        </div>
        <div className="em-hr-name" />

        {/* Bloc d'accroche */}
        <div className="em-highlight">
          <b>Disponible immédiatement</b> pour des opportunités et projets à fort impact.
        </div>

        {/* Section 01 : Profil */}
        {cv.summary && (
          <>
            <div className="em-sec-title">
              <div className="em-sec-num">01</div>
              <div className="em-sec-label">Profil</div>
              <div className="em-sec-line" />
            </div>
            <div className="em-profile-text">{cv.summary}</div>
          </>
        )}

        {/* Section 02 : Projets & Réalisations */}
        {experiences.length > 0 && (
          <>
            <div className="em-sec-title">
              <div className="em-sec-num">{cv.summary ? "02" : "01"}</div>
              <div className="em-sec-label">Projets &amp; Expériences</div>
              <div className="em-sec-line" />
            </div>
            <div className="em-projects">
              {experiences.map((exp) => (
                <div className="em-proj-card" key={exp.id}>
                  <div className="em-proj-top">
                    <div className="em-proj-title">
                      <span className="em-diamond">◆</span>{exp.company || exp.role}
                    </div>
                    <div className="em-proj-tag">{exp.role}</div>
                  </div>
                  {exp.bullets.length > 0 && (
                    <div className="em-proj-desc">
                      {exp.bullets.filter(Boolean).join(" ")}
                    </div>
                  )}
                  {dates(exp.start, exp.end) && (
                    <div className="em-proj-tech">
                      Période : {dates(exp.start, exp.end)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        <div className="em-footnote">
          Projets réalisés en combinant rigueur d'ingénierie, créativité et technologies modernes.
        </div>
      </div>
    </div>
  );
}

/* ========================================================
   COMMUTATEUR DE MODÈLE
   ======================================================== */
export function CVTemplate({ cv, template }: { cv: CV; template: TemplateId }) {
  if (template === "emerald-tech") {
    return <EmeraldTech cv={cv} />;
  }
  return <FrenchBlue cv={cv} />;
}
