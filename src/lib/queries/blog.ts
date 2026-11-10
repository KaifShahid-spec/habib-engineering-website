import { createServerClient } from "@/lib/supabase/server";

export async function getBlogPosts(limit?: number) {
  const supabase = await createServerClient();
  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("[queries/blog] getBlogPosts:", error);
    return [];
  }
  return data;
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) {
    console.error(`[queries/blog] getBlogPostBySlug(${slug}):`, error);
    return null;
  }
  return data;
}