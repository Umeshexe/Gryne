import { z } from "zod";

// ─── Inquiry Schema ────────────────────────────────────────────────────────────
// Single source of truth. TypeScript types are inferred from this schema,
// so there's no duplicate interface definition anywhere in the codebase.

export const inquirySchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name too long"),
  email: z
    .string()
    .email("Please enter a valid corporate email address"),
  grade: z.enum(["W180", "W240", "W320", "LWP"] as const, {
    message: "Please select a cashew grade",
  }),
  volume: z.enum(["1-10", "10-50", "50-200", "200+"] as const, {
    message: "Please select an estimated volume",
  }),
  message: z
    .string()
    .min(10, "Please describe your requirements (minimum 10 characters)")
    .max(1000, "Message too long"),
  // Honeypot fields (hidden fields to trap spambots)
  website: z.string().optional(),
  fax: z.string().optional(),
});

// Infer the TypeScript type from the schema directly
export type InquiryFormData = z.infer<typeof inquirySchema>;

// ─── API Response Types ────────────────────────────────────────────────────────

export interface InquirySuccessResponse {
  success: true;
  message: string;
  referenceId: string;
}

export interface InquiryErrorResponse {
  success: false;
  error: string;
  fieldErrors?: Partial<Record<keyof InquiryFormData, string[]>>;
}

export type InquiryResponse = InquirySuccessResponse | InquiryErrorResponse;
