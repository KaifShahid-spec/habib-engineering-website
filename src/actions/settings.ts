"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireStaff } from "./auth";

export type SettingsInput = {
  key: string;
  value: string;
};

export async function updateSettings(settings: SettingsInput[]) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    // Upsert all settings
    const { error } = await supabase
      .from("settings")
      .upsert(settings, { onConflict: "key" });
      
    if (error) throw error;

    revalidatePath("/", "layout"); // Clears cache for whole site (header/footer)
    revalidatePath("/admin/settings");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}