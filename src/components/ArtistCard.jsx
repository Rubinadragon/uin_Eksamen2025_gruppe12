export default function ArtistCard({artist}){
    //console.log(artist)

    const loadArtistImg = (value) => {
    const allowedExstensions = ["jpg", "jpeg", "png", "webp"];

    if(!("images" in value)) 
      return "https://placehold.co/600x400?text=Billettyst"

    const foundImg = value.images.find((img) => img.ratio === "16_9" && (img.width < 800 && img.width > 300))
      
    if(!foundImg || !("url" in foundImg))
      return "https://placehold.co/600x400?text=Billettyst"
      
    const imgSplit = foundImg.url.split(".");

    if(!allowedExstensions.includes(imgSplit.pop())) {
      return "https://placehold.co/600x400?text=Billettyst"
    }
    return foundImg.url;
  }

    return(
        <article>
            <img src= {loadArtistImg(artist)} alt={`${artist.name} banner`}/>
            <p>{artist.name}</p>
        </article>
    )
}