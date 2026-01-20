/** @type {import('tailwindcss').Config} */
module.exports = {
  // Ensure "dark" mode is enabled via class if you still use any dark: utilities
  darkMode: "class", 
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'border-spin': 'border-spin 4s linear infinite',
        'scan': 'scan 3s linear infinite',
        'cyber-glitch': 'glitch-flicker 0.4s step-end infinite',
      },
      keyframes: {
        'border-spin': {
          '100%': { transform: 'rotate(360deg)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'glitch-flicker': {
          '0%, 100%': { 
            transform: 'translate(0)', 
            textShadow: '0 0 8px rgba(6,182,212,0.4)' 
          },
          '20%': { 
            transform: 'translate(-1.5px, 1px)', 
            textShadow: '1.5px 0 #ff0000, -1.5px 0 #00ffff',
            opacity: '0.8'
          },
          '40%': { 
            transform: 'translate(1.5px, -1px)', 
            textShadow: '-1.5px 0 #ff0000, 1.5px 0 #00ffff',
            opacity: '1'
          },
          '60%': { 
            transform: 'translate(-1px, 0)',
            opacity: '0.9'
          },
        },
      },
    },
  },
  plugins: [],
}