import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in a parent folder would otherwise be picked as the workspace root.
  turbopack: { root: __dirname },
};

export default nextConfig;
