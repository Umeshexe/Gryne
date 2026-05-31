"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { submitInquiryAction } from "./actions";
import type { InquiryFormData } from "./schemas";

// React Query mutation hook wrapping the Server Action.
// Exposes isPending, isSuccess, isError states for the modal UI.
// Triggers brand-styled Sonner toasts on resolution.

export function useSubmitInquiry(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (data: InquiryFormData) => submitInquiryAction(data),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Inquiry Transmitted", {
          description: `Reference: ${result.referenceId} — We'll contact you within 24 hours.`,
          duration: 6000,
        });
        onSuccess?.();
      } else {
        toast.error("Submission Failed", {
          description: result.error,
          duration: 5000,
        });
      }
    },
    onError: () => {
      toast.error("Network Error", {
        description: "Could not reach our servers. Please try again.",
        duration: 5000,
      });
    },
  });
}
