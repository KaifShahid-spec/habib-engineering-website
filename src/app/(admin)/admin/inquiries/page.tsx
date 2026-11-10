import { createServerClient } from "@/lib/supabase/server";
import { DataTable } from "@/components/admin/DataTable";

export default async function AdminInquiriesPage() {
  const supabase = await createServerClient();
  
  const { data: contacts } = await supabase.from("contact_submissions").select("*");
  const { data: quotes } = await supabase.from("quote_requests").select("*");

  const allInquiries = [
    ...(contacts || []).map(c => ({ ...c, type: "Contact" })),
    ...(quotes || []).map(q => ({ ...q, type: "Quote" })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Inquiries & Quotes</h2>
        <p className="text-muted-foreground">Manage messages and quote requests.</p>
      </div>

      <DataTable data={allInquiries} type="inquiries" searchKey="name" />
    </div>
  );
}