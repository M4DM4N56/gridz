import TopsterTile from "./topsterTile";

type TopsterGridProps = {
  rows: number;
  cols: number;
  tiles: Array<{
    id: string;
    album?: {
      title: string;
      artist: string;
      imageUrl: string;
    };
  }>;
  onRemove: (index: number) => void;
};

export default function TopsterGrid({ rows, cols, tiles, onRemove }: TopsterGridProps) {
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
          onRemove={() => onRemove(index)}
        />
      ))}

    </div>
  </>
}
