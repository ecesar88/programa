/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./renderer/src/**/*.{html,js,ts,tsx,jsx}'],
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {}
  }
}
