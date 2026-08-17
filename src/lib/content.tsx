"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
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

  const fetchContent = useCallback(async () => {
    try {
      const db = getClientDb();
      const snap = await getDoc(doc(db, "siteContent", "main"));
      if (snap.exists()) {
        const data = snap.data() as Partial<SiteContent>;
        setContent(mergeContent(defaultContent, data));
      }
    } catch {
      // Firebase not configured or offline — use defaults
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

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
