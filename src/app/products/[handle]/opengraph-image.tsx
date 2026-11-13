import { ImageResponse } from "next/og";
import { getProductByHandle } from "@/lib/shopify";
import { SITE_NAME } from "@/lib/site";

export const alt = "Prince Achar product";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 3600;

/**
 * Per-product social card.
 *
 * File-based metadata takes precedence over `openGraph.images` in the page's
 * `generateMetadata`, so without this file the root branded card would replace
 * every product photo on social shares.
 */
export default async function ProductOpengraphImage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle).catch(() => null);

  const title = product?.title ?? SITE_NAME;
  const price = product?.priceRange.minVariantPrice;
  const priceLabel = price
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: price.currencyCode,
        maximumFractionDigits: 0,
      }).format(Number(price.amount))
    : null;

  let imageSrc: string | null = null;
  const remote = product?.images.edges[0]?.node.url;
  if (remote) {
    try {
      const res = await fetch(remote);
      if (res.ok) {
        const buf = await res.arrayBuffer();
        const mime = res.headers.get("content-type") || "image/png";
        imageSrc = `data:${mime};base64,${Buffer.from(buf).toString("base64")}`;
      }
    } catch {
      // Fall through to the text-only card.
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FAF5E4",
          padding: "64px 72px",
          gap: 56,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -160,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "rgba(179, 38, 30, 0.08)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: imageSrc ? 600 : 1056,
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 22,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#B3261E",
                fontWeight: 600,
                marginBottom: 28,
              }}
            >
              Khari Baoli · Since 1980
            </div>
            <div
              style={{
                fontSize: 68,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#16120E",
                fontWeight: 700,
                maxWidth: 600,
              }}
            >
              {title}
            </div>
            {priceLabel && (
              <div
                style={{
                  marginTop: 28,
                  fontSize: 32,
                  color: "#4A423A",
                  display: "flex",
                }}
              >
                {priceLabel}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 22,
              color: "#6B6156",
            }}
          >
            <div style={{ display: "flex" }}>princeachar.com</div>
            <div style={{ display: "flex", opacity: 0.35 }}>•</div>
            <div style={{ display: "flex" }}>Handcrafted in Old Delhi</div>
          </div>
        </div>

        {imageSrc && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 440,
              height: 502,
              borderRadius: 28,
              overflow: "hidden",
              background: "#FFFFFF",
              zIndex: 1,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={title}
              width={440}
              height={440}
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
      </div>
    ),
    size
  );
}
