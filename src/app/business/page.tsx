"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useInquiry } from "@/context/inquiry-context";
import Marquee from "@/components/ui/marquee";
import { Factory, ShieldCheck, Truck, ArrowRight, ArrowDown, Warehouse, Landmark } from "lucide-react";

export default function BusinessPage() {
  const { openInquiry } = useInquiry();
  const [floaterStyle, setFloaterStyle] = useState({ transform: "translate3d(0px, 0px, 0px)" });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const speed = 0.12;
      const x = (window.innerWidth / 2 - e.clientX) * speed;
      const y = (window.innerHeight / 2 - e.clientY) * speed;
      setFloaterStyle({
        transform: `translate3d(${x}px, ${y}px, 0px)`,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const chainSteps = [
    {
      num: "01",
      title: "Direct Sourcing",
      location: "West Africa",
      desc: "We buy directly from farmer cooperatives, cutting out intermediary agents to guarantee full tracing and direct support to local growers.",
      icon: Landmark,
      color: "bg-surface-container border-primary",
    },
    {
      num: "02",
      title: "Secure Sea Transit",
      location: "Global Shipping Lanes",
      desc: "Constant temperature monitoring ensures our raw cargo is protected against humidity fluctuations throughout its oceanic voyage.",
      icon: Truck,
      color: "bg-secondary-container border-primary",
    },
    {
      num: "03",
      title: "Precision Milling",
      location: "Kollam, India",
      desc: "Our high-standard sorting mills combine robotic precision with human expertise to shell, grade, and verify each cashew shell.",
      icon: Factory,
      color: "bg-surface-container border-primary",
    },
    {
      num: "04",
      title: "Wholesale Delivery",
      location: "Global Distribution",
      desc: "Vacuum-sealed packaging keeps our product fresh and delivers peak-grade cashews to direct manufacturers and B2B buyers worldwide.",
      icon: Warehouse,
      color: "bg-vibrant-yellow border-primary",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Marquee Banner */}
      <div className="bg-primary text-vibrant-yellow overflow-hidden py-4 border-b-4 border-vibrant-yellow relative z-40">
        <Marquee
          items={[
            "GLOBAL SUPPLY CHAIN",
            "RAW AFRICAN ORIGIN",
            "PRECISION INDIAN MILLING",
            "SECURE WHOLESALE PACKAGING",
          ]}
        />
      </div>

      {/* 2. Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-margin-safe py-16 md:py-section-gap w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center relative">
          {/* Hero Left Content */}
          <div className="md:col-span-6 relative z-10">
            <span className="inline-block bg-vibrant-yellow text-primary font-label-caps text-label-caps px-4 py-1 sticker mb-6 uppercase shadow-[2px_2px_0px_0px_#00261a]">
              Business Operations
            </span>
            <h1 className="font-display-xl text-[56px] leading-[54px] md:text-headline-lg text-primary uppercase leading-none mb-6">
              Scaling <span className="text-electric-blue">Quality</span> <br />Across Continents.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-lg">
              We manage the entire lifecycle of the cashew. From deep roots in West Africa to precision processing facilities in India, delivering unmatched quality to wholesale partners worldwide.
            </p>
            <button
              onClick={openInquiry}
              className="sticker bg-primary text-on-primary font-button-text text-button-text px-8 py-4 hover:bg-electric-blue hover:text-on-primary transition-all duration-200 hard-shadow-yellow inline-flex items-center gap-2 cursor-pointer"
            >
              Partner With Us
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Hero Right Image & Parallax Badge */}
          <div className="md:col-span-6 relative aspect-square md:h-[500px] w-full sticker overflow-hidden hard-shadow mt-12 md:mt-0 bg-secondary-container">
            <img
              alt="Cashew processing facility"
              className="w-full h-full object-cover object-center mix-blend-multiply opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuA1c7rGBNLMdGqTYTSQRIe2-t_dc5ZWv1msqw4IBQHVqotZmjO0c26kDpaWDimEthcqbzijBVT_Ap6Zhd8O6PSCQl2h72L7_qN5FMz5bIxYZGJ6FM7ZPLPXX4gE5LnJ2dt1CMVqBjwQkX1PEtxbhMb5BE8HY-YyvPixgeLKvXcWz2OlTZkAHA3_FiE0e7bh_QgnmPLMkHuoeAvB5IhE0R2SgEM2zQbcm5o3t-aKxoY1d1btvptAXuZnv5qTkZMbolD7UJ9oNP0AQ"
            />
            {/* Parallax Floater Badge */}
            <div
              style={floaterStyle}
              className="absolute -right-4 -bottom-4 md:-right-8 md:-bottom-8 w-24 h-24 md:w-32 md:h-32 bg-vibrant-yellow rounded-full flex flex-col items-center justify-center border-4 border-primary shadow-[6px_6px_0px_0px_rgba(0,38,26,1)] z-20 pointer-events-none select-none transition-transform duration-100 ease-out"
            >
              <Factory className="w-8 h-8 md:w-12 md:h-12 text-primary" />
              <span className="font-label-caps text-[8px] md:text-[10px] text-primary font-bold mt-1">
                FACILITY
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep Supply Chain Breakdown */}
      <section className="bg-primary text-on-primary py-section-gap relative overflow-hidden w-full border-t-8 border-vibrant-yellow">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-margin-safe relative z-10 w-full">
          <div className="mb-16 max-w-2xl">
            <span className="font-label-caps text-label-caps text-vibrant-yellow mb-4 block">
              INFRASTRUCTURE MAP
            </span>
            <h2 className="font-headline-lg text-[44px] leading-tight md:text-headline-lg uppercase text-white mb-6">
              Our Vertically Integrated Pipeline
            </h2>
            <p className="font-body-lg text-body-lg text-primary-fixed-dim">
              By owning the sourcing, shipping, and milling operations, we guarantee structural safety, fair labor practices, and flawless product grading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter relative">
            {chainSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-primary-container border-2 border-primary-fixed p-6 shadow-[4px_4px_0px_0px_rgba(162,209,187,0.3)] hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-vibrant-yellow border-2 border-primary flex items-center justify-center font-display-xl text-[20px] text-primary shadow-[2px_2px_0px_0px_#000]">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="font-headline-md text-3xl text-surface-tint opacity-30 select-none">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="font-headline-md text-[24px] leading-none text-white uppercase mb-1">
                      {step.title}
                    </h3>
                    <span className="font-label-caps text-xs text-electric-blue block mb-4">
                      {step.location}
                    </span>
                    <p className="font-body-md text-body-md text-on-primary/80">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Quality Accreditation Callout */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-margin-safe py-section-gap w-full text-center">
        <div className="max-w-4xl mx-auto p-12 bg-canvas-cream border-4 border-primary hard-shadow relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-electric-blue text-white font-label-caps text-xs px-4 py-2 border-2 border-primary shadow-[2px_2px_0px_0px_#000]">
            B2B WHOLESALE SPECIFICATIONS
          </div>
          <h2 className="font-headline-lg text-[36px] md:text-[52px] leading-none text-primary uppercase mt-4 mb-6">
            Export Standards Verified
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8 font-bold">
            We mill and grade in ISO 22000 & HACCP certified facilities, delivering bulk cargo vacuum packed in 25lb / 50lb tins or multi-layer bags, customized precisely to your regional import guidelines.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-electric-blue" />
              <span className="font-label-caps text-sm text-primary">GRADE W180, W240, W320, LWP, SWP</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-electric-blue" />
              <span className="font-label-caps text-sm text-primary">SGS QUALITY CERTIFIED</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Direct B2B CTA Banner */}
      <section className="bg-vibrant-yellow text-primary py-16 px-6 text-center border-t-4 border-primary w-full">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-display-xl text-[48px] md:text-[80px] leading-none uppercase tracking-tighter mb-6">
            CONTRACT YOUR VOLUME
          </h2>
          <p className="font-body-lg text-body-lg text-primary max-w-xl mx-auto mb-8 font-bold">
            Secure seasonal supply lines and high-quality grade locking directly with the global syndicate.
          </p>
          <button
            onClick={openInquiry}
            className="sticker bg-primary text-on-primary font-button-text text-button-text px-10 py-5 hover:bg-electric-blue hover:text-white transition-all duration-300 hard-shadow-blue text-xl cursor-pointer"
          >
            REQUEST BULK OFFER SHEET
          </button>
        </div>
      </section>
    </div>
  );
}
