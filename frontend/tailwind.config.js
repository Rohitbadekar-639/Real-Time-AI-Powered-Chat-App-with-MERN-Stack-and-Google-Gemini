/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Syne", "Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#07080c",
          900: "#0c1016",
          800: "#10141c",
          700: "#171d28",
        },
        gold: {
          DEFAULT: "#e8c584",
          dim: "#b9924e",
        },
        tide: {
          DEFAULT: "#7dd3c7",
        },
      },
    },
  },
  plugins: [],
}
