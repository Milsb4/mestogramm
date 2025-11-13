import { Inter } from 'next/font/google'

// Inter Regular (основной)
export const interRegular = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter-regular',
  weight: '400', // Regular
})

export const interMedium = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter-medium',
  weight: '500', // Medium
})

// Inter Black (для заголовков)
export const interBlack = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter-black',
  weight: '900', // Black
})
