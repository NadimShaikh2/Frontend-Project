"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const filters = ["All", "Granite", "Vitrified Tiles", "Marble", "Elevation Tiles", "Quartz"];

const img = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=70`;

const materials = [
  {
    name: "Black Galaxy",
    category: "Granite",
    finish: "Glossy",
    useCase: "Kitchen Tops",
    image: img("1618221195710-dd6b41faaea6"),
    alt: "Dark polished black granite surface with a glossy finish",
  },
  {
    name: "Tan Brown",
    category: "Granite",
    finish: "Glossy",
    useCase: "Flooring",
    image: img("1604014237800-1c9102c219da"),
    alt: "Warm tan-brown stone texture suited for flooring",
  },
  {
    name: "Jet Black",
    category: "Granite",
    finish: "Satin",
    useCase: "Staircase",
    image: img("1517705008128-361805f42e86"),
    alt: "Deep jet-black stone slab with a satin finish",
  },
  {
    name: "Kashmir White",
    category: "Granite",
    finish: "Matt",
    useCase: "Countertops",
    image: img("1600566752355-35792bedcfea"),
    alt: "Light Kashmir white granite with soft matt grain",
  },
  {
    name: "Imperial Red",
    category: "Granite",
    finish: "Glossy",
    useCase: "Elevation",
    image: img("1615529328331-f8917597711f"),
    alt: "Rich red-toned polished stone surface",
  },
  {
    name: "Carrara White",
    category: "Marble",
    finish: "Glossy",
    useCase: "Luxury Floors",
    image: img("1597484662317-9bd7bdda2907"),
    alt: "Classic white Carrara marble with grey veining",
  },
  {
    name: "Statuario Gold",
    category: "Marble",
    finish: "Satin",
    useCase: "Feature Walls",
    image: img("1615800098746-73e3b35a0f67"),
    alt: "White marble with warm golden veins for feature walls",
  },
  {
    name: "Emperador Brown",
    category: "Marble",
    finish: "Matt",
    useCase: "Accent Walls",
    image: img("1620641788421-7a1c342ea42e"),
    alt: "Brown Emperador marble texture with flowing veins",
  },
  {
    name: "Large-Format Porcelain Slab",
    category: "Vitrified Tiles",
    finish: "Glossy",
    useCase: "Living Rooms",
    image: img("1600210492493-0946911123ea"),
    alt: "Large-format glossy porcelain tile flooring in a living space",
  },
  {
    name: "Designer Bathroom Tile",
    category: "Vitrified Tiles",
    finish: "Satin",
    useCase: "Bathrooms",
    image: img("1620626011761-996317b8d101"),
    alt: "Designer tiled bathroom wall and floor",
  },
  {
    name: "Wood-Look GVT",
    category: "Vitrified Tiles",
    finish: "Matt",
    useCase: "Bedrooms",
    image: img("1615873968403-89e068629265"),
    alt: "Wood-look vitrified tile flooring with matt finish",
  },
  {
    name: "Rustic Stone Cladding",
    category: "Elevation Tiles",
    finish: "Rustic",
    useCase: "Exterior Walls",
    image: img("1604014237256-e4b2a1a5a9b1"),
    alt: "Rustic natural stone cladding on an exterior wall",
  },
  {
    name: "Weather-Proof Ledger",
    category: "Elevation Tiles",
    finish: "Rustic",
    useCase: "Facades",
    image: img("1591955506264-3f5a6834570a"),
    alt: "Layered stone ledger cladding on a building facade",
  },
  {
    name: "Calacatta Quartz",
    category: "Quartz",
    finish: "Glossy",
    useCase: "Countertops",
    image: img("1600607687939-ce8a6c25118c"),
    alt: "White Calacatta quartz countertop with bold veining",
  },
  {
    name: "Midnight Quartz",
    category: "Quartz",
    finish: "Satin",
    useCase: "Kitchen Tops",
    image: img("1556909212-d5b604d0c90d"),
    alt: "Dark midnight quartz surface with subtle sparkle",
  },
];

export default function Materials() {
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All" ? materials : materials.filter((m) => m.category === filter);

  return (
    <section id="materials" className="relative py-20 sm:py-28">
      <div className="container-xl flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Materials & Catalog"
          title="Explore our"
          highlight="premium stone catalog"
          subtitle="Hand-picked granite, marble, porcelain, and quartz for every space and budget."
        />

        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                filter === f
                  ? "border-transparent bg-gold-gradient text-charcoal-950 shadow-gold-glow"
                  : "border-white/15 text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((m) => (
              <motion.article
                key={m.name}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                className="card-surface group overflow-hidden"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={m.image}
                    alt={m.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,12,16,0.65),transparent_55%)]" aria-hidden="true" />
                  <span className="absolute left-3 top-3 rounded-full bg-charcoal-950/70 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-gold-200 backdrop-blur">
                    {m.finish}
                  </span>
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <h3 className="font-heading text-base font-bold text-white">{m.name}</h3>
                  <p className="text-xs font-medium uppercase tracking-wide text-white/40">
                    {m.category}
                  </p>
                  <span className="mt-1 inline-flex w-fit rounded-full border border-gold-400/30 bg-gold-400/5 px-3 py-1 text-xs font-medium text-gold-200">
                    {m.useCase}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
