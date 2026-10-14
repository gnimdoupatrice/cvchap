import type { CV, TemplateId } from "@/lib/cv/types";
import {
  SachaDubois,
  MichaelHenson,
  ElviraMontanez,
  EmmaBrooks,
  DrewFeig,
} from "./templates-extra";
import { DanielMorton, RichardSanchez, DanielGallego, DaniMartinez } from "./templates-new";
import { SanchezProduct, AdelinePalmerston } from "./templates-fidele";

export const templateMeta: {
  id: TemplateId;
  name: string;
  hint: string;
  category: string;
}[] = [
  {
    id: "emerald-tech",
    name: "Développeur Web & Mobile",
    hint: "Bleu roi & or, halo circulaire, stack technique & projets déployés",
    category: "Tech & Web",
  },
  {
    id: "juriste-navy",
    name: "Juriste & Cadre ODD",
    hint: "Bleu profond & or noble, timeline institutionnelle & compétences transversales",
    category: "Droit & Conseil",
  },
  {
    id: "alfred-bold",
    name: "Informaticien Bold Minimal",
    hint: "Noir #222 contrasté, typographie XXL Montserrat & timeline épurée",
    category: "Ingénierie",
  },
  {
    id: "adeline-capsule",
    name: "Designer Graphique Capsules",
    hint: "Double capsule arrondie 60px, barre de contact pilule & références",
    category: "Créatif & Studio",
  },
  {
    id: "sacha-dubois",
    name: "Bleu Moderne — Sacha Dubois",
    hint: "Bleu profond #0f375c, League Spartan & timeline projets",
    category: "Management",
  },
  {
    id: "michael-henson",
    name: "Commercial & Vente — Michael Henson",
    hint: "Colonne droite marine #253452, liseré doré & médaillon photo",
    category: "Commerce",
  },
  {
    id: "elvira-montanez",
    name: "Santé & Médical — Dr. Elvira Montanez",
    hint: "Bandeau océan #2878ab, colonne menthe & puces circulaires",
    category: "Médical",
  },
  {
    id: "emma-brooks",
    name: "Architecte d'Intérieur — Emma Brooks",
    hint: "Fond crème #f7f3eb, monogrammes géants filigranés & terracotta",
    category: "Architecture",
  },
  {
    id: "drew-feig",
    name: "Marketing Manager — Drew Feig",
    hint: "Thème sombre immersif #313657, barres de compétences & lisibilité maximale",
    category: "Marketing",
  },
  {
    id: "daniel-morton",
    name: "Design Graphique — Daniel Morton",
    hint: "Vert forêt & turquoise, médaillon photo et timeline",
    category: "Jeune diplômé",
  },
  {
    id: "richard-sanchez",
    name: "Marketing Manager — Richard Sanchez",
    hint: "Colonne ardoise, triangle bleu ciel & références",
    category: "Marketing",
  },
  {
    id: "daniel-gallego",
    name: "Graphic Designer — Daniel Gallego",
    hint: "Noir profond, vagues orange & fond crème",
    category: "Créatif & Studio",
  },
  {
    id: "dani-martinez",
    name: "Marketing Manager — Dani Martinez",
    hint: "Noir & blanc minimaliste, titre XXL Montserrat",
    category: "Management",
  },
  {
    id: "sanchez-product",
    name: "Product Designer — Richard Sanchez",
    hint: "Colonne noire, bandeau bleu roi & capsules",
    category: "Design",
  },
  {
    id: "adeline-palmerston",
    name: "Graphics Designer — Adeline Palmerston",
    hint: "Jaune soleil, bleu nuit & timeline",
    category: "Créatif & Studio",
  },
];

const dates = (start: string, end: string) => [start, end].filter(Boolean).join(" – ");

const parseLangWithPercent = (l: string) => {
  const [name, rest = ""] = l.split("—").map((x) => x.trim());
  const m = rest.match(/\((\d+)\s*%\)/);
  const percentMatch = rest.match(/(\d+)\s*%/);
  const width = m ? `${m[1]}%` : percentMatch ? `${percentMatch[1]}%` : "65%";
  const level = rest.replace(/\(?\d+\s*%\)?/, "").trim() || rest;
  return { name, level, width };
};

/* ========================================================
   MODÈLE 1 : Développeur Web et Mobile (Beyeli Patrice)
   ======================================================== */
