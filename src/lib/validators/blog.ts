import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(3, "Title is required").max(200),
  slug: z.string().min(3, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  excerpt: z.string().max(300).optional(),
  content: z.string().min(10, "Content is required"),
  cover_image_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  is_published: z.boolean().default(false),
  published_at: z.string().optional(),
});

export type BlogPostValues = z.infer<typeof blogPostSchema>;