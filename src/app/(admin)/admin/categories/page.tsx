import { createServerClient } from "@/lib/supabase/server";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminCategoriesPage() {
  const supabase = await createServerClient();
  const { data: categories } = await supabase.from("categories").select("*").order("name");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">Manage product categories.</p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/new">
            <Plus className="mr-2 size-4" /> Add Category
          </Link>
        </Button>
      </div>

      <DataTable data={categories || []} type="categories" searchKey="name" />
    </div>
  );
}