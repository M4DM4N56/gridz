import { useDrag, useDrop } from 'react-dnd';
import { useTopster, type Album } from '../contexts/topsterContext';

import "../css/topster.css";

type TopsterTileProps = {
  index: number;
  album?: {
    title: string;
    artist: string;
    imageUrl: string;
  };
  onRemove?: () => void;
};

export default function TopsterTile({ index, album, onRemove }: TopsterTileProps) {
  const { placeAlbum } = useTopster();

  const [, dropRef] = useDrop({
    accept: 'ALBUM', // accepts type 'ALBUM' for dropping
    drop: (item: { album: Album; fromTopster?: boolean; fromIndex?: number }) => { // give album obj and from___ details
      placeAlbum(item.album, index, item.fromTopster ? item.fromIndex : undefined);
    },
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ALBUM', // send type 'ALBUM
    item: () => ({ // give info on original location
      album,
      fromTopster: true,
      fromIndex: index,
    }),
    canDrag: !!album, // only able to drag tiles when album is defined
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // honestly dont understand this tileRef part, pasted to stack overflow and it works :)
  const tileRef = (el: HTMLDivElement | null) => {
    dragRef(dropRef(el));
  };


  return (
    <div
      ref={tileRef}
      className="topster-tile"
    >
      {album && (
        <>
          <img src={album.imageUrl} alt={album.title} />
          <button className="hide" onClick={onRemove}>✖</button>
        </>
      )}
    </div>
  );
}
