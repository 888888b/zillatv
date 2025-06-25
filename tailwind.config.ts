import type { Config } from "tailwindcss";

const config: Config = {

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        raleway: ['var(--font-raleway)', 'sans-serif'],
        noto_sans: ['var(--font-noto-sans)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif']
      },

      colors: {
        orangered: 'rgb(255, 69, 0)',
        darkslateblue: '#483D8B',
        darkpurple: '#16142B',
        richblack: '#080C1E',
        deepnight: '#020515',

        // novas cores
        primary: "#FFFF13",
        background: "#0B0019",
        secondary: "#16142B",
        "secondary-tx": "#a3a3a3",
        "accent": "#FFFFFF",
        "success": "",
        "error": ""
      },
    },
  },

  plugins: [
    require('daisyui'),
  ],


};
export default config;
