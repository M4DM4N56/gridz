"use client";

import "../css/sidebar.css"

import {useTopster} from "../app/contexts/topsterContext"
import { useState } from "react";

import SideBarTile from "./sideBarTile";

type Tile = {
  id: string;
  album?: album;
};

type album = {
  title: string;
  artist: string;
  imageUrl: string;
};

const newAlbum = {
    title: "Abbey Road",
    artist: "The Beatles",
    imageUrl: "AbbeyRoad.jpg",
};

const otherNewAlbum = {
    title: "Weezer Blue",
    artist: "Weezer",
    imageUrl: "Weezer.jpg",
};


export default function sideBar(){

    const [tab, setTab] = useState("search");
    const { rows, cols, changeRows, changeCols, addAlbum } = useTopster();

    const [tiles, setTiles] = useState<Tile[]>(() =>
        Array.from({ length: 10 * 5 }, (_, i) => ({
            id: `tile-${i}`, 
            album: i === 0 ? newAlbum : otherNewAlbum,
        }
    ))); 

    return <>
        <div className = "sidebar">
            <div className = "sidebar-buttons">
            <button onClick={() => setTab("settings")}>Settings</button>
            <button onClick={() => setTab("search")}>Search Albums</button>
            </div>
            {(tab === "search") ? ( <>
                <div>
                    <input placeholder="Search for albums..."/>
                </div>

                <div
                    className="sidebar-tile-grid"
                    style={{
                    '--rows': 10,
                    '--cols': 5,
                    } as React.CSSProperties}
                >
        
                {tiles.map((tile) => (
                    <SideBarTile 
                        key={tile.id} 
                        album={tile.album} 
                        onClick={() => { if (tile.album) addAlbum(tile.album)}} // if album, add it upon clicking
                    />
                ))}

                </div>

                </>) : (<>
                
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