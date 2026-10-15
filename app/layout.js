import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — Premium Tiles & Granite Fitting`,
    template: `%s | ${site.name}`,
  },
  description:
    "FK Tiles Work delivers expert tile and granite installation, polishing, and custom stone craftsmanship for residential and commercial spaces. 10+ years experience, 500+ projects completed.",
  keywords: [
    "tiles fitting",
    "granite installation",
    "marble work",
    "kitchen countertop",
    "floor tiling",
    "FK Tiles Work",
  ],
  openGraph: {
    title: `${site.name} — Premium Tiles & Granite Fitting`,
    description:
      "Expert installation, polishing, and custom stone craftsmanship for residential & commercial spaces.",
    url: `https://${site.domain}`,
    siteName: site.name,
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0c0f16",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
