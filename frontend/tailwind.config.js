/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4C003E",
        primaryLight: "#8e24aa",
        accent: "#ff9800",
        bg: "#f6f0fb",
        darkBg: "#160013",
      },
      boxShadow: {
        card: "0 0 20px rgb(92, 1, 69)",
        header: "0 4px 12px rgba(0,0,0,0.15)",
        form: "0 8px 20px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        xl2: "24px",
      },
    },
  },
  plugins: [],
};
