"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Check, Loader2, AlertCircle } from "lucide-react";
import { useInquiry } from "@/context/inquiry-context";
import { useSubmitInquiry } from "@/features/inquiries/hooks";
import { inquirySchema, type InquiryFormData } from "@/features/inquiries/schemas";
import { triggerHaptic } from "@/lib/haptics";

// ─── Field Error Component ────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <motion.span
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-1 font-label-caps text-[10px] text-red-600 mt-1"
    >
      <AlertCircle className="w-3 h-3" />
      {message}
    </motion.span>
  );
}

// ─── Main Modal Component ─────────────────────────────────────────────────────

export default function WholesaleInquiryModal() {
  const { isOpen, closeInquiry } = useInquiry();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      companyName: "",
      email: "",
      grade: "W240",
      volume: "100-300kg",
      message: "",
      website: "",
      fax: "",
    },
  });

  const { mutate, isPending, isSuccess } = useSubmitInquiry(() => {
    setTimeout(() => {
      reset();
      closeInquiry();
    }, 3000);
  });

  const onSubmit = (data: InquiryFormData) => {
    triggerHaptic('medium');
    mutate(data);
  };

  const inputClass =
    "font-body-md text-body-md text-primary border-b-2 border-primary focus:border-electric-blue outline-none py-2 bg-transparent uppercase tracking-wider rounded-none placeholder:text-primary/30 w-full transition-colors duration-200";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeInquiry}
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="relative w-full max-w-lg bg-canvas-cream border-4 border-primary p-8 md:p-10 sticker hard-shadow-yellow"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeInquiry}
              className="absolute top-4 right-4 text-primary hover:text-electric-blue p-2 cursor-pointer transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-7 h-7" />
            </button>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                /* ── Success State ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                    className="w-20 h-20 bg-primary text-vibrant-yellow border-4 border-primary flex items-center justify-center mb-6 hard-shadow"
                  >
                    <Check className="w-12 h-12" />
                  </motion.div>
                  <h3 className="font-headline-md text-headline-md text-primary uppercase mb-2">
                    Inquiry Sent!
                  </h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant font-bold max-w-xs mx-auto">
                    Our supply-chain syndicate will contact you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                /* ── Form State ── */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="font-label-caps text-label-caps bg-black text-vibrant-yellow px-3 py-1 sticker mb-6 inline-block">
                    WHOLESALE TRADE
                  </span>
                  <h2 className="font-headline-lg text-[40px] leading-tight text-primary uppercase mb-8">
                    B2B Inquiry
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
                    {/* Honeypot fields (traps automated spambots) */}
                    <div className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden pointer-events-none opacity-0" aria-hidden="true">
                      <input
                        {...register("website")}
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                      <input
                        {...register("fax")}
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Company Name */}
                    <div className="flex flex-col">
                      <label className="font-label-caps text-[12px] text-primary mb-1">
                        Company Name *
                      </label>
                      <input
                        {...register("companyName")}
                        type="text"
                        placeholder="ACME GLOBAL CORP"
                        className={inputClass}
                        aria-invalid={!!errors.companyName}
                      />
                      <AnimatePresence>
                        <FieldError message={errors.companyName?.message} />
                      </AnimatePresence>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                      <label className="font-label-caps text-[12px] text-primary mb-1">
                        Corporate Email *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="PURCHASING@ACME.COM"
                        className={inputClass}
                        aria-invalid={!!errors.email}
                      />
                      <AnimatePresence>
                        <FieldError message={errors.email?.message} />
                      </AnimatePresence>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="font-label-caps text-[12px] text-primary mb-1">
                          Preferred Grade *
                        </label>
                        <select
                          {...register("grade")}
                          className={`${inputClass} cursor-pointer`}
                          aria-invalid={!!errors.grade}
                        >
                          <option value="W180">W180 (KING SIZE)</option>
                          <option value="W240">W240 (JUMBO)</option>
                          <option value="W320">W320 (STANDARD)</option>
                          <option value="LWP">LWP (PIECES)</option>
                        </select>
                        <AnimatePresence>
                          <FieldError message={errors.grade?.message} />
                        </AnimatePresence>
                      </div>

                      <div className="flex flex-col">
                        <label className="font-label-caps text-[12px] text-primary mb-1">
                          Est. Volume *
                        </label>
                        <select
                          {...register("volume")}
                          className={`${inputClass} cursor-pointer`}
                          aria-invalid={!!errors.volume}
                        >
                          <option value="100-300kg">100 - 300 KGS</option>
                          <option value="300-500kg">300 - 500 KGS</option>
                          <option value="500kg-1ton">500 KGS - 1 TON</option>
                          <option value="1-10">1 - 10 TONS</option>
                          <option value="10-50">10 - 50 TONS</option>
                          <option value="50-200">50 - 200 TONS</option>
                          <option value="200+">200+ TONS</option>
                        </select>
                        <AnimatePresence>
                          <FieldError message={errors.volume?.message} />
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col">
                      <label className="font-label-caps text-[12px] text-primary mb-1">
                        Specific Requirements *
                      </label>
                      <textarea
                        {...register("message")}
                        placeholder="ROASTED/SALTED REQUIREMENTS, SHELF LIFE SPECS, SHIPMENT TIMELINES..."
                        rows={3}
                        className={`${inputClass} resize-none`}
                        aria-invalid={!!errors.message}
                      />
                      <AnimatePresence>
                        <FieldError message={errors.message?.message} />
                      </AnimatePresence>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isPending}
                      whileHover={{ x: 2, y: 2 }}
                      whileTap={{ x: 4, y: 4 }}
                      className="mt-2 w-full flex items-center justify-center gap-3 font-button-text text-button-text bg-primary text-white border-2 border-primary py-4 shadow-[4px_4px_0px_0px_rgba(24,255,0,1)] hover:bg-electric-blue transition-colors duration-300 disabled:opacity-60 cursor-pointer"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          TRANSMITTING...
                        </>
                      ) : (
                        <>
                          SUBMIT B2B INQUIRY
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
