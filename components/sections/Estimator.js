"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Ruler, Info } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { waLink } from "@/lib/site";

const areaTypes = ["Flooring", "Kitchen Top", "Bathroom", "Stairs", "Cladding"];
const runningFtTypes = ["Kitchen Top", "Stairs"];
const materialTypes = ["Tiles", "Granite", "Marble"];

// Indicative per-unit INR rates [low, high]. Business can tune later.
const materialRates = {
  Tiles: { material: [55, 160], labor: [35, 70] },
  Granite: { material: [140, 350], labor: [60, 120] },
  Marble: { material: [180, 600], labor: [80, 160] },
};

// Area-type complexity multiplier applied to labor.
const areaLaborMultiplier = {
  Flooring: 1,
  "Kitchen Top": 1.3,
  Bathroom: 1.25,
  Stairs: 1.45,
  Cladding: 1.35,
};

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function Estimator() {
  const [areaType, setAreaType] = useState("Flooring");
  const [area, setArea] = useState("");
  const [material, setMaterial] = useState("Granite");

  const isRunningFt = runningFtTypes.includes(areaType);
  const unitLabel = isRunningFt ? "Running Ft." : "Sq. Ft.";

  const result = useMemo(() => {
    const qty = parseFloat(area);
    if (!qty || qty <= 0 || Number.isNaN(qty)) return null;

    const rate = materialRates[material];
    const laborMult = areaLaborMultiplier[areaType] ?? 1;

    const matLow = qty * rate.material[0];
    const matHigh = qty * rate.material[1];
    const laborLow = qty * rate.labor[0] * laborMult;
    const laborHigh = qty * rate.labor[1] * laborMult;

    return {
      material: [matLow, matHigh],
      labor: [laborLow, laborHigh],
      total: [matLow + laborLow, matHigh + laborHigh],
    };
  }, [area, areaType, material]);

  const quoteMessage = `Hi FK Tiles Work, I'd like to book a free site measurement.\nArea type: ${areaType}\nApprox area: ${area || "-"} ${unitLabel}\nMaterial: ${material}`;

  return (
    <section id="estimator" className="relative py-20 sm:py-28">
      <div className="container-xl flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Cost Estimator"
          title="Instant"
          highlight="tiles & granite cost estimator"
          subtitle="Get an indicative material and labor range in seconds, then book a free on-site measurement."
        />

        <div className="grid w-full gap-6 lg:grid-cols-2">
          <div className="card-surface flex flex-col gap-6 p-7 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400/10 text-gold-300 ring-1 ring-gold-400/20">
                <Calculator className="h-5 w-5" />
              </span>
              <h3 className="font-heading text-lg font-bold text-white">Project details</h3>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="area-type" className="text-sm font-medium text-white/70">
                Area Type
              </label>
              <select
                id="area-type"
                value={areaType}
                onChange={(e) => setAreaType(e.target.value)}
                className="input-field"
              >
                {areaTypes.map((t) => (
                  <option key={t} value={t} className="bg-charcoal-950">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="area" className="text-sm font-medium text-white/70">
                Approximate Area ({unitLabel})
              </label>
              <input
                id="area"
                type="number"
                min="0"
                inputMode="decimal"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder={`e.g. 250 ${unitLabel}`}
                className="input-field"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="material" className="text-sm font-medium text-white/70">
                Material Preference
              </label>
              <select
                id="material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="input-field"
              >
                {materialTypes.map((t) => (
                  <option key={t} value={t} className="bg-charcoal-950">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <p className="flex items-start gap-2 text-xs leading-relaxed text-white/45">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Estimates are indicative only and vary with design, brand, site
              conditions, and finish. Final pricing is confirmed after a site visit.
            </p>
          </div>

          <motion.div
            key={result ? `${result.total[0]}-${result.total[1]}` : "empty"}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="card-surface flex flex-col gap-5 bg-dark-gradient p-7 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-gradient text-charcoal-950">
                <Ruler className="h-5 w-5" />
              </span>
              <h3 className="font-heading text-lg font-bold text-white">Estimated range</h3>
            </div>

            {result ? (
              <>
                <div className="flex flex-col gap-4">
                  <Row label="Material" range={result.material} />
                  <Row label="Labor & Installation" range={result.labor} />
                  <div className="h-px w-full bg-white/10" />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-white/60">Estimated Total</span>
                    <span className="heading-gradient font-heading text-3xl font-extrabold">
                      {inr.format(result.total[0])} – {inr.format(result.total[1])}
                    </span>
                  </div>
                </div>
                <a href={waLink(quoteMessage)} target="_blank" rel="noopener noreferrer" className="btn-gold mt-2">
                  Book Free Site Measurement
                </a>
              </>
            ) : (
              <p className="text-sm leading-relaxed text-white/55">
                Enter an area above to see your estimated material and labor range
                instantly.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, range }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-white/60">{label}</span>
      <span className="font-heading text-base font-semibold text-white">
        {inr.format(range[0])} – {inr.format(range[1])}
      </span>
    </div>
  );
}
