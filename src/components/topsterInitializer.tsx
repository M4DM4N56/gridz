"use client";

import { useEffect }  from "react";
import { auth }       from "../config/firebase";
import { getTopster } from "@/lib/firebase";
import { useTopster } from "@/contexts/topsterContext";

export default function TopsterInitializer() {
  const { setTiles, changeRows, changeCols, setHasLoaded } = useTopster();

  // on mount
  useEffect(() => {

    const loadTopster = async () => {

      // if no user, loaded = true
      const user = auth.currentUser;
      if (!user) {
        setHasLoaded(true)
        return
      };

      try {
        const savedTopster = await getTopster(user.uid);
        // if a saved topster exists for the UID
        if (savedTopster) {
          console.log("loaded previous topster")
          // retrieve and set the saved topster's data
          setTiles(savedTopster.tiles);
          changeRows(savedTopster.rows);
          changeCols(savedTopster.cols);
        }

        else { console.log("no topster found, creating new one") }
      }

      catch(err) { console.log("error loading topster:", err); }

      // no matter what happened, set loaded to true
      finally { setHasLoaded(true) }

    };

    // run function unconfitionally
    loadTopster();
  }, []);

  return null;
}
