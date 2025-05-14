import { loadEventImg } from "../assets/js/utils";

export default function ArtistCard({artist}){
    console.log(artist)

    return(
        <article>
            <img src= {loadEventImg(artist, 300, 800)} alt={`${artist.name} banner`}/>
            <p>{artist.name}</p>
        </article>
    )
}