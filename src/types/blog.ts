import type { Database } from "./database";

export type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"];

// UI mein post card dikhane ke liye minimal type
export type BlogPostCard = Pick<
  BlogPostRow,
  "id" | "title" | "slug" | "excerpt" | "cover_image_url" | "published_at"
>;