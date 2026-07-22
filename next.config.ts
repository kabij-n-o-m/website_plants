import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://bs.plantnet.org/image/**')],
  },

};

export default nextConfig;
