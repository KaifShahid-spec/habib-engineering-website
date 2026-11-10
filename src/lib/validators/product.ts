import { z } from "zod";

export const productSchema = z.object({
  category_id: z.string().uuid("Invalid category ID"),
  name: z.string().min(2, "Product name is required").max(150),
  slug: z.string().min(2, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().max(5000).optional(),
  // ✅ Zod v4 mein z.record() ko 2 arguments chahiye (Key aur Value)
  specs: z.record(z.string(), z.any()).optional(), 
  images: z.array(z.string().url()).optional(),
  is_active: z.boolean().default(true),
});

export type ProductValues = z.infer<typeof productSchema>;