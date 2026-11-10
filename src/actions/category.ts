"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireStaff } from "./auth";

export type CategoryInput = {
  name: string;
  slug: string;
  description?: string;
  image_url?: string | null; // 🚨 Ye line add ki
  is_active?: boolean;
};

export async function createCategory(data: CategoryInput) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from("categories").insert(data);
    if (error) throw error;

    revalidatePath("/admin/categories");
    revalidatePath("/products");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function updateCategory(id: string, data: Partial<CategoryInput>) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from("categories").update(data).eq("id", id);
    if (error) throw error;

    revalidatePath("/admin/categories");
    revalidatePath("/products");
    revalidatePath(`/products/${data.slug}`);
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function deleteCategory(id: string) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/admin/categories");
    revalidatePath("/products");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}