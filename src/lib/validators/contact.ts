import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is too short").max(20),
  company: z.string().max(100).optional().or(z.literal("")),
  subject: z.string().min(3, "Subject is required").max(150),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginValues = z.infer<typeof loginSchema>;