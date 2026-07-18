"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Marquee from "@/components/ui/marquee";
import BlurText from "@/components/ui/blur-text";

// ─── Gallery Data ─────────────────────────────────────────────────────────────

const images = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCA0QzyHvwRE3lk4qZREnjTGywVrGhNJkr4S4vtYH8hCJCWytPhJdjqi9Q8cjbKXnH8IALGegW4y0yOpXmRMZR1pMfkMMu6rE9Gwy1_9fe-8kThpDhKRMjtgnByu6UbaGb7dgSEQlBxYnh2oDkiCYIpAKrKB3DkqYwHDHv8oSwQ5MQkn6CM3w6FAxfSHGa73MAhAhVefxyAnBgohKnb384tms-llGR7VeUIA-W8fZVPu9Ecd2-rUQBmGYQ0kItnC1DcVMJ0rp0LnBA",
    alt: "Cashew branch origin West Africa",
    tag: "ORIGIN",
    span: "tall",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuA1c7rGBNLMdGqTYTSQRIe2-t_dc5ZWv1msqw4IBQHVqotZmjO0c26kDpaWDimEthcqbzijBVT_Ap6Zhd8O6PSCQl2h72L7_qN5FMz5bIxYZGJ6FM7ZPLPXX4gE5LnJ2dt1CMVqBjwQkX1PEtxbhMb5BE8HY-YyvPixgeLKvXcWz2OlTZkAHA3_FiE0e7bh_QgnmPLMkHuoeAvB5IhE0R2SgEM2zQbcm5o3t-aKxoY1d1btvptAXuZnv5qTkZMbolD7UJ9oNP0AQ",
    alt: "Cashew processing facility",
    tag: "FACILITY",
    span: "normal",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7eVl7ofcZnj6wdzA9SEvo3FBkn2nHqP7EtCY4dD-qzVR3wMKYT5IQ-m2_tcdAIGfmwd84MEFHMBLP7jlSYZ58UrgEfF9oWEnHBHmbmb1hgPGZPNV_ZHLtQh6SpgBB5mEyC0xKRYmZQds7U07WiaEXgZTKkhSgCCPqjsnru9giJlrkCKtYIsuhQF3yqdOnkSuIeWyIvtWnkE8m_QO2OVZjiZ9cqlr7whEA_FYvORLBcVV1TEaLyttiLwbNdmP3zmeHxVhiEoOk5cs",
    alt: "Farmer holding cashews",
    tag: "HARVEST",
    span: "normal",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuClXjEJcjhMwURVXm0LKq5vVhZbffeZhDzT3xpKstK5UixjfAkIXiSHEhRlQARMlW4KLiofcbmVMiD2i1rXuxmAS_0wB3wZ6k2zhEYgBsbVxQsnM2jiF2aA_HDpwkftHYiLetOQMzhQSsYv4iqGJev0dXryh8yc8XovL4jFX-2g-hL5apXBsjUssFxOWUEELRH6oAKKrTOQt4Un_zJ75OPd5aGa3IH2Ze34gGfRKJgy8qlw_qN7VPnpNY9flPCDN5m1Ap2mnaRRiBw",
    alt: "Global Sourcing Director",
    tag: "TEAM",
    span: "tall",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYx2bhwJ73wYWyb85JFY9N_glkI7-rBRB0XOPMM4K0WyfIphubvC39974rSh1-pGF5Tgv5uyGryMk7lB1-5yRfFpACEWGP-4xm_vp9pLqA48CVjMecf88JNd5E9Hmanv7UADh_WMG7mq-A2q2TJKGcGEyoZygd1HAtqSo3V1hE6Uldt29I9HTLdIK7DeDBlHA-j7nUMfedW2-U7QUWpnWtsiIvH0meLGk2ukhJ6JtpuEIT7Nyq2nQd2bJyswAKsmAdzKwZwlu5pFA",
    alt: "Head of Operations",
    tag: "TEAM",
    span: "normal",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkJFjhFwGLkZ2xnSQPvZlPP4l6MKiIqLDg2RzVqdjaw1l5XiYY2RFSNdoLhBobTTymazVqbgMQfv3F6hqK-REIcu2pAImcuOj6lb3Fmi5gRpx_QrqxC65jCe2nZEpwf59_uzZGTthWVrBKMtue7pPrcBUflHPRLwFeD0MabQCmuVMPQfcQL9VJyejWa3QBhDtGkt5_nGrhWJksstcC-la_xRAJRh91FjPeunDpgXICPEGQN0W0XQ01M58YOiGvsvtnhFYPi6q-Ap4",
    alt: "Chief Quality Officer",
    tag: "TEAM",
    span: "normal",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCA0QzyHvwRE3lk4qZREnjTGywVrGhNJkr4S4vtYH8hCJCWytPhJdjqi9Q8cjbKXnH8IALGegW4y0yOpXmRMZR1pMfkMMu6rE9Gwy1_9fe-8kThpDhKRMjtgnByu6UbaGb7dgSEQlBxYnh2oDkiCYIpAKrKB3DkqYwHDHv8oSwQ5MQkn6CM3w6FAxfSHGa73MAhAhVefxyAnBgohKnb384tms-llGR7VeUIA-W8fZVPu9Ecd2-rUQBmGYQ0kItnC1DcVMJ0rp0LnBA",
    alt: "Cashew raw kernel close-up",
    tag: "PRODUCT",
    span: "wide",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuA1c7rGBNLMdGqTYTSQRIe2-t_dc5ZWv1msqw4IBQHVqotZmjO0c26kDpaWDimEthcqbzijBVT_Ap6Zhd8O6PSCQl2h72L7_qN5FMz5bIxYZGJ6FM7ZPLPXX4gE5LnJ2dt1CMVqBjwQkX1PEtxbhMb5BE8HY-YyvPixgeLKvXcWz2OlTZkAHA3_FiE0e7bh_QgnmPLMkHuoeAvB5IhE0R2SgEM2zQbcm5o3t-aKxoY1d1btvptAXuZnv5qTkZMbolD7UJ9oNP0AQ",
    alt: "Processing floor overview",
    tag: "FACILITY",
    span: "normal",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7eVl7ofcZnj6wdzA9SEvo3FBkn2nHqP7EtCY4dD-qzVR3wMKYT5IQ-m2_tcdAIGfmwd84MEFHMBLP7jlSYZ58UrgEfF9oWEnHBHmbmb1hgPGZPNV_ZHLtQh6SpgBB5mEyC0xKRYmZQds7U07WiaEXgZTKkhSgCCPqjsnru9giJlrkCKtYIsuhQF3yqdOnkSuIeWyIvtWnkE8m_QO2OVZjiZ9cqlr7whEA_FYvORLBcVV1TEaLyttiLwbNdmP3zmeHxVhiEoOk5cs",
    alt: "Farming community",
    tag: "ORIGIN",
    span: "normal",
  },
];

