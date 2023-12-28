// tailwind.config.js
const { nextui } = require("@nextui-org/react");

const screens = {
  "screen-no-navbar": "calc(100dvh - 64px)",
  "1/3-no-navbar": "calc(33.33dvh - 64px)",
  "1/2-no-navbar": "calc(50dvh - 64px)",
  "2/3-no-navbar": "calc(66.66dvh - 64px)",
};

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
      },
        height: {
        ...screens,
      },
      minHeight: {
        ...screens,
      },
        maxHeight: {
        ...screens,
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
