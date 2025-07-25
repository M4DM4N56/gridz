"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { saveTopster } from "../lib/firebase";
import { useUser } from "../contexts/userContext"

const MAX_DIMENSION: number = 10;
// create topster context, defaulting to null
const TopsterContext = createContext<TopsterContextType | null>(null);

export type Album = {
  title: string;
  artist: string;
  imageUrl: string;
};

type Tile = {
  id: string;
  album?: Album;
};

type TopsterContextType = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  rows: number;
  cols: number;
  tiles: Tile[];
  topsterId: string,
  setTiles: React.Dispatch<React.SetStateAction<Tile[]>>;
  changeRows: (delta: number) => void;
  changeCols: (delta: number) => void;
  addAlbum: (album: Album) => void;
  removeAlbum: (index: number) => void;
  placeAlbum: (album: Album, toIndex: number, fromIndex?: number) => void;
  setHasLoaded: (value: boolean) => void;
};

type TopsterProviderProps = {
  topsterId: string;
  children: React.ReactNode;
};

// must have children as arguments so children can inherit the provider's context
export function TopsterProvider({topsterId, children}: TopsterProviderProps){

    const [title, setTitle] = useState<string>("untitled");
    const {user, userId, userEmail} = useUser();

    // set up default dimensions for row/col
    const [numCols, setNumCols] = useState(5);
    const [numRows, setNumRows] = useState(5);

    // has loaded checks if user has logged in yet. only updates topster if has loaded
    const [hasLoaded, setHasLoaded] = useState(false);

    // create array of tiles, maxdim x maxdim, set all albums to undefined
    const [tiles, setTiles] = useState<Tile[]>(() =>
      Array.from({ length: MAX_DIMENSION * MAX_DIMENSION }, (_, i) => ({
          id: `tile-${i}`, 
          album: undefined,
    }))); 


    // autosave
    useEffect(() => {
      // if no user or not loaded, dont autosave
      if (!userId || !hasLoaded || !topsterId) {
        console.log("autosave skipped");
        return;
      }

      // 
      const timeout = setTimeout(() => {
        // clean tiles for firestore storage
        // iterate through each tile
        const cleanTiles = tiles.map(tile => ({
          id: tile.id,
          album: tile.album ?? null, // firestore doesnt accept undefined. if tile doesnt exist, set to null instead
        }));

        // create topsterData
        const topsterData = {
          title,
          tiles: cleanTiles,
          rows: numRows,
          cols: numCols,
          email: userEmail,
        };

        console.log("saving topster:", topsterData); 

        // call saveTopster in lib/firebase with our new data
        saveTopster(userId, topsterId, topsterData);
      }, 1000);

      // only call timeout once after each autosave so function isnt spammed 
      return () => clearTimeout(timeout);
      }, [tiles, numRows, numCols, title, userId, hasLoaded, topsterId]); // when any of these are changed, run effect



    // change row/cols -- only between 1-10
    function changeRows(change: number){
        setNumRows(change)
    }
    function changeCols(change: number){
        setNumCols(change)
    }


    function addAlbum(newAlbum: Album) {
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

  function placeAlbum(album: Album, toIndex: number, fromIndex?: number) {
    setTiles(prevTiles => {
      const newTiles = [...prevTiles];

      // if moving album to the same album, or moving album to same original location -- do nothing
      if (fromIndex === toIndex || newTiles[toIndex].album === album) {
        return prevTiles;
      }

      // bool that checks if the targeted tile has an album there already
      const isTargetEmpty = !newTiles[toIndex].album;

      // if moving to empty tile -- 
      if (isTargetEmpty) {
        // if album is from a topster -- set original location as undefined
        if (typeof fromIndex === 'number') {
          newTiles[fromIndex].album = undefined;
        }
        // set the target location as album, return the new tiles array
        newTiles[toIndex].album = album;
        return newTiles;
      }

      const tileAlbums = newTiles.map(tile => tile.album);
      let filteredAlbums: (Album | undefined)[];

      // if moving from topster -> topster
      if (typeof fromIndex === 'number') {
        filteredAlbums = tileAlbums.slice();
        filteredAlbums.splice(fromIndex, 1);
      } 
      // if moving from sidebar -> topster
      else {
        filteredAlbums = tileAlbums.filter(Boolean);
      }

      // insert album at the new index
      filteredAlbums.splice(toIndex, 0, album);

      // reassign albums to original tile indexes
      const reorderedTiles = [...newTiles];
      for (let i = 0; i < reorderedTiles.length; i++) {
        reorderedTiles[i] = {
          ...reorderedTiles[i],
          album: filteredAlbums[i] ?? undefined,
        };
      }

      return reorderedTiles;
    });
  }

  // provider ships out the context with the variables
  return <>
    <TopsterContext.Provider
      value={{
        rows: numRows,
        cols: numCols,
        tiles,
        topsterId,
        setTiles, 
        changeRows,
        changeCols,
        addAlbum,
        removeAlbum,
        placeAlbum,
        setHasLoaded,
        title,
        setTitle,
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