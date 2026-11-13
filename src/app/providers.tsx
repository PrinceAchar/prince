"use client";

import { type ReactNode } from "react";
import { ContentProvider } from "@/lib/content";
import type { SiteContent } from "@/lib/content-types";

export default function Providers({
  children,
  initialContent,
}: {
  children: ReactNode;
  initialContent?: SiteContent;
}) {
  return (
    <ContentProvider initialContent={initialContent}>{children}</ContentProvider>
  );
}
