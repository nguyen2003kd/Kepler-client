/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone", // disable on Windows to avoid symlink EPERM build errors
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3003",
        pathname: "/api/storage/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/api/storage/uploads/**",
      },
      {
        protocol: "https",
        hostname: "smeq-dev.meucorp.com",
        pathname: "/api/storage/uploads/**",
      },
      {
        protocol: "https",
        hostname: "case-smq.vn",
        pathname: "/api/storage/uploads/**",
      },
      {
        protocol: "https",
        hostname: "case-smq.vn",
        pathname: "/_next/image/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
   async rewrites() {
    return [
      {
        source: "/admin/:path*",
        destination: "https://kepler-admin.vercel.app/admin/:path*",
      },
    ];
  },
};

export default nextConfig;
