import { getCertifications } from "@/lib/queries/certifications";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminCertificationsPage() {
  const certifications = await getCertifications();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Certifications</h2>
          <p className="text-muted-foreground">Manage ISO and other credentials.</p>
        </div>
        <Button asChild>
          <Link href="/admin/certifications/new">
            <Plus className="mr-2 size-4" /> Add Certificate
          </Link>
        </Button>
      </div>

      {/* 🚨 Yahan searchKey="name" ki jagah "title" kar dein */}
      <DataTable data={certifications || []} type="certifications" searchKey="title" />
    </div>
  );
}