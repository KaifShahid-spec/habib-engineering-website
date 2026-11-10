"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { quoteFormSchema, type QuoteFormValues } from "@/lib/validators/quote";
import { sendQuoteEmails } from "@/lib/email/resend";
import { rateLimit } from "@/lib/security/rate-limit";
import { verifyCaptcha } from "@/lib/security/captcha";

export type QuoteActionResult =
  | { ok: true; quoteId: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitQuoteRequest(
  raw: unknown,
  meta?: { ip?: string; captchaToken?: string }
): Promise<QuoteActionResult> {
  const parsed = quoteFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data: QuoteFormValues = parsed.data;

  if (meta?.ip) {
    const rl = await rateLimit({ key: `quote:${meta.ip}`, limit: 5, window: "1 h" });
    if (!rl.ok) {
      return { ok: false, error: "Too many submissions. Please try again later." };
    }
  }

  const captcha = await verifyCaptcha(meta?.captchaToken);
  if (!captcha.ok) {
    return { ok: false, error: "Captcha verification failed." };
  }

  const supabase = await createServerClient();
  const { data: inserted, error: insertError } = await supabase
    .from("quote_requests")
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      project_location: data.projectLocation,
      project_type: data.projectType ?? null,
      timeline: data.timeline ?? null,
      items: data.items,
      additional_notes: data.additionalNotes ?? null,
    })
    .select("id")
    .single();

  if (insertError || !inserted) {
    console.error("[quote] insert failed:", insertError);
    return { ok: false, error: "Could not save your request. Please try again." };
  }

  try {
    await sendQuoteEmails({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      projectLocation: data.projectLocation,
      projectType: data.projectType,
      timeline: data.timeline,
      items: data.items,
      additionalNotes: data.additionalNotes,
      quoteId: inserted.id,
    });
  } catch (err) {
    console.error("[quote] email failed:", err);
  }

  revalidatePath("/admin/inquiries");

  return { ok: true, quoteId: inserted.id };
}