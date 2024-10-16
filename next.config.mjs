// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['upload.wikimedia.org'], // Add more domains if your images are hosted elsewhere
    },
  };
  
  export default nextConfig;
  