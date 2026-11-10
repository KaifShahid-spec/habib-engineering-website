import { BlogForm } from "@/components/forms/BlogForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/blog">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Write New Post</h2>
          <p className="text-muted-foreground">Create a new article for your website's blog.</p>
        </div>
      </div>

      {/* Humne BlogForm pehle hi bana liya hai, usay yahan use karein */}
      <BlogForm />
    </div>
  );
}