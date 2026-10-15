"use client";

import { motion } from "framer-motion";
import { PhoneCall, ClipboardList, Ruler, Sparkles } from "lucide-react";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    n: "01",
    title: "Free Consultation & Site Visit",
    desc: "We visit your space, understand your vision, and take accurate measurements.",
    icon: PhoneCall,
  },
  {
    n: "02",
    title: "Material Selection & Exact Quotation",
    desc: "Pick from our catalog and receive a transparent, itemized quotation.",
    icon: ClipboardList,
  },
  {
    n: "03",
    title: "Precision Fitting & Leveling",
    desc: "Our craftsmen install with laser-level alignment and seamless joints.",
    icon: Ruler,
  },
  {
    n: "04",
    title: "Final Cleaning, Polishing & Handover",
    desc: "We polish, deep-clean, and hand over a spotless, ready-to-use space.",
    icon: Sparkles,
  },
];

export default function Process() {
  return (
    <section id="process" className="relative bg-dark-gradient py-20 sm:py-28">
      <div className="container-xl flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="How We Work"
          title="A simple, transparent"
          highlight="4-step process"
          subtitle="From the first call to the final polish, you always know what happens next."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative grid w-full gap-6 lg:grid-cols-4"
        >
          <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent lg:block" aria-hidden="true" />
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.n}
                variants={staggerItem}
                className="card-surface relative flex flex-col items-start gap-4 p-7"
              >
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient font-heading text-lg font-extrabold text-charcoal-950 shadow-gold-glow">
                  {step.n}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/10 text-gold-300 ring-1 ring-gold-400/20">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-heading text-base font-bold leading-snug text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">{step.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
