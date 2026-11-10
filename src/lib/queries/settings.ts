import { createServerClient } from "@/lib/supabase/server";

export async function getSettings() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.from("settings").select("*");

  if (error) {
    console.error("[queries/settings] getSettings:", error);
    return {};
  }

  // Convert array [{key: 'phone', value: '123'}] into object { phone: '123' }
  return data.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);
}