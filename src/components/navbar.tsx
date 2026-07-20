"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useInquiry } from "@/context/inquiry-context";
import { Menu, X } from "lucide-react";
import { triggerHaptic } from "@/lib/haptics";

export default function NavBar() {
  const pathname = usePathname();
  const { openInquiry } = useInquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    // Fix mobile scroll glitching: require significant scroll diff (12px)
    if (mobileMenuOpen) {
      setHidden(false);
    } else if (diff > 12 && latest > 120) {
      setHidden(true);
    } else if (diff < -8 || latest < 60) {
      setHidden(false);
    }

    if (latest > 80) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const navLinks = [
    { name: "Business", href: "/business" },
    { name: "About Us", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "CSR", href: "/csr" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 w-full z-50 transition-all duration-300 bg-[#F7F2E8]/85 backdrop-blur-md border-b border-primary/10 shadow-[0_4px_20px_rgba(26,20,48,0.06)]"
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-105%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <div className="flex justify-between items-center pr-6 md:pr-gutter pl-0 py-0 w-full max-w-[1440px] mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="md:-ml-6"
          >
            <Link href="/" className="block hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo/Gryne Rectangle.png"
                alt="Gryne Cashews"
                width={240}
                height={96}
                className="h-[72px] md:h-[96px] w-auto object-contain drop-shadow-[0_4px_12px_rgba(59,40,255,0.12)]"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Nav Links */}
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
                    className={`font-button-text text-button-text px-3 py-1.5 transition-all duration-200 rounded hover:bg-primary/10 ${
                      isActive
                        ? "text-primary font-bold underline decoration-2 underline-offset-8 decoration-primary"
                        : "text-on-background"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Button */}
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
              className="font-button-text text-button-text border-2 px-6 py-2 transition-colors duration-300 cursor-pointer bg-primary text-white border-primary shadow-[4px_4px_0px_0px_#18FF00] hover:bg-accent hover:text-on-accent hover:border-accent"
            >
              Wholesale Inquiry
            </motion.button>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              triggerHaptic('light');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center focus:outline-none cursor-pointer text-primary"
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-5">
              <motion.span
                className="absolute left-0 block h-[3px] w-6 rounded bg-primary"
                animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ originX: 0.5, originY: 0.5, top: "0px" }}
              />
              <motion.span
                className="absolute left-0 block h-[3px] w-6 rounded bg-primary"
                animate={mobileMenuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.15 }}
                style={{ top: "8px" }}
              />
              <motion.span
                className="absolute left-0 block h-[3px] w-6 rounded bg-primary"
                animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ originX: 0.5, originY: 0.5, top: "16px" }}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] inset-x-0 bottom-0 z-50 bg-on-background/30 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              key="mobile-drawer"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              style={{ transformOrigin: "top" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 w-full border-b-4 p-8 flex flex-col gap-6 transition-colors duration-300 border-primary bg-background shadow-[0_8px_30px_rgba(26,20,48,0.15)]"
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
                      className={`block font-button-text text-button-text text-2xl py-2 border-b-2 border-white/10 ${
                        isActive
                          ? "text-primary pl-2 border-l-4 border-l-primary"
                          : "text-on-background"
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
                className="w-full text-center font-button-text text-button-text py-4 transition-colors duration-200 cursor-pointer bg-primary text-white border-2 border-primary shadow-[4px_4px_0px_0px_#18FF00] hover:bg-accent"
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
