import { createServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Building2, MapPin, Calendar, CheckCircle } from "lucide-react";
import { InquiryStatusUpdater } from "./status-updater";

export default async function InquiryDetailPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ type?: string }> 
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const isQuote = resolvedSearchParams.type === "quote";
  const tableName = isQuote ? "quote_requests" : "contact_submissions";

  const supabase = await createServerClient();
  const { data: inquiry, error } = await supabase
    .from(tableName)
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (error || !inquiry) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/inquiries">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {isQuote ? "Quote Request" : "Contact Inquiry"}
          </h2>
          <p className="text-muted-foreground">
            Received on {new Date(inquiry.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-semibold text-lg border-b pb-2 mb-4">
              {isQuote ? "Requested Items" : "Message"}
            </h3>
            
            {isQuote ? (
              <div className="space-y-4">
                {inquiry.items?.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-start border-b pb-2 last:border-0">
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      {item.notes && <p className="text-sm text-muted-foreground">{item.notes}</p>}
                    </div>
                    <span className="bg-muted px-2 py-1 rounded text-sm font-semibold">Qty: {item.quantity}</span>
                  </div>
                ))}
                {inquiry.additional_notes && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-semibold mb-1">Additional Notes:</p>
                    <p className="text-muted-foreground text-sm">{inquiry.additional_notes}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground whitespace-pre-wrap">
                {inquiry.message}
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Update Component */}
          <InquiryStatusUpdater 
            id={inquiry.id} 
            currentStatus={inquiry.status} 
            tableName={tableName} 
          />

          {/* Customer Info */}
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Customer Info</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Building2 className="size-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{inquiry.name}</p>
                  <p className="text-muted-foreground">{inquiry.company || "Individual"}</p>
                </div>
              </div>
              
              <a href={`mailto:${inquiry.email}`} className="flex items-center gap-2 hover:text-primary">
                <Mail className="size-4 text-muted-foreground" />
                {inquiry.email}
              </a>
              
              <a href={`tel:${inquiry.phone}`} className="flex items-center gap-2 hover:text-primary">
                <Phone className="size-4 text-muted-foreground" />
                {inquiry.phone}
              </a>

              {isQuote && (
                <div className="flex items-start gap-2">
                  <MapPin className="size-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{inquiry.project_location}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}