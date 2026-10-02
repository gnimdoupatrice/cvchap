import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const RUN_ID = "X-Lovable-AIG-Run-ID";

export class AiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export async function generateText(system: string, prompt: string): Promise<string> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new AiError("Le service IA n'est pas configuré.", 401);

  let runId: string | undefined;
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey: key,
    headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: async (input, init) => {
      const headers = new Headers(init?.headers);
      if (runId) headers.set(RUN_ID, runId);
      const res = await fetch(input, { ...init, headers });
      runId ??= res.headers.get(RUN_ID) ?? undefined;
      return res;
    },
  });

  let streamError: unknown;
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system,
    prompt,
    onError: ({ error }) => {
      streamError = error;
    },
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  try {
    const text = (await result.text).trim();
    if (streamError) throw streamError;
    if (!text) throw new AiError("L'IA n'a pas pu proposer de suggestion pour ce texte.", 422);
    return text;
  } catch (e) {
    const err = (streamError ?? e) as { statusCode?: number; message?: string };
    if (err instanceof AiError) throw err;
    const status = err.statusCode ?? 500;
    if (status === 429) throw new AiError("Trop de demandes, réessayez dans un instant.", 429);
    if (status === 402) throw new AiError("Les crédits IA de la plateforme sont épuisés.", 402);
    if (status === 403) throw new AiError("Le service IA a refusé la demande.", 403);
    throw new AiError("Le service IA est momentanément indisponible.", status);
  }
}
