/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   './src/**/*.{js,ts,jsx,tsx,mdx}',
   './src/components/**/*/*.{js,ts,jsx,tsx,mdx}',
   './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Кастомные breakpoints
      screens: {
        'xs': '360px',    // Мобильные маленькие
        'md': '768px',    // Стандартный tablet (Tailwind)
        'xl': '1440px',  // Ваш кастомный
 
      },
       fontFamily: {
        'inter': ['var(--font-inter-regular)', 'system-ui', 'sans-serif'],
        'inter-black': ['var(--font-inter-black)', 'system-ui', 'sans-serif'],
        'inter-medium': ['var(--font-inter-medium)', 'system-ui', 'sans-serif'],
      // Кастомные цвета
       },
      colors: {
        // Основные цвета (альтернативные названия)
        'primary': {
          'black': '#000000',
          'white': '#FFFFFF',
          'black-soft': '#1A1A1A',
          'white-soft': '#F8F8F8',
          'black-rich': '#0A0A0A',
          'white-ivory': '#FFFFF0',
        },
        // Акцентные цвета для состояний
        'accent': {
          'red': '#DC2626',
          'green': '#16A34A',
          'blue': '#2563EB',
          'yellow': '#D97706',
          'purple': '#9333EA',
          'pink': '#DB2777',
        }
      },
      // Кастомные spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Кастомные opacity для тонких эффектов
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '65': '0.65',
        '85': '0.85',
      }
    },
  },
  plugins: [],
}