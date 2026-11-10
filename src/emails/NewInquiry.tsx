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
  Row,
  Column,
} from "@react-email/components";

export type NewInquiryProps = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  submittedAt: string;
  inquiryId: string;
  siteUrl: string;
};

export function NewInquiryEmail({
  name,
  email,
  phone,
  company,
  subject,
  message,
  submittedAt,
  inquiryId,
  siteUrl,
}: NewInquiryProps) {
  const preview = `New inquiry from ${name} — ${subject}`;

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Website Inquiry</Heading>
          <Text style={subtitle}>
            A new contact form submission was received on{" "}
            <strong>{submittedAt}</strong>.
          </Text>

          <Section style={card}>
            <Text style={label}>From</Text>
            <Text style={value}>{name}</Text>

            <Hr style={hr} />

            <Row>
              <Column>
                <Text style={label}>Email</Text>
                <Text style={value}>
                  <a href={`mailto:${email}`} style={link}>
                    {email}
                  </a>
                </Text>
              </Column>
              <Column>
                <Text style={label}>Phone</Text>
                <Text style={value}>
                  <a href={`tel:${phone}`} style={link}>
                    {phone}
                  </a>
                </Text>
              </Column>
            </Row>

            {company && (
              <>
                <Hr style={hr} />
                <Text style={label}>Company</Text>
                <Text style={value}>{company}</Text>
              </>
            )}

            <Hr style={hr} />

            <Text style={label}>Subject</Text>
            <Text style={value}>{subject}</Text>

            <Hr style={hr} />

            <Text style={label}>Message</Text>
            <Text style={messageStyle}>{message}</Text>
          </Section>

          <Section style={{ textAlign: "center", marginTop: "24px" }}>
            <a href={`${siteUrl}/admin/inquiries/${inquiryId}`} style={button}>
              View in Admin →
            </a>
          </Section>

          <Text style={footer}>
            Sent automatically from {siteUrl} — do not reply to this email.
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
  maxWidth: "600px",
  padding: "32px",
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
  fontSize: "14px",
  margin: "0 0 24px",
};

const card: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  borderRadius: "6px",
  padding: "20px",
  border: "1px solid #e2e8f0",
};

const label: React.CSSProperties = {
  color: "#64748b",
  fontSize: "11px",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  margin: "0 0 4px",
};

const value: React.CSSProperties = {
  color: "#0f172a",
  fontSize: "14px",
  margin: "0 0 12px",
};

const messageStyle: React.CSSProperties = {
  ...value,
  whiteSpace: "pre-wrap",
  lineHeight: "1.6",
};

const link: React.CSSProperties = {
  color: "#2563eb",
  textDecoration: "none",
};

const hr: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e2e8f0",
  margin: "12px 0",
};

const button: React.CSSProperties = {
  backgroundColor: "#0f172a",
  borderRadius: "6px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "600",
  padding: "12px 20px",
  textDecoration: "none",
};

const footer: React.CSSProperties = {
  color: "#94a3b8",
  fontSize: "12px",
  marginTop: "32px",
  textAlign: "center",
};