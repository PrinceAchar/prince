import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const paths = [
  "",
  "/achar",
  "/murabba",
  "/contact",
  "/faq",
  "/privacy",
  "/returns",
  "/shipping",
  "/store-locator",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
