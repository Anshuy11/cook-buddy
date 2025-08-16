export interface ClickedLink {
  id: string;        // Firestore doc ID
  path: string;      // The clicked link path
  timestamp: Date | null; // Firestore timestamp converted to Date
}
