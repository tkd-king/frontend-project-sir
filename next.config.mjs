
/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Enables static export

  images: {
    unoptimized: true, // Disables Next.js Image optimization for static export
    remotePatterns: [
      {
        protocol: 'https',             // HTTPS for Cloudinary URLs
        hostname: 'res.cloudinary.com', // Cloudinary domain
        pathname: '/**',                // Matches all paths
      },
    ],
  },
};

export default nextConfig;
