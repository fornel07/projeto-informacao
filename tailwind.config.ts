import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        pin: {
          blue: "#074BED",
          "blue-hover": "#0039CB",
          "blue-light": "#EEF4FF",
          gray: "#C2C2C2",
          "gray-border": "#E4E4E7",
          "gray-light": "#F4F4F5",
          dark: "#000000",
        },
      },
    },
  },
  plugins: [],
};

export default config;
