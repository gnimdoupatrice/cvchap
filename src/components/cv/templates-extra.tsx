import type { CV } from "@/lib/cv/types";

/* Modèles 5 à 9 — reproductions des HTML fournis.
   Géométrie A4 fixe 794 × 1123 ; les sections suivent un flux vertical
   pour qu'un contenu plus long ne chevauche jamais la section suivante. */

const dates = (s: string, e: string) => [s, e].filter(Boolean).join(" - ");
const initials = (n: string) =>
  n.split(/\s+/).filter(Boolean).slice(0, 2).map((x) => x[0]?.toUpperCase()).join("");
const splitName = (n: string) => {
  const parts = n.trim().split(/\s+/);
  if (parts.length < 2) return [n, ""];
  return [parts.slice(0, -1).join(" "), parts[parts.length - 1]];
};
const langName = (l: string) => l.split(/—|-|\(/)[0].trim();
const langPct = (l: string, i: number) => {
  const m = l.match(/(\d+)\s*%/);
  if (m) return Math.min(100, +m[1]);
  if (/natif|native|maternel|bilingue/i.test(l)) return 100;
  if (/courant|fluent|professional/i.test(l)) return 85;
  if (/interm/i.test(l)) return 60;
  if (/basic|notions|débutant/i.test(l)) return 35;
  return 70 - i * 10;
};

const Photo = ({ cv, style }: { cv: CV; style?: React.CSSProperties }) =>
  cv.personal.photo ? (
    <img src={cv.personal.photo} alt={cv.personal.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }} />
  ) : (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.4em", fontWeight: 700, ...style }}>
      {initials(cv.personal.name)}
    </div>
  );

const page: React.CSSProperties = {
  width: 794, height: 1123, position: "relative", overflow: "hidden",
  WebkitPrintColorAdjust: "exact", printColorAdjust: "exact",
};
/* Repère 920 × 1301 des HTML d'origine, réduit à l'A4. */
const P = ({ children }: { children: React.ReactNode }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: 920, height: 1301, transform: "scale(.863)", transformOrigin: "0 0" }}>{children}</div>
);

