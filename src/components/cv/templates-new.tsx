import type { CV } from "@/lib/cv/types";

/* Quatre modèles reproduits à partir des HTML fournis (Morton, Sanchez, Gallego, Martinez).
   Géométrie A4 fixe 794 × 1123 ; les colonnes sont en flux vertical pour éviter tout chevauchement. */

const dates = (s: string, e: string) => [s, e].filter(Boolean).join(" – ");
const initials = (n: string) =>
  n.split(/\s+/).filter(Boolean).slice(0, 2).map((x) => x[0]?.toUpperCase()).join("");
const splitName = (n: string) => {
  const p = n.trim().split(/\s+/);
  if (p.length < 2) return [n, ""];
  return [p.slice(0, -1).join(" "), p[p.length - 1] ?? ""];
};

const page: React.CSSProperties = {
  width: 794, height: 1123, position: "relative", overflow: "hidden",
  WebkitPrintColorAdjust: "exact", printColorAdjust: "exact", boxSizing: "border-box",
};

const Photo = ({ cv, bg = "#ccc" }: { cv: CV; bg?: string }) =>
  cv.personal.photo ? (
    <img src={cv.personal.photo} alt={cv.personal.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 18%", display: "block" }} />
  ) : (
    <div style={{ width: "100%", height: "100%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 54, fontWeight: 700, color: "#fff" }}>
      {initials(cv.personal.name)}
    </div>
  );

const Bullets = ({ items, size = 13, color, dot, gap = 3, lh = 1.4 }: { items: string[]; size?: number; color?: string; dot: string; gap?: number; lh?: number }) => (
  <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
    {items.filter(Boolean).map((b, i) => (
      <li key={i} style={{ position: "relative", paddingLeft: 18, fontSize: size, lineHeight: lh, color, marginBottom: gap }}>
        <span style={{ position: "absolute", left: 4, top: size * lh / 2 - 2, width: 4, height: 4, borderRadius: "50%", background: dot }} />
        {b}
      </li>
    ))}
  </ul>
);

/* ============ DANIEL MORTON — Vert forêt & turquoise ============ */
export function DanielMorton({ cv }: { cv: CV }) {
  const dark = "#00332e", teal = "#00bfa8";
  const font = "Montserrat, sans-serif";
  const H = ({ c, light }: { c: string; light?: boolean }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, marginLeft: light ? 0 : -40 }}>
      <span style={{ width: 14, height: 14, borderRadius: "50%", background: teal, flex: "none", marginLeft: light ? 0 : 0, position: "relative", zIndex: 2 }} />
      <span style={{ fontWeight: 700, fontSize: light ? 20 : 19, lineHeight: 1.3, color: light ? "#fff" : dark, marginLeft: light ? 0 : 12 }}>{c}</span>
    </div>
  );
  const certs = cv.certifications ?? [];
  const highlights = (cv.highlights ?? []).filter((h) => h.title || h.text);
  return (
    <div style={{ ...page, background: "#fff", fontFamily: font, color: dark }}>
      {/* bandes & formes */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 794, height: 197, background: dark }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 345, height: 32, background: teal, borderBottomRightRadius: 40 }} />
      <div style={{ position: "absolute", left: 300, top: 197, width: 420, height: 26, background: teal, borderBottomRightRadius: 30, borderTopLeftRadius: 40 }} />
      <div style={{ position: "absolute", left: 0, top: 197, width: 330, height: 98, background: dark, borderBottomRightRadius: 80 }} />
      <div style={{ position: "absolute", left: 0, top: 308, width: 362, height: 815, background: dark, borderTopRightRadius: 130, borderBottomRightRadius: 260 }} />
      <div style={{ position: "absolute", left: 280, bottom: 0, width: 514, height: 32, background: teal, borderTopLeftRadius: 50 }} />

      <div style={{ position: "absolute", left: 82, top: 80, width: 204, height: 204, borderRadius: "50%", border: "7px solid #fff", overflow: "hidden", boxSizing: "border-box" }}>
        <Photo cv={cv} bg={teal} />
      </div>
      <div style={{ position: "absolute", left: 370, top: 100, right: 60, color: "#fff" }}>
        <div style={{ fontWeight: 700, fontSize: 38, lineHeight: 1.05, textTransform: "uppercase" }}>{cv.personal.name}</div>
        <div style={{ fontWeight: 400, fontSize: 18, marginTop: 6, textTransform: "uppercase" }}>{cv.title}</div>
      </div>

      {/* colonne gauche */}
      <aside style={{ position: "absolute", left: 60, top: 330, width: 264, bottom: 60, overflowWrap: "anywhere", color: "#fff", display: "flex", flexDirection: "column", gap: 28 }}>
        <section><H c="CONTACT" light />
          <Bullets dot="#fff" size={14} items={[cv.personal.phone, cv.personal.email, cv.personal.link, cv.personal.location]} gap={2} />
        </section>
        {cv.skills.length > 0 && <section><H c="SOFT SKILLS" light /><Bullets dot="#fff" size={14} items={cv.skills} gap={5} lh={1.5} /></section>}
        {highlights.length > 0 && <section><H c="CERTIFICATIONS" light />
          {highlights.map((h, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.4 }}>{h.title}</div>
              <div style={{ fontStyle: "italic", fontSize: 14, lineHeight: 1.5 }}>{h.text}</div>
            </div>
          ))}
        </section>}
        {cv.languages.length > 0 && <section><H c="LANGUES" light /><Bullets dot="#fff" size={13.5} items={cv.languages} gap={3} lh={1.45} /></section>}
      </aside>

      {/* colonne droite avec timeline */}
      <main style={{ position: "absolute", left: 424, top: 266, right: 56, bottom: 55, overflowWrap: "anywhere", borderLeft: `2px solid ${dark}`, paddingLeft: 32, display: "flex", flexDirection: "column", gap: 26 }}>
        {cv.summary && <section><H c="PROFILE" /><p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>{cv.summary}</p></section>}
        {cv.education.length > 0 && <section><H c="EDUCATION" />
          {cv.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 14 }}>{e.degree}</div>
              <Bullets dot={dark} size={14} items={[`${e.school}${e.start || e.end ? " | " + dates(e.start, e.end) : ""}`]} />
            </div>
          ))}
        </section>}
        {cv.experiences.length > 0 && <section><H c="PROJECT EXPERIENCE" />
          {cv.experiences.map((x) => (
            <div key={x.id} style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{x.role}{x.company ? ` · ${x.company}` : ""}</div>
              {(x.start || x.end) && <div style={{ fontStyle: "italic", fontSize: 13 }}>{dates(x.start, x.end)}</div>}
              <Bullets dot={dark} size={14} items={x.bullets} gap={1} />
            </div>
          ))}
        </section>}
        {certs.length > 0 && <section><H c="ACHIEVEMENTS" /><Bullets dot={dark} size={14} items={certs} gap={1} /></section>}
        {cv.interests.length > 0 && <section><H c="INTERESTS" /><Bullets dot={dark} size={14} items={cv.interests} gap={1} /></section>}
      </main>
    </div>
  );
}

