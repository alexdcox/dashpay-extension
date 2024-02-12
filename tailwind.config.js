/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/popup.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dp-purple': 'rgb(var(--purple) / <alpha-value>)',
        'dp-green': 'rgb(var(--green) / <alpha-value>)',
        'dp-red': 'rgb(var(--red) / <alpha-value>)',
        'dp-gray': 'rgb(var(--gray) / <alpha-value>)',
        'dp-gray-light': 'rgb(var(--gray-light) / <alpha-value>)',
        'dp-gray-dark': 'rgb(var(--gray-dark) / <alpha-value>)',
      },
      fontFamily: {
        // TODO: This isn't working?
        sans: ['Inter', 'sans-serif'],
        // serif: ['Inter', 'serif'],
      },
    },
  },
  plugins: [],
}

