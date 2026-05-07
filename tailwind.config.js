/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F8F5F0",
        forest: "#0D2818",
        jade: "#2F5D50",
        gold: "#D4A574",
        amber: "#C68B59",
        smoke: "#5F6B66",
        sand: "#D8CFC4",
        silver: "#9CA3AF",
        mist: "#E8ECE9",
      },
      fontFamily: {
        cormorant: ["Cormorant Garamond", "serif"],
        dm: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
