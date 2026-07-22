"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Marquee from "@/components/ui/marquee";
import BlurText from "@/components/ui/blur-text";

// ─── Gallery Data ─────────────────────────────────────────────────────────────

const images = [
  // Unit 1 Images
  {
    src: "/assets/unit-1/20260706_172750.jpg",
    alt: "Unit 1 - Manual Kernel Sorting & Quality Inspection (Palasa)",
    tag: "SORTING",
    tags: ["UNIT 1", "PEOPLE WORKING", "SORTING"],
    span: "normal",
  },
  {
    src: "/assets/unit-1/20260706_172816.jpg",
    alt: "Unit 1 - Skilled Processing Workforce at Work",
    tag: "PEOPLE WORKING",
    tags: ["UNIT 1", "PEOPLE WORKING", "SORTING"],
    span: "wide",
  },
  {
    src: "/assets/unit-1/20260706_173027.jpg",
    alt: "Unit 1 - Steam Roasting & Thermal Processing Machinery",
    tag: "MACHINERY",
    tags: ["UNIT 1", "MACHINERY"],
    span: "wide",
  },
  {
    src: "/assets/unit-1/20260706_173336.jpg",
    alt: "Unit 1 - Mechanical Shelling & Kernel Extraction Line",
    tag: "MACHINERY",
    tags: ["UNIT 1", "MACHINERY", "SORTING"],
    span: "normal",
  },

  // Unit 2 Images
  {
    src: "/assets/unit-2/20260713_171137.jpg",
    alt: "Unit 2 - Automated High-Capacity Processing Floor (Anakapalli)",
    tag: "MACHINERY",
    tags: ["UNIT 2", "MACHINERY"],
    span: "wide",
  },
  {
    src: "/assets/unit-2/20260713_171442.jpg",
    alt: "Unit 2 - Workforce Operating Optical Sorting Systems",
    tag: "PEOPLE WORKING",
    tags: ["UNIT 2", "PEOPLE WORKING", "MACHINERY", "SORTING"],
    span: "normal",
  },
  {
    src: "/assets/unit-2/IMG-20250925-WA0039.jpg",
    alt: "Unit 2 - Raw Nut Bulk Storage & Warehouse Facility",
    tag: "WAREHOUSE",
    tags: ["UNIT 2", "WAREHOUSE"],
    span: "normal",
  },
  {
    src: "/assets/unit-2/IMG-20250925-WA0045(1).jpg",
    alt: "Unit 2 - Vacuum Packaging & Final Quality Control Hub",
    tag: "PACKAGING",
    tags: ["UNIT 2", "PACKAGING", "SORTING"],
    span: "normal",
  },

  // Leadership Team
  {
    src: "/assets/team/murari.jpeg",
    alt: "Murari Bellala - M.D, CEO",
    tag: "TEAM",
    tags: ["TEAM"],
    span: "tall",
  },
];

const tags = [
  "ALL",
  "UNIT 1",
  "UNIT 2",
  "PEOPLE WORKING",
  "MACHINERY",
  "SORTING",
  "WAREHOUSE",
  "PACKAGING",
  "TEAM",
];

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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="relative w-full border-2 border-primary shadow-[4px_4px_0px_0px_#3B28FF] overflow-hidden group cursor-pointer bg-surface"
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-auto block group-hover:scale-105 transition-transform duration-700 filter contrast-105"
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-400 flex items-center justify-center pointer-events-none z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ZoomIn className="w-12 h-12 text-white" />
        </motion.div>
      </div>
      {/* Tag */}
      <div className="absolute top-3 left-3 font-label-caps text-[10px] bg-vibrant-yellow text-primary px-2.5 py-1 border border-primary z-20 shadow-[2px_2px_0px_0px_#3B28FF]">
        {img.tag}
      </div>
      {/* Title Caption Strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-white font-label-caps text-[11px] px-3 py-2 truncate border-t border-primary/40 z-20 backdrop-blur-xs">
        {img.alt}
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
      className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-6 right-6 text-white border-2 border-white p-2 hover:bg-white hover:text-black transition-colors cursor-pointer z-30"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 md:left-8 text-white border-2 border-white p-3 hover:bg-white hover:text-black transition-colors cursor-pointer z-30"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Image Container */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.25 }}
        className="relative max-w-[90vw] max-h-[82vh] border-4 border-white shadow-2xl overflow-hidden flex flex-col justify-center items-center bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imgs[index].src}
          alt={imgs[index].alt}
          className="max-w-[90vw] max-h-[75vh] w-auto h-auto object-contain block"
        />
        {/* Caption */}
        <div className="w-full bg-primary/95 text-white px-5 py-3 flex justify-between items-center border-t border-white/20">
          <span className="font-body-md text-white text-sm md:text-base truncate mr-4">{imgs[index].alt}</span>
          <span className="font-label-caps text-vibrant-yellow text-xs px-2.5 py-1 border border-vibrant-yellow shrink-0">{imgs[index].tag}</span>
        </div>
      </motion.div>

      {/* Next */}
      <button
        className="absolute right-4 md:right-8 text-white border-2 border-white p-3 hover:bg-white hover:text-black transition-colors cursor-pointer z-30"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-label-caps text-white/70 text-xs tracking-widest bg-black/60 px-3 py-1 border border-white/20">
        {index + 1} / {imgs.length}
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [activeTag, setActiveTag] = useState("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeTag === "ALL"
      ? images
      : images.filter((img) => img.tags?.includes(activeTag) || img.tag === activeTag);

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
      <section className="relative min-h-[440px] flex items-center px-6 md:px-margin-safe max-w-[1440px] mx-auto w-full overflow-hidden pt-[140px] -mt-[72px] md:-mt-[96px]">
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
