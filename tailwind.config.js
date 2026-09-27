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
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.97)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 12px rgba(232, 74, 39, 0.3)" },
          "50%": { boxShadow: "0 0 24px rgba(232, 74, 39, 0.6)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(232, 74, 39, 0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(232, 74, 39, 0)" },
        },
        bounceIn: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "70%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        liveRing: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-out forwards",
        slideInLeft: "slideInLeft 0.4s ease-out forwards",
        slideInRight: "slideInRight 0.4s ease-out forwards",
        slideInUp: "slideInUp 0.5s ease-out forwards",
        slideInDown: "slideInDown 0.4s ease-out forwards",
        scaleIn: "scaleIn 0.3s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        glow: "glow 2s ease-in-out infinite",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        bounceIn: "bounceIn 0.6s ease-out forwards",
        wiggle: "wiggle 0.4s ease-in-out",
        gradientShift: "gradientShift 3s ease infinite",
        liveRing: "liveRing 1.5s ease-out infinite",
      },
      boxShadow: {
        "glow-primary": "0 0 20px rgba(232, 74, 39, 0.3)",
        "glow-primary-lg": "0 0 40px rgba(232, 74, 39, 0.4)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.08)",
        "glass-lg": "0 16px 48px rgba(0, 0, 0, 0.12)",
        "card-hover": "0 12px 36px rgba(0, 0, 0, 0.1)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};