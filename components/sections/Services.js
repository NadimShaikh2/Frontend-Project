"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutGrid,
  ChefHat,
  Footprints,
  ShowerHead,
  Building2,
  Sparkles,
  Check,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  {
    id: "tiling",
    title: "Floor & Wall Tiling",
    icon: LayoutGrid,
    desc: "Precise laying of ceramic, vitrified, and large-format slabs with perfectly aligned joints and level surfaces.",
    points: ["Ceramic & Vitrified tiles", "Large-format GVT / PGVT slabs", "Seamless grout lines"],
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80",
    alt: "Large-format tiled floor laid in a bright interior",
  },
  {
    id: "kitchen",
    title: "Granite Kitchen Countertop & Island",
    icon: ChefHat,
    desc: "Custom-fabricated granite tops and islands with clean edges and invisible joints built to last.",
    points: ["Edge profiling", "Sink & hob cutouts", "Seamless joints"],
    image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern kitchen island topped with polished granite",
  },
  {
    id: "stairs",
    title: "Marble & Granite Staircase Work",
    icon: Footprints,
    desc: "Elegant, safe staircases finished with crisp moldings and anti-slip detailing.",
    points: ["Molding & risers", "Anti-slip grooving", "Full-bullnose finish"],
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    alt: "Polished stone staircase with clean moldings",
  },
  {
    id: "bathroom",
    title: "Bathroom & Wet-Area Waterproof Tiling",
    icon: ShowerHead,
    desc: "Fully waterproofed wet areas with anti-skid floors and watertight shower enclosures.",
    points: ["Shower enclosures", "Anti-skid floor tiles", "Sealed waterproofing"],
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80",
    alt: "Marble-tiled luxury bathroom with walk-in shower",
  },
  {
    id: "cladding",
    title: "Elevation & Exterior Cladding",
    icon: Building2,
    desc: "Weather-proof exterior stone and rustic cladding that lifts your building's facade.",
    points: ["Weather-proof stone", "Rustic exterior tiles", "Facade elevation design"],
    image: "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?auto=format&fit=crop&w=1200&q=80",
    alt: "Building facade finished with rustic stone cladding",
  },
  {
    id: "polishing",
    title: "Diamond Mirror Polishing & Re-polishing",
    icon: Sparkles,
    desc: "Restore depth and shine to granite and marble with multi-stage diamond polishing.",
    points: ["Diamond mirror polish", "Granite re-polishing", "Scratch & stain removal"],
    image: "https://images.unsplash.com/photo-1615800098746-73e3b35a0f67?auto=format&fit=crop&w=1200&q=80",
    alt: "Glossy mirror-polished marble surface with golden veining",
  },
];

export default function Services() {
  const [active, setActive] = useState(services[0].id);
  const current = services.find((s) => s.id === active) ?? services[0];
  const CurrentIcon = current.icon;

  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="container-xl flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Services"
          title="Comprehensive"
          highlight="tiles & granite services"
          subtitle="Everything from floor tiling to mirror-finish polishing, delivered by one accountable team."
        />

        <div className="w-full">
          <div className="flex flex-nowrap gap-3 overflow-x-auto pb-3 lg:flex-wrap lg:justify-center lg:overflow-visible lg:pb-0">
            {services.map((s) => {
              const Icon = s.icon;
              const isActive = s.id === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(s.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "border-transparent bg-gold-gradient text-charcoal-950 shadow-gold-glow"
                      : "border-white/15 text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {s.title.split(" ").slice(0, 2).join(" ")}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="card-surface mt-6 grid gap-6 p-7 sm:p-9 lg:grid-cols-[1fr_1fr]"
            >
              <div className="flex flex-col gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400/10 text-gold-300 ring-1 ring-gold-400/20">
                  <CurrentIcon className="h-7 w-7" />
                </span>
                <h3 className="font-heading text-2xl font-bold text-white">
                  {current.title}
                </h3>
                <p className="max-w-lg text-base leading-relaxed text-white/65">
                  {current.desc}
                </p>
                <ul className="mt-2 flex flex-col gap-3">
                  {current.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm text-white/80">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-400/15 text-gold-300">
                        <Check className="h-4 w-4" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative min-h-[220px] overflow-hidden rounded-2xl ring-1 ring-white/10">
                <Image
                  src={current.image}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,12,16,0.5),transparent_55%)]" aria-hidden="true" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className={`card-surface group flex flex-col items-start gap-3 p-6 text-left transition hover:-translate-y-1 hover:border-gold-400/30 hover:bg-white/[0.05] ${
                  s.id === active ? "border-gold-400/40 bg-white/[0.05]" : ""
                }`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/10 text-gold-300 ring-1 ring-gold-400/20">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-heading text-lg font-bold text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{s.desc}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
