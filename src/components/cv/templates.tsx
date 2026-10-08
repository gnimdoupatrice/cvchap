import type { CV, TemplateId } from "@/lib/cv/types";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

export const templateMeta: {
  id: TemplateId;
  name: string;
  hint: string;
  category: string;
}[] = [
  {
    id: "french-blue",
    name: "Français Simple Moderne Bleu",
    hint: "Classique exécutif, cheffe de projet & management",
    category: "Exécutif",
  },
  {
    id: "emerald-tech",
    name: "Émeraude & Nuit Tech",
    hint: "Développeur, portfolio tech & projets déployés",
    category: "Tech & Web",
  },
  {
    id: "juriste-navy",
    name: "Juriste & Cadre ODD",
    hint: "Halo bleu roi, or noble, compétences & timeline",
    category: "Droit & Conseil",
  },
  {
    id: "alfred-bold",
    name: "Informaticien Bold Minimal",
    hint: "Noir #222 contrasté, typographie XXL & timeline épurée",
    category: "Ingénierie",
  },
  {
    id: "adeline-capsule",
    name: "Designer Graphique Capsules",
    hint: "Double capsule arrondie, barre de contact pilule & références",
    category: "Créatif & Studio",
  },
];

const dates = (start: string, end: string) => [start, end].filter(Boolean).join(" – ");

const formatContactHref = (type: "phone" | "email" | "link", val: string): string => {
  if (!val) return "#";
  if (type === "phone") return `tel:${val.replace(/\s+/g, "")}`;
  if (type === "email") return `mailto:${val.trim()}`;
  return val.startsWith("http") ? val : `https://${val.trim()}`;
};

/* ========================================================
   MODÈLE 1 : Français Simple Moderne Bleu
   ======================================================== */
const languageLevel = (language: string) => {
  const n = language.toLocaleLowerCase("fr");
  if (n.includes("maternel") || n.includes("bilingue") || n.includes("100%")) return "100%";
  if (n.includes("courant") || n.includes("c1") || n.includes("c2") || n.includes("96%")) return "90%";
  if (n.includes("professionnel") || n.includes("b2") || n.includes("78%")) return "78%";
  if (n.includes("intermédiaire") || n.includes("b1") || n.includes("58%")) return "60%";
  return "70%";
};

