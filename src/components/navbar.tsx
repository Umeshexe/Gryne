"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useInquiry } from "@/context/inquiry-context";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const pathname = usePathname();
  const { openInquiry } = useInquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Business", href: "/business" },
    { name: "About Us", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "CSR", href: "/csr" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Animated slide-down on mount */}
      <motion.nav
        className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b-2 border-primary hard-shadow"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <div className="flex justify-between items-center px-6 md:px-gutter py-4 w-full max-w-[1440px] mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <Link
              href="/"
              className="font-headline-md text-[32px] text-primary uppercase tracking-tighter hover:scale-105 transition-transform duration-300"
            >
              GRYNE
            </Link>
          </motion.div>

          {/* Desktop Nav Links with staggered reveal */}
          <motion.div
            className="hidden md:flex space-x-8 items-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
            }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.name}
                  variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className={`font-button-text text-button-text px-3 py-1 transition-all duration-200 hover:bg-primary hover:text-on-primary ${
                      isActive
                        ? "text-electric-blue font-bold underline decoration-2 underline-offset-8 translate-y-0.5"
                        : "text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA — slides in from right */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.4 }}
          >
            <motion.button
              whileHover={{ x: 2, y: 2 }}
              whileTap={{ x: 4, y: 4 }}
              onClick={openInquiry}
              className="font-button-text text-button-text bg-vibrant-yellow text-primary border-2 border-primary px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,38,26,1)] hover:bg-electric-blue hover:text-white transition-colors duration-300 hover:shadow-[2px_2px_0px_0px_rgba(0,38,26,1)] cursor-pointer"
            >
              Wholesale Inquiry
            </motion.button>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-primary p-2 cursor-pointer"
            aria-label="Toggle Menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-8 h-8" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-8 h-8" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer — AnimatePresence for smooth slide in/out */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              key="mobile-drawer"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-[80px] left-0 w-full bg-background border-b-4 border-primary p-8 flex flex-col gap-6 sticker hard-shadow"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block font-button-text text-button-text text-2xl py-2 border-b-2 border-primary/10 ${
                        isActive ? "text-electric-blue pl-2 border-l-4 border-l-electric-blue" : "text-primary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.25 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  openInquiry();
                }}
                className="w-full text-center font-button-text text-button-text bg-vibrant-yellow text-primary border-2 border-primary py-4 shadow-[4px_4px_0px_0px_rgba(0,38,26,1)] hover:bg-electric-blue hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Wholesale Inquiry
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
