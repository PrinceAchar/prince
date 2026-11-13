"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getClientDb } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { defaultContent } from "./content-defaults";
import { mergeContent } from "./content-merge";
import type { SiteContent } from "./content-types";

const ContentContext = createContext<SiteContent>(defaultContent);

export function useContent(): SiteContent {
  return useContext(ContentContext);
}

/**
 * `initialContent` is resolved on the server (see lib/content-server.ts) so the
 * first HTML paint already contains the published copy — no content flash and
 * no client-only text for crawlers. The client refresh below only matters when
 * Firestore is edited mid-session or the server loader was unavailable.
 */
export function ContentProvider({
  children,
  initialContent,
}: {
  children: ReactNode;
  initialContent?: SiteContent;
}) {
  const [content, setContent] = useState<SiteContent>(initialContent ?? defaultContent);

  useEffect(() => {
    let cancelled = false;
    try {
      const db = getClientDb();
      if (!db) return;
      getDoc(doc(db, "siteContent", "main"))
        .then((snap) => {
          if (!cancelled && snap.exists()) {
            const data = snap.data() as Partial<SiteContent>;
            setContent(mergeContent(defaultContent, data));
          }
        })
        .catch(() => {
          // Firebase not configured or offline — keep the server/default content.
        });
    } catch {
      // Firebase not configured — keep the server/default content.
    }
    return () => {
      cancelled = true;
    };
  }, []);

  // Apply the admin panel's colour-theme choice (Site Settings → Theme).
  // data-theme drives the CSS token overrides in globals.css; the value is
  // cached so the inline pre-paint script can restore it on the next visit.
  const theme = content.settings?.theme ?? "light";
  useEffect(() => {
    try {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem("pa-theme", theme);
    } catch {
      // storage unavailable — theme still applies for this page view
    }
  }, [theme]);

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}

export async function saveContent(content: SiteContent): Promise<void> {
  const db = getClientDb();
  await setDoc(doc(db, "siteContent", "main"), content);
}

export async function resetContent(): Promise<void> {
  const db = getClientDb();
  await setDoc(doc(db, "siteContent", "main"), defaultContent);
}
