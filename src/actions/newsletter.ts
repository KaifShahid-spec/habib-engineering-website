"use server";

import { createServerClient } from "@/lib/supabase/server";
import { newsletterSchema, type NewsletterValues } from "@/lib/validators/contact";
import { sendNewsletterWelcome } from "@/lib/email/resend";
import { rateLimit } from "@/lib/security/rate-limit";

export type NewsletterResult =
  | { ok: true }
  | { ok: false; error: string };

export async function subscribeNewsletter(
  raw: unknown,
  meta?: { ip?: string }
): Promise<NewsletterResult> {
  const parsed = newsletterSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Please enter a valid email." };
  }

  const data: NewsletterValues = parsed.data;

  if (meta?.ip) {
    const rl = await rateLimit({
      key: `newsletter:${meta.ip}`,
      limit: 3,
      window: "1 h",
    });
    if (!rl.ok) {
      return { ok: false, error: "Too many attempts. Please try again later." };
    }
  }

  const supabase = await createServerClient();

  // Upsert by email — re-subscribing is idempotent
  const { error } = await supabase
    .from("newsletter_subscribers")
    .upsert(
      {
        email: data.email,
        status: "active",
        source: "website",
      },
      { onConflict: "email", ignoreDuplicates: false }
    );

  if (error) {
    console.error("[newsletter] upsert failed:", error);
    return { ok: false, error: "Could not subscribe. Please try again." };
  }

  // Send welcome (best-effort)
  try {
    await sendNewsletterWelcome(data.email);
  } catch (err) {
    console.error("[newsletter] welcome email failed:", err);
  }

  return { ok: true };
}