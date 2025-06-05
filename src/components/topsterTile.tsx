import "../css/globals.css"
import "../css/topster.css"

type TileProps = {
  album?: {
    title: string;
    artist: string;
    imageUrl: string;
  };
  onRemove?: () => void;
};


export default function TopsterTile({ album, onRemove  }: TileProps) {

  if (album){
    return <div className="topster-tile">
        <img src={album.imageUrl} alt={album.title}/>
        <button className="hide" onClick={onRemove}>✖</button>
      </div>
  }

  else{ 
    return <span className="topster-tile"/> 
  }
  
}