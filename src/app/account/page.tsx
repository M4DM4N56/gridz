"use client";

import "../../css/globals.css"

import Link from "next/link";
import { useEffect, useState }  from "react";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";


export default function page(){

    const [username, setUsername] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // if user exists and has a displayname, set username to displayname
            if (user?.displayName) { setUsername(user.displayName); }
        });
        return () => unsubscribe();
    }, []);

    
    return <>
        <html>
            <body>
                
                {username && ( <>
                    <h1>Welcome, {username}!</h1> 
                
                
                </>)}

                <Link href="/gridz" className = "page-link">Make a grid</Link>

            </body>
        </html>

    </>

}
