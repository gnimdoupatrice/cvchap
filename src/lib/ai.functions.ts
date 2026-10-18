import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

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
