import { createParser } from "eventsource-parser";
import { supabase } from "./supabase";
export async function transcribeRecording(file: File, signal: AbortSignal): Promise<string> {
  const { data } = await supabase.auth.getSession();
  if (!data.session) throw new Error("Connectez-vous pour utiliser la note vocale.");
  const body = new FormData(); body.append("file", file);
  const response = await fetch("/api/public/transcribe", { method: "POST", headers: { Authorization: `Bearer ${data.session.access_token}` }, body, signal });
  if (!response.ok) {
    const raw = await response.text();
    let message = raw;
    try { const error = JSON.parse(raw); message = error.message ?? error.error?.message ?? raw; } catch {}
    throw new Error(message || "La retranscription a échoué.");
  }
  const reader = response.body?.getReader();
  if (!reader) throw new Error("La retranscription est vide.");
  let text = "", complete = false, failure = "";
  const parser = createParser({ onEvent(event) {
    if (event.data === "[DONE]") return;
    const part = JSON.parse(event.data);
    if (part.type === "transcript.text.delta") text += part.delta ?? "";
    if (part.type === "transcript.text.done") { text = part.text ?? text; complete = true; }
    if (part.type === "error" || part.error) failure = part.message ?? part.error?.message ?? "La retranscription a échoué.";
  } });
  const decoder = new TextDecoder();
  while (true) { const chunk = await reader.read(); if (chunk.done) break; parser.feed(decoder.decode(chunk.value, { stream: true })); }
  parser.feed(decoder.decode());
  if (failure) throw new Error(failure);
  if (!complete || !text.trim()) throw new Error("Aucune parole reconnue. Enregistrez une nouvelle note.");
  return text.trim();
}
