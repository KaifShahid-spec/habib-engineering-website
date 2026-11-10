import { createServerClient } from "@/lib/supabase/server";

export async function getClients() {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("name");

  if (error) {
    console.error("[queries/clients] getClients:", error);
    return [];
  }
  return data;
}