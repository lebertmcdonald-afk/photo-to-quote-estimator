/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0F1E33",
        blue: {
          DEFAULT: "#1D5BD8",
          hover: "#123F9C",
        },
        panel: "#F2F5F9",
        border: "#D5DCE6",
        muted: "#4A5668",
        // Supporting shades used by the reference
        "navy-700": "#17283F",
        "navy-600": "#1A2C47",
        "navy-500": "#22344F",
        "navy-400": "#2B4166",
        "navy-300": "#22385A",
        "navy-200": "#3A5378",
        "navy-ink": "#A9B8CF",
        "navy-ink-2": "#93A4BE",
        "navy-ink-3": "#C9D4E5",
        "navy-ink-4": "#DCE6F5",
        "blue-soft": "#E8EFFC",
        "blue-soft-2": "#F5F8FD",
        "blue-dashed": "#9DB5DE",
        "red-pill-bg": "#FDECEA",
        "red-pill-fg": "#B42318",
        "amber-pill-bg": "#FFF1D6",
        "amber-pill-fg": "#9A5B00",
        "divider-soft": "#E3E8F0",
        "ink-soft": "#5B6879",
        // Roofer preview pages (/p/:slug) only. These come from the old
        // site template and are not Instant Quote AI brand colors.
        preview: {
          bg: "#0A0D0C",
          surface: "#141A18",
          surface2: "#1B221F",
          ink: "#F3F7F4",
          muted: "#9AA8A1",
          faint: "#6F7D76",
          brand: "#2DBE7E",
          "brand-dark": "#1F9A64",
          gold: "#F1B24A",
          line: "rgba(255,255,255,0.09)",
          "line-2": "rgba(255,255,255,0.14)",
        },
      },
      fontFamily: {
        display: ["Archivo", "Arial Narrow", "sans-serif"],
        sans: ["Public Sans", "Helvetica Neue", "Helvetica", "sans-serif"],
        inter: ["Inter", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      maxWidth: {
        container: "1180px",
      },
      boxShadow: {
        hero: "0 30px 60px -20px rgba(0,0,0,0.55)",
        toast: "0 18px 40px -12px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
