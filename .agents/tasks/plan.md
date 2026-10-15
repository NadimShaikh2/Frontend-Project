# Implementation Plan — FK Tiles Work UI

Build the remaining marketing-site UI for a Next.js 14 App Router project (JavaScript, NOT TypeScript). The scaffold already exists and MUST NOT be recreated: `package.json`, `jsconfig.json` (`@/*` → project root), `next.config.mjs` (next/image allows only `images.unsplash.com` + `plus.unsplash.com`), `tailwind.config.js`, `postcss.config.mjs`, `app/globals.css`, `app/layout.js` (renders `{children}` in `<body>`, loads Inter + Plus Jakarta Sans font vars), `lib/site.js`, `components/ui/Reveal.js`, `components/ui/SectionHeading.js`.

## Conventions every new file MUST follow (read these before writing any code)

- Imports use the `@/...` alias (e.g. `import { site, waLink, telLink, navLinks, trustBadges } from "@/lib/site"`). Never hardcode phone, WhatsApp, email, nav links, or trust-badge data — import from `lib/site.js`.
  - `site` fields available: `name, domain, tagline, phoneDisplay, phoneRaw, whatsappRaw, email, address, hours[] ({day,time}), socials{facebook,instagram,youtube,linkedin}`.
  - Helpers: `waLink(message)` → `https://wa.me/...?text=...`; `telLink()` → `tel:...`.
  - `navLinks[]` = Home/About Us/Services/Materials/Gallery/Estimator/Testimonials/Contact with `#` hrefs. `trustBadges[]` = `{value,label}` ×4.
- Reuse `globals.css` component classes rather than re-deriving styles: `.container-xl`, `.heading-gradient`, `.btn`, `.btn-gold`, `.btn-outline`, `.btn-ghost`, `.eyebrow`, `.section-title`, `.card-surface`, `.input-field`, `.text-balance`, `.mask-fade-b`.
- Reuse Tailwind theme tokens: colors `charcoal`/`navy`/`gold`/`bronze` (with scales), fonts `font-heading`/`font-body`, backgrounds `bg-marble-light`/`bg-gold-gradient`/`bg-dark-gradient`, shadows `shadow-luxe`/`shadow-gold-glow`, animations `animate-shimmer`/`animate-float`.
- Reuse `components/ui/Reveal.js`: default export `Reveal` (props `children, delay, y, className, once`) plus named exports `staggerContainer`, `staggerItem` (Framer Motion variants). Use `Reveal` for scroll-in reveals; use the stagger variants with `motion.div`/`motion.ul` for grids/lists.
- Reuse `components/ui/SectionHeading.js`: props `eyebrow, title, highlight, subtitle, align` ("center"|"left"). It already wraps itself in `Reveal`. Use it for every section heading instead of hand-rolling h2 markup.
- Icons: `lucide-react` (already a dependency). Framer Motion is `framer-motion` (already a dependency).
- Section wrappers: each section is a `<section id="...">` with vertical padding (`py-20 sm:py-28`) and an inner `.container-xl`. The `#` ids must exactly match `navLinks` hrefs and the required ids below so smooth-scroll anchors work (`globals.css` sets `scroll-padding-top: 88px`).
- `"use client"` is required only in files using hooks (`useState`/`useEffect`/`useRef`), event handlers, or browser APIs. Pure-presentational sections stay server components. `Reveal`/`SectionHeading` are already client components, so importing them does NOT force the parent to be client.
- Dark theme is the baseline (body is `bg-charcoal-950 text-charcoal-100`). Text on dark uses `text-white`, `text-white/70`, `text-white/60`, etc., matching existing files.
- Responsive: mobile-first. Default single column; `sm:` ~640px, `md:` ~768px, `lg:` ~1024px for multi-column grids. Nav switches desktop↔mobile at `lg`.

## Decisions (made here; implementer must not re-decide)

