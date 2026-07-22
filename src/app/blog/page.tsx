"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import Marquee from "@/components/ui/marquee";

// ─── Blog Data ────────────────────────────────────────────────────────────────

const posts = [
  {
    slug: "understanding-cashew-grades",
    title: "Understanding Cashew Grades: W180, W240, W320, LWP and Beyond",
    excerpt:
      "Not all cashews are equal. The international grading system defines the commercial value of every kernel. Here's what every bulk buyer needs to know before signing their first FOB contract.",
    category: "Industry",
    date: "May 22, 2025",
    readTime: "8 min",
    featured: true,
    img: "/assets/unit-2/IMG-20250925-WA0045(1).jpg",
  },
  {
    slug: "west-africa-sourcing-story",
    title: "How We Source Directly from West African Farms",
    excerpt:
      "Our supply chain begins before the harvest. We spend months building relationships with growers in Ivory Coast, Ghana, and Guinea-Bissau.",
    category: "Company",
    date: "May 10, 2025",
    readTime: "6 min",
    featured: false,
    img: "/assets/unit-2/IMG-20250925-WA0039.jpg",
  },
  {
    slug: "cashew-sustainability-2025",
    title: "Cashew Farming & Climate Resilience: A 2025 Perspective",
    excerpt:
      "Climate change is disrupting harvest cycles across West Africa. How the industry is adapting — and what buyers should ask their suppliers.",
    category: "Sustainability",
    date: "Apr 28, 2025",
    readTime: "10 min",
    featured: false,
    img: "/assets/unit-1/20260706_173027.jpg",
  },
  {
    slug: "cashew-butter-recipe",
    title: "3 Premium Cashew Butter Recipes for Artisan Food Brands",
    excerpt:
      "W240 and W320 kernels roast exceptionally well. These production-scale recipes are built for food manufacturers sourcing in bulk.",
    category: "Recipes",
    date: "Apr 14, 2025",
    readTime: "5 min",
    featured: false,
    img: "/assets/unit-1/20260706_173347.jpg",
  },
  {
    slug: "iso-22000-what-it-means",
    title: "ISO 22000 Certification: What It Actually Means for Your Supply Chain",
    excerpt:
      "A deep dive into food safety standards, critical control points, and how ISO compliance protects bulk cashew shipments.",
    category: "Quality",
    date: "Apr 2, 2025",
    readTime: "7 min",
    featured: false,
    img: "/assets/unit-2/20260713_171137.jpg",
  },
  {
    slug: "gryne-csr-report-2024",
    title: "Gryne CSR Report 2024: Impact Metrics & Next Steps",
    excerpt:
      "450 kW of solar installed. 1,200 farmers reached. Zero-waste packaging pilots underway. Our full 2024 corporate responsibility review.",
    category: "Sustainability",
    date: "Mar 1, 2025",
    readTime: "12 min",
    featured: false,
    img: "/assets/unit-2/IMG-20250925-WA0039.jpg",
  },
];

const categories = ["All", "Industry", "Sustainability", "Recipes", "Company"];

