/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        customFont: ['"Custom Font"', "sans-serif"],
        // Add more custom font families as needed
        poppins: ["Poppins", "sans-serif"],
        figtree: ["Figtree","sans-serif"],
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'tahiti': {
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
      },
      'sage': '#607A67',
      'darksage': '#4D6252',
      'sagelite': '#b4c2b7',
      'lightsage': '#d1ded4',
      'red': '#b91c1c',
    
    },
  },
  plugins: [],
}