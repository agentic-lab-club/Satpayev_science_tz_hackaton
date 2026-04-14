import type { NextConfig } from "next";

const backendInternalUrl = process.env.BACKEND_INTERNAL_URL ?? "http://backend:8080";
const aiServiceInternalUrl = process.env.AI_SERVICE_INTERNAL_URL ?? "http://ai-service:8000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: `${backendInternalUrl}/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${backendInternalUrl}/api/:path*`,
      },
      {
        source: "/ai-service/:path*",
        destination: `${aiServiceInternalUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
