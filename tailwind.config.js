/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
      boxShadow: {
        "highlight-glow": "0 0 10px #7308B0",
      },
      colors: {
        primary: "#7308B0",
        "primary-dark": "#5d0690",
        pinky: "#c40d60",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        bebas: ["Bebas Neue", "cursive"],
      },
      backgroundImage: {
        "main-gradient": "linear-gradient(to right, #2203FF, #C40D60)",
        "secondary-gradient": "linear-gradient(to right, #7308B0, #C40D60)",
        "main-gradient-bottom": "linear-gradient(to top, #2203FF, #C40D60)",
        "primary-transparent-right-gradient":
          "linear-gradient(to right, #7308B0, transparent)",
      },
    },
  },
  plugins: [scrollbar({ nocompatible: true })],
};
