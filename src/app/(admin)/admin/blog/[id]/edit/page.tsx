import { createServerClient } from "@/lib/supabase/server";
import { BlogForm } from "@/components/forms/BlogForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = await createServerClient();
  
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/blog">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Post</h2>
          <p className="text-muted-foreground">Editing: {post.title}</p>
        </div>
      </div>

      <BlogForm initialData={post} />
    </div>
  );
}