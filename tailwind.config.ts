import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "completed-bg": "#A0ECB1",
        "completed-icon-bg": "#32D657",
        "in-progress-bg": "#F5D565",
        "in-progress-icon-bg": "#E9A23B",
        "will-not-do-bg": "#F7D4D3",
        "will-not-do-icon-bg": "#DD524C",
        "to-do-bg": "#E3E8EF",
      },
    },
  },
  plugins: [],
};
export default config;
