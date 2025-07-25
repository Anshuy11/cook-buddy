import { db } from "../firebase/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export async function getClickedLinks(uid) {
  const ref = collection(db, "users", uid, "clickedLinks");
  const q = query(ref, orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
}
