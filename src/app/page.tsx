import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomepageContent from "@/components/HomepageContent";
import { getFeaturedProducts } from "@/lib/featured";

export const revalidate = 3600;

export default async function Home() {
  const bestsellers = await getFeaturedProducts(4);

  return (
    <>
      <Navbar />
      <HomepageContent bestsellers={bestsellers} />
      <Footer />
    </>
  );
}
