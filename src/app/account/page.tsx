"use client";

import "../../css/globals.css"

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState }  from "react";
import { auth } from "../../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import RequireAuth from "../../components/requireAuth";


export default function Page(){

    const [username, setUsername] = useState("");
    const user = auth.currentUser;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // if user exists and has a displayname, set username to displayname
            if (user?.displayName) { setUsername(user.displayName); }
        });
        return () => unsubscribe();
    }, []);

    const router = useRouter();

    
    return <div>

        <RequireAuth>
                
            {username && ( <>
                <h1>Welcome, {username}!</h1> 
            </>)}
            
            <button onClick = { async () =>  {
                await signOut(auth);
                setTimeout(() => router.push("/"), 200); 
            }}>
                Log Out
            </button>

            <button onClick={() =>  {
                router.push("/gridz");                        
            }}>
                Go to Gridz
            </button>

        </RequireAuth>

    </div>

}
