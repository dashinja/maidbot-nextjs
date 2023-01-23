/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      /**
       * Initial Layout
       */
      "text-normal": "#d5d5d5",
      "submit-button": "#e0e0e0",
      "button-disabled": "#3e3e79",
      "text-button-disabled":"#2e3269",

      /**
       * 
       */
    }
  },
  plugins: [],
}