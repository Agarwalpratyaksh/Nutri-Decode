/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '112': '28rem',
        '144': '36rem',
        '160': '40rem',
        '15':'3.75rem',
        '76':'19rem',
        '94':'23.5rem',
        '1200':'1200px',
        '4.5':'18px',
        '3.5':'14px',
        '128':'32rem',
        '13':'3.25rem',
      }
    }
  },
  plugins: [],
}

