import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0A0A0A",
          gold: "#C9A96E",
          "gold-dark": "#A08A52",
          "gold-light": "#E8D5A3",
          cream: "#F5F0E8",
          "off-white": "#FAFAF8",
          graphite: "#3D3D3D",
          stone: "#E8E4DC",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        accent: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
