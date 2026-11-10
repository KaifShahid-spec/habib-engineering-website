import { getCategories } from "@/lib/queries/categories";
import { ProductForm } from "@/components/forms/ProductForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add New Product</h2>
          <p className="text-muted-foreground">Create a new product listing for your website.</p>
        </div>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}