"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useInquiry } from "@/context/inquiry-context";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const pathname = usePathname();
  const { openInquiry } = useInquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Business", href: "/business" },
    { name: "About Us", href: "/about" },
    { name: "CSR", href: "/csr" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b-2 border-primary hard-shadow">
        <div className="flex justify-between items-center px-6 md:px-gutter py-4 w-full max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="font-headline-md text-[32px] text-primary uppercase tracking-tighter hover:scale-105 transition-transform duration-300"
          >
            GRYNE
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-button-text text-button-text px-3 py-1 transition-all duration-200 hover:bg-primary hover:text-on-primary ${
                    isActive
                      ? "text-electric-blue font-bold underline decoration-2 underline-offset-8 translate-y-0.5"
                      : "text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Wholesale Inquiry Button */}
          <div className="hidden md:block">
            <button
              onClick={openInquiry}
              className="font-button-text text-button-text bg-vibrant-yellow text-primary border-2 border-primary px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,38,26,1)] hover:bg-electric-blue hover:text-white transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,38,26,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_rgba(0,38,26,1)] cursor-pointer"
            >
              Wholesale Inquiry
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-primary p-2 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="absolute top-[80px] left-0 w-full bg-background border-b-4 border-primary p-8 flex flex-col gap-6 sticker hard-shadow animate-[slideDown_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-button-text text-button-text text-2xl py-2 border-b-2 border-primary/10 ${
                    isActive ? "text-electric-blue pl-2 border-l-4 border-l-electric-blue" : "text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openInquiry();
              }}
              className="w-full text-center font-button-text text-button-text bg-vibrant-yellow text-primary border-2 border-primary py-4 shadow-[4px_4px_0px_0px_rgba(0,38,26,1)] hover:bg-electric-blue hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Wholesale Inquiry
            </button>
          </div>
        </div>
      )}
    </>
  );
}
