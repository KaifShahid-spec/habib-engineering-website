"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireStaff } from "./auth";

export type ProductInput = {
  category_id: string;
  name: string;
  slug: string;
  description?: string;
  specs?: Record<string, any>;
  images?: string[];
  is_active?: boolean;
};

export async function createProduct(data: ProductInput) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from("products").insert(data);
    if (error) throw error;

    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function updateProduct(id: string, data: Partial<ProductInput>) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from("products").update(data).eq("id", id);
    if (error) throw error;

    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}