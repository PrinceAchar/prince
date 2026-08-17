"use client";

import { type ReactNode } from "react";
import { ContentProvider } from "@/lib/content";

export default function Providers({ children }: { children: ReactNode }) {
  return <ContentProvider>{children}</ContentProvider>;
}
