import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use standalone output when not on Vercel
  ...(process.env.VERCEL !== '1' && {
    output: "standalone",
    distDir: process.env.NODE_ENV === "production" ? ".next-prod" : ".next",
  }),
  
  typescript: {
    ignoreBuildErrors: true
  },
  
  eslint: {
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  }
};

export default nextConfig;