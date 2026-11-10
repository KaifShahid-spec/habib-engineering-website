import { createServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Phone, ChevronRight, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RelatedProducts } from "@/components/sections/products/RelatedProducts";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const supabase = await createServerClient();
  
  const { data: product } = await supabase
    .from("products")
    .select("name, description")
    .eq("slug", slug)
    .single();

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Habib Engineering`,
    description: product.description || `Buy ${product.name} from Habib Engineering.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const supabase = await createServerClient();

  // 1. Product fetch karein
  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (name, slug)
    `)
    .eq("slug", resolvedParams.slug)
    .single();

  if (error || !product) {
    notFound();
  }

  // 2. Specifications parse karein
  const specs = product.specifications || {};

  return (
    <div className="bg-white min-h-screen">
      
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="container mx-auto px-4 py-3 max-w-6xl flex items-center gap-2 text-xs md:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <ChevronRight className="size-3 md:size-4 shrink-0" />
          <Link href={`/products/${product.categories?.slug}`} className="hover:text-primary transition-colors">
            {product.categories?.name || "Category"}
          </Link>
          <ChevronRight className="size-3 md:size-4 shrink-0" />
          <span className="text-slate-900 font-medium truncate">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* 🚨 Left: Product Image (Full Cover, High Quality, Mobile Big) */}
          <div className="relative w-full aspect-4/3 md:aspect-video lg:aspect-square bg-slate-100 rounded-2xl border shadow-sm overflow-hidden group">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw" 
                quality={100} // 🚨 Quality 100% rakhi hai
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <div className="size-24 rounded-full bg-slate-200 flex items-center justify-center mb-4">
                  <Settings className="size-10 text-slate-400" />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider">Image Pending</span>
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col pt-2 md:pt-0">
            
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                {product.categories?.name || "Product"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
              {product.description || "High-quality engineering product designed for industrial applications."}
            </p>

            {/* Key Features */}
            <div className="mb-8 space-y-3 bg-slate-50 p-5 rounded-xl border">
              <h3 className="font-bold text-slate-900 mb-3">Key Features:</h3>
              {Object.entries(specs).slice(0, 3).map(([key, value], idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-slate-700">
                    <strong className="text-slate-900 capitalize">{key.replace(/_/g, ' ')}:</strong> {String(value)}
                  </span>
                </div>
              ))}
              {Object.keys(specs).length === 0 && (
                <>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-slate-700">Manufactured to international standards (IEC/ISO).</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-slate-700">Tested and certified for maximum reliability.</span>
                  </div>
                </>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 text-base rounded-full">
                <Link href={`/contact/request-quote?product=${product.name}`}>
                  Request a Quote
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base rounded-full border-slate-300">
                <a href="tel:+923268442292">
                  <Phone className="mr-2 size-5" /> Call Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts 
        currentProductId={product.id} 
        categoryId={product.category_id} 
      />

    </div>
  );
}