import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Figtree"', "system-ui", "sans-serif"],
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        holi: {
          pink:   "oklch(var(--holi-pink))",
          purple: "oklch(var(--holi-purple))",
          yellow: "oklch(var(--holi-yellow))",
          green:  "oklch(var(--holi-green))",
          orange: "oklch(var(--holi-orange))",
          blue:   "oklch(var(--holi-blue))",
          gold:   "oklch(var(--holi-gold))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        xl: "2rem",
        "2xl": "3rem",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        "holi-pink":   "0 0 30px oklch(0.68 0.28 350 / 0.5)",
        "holi-purple": "0 0 30px oklch(0.55 0.25 295 / 0.5)",
        "holi-yellow": "0 0 30px oklch(0.85 0.20 85 / 0.5)",
        "holi-green":  "0 0 30px oklch(0.65 0.22 145 / 0.5)",
        "holi-orange": "0 0 30px oklch(0.72 0.22 45 / 0.5)",
        "holi-blue":   "0 0 30px oklch(0.55 0.22 250 / 0.5)",
        "gold-glow":   "0 0 40px oklch(0.82 0.18 75 / 0.6)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "holi-bg-shift": {
          "0%":   { "background-position": "0% 50%" },
          "25%":  { "background-position": "50% 100%" },
          "50%":  { "background-position": "100% 50%" },
          "75%":  { "background-position": "50% 0%" },
          "100%": { "background-position": "0% 50%" },
        },
        "float-up": {
          "0%":   { transform: "translateY(0) translateX(0)", opacity: "0.6" },
          "100%": { transform: "translateY(-110vh) translateX(5px)", opacity: "0" },
        },
        "text-glow-cycle": {
          "0%":   { textShadow: "0 0 20px oklch(0.68 0.28 350 / 0.8)" },
          "50%":  { textShadow: "0 0 30px oklch(0.85 0.20 85 / 0.9)" },
          "100%": { textShadow: "0 0 20px oklch(0.68 0.28 350 / 0.8)" },
        },
        "bounce-btn": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "30%":      { transform: "translateY(-6px) scale(1.03)" },
          "60%":      { transform: "translateY(-2px) scale(1.01)" },
        },
        "glow-pulse": {
          "0%, 100%": { filter: "drop-shadow(0 0 8px oklch(0.82 0.18 75 / 0.6))" },
          "50%":      { filter: "drop-shadow(0 0 20px oklch(0.82 0.18 75 / 1))" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "lantern-float": {
          "0%":   { transform: "translateY(0) translateX(0)", opacity: "0.9" },
          "100%": { transform: "translateY(-105vh) translateX(7px)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down":   "accordion-down 0.2s ease-out",
        "accordion-up":     "accordion-up 0.2s ease-out",
        "holi-bg-shift":    "holi-bg-shift 12s ease infinite",
        "float-up":         "float-up 8s ease-in infinite",
        "text-glow-cycle":  "text-glow-cycle 4s ease-in-out infinite",
        "bounce-btn":       "bounce-btn 1.8s ease-in-out infinite",
        "glow-pulse":       "glow-pulse 2s ease-in-out infinite",
        "fade-in-up":       "fade-in-up 0.8s ease-out forwards",
        "spin-slow":        "spin-slow 20s linear infinite",
        "lantern-float":    "lantern-float 8s ease-in infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
