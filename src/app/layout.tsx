import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import ScrollToTop from "@/components/ScrollToTop";
import Providers from "./providers";
import GoogleTagManager from "@/components/GoogleTagManager";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { getSiteContent } from "@/lib/content-server";

// Storefront copy is edited in /admin and stored in Firestore. Revalidating
// every minute means those edits reach crawlers and cold visitors without a
// redeploy, while still serving static HTML from the CDN in between.
export const revalidate = 60;

const SITE_DESCRIPTION =
  "Handcrafted pickles and preserves from the heart of Old Delhi. Authentic flavors passed down through generations since 1980.";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.jpeg`,
      description: SITE_DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shop No. 6673, Khari Baoli Road, Fatehpuri, Chandni Chowk",
        addressLocality: "New Delhi",
        postalCode: "110006",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91 98118 78767",
        email: "pannalaltavinderkumar@gmail.com",
        contactType: "customer service",
      },
      sameAs: ["https://www.instagram.com/princeacharindia/"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "GroceryStore",
      "@id": `${SITE_URL}/#store`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/logo.jpeg`,
      telephone: "+91 98118 78767",
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shop No. 6673, Khari Baoli Road, Fatehpuri, Chandni Chowk",
        addressLocality: "New Delhi",
        postalCode: "110006",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 28.6570235,
        longitude: 77.2212014,
      },
      sameAs: ["https://www.instagram.com/princeacharindia/"],
    },
  ],
};

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Prince Achar | Authentic Delhi Flavors",
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Prince Achar | Authentic Delhi Flavors",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Prince Achar | Authentic Delhi Flavors",
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF5E4" },
    { media: "(prefers-color-scheme: dark)", color: "#16120E" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialContent = await getSiteContent();

  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body>
        <GoogleTagManager />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-red focus:px-5 focus:py-3 focus:text-[13px] focus:font-semibold focus:uppercase focus:tracking-[1px] focus:text-white"
        >
          Skip to content
        </a>
        {/* Apply the stored colour theme before first paint to avoid a flash:
            defaults to "light" (the admin panel's current selection). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var t=localStorage.getItem("pa-theme");document.documentElement.dataset.theme=t||"light"}catch(e){document.documentElement.dataset.theme="light"}',
          }}
        />
        <Providers initialContent={initialContent}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          />
          <CartProvider>
            {children}
            <CartDrawer />
            <ScrollToTop />
          </CartProvider>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
