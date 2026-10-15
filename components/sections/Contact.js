"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { site, waLink, telLink } from "@/lib/site";

const workTypes = [
  "Floor & Wall Tiling",
  "Granite Kitchen Countertop",
  "Marble & Granite Staircase",
  "Bathroom Waterproof Tiling",
  "Elevation & Exterior Cladding",
  "Polishing & Re-polishing",
  "Other",
];

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
};

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    workType: workTypes[0],
    message: "",
  });
  const [sent, setSent] = useState(false);

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `New enquiry for FK Tiles Work:\nName: ${form.name}\nPhone: ${form.phone}\nCity: ${form.city}\nWork Type: ${form.workType}\nMessage: ${form.message || "-"}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="container-xl flex flex-col gap-12">
        <SectionHeading
          eyebrow="Contact"
          title="Book a free"
          highlight="site visit today"
          subtitle="Tell us about your project and we'll get back with a tailored quote."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card-surface p-7 sm:p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                <CheckCircle2 className="h-14 w-14 text-gold-400" />
                <h3 className="font-heading text-xl font-bold text-white">
                  Thanks, {form.name || "there"}!
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-white/60">
                  Your enquiry has been prepared in WhatsApp. Send it to us and
                  we&apos;ll confirm your free site visit shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="btn-outline mt-2"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/70">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your full name"
                    className="input-field"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm font-medium text-white/70">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="+91 ..."
                      className="input-field"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="city" className="text-sm font-medium text-white/70">
                      Location / City
                    </label>
                    <input
                      id="city"
                      type="text"
                      required
                      value={form.city}
                      onChange={update("city")}
                      placeholder="Your city"
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="workType" className="text-sm font-medium text-white/70">
                    Work Type
                  </label>
                  <select
                    id="workType"
                    value={form.workType}
                    onChange={update("workType")}
                    className="input-field"
                  >
                    {workTypes.map((t) => (
                      <option key={t} value={t} className="bg-charcoal-950">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-white/70">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Tell us about your project..."
                    className="input-field resize-none"
                  />
                </div>
                <button type="submit" className="btn-gold">
                  <Send className="h-4 w-4" />
                  Send Enquiry
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="card-surface flex flex-col gap-5 p-7 sm:p-8">
              <ContactRow icon={Phone} label="Call us">
                <a href={telLink()} className="transition hover:text-gold-200">
                  {site.phoneDisplay}
                </a>
              </ContactRow>
              <ContactRow icon={Mail} label="Email us">
                <a href={`mailto:${site.email}`} className="transition hover:text-gold-200">
                  {site.email}
                </a>
              </ContactRow>
              <ContactRow icon={MapPin} label="Visit us">
                {site.address}
              </ContactRow>
              <ContactRow icon={Clock} label="Working hours">
                <span className="flex flex-col gap-0.5">
                  {site.hours.map((h) => (
                    <span key={h.day}>
                      {h.day}: {h.time}
                    </span>
                  ))}
                </span>
              </ContactRow>

              <div className="flex flex-col gap-3 pt-1">
                <div className="flex flex-wrap gap-3">
                  <a href={telLink()} className="btn-ghost">
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  {Object.entries(site.socials).map(([key, href]) => {
                    const Icon = socialIcons[key];
                    if (!Icon) return null;
                    return (
                      <a
                        key={key}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`FK Tiles Work on ${key}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-gold-400/40 hover:text-gold-200"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="card-surface relative flex min-h-[180px] flex-1 items-center justify-center overflow-hidden bg-dark-gradient p-7">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(236,217,173,0.12),transparent_45%)]" aria-hidden="true" />
              <div className="relative flex flex-col items-center gap-3 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-charcoal-950 shadow-gold-glow">
                  <MapPin className="h-7 w-7" />
                </span>
                <p className="font-heading text-sm font-bold text-white">Find us on the map</p>
                <p className="max-w-xs text-xs text-white/55">{site.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-400/10 text-gold-300 ring-1 ring-gold-400/20">
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-white/40">
          {label}
        </span>
        <div className="text-sm text-white/80">{children}</div>
      </div>
    </div>
  );
}
