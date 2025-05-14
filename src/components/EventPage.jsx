import { useEffect, useState } from "react";
import { fetchEventSearchInfo } from "../fetchers/fetchTicketmaster";
import { useParams } from "react-router-dom";
import "../assets/styles/eventPage.scss"
import EventCard from "./EventCard";
import ArtistCard from "./ArtistCard";
import { loadEventImg } from "../assets/js/utils";

export default function EventPage({selectedFestivals}) {
    let { id } = useParams();

    const [eventSearch, setEventSearch] = useState([])
    const [currentAttraction, setCurrentAttraction] = useState([]);
    const [loadingResults, setLoadingResults] = useState(true);

    useEffect(() => {
        getEventsByAttraction(id)
    }
    ,[selectedFestivals])

    const getEventsByAttraction = async (value) => {
        if(selectedFestivals[0]?.id)
            setCurrentAttraction(selectedFestivals?.find((e) => e.id === id));

        try {
            const response = await fetchEventSearchInfo(value)
            setEventSearch(response)
        }
        catch(error){
            console.error("Cannot fetch requested event search!:", error)
        }

        setLoadingResults(false)
    }
    //const test = city?.map(testy => testy?._embedded.venues)console.log("test",test)

    const genres = currentAttraction.classifications?.[0];
    
    const filteredArtist = eventSearch?.reduce((acc, obj) => {
        obj._embedded.attractions.map((artist) => {
            if(!acc?.some(o => o?.id === artist?.id))
                acc?.push(artist)
            
        })
        return acc}, []);
    return (
        !loadingResults && 
        <>
        <section className="eventPageInfo">
            <img src={loadEventImg(currentAttraction, 1200, 2048)} alt=""/>
            <h1>{currentAttraction.name}</h1>
            {("description" in currentAttraction) && <p>{currentAttraction.description}</p> }
            <ul>
                {genres?.genre.name != "Undefined" &&<li>{genres?.genre.name}</li> }
                {genres?.subGenre.name != "Undefined" &&<li>{genres?.subGenre.name}</li> }
                {genres?.segment.name != "Undefined" &&<li>{genres?.segment.name}</li> }
                {genres?.subType.name != "Undefined" &&<li>{genres?.subType.name}</li> }
            </ul>
        </section>

        <section>
            <h2>Festivalpass</h2>
            {eventSearch?.map((festival) => 
                <EventCard key={festival.id} event={festival} linkToDetails={false}/>
            )}
        </section>
        
        <section>
            <h2>Artister</h2>
            {filteredArtist?.map((artist) => (
                <ArtistCard key={artist?.id} artist={artist}/>
            ))}
        </section>
    </>
    ) 
}//https://stackoverflow.com/questions/74442594/how-to-remove-data-with-same-id-in-an-array-of-object-using-javascript