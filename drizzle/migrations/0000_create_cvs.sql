CREATE TABLE public.cvs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL DEFAULT 'Mon CV',
  doc jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX cvs_user_idx ON public.cvs(user_id, updated_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cvs TO authenticated;
GRANT ALL ON public.cvs TO service_role;
ALTER TABLE public.cvs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own cvs select" ON public.cvs FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "own cvs insert" ON public.cvs FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "own cvs update" ON public.cvs FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "own cvs delete" ON public.cvs FOR DELETE TO authenticated USING (user_id = auth.uid());
CREATE TRIGGER cvs_updated_at BEFORE UPDATE ON public.cvs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();