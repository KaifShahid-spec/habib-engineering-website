import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 🚨 Ye line images ke bahar aayegi, direct yahan
  allowedDevOrigins: ['192.168.1.84'], 
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', 
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', 
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;