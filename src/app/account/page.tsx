"use client";

import "../../css/globals.css"

import { useRouter } from "next/navigation";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../../config/firebase";
import { signOut, User } from "firebase/auth";
import RequireAuth from "../../components/requireAuth";

import { useUser } from "../../contexts/userContext"

type TopsterMeta = {
  id: string;
  title: string;
};

export default function Page() {
  const { userId, user } = useUser()
  const router = useRouter();

  const [topsters, setTopsters] = useState<TopsterMeta[]>([]);

  // get user + and their topsters
  useEffect(() => {
    const getTopsters = async () => {
      if (!userId) return

      // get user's topsters
      const snapshot = await getDocs(collection(db, "users", userId, "topsters"));
      const topsterList = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
      }));
      setTopsters(topsterList)
    }
    getTopsters();
  }, [userId]);


  const handleCreateTopster = async () => {
    if (!userId || !user) return;

    // get snapshot of topsters
    const snapshot = await getDocs(collection(db, "users", userId, "topsters"));
    // given snapshot and userId, create a new topster ID and push user to ID page
    const newId = await createNewTopster(user, userId, snapshot.size);
    handleEditTopster(newId)
  };

  // bring user to topster page
  const handleEditTopster = (id: string) => {
    router.push(`/gridz?id=${id}`);
  };


  return <>
    
    <RequireAuth>
      {user?.displayName && <h1>Welcome, {user.displayName}!</h1>}

      <button onClick={async () => {
        await signOut(auth);
        router.push("/");
      }}>
        Log Out
      </button>

      <h2>Your Topsters</h2>

      {topsters.length === 0 ? (
        <p>No topsters yet!</p>
      ) : (
        topsters.map((topster) => (
          <div key={topster.id} style={{ marginBottom: "10px" }}>
            <button onClick={() => handleEditTopster(topster.id)}>
              {topster.title}
            </button>
          </div>
        ))
      )}

      <button onClick={handleCreateTopster}>
        Create New Topster
      </button>
    </RequireAuth>
    
  </>
}

export const createNewTopster = async (user: User, userId: string, existingCount: number) => {

  // create title using topster count, create reference to path
  const title = `${user?.displayName}'s Topster #${existingCount + 1}`;
  const topstersRef = collection(db, "users", userId, "topsters");
  
  // create topster with default settings (5x5, max 100)
  const newDoc = await addDoc(topstersRef, {
    title,
    rows: 5,
    cols: 5,
    tiles: Array.from({ length: 100 }, (_, i) => ({
      id: `tile-${i}`,
      album: null,
    })),
    updatedAt: new Date().toISOString(),
  });

  // return firebase-generated id
  return newDoc.id;
};
