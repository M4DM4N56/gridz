import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";


export const saveTopster = async (uid: string, data: any) => {
  // if no user found, print warning
  if (!uid) {
    console.warn("tried to save topster without a UID");
    return;
  }

  console.log("Saving topster for", uid);
  
  // given the user collection path and the data
  // try to spread the new data over the old, change update time
  try {
    await setDoc(doc(db, "gridz", uid), {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } 
  
  catch (err) {
    console.error("Firestore save failed:", err);
  }
};


export const getTopster = async (uid: string) => {
  // create reference to user collection
  const ref = doc(db, "gridz", uid);
  
  // get the doc as a snapshot reference
  const snapshot = await getDoc(ref);

  // if user data exists, return it. else, return nothing
  return snapshot.exists() ? snapshot.data() : null;
};
