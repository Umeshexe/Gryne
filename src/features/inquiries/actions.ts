"use server";

import { headers } from "next/headers";
import { inquirySchema, type InquiryFormData, type InquiryResponse } from "./schemas";

// In-memory rate limiting cache for Server Action submissions
const ipCache = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // max 5 submissions
const WINDOW_MS = 60 * 1000; // 1 minute window

export async function submitInquiryAction(data: InquiryFormData): Promise<InquiryResponse> {
  // 1. Honeypot check (confusion defense)
  if (data.website || data.fax) {
    return {
      success: true,
      message: "Your inquiry has been received. Our supply chain syndicate will contact you within 24 hours.",
      referenceId: `GRY-${Date.now().toString(36).toUpperCase()}`,
    };
  }

  // 2. Rate limiting check
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") || headerList.get("x-real-ip") || "127.0.0.1";
  const now = Date.now();

  // Periodic cache cleanup (5% probability)
  if (Math.random() < 0.05) {
    for (const [key, value] of ipCache.entries()) {
      if (now > value.resetTime) {
        ipCache.delete(key);
      }
    }
  }

  const clientLimit = ipCache.get(ip);
  if (clientLimit) {
    if (now > clientLimit.resetTime) {
      ipCache.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    } else {
      clientLimit.count += 1;
      if (clientLimit.count > RATE_LIMIT) {
        return {
          success: false,
          error: "Too many requests. Please wait a minute before submitting again.",
        };
      }
    }
  } else {
    ipCache.set(ip, { count: 1, resetTime: now + WINDOW_MS });
  }

  // 3. Zod schema validation
  const parsed = inquirySchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed. Please check your inputs.",
      fieldErrors: parsed.error.flatten().fieldErrors as Partial<Record<keyof InquiryFormData, string[]>>,
    };
  }

  // Simulate network latency for realistic UX
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
