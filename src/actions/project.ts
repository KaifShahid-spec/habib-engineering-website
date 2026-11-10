"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireStaff } from "./auth";

export type ProjectInput = {
  title: string;
  slug: string;
  client_name?: string | null;
  sector?: string | null;
  location?: string | null;
  city?: string | null;
  scope?: string | null;
  description?: string | null;
  completion_year?: number | null;
  image_url?: string | null;
  is_featured?: boolean;
  is_active?: boolean;
  sort_order?: number;
};

export async function createProject(data: ProjectInput) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from("projects").insert(data);
    if (error) throw error;

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function updateProject(id: string, data: Partial<ProjectInput>) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from("projects").update(data).eq("id", id);
    if (error) throw error;

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath(`/projects/${data.slug}`);
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function deleteProject(id: string) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}