import { ClientForm } from "@/components/forms/ClientForm";
import { createServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";


export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = await createServerClient();
  
  const { data: client, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (error || !client) {
    notFound(); // Agar ID ghalat ho toh 404 error dikhaye
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/clients">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Client</h2>
          <p className="text-muted-foreground">Editing: {client.name}</p>
        </div>
      </div>

      <ClientForm initialData={client} />
    </div>
  );
}