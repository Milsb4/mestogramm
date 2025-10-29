/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: '**', // Разрешает любые домены
    }],
    unoptimized: true // Отключает оптимизацию Next.js
  },
}

module.exports = nextConfig