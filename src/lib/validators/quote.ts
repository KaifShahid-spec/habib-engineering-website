import { z } from "zod";

const quoteItemSchema = z.object({
  productName: z.string().min(2, "Product name is required"),
  quantity: z.string().min(1, "Quantity is required"),
  notes: z.string().max(500).optional(),
});

export const quoteFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is too short").max(20),
  company: z.string().min(2, "Company name is required").max(100),
  projectLocation: z.string().min(2, "Project location is required").max(150),
  projectType: z.string().max(100).optional(),
  timeline: z.string().max(100).optional(),
  items: z.array(quoteItemSchema).min(1, "At least one item is required"),
  additionalNotes: z.string().max(2000).optional(),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;