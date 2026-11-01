/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0CA9FF',
          blueHover: '#0096E6',
          yellow: '#FBEC52',
          yellowHover: '#F4DF28',
          dark: '#0F172A',
          subtext: '#334155',
          lightBg: '#F8FAFC',
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'brand': 'none',
        'yellow-glow': 'none',
      }
    },
  },
  plugins: [],
}

