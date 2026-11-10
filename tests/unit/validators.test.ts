import { describe, it, expect } from "vitest";
import { contactFormSchema, newsletterSchema } from "@/lib/validators/contact";
import { quoteFormSchema } from "@/lib/validators/quote";

describe("Contact Validator", () => {
  it("accepts valid contact data", () => {
    const result = contactFormSchema.safeParse({
      name: "Kaif Shahid",
      email: "kaif@example.com",
      phone: "+92 300 1234567",
      subject: "Inquiry",
      message: "This is a test message that is long enough.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = contactFormSchema.safeParse({
      name: "Kaif Shahid",
      email: "invalid-email",
      phone: "+92 300 1234567",
      subject: "Inquiry",
      message: "This is a test message.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short message", () => {
    const result = contactFormSchema.safeParse({
      name: "Kaif",
      email: "kaif@example.com",
      phone: "03001234567",
      subject: "Hi",
      message: "Too short",
    });
    expect(result.success).toBe(false);
  });
});

describe("Newsletter Validator", () => {
  it("accepts valid email", () => {
    expect(newsletterSchema.safeParse({ email: "test@example.com" }).success).toBe(true);
  });

  it("rejects invalid email", () => {
    expect(newsletterSchema.safeParse({ email: "not-an-email" }).success).toBe(false);
  });
});

describe("Quote Validator", () => {
  it("requires at least one item", () => {
    const result = quoteFormSchema.safeParse({
      name: "Kaif",
      email: "kaif@example.com",
      phone: "03001234567",
      company: "Test Co",
      projectLocation: "Lahore",
      items: [],
    });
    expect(result.success).toBe(false);
  });

  it("accepts valid quote request", () => {
    const result = quoteFormSchema.safeParse({
      name: "Kaif",
      email: "kaif@example.com",
      phone: "03001234567",
      company: "Test Co",
      projectLocation: "Lahore",
      items: [{ productName: "Transformer", quantity: "2" }],
    });
    expect(result.success).toBe(true);
  });
});