function EmeraldTech({ cv }: { cv: CV }) {
  const experiences = cv.experiences.filter((e) => e.role || e.company || e.bullets.some(Boolean));
  const education = cv.education.filter((e) => e.degree || e.school);
  const highlights = (cv.highlights ?? []).filter((h) => h.title || h.text);

  return (
    <div className="dev-page">
      <style>{`
        .dev-page {
          --navy: #1c3f61;
          --navy-title: #1a3a5c;
          --circle: #2c5583;
          --gold: #d9b24a;
          --blue-link: #2a5a8f;
          --text: #2c3e50;
          --muted: #64748b;
          --bar-bg: rgba(255,255,255,.25);
          --font-head: "Poppins", "Segoe UI", Arial, sans-serif;
          --font-body: "Liberation Sans", Arial, Helvetica, sans-serif;
          width: 794px; min-height: 1123px; display: flex; background: #fff;
          font-family: var(--font-body); color: var(--text);
          -webkit-print-color-adjust: exact; print-color-adjust: exact; text-align: left;
          position: relative; overflow: hidden;
        }
        .dev-page *, .dev-page *::before, .dev-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        .dev-side { width: 274px; min-height: 1123px; flex: none; background: var(--navy); color: #fff; position: relative; overflow: hidden; }
        .dev-halo { position: absolute; top: 0; left: 0; width: 272px; height: 272px; border-radius: 50%; background: var(--circle); }
        .dev-photo { position: absolute; top: 48px; left: 49px; width: 174px; height: 174px; border-radius: 50%; border: 3px solid #fff; overflow: hidden; background: #fff; box-shadow: 0 9px 20px rgba(10,24,40,.45); }
        .dev-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .dev-initial { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #2c5583; color: #fff; font-family: var(--font-head); font-weight: 700; font-size: 56px; }
        .dev-side-inner { position: relative; padding: 250px 28px 24px 28px; display: flex; flex-direction: column; justify-content: space-between; min-height: 1123px; box-sizing: border-box; }
        
        .dev-side h2 { font-family: var(--font-head); font-weight: 700; font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; margin: 18px 0 8px; padding-bottom: 5px; border-bottom: 1px solid rgba(255,255,255,.28); }
        .dev-side h2:first-child { border-bottom: 0; }
        .dev-side .dev-coord h2 { border-bottom: 0; margin-bottom: 4px; margin-top: 0; }
        .dev-label { color: var(--gold); font-family: var(--font-head); font-weight: 600; font-size: 9px; letter-spacing: .06em; text-transform: uppercase; margin-top: 10px; }
        .dev-value { font-size: 11.5px; line-height: 1.4; margin-top: 3px; word-break: break-word; }
        
        .dev-lang { margin-top: 8px; }
        .dev-lang .row { display: flex; justify-content: space-between; align-items: baseline; font-size: 11.5px; }
        .dev-lang .row b { font-weight: 600; }
        .dev-lang .row i { font-size: 9.5px; color: rgba(255,255,255,.75); }
        .dev-bar { height: 9px; border-radius: 5px; background: var(--bar-bg); margin-top: 3px; overflow: hidden; }
        .dev-bar span { display: block; height: 100%; background: #fff; border-radius: 5px; }
        
        .dev-side ul { list-style: none; font-size: 11.5px; line-height: 1.45; }
        .dev-side ul li { margin-bottom: 3px; }
        
        .dev-main { flex: 1; padding: 20px 28px 24px 28px; display: flex; flex-direction: column; justify-content: space-between; }
        .dev-main h1 { font-family: var(--font-head); font-weight: 700; font-size: 30px; line-height: 1.15; color: var(--navy-title); letter-spacing: .01em; text-transform: uppercase; }
        .dev-subtitle { font-family: var(--font-head); font-weight: 600; font-size: 13.5px; color: var(--blue-link); letter-spacing: .03em; text-transform: uppercase; margin-top: 8px; margin-bottom: 6px; }
        .dev-main h2 { font-family: var(--font-head); font-weight: 700; font-size: 16px; color: var(--navy-title); margin: 18px 0 10px; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px; }
        
        .dev-item { position: relative; padding-left: 18px; }
        .dev-item::before { content: ""; position: absolute; left: 0; top: 5px; width: 8px; height: 8px; border-radius: 50%; background: var(--navy-title); }
        .dev-item::after { content: ""; position: absolute; left: 3.5px; top: 15px; bottom: -8px; width: 1px; background: #cbd5e1; }
        .dev-item.last::after { display: none; }
        .dev-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
        .dev-head b { font-size: 13.5px; font-weight: 700; color: var(--navy-title); }
        .dev-head em { font-size: 11px; color: var(--muted); white-space: nowrap; }
        .dev-sub { font-style: italic; font-size: 12px; color: var(--blue-link); margin-top: 2px; }
        .dev-item ul { list-style: none; margin: 6px 0 0 0; }
        .dev-item li { position: relative; padding-left: 14px; font-size: 12px; line-height: 1.5; margin-bottom: 4px; text-align: justify; text-justify: inter-word; }
        .dev-item li::before { content: "•"; position: absolute; left: 0; color: var(--navy-title); font-size: 14px; line-height: 1; top: 1px; }
        .dev-project { margin-bottom: 12px; }
        .dev-formation { margin-bottom: 8px; }
        .dev-main p { font-size: 12.5px; line-height: 1.55; text-align: justify; text-justify: inter-word; hyphens: auto; }
      `}</style>

      <aside className="dev-side">
        <div className="dev-halo" />
        <div className="dev-photo">
          {cv.personal.photo ? (
            <img src={cv.personal.photo} alt={`Photo de ${cv.personal.name}`} />
          ) : (
            <div className="dev-initial">{(cv.personal.name || "P").charAt(0)}</div>
          )}
        </div>

        <div className="dev-side-inner">
          <div className="dev-coord">
            <h2>Coordonnées</h2>
            {cv.personal.phone && (<><div className="dev-label">Téléphone</div><div className="dev-value">{cv.personal.phone}</div></>)}
            {cv.personal.email && (<><div className="dev-label">Courriel</div><div className="dev-value">{cv.personal.email}</div></>)}
            {cv.personal.link && (<><div className="dev-label">Portfolio</div><div className="dev-value">{cv.personal.link}</div></>)}
            {cv.personal.location && (<><div className="dev-label">Adresse</div><div className="dev-value">{cv.personal.location}</div></>)}
          </div>

          {cv.languages.length > 0 && (
            <div>
              <h2 style={{ borderBottom: 0, marginBottom: 0 }}>Langues</h2>
              {cv.languages.map((l, i) => {
                const p = parseLangWithPercent(l);
                return (
                  <div className="dev-lang" key={i}>
                    <div className="row"><b>{p.name}</b><i>{p.level}</i></div>
                    <div className="dev-bar"><span style={{ width: p.width }} /></div>
                  </div>
                );
              })}
            </div>
          )}

          {cv.skills.length > 0 && (
            <div>
              <h2>Compétences</h2>
              <ul>
                {cv.skills.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {highlights.length > 0 && (
            <div>
              <h2>Compétences transversales</h2>
              <ul>
                {highlights.map((h, i) => <li key={i}>{h.title || h.text}</li>)}
              </ul>
            </div>
          )}

          {cv.interests.length > 0 && (
            <div>
              <h2>Centres d'intérêt</h2>
              <ul>
                {cv.interests.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
            </div>
          )}
        </div>
      </aside>

      <main className="dev-main">
        <div>
          <h1>{cv.personal.name}</h1>
          {cv.title && <div className="dev-subtitle">{cv.title}</div>}

          {education.length > 0 && (
            <>
              <h2>Formation</h2>
              {education.map((edu, i) => (
                <div className={`dev-item dev-formation${i === education.length - 1 ? " last" : ""}`} key={edu.id}>
                  <div className="dev-head"><b>{edu.degree}</b><em>{dates(edu.start, edu.end)}</em></div>
                  {edu.school && <div className="dev-sub">{edu.school}</div>}
                </div>
              ))}
            </>
          )}

          {cv.summary && (
            <>
              <h2>Profil</h2>
              <p>{cv.summary}</p>
            </>
          )}

          {experiences.length > 0 && (
            <>
              <h2>Projets déployés &amp; Expériences</h2>
              {experiences.map((exp, i) => (
                <div className={`dev-item dev-project${i === experiences.length - 1 ? " last" : ""}`} key={exp.id}>
                  <div className="dev-head">
                    <b>{exp.company}</b>
                    <em>{dates(exp.start, exp.end)}</em>
                  </div>
                  {exp.role && <div className="dev-sub">{exp.role}</div>}
                  <ul>
                    {exp.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

/* ========================================================
   MODÈLE 2 : Juriste & Cadre ODD (Beyeli Patrice)
   ======================================================== */
function JuristeNavy({ cv }: { cv: CV }) {
  const experiences = cv.experiences.filter((e) => e.role || e.company || e.bullets.some(Boolean));
  const education = cv.education.filter((e) => e.degree || e.school);
  const highlights = (cv.highlights ?? []).filter((h) => h.title || h.text);

  return (
    <div className="jur-page">
      <style>{`
        .jur-page {
          --navy: #1c3f61;
          --navy-title: #1a3a5c;
          --circle: #2c5583;
          --gold: #d9b24a;
          --blue-link: #2a5a8f;
          --text: #2c3e50;
          --muted: #64748b;
          --bar-bg: rgba(255,255,255,.25);
          --font-head: "Poppins", "Segoe UI", Arial, sans-serif;
          --font-body: "Liberation Sans", Arial, Helvetica, sans-serif;
          width: 794px; min-height: 1123px; display: flex; background: #fff;
          font-family: var(--font-body); color: var(--text);
          -webkit-print-color-adjust: exact; print-color-adjust: exact; text-align: left;
          position: relative; overflow: hidden;
        }
        .jur-page *, .jur-page *::before, .jur-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        .jur-side { width: 274px; min-height: 1123px; flex: none; background: var(--navy); color: #fff; position: relative; overflow: hidden; }
        .jur-halo { position: absolute; top: 0; left: 0; width: 272px; height: 272px; border-radius: 50%; background: var(--circle); }
        .jur-photo { position: absolute; top: 48px; left: 49px; width: 174px; height: 174px; border-radius: 50%; border: 3px solid #fff; overflow: hidden; background: #fff; box-shadow: 0 9px 20px rgba(10,24,40,.45); }
        .jur-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .jur-initial { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #2c5583; color: #fff; font-family: var(--font-head); font-weight: 700; font-size: 56px; }
        .jur-side-inner { position: relative; padding: 250px 28px 24px 28px; display: flex; flex-direction: column; justify-content: space-between; min-height: 1123px; box-sizing: border-box; }
        
        .jur-side h2 { font-family: var(--font-head); font-weight: 700; font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; margin: 18px 0 8px; padding-bottom: 5px; border-bottom: 1px solid rgba(255,255,255,.28); }
        .jur-side h2:first-child { border-bottom: 0; }
        .jur-side .jur-coord h2 { border-bottom: 0; margin-bottom: 4px; margin-top: 0; }
        .jur-label { color: var(--gold); font-family: var(--font-head); font-weight: 600; font-size: 9px; letter-spacing: .06em; text-transform: uppercase; margin-top: 10px; }
        .jur-value { font-size: 11.5px; line-height: 1.4; margin-top: 3px; word-break: break-word; }
        
        .jur-lang { margin-top: 8px; }
        .jur-lang .row { display: flex; justify-content: space-between; align-items: baseline; font-size: 11.5px; }
        .jur-lang .row b { font-weight: 600; }
        .jur-lang .row i { font-size: 9.5px; color: rgba(255,255,255,.75); }
        .jur-bar { height: 9px; border-radius: 5px; background: var(--bar-bg); margin-top: 3px; overflow: hidden; }
        .jur-bar span { display: block; height: 100%; background: #fff; border-radius: 5px; }
        
        .jur-side ul { list-style: none; font-size: 11.5px; line-height: 1.45; }
        .jur-side ul li { margin-bottom: 3px; }
        
        .jur-main { flex: 1; padding: 20px 28px 24px 28px; display: flex; flex-direction: column; justify-content: space-between; }
        .jur-main h1 { font-family: var(--font-head); font-weight: 700; font-size: 30px; line-height: 1.15; color: var(--navy-title); letter-spacing: .01em; text-transform: uppercase; }
        .jur-subtitle { font-family: var(--font-head); font-weight: 600; font-size: 13.5px; color: var(--blue-link); letter-spacing: .03em; text-transform: uppercase; margin-top: 8px; margin-bottom: 6px; }
        .jur-main h2 { font-family: var(--font-head); font-weight: 700; font-size: 16px; color: var(--navy-title); margin: 18px 0 10px; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px; }
        
        .jur-item { position: relative; padding-left: 18px; }
        .jur-item::before { content: ""; position: absolute; left: 0; top: 5px; width: 8px; height: 8px; border-radius: 50%; background: var(--navy-title); }
        .jur-item::after { content: ""; position: absolute; left: 3.5px; top: 15px; bottom: -8px; width: 1px; background: #cbd5e1; }
        .jur-item.last::after { display: none; }
        .jur-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
        .jur-head b { font-size: 13.5px; font-weight: 700; color: var(--navy-title); }
        .jur-head em { font-size: 11px; color: var(--muted); white-space: nowrap; }
        .jur-sub { font-style: italic; font-size: 12px; color: var(--blue-link); margin-top: 2px; }
        .jur-item ul { list-style: none; margin: 6px 0 0 0; }
        .jur-item li { position: relative; padding-left: 14px; font-size: 12px; line-height: 1.5; margin-bottom: 4px; text-align: justify; text-justify: inter-word; }
        .jur-item li::before { content: "•"; position: absolute; left: 0; color: var(--navy-title); font-size: 14px; line-height: 1; top: 1px; }
        .jur-exp { margin-bottom: 12px; }
        .jur-edu { margin-bottom: 8px; }
        .jur-main p { font-size: 12.5px; line-height: 1.55; text-align: justify; text-justify: inter-word; hyphens: auto; }
      `}</style>

      <aside className="jur-side">
        <div className="jur-halo" />
        <div className="jur-photo">
          {cv.personal.photo ? (
            <img src={cv.personal.photo} alt={`Photo de ${cv.personal.name}`} />
          ) : (
            <div className="jur-initial">{(cv.personal.name || "B").charAt(0)}</div>
          )}
        </div>

        <div className="jur-side-inner">
          <div className="jur-coord">
            <h2>Coordonnées</h2>
            {cv.personal.phone && (<><div className="jur-label">Téléphone</div><div className="jur-value">{cv.personal.phone}</div></>)}
            {cv.personal.email && (<><div className="jur-label">Courriel</div><div className="jur-value">{cv.personal.email}</div></>)}
            {cv.personal.link && (<><div className="jur-label">Site Web</div><div className="jur-value">{cv.personal.link}</div></>)}
            {cv.personal.location && (<><div className="jur-label">Adresse</div><div className="jur-value">{cv.personal.location}</div></>)}
          </div>

          {cv.languages.length > 0 && (
            <div>
              <h2 style={{ borderBottom: 0, marginBottom: 0 }}>Langues</h2>
              {cv.languages.map((l, i) => {
                const p = parseLangWithPercent(l);
                return (
                  <div className="jur-lang" key={i}>
                    <div className="row"><b>{p.name}</b><i>{p.level}</i></div>
                    <div className="jur-bar"><span style={{ width: p.width }} /></div>
                  </div>
                );
              })}
            </div>
          )}

          {cv.skills.length > 0 && (
            <div>
              <h2>Compétences</h2>
              <ul>
                {cv.skills.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {highlights.length > 0 && (
            <div>
              <h2>Compétences transversales</h2>
              <ul>
                {highlights.map((h, i) => <li key={i}>{h.title || h.text}</li>)}
              </ul>
            </div>
          )}

          {cv.interests.length > 0 && (
            <div>
              <h2>Centres d'intérêt</h2>
              <ul>
                {cv.interests.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
            </div>
          )}
        </div>
      </aside>

      <main className="jur-main">
        <div>
          <h1>{cv.personal.name}</h1>
          {cv.title && <div className="jur-subtitle">{cv.title}</div>}

          {cv.summary && (
            <>
              <h2>Profil</h2>
              <p>{cv.summary}</p>
            </>
          )}

          {experiences.length > 0 && (
            <>
              <h2>Expérience professionnelle</h2>
              {experiences.map((exp, i) => (
                <div className={`jur-item jur-exp${i === experiences.length - 1 ? " last" : ""}`} key={exp.id}>
                  <div className="jur-head">
                    <b>{exp.role || exp.company}</b>
                    <em>{dates(exp.start, exp.end)}</em>
                  </div>
                  {exp.company && exp.role && <div className="jur-sub">{exp.company}</div>}
                  <ul>
                    {exp.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </>
          )}

          {education.length > 0 && (
            <>
              <h2>Formation &amp; Diplômes</h2>
              {education.map((edu, i) => (
                <div className={`jur-item jur-edu${i === education.length - 1 ? " last" : ""}`} key={edu.id}>
                  <div className="jur-head"><b>{edu.degree}</b><em>{dates(edu.start, edu.end)}</em></div>
                  {edu.school && <div className="jur-sub">{edu.school}</div>}
                </div>
              ))}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

/* ========================================================
   MODÈLE 3 : Informaticien Bold Minimal (Alfred Bernard)
   ======================================================== */
function AlfredBold({ cv }: { cv: CV }) {
  const experiences = cv.experiences.filter((e) => e.role || e.company || e.bullets.some(Boolean));
  const education = cv.education.filter((e) => e.degree || e.school);

  const [firstName = "ALFRED", ...lastNameParts] = (cv.personal.name || "ALFRED BERNARD").split(" ");
  const lastName = lastNameParts.join(" ") || "BERNARD";

  return (
    <div className="ab-page">
      <style>{`
        .ab-page {
          width: 794px; min-height: 1123px; position: relative; background: #fff;
          font-family: 'Jost', 'Segoe UI', sans-serif; color: #222; overflow: hidden;
          -webkit-print-color-adjust: exact; print-color-adjust: exact;
        }
        .ab-page * { box-sizing: border-box; }
        .ab-abs { position: absolute; }
        .ab-side { left: 0; top: 0; width: 327px; height: 1123px; background: #222; }
        .ab-side-white { left: 0; top: 0; width: 327px; height: 267px; background: #fff; }
        .ab-photo { left: 49px; top: 36px; width: 231px; height: 231px; border-radius: 50%; overflow: hidden; background: #333; z-index: 2; border: 3px solid #222; }
        .ab-photo img { width: 100%; height: 100%; object-fit: cover; }
        .ab-flow { left: 42px; top: 290px; width: 260px; color: #fff; display: flex; flex-direction: column; gap: 18px; }
        .ab-h { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 14px; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.25); padding-bottom: 4px; }
        .ab-t { font-size: 12px; line-height: 18px; color: #eee; }
        .ab-item { margin-bottom: 7px; }
        .ab-label { font-size: 9.5px; text-transform: uppercase; color: #aaa; letter-spacing: 0.05em; }
        .ab-val { font-size: 12px; font-weight: 500; }
        .ab-lang { margin-bottom: 5px; }
        .ab-main { left: 360px; top: 36px; width: 404px; }
        .ab-name-1 { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 46px; line-height: 48px; text-transform: uppercase; color: #222; letter-spacing: -0.02em; }
        .ab-name-2 { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 46px; line-height: 48px; text-transform: uppercase; color: #222; letter-spacing: -0.02em; }
        .ab-job { font-family: 'Jost', sans-serif; font-weight: 600; font-size: 16px; letter-spacing: 0.12em; text-transform: uppercase; color: #555; margin-top: 8px; margin-bottom: 6px; }
        .ab-sec-h { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 15px; text-transform: uppercase; color: #222; margin: 20px 0 12px; border-bottom: 2px solid #222; padding-bottom: 4px; letter-spacing: 0.04em; }
        .ab-timeline { position: relative; padding-left: 18px; border-left: 2px solid #222; margin-bottom: 14px; }
        .ab-timeline::before { content: ""; position: absolute; left: -5px; top: 4px; width: 8px; height: 8px; border-radius: 50%; background: #222; }
        .ab-tl-role { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 13px; color: #111; }
        .ab-tl-sub { font-size: 12px; color: #555; margin-bottom: 5px; font-weight: 500; }
        .ab-tl-body { font-size: 12px; line-height: 1.5; color: #333; text-align: justify; text-justify: inter-word; hyphens: auto; }
        .ab-tl-body li { margin-bottom: 4px; }
      `}</style>

      <div className="ab-abs ab-side">
        <div className="ab-abs ab-side-white" />
        <div className="ab-abs ab-photo">
          {cv.personal.photo ? (
            <img src={cv.personal.photo} alt={`Photo de ${cv.personal.name}`} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "70px", fontFamily: "Montserrat", fontWeight: 800 }}>
              {(cv.personal.name || "A").charAt(0)}
            </div>
          )}
        </div>

        <div className="ab-abs ab-flow">
          <div>
            <div className="ab-h">Contact</div>
            {cv.personal.phone && <div className="ab-item"><div className="ab-label">Téléphone</div><div className="ab-val">{cv.personal.phone}</div></div>}
            {cv.personal.email && <div className="ab-item"><div className="ab-label">Courriel</div><div className="ab-val">{cv.personal.email}</div></div>}
            {cv.personal.location && <div className="ab-item"><div className="ab-label">Adresse</div><div className="ab-val">{cv.personal.location}</div></div>}
            {cv.personal.link && <div className="ab-item"><div className="ab-label">Site web</div><div className="ab-val">{cv.personal.link}</div></div>}
          </div>

          {cv.languages.length > 0 && (
            <div>
              <div className="ab-h">Langues</div>
              {cv.languages.map((l, i) => (
                <div key={i} className="ab-lang ab-t">• {l}</div>
              ))}
            </div>
          )}

          {cv.skills.length > 0 && (
            <div>
              <div className="ab-h">Compétences</div>
              {cv.skills.map((s, i) => (
                <div key={i} className="ab-t" style={{ marginBottom: "4px" }}>• {s}</div>
              ))}
            </div>
          )}

          {cv.interests.length > 0 && (
            <div>
              <div className="ab-h">Centres d'intérêt</div>
              {cv.interests.map((it, i) => (
                <div key={i} className="ab-t" style={{ marginBottom: "4px" }}>• {it}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="ab-abs ab-main">
        <div className="ab-name-1">{firstName}</div>
        <div className="ab-name-2">{lastName}</div>
        <div className="ab-job">{cv.title || "INFORMATICIEN & FULL-STACK DEV"}</div>

        {cv.summary && (
          <div style={{ marginTop: "14px", fontSize: "12.5px", lineHeight: "1.55", color: "#333", textAlign: "justify", textJustify: "inter-word" }}>
            {cv.summary}
          </div>
        )}

        {experiences.length > 0 && (
          <div>
            <div className="ab-sec-h">Expérience professionnelle</div>
            {experiences.map((exp) => (
              <div key={exp.id} className="ab-timeline">
                <div className="ab-tl-role">{exp.role}</div>
                <div className="ab-tl-sub">{exp.company} | {dates(exp.start, exp.end)}</div>
                <div className="ab-tl-body">
                  {exp.bullets.length > 0 ? (
                    <ul style={{ paddingLeft: "15px", margin: 0 }}>
                      {exp.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                    </ul>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div>
            <div className="ab-sec-h">Éducation &amp; Diplômes</div>
            {education.map((edu) => (
              <div key={edu.id} className="ab-timeline">
                <div className="ab-tl-role">{edu.degree}</div>
                <div className="ab-tl-sub">{edu.school} | {dates(edu.start, edu.end)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ========================================================
   MODÈLE 4 : Designer Graphique Capsules (Adeline Palmerston)
   ======================================================== */
function AdelineCapsule({ cv }: { cv: CV }) {
  const experiences = cv.experiences.filter((e) => e.role || e.company || e.bullets.some(Boolean));
  const education = cv.education.filter((e) => e.degree || e.school);
  const references = cv.references ?? [];

  return (
    <div className="ade-page">
      <style>{`
        .ade-page {
          width: 794px; min-height: 1123px; position: relative; background: #fff;
          font-family: 'Bricolage Grotesque', 'Segoe UI', sans-serif; color: #323b4c; overflow: hidden;
          -webkit-print-color-adjust: exact; print-color-adjust: exact;
        }
        .ade-page * { box-sizing: border-box; }
        .ade-abs { position: absolute; }
        .ade-cap-top { left: 0; top: 0; width: 443px; height: 284px; background: #323b4c; border-bottom-right-radius: 60px; }
        .ade-cap-bot { left: 0; top: 371px; width: 285px; height: 752px; background: #323b4c; border-top-right-radius: 60px; }
        .ade-photo-ring { left: 494px; top: 58px; width: 200px; height: 200px; border-radius: 50%; border: 2px solid #7d869a; }
        .ade-photo { left: 502px; top: 66px; width: 184px; height: 184px; border-radius: 50%; overflow: hidden; background: #fff; }
        .ade-photo img { width: 100%; height: 100%; object-fit: cover; }
        .ade-pill { left: 24px; top: 298px; width: 746px; height: 57px; background: #fff; border: 1.5px solid #323b4c; border-radius: 29px; display: flex; align-items: center; justify-content: space-around; padding: 0 16px; font-size: 11.5px; z-index: 5; box-shadow: 0 4px 12px rgba(50,59,76,0.08); }
        .ade-pill-item { display: flex; align-items: center; gap: 6px; font-weight: 500; }
        .ade-h1 { left: 38px; top: 68px; width: 380px; font-weight: 700; font-size: 40px; line-height: 44px; color: #fff; letter-spacing: -0.01em; }
        .ade-h2 { left: 38px; top: 165px; font-size: 17px; letter-spacing: 0.08em; text-transform: uppercase; color: #cbd5e1; font-weight: 500; }
        .ade-side-flow { left: 26px; top: 395px; width: 235px; color: #fff; display: flex; flex-direction: column; gap: 20px; }
        .ade-lh { font-weight: 700; font-size: 13.5px; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 4px; }
        .ade-tx { font-size: 11.5px; line-height: 16px; color: #e4e7ec; }
        .ade-main-flow { left: 320px; top: 380px; width: 440px; display: flex; flex-direction: column; gap: 16px; }
        .ade-main-h { font-weight: 700; font-size: 15px; text-transform: uppercase; color: #323b4c; border-bottom: 2px solid #323b4c; padding-bottom: 4px; letter-spacing: 0.04em; }
      `}</style>

      <div className="ade-abs ade-cap-top" />
      <div className="ade-abs ade-cap-bot" />
      <div className="ade-abs ade-photo-ring" />
      <div className="ade-abs ade-photo">
        {cv.personal.photo ? (
          <img src={cv.personal.photo} alt={`Photo de ${cv.personal.name}`} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "60px", fontWeight: 700, color: "#323b4c" }}>
            {(cv.personal.name || "A").charAt(0)}
          </div>
        )}
      </div>

      <div className="ade-abs ade-h1">{cv.personal.name}</div>
      <div className="ade-abs ade-h2">{cv.title}</div>

      <div className="ade-abs ade-pill">
        {cv.personal.phone && <div className="ade-pill-item"><span>📞</span> {cv.personal.phone}</div>}
        {cv.personal.email && <div className="ade-pill-item"><span>✉️</span> {cv.personal.email}</div>}
        {cv.personal.location && <div className="ade-pill-item"><span>📍</span> {cv.personal.location}</div>}
        {cv.personal.link && <div className="ade-pill-item"><span>🔗</span> {cv.personal.link}</div>}
      </div>

      <div className="ade-abs ade-side-flow">
        {education.length > 0 && (
          <div>
            <div className="ade-lh">Éducation</div>
            {education.map((e) => (
              <div key={e.id} style={{ marginBottom: "9px" }}>
                <div style={{ fontWeight: 700, fontSize: "12px" }}>{e.degree}</div>
                <div className="ade-tx">{e.school}</div>
                <div className="ade-tx" style={{ opacity: 0.8 }}>{dates(e.start, e.end)}</div>
              </div>
            ))}
          </div>
        )}

        {cv.skills.length > 0 && (
          <div>
            <div className="ade-lh">Compétences</div>
            {cv.skills.map((s, i) => (
              <div key={i} className="ade-tx" style={{ marginBottom: "4px" }}>• {s}</div>
            ))}
          </div>
        )}

        {cv.languages.length > 0 && (
          <div>
            <div className="ade-lh">Langues</div>
            {cv.languages.map((l, i) => (
              <div key={i} className="ade-tx" style={{ marginBottom: "4px" }}>• {l}</div>
            ))}
          </div>
        )}
      </div>

      <div className="ade-abs ade-main-flow">
        {cv.summary && (
          <div>
            <div className="ade-main-h">À propos</div>
            <p style={{ marginTop: "8px", fontSize: "12px", lineHeight: "1.55", textAlign: "justify", textJustify: "inter-word" }}>
              {cv.summary}
            </p>
          </div>
        )}

        {experiences.length > 0 && (
          <div>
            <div className="ade-main-h">Expérience</div>
            {experiences.map((exp) => (
              <div key={exp.id} style={{ marginTop: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "13px" }}>
                  <span>{exp.role}</span>
                  <span style={{ fontSize: "11px", color: "#666" }}>{dates(exp.start, exp.end)}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#475569", fontStyle: "italic", marginBottom: "4px" }}>
                  {exp.company}
                </div>
                {exp.bullets.map((b, bi) => (
                  <div key={bi} style={{ fontSize: "11.5px", lineHeight: "1.5", marginBottom: "3px", textAlign: "justify", textJustify: "inter-word" }}>• {b}</div>
                ))}
              </div>
            ))}
          </div>
        )}

        {references.length > 0 && (
          <div>
            <div className="ade-main-h">Références</div>
            <div style={{ display: "flex", gap: "20px", marginTop: "8px" }}>
              {references.map((r, i) => (
                <div key={i} style={{ fontSize: "11.5px", lineHeight: "1.4" }}>
                  <b>{r.name}</b><br />
                  <span>{r.company}</span><br />
                  <span style={{ color: "#666" }}>{r.contact}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ========================================================
   DISPATCHEUR PRINCIPAL : 9 MODÈLES A4 ACTIFS  
   ======================================================== */
export function CVTemplate({ cv, template }: { cv: CV; template?: TemplateId }) {
  const activeTemplate = template ?? "emerald-tech";

  switch (activeTemplate) {
    case "daniel-morton":
      return <DanielMorton cv={cv} />;
    case "richard-sanchez":
      return <RichardSanchez cv={cv} />;
    case "daniel-gallego":
      return <DanielGallego cv={cv} />;
    case "sanchez-product":
      return <SanchezProduct cv={cv} />;
    case "adeline-palmerston":
      return <AdelinePalmerston cv={cv} />;
    case "dani-martinez":
      return <DaniMartinez cv={cv} />;
    case "juriste-navy":
      return <JuristeNavy cv={cv} />;
    case "alfred-bold":
      return <AlfredBold cv={cv} />;
    case "adeline-capsule":
      return <AdelineCapsule cv={cv} />;
    case "sacha-dubois":
    case "french-blue":
      return <SachaDubois cv={cv} />;
    case "michael-henson":
      return <MichaelHenson cv={cv} />;
    case "elvira-montanez":
      return <ElviraMontanez cv={cv} />;
    case "emma-brooks":
      return <EmmaBrooks cv={cv} />;
    case "drew-feig":
      return <DrewFeig cv={cv} />;
    case "emerald-tech":
    default:
      return <EmeraldTech cv={cv} />;
  }
}
