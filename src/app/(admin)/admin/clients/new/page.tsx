import { ClientForm } from "@/components/forms/ClientForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewClientPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/clients">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add Client</h2>
          <p className="text-muted-foreground">Add a new client to your portfolio.</p>
        </div>
      </div>

      <ClientForm />
    </div>
  );
}