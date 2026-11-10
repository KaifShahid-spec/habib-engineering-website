import { Resend } from "resend";
import { render } from "@react-email/components";
import { siteConfig } from "@/config/site";
import { NewInquiryEmail } from "@/emails/NewInquiry";
import { QuoteRequestEmail } from "@/emails/QuoteRequest";
import { ThankYouEmail } from "@/emails/ThankYou";

/**
 * Resend client wrapper.
 * - Single place to initialize the SDK
 * - Centralized sender/recipient defaults
 * - Type-safe helpers used by server actions
 *
 * ⚠️ Server-only: never import this file from a client component.
 */

// Lazy init — throws only when actually used, not at import time.
let _resend: Resend | null = null;
function getResend(): Resend {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "RESEND_API_KEY is missing. Add it to .env.local (see .env.example)."
    );
  }
  _resend = new Resend(key);
  return _resend;
}

// --- config ---

const FROM =
  process.env.EMAIL_FROM ??
  `Habib Engineering <noreply@habibengineering.com.pk>`;

const ADMIN_EMAILS: string[] = (
  process.env.EMAIL_TO_ADMIN ??
  process.env.EMAIL_TO_INFO ??
  siteConfig.emailSales
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;

// --- helpers ---

export type SendResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

async function send(args: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendResult> {
  try {
    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: args.to,
      subject: args.subject,
      html: args.html,
      ...(args.replyTo ? { replyTo: args.replyTo } : {}),
    });

    if (error) return { ok: false, error: error.message };
    return { ok: true, id: data?.id ?? "" };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown email error";
    return { ok: false, error: message };
  }
}

// --- Contact form ---

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  inquiryId: string;
};

export async function sendContactEmails(
  payload: ContactPayload
): Promise<{ admin: SendResult; ack: SendResult }> {
  const submittedAt = new Date().toLocaleString("en-PK", {
    timeZone: siteConfig.timezone,
    dateStyle: "medium",
    timeStyle: "short",
  });

  // 1) Notify admin
  const adminHtml = await render(
    NewInquiryEmail({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      company: payload.company,
      subject: payload.subject,
      message: payload.message,
      submittedAt,
      inquiryId: payload.inquiryId,
      siteUrl: SITE_URL,
    })
  );

  const admin = await send({
    to: ADMIN_EMAILS,
    subject: `New inquiry — ${payload.name} (${payload.subject})`,
    html: adminHtml,
    replyTo: payload.email,
  });

  // 2) Acknowledge user
  const ackHtml = await render(
    ThankYouEmail({
      name: payload.name,
      kind: "contact",
      referenceId: payload.inquiryId,
      companyName: siteConfig.name,
      companyPhone: siteConfig.phone,
      companyEmail: siteConfig.email,
      siteUrl: SITE_URL,
    })
  );

  const ack = await send({
    to: payload.email,
    subject: `We received your message — ${siteConfig.name}`,
    html: ackHtml,
  });

  return { admin, ack };
}

// --- Quote request ---

export type QuotePayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectLocation: string;
  projectType?: string;
  timeline?: string;
  items: { productName: string; quantity: string; notes?: string }[];
  additionalNotes?: string;
  quoteId: string;
};

export async function sendQuoteEmails(
  payload: QuotePayload
): Promise<{ admin: SendResult; ack: SendResult }> {
  const submittedAt = new Date().toLocaleString("en-PK", {
    timeZone: siteConfig.timezone,
    dateStyle: "medium",
    timeStyle: "short",
  });

  const adminHtml = await render(
    QuoteRequestEmail({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      company: payload.company,
      projectLocation: payload.projectLocation,
      projectType: payload.projectType,
      timeline: payload.timeline,
      items: payload.items,
      additionalNotes: payload.additionalNotes,
      submittedAt,
      quoteId: payload.quoteId,
      siteUrl: SITE_URL,
    })
  );

  const admin = await send({
    to: ADMIN_EMAILS,
    subject: `Quote request from ${payload.company} (${payload.items.length} item${
      payload.items.length === 1 ? "" : "s"
    })`,
    html: adminHtml,
    replyTo: payload.email,
  });

  const ackHtml = await render(
    ThankYouEmail({
      name: payload.name,
      kind: "quote",
      referenceId: payload.quoteId,
      companyName: siteConfig.name,
      companyPhone: siteConfig.phone,
      companyEmail: siteConfig.email,
      siteUrl: SITE_URL,
    })
  );

  const ack = await send({
    to: payload.email,
    subject: `Your quote request is in — ${siteConfig.name}`,
    html: ackHtml,
  });

  return { admin, ack };
}

// --- Newsletter ---

export async function sendNewsletterWelcome(
  email: string
): Promise<SendResult> {
  const html = await render(
    ThankYouEmail({
      name: email.split("@")[0],
      kind: "newsletter",
      companyName: siteConfig.name,
      companyPhone: siteConfig.phone,
      companyEmail: siteConfig.email,
      siteUrl: SITE_URL,
    })
  );

  return send({
    to: email,
    subject: `You're subscribed — ${siteConfig.name}`,
    html,
  });
}