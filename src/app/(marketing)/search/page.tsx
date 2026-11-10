import { Suspense } from "react";
import { getProducts } from "@/lib/queries/products";
import { getProjects } from "@/lib/queries/projects";
import { getBlogPosts } from "@/lib/queries/blog";
import { Section } from "@/components/ui/section";
import { generateMetadata } from "@/lib/seo/metadata";
import { SearchResults } from "./search-results";
import { SearchSkeleton } from "./search-skeleton";

export const metadata = generateMetadata({
  title: "Search",
  description: "Search products, projects, and blog posts.",
  path: "/search",
  noIndex: true, // Search result pages ko Google index nahi karna chahiye
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  // Parallel data fetching
  const [products, projects, posts] = await Promise.all([
    getProducts(),
    getProjects(),
    getBlogPosts(),
  ]);

  return (
    <Section>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Search</h1>
          <p className="text-muted-foreground">Find products, projects, and articles.</p>
        </div>

        {/* 
          Humne SearchResults ko ek alag client component mein rakha hai 
          jo URL query param `q` ko handle karega.
        */}
        <Suspense fallback={<SearchSkeleton />}>
          <SearchResults
            initialQuery={query}
            allProducts={products}
            allProjects={projects}
            allPosts={posts}
          />
        </Suspense>
      </div>
    </Section>
  );
}