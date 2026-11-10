import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export type ThankYouProps = {
  name: string;
  /** "contact" | "quote" | "newsletter" */
  kind: "contact" | "quote" | "newsletter";
  /** Reference id shown to user (inquiry/quote id) */
  referenceId?: string;
  companyName: string;
  companyPhone: string;
  companyEmail: string;
  siteUrl: string;
};

const messages: Record<
  ThankYouProps["kind"],
  { preview: string; heading: string; body: string }
> = {
  contact: {
    preview: "We received your message — Habib Engineering",
    heading: "Thank you for reaching out",
    body: "Our team has received your message and will get back to you within 24 hours during business hours (Mon–Sat, 9:00 AM – 6:00 PM PKT).",
  },
  quote: {
    preview: "Your quote request has been received — Habib Engineering",
    heading: "Your quote request is in",
    body: "We've received your quote request. A member of our sales team will review your requirements and respond within 1–2 business days with a detailed quotation.",
  },
  newsletter: {
    preview: "You're subscribed — Habib Engineering",
    heading: "You're subscribed",
    body: "Thanks for subscribing to Habib Engineering updates. We'll share project highlights, product launches and industry news — no spam, ever.",
  },
};

export function ThankYouEmail({
  name,
  kind,
  referenceId,
  companyName,
  companyPhone,
  companyEmail,
  siteUrl,
}: ThankYouProps) {
  const m = messages[kind];

  return (
    <Html>
      <Head />
      <Preview>{m.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Assalam-o-Alaikum, {name}</Heading>
          <Text style={subtitle}>{m.heading}</Text>

          <Text style={body}>{m.body}</Text>

          {referenceId && (
            <Section style={refBox}>
              <Text style={refLabel}>Your reference number</Text>
              <Text style={refValue}>{referenceId}</Text>
            </Section>
          )}

          <Hr style={hr} />

          <Text style={body}>
            If you need anything urgent, please call us at{" "}
            <a href={`tel:${companyPhone}`} style={link}>
              {companyPhone}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${companyEmail}`} style={link}>
              {companyEmail}
            </a>
            .
          </Text>

          <Section style={{ textAlign: "center", marginTop: "24px" }}>
            <a href={siteUrl} style={button}>
              Visit our website
            </a>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            {companyName}
            <br />
            <a href={siteUrl} style={link}>
              {siteUrl}
            </a>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// --- styles ---

const main: React.CSSProperties = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: "24px 0",
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  margin: "0 auto",
  maxWidth: "560px",
  padding: "40px 32px",
  border: "1px solid #e6ebf1",
};

const h1: React.CSSProperties = {
  color: "#0f172a",
  fontSize: "22px",
  fontWeight: "700",
  margin: "0 0 8px",
};

const subtitle: React.CSSProperties = {
  color: "#475569",
  fontSize: "15px",
  fontWeight: "600",
  margin: "0 0 24px",
};

const body: React.CSSProperties = {
  color: "#334155",
  fontSize: "14px",
  lineHeight: "1.65",
  margin: "0 0 16px",
};

const refBox: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  border: "1px dashed #cbd5e1",
  borderRadius: "6px",
  padding: "16px 20px",
  margin: "24px 0",
  textAlign: "center",
};

const refLabel: React.CSSProperties = {
  color: "#64748b",
  fontSize: "11px",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  margin: "0 0 6px",
};

const refValue: React.CSSProperties = {
  color: "#0f172a",
  fontSize: "16px",
  fontWeight: "700",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  letterSpacing: "0.02em",
  margin: 0,
};

const link: React.CSSProperties = {
  color: "#2563eb",
  textDecoration: "none",
};

const hr: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e2e8f0",
  margin: "24px 0",
};

const button: React.CSSProperties = {
  backgroundColor: "#0f172a",
  borderRadius: "6px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "600",
  padding: "12px 24px",
  textDecoration: "none",
};

const footer: React.CSSProperties = {
  color: "#94a3b8",
  fontSize: "12px",
  lineHeight: "1.6",
  margin: 0,
  textAlign: "center",
};