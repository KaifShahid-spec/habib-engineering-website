import { getBlogPosts } from "@/lib/queries/blog";
import { PostCard } from "@/components/sections/blog/PostCard";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { EmptyState } from "@/components/ui/empty-state";
import { generateMetadata } from "@/lib/seo/metadata";
import { FileQuestion } from "lucide-react";

export const metadata = generateMetadata({
  title: "Blog",
  description: "Engineering insights, project updates, and industry news from Habib Engineering.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <Section>
      <SectionHeader
        title="Blog & Insights"
        description="Engineering knowledge, project highlights, and industry updates from our team."
      />

      {posts.length === 0 ? (
        <EmptyState
          icon={<FileQuestion className="h-10 w-10 text-muted-foreground" />}
          title="No posts yet"
          description="Check back soon — we're preparing some great content for you."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </Section>
  );
}