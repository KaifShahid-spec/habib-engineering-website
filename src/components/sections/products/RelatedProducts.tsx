import { createServerClient } from "@/lib/supabase/server";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  currentProductId: string;
  categoryId: string;
}

export async function RelatedProducts({ currentProductId, categoryId }: RelatedProductsProps) {
  const supabase = await createServerClient();
  
  const { data: relatedProducts } = await supabase
    .from("products")
    .select(`
      *,
      categories (name, slug)
    `)
    .eq("category_id", categoryId)
    .neq("id", currentProductId)
    .eq("is_active", true)
    .limit(3);

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-slate-50 border-t">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Related Products</h2>
            <p className="text-slate-500 text-sm">Explore more products in this category.</p>
          </div>
        </div>

        {/* 🚨 Grid ab mobile par 2 columns aur desktop par 3 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {relatedProducts.map((product: any) => (
            <ProductCard 
              key={product.id} 
              product={{ ...product, categories: product.categories }} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}