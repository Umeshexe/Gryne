"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle, Award, Compass, HeartHandshake, ShieldCheck, Heart } from "lucide-react";
import Marquee from "@/components/ui/marquee";

export default function AboutPage() {
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
    {
      title: "ISO 22000",
      desc: "Food Safety Management",
      icon: CheckCircle,
      hoverBg: "hover:bg-vibrant-yellow hover:text-primary",
    },
    {
      title: "HACCP",
      desc: "Hazard Analysis & Critical Control",
      icon: ShieldCheck,
      hoverBg: "hover:bg-electric-blue hover:text-white",
    },
    {
      title: "BRCGS",
      desc: "Global Food Safety Standard",
      icon: Award,
      hoverBg: "hover:bg-vibrant-yellow hover:text-primary",
    },
    {
      title: "Fair Trade",
      desc: "Ethical & Fair Farm Compensation",
      icon: HeartHandshake,
      hoverBg: "hover:bg-electric-blue hover:text-white",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-[750px] flex items-center px-6 md:px-margin-safe max-w-[1440px] mx-auto overflow-hidden w-full">
        {/* Blurry backgrounds */}
        <div className="absolute right-[-5%] top-[10%] w-64 h-64 bg-secondary-container rounded-full opacity-50 blur-3xl animate-pulse"></div>
        <div className="absolute left-[10%] bottom-[20%] w-48 h-48 bg-primary-fixed rounded-full opacity-50 blur-3xl animate-pulse"></div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter w-full relative z-10 items-center">
          <div className="col-span-1 md:col-span-8">
            <div className="inline-block font-label-caps text-label-caps bg-vibrant-yellow text-primary px-3 py-1 border-2 border-primary mb-6 shadow-[2px_2px_0px_0px_#00261a]">
              OUR ORIGINS
            </div>
            <h1 className="font-display-xl text-[60px] leading-[55px] md:text-[120px] md:leading-[105px] text-primary uppercase mb-8">
              BOLD
              <br />
              BY
              <br />
              NATURE.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl border-l-4 border-electric-blue pl-6 py-2 bg-surface-container/50">
              We don&apos;t just source cashews. We trace the lineage of flavour from
              the vibrant red soils of Africa to the meticulous sorting tables of
              India. Gryne is a global journey of premium taste, uncompromised
              quality, and unapologetic energy.
            </p>
          </div>
        </div>

        {/* Hero Portrait Image */}
        <div className="hidden lg:block absolute right-margin-safe bottom-24 w-[380px] h-[480px] border-4 border-primary shadow-[8px_8px_0px_0px_#00261a] overflow-hidden z-20 group">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA0QzyHvwRE3lk4qZREnjTGywVrGhNJkr4S4vtYH8hCJCWytPhJdjqi9Q8cjbKXnH8IALGegW4y0yOpXmRMZR1pMfkMMu6rE9Gwy1_9fe-8kThpDhKRMjtgnByu6UbaGb7dgSEQlBxYnh2oDkiCYIpAKrKB3DkqYwHDHv8oSwQ5MQkn6CM3w6FAxfSHGa73MAhAhVefxyAnBgohKnb384tms-llGR7VeUIA-W8fZVPu9Ecd2-rUQBmGYQ0kItnC1DcVMJ0rp0LnBA"
            alt="Cashew origin branch"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-125"
          />
          <div className="absolute bottom-4 left-4 font-label-caps text-label-caps bg-black text-white px-3 py-1 border-2 border-white text-xs">
            ORIGIN: WEST AFRICA
          </div>
        </div>
      </section>

      {/* 2. Marquee Divider */}
      <Marquee
        items={[
          "RAW & UNFILTERED",
          "GLOBAL SUPPLY CHAIN",
          "PREMIUM GRADE A",
          "UNCOMPROMISING ETHICS",
        ]}
      />

      {/* 3. Our Story Timeline Section */}
      <section className="px-6 md:px-margin-safe max-w-[1440px] mx-auto mb-section-gap py-12 w-full">
        <div className="mb-16">
          <span className="font-label-caps text-label-caps bg-black text-white px-3 py-1 border-2 border-primary shadow-[2px_2px_0px_0px_#00261a] mb-4 inline-block">
            OPERATION STEPS
          </span>
          <h2 className="font-headline-lg text-[44px] leading-tight md:text-headline-lg text-primary uppercase">
            The Sourcing Timeline
          </h2>
        </div>

        <div className="relative">
          {/* Horizontal Timeline Connector */}
          <div className="absolute top-[28px] left-0 w-full h-[4px] bg-primary z-0 hidden md:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter relative z-10">
            {timeline.map((step) => (
              <div
                key={step.num}
                className="bg-surface-container p-6 border-2 border-primary shadow-[4px_4px_0px_0px_#00261a] hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 bg-vibrant-yellow border-2 border-primary rounded-full flex items-center justify-center font-headline-md text-[20px] text-primary mb-6 md:-mt-10 shadow-[2px_2px_0px_0px_#00261a]">
                    {step.num}
                  </div>
                  <h3 className="font-headline-md text-[24px] leading-none text-primary uppercase mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leadership Team Section */}
      <section className="bg-primary text-on-primary py-section-gap relative overflow-hidden mb-section-gap w-full">
        {/* Background typography graphic */}
        <div className="absolute -top-10 left-[-5%] font-display-xl text-[140px] md:text-[200px] text-surface-tint opacity-10 whitespace-nowrap select-none pointer-events-none">
          THE CORE THE CORE
        </div>

        <div className="px-6 md:px-margin-safe max-w-[1440px] mx-auto relative z-10 w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <div className="font-label-caps text-label-caps text-vibrant-yellow mb-4">
                LEADERSHIP
              </div>
              <h2 className="font-headline-lg text-[44px] leading-tight md:text-headline-lg uppercase">
                The Architects
                <br />
                of Gryne.
              </h2>
            </div>
            <p className="font-body-lg text-body-lg max-w-md text-primary-fixed-dim font-semibold">
              A syndicate of supply chain veterans, agricultural specialists, and
              market managers united by a singular obsession: uncompromising quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {team.map((member, index) => (
              <div
                key={member.name}
                className={`group cursor-pointer ${
                  index === 1 ? "md:translate-y-12" : ""
                }`}
              >
                <div
                  className={`w-full aspect-[3/4] bg-primary-container border-2 ${member.color} mb-6 relative overflow-hidden`}
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  {/* Overlay Block sliding in on hover */}
                  <div
                    className={`absolute bottom-0 left-0 w-full ${member.overlay} p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t-2 border-primary flex justify-between items-center`}
                  >
                    <span className="font-button-text text-button-text">
                      CONNECT DIRECTLY
                    </span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-headline-md text-[30px] leading-none uppercase text-white mb-1 group-hover:text-vibrant-yellow transition-colors">
                  {member.name}
                </h3>
                <p className="font-label-caps text-label-caps text-electric-blue text-xs">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Accreditations Section */}
      <section
        id="accreditations"
        className="px-6 md:px-margin-safe max-w-[1440px] mx-auto mb-section-gap py-12 w-full"
      >
        <div className="text-center mb-16">
          <span className="font-label-caps text-label-caps bg-black text-white px-3 py-1 border-2 border-primary shadow-[2px_2px_0px_0px_#00261a] mb-4 inline-block">
            VERIFICATION
          </span>
          <h2 className="font-headline-lg text-[44px] leading-tight md:text-headline-lg text-primary uppercase mb-4">
            Uncompromised Standards
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            We don&apos;t just meet industry benchmarks; we define them. Our globally
            certified facilities guarantee impeccable safety compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {accreditations.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                className={`flex flex-col items-center justify-center p-8 bg-surface border-2 border-primary shadow-[4px_4px_0px_0px_#00261a] transition-all duration-300 group cursor-pointer ${item.hoverBg}`}
              >
                <IconComponent className="w-16 h-16 text-primary group-hover:scale-110 transition-transform duration-300 mb-4" />
                <h4 className="font-headline-md text-[24px] text-primary uppercase text-center group-hover:text-current">
                  {item.title}
                </h4>
                <p className="font-label-caps text-label-caps text-primary/70 mt-2 text-center text-xs group-hover:text-current">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
