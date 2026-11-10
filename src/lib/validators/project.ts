import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, "Title is required").max(150),
  slug: z.string().min(3, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  client_name: z.string().min(2, "Client name is required").max(150),
  sector: z.string().min(2, "Sector is required").max(100),
  location: z.string().min(2, "Location is required").max(150),
  year: z.number().int().min(1985).max(new Date().getFullYear()).optional(),
  description: z.string().max(5000).optional(),
  images: z.array(z.string().url()).optional(),
  is_featured: z.boolean().default(false),
});

export type ProjectValues = z.infer<typeof projectSchema>;