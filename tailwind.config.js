/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/app/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/components/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/styles/**/*.{css,scss,mdx}",
    "./public/**/*.html"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-tektur)", "ui-sans-serif", "system-ui"],
        mono: ["Fira Mono", "ui-monospace", "SFMono-Regular"],
      },
      colors: {
        primary: "#0ff0fc", // neon cyan
        secondary: "#8b5cf6", // purple
        accent: "#00ff99", // neon green
        background: "#18181b", // dark background
        card: "rgba(36,37,46,0.7)", // glassmorphism card
        border: "#2a2a40",
        'neon-pink': '#ff00cc',
        'neon-blue': '#00eaff',
        'neon-green': '#39ff14',
      },
      borderRadius: {
        xl: "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        neon: "0 0 20px #0ff0fc, 0 0 40px #8b5cf6",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        'neon-pink': '0 0 16px #ff00cc',
        'neon-blue': '0 0 16px #00eaff',
        'neon-green': '0 0 16px #39ff14',
      },
      animation: {
        gradient: "gradient 3s ease infinite",
        pulseGlow: "pulseGlow 2s infinite alternate",
      },
      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        pulseGlow: {
          "0%": { boxShadow: "0 0 10px #0ff0fc" },
          "100%": { boxShadow: "0 0 30px #8b5cf6" },
        },
      },
    },
  },
  plugins: [],
};