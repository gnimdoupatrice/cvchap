// Online CV persistence (owner-only via RLS). The local draft stays as an offline cache.
import { supabase } from "@/lib/supabase";
import type { Json } from "@/integrations/supabase/types";
import { normalizeDoc } from "./storage";
import type { CVDocument } from "./types";

export type CloudCV = { id: string; name: string; updated_at: string };

const activeKey = (userId: string) => `cvflow.active.v1.user:${userId}`;
export const getActiveId = (userId: string) => {
  try { return localStorage.getItem(activeKey(userId)); } catch { return null; }
};
export const setActiveId = (userId: string, id: string) => {
  try { localStorage.setItem(activeKey(userId), id); } catch { /* ignore */ }
};

export async function listCvs(): Promise<CloudCV[]> {
  const { data, error } = await supabase.from("cvs").select("id, name, updated_at").order("updated_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchCv(id: string): Promise<{ id: string; name: string; doc: CVDocument } | null> {
  const { data, error } = await supabase.from("cvs").select("id, name, doc").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? { id: data.id, name: data.name, doc: normalizeDoc(data.doc as Partial<CVDocument>) } : null;
}

export async function createCv(userId: string, name: string, doc: CVDocument): Promise<CloudCV> {
  const { data, error } = await supabase
    .from("cvs")
    .insert({ user_id: userId, name: name.trim().slice(0, 80) || "Mon CV", doc: doc as unknown as Json })
    .select("id, name, updated_at")
    .single();
  if (error) throw error;
  return data;
}

export async function saveCv(id: string, doc: CVDocument) {
  const { error } = await supabase.from("cvs").update({ doc: doc as unknown as Json }).eq("id", id);
  if (error) throw error;
}

export async function renameCv(id: string, name: string) {
  const { error } = await supabase.from("cvs").update({ name: name.trim().slice(0, 80) || "Mon CV" }).eq("id", id);
  if (error) throw error;
}

export async function deleteCv(id: string) {
  const { error } = await supabase.from("cvs").delete().eq("id", id);
  if (error) throw error;
}
