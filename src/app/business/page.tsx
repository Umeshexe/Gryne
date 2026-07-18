"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useInquiry } from "@/context/inquiry-context";
import Marquee from "@/components/ui/marquee";
import { Factory, ShieldCheck, Truck, ArrowRight, Warehouse, Landmark } from "lucide-react";
import BlurText from "@/components/ui/blur-text";

// ─── Animation Variants ───────────────────────────────────────────────────────

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

function ScrollSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Extracted Components ─────────────────────────────────────────────────────

function ChainStepCard({ step, i }: { step: { num: string; title: string; location: string; desc: string; icon: React.ComponentType<{ className?: string }> }; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = step.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-surface border-2 border-secondary p-6 shadow-[4px_4px_0px_0px_rgba(59,40,255,0.15)] flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 bg-vibrant-yellow border-2 border-primary flex items-center justify-center font-display-xl text-[20px] text-primary shadow-[2px_2px_0px_0px_#3B28FF]">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <span className="font-headline-md text-3xl text-secondary opacity-30 select-none">{step.num}</span>
        </div>
        <h3 className="font-headline-md text-[24px] leading-none text-white uppercase mb-1">{step.title}</h3>
        <span className="font-label-caps text-xs text-electric-blue block mb-4">{step.location}</span>
        <p className="font-body-md text-body-md text-on-primary/80">{step.desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const chainSteps = [
  {
    num: "01", title: "Direct Sourcing", location: "West Africa",
    desc: "We buy directly from farmer cooperatives, cutting out intermediary agents to guarantee full tracing and direct support to local growers.",
    icon: Landmark,
  },
  {
    num: "02", title: "Secure Sea Transit", location: "Global Shipping Lanes",
    desc: "Constant temperature monitoring ensures our raw cargo is protected against humidity fluctuations throughout its oceanic voyage.",
    icon: Truck,
  },
  {
    num: "03", title: "Processing", location: "Vizag, India",
    desc: "High-standard sorting mills combine robotic precision with human expertise to shell, grade, and verify each cashew kernel.",
    icon: Factory,
  },
  {
    num: "04", title: "Wholesale Delivery", location: "Global Distribution",
    desc: "Vacuum-sealed packaging keeps our product fresh, delivering peak-grade cashews to manufacturers and B2B buyers worldwide.",
    icon: Warehouse,
  },
];

// ─── Parallax Banner ──────────────────────────────────────────────────────────

function ParallaxCTA({ onClick }: { onClick: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="bg-vibrant-yellow text-primary py-20 px-6 text-center border-t-4 border-primary w-full overflow-hidden relative">
      <motion.div style={{ y }} className="relative z-10">
        <ScrollSection>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display-xl text-[48px] md:text-[80px] leading-none uppercase tracking-tighter mb-6">
            CONTRACT YOUR VOLUME
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="font-body-lg text-body-lg text-primary max-w-xl mx-auto mb-8 font-bold">
            Secure seasonal supply lines and high-quality grade locking directly with the global syndicate.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={onClick}
              className="sticker bg-primary text-on-primary font-button-text text-button-text px-10 py-5 hover:bg-electric-blue hover:text-white transition-all duration-300 hard-shadow-blue text-xl cursor-pointer"
            >
              REQUEST BULK OFFER SHEET
            </motion.button>
          </motion.div>
        </ScrollSection>
      </motion.div>
    </section>
  );
}

// ─── Business Page ────────────────────────────────────────────────────────────

export default function BusinessPage() {
  const { openInquiry } = useInquiry();

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── 1. Marquee ── */}
      <div className="bg-primary text-vibrant-yellow overflow-hidden pt-[76px] pb-4 border-b-4 border-vibrant-yellow relative z-40 -mt-[76px]">
        <Marquee items={["GLOBAL SUPPLY CHAIN", "RAW AFRICAN ORIGIN", "PRECISION INDIAN MILLING", "SECURE WHOLESALE PACKAGING"]} />
      </div>

      {/* ── 2. Hero — split slide-in ── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-margin-safe py-16 md:py-section-gap w-full overflow-hidden">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center relative"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Left — slides from left */}
          <motion.div
            className="md:col-span-6 relative z-10"
            variants={fadeLeft}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block bg-vibrant-yellow text-primary font-label-caps text-label-caps px-4 py-1 sticker mb-6 uppercase shadow-[2px_2px_0px_0px_#3B28FF]">
              Business Operations
            </span>
            <BlurText 
              text="SCALING QUALITY ACROSS CONTINENTS."
              className="font-display-xl text-[56px] leading-[54px] md:text-headline-lg text-primary uppercase leading-none mb-6"
              delay={0.3}
            />
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-lg">
              We manage the entire lifecycle of the cashew. From deep roots in West Africa to precision processing facilities in India, delivering unmatched quality to wholesale partners worldwide.
            </p>
            <motion.button
              whileHover={{ scale: 1.02, x: 2, y: 2 }} whileTap={{ scale: 0.98 }}
              onClick={openInquiry}
              className="sticker bg-primary text-on-primary font-button-text text-button-text px-8 py-4 hover:bg-electric-blue hover:text-on-primary transition-all duration-200 hard-shadow-yellow inline-flex items-center gap-2 cursor-pointer"
            >
              Partner With Us <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Right — slides from right */}
          <motion.div
            className="md:col-span-6 relative aspect-square md:h-[500px] w-full sticker overflow-hidden hard-shadow mt-12 md:mt-0 bg-secondary-container"
            variants={fadeRight}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuA1c7rGBNLMdGqTYTSQRIe2-t_dc5ZWv1msqw4IBQHVqotZmjO0c26kDpaWDimEthcqbzijBVT_Ap6Zhd8O6PSCQl2h72L7_qN5FMz5bIxYZGJ6FM7ZPLPXX4gE5LnJ2dt1CMVqBjwQkX1PEtxbhMb5BE8HY-YyvPixgeLKvXcWz2OlTZkAHA3_FiE0e7bh_QgnmPLMkHuoeAvB5IhE0R2SgEM2zQbcm5o3t-aKxoY1d1btvptAXuZnv5qTkZMbolD7UJ9oNP0AQ"
              alt="Cashew processing facility"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center mix-blend-multiply opacity-80"
            />
            {/* Framer Motion parallax badge */}
            <motion.div
              className="absolute -right-4 -bottom-4 md:-right-8 md:-bottom-8 w-24 h-24 md:w-32 md:h-32 bg-vibrant-yellow rounded-full flex flex-col items-center justify-center border-4 border-primary shadow-[6px_6px_0px_0px_rgba(59,40,255,1)] z-20 pointer-events-none select-none"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Factory className="w-8 h-8 md:w-12 md:h-12 text-primary" />
              <span className="font-label-caps text-[8px] md:text-[10px] text-primary font-bold mt-1">FACILITY</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── 3. Supply Chain Steps ── */}
      <section className="bg-primary text-on-primary py-section-gap relative overflow-hidden w-full border-t-8 border-vibrant-yellow">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-margin-safe relative z-10 w-full">
          <ScrollSection className="mb-16 max-w-2xl">
            <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="font-label-caps text-label-caps text-vibrant-yellow mb-4 block">
              INFRASTRUCTURE MAP
            </motion.span>
            <BlurText 
              text="Our Vertically Integrated Pipeline"
              className="font-headline-lg text-[44px] leading-tight md:text-headline-lg uppercase text-white mb-6"
              delay={0.1}
            />
            <motion.p variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="font-body-lg text-body-lg text-white/70">
              By owning the sourcing, shipping, and milling operations, we guarantee structural safety, fair labor practices, and flawless product grading.
            </motion.p>
          </ScrollSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            {chainSteps.map((step, i) => (
              <ChainStepCard key={step.num} step={step} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Quality Callout ── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-margin-safe py-section-gap w-full text-center">
        <ScrollSection>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto p-12 bg-canvas-cream border-4 border-primary hard-shadow relative"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-electric-blue text-white font-label-caps text-xs px-4 py-2 border-2 border-primary shadow-[2px_2px_0px_0px_#3B28FF]">
              B2B WHOLESALE SPECIFICATIONS
            </div>
            <BlurText 
              text="Export Standards Verified"
              className="font-headline-lg text-[36px] md:text-[52px] leading-none text-primary uppercase mt-4 mb-6 justify-center"
            />
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8 font-bold">
              We mill and grade in ISO 22000 &amp; HACCP certified facilities, delivering bulk cargo vacuum packed in 25lb / 50lb tins or multi-layer bags.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {["GRADE W180, W240, W320, LWP, SWP", "SGS QUALITY CERTIFIED"].map((spec) => (
                <div key={spec} className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-electric-blue" />
                  <span className="font-label-caps text-sm text-primary">{spec}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </ScrollSection>
      </section>

      {/* ── 5. Parallax CTA Banner ── */}
      <ParallaxCTA onClick={openInquiry} />
    </div>
  );
}
