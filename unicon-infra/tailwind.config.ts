import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colors are driven by CSS custom properties (see globals.css /
        // ThemeStyleInjector) so they can be changed from the admin
        // "Colors & Fonts" page without a rebuild. The rgb(... / <alpha-value>)
        // pattern keeps Tailwind's opacity modifiers (e.g. bg-luxury-gold/40)
        // working normally.
        luxury: {
          black: "rgb(var(--color-black) / <alpha-value>)",
          charcoal: "rgb(var(--color-charcoal) / <alpha-value>)",
          panel: "rgb(var(--color-panel) / <alpha-value>)",
          gold: "rgb(var(--color-gold) / <alpha-value>)",
          goldLight: "rgb(var(--color-gold-light) / <alpha-value>)",
          goldDark: "rgb(var(--color-gold-dark) / <alpha-value>)",
          ivory: "rgb(var(--color-ivory) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, rgb(var(--color-gold-light)) 0%, rgb(var(--color-gold)) 50%, rgb(var(--color-gold-dark)) 100%)",
        "dark-radial":
          "radial-gradient(circle at 50% 0%, rgb(var(--color-charcoal)) 0%, rgb(var(--color-black)) 70%)",
      },
      boxShadow: {
        gold: "0 0 30px rgb(var(--color-gold) / 0.25)",
        "gold-lg": "0 10px 60px rgb(var(--color-gold) / 0.18)",
        glass: "0 8px 32px rgba(0,0,0,0.55)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        floatSlow: "floatSlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
