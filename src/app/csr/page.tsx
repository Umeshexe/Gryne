"use client";

import React from "react";
import Image from "next/image";
import { useInquiry } from "@/context/inquiry-context";
import Marquee from "@/components/ui/marquee";
import { Heart, Sprout, Landmark, Droplets, Sun, CheckCircle, ArrowRight } from "lucide-react";

export default function CSRPage() {
  const { openInquiry } = useInquiry();

  const pillars = [
    {
      title: "Farmer Empowerment",
      desc: "By establishing direct-buy partnerships, we ensure agricultural families receive up to 35% higher profits than traditional market rates.",
      icon: Heart,
      color: "bg-surface-container border-primary hover:bg-vibrant-yellow hover:text-primary",
    },
    {
      title: "Eco-Agricultural Sourcing",
      desc: "Promoting chemical-free fertilization, intercropping methods, and native organic composting to preserve natural soil fertility.",
      icon: Sprout,
      color: "bg-secondary-container border-primary hover:bg-electric-blue hover:text-white",
    },
    {
      title: "Clean Processing Energy",
      desc: "Our premium sorting and peeling mills in India are transitioning to 100% solar power grids, minimizing processing emissions.",
      icon: Sun,
      color: "bg-surface-container border-primary hover:bg-vibrant-yellow hover:text-primary",
    },
    {
      title: "Water Conservation",
      desc: "Enforcing advanced industrial wastewater recycling processes at our main production silos to prevent agricultural pollution.",
      icon: Droplets,
      color: "bg-vibrant-yellow border-primary hover:bg-electric-blue hover:text-white",
    },
  ];

  const milestones = [
    { metric: "35%", text: "Income Increase for Direct Farm Co-Ops" },
    { metric: "1,200+", text: "Farmers Certified in Eco-Agriculture" },
    { metric: "100%", text: "Zero Forced-Intermediary Sourcing Model" },
    { metric: "450 kW", text: "Solar Generating Capacity Installed" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Marquee Banner */}
      <div className="bg-primary text-vibrant-yellow overflow-hidden py-4 border-b-4 border-vibrant-yellow relative z-40">
        <Marquee
          items={[
            "SUSTAINABLE INITIATIVES",
            "ETHICAL CO-OP INVESTMENT",
            "CARBON RENEWABLE PROCESSING",
            "DIRECT GROWER ENRICHMENT",
          ]}
        />
      </div>

      {/* 2. Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-margin-safe py-16 md:py-section-gap w-full relative mt-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          {/* Left Column Content */}
          <div className="col-span-1 md:col-span-7 z-10">
            <span className="inline-block px-4 py-1 border-2 border-primary bg-vibrant-yellow font-label-caps text-label-caps text-primary mb-6 shadow-[2px_2px_0px_0px_rgba(0,38,26,1)] uppercase">
              Impact Report
            </span>
            <h1 className="font-display-xl text-[56px] leading-[54px] md:text-headline-lg text-primary uppercase mb-6 leading-tight">
              Rooted in <br />
              <span className="text-stroke">Responsibility</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-8">
              Our commitment extends beyond the harvest. We invest in the land, the communities, and the future of cashew farming across Africa and India.
            </p>
            <button
              onClick={openInquiry}
              className="font-button-text text-button-text text-on-primary bg-primary border-2 border-primary px-8 py-4 hover:bg-electric-blue hover:border-electric-blue transition-colors duration-300 shadow-[4px_4px_0px_0px_rgba(46,91,255,1)] hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_rgba(46,91,255,1)] cursor-pointer"
            >
              READ OUR MISSION
            </button>
          </div>

          {/* Right Column Portrait Frame */}
          <div className="col-span-1 md:col-span-5 relative mt-12 md:mt-0">
            <div className="aspect-[4/5] bg-secondary-container border-4 border-primary overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,38,26,1)] relative z-0">
              <img
                alt="Farmer holding cashews"
                className="w-full h-full object-cover filter brightness-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7eVl7ofcZnj6wdzA9SEvo3FBkn2nHqP7EtCY4dD-qzVR3wMKYT5IQ-m2_tcdAIGfmwd84MEFHMBLP7jlSYZ58UrgEfF9oWEnHBHmbmb1hgPGZPNV_ZHLtQh6SpgBB5mEyC0xKRYmZQds7U07WiaEXgZTKkhSgCCPqjsnru9giJlrkCKtYIsuhQF3yqdOnkSuIeWyIvtWnkE8m_QO2OVZjiZ9cqlr7whEA_FYvORLBcVV1TEaLyttiLwbNdmP3zmeHxVhiEoOk5cs"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. High-Contrast Sustainability Pillars */}
      <section className="bg-primary text-on-primary py-section-gap relative overflow-hidden w-full border-t-8 border-vibrant-yellow">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-margin-safe relative z-10 w-full">
          <div className="mb-16 max-w-2xl">
            <span className="font-label-caps text-label-caps text-vibrant-yellow mb-4 block">
              ECO RESPONSIBILITY
            </span>
            <h2 className="font-headline-lg text-[40px] leading-tight md:text-headline-lg uppercase text-white mb-6">
              Our Core Sustainability Pillars
            </h2>
            <p className="font-body-lg text-body-lg text-primary-fixed-dim">
              We leverage modern infrastructure alongside regenerative practices, creating a balanced pipeline that values organic farmers and climate action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-primary-container border-2 border-primary-fixed p-6 shadow-[4px_4px_0px_0px_rgba(162,209,187,0.3)] hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-vibrant-yellow border-2 border-primary flex items-center justify-center font-display-xl text-[20px] text-primary shadow-[2px_2px_0px_0px_#000] mb-6">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-headline-md text-[24px] leading-none text-white uppercase mb-4">
                      {pillar.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-primary/80">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Stat Grid & Milestones */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-margin-safe py-section-gap w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-5 flex flex-col justify-center">
            <span className="font-label-caps text-label-caps bg-black text-white px-4 py-2 inline-block self-start mb-6 sticker hard-shadow">
              VERIFIED IMPACT
            </span>
            <h2 className="font-headline-lg text-[40px] leading-tight md:text-headline-lg text-primary uppercase mb-6">
              Trackable Social Milestones.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
              We monitor social outcomes with absolute precision, reporting transparent indicators to our wholesale and enterprise procurement partners.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {milestones.map((item, idx) => (
              <div
                key={idx}
                className={`p-8 border-4 border-primary hard-shadow relative overflow-hidden group hover:scale-[1.02] transition-transform ${
                  idx % 2 === 0 ? "bg-electric-blue text-white" : "bg-vibrant-yellow text-primary"
                }`}
              >
                <h3 className="font-display-xl text-[64px] leading-none">{item.metric}</h3>
                <p className={`font-button-text text-button-text mt-4 uppercase ${
                  idx % 2 === 0 ? "text-vibrant-yellow" : "text-primary"
                }`}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Ethical B2B CTA Banner */}
      <section className="bg-canvas-cream text-primary py-16 px-6 text-center border-t-4 border-primary w-full">
        <div className="max-w-[1440px] mx-auto">
          <span className="font-label-caps text-label-caps bg-black text-white px-4 py-2 inline-block mb-6 sticker hard-shadow">
            PROACTIVE INVESTMENT
          </span>
          <h2 className="font-display-xl text-[44px] md:text-[64px] leading-none uppercase tracking-tighter mb-6">
            SECURE ETHICAL SUPPLY
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8 font-bold">
            Integrate transparent, direct-sourced cashews into your raw ingredient inventory and achieve your corporate environmental & social development targets.
          </p>
          <button
            onClick={openInquiry}
            className="sticker bg-primary text-on-primary font-button-text text-button-text px-10 py-5 hover:bg-electric-blue hover:text-white transition-all duration-300 hard-shadow-yellow text-xl cursor-pointer"
          >
            REQUEST ESG REPORT SHEET
          </button>
        </div>
      </section>
    </div>
  );
}
