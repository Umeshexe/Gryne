import { describe, it, expect } from "vitest";
import { inquirySchema } from "@/features/inquiries/schemas";

// ─── Zod Schema Tests ─────────────────────────────────────────────────────────
// Tests the domain rules in isolation — no UI, no network, no React.
// This is the SDE-3 testing pattern: test the contract first.

describe("inquirySchema", () => {
  const validPayload = {
    companyName: "Acme Global Corp",
    email: "purchasing@acme.com",
    grade: "W240" as const,
    volume: "10-50" as const,
    message: "We need 40 tons of W240 jumbo grade cashews for the Q3 season.",
  };

  // ── Valid Input ─────────────────────────────────────────────────────────────

  it("accepts a fully valid inquiry payload", () => {
    const result = inquirySchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  // ── companyName ─────────────────────────────────────────────────────────────

  it("rejects company name shorter than 2 characters", () => {
    const result = inquirySchema.safeParse({ ...validPayload, companyName: "A" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.companyName).toBeDefined();
    }
  });

  it("rejects an empty company name", () => {
    const result = inquirySchema.safeParse({ ...validPayload, companyName: "" });
    expect(result.success).toBe(false);
  });

  // ── email ────────────────────────────────────────────────────────────────────

  it("rejects a malformed email address", () => {
    const result = inquirySchema.safeParse({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  it("rejects an empty email field", () => {
    const result = inquirySchema.safeParse({ ...validPayload, email: "" });
    expect(result.success).toBe(false);
  });

  it("accepts valid email formats", () => {
    const emails = ["user@domain.com", "name+tag@sub.example.org", "purchasing@acme.co.uk"];
    for (const email of emails) {
      const result = inquirySchema.safeParse({ ...validPayload, email });
      expect(result.success).toBe(true);
    }
  });

  // ── grade ────────────────────────────────────────────────────────────────────

  it("accepts all valid cashew grades", () => {
    const grades = ["W180", "W240", "W320", "LWP"] as const;
    for (const grade of grades) {
      const result = inquirySchema.safeParse({ ...validPayload, grade });
      expect(result.success).toBe(true);
    }
  });

  it("rejects an unknown grade value", () => {
    const result = inquirySchema.safeParse({ ...validPayload, grade: "W999" });
    expect(result.success).toBe(false);
  });

  // ── volume ────────────────────────────────────────────────────────────────────

  it("accepts all valid volume options", () => {
    const volumes = ["1-10", "10-50", "50-200", "200+"] as const;
    for (const volume of volumes) {
      const result = inquirySchema.safeParse({ ...validPayload, volume });
      expect(result.success).toBe(true);
    }
  });

  it("rejects an unknown volume value", () => {
    const result = inquirySchema.safeParse({ ...validPayload, volume: "500+" });
    expect(result.success).toBe(false);
  });

  // ── message ─────────────────────────────────────────────────────────────────

  it("rejects a message shorter than 10 characters", () => {
    const result = inquirySchema.safeParse({ ...validPayload, message: "Too short" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.message).toBeDefined();
    }
  });

  it("accepts a message of exactly 10 characters", () => {
    const result = inquirySchema.safeParse({ ...validPayload, message: "1234567890" });
    expect(result.success).toBe(true);
  });

  // ── missing fields ────────────────────────────────────────────────────────────

  it("fails on a completely empty object", () => {
    const result = inquirySchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("collects all field errors simultaneously when multiple fields are invalid", () => {
    const result = inquirySchema.safeParse({
      companyName: "",
      email: "bad",
      grade: "INVALID",
      volume: "INVALID",
      message: "short",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      // Multiple fields should fail at once, not stop at first error
      expect(Object.keys(errors).length).toBeGreaterThan(1);
    }
  });
});
