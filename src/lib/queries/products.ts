import { createServerClient } from "@/lib/supabase/server";

export async function getProducts(limit?: number) {
  const supabase = await createServerClient();
  let query = supabase
    .from("products")
    .select(`*, categories(name, slug)`)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("[queries/products] getProducts:", error);
    return [];
  }
  return data;
}

export async function getProductsByCategory(categoryId: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .order("name");

  if (error) {
    console.error(`[queries/products] getProductsByCategory(${categoryId}):`, error);
    return [];
  }
  return data;
}

export async function getProductBySlug(categorySlug: string, productSlug: string) {
  const supabase = await createServerClient();
  
  // Nested fetch: product jiski category ka slug match karta ho
  const { data, error } = await supabase
    .from("products")
    .select(`*, categories!inner(name, slug)`)
    .eq("slug", productSlug)
    .eq("categories.slug", categorySlug)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error(`[queries/products] getProductBySlug(${categorySlug}, ${productSlug}):`, error);
    return null;
  }
  return data;
}