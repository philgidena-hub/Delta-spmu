/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alabaster: "#F5F2EC",
        charcoal: "#1A2F23",
        nude: "#C9A96E",
        "nude-dark": "#A8893E",
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
