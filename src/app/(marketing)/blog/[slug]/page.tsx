import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/queries/blog";
import { PostBody } from "@/components/sections/blog/PostBody";
import { PostCard } from "@/components/sections/blog/PostCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { formatDate } from "@/lib/utils";
import { generateMetadata as buildMeta } from "@/lib/seo/metadata";
import { getArticleSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Calendar, User, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return buildMeta({
    title: post.title,
    description: post.excerpt || `Read "${post.title}" on the Habib Engineering blog.`,
    path: `/blog/${post.slug}`,
    image: post.cover_image_url || undefined,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Related posts (latest 3, excluding current)
  const allPosts = await getBlogPosts(4);
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const displayDate = post.published_at || post.created_at;
  const authorName = "Habib Engineering Team";

  return (
    <>
      <JsonLd
        data={getArticleSchema({
          title: post.title,
          description: post.excerpt || "",
          image: post.cover_image_url || undefined,
          datePublished: displayDate,
          url: `${siteConfig.url}/blog/${post.slug}`,
          authorName,
        })}
      />

      <article className="pb-16">
        {/* Hero Image */}
        {post.cover_image_url && (
          <div className="relative w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden bg-muted">
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </div>
        )}

        <div className="container mx-auto px-4 max-w-3xl -mt-20 md:-mt-32 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />

          <header className="mb-10 space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="size-4" /> {authorName}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" /> {formatDate(displayDate)}
              </span>
            </div>

            {post.excerpt && (
              <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary pl-4 italic">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Body */}
          <PostBody content={post.content} />

          {/* Back link */}
          <div className="mt-12 pt-8 border-t">
            <Button variant="outline" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 size-4" /> Back to all posts
              </Link>
            </Button>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section bg="muted">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">More from our blog</h2>
            <Button variant="link" asChild>
              <Link href="/blog">
                View all <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}