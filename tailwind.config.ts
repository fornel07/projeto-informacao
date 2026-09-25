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
          amber: "#FFB30F",
          gold: "#FFA300",
          brown: "#7C4800",
          dark: "#1C1F26",
          sand: "#FAF7F2",
        },
      },
    },
  },
  plugins: [],
};

export default config;
