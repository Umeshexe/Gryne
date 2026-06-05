import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";

// ─── Article Data ─────────────────────────────────────────────────────────────

const articles: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  img: string;
  body: string[];
  pullQuote: string;
  related: string[];
}> = {
  "understanding-cashew-grades": {
    title: "Understanding Cashew Grades: W180, W240, W320, LWP and Beyond",
    excerpt: "The international grading system defines commercial value for every kernel. Here is what every bulk buyer needs to know.",
    category: "Industry",
    date: "May 22, 2025",
    readTime: "8 min",
    author: "David Chen",
    authorRole: "Chief Quality Officer, Gryne",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCA0QzyHvwRE3lk4qZREnjTGywVrGhNJkr4S4vtYH8hCJCWytPhJdjqi9Q8cjbKXnH8IALGegW4y0yOpXmRMZR1pMfkMMu6rE9Gwy1_9fe-8kThpDhKRMjtgnByu6UbaGb7dgSEQlBxYnh2oDkiCYIpAKrKB3DkqYwHDHv8oSwQ5MQkn6CM3w6FAxfSHGa73MAhAhVefxyAnBgohKnb384tms-llGR7VeUIA-W8fZVPu9Ecd2-rUQBmGYQ0kItnC1DcVMJ0rp0LnBA",
    body: [
      "The cashew grading system is the language of the global trade. When a buyer in Hamburg requests \"W240\", they expect precisely 210–270 whole white kernels per pound. Any deviation is a quality failure, not a negotiation point.",
      "The \"W\" prefix designates Whole White kernels — the highest commercial grade. The number that follows represents the approximate count per pound. Therefore, W180 contains 180 or fewer kernels per pound, making them the largest and most premium. W240 and W320 are the workhorses of the trade, providing the best balance of size, yield, and price.",
      "Beyond whole grades, the market includes Splits (S), Butts (B), Pieces (P), and Large White Pieces (LWP). LWP kernels, despite being broken, command significant demand from confectionery manufacturers and airlines due to their versatility in value-added products.",
      "What buyers rarely discuss openly: the moisture content specification is as critical as the grade. Our facility targets below 5% moisture in all exported lots, verified by Karl Fischer titration. Excess moisture is the primary cause of aflatoxin contamination — the single largest reason for rejections at European ports.",
      "At Gryne, every container is accompanied by a Certificate of Analysis from SGS, covering moisture, aflatoxin B1 levels, Salmonella, and physical defect percentage. This is our standard, not a premium add-on.",
    ],
    pullQuote: "When a buyer requests W240, they expect 210–270 kernels per pound. Any deviation is a quality failure, not a negotiation point.",
    related: ["west-africa-sourcing-story", "iso-22000-what-it-means"],
  },
  "west-africa-sourcing-story": {
    title: "How We Source Directly from West African Farms",
    excerpt: "Our supply chain begins before the harvest. We spend months building relationships with growers.",
    category: "Company",
    date: "May 10, 2025",
    readTime: "6 min",
    author: "Marcus Thorne",
    authorRole: "Global Sourcing Director, Gryne",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7eVl7ofcZnj6wdzA9SEvo3FBkn2nHqP7EtCY4dD-qzVR3wMKYT5IQ-m2_tcdAIGfmwd84MEFHMBLP7jlSYZ58UrgEfF9oWEnHBHmbmb1hgPGZPNV_ZHLtQh6SpgBB5mEyC0xKRYmZQds7U07WiaEXgZTKkhSgCCPqjsnru9giJlrkCKtYIsuhQF3yqdOnkSuIeWyIvtWnkE8m_QO2OVZjiZ9cqlr7whEA_FYvORLBcVV1TEaLyttiLwbNdmP3zmeHxVhiEoOk5cs",
    body: [
      "We visit our source farms twice a year — once before the harvest season to assess crop health, and once during peak production to supervise the primary processing and raw nut selection.",
      "Ivory Coast produces approximately 45% of the world's raw cashew nuts. Guinea-Bissau and Ghana contribute a further 20% combined. Our sourcing team maintains long-term relationships with cooperatives in all three countries, providing advance payments and agronomic support in exchange for first-purchase rights.",
      "The advantage of direct sourcing is traceability. Every lot in our system carries a farm-level origin code. By the time a container reaches Rotterdam, we can trace its contents to a specific cooperative in Yamoussoukro or Bissau.",
    ],
    pullQuote: "Every lot in our system carries a farm-level origin code — traceable to a specific cooperative.",
    related: ["understanding-cashew-grades", "gryne-csr-report-2024"],
  },
  "cashew-sustainability-2025": {
    title: "Cashew Farming & Climate Resilience: A 2025 Perspective",
    excerpt: "Climate change is disrupting harvest cycles. How the industry is adapting.",
    category: "Sustainability",
    date: "Apr 28, 2025",
    readTime: "10 min",
    author: "Elena Rostova",
    authorRole: "Head of Operations, Gryne",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuA1c7rGBNLMdGqTYTSQRIe2-t_dc5ZWv1msqw4IBQHVqotZmjO0c26kDpaWDimEthcqbzijBVT_Ap6Zhd8O6PSCQl2h72L7_qN5FMz5bIxYZGJ6FM7ZPLPXX4gE5LnJ2dt1CMVqBjwQkX1PEtxbhMb5BE8HY-YyvPixgeLKvXcWz2OlTZkAHA3_FiE0e7bh_QgnmPLMkHuoeAvB5IhE0R2SgEM2zQbcm5o3t-aKxoY1d1btvptAXuZnv5qTkZMbolD7UJ9oNP0AQ",
    body: [
      "The 2024 harvest season in West Africa was the most disrupted since 2012. Irregular rainfall patterns pushed flowering cycles two to four weeks earlier than historical averages, compressing the harvest window and reducing overall yields by an estimated 8–12%.",
      "At Gryne, we have responded by diversifying our sourcing geography into Tanzania and Mozambique — countries that are emerging as reliable alternative origins as West African yields become less predictable. We have also established a 90-day inventory buffer for our key clients, insulating them from spot-market volatility.",
      "The longer-term solution is agroforestry. Cashew trees planted alongside nitrogen-fixing legumes show significantly improved resilience to drought stress. We are funding pilot programmes with three cooperatives in Guinea-Bissau to scale this model.",
    ],
    pullQuote: "The 2024 harvest was the most disrupted since 2012. Irregular rainfall compressed the harvest window and reduced yields by 8–12%.",
    related: ["gryne-csr-report-2024", "west-africa-sourcing-story"],
  },
  "cashew-butter-recipe": {
    title: "3 Premium Cashew Butter Recipes for Artisan Food Brands",
    excerpt: "W240 and W320 kernels roast exceptionally well. Production-scale recipes for food manufacturers.",
    category: "Recipes",
    date: "Apr 14, 2025",
    readTime: "5 min",
    author: "David Chen",
    authorRole: "Chief Quality Officer, Gryne",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCA0QzyHvwRE3lk4qZREnjTGywVrGhNJkr4S4vtYH8hCJCWytPhJdjqi9Q8cjbKXnH8IALGegW4y0yOpXmRMZR1pMfkMMu6rE9Gwy1_9fe-8kThpDhKRMjtgnByu6UbaGb7dgSEQlBxYnh2oDkiCYIpAKrKB3DkqYwHDHv8oSwQ5MQkn6CM3w6FAxfSHGa73MAhAhVefxyAnBgohKnb384tms-llGR7VeUIA-W8fZVPu9Ecd2-rUQBmGYQ0kItnC1DcVMJ0rp0LnBA",
    body: [
      "W320 grade kernels, with their medium size and consistent moisture content, are optimal for commercial roasting. At 165°C for 12–14 minutes in a rotating drum roaster, they develop a deep golden colour without burning the thin skin layer.",
      "Classic Smooth: Roast W320 to golden. Cool completely. Process in industrial grinder for 6–8 minutes until fully smooth. Add 0.8% sea salt by weight. No added oils required — cashews release sufficient natural oils at scale.",
      "Dark Roast with Coconut Sugar: Increase roast temperature to 175°C for 15 minutes. Add 4% coconut sugar and 0.5% Maldon flake during final grind. The sugar caramelises slightly in the heat of grinding, creating a distinctive flavour profile that commands a 30–40% retail premium.",
      "White Chocolate Bliss: Begin with W180 kernels (their larger size gives a creamier result). Roast lightly at 155°C for 10 minutes. Blend with 12% cocoa butter and 6% icing sugar. The result is shelf-stable at room temperature for 4 months without preservatives.",
    ],
    pullQuote: "W320 grade kernels release sufficient natural oil during grinding — no added oils required at production scale.",
    related: ["understanding-cashew-grades", "iso-22000-what-it-means"],
  },
  "iso-22000-what-it-means": {
    title: "ISO 22000 Certification: What It Actually Means for Your Supply Chain",
    excerpt: "Certifications are only as good as the processes behind them. We break down what ISO 22000 requires.",
    category: "Industry",
    date: "Mar 30, 2025",
    readTime: "7 min",
    author: "Elena Rostova",
    authorRole: "Head of Operations, Gryne",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuA1c7rGBNLMdGqTYTSQRIe2-t_dc5ZWv1msqw4IBQHVqotZmjO0c26kDpaWDimEthcqbzijBVT_Ap6Zhd8O6PSCQl2h72L7_qN5FMz5bIxYZGJ6FM7ZPLPXX4gE5LnJ2dt1CMVqBjwQkX1PEtxbhMb5BE8HY-YyvPixgeLKvXcWz2OlTZkAHA3_FiE0e7bh_QgnmPLMkHuoeAvB5IhE0R2SgEM2zQbcm5o3t-aKxoY1d1btvptAXuZnv5qTkZMbolD7UJ9oNP0AQ",
    body: [
      "ISO 22000:2018 is the international standard for food safety management systems. Unlike HACCP, which focuses solely on hazard analysis, ISO 22000 integrates HACCP principles with a broader quality management framework aligned to ISO 9001.",
      "For buyers, the certificate confirms that the facility has documented all food safety hazards, established validated critical control points, and undergoes annual third-party audits. It does not, however, guarantee product quality — that is the function of a separate Certificate of Analysis on every shipped lot.",
      "What many buyers overlook: ISO 22000 certification applies to a facility, not to a company. If your supplier processes cashews at multiple sites, ask for site-specific certificates. A central office certification covers administration, not production.",
      "At Gryne, our Kollam processing facility has held ISO 22000:2018 certification continuously since 2019. Our last audit, conducted by Bureau Veritas in March 2025, identified zero major non-conformances.",
    ],
    pullQuote: "ISO 22000 certification applies to a facility, not a company. Always ask for site-specific certificates.",
    related: ["understanding-cashew-grades", "gryne-csr-report-2024"],
  },
  "gryne-csr-report-2024": {
    title: "Gryne CSR Report 2024: Impact Metrics & Next Steps",
    excerpt: "450 kW of solar installed. 1,200 farmers reached. Our full 2024 corporate responsibility review.",
    category: "Sustainability",
    date: "Mar 1, 2025",
    readTime: "12 min",
    author: "Elena Rostova",
    authorRole: "Head of Operations, Gryne",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7eVl7ofcZnj6wdzA9SEvo3FBkn2nHqP7EtCY4dD-qzVR3wMKYT5IQ-m2_tcdAIGfmwd84MEFHMBLP7jlSYZ58UrgEfF9oWEnHBHmbmb1hgPGZPNV_ZHLtQh6SpgBB5mEyC0xKRYmZQds7U07WiaEXgZTKkhSgCCPqjsnru9giJlrkCKtYIsuhQF3yqdOnkSuIeWyIvtWnkE8m_QO2OVZjiZ9cqlr7whEA_FYvORLBcVV1TEaLyttiLwbNdmP3zmeHxVhiEoOk5cs",
    body: [
      "In 2024, Gryne achieved 68% of its electricity consumption from renewable sources, primarily through the 450 kW solar array installed on our Kollam facility roof in Q2. This reduced our Scope 2 emissions by an estimated 420 tonnes of CO2e compared to 2023.",
      "Our farmer outreach programme reached 1,247 smallholders across Ivory Coast and Guinea-Bissau, providing training on integrated pest management, post-harvest handling, and cooperative negotiation skills. Average income for participating farmers increased by 18% year-on-year.",
      "Water consumption per tonne of processed cashew dropped 22% following installation of a closed-loop shell liquid recovery system. Cashew Shell Liquid (CNSL) — a valuable industrial by-product — is now sold to resin manufacturers rather than incinerated.",
      "For 2025, our three priority commitments are: achieve 85% renewable electricity, eliminate single-use plastic from all export packaging, and extend our farmer outreach programme to Tanzania.",
    ],
    pullQuote: "Participating farmers saw average income increase by 18% year-on-year through our direct sourcing model and cooperative training programme.",
    related: ["cashew-sustainability-2025", "west-africa-sourcing-story"],
  },
};

