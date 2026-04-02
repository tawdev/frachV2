/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'frachdark.com',
      },
      {
        protocol: 'https',
        hostname: 'www.frachdark.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};


export default nextConfig;
