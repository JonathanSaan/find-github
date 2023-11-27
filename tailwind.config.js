module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    colors: {
      white: "#fafafa",
      green: {
        500: "#2ecc71",
        600: "#25a25a",
        700: "#1b7943",
      },
      stone: {
        950: "#0e0e0e",
      },
      zinc: {
        500: "#707070",
      },
    },
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1.3s ease-in-out forwards",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
