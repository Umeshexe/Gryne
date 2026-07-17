"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowRight, CheckCircle, Award, HeartHandshake, ShieldCheck } from "lucide-react";
import Marquee from "@/components/ui/marquee";
import TiltCard from "@/components/ui/tilt-card";

// ─── Animation Variants ───────────────────────────────────────────────────────

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

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

function ScrollSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
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
    >
      {children}
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const timeline = [
  {
    num: "1",
    title: "The Source",
    desc: "We begin at the roots, partnering directly with farmers across diverse African terrains to secure the rawest, most potent harvest.",
  },
  {
    num: "2",
    title: "The Transit",
    desc: "Navigating global waters, we maintain stringent control over our raw material, ensuring stability and preserving natural vitality during the voyage.",
  },
  {
    num: "3",
    title: "The Craft",
    desc: "In state-of-the-art facilities in India, raw potential is meticulously shelled, sorted, and graded by experts holding decades of knowledge.",
  },
  {
    num: "4",
    title: "The World",
    desc: "Delivering flawless, premium kernels to discerning wholesale buyers and global brands who demand nothing but the absolute best.",
  },
];

const team = [
  {
    name: "Marcus Thorne",
    role: "Global Sourcing Director",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClXjEJcjhMwURVXm0LKq5vVhZbffeZhDzT3xpKstK5UixjfAkIXiSHEhRlQARMlW4KLiofcbmVMiD2i1rXuxmAS_0wB3wZ6k2zhEYgBsbVxQsnM2jiF2aA_HDpwkftHYiLetOQMzhQSsYv4iqGJev0dXryh8yc8XovL4jFX-2g-hL5apXBsjUssFxOWUEELRH6oAKKrTOQt4Un_zJ75OPd5aGa3IH2Ze34gGfRKJgy8qlw_qN7VPnpNY9flPCDN5m1Ap2mnaRRiBw",
    color: "border-vibrant-yellow",
    overlay: "bg-vibrant-yellow text-primary",
  },
  {
    name: "Elena Rostova",
    role: "Head of Operations",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYx2bhwJ73wYWyb85JFY9N_glkI7-rBRB0XOPMM4K0WyfIphubvC39974rSh1-pGF5Tgv5uyGryMk7lB1-5yRfFpACEWGP-4xm_vp9pLqA48CVjMecf88JNd5E9Hmanv7UADh_WMG7mq-A2q2TJKGcGEyoZygd1HAtqSo3V1hE6Uldt29I9HTLdIK7DeDBlHA-j7nUMfedW2-U7QUWpnWtsiIvH0meLGk2ukhJ6JtpuEIT7Nyq2nQd2bJyswAKsmAdzKwZwlu5pFA",
    color: "border-electric-blue",
    overlay: "bg-electric-blue text-white",
  },
  {
    name: "David Chen",
    role: "Chief Quality Officer",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkJFjhFwGLkZ2xnSQPvZlPP4l6MKiIqLDg2RzVqdjaw1l5XiYY2RFSNdoLhBobTTymazVqbgMQfv3F6hqK-REIcu2pAImcuOj6lb3Fmi5gRpx_QrqxC65jCe2nZEpwf59_uzZGTthWVrBKMtue7pPrcBUflHPRLwFeD0MabQCmuVMPQfcQL9VJyejWa3QBhDtGkt5_nGrhWJksstcC-la_xRAJRh91FjPeunDpgXICPEGQN0W0XQ01M58YOiGvsvtnhFYPi6q-Ap4",
    color: "border-vibrant-yellow",
    overlay: "bg-vibrant-yellow text-primary",
  },
];

