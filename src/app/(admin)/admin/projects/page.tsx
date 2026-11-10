import { getProjects } from "@/lib/queries/projects";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">Manage your completed projects.</p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 size-4" /> Add Project
          </Link>
        </Button>
      </div>

      <DataTable data={projects} type="projects" searchKey="title" />
    </div>
  );
}