import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0c0a07",
        panel: "rgba(16, 14, 10, 0.9)",
        sand: {
          DEFAULT: "#e8d6a7",
          dim: "#b39a67",
        },
        paper: "#fdfaf2",
        money: "#5cab6d",
        health: "#b4383e",
        armor: "#8a9aa5",
        gold: "#d8a929",
        rust: "#c2571c",
      },
      fontFamily: {
        display: ['"Pricedown"', '"Shrikhand"', "cursive"],
        script: ['"Pirata One"', "cursive"],
        body: ['"Oswald"', "sans-serif"],
      },
      boxShadow: {
        frame: "0 0 0 2px #b39a67, 0 18px 50px rgba(0,0,0,0.7)",
        inset1: "inset 0 0 0 1px rgba(232,214,167,0.25)",
      },
      keyframes: {
        screenIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "none" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "none" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(200%)" },
        },
        eq: {
          from: { height: "3px" },
          to: { height: "12px" },
        },
        blink: {
          "50%": { opacity: "0.25" },
        },
        grainShift: {
          "0%": { transform: "translate(0,0)" },
          "25%": { transform: "translate(-4%,3%)" },
          "50%": { transform: "translate(3%,-4%)" },
          "75%": { transform: "translate(-2%,-2%)" },
          "100%": { transform: "translate(0,0)" },
        },
      },
      animation: {
        screenIn: "screenIn 0.25s ease-out",
        "fade-in-up": "fadeInUp 0.5s cubic-bezier(0.2,0.7,0.2,1) both",
        "fade-in": "fadeIn 0.6s ease-out both",
        "pop-in": "popIn 0.4s cubic-bezier(0.2,0.7,0.2,1) both",
        float: "float 5s ease-in-out infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
        eq: "eq 0.6s infinite alternate",
        blink: "blink 1.2s steps(2) infinite",
        grain: "grainShift 1.2s steps(4) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
