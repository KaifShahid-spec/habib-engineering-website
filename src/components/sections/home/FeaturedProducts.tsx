import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Settings } from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";

export async function FeaturedProducts() {
  const supabase = await createServerClient();
  
  const { data: products } = await supabase
    .from("products")
    .select(`
      *,
      categories (name, slug)
    `)
    .eq("is_featured", true)
    .limit(6);

  if (!products || products.length === 0) return null; 

  return (
    <section className="relative py-16 md:py-24 bg-slate-950 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/Featuredproduct-bg.avif" 
          alt="Power Transmission Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block border border-primary/50 text-primary font-black tracking-widest uppercase text-sm md:text-2xl mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-primary/10">
              Our Products
            </span>
            <h2 className="text-2xl md:text-5xl font-extrabold text-white mb-2 md:mb-4">
              Engineered for Performance
            </h2>
            <p className="text-slate-200 text-sm md:text-lg leading-relaxed">
              We manufacture high-quality electrical equipment designed to meet international standards for reliability and safety.
            </p>
          </div>
          <Link href="/products" className="flex items-center text-slate-900 font-bold text-xs md:text-sm bg-white px-4 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-slate-100 transition-all shrink-0">
            View All <span className="hidden sm:inline ml-1">Products</span> <ArrowRight className="ml-1 md:ml-2 size-3 md:size-4" />
          </Link>
        </div>

        {/* Products Grid - Mobile 2 Cols, Desktop 3 Cols */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
          {products.map((product: any) => (
            <Link 
              key={product.id} 
              href={`/products/${product.categories?.slug || 'uncategorized'}/${product.slug}`}
              className="group flex flex-col bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Box - Full Cover */}
              <div className="relative aspect-square md:aspect-4/3 bg-slate-100 overflow-hidden">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                    <Settings className="size-6 md:size-8 mb-1" />
                    <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-wider">Pending</span>
                  </div>
                )}
              </div>

              {/* Content Box */}
              <div className="p-2.5 md:p-4 flex flex-col flex-1">
                <span className="text-[8px] md:text-[9px] font-bold text-primary uppercase tracking-wider mb-1 md:mb-1.5 bg-primary/10 w-fit px-1.5 md:px-2 py-0.5 rounded">
                  {product.categories?.name || "Uncategorized"}
                </span>
                <h3 className="text-xs md:text-base font-bold text-slate-900 mb-1.5 md:mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                <div className="mt-auto pt-1.5 md:pt-2 border-t border-slate-100 flex items-center justify-between text-primary font-semibold text-[10px] md:text-xs">
                  Details <ArrowRight className="size-3 md:size-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}