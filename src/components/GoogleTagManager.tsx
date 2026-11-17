"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { GTM_ID } from "@/lib/site";
import { pushPageView } from "@/lib/analytics";

/**
 * Google Tag Manager container (GTM-NXXBQ7LC).
 *
 * GA4 (G-30ZQMK56KN) and any other tags are configured inside the container —
 * the site never loads gtag.js directly, which keeps a single source of truth
 * and avoids double-counted page views.
 *
 * The App Router does client-side navigation, so GTM only sees the first page
 * by itself. Every subsequent route change pushes a `page_view` event that a
 * GA4 event tag can consume.
 */
export default function GoogleTagManager() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // The container's initial page view already covers the first page.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    pushPageView(window.location.pathname + window.location.search);
  }, [pathname]);

  return (
    <>
      {/* App Router: `beforeInteractive` is valid in the root layout; the
          eslint rule below only understands the legacy pages/_document. */}
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script
        id="gtm-container"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
