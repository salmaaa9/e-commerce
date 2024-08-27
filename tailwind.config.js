/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.css",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      boxShadow: {
        'lg': '0px 0px 15px -1px rgb(0 0 0 / 0.1) , 0 -4px 6px -4px rgb(0 0 0 / 0.1);',
      }
    },
  },
  plugins: [
      // require('flowbite/plugin')    
  ],
  darkMode : 'class'
}

