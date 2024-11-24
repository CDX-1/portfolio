import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        container: "var(--container)",
        gradient: "var(--gradient)",
      },
      animation: {
        rotate: 'rotate 20s infinite'
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg) scale(1, 1.5)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    },
  },
  plugins: [
    function ({ addComponents }: PluginAPI) {
      addComponents({
        ".text-gradient": {
          textDecoration: "none",
          backgroundClip: "text",
          backgroundImage:
            "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
          transition: "all 0.3s ease",
        },
        ".hover-text-gradient": {
          "&:hover": {
            color: "transparent",
            backgroundClip: "text",
            backgroundImage:
              "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
          },
        },
      });
    },
  ],
} satisfies Config;
