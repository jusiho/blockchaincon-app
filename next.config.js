/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      remotePatterns: [
        {
          protocol: "https",
          port: "",
          hostname: "blockchaincon.la",
          // pathname: "/uploads/**",
        },
        {
          protocol: "http",
          port: "3000",
          hostname: "localhost",
        },
      ],
      // path: '/_next/image',
      loader: "default",
    },
  };
  
  module.exports = nextConfig;
  