import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetails from "@/components/ProductDetails";
import ProductGallery from "@/components/ProductGallery";
import ProductGrid from "@/components/ProductGrid";
import { Suspense } from "react";
import {
  getAllProductHandles,
  getProductByHandle,
  getProductsByCollectionHandle,
  type ShopifyProduct,
} from "@/lib/shopify";
import { productJsonLd } from "@/lib/jsonld";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  const handles = await getAllProductHandles();
  return handles.map((handle) => ({ handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) {
    return { title: "Product not found" };
  }

  const title = `${product.title} | ${SITE_NAME}`;
  const description = product.description.trim();
  const image = product.images.edges[0]?.node;
  const url = `${SITE_URL}/products/${product.handle}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: image
        ? [{ url: image.url, width: image.width, height: image.height, alt: image.altText || product.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image.url] : undefined,
    },
  };
}

async function getRelatedProducts(product: ShopifyProduct): Promise<ShopifyProduct[]> {
  const collectionHandle = product.collections?.edges[0]?.node.handle;
  if (!collectionHandle) return [];
  const collectionProducts = await getProductsByCollectionHandle(collectionHandle, 20);
  return collectionProducts.filter((p) => p.handle !== product.handle).slice(0, 4);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  const related = await getRelatedProducts(product);

  return (
    <>
      {product && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
        />
      )}
      <Navbar />

      <main className="pt-[60px] md:pt-[70px]">
        {/* PRODUCT DETAILS */}
        <section className="bg-white py-10 md:py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
              <ProductGallery product={product} />
              <ProductDetails product={product} />
            </div>
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        {related.length > 0 && (
          <section className="bg-yellow py-12 md:py-20">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="text-center mb-8 md:mb-12">
                <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-3">
                  You May Also Like
                </span>
                <h2 className="font-heading text-[26px] md:text-[34px] font-bold text-brand-black mb-3 leading-tight">
                  Related Products
                </h2>
              </div>
              <Suspense>
                <ProductGrid products={related} />
              </Suspense>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
