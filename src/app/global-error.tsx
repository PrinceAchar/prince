"use client";

import { useEffect } from "react";

/**
 * Catches errors thrown in the root layout itself, where `error.tsx` cannot
 * render. Must define its own <html> and <body>. Styles are inline because the
 * global stylesheet may not have loaded.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[princeachar] global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF5E4",
          color: "#1A1A1A",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <h1 style={{ fontSize: 28, margin: "0 0 12px", lineHeight: 1.2 }}>
            Prince Achar is temporarily unavailable
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.7, margin: "0 0 24px" }}>
            We hit an unexpected error while loading the site. Please refresh, or
            try again in a moment.
          </p>
          {error.digest && (
            <p style={{ fontSize: 11, opacity: 0.5, margin: "0 0 24px" }}>
              Reference: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            style={{
              padding: "12px 28px",
              background: "#B3261E",
              color: "#fff",
              border: 0,
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
