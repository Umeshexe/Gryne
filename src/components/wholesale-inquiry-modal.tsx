"use client";

import React, { useState } from "react";
import { useInquiry } from "@/context/inquiry-context";
import { X, Send, Check } from "lucide-react";

export default function WholesaleInquiryModal() {
  const { isOpen, closeInquiry } = useInquiry();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    volume: "10-50",
    grade: "W240",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        // Reset and close
        setSubmitted(false);
        setFormData({
          companyName: "",
          email: "",
          volume: "10-50",
          grade: "W240",
          message: "",
        });
        closeInquiry();
      }, 2500);
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={closeInquiry}
    >
      <div
        className="relative w-full max-w-lg bg-canvas-cream border-4 border-primary p-8 md:p-10 sticker hard-shadow-yellow animate-[scaleIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeInquiry}
          className="absolute top-4 right-4 text-primary hover:text-electric-blue p-2 cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-8 h-8" />
        </button>

        {submitted ? (
          <div className="text-center py-12 flex flex-col items-center justify-center animate-[fadeIn_0.3s_ease-out]">
            <div className="w-20 h-20 bg-primary text-vibrant-yellow border-4 border-primary rounded-full flex items-center justify-center mb-6 sticker hard-shadow">
              <Check className="w-12 h-12" />
            </div>
            <h3 className="font-headline-md text-headline-md text-primary uppercase mb-2">
              Inquiry Sent!
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant font-bold max-w-xs mx-auto">
              Our supply-chain syndicate will contact you with type-safe pricing within 24 hours.
            </p>
          </div>
        ) : (
          <div>
            <span className="font-label-caps text-label-caps bg-black text-vibrant-yellow px-3 py-1 sticker mb-6 inline-block">
              WHOLESALE TRADE
            </span>
            <h2 className="font-headline-lg text-[40px] leading-tight text-primary uppercase mb-8">
              B2B Inquiry
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Company Name */}
              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-[12px] text-primary">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  placeholder="ACME GLOBAL CORP"
                  className="font-body-md text-body-md text-primary border-b-2 border-primary focus:border-electric-blue outline-none py-2 bg-transparent uppercase tracking-wider rounded-none placeholder:text-primary/30"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-[12px] text-primary">
                  Corporate Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="PURCHASING@ACME.COM"
                  className="font-body-md text-body-md text-primary border-b-2 border-primary focus:border-electric-blue outline-none py-2 bg-transparent uppercase tracking-wider rounded-none placeholder:text-primary/30"
                />
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-label-caps text-[12px] text-primary">
                    Preferred Grade
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({ ...formData, grade: e.target.value })
                    }
                    className="font-body-md text-body-md text-primary border-b-2 border-primary focus:border-electric-blue outline-none py-2 bg-transparent uppercase rounded-none cursor-pointer"
                  >
                    <option value="W180">W180 (KING SIZE)</option>
                    <option value="W240">W240 (JUMBO)</option>
                    <option value="W320">W320 (STANDARD)</option>
                    <option value="LWP">LWP (PIECES)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-caps text-[12px] text-primary">
                    Est. Volume (Tons)
                  </label>
                  <select
                    value={formData.volume}
                    onChange={(e) =>
                      setFormData({ ...formData, volume: e.target.value })
                    }
                    className="font-body-md text-body-md text-primary border-b-2 border-primary focus:border-electric-blue outline-none py-2 bg-transparent uppercase rounded-none cursor-pointer"
                  >
                    <option value="1-10">1 - 10 TONS</option>
                    <option value="10-50">10 - 50 TONS</option>
                    <option value="50-200">50 - 200 TONS</option>
                    <option value="200+">200+ TONS</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-[12px] text-primary">
                  Specific Specifications
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="ROASTED/SALTED REQUIREMENTS, SHELF LIFE SPECS, SHIPPMENT TIMELINES..."
                  rows={3}
                  className="font-body-md text-body-md text-primary border-b-2 border-primary focus:border-electric-blue outline-none py-2 bg-transparent uppercase tracking-wider rounded-none resize-none placeholder:text-primary/30"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full flex items-center justify-center gap-2 font-button-text text-button-text bg-primary text-white border-2 border-primary py-4 shadow-[4px_4px_0px_0px_rgba(46,91,255,1)] hover:bg-electric-blue hover:text-white transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(46,91,255,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_rgba(46,91,255,1)] disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  "TRANSMITTING..."
                ) : (
                  <>
                    SUBMIT B2B INQUIRY <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
