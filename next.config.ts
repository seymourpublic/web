import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The project lives inside a folder with an unrelated parent lockfile; pin
  // the workspace root so Turbopack stops walking up to find one.
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  async redirects() {
    // The Products page became Work. Temporary (307) redirects until the site
    // is live, so a browser never caches a move that might still change.
    return [{ source: "/products", destination: "/work", permanent: false }];
  },
};

export default nextConfig;
