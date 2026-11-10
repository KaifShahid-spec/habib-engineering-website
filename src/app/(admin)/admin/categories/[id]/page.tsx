import { createServerClient } from "@/lib/supabase/server";
import { CategoryForm } from "@/components/forms/CategoryForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; // 🚨 YEH AWAIT ZAROORI HAI
  const supabase = await createServerClient();
  
  const { data: category, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (error || !category) {
    notFound(); 
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/categories">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Category</h2>
          <p className="text-muted-foreground">Editing: {category.name}</p>
        </div>
      </div>

      <CategoryForm initialData={category} />
    </div>
  );
}