import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // VytalWatch Brand Colors
        // Primary Colors
        primary: {
          50: "#E8F4F8",
          100: "#C5E4ED",
          200: "#9FD3E2",
          300: "#79C2D7",
          400: "#4EABC7",
          500: "#1B9AAA", // Teal Blue - Digital health, innovation
          600: "#0A3D62", // Medical Blue - Trust, stability
          700: "#083352",
          800: "#062942",
          900: "#041E32",
          DEFAULT: "#0A3D62", // Medical Blue as default
        },
        // Secondary Colors
        secondary: {
          50: "#E8FCF1",
          100: "#C6F7DB",
          200: "#A8E6CF", // Soft Aqua - Compassion
          300: "#7DDCB5",
          400: "#52D49B",
          500: "#2ECC71", // Vital Green - Health, recovery
          600: "#27AE60",
          700: "#1E8449",
          800: "#186A3B",
          900: "#145A32",
          DEFAULT: "#2ECC71", // Vital Green as default
        },
        // Teal accent
        teal: {
          50: "#E6F7F8",
          100: "#B3E8EC",
          200: "#80D9E0",
          300: "#4DCAD4",
          400: "#26BDC9",
          500: "#1B9AAA", // Teal Blue
          600: "#177E8B",
          700: "#13626C",
          800: "#0F464D",
          900: "#0B2A2E",
          DEFAULT: "#1B9AAA",
        },
        // Accent (alerts)
        accent: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
          DEFAULT: "#EF4444",
        },
        // Warning (amber)
        warning: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
          DEFAULT: "#F59E0B",
        },
        // Neutral Colors
        slate: {
          50: "#F5F7FA", // Light Gray
          100: "#E4E7EB",
          200: "#CBD2D9",
          300: "#9AA5B1",
          400: "#7B8794",
          500: "#616E7C",
          600: "#52606D",
          700: "#3E4C59",
          800: "#2E3A3F", // Dark Slate
          900: "#1F2933",
          DEFAULT: "#2E3A3F",
        },
        // Surface colors for light/dark modes
        surface: {
          light: "#FFFFFF",
          dark: "#2E3A3F", // Dark Slate
        },
        background: {
          light: "#F5F7FA", // Light Gray
          dark: "#1F2933",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["2rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.5rem", { lineHeight: "2.75rem" }],
        "5xl": ["3rem", { lineHeight: "1.16" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        112: "28rem",
        128: "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.1)",
        medium: "0 4px 6px rgba(0, 0, 0, 0.1)",
        strong: "0 10px 25px rgba(0, 0, 0, 0.15)",
        glow: "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-green": "0 0 20px rgba(16, 185, 129, 0.3)",
        "glow-red": "0 0 20px rgba(239, 68, 68, 0.3)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
