/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#45DAFF",
          200: "#06B7E4",
          350: "#0E83A1",
          400: "#0D99FF",
          500: "#007FFE",
          600: "#005AB3",
          800: "#0A2463",
          900: "#2F2E41"
        },
        success: {
          hover: "#39C64F",
          disabled: "#55A361",
          default: "#2E993F"
        },
        cancel: {
          hover: "#DF1F24",
          disabled: "#BD5356",
          default: "#C7181D"
        },
        white: "#fefeff",
        black: "#2c2c2c"
      }
    }
  },
  plugins: []
};