- Images: use CSS gradients / `bg-*` tokens for stone/marble swatches rather than `next/image`, so no remote fetches are needed and the build never depends on network. Where photographic placeholders read better (Hero visual, Gallery), use plain `<div>` blocks with gradient + `animate-float`/`mask-fade-b` instead of `next/image`. This avoids the `next.config.mjs` remote-host constraint entirely and keeps `npm run build` deterministic offline. (If `next/image` is used anywhere, the `src` host MUST be `images.unsplash.com` or `plus.unsplash.com` — but the plan's default is gradients, no `next/image`.)
- Local content data (service list, materials, testimonials, gallery items, process steps, estimator rates) lives inline in each component as module-level `const` arrays. `lib/site.js` holds only cross-cutting business/contact data, so section-specific arrays belong with their section — consistent with the existing split.
- All interactive state is local `useState`; no global store, no data fetching.

---

- [ ] 1. Create `components/ui/WhatsAppFab.js` — floating WhatsApp button fixed bottom-right.
      Client component (`"use client"`) using Framer Motion for a subtle entrance/float. Renders an `<a href={waLink()}>` (import `waLink` from `@/lib/site`), `target="_blank" rel="noopener noreferrer"`, `aria-label="Chat on WhatsApp"`, lucide `MessageCircle` icon, round gold button (`fixed bottom-6 right-6 z-50`, `bg-gold-gradient` or green, `shadow-gold-glow`, `animate-float`). Size ~`h-14 w-14`, scales up on `sm`.
      Files: `components/ui/WhatsAppFab.js`
      Verify: covered by the final production build in step 14 (component is imported by `app/page.js`).

- [ ] 2. Create `components/sections/Header.js` — sticky top navigation with scroll-blur.
      Client component (`"use client"`; uses `useState` for mobile menu + scrolled flag, `useEffect` to attach a `scroll` listener setting a `scrolled` boolean past ~16px). Logo = `site.name` text next to a geometric tile icon (lucide `Grid3x3` or `LayoutGrid` inside a gold-gradient rounded square). Desktop nav (`hidden lg:flex`) maps `navLinks` to anchor links. Action buttons: "Call Now" (`<a href={telLink()}>` lucide `Phone`, `.btn-ghost`), "WhatsApp Quote" (`<a href={waLink()}>` lucide `MessageCircle`, `.btn-outline`), "Get Free Estimate" (`<a href="#estimator">` `.btn-gold`). Mobile hamburger (lucide `Menu`/`X`, `lg:hidden`) toggles a full-overlay panel (`fixed inset-0`) listing `navLinks` + the three actions; selecting a link closes the menu. Header is `fixed top-0 inset-x-0 z-40`; when `scrolled`, add `backdrop-blur` + `bg-charcoal-950/80` + border-bottom, else transparent. Inner uses `.container-xl`, height ~`h-20` (matches 88px scroll-padding). Import `site, navLinks, waLink, telLink` from `@/lib/site`.
      Files: `components/sections/Header.js`
      Verify: covered by the final production build in step 14.

- [ ] 3. Create `components/sections/Hero.js` — `id="home"` hero.
      May be a server component (no hooks) using `Reveal` for staged reveals; if any entrance needs motion variants beyond `Reveal`, add `"use client"`. Full-height-ish section (`min-h-screen` or `pt-32 pb-20`) over `bg-dark-gradient` with a `bg-marble-light` overlay accent. Content: `.eyebrow` (e.g. "Premium Tiles & Granite"), H1 EXACT headline "Crafting Elegance with Precision Tiles & Granite Fitting" (use `.section-title`-scale heading / `font-heading`, with `.heading-gradient` on "Tiles & Granite" or similar highlight, `.text-balance`), EXACT sub-headline "Expert installation, polishing, and custom stone craftsmanship for residential & commercial spaces." Dual CTAs: "View Our Work" (`<a href="#gallery">` `.btn-gold`) and "Request a Quote" (`<a href="#contact">` `.btn-outline`). Trust badges row: map `trustBadges` → `{value}` in `.heading-gradient` big number + `{label}` beneath, 2-col grid on mobile / 4-col `sm:`. Right/float visual: a gradient "stone slab" `<div>` with `animate-float`, `shadow-luxe`, rounded, layered gold accents (no `next/image`). Two-column `lg:grid-cols-2`, single column stacked on mobile. Import `trustBadges` from `@/lib/site`.
      Files: `components/sections/Hero.js`
      Verify: covered by the final production build in step 14.

- [ ] 4. Create `components/sections/About.js` — `id="about"`.
      Server component with `Reveal`. `SectionHeading` (eyebrow "About Us", title + `highlight`, subtitle = the FK Tiles Work story about dedication to quality finishing, laser-level alignment, zero-defect installation). Below: a highlights grid (`grid sm:grid-cols-2 lg:grid-cols-4 gap-5`) of `.card-surface` cards, module-level `const highlights` array of `{icon, title, desc}` covering Quality Tools, Certified Craftsmen, Water-Resistant Grouting, Dust-Free Cutting. Icons from lucide (e.g. `Wrench`, `BadgeCheck`, `Droplets`, `Wind`) rendered in a gold-tinted rounded badge. Optionally a short two-paragraph story block beside a stat/visual. Use `staggerContainer`/`staggerItem` for the grid.
      Files: `components/sections/About.js`
      Verify: covered by the final production build in step 14.

- [ ] 5. Create `components/sections/Services.js` — `id="services"`, interactive.
      Client component (`"use client"`, `useState` for active tab/card). `SectionHeading` (eyebrow "Services"). Module-level `const services` array of 6 objects `{id, title, desc, icon, points[]}`: Floor & Wall Tiling (Ceramic, Vitrified, large-format GVT/PGVT); Granite Kitchen Countertop & Island Fabrication (edge profiling, sink cutout, seamless joints); Marble & Granite Staircase Work (molding, anti-slip grooving, full-bullnose); Bathroom & Wet-Area Waterproof Tiling (shower enclosures, anti-skid floor); Elevation & Exterior Cladding (weather-proof/rustic exterior); Diamond Mirror Polishing & Granite Re-polishing. lucide icons (e.g. `LayoutGrid`, `ChefHat`, `Footprints`/`Stairs`-alt, `ShowerHead`, `Building2`, `Sparkles`). Interaction: a row of tab buttons (horizontally scrollable on mobile, `flex-wrap` on `lg`) that selects which service's detail panel shows (title, desc, bulleted `points` with lucide `Check`), using Framer Motion `AnimatePresence`/opacity transition on panel change. Active tab styled with `bg-gold-gradient`/gold border; inactive `.btn-ghost`-like. Also render all 6 as `.card-surface` cards in a grid as the fallback/overview so content is scannable. Hover lift via `transition`/`hover:` classes.
      Files: `components/sections/Services.js`
      Verify: covered by the final production build in step 14.

- [ ] 6. Create `components/sections/Materials.js` — `id="materials"`, filterable grid.
      Client component (`"use client"`, `useState` for active filter). `SectionHeading` (eyebrow "Materials & Catalog"). Module-level `const materials` array of >= 12 items `{name, category, finish, swatch, useCase}` where `category` ∈ {Granite, Vitrified Tiles, Marble, Elevation Tiles, Quartz}, `finish` ∈ {Glossy, Matt, Satin, Rustic}, `swatch` = a Tailwind gradient className string (e.g. Black Galaxy → dark + gold speckle gradient; Tan Brown, Jet Black, Kashmir White, plus porcelain slabs and designer bathroom tiles). Filter bar: buttons "All" + each category; clicking sets filter and the grid shows matching items (`materials.filter(...)`). Grid `grid sm:grid-cols-2 lg:grid-cols-4 gap-5`; each item is a `.card-surface` with a CSS-gradient swatch block (the `swatch` className, aspect-square, no `next/image`), name, `finish` tag, and best `useCase` tag (small gold pill). Animate filter changes with Framer Motion `layout`/`AnimatePresence`. Decision: swatches are pure CSS gradients so no remote images and the build is network-independent.
      Files: `components/sections/Materials.js`
      Verify: covered by the final production build in step 14.

- [ ] 7. Create `components/sections/Estimator.js` — `id="estimator"`, live INR calculator.
      Client component (`"use client"`, `useState` for inputs). `SectionHeading` (eyebrow "Cost Estimator"). Inputs in a `.card-surface` form: Area Type `<select>` (Flooring, Kitchen Top, Bathroom, Stairs, Cladding), Area quantity `<input type="number">` labeled Sq. Ft. / Running Ft. (label text adapts: Stairs/Kitchen Top use Running Ft.), Material preference `<select>` (Tiles, Granite, Marble) — all using `.input-field`. Module-level `const rates` mapping material → `{material: [low,high] perUnit, labor: [low,high] perUnit}` (plain INR numbers; document them as indicative). Compute live (no submit button) an estimated material + labor range: `low = qty * (matLow + laborLow)`, `high = qty * (matHigh + laborHigh)`; format with `toLocaleString("en-IN")` and ₹ prefix; guard non-positive/NaN qty (show a hint instead of NaN). Output panel shows the material range, labor range, and total range, plus a "Book Free Site Measurement" button → `<a href={waLink("I'd like to book a free site measurement. Details: ...")}>` `.btn-gold`. Two-column `lg:grid-cols-2` (form | result), stacked on mobile. Import `waLink` from `@/lib/site`.
      Files: `components/sections/Estimator.js`
      Verify: covered by the final production build in step 14.

- [ ] 8. Create `components/sections/Gallery.js` — `id="gallery"`, category filter + before/after slider.
      Client component (`"use client"`, `useState` for active category and for each before/after slider position). `SectionHeading` (eyebrow "Project Gallery"). Category filter buttons: All, Living Rooms, Modern Kitchens, Luxury Bathrooms, Stairs & Facades. Module-level `const projects` array `{title, category, before (gradient className), after (gradient className)}`. Filtered grid of project cards (`grid sm:grid-cols-2 lg:grid-cols-3`). Each card is a before/after comparison: two stacked gradient `<div>` layers (no `next/image`) with a draggable/range `<input type="range">` controlling a clip-width overlay so dragging reveals "after" over "before"; label "Before"/"After" pills. Keep the slider implementation self-contained per card via a small inner component holding its own `useState`. Animate category changes with `AnimatePresence`/`layout`.
      Files: `components/sections/Gallery.js`
      Verify: covered by the final production build in step 14.

- [ ] 9. Create `components/sections/Process.js` — `id="process"`, 4-step timeline.
      Server component with `Reveal` + stagger variants. `SectionHeading` (eyebrow "How We Work"). Module-level `const steps` of 4 `{n, title, desc, icon}`: 1 Free Consultation & Site Visit; 2 Material Selection & Exact Quotation; 3 Precision Fitting & Leveling; 4 Final Cleaning, Polishing & Handover. lucide icons (e.g. `PhoneCall`, `ClipboardList`, `Ruler`, `Sparkles`). Layout: horizontal timeline on `lg` (`grid lg:grid-cols-4`) with a connecting line/number badges in `bg-gold-gradient` circles; vertical stacked on mobile. Each step a `.card-surface` with big gold step number, icon, title, desc.
      Files: `components/sections/Process.js`
      Verify: covered by the final production build in step 14.

- [ ] 10. Create `components/sections/Testimonials.js` — `id="testimonials"`, carousel, >= 6 reviews.
      Client component (`"use client"`, `useState` for active slide index; optional `useEffect` auto-advance interval cleared on unmount). `SectionHeading` (eyebrow "Testimonials"). Module-level `const reviews` array of >= 6 `{name, role, rating (1–5), text, badge}` where `role`/`badge` cover Homeowners, Builders, Architects and include "Verified Project". Carousel: show 1 card on mobile / up to 3 on `lg`; prev/next buttons (lucide `ChevronLeft`/`ChevronRight`) and dot indicators update the index; Framer Motion slide/opacity transition. Each card `.card-surface`: lucide `Star` row filled per `rating` (gold), quote text, name, role, and a gold "Verified Project" pill (lucide `BadgeCheck`).
      Files: `components/sections/Testimonials.js`
      Verify: covered by the final production build in step 14.

- [ ] 11. Create `components/sections/Contact.js` — `id="contact"`, lead form → WhatsApp + info card + map placeholder.
      Client component (`"use client"`, `useState` for form fields `{name, phone, city, workType, message}`). `SectionHeading` (eyebrow "Contact", align may be "left"). Left column: `.card-surface` form with `.input-field` controls — Name, Phone Number, Location/City, Work Type `<select>` (reuse the service names), Message `<textarea>`. On submit (`onSubmit`, `preventDefault`), build a WhatsApp message string from the fields and `window.open(waLink(message), "_blank")` (or set `href`); submit button `.btn-gold` with lucide `Send`. Basic required-field handling. Right column: info `.card-surface` listing phone (`telLink()` link, lucide `Phone`), email (`mailto:` link, lucide `Mail`), address (lucide `MapPin`), working hours from `site.hours` (lucide `Clock`), and a "Chat on WhatsApp" `.btn-outline` → `waLink()`; plus a Google Map placeholder (a `.card-surface` gradient block with lucide `MapPin` and label — NOT an external iframe, to keep the build offline/deterministic). Two-column `lg:grid-cols-2`. Import `site, waLink, telLink` from `@/lib/site`.
      Files: `components/sections/Contact.js`
      Verify: covered by the final production build in step 14.

- [ ] 12. Create `components/sections/Footer.js` — brand, quick links, services, service areas, socials, copyright.
      Server component (no hooks). Over `bg-charcoal-950`/`bg-dark-gradient` with top border. Columns (`grid sm:grid-cols-2 lg:grid-cols-4 gap-10` inside `.container-xl`): (1) Brand — logo mark + `site.name`, short blurb, `site.tagline`; (2) Quick Links — map a subset of `navLinks`; (3) Services — reuse the 6 service titles (module-level `const` list here, or short labels); (4) Service Areas — module-level `const areas` list of city/area names, plus socials row (lucide `Facebook`, `Instagram`, `Youtube`, `Linkedin`) linking to `site.socials.*`. Bottom bar: disclaimer line + copyright `© {new Date().getFullYear()} {site.name}. All rights reserved.` referencing `site.domain`. Import `site, navLinks` from `@/lib/site`.
      Files: `components/sections/Footer.js`
      Verify: covered by the final production build in step 14.

- [ ] 13. Create `app/page.js` — assemble the page in exact order.
      Server component. Import and render, in this order: `Header`, then `<main>` containing `Hero, About, Process, Services, Materials, Estimator, Gallery, Testimonials, Contact`, then `Footer`, then `WhatsAppFab`. Use `@/components/...` imports. No `"use client"` here (children that need it declare it themselves). This is the last file because it depends on all of steps 1–12 existing.
      Files: `app/page.js`
      Verify: covered by the final production build in step 14.

- [ ] 14. Verify with a production build (final gate).
      Run in `c:\Users\Shaikh Nadim\OneDrive\Desktop\FK tiles work` using PowerShell, as SEPARATE commands (PowerShell does NOT support `&&`): first `npm install`, then `npm run build`. The build MUST complete with no errors (no missing-module errors, no `"use client"`/hook violations, no unescaped-entity or server/client boundary errors). Do NOT run `npm run dev`. If the build reports errors, fix the offending component(s) and re-run `npm run build` until it passes.
      Files: none (verification only)
      Verify: `npm install` then `npm run build` both exit 0 and `npm run build` prints a successful "Compiled successfully" / route summary with no errors.

## Implementation status (iteration 1 — complete)

All 13 files created and the final build gate passed:
- `components/ui/WhatsAppFab.js`, `components/sections/{Header,Hero,About,Services,Materials,Estimator,Gallery,Process,Testimonials,Contact,Footer}.js`, `app/page.js`.
- All reuse `lib/site.js` helpers, `Reveal`/`SectionHeading`, and `globals.css` component classes. Imagery is CSS-gradient based (no `next/image`, network-independent). Interactive sections are `"use client"`.

Verification (PowerShell, in project root, run as separate commands):
1. `npm install` → exit 0 (deps already present, "up to date").
2. `npm run build` → first run failed with a stale-cache `PageNotFoundError: /_error` (leftover `.next` from a prior dev session). Removed `.next` and re-ran.
3. `npm run build` (after clearing `.next`) → exit 0, "Compiled successfully", lint/type-check passed, 4/4 static pages generated. Routes: `/` (52.8 kB) and `/_not-found`, both prerendered static. No errors.

`npm run dev` was NOT run. Changes left in the working tree.

## Notes / assumptions

- Estimator rates are indicative placeholders (plain INR numbers); the business can tune them later. They are labeled as estimates in the UI.
- Map is a styled placeholder, not a live Google Maps embed, to keep the build deterministic and offline — matches the "Google Map placeholder" wording in the request.
- All imagery is CSS-gradient based (stone/marble/granite swatches) to satisfy the premium aesthetic without depending on the two allowed remote hosts; if a real photo is ever wanted, `next/image` must use only `images.unsplash.com` / `plus.unsplash.com` per `next.config.mjs`.
- The implement-and-review loop stops when `.agents/tasks/review.json` has top-level `"verdict": "APPROVED"`, written by the reviewer as the loop's last step.