function FrenchBlue({ cv }: { cv: CV }) {
  const experiences = cv.experiences.filter((e) => e.role || e.company || e.bullets.some(Boolean));
  const education = cv.education.filter((e) => e.degree || e.school);
  const contacts = [
    { type: "phone" as const, value: cv.personal.phone, Icon: Phone },
    { type: "email" as const, value: cv.personal.email, Icon: Mail },
    { type: "link" as const, value: cv.personal.location, Icon: MapPin, isText: true },
    { type: "link" as const, value: cv.personal.link, Icon: Globe },
  ].filter(({ value }) => Boolean(value));

  return (
    <div className="cv-blue-layout font-cv-sans">
      <aside className="cv-blue-sidebar">
        <div className="cv-blue-portrait-wrap">
          <div className="cv-blue-portrait">
            {cv.personal.photo ? (
              <img src={cv.personal.photo} alt="" />
            ) : (
              <span>
                {cv.personal.name
                  .split(/\s+/)
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((p) => p[0])
                  .join("") || "CV"}
              </span>
            )}
          </div>
        </div>
        <div className="cv-blue-sidebar-content">
          {contacts.length > 0 && (
            <section>
              <h2>Coordonnées</h2>
              <div className="cv-blue-contacts">
                {contacts.map(({ type, value, Icon, isText }) =>
                  isText ? (
                    <p key={value}>
                      <Icon aria-hidden="true" />
                      <span>{value}</span>
                    </p>
                  ) : (
                    <p key={value}>
                      <Icon aria-hidden="true" />
                      <a href={formatContactHref(type, value)} target="_blank" rel="noreferrer">
                        {value}
                      </a>
                    </p>
                  )
                )}
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
                    <div key={item} className="cv-blue-lang-item">
                      <span className="cv-blue-lang-name">{name}</span>
                      <div className="cv-blue-gauge-track">
                        <div
                          className="cv-blue-gauge-fill"
                          style={{ width: languageLevel(item) }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
          {cv.skills.length > 0 && (
            <section>
              <h2>Compétences</h2>
              <ul className="cv-blue-bullet-list">
                {cv.skills.filter(Boolean).map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          )}
          {cv.interests && cv.interests.length > 0 && (
            <section>
              <h2>Centres d'intérêt</h2>
              <ul className="cv-blue-bullet-list">
                {cv.interests.filter(Boolean).map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </aside>

      <main className="cv-blue-main">
        <header className="cv-blue-header">
          <h1 className="cv-blue-name">{cv.personal.name || "Prénom Nom"}</h1>
          {cv.title && <p className="cv-blue-role">{cv.title}</p>}
        </header>

        {education.length > 0 && (
          <section className="cv-blue-section">
            <h2 className="cv-blue-section-title">Formation</h2>
            <div className="cv-blue-timeline">
              {education.map((item) => (
                <article key={item.id} className="cv-blue-entry">
                  <span className="cv-blue-entry-bullet" />
                  <div className="cv-blue-entry-body">
                    <div className="cv-blue-entry-head">
                      <div>
                        <h3>{item.degree || "Diplôme"}</h3>
                        <p className="cv-blue-entry-sub">{item.school}</p>
                      </div>
                      <span className="cv-blue-entry-dates">{dates(item.start, item.end)}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {experiences.length > 0 && (
          <section className="cv-blue-section">
            <h2 className="cv-blue-section-title">Expérience professionnelle</h2>
            <div className="cv-blue-timeline">
              {experiences.map((item) => (
                <article key={item.id} className="cv-blue-entry">
                  <span className="cv-blue-entry-bullet" />
                  <div className="cv-blue-entry-body">
                    <div className="cv-blue-entry-head">
                      <div>
                        <h3>{item.role || "Poste"}</h3>
                        <p className="cv-blue-entry-sub">{item.company}</p>
                      </div>
                      <span className="cv-blue-entry-dates">{dates(item.start, item.end)}</span>
                    </div>
                    {item.bullets.length > 0 && (
                      <ul className="cv-blue-entry-bullets">
                        {item.bullets.filter(Boolean).map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
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
   MODÈLE 2 : Émeraude & Nuit Tech (Dev Web)
   ======================================================== */
function EmeraldTech({ cv }: { cv: CV }) {
  const experiences = cv.experiences.filter((e) => e.role || e.company || e.bullets.some(Boolean));
  const education = cv.education.filter((e) => e.degree || e.school);

  return (
    <div className="em-page">
      <style>{`
        .em-page { width: 794px; min-height: 1123px; display: flex; position: relative; background: #faf8f3; color: #2b2b2b; font-family: 'Poppins', sans-serif; text-align: left; }
        .em-page * { box-sizing: border-box; margin: 0; padding: 0; }
        .em-sidebar { width: 257px; background: linear-gradient(180deg, #14213d 0%, #101a33 100%); color: #e9edf5; padding: 36px 24px; position: relative; flex-shrink: 0; }
        .em-sidebar::after { content: ""; position: absolute; top: 0; right: 0; width: 3px; height: 100%; background: linear-gradient(180deg, #2f9e6f 0%, #c9932e 100%); }
        .em-photo-wrap { width: 115px; height: 115px; margin: 0 auto 16px; border-radius: 50%; padding: 4px; background: conic-gradient(from 210deg, #2f9e6f, #c9932e, #2f9e6f); display: flex; align-items: center; justify-content: center; }
        .em-photo { width: 100%; height: 100%; border-radius: 50%; background: #14213d; overflow: hidden; display: flex; align-items: center; justify-content: center; color: #faf8f3; font-family: 'Lora', serif; font-size: 28px; font-weight: 700; border: 2.5px solid #101a33; }
        .em-photo img { width: 100%; height: 100%; object-fit: cover; }
        .em-sb-name { font-family: 'Lora', serif; font-weight: 700; font-size: 14.5pt; text-align: center; line-height: 1.18; color: #ffffff; letter-spacing: 0.2px; }
        .em-sb-role { text-align: center; font-size: 7.6pt; letter-spacing: 1.1px; text-transform: uppercase; color: #7fd6ab; margin-top: 8px; font-weight: 600; }
        .em-sb-divider { height: 1px; background: rgba(255,255,255,0.14); margin: 18px 0; }
        .em-sb-block { margin-bottom: 18px; }
        .em-sb-title { font-size: 7.6pt; letter-spacing: 1.6px; text-transform: uppercase; color: #c9932e; font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
        .em-sb-title::before { content: "◆"; font-size: 6pt; color: #2f9e6f; }
        .em-sb-row { display: flex; gap: 8px; margin-bottom: 8px; align-items: flex-start; font-size: 7.7pt; line-height: 1.35; }
        .em-sb-row .lbl { display: block; color: #8fa0bf; font-size: 6.6pt; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 2px; }
        .em-sb-row .txt { color: #dbe2ee; word-break: break-word; }
        .em-chips { display: flex; flex-wrap: wrap; gap: 5px; }
        .em-chip { font-size: 6.6pt; color: #e9edf5; background: rgba(255,255,255,0.07); border: 1px solid rgba(127,214,171,0.35); border-radius: 4px; padding: 3px 6px; line-height: 1.2; font-family: monospace; }
        .em-edu-item { font-size: 8pt; font-weight: 600; color: #f1f4f9; line-height: 1.3; margin-bottom: 6px; }
        .em-edu-sub { font-size: 7pt; color: #8fa0bf; margin-top: 2px; }
        .em-lang-row { display: flex; justify-content: space-between; align-items: center; font-size: 7.8pt; margin-bottom: 6px; }
        .em-lang-name { color: #f1f4f9; font-weight: 600; }
        .em-lang-lvl { color: #8fa0bf; font-size: 6.7pt; font-style: italic; }

        .em-main { flex: 1; padding: 34px 36px 28px 34px; position: relative; }
        .em-topline { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
        .em-mh-name { font-family: 'Lora', serif; font-weight: 700; font-size: 19.5pt; color: #14213d; line-height: 1.1; }
        .em-mh-tag { font-size: 9.3pt; font-style: italic; color: #55617a; margin-top: 5px; }
        .em-badge { background: #2f9e6f; color: #fff; font-size: 7.6pt; font-weight: 700; letter-spacing: 0.6px; padding: 5px 12px; border-radius: 4px; white-space: nowrap; text-transform: uppercase; }
        .em-hr-name { height: 2px; background: #14213d; margin: 10px 0 14px 0; width: 100%; }
        .em-highlight { background: #eef7f1; border-left: 3px solid #2f9e6f; border-radius: 4px; padding: 10px 14px; margin-bottom: 16px; font-size: 8.6pt; line-height: 1.45; color: #233; }
        .em-sec-title { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; margin-top: 6px; }
        .em-sec-num { background: #14213d; color: #fff; font-size: 8pt; font-weight: 700; width: 22px; height: 22px; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .em-sec-label { font-size: 11.3pt; font-weight: 700; color: #14213d; letter-spacing: 0.2px; }
        .em-sec-line { flex: 1; height: 1px; background: #dcd6c8; margin-left: 6px; }
        .em-profile-text { font-size: 8.6pt; line-height: 1.52; color: #3a3f4a; text-align: justify; margin-bottom: 16px; }
        .em-projects { display: flex; flex-direction: column; gap: 10px; }
        .em-proj-card { border: 1px solid #e4ddc9; border-radius: 6px; padding: 10px 14px; background: #ffffff; }
        .em-proj-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 4px; }
        .em-proj-title { font-size: 9.6pt; font-weight: 700; color: #14213d; }
        .em-proj-title span { color: #2f9e6f; margin-right: 5px; }
        .em-proj-tag { font-size: 6.8pt; font-weight: 600; padding: 3px 8px; border-radius: 12px; background: #e8f3ec; color: #186b45; border: 1px solid #b9dfc9; }
        .em-proj-desc { font-size: 7.8pt; line-height: 1.42; color: #4a5063; margin-bottom: 4px; text-align: justify; }
        .em-proj-tech { font-size: 6.8pt; color: #8a7a4a; font-family: monospace; }
      `}</style>

      <aside className="em-sidebar">
        <div className="em-photo-wrap">
          <div className="em-photo">
            {cv.personal.photo ? (
              <img src={cv.personal.photo} alt="" />
            ) : (
              <span>{cv.personal.name ? cv.personal.name[0] : "P"}</span>
            )}
          </div>
        </div>
        <div className="em-sb-name">{cv.personal.name || "Patrice BEYELI"}</div>
        <div className="em-sb-role">{cv.title || "Développeur Web & Mobile"}</div>

        <div className="em-sb-divider" />

        <div className="em-sb-block">
          <div className="em-sb-title">Contact Direct</div>
          {cv.personal.phone && (
            <div className="em-sb-row">
              <div>
                <span className="lbl">Téléphone</span>
                <span className="txt">{cv.personal.phone}</span>
              </div>
            </div>
          )}
          {cv.personal.email && (
            <div className="em-sb-row">
              <div>
                <span className="lbl">Courriel</span>
                <span className="txt">{cv.personal.email}</span>
              </div>
            </div>
          )}
          {cv.personal.link && (
            <div className="em-sb-row">
              <div>
                <span className="lbl">Portfolio</span>
                <span className="txt">{cv.personal.link}</span>
              </div>
            </div>
          )}
          {cv.personal.location && (
            <div className="em-sb-row">
              <div>
                <span className="lbl">Adresse</span>
                <span className="txt">{cv.personal.location}</span>
              </div>
            </div>
          )}
        </div>

        {cv.skills.length > 0 && (
          <div className="em-sb-block">
            <div className="em-sb-title">Stack Technique</div>
            <div className="em-chips">
              {cv.skills.map((s) => (
                <span className="em-chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="em-sb-block">
            <div className="em-sb-title">Formation</div>
            {education.map((e) => (
              <div className="em-edu-item" key={e.id}>
                <div>{e.degree}</div>
                <div className="em-edu-sub">
                  {e.school} • {dates(e.start, e.end)}
                </div>
              </div>
            ))}
          </div>
        )}

        {cv.languages.length > 0 && (
          <div className="em-sb-block">
            <div className="em-sb-title">Langues</div>
            {cv.languages.map((l) => (
              <div className="em-lang-row" key={l}>
                <span className="em-lang-name">{l.split("—")[0]}</span>
                <span className="em-lang-lvl">{l.split("—")[1] || "Courant"}</span>
              </div>
            ))}
          </div>
        )}
      </aside>

      <main className="em-main">
        <div className="em-topline">
          <div>
            <h1 className="em-mh-name">{cv.personal.name || "BEYELI AKOU"}</h1>
            <div className="em-mh-tag">{cv.title || "Concepteur & Développeur Full-Stack"}</div>
          </div>
          <span className="em-badge">Disponible</span>
        </div>

        <div className="em-hr-name" />

        {cv.summary && (
          <>
            <div className="em-sec-title">
              <span className="em-sec-num">01</span>
              <span className="em-sec-label">Profil Professionnel</span>
              <span className="em-sec-line" />
            </div>
            <p className="em-profile-text">{cv.summary}</p>
          </>
        )}

        {experiences.length > 0 && (
          <>
            <div className="em-sec-title">
              <span className="em-sec-num">02</span>
              <span className="em-sec-label">Projets & Expériences Déployées</span>
              <span className="em-sec-line" />
            </div>
            <div className="em-projects">
              {experiences.map((exp) => (
                <div className="em-proj-card" key={exp.id}>
                  <div className="em-proj-top">
                    <div className="em-proj-title">
                      <span>◆</span> {exp.role} — {exp.company}
                    </div>
                    <span className="em-proj-tag">{dates(exp.start, exp.end)}</span>
                  </div>
                  {exp.bullets.map((b, i) => (
                    <p className="em-proj-desc" key={i}>
                      {b}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* ========================================================
   MODÈLE 3 : Juriste & Cadre ODD
   ======================================================== */
function JuristeNavy({ cv }: { cv: CV }) {
  const experiences = cv.experiences.filter((e) => e.role || e.company || e.bullets.some(Boolean));
  const education = cv.education.filter((e) => e.degree || e.school);

  return (
    <div className="jn-page">
      <style>{`
        .jn-page { width: 794px; min-height: 1123px; display: flex; background: #ffffff; color: #333333; font-family: Arial, sans-serif; }
        .jn-side { width: 274px; flex-shrink: 0; background: #1c3f61; color: #ffffff; position: relative; overflow: hidden; }
        .jn-side .halo { position: absolute; top: 0; left: 0; width: 272px; height: 272px; border-radius: 50%; background: #2c5583; }
        .jn-photo { position: absolute; top: 53px; left: 49px; width: 174px; height: 174px; border-radius: 50%; border: 3px solid #fff; overflow: hidden; background: #fff; box-shadow: 0 9px 20px rgba(10,24,40,.45); }
        .jn-photo img { width: 100%; height: 100%; object-fit: cover; }
        .jn-side-inner { position: relative; padding: 260px 30px 28px 30px; }
        .jn-side h2 { font-weight: 700; font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; margin: 18px 0 9px; padding-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,.28); }
        .jn-label { color: #d9b24a; font-weight: 600; font-size: 8.5px; letter-spacing: .06em; text-transform: uppercase; margin-top: 10px; }
        .jn-val { font-size: 11px; line-height: 1.35; margin-top: 3px; word-break: break-word; color: #f0f4f8; }
        .jn-keys { list-style: none; font-size: 11px; font-weight: 600; line-height: 1.3; }
        .jn-keys li { position: relative; padding-left: 14px; margin-bottom: 4px; }
        .jn-keys li::before { content: "▸"; position: absolute; left: 0; top: 0; font-size: 8px; color: #d9b24a; }
        .jn-bar-bg { height: 6px; border-radius: 3px; background: rgba(255,255,255,.2); margin-top: 4px; overflow: hidden; }
        .jn-bar-fill { display: block; height: 100%; background: rgba(255,255,255,.7); border-radius: 3px; }

        .jn-main { flex: 1; padding: 20px 30px 28px 30px; }
        .jn-name { font-weight: 700; font-size: 31px; line-height: 1.12; color: #1a3a5c; text-transform: uppercase; }
        .jn-sub { font-weight: 600; font-size: 14px; color: #2a5a8f; letter-spacing: .02em; text-transform: uppercase; margin-top: 10px; margin-bottom: 16px; }
        .jn-main h2 { font-weight: 700; font-size: 17.5px; color: #1a3a5c; margin: 18px 0 10px; }
        .jn-item { position: relative; padding-left: 19px; margin-bottom: 12px; }
        .jn-item::before { content: ""; position: absolute; left: 0; top: 4px; width: 9px; height: 9px; border-radius: 50%; background: #1a3a5c; }
        .jn-item::after { content: ""; position: absolute; left: 4px; top: 14px; bottom: -8px; width: 1px; background: #c3ccd8; }
        .jn-item:last-child::after { display: none; }
        .jn-head { display: flex; justify-content: space-between; align-items: baseline; }
        .jn-head b { font-size: 13.5px; font-weight: 700; color: #1a3a5c; }
        .jn-head em { font-size: 10.5px; color: #666; font-style: normal; }
        .jn-item-sub { font-style: italic; font-size: 11px; color: #2a5a8f; margin-top: 2px; }
        .jn-item ul { list-style: none; margin: 5px 0 0 0; }
        .jn-item li { position: relative; padding-left: 14px; font-size: 11px; line-height: 1.42; margin-bottom: 3px; }
        .jn-item li::before { content: "•"; position: absolute; left: 0; color: #1a3a5c; }
      `}</style>

      <aside className="jn-side">
        <div className="jn-halo" />
        <div className="jn-photo">
          {cv.personal.photo ? (
            <img src={cv.personal.photo} alt="" />
          ) : (
            <div className="w-full h-full bg-[#1c3f61] text-white flex items-center justify-center font-bold text-3xl">
              {cv.personal.name ? cv.personal.name[0] : "J"}
            </div>
          )}
        </div>
        <div className="jn-side-inner">
          <h2>Coordonnées</h2>
          {cv.personal.phone && (
            <div>
              <div className="jn-label">Téléphone</div>
              <div className="jn-val">{cv.personal.phone}</div>
            </div>
          )}
          {cv.personal.email && (
            <div>
              <div className="jn-label">Courriel</div>
              <div className="jn-val">{cv.personal.email}</div>
            </div>
          )}
          {cv.personal.location && (
            <div>
              <div className="jn-label">Adresse</div>
              <div className="jn-val">{cv.personal.location}</div>
            </div>
          )}
          {cv.personal.link && (
            <div>
              <div className="jn-label">Profil Pro</div>
              <div className="jn-val">{cv.personal.link}</div>
            </div>
          )}

          {cv.skills.length > 0 && (
            <div>
              <h2>Compétences Clés</h2>
              <ul className="jn-keys">
                {cv.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {cv.languages.length > 0 && (
            <div>
              <h2>Langues</h2>
              {cv.languages.map((l) => (
                <div key={l} style={{ marginTop: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px" }}>
                    <span>{l.split("—")[0]}</span>
                    <span style={{ opacity: 0.6 }}>{l.split("—")[1] || "Courant"}</span>
                  </div>
                  <div className="jn-bar-bg">
                    <span className="jn-bar-fill" style={{ width: languageLevel(l) }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      <main className="jn-main">
        <h1 className="jn-name">{cv.personal.name || "BEYELI AKOU"}</h1>
        <div className="jn-sub">{cv.title || "Juriste & Cadre d'Entreprise"}</div>

        {cv.summary && (
          <div>
            <h2>Profil</h2>
            <p style={{ fontSize: "12px", lineHeight: "1.52", textAlign: "justify" }}>
              {cv.summary}
            </p>
          </div>
        )}

        {experiences.length > 0 && (
          <div>
            <h2>Expérience Professionnelle</h2>
            <div>
              {experiences.map((exp) => (
                <div className="jn-item" key={exp.id}>
                  <div className="jn-head">
                    <b>{exp.role}</b>
                    <em>{dates(exp.start, exp.end)}</em>
                  </div>
                  <div className="jn-item-sub">{exp.company}</div>
                  {exp.bullets.length > 0 && (
                    <ul>
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2>Éducation</h2>
            <div>
              {education.map((edu) => (
                <div className="jn-item" key={edu.id}>
                  <div className="jn-head">
                    <b>{edu.degree}</b>
                    <em>{dates(edu.start, edu.end)}</em>
                  </div>
                  <div className="jn-item-sub">{edu.school}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ========================================================
   MODÈLE 4 : Informaticien Bold Minimal (Alfred Bernard)
   ======================================================== */
function AlfredBold({ cv }: { cv: CV }) {
  const experiences = cv.experiences.filter((e) => e.role || e.company || e.bullets.some(Boolean));
  const education = cv.education.filter((e) => e.degree || e.school);
  const nameParts = (cv.personal.name || "Alfred Bernard").split(" ");
  const firstName = nameParts[0] || "Alfred";
  const lastName = nameParts.slice(1).join(" ") || "Bernard";

  return (
    <div className="ab-page">
      <style>{`
        .ab-page { width: 794px; min-height: 1123px; position: relative; background: #ffffff; color: #222222; font-family: 'Jost', sans-serif; overflow: hidden; }
        .ab-side { position: absolute; left: 0; top: 0; width: 327px; height: 100%; min-height: 1123px; background: #222222; color: #ffffff; padding: 40px 36px; }
        .ab-photo { width: 231px; height: 231px; border-radius: 50%; overflow: hidden; background: #e3e4e4; margin-bottom: 30px; }
        .ab-photo img { width: 100%; height: 100%; object-fit: cover; }
        .ab-h { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 18px; line-height: 22px; letter-spacing: .14em; text-transform: uppercase; color: #ffffff; margin-top: 24px; margin-bottom: 8px; }
        .ab-t { font-size: 14.5px; line-height: 22px; color: #e0e0e0; }
        .ab-t p { margin-bottom: 4px; }
        
        .ab-main { margin-left: 350px; padding: 50px 36px 40px 16px; }
        .ab-name { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 58px; line-height: 64px; letter-spacing: .02em; text-transform: uppercase; color: #222222; }
        .ab-role { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 18px; line-height: 22px; text-transform: uppercase; color: #222222; margin-top: 14px; margin-bottom: 24px; }
        .ab-main-h { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 17px; line-height: 22px; letter-spacing: .02em; text-transform: uppercase; margin-top: 20px; margin-bottom: 16px; color: #222222; }
        .ab-tl-group { position: relative; padding-left: 20px; border-left: 2px solid #222222; margin-left: 6px; margin-bottom: 16px; }
        .ab-tl-group::before { content: ""; position: absolute; left: -5.5px; top: 0; width: 9px; height: 9px; border-radius: 50%; background: #222222; }
        .ab-job { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 13.5px; text-transform: uppercase; }
        .ab-meta { font-size: 12.5px; color: #555555; margin-bottom: 6px; }
        .ab-b { list-style: none; font-size: 12.5px; line-height: 19px; }
        .ab-b li { position: relative; padding-left: 14px; margin-bottom: 4px; }
        .ab-b li::before { content: ""; position: absolute; left: 1px; top: .6em; width: 4.5px; height: 4.5px; border-radius: 50%; background: #222222; }
      `}</style>

      <aside className="ab-side">
        <div className="ab-photo">
          {cv.personal.photo ? (
            <img src={cv.personal.photo} alt="" />
          ) : (
            <div className="w-full h-full bg-[#333] text-white flex items-center justify-center font-bold text-4xl">
              {firstName[0]}
            </div>
          )}
        </div>

        <div className="ab-h">Coordonnées</div>
        <div className="ab-t">
          {cv.personal.location && <p>{cv.personal.location}</p>}
          {cv.personal.email && <p>{cv.personal.email}</p>}
          {cv.personal.phone && <p>{cv.personal.phone}</p>}
          {cv.personal.link && <p>{cv.personal.link}</p>}
        </div>

        {cv.languages.length > 0 && (
          <>
            <div className="ab-h">Langues</div>
            <div className="ab-t">
              {cv.languages.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          </>
        )}

        {cv.skills.length > 0 && (
          <>
            <div className="ab-h">Compétences</div>
            <div className="ab-t">
              {cv.skills.map((s) => (
                <p key={s} style={{ marginBottom: "6px" }}>
                  {s}
                </p>
              ))}
            </div>
          </>
        )}
      </aside>

      <main className="ab-main">
        <h1 className="ab-name">
          {firstName}
          <br />
          {lastName}
        </h1>
        <div className="ab-role">{cv.title || "Informaticien"}</div>

        {experiences.length > 0 && (
          <>
            <div className="ab-main-h">Expériences professionnelles</div>
            {experiences.map((exp) => (
              <div className="ab-tl-group" key={exp.id}>
                <div className="ab-job">{exp.role}</div>
                <div className="ab-meta">
                  {exp.company} | {dates(exp.start, exp.end)}
                </div>
                {exp.bullets.length > 0 && (
                  <ul className="ab-b">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <div className="ab-main-h">Formation</div>
            {education.map((edu) => (
              <div className="ab-tl-group" key={edu.id}>
                <div className="ab-job">{edu.degree}</div>
                <div className="ab-meta">
                  {edu.school} | {dates(edu.start, edu.end)}
                </div>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
}

/* ========================================================
   MODÈLE 5 : Designer Graphique Capsules (Adeline Palmerston)
   ======================================================== */
function AdelineCapsule({ cv }: { cv: CV }) {
  const experiences = cv.experiences.filter((e) => e.role || e.company || e.bullets.some(Boolean));
  const education = cv.education.filter((e) => e.degree || e.school);
  const nameParts = (cv.personal.name || "Adeline Palmerston").split(" ");
  const firstName = nameParts[0] || "Adeline";
  const lastName = nameParts.slice(1).join(" ") || "Palmerston";

  return (
    <div className="ac-page">
      <style>{`
        .ac-page { width: 794px; min-height: 1123px; position: relative; background: #ffffff; color: #000000; font-family: 'Poppins', sans-serif; overflow: hidden; }
        .ac-top-pill { position: absolute; left: 0; top: 0; width: 282px; height: 229px; background: #323b4c; border-bottom-right-radius: 60px; }
        .ac-photo { position: absolute; left: 57px; top: 33px; width: 166px; height: 166px; border-radius: 50%; border: 3.5px solid #7d869a; overflow: hidden; background: #ffffff; z-index: 2; }
        .ac-photo img { width: 100%; height: 100%; object-fit: cover; }
        .ac-name { position: absolute; left: 325px; top: 58px; font-weight: 700; font-size: 44px; line-height: 47px; color: #323b4c; text-transform: uppercase; }
        .ac-role { position: absolute; left: 325px; top: 162px; font-size: 17px; line-height: 22px; letter-spacing: .2em; color: #323b4c; text-transform: uppercase; }
        .ac-bar { position: absolute; left: 20px; top: 248px; width: 754px; height: 57px; border-radius: 29px; background: #323b4c; color: #ffffff; font-size: 11.5px; display: flex; align-items: center; justify-content: space-around; padding: 0 20px; z-index: 3; }
        .ac-bar span { display: flex; align-items: center; gap: 8px; }
        .ac-panel { position: absolute; left: 0; top: 326px; width: 282px; height: calc(100% - 326px); min-height: 797px; background: #323b4c; border-top-right-radius: 60px; color: #ffffff; padding: 40px 30px; }
        .ac-side-h { font-weight: 700; font-size: 20px; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 6px; }
        .ac-side-rule { height: 1px; background: #ffffff; margin-bottom: 12px; }
        .ac-sw { font-size: 12.5px; line-height: 18px; margin-bottom: 14px; color: #f0f4f8; }
        .ac-sw b { font-size: 14.5px; display: block; color: #ffffff; }
        .ac-main { margin-left: 325px; padding-top: 340px; padding-right: 36px; }
        .ac-main-h { font-weight: 700; font-size: 20px; color: #323b4c; text-transform: uppercase; margin-bottom: 6px; }
        .ac-main-rule { height: 1px; background: #323b4c; margin-bottom: 14px; }
        .ac-jt { font-weight: 700; font-size: 15px; color: #1c2433; }
        .ac-meta { display: flex; justify-content: space-between; font-size: 12px; color: #555555; margin-bottom: 6px; }
        .ac-desc { font-size: 11.5px; line-height: 16px; text-align: justify; margin-bottom: 14px; color: #333333; }
      `}</style>

      <div className="ac-top-pill" />
      <div className="ac-photo">
        {cv.personal.photo ? (
          <img src={cv.personal.photo} alt="" />
        ) : (
          <div className="w-full h-full bg-[#323b4c] text-white flex items-center justify-center font-bold text-4xl">
            {firstName[0]}
          </div>
        )}
      </div>

      <h1 className="ac-name">
        {firstName}
        <br />
        {lastName}
      </h1>
      <div className="ac-role">{cv.title || "Graphic Designer"}</div>

      <div className="ac-bar">
        {cv.personal.phone && <span>📞 {cv.personal.phone}</span>}
        {cv.personal.email && <span>✉️ {cv.personal.email}</span>}
        {cv.personal.link && <span>🌐 {cv.personal.link}</span>}
        {cv.personal.location && <span>📍 {cv.personal.location}</span>}
      </div>

      <aside className="ac-panel">
        {education.length > 0 && (
          <div>
            <div className="ac-side-h">Formation</div>
            <div className="ac-side-rule" />
            {education.map((edu) => (
              <div className="ac-sw" key={edu.id}>
                <b>{edu.degree}</b>
                {edu.school}
                <br />
                {dates(edu.start, edu.end)}
              </div>
            ))}
          </div>
        )}

        {cv.skills.length > 0 && (
          <div style={{ marginTop: "24px" }}>
            <div className="ac-side-h">Compétences</div>
            <div className="ac-side-rule" />
            <div style={{ fontSize: "13px", lineHeight: "26px" }}>
              {cv.skills.map((s) => (
                <div key={s}>{s}</div>
              ))}
            </div>
          </div>
        )}

        {cv.languages.length > 0 && (
          <div style={{ marginTop: "24px" }}>
            <div className="ac-side-h">Langues</div>
            <div className="ac-side-rule" />
            <div style={{ fontSize: "13px", lineHeight: "24px" }}>
              {cv.languages.map((l) => (
                <div key={l}>{l}</div>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className="ac-main">
        {cv.summary && (
          <div style={{ marginBottom: "20px" }}>
            <div className="ac-main-h">À Propos</div>
            <div className="ac-main-rule" />
            <p className="ac-desc">{cv.summary}</p>
          </div>
        )}

        {experiences.length > 0 && (
          <div>
            <div className="ac-main-h">Expérience</div>
            <div className="ac-main-rule" />
            {experiences.map((exp) => (
              <div key={exp.id} style={{ marginBottom: "14px" }}>
                <div className="ac-jt">{exp.role}</div>
                <div className="ac-meta">
                  <span>{exp.company}</span>
                  <span>{dates(exp.start, exp.end)}</span>
                </div>
                {exp.bullets.map((b, i) => (
                  <p className="ac-desc" key={i}>
                    {b}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

/* ========================================================
   DISPATCHEUR PRINCIPAL
   ======================================================== */
export function CVTemplate({ cv, template }: { cv: CV; template: TemplateId }) {
  switch (template) {
    case "emerald-tech":
      return <EmeraldTech cv={cv} />;
    case "juriste-navy":
      return <JuristeNavy cv={cv} />;
    case "alfred-bold":
      return <AlfredBold cv={cv} />;
    case "adeline-capsule":
      return <AdelineCapsule cv={cv} />;
    case "french-blue":
    default:
      return <FrenchBlue cv={cv} />;
  }
}
