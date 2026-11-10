import { getClients } from "@/lib/queries/clients";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminClientsPage() {
  const clients = await getClients();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Clients</h2>
          <p className="text-muted-foreground">Manage your client list.</p>
        </div>
        <Button asChild>
          <Link href="/admin/clients/new">
            <Plus className="mr-2 size-4" /> Add Client
          </Link>
        </Button>
      </div>

      <DataTable data={clients} type="clients" searchKey="name" />
    </div>
  );
}