"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, BadgeCheck, Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const reviews = [
  {
    name: "Rahul Mehta",
    role: "Homeowner",
    rating: 5,
    text: "The granite kitchen countertop is flawless — seamless joints and a mirror polish. The team was tidy and finished right on schedule.",
  },
  {
    name: "Anjali Sharma",
    role: "Architect",
    rating: 5,
    text: "I specify FK Tiles Work for my residential projects. Their laser-level flooring and attention to detail make my designs look exactly as intended.",
  },
  {
    name: "Vikram Desai",
    role: "Builder",
    rating: 5,
    text: "We handed them an entire apartment block. Consistent quality across every unit and zero rework. Reliable crew.",
  },
  {
    name: "Priya Nair",
    role: "Homeowner",
    rating: 4,
    text: "Our bathroom is fully waterproofed with gorgeous anti-skid tiles. Clean work and genuinely helpful advice on material choices.",
  },
  {
    name: "Imran Qureshi",
    role: "Builder",
    rating: 5,
    text: "The elevation cladding transformed our facade. Weather-proof, crisp lines, and delivered ahead of time.",
  },
  {
    name: "Sneha Kulkarni",
    role: "Architect",
    rating: 5,
    text: "Their marble staircase work with full-bullnose finish is exceptional craftsmanship. A dependable partner for premium builds.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setPerView(3);
      else if (window.innerWidth >= 640) setPerView(2);
      else setPerView(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, reviews.length - perView);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const next = useCallback(
    () => setIndex((i) => (i >= maxIndex ? 0 : i + 1)),
    [maxIndex]
  );
  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section id="testimonials" className="relative py-20 sm:py-28">
      <div className="container-xl flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by"
          highlight="homeowners, builders & architects"
          subtitle="Real feedback from clients across residential and commercial projects."
        />

        <div
          className="w-full"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${index * (100 / perView)}%` }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
            >
              {reviews.map((r) => (
                <div
                  key={r.name}
                  className="w-full shrink-0 px-3 sm:w-1/2 lg:w-1/3"
                >
                  <article className="card-surface flex h-full flex-col gap-4 p-7">
                    <Quote className="h-8 w-8 text-gold-400/50" />
                    <div className="flex items-center gap-1" aria-label={`${r.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < r.rating ? "fill-gold-400 text-gold-400" : "text-white/20"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-white/70">{r.text}</p>
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <div>
                        <p className="font-heading text-sm font-bold text-white">{r.name}</p>
                        <p className="text-xs text-white/50">{r.role}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full border border-gold-400/30 bg-gold-400/5 px-2.5 py-1 text-[0.65rem] font-semibold text-gold-200">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Verified Project
                      </span>
                    </div>
                  </article>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/5"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial group ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-gold-400" : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/5"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
