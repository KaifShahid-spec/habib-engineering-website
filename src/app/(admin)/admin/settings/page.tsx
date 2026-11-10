import { createServerClient } from "@/lib/supabase/server";
import { SettingsForm } from "@/components/forms/SettingsForm";


export default async function SettingsPage() {
  const supabase = await createServerClient();
  
  const { data: settingsData } = await supabase.from("settings").select("*");

  // Data ko object format mein convert karna
  const initialSettings = (settingsData || []).reduce((acc: Record<string, string>, curr: any) => {
    if (curr.key && curr.value) {
      acc[curr.key] = curr.value;
    }
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Global Settings</h2>
        <p className="text-muted-foreground">Manage contact info, addresses, and social links for the entire website.</p>
      </div>

      <SettingsForm initialSettings={initialSettings} />
    </div>
  );
}