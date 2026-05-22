---
name: Gryne Earth & Energy
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0edec'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#414944'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#717974'
  outline-variant: '#c0c8c3'
  surface-tint: '#3b6756'
  primary: '#00261a'
  on-primary: '#ffffff'
  primary-container: '#0f3d2e'
  on-primary-container: '#7ba894'
  inverse-primary: '#a2d1bb'
  secondary: '#705b42'
  on-secondary: '#ffffff'
  secondary-container: '#fbdebe'
  on-secondary-container: '#766148'
  tertiary: '#3d1300'
  on-tertiary: '#ffffff'
  tertiary-container: '#5f2300'
  on-tertiary-container: '#f77b3a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#beedd7'
  primary-fixed-dim: '#a2d1bb'
  on-primary-fixed: '#002116'
  on-primary-fixed-variant: '#234f3f'
  secondary-fixed: '#fbdebe'
  secondary-fixed-dim: '#dec2a4'
  on-secondary-fixed: '#271906'
  on-secondary-fixed-variant: '#57432c'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb694'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
  electric-blue: '#2E5BFF'
  vibrant-yellow: '#FFD600'
  canvas-cream: '#F9F6F0'
typography:
  display-xl:
    fontFamily: Anton
    fontSize: 120px
    fontWeight: '400'
    lineHeight: 110px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Anton
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 72px
    letterSpacing: 0.01em
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 52px
  headline-md:
    fontFamily: Anton
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.1em
  button-text:
    fontFamily: Anton
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.05em
spacing:
  unit: 8px
  gutter: 24px
  margin-safe: 40px
  section-gap: 120px
---

## Brand & Style

The design system for Gryne embodies a **High-Contrast / Bold** aesthetic that fuses the raw, organic beauty of the cashew supply chain with a high-energy, premium editorial feel. It is a "Maximalist-Clean" approach: every element is intentional and loud, yet organized within a strict grid.

The brand personality is **Energetic, Authentic, and Global**. It avoids the quiet, muted tones typically associated with "natural" products, opting instead for a vibrant visual language that celebrates the journey from African soil to Indian craftsmanship. 

**Visual Principles:**
- **Dynamic Color Blocking:** Large, saturated sections of color create an immediate impact and delineate content.
- **Aggressive Typography:** Type is treated as a graphic element, often oversized and layered.
- **Kinetic Energy:** Motion is not an afterthought; it mimics the harvest and flow of the supply chain through parallax cashew "floaters" and high-motion entrance animations.

## Colors

The palette is rooted in the "Deep Earth" of the orchards but electrified with high-vibrancy accents.

- **Primary (Deep Green):** Represents the lush cashew foliage. Used for heavy backgrounds and primary containers.
- **Secondary (Cashew Cream):** A warm, toasted neutral used to soften the high-contrast blocks and provide a premium "canvas" feel.
- **Tertiary (Sun-Baked Orange):** An energetic, earthy hue inspired by the soils of West Africa.
- **Electric Blue / Vibrant Yellow:** These are "Action Accents." They are used sparingly but boldly for CTAs, labels, and motion triggers to create the "La Boca" energy.

**Color Usage:**
Always pair high-contrast tones. For example, use **Electric Blue** text on **Deep Green** backgrounds, or **Sun-Baked Orange** on **Cashew Cream**. Avoid subtle transitions; stick to hard-edged color blocking.

## Typography

The typography system relies on a "Thick-and-Thin" hierarchy. 

- **Display & Headlines (Anton):** A condensed, heavy sans-serif that demands attention. Headlines should often be set in all-caps. Use dramatic text-shadows (hard, non-blurred) to create a 3D "sticker" effect.
- **Body Text (Hanken Grotesk):** A refined, contemporary sans-serif that provides professional balance to the loud headlines. It ensures readability for supply chain stories and product details.
- **Labels (Space Mono):** Used for technical data, cashew grades, or origin coordinates. It adds a "Global Trade" and slightly technical utility feel to the premium aesthetic.

## Layout & Spacing

This design system uses a **Fixed Grid** model for desktop and a **Fluid** model for mobile.

- **Grid:** 12-column grid with generous 24px gutters. Elements should "snap" to the grid but can occasionally break it (offsetting by 20-30px) to create a sense of motion.
- **Rhythm:** Vertical spacing is extreme. Large gaps (120px+) between sections allow the bold typography and "floating" cashew assets room to breathe.
- **Mobile Adaptation:** At the 768px breakpoint, the layout collapses into a single-column flow, but margins remain wide (32px) to maintain the premium feel. Headlines should scale aggressively using the `headline-lg-mobile` token.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layers** and **Hard Shadows** rather than soft blurs.

- **Hard 3D Shadows:** Instead of ambient light shadows, use solid color offsets (e.g., a black or deep green block shifted 4px right and 4px down behind a button or card).
- **Parallax Layering:** Cashews and product elements occupy a "Z-space" above the content. As the user scrolls, these elements move at different speeds (0.2x to 0.5x scroll speed) to simulate depth.
- **The "Sticker" Effect:** Elements like badges or "Origin Tags" should have a thin (2px) solid border, making them look like they are physically applied to the color blocks.

## Shapes

The shape language is **Sharp (0)**. In a "La Boca" inspired maximalist style, sharp corners convey a bold, modern, and architectural feeling. 

- **Containers:** All primary color blocks and cards use 0px border-radius.
- **Buttons:** Rectangular with sharp 90-degree corners.
- **Organic Exceptions:** The only rounded shapes allowed are the cashew product photography and circular "Seal of Quality" badges which rotate on scroll. All UI-functional containers must remain sharp.

## Components

- **Buttons:** Sharp-edged rectangles with a heavy 2px border. On hover, the button should "fill" with a high-vibrancy color (Electric Blue or Sun-Baked Orange) and the text should shift slightly.
- **Chips / Origin Tags:** Use the **Space Mono** label font. Backgrounds should be high-contrast (e.g., Yellow on Black).
- **Cards:** Simple, un-shadowed containers defined by their border or background color block. Use the "Hard Shadow" technique for featured product cards.
- **Input Fields:** Bottom-border only (2px thick). Labels use **Space Mono** and sit above the field. Focus state changes the border color to **Electric Blue**.
- **Floating Assets:** Component-level cashew elements that enter the viewport with a "float" animation (slight Y-axis oscillation).
- **Marquee:** A scrolling text component using **Anton** for "Fresh From Origin" or "Premium Grade" callouts, moving horizontally at a constant speed.