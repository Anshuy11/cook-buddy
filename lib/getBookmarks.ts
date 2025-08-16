import { db } from "../firebase/firebase";
import { collection, getDocs, query, orderBy, DocumentData } from "firebase/firestore";

// Define a Bookmark type (adjust fields as per your Firestore schema)
export interface Bookmark {
  id: string;
  title?: string;
  url?: string;
  timestamp?: number; // or Firebase Timestamp if you store that
  [key: string]: any; // fallback for extra fields
}

export async function getBookmarks(uid: string): Promise<Bookmark[]> {
  const ref = collection(db, "users", uid, "bookmarks");
  const q = query(ref, orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as DocumentData),
  })) as Bookmark[];
}
