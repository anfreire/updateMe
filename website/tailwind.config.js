// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gray-1/3": "rgba(119, 119, 119, 0.33)",
        "gray-1/2": "rgba(119, 119, 119, 0.5)",
        "gray-2/3": "rgba(119, 119, 119, 0.66)",
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
