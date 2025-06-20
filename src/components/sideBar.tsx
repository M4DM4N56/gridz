"use client";

import "../css/sidebar.css"

import {useTopster} from "../contexts/topsterContext"
import React, { useState } from "react";

import SideBarTile from "./sideBarTile";
import { searchAlbum } from "@/services/lastfm";

type album = {
  title: string;
  artist: string;
  imageUrl: string;
};

export default function sideBar() {
    const [tab, setTab] = useState("search");

    const { rows, cols, changeRows, changeCols, addAlbum } = useTopster();

    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState<album[]>([]);

    const handleRowSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeRows(Number(e.target.value));
    };

    const handleColSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeCols(Number(e.target.value));
    };


    function isValidUrl(url: string): boolean {
        try {
            // try to construct valid url
            const parsed = new URL(url);
            return parsed.protocol === "http:" || parsed.protocol === "https:";
        } 
        catch { return false; }
    }


    const handleSearch = async () => {

        // if query is just white spaces, ignore
        if (!query.trim()) return;
        
        try {
            const results = await searchAlbum(query);
            const albums = results.albummatches.album.map((item: any) => {
                // find the image with size "large", falling back to "medium", then to no image
                const imageArray = item.image || [];
                const imageUrl = imageArray.find((img: any) => img.size === "large")?.["#text"]
                            || imageArray.find((img: any) => img.size === "medium")?.["#text"]
                            || "";

                // recreate album type with item's name, artist, and imageURL
                return {
                    title: item.name,
                    artist: item.artist,
                    imageUrl: imageUrl.trim(),
                };
            
            // filter out items with missing/invalid imageURLs
            }).filter((album: album) => album.imageUrl && isValidUrl(album.imageUrl));
                setSearchResults(albums);
        } 
        catch (error) {
            console.error("Search failed:", error);
            setSearchResults([]);
        }
    };

    // when enter is clicked, submit query to api
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebar-buttons">
                <button onClick={() => setTab("settings")}>Settings</button>
                <button onClick={() => setTab("search")}>Search Albums</button>
            </div>

            {tab === "search" ? (
                <>
                    <div>
                        <input
                            placeholder="Search for albums..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>

                    <div
                        className="sidebar-tile-grid"
                        style={
                            {
                                "--rows": 10,
                                "--cols": 5,
                            } as React.CSSProperties
                        }
                    >
                        {searchResults.map((album, index) => (
                            <SideBarTile
                                key={`search-result-${index}`}
                                album={album}
                                onClick={() => addAlbum(album)}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className="sliderSetting">
                        <p>Rows</p>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={rows}
                            onChange={handleRowSlider}
                            className="slider"
                        />
                        <p>{rows}</p>
                    </div>
                    <div className="sliderSetting">
                        <p>Columns</p>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={cols}
                            onChange={handleColSlider}
                            className="slider"
                        />
                        <p>{cols}</p>
                    </div>
                </>
            )}
        </div>
    );
}
