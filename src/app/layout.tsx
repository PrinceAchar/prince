import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const SITE_DESCRIPTION =
  "Handcrafted pickles and preserves from the heart of Old Delhi. Authentic flavors passed down through generations since 1980.";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
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
    telephone: "+91 98110 56593",
    email: "info@princeachar.com",
    contactType: "customer service",
  },
  sameAs: ["https://www.instagram.com/princeacharindia/"],
};

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Prince Achar | Authentic Delhi Flavors",
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Prince Achar | Authentic Delhi Flavors",
    description: SITE_DESCRIPTION,
    images: [{ url: "/hero.png", width: 1200, height: 675, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prince Achar | Authentic Delhi Flavors",
    description: SITE_DESCRIPTION,
    images: ["/hero.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
