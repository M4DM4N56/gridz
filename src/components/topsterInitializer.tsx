"use client";

import { useEffect }  from "react";
import { getTopster } from "../lib/firebase";
import { useTopster } from "../contexts/topsterContext";
import { useUser }    from "../contexts/userContext";

type Props = {
  topsterId: string;
};

export default function TopsterInitializer({topsterId}: Props) {
  const { setTiles, changeRows, changeCols, setHasLoaded, setTitle } = useTopster();
  const { user, userId } = useUser();

  // on mount
  useEffect(() => {

    const loadTopster = async () => {

      // if no user, loaded = true
      if (!user || !userId) {
        setHasLoaded(true)
        return
      };

      try {
        const savedTopster = await getTopster(userId, topsterId);
        // if a saved topster exists for the UID
        if (savedTopster) {
          console.log("loaded previous topster")
          // retrieve and set the saved topster's data
          setTiles(savedTopster.tiles);
          changeRows(savedTopster.rows);
          changeCols(savedTopster.cols);
          setTitle(savedTopster.title || "untitled"); 
        }

        else { console.log("no topster found, creating new one") }
      }

      catch(err) { console.log("error loading topster:", err); }

      // no matter what happened, set loaded to true
      finally { setHasLoaded(true) }
    };

    // run function unconditionally
    loadTopster();
  }, []);

  return null;
}