/* ============ RICHARD SANCHEZ — Ardoise & bleu ciel ============ */
export function RichardSanchez({ cv }: { cv: CV }) {
  const navy = "#163550", sky = "#5aa9f5", ink = "#1f1f1f";
  const [first, last] = splitName(cv.personal.name);
  const SH = ({ c }: { c: string }) => (
    <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: ".14em", borderBottom: "1px solid #fff", paddingBottom: 6, marginBottom: 14 }}>{c}</div>
  );
  const MH = ({ c }: { c: string }) => (
    <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 19, letterSpacing: ".14em", color: ink, borderBottom: `1px solid ${navy}`, paddingBottom: 6, marginBottom: 14 }}>{c}</div>
  );
  return (
    <div style={{ ...page, background: "#fff", fontFamily: "Lato, sans-serif" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 794, height: 97, background: navy }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 274, height: 1123, background: navy }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 0, height: 0, borderTop: "154px solid #1c2127", borderRight: "144px solid transparent" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 50, height: 154, background: "#1c2127" }} />
      <div style={{ position: "absolute", left: 48, top: 97, width: 0, height: 0, borderLeft: "113px solid transparent", borderRight: "113px solid transparent", borderTop: `40px solid ${sky}` }} />
      <div style={{ position: "absolute", left: 48, top: 87, width: 198, height: 198, borderRadius: "50%", border: "5px solid #fff", overflow: "hidden", boxSizing: "border-box", background: "#fff" }}>
        <Photo cv={cv} bg={sky} />
      </div>

      <div style={{ position: "absolute", left: 307, top: 150, right: 60 }}>
        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 38, lineHeight: 1.05, color: "#555" }}>
          <span style={{ fontWeight: 800, textTransform: "uppercase" }}>{first}</span>{" "}
          <span style={{ fontWeight: 400, color: navy, textTransform: "uppercase" }}>{last}</span>
        </div>
        <div style={{ fontSize: 21, letterSpacing: ".03em", color: "#555", marginTop: 8, textTransform: "uppercase" }}>{cv.title}</div>
        <div style={{ width: 64, height: 4, background: navy, marginTop: 10 }} />
      </div>

      <aside style={{ position: "absolute", left: 36, top: 330, width: 210, bottom: 45, color: "#fff", display: "flex", flexDirection: "column", gap: 19 }}>
        <section><SH c="CONTACT" />
          {[cv.personal.phone, cv.personal.email, cv.personal.location, cv.personal.link].filter(Boolean).map((v, i) => (
            <div key={i} style={{ fontSize: 12.5, marginBottom: 10, display: "flex", gap: 10, alignItems: "flex-start", wordBreak: "break-word" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: sky, flex: "none", marginTop: 4 }} />{v}
            </div>
          ))}
        </section>
        {cv.education.length > 0 && <section><SH c="EDUCATION" />
          {cv.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 12 }}>
              <div style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: ".12em" }}>{dates(e.start, e.end)}</div>
              <div style={{ fontWeight: 700, fontSize: 12.5, textTransform: "uppercase", margin: "3px 0 5px" }}>{e.school}</div>
              <Bullets dot="#fff" size={12.5} items={[e.degree]} />
            </div>
          ))}
        </section>}
        {cv.skills.length > 0 && <section><SH c="SKILLS" /><Bullets dot="#fff" size={12.5} items={cv.skills} gap={4} /></section>}
        {cv.languages.length > 0 && <section><SH c="LANGUAGES" /><Bullets dot="#fff" size={12.5} items={cv.languages} gap={3} /></section>}
      </aside>

      <main style={{ position: "absolute", left: 293, top: 330, right: 40, bottom: 45, color: "#444", overflowWrap: "anywhere", display: "flex", flexDirection: "column", gap: 22 }}>
        {cv.summary && <section><MH c="PROFILE" /><p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, textAlign: "justify" }}>{cv.summary}</p></section>}
        {cv.experiences.length > 0 && <section><MH c="WORK EXPERIENCE" />
          <div style={{ borderLeft: `1.5px solid ${navy}`, marginLeft: 4, paddingLeft: 20 }}>
            {cv.experiences.map((x) => (
              <div key={x.id} style={{ marginBottom: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: -24.5, top: 4, width: 7, height: 7, borderRadius: "50%", background: navy }} />
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, minWidth: 0, color: "#333" }}>{x.company}</div>
                  <div style={{ fontSize: 13.5, flex: "none", whiteSpace: "nowrap", textTransform: "uppercase" }}>{dates(x.start, x.end)}</div>
                </div>
                <div style={{ fontSize: 16, lineHeight: 1.5, marginBottom: 10 }}>{x.role}</div>
                <Bullets dot="#444" size={14} items={x.bullets} lh={1.55} gap={5} />
              </div>
            ))}
          </div>
        </section>}
        {!!cv.references?.length && <section><MH c="REFERENCE" />
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 20 }}>
            {cv.references.slice(0, 2).map((r, i) => (
              <div key={i}>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#555" }}>{r.name}</div>
                <div style={{ fontSize: 14.5, margin: "4px 0" }}>{r.company}</div>
                <div style={{ fontSize: 11.5 }}><b>Phone:</b> {r.contact}</div>
              </div>
            ))}
          </div>
        </section>}
      </main>
    </div>
  );
}

