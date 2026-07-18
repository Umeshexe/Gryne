"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useInquiry } from "@/context/inquiry-context";
import Marquee from "@/components/ui/marquee";
import { Heart, Sprout, Sun, Droplets } from "lucide-react";
import DotField from "@/components/ui/dot-field";

// ─── Variants ─────────────────────────────────────────────────────────────────

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

// ─── Components ───────────────────────────────────────────────────────────────

function PillarCard({ pillar, i }: { pillar: { title: string; desc: string; icon: React.ComponentType<{ className?: string }>; hoverBg: string }; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = pillar.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.12 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`bg-surface border-2 border-primary p-6 shadow-[4px_4px_0px_0px_rgba(59,40,255,0.15)] flex flex-col justify-between transition-all duration-300 cursor-pointer group ${pillar.hoverBg} hover:border-black hover:shadow-[8px_8px_0px_0px_#000000]`}
    >
      <div>
        <div className="w-12 h-12 bg-vibrant-yellow border-2 border-primary flex items-center justify-center font-display-xl text-[20px] text-primary shadow-[2px_2px_0px_0px_#3B28FF] mb-6 group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-headline-md text-[24px] leading-none text-primary uppercase mb-4 group-hover:text-current">{pillar.title}</h3>
        <p className="font-body-md text-body-md text-primary/85 group-hover:text-current">{pillar.desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const pillars = [
  {
    title: "Farmer Empowerment",
    desc: "By establishing direct-buy partnerships, we ensure agricultural families receive up to 35% higher profits than traditional market rates.",
    icon: Heart,
    hoverBg: "hover:bg-vibrant-yellow hover:text-primary",
  },
  {
    title: "Eco-Agricultural Sourcing",
    desc: "Promoting chemical-free fertilization, intercropping methods, and native organic composting to preserve natural soil fertility.",
    icon: Sprout,
    hoverBg: "hover:bg-electric-blue hover:text-white",
  },
  {
    title: "Clean Processing Energy",
    desc: "Our premium sorting and peeling mills in India are transitioning to 100% solar power grids, minimizing processing emissions.",
    icon: Sun,
    hoverBg: "hover:bg-vibrant-yellow hover:text-primary",
  },
  {
    title: "Water Conservation",
    desc: "Enforcing advanced industrial wastewater recycling processes at our main production silos to prevent agricultural pollution.",
    icon: Droplets,
    hoverBg: "hover:bg-electric-blue hover:text-white",
  },
];

const milestones = [
  { metric: "35%", text: "Income Increase for Direct Farm Co-Ops", dark: true },
  { metric: "1,200+", text: "Farmers Certified in Eco-Agriculture", dark: false },
  { metric: "100%", text: "Zero Forced-Intermediary Sourcing Model", dark: true },
  { metric: "450 kW", text: "Solar Generating Capacity Installed", dark: false },
];

function MetricCard({
  metric,
  text,
  dark,
  delay,
}: {
  metric: string;
  text: string;
  dark: boolean;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
      className={`p-8 border-4 border-primary hard-shadow relative overflow-hidden group cursor-pointer ${
        dark ? "bg-electric-blue text-white" : "bg-vibrant-yellow text-primary"
      }`}
    >
      <motion.h3
        className="font-display-xl text-[64px] leading-none"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.15, ease: "easeOut" }}
      >
        {metric}
      </motion.h3>
      <p className={`font-button-text text-button-text mt-4 uppercase ${dark ? "text-vibrant-yellow" : "text-primary"}`}>
        {text}
      </p>
    </motion.div>
  );
}

// ─── CSR Page ─────────────────────────────────────────────────────────────────

