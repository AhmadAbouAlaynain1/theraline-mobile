/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00D2F6",
        primaryDark: "#00A8C6",
        secondary: "#00353E",
        primaryLight: "#91E5F6",
      },
    },
  },
  plugins: [],
};
