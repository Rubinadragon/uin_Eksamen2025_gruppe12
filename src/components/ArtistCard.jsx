import { loadEventImg } from "../assets/js/utils";
import "../assets/styles/artistCard.scss";

export default function ArtistCard({artist, isProfile = false}){
    return(
        <article className="artistCard">
            <img src= {isProfile ? artist?.image?.asset?.url : loadEventImg(artist, 300, 800)} alt={`${artist.name} banner`}/>
            <p>{artist.name}</p>
        </article>
    )
}