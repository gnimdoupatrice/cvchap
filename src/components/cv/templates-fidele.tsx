import type { CV } from "@/lib/cv/types";

/* Reproductions fidèles de deux fichiers HTML (export PDF → SVG) :
   « Richard Sanchez — Product Designer » et « Adeline Palmerston — Graphics Designer ».
   Coordonnées converties de points PDF (595,5 × 842,25) en pixels A4 (794 × 1123), facteur 4/3.
   Les colonnes sont en flux vertical : les écarts reproduisent l'original, un texte plus long pousse la suite. */

const page: React.CSSProperties = {
  width: 794, height: 1123, position: "relative", overflow: "hidden",
  WebkitPrintColorAdjust: "exact", printColorAdjust: "exact", boxSizing: "border-box",
};
const abs = (s: React.CSSProperties): React.CSSProperties => ({ position: "absolute", ...s });
const initials = (n: string) => n.split(/\s+/).filter(Boolean).slice(0, 2).map((x) => x[0]?.toUpperCase()).join("");
const splitName = (n: string): [string, string] => {
  const p = n.trim().split(/\s+/);
  if (p.length < 2) return [n, ""];
  return [p.slice(0, -1).join(" "), p[p.length - 1] ?? ""];
};

/* ===================== RICHARD SANCHEZ — PRODUCT DESIGNER ===================== */
export function SanchezProduct({ cv }: { cv: CV }) {
  const blue = "#043382", deep = "#042b6b", sky = "#0774bb", col = "#191919";
  const mont = "Montserrat, sans-serif";
  const [first, last] = splitName(cv.personal.name);
  const bars = (cv.highlights ?? []).filter((h) => h.title);

  const Pill = ({ c, filled, mt }: { c: string; filled?: boolean; mt: number }) => (
    <div style={{
      marginTop: mt, height: filled ? 31.8 : 36, borderRadius: 40, boxSizing: "border-box",
      width: filled ? 198.4 : 224.5, flex: "none",
      background: filled ? blue : "transparent", border: filled ? "none" : `3px solid ${sky}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontSize: 15.1, letterSpacing: ".02em",
    }}>{c}</div>
  );
  const Dot = ({ c }: { c: string }) => (
    <div style={{ position: "relative", paddingLeft: 0, fontSize: 14.2, lineHeight: "27px", height: 27 }}>
      <span style={{ position: "absolute", left: -13, top: 11.5, width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />{c}
    </div>
  );
  const Ico = ({ d }: { d: React.ReactNode }) => (
    <span style={{ width: 25, height: 25, borderRadius: "50%", background: sky, flex: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill={col}>{d}</svg>
    </span>
  );
  const contacts: [string, React.ReactNode][] = [
    [cv.personal.phone, <path key="p" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" />],
    [cv.personal.email, <path key="m" d="M2 5h20v14H2zm2 2v.5l8 5 8-5V7l-8 5z" />],
    [cv.personal.location, <path key="l" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />],
  ];

  return (
    <div style={{ ...page, background: "#fff", fontFamily: mont, color: "#000" }}>
      {/* ombre sous le bandeau */}
      <div style={abs({ left: 0, top: 257, width: 794, height: 36, background: "linear-gradient(rgba(0,0,0,.28), rgba(0,0,0,0))" })} />
      {/* colonne noire */}
      <div style={abs({ left: 44.3, top: 0, width: 294.5, height: 1123, background: col })} />
      {/* bandeau bleu + parallélogramme foncé */}
      <div style={abs({ left: 0, top: 102.8, width: 794, height: 154.7, background: blue })} />
      <div style={abs({ left: 0, top: 0, width: 794, height: 1123, background: deep, clipPath: "polygon(69px 102.8px, 380.2px 102.8px, 324.4px 257.4px, 13.2px 257.4px)" })} />

      {/* photo */}
      <div style={abs({ left: 84, top: 69.5, width: 218, height: 218, borderRadius: "50%", border: `4px solid ${blue}`, overflow: "hidden", boxSizing: "border-box", background: blue })}>
        {cv.personal.photo
          ? <img src={cv.personal.photo} alt={cv.personal.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 20%", display: "block" }} />
          : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60, fontWeight: 700, color: "#fff" }}>{initials(cv.personal.name)}</div>}
      </div>

      {/* nom & titre */}
      <div style={abs({ left: 306.8, top: 117, fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 48.9, lineHeight: "58px", color: "#fff", textTransform: "uppercase", whiteSpace: "nowrap" })}>{first}</div>
      <div style={abs({ left: 350.7, top: 175, fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 48.9, lineHeight: "58px", color: "#fff", textTransform: "uppercase", whiteSpace: "nowrap" })}>{last}</div>
      <div style={abs({ left: 405.6, top: 226, fontSize: 17.8, lineHeight: "22px", color: "#fff", whiteSpace: "nowrap" })}>{cv.title}</div>

      {/* colonne gauche */}
      <aside style={abs({ left: 44.3, top: 296.8, width: 294.5, bottom: 20, color: "#fff", display: "flex", flexDirection: "column", alignItems: "stretch" })}>
        <div style={{ textAlign: "center", fontSize: 20.45, lineHeight: "24px", marginLeft: 0, width: 276 }}>About Me</div>
        {cv.summary && (
          <p style={{ margin: "12.4px 0 0", alignSelf: "flex-start", marginLeft: 55.7, width: 164, textAlign: "center", fontSize: 12.45, lineHeight: "16.85px" }}>{cv.summary}</p>
        )}
        <div style={{ marginTop: 11.6, marginLeft: 49, display: "flex", flexDirection: "column", gap: 16.5 }}>
          {contacts.filter(([v]) => v).map(([v, d], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.34, lineHeight: "17px", minHeight: 25, wordBreak: "break-word", paddingRight: 20 }}>
              <Ico d={d} /><span>{v}</span>
            </div>
          ))}
        </div>
        {cv.languages.length > 0 && (
          <div style={{ marginLeft: 37.2 }}>
            <Pill c="Language" mt={33.4} />
            <div style={{ marginTop: 11.5, marginLeft: 51.5 }}>{cv.languages.map((l, i) => <Dot key={i} c={l} />)}</div>
          </div>
        )}
        {cv.skills.length > 0 && (
          <div style={{ marginLeft: 37.2 }}>
            <Pill c="Expertise" mt={17} />
            <div style={{ marginTop: 9.2, marginLeft: 49.5, letterSpacing: ".02em" }}>{cv.skills.map((l, i) => <Dot key={i} c={l} />)}</div>
          </div>
        )}
      </aside>

      {/* colonne droite */}
      <main style={abs({ left: 349.8, top: 289.4, width: 410, bottom: 20, display: "flex", flexDirection: "column" })}>
        {cv.experiences.length > 0 && <>
          <Pill c="Experience" filled mt={0} />
          {cv.experiences.map((x, i) => (
            <div key={x.id} style={{ marginTop: i === 0 ? 19 : 17.7, marginLeft: 7.4 }}>
              <div style={{ fontWeight: 700, fontSize: 14.2, lineHeight: "19px" }}>
                {x.company && <div>{x.company}</div>}
                {x.role && <div>{x.role}</div>}
                {(x.start || x.end) && <div>{[x.start, x.end].filter(Boolean).join(" - ")}</div>}
              </div>
              {x.bullets.filter(Boolean).length > 0 && (
                <p style={{ margin: "5.1px 0 0", fontSize: 13.34, lineHeight: "17.94px", width: 366 }}>{x.bullets.filter(Boolean).join(" ")}</p>
              )}
            </div>
          ))}
        </>}
        {cv.education.length > 0 && <>
          <Pill c="Education" filled mt={27.5} />
          {cv.education.map((e, i) => (
            <div key={e.id} style={{ marginTop: i === 0 ? 16.7 : 15, marginLeft: 8.7 }}>
              <div style={{ fontWeight: 700, fontSize: 14.2, lineHeight: "19px" }}>{e.school}</div>
              <div style={{ fontSize: 13.34, lineHeight: "17.1px", marginTop: 1 }}>{e.degree}</div>
              {(e.start || e.end) && <div style={{ fontSize: 13.34, lineHeight: "17.1px" }}>{[e.start, e.end].filter(Boolean).join(" - ")}</div>}
            </div>
          ))}
        </>}
        {bars.length > 0 && <>
          <Pill c="Skills Summary" filled mt={17.5} />
          <div style={{ marginTop: 13 }}>
            {bars.map((b, i) => {
              const pct = Math.max(0, Math.min(100, parseInt(b.text, 10) || 0));
              return (
                <div key={i} style={{ position: "relative", height: 28, fontSize: 13.34, lineHeight: "28px" }}>
                  <span style={{ position: "absolute", left: 8.8 }}>{b.title}</span>
                  <span style={{ position: "absolute", left: 180.5, top: 11, width: 84.4, height: 6.7, borderRadius: 4, background: "#e4e9ea", overflow: "hidden" }}>
                    <span style={{ display: "block", width: `${pct}%`, height: "100%", borderRadius: 4, background: sky }} />
                  </span>
                  <span style={{ position: "absolute", left: 269.4, top: -2, fontSize: 18.7, color: "#1f3a67" }}>{pct} %</span>
                </div>
              );
            })}
          </div>
        </>}
      </main>
    </div>
  );
}

/* ===================== ADELINE PALMERSTON — GRAPHICS DESIGNER ===================== */
export function AdelinePalmerston({ cv }: { cv: CV }) {
  const ink = "#333132", navy = "#0d203b", yellow = "#ffd230", gray = "#f1f1f1";
  const lato = "Lato, sans-serif";
  const [first, last] = splitName(cv.personal.name);

  const Svg = ({ children, w = 22, vb = "0 0 24 24" }: { children: React.ReactNode; w?: number; vb?: string }) => (
    <svg width={w} height={w} viewBox={vb} fill={ink} style={{ flex: "none", display: "block" }}>{children}</svg>
  );
  const icons = {
    user: <Svg w={24}><circle cx="12" cy="7" r="5" /><path d="M2 23v-2a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7v2z" /></Svg>,
    card: <Svg w={26}><path d="M3 2h1.7v20H3zM6 2h13a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6zm7.5 5a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4zM9 17h9c-.2-3-2.3-4-4.5-4S9.2 14 9 17z" fill="none" stroke={ink} strokeWidth="1.6" /></Svg>,
    bulb: <Svg w={28}><g fill="none" stroke={ink} strokeWidth="1.3"><circle cx="12" cy="11" r="7.5" strokeDasharray="2 1.4" /><path d="M9.5 15.5v-1.8a3.5 3.5 0 1 1 5 0v1.8zM10 18h4M10.5 20h3" /></g></Svg>,
    lang: <Svg w={28}><rect x="1" y="3" width="22" height="16" rx="2" /><path d="M7 21l3-2h4z" /><path d="M4.5 15l2.5-8h1.4l2.5 8h-1.5l-.6-2H6.6l-.6 2zm2.5-3.3h2l-1-3.5zM13 8h7v1.2h-1.3c-.3 1.7-1 3-2 4 .8.6 1.8 1 3 1.2l-.4 1.2c-1.4-.3-2.6-.8-3.5-1.6-1 .8-2.2 1.3-3.6 1.6l-.4-1.2c1.2-.2 2.2-.6 3-1.2-.7-.8-1.2-1.7-1.5-2.7h1.3c.2.7.6 1.3 1.1 1.9.7-.8 1.2-1.9 1.4-3.2H13z" fill="#fff" /></Svg>,
    cap: <Svg w={30}><path d="M12 3L0 9.5l12 6.5 10-5.4V17h2V9.5zM5 13.2v4.3c0 1.7 3.1 3.5 7 3.5s7-1.8 7-3.5v-4.3L12 17z" /></Svg>,
    award: <Svg w={34} vb="0 0 34 34"><g fill="none" stroke={ink} strokeWidth="1.2"><path d="M5 2l1.2 2.5L9 5l-2 2 .5 2.8L5 8.5 2.5 9.8 3 7 1 5l2.8-.5zM17 1l1.2 2.5L21 4l-2 2 .5 2.8L17 7.5l-2.5 1.3L15 6l-2-2 2.8-.5zM29 2l1.2 2.5L33 5l-2 2 .5 2.8L29 8.5l-2.5 1.3L27 7l-2-2 2.8-.5z" /><circle cx="17" cy="17" r="5" /><path d="M7 33v-3a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7v3z" /><path d="M15 27.5l2 2 2-2-2-1.6z" /></g></Svg>,
    phone: <Svg w={16}><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" fill="none" stroke={ink} strokeWidth="2.2" /></Svg>,
    mail: <Svg w={16}><path d="M12 2L2 8v12h20V8zm0 2.4L19.5 9 12 13.5 4.5 9z" /></Svg>,
    pin: <Svg w={16}><path d="M12 1a8 8 0 0 0-8 8c0 4 8 14 8 14s8-10 8-14a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" /></Svg>,
  };

  const Head = ({ icon, c, mt, iconBox = 37.5, gap = 0 }: { icon: React.ReactNode; c: string; mt: number; iconBox?: number; gap?: number }) => (
    <div style={{ marginTop: mt, display: "flex", alignItems: "center", height: 28 }}>
      <span style={{ width: iconBox, display: "flex", justifyContent: "flex-start", marginRight: gap }}>{icon}</span>
      <span style={{ fontWeight: 700, fontSize: 21.3, lineHeight: "28px", color: ink }}>{c}</span>
    </div>
  );
  const Bul = ({ c, size, h, textLeft }: { c: string; size: number; h: number; textLeft: number }) => (
    <div style={{ position: "relative", paddingLeft: textLeft, fontSize: size, lineHeight: `${h}px`, minHeight: h }}>
      <span style={{ position: "absolute", left: textLeft - 13.5, top: h / 2 - 2, width: 4.5, height: 4.5, borderRadius: "50%", background: ink }} />{c}
    </div>
  );
  const Timeline = ({ children, line }: { children: React.ReactNode; line: [number, number] }) => (
    <div style={{ position: "relative" }}>
      <span style={{ position: "absolute", left: -31.5, top: line[0], bottom: line[1], width: 2, background: ink }} />
      <span style={{ position: "absolute", left: -34.5, top: line[0] - 4, width: 8, height: 8, borderRadius: "50%", background: ink }} />
      <span style={{ position: "absolute", left: -34.5, bottom: line[1] - 4, width: 8, height: 8, borderRadius: "50%", background: ink }} />
      {children}
    </div>
  );
  const contacts: [string, React.ReactNode][] = [
    [cv.personal.phone, icons.phone], [cv.personal.email, icons.mail], [cv.personal.location, icons.pin],
  ];
  const dateLabel = (s: string, e: string) => `(${[s, e].filter(Boolean).join(" -")})`;

  return (
    <div style={{ ...page, background: "#fff", fontFamily: lato, color: ink }}>
      {/* formes */}
      <div style={abs({ left: 0, top: 0, width: 289, height: 1123, background: gray })} />
      <div style={abs({ inset: 0, background: navy, clipPath: "polygon(-205.5px 1136.9px, -150.9px 974.7px, 501.2px 1194px, 446.6px 1356.3px)" })} />
      <div style={abs({ inset: 0, background: navy, clipPath: "polygon(208.3px -40px, 272.3px -224.6px, 910.1px -3.4px, 846.1px 181.2px)" })} />
      <div style={abs({ left: 560.5 - 152.3, top: -10.75 - 21.2, width: 304.6, height: 42.4, borderRadius: 30, background: yellow, transform: "rotate(19.56deg)" })} />
      <div style={abs({ left: 372 - 120, top: 1112.75 - 16.45, width: 240, height: 32.9, borderRadius: 20, background: yellow, transform: "rotate(18.96deg)" })} />
      <div style={abs({ left: 802 - 73.7, top: 166 - 22.75, width: 147.4, height: 45.5, borderRadius: 30, background: yellow, transform: "rotate(19.4deg)" })} />
      <div style={abs({ left: 0, top: -33, width: 284, height: 368, borderRadius: "0 0 142px 142px", background: yellow })} />

      {/* photo */}
      <div style={abs({ left: 12, top: 61, width: 258, height: 258, borderRadius: "50%", overflow: "hidden", background: "#bbb" })}>
        {cv.personal.photo
          ? <img src={cv.personal.photo} alt={cv.personal.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "42% 30%", display: "block" }} />
          : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64, fontWeight: 700, color: "#fff" }}>{initials(cv.personal.name)}</div>}
      </div>

      {/* nom */}
      <div style={abs({ left: 362, top: 117, right: 20, fontWeight: 700, fontSize: 53.35, lineHeight: "50.7px", letterSpacing: "-.005em" })}>
        <div>{first}</div><div>{last}</div>
      </div>
      <div style={abs({ left: 362.5, top: 230, fontSize: 21.3, lineHeight: "28px" })}>{cv.title}</div>

      {/* colonne gauche */}
      <aside style={abs({ left: 32, top: 347.8, width: 237, bottom: 45, paddingRight: 12, boxSizing: "border-box", overflowWrap: "anywhere", display: "flex", flexDirection: "column" })}>
        <Head icon={icons.user} c="About Me" mt={0} iconBox={38.5} />
        {cv.summary && <p style={{ margin: "16px 0 0", width: "100%", fontSize: 14, lineHeight: "20px", textAlign: "justify" }}>{cv.summary}</p>}
        <Head icon={icons.card} c="Contact" mt={34} iconBox={38.5} />
        <div style={{ marginTop: 15.5, display: "flex", flexDirection: "column", gap: 15 }}>
          {contacts.filter(([v]) => v).map(([v, ic], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", fontSize: 14.2, lineHeight: "22px", minHeight: 22, wordBreak: "break-word" }}>
              <span style={{ width: 32, flex: "none", display: "flex", paddingLeft: 4 }}>{ic}</span><span style={{ minWidth: 0, overflowWrap: "anywhere" }}>{v}</span>
            </div>
          ))}
        </div>
        {cv.skills.length > 0 && <>
          <Head icon={icons.bulb} c="Skills" mt={34} iconBox={38.5} />
          <div style={{ marginTop: 7.8 }}>{cv.skills.map((s, i) => <Bul key={i} c={s} size={14} h={32} textLeft={20} />)}</div>
        </>}
        {cv.languages.length > 0 && <>
          <Head icon={icons.lang} c="Language" mt={32} iconBox={38.5} />
          <div style={{ marginTop: 6 }}>{cv.languages.map((s, i) => <Bul key={i} c={s} size={14} h={32} textLeft={23} />)}</div>
        </>}
      </aside>

      {/* colonne droite */}
      <main style={abs({ left: 355, top: 347.8, right: 35, bottom: 45, overflowWrap: "anywhere", display: "flex", flexDirection: "column" })}>
        {cv.education.length > 0 && <>
          <div style={{ marginLeft: -45 }}><Head icon={icons.cap} c="Education" mt={0} iconBox={45} /></div>
          {cv.education.map((e, i) => (
            <div key={e.id} style={{ marginTop: i === 0 ? 24 : 40 }}>
              <Timeline line={[11, 10]}>
                <div style={{ fontWeight: 700, fontSize: 18.7, lineHeight: "24px" }}>{dateLabel(e.start, e.end)}</div>
                <div style={{ fontWeight: 700, fontSize: 15.5, lineHeight: "25px", marginTop: 1.8, textTransform: "uppercase" }}>{e.school}</div>
                <div style={{ fontSize: 15, lineHeight: "24px", marginLeft: 1.5 }}>{e.degree}</div>
                {e.note && <div style={{ fontSize: 15, lineHeight: "24px" }}>{e.note}</div>}
              </Timeline>
            </div>
          ))}
        </>}
        {cv.experiences.length > 0 && <>
          <div style={{ marginLeft: -40, marginTop: 45 }}><Head icon={icons.award} c="Experience" mt={0} iconBox={45} /></div>
          {cv.experiences.map((x, i) => (
            <div key={x.id} style={{ marginTop: i === 0 ? 24 : 45 }}>
              <Timeline line={[11.2, -1]}>
                <div style={{ fontWeight: 700, fontSize: 18.7, lineHeight: "24px" }}>{dateLabel(x.start, x.end)}</div>
                <div style={{ fontWeight: 700, fontSize: 15.5, lineHeight: "25px", marginTop: 1.8, textTransform: "uppercase" }}>{x.role}</div>
                <div style={{ fontSize: 15.5, lineHeight: "25px", marginLeft: 1.5 }}>{x.company}</div>
                <div style={{ marginTop: 2.6 }}>
                  {x.bullets.filter(Boolean).map((b, k) => (
                    <div key={k} style={{ position: "relative", paddingLeft: 29, fontSize: 16, lineHeight: "25px", width: "100%", boxSizing: "border-box" }}>
                      <span style={{ position: "absolute", left: 13, top: 9.5, width: 5, height: 5, borderRadius: "50%", background: ink }} />{b}
                    </div>
                  ))}
                </div>
              </Timeline>
            </div>
          ))}
        </>}
      </main>
    </div>
  );
}
