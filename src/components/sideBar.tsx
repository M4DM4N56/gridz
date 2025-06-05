"use client";
import "../css/page-layout.css"

import {useTopster} from "../app/contexts/topsterContext"
import { useState } from "react";



type Album = {
  title: string;
  artist: string;
  imageUrl: string;
};


export default function sideBar(){

    const [tab, setTab] = useState("search");
    const { rows, cols, changeRows, changeCols, addAlbum } = useTopster();

    return <>
        <div className = "sidebar">
            <button onClick={() => setTab("settings")}>Settings</button>
            <button onClick={() => setTab("search")}>Search Albums</button>
        
            {(tab === "search") ? (
                <div>
                    <input placeholder="Search for albums..."/>
                    <button onClick={() => addAlbum()}>Add Album</button>
                </div>
                ) : (
                <>
                    <div>
                        <button onClick={() => changeRows(-1)}>-rows</button>
                        <span>{rows}</span>
                        <button onClick={() => changeRows(+1)}>+rows</button>
                    </div>
                    <div>
                        <button onClick={() => changeCols(-1)}>-cols</button>
                        <span>{cols}</span>
                        <button onClick={() => changeCols(+1)}>+cols</button>
                    </div>
                </>
            )}

        </div>
    </>
}