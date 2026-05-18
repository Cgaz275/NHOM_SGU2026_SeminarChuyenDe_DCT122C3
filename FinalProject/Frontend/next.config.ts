import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: '**.firebasestorage.app',
      }
    ],
  },
  allowedDevOrigins: ['192.168.1.8', 'shorty-lazily-dainty.ngrok-free.dev'],
};

export default nextConfig;
