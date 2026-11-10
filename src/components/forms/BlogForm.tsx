"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { blogPostSchema, type BlogPostValues } from "@/lib/validators/blog";
import { createBlogPost, updateBlogPost } from "@/actions/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

interface BlogFormProps {
  initialData?: any;
}

export function BlogForm({ initialData }: BlogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const isEdit = !!initialData;

  // ✅ Type issue fix: useForm generic mein defaultValues ko handle kiya
  const form = useForm<BlogPostValues>({
    resolver: zodResolver(blogPostSchema) as any, // Type safe workaround for Zod v4
    defaultValues: initialData || {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      cover_image_url: "",
      is_published: false,
    },
  });

  async function onSubmit(data: BlogPostValues) {
    setIsSubmitting(true);
    try {
      const res = isEdit
        ? await updateBlogPost(initialData.id, data)
        : await createBlogPost(data);

      if (res.ok) {
        toast.success(`Post ${isEdit ? "updated" : "created"} successfully`);
        router.push("/admin/blog");
        router.refresh();
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to save post");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title *</Label>
          <Input {...form.register("title")} placeholder="Blog Post Title" />
          {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Slug *</Label>
          <Input {...form.register("slug")} placeholder="blog-post-title" />
          {form.formState.errors.slug && <p className="text-sm text-destructive">{form.formState.errors.slug.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Cover Image URL</Label>
        <Input {...form.register("cover_image_url")} placeholder="https://..." />
      </div>

      <div className="space-y-2">
        <Label>Excerpt (Short summary)</Label>
        <Input {...form.register("excerpt")} placeholder="Brief summary of the post..." />
      </div>

      <div className="space-y-2">
        <Label>Content *</Label>
        <RichTextEditor 
          value={form.watch("content")} 
          onChange={(html) => form.setValue("content", html, { shouldValidate: true })} 
        />
        {form.formState.errors.content && <p className="text-sm text-destructive">{form.formState.errors.content.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="is_published" {...form.register("is_published")} className="size-4" />
        <Label htmlFor="is_published">Publish immediately</Label>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <><Loader2 className="mr-2 size-4 animate-spin" /> Saving...</> : "Save Post"}
      </Button>
    </form>
  );
}