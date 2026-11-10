"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search as SearchIcon, FileQuestion, Package, Briefcase, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/sections/products/ProductCard";
import { ProjectCard } from "@/components/sections/projects/ProjectCard";
import { PostCard } from "@/components/sections/blog/PostCard";
import { EmptyState } from "@/components/ui/empty-state";

interface SearchResultsProps {
  initialQuery: string;
  allProducts: any[];
  allProjects: any[];
  allPosts: any[];
}

export function SearchResults({ initialQuery, allProducts, allProjects, allPosts }: SearchResultsProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Debounce search and update URL
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      router.replace(`/search?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, router, searchParams]);

  // Filter results
  const filteredProducts = useMemo(() => 
    query ? allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.description?.toLowerCase().includes(query.toLowerCase())) : [],
  [allProducts, query]);

  const filteredProjects = useMemo(() => 
    query ? allProjects.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.client_name.toLowerCase().includes(query.toLowerCase())) : [],
  [allProjects, query]);

  const filteredPosts = useMemo(() => 
    query ? allPosts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt?.toLowerCase().includes(query.toLowerCase())) : [],
  [allPosts, query]);

  const totalResults = filteredProducts.length + filteredProjects.length + filteredPosts.length;

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products, projects, and articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 h-14 text-lg bg-card"
          autoFocus
        />
      </div>

      {/* Results */}
      {!query ? (
        <div className="text-center py-16 text-muted-foreground">
          <SearchIcon className="size-12 mx-auto mb-4 opacity-20" />
          <p>Start typing to search...</p>
        </div>
      ) : totalResults === 0 ? (
        <EmptyState
          icon={<FileQuestion className="h-10 w-10 text-muted-foreground" />}
          title="No results found"
          description={`We couldn't find anything matching "${query}". Try a different keyword.`}
        />
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3">
              All ({totalResults})
            </TabsTrigger>
            <TabsTrigger value="products" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3">
              <Package className="size-4 mr-2" /> Products ({filteredProducts.length})
            </TabsTrigger>
            <TabsTrigger value="projects" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3">
              <Briefcase className="size-4 mr-2" /> Projects ({filteredProjects.length})
            </TabsTrigger>
            <TabsTrigger value="blog" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3">
              <FileText className="size-4 mr-2" /> Blog ({filteredPosts.length})
            </TabsTrigger>
          </TabsList>

          {/* All Results */}
          <TabsContent value="all" className="space-y-8">
            {filteredProducts.length > 0 && (
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2"><Package className="size-4 text-primary" /> Products</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.slice(0, 3).map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            )}
            {filteredProjects.length > 0 && (
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2"><Briefcase className="size-4 text-primary" /> Projects</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProjects.slice(0, 3).map(p => <ProjectCard key={p.id} project={p} />)}
                </div>
              </div>
            )}
            {filteredPosts.length > 0 && (
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2"><FileText className="size-4 text-primary" /> Blog Posts</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPosts.slice(0, 3).map(p => <PostCard key={p.id} post={p} />)}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Filtered by Type */}
          <TabsContent value="products">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </TabsContent>
          <TabsContent value="projects">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          </TabsContent>
          <TabsContent value="blog">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(p => <PostCard key={p.id} post={p} />)}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}