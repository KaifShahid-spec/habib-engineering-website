"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireStaff } from "./auth";

export type ClientInput = {
  name: string;
  sector?: string | null;
  city?: string | null;
  logo_url?: string | null;
};

export async function createClientRecord(data: ClientInput) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from("clients").insert(data);
    if (error) throw error;

    revalidatePath("/admin/clients");
    revalidatePath("/clients");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function updateClientRecord(id: string, data: Partial<ClientInput>) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from("clients").update(data).eq("id", id);
    if (error) throw error;

    revalidatePath("/admin/clients");
    revalidatePath("/clients");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function deleteClientRecord(id: string) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/admin/clients");
    revalidatePath("/clients");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}