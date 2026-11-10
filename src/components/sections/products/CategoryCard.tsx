import Link from "next/link";
import { ArrowRight, Box } from "lucide-react";
import { LazyImage } from "@/components/shared/LazyImage";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image_url: string | null;
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/products/${category.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:border-primary/50 hover:shadow-md"
    >
      <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden">
        {category.image_url ? (
          <LazyImage
            src={category.image_url}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Box className="size-12 text-muted-foreground/30" />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {category.description || `Explore our range of ${category.name}.`}
        </p>
        <div className="mt-4 flex items-center text-sm font-semibold text-primary">
          View Products <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}