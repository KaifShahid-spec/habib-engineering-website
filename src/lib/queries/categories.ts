import { createServerClient } from "@/lib/supabase/server";

export async function getCategories() {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (error) {
    console.error("[queries/categories] getCategories:", error);
    return [];
  }
  return data;
}

export async function getCategoryBySlug(slug: string) {
  const supabase = await createServerClient();

  // 🚨 Alias Mapping: URL ke slug ko database ke asli slug se jodein
  const slugMap: Record<string, string> = {
    "switchgear": "mv-switchgear", // /products/switchgear -> mv-switchgear
    "lv-panels": "lv-switchgear",  // /products/lv-panels  -> lv-switchgear
  };

  const actualSlug = slugMap[slug] || slug;

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", actualSlug) // 🚨 Yahan actualSlug use karein
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error(`[queries/categories] getCategoryBySlug(${slug}):`, error);
    return null;
  }
  return data;
}