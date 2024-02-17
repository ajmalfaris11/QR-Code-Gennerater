/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        "primary-hover": "#4f46e5",
        secondary: "#ec4899",
        surface: "rgba(30, 41, 59, 0.7)",
      },
      backgroundImage: {
        'gradient-main': 'radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.15) 0px, transparent 50%)',
      }
    },
  },
  plugins: [],
}
