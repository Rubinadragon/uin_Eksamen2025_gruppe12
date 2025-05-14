import { loadEventImg } from "../assets/js/utils";

export default function ArtistCard({artist}){
    return(
        <article className="artistCard">
            <img src= {loadEventImg(artist, 300, 800)} alt={`${artist.name} banner`}/>
            <p>{artist.name}</p>
        </article>
    )
}