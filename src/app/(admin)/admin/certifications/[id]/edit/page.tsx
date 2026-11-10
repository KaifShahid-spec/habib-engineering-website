import { createServerClient } from "@/lib/supabase/server";
import { CertificationForm } from "@/components/forms/CertificationForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";


export default async function EditCertificationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = await createServerClient();
  
  const { data: certificate, error } = await supabase
    .from("certifications")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (error || !certificate) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/certifications">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Certificate</h2>
          <p className="text-muted-foreground">Editing: {certificate.name}</p>
        </div>
      </div>

      <CertificationForm initialData={certificate} />
    </div>
  );
}