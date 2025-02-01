/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Match all files in the src directory
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8', // Add a custom primary color
        secondary: '#9333ea', // Add a custom secondary color
      },
      spacing: {
        128: '32rem', // Custom spacing example
      },
      borderRadius: {
        '4xl': '2rem', // Custom border radius
      },
    },
  },
  plugins: [],
};
