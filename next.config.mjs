/** @type {import('next').NextConfig} */
const nextConfig = {
  // unlocking images from external sites
  //   you can get the host name form the error message and configure it as such
  images: {
    remotePatterns: [{ hostname: 'res.cloudinary.com' }],
  },
};

export default nextConfig;
