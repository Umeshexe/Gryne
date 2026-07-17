import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/features/inquiries/schemas";

// In-memory rate limiting cache
const ipCache = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // max 5 submissions
const WINDOW_MS = 60 * 1000; // 1 minute window

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Honeypot check (confusion defense)
    // If spambots fill out the hidden field, return success but discard payload silently.
    if (body.website || body.fax) {
      return NextResponse.json(
        {
          success: true,
          message: "Inquiry received. Our team will contact you within 24 hours.",
          referenceId: `GRY-${Date.now().toString(36).toUpperCase()}`,
        },
        { status: 200 }
      );
    }

    // 2. Rate Limiting check
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
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
        // Reset window for client
        ipCache.set(ip, { count: 1, resetTime: now + WINDOW_MS });
      } else {
        clientLimit.count += 1;
        if (clientLimit.count > RATE_LIMIT) {
          const secondsRemaining = Math.ceil((clientLimit.resetTime - now) / 1000);
          return NextResponse.json(
            {
              success: false,
              error: "Too many requests. Please wait before submitting another inquiry.",
            },
            {
              status: 429,
              headers: {
                "Retry-After": secondsRemaining.toString(),
              },
            }
          );
        }
      }
    } else {
      ipCache.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    }

    // 3. Schema validation
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    // Simulate async processing (replace with Resend, Supabase, etc.)
    await new Promise((resolve) => setTimeout(resolve, 800));

    const referenceId = `GRY-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received. Our team will contact you within 24 hours.",
        referenceId,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
