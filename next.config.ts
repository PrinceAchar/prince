import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
  async redirects() {
    return [
      // Was listed in the old sitemap; keep the URL alive for crawlers.
      {
        source: "/store-locator",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
