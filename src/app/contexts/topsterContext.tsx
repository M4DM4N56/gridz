"use client";

import { createContext, useContext, useState } from "react";


const MAX_DIMENSION: number = 10;

// create topster context, defaulting to null
const TopsterContext = createContext<TopsterContextType | null>(null);

type Album = {
  title: string;
  artist: string;
  imageUrl: string;
};

type Tile = {
  id: string;
  album?: Album;
};

type TopsterContextType = {
  rows: number;
  cols: number;
  tiles: Tile[];
  changeRows: (delta: number) => void;
  changeCols: (delta: number) => void;
  addAlbum: () => void;
  removeAlbum: (index: number) => void;
};

// must have children as arguments so children can inherit the provider's context
export function TopsterProvider({children}: {children: React.ReactNode}){

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
    function addAlbum() {
        // hardcoded album to add
        console.log("run func")
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


    // provider ships out the context with the variables
    return <>
    <TopsterContext.Provider
      value={{
        rows: numRows,
        cols: numCols,
        tiles,
        changeRows,
        changeCols,
        addAlbum,
        removeAlbum,
      }}
    >
      {children}
    </TopsterContext.Provider>
  </>

}

// exports the context with useContext. importing this will basically be importing 
// a custom hook to access the context variables
export function useTopster() {
    const ctx = useContext(TopsterContext);
    if (!ctx) throw new Error("useTopster must be used within TopsterProvider");
    
    return ctx;
}