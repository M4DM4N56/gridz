"use client";

import "../css/page-layout.css"

import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useTopster } from "../contexts/topsterContext";
import { useUser } from "../contexts/userContext";

export default function TopsterTitleEditor() {
    const {title, setTitle, topsterId } = useTopster();
    const { userId } = useUser();

    const [localTitle, setLocalTitle] = useState(title);

    useEffect(() => {
        setLocalTitle(title);
    }, [title])

    const handleBlur = async () => {
        if (localTitle === title || !topsterId || !userId) return;
        
        try {
            // update firestore with new title and time
            await updateDoc(doc(db, "users", userId, "topsters", topsterId), {
                title: localTitle,
                updatedAt: new Date().toISOString(),
            });
            // update topster context title to new title
            setTitle(localTitle);
        } 
        catch (err) { console.error("failed to update topster title:", err); }
    };


    return <>
        <div className="topster-title-editor">
            <input
                type="text"
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)} // update local state on every keystroke
                onBlur={handleBlur} // autosave when input loses focus
                placeholder="Enter topster title..."
            />
        </div>
    </>



}