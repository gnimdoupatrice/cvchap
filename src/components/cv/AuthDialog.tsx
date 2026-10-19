import { useEffect, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured, supabase, supabaseConfigError } from "@/lib/supabase";

export function AuthDialog({ open, onOpenChange, onAuthenticated }: { open: boolean; onOpenChange: (o: boolean) => void; onAuthenticated?: () => void }) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    if (!open) { setPassword(""); setSent(false); }
  }, [open]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured) return;
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Connecté. Vous pouvez personnaliser votre CV.");
        onOpenChange(false);
        onAuthenticated?.();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/editor` },
        });
        if (error) throw error;
        if (data.session) { onOpenChange(false); onAuthenticated?.(); }
        else setSent(true);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      toast.error(msg.includes("Invalid login") ? "E-mail ou mot de passe incorrect." : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "signin" ? "Connectez-vous pour personnaliser" : "Créez votre espace"}</DialogTitle>
          <DialogDescription>
            Un compte est nécessaire pour remplir votre CV, utiliser l’IA et exporter.
            Les brouillons sont conservés sur cet appareil ; ils ne sont pas encore sauvegardés en ligne.
          </DialogDescription>
        </DialogHeader>

        {!isSupabaseConfigured ? (
          <p className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{supabaseConfigError}</p>
        ) : sent ? (
          <p className="rounded-lg border bg-muted/40 p-3 text-sm">
            Un e-mail de confirmation a été envoyé à <b>{email}</b>. Cliquez sur le lien pour activer votre compte, puis revenez ici.
          </p>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">E-mail</span>
              <input className="input" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">Mot de passe</span>
              <input
                className="input"
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="animate-spin" />}
              {mode === "signin" ? "Se connecter" : "Créer mon compte"}
            </Button>
            <Button variant="ghost" size="sm"
              type="button"
              className="w-full text-center text-xs text-muted-foreground hover:text-foreground"
              onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setSent(false); }}
            >
              {mode === "signin" ? "Pas encore de compte ? S’inscrire" : "Déjà un compte ? Se connecter"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
