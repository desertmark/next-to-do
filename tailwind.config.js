import { nextui } from "@nextui-org/theme";
import { withTV } from "tailwind-variants/dist/transformer.js";
/** @type {import('tailwindcss').Config} */
module.exports = withTV({
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: { primary: "#dbc365" },
        },
        dark: {
          colors: {
            primary: "#968232",
          },
        },
      },
    }),
  ],
});
