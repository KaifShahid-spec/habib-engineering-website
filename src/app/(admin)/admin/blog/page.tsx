import { createServerClient } from "@/lib/supabase/server";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminBlogPage() {
  const supabase = await createServerClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog Posts</h2>
          <p className="text-muted-foreground">Manage your articles and news.</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="mr-2 size-4" /> New Post
          </Link>
        </Button>
      </div>

      <DataTable data={posts || []} type="blog" searchKey="title" />
    </div>
  );
}