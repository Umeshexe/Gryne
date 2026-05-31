"use server";

import { inquirySchema, type InquiryFormData, type InquiryResponse } from "./schemas";

// Next.js Server Action for progressive enhancement (no-JS fallback)
// The React Query mutation hook in hooks.ts wraps this for client-side use.

export async function submitInquiryAction(data: InquiryFormData): Promise<InquiryResponse> {
  // Validate on the server even though the client already validated
  const parsed = inquirySchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed. Please check your inputs.",
      fieldErrors: parsed.error.flatten().fieldErrors as Partial<Record<keyof InquiryFormData, string[]>>,
    };
  }

  // Simulate network latency for realistic UX (replace with actual DB/email integration)
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Generate a simple reference ID
  const referenceId = `GRY-${Date.now().toString(36).toUpperCase()}`;

  // In production: send to CRM, email service (Resend, SendGrid), or database
  console.log(`[Gryne Inquiry] Received from ${parsed.data.email} — Ref: ${referenceId}`);

  return {
    success: true,
    message: "Your inquiry has been received. Our supply chain syndicate will contact you within 24 hours.",
    referenceId,
  };
}
