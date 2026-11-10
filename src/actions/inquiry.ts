"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireStaff } from "./auth";

export async function updateInquiryStatus(
  id: string,
  table: "contact_submissions" | "quote_requests",
  status: string
) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    // Admin can mark as 'read', 'replied', etc.
    const { error } = await supabase
      .from(table)
      .update({ status })
      .eq("id", id);
      
    if (error) throw error;

    revalidatePath("/admin/inquiries");
    revalidatePath(`/admin/inquiries/${id}`);
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function deleteInquiry(
  id: string,
  table: "contact_submissions" | "quote_requests"
) {
  try {
    await requireStaff();
    const supabase = await createServerClient();
    
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/admin/inquiries");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}