const categoryColors: Record<string, string> = {
  Industry: "bg-electric-blue text-white",
  Sustainability: "bg-primary text-on-primary",
  Recipes: "bg-vibrant-yellow text-primary",
  Company: "bg-secondary text-white",
};

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({ post, index }: { post: (typeof posts)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6 }}
      className="group border-2 border-primary shadow-[4px_4px_0px_0px_#3B28FF] bg-surface flex flex-col overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-[200px] overflow-hidden border-b-2 border-primary">
        <Image
          src={post.img}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className={`absolute top-3 left-3 font-label-caps text-[10px] px-2 py-1 border border-primary ${categoryColors[post.category] ?? "bg-surface text-primary"}`}>
          {post.category}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-4 mb-3">
          <span className="flex items-center gap-1.5 font-label-caps text-[11px] text-primary/60">
            <Calendar className="w-3 h-3" /> {post.date}
          </span>
          <span className="flex items-center gap-1.5 font-label-caps text-[11px] text-primary/60">
            <Clock className="w-3 h-3" /> {post.readTime} read
          </span>
        </div>

        <h3 className="font-headline-md text-[22px] leading-tight text-primary uppercase mb-3 group-hover:text-electric-blue transition-colors duration-200">
          {post.title}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant flex-1 mb-6">{post.excerpt}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 font-button-text text-button-text text-sm text-primary hover:text-electric-blue transition-colors group/link"
        >
          READ ARTICLE
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = posts[0];
  const filtered =
    activeCategory === "All"
      ? posts.slice(1)
      : posts.slice(1).filter((p) => p.category === activeCategory);

  const featuredRef = useRef<HTMLElement>(null);
  const isFeaturedInView = useInView(featuredRef, { once: true, margin: "-80px" });

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── 1. Hero ── */}
      <section className="relative min-h-[440px] flex items-center px-6 md:px-margin-safe max-w-[1440px] mx-auto w-full overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(46,91,255,0.06),transparent)] pointer-events-none" />
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 font-display-xl text-[200px] text-primary/5 select-none pointer-events-none whitespace-nowrap">
          READ
        </div>

        <motion.div
          className="relative z-10"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="inline-block font-label-caps text-label-caps bg-electric-blue text-white px-3 py-1 border-2 border-primary mb-6 shadow-[2px_2px_0px_0px_#3B28FF]"
          >
            KNOWLEDGE HUB
          </motion.div>

          {["INSIGHTS", "&", "REPORTS."].map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                className={`font-display-xl text-[64px] leading-[60px] md:text-[120px] md:leading-[108px] uppercase block ${word === "&" ? "text-electric-blue" : "text-primary"}`}
                variants={{ hidden: { opacity: 0, y: 40, rotateX: -60 }, visible: { opacity: 1, y: 0, rotateX: 0 } }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ perspective: 800 }}
              >
                {word}
              </motion.h1>
            </div>
          ))}

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mt-6 border-l-4 border-primary pl-6 py-2"
          >
            Industry analysis, sustainability reports, recipes and company updates — straight from the source.
          </motion.p>
        </motion.div>
      </section>

      {/* ── 2. Marquee ── */}
      <Marquee items={["INDUSTRY NEWS", "SUSTAINABILITY REPORTS", "SOURCING GUIDES", "COMPANY UPDATES"]} />

      {/* ── 3. Featured Post ── */}
      <motion.section
        ref={featuredRef}
        initial={{ opacity: 0, y: 60 }}
        animate={isFeaturedInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="px-6 md:px-margin-safe max-w-[1440px] mx-auto py-16 w-full"
      >
        <p className="font-label-caps text-label-caps text-primary/60 mb-6">FEATURED ARTICLE</p>
        <Link href={`/blog/${featured.slug}`} className="group block">
          <div className="grid grid-cols-1 lg:grid-cols-2 border-4 border-primary shadow-[8px_8px_0px_0px_#3B28FF] overflow-hidden">
            {/* Image */}
            <div className="relative h-[320px] lg:h-full min-h-[320px] border-b-4 lg:border-b-0 lg:border-r-4 border-primary overflow-hidden">
              <Image
                src={featured.img}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-300" />
              <div className={`absolute top-4 left-4 font-label-caps text-[11px] px-3 py-1.5 border-2 border-primary ${categoryColors[featured.category]}`}>
                {featured.category}
              </div>
            </div>

            {/* Content */}
            <div className="bg-canvas-cream p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center gap-1.5 font-label-caps text-[11px] text-primary/60">
                    <Calendar className="w-3 h-3" /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5 font-label-caps text-[11px] text-primary/60">
                    <Clock className="w-3 h-3" /> {featured.readTime} read
                  </span>
                </div>
                <h2 className="font-headline-lg text-[32px] md:text-[40px] leading-tight text-primary uppercase mb-6 group-hover:text-electric-blue transition-colors duration-200">
                  {featured.title}
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">{featured.excerpt}</p>
              </div>
              <div className="inline-flex items-center gap-2 font-button-text text-button-text text-primary border-2 border-primary px-6 py-3 w-fit shadow-[4px_4px_0px_0px_#18FF00] hover:bg-primary hover:text-on-primary transition-all duration-200 group-hover:shadow-[2px_2px_0px_0px_#18FF00]">
                READ FULL ARTICLE <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </div>
        </Link>
      </motion.section>

      {/* ── 4. Filter + Grid ── */}
      <section className="px-6 md:px-margin-safe max-w-[1440px] mx-auto pb-section-gap w-full">
        {/* Filter Tabs */}
        <div className="flex items-center gap-3 mb-10 flex-wrap">
          <Tag className="w-4 h-4 text-primary/50" />
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
              className={`font-label-caps text-label-caps text-xs px-4 py-2 border-2 border-primary cursor-pointer transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-on-primary shadow-[3px_3px_0px_0px_#18FF00]"
                  : "bg-surface text-primary hover:bg-primary/10 shadow-[3px_3px_0px_0px_#3B28FF]"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter"
          >
            {filtered.length > 0 ? (
              filtered.map((post, i) => <PostCard key={post.slug} post={post} index={i} />)
            ) : (
              <div className="col-span-3 py-20 text-center">
                <p className="font-headline-md text-[28px] text-primary/30 uppercase">No articles yet</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
