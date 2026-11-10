import { CategoryForm } from "@/components/forms/CategoryForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/categories">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add Category</h2>
          <p className="text-muted-foreground">Create a new product category.</p>
        </div>
      </div>

      <CategoryForm />
    </div>
  );
}