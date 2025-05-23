/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // '.s/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: ["Open Sans", "SF Pro Display", "sans-serif"],
      colors: {
        main: "#6200ee", // Google Classroomning yashil-brend rangi
        primary: "#222222", // Matnlar uchun asosiy qora rang
        bg: {
          1: "#F8F8F8", // Eng engil fon
          2: "#F5F5F5", // Keng tarqalgan fon
          3: "#E4E4E4", // Sarlavha yoki hover fon
          4: "#DDDDDD", // Ajratuvchi fon
        },
        accent: "#1A73E8", // Google'ga xos ko‘k rang (link, button)
        success: "#34A853", // Yashil (statuslar, success)
        warning: "#FBBC05", // Sariq (xatoliklar, ogohlantirish)
        danger: "#EA4335", // Qizil (error, delete)
        gray: {
          100: "#F8F9FA",
          200: "#E8EAED",
          300: "#DADCE0",
          400: "#BDC1C6",
          500: "#9AA0A6",
          600: "#80868B",
          700: "#5F6368",
          800: "#3C4043",
          900: "#202124",
        },
      },
      screens: {
        small: "360px",
        // => @media (min-width: 360px) { ... }

        xs: "450px",
        // => @media (min-width: 450px) { ... }

        sm: "650px",
        // => @media (min-width: 576px) { ... }

        // ms: "650px",
        // => @media (min-width: 650px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "992px",
        // => @media (min-width: 992px) { ... }

        "2xl": "1200px",
        // => @media (min-width: 1200px) { ... }

        "4xl": "1300px",
        // => @media (min-width: 1200px) { ... }

        "6xl": "1440px",
        // => @media (min-width: 1440px) { ... }

        "8xl": "1540px",
        // => @media (min-width: 1540px) { ... }
      },
    },
  },
  plugins: [],
};
