// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media", // Can be 'media' or 'class' based on your preference
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      // Optional: Extend other theme properties if needed
    },
  },
  plugins: [],
};
export default config;

