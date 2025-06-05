import {useTopster} from "../app/contexts/topsterContext"
import TopsterTile from "./topsterTile";


export default function TopsterGrid() {
  
  const {rows, cols, tiles, removeAlbum } = useTopster()

  return <>
      <div
        className="topster-grid"
        style={{
          '--rows': rows,
          '--cols': cols,
        } as React.CSSProperties}
      >

      {tiles.slice(0, rows * cols).map((tile, index) => (
        <TopsterTile 
          key={tile.id} 
          album={tile.album}
          onRemove={() => removeAlbum(index)}
        />
      ))}

    </div>
  </>
}
