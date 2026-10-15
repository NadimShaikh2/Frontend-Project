"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { site, navLinks, waLink, telLink } from "@/lib/site";

// Custom geometric stone/tile logomark with an "FK" monogram.
function TileMark() {
  return (
    <span className="group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-charcoal-900 ring-1 ring-gold-400/40 shadow-gold-glow transition-transform duration-300 group-hover:scale-[1.04]">
      <svg
        viewBox="0 0 48 48"
        className="h-12 w-12"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="fkGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ecd9ad" />
            <stop offset="45%" stopColor="#c7a263" />
            <stop offset="100%" stopColor="#9a7037" />
          </linearGradient>
        </defs>
        {/* interlocking tile facets */}
        <g fill="none" stroke="url(#fkGold)" strokeWidth="1.6" opacity="0.9">
          <rect x="8" y="8" width="14" height="14" rx="2.5" />
          <rect x="26" y="8" width="14" height="14" rx="2.5" opacity="0.55" />
          <rect x="8" y="26" width="14" height="14" rx="2.5" opacity="0.55" />
          <rect x="26" y="26" width="14" height="14" rx="2.5" />
        </g>
        {/* FK monogram */}
        <text
          x="24"
          y="30"
          textAnchor="middle"
          fontFamily="var(--font-jakarta), sans-serif"
          fontSize="15"
          fontWeight="800"
          fill="url(#fkGold)"
          letterSpacing="-0.5"
        >
          FK
        </text>
      </svg>
    </span>
  );
}

function Logo() {
  return (
    <a
      href="#home"
      className="group flex items-center gap-3"
      aria-label={`${site.name} home`}
    >
      <TileMark />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-xl font-extrabold leading-none tracking-tight">
          <span className="heading-gradient">FK</span>{" "}
          <span className="text-white">Tiles Work</span>
        </span>
        <span className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-gold-300/90">
          Premium Tiles &amp; Granite
        </span>
      </span>
    </a>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-charcoal-950/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-xl flex h-20 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={telLink()} className="btn-ghost text-sm" aria-label="Call now">
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Quote
          </a>
          <a href="#estimator" className="btn-gold text-sm">
            Get Free Estimate
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden"
          >
            <div className="container-xl border-t border-white/10 bg-charcoal-950/95 pb-6 pt-4 backdrop-blur-xl">
              <nav className="flex flex-col" aria-label="Mobile">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-4 flex flex-col gap-3">
                <a href={telLink()} className="btn-ghost w-full" onClick={() => setOpen(false)}>
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full"
                  onClick={() => setOpen(false)}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Quote
                </a>
                <a href="#estimator" className="btn-gold w-full" onClick={() => setOpen(false)}>
                  Get Free Estimate
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
