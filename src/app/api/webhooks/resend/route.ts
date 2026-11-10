import { NextRequest, NextResponse } from "next/server";

/**
 * Resend Webhook Handler.
 * Setup instructions: https://resend.com/docs/dashboard/webhooks/introduction
 * 
 * Ye track karta hai:
 * - email.sent
 * - email.delivered
 * - email.bounced
 * - email.complained
 * - email.opened
 * - email.clicked
 */

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const eventType = payload.type;
    const emailData = payload.data;

    // Log event (you can store this in a database for analytics)
    console.log(`[Resend Webhook] Event: ${eventType}`);
    console.log(`Email ID: ${emailData?.email_id}`);
    console.log(`To: ${emailData?.to}`);

    switch (eventType) {
      case "email.delivered":
        console.log(`✅ Email delivered to ${emailData.to}`);
        break;
      case "email.bounced":
        console.log(`❌ Email bounced: ${emailData.to}`);
        break;
      case "email.complained":
        console.warn(`⚠️ Spam complaint from ${emailData.to}`);
        break;
      default:
        console.log(`ℹ️ Event received: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 400 }
    );
  }
}