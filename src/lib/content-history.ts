import { getClientDb } from "./firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import type { SiteContent } from "./content-types";

export interface HistorySnapshot {
  id: string;
  savedAt: number;
  savedBy: string;
  content: SiteContent;
}

const HISTORY_COLLECTION = "siteContentHistory";
const MAX_SNAPSHOTS = 20;

/**
 * Saves a snapshot of the site content as it was BEFORE a save/reset,
 * so every publish can be rolled back. Requires Firestore rules allowing
 * read/write for admin emails on `siteContentHistory/{doc}`.
 */
export async function pushHistorySnapshot(
  content: SiteContent,
  savedBy: string
): Promise<void> {
  const db = getClientDb();
  await addDoc(collection(db, HISTORY_COLLECTION), {
    savedAt: Date.now(),
    savedBy,
    // Deep-copy so Firestore never sees live references.
    content: JSON.parse(JSON.stringify(content)) as SiteContent,
  });

  // Prune oldest snapshots beyond the cap.
  const snap = await getDocs(
    query(collection(db, HISTORY_COLLECTION), orderBy("savedAt", "desc"))
  );
  const excess = snap.docs.slice(MAX_SNAPSHOTS);
  await Promise.all(excess.map((d) => deleteDoc(d.ref)));
}

/** Most recent snapshots, newest first. */
export async function listHistorySnapshots(
  max = 15
): Promise<HistorySnapshot[]> {
  const db = getClientDb();
  const snap = await getDocs(
    query(
      collection(db, HISTORY_COLLECTION),
      orderBy("savedAt", "desc"),
      limit(max)
    )
  );
  return snap.docs.map((d) => {
    const data = d.data() as Omit<HistorySnapshot, "id">;
    return { id: d.id, ...data };
  });
}
