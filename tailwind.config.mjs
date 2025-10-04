/** @type {import('tailwindcss').Config} */
export default {
  // Enables class-based dark mode
  darkMode: 'class',
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    // Note: 'screens' is outside 'extend' which means it REPLACES the defaults.
    // This is usually intentional if you want full control over breakpoints.
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    // FIX: All custom properties are now inside 'extend'.
    // This ADDS your styles to Tailwind's defaults.
    extend: {
      colors: {
        primary: "#B9FF66",
        black: "#000000",
        white: "#FFFFFF",
        gray: "#0D0C22",
        stone: "#231F20",
        lime: "#B9FF66",
        zinc: {
          100: "#F3F3F3",
          200: "#F0F0F0",
          300: "#D9D9D9",
          400: "#D8D8D8",
          500: "#898989",
          600: "#B0B0B0",
          700: "#787878",
          800: "#292A32",
          900: "#191A23",
        },
      },
      boxShadow: {
        card: "0px 5px 0px 0px #191A23",
      },
      fontFamily: {
        SpaceGrotesk: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};

