import Link from "next/link";
import Image from "next/image";
import { Settings } from "lucide-react";

export function ProductCard({ product }: { product: any }) {
  return (
    <Link 
      href={`/products/${product.categories?.slug || 'uncategorized'}/${product.slug}`}
      className="group flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image Box */}
      <div className="relative aspect-4/3 bg-slate-50 flex items-center justify-center border-b border-slate-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-300">
            <Settings className="size-8 mb-1" />
            <span className="text-[8px] font-bold uppercase tracking-wider">Pending</span>
          </div>
        )}
      </div>

      {/* Content Box */}
      <div className="p-3 flex flex-col flex-1">
        <span className="text-[8px] font-bold text-primary uppercase tracking-wider mb-1 bg-primary/10 w-fit px-1.5 py-0.5 rounded">
          {product.categories?.name || "Uncategorized"}
        </span>
        <h3 className="text-xs md:text-sm font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          {product.name}
        </h3>
        <div className="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between text-primary font-semibold text-[10px]">
          Details <span className="text-lg leading-none">→</span>
        </div>
      </div>
    </Link>
  );
}