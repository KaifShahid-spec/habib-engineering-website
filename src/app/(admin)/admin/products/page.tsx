import { getProducts } from "@/lib/queries/products";
import { DataTable } from "@/components/admin/DataTable"; // ✅ Direct import
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">Manage your products.</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new"><Plus className="mr-2 size-4" /> Add Product</Link>
        </Button>
      </div>

      {/* ✅ Ab sirf data, type aur searchKey bhejein (Koi function nahi) */}
      <DataTable 
        data={products} 
        type="products" 
        searchKey="name" 
      />
    </div>
  );
}