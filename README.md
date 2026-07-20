# Gryne Cashews

Live site: [gryne.in](https://gryne.in)

A bold, high-contrast B2B website built for a premium cashew brand. It started as a set of design layouts exported from Google Stitch, which I migrated to a fully responsive frontend using Next.js (App Router), TypeScript, and Tailwind CSS v4.

The site is built around a custom "maximalist-clean" aesthetic: high-contrast earth tones paired with bright primary accents, zero border-radius (sharp corners on everything), and flat, retro-feeling hard shadows instead of smooth ambient gradients.

---

## Key Features

*   **Tailwind v4 CSS-First Theme:** Instead of using a JavaScript configuration file (`tailwind.config.js`), all custom brand colors, typography variables, spacing tokens, and keyframes are defined directly in `src/app/globals.css` using Tailwind v4's CSS variables system.
*   **Scroll-Linked Journey (Home Page):** As you scroll through "The Ocean Journey" timeline, a cargo ship sails across the screen from Africa to India relative to your scroll depth.
*   **Cursor Parallax Floater (Business Page):** A lightweight client-side tracker that shifts a floating industrial badge dynamically based on cursor movements.
*   **Saturating Grayscale Hover (About Page):** Team portrait cards load in clean grayscale and transition smoothly into full color with a slide-up contact overlay when hovered.
*   **Global Wholesale Inquiry Drawer:** A B2B inquiry form built into a global React context (`InquiryProvider`). Any CTA button across the navigation bar, footer, or individual pages triggers the overlay seamlessly.

---

## Directory Map

```
src/
├── app/
│   ├── page.tsx            # Home (floating badges, stats, scroll timeline)
│   ├── about/
│   │   └── page.tsx        # About Us (timeline steps, team cards, accreditations)
│   ├── business/
│   │   └── page.tsx        # Supply Chain (hero, parallax badge, 4-step pipeline)
│   ├── csr/
│   │   └── page.tsx        # Sustainability (impact pillars, milestone cards)
│   ├── layout.tsx          # Base layout (injects nav, footer, modal context, fonts)
│   └── globals.css         # Tailwind v4 import, theme variables, and custom animations
├── components/
│   ├── ui/
│   │   └── marquee.tsx     # Reusable endless text ticker
│   ├── navbar.tsx          # Responsive navigation bar with active route underlines
│   ├── footer.tsx          # Branded footer with a large background watermark
│   └── wholesale-inquiry-modal.tsx  # Interactive B2B inquiry modal
└── context/
    └── inquiry-context.tsx # Context provider managing wholesale drawer toggle state
```

---

## Tech Stack

*   **Framework:** Next.js (App Router, Turbopack)
*   **Language:** TypeScript (Strict type checks)
*   **Styling:** Tailwind CSS v4.0 & PostCSS
*   **Icons:** Lucide React

---

## Local Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Start the local dev server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Build check
To verify that TypeScript and compilation are clean, run:
```bash
npm run build
```

This compiles all routes (`/`, `/about`, `/business`, `/csr`) perfectly without any errors or warning diagnostics.
