"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../config/firebase";

type userContextType = {
  userId: string | null;
  user: User | null;
  userEmail: string | null;
  loading: boolean;
};

const UserContext = createContext<userContextType>({
  userId: null,
  user: null,
  userEmail: null,
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          await firebaseUser.reload();
          setUser(auth.currentUser);  
        } catch (err) {
          console.error("Failed to reload user:", err);
          setUser(firebaseUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
        value={{ 
            userId: user?.uid ?? null, 
            userEmail: user?.email?? null,
            user,
            loading,
        }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
