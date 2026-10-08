import type { CV, TemplateId } from "@/lib/cv/types";

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
];

const dates = (start: string, end: string) => [start, end].filter(Boolean).join(" – ");

const parseLangWithPercent = (l: string) => {
  const [name, rest = ""] = l.split("—").map((x) => x.trim());
  const m = rest.match(/\((\d+)\s*%\)/);
  const percentMatch = rest.match(/(\d+)\s*%/);
  const width = m ? `${m[1]}%` : percentMatch ? `${percentMatch[1]}%` : "60%";
  const level = rest.replace(/\(?\d+\s*%\)?/, "").trim() || rest;
  return { name, level, width };
};

/* ========================================================
   MODÈLE 2 : Développeur Web et Mobile (Beyeli Patrice)
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
          --text: #333;
          --muted: #666;
          --bar-bg: rgba(255,255,255,.25);
          --font-head: "Poppins", "Segoe UI", Arial, sans-serif;
          --font-body: "Liberation Sans", Arial, Helvetica, sans-serif;
          width: 794px; min-height: 1123px; display: flex; background: #fff;
          font-family: var(--font-body); color: var(--text);
          -webkit-print-color-adjust: exact; print-color-adjust: exact; text-align: left;
          position: relative; overflow: hidden;
        }
        .dev-page *, .dev-page *::before, .dev-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        .dev-side { width: 274px; flex: none; background: var(--navy); color: #fff; position: relative; overflow: hidden; }
        .dev-halo { position: absolute; top: 0; left: 0; width: 272px; height: 272px; border-radius: 50%; background: var(--circle); }
        .dev-photo { position: absolute; top: 53px; left: 49px; width: 174px; height: 174px; border-radius: 50%; border: 3px solid #fff; overflow: hidden; background: #fff; box-shadow: 0 9px 20px rgba(10,24,40,.45); }
        .dev-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .dev-initial { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #2c5583; color: #fff; font-family: var(--font-head); font-weight: 700; font-size: 56px; }
        .dev-side-inner { position: relative; padding: 267px 34px 28px 34px; }
        
        .dev-side h2 { font-family: var(--font-head); font-weight: 700; font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; margin: 22px 0 9px; padding-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,.28); }
        .dev-side h2:first-child { border-bottom: 0; }
        .dev-side .dev-coord h2 { border-bottom: 0; margin-bottom: 4px; margin-top: 0; }
        .dev-label { color: var(--gold); font-family: var(--font-head); font-weight: 500; font-size: 8.5px; letter-spacing: .06em; text-transform: uppercase; margin-top: 12px; }
        .dev-value { font-size: 11px; line-height: 1.35; margin-top: 4px; word-break: break-word; }
        
        .dev-lang { margin-top: 10px; }
        .dev-lang .row { display: flex; justify-content: space-between; align-items: baseline; font-size: 11px; }
        .dev-lang .row b { font-weight: 700; }
        .dev-lang .row i { font-size: 9px; color: rgba(255,255,255,.7); }
        .dev-bar { height: 10px; border-radius: 5px; background: var(--bar-bg); margin-top: 3px; overflow: hidden; }
        .dev-bar span { display: block; height: 100%; background: #fff; border-radius: 5px; }
        
        .dev-side ul { list-style: none; font-size: 11px; line-height: 1.38; }
        
        .dev-main { flex: 1; padding: 14px 26px 28px 28px; }
        .dev-main h1 { font-family: var(--font-head); font-weight: 700; font-size: 31px; line-height: 1.12; color: var(--navy-title); letter-spacing: .005em; text-transform: uppercase; }
        .dev-subtitle { font-family: var(--font-head); font-weight: 500; font-size: 14px; color: var(--blue-link); letter-spacing: .02em; text-transform: uppercase; margin-top: 14px; }
        .dev-main h2 { font-family: var(--font-head); font-weight: 700; font-size: 17.5px; color: var(--navy-title); margin: 20px 0 10px; }
        
        .dev-item { position: relative; padding-left: 19px; }
        .dev-item::before { content: ""; position: absolute; left: 0; top: 4px; width: 9px; height: 9px; border-radius: 50%; background: var(--navy-title); }
        .dev-item::after { content: ""; position: absolute; left: 4px; top: 14px; bottom: -8px; width: 1px; background: #c3ccd8; }
        .dev-item.last::after { display: none; }
        .dev-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
        .dev-head b { font-size: 13.5px; font-weight: 700; color: var(--navy-title); }
        .dev-head em { font-size: 10.5px; color: var(--muted); white-space: nowrap; }
        .dev-sub { font-style: italic; font-size: 11px; color: var(--blue-link); margin-top: 2px; }
        .dev-item ul { list-style: none; margin: 5px 0 0 0; }
        .dev-item li { position: relative; padding-left: 15px; font-size: 11px; line-height: 1.42; margin-bottom: 3px; }
        .dev-item li::before { content: "•"; position: absolute; left: 1px; color: var(--navy-title); }
        .dev-project { margin-bottom: 14px; }
        .dev-formation { margin-bottom: 4px; }
        .dev-main p { font-size: 12px; line-height: 1.5; text-align: justify; }
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
            <>
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
            </>
          )}

          {cv.skills.length > 0 && (
            <>
              <h2>Compétences</h2>
              <ul>
                {cv.skills.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </>
          )}

          {highlights.length > 0 && (
            <>
              <h2>Compétences transversales</h2>
              <ul>
                {highlights.map((h, i) => <li key={i}>{h.title || h.text}</li>)}
              </ul>
            </>
          )}

          {cv.interests.length > 0 && (
            <>
              <h2>Centres d'intérêt</h2>
              <ul>
                {cv.interests.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
            </>
          )}
        </div>
      </aside>

      <main className="dev-main">
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
            <h2>Projets déployés</h2>
            {experiences.map((exp, i) => (
              <div className={`dev-item dev-project${i === experiences.length - 1 ? " last" : ""}`} key={exp.id}>
                <div className="dev-head"><b>{exp.company || exp.role}</b><em>{exp.role && exp.company ? exp.role : dates(exp.start, exp.end)}</em></div>
                <div className="dev-sub">{dates(exp.start, exp.end)}</div>
                {exp.bullets.some(Boolean) && (
                  <ul>
                    {exp.bullets.filter(Boolean).map((b, idx) => <li key={idx}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}

        <h2>Disponibilité</h2>
        <p>Disponible immédiatement pour un stage ou une collaboration en développement web et mobile, à Kara ou à distance, selon les besoins de la structure d'accueil.</p>
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
  const highlights = (cv.highlights ?? []).filter((h) => h.title || h.text);

  return (
    <div className="jn-page">
      <style>{`
        .jn-page {
          --jn-head: "Poppins", "Segoe UI", Arial, sans-serif;
          width: 794px; min-height: 1123px; display: flex; background: #fff; color: #333;
          font-family: "Liberation Sans", Arial, Helvetica, sans-serif;
          -webkit-print-color-adjust: exact; print-color-adjust: exact; text-align: left;
          position: relative; overflow: hidden;
        }
        .jn-page *, .jn-page *::before, .jn-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .jn-side { width: 274px; flex: none; background: #1c3f61; color: #fff; position: relative; overflow: hidden; }
        .jn-halo { position: absolute; top: 0; left: 0; width: 272px; height: 272px; border-radius: 50%; background: #2c5583; }
        .jn-photo { position: absolute; top: 53px; left: 49px; width: 174px; height: 174px; border-radius: 50%; border: 3px solid #fff; overflow: hidden; background: #fff; box-shadow: 0 9px 20px rgba(10,24,40,.45); }
        .jn-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .jn-initial { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #2c5583; color: #fff; font-family: var(--jn-head); font-weight: 700; font-size: 56px; }
        .jn-side-inner { position: relative; padding: 267px 34px 28px 34px; }
        .jn-side h2 { font-family: var(--jn-head); font-weight: 700; font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; margin: 20px 0 9px; padding-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,.28); }
        .jn-side .jn-coord h2 { margin-top: 0; margin-bottom: 4px; border-bottom: 0; }
        .jn-label { color: #d9b24a; font-family: var(--jn-head); font-weight: 500; font-size: 8.5px; letter-spacing: .06em; text-transform: uppercase; margin-top: 12px; }
        .jn-value { font-size: 11px; line-height: 1.35; margin-top: 4px; word-break: break-word; }
        .jn-keys { list-style: none; font-size: 11px; font-weight: 700; line-height: 1.25; }
        .jn-keys li { position: relative; padding-left: 16px; margin-bottom: 3px; }
        .jn-keys li::before { content: "▸"; position: absolute; left: 0; top: 1px; font-size: 8px; color: rgba(255,255,255,.85); }
        .jn-lang { margin-top: 10px; }
        .jn-lang:first-of-type { margin-top: 0; }
        .jn-lang .jn-row { display: flex; justify-content: space-between; align-items: baseline; font-size: 10.5px; color: rgba(255,255,255,.8); }
        .jn-lang .jn-row i { font-size: 8.5px; color: rgba(255,255,255,.55); }
        .jn-bar { height: 6px; border-radius: 3px; background: rgba(255,255,255,.2); margin-top: 4px; overflow: hidden; }
        .jn-bar span { display: block; height: 100%; background: rgba(255,255,255,.5); border-radius: 3px; }
        .jn-interests { list-style: none; font-size: 10.5px; line-height: 1.4; color: rgba(255,255,255,.75); }
        .jn-main { flex: 1; padding: 14px 26px 28px 28px; }
        .jn-main h1 { font-family: var(--jn-head); font-weight: 700; font-size: 31px; line-height: 1.12; color: #1a3a5c; text-transform: uppercase; }
        .jn-subtitle { font-family: var(--jn-head); font-weight: 500; font-size: 14px; color: #2a5a8f; letter-spacing: .02em; text-transform: uppercase; margin-top: 14px; }
        .jn-main h2 { font-family: var(--jn-head); font-weight: 700; font-size: 17.5px; color: #1a3a5c; margin: 20px 0 10px; }
        .jn-item { position: relative; padding-left: 19px; }
        .jn-item::before { content: ""; position: absolute; left: 0; top: 4px; width: 9px; height: 9px; border-radius: 50%; background: #1a3a5c; }
        .jn-item::after { content: ""; position: absolute; left: 4px; top: 14px; bottom: -8px; width: 1px; background: #c3ccd8; }
        .jn-item.jn-last::after { display: none; }
        .jn-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
        .jn-head b { font-size: 13.5px; font-weight: 700; color: #1a3a5c; line-height: 1.3; }
        .jn-head em { font-size: 10.5px; color: #666; white-space: nowrap; }
        .jn-sub { font-style: italic; font-size: 11px; color: #2a5a8f; margin-top: 3px; }
        .jn-item ul { list-style: none; margin: 5px 0 0 0; }
        .jn-item li { position: relative; padding-left: 15px; font-size: 11px; line-height: 1.42; margin-bottom: 3px; }
        .jn-item li::before { content: "•"; position: absolute; left: 1px; color: #1a3a5c; }
        .jn-exp { margin-bottom: 12px; }
        .jn-edu { margin-bottom: 10px; }
        .jn-main p { font-size: 12px; line-height: 1.5; text-align: justify; }
        .jn-skill h3 { font-size: 12px; font-weight: 700; color: #1a3a5c; margin: 12px 0 4px; }
        .jn-skill p { font-size: 10.5px; line-height: 1.42; }
      `}</style>

      <aside className="jn-side">
        <div className="jn-halo" />
        <div className="jn-photo">
          {cv.personal.photo ? (
            <img src={cv.personal.photo} alt={`Photo de ${cv.personal.name}`} />
          ) : (
            <div className="jn-initial">{(cv.personal.name || "J").charAt(0)}</div>
          )}
        </div>

        <div className="jn-side-inner">
          <div className="jn-coord">
            <h2>Coordonnées</h2>
            {cv.personal.phone && (<><div className="jn-label">Téléphone</div><div className="jn-value">{cv.personal.phone}</div></>)}
            {cv.personal.email && (<><div className="jn-label">Courriel</div><div className="jn-value">{cv.personal.email}</div></>)}
            {cv.personal.link && (<><div className="jn-label">Portfolio</div><div className="jn-value">{cv.personal.link}</div></>)}
            {cv.personal.location && (<><div className="jn-label">Adresse</div><div className="jn-value">{cv.personal.location}</div></>)}
          </div>

          {cv.skills.length > 0 && (
            <>
              <h2>Compétences clés</h2>
              <ul className="jn-keys">
                {cv.skills.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </>
          )}

          {cv.languages.length > 0 && (
            <>
              <h2>Langues</h2>
              <div>
                {cv.languages.map((l, i) => {
                  const p = parseLangWithPercent(l);
                  return (
                    <div className="jn-lang" key={i}>
                      <div className="jn-row"><span>{p.name}</span><i>{p.level}</i></div>
                      <div className="jn-bar"><span style={{ width: p.width }} /></div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {cv.interests.length > 0 && (
            <>
              <h2>Centres d'intérêt</h2>
              <ul className="jn-interests">
                {cv.interests.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
            </>
          )}
        </div>
      </aside>

      <main className="jn-main">
        <h1>{cv.personal.name}</h1>
        {cv.title && <div className="jn-subtitle">{cv.title}</div>}

        {cv.summary && (<><h2>Profil</h2><p>{cv.summary}</p></>)}

        {experiences.length > 0 && (
          <>
            <h2>Expérience professionnelle</h2>
            {experiences.map((exp, i) => (
              <div className={`jn-item jn-exp${i === experiences.length - 1 ? " jn-last" : ""}`} key={exp.id}>
                <div className="jn-head"><b>{exp.role}</b><em>{dates(exp.start, exp.end)}</em></div>
                {exp.company && <div className="jn-sub">{exp.company}</div>}
                {exp.bullets.some(Boolean) && (
                  <ul>{exp.bullets.filter(Boolean).map((b, k) => <li key={k}>{b}</li>)}</ul>
                )}
              </div>
            ))}
          </>
        )}

        {highlights.length > 0 && (
          <>
            <h2>Compétences transversales</h2>
            <div className="jn-skill">
              {highlights.map((h, i) => (<div key={i}><h3>{h.title}</h3><p>{h.text}</p></div>))}
            </div>
          </>
        )}

        {education.length > 0 && (
          <>
            <h2>Éducation</h2>
            {education.map((edu, i) => (
              <div className={`jn-item jn-edu${i === education.length - 1 ? " jn-last" : ""}`} key={edu.id}>
                <div className="jn-head"><b>{edu.degree}</b><em>{dates(edu.start, edu.end)}</em></div>
                {edu.school && <div className="jn-sub">{edu.school}</div>}
              </div>
            ))}
          </>
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
  const nameParts = (cv.personal.name || "Alfred Bernard").trim().split(/\s+/);
  const firstName = nameParts[0] || "Alfred";
  const lastName = nameParts.slice(1).join(" ") || "Bernard";

  return (
    <div className="ab-page">
      <style>{`
        .ab-page {
          --dark: #222;
          --white: #fff;
          --head: "Montserrat", "Arial Black", Arial, sans-serif;
          --body: "Jost", "Segoe UI", Arial, sans-serif;
          position: relative; width: 794px; height: 1123px; min-height: 1123px;
          background: #fff; overflow: hidden;
          font-family: var(--body); color: var(--dark);
          -webkit-print-color-adjust: exact; print-color-adjust: exact; text-align: left;
        }
        .ab-page *, .ab-page *::before, .ab-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        .ab-side { position: absolute; left: 0; top: 0; width: 327px; height: 1123px; background: var(--dark); }
        .ab-photo { position: absolute; left: 36px; top: 49px; width: 231px; height: 231px; border-radius: 50%; overflow: hidden; background: #e3e4e4; }
        .ab-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ab-photo-initial { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #333; color: #fff; font-family: var(--head); font-weight: 800; font-size: 64px; }
        
        .ab-abs { position: absolute; }
        .ab-h { font-family: var(--head); font-weight: 800; text-transform: uppercase; }
        .ab-side .ab-h { color: #fff; font-size: 18px; line-height: 22px; letter-spacing: .14em; left: 49px; white-space: nowrap; }
        .ab-side .ab-t { position: absolute; left: 49px; width: 240px; color: #fff; font-size: 15px; }
        .ab-side .ab-t p { margin: 0; }
        .ab-side .ab-comp p { line-height: 21.8px; margin-bottom: 10.2px; }
        .ab-side .ab-int p { line-height: 21.8px; margin-bottom: 9.2px; }
        
        .ab-main-title { position: absolute; left: 366px; top: 121px; font-family: var(--head); font-weight: 900; font-size: 62px; line-height: 73px; letter-spacing: .02em; text-transform: uppercase; color: var(--dark); }
        .ab-job { font-family: var(--head); font-weight: 800; font-size: 13px; line-height: 18px; text-transform: uppercase; left: 391px; white-space: nowrap; color: var(--dark); }
        .ab-meta { font-size: 12.5px; line-height: 16px; left: 391px; color: var(--dark); }
        .ab-main-h { font-size: 17px; line-height: 22px; left: 366px; letter-spacing: .02em; white-space: nowrap; color: var(--dark); }
        .ab-b { position: absolute; left: 391px; width: 362px; list-style: none; font-size: 12.5px; }
        .ab-b li { position: relative; padding-left: 15px; }
        .ab-b li::before { content: ""; position: absolute; left: 1px; top: .55em; width: 4.5px; height: 4.5px; border-radius: 50%; background: var(--dark); }
        .ab-tl { position: absolute; left: 365px; width: 2px; background: var(--dark); }
        .ab-tl::before { content: ""; position: absolute; left: -3.5px; top: -4px; width: 9px; height: 9px; border-radius: 50%; background: var(--dark); }
      `}</style>

      <aside className="ab-side">
        <div className="ab-photo">
          {cv.personal.photo ? (
            <img src={cv.personal.photo} alt={`Photo de ${cv.personal.name}`} />
          ) : (
            <div className="ab-photo-initial">{firstName.charAt(0)}</div>
          )}
        </div>

        <div className="ab-abs ab-h" style={{ top: "382px" }}>Coordonnées</div>
        <div className="ab-t" style={{ top: "413px", lineHeight: "25.4px" }}>
          {cv.personal.location && <p>{cv.personal.location}</p>}
          {cv.personal.email && <p>{cv.personal.email}</p>}
          {cv.personal.phone && <p>{cv.personal.phone}</p>}
          {cv.personal.link && <p>{cv.personal.link}</p>}
        </div>

        {cv.languages.length > 0 && (
          <>
            <div className="ab-abs ab-h" style={{ top: "560px" }}>Langues</div>
            <div className="ab-t" style={{ top: "588px", lineHeight: "25.1px" }}>
              {cv.languages.map((l, i) => <p key={i}>{l}</p>)}
            </div>
          </>
        )}

        {cv.skills.length > 0 && (
          <>
            <div className="ab-abs ab-h" style={{ top: "683px" }}>Compétences</div>
            <div className="ab-t ab-comp" style={{ top: "720px" }}>
              {cv.skills.map((s, i) => <p key={i}>{s}</p>)}
            </div>
          </>
        )}

        {cv.interests.length > 0 && (
          <>
            <div className="ab-abs ab-h" style={{ top: "927px" }}>Centres<br />d'intérêts</div>
            <div className="ab-t ab-int" style={{ top: "987px" }}>
              {cv.interests.map((x, i) => <p key={i}>{x}</p>)}
            </div>
          </>
        )}
      </aside>

      <h1 className="ab-main-title">
        {firstName}
        <br />
        {lastName}
      </h1>
      <div className="ab-abs ab-h" style={{ left: "366px", top: "279px", fontSize: "19px", lineHeight: "22px", fontWeight: 800 }}>
        {cv.title || "Informaticien"}
      </div>

      {experiences.length > 0 && (
        <>
          <div className="ab-abs ab-h ab-main-h" style={{ top: "367px" }}>Expériences professionnelles</div>
          {experiences[0] && (
            <>
              <div className="ab-tl" style={{ top: "426px", height: "197px" }} />
              <div className="ab-abs ab-job" style={{ top: "415px" }}>{experiences[0].role}</div>
              <div className="ab-abs ab-meta" style={{ top: "441px" }}>
                {experiences[0].company} | {dates(experiences[0].start, experiences[0].end)}
              </div>
              <ul className="ab-b" style={{ top: "477px", lineHeight: "21.5px" }}>
                {experiences[0].bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </>
          )}

          {experiences[1] && (
            <>
              <div className="ab-tl" style={{ top: "668px", height: "178px" }} />
              <div className="ab-abs ab-job" style={{ top: "657px" }}>{experiences[1].role}</div>
              <div className="ab-abs ab-meta" style={{ top: "684px" }}>
                {experiences[1].company} | {dates(experiences[1].start, experiences[1].end)}
              </div>
              <ul className="ab-b" style={{ top: "722px", lineHeight: "20.8px" }}>
                {experiences[1].bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </>
          )}
        </>
      )}

      {education.length > 0 && (
        <>
          <div className="ab-abs ab-h ab-main-h" style={{ top: "902px" }}>Formations</div>
          {education[0] && (
            <>
              <div className="ab-tl" style={{ top: "968px", height: "30px" }} />
              <div className="ab-abs ab-job" style={{ top: "955px", left: "389px" }}>{education[0].degree}</div>
              <div className="ab-abs ab-meta" style={{ top: "981px", left: "389px" }}>
                {education[0].school} | {dates(education[0].start, education[0].end)}
              </div>
            </>
          )}
          {education[1] && (
            <>
              <div className="ab-tl" style={{ top: "1038px", height: "30px" }} />
              <div className="ab-abs ab-job" style={{ top: "1026px", left: "389px" }}>{education[1].degree}</div>
              <div className="ab-abs ab-meta" style={{ top: "1051px", left: "389px" }}>
                {education[1].school} | {dates(education[1].start, education[1].end)}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

/* ========================================================
   MODÈLE 5 : Designer Graphique Capsules (Adeline Palmerston)
   ======================================================== */
