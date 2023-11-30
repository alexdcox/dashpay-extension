/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/popup.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dp-bg-purple': 'var(--Purple-bg)',
        'dp-bg-purple-light': 'var(--Purple-bg-light)',
        'dp-bg-red': 'var(--Red-validation-bg)',
        'dp-bg-gray': 'var(--Gray-input-bg)',
        'dp-bg-green': 'var(--Green-validation-bg)',
        'dp-text-purple': 'var(--Purple-text)',
        'dp-text-gray': 'var(--Gray-text)',
        'dp-text-gray-dark': 'var(--Gray-icon-stroke)',
        'dp-text-red': 'var(--Red-validation-text)',
        'dp-text-green': 'var(--Green-validation-text)',
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

