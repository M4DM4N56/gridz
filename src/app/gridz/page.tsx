"use client";

import "../../css/globals.css"
import TopsterGrid from "../../components/topsterGrid";

import { useState } from "react";
import Link from "next/link";

const MAX_DIMENSION: number = 10;

type Tile = {
  id: string;
  album?: Album;
};

type Album = {
  title: string;
  artist: string;
  imageUrl: string;
};

export default function page(){

    // set up default dimensions for row/col
    const [numCols, setNumCols] = useState(5);
    const [numRows, setNumRows] = useState(5);

    // create array of tiles, maxdim x maxdim, set all albums to undefined
    const [tiles, setTiles] = useState<Tile[]>(() =>
    Array.from({ length: MAX_DIMENSION * MAX_DIMENSION }, (_, i) => ({
        id: `tile-${i}`, 
        album: undefined,
    }))); 

    // change row/cols -- only between 1-10
    function changeRows(change: number){
        if (numRows + change <= MAX_DIMENSION && numRows + change >= 1) { setNumRows(numRows + change) }
    }
    function changeCols(change: number){
        if (numCols + change <= MAX_DIMENSION && numCols + change >= 1) { setNumCols(numCols + change) }
    }

    // temporary add album function
    const addAlbumTemp = () => {
        // hardcoded album to add
        const newAlbum = {
            title: "Abbey Road",
            artist: "The Beatles",
            imageUrl: "AbbeyRoad.jpg",
        };

        //given prevTiles, override with newTiles (using spread ...)
        setTiles(prevTiles => {
            //each element of newTiles is a reference to the same element in prevTiles
            const newTiles = [...prevTiles];

            // find the first index in the array
            const emptyIndex = newTiles.findIndex(tile => !tile.album);

            // no empty tiles check
            if (emptyIndex === -1) {
            console.log("No empty tiles left!");
            return prevTiles;
            }

            // of the newTiles, overwrite newTiles[emptyIndex] so album = hardcoded album
            newTiles[emptyIndex] = {
            ...newTiles[emptyIndex],
            album: newAlbum,
            };

            // set the tiles to newTiles
            return newTiles;
        });
    };

    function removeAlbum(index: number) {
        setTiles(prevTiles => {
        const newTiles = [...prevTiles];
        newTiles[index] = { ...newTiles[index], album: undefined };
        return newTiles;
        });
    }
    
    return <>
        <html>
            <body>

                <h1>gridz</h1>
                
                <Link href="/" className = "page-link">home</Link>
                
                <br/>
                
                <button onClick={addAlbumTemp}>add album</button>


                <br/>

                <button onClick={() => changeRows(-1)}>-rows</button>
                <span> {numRows} </span>
                <button onClick={() => changeRows(+1)}>+rows</button>

                <br/>

                <button onClick={() => changeCols(-1)}>-cols</button>
                <span> {numCols} </span>
                <button onClick={() => changeCols(+1)}>+cols</button>

                {/* props to grid, giving dimensions */}
                <TopsterGrid rows={numRows} cols={numCols} tiles={tiles} onRemove={removeAlbum} />

            </body>
        </html>
    </>
}