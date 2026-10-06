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
                    <div className="cv-blue-language" key={item}>
                      <span>{name}</span>
                      <i>
                        <b style={{ width: languageLevel(item) }} />
                      </i>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
          {cv.skills.length > 0 && (
            <section>
              <h2>Compétences</h2>
              <ul>
                {cv.skills.filter(Boolean).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}
          {cv.interests.length > 0 && (
            <section>
              <h2>Centres d’intérêt</h2>
              <ul>
                {cv.interests.filter(Boolean).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
                  <div>
                    <h3>{item.degree}</h3>
                    <p>{item.school}</p>
                  </div>
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
                        {item.bullets.filter(Boolean).map((bullet, idx) => (
                          <li key={`${item.id}-${idx}`}>{bullet}</li>
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
   MODÈLE 2 : Émeraude & Nuit Tech
   ======================================================== */
function EmeraldTech({ cv }: { cv: CV }) {
  const experiences = cv.experiences.filter((e) => e.role || e.company || e.bullets.some(Boolean));
  const education = cv.education.filter((e) => e.degree || e.school);
  const nameParts = (cv.personal.name || "Votre Nom").trim().split(" ");
  const firstName = nameParts.slice(0, 2).join(" ");
  const restName = nameParts.slice(2).join(" ");

  return (
    <div className="em-page">
      <style>{`
        .em-page { width: 794px; height: 1123px; display: flex; overflow: hidden; position: relative; background: #faf8f3; color: #2b2b2b; font-family: 'Poppins', sans-serif; text-align: left; }
        .em-page * { box-sizing: border-box; margin: 0; padding: 0; }
        .em-sidebar { width: 257px; height: 1123px; background: linear-gradient(180deg, #14213d 0%, #101a33 100%); color: #e9edf5; padding: 36px 26px; position: relative; flex-shrink: 0; }
        .em-sidebar::after { content: ""; position: absolute; top: 0; right: 0; width: 3px; height: 100%; background: linear-gradient(180deg, #2f9e6f 0%, #c9932e 100%); }
        .em-photo-wrap { width: 110px; height: 110px; margin: 0 auto 16px; border-radius: 50%; padding: 4px; background: conic-gradient(from 45deg, #2f9e6f, #c9932e, #2f9e6f); }
        .em-photo { width: 100%; height: 100%; border-radius: 50%; background: #1f2a44; overflow: hidden; display: flex; align-items: center; justify-content: center; color: #faf8f3; font-family: 'Lora', serif; font-size: 26px; font-weight: 700; border: 3px solid #14213d; }
        .em-photo img { width: 100%; height: 100%; object-fit: cover; }
        .em-side-name { text-align: center; font-family: 'Lora', serif; font-size: 14px; font-weight: 700; color: #faf8f3; margin-bottom: 2px; }
        .em-side-role { text-align: center; font-size: 10px; color: #2f9e6f; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; margin-bottom: 18px; }
        .em-side-block { margin-bottom: 16px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08); }
        .em-side-title { font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: #c9932e; font-weight: 700; margin-bottom: 8px; }
        .em-contact-item { font-size: 9.5px; margin-bottom: 5px; color: #d0d7e5; word-break: break-all; }
        .em-contact-label { font-size: 8px; text-transform: uppercase; color: #8896b0; font-weight: 600; }
        .em-chips { display: flex; flex-wrap: wrap; gap: 4px; }
        .em-chip { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #e9edf5; padding: 2px 6px; border-radius: 4px; font-size: 8.5px; font-family: monospace; }
        .em-edu-item { margin-bottom: 8px; }
        .em-edu-deg { font-size: 10px; font-weight: 600; color: #ffffff; }
        .em-edu-sch { font-size: 8.5px; color: #a4b3cc; }
        .em-lang-item { font-size: 9px; margin-bottom: 3px; color: #d0d7e5; }
        .em-main { flex: 1; padding: 32px 30px; display: flex; flex-direction: column; overflow: hidden; }
        .em-top-badge { display: inline-block; font-size: 8.5px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 700; color: #2f9e6f; background: rgba(47,158,111,0.12); padding: 3px 8px; border-radius: 12px; margin-bottom: 8px; }
        .em-main-name { font-family: 'Lora', serif; font-size: 26px; line-height: 1.15; color: #14213d; font-weight: 700; text-transform: uppercase; }
        .em-main-name span { color: #2f9e6f; }
        .em-main-role { font-size: 12px; color: #667085; font-weight: 500; margin-top: 4px; margin-bottom: 14px; }
        .em-highlight { background: #eaf6f0; border-left: 3px solid #2f9e6f; padding: 10px 12px; border-radius: 0 6px 6px 0; margin-bottom: 16px; font-size: 10px; line-height: 1.5; color: #1e3a2f; }
        .em-section-head { display: flex; align-items: center; gap: 8px; margin: 12px 0 10px; }
        .em-sec-badge { background: #14213d; color: #faf8f3; font-size: 8.5px; font-weight: 700; padding: 2px 6px; border-radius: 4px; }
        .em-sec-title { font-family: 'Lora', serif; font-size: 13px; font-weight: 700; color: #14213d; text-transform: uppercase; letter-spacing: 0.05em; }
        .em-sec-line { flex: 1; height: 1px; background: #e2ded5; }
        .em-proj-card { background: #ffffff; border: 1px solid #e4ddc9; border-radius: 6px; padding: 8px 10px; margin-bottom: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.03); }
        .em-proj-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; }
        .em-proj-name { font-size: 11px; font-weight: 700; color: #14213d; }
        .em-proj-period { font-size: 9px; color: #8896b0; font-style: italic; }
        .em-proj-desc { font-size: 9.5px; line-height: 1.45; color: #4a5568; }
      `}</style>

      <aside className="em-sidebar">
        <div className="em-photo-wrap">
          <div className="em-photo">
            {cv.personal.photo ? (
              <img src={cv.personal.photo} alt="" />
            ) : (
              <span>{firstName[0] || "P"}</span>
            )}
          </div>
        </div>
        <div className="em-side-name">{cv.personal.name || "Patrice BEYELI"}</div>
        <div className="em-side-role">{cv.title ? cv.title.split("—")[0] : "Dév Web"}</div>

        <div className="em-side-block">
          <div className="em-side-title">Contact Direct</div>
          {cv.personal.phone && (
            <div className="em-contact-item">
              <div className="em-contact-label">Téléphone</div>
              {cv.personal.phone}
            </div>
          )}
          {cv.personal.email && (
            <div className="em-contact-item">
              <div className="em-contact-label">Courriel</div>
              {cv.personal.email}
            </div>
          )}
          {cv.personal.link && (
            <div className="em-contact-item">
              <div className="em-contact-label">Portfolio</div>
              {cv.personal.link}
            </div>
          )}
          {cv.personal.location && (
            <div className="em-contact-item">
              <div className="em-contact-label">Adresse</div>
              {cv.personal.location}
            </div>
          )}
        </div>

        {cv.skills.length > 0 && (
          <div className="em-side-block">
            <div className="em-side-title">Stack Technique</div>
            <div className="em-chips">
              {cv.skills.slice(0, 11).map((s) => (
                <span className="em-chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="em-side-block">
            <div className="em-side-title">Formation</div>
            {education.map((e) => (
              <div className="em-edu-item" key={e.id}>
                <div className="em-edu-deg">{e.degree}</div>
                <div className="em-edu-sch">
                  {e.school} • {dates(e.start, e.end)}
                </div>
              </div>
            ))}
          </div>
        )}

        {cv.languages.length > 0 && (
          <div className="em-side-block">
            <div className="em-side-title">Langues</div>
            {cv.languages.map((l) => (
              <div className="em-lang-item" key={l}>
                {l}
              </div>
            ))}
          </div>
        )}
      </aside>

      <main className="em-main">
        <div>
          <span className="em-top-badge">Profil Développeur &amp; Juriste</span>
          <h1 className="em-main-name">
            {firstName} <span>{restName}</span>
          </h1>
          <div className="em-main-role">{cv.title}</div>
        </div>

        {cv.summary && <div className="em-highlight">{cv.summary}</div>}

        <div className="em-section-head">
          <span className="em-sec-badge">01</span>
          <span className="em-sec-title">Projets &amp; Réalisations Déployés</span>
          <span className="em-sec-line" />
        </div>

        <div>
          {experiences.map((exp) => (
            <div className="em-proj-card" key={exp.id}>
              <div className="em-proj-head">
                <span className="em-proj-name">{exp.company || exp.role}</span>
                <span className="em-proj-period">{dates(exp.start, exp.end)}</span>
              </div>
              <p className="em-proj-desc">
                {exp.bullets[0] ||
                  `${exp.role} chez ${exp.company}. Conception et réalisation de solutions sur mesure.`}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/* ========================================================
   MODÈLE 3 : Juriste & Cadre ODD (Navy & Halo Doré)
   ======================================================== */
function JuristeNavy({ cv }: { cv: CV }) {
  const experiences = cv.experiences.filter((e) => e.role || e.company || e.bullets.some(Boolean));
  const education = cv.education.filter((e) => e.degree || e.school);

  return (
    <div className="jn-page">
      <style>{`
        .jn-page { width: 794px; height: 1123px; display: flex; background: #fff; overflow: hidden; position: relative; font-family: 'Poppins', sans-serif; text-align: left; color: #333; }
        .jn-page * { box-sizing: border-box; margin: 0; padding: 0; }
        .jn-side { width: 274px; flex: none; background: #1c3f61; color: #fff; position: relative; overflow: hidden; }
        .jn-halo { position: absolute; top: 0; left: 0; width: 272px; height: 272px; border-radius: 50%; background: #2c5583; }
        .jn-photo { position: absolute; top: 46px; left: 50px; width: 174px; height: 174px; border-radius: 50%; border: 3px solid #fff; overflow: hidden; background: #fff; box-shadow: 0 9px 20px rgba(10,24,40,.45); }
        .jn-photo img { width: 100%; height: 100%; object-fit: cover; }
        .jn-photo-fallback { width: 100%; height: 100%; display: grid; place-items: center; background: #1c3f61; color: #fff; font-size: 32px; font-weight: 700; }
        .jn-side-inner { position: relative; padding: 242px 30px 24px; }
        .jn-side h2 { font-weight: 700; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; margin: 14px 0 6px; padding-bottom: 4px; border-bottom: 1px solid rgba(255,255,255,.28); color: #fff; }
        .jn-label { color: #d9b24a; font-weight: 600; font-size: 8px; letter-spacing: .06em; text-transform: uppercase; margin-top: 8px; }
        .jn-value { font-size: 10px; line-height: 1.35; margin-top: 2px; word-break: break-all; color: #fff; }
        .jn-keys { list-style: none; font-size: 9.5px; font-weight: 500; line-height: 1.3; }
        .jn-keys li { position: relative; padding-left: 14px; margin-bottom: 3px; }
        .jn-keys li::before { content: "▸"; position: absolute; left: 0; top: 0; font-size: 9px; color: #d9b24a; }
        .jn-lang { margin-top: 8px; }
        .jn-lang-row { display: flex; justify-content: space-between; align-items: baseline; font-size: 9.5px; color: rgba(255,255,255,.9); }
        .jn-lang-row i { font-size: 8px; color: rgba(255,255,255,.6); font-style: italic; }
        .jn-bar { height: 5px; border-radius: 3px; background: rgba(255,255,255,.2); margin-top: 3px; overflow: hidden; }
        .jn-bar span { display: block; height: 100%; background: #d9b24a; border-radius: 3px; }
        .jn-main { flex: 1; padding: 24px 28px; }
        .jn-main h1 { font-size: 26px; font-weight: 700; line-height: 1.15; color: #1a3a5c; text-transform: uppercase; }
        .jn-subtitle { font-size: 13px; font-weight: 600; color: #2a5a8f; text-transform: uppercase; margin-top: 6px; }
        .jn-main h2 { font-size: 15px; font-weight: 700; color: #1a3a5c; margin: 16px 0 8px; text-transform: uppercase; border-bottom: 1.5px solid #1a3a5c; padding-bottom: 3px; }
        .jn-profile { font-size: 10.5px; line-height: 1.5; text-align: justify; color: #444; }
        .jn-item { position: relative; padding-left: 16px; margin-bottom: 10px; }
        .jn-item::before { content: ""; position: absolute; left: 0; top: 5px; width: 7px; height: 7px; border-radius: 50%; background: #1a3a5c; }
        .jn-item::after { content: ""; position: absolute; left: 3px; top: 12px; bottom: -8px; width: 1px; background: #c3ccd8; }
        .jn-item.last::after { display: none; }
        .jn-head { display: flex; justify-content: space-between; align-items: baseline; }
        .jn-head b { font-size: 12px; font-weight: 700; color: #1a3a5c; }
        .jn-head em { font-size: 9.5px; color: #666; font-style: normal; }
        .jn-sub { font-size: 10px; color: #2a5a8f; font-style: italic; }
        .jn-bullets { list-style: none; margin-top: 4px; }
        .jn-bullets li { position: relative; padding-left: 12px; font-size: 10px; line-height: 1.4; color: #444; margin-bottom: 2px; }
        .jn-bullets li::before { content: "•"; position: absolute; left: 0; color: #1a3a5c; }
      `}</style>

      <aside className="jn-side">
        <div className="jn-halo" />
        <div className="jn-photo">
          {cv.personal.photo ? (
            <img src={cv.personal.photo} alt="" />
          ) : (
            <div className="jn-photo-fallback">
              {cv.personal.name.slice(0, 2).toUpperCase() || "BA"}
            </div>
          )}
        </div>

        <div className="jn-side-inner">
          <div className="jn-coord">
            <h2 style={{ borderBottom: 0, marginTop: 0 }}>Coordonnées</h2>
            {cv.personal.phone && (
              <>
                <div className="jn-label">Téléphone</div>
                <div className="jn-value">{cv.personal.phone}</div>
              </>
            )}
            {cv.personal.email && (
              <>
                <div className="jn-label">Courriel</div>
                <div className="jn-value">{cv.personal.email}</div>
              </>
            )}
            {cv.personal.link && (
              <>
                <div className="jn-label">Portfolio / Lien</div>
                <div className="jn-value">{cv.personal.link}</div>
              </>
            )}
            {cv.personal.location && (
              <>
                <div className="jn-label">Adresse</div>
                <div className="jn-value">{cv.personal.location}</div>
              </>
            )}
          </div>

          {cv.skills.length > 0 && (
            <>
              <h2>Compétences clés</h2>
              <ul className="jn-keys">
                {cv.skills.slice(0, 10).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </>
          )}

          {cv.languages.length > 0 && (
            <>
              <h2>Langues</h2>
              {cv.languages.map((l) => (
                <div className="jn-lang" key={l}>
                  <div className="jn-lang-row">
                    <span>{(l.split("—")[0] ?? "").trim()}</span>
                    <i>{l.includes("—") ? (l.split("—")[1] ?? "").trim() : "bon niveau"}</i>
                  </div>
                  <div className="jn-bar">
                    <span style={{ width: languageLevel(l) }} />
                  </div>
                </div>
              ))}
            </>
          )}

          {cv.interests.length > 0 && (
            <>
              <h2>Centres d'intérêt</h2>
              <ul className="jn-keys" style={{ marginTop: 4 }}>
                {cv.interests.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </aside>

      <main className="jn-main">
        <h1>{cv.personal.name || "BEYELI AKOU GNIMDOU PATRICE"}</h1>
        <div className="jn-subtitle">{cv.title || "Juriste environnementaliste"}</div>

        {cv.summary && (
          <>
            <h2>Profil</h2>
            <p className="jn-profile">{cv.summary}</p>
          </>
        )}

        {experiences.length > 0 && (
          <>
            <h2>Expérience professionnelle</h2>
            {experiences.map((exp, idx) => (
              <div
                className={`jn-item ${idx === experiences.length - 1 ? "last" : ""}`}
                key={exp.id}
              >
                <div className="jn-head">
                  <b>{exp.role}</b>
                  <em>{dates(exp.start, exp.end)}</em>
                </div>
                {exp.company && <div className="jn-sub">{exp.company}</div>}
                {exp.bullets.length > 0 && (
                  <ul className="jn-bullets">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <h2>Formation</h2>
            {education.map((edu, idx) => (
              <div
                className={`jn-item ${idx === education.length - 1 ? "last" : ""}`}
                key={edu.id}
              >
                <div className="jn-head">
                  <b>{edu.degree}</b>
                  <em>{dates(edu.start, edu.end)}</em>
                </div>
                <div className="jn-sub">{edu.school}</div>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
}

/* ========================================================
   MODÈLE 4 : Informaticien Bold Minimal (Noir #222)
   ======================================================== */
function AlfredBold({ cv }: { cv: CV }) {
  const experiences = cv.experiences.filter((e) => e.role || e.company || e.bullets.some(Boolean));
  const education = cv.education.filter((e) => e.degree || e.school);
  const nameParts = (cv.personal.name || "Alfred Bernard").trim().split(" ");
  const first = nameParts[0] || "Alfred";
  const last = nameParts.slice(1).join(" ") || "Bernard";

  return (
    <div className="ab-page">
      <style>{`
        .ab-page { position: relative; width: 794px; height: 1123px; background: #fff; overflow: hidden; font-family: 'Jost', sans-serif; color: #222; text-align: left; }
        .ab-page * { box-sizing: border-box; margin: 0; padding: 0; }
        .ab-side { position: absolute; left: 0; top: 0; width: 310px; height: 1123px; background: #222; color: #fff; padding: 40px 32px; }
        .ab-photo { width: 190px; height: 190px; border-radius: 50%; overflow: hidden; background: #333; margin: 0 auto 30px; border: 4px solid #fff; }
        .ab-photo img { width: 100%; height: 100%; object-fit: cover; }
        .ab-photo-fb { width: 100%; height: 100%; display: grid; place-items: center; color: #fff; font-size: 38px; font-family: 'Montserrat', sans-serif; font-weight: 800; }
        .ab-side-h { font-family: 'Montserrat', sans-serif; font-weight: 800; text-transform: uppercase; font-size: 13px; letter-spacing: .12em; color: #fff; margin: 20px 0 8px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 4px; }
        .ab-side-t { font-size: 11.5px; line-height: 1.6; color: #e0e0e0; }
        .ab-side-t p { margin-bottom: 4px; }
        .ab-main { position: absolute; left: 345px; top: 40px; right: 35px; }
        .ab-h1 { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 48px; line-height: 1.05; text-transform: uppercase; color: #222; letter-spacing: .02em; }
        .ab-job { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 14px; text-transform: uppercase; color: #555; margin-top: 10px; margin-bottom: 24px; letter-spacing: .08em; }
        .ab-sec-h { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 14px; text-transform: uppercase; color: #222; margin: 18px 0 10px; letter-spacing: .06em; border-bottom: 2px solid #222; padding-bottom: 4px; }
        .ab-item { position: relative; padding-left: 18px; margin-bottom: 14px; }
        .ab-item::before { content: ""; position: absolute; left: 0; top: 5px; width: 7px; height: 7px; border-radius: 50%; background: #222; }
        .ab-item::after { content: ""; position: absolute; left: 3px; top: 12px; bottom: -8px; width: 1px; background: #222; }
        .ab-item.last::after { display: none; }
        .ab-item-title { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 12.5px; text-transform: uppercase; color: #222; }
        .ab-item-meta { font-size: 10.5px; color: #666; margin: 2px 0 4px; }
        .ab-item-bullets { list-style: none; font-size: 10.5px; line-height: 1.45; color: #333; }
        .ab-item-bullets li { position: relative; padding-left: 12px; margin-bottom: 3px; }
        .ab-item-bullets li::before { content: "•"; position: absolute; left: 0; }
      `}</style>

      <aside className="ab-side">
        <div className="ab-photo">
          {cv.personal.photo ? (
            <img src={cv.personal.photo} alt="" />
          ) : (
            <div className="ab-photo-fb">{first[0]}</div>
          )}
        </div>

        <div className="ab-side-h">Coordonnées</div>
        <div className="ab-side-t">
          {cv.personal.location && <p>{cv.personal.location}</p>}
          {cv.personal.email && <p>{cv.personal.email}</p>}
          {cv.personal.phone && <p>{cv.personal.phone}</p>}
          {cv.personal.link && <p>{cv.personal.link}</p>}
        </div>

        {cv.languages.length > 0 && (
          <>
            <div className="ab-side-h">Langues</div>
            <div className="ab-side-t">
              {cv.languages.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          </>
        )}

        {cv.skills.length > 0 && (
          <>
            <div className="ab-side-h">Compétences</div>
            <div className="ab-side-t">
              {cv.skills.slice(0, 6).map((s) => (
                <p key={s}>{s}</p>
              ))}
            </div>
          </>
        )}

        {cv.interests.length > 0 && (
          <>
            <div className="ab-side-h">Centres d'intérêt</div>
            <div className="ab-side-t">
              {cv.interests.map((i) => (
                <p key={i}>{i}</p>
              ))}
            </div>
          </>
        )}
      </aside>

      <main className="ab-main">
        <h1 className="ab-h1">
          {first}
          <br />
          {last}
        </h1>
        <div className="ab-job">{cv.title || "Informaticien"}</div>

        {experiences.length > 0 && (
          <>
            <div className="ab-sec-h">Expériences professionnelles</div>
            {experiences.map((exp, idx) => (
              <div
                className={`ab-item ${idx === experiences.length - 1 ? "last" : ""}`}
                key={exp.id}
              >
                <div className="ab-item-title">{exp.role}</div>
                <div className="ab-item-meta">
                  {exp.company} | {dates(exp.start, exp.end)}
                </div>
                {exp.bullets.length > 0 && (
                  <ul className="ab-item-bullets">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <div className="ab-sec-h" style={{ marginTop: 24 }}>
              Formations
            </div>
            {education.map((edu, idx) => (
              <div
                className={`ab-item ${idx === education.length - 1 ? "last" : ""}`}
                key={edu.id}
              >
                <div className="ab-item-title">{edu.degree}</div>
                <div className="ab-item-meta">
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
   MODÈLE 5 : Designer Graphique & Capsules (Adeline Palmerston)
   ======================================================== */
function AdelineCapsule({ cv }: { cv: CV }) {
  const experiences = cv.experiences.filter((e) => e.role || e.company || e.bullets.some(Boolean));
  const education = cv.education.filter((e) => e.degree || e.school);

  return (
    <div className="ac-page">
      <style>{`
        .ac-page { position: relative; width: 794px; height: 1123px; background: #fff; overflow: hidden; font-family: 'Bricolage Grotesque', sans-serif; text-align: left; color: #000; }
        .ac-page * { box-sizing: border-box; margin: 0; padding: 0; }
        .ac-top { position: absolute; left: 0; top: 0; width: 282px; height: 215px; background: #323b4c; border-bottom-right-radius: 60px; }
        .ac-photo { position: absolute; left: 57px; top: 25px; width: 160px; height: 160px; border-radius: 50%; border: 3.5px solid #7d869a; overflow: hidden; background: #fff; }
        .ac-photo img { width: 100%; height: 100%; object-fit: cover; }
        .ac-photo-fb { width: 100%; height: 100%; display: grid; place-items: center; color: #323b4c; font-size: 32px; font-weight: 700; }
        .ac-name { position: absolute; left: 320px; top: 40px; font-weight: 700; font-size: 38px; line-height: 1.1; color: #323b4c; text-transform: uppercase; }
        .ac-role { position: absolute; left: 320px; top: 135px; font-size: 15px; letter-spacing: .2em; color: #323b4c; text-transform: uppercase; font-weight: 600; }
        .ac-bar { position: absolute; left: 20px; top: 215px; width: 754px; height: 50px; border-radius: 25px; background: #323b4c; color: #fff; font-size: 11px; display: flex; align-items: center; justify-content: space-around; padding: 0 20px; }
        .ac-bar-item { display: flex; align-items: center; gap: 6px; }
        .ac-panel { position: absolute; left: 0; top: 290px; width: 282px; height: 833px; background: #323b4c; border-top-right-radius: 60px; color: #fff; padding: 40px 30px; }
        .ac-side-h { font-weight: 700; font-size: 15px; letter-spacing: .08em; text-transform: uppercase; border-bottom: 1px solid #fff; padding-bottom: 4px; margin: 16px 0 8px; }
        .ac-side-t { font-size: 11px; line-height: 1.45; color: #d0d7e5; margin-bottom: 10px; }
        .ac-side-t b { display: block; color: #fff; font-size: 12px; margin-bottom: 2px; }
        .ac-main { position: absolute; left: 320px; top: 290px; right: 30px; }
        .ac-main-h { font-weight: 700; font-size: 16px; letter-spacing: .08em; text-transform: uppercase; color: #323b4c; border-bottom: 1.5px solid #323b4c; padding-bottom: 4px; margin: 16px 0 8px; }
        .ac-about { font-size: 10.5px; line-height: 1.5; color: #444; text-align: justify; margin-bottom: 12px; }
        .ac-exp-item { margin-bottom: 12px; }
        .ac-exp-head { display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 700; color: #323b4c; }
        .ac-exp-date { font-size: 10.5px; font-weight: normal; color: #666; }
        .ac-exp-co { font-size: 11px; color: #666; margin-bottom: 3px; font-style: italic; }
        .ac-exp-text { font-size: 10px; line-height: 1.4; color: #444; }
        .ac-ref { display: flex; gap: 30px; font-size: 10.5px; line-height: 1.4; color: #444; margin-top: 6px; }
      `}</style>

      <div className="ac-top" />
      <div className="ac-photo">
        {cv.personal.photo ? (
          <img src={cv.personal.photo} alt="" />
        ) : (
          <div className="ac-photo-fb">{cv.personal.name.slice(0, 2).toUpperCase() || "AP"}</div>
        )}
      </div>

      <div className="ac-name">{cv.personal.name || "Adeline Palmerston"}</div>
      <div className="ac-role">{cv.title || "Graphic Designer"}</div>

      <div className="ac-bar">
        {cv.personal.phone && <div className="ac-bar-item">📞 {cv.personal.phone}</div>}
        {cv.personal.email && <div className="ac-bar-item">✉️ {cv.personal.email}</div>}
        {cv.personal.link && <div className="ac-bar-item">🌐 {cv.personal.link}</div>}
        {cv.personal.location && <div className="ac-bar-item">📍 {cv.personal.location}</div>}
      </div>

      <aside className="ac-panel">
        {education.length > 0 && (
          <>
            <div className="ac-side-h" style={{ marginTop: 0 }}>
              Formation
            </div>
            {education.map((e) => (
              <div className="ac-side-t" key={e.id}>
                <b>{e.degree}</b>
                {e.school}
                <br />
                {dates(e.start, e.end)}
              </div>
            ))}
          </>
        )}

        {cv.skills.length > 0 && (
          <>
            <div className="ac-side-h">Compétences</div>
            <div className="ac-side-t">
              {cv.skills.map((s) => (
                <div key={s}>• {s}</div>
              ))}
            </div>
          </>
        )}

        {cv.languages.length > 0 && (
          <>
            <div className="ac-side-h">Langues</div>
            <div className="ac-side-t">
              {cv.languages.map((l) => (
                <div key={l}>• {l}</div>
              ))}
            </div>
          </>
        )}
      </aside>

      <main className="ac-main">
        {cv.summary && (
          <>
            <div className="ac-main-h" style={{ marginTop: 0 }}>
              À propos de moi
            </div>
            <p className="ac-about">{cv.summary}</p>
          </>
        )}

        {experiences.length > 0 && (
          <>
            <div className="ac-main-h">Expériences</div>
            {experiences.map((exp) => (
              <div className="ac-exp-item" key={exp.id}>
                <div className="ac-exp-head">
                  <span>{exp.role}</span>
                  <span className="ac-exp-date">{dates(exp.start, exp.end)}</span>
                </div>
                <div className="ac-exp-co">{exp.company}</div>
                <div className="ac-exp-text">
                  {exp.bullets[0] || "Réalisation et suivi des livrables graphiques."}
                </div>
              </div>
            ))}
          </>
        )}

        <div className="ac-main-h">Références professionnelles</div>
        <div className="ac-ref">
          <div>
            <b>Directeur de Création</b>
            <br />
            Aldenaire &amp; Partners
            <br />
            contact@aldenaire.com
          </div>
          <div>
            <b>Responsable Studio</b>
            <br />
            Warner &amp; Spencer
            <br />
            direction@warnerspencer.com
          </div>
        </div>
      </main>
    </div>
  );
}

/* ========================================================
   COMMUTATEUR UNIFIÉ DES MODÈLES
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