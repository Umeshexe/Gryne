"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useInquiry } from "@/context/inquiry-context";
import Marquee from "@/components/ui/marquee";
import { CashewScene } from "@/components/3d/cashew-scene";
import { ArrowRight, Globe, ShieldCheck, Tractor, Ship } from "lucide-react";
import BlurText from "@/components/ui/blur-text";
import DotField from "@/components/ui/dot-field";

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
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0 },
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
      className="font-display-xl text-[64px] leading-[60px] md:text-[140px] md:leading-[125px] text-white tracking-tighter uppercase select-none"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      style={{ willChange: "transform" }}
    >
      {words.map((word, i) => (
        <React.Fragment key={word}>
          <span className="block overflow-hidden">
            <motion.span
              className={`block ${i === 1 ? "text-accent" : "text-white"}`}
              style={i === 1 ? { textShadow: "2px 2px 0px rgba(0,0,0,0.3)", willChange: "transform" } : { willChange: "transform" }}
              variants={wordReveal}
              transition={{
                duration: 0.65,
                delay: 0.35 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
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
      whileHover={{ 
        x: -6, 
        y: -6, 
        boxShadow: "10px 10px 0px 0px #18FF00",
        transition: { duration: 0.15, ease: "easeOut" }
      }}
      style={{
        boxShadow: "5px 5px 0px 0px #1A1430",
      }}
      className={`${bg} p-8 border-4 border-on-background relative overflow-hidden transition-all duration-150`}
    >
      <Icon className={`${textColor} w-8 h-8 md:w-10 md:h-10 opacity-70 absolute top-6 right-6`} />
      <h3 className={`font-display-xl text-[72px] leading-none ${textColor}`}>{value}</h3>
      <p className={`font-button-text text-button-text ${labelColor} mt-4 uppercase`}>{label}</p>
    </motion.div>
  );
}

// ─── Scroll-linked Ship + Animated Ocean Journey ──────────────────────────────

function OceanJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Ship travels left → right as you scroll through the section
  const shipX = useTransform(scrollYProgress, [0.1, 0.9], ["-2%", "88%"]);
  const shipOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);

  // AFRICA: full brightness when ship is near, fades as ship sails away
  const africaOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.55, 0.75], [0, 1, 0.9, 0.2]);
  const africaScale = useTransform(scrollYProgress, [0.05, 0.15, 0.55, 0.75], [0.85, 1, 0.95, 0.85]);

  // INDIA: dim when ship is far, brightens as ship approaches
  const indiaOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.75, 0.9], [0.15, 0.4, 1, 1]);
  const indiaScale = useTransform(scrollYProgress, [0.2, 0.45, 0.75, 0.9], [0.85, 0.9, 1, 1.05]);

  // Ship subtle vertical bob
  const shipY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, -8, 0]);

  // Wake trail width grows as ship moves
  const wakeWidth = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "60%"]);
  const wakeOpacity = useTransform(scrollYProgress, [0.08, 0.15, 0.85, 0.92], [0, 0.6, 0.6, 0]);

  return (
    <section
      ref={sectionRef}
      className="py-section-gap bg-primary relative overflow-hidden text-white border-y-8 border-accent w-full"
    >
      {/* Dot-grid texture overlay */}
      <div className="absolute inset-0 opacity-80 pointer-events-none z-0">
        <DotField
          dotRadius={3.0}
          dotSpacing={30}
          bulgeStrength={60}
          glowRadius={220}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(255, 255, 255, 0.75)"
          gradientTo="rgba(255, 255, 255, 0.35)"
          glowColor="rgba(24, 255, 0, 0.2)"
        />
      </div>

      {/* Radial glow at center for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(24,255,0,0.06),transparent)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-gutter relative z-20">
        <AnimatedSection className="text-center mb-24">
          <BlurText 
            text="THE OCEAN JOURNEY"
            className="font-headline-lg text-[44px] leading-tight md:text-headline-lg text-accent uppercase justify-center"
          />
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-body-lg text-body-lg text-white/80 mt-4 max-w-2xl mx-auto"
          >
            Sailing the direct shipping lanes from West African farm hubs to precision processing mills in India.
          </motion.p>
        </AnimatedSection>

        <div className="relative h-[280px] md:h-[320px] flex items-center py-12">
          {/* Animated dashed sea-lane */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none">
            <div className="w-full border-t-2 border-dashed border-white/20" />
          </div>

          {/* Wake trail — grows behind the ship */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 left-0 h-[3px] rounded-full"
            style={{
              width: wakeWidth,
              opacity: wakeOpacity,
              background: "linear-gradient(90deg, rgba(24,255,0,0.1) 0%, rgba(24,255,0,0.5) 100%)",
            }}
          />

          {/* Top/bottom lane borders */}
          <div className="absolute top-0 left-0 right-0 border-t-2 border-white/20" />
          <div className="absolute bottom-0 left-0 right-0 border-b-2 border-white/20" />

          {/* AFRICA — fades as ship leaves */}
          <motion.div
            className="absolute left-4 md:left-gutter top-1/2 -translate-y-1/2 select-none"
            style={{ opacity: africaOpacity, scale: africaScale }}
          >
            <p className="font-headline-md text-[22px] md:text-headline-md text-white tracking-[0.15em] uppercase leading-none">
              AFRICA
            </p>
            <p className="font-label-caps text-[10px] text-accent/80 tracking-widest mt-1">WEST COAST</p>
          </motion.div>

          {/* INDIA — brightens as ship arrives */}
          <motion.div
            className="absolute right-4 md:right-gutter top-1/2 -translate-y-1/2 text-right select-none"
            style={{ opacity: indiaOpacity, scale: indiaScale }}
          >
            <p className="font-headline-md text-[22px] md:text-headline-md text-white tracking-[0.15em] uppercase leading-none">
              INDIA
            </p>
            <p className="font-label-caps text-[10px] text-accent/80 tracking-widest mt-1">VIZAG PORT</p>
          </motion.div>

          {/* Ship */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 z-10"
            style={{ left: shipX, opacity: shipOpacity, y: shipY }}
          >
            <div className="relative flex flex-col items-center">
              {/* Glow ring behind ship */}
              <div className="absolute inset-0 -m-4 rounded-full bg-accent/10 blur-xl" />
              <Ship className="w-16 h-16 md:w-28 md:h-28 text-accent relative z-10 drop-shadow-[0_0_12px_rgba(24,255,0,0.6)]" />
              <div className="absolute -top-6 font-label-caps text-[9px] bg-white text-primary px-2 py-1 border border-primary whitespace-nowrap shadow-[2px_2px_0px_0px_#3B28FF]">
                RAW CARGO
              </div>
            </div>
          </motion.div>
        </div>

        {/* Journey stats row */}
        <div className="grid grid-cols-3 gap-4 mt-12 max-w-xl mx-auto">
          {[
            { label: "SEA ROUTE", value: "~7,500 km" },
            { label: "TRANSIT", value: "18–22 days" },
            { label: "CARGO TYPE", value: "Raw RCN" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center border border-white/20 p-3 backdrop-blur-sm bg-white/5"
            >
              <p className="font-label-caps text-[10px] text-accent/80 mb-1">{stat.label}</p>
              <p className="font-headline-md text-[18px] text-white">{stat.value}</p>
            </motion.div>
          ))}
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
      <header className="relative min-h-screen flex items-center justify-center pt-32 pb-section-gap overflow-hidden bg-primary -mt-[76px]">
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
            <span className="font-label-caps text-xs text-primary/70 bg-canvas-cream px-2 py-1 sticker shadow-[2px_2px_0px_0px_#3B28FF]">
              RAW SEED
            </span>
          </motion.div>

          <motion.div
            className="absolute top-[40%] right-[12%] w-28 h-28 md:w-36 md:h-36 bg-tertiary/10 rounded-full flex items-center justify-center mix-blend-multiply opacity-90"
            animate={{ y: [0, -18, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <span className="font-label-caps text-xs text-primary bg-white px-2 py-1 sticker shadow-[2px_2px_0px_0px_#3B28FF]">
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
            className="font-label-caps text-label-caps bg-white/20 text-white border-2 border-white/50 px-4 py-2 inline-block mb-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            AFRICA TO INDIA &bull; RAW TO ROASTED
          </motion.div>

          <HeroTitle />

          <motion.p
            className="font-body-lg text-body-lg text-white/90 mt-8 max-w-2xl mx-auto font-bold"
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
                className="block text-center font-button-text text-button-text bg-accent text-on-accent px-8 py-4 border-2 border-accent hover:bg-white hover:text-primary transition-all duration-300 shadow-[4px_4px_0px_0px_#ffffff] text-xl"
              >
                EXPLORE THE CHAIN
              </Link>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={openInquiry}
              className="text-center font-button-text text-button-text bg-white/10 text-white px-8 py-4 border-2 border-white hover:bg-white hover:text-primary transition-all duration-300 shadow-[4px_4px_0px_0px_#18FF00] text-xl"
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
              className="font-label-caps text-label-caps bg-accent text-on-accent px-4 py-2 inline-block self-start mb-6 shadow-[2px_2px_0px_0px_#3B28FF]"
            >
              THE SCALE
            </motion.div>
            <BlurText 
              text="MASSIVE IMPACT."
              className="font-headline-lg text-[44px] leading-tight md:text-headline-lg text-on-background uppercase mb-6"
              delay={0.1}
            />
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
            <StatCard value="10+" label="Global Partners" icon={Globe} bg="bg-primary" textColor="text-vibrant-yellow" labelColor="text-white/80" delay={0.1} />
            <StatCard value="7K" label="Tons Shipped Annually" icon={Tractor} bg="bg-primary" textColor="text-vibrant-yellow" labelColor="text-white/80" delay={0.2} />
            <StatCard value="100%" label="Direct Source Traceability" icon={ShieldCheck} bg="bg-primary" textColor="text-vibrant-yellow" labelColor="text-white/80" delay={0.3} />
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
            className="font-label-caps text-label-caps bg-accent text-on-accent px-4 py-2 inline-block mb-6 shadow-[2px_2px_0px_0px_#3B28FF]"
          >
            GLOBAL SUPPLY SYNDICATE
          </motion.span>
          <BlurText 
            text="Secure Premium Grade Cashews for Your Wholesale Operations."
            className="font-headline-lg text-[44px] leading-tight md:text-headline-lg text-on-background uppercase max-w-4xl mx-auto mb-8 justify-center"
            delay={0.1}
          />
          <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openInquiry}
              className="font-button-text text-button-text bg-primary text-on-primary px-10 py-5 border-2 border-primary hover:bg-accent hover:text-on-accent hover:border-accent transition-all duration-300 hard-shadow-accent text-2xl inline-flex items-center gap-3"
            >
              INITIATE WHOLESALE INQUIRY <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </AnimatedSection>
      </section>
    </div>
  );
}
