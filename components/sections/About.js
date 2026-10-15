"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Wrench, BadgeCheck, Droplets, Wind } from "lucide-react";
import Reveal, { staggerContainer, staggerItem } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const highlights = [
  {
    icon: Wrench,
    title: "Quality Tools",
    desc: "Industry-grade cutters, levellers, and polishing machines for a flawless finish.",
  },
  {
    icon: BadgeCheck,
    title: "Certified Craftsmen",
    desc: "Skilled, trained artisans who treat every project with precision and pride.",
  },
  {
    icon: Droplets,
    title: "Water-Resistant Grouting",
    desc: "Sealed, long-lasting joints that keep moisture out of floors and walls.",
  },
  {
    icon: Wind,
    title: "Dust-Free Cutting",
    desc: "Clean, controlled on-site cutting that keeps your space tidy throughout.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="container-xl grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="About Us"
            title="A decade of"
            highlight="precision stone craftsmanship"
            subtitle="FK Tiles Work was built on one promise: a finish you never have to second-guess. We obsess over laser-level alignment, seamless joints, and zero-defect tile and granite installation so your floors, walls, and countertops look immaculate for years."
          />
          <Reveal delay={0.1} className="mt-6">
            <p className="max-w-xl text-base leading-relaxed text-white/60">
              From the first site visit to the final polish, our team pairs
              traditional stone-fitting skill with modern tools and dust-free
              methods. The result is clean work, honest timelines, and spaces
              that feel genuinely premium.
            </p>
          </Reveal>

          <Reveal delay={0.18} className="mt-8">
            <div className="relative aspect-[16/10] w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 shadow-luxe ring-1 ring-gold-400/15">
              <Image
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80"
                alt="Craftsman precisely cutting and finishing stone on site"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,12,16,0.65),transparent_55%)]" aria-hidden="true" />
            </div>
          </Reveal>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2"
        >
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="card-surface flex flex-col gap-3 p-6 transition hover:border-gold-400/30 hover:bg-white/[0.05]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/10 text-gold-300 ring-1 ring-gold-400/20">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-heading text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
