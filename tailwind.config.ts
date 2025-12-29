import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // 👇 ADD THIS LINE to include your modules folder
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000", 
        primaryBlue: "#2955FF", 
        primaryBlueHover: "#526FFF",
        primaryGreen: "#10b981", 
        primaryStroke: "#22242D", 
        secondaryStroke: "#2A2D36",
        textPrimary: "#FFFFFF",
        textSecondary: "#9CA3AF",
        textTertiary: "#6B7280",
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        ticker: 'ticker 10s linear infinite',
      }
    },
  },
  plugins: [],
};
export default config;