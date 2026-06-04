"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative w-full pt-section-gap pb-gutter overflow-hidden bg-primary border-t-4 border-accent mt-auto">
      {/* Watermark */}
      <div className="font-display-xl text-[140px] md:text-[240px] leading-none text-white opacity-[0.07] absolute -top-4 md:-top-16 left-0 select-none pointer-events-none tracking-tighter">
        GRYNE
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-6 md:px-margin-safe max-w-[1440px] mx-auto relative z-10">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-5 mb-8 md:mb-0 flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <Image
                src="/logo/Gryne Rectangle.png"
                alt="Gryne Cashews"
                width={160}
                height={64}
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="font-body-md text-body-md text-white/70 mb-6 max-w-sm">
              Bold by nature. Premium quality cashews sourced globally, processed expertly from African soil to Indian craftsmanship.
            </p>
          </div>
          <div className="font-label-caps text-label-caps text-white/40 text-xs">
            &copy; {new Date().getFullYear()} GRYNE CASHEWS. BOLD BY NATURE.
          </div>
        </div>

        {/* Links Columns */}
        <div className="col-span-1 md:col-span-7 flex flex-wrap gap-12 md:justify-end">
          <div className="flex flex-col gap-4 min-w-[150px]">
            <div className="font-label-caps text-label-caps text-accent border-b border-accent/30 pb-2 mb-2">
              Company
            </div>
            <Link
              href="/business"
              className="font-body-md text-body-md text-accent font-bold hover:translate-x-1 transition-transform duration-300 inline-block"
            >
              Supply Chain
            </Link>
            <Link
              href="/about"
              className="font-body-md text-body-md text-white/70 hover:text-accent hover:translate-x-1 transition-all duration-300 inline-block"
            >
              Team
            </Link>
            <Link
              href="/about#accreditations"
              className="font-body-md text-body-md text-white/70 hover:text-accent hover:translate-x-1 transition-all duration-300 inline-block"
            >
              Accreditations
            </Link>
          </div>

          <div className="flex flex-col gap-4 min-w-[150px]">
            <div className="font-label-caps text-label-caps text-accent border-b border-accent/30 pb-2 mb-2">
              Legal &amp; Impact
            </div>
            <Link
              href="/csr"
              className="font-body-md text-body-md text-white/70 hover:text-accent hover:translate-x-1 transition-all duration-300 inline-block"
            >
              Impact
            </Link>
            <a
              href="#"
              className="font-body-md text-body-md text-white/70 hover:text-accent hover:translate-x-1 transition-all duration-300 inline-block"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
