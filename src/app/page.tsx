"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useInquiry } from "@/context/inquiry-context";
import Marquee from "@/components/ui/marquee";
import { ArrowRight, Globe, ShieldCheck, Tractor, Ship } from "lucide-react";

export default function HomePage() {
  const { openInquiry } = useInquiry();
  const journeyRef = useRef<HTMLDivElement>(null);
  const [shipProgress, setShipProgress] = useState(-100);

  useEffect(() => {
    const handleScroll = () => {
      if (!journeyRef.current) return;
      const rect = journeyRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section is inside the viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const totalScrollable = windowHeight + rect.height;
        const scrolledIntoSection = windowHeight - rect.top;
        const percentage = Math.max(0, Math.min(1, scrolledIntoSection / totalScrollable));

        // Calculate progress translation from left (-100px) to right (width - 150px)
        const maxWidth = Math.min(window.innerWidth - 150, 1100);
        const currentPos = -100 + percentage * maxWidth;
        setShipProgress(currentPos);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center pt-24 pb-section-gap overflow-hidden bg-vibrant-yellow">
        {/* Floating Cashew Parallax Assets */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-[20%] left-[10%] w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-full flex items-center justify-center animate-cashew-float mix-blend-multiply opacity-80">
            <span className="font-label-caps text-xs text-primary/70 bg-canvas-cream px-2 py-1 sticker shadow-[2px_2px_0px_0px_#00261a]">
              RAW SEED
            </span>
          </div>

          <div
            className="absolute top-[40%] right-[12%] w-28 h-28 md:w-36 md:h-36 bg-tertiary/10 rounded-full flex items-center justify-center animate-cashew-float mix-blend-multiply opacity-90"
            style={{ animationDelay: "-2s" }}
          >
            <span className="font-label-caps text-xs text-primary bg-white px-2 py-1 sticker shadow-[2px_2px_0px_0px_#00261a]">
              W240 JUMBO
            </span>
          </div>

          <div
            className="absolute bottom-[20%] left-[20%] w-20 h-20 md:w-24 md:h-24 bg-electric-blue/10 rounded-full flex items-center justify-center animate-cashew-float mix-blend-multiply opacity-70"
            style={{ animationDelay: "-4s" }}
          >
            <span className="font-label-caps text-[10px] text-white bg-black px-2 py-1 sticker shadow-[2px_2px_0px_0px_#2E5BFF]">
              WEST AFRICA
            </span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-6 md:px-gutter max-w-4xl">
          <div className="font-label-caps text-label-caps bg-primary text-vibrant-yellow px-4 py-2 inline-block mb-8 sticker hard-shadow">
            AFRICA TO INDIA &bull; RAW TO ROASTED
          </div>
          <h1 className="font-display-xl text-[64px] leading-[60px] md:text-[140px] md:leading-[125px] text-primary tracking-tighter uppercase relative select-none">
            BOLD
            <br />
            <span
              className="text-white"
              style={{ textShadow: "4px 4px 0px #00261a" }}
            >
              BY
            </span>
            <br />
            NATURE
          </h1>
          <p className="font-body-lg text-body-lg text-primary mt-8 max-w-2xl mx-auto font-bold">
            Premium grade cashews sourced with aggressive integrity. We control
            the entire supply chain from the lush soils of West Africa to precision sorting tables in India. No compromises.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/business"
              className="w-full sm:w-auto text-center font-button-text text-button-text bg-electric-blue text-white px-8 py-4 border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 hard-shadow-yellow text-xl cursor-pointer"
            >
              EXPLORE THE CHAIN
            </Link>
            <button
              onClick={openInquiry}
              className="w-full sm:w-auto text-center font-button-text text-button-text bg-primary text-on-primary px-8 py-4 border-2 border-primary hover:bg-vibrant-yellow hover:text-primary transition-all duration-300 hard-shadow text-xl cursor-pointer"
            >
              WHOLESALE INQUIRY
            </button>
          </div>
        </div>
      </header>

      {/* 2. Scrolling Marquee Divider */}
      <Marquee
        items={[
          "PREMIUM GRADE",
          "FRESH FROM ORIGIN",
          "UNCOMPROMISING QUALITY",
          "DIRECT SUPPLY",
        ]}
      />

      {/* 3. Scale and Impact Statistics Section */}
      <section className="py-section-gap px-6 md:px-gutter max-w-[1440px] mx-auto bg-background w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Section Heading Info */}
          <div className="md:col-span-5 flex flex-col justify-center">
            <div className="font-label-caps text-label-caps bg-black text-white px-4 py-2 inline-block self-start mb-6 sticker hard-shadow">
              THE SCALE
            </div>
            <h2 className="font-headline-lg text-[44px] leading-tight md:text-headline-lg text-primary uppercase mb-6">
              Massive Impact.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-md">
              We don&apos;t just move nuts; we move global B2B markets. Our direct
              infrastructure is engineered for volume without sacrificing the organic raw quality of the harvest.
            </p>
          </div>

          {/* Dynamic Stats Cards Grid */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Partners Card */}
            <div className="bg-electric-blue p-8 border-4 border-primary hard-shadow relative overflow-hidden group hover:scale-[1.02] transition-transform">
              <Globe className="text-white w-24 h-24 opacity-10 absolute -top-4 -right-4" />
              <h3 className="font-display-xl text-[72px] leading-none text-white">50+</h3>
              <p className="font-button-text text-button-text text-vibrant-yellow mt-4 uppercase">
                Global Partners
              </p>
            </div>

            {/* Tons Shipped Card */}
            <div className="bg-surface-tint p-8 border-4 border-primary hard-shadow relative overflow-hidden group hover:scale-[1.02] transition-transform">
              <Tractor className="text-white w-24 h-24 opacity-10 absolute -top-4 -right-4" />
              <h3 className="font-display-xl text-[72px] leading-none text-white">10K</h3>
              <p className="font-button-text text-button-text text-secondary-container mt-4 uppercase">
                Tons Shipped Annually
              </p>
            </div>

            {/* Traceability Card */}
            <div className="bg-vibrant-yellow p-8 border-4 border-primary hard-shadow relative overflow-hidden sm:col-span-2 group hover:scale-[1.02] transition-transform">
              <ShieldCheck className="text-primary w-24 h-24 opacity-15 absolute -top-4 -right-4" />
              <h3 className="font-display-xl text-[72px] leading-none text-primary">100%</h3>
              <p className="font-button-text text-button-text text-primary mt-4 uppercase">
                Direct Source Traceability
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Scroll-Linked Journey Timeline Section */}
      <section
        ref={journeyRef}
        className="py-section-gap bg-primary relative overflow-hidden text-white border-y-8 border-vibrant-yellow w-full"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-gutter relative z-20">
          <div className="text-center mb-24">
            <h2 className="font-headline-lg text-[44px] leading-tight md:text-headline-lg text-vibrant-yellow uppercase">
              The Ocean Journey
            </h2>
            <p className="font-body-lg text-body-lg text-surface-container-high mt-4 max-w-2xl mx-auto">
              Sailing the direct shipping lanes from West African farm hubs to precision processing mills in India.
            </p>
          </div>

          <div className="relative h-[250px] md:h-[300px] flex items-center border-y-4 border-electric-blue py-12">
            {/* Continent Anchors */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 font-headline-md text-[24px] md:text-headline-md text-electric-blue tracking-widest pl-4 md:pl-gutter">
              AFRICA
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 font-headline-md text-[24px] md:text-headline-md text-surface-tint tracking-widest pr-4 md:pr-gutter">
              INDIA
            </div>

            {/* Parallax Ship Element */}
            <div
              className="absolute top-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
              style={{ transform: `translate(${shipProgress}px, -50%)` }}
            >
              <div className="relative flex flex-col items-center">
                <Ship className="w-20 h-20 md:w-32 md:h-32 text-vibrant-yellow filter drop-shadow-[4px_4px_0px_#000]" />
                <div className="absolute -top-4 font-label-caps text-[10px] bg-black text-white px-2 py-1 sticker whitespace-nowrap shadow-[2px_2px_0px_0px_#2E5BFF]">
                  RAW CARGO
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Call To Action B2B Showcase */}
      <section className="py-section-gap px-6 md:px-gutter max-w-[1440px] mx-auto w-full text-center">
        <span className="font-label-caps text-label-caps bg-black text-vibrant-yellow px-4 py-2 inline-block mb-6 sticker hard-shadow">
          GLOBAL SUPPLY SYNDICATE
        </span>
        <h2 className="font-headline-lg text-[44px] leading-tight md:text-headline-lg text-primary uppercase max-w-4xl mx-auto mb-8">
          Secure Premium Grade Cashews for Your Wholesale Operations.
        </h2>
        <button
          onClick={openInquiry}
          className="font-button-text text-button-text bg-electric-blue text-white px-10 py-5 border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 hard-shadow-yellow text-2xl inline-flex items-center gap-3 cursor-pointer"
        >
          INITIATE WHOLESALE INQUIRY <ArrowRight className="w-6 h-6" />
        </button>
      </section>
    </div>
  );
}
