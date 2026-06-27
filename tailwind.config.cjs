/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 24px 80px rgba(16, 185, 129, 0.12)'
      },
      colors: {
        brand: {
          ink: '#07110f',
          panel: '#0c1916',
          line: '#1f3330',
          gold: '#c9a86a',
          green: '#50d18d'
        }
      }
    }
  },
  plugins: []
};
