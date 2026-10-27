import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomepageContent from "@/components/HomepageContent";
import { getFeaturedProducts } from "@/lib/featured";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/` },
};

export default async function Home() {
  const bestsellers = await getFeaturedProducts(3);

  return (
    <>
      <Navbar />
      <HomepageContent bestsellers={bestsellers} />
      <Footer />
    </>
  );
}
