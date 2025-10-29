/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/forms/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/layout/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/layout/footer/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/layout/header/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/layout/list/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stocks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Кастомные breakpoints
      screens: {
        'xs': '360px',    // Мобильные маленькие
        'sm': '640px',    // Стандартный mobile (Tailwind)
        'md': '768px',    // Стандартный tablet (Tailwind)
        'lg': '960px',    // Ваш кастомный
        'xl': '1024px',   // Стандартный desktop (Tailwind)
        '2xl': '1280px',  // Стандартный large (Tailwind)
        '3xl': '1440px',  // Ваш кастомный
        '4xl': '1536px',  // Большие мониторы
      },
      // Кастомные цвета
      colors: {
        // Расширенная палитра черного
        'black': {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          DEFAULT: '#000000',
          'pure': '#000000',
          'rich': '#0A0A0A',
          'soft': '#1A1A1A',
          'charcoal': '#2D2D2D',
          'graphite': '#434343',
        },
        // Расширенная палитра белого
        'white': {
          50: '#FFFFFF',
          100: '#FEFEFE',
          200: '#FDFDFD',
          300: '#FCFCFC',
          400: '#FAFAFA',
          500: '#F8F8F8',
          600: '#F6F6F6',
          700: '#F4F4F4',
          800: '#F2F2F2',
          900: '#F0F0F0',
          DEFAULT: '#FFFFFF',
          'pure': '#FFFFFF',
          'ivory': '#FFFFF0',
          'snow': '#FFFAFA',
          'ghost': '#F8F8FF',
          'seashell': '#FFF5EE',
        },
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