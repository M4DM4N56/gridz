import { useDrag } from "react-dnd";

import "../css/sidebar.css"

type TileProps = {
  album?: {
    title: string;
    artist: string;
    imageUrl: string;
  };
  onClick: () => void;
};


export default function SideBarTile({ album, onClick }: TileProps) {

    // is dragging hook
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "ALBUM", // type set to ALBUM for target to recognize
        item: { album }, // transfer album object
        collect: (monitor) => ({ isDragging: monitor.isDragging()}),
    }), [album]);

    if (album){
        return <div
            ref={dragRef as unknown as React.Ref<HTMLDivElement>}
            className="sidebar-tile" 
            onClick={onClick} 
        > 
            <img src={album.imageUrl} alt={album.title}/>
        </div>
    }

    else{ 
        return <span className="sidebar-tile"/> 
    }
  
}