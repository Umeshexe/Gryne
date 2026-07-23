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

    const { companyName, email, grade, volume, message } = parsed.data;

    // Simulate async processing if RESEND_API_KEY is not set
    if (!process.env.RESEND_API_KEY) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return NextResponse.json(
        {
          success: true,
          message: "API Key not set. Simulated success.",
          referenceId: `GRY-${Date.now().toString(36).toUpperCase()}`,
        },
        { status: 200 }
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const referenceId = `GRY-${Date.now().toString(36).toUpperCase()}`;

    const { error } = await resend.emails.send({
      from: "Gryne Website <onboarding@resend.dev>", // Replace with verified domain in production
      to: process.env.INQUIRY_EMAIL_TO || "info@gryne.in",
      subject: `New Wholesale Inquiry: ${companyName} (${referenceId})`,
      html: `
        <h2>New Wholesale Inquiry</h2>
        <p><strong>Reference ID:</strong> ${referenceId}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Grade Interested:</strong> ${grade}</p>
        <p><strong>Est. Volume:</strong> ${volume}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send inquiry email." },
        { status: 500 }
      );
    }

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
