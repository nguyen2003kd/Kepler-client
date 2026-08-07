/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone", // disable on Windows to avoid symlink EPERM build errors
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
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
    ],
  },
  //  async rewrites() {
  //   return [
  //     {
  //       source: "/admin/:path*",
  //       destination: "https://kepler-admin.vercel.app/admin/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
