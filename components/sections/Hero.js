"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Reveal, { staggerContainer, staggerItem } from "@/components/ui/Reveal";
import { trustBadges } from "@/lib/site";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-dark-gradient pb-20 pt-32 sm:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-marble-light opacity-[0.08]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-navy/40 blur-3xl" aria-hidden="true" />

      <div className="container-xl relative grid items-center gap-14 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-7">
          <Reveal className="w-full">
            <div className="flex w-full items-center gap-5 rounded-2xl border border-gold-400/25 bg-white/[0.03] px-6 py-5 shadow-luxe backdrop-blur-sm sm:gap-6 sm:px-8 sm:py-6">
              <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-charcoal-900 ring-1 ring-gold-400/40 shadow-gold-glow sm:h-[72px] sm:w-[72px]">
                <svg viewBox="0 0 48 48" className="h-16 w-16 sm:h-[72px] sm:w-[72px]" aria-hidden="true">
                  <defs>
                    <linearGradient id="heroFkGold" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ecd9ad" />
                      <stop offset="45%" stopColor="#c7a263" />
                      <stop offset="100%" stopColor="#9a7037" />
                    </linearGradient>
                  </defs>
                  <g fill="none" stroke="url(#heroFkGold)" strokeWidth="1.6" opacity="0.9">
                    <rect x="8" y="8" width="14" height="14" rx="2.5" />
                    <rect x="26" y="8" width="14" height="14" rx="2.5" opacity="0.55" />
                    <rect x="8" y="26" width="14" height="14" rx="2.5" opacity="0.55" />
                    <rect x="26" y="26" width="14" height="14" rx="2.5" />
                  </g>
                  <text
                    x="24"
                    y="30"
                    textAnchor="middle"
                    fontFamily="var(--font-jakarta), sans-serif"
                    fontSize="15"
                    fontWeight="800"
                    fill="url(#heroFkGold)"
                    letterSpacing="-0.5"
                  >
                    FK
                  </text>
                </svg>
              </span>
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <span className="font-heading text-2xl font-extrabold leading-tight tracking-tight sm:text-[2rem]">
                  <span className="heading-gradient">FK</span>{" "}
                  <span className="text-white">Tiles Work</span>
                </span>
                <span className="mt-2 flex items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-gold-300/90 sm:text-[0.68rem]">
                  Premium Tiles &amp; Granite
                  <span className="hidden h-px flex-1 bg-gradient-to-r from-gold-400/50 to-transparent sm:block" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              Premium Tiles &amp; Granite Craftsmanship
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-heading text-4xl font-extrabold leading-[1.08] text-white text-balance sm:text-5xl md:text-6xl">
              Crafting Elegance with Precision{" "}
              <span className="heading-gradient">Tiles &amp; Granite Fitting</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="max-w-xl text-lg leading-relaxed text-white/70">
              Expert installation, polishing, and custom stone craftsmanship for
              residential &amp; commercial spaces.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#gallery" className="btn-outline">
                View Our Work
              </a>
              <a href="#contact" className="btn-gold">
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-4 grid w-full grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {trustBadges.map((badge) => (
              <motion.li
                key={badge.label}
                variants={staggerItem}
                className="card-surface flex flex-col items-start gap-1 px-4 py-4"
              >
                <span className="heading-gradient font-heading text-2xl font-extrabold sm:text-3xl">
                  {badge.value}
                </span>
                <span className="text-xs font-medium leading-snug text-white/60">
                  {badge.label}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <Reveal delay={0.2} y={40}>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-luxe ring-1 ring-gold-400/20"
            >
              <Image
                src="https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1600&q=80"
                alt="Luxury modern kitchen with polished granite countertop and stone finishes"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,12,16,0.75),transparent_55%)]" aria-hidden="true" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,217,173,0.18),transparent_55%)]" aria-hidden="true" />
            </motion.div>
            <div className="absolute -bottom-5 -left-5 card-surface hidden items-center gap-3 px-5 py-4 shadow-luxe sm:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient text-charcoal-950">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="font-heading text-sm font-bold text-white">Zero-Defect Finish</p>
                <p className="text-xs text-white/60">Laser-level alignment</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
