/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        secondary: "#000000",
        zinc: {
          950: "#09090b",
        },
        apple: {
          light: "rgba(255, 255, 255, 0.8)",
          dark: "rgba(22, 22, 23, 0.8)",
          border: "rgba(255, 255, 255, 0.12)",
          borderLight: "rgba(0, 0, 0, 0.12)",
        }
      },
      backgroundImage: {
        'gradient-apple': 'radial-gradient(at 0% 0%, rgba(255, 255, 255, 0.08) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(0, 0, 0, 0.8) 0px, transparent 50%)',
      },
      backdropBlur: {
        '3xl': '64px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
