// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['sfmoma-media-dev.s3.us-west-1.amazonaws.com'], // Add other domains as needed
    },
  };
  
  export default nextConfig;
  