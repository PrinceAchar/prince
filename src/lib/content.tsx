"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getClientDb } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { defaultContent } from "./content-defaults";
import type { SiteContent } from "./content-types";

const ContentContext = createContext<SiteContent>(defaultContent);

export function useContent(): SiteContent {
  return useContext(ContentContext);
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    let cancelled = false;
    const db = getClientDb();
    getDoc(doc(db, "siteContent", "main"))
      .then((snap) => {
        if (!cancelled && snap.exists()) {
          const data = snap.data() as Partial<SiteContent>;
          setContent(mergeContent(defaultContent, data));
        }
      })
      .catch(() => {
        // Firebase not configured or offline — use defaults
      });
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

function mergeContent(defaults: SiteContent, overrides: Partial<SiteContent>): SiteContent {
  const result = { ...defaults };
  for (const key of Object.keys(overrides) as (keyof SiteContent)[]) {
    if (overrides[key] !== undefined && overrides[key] !== null) {
      (result as Record<string, unknown>)[key] = overrides[key];
    }
  }
  return result;
}
