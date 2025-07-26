import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";


export const saveTopster = async (userId: string, topsterId: string, data: any) => {

  // if no user found, print warning
  if (!userId) {
    console.warn("missing user UID or topster ID");
    return;
  }
  // given the user collection path and the data
  // try to spread the new data over the old, change update time
  try {
    await setDoc(doc(db, "users", userId, "topsters", topsterId), {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } 
  
  catch (err) {
    console.error("Firestore save failed:", err);
  }
};


export const getTopster = async (userId: string, topsterId: string) => {

  if (!userId || !topsterId) return null
  // create reference to user collection
  const ref = doc(db, "users", userId, "topsters", topsterId);
  // get the doc as a snapshot reference
  const snapshot = await getDoc(ref);
  // if user data exists, return it. else, return nothing
  return snapshot.exists() ? snapshot.data() : null;
};


export const getAllTopsters = async (userId: string) => {
  // get reference to the user topsters directory
  const topstersRef = collection(db, "users", userId, "topsters");
  // get the docs as a snapshot reference
  const snapshot = await getDocs(topstersRef);
  // lay out each doc within the snapshot with its data
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};