"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

// All real project photos from /public/images.
const services = [
  { image: "/images/IMG-20250714-WA0039.jpg", title: "Floor & Wall Tiling" },
  { image: "/images/IMG-20250714-WA0040.jpg", title: "Granite Kitchen Countertop" },
  { image: "/images/IMG-20250714-WA0041.jpg", title: "Marble & Granite Staircase" },
  { image: "/images/IMG-20250714-WA0042.jpg", title: "Bathroom Waterproof Tiling" },
  { image: "/images/IMG-20250714-WA0043.jpg", title: "Elevation & Exterior Cladding" },
  { image: "/images/IMG-20250714-WA0044.jpg", title: "Diamond Mirror Polishing" },
  { image: "/images/IMG-20250714-WA0045.jpg", title: "Precision Tile Fitting" },
  { image: "/images/IMG-20250714-WA0046.jpg", title: "Granite Flooring" },
  { image: "/images/IMG-20250714-WA0048.jpg", title: "Living Room Tiling" },
  { image: "/images/IMG-20250714-WA0050.jpg", title: "Kitchen Platform Work" },
  { image: "/images/IMG-20250714-WA0051.jpg", title: "Wall Cladding" },
  { image: "/images/IMG-20250714-WA0052.jpg", title: "Vitrified Tile Flooring" },
  { image: "/images/IMG-20250714-WA0053.jpg", title: "Stone Finishing" },
  { image: "/images/IMG-20250714-WA0054.jpg", title: "Marble Work" },
  { image: "/images/IMG-20250714-WA0055.jpg", title: "Bathroom Tiling" },
  { image: "/images/IMG-20250714-WA0057.jpg", title: "Staircase Finishing" },
  { image: "/images/IMG-20250714-WA0058.jpg", title: "Granite Countertop" },
  { image: "/images/IMG-20250714-WA0059.jpg", title: "Exterior Stone Work" },
];

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export default function Services() {
  // index of the image open in the lightbox, or null when closed
  const [active, setActive] = useState(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % services.length)),
    []
  );
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + services.length) % services.length)),
    []
  );

  // keyboard controls + body scroll lock while lightbox is open
  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="container-xl flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Services"
          title="Our"
          highlight="tiles & granite work"
          subtitle="A look at real projects completed by our team. Tap any photo to view it full size."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.05 }}
          className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s, idx) => (
            <motion.figure key={s.image} variants={item} className="card-surface overflow-hidden">
              <button
                type="button"
                onClick={() => setActive(idx)}
                className="group block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/70"
                aria-label={`View ${s.title} full size`}
              >
                {/* full image, uncropped, on a dark stage */}
                <div className="relative flex h-64 w-full items-center justify-center bg-charcoal-950/60 p-2">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </button>
              <figcaption className="flex items-center justify-center border-t border-white/10 px-4 py-4 text-center">
                <h3 className="font-heading text-base font-bold text-white">{s.title}</h3>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal-950/95 backdrop-blur-sm p-4 sm:p-8"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={services[active].title}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition hover:bg-white/10 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition hover:bg-white/10 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.figure
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative flex max-h-full w-full max-w-5xl flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[70vh] w-full">
                <Image
                  src={services[active].image}
                  alt={services[active].title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
              <figcaption className="text-center">
                <span className="font-heading text-lg font-bold text-white">
                  {services[active].title}
                </span>
                <span className="ml-2 text-sm text-white/50">
                  {active + 1} / {services.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
