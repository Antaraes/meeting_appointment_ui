import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#0F172A",
        accent: "#04A369",
        background: "#F4F3F8",
        detail : "#888888",
        "text-white": "#f8f8f8",
        "text-black": "#0F172A",
      },
    },
  },
  plugins: [],
};
export default config;
