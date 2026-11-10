"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireStaff } from "./auth";

// Type update kiya gaya hai taake null accept kare
export type CertificationInput = {
  name: string;
  issuer: string;
  issue_date: string;
  expiry_date?: string | null; // <- Yahan 'null' add kiya
  certificate_image_url?: string | null; // <- 'image_url' ki jagah 'certificate_image_url' kiya aur 'null' add kiya
  is_active?: boolean;
};

export async function createCertification(data: CertificationInput) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from("certifications").insert(data);
    if (error) throw error;

    revalidatePath("/admin/certifications");
    revalidatePath("/about/certifications");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function updateCertification(id: string, data: Partial<CertificationInput>) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from("certifications").update(data).eq("id", id);
    if (error) throw error;

    revalidatePath("/admin/certifications");
    revalidatePath("/about/certifications");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function deleteCertification(id: string) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from("certifications").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/admin/certifications");
    revalidatePath("/about/certifications");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}