const categoryColors: Record<string, string> = {
  Industry: "bg-electric-blue text-white",
  Sustainability: "bg-primary text-on-primary",
  Recipes: "bg-vibrant-yellow text-primary",
  Company: "bg-secondary text-white",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  const relatedPosts = article.related
    .map((slug) => ({ slug, ...articles[slug] }))
    .filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── 1. Hero Image ── */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src={article.img}
          alt={article.title}
          fill
          className="object-cover filter contrast-110 brightness-75"
          sizes="100vw"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />

        {/* Back link */}
        <Link
          href="/blog"
          className="absolute top-24 left-6 md:left-margin-safe inline-flex items-center gap-2 font-label-caps text-[11px] text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO INSIGHTS
        </Link>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-margin-safe pb-12 max-w-[1440px] mx-auto">
          <div className={`inline-block font-label-caps text-[11px] px-3 py-1 border border-white mb-4 ${categoryColors[article.category] ?? "bg-surface text-primary"}`}>
            {article.category}
          </div>
          <h1 className="font-headline-lg text-[28px] md:text-[48px] leading-tight text-white uppercase max-w-3xl">
            {article.title}
          </h1>
        </div>
      </section>

      {/* ── 2. Meta Bar ── */}
      <div className="bg-primary text-on-primary border-b-4 border-vibrant-yellow w-full">
        <div className="px-6 md:px-margin-safe max-w-[1440px] mx-auto py-4 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-vibrant-yellow border-2 border-white rounded-full flex items-center justify-center text-primary font-bold text-sm">
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="font-button-text text-sm text-white">{article.author}</p>
              <p className="font-label-caps text-[10px] text-white/60">{article.authorRole}</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 font-label-caps text-[11px] text-white/60">
            <Calendar className="w-3 h-3" /> {article.date}
          </span>
          <span className="flex items-center gap-1.5 font-label-caps text-[11px] text-white/60">
            <Clock className="w-3 h-3" /> {article.readTime} read
          </span>
          <span className="flex items-center gap-1.5 font-label-caps text-[11px] text-white/60">
            <BookOpen className="w-3 h-3" /> {article.body.length} sections
          </span>
          <div className="ml-auto">
            <button className="flex items-center gap-2 font-label-caps text-[11px] text-white/60 hover:text-white transition-colors cursor-pointer">
              <Share2 className="w-4 h-4" /> SHARE
            </button>
          </div>
        </div>
      </div>

      {/* ── 3. Article Body ── */}
      <article className="px-6 md:px-margin-safe max-w-[1440px] mx-auto py-16 w-full">
        <div className="max-w-3xl mx-auto">

          {/* Excerpt / lede */}
          <p className="font-body-lg text-body-lg text-on-surface-variant border-l-4 border-electric-blue pl-6 py-3 bg-canvas-cream mb-12 font-semibold">
            {article.excerpt}
          </p>

          {/* Body paragraphs with pull-quote in the middle */}
          {article.body.map((para, i) => (
            <div key={i}>
              <p className="font-body-lg text-body-lg text-on-background mb-6 leading-relaxed">
                {para}
              </p>
              {i === Math.floor(article.body.length / 2) - 1 && (
                <blockquote className="my-12 border-l-8 border-vibrant-yellow pl-8 pr-6 py-6 bg-primary text-on-primary shadow-[6px_6px_0px_0px_#18FF00]">
                  <p className="font-headline-md text-[22px] md:text-[28px] leading-tight text-white uppercase">
                    &ldquo;{article.pullQuote}&rdquo;
                  </p>
                </blockquote>
              )}
            </div>
          ))}

          {/* Tags */}
          <div className="flex items-center gap-3 mt-16 pt-8 border-t-2 border-primary/20">
            <span className="font-label-caps text-label-caps text-primary/40 text-xs">FILED UNDER:</span>
            <span className={`font-label-caps text-[11px] px-3 py-1 border border-primary ${categoryColors[article.category] ?? ""}`}>
              {article.category}
            </span>
          </div>
        </div>
      </article>

      {/* ── 4. Related Posts ── */}
      {relatedPosts.length > 0 && (
        <section className="bg-canvas-cream border-t-4 border-primary w-full">
          <div className="px-6 md:px-margin-safe max-w-[1440px] mx-auto py-16 w-full">
            <p className="font-label-caps text-label-caps text-primary/60 mb-2">CONTINUE READING</p>
            <h2 className="font-headline-md text-[32px] text-primary uppercase mb-10">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group border-2 border-primary shadow-[4px_4px_0px_0px_#3B28FF] bg-surface overflow-hidden flex flex-col hover:shadow-[2px_2px_0px_0px_#3B28FF] transition-all duration-200"
                >
                  <div className="relative h-[180px] overflow-hidden border-b-2 border-primary">
                    <Image
                      src={post.img}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-label-caps text-[10px] text-primary/50 mb-2">{post.category} · {post.date}</p>
                    <h3 className="font-headline-md text-[20px] text-primary uppercase leading-tight group-hover:text-electric-blue transition-colors duration-200">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
