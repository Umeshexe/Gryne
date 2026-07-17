"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, Send, CheckCircle, Globe, MessageCircle, Link2 } from "lucide-react";
import Marquee from "@/components/ui/marquee";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

// ─── Schema ───────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

function ScrollSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Animated Input ───────────────────────────────────────────────────────────

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-label-caps text-label-caps text-on-surface-variant text-xs">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="font-label-caps text-[11px] text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Contact Detail Card ──────────────────────────────────────────────────────

function DetailCard({
  icon: Icon,
  title,
  lines,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
  accent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`flex items-start gap-4 p-5 border-2 border-primary shadow-[4px_4px_0px_0px_#3B28FF] bg-surface group cursor-default ${accent}`}
    >
      <div className="w-10 h-10 bg-vibrant-yellow border-2 border-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
        <Icon className="w-5 h-5 text-primary group-hover:text-vibrant-yellow transition-colors duration-300" />
      </div>
      <div>
        <p className="font-label-caps text-label-caps text-primary/60 text-xs mb-1">{title}</p>
        {lines.map((line) => (
          <p key={line} className="font-body-md text-body-md text-on-background font-semibold leading-tight">
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Contact form:", data);
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 4000);
  };

  const inputClass =
    "w-full border-2 border-primary bg-surface px-4 py-3 font-body-md text-on-background placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(59,40,255,0.15)] transition-all duration-200";

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── 1. Hero ── */}
      <section className="relative min-h-[480px] flex items-center px-6 md:px-margin-safe max-w-[1440px] mx-auto w-full overflow-hidden pt-24">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-vibrant-yellow/10 -z-0 pointer-events-none" />
        <div className="absolute -right-8 top-1/2 -translate-y-1/2 font-display-xl text-[200px] text-primary/5 select-none pointer-events-none whitespace-nowrap">
          TALK
        </div>

        <motion.div
          className="relative z-10 max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.4 }}
            className="inline-block font-label-caps text-label-caps bg-vibrant-yellow text-primary px-3 py-1 border-2 border-primary mb-6 shadow-[2px_2px_0px_0px_#3B28FF]"
          >
            GET IN TOUCH
          </motion.div>

          {["REACH", "OUT."].map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                className="font-display-xl text-[72px] leading-[68px] md:text-[140px] md:leading-[125px] text-primary uppercase block"
                variants={fadeUp}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {word}
              </motion.h1>
            </div>
          ))}

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mt-6 border-l-4 border-electric-blue pl-6 bg-surface/50 py-2"
          >
            Partner with us, ask about grades and pricing, or simply drop a line.
            We respond to all serious wholesale inquiries within 24 hours.
          </motion.p>
        </motion.div>
      </section>

      {/* ── 2. Marquee ── */}
      <Marquee items={["WHOLESALE INQUIRIES", "QUALITY ASSURANCE", "GLOBAL SHIPPING", "B2B PARTNERSHIPS"]} />

      {/* ── 3. Main Content — form + details ── */}
      <section className="px-6 md:px-margin-safe max-w-[1440px] mx-auto py-section-gap w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

          {/* ── Left: Form ── */}
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeLeft}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="border-4 border-primary shadow-[8px_8px_0px_0px_#3B28FF] p-8 md:p-12 bg-canvas-cream relative">
              <div className="absolute -top-5 left-8 bg-electric-blue text-white font-label-caps text-xs px-4 py-2 border-2 border-primary shadow-[2px_2px_0px_0px_#3B28FF]">
                SEND A MESSAGE
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    >
                      <CheckCircle className="w-20 h-20 text-primary mb-6" />
                    </motion.div>
                    <h3 className="font-headline-md text-[32px] text-primary uppercase mb-3">Message Sent!</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      We&apos;ll be in touch within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6 mt-4"
                    noValidate
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="Full Name" error={errors.name?.message}>
                        <input
                          {...register("name")}
                          placeholder="John Appleton"
                          className={inputClass}
                        />
                      </FormField>
                      <FormField label="Email Address" error={errors.email?.message}>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="john@company.com"
                          className={inputClass}
                        />
                      </FormField>
                    </div>

                    <FormField label="Subject" error={errors.subject?.message}>
                      <input
                        {...register("subject")}
                        placeholder="Wholesale pricing for W320 grade"
                        className={inputClass}
                      />
                    </FormField>

                    <FormField label="Your Message" error={errors.message?.message}>
                      <textarea
                        {...register("message")}
                        rows={6}
                        placeholder="Tell us about your requirements, volume, destination country..."
                        className={`${inputClass} resize-none`}
                      />
                    </FormField>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { x: 2, y: 2 } : {}}
                      whileTap={!isSubmitting ? { x: 4, y: 4 } : {}}
                      className="w-full md:w-auto self-start bg-primary text-on-primary font-button-text text-button-text px-10 py-4 border-2 border-primary shadow-[4px_4px_0px_0px_#18FF00] hover:bg-electric-blue transition-all duration-200 inline-flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          SENDING...
                        </>
                      ) : (
                        <>
                          SEND MESSAGE
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Right: Contact Details ── */}
          <motion.div
            className="lg:col-span-5 flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeRight}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <div className="mb-2">
              <p className="font-label-caps text-label-caps text-electric-blue mb-2">DIRECT CONTACTS</p>
              <h2 className="font-headline-md text-[36px] text-primary uppercase leading-tight">
                We&apos;re always<br />available.
              </h2>
            </div>

            <DetailCard
              icon={MapPin}
              title="HEAD OFFICE"
              lines={["Gryne International", "Industrial Estate, Visakhapatnam,", "Andhra Pradesh, India — 530 007"]}
              accent=""
            />
            <DetailCard
              icon={Phone}
              title="PHONE"
              lines={["+91 891 298 0000", "+91 98470 00000"]}
              accent=""
            />
            <DetailCard
              icon={Mail}
              title="EMAIL"
              lines={["trade@gryne.com", "quality@gryne.com"]}
              accent=""
            />

            {/* Map Embed */}
            <div className="w-full h-[220px] border-2 border-primary shadow-[4px_4px_0px_0px_#3B28FF] overflow-hidden relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243208.1567150172!2d83.1118128362489!3d17.738096350392305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39431389e6973f%3A0x92d9d203954984a1!2sVisakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(80%) contrast(120%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Gryne Office Location"
              />
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-2">
              {[
                { icon: Globe, label: "Website" },
                { icon: MessageCircle, label: "WhatsApp" },
                { icon: Link2, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ y: -3, x: 1 }}
                  whileTap={{ y: 1 }}
                  className="w-10 h-10 border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-200 shadow-[2px_2px_0px_0px_#18FF00]"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. Office Hours Banner ── */}
      <section className="bg-primary text-on-primary border-t-8 border-vibrant-yellow w-full">
        <ScrollSection className="max-w-[1440px] mx-auto px-6 md:px-margin-safe py-16 grid grid-cols-1 md:grid-cols-3 gap-gutter text-center">
          {[
            { label: "WEEKDAYS", value: "Mon – Fri", sub: "9:00 AM – 6:30 PM IST" },
            { label: "RESPONSE TIME", value: "< 24 Hours", sub: "For all B2B inquiries" },
            { label: "EMERGENCY TRADE", value: "+91 98470 00000", sub: "After-hours hotline" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-r-0 md:border-r-2 border-white/20 last:border-r-0 px-4"
            >
              <p className="font-label-caps text-label-caps text-vibrant-yellow mb-2">{item.label}</p>
              <p className="font-headline-md text-[28px] uppercase text-white mb-1">{item.value}</p>
              <p className="font-body-md text-body-md text-white/70">{item.sub}</p>
            </motion.div>
          ))}
        </ScrollSection>
      </section>
    </div>
  );
}
