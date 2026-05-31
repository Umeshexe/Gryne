import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/features/inquiries/schemas";

// POST /api/inquiry
// Validates payload with Zod, returns typed JSON response.
// This route exists alongside the Server Action to demonstrate
// the async architecture pattern for SDE-2/3 signaling.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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
