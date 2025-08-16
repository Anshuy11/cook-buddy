import { db } from "../firebase/firebase";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";

// Type for recipe object passed from frontend
export interface Recipe {
  id: string | number;
  title: string;
  image: string;
  [key: string]: any; // optional fallback
}

/*
  Save a bookmarked recipe for the user
*/
export async function saveBookmark(uid: string, recipe: Recipe): Promise<void> {
  const ref = doc(db, "users", uid, "bookmarks", recipe.id.toString());
  await setDoc(ref, {
    title: recipe.title,
    image: recipe.image,
    timestamp: serverTimestamp(),
  });
}

/*
  Check if the recipe is already bookmarked
*/
export async function isBookmarked(
  uid: string,
  recipeId: string | number
): Promise<boolean> {
  const ref = doc(db, "users", uid, "bookmarks", recipeId.toString());
  const snap = await getDoc(ref);
  return snap.exists();
}

/*
  Remove a bookmark
*/
export async function removeBookmark(
  uid: string,
  recipeId: string | number
): Promise<void> {
  const ref = doc(db, "users", uid, "bookmarks", recipeId.toString());
  await deleteDoc(ref);
}
