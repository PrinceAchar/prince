import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Authentic Delhi Pickles & Murabba`,
    short_name: SITE_NAME,
    description:
      "Handcrafted pickles, murabba and chutneys from Khari Baoli, Old Delhi. Made in small batches since 1980.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF5E4",
    theme_color: "#FAF5E4",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
