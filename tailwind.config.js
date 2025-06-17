/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'xl2': '1250px',
        'xl' : '1070px',
      },
      fontFamily: {
        chaney: ['chaney'],
        sans: ['Noto Sans KR'],
      },
      colors: {
        lckWhite: '#E2E4F2',
        lckBlack: '#1C192B',
      }
    },
  },
  plugins: [],
}
