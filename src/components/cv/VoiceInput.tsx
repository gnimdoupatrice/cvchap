import { useEffect, useRef, useState } from "react";
import { Loader2, Mic, Square, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { recordWav } from "@/lib/record-wav";
import { transcribeRecording } from "@/lib/transcription";
let microphoneBusy = false;
export function VoiceInput({ onTranscript, disabled, label = "Dicter une note vocale" }: { onTranscript: (text: string) => void; disabled?: boolean; label?: string }) {
  const [state, setState] = useState<"idle" | "starting" | "recording" | "transcribing">("idle");
  const recorder = useRef<Awaited<ReturnType<typeof recordWav>> | null>(null);
  const abort = useRef<AbortController | null>(null);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; abort.current?.abort(); if (recorder.current) { void recorder.current.stop().catch(() => {}); recorder.current = null; microphoneBusy = false; } }; }, []);
  const toggle = async () => {
    if (state === "recording") {
      const recording = recorder.current;
      if (!recording) return;
      recorder.current = null;
      setState("transcribing");
      const controller = new AbortController(); abort.current = controller;
      try {
        const file = await recording.stop();
        microphoneBusy = false;
        const text = await transcribeRecording(file, controller.signal);
        if (mounted.current) onTranscript(text);
      } catch (error) { if (!controller.signal.aborted) toast.error(error instanceof Error ? error.message : "La note vocale a échoué."); }
      finally { microphoneBusy = false; if (mounted.current) setState("idle"); }
      return;
    }
    if (microphoneBusy) { toast.info("Arrêtez d’abord l’autre note vocale."); return; }
    microphoneBusy = true; setState("starting");
    try {
      const recording = await recordWav();
      if (!mounted.current) { await recording.stop(); microphoneBusy = false; return; }
      recorder.current = recording; setState("recording");
    } catch { microphoneBusy = false; setState("idle"); toast.error("Le micro est inaccessible. Autorisez-le dans votre navigateur."); }
  };
  return <span className="inline-flex items-center gap-1">
    <Button type="button" variant="outline" size="icon" className={`size-8 shrink-0 ${state === "recording" ? "border-destructive text-destructive motion-safe:animate-pulse" : "text-muted-foreground"}`} disabled={disabled || state === "starting" || state === "transcribing"} onClick={toggle} aria-label={state === "recording" ? "Arrêter la note vocale" : label} title={state === "recording" ? "Arrêter la note vocale" : label}>
      {state === "starting" || state === "transcribing" ? <Loader2 className="size-3.5 animate-spin" /> : state === "recording" ? <Square className="size-3.5" /> : <Mic className="size-3.5" />}
    </Button>
    {state === "transcribing" && <Button variant="ghost" size="icon" className="size-8" aria-label="Annuler la retranscription" onClick={() => abort.current?.abort()}><X className="size-3.5" /></Button>}
    <span className="sr-only" role="status">{state === "recording" ? "Vous pouvez parler" : state === "transcribing" ? "Retranscription en cours" : ""}</span>
    {(state === "recording" || state === "transcribing") && (
      <div className="fixed inset-x-3 bottom-24 z-50 mx-auto flex max-w-md items-center gap-3 rounded-2xl border bg-card px-4 py-3 shadow-xl no-print sm:bottom-6" role="presentation">
        {state === "recording" ? <span className="size-3 shrink-0 rounded-full bg-destructive motion-safe:animate-pulse" /> : <Loader2 className="size-4 shrink-0 animate-spin text-primary" />}
        <div className="min-w-0 flex-1 text-sm">
          <p className="font-semibold">{state === "recording" ? "Enregistrement en cours…" : "Retranscription…"}</p>
          <p className="truncate text-xs text-muted-foreground">{state === "recording" ? `Parlez naturellement · ${label}` : "Votre texte arrive dans la case."}</p>
        </div>
        {state === "recording"
          ? <Button type="button" size="sm" variant="destructive" onClick={toggle}><Square className="size-3.5" />Arrêter</Button>
          : <Button type="button" size="sm" variant="ghost" onClick={() => abort.current?.abort()}>Annuler</Button>}
      </div>
    )}
  </span>;
}
