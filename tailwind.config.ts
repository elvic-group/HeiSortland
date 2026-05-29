import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#10172F",
        "deep-blue": "#16213E",
        warm: "#F6F3EC",
        accent: "#D9583B",
        sage: "#6F8F72",
        ink: "#1E1E2F",
        muted: "#6F6F78",
        border: "#E5E0D8",
        success: "#2D7D46",
        warning: "#D9A83B",
        error: "#C44536",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "4.5rem",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "3.5rem",
          { lineHeight: "1.08", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "2.5rem",
          { lineHeight: "1.1", letterSpacing: "-0.01em" },
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
