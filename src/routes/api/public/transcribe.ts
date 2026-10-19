import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
const MAX_BYTES = 24 * 1024 * 1024;
export const Route = createFileRoute("/api/public/transcribe")({
  server: { handlers: { POST: async ({ request }) => {
    const auth = request.headers.get("authorization");
    if (!auth?.startsWith("Bearer ")) return new Response("Connexion requise.", { status: 401 });
    const url = process.env["SUPABASE_URL"];
    const publicKey = process.env["SUPABASE_PUBLISHABLE_KEY"];
    const key = process.env["LOVABLE_API_KEY"];
    if (!url || !publicKey || !key) return new Response("Le service vocal n’est pas configuré.", { status: 503 });
    const client = createClient(url, publicKey, { auth: { persistSession: false, autoRefreshToken: false }, global: { headers: { Authorization: auth } } });
    const { data, error } = await client.auth.getClaims(auth.slice(7));
    if (error || !data?.claims?.sub) return new Response("Connexion requise.", { status: 401 });
    if (Number(request.headers.get("content-length")) > MAX_BYTES) return new Response("Note vocale trop volumineuse.", { status: 413 });
    const reader = request.body?.getReader();
    if (!reader) return new Response("Note vocale vide.", { status: 400 });
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > MAX_BYTES) { await reader.cancel(); return new Response("Note vocale trop volumineuse.", { status: 413 }); }
      chunks.push(part.value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const part of chunks) { bytes.set(part, offset); offset += part.length; }
    let form: FormData;
    try { form = await new Response(bytes, { headers: { "content-type": request.headers.get("content-type") ?? "" } }).formData(); }
    catch { return new Response("Note vocale invalide.", { status: 400 }); }
    const file = form.get("file");
    if (!(file instanceof File) || file.size < 2048 || !file.type.startsWith("audio/")) return new Response("Enregistrement vide ou invalide.", { status: 400 });
    const upstream = new FormData();
    upstream.append("file", file, file.name);
    upstream.append("model", "openai/gpt-transcribe");
    upstream.append("stream", "true");
    upstream.append("response_format", "json");
    const response = await fetch("https://ai.gateway.lovable.dev/v1/audio/transcriptions", {
      method: "POST", headers: { Authorization: `Bearer ${key}` }, body: upstream, signal: request.signal,
    });
    const headers = new Headers({ "content-type": response.headers.get("content-type") ?? "text/event-stream", "cache-control": "no-store" });
    response.headers.forEach((v, k) => { if (k.toLowerCase().startsWith("x-lovable-aig-")) headers.set(k, v); });
    return new Response(response.body, { status: response.status, headers });
  } } },
});
