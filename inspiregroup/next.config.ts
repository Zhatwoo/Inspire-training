import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Allows your device at 192.168.1.135 to access the dev server
  allowedDevOrigins: ["192.168.1.135", "192.168.1.243", "192.168.1.135", "192.168.137.1", "192.168.1.65"],
};

export default nextConfig;
