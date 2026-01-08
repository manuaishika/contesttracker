import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgb(var(--border))",
        input: "rgb(var(--input))",
        ring: "rgb(var(--ring))",
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        primary: {
          DEFAULT: "#00ff88",
          foreground: "#0a0a0a",
        },
        secondary: {
          DEFAULT: "#00d4ff",
          foreground: "#0a0a0a",
        },
        destructive: {
          DEFAULT: "#ff0000",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#282828",
          foreground: "#969696",
        },
        accent: {
          DEFAULT: "#00ff88",
          foreground: "#0a0a0a",
        },
        popover: {
          DEFAULT: "#1a1a1a",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#1a1a1a",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
