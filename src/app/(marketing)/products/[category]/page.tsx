import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/lib/queries/categories";
import { getProductsByCategory } from "@/lib/queries/products";
import { ProductCard } from "@/components/sections/products/ProductCard";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateMetadata as buildMeta } from "@/lib/seo/metadata";
import { CTA } from "@/components/sections/home/CTA";
import { EmptyState } from "@/components/ui/empty-state";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props) {
  const { category: categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  
  if (!category) return { title: "Category not found" };

  return buildMeta({
    title: category.name,
    description: category.description || `Explore our ${category.name} products.`,
    path: `/products/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) notFound();

  const products = await getProductsByCategory(category.id);

  return (
    <>
      <Section>
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            { label: category.name },
          ]}
        />
        
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg text-muted-foreground">{category.description}</p>
          )}
        </div>

        {products.length === 0 ? (
          <EmptyState title="No products found" description="Products for this category will be added soon." />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={{ ...product, categories: { slug: category.slug } }} 
              />
            ))}
          </div>
        )}
      </Section>
      <CTA />
    </>
  );
}