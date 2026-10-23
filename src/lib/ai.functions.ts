import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { ExtractedCV } from "./cv/extraction";

const RULES = `Tu es un expert en recrutement et en rédaction de CV en français.
Règles : commence chaque ligne par un verbe d'action fort au passé composé nominalisé ou à l'infinitif (ex. « Piloté », « Conçu », « Réduit »), mets en avant des résultats chiffrés quand ils existent, n'invente jamais de chiffres absents, reste concis (max 22 mots par ligne), compatible ATS (pas d'emoji, pas de symboles décoratifs).
Réponds uniquement avec le texte final, sans introduction ni guillemets ni puces.`;

type Result = { ok: true; text: string } | { ok: false; error: string; status: number };

async function run(system: string, prompt: string): Promise<Result> {
  const { generateText, AiError } = await import("./ai/gateway.server");
  try {
    return { ok: true, text: await generateText(system, prompt) };
  } catch (e) {
    if (e instanceof AiError) return { ok: false, error: e.message, status: e.status };
    return { ok: false, error: "Erreur inattendue du service IA.", status: 500 };
  }
}

export const improveText = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ kind: z.enum(["summary", "bullets", "rephrase"]), text: z.string().min(1).max(4000), context: z.string().max(300) }).parse(d),
  )
  .handler(async ({ data }) => {
    const task =
      data.kind === "summary"
        ? "Réécris ce résumé de profil en 2 à 3 phrases percutantes (max 60 mots)."
        : data.kind === "rephrase"
          ? "Reformule ce texte dans un style professionnel de CV, en conservant strictement les faits et la longueur approximative."
          : "Réécris ces réalisations, une par ligne, même nombre de lignes.";
    return run(RULES, `${task}\nContexte : ${data.context}\n\nTexte :\n${data.text}`);
  });

export const coachExperience = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        role: z.string().max(200),
        company: z.string().max(200),
        challenge: z.string().min(1).max(1500),
        action: z.string().min(1).max(1500),
        result: z.string().min(1).max(1500),
      })
      .parse(d),
  )
  .handler(async ({ data }) =>
    run(
      RULES,
      `À partir de cette interview, rédige 3 réalisations de CV (une par ligne) pour le poste « ${data.role} » chez « ${data.company} ».
Défi : ${data.challenge}
Action concrète : ${data.action}
Résultat mesurable : ${data.result}`,
    ),
  );

export const extractDraft = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ text: z.string().min(1).max(30000) }).parse(data))
  .handler(async ({ data }): Promise<{ ok: true; cv: ExtractedCV } | { ok: false; error: string; status: number }> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { ok: false, error: "Le service IA n’est pas configuré.", status: 401 };
    const { extractCV, AiError } = await import("./ai/gateway.server");
    try { return { ok: true, cv: await extractCV(data.text, key) }; }
    catch (error) { return { ok: false, error: error instanceof Error ? error.message : "L’extraction du CV a échoué.", status: error instanceof AiError ? error.status : 500 }; }
  });

export const compareJobOffer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ cv: z.string().min(1).max(20000), offer: z.string().min(30).max(15000) }).parse(d))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { ok: false as const, error: "Le service IA n’est pas configuré.", status: 401 };
    const { matchJob, AiError } = await import("./ai/gateway.server");
    try { return { ok: true as const, match: await matchJob(data.cv, data.offer, key) }; }
    catch (e) { return { ok: false as const, error: e instanceof Error ? e.message : "L’analyse a échoué.", status: e instanceof AiError ? e.status : 500 }; }
  });