/* ============ DANIEL GALLEGO — Noir, orange & crème ============ */
export function DanielGallego({ cv }: { cv: CV }) {
  const black = "#140503", orange = "#ff9a45", rust = "#d4643a", cream = "#fdf8f4";
  const font = "'Source Sans 3', sans-serif";
  const LH = ({ c }: { c: string }) => (
    <div style={{ fontWeight: 700, fontSize: 20, borderBottom: `2px solid ${black}`, paddingBottom: 4, marginBottom: 10 }}>{c}</div>
  );
  const RH = ({ c }: { c: string }) => (
    <div style={{ fontWeight: 700, fontSize: 20, color: orange, borderBottom: `2px solid ${orange}`, paddingBottom: 4, marginBottom: 12 }}>{c}</div>
  );
  return (
    <div style={{ ...page, background: cream, fontFamily: font, color: black }}>
      {/* formes */}
      <div style={{ position: "absolute", left: 438, top: 0, width: 316, height: 1090, background: black }} />
      <div style={{ position: "absolute", left: 200, top: -330, width: 900, height: 420, borderRadius: "50%", borderBottom: `34px solid ${orange}`, transform: "rotate(14deg)" }} />
      <div style={{ position: "absolute", left: 480, top: -150, width: 600, height: 300, borderRadius: "50%", borderBottom: `22px solid ${rust}`, transform: "rotate(28deg)" }} />
      <div style={{ position: "absolute", left: -200, top: 1050, width: 1300, height: 400, borderRadius: "50%", background: black }} />
      <div style={{ position: "absolute", left: 100, top: 1020, width: 1100, height: 400, borderRadius: "50%", borderTop: `40px solid ${orange}`, transform: "rotate(-12deg)" }} />
      <div style={{ position: "absolute", left: 300, top: 1050, width: 1000, height: 400, borderRadius: "50%", borderTop: `30px solid ${rust}`, transform: "rotate(-14deg)" }} />

      <div style={{ position: "absolute", left: 513, top: 80, width: 170, height: 170, borderRadius: "50%", border: `5px solid ${orange}`, overflow: "hidden", boxSizing: "border-box", background: "#ddd" }}>
        <Photo cv={cv} bg={rust} />
      </div>

      <main style={{ position: "absolute", left: 79, top: 106, width: 326, bottom: 110, display: "flex", flexDirection: "column", gap: 28 }}>
        <div>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: 38, lineHeight: 1, letterSpacing: "-.02em", textTransform: "uppercase" }}>{cv.personal.name}</div>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: 21, color: rust, marginTop: 4, textTransform: "uppercase" }}>{cv.title}</div>
        </div>
        {cv.summary && <section><LH c="ABOUT ME" /><p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, textAlign: "justify" }}>{cv.summary}</p></section>}
        {cv.experiences.length > 0 && <section><LH c="EXPERIENCE" />
          {cv.experiences.map((x) => (
            <div key={x.id} style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 14.5, lineHeight: 1.3 }}>{x.role}</div>
              <div style={{ fontWeight: 700, fontSize: 14.5, lineHeight: 1.3, marginBottom: 4 }}>{[x.company, dates(x.start, x.end)].filter(Boolean).join(" | ")}</div>
              <Bullets dot={black} size={14.5} items={x.bullets} lh={1.45} gap={0} />
            </div>
          ))}
        </section>}
        {!!cv.references?.length && <section><LH c="REFERENCE" />
          {cv.references.slice(0, 1).map((r, i) => (
            <div key={i} style={{ fontSize: 14.5, lineHeight: 1.4 }}>
              <div style={{ fontWeight: 700 }}>{r.name}</div>
              <div style={{ fontWeight: 700 }}>{r.company}</div>
              <div style={{ marginTop: 4 }}>{r.contact}</div>
            </div>
          ))}
        </section>}
      </main>

      <aside style={{ position: "absolute", left: 467, top: 296, width: 246, bottom: 160, color: "#fff", display: "flex", flexDirection: "column", gap: 26 }}>
        {cv.education.length > 0 && <section><RH c="EDUCATION" />
          {cv.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 8, fontSize: 14.5, lineHeight: 1.35 }}>
              <div style={{ fontWeight: 700 }}>{e.degree}</div>
              <div>{[dates(e.start, e.end), e.school].filter(Boolean).join(" | ")}</div>
            </div>
          ))}
        </section>}
        {cv.skills.length > 0 && <section><RH c="SKILLS" /><Bullets dot="#fff" size={14.5} items={cv.skills} gap={8} /></section>}
        {cv.languages.length > 0 && <section><RH c="LANGUAGE" /><Bullets dot="#fff" size={14.5} items={cv.languages} gap={8} /></section>}
        <section><RH c="CONTACT" />
          {[cv.personal.phone, cv.personal.email, cv.personal.location, cv.personal.link].filter(Boolean).map((v, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14.5, marginBottom: 9, wordBreak: "break-word" }}>
              <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", flex: "none" }} />{v}
            </div>
          ))}
        </section>
      </aside>
    </div>
  );
}

