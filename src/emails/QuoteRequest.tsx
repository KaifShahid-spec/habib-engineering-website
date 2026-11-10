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

export type QuoteRequestItem = {
  productName: string;
  quantity: string;
  notes?: string;
};

export type QuoteRequestProps = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectLocation: string;
  projectType?: string;
  timeline?: string;
  items: QuoteRequestItem[];
  additionalNotes?: string;
  submittedAt: string;
  quoteId: string;
  siteUrl: string;
};

export function QuoteRequestEmail({
  name,
  email,
  phone,
  company,
  projectLocation,
  projectType,
  timeline,
  items,
  additionalNotes,
  submittedAt,
  quoteId,
  siteUrl,
}: QuoteRequestProps) {
  const preview = `Quote request from ${company} — ${items.length} item(s)`;

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Quote Request</Heading>
          <Text style={subtitle}>
            Received on <strong>{submittedAt}</strong> —{" "}
            <strong>{items.length}</strong> item(s)
          </Text>

          {/* Contact block */}
          <Section style={card}>
            <Text style={sectionHeading}>Contact</Text>
            <Row>
              <Column>
                <Text style={label}>Name</Text>
                <Text style={value}>{name}</Text>
              </Column>
              <Column>
                <Text style={label}>Company</Text>
                <Text style={value}>{company}</Text>
              </Column>
            </Row>
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
          </Section>

          {/* Project block */}
          <Section style={{ ...card, marginTop: "16px" }}>
            <Text style={sectionHeading}>Project Details</Text>
            <Row>
              <Column>
                <Text style={label}>Location</Text>
                <Text style={value}>{projectLocation}</Text>
              </Column>
              {projectType && (
                <Column>
                  <Text style={label}>Type</Text>
                  <Text style={value}>{projectType}</Text>
                </Column>
              )}
              {timeline && (
                <Column>
                  <Text style={label}>Timeline</Text>
                  <Text style={value}>{timeline}</Text>
                </Column>
              )}
            </Row>
          </Section>

          {/* Items block */}
          <Section style={{ ...card, marginTop: "16px" }}>
            <Text style={sectionHeading}>Requested Items</Text>
            {items.map((item, idx) => (
              <div key={idx}>
                <Hr style={hr} />
                <Row>
                  <Column style={{ width: "60%" }}>
                    <Text style={value}>
                      <strong>{item.productName}</strong>
                    </Text>
                    {item.notes && (
                      <Text style={smallText}>{item.notes}</Text>
                    )}
                  </Column>
                  <Column style={{ width: "40%", textAlign: "right" }}>
                    <Text style={value}>Qty: {item.quantity}</Text>
                  </Column>
                </Row>
              </div>
            ))}
          </Section>

          {additionalNotes && (
            <Section style={{ ...card, marginTop: "16px" }}>
              <Text style={sectionHeading}>Additional Notes</Text>
              <Text style={messageStyle}>{additionalNotes}</Text>
            </Section>
          )}

          <Section style={{ textAlign: "center", marginTop: "24px" }}>
            <a href={`${siteUrl}/admin/inquiries/${quoteId}`} style={button}>
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

// --- styles (identical design language as NewInquiry) ---

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

const sectionHeading: React.CSSProperties = {
  color: "#0f172a",
  fontSize: "13px",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  margin: "0 0 12px",
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

const smallText: React.CSSProperties = {
  color: "#64748b",
  fontSize: "12px",
  margin: "0 0 12px",
  lineHeight: "1.5",
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