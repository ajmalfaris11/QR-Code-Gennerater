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
        "primary-hover": "#f4f4f5",
        secondary: "#000000",
        surface: "rgba(9, 9, 11, 0.6)",
        zinc: {
          950: "#09090b",
        }
      },
      backgroundImage: {
        'gradient-main': 'radial-gradient(at 0% 0%, rgba(255, 255, 255, 0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(0, 0, 0, 0.4) 0px, transparent 50%)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
      }
    },
  },
  plugins: [],
}
