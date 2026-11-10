import { createServerClient } from "@/lib/supabase/server";

export async function getProjects(featuredOnly = false) {
  const supabase = await createServerClient();
  let query = supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (featuredOnly) query = query.eq("is_featured", true);

  const { data, error } = await query;
  if (error) {
    console.error("[queries/projects] getProjects:", error);
    return [];
  }
  return data;
}

export async function getProjectBySlug(slug: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`[queries/projects] getProjectBySlug(${slug}):`, error);
    return null;
  }
  return data;
}