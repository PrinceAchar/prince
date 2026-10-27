import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllProductHandles } from "@/lib/shopify";

const paths = [
  "",
  "/achar",
  "/murabba",
  "/contact",
  "/faq",
  "/privacy",
  "/returns",
  "/shipping",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const handles = await getAllProductHandles();

  return [
    ...paths.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...handles.map((handle) => ({
      url: `${SITE_URL}/products/${handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
