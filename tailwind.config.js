/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-dark-main": "#222328",
        "gray-dark-second": "#3b4148",
        "gray-light": "#6e6c78",
        "pink-main": "#c33ea6",
      },
    },
  },
  plugins: [],
};