function AdelineCapsule({ cv }: { cv: CV }) {
  const experiences = cv.experiences.filter((e) => e.role || e.company || e.bullets.some(Boolean));
  const education = cv.education.filter((e) => e.degree || e.school);
  const nameParts = (cv.personal.name || "Adeline Palmerston").trim().split(/\s+/);
  const firstName = nameParts[0] || "Adeline";
  const lastName = nameParts.slice(1).join(" ") || "Palmerston";
  const references = cv.references ?? [];

  return (
    <div className="ade-page">
      <style>{`
        .ade-page {
          --navy: #323b4c;
          --ring: #7d869a;
          --font: "Bricolage Grotesque", "Segoe UI", Arial, sans-serif;
          position: relative; width: 794px; height: 1123px; min-height: 1123px;
          background: #fff; overflow: hidden;
          font-family: var(--font); color: #000;
          -webkit-print-color-adjust: exact; print-color-adjust: exact; text-align: left;
        }
        .ade-page *, .ade-page *::before, .ade-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .ade-abs { position: absolute; }
        .ade-top { left: 0; top: 0; width: 282px; height: 229px; background: var(--navy); border-bottom-right-radius: 60px; }
        .ade-photo { position: absolute; left: 57px; top: 33px; width: 166px; height: 166px; border-radius: 50%; border: 3.5px solid var(--ring); overflow: hidden; background: #fff; }
        .ade-photo img { width: 100%; height: 100%; object-fit: cover; object-position: 89% 50%; display: block; }
        .ade-photo-initial { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: var(--navy); color: #fff; font-weight: 700; font-size: 54px; }
        
        .ade-panel { left: 0; top: 326px; width: 282px; height: 797px; background: var(--navy); border-top-right-radius: 60px; }
        .ade-name { left: 325px; top: 58px; font-weight: 700; font-size: 44px; line-height: 47px; color: var(--navy); text-transform: uppercase; }
        .ade-role { left: 325px; top: 162px; font-size: 17px; line-height: 22px; letter-spacing: .2em; color: var(--navy); text-transform: uppercase; white-space: nowrap; }
        
        .ade-bar { left: 20px; top: 248px; width: 757px; height: 57px; border-radius: 29px; background: var(--navy); color: #fff; font-size: 12px; }
        .ade-bar span { position: absolute; top: 0; height: 57px; display: flex; align-items: center; gap: 9px; white-space: nowrap; }
        .ade-bar svg { width: 15px; height: 15px; fill: #fff; flex: none; }
        
        .ade-lh { font-weight: 700; font-size: 22px; line-height: 26px; letter-spacing: .1em; white-space: nowrap; }
        .ade-side-h { left: 49px; color: #fff; }
        .ade-rule { height: 1px; }
        .ade-side-rule { left: 49px; width: 233px; background: #fff; }
        .ade-main-h { left: 325px; color: var(--navy); }
        .ade-main-rule { left: 325px; width: 431px; background: var(--navy); }
        
        .ade-sw { color: #fff; font-size: 13px; line-height: 20px; }
        .ade-sw b { font-size: 15.5px; display: block; line-height: 22px; }
        .ade-sk { left: 49px; color: #fff; font-size: 13.5px; line-height: 28.5px; }
        .ade-lg { left: 49px; color: #fff; font-size: 13.5px; line-height: 24px; }
        ul.ade-c { left: 49px; width: 225px; list-style: none; color: #fff; font-size: 13.5px; line-height: 18px; }
        ul.ade-c li { position: relative; padding-left: 19px; margin-bottom: 7px; }
        ul.ade-c li::before { content: ""; position: absolute; left: 6px; top: 7px; width: 4.5px; height: 4.5px; border-radius: 50%; background: #fff; }
        
        .ade-jt { left: 325px; font-weight: 700; font-size: 15.5px; line-height: 20px; color: #000; }
        .ade-jd { left: 640px; width: 116px; text-align: right; font-size: 12px; line-height: 20px; color: #000; }
        .ade-co { left: 325px; font-size: 12px; line-height: 20px; color: #000; }
        .ade-tx { left: 325px; width: 431px; font-size: 11.2px; line-height: 16.2px; text-align: justify; color: #000; }
        .ade-rf { font-size: 12px; line-height: 24px; color: #000; }
      `}</style>

      <div className="ade-abs ade-top" />
      <div className="ade-photo">
        {cv.personal.photo ? (
          <img src={cv.personal.photo} alt={`Photo de ${cv.personal.name}`} />
        ) : (
          <div className="ade-photo-initial">{firstName.charAt(0)}</div>
        )}
      </div>

      <div className="ade-abs ade-name">{firstName}<br />{lastName}</div>
      <div className="ade-abs ade-role">{cv.title || "Graphic Designer"}</div>

      <div className="ade-abs ade-bar">
        <span style={{ left: "23px" }}>
          <svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.500.6 3.600.1.3 0 .7-.2 1z" /></svg>
          {cv.personal.phone || "+123-456-7890"}
        </span>
        <span style={{ left: "178px" }}>
          <svg viewBox="0 0 24 24"><path d="M2 5h20v2l-10 6L2 7zm0 4.500l10 6 10-6V19H2z" /></svg>
          {cv.personal.email || "hello@reallygreatsite.com"}
        </span>
        <span style={{ left: "373px" }}>
          <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c1 1.200 1.800 3 2.100 5H9.900C10.200 7 11 5.200 12 4zM4.300 11h3.600a16 16 0 000 2H4.300a8 8 0 010-2zm.6 4h3.200c.3 1.500.8 2.800 1.500 3.900A8 8 0 014.900 15zm3.200-6H4.900a8 8 0 014.700-3.900C8.900 6.200 8.400 7.500 8.100 9zM12 20c-1-1.200-1.800-3-2.100-5h4.200c-.3 2-1.100 3.800-2.100 5zm2.400-7H9.600a14 14 0 010-2h4.800a14 14 0 010 2zm.1 5.900c.7-1.100 1.200-2.400 1.500-3.900h3.200a8 8 0 01-4.700 3.900zM16.100 13a16 16 0 000-2h3.600a8 8 0 010 2zM15.900 9c-.3-1.500-.8-2.800-1.500-3.900A8 8 0 0119.100 9z" /></svg>
          {cv.personal.link || "www.reallygreatsite.com"}
        </span>
        <span style={{ left: "567px" }}>
          <svg viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h5v-6h4v6h5v-8h3z" /></svg>
          {cv.personal.location || "123 Anywhere St., Any City"}
        </span>
      </div>

      <div className="ade-abs ade-panel" />

      {/* Colonne gauche */}
      <div className="ade-abs ade-lh ade-side-h" style={{ top: "380px" }}>Éducation</div>
      <div className="ade-abs ade-rule ade-side-rule" style={{ top: "413px" }} />
      {education[0] && (
        <div className="ade-abs ade-sw" style={{ left: "49px", top: "424px", width: "225px" }}>
          <b>{education[0].degree}</b>
          {education[0].school}<br />
          {dates(education[0].start, education[0].end)}
        </div>
      )}
      {education[1] && (
        <div className="ade-abs ade-sw" style={{ left: "49px", top: "528px", width: "225px" }}>
          <b>{education[1].degree}</b>
          {education[1].school}<br />
          {dates(education[1].start, education[1].end)}
        </div>
      )}

      <div className="ade-abs ade-lh ade-side-h" style={{ top: "644px" }}>Certifications</div>
      <div className="ade-abs ade-rule ade-side-rule" style={{ top: "683px" }} />
      <ul className="ade-abs ade-c" style={{ top: "698px" }}>
        {(cv.certifications ?? ["Certified Graphic Designer.", "User Experience (UX) Design Certificate."]).map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>

      {cv.skills.length > 0 && (
        <>
          <div className="ade-abs ade-lh ade-side-h" style={{ top: "782px" }}>Compétences</div>
          <div className="ade-abs ade-rule ade-side-rule" style={{ top: "816px" }} />
          <div className="ade-abs ade-sk" style={{ top: "823px" }}>
            {cv.skills.slice(0, 5).map((s, i) => <div key={i}>{s}</div>)}
          </div>
        </>
      )}

      {cv.languages.length > 0 && (
        <>
          <div className="ade-abs ade-lh ade-side-h" style={{ top: "977px" }}>Langues</div>
          <div className="ade-abs ade-rule ade-side-rule" style={{ top: "1011px" }} />
          <div className="ade-abs ade-lg" style={{ top: "1023px" }}>
            {cv.languages.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        </>
      )}

      {/* Colonne droite */}
      {cv.summary && (
        <>
          <div className="ade-abs ade-lh ade-main-h" style={{ top: "380px" }}>À Propos</div>
          <div className="ade-abs ade-rule ade-main-rule" style={{ top: "412px" }} />
          <div className="ade-abs ade-tx" style={{ top: "422px" }}>{cv.summary}</div>
        </>
      )}

      {experiences.length > 0 && (
        <>
          <div className="ade-abs ade-lh ade-main-h" style={{ top: "513px" }}>Expériences</div>
          <div className="ade-abs ade-rule ade-main-rule" style={{ top: "548px" }} />

          {experiences[0] && (
            <>
              <div className="ade-abs ade-jt" style={{ top: "560px" }}>{experiences[0].role}</div>
              <div className="ade-abs ade-jd" style={{ top: "562px" }}>{dates(experiences[0].start, experiences[0].end)}</div>
              <div className="ade-abs ade-co" style={{ top: "585px" }}>{experiences[0].company}</div>
              <div className="ade-abs ade-tx" style={{ top: "610px" }}>
                {experiences[0].bullets.join(" ") || "Responsable de la création graphique et du design d'interface."}
              </div>
            </>
          )}

          {experiences[1] && (
            <>
              <div className="ade-abs ade-jt" style={{ top: "696px" }}>{experiences[1].role}</div>
              <div className="ade-abs ade-jd" style={{ top: "698px" }}>{dates(experiences[1].start, experiences[1].end)}</div>
              <div className="ade-abs ade-co" style={{ top: "721px" }}>{experiences[1].company}</div>
              <div className="ade-abs ade-tx" style={{ top: "746px" }}>
                {experiences[1].bullets.join(" ") || "Conception de maquettes et chartes graphiques de marques."}
              </div>
            </>
          )}

          {experiences[2] && (
            <>
              <div className="ade-abs ade-jt" style={{ top: "834px" }}>{experiences[2].role}</div>
              <div className="ade-abs ade-jd" style={{ top: "836px" }}>{dates(experiences[2].start, experiences[2].end)}</div>
              <div className="ade-abs ade-co" style={{ top: "859px" }}>{experiences[2].company}</div>
              <div className="ade-abs ade-tx" style={{ top: "884px" }}>
                {experiences[2].bullets.join(" ") || "Gestion des livrables de production et supports marketing."}
              </div>
            </>
          )}
        </>
      )}

      <div className="ade-abs ade-lh ade-main-h" style={{ top: "977px" }}>Références</div>
      <div className="ade-abs ade-rule ade-main-rule" style={{ top: "1011px" }} />
      <div className="ade-abs ade-rf" style={{ left: "325px", top: "1021px" }}>
        {references[0] ? (
          <>{references[0].name}<br />{references[0].company}<br />{references[0].contact}</>
        ) : (
          <>Alfredo Torres | Directeur<br />Aldenaire &amp; Partners<br />+123-456-7890</>
        )}
      </div>
      <div className="ade-abs ade-rf" style={{ left: "609px", top: "1021px" }}>
        {references[1] ? (
          <>{references[1].name}<br />{references[1].company}<br />{references[1].contact}</>
        ) : (
          <>Harumi Kobayashi | CEO<br />Ingoude Company<br />+123-456-7890</>
        )}
      </div>
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
    default:
      // Repli sur le modèle Développeur Web & Mobile
      return <EmeraldTech cv={cv} />;
  }
}
