"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Globe } from "lucide-react";

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
                src="/assets/brand/Gryne Rectangle.png"
                alt="Gryne Cashews"
                width={160}
                height={64}
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="font-body-md text-body-md text-white/80 mb-4 max-w-sm">
              Bold by nature. Premium quality cashews sourced globally, processed expertly from African soil to Indian craftsmanship.
            </p>
            <div className="font-label-caps text-xs text-vibrant-yellow mb-6 space-y-1">
              <p>Head Office: Sri Ganesh Cashew Industry, D.No 19.2.242/A, Srinivasanagar, Palasa, AP 532221</p>
              <p className="text-white/60 text-[11px]">Unit 1: 86/B Industrial Park, Palasa | Unit 2: Komaravolu, Anakapalli</p>
            </div>
          </div>

          {/* Product Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["PREMIUM QUALITY", "NATURALLY NUTRITIOUS", "RICH IN PROTEIN", "NO PRESERVATIVES"].map((b) => (
              <span key={b} className="font-label-caps text-[10px] bg-white/10 text-vibrant-yellow border border-vibrant-yellow/40 px-2 py-0.5">
                {b}
              </span>
            ))}
          </div>

          <div className="font-label-caps text-label-caps text-white/40 text-xs" suppressHydrationWarning>
            &copy; 2026 GRYNE PVT LTD. BOLD BY NATURE.
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

          <div className="flex flex-col gap-4 min-w-[200px]">
            <div className="font-label-caps text-label-caps text-accent border-b border-accent/30 pb-2 mb-2">
              Contact & Social
            </div>
            <a
              href="mailto:info@gryne.global"
              className="font-body-md text-body-md text-white/90 hover:text-accent flex items-center gap-2 transition-transform duration-300 hover:translate-x-1"
            >
              <Mail className="w-4 h-4 text-vibrant-yellow flex-shrink-0" />
              info@gryne.global
            </a>
            <a
              href="https://instagram.com/gryne.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body-md text-body-md text-white/90 hover:text-accent flex items-center gap-2 transition-transform duration-300 hover:translate-x-1"
            >
              <svg className="w-4 h-4 fill-vibrant-yellow flex-shrink-0" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              gryne.in
            </a>
            <a
              href="https://gryne.in"
              className="font-body-md text-body-md text-white/80 hover:text-accent flex items-center gap-2 transition-transform duration-300 hover:translate-x-1"
            >
              <Globe className="w-4 h-4 text-vibrant-yellow flex-shrink-0" />
              www.gryne.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
