import { getCategories } from "@/lib/queries/categories";
import { CategoryCard } from "@/components/sections/products/CategoryCard";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { generateMetadata } from "@/lib/seo/metadata";
import { CTA } from "@/components/sections/home/CTA";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata = generateMetadata({
  title: "Products",
  description: "Explore our range of transformers, switchgear, and electrical panels manufactured in Pakistan.",
  path: "/products",
});

export default async function ProductsPage() {
  const categories = await getCategories();

  return (
    <>
      <Section>
        <SectionHeader
          title="Our Products"
          description="Engineered for reliability. Manufactured to international standards."
        />

        {categories.length === 0 ? (
          <EmptyState title="No categories found" description="Please add categories from the admin panel." />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </Section>
      <CTA />
    </>
  );
}