"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const categories = [
  "All",
  "Living Rooms",
  "Modern Kitchens",
  "Luxury Bathrooms",
  "Stairs & Facades",
];

const img = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=75`;

const projects = [
  {
    title: "Marble Living Room Floor",
    category: "Living Rooms",
    before: img("1503174971373-b1f69850bded"),
    beforeAlt: "Bare, unfinished room before marble flooring was installed",
    after: img("1618219908412-a29a1bb7b86e"),
    afterAlt: "Finished living room with polished marble floor",
  },
  {
    title: "Open-Plan Lounge",
    category: "Living Rooms",
    before: img("1484154218962-a197022b5858"),
    beforeAlt: "Plain open-plan room before stone finishing",
    after: img("1600210492493-0946911123ea"),
    afterAlt: "Finished open-plan lounge with large-format stone flooring",
  },
  {
    title: "Granite Island Kitchen",
    category: "Modern Kitchens",
    before: img("1556911220-bff31c812dba"),
    beforeAlt: "Unfinished kitchen before granite countertops",
    after: img("1600489000022-c2086d79f9d4"),
    afterAlt: "Modern kitchen with polished granite island countertop",
  },
  {
    title: "Modular Kitchen Backsplash",
    category: "Modern Kitchens",
    before: img("1556909114-f6e7ad7d3136"),
    beforeAlt: "Plain kitchen wall before tiled backsplash",
    after: img("1600566753086-00f18fb6b3ea"),
    afterAlt: "Modular kitchen with a finished stone backsplash",
  },
  {
    title: "Spa-Style Bathroom",
    category: "Luxury Bathrooms",
    before: img("1584622650111-993a426fbf0a"),
    beforeAlt: "Bare bathroom before tiling work",
    after: img("1620626011761-996317b8d101"),
    afterAlt: "Finished spa-style bathroom with marble tiling",
  },
  {
    title: "Walk-In Shower Enclosure",
    category: "Luxury Bathrooms",
    before: img("1595515106969-1ce29566ff1c"),
    beforeAlt: "Rough shower area before waterproof tiling",
    after: img("1507652313519-d4e9174996dd"),
    afterAlt: "Finished walk-in shower enclosure with stone tiles",
  },
  {
    title: "Granite Staircase",
    category: "Stairs & Facades",
    before: img("1517581177682-a085bb7ffb15"),
    beforeAlt: "Unfinished concrete staircase before stone cladding",
    after: img("1600585154526-990dced4db0d"),
    afterAlt: "Finished staircase clad in polished granite",
  },
  {
    title: "Rustic Elevation Cladding",
    category: "Stairs & Facades",
    before: img("1503387762-592deb58ef4e"),
    beforeAlt: "Plain building exterior before stone cladding",
    after: img("1591955506264-3f5a6834570a"),
    afterAlt: "Building facade finished with rustic stone cladding",
  },
];

function BeforeAfter({ project }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-xl ring-1 ring-white/10">
      <Image
        src={project.before}
        alt={project.beforeAlt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
      <span className="absolute right-3 top-3 z-10 rounded-full bg-charcoal-950/70 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-white/80 backdrop-blur">
        Before
      </span>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={project.after}
          alt={project.afterAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 z-10 rounded-full bg-gold-gradient px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-charcoal-950">
          After
        </span>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 z-10 flex w-0.5 items-center justify-center bg-white/90"
        style={{ left: `${pos}%` }}
      >
        <span className="flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-gold-gradient text-charcoal-950 shadow-gold-glow">
          <MoveHorizontal className="h-4 w-4" />
        </span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Reveal after image for ${project.title}`}
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

export default function Gallery() {
  const [category, setCategory] = useState("All");
  const visible =
    category === "All" ? projects : projects.filter((p) => p.category === category);

  return (
    <section id="gallery" className="relative py-20 sm:py-28">
      <div className="container-xl flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Project Gallery"
          title="See the"
          highlight="before & after transformation"
          subtitle="Drag the slider on any project to reveal the finished FK Tiles Work result."
        />

        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                category === c
                  ? "border-transparent bg-gold-gradient text-charcoal-950 shadow-gold-glow"
                  : "border-white/15 text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
                className="card-surface flex flex-col gap-4 p-4"
              >
                <BeforeAfter project={p} />
                <div className="flex items-center justify-between px-1 pb-1">
                  <h3 className="font-heading text-base font-bold text-white">{p.title}</h3>
                  <span className="text-xs font-medium text-gold-200">{p.category}</span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
