/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',             // Cloudinary URLs typically use HTTPS
        hostname: 'res.cloudinary.com', // Your image domain
        port: '',                       // Leave empty if no specific port is used
        pathname: '/**',                // Matches all paths on the Cloudinary domain
      },
    ],
  },
};

export default nextConfig;
