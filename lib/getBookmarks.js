import { db } from "../firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function getBookmarks(uid) {
  const ref = collection(db, "users", uid, "bookmarks");
  const q = query(ref, orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
