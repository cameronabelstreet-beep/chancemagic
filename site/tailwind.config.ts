import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      background: "var(--background)",
      surface: "var(--surface)",
      "surface-mid": "var(--surface-mid)",
      accent: "var(--accent)",
      "accent-light": "var(--accent-light)",
      "on-background": "var(--on-background)",
      "on-surface": "var(--on-surface)",
      glow: "var(--glow)",
    },
    extend: {
      fontFamily: {
        display: ['"Boldonse"', "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display": ["72px", { lineHeight: "1.05" }],
        "headline-xl": ["48px", { lineHeight: "1.1" }],
        "headline-lg": ["32px", { lineHeight: "1.15" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-sm": ["12px", { lineHeight: "1.4", fontWeight: "600", letterSpacing: "0.12em" }],
      },
      borderRadius: {
        button: "8px",
        card: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
