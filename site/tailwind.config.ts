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
      surface: "var(--surface)",
      "surface-dim": "var(--surface-dim)",
      "surface-bright": "var(--surface-bright)",
      "surface-container-lowest": "var(--surface-container-lowest)",
      "surface-container-low": "var(--surface-container-low)",
      "surface-container": "var(--surface-container)",
      "surface-container-high": "var(--surface-container-high)",
      "surface-container-highest": "var(--surface-container-highest)",
      "on-surface": "var(--on-surface)",
      "on-surface-variant": "var(--on-surface-variant)",
      outline: "var(--outline)",
      "outline-variant": "var(--outline-variant)",
      primary: "var(--primary)",
      "on-primary": "var(--on-primary)",
      tertiary: "var(--tertiary)",
      "on-tertiary": "var(--on-tertiary)",
      "tertiary-container": "var(--tertiary-container)",
      "on-tertiary-container": "var(--on-tertiary-container)",
      background: "var(--background)",
      "on-background": "var(--on-background)",
    },
    extend: {
      fontFamily: {
        serif: ["var(--font-noto-serif)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display": ["72px", { lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.02em" }],
        "headline-xl": ["48px", { lineHeight: "1.1", fontWeight: "600", letterSpacing: "-0.01em" }],
        "headline-lg": ["32px", { lineHeight: "1.15", fontWeight: "500" }],
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
