import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — Authentic Handcrafted Pickles from Old Delhi`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF5E4",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* warm corner wash */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -180,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "rgba(179, 38, 30, 0.10)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -200,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "rgba(214, 168, 60, 0.18)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#B3261E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FAF5E4",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            PA
          </div>
          <div
            style={{
              fontSize: 26,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#B3261E",
              fontWeight: 600,
            }}
          >
            Khari Baoli · Since 1980
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "#16120E",
              fontWeight: 700,
              maxWidth: 900,
            }}
          >
            Prince Achar
          </div>
          <div
            style={{
              fontSize: 40,
              lineHeight: 1.25,
              color: "#4A423A",
              marginTop: 22,
              maxWidth: 860,
            }}
          >
            Handcrafted pickles, murabba &amp; chutneys from Old Delhi
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            color: "#6B6156",
          }}
        >
          <div style={{ display: "flex" }}>princeachar.com</div>
          <div style={{ display: "flex", opacity: 0.35 }}>•</div>
          <div style={{ display: "flex" }}>Sun-matured · Preservative-free</div>
        </div>
      </div>
    ),
    size
  );
}
