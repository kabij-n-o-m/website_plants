import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://bs.plantnet.org/image/**'), new URL('https://d2seqvvyy3b8p2.cloudfront.net/**')],
  },

};

export default nextConfig;
