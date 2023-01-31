/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      "white": "#FDFDFF",
      "primary": "#372274",
      "primary-interact": "#7A62B8",
      "black" : "#171717",
      "transparent": "transparent",
    },
    fontFamily: {
      title: ["Nunito", "sans-serif"],
      text: ['PT Sans', "sans-serif"]
    },
    extend: {},
  },
  plugins: [],
}