/* ============ SACHA DUBOIS — Chargée de projet ============ */
export function SachaDubois({ cv }: { cv: CV }) {
  const navy = "#10375d", blue = "#296197", dark = "#0f375c";
  const H = ({ c }: { c: string }) => (
    <div style={{ fontFamily: "'League Spartan',sans-serif", fontWeight: 700, fontSize: 21.4, color: dark, marginBottom: 14 }}>{c}</div>
  );
  const SH = ({ c }: { c: string }) => (
    <div style={{ fontFamily: "'League Spartan',sans-serif", fontWeight: 700, fontSize: 16.9, marginBottom: 12 }}>{c}</div>
  );
  return (
    <div style={{ ...page, background: "#fff", fontFamily: "Poppins,sans-serif" }}>
      <aside style={{ position: "absolute", left: 0, top: 0, width: 287, height: 1123, background: navy, color: "#fff", padding: "40px 30px 30px 40px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 30 }}>
        <div style={{ width: 184, height: 215, borderRadius: 8, overflow: "hidden", background: blue, alignSelf: "center" }}>
          <Photo cv={cv} />
        </div>
        <section>
          <SH c="COORDONNÉES" />
          {[cv.personal.phone, cv.personal.email, cv.personal.location, cv.personal.link].filter(Boolean).map((v, i) => (
            <div key={i} style={{ fontWeight: 300, fontSize: 12.5, marginBottom: 14, display: "flex", gap: 12, alignItems: "center", wordBreak: "break-all" }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", border: "1.5px solid #fff", flex: "none" }} />
              {v}
            </div>
          ))}
        </section>
        {cv.languages.length > 0 && (
          <section><SH c="LANGUES" />
            {cv.languages.map((l, i) => <div key={i} style={{ fontSize: 13.3, marginBottom: 8 }}>{l}</div>)}
          </section>
        )}
        {cv.skills.length > 0 && (
          <section><SH c="COMPÉTENCES" />
            {cv.skills.map((s, i) => <div key={i} style={{ fontSize: 13.3, lineHeight: "18px", marginBottom: 7 }}>{s}</div>)}
          </section>
        )}
        {cv.interests.length > 0 && (
          <section><SH c="CENTRES D'INTÉRET" />
            {cv.interests.map((s, i) => <div key={i} style={{ fontSize: 13.3, marginBottom: 8 }}>{s}</div>)}
          </section>
        )}
      </aside>
      <main style={{ position: "absolute", left: 333, top: 100, right: 60, color: blue }}>
        <div style={{ fontFamily: "'League Spartan',sans-serif", fontWeight: 700, fontSize: 48, lineHeight: 1, color: dark, textTransform: "uppercase" }}>{cv.personal.name}</div>
        <div style={{ fontWeight: 500, fontSize: 24, marginTop: 18, textTransform: "uppercase" }}>{cv.title}</div>
        {cv.summary && <p style={{ fontSize: 13, lineHeight: "19px", marginTop: 18 }}>{cv.summary}</p>}
        <div style={{ marginTop: 40 }}><H c="FORMATION" />
          {cv.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 18, position: "relative" }}>
              <div style={{ fontWeight: 700, fontSize: 16, paddingRight: 90 }}>{e.degree}</div>
              <div style={{ fontSize: 16 }}>{e.school}</div>
              <div style={{ position: "absolute", right: 0, top: 2, fontStyle: "italic", fontWeight: 500, fontSize: 12.5 }}>{dates(e.start, e.end)}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 30 }}><H c="EXPÉRIENCE PROFESSIONNELLE" />
          {cv.experiences.map((x) => (
            <div key={x.id} style={{ marginBottom: 22, position: "relative" }}>
              <div style={{ fontWeight: 700, fontSize: 16, paddingRight: 110 }}>{x.role}</div>
              <div style={{ fontWeight: 300, fontStyle: "italic", fontSize: 16 }}>{x.company}</div>
              <div style={{ position: "absolute", right: 0, top: 2, width: 105, textAlign: "right", fontStyle: "italic", fontWeight: 500, fontSize: 12.5, lineHeight: "15px" }}>{dates(x.start, x.end)}</div>
              <ul style={{ margin: "14px 0 0", padding: 0, listStyle: "none" }}>
                {x.bullets.map((b, i) => (
                  <li key={i} style={{ fontSize: 16, lineHeight: "22px", paddingLeft: 27, position: "relative" }}>
                    <span style={{ position: "absolute", left: 9, top: 8, width: 6, height: 6, borderRadius: "50%", background: blue }} />{b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/* ============ MICHAEL HENSON — Sales Representative ============ */
export function MichaelHenson({ cv }: { cv: CV }) {
  const navy = "#253452", gold = "#f2a900";
  const [first, last] = splitName(cv.personal.name);
  const HL = ({ c }: { c: string }) => <div style={{ fontWeight: 600, fontSize: 17.5, letterSpacing: ".14em", color: navy, marginBottom: 16 }}>{c}</div>;
  const HG = ({ c }: { c: string }) => <div style={{ fontWeight: 600, fontSize: 17.5, letterSpacing: ".14em", color: gold, marginBottom: 18 }}>{c}</div>;
  const Dot = () => <span style={{ position: "absolute", left: -16, top: 9, width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />;
  return (
    <div style={{ ...page, background: "#fdfdfd", fontFamily: "Poppins,sans-serif", color: "#333" }}>
      <P>
        <div style={{ position: "absolute", left: 577, top: 0, width: 343, height: 1301, background: navy, borderLeft: `6px solid ${gold}`, boxSizing: "border-box" }} />
        <div style={{ position: "absolute", left: 616, top: 94, width: 214, height: 214, borderRadius: "50%", border: `6px solid ${gold}`, padding: 3, background: navy, boxSizing: "border-box", color: "#fff" }}>
          <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden" }}><Photo cv={cv} /></div>
        </div>
        <div style={{ position: "absolute", left: 93, top: 92, width: 460, color: navy }}>
          <div style={{ fontWeight: 300, fontSize: 60, lineHeight: "70px", textTransform: "uppercase" }}>{first}</div>
          <div style={{ fontWeight: 700, fontSize: 60, lineHeight: "70px", textTransform: "uppercase" }}>{last}</div>
          <div style={{ fontWeight: 300, fontSize: 26, color: "#333", marginTop: 4 }}>{cv.title}</div>
        </div>
        <div style={{ position: "absolute", left: 93, top: 355, width: 434, display: "flex", flexDirection: "column", gap: 34 }}>
          {cv.summary && <section><HL c="SUMMARY" /><p style={{ margin: 0, fontWeight: 300, fontSize: 15.5, lineHeight: "22px", textAlign: "justify" }}>{cv.summary}</p></section>}
          <section><HL c="WORK EXPERIENCE" />
            {cv.experiences.map((x) => (
              <div key={x.id} style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 300, fontSize: 17, color: "#444" }}>({dates(x.start, x.end)})</div>
                <div style={{ fontWeight: 500, fontSize: 14.5, letterSpacing: ".1em", color: "#2a2f3a", margin: "4px 0 6px" }}>{x.role}{x.company ? ` l ${x.company}` : ""}</div>
                {x.bullets.map((b, i) => (
                  <p key={i} style={{ margin: 0, position: "relative", paddingLeft: 25, fontWeight: 300, fontSize: 15, lineHeight: "22px" }}>
                    <span style={{ position: "absolute", left: 10, top: 9, width: 5, height: 5, borderRadius: "50%", background: "#333" }} />{b}
                  </p>
                ))}
              </div>
            ))}
          </section>
          {!!cv.references?.length && (
            <section><HL c="REFERENCES" />
              <div style={{ display: "flex", gap: 40 }}>
                {cv.references.slice(0, 2).map((r, i) => (
                  <div key={i} style={{ fontWeight: 300, fontSize: 13, lineHeight: "21px" }}>
                    <b style={{ fontWeight: 600, fontSize: 15 }}>{r.name}</b><br />{r.company}<br />{r.contact}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        <div style={{ position: "absolute", left: 615, top: 355, width: 285, color: "#fff", display: "flex", flexDirection: "column", gap: 38 }}>
          <section><HG c="CONTACT" />
            {[cv.personal.phone, cv.personal.email, cv.personal.link, cv.personal.location].filter(Boolean).map((v, i) => (
              <div key={i} style={{ display: "flex", gap: 13, alignItems: "center", fontWeight: 300, fontSize: 15, marginBottom: 12, wordBreak: "break-all" }}>
                <span style={{ width: 17, height: 17, borderRadius: "50%", background: gold, flex: "none" }} />{v}
              </div>
            ))}
          </section>
          <section><HG c="EDUCATION" />
            {cv.education.map((e) => (
              <div key={e.id} style={{ fontWeight: 300, fontSize: 13, lineHeight: "21px", marginBottom: 10 }}>
                <b style={{ fontWeight: 700 }}>{e.school}</b><br />{e.degree}<br />{dates(e.start, e.end)}
              </div>
            ))}
          </section>
          {cv.skills.length > 0 && <section><HG c="SKILLS" />
            {cv.skills.map((s, i) => <div key={i} style={{ position: "relative", marginLeft: 26, fontWeight: 300, fontSize: 16.5, lineHeight: "29px" }}><Dot />{s}</div>)}
          </section>}
          {cv.languages.length > 0 && <section><HG c="LANGUAGE" />
            {cv.languages.map((s, i) => <div key={i} style={{ position: "relative", marginLeft: 21, fontWeight: 300, fontSize: 13.5, lineHeight: "25px" }}><Dot />{s}</div>)}
          </section>}
        </div>
      </P>
    </div>
  );
}

/* ============ DR. ELVIRA MONTANEZ — Médical ============ */
export function ElviraMontanez({ cv }: { cv: CV }) {
  const blue = "#2878ab", mint = "#e9faf9";
  const head = "Archivo,sans-serif";
  const H = ({ c }: { c: string }) => <div style={{ fontFamily: head, fontWeight: 700, fontSize: 24, color: blue, marginBottom: 26 }}>{c}</div>;
  const Ic = ({ kind }: { kind: "work" | "edu" }) => (
    <div style={{ position: "absolute", left: -77, top: -4, width: 52, height: 52, borderRadius: "50%", background: blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 30 30" width="30" height="30" fill="none" stroke="#fff" strokeWidth="2.4">
        {kind === "work" ? <path d="M11 5h8v6h6v8h-6v6h-8v-6H5v-8h6z" /> : <><rect x="4" y="6" width="22" height="15" rx="1.5" /><path d="M8 11h14M8 15h8" /></>}
      </svg>
    </div>
  );
  const Bul = ({ items }: { items: string[] }) => (
    <div style={{ marginTop: 14 }}>{items.map((b, i) => (
      <p key={i} style={{ margin: 0, position: "relative", paddingLeft: 29, fontSize: 17, lineHeight: "27px" }}>
        <span style={{ position: "absolute", left: 11, top: 11, width: 7, height: 7, borderRadius: "50%", background: "#000" }} />{b}
      </p>))}</div>
  );
  const contacts = [cv.personal.link, cv.personal.email, cv.personal.phone, cv.personal.location].filter(Boolean);
  return (
    <div style={{ ...page, background: "#fff", fontFamily: "'Nunito Sans',sans-serif", color: "#000" }}>
      <P>
        <div style={{ position: "absolute", left: 0, top: 0, width: 920, height: 305, background: blue }} />
        <div style={{ position: "absolute", left: 582, top: 305, width: 338, height: 996, background: mint }} />
        <div style={{ position: "absolute", left: 665, top: 63, width: 178, height: 178, borderRadius: "50%", overflow: "hidden", background: "#fff", color: blue }}><Photo cv={cv} /></div>
        <div style={{ position: "absolute", left: 73, top: 70, width: 520, color: "#fff" }}>
          <div style={{ fontFamily: head, fontWeight: 700, fontSize: 42, lineHeight: "52px" }}>{cv.personal.name}</div>
          <div style={{ fontFamily: head, fontWeight: 700, fontSize: 29, marginTop: 6 }}>{cv.title}</div>
          <div style={{ height: 1.5, background: "#fff", margin: "18px 0 20px", width: 508 }} />
          <div style={{ display: "grid", gridTemplateColumns: "248px 1fr", rowGap: 4, fontWeight: 300, fontSize: 15.5 }}>
            {contacts.map((c, i) => <div key={i} style={{ wordBreak: "break-all" }}>{c}</div>)}
          </div>
        </div>
        <div style={{ position: "absolute", left: 150, top: 350, width: 400 }}>
          <H c="Work Experience" />
          <div style={{ marginLeft: -77, marginTop: -26 }} />
          {cv.experiences.map((x) => (
            <div key={x.id} style={{ position: "relative", marginBottom: 24 }}>
              <Ic kind="work" />
              <div style={{ fontWeight: 700, fontSize: 16.5 }}>{x.role}{x.company ? ` | ${x.company}` : ""}</div>
              <div style={{ fontStyle: "italic", fontSize: 16.5, marginTop: 4 }}>{dates(x.start, x.end)}</div>
              <Bul items={x.bullets} />
            </div>
          ))}
          <div style={{ marginTop: 20 }}><H c="Education History" /></div>
          {cv.education.map((e) => (
            <div key={e.id} style={{ position: "relative", marginBottom: 24 }}>
              <Ic kind="edu" />
              <div style={{ fontWeight: 700, fontSize: 16.5, lineHeight: "26px" }}>{e.degree}{e.school ? ` | ${e.school}` : ""}</div>
              <div style={{ fontStyle: "italic", fontSize: 16.5 }}>{dates(e.start, e.end)}</div>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 634, top: 350, width: 260 }}>
          {cv.summary && <div style={{ marginBottom: 30 }}><H c="Profile" /><p style={{ margin: "-12px 0 0", fontSize: 15.5, lineHeight: "23px" }}>{cv.summary}</p></div>}
          <H c="Relevant Skills" />
          {cv.skills.map((s, i) => (
            <div key={i} style={{ position: "relative", paddingLeft: 33, fontSize: 17, lineHeight: "27px" }}>
              <span style={{ position: "absolute", left: 16, top: 10, width: 8, height: 8, borderRadius: "50%", background: "#000" }} />{s}
            </div>
          ))}
          {!!cv.highlights?.length && <div style={{ marginTop: 40 }}><H c="Volunteer Work and Affiliations" />
            {cv.highlights.map((h, i) => (
              <div key={i} style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 700, fontSize: 16.5, lineHeight: "27px" }}>{h.title}</div>
                <div style={{ fontStyle: "italic", fontSize: 16.5 }}>{h.text}</div>
              </div>
            ))}
          </div>}
          {cv.languages.length > 0 && <div style={{ marginTop: 30 }}><H c="Languages" />
            {cv.languages.map((s, i) => <div key={i} style={{ fontSize: 16.5, lineHeight: "27px" }}>{s}</div>)}
          </div>}
        </div>
      </P>
    </div>
  );
}

/* ============ EMMA BROOKS — Interior Architect ============ */
export function EmmaBrooks({ cv }: { cv: CV }) {
  const bg = "#f7f3eb", navy = "#0d2a5c", red = "#d9502e";
  const osw = "Oswald,sans-serif";
  const [first, last] = splitName(cv.personal.name);
  const ini = initials(cv.personal.name);
  const H = ({ c }: { c: string }) => <div style={{ fontFamily: osw, fontWeight: 300, fontSize: 29, color: navy, marginBottom: 18 }}>{c}</div>;
  const RH = ({ c }: { c: string }) => <div style={{ fontFamily: osw, fontWeight: 600, fontSize: 15.5, color: navy, letterSpacing: ".02em" }}>{c}</div>;
  const R = ({ c }: { c: string }) => <div style={{ fontSize: 15.5, lineHeight: "21px" }}>{c}</div>;
  return (
    <div style={{ ...page, background: bg, fontFamily: "Montserrat,sans-serif", color: "#333" }}>
      <P>
        {ini[0] && <div style={{ position: "absolute", left: 432, top: -95, fontWeight: 500, fontSize: 560, lineHeight: "560px", color: "#e4e0ee" }}>{ini[0]}</div>}
        {ini[1] && <div style={{ position: "absolute", left: 790, top: -95, fontWeight: 500, fontSize: 560, lineHeight: "560px", color: "#e4e0ee" }}>{ini[1]}</div>}
        <div style={{ position: "absolute", left: 520, top: 110, width: 340, height: 440, borderRadius: "170px 170px 0 0", overflow: "hidden", color: navy }}><Photo cv={cv} /></div>
        <div style={{ position: "absolute", left: 38, top: 70, width: 440, color: navy, fontFamily: osw }}>
          <div style={{ fontSize: 84, lineHeight: "88px", letterSpacing: ".02em", textTransform: "uppercase" }}>{first}</div>
          <div style={{ fontSize: 84, lineHeight: "88px", letterSpacing: ".02em", textTransform: "uppercase" }}>{last}</div>
          <div style={{ fontSize: 28, color: red, letterSpacing: ".03em", textTransform: "uppercase", marginTop: 6 }}>{cv.title}</div>
          <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, marginTop: 30, color: "#333", display: "flex", flexDirection: "column", gap: 22 }}>
            {[cv.personal.phone, cv.personal.email, cv.personal.location].filter(Boolean).map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", border: "1.3px solid #444", flex: "none" }} />{c}
              </div>
            ))}
          </div>
          {cv.summary && <p style={{ fontFamily: "Montserrat,sans-serif", fontSize: 15.5, lineHeight: "21px", color: "#333", margin: "26px 0 0" }}>{cv.summary}</p>}
        </div>
        <div style={{ position: "absolute", left: 0, top: 607, width: 920, height: 1.5, background: "#e0623f" }} />
        <div style={{ position: "absolute", left: 626, top: 608, width: 1, height: 614, background: "#444" }} />
        <div style={{ position: "absolute", left: 37, top: 628, width: 570 }}>
          <H c="EXPERIENCE" />
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 98, top: 6, bottom: 20, width: 1.5, background: red }} />
            {cv.experiences.map((x) => (
              <div key={x.id} style={{ position: "relative", paddingLeft: 128, marginBottom: 26, minHeight: 60 }}>
                <div style={{ position: "absolute", left: 1, top: 0, width: 74, textAlign: "center", fontSize: 15, lineHeight: "17.5px", color: "#222", textTransform: "uppercase" }}>
                  {x.start}<br />–<br />{x.end}
                </div>
                <div style={{ position: "absolute", left: 92, top: 3, width: 14, height: 14, borderRadius: "50%", background: red }} />
                <div style={{ fontFamily: osw, fontWeight: 600, fontSize: 16, letterSpacing: ".09em", color: navy, textTransform: "uppercase" }}>{x.role}</div>
                <div style={{ fontStyle: "italic", fontSize: 15.5, margin: "4px 0 8px" }}>{x.company}</div>
                <div style={{ fontSize: 15.5, lineHeight: "21px" }}>{x.bullets.join(" ")}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", left: 649, top: 628, width: 250, display: "flex", flexDirection: "column", gap: 24 }}>
          <section><H c="EDUCATION" />
            {cv.education.map((e) => <div key={e.id} style={{ marginBottom: 12 }}><RH c={e.degree.toUpperCase()} /><R c={[e.school, e.end].filter(Boolean).join(" | ")} /></div>)}
          </section>
          {!!cv.certifications?.length && <section><H c="PROJECTS" />{cv.certifications.map((c, i) => <R key={i} c={c} />)}</section>}
          {cv.skills.length > 0 && <section><H c="SKILLS" />{cv.skills.map((c, i) => <R key={i} c={c} />)}</section>}
          {cv.languages.length > 0 && <section><H c="LANGUAGES" />{cv.languages.map((c, i) => <R key={i} c={c} />)}</section>}
        </div>
      </P>
    </div>
  );
}

/* ============ DREW FEIG — Marketing Manager (sombre) ============ */
export function DrewFeig({ cv }: { cv: CV }) {
  const main = "#313657", strip = "#34395d", box = "#0b0e19", side = "#1b1f3b", about = "#191c2f";
  const H = ({ c }: { c: string }) => <div style={{ fontWeight: 700, fontSize: 33, marginBottom: 20 }}>{c}</div>;
  return (
    <div style={{ ...page, background: main, fontFamily: "'Open Sans',sans-serif", color: "#fff" }}>
      <P>
        <div style={{ position: "absolute", left: 0, top: 0, width: 304, height: 1301, background: side }} />
        <div style={{ position: "absolute", left: 304, top: 0, width: 616, height: 42, background: strip }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 290, height: 248, overflow: "hidden", background: "#4a6a85" }}><Photo cv={cv} /></div>
        <div style={{ position: "absolute", left: 0, top: 248, width: 290, height: 384, background: box }} />
        <div style={{ position: "absolute", left: 127, top: 440, transform: "translate(-50%,-50%) rotate(-90deg)", fontWeight: 800, fontSize: 40, whiteSpace: "nowrap", textTransform: "uppercase" }}>{cv.personal.name}</div>
        <div style={{ position: "absolute", left: 183, top: 440, transform: "translate(-50%,-50%) rotate(-90deg)", fontWeight: 300, fontSize: 22, letterSpacing: ".17em", whiteSpace: "nowrap", textTransform: "uppercase" }}>{cv.title}</div>
        <div style={{ position: "absolute", left: 0, top: 666, width: 290, bottom: 30, background: box, padding: "30px 25px 30px 61px", boxSizing: "border-box" }}>
          <div style={{ fontWeight: 700, fontSize: 33, marginBottom: 20 }}>Contact</div>
          {([["Phone", cv.personal.phone], ["Email", cv.personal.email], ["Address", cv.personal.location]] as const).filter(([, v]) => v).map(([l, v]) => (
            <div key={l} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 21 }}>{l}</div>
              <div style={{ fontWeight: 300, fontSize: 15, wordBreak: "break-all" }}>{v}</div>
            </div>
          ))}
          {cv.skills.length > 0 && <>
            <div style={{ fontWeight: 700, fontSize: 33, margin: "34px 0 16px" }}>Expertise</div>
            {cv.skills.map((s, i) => (
              <div key={i} style={{ position: "relative", paddingLeft: 25, fontWeight: 300, fontSize: 15.5, lineHeight: "30px" }}>
                <span style={{ position: "absolute", left: 0, top: 12, width: 7, height: 7, borderRadius: "50%", background: "#fff" }} />{s}
              </div>
            ))}
          </>}
        </div>
        <div style={{ position: "absolute", left: 304, top: 42, width: 616, height: 205, background: about }} />
        <div style={{ position: "absolute", left: 335, top: 70, width: 526, display: "flex", flexDirection: "column", gap: 34 }}>
          <section style={{ minHeight: 160 }}><H c="About Me" /><p style={{ margin: 0, fontSize: 15, lineHeight: "21px", textAlign: "justify" }}>{cv.summary}</p></section>
          <section><H c="Experience" />
            {cv.experiences.map((x) => (
              <div key={x.id} style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{x.company} {dates(x.start, x.end)}</div>
                <div style={{ fontStyle: "italic", fontSize: 15 }}>{x.role}</div>
                <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: "21px", textAlign: "justify" }}>{x.bullets.join(" ")}</p>
              </div>
            ))}
          </section>
          <section><H c="Education" />
            {cv.education.map((e) => (
              <div key={e.id} style={{ marginBottom: 14, fontSize: 15 }}>
                <b>{dates(e.start, e.end)}</b> · <i>{e.school}</i><br /><b>{e.degree}</b>
              </div>
            ))}
          </section>
          <section style={{ display: "flex", gap: 40 }}>
            {!!cv.references?.length && <div style={{ flex: 1 }}><H c="Reference" />
              <div style={{ fontWeight: 700, fontSize: 16 }}>{cv.references[0].name}</div>
              <div style={{ fontStyle: "italic", fontSize: 15 }}>{cv.references[0].company}</div>
              <div style={{ fontSize: 14, marginTop: 6 }}>{cv.references[0].contact}</div>
            </div>}
            {cv.languages.length > 0 && <div style={{ width: 240 }}><H c="Language" />
              {cv.languages.map((l, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 300, fontSize: 15.5, marginBottom: 10 }}>
                  {langName(l)}
                  <span style={{ width: 91, height: 5, background: "#222c36" }}><i style={{ display: "block", height: "100%", width: `${langPct(l, i)}%`, background: "#fff" }} /></span>
                </div>
              ))}
            </div>}
          </section>
        </div>
      </P>
    </div>
  );
}
