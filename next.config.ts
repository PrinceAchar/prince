import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/**
 * Content-Security-Policy.
 *
 * `'unsafe-inline'` is required for scripts because Next.js inlines the RSC
 * payload and the pre-paint theme script; moving to nonces would require
 * middleware and a per-request render. Everything else is locked to the
 * origins we actually talk to (Shopify, Firebase, Cloudinary, Vercel).
 *
 * `upgrade-insecure-requests` and `'unsafe-eval'` are production/development
 * specific: the former would break `http://localhost` in dev, and the latter is
 * only needed by the dev bundler.
 */
function contentSecurityPolicy(): string {
  const directives = [
    "default-src 'self'",
    [
      "script-src 'self' 'unsafe-inline'",
      isProd ? "" : "'unsafe-eval'",
      "https://va.vercel-scripts.com",
      "https://*.vercel-insights.com",
      "https://apis.google.com",
    ]
      .filter(Boolean)
      .join(" "),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    [
      "connect-src 'self'",
      "https://*.myshopify.com",
      "https://*.shopify.com",
      "https://api.cloudinary.com",
      "https://*.googleapis.com",
      "https://firestore.googleapis.com",
      "https://identitytoolkit.googleapis.com",
      "https://securetoken.googleapis.com",
      "https://*.firebaseio.com",
      "wss://*.firebaseio.com",
      "https://va.vercel-scripts.com",
      "https://vitals.vercel-insights.com",
    ].join(" "),
    "frame-src 'self' https://*.shopify.com https://*.myshopify.com https://accounts.google.com https://*.firebaseapp.com https://www.youtube.com https://player.vimeo.com",
    "media-src 'self' https: blob:",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://*.myshopify.com https://*.shopify.com https://checkout.shopify.com",
    "frame-ancestors 'none'",
    isProd ? "upgrade-insecure-requests" : "",
  ].filter(Boolean);

  return directives.join("; ");
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Content-Security-Policy", value: contentSecurityPolicy() },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
