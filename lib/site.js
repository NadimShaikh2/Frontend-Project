// Central business configuration + content data for FK Tiles Work.

export const site = {
  name: "FK Tiles Work",
  domain: "fktileswork.com",
  tagline: "Crafting Elegance with Precision",
  phoneDisplay: "+91 99700 54449",
  phoneRaw: "+919970054449",
  whatsappRaw: "919970054449",
  email: "hello@fktileswork.com",
  address: "Workshop & Showroom, Industrial Area, Your City",
  hours: [
    { day: "Mon – Sat", time: "9:00 AM – 7:00 PM" },
    { day: "Sunday", time: "By Appointment" },
  ],
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
  },
};

export function waLink(message) {
  const text = encodeURIComponent(
    message || "Hi FK Tiles Work, I'd like a quote for tiles & granite work."
  );
  return `https://wa.me/${site.whatsappRaw}?text=${text}`;
}

export function telLink() {
  return `tel:${site.phoneRaw}`;
}

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Materials", href: "#materials" },
  { label: "Gallery", href: "#gallery" },
  { label: "Estimator", href: "#estimator" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const trustBadges = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "100%", label: "On-Time Delivery" },
  { value: "25+", label: "Skilled Artisans" },
];
