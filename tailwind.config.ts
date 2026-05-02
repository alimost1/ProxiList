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
        primary: {
          50: "#EBF1FF",
          100: "#D6E4FF",
          200: "#ADC8FF",
          300: "#85ADFF",
          400: "#5C91FF",
          500: "#3375FF",
          600: "#155EEF",
          700: "#1048BF",
          800: "#0B338F",
          900: "#071E5F",
        },
        surface: {
          light: "#F8FAFC",
          dark: "#0F172A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.06)",
        "card-hover": "0 4px 12px 0 rgb(0 0 0 / 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
