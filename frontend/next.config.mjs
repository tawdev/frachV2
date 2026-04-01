/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Note for deployment: Add your VPS IP or Domain to allowed hostnames
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
      },
      // Example for Hostinger VPS (uncomment and update once you have your IP/Domain)
      /*
      {
        protocol: 'http',
        hostname: 'YOUR_VPS_IP_HERE',
        port: '3001',
      },
      */
    ],
  },
};


export default nextConfig;
