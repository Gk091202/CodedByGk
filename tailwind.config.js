/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0a0a0a",
          card: "#141414",
          border: "#242424",
        },
        light: {
          bg: "#ffffff",
          card: "#f8f8f8",
          border: "#e5e5e5",
        },
        accent: {
          primary: "#8b5cf6",
          secondary: "#ec4899",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-space)"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "#a1a1aa",
            a: {
              color: "#8b5cf6",
              "&:hover": {
                color: "#a78bfa",
              },
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
