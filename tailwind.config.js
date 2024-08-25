/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html', // Include root-level HTML files
    './*.js', // Include root-level JavaScript files
    './components/**/*.{js,jsx,ts,tsx}', // Include a components directory if you have one
    './views/**/*.ejs', // Include EJS files in the views directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}