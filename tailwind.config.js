/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        cardTeam: "0px 2px 8px rgba(0, 0, 0, 0.25)",
        cardBikun: "0px 2px 4px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        gray: "#8E8D8D",
        primary: {
          alabaster: "#F8F8F8",
          malibu: "#64E6FB",
          "purple-heart": "#5038BC",
        },
        secondary: {
          cerise: "#C424A3",
          goldenrod: "#FFD668",
          mineshaft: "#333333",
        },
        state: {
          error: "#EB5757",
          success: "#27AE60",
          warning: "#F7B500",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