/* ============ DANI MARTINEZ — Noir & blanc minimaliste ============ */
export function DaniMartinez({ cv }: { cv: CV }) {
  const side = "#333333", ink = "#333";
  const [first, last] = splitName(cv.personal.name);
  const SH = ({ c }: { c: string }) => (
    <div style={{ fontSize: 22, borderBottom: "1.5px solid #ddd", paddingBottom: 10, marginBottom: 16, marginRight: -34 }}>{c}</div>
  );
  const MH = ({ c }: { c: string }) => (
    <div style={{ fontSize: 22, color: ink, borderBottom: `1.5px solid ${ink}`, paddingBottom: 10, marginBottom: 16 }}>{c}</div>
  );
  const certs = cv.certifications ?? [];
  return (
    <div style={{ ...page, background: "#fff", fontFamily: "Montserrat, sans-serif", color: ink }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 303, height: 1123, background: side }} />
      <div style={{ position: "absolute", left: 60, top: 66, width: 183, height: 183, borderRadius: "50%", overflow: "hidden" }}>
        <Photo cv={cv} bg="#666" />
      </div>
      <div style={{ position: "absolute", left: 336, top: 88, right: 34 }}>
        <div style={{ fontWeight: 700, fontSize: 64, lineHeight: 1 }}>{first}</div>
        <div style={{ fontWeight: 500, fontSize: 60, lineHeight: 1 }}>{last}</div>
        <div style={{ fontSize: 21, letterSpacing: ".2em", marginTop: 8 }}>{cv.title}</div>
      </div>

      <aside style={{ position: "absolute", left: 34, top: 305, width: 235, bottom: 30, color: "#fff", display: "flex", flexDirection: "column", gap: 26 }}>
        <section><SH c="About Me" />
          {cv.summary && <p style={{ margin: "0 0 14px", fontSize: 12, lineHeight: 1.45 }}>{cv.summary}</p>}
          {[cv.personal.phone, cv.personal.email, cv.personal.location, cv.personal.link].filter(Boolean).map((v, i) => (
            <div key={i} style={{ display: "flex", gap: 18, alignItems: "center", fontSize: 13, marginBottom: 12, wordBreak: "break-word" }}>
              <span style={{ width: 8, height: 8, background: "#fff", borderRadius: 2, flex: "none" }} />{v}
            </div>
          ))}
        </section>
        {cv.skills.length > 0 && <section><SH c="Skills" /><Bullets dot="#fff" size={14} items={cv.skills} gap={11} /></section>}
        {cv.languages.length > 0 && <section><SH c="Language" />
          {cv.languages.map((l, i) => <div key={i} style={{ fontSize: 14, marginBottom: 9 }}>{l}</div>)}
        </section>}
        {certs.length > 0 && <section><SH c="Awards" />
          {certs.map((c, i) => <div key={i} style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 6 }}>{c}</div>)}
        </section>}
      </aside>

      <main style={{ position: "absolute", left: 336, top: 305, right: 34, bottom: 30, display: "flex", flexDirection: "column", gap: 28 }}>
        {cv.education.length > 0 && <section><MH c="Education" />
          {cv.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{e.school}</div>
              <div style={{ fontSize: 13 }}>{e.degree}</div>
              <div style={{ fontSize: 13 }}>{dates(e.start, e.end)}</div>
            </div>
          ))}
        </section>}
        {cv.experiences.length > 0 && <section><MH c="Experience" />
          {cv.experiences.map((x) => (
            <div key={x.id} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontWeight: 600, fontSize: 14 }}>
                <span>{x.company}</span><span style={{ whiteSpace: "nowrap" }}>{dates(x.start, x.end)}</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{x.role}</div>
              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.4 }}>{x.bullets.filter(Boolean).join(" ")}</p>
            </div>
          ))}
        </section>}
        {!!cv.references?.length && <section><MH c="References" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {cv.references.slice(0, 2).map((r, i) => (
              <div key={i}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{r.name}</div>
                <div style={{ fontSize: 14, margin: "3px 0 6px" }}>{r.company}</div>
                <div style={{ fontSize: 11.5, wordBreak: "break-word" }}>{r.contact}</div>
              </div>
            ))}
          </div>
        </section>}
      </main>
    </div>
  );
}
