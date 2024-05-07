// tailwind.config.js
// const { withTV } = require('tailwind-variants/transformer');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/*.{js,jsx,ts,tsx}", "./components/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        "ai-gray": "#eaeaea",
      },
      fontSize:{
        "title" : "2xl"
      }
    },
  },
  plugins: [],
}

