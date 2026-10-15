/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#141821",
          50: "#f4f5f7",
          100: "#e3e5ea",
          800: "#1c2230",
          900: "#141821",
          950: "#0c0f16",
        },
        navy: {
          DEFAULT: "#111a2e",
          800: "#152139",
          900: "#0e1626",
          950: "#080e18",
        },
        gold: {
          DEFAULT: "#c7a263",
          100: "#f6edd9",
          200: "#ecd9ad",
          300: "#dcbd7e",
          400: "#c7a263",
          500: "#b78b45",
          600: "#9a7037",
          700: "#7a5830",
        },
        bronze: {
          DEFAULT: "#a9743f",
          400: "#c08a4f",
          500: "#a9743f",
          600: "#8c5e33",
        },
      },
      fontFamily: {
        heading: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "marble-light":
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.9), transparent 55%), radial-gradient(circle at 80% 0%, rgba(236,217,173,0.4), transparent 45%)",
        "gold-gradient": "linear-gradient(135deg, #ecd9ad 0%, #c7a263 45%, #9a7037 100%)",
        "dark-gradient": "linear-gradient(160deg, #0c0f16 0%, #111a2e 55%, #0e1626 100%)",
      },
      boxShadow: {
        luxe: "0 24px 60px -24px rgba(12,15,22,0.45)",
        "gold-glow": "0 10px 40px -12px rgba(199,162,99,0.55)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