export default function CSRPage() {
  const { openInquiry } = useInquiry();

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── 1. Marquee ── */}
      <div className="bg-primary text-vibrant-yellow overflow-hidden py-4 border-b-4 border-vibrant-yellow relative z-40">
        <Marquee items={["SUSTAINABLE INITIATIVES", "ETHICAL CO-OP INVESTMENT", "CARBON RENEWABLE PROCESSING", "DIRECT GROWER ENRICHMENT"]} />
      </div>

      {/* ── 2. Hero — split reveal ── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-margin-safe py-16 md:py-section-gap w-full overflow-hidden">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Left — slides from left */}
          <motion.div
            className="col-span-1 md:col-span-7 z-10"
            variants={fadeLeft}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1 border-2 border-primary bg-vibrant-yellow font-label-caps text-label-caps text-primary mb-6 shadow-[2px_2px_0px_0px_rgba(59,40,255,1)] uppercase">
              Impact Report
            </span>
            {["ROOTED", "IN", "RESPONSIBILITY"].map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.h1
                  className="font-display-xl text-[56px] leading-[54px] md:text-headline-lg text-primary uppercase mb-0 leading-tight block"
                  variants={fadeUp}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-8 mt-6"
            >
              Our commitment extends beyond the harvest. We invest in the land, the communities, and the future of cashew farming across Africa and India.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={openInquiry}
              className="font-button-text text-button-text text-on-primary bg-primary border-2 border-primary px-8 py-4 hover:bg-electric-blue hover:border-electric-blue transition-colors duration-300 shadow-[4px_4px_0px_0px_rgba(24,255,0,1)] cursor-pointer"
            >
              READ OUR MISSION
            </motion.button>
          </motion.div>

          {/* Right — slides from right */}
          <motion.div
            className="col-span-1 md:col-span-5 relative mt-12 md:mt-0"
            variants={fadeRight}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="aspect-[4/5] bg-secondary-container border-4 border-primary overflow-hidden shadow-[8px_8px_0px_0px_rgba(59,40,255,1)] relative z-0 group">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7eVl7ofcZnj6wdzA9SEvo3FBkn2nHqP7EtCY4dD-qzVR3wMKYT5IQ-m2_tcdAIGfmwd84MEFHMBLP7jlSYZ58UrgEfF9oWEnHBHmbmb1hgPGZPNV_ZHLtQh6SpgBB5mEyC0xKRYmZQds7U07WiaEXgZTKkhSgCCPqjsnru9giJlrkCKtYIsuhQF3yqdOnkSuIeWyIvtWnkE8m_QO2OVZjiZ9cqlr7whEA_FYvORLBcVV1TEaLyttiLwbNdmP3zmeHxVhiEoOk5cs"
                alt="Farmer holding cashews"
                fill
                className="object-cover filter brightness-105 group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <div className="absolute bottom-4 left-4 font-label-caps text-[10px] bg-black text-white px-3 py-1 border-2 border-white">
                ORIGIN: WEST AFRICA
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── 3. Sustainability Pillars ── */}
      <section className="bg-primary text-on-primary py-section-gap relative overflow-hidden w-full border-t-8 border-vibrant-yellow">
        {/* Dot-grid texture overlay */}
        <div className="absolute inset-0 opacity-80 pointer-events-none z-0">
          <DotField
            dotRadius={3.0}
            dotSpacing={30}
            bulgeStrength={60}
            glowRadius={220}
            gradientFrom="rgba(255, 255, 255, 0.75)"
            gradientTo="rgba(255, 255, 255, 0.35)"
          />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-margin-safe relative z-10 w-full">
          <ScrollSection className="mb-16 max-w-2xl">
            <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="font-label-caps text-label-caps text-vibrant-yellow mb-4 block">
              ECO RESPONSIBILITY
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="font-headline-lg text-[40px] leading-tight md:text-headline-lg uppercase text-white mb-6">
              Our Core Sustainability Pillars
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="font-body-lg text-body-lg text-white/70">
              We leverage modern infrastructure alongside regenerative practices, creating a balanced pipeline that values organic farmers and climate action.
            </motion.p>
          </ScrollSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            {pillars.map((pillar, i) => (
              <PillarCard key={pillar.title} pillar={pillar} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Metrics — count-up spring animation ── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-margin-safe py-section-gap w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <ScrollSection className="md:col-span-5 flex flex-col justify-center">
            <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="font-label-caps text-label-caps bg-on-background text-background px-4 py-2 inline-block self-start mb-6 shadow-[2px_2px_0px_0px_#3B28FF]">
              VERIFIED IMPACT
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="font-headline-lg text-[40px] leading-tight md:text-headline-lg text-primary uppercase mb-6">
              Trackable Social Milestones.
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
              We monitor social outcomes with absolute precision, reporting transparent indicators to our wholesale and enterprise procurement partners.
            </motion.p>
          </ScrollSection>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {milestones.map((item, idx) => (
              <MetricCard key={item.metric} metric={item.metric} text={item.text} dark={item.dark} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA ── */}
      <section className="bg-canvas-cream text-primary py-16 px-6 text-center border-t-4 border-primary w-full">
        <ScrollSection className="max-w-[1440px] mx-auto">
          <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="font-label-caps text-label-caps bg-black text-white px-4 py-2 inline-block mb-6 sticker hard-shadow">
            PROACTIVE INVESTMENT
          </motion.span>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="font-display-xl text-[44px] md:text-[64px] leading-none uppercase tracking-tighter mb-6">
            SECURE ETHICAL SUPPLY
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8 font-bold">
            Integrate transparent, direct-sourced cashews into your raw ingredient inventory and achieve your corporate environmental &amp; social development targets.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.3 }}>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={openInquiry}
              className="sticker bg-primary text-on-primary font-button-text text-button-text px-10 py-5 hover:bg-electric-blue hover:text-white transition-all duration-300 hard-shadow-yellow text-xl cursor-pointer"
            >
              REQUEST ESG REPORT SHEET
            </motion.button>
          </motion.div>
        </ScrollSection>
      </section>
    </div>
  );
}
