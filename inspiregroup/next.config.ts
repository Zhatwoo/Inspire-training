import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["mysql2"],
  // Allow mobile/external device to access dev server without CORS issues
  allowedDevOrigins: ["192.168.1.242"],
};

export default nextConfig;
