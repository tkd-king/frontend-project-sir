// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export', 
//   images: {
//     // unoptimized: true, // Disables image optimization for static export,
//     remotePatterns: [
//       {
//         protocol: 'https',             // Cloudinary URLs typically use HTTPS
//         hostname: 'res.cloudinary.com', // Your image domain
//         port: '',                       // Leave empty if no specific port is used
//         pathname: '/**',                // Matches all paths on the Cloudinary domain
//       },
//     ],
//   },
// };
// module.exports = {
//   output: "export", // Enables static export
// };
// export default nextConfig;

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
