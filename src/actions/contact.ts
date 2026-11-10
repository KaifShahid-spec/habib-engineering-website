"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { contactFormSchema, type ContactFormValues } from "@/lib/validators/contact";
import { sendContactEmails } from "@/lib/email/resend";
import { rateLimit } from "@/lib/security/rate-limit";
import { verifyCaptcha } from "@/lib/security/captcha";

export type ActionResult =
  | { ok: true; inquiryId: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitContactForm(
  raw: unknown,
  meta?: { ip?: string; captchaToken?: string }
): Promise<ActionResult> {
  // 1. Validate
  const parsed = contactFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data: ContactFormValues = parsed.data;

  // 2. Rate limit (IP-based)
  if (meta?.ip) {
    const rl = await rateLimit({ key: `contact:${meta.ip}`, limit: 5, window: "1 h" });
    if (!rl.ok) {
      return { ok: false, error: "Too many submissions. Please try again later." };
    }
  }

  // 3. Captcha (skip if token missing in dev, enforce in prod)
  const captcha = await verifyCaptcha(meta?.captchaToken);
  if (!captcha.ok) {
    return { ok: false, error: "Captcha verification failed." };
  }

  // 4. Insert
  const supabase = await createServerClient();
  const { data: inserted, error: insertError } = await supabase
    .from("contact_submissions")
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company ?? null,
      subject: data.subject,
      message: data.message,
      // user-agent/IP captured by Supabase (request metadata) — optional columns
    })
    .select("id")
    .single();

  if (insertError || !inserted) {
    console.error("[contact] insert failed:", insertError);
    return { ok: false, error: "Could not save your message. Please try again." };
  }

  // 5. Send emails (non-blocking — failure doesn't fail the action)
  try {
    await sendContactEmails({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      subject: data.subject,
      message: data.message,
      inquiryId: inserted.id,
    });
  } catch (err) {
    console.error("[contact] email failed:", err);
  }

  // 6. Revalidate admin
  revalidatePath("/admin/inquiries");

  return { ok: true, inquiryId: inserted.id };
}