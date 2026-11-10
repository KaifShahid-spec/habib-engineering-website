"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireStaff } from "./auth";

export type BlogPostInput = {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  cover_image_url?: string;
  is_published?: boolean;
  published_at?: string;
};

export async function createBlogPost(data: BlogPostInput) {
  try {
    const { user } = await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from("blog_posts").insert({
      ...data,
      author_id: user.id,
    });
    if (error) throw error;

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function updateBlogPost(id: string, data: Partial<BlogPostInput>) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from("blog_posts").update(data).eq("id", id);
    if (error) throw error;

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${data.slug}`);
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}