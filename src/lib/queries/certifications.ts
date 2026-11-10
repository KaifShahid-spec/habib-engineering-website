import { createServerClient } from "@/lib/supabase/server";

export async function getCertifications() {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .eq("is_active", true)
    .order("issue_date", { ascending: false });

  if (error) {
    console.error("[queries/certifications] getCertifications:", error);
    return [];
  }
  return data;
}