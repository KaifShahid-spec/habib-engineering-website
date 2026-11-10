import type { Database } from "./database";

export type ContactSubmissionRow = Database["public"]["Tables"]["contact_submissions"]["Row"];
export type QuoteRequestRow = Database["public"]["Tables"]["quote_requests"]["Row"];
export type NewsletterSubscriberRow = Database["public"]["Tables"]["newsletter_subscribers"]["Row"];