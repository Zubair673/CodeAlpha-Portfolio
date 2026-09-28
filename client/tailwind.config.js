/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        themeBg: "var(--bg-color)",
        themeText: "var(--text-color)",
        themeCard: "var(--card-color)",
        themeBorder: "var(--border-color)",
      },
    },
  },

  plugins: [],
};