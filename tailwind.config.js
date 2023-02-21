/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(20px, -30px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 10px) scale(0.8)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      animation: {
        blob: "blob 7s infinite",
      },
      colors: {
        rosino: "#C4C4C4",
      },
    },
    fontFamily: {
      Nunito: ["Nunito Sans", "sans-serif"],
      Caslon: ["Libre Caslon Text", "serif"],
      sans: ["Lusitana", "serif"],
    },
  },
  plugins: [],
};
