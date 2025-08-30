/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./renderer/src/**/*.{html,js,ts,tsx,jsx}'],
  plugins: {
    '@tailwindcss/postcss': {}
    // 'postcss-import': {},
    // tailwindcss: {},
    // autoprefixer: {}
  }
}
