/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      /**
       * Background
       */
      background: "#47478a",

      /**
       * Initial Layout
       */
      "text-normal": "#d5d5d5",
      "submit-button": "#e0e0e0",
      "submit-button-text": "#1e1d1d",
      "button-disabled": "#3e3e79",
      "text-button-disabled": "#2e3269",
      "input-box-bottom": "#2e2e5a",

      /**
       * Enabled States
       */
      "red-one": "#ef4444",
    },
  },
  plugins: [],
};
