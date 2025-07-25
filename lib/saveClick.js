import { db } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function saveClickedLink(uid, linkPath) {
  const ref = collection(db, "users", uid, "clickedLinks");
  await addDoc(ref, {
    path: linkPath,
    timestamp: serverTimestamp(),
  });
}
