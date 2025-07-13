"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";

export default function RequireAuth ({ children }: { children: React.ReactNode }){

    const router = useRouter();
    const [loading, setLoading] = useState(true)

    useEffect(() =>{

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user)  { router.replace("/") }
            else        { setLoading(false) }
        })

        return () => unsubscribe()
    }, [router])

    if (loading) return null

    return <> { children } </>
}