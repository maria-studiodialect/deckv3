/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/unity/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/octet-stream',
          },
        ],
      },
    ]
  },
  images: {
    domains: ['cdn.shopify.com'],
  },
}

module.exports = nextConfig