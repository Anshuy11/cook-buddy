
import { db } from "../firebase/firebase";
import { doc, setDoc, getDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

/*
  Save a bookmarked recipe for the user
 */
export async function saveBookmark(uid, recipe) {
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
export async function isBookmarked(uid, recipeId) {
  const ref = doc(db, "users", uid, "bookmarks", recipeId.toString());
  const snap = await getDoc(ref);
  return snap.exists();
}

/*
  Optional: Remove a bookmark
 */
export async function removeBookmark(uid, recipeId) {
  const ref = doc(db, "users", uid, "bookmarks", recipeId.toString());
  await deleteDoc(ref);
}
