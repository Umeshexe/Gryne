"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useInquiry } from "@/context/inquiry-context";
import Marquee from "@/components/ui/marquee";
import { CashewScene } from "@/components/3d/cashew-scene";
import { ArrowRight, Globe, ShieldCheck, Tractor, Ship } from "lucide-react";

// ─── Reusable animation variants ─────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const wordReveal = {
  hidden: { opacity: 0, y: 30, rotateX: -60 },
  visible: { opacity: 1, y: 0, rotateX: 0 },
};

// ─── AnimatedSection wrapper ──────────────────────────────────────────────────

function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero Title — staggered word reveal ──────────────────────────────────────

function HeroTitle() {
  const words = ["BOLD", "BY", "NATURE"];

  return (
    <motion.h1
      className="font-display-xl text-[64px] leading-[60px] md:text-[140px] md:leading-[125px] text-primary tracking-tighter uppercase select-none"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      style={{ perspective: 800 }}
    >
      {words.map((word, i) => (
        <React.Fragment key={word}>
          <span className="block overflow-hidden">
            <motion.span
              className={`block ${i === 1 ? "text-white" : ""}`}
              style={i === 1 ? { textShadow: "4px 4px 0px #00261a" } : undefined}
              variants={wordReveal}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {word}
            </motion.span>
          </span>
        </React.Fragment>
      ))}
    </motion.h1>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  icon: Icon,
  bg,
  textColor,
  labelColor,
  delay = 0,
}: {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  bg: string;
  textColor: string;
  labelColor: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className={`${bg} p-8 border-4 border-primary hard-shadow relative overflow-hidden`}
    >
      <Icon className={`${textColor} w-24 h-24 opacity-10 absolute -top-4 -right-4`} />
      <h3 className={`font-display-xl text-[72px] leading-none ${textColor}`}>{value}</h3>
      <p className={`font-button-text text-button-text ${labelColor} mt-4 uppercase`}>{label}</p>
    </motion.div>
  );
}

// ─── Scroll-linked Ship ────────────────────────────────────────────────────────

function OceanJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const shipX = useTransform(scrollYProgress, [0.1, 0.9], ["-5%", "90%"]);
  const shipOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="py-section-gap bg-primary relative overflow-hidden text-white border-y-8 border-vibrant-yellow w-full"
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-gutter relative z-20">
        <AnimatedSection className="text-center mb-24">
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="font-headline-lg text-[44px] leading-tight md:text-headline-lg text-vibrant-yellow uppercase"
          >
            The Ocean Journey
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-body-lg text-body-lg text-surface-container-high mt-4 max-w-2xl mx-auto"
          >
            Sailing the direct shipping lanes from West African farm hubs to precision processing mills in India.
          </motion.p>
        </AnimatedSection>

        <div className="relative h-[250px] md:h-[300px] flex items-center border-y-4 border-electric-blue py-12">
          <div className="absolute left-4 md:left-gutter top-1/2 -translate-y-1/2 font-headline-md text-[24px] md:text-headline-md text-electric-blue tracking-widest">
            AFRICA
          </div>
          <div className="absolute right-4 md:right-gutter top-1/2 -translate-y-1/2 font-headline-md text-[24px] md:text-headline-md text-surface-tint tracking-widest">
            INDIA
          </div>

          <motion.div
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: shipX, opacity: shipOpacity }}
          >
            <div className="relative flex flex-col items-center">
              <Ship className="w-20 h-20 md:w-32 md:h-32 text-vibrant-yellow filter drop-shadow-[4px_4px_0px_#000]" />
              <div className="absolute -top-4 font-label-caps text-[10px] bg-black text-white px-2 py-1 sticker whitespace-nowrap shadow-[2px_2px_0px_0px_#2E5BFF]">
                RAW CARGO
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { openInquiry } = useInquiry();

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── 1. Hero Section with 3D Canvas ── */}
      <header className="relative min-h-screen flex items-center justify-center pt-24 pb-section-gap overflow-hidden bg-vibrant-yellow">
        {/* Three.js Canvas — pointer-events-none: mouse tracked globally via window listener */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CashewScene />
        </div>

        {/* Floating label badges */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="absolute top-[20%] left-[10%] w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-full flex items-center justify-center mix-blend-multiply opacity-80"
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-label-caps text-xs text-primary/70 bg-canvas-cream px-2 py-1 sticker shadow-[2px_2px_0px_0px_#00261a]">
              RAW SEED
            </span>
          </motion.div>

          <motion.div
            className="absolute top-[40%] right-[12%] w-28 h-28 md:w-36 md:h-36 bg-tertiary/10 rounded-full flex items-center justify-center mix-blend-multiply opacity-90"
            animate={{ y: [0, -18, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <span className="font-label-caps text-xs text-primary bg-white px-2 py-1 sticker shadow-[2px_2px_0px_0px_#00261a]">
              W240 JUMBO
            </span>
          </motion.div>

          <motion.div
            className="absolute bottom-[20%] left-[20%] w-20 h-20 md:w-24 md:h-24 bg-electric-blue/10 rounded-full flex items-center justify-center mix-blend-multiply opacity-70"
            animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          >
            <span className="font-label-caps text-[10px] text-white bg-black px-2 py-1 sticker shadow-[2px_2px_0px_0px_#2E5BFF]">
              WEST AFRICA
            </span>
          </motion.div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-6 md:px-gutter max-w-4xl">
          <motion.div
            className="font-label-caps text-label-caps bg-primary text-vibrant-yellow px-4 py-2 inline-block mb-8 sticker hard-shadow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            AFRICA TO INDIA &bull; RAW TO ROASTED
          </motion.div>

          <HeroTitle />

          <motion.p
            className="font-body-lg text-body-lg text-primary mt-8 max-w-2xl mx-auto font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Premium grade cashews sourced with aggressive integrity. We control
            the entire supply chain from the lush soils of West Africa to precision sorting tables in India.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/business"
                className="w-full sm:w-auto block text-center font-button-text text-button-text bg-electric-blue text-white px-8 py-4 border-2 border-primary hover:bg-primary transition-all duration-300 hard-shadow-yellow text-xl cursor-pointer"
              >
                EXPLORE THE CHAIN
              </Link>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={openInquiry}
              className="w-full sm:w-auto text-center font-button-text text-button-text bg-primary text-on-primary px-8 py-4 border-2 border-primary hover:bg-vibrant-yellow hover:text-primary transition-all duration-300 hard-shadow text-xl cursor-pointer"
            >
              WHOLESALE INQUIRY
            </motion.button>
          </motion.div>
        </div>
      </header>

      {/* ── 2. Marquee ── */}
      <Marquee items={["PREMIUM GRADE", "FRESH FROM ORIGIN", "UNCOMPROMISING QUALITY", "DIRECT SUPPLY"]} />

      {/* ── 3. Stats Section ── */}
      <section className="py-section-gap px-6 md:px-gutter max-w-[1440px] mx-auto bg-background w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <AnimatedSection className="md:col-span-5 flex flex-col justify-center">
            <motion.div
              variants={fadeLeft}
              transition={{ duration: 0.5 }}
              className="font-label-caps text-label-caps bg-black text-white px-4 py-2 inline-block self-start mb-6 sticker hard-shadow"
            >
              THE SCALE
            </motion.div>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-headline-lg text-[44px] leading-tight md:text-headline-lg text-primary uppercase mb-6"
            >
              Massive Impact.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-md"
            >
              We don&apos;t just move nuts; we move global B2B markets. Our direct
              infrastructure is engineered for volume without sacrificing raw quality.
            </motion.p>
          </AnimatedSection>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <StatCard value="50+" label="Global Partners" icon={Globe} bg="bg-electric-blue" textColor="text-white" labelColor="text-vibrant-yellow" delay={0.1} />
            <StatCard value="10K" label="Tons Shipped Annually" icon={Tractor} bg="bg-surface-tint" textColor="text-white" labelColor="text-secondary-container" delay={0.2} />
            <StatCard value="100%" label="Direct Source Traceability" icon={ShieldCheck} bg="bg-vibrant-yellow" textColor="text-primary" labelColor="text-primary" delay={0.3} />
          </div>
        </div>
      </section>

      {/* ── 4. Scroll-Linked Ocean Journey ── */}
      <OceanJourney />

      {/* ── 5. CTA ── */}
      <section className="py-section-gap px-6 md:px-gutter max-w-[1440px] mx-auto w-full text-center">
        <AnimatedSection>
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="font-label-caps text-label-caps bg-black text-vibrant-yellow px-4 py-2 inline-block mb-6 sticker hard-shadow"
          >
            GLOBAL SUPPLY SYNDICATE
          </motion.span>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-headline-lg text-[44px] leading-tight md:text-headline-lg text-primary uppercase max-w-4xl mx-auto mb-8"
          >
            Secure Premium Grade Cashews for Your Wholesale Operations.
          </motion.h2>
          <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
            <motion.button
              whileHover={{ scale: 1.02, x: 2, y: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={openInquiry}
              className="font-button-text text-button-text bg-electric-blue text-white px-10 py-5 border-2 border-primary hover:bg-primary transition-all duration-300 hard-shadow-yellow text-2xl inline-flex items-center gap-3 cursor-pointer"
            >
              INITIATE WHOLESALE INQUIRY <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </AnimatedSection>
      </section>
    </div>
  );
}
