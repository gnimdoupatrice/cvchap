// Point d'entrée unique du client d'authentification côté navigateur.
// Le client généré lit déjà VITE_SUPABASE_URL et la clé publique ; on expose
// ici un diagnostic clair si la configuration manque.
import { supabase } from "@/integrations/supabase/client";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ??
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined);

export const supabaseConfigError: string | null = !url
  ? "Variable VITE_SUPABASE_URL manquante : la connexion est indisponible."
  : !key
    ? "Variable VITE_SUPABASE_ANON_KEY manquante : la connexion est indisponible."
    : null;

export const isSupabaseConfigured = supabaseConfigError === null;

if (supabaseConfigError && typeof window !== "undefined") console.warn(supabaseConfigError);

export { supabase };
