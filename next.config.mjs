import path from 'path';
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  distDir: process.env.NODE_ENV === "production" ? ".next-prod" : ".next",
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    rules: {
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off"
    }
  }
};
export default nextConfig;