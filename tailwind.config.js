/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alabaster: "#FAFAFA",
        charcoal: "#121212",
        nude: "#D1BFAE",
        "nude-dark": "#B8A494",
      },
      fontFamily: {
        heading: ["Wensley", "serif"],
        body: ["Visia Pro", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.08em",
        wide: "0.2em",
      },
    },
  },
  plugins: [],
};
