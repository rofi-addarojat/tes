import { collection, doc, getDoc, getDocs, query, where, orderBy, limit, addDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db, handleFirestoreError } from "./firebase";

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  date: string;
  authorName: string;
  categories: string[];
  status: "published" | "draft";
  createdAt?: any;
  updatedAt?: any;
}

export async function getLatestPosts(count = 3): Promise<Post[]> {
  try {
    const q = query(
      collection(db, "posts"),
      where("status", "==", "published"),
      orderBy("createdAt", "desc"),
      limit(count)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
  } catch (error) {
    handleFirestoreError(error, "list", "posts");
    return [];
  }
}

export async function getAllPosts(includeDrafts = false): Promise<Post[]> {
  try {
    let q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    if (!includeDrafts) {
      q = query(q, where("status", "==", "published"));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
  } catch (error) {
    handleFirestoreError(error, "list", "posts");
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // Note: If you only want published posts by slug for public users, we need to handle that.
    // However, getPostBySlug usually expects 1 document. We can query by slug.
    const q = query(collection(db, "posts"), where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const docData = snapshot.docs[0];
    return { id: docData.id, ...docData.data() } as Post;
  } catch (error) {
    handleFirestoreError(error, "list", "posts");
    return null;
  }
}
