import { loadEventImg } from "../assets/js/utils";

export default function ArtistCard({artist, isProfile = false}){
  console.log(artist?.image?.asset?.url)

    return(
        <article className="artistCard">
            <img src= {isProfile ? artist?.image?.asset?.url : loadEventImg(artist, 300, 800)} alt={`${artist.name} banner`}/>
            <p>{artist.name}</p>
        </article>
    )
}