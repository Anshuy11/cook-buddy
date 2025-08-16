import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";

export interface ClickedLink {
  id: string;
  path: string;
  timestamp: Date | null;
}

export async function getClickedLinks(uid: string): Promise<ClickedLink[]> {
  const ref = collection(db, "users", uid, "clickedLinks");
  const q = query(ref, orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc: QueryDocumentSnapshot) => {
    const data = doc.data() as {
      path: string;
      timestamp?: Timestamp;
    };

    return {
      id: doc.id,
      path: data.path,
      timestamp: data.timestamp ? data.timestamp.toDate() : null,
    };
  });
}
