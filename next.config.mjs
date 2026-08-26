/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone", // disable on Windows to avoid symlink EPERM build errors
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4100",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "kepler-dev.meucorp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "case-smq.vn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/storage/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN || 'http://localhost:4100'}/api/storage/:path*`,
      },
    ];
  },
};

export default nextConfig;
