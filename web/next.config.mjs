/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["localhost", "lh3.googleusercontent.com"],
  },
};

export default nextConfig;
