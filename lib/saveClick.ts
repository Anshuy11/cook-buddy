import { db } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Shape of a clicked link document
 */
export interface ClickedLink {
  path: string;
  timestamp: any; // Firestore's serverTimestamp is FieldValue
}

/**
 * Save a clicked link for the user
 */
export async function saveClickedLink(
  uid: string,
  linkPath: string
): Promise<void> {
  const ref = collection(db, "users", uid, "clickedLinks");
  await addDoc(ref, {
    path: linkPath,
    timestamp: serverTimestamp(),
  });
}