const tags = ["ALL", "ORIGIN", "FACILITY", "HARVEST", "TEAM", "PRODUCT"];

// ─── Image Card ───────────────────────────────────────────────────────────────

function GalleryCard({
  img,
  index,
  onClick,
}: {
  img: (typeof images)[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const heightClass =
    img.span === "tall" ? "h-[480px]" : img.span === "wide" ? "h-[280px]" : "h-[320px]";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className={`relative ${heightClass} border-2 border-primary shadow-[4px_4px_0px_0px_#3B28FF] overflow-hidden group cursor-pointer bg-secondary-container`}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-all duration-400 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ZoomIn className="w-12 h-12 text-white" />
        </motion.div>
      </div>
      {/* Tag */}
      <div className="absolute top-3 left-3 font-label-caps text-[10px] bg-vibrant-yellow text-primary px-2 py-1 border border-primary">
        {img.tag}
      </div>
    </motion.div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  images: imgs,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: typeof images;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      key="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-6 right-6 text-white border-2 border-white p-2 hover:bg-white hover:text-black transition-colors cursor-pointer z-10"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 md:left-8 text-white border-2 border-white p-3 hover:bg-white hover:text-black transition-colors cursor-pointer z-10"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Image */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.25 }}
        className="relative w-[90vw] max-w-4xl h-[75vh] border-4 border-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imgs[index].src}
          alt={imgs[index].alt}
          fill
          className="object-cover"
          sizes="90vw"
          priority
        />
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary/80 backdrop-blur-sm px-6 py-3 flex justify-between items-center">
          <span className="font-body-md text-white">{imgs[index].alt}</span>
          <span className="font-label-caps text-vibrant-yellow text-xs">{imgs[index].tag}</span>
        </div>
      </motion.div>

      {/* Next */}
      <button
        className="absolute right-4 md:right-8 text-white border-2 border-white p-3 hover:bg-white hover:text-black transition-colors cursor-pointer z-10"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-label-caps text-white/60 text-xs">
        {index + 1} / {imgs.length}
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [activeTag, setActiveTag] = useState("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeTag === "ALL" ? images : images.filter((img) => img.tag === activeTag);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);
  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  }, [filtered.length]);

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── 1. Hero ── */}
      <section className="relative min-h-[440px] flex items-center px-6 md:px-margin-safe max-w-[1440px] mx-auto w-full overflow-hidden pt-[140px] -mt-[76px]">
        <div className="absolute left-0 top-0 w-1/3 h-full bg-primary/5 pointer-events-none" />
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 font-display-xl text-[200px] text-primary/5 select-none pointer-events-none whitespace-nowrap">
          SEE
        </div>

        <motion.div
          className="relative z-10"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4 }}
            className="inline-block font-label-caps text-label-caps bg-black text-white px-3 py-1 border-2 border-primary mb-6 shadow-[2px_2px_0px_0px_#3B28FF]"
          >
            VISUAL ARCHIVE
          </motion.div>

          <BlurText 
            text="THE HARVEST."
            className="font-display-xl text-[72px] leading-[68px] md:text-[140px] md:leading-[125px] text-primary uppercase block"
          />

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mt-6 border-l-4 border-vibrant-yellow pl-6 bg-canvas-cream/60 py-2"
          >
            From African orchards to Indian processing facilities — the full visual journey of every kernel.
          </motion.p>
        </motion.div>
      </section>

      {/* ── 2. Marquee ── */}
      <Marquee items={["FARM TO FORK", "HAND SORTED", "QUALITY VERIFIED", "GLOBAL STANDARD"]} />

      {/* ── 3. Filter Tabs ── */}
      <section className="px-6 md:px-margin-safe max-w-[1440px] mx-auto pt-12 w-full">
        <div className="flex flex-wrap gap-3 mb-10">
          {tags.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => { setActiveTag(tag); setLightboxIndex(null); }}
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
              className={`font-label-caps text-label-caps text-xs px-4 py-2 border-2 border-primary transition-all duration-200 cursor-pointer ${
                activeTag === tag
                  ? "bg-primary text-on-primary shadow-[3px_3px_0px_0px_#18FF00]"
                  : "bg-surface text-primary hover:bg-primary/10 shadow-[3px_3px_0px_0px_#3B28FF]"
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        {/* ── 4. Masonry Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-gutter space-y-gutter pb-section-gap"
          >
            {filtered.map((img, i) => (
              <div key={`${img.alt}-${i}`} className="break-inside-avoid mb-gutter">
                <GalleryCard img={img} index={i} onClick={() => openLightbox(i)} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── 5. Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
