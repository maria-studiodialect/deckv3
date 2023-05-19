/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xxl: '1980px',
      },
      fontFamily: {
        sharp: ['Sharp Sans', 'sans-serif'],
        editorial: ['Editorial Light', 'serif'],
        shameless: ['Shameless', 'serif'],
      },
      colors: {
        beige: '#F7F4EE',
        charcoal: '#2F2727'
      },
      fontSize: {
        xxs: '0.8em', 
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-(beige|charcoal)/,
    },
  ],
}