const accreditations = [
  { title: "ISO 22000", desc: "Food Safety Management", icon: CheckCircle, hoverBg: "hover:bg-accent hover:border-accent", hoverIcon: "group-hover:text-on-accent", hoverText: "group-hover:text-on-accent", hoverSub: "group-hover:text-on-accent/80" },
  { title: "HACCP", desc: "Hazard Analysis & Critical Control", icon: ShieldCheck, hoverBg: "hover:bg-primary hover:border-primary", hoverIcon: "group-hover:text-white", hoverText: "group-hover:text-white", hoverSub: "group-hover:text-white/80" },
  { title: "BRCGS", desc: "Global Food Safety Standard", icon: Award, hoverBg: "hover:bg-accent hover:border-accent", hoverIcon: "group-hover:text-on-accent", hoverText: "group-hover:text-on-accent", hoverSub: "group-hover:text-on-accent/80" },
  { title: "Fair Trade", desc: "Ethical & Fair Farm Compensation", icon: HeartHandshake, hoverBg: "hover:bg-primary hover:border-primary", hoverIcon: "group-hover:text-white", hoverText: "group-hover:text-white", hoverSub: "group-hover:text-white/80" },
];

// ─── Extracted Components for Map Iteration ───────────────────────────────────

function TimelineCard({ step, i }: { step: { num: string; title: string; desc: string }; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-surface p-6 border-2 border-primary shadow-[4px_4px_0px_0px_#3B28FF] flex flex-col justify-between"
    >
      <div>
        <div className="w-10 h-10 bg-vibrant-yellow border-2 border-primary rounded-full flex items-center justify-center font-headline-md text-[20px] text-primary mb-6 md:-mt-10 shadow-[2px_2px_0px_0px_#3B28FF]">
          {step.num}
        </div>
        <h3 className="font-headline-md text-[24px] leading-none text-primary uppercase mb-3">
          {step.title}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

function TeamCard({ member, index }: { member: { name: string; role: string; img: string; color: string; overlay: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`group cursor-pointer ${index === 1 ? "md:translate-y-12" : ""}`}
    >
      <div className={`w-full aspect-[3/4] bg-surface border-2 ${member.color} mb-6 relative overflow-hidden`}>
        <Image
          src={member.img}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <motion.div
          className={`absolute bottom-0 left-0 w-full ${member.overlay} p-4 border-t-2 border-primary flex justify-between items-center`}
          initial={{ y: "100%" }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <span className="font-button-text text-button-text">CONNECT DIRECTLY</span>
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </div>
      <h3 className="font-headline-md text-[30px] leading-none uppercase text-white mb-1 group-hover:text-vibrant-yellow transition-colors">
        {member.name}
      </h3>
      <p className="font-label-caps text-label-caps text-electric-blue text-xs">
        {member.role}
      </p>
    </motion.div>
  );
}

function AccreditationCard({ item, i }: { item: { title: string; desc: string; icon: React.ComponentType<{ className?: string }>; hoverBg: string; hoverIcon: string; hoverText: string; hoverSub: string }; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = item.icon;
  return (
    <TiltCard className="h-full">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        className={`flex flex-col items-center justify-center p-8 bg-surface border-2 border-primary shadow-[4px_4px_0px_0px_#3B28FF] transition-all duration-300 group cursor-pointer h-full ${item.hoverBg}`}
      >
        <Icon className={`w-16 h-16 text-primary ${item.hoverIcon} group-hover:scale-110 transition-all duration-300 mb-4`} />
        <h4 className={`font-headline-md text-[24px] text-primary ${item.hoverText} uppercase text-center transition-colors duration-300`}>{item.title}</h4>
        <p className={`font-label-caps text-label-caps text-primary/70 ${item.hoverSub} mt-2 text-center text-xs transition-colors duration-300`}>{item.desc}</p>
      </motion.div>
    </TiltCard>
  );
}

// ─── Animated Timeline Connector ──────────────────────────────────────────────

function TimelineConnector() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="absolute top-[28px] left-0 w-full h-[4px] bg-primary/20 z-0 hidden md:block overflow-hidden">
      <motion.div
        className="h-full bg-primary origin-left"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
      />
    </div>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ── 1. Hero ── */}
      <section className="relative min-h-[750px] flex items-center px-6 md:px-margin-safe max-w-[1440px] mx-auto overflow-hidden w-full">
        <div className="absolute right-[-5%] top-[10%] w-64 h-64 bg-secondary-container rounded-full opacity-50 blur-3xl animate-pulse" />
        <div className="absolute left-[10%] bottom-[20%] w-48 h-48 bg-surface-alt rounded-full opacity-50 blur-3xl animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter w-full relative z-10 items-center">
          <motion.div
            className="col-span-1 md:col-span-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="inline-block font-label-caps text-label-caps bg-primary text-on-primary px-3 py-1 border-2 border-primary mb-6 shadow-[2px_2px_0px_0px_#18FF00]"
            >
              OUR ORIGINS
            </motion.div>

            {/* Staggered line-by-line hero title */}
            {["BOLD", "BY", "NATURE."].map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.h1
                  className="font-display-xl text-[60px] leading-[55px] md:text-[120px] md:leading-[105px] text-primary uppercase block"
                  variants={fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl border-l-4 border-primary pl-6 py-2 bg-secondary-container mt-8"
            >
              We don&apos;t just source cashews. We trace the lineage of flavour from the vibrant red soils
              of Africa to the meticulous sorting tables of India. Gryne is a global journey of premium taste.
            </motion.p>
          </motion.div>
        </div>

        {/* Portrait image sliding in from right */}
        <motion.div
          className="hidden lg:block absolute right-margin-safe bottom-24 w-[380px] h-[480px] border-4 border-primary shadow-[8px_8px_0px_0px_#3B28FF] overflow-hidden z-20 group"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA0QzyHvwRE3lk4qZREnjTGywVrGhNJkr4S4vtYH8hCJCWytPhJdjqi9Q8cjbKXnH8IALGegW4y0yOpXmRMZR1pMfkMMu6rE9Gwy1_9fe-8kThpDhKRMjtgnByu6UbaGb7dgSEQlBxYnh2oDkiCYIpAKrKB3DkqYwHDHv8oSwQ5MQkn6CM3w6FAxfSHGa73MAhAhVefxyAnBgohKnb384tms-llGR7VeUIA-W8fZVPu9Ecd2-rUQBmGYQ0kItnC1DcVMJ0rp0LnBA"
            alt="Cashew origin branch"
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-125"
          />
          <div className="absolute bottom-4 left-4 font-label-caps text-label-caps bg-black text-white px-3 py-1 border-2 border-white text-xs">
            ORIGIN: WEST AFRICA
          </div>
        </motion.div>
      </section>

      {/* ── 2. Marquee ── */}
      <Marquee items={["RAW & UNFILTERED", "GLOBAL SUPPLY CHAIN", "PREMIUM GRADE A", "UNCOMPROMISING ETHICS"]} />

      {/* ── 3. Timeline ── */}
      <section className="px-6 md:px-margin-safe max-w-[1440px] mx-auto mb-section-gap py-12 w-full">
        <ScrollSection className="mb-16">
          <motion.span
            variants={fadeLeft}
            transition={{ duration: 0.5 }}
            className="font-label-caps text-label-caps bg-on-background text-background px-3 py-1 border-2 border-on-background shadow-[2px_2px_0px_0px_#3B28FF] mb-4 inline-block"
          >
            OPERATION STEPS
          </motion.span>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-headline-lg text-[44px] leading-tight md:text-headline-lg text-primary uppercase"
          >
            The Sourcing Timeline
          </motion.h2>
        </ScrollSection>

        <div className="relative">
          <TimelineConnector />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter relative z-10">
            {timeline.map((step, i) => (
              <TimelineCard key={step.num} step={step} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Team ── */}
      <section className="bg-primary text-on-primary py-section-gap relative overflow-hidden mb-section-gap w-full">
        <div className="absolute -top-10 left-[-5%] font-display-xl text-[140px] md:text-[200px] text-secondary opacity-10 whitespace-nowrap select-none pointer-events-none">
          THE CORE THE CORE
        </div>

        <div className="px-6 md:px-margin-safe max-w-[1440px] mx-auto relative z-10 w-full">
          <ScrollSection className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="font-label-caps text-label-caps text-vibrant-yellow mb-4">
                LEADERSHIP
              </motion.div>
              <motion.h2 variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="font-headline-lg text-[44px] leading-tight md:text-headline-lg uppercase">
                The Architects
                <br />of Gryne.
              </motion.h2>
            </div>
            <motion.p variants={fadeRight} transition={{ duration: 0.5, delay: 0.2 }} className="font-body-lg text-body-lg max-w-md text-white/70 font-semibold">
              A syndicate of supply chain veterans, agricultural specialists, and market managers united by one obsession: uncompromising quality.
            </motion.p>
          </ScrollSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {team.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Accreditations ── */}
      <section id="accreditations" className="px-6 md:px-margin-safe max-w-[1440px] mx-auto mb-section-gap py-12 w-full">
        <ScrollSection className="text-center mb-16">
          <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="font-label-caps text-label-caps bg-on-background text-background px-3 py-1 border-2 border-on-background shadow-[2px_2px_0px_0px_#3B28FF] mb-4 inline-block">
            VERIFICATION
          </motion.span>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="font-headline-lg text-[44px] leading-tight md:text-headline-lg text-primary uppercase mb-4">
            Uncompromised Standards
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            We don&apos;t just meet industry benchmarks; we define them.
          </motion.p>
        </ScrollSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {accreditations.map((item, i) => (
            <AccreditationCard key={item.title} item={item} i={i} />
          ))}
        </div>
      </section>

      {/* ── 6. Brands We Supply ── */}
      <section className="bg-vibrant-yellow border-t-4 border-b-4 border-primary w-full py-section-gap overflow-hidden">
        <div className="px-6 md:px-margin-safe max-w-[1440px] mx-auto w-full mb-16">
          <ScrollSection className="text-center">
            <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="font-label-caps text-label-caps bg-primary text-on-primary px-3 py-1 border-2 border-primary shadow-[2px_2px_0px_0px_#3B28FF] mb-4 inline-block">
              OUR CLIENTS
            </motion.span>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="font-headline-lg text-[44px] leading-tight md:text-headline-lg text-primary uppercase mb-4">
              Brands We Supply
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="font-body-lg text-body-lg text-primary/80 max-w-2xl mx-auto">
              Trusted by premium snack brands, confectionery houses, and food manufacturers across 24 countries.
            </motion.p>
          </ScrollSection>
        </div>

        {/* Dual-row infinite marquee */}
        <div className="flex flex-col gap-6 select-none">
          <div className="flex overflow-hidden">
            <div className="flex gap-6 animate-marquee whitespace-nowrap">
              {[...Array(2)].flatMap((_, ri) =>
                ["NOURISH CO.", "ALPINE NUTS", "TERRA EATS", "PEAK HARVEST", "SAVEUR FINE FOODS", "GROVE SUPPLY", "BULK & BEYOND", "PREMIER PANTRY"].map(
                  (brand) => (
                    <div key={`${brand}-${ri}`} className="flex-shrink-0 bg-primary text-vibrant-yellow border-2 border-primary px-8 py-4 font-headline-md text-[24px] uppercase shadow-[4px_4px_0px_0px_rgba(59,40,255,0.3)]">
                      {brand}
                    </div>
                  )
                )
              )}
            </div>
          </div>
          <div className="flex overflow-hidden">
            <div className="flex gap-6 whitespace-nowrap" style={{ animation: "marquee 28s linear infinite reverse" }}>
              {[...Array(2)].flatMap((_, ri) =>
                ["EPOCH FOODS", "GOLDEN KERNEL", "COAST & CORE", "VITANOVA", "HARVEST UNION", "TRUE TASTE", "ORIGIN PURE", "WILD ORCHARD"].map(
                  (brand) => (
                    <div key={`${brand}-${ri}`} className="flex-shrink-0 bg-surface text-primary border-2 border-primary px-8 py-4 font-headline-md text-[24px] uppercase shadow-[4px_4px_0px_0px_rgba(59,40,255,0.3)]">
                      {brand}
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </div>

        <div className="px-6 md:px-margin-safe max-w-[1440px] mx-auto w-full mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[
              { num: "24+", label: "Export Countries" },
              { num: "140+", label: "Active B2B Clients" },
              { num: "12,000+", label: "Tonnes Shipped in 2024" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-primary text-on-primary border-2 border-primary p-8 text-center shadow-[6px_6px_0px_0px_rgba(59,40,255,0.3)]"
              >
                <p className="font-display-xl text-[64px] leading-none text-vibrant-yellow mb-2">{stat.num}</p>
                <p className="font-label-caps text-label-caps text-on-primary/70 text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
