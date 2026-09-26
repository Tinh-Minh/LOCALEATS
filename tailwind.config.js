/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E84A27",
        "primary-container": "#FF5436",
        secondary: "#F58A07",
        "secondary-container": "#FF9F1C",
        tertiary: "#2C694E",
        background: "#FDFBF7",
        surface: "#FDFBF7",
        "on-surface": "#231812",
        "on-surface-variant": "#5C453C",
        "on-primary": "#FFFFFF",
        "surface-container": "#F6ECE1",
        "surface-container-high": "#F5ECE3",
        "surface-container-lowest": "#FFFFFF",
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        lg: "1.25rem",
        xl: "2rem",
        full: "9999px",
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        gutter: "1rem",
        "gutter-desktop": "1.5rem",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      fontSize: {
        "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.04em", fontWeight: "800" }],
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "700" }],
        "label-lg": ["14px", { lineHeight: "18px", letterSpacing: "0.01em", fontWeight: "700" }],
        "body-sm": ["12px", { lineHeight: "16px" }],
        "body-md": ["14px", { lineHeight: "20px" }],
        "headline-sm": ["18px", { lineHeight: "24px", fontWeight: "600" }],
        "headline-md": ["22px", { lineHeight: "28px", fontWeight: "700" }],
      },
    },
  },
  plugins: [],
};