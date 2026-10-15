import { Layers, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { site, navLinks } from "@/lib/site";

const services = [
  "Floor & Wall Tiling",
  "Granite Countertops",
  "Marble & Granite Staircase",
  "Waterproof Bathroom Tiling",
  "Elevation & Cladding",
  "Mirror Polishing",
];

const areas = [
  "City Center",
  "Industrial Area",
  "North Suburbs",
  "Lakeview District",
  "Green Park",
  "Riverside",
];

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dark-gradient">
      <div className="container-xl grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-gradient text-charcoal-950 shadow-gold-glow">
              <Layers className="h-6 w-6" strokeWidth={2.2} />
            </span>
            <span className="font-heading text-lg font-extrabold text-white">
              {site.name}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/55">
            {site.tagline}. Expert tile and granite installation, polishing, and
            custom stone craftsmanship for residential &amp; commercial spaces.
          </p>
          <div className="flex items-center gap-3 pt-1">
            {Object.entries(site.socials).map(([key, href]) => {
              const Icon = socialIcons[key];
              if (!Icon) return null;
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${key}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-gold-400/40 hover:text-gold-200"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
            Quick Links
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/60 transition hover:text-gold-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
            Services
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {services.map((s) => (
              <li key={s}>
                <a
                  href="#services"
                  className="text-sm text-white/60 transition hover:text-gold-200"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
            Service Areas Covered
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-2.5">
            {areas.map((a) => (
              <li key={a} className="text-sm text-white/60">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-xl flex flex-col gap-3 py-6 text-center text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            Disclaimer: Estimates and visuals are indicative. Final pricing is
            confirmed after an on-site measurement.
          </p>
          <p>
            © {new Date().getFullYear()} {site.name} ({site.domain}). All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
