import { useEffect, useState } from "react";
import { fetchEventSearchInfo } from "../fetchers/fetchTicketmaster";
import { useParams } from "react-router-dom";
import "../assets/styles/eventPage.scss"
import EventCard from "./EventCard";
import ArtistCard from "./ArtistCard";
import EventHeader from "./EventHeader";

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
            setEventSearch(response.sort((a, b) => { // Sortere array med objekter basert på dato: https://stackoverflow.com/questions/2466356/sorting-objects-by-property-values
               a.dates.start.localDate - b.dates.start.localDate;
            }))
        }
        catch(error){
            console.error("Cannot fetch requested event search!:", error)
        }

        setLoadingResults(false)
    }

    const genres = currentAttraction.classifications?.[0];
    const location = eventSearch?.[0]?._embedded.venues[0];
    const filterDates = eventSearch?.map((e) => {
        return e.dates.start.localDate;
    });
    
    const filteredArtist = eventSearch?.reduce((acc, obj) => {
        obj._embedded.attractions.slice(1).map((artist) => {
            if(!acc?.some(o => o?.id === artist?.id))
                acc?.push(artist)
            
        })
        return acc}, []
    );

        console.log(currentAttraction)
    return (
        !loadingResults && 
        <>
        <EventHeader attraction={currentAttraction} dates={filterDates} location={location}/>

        <section className="eventPageInfo">
            <ul className="tags">
                {genres?.genre.name != "Undefined" &&<li>{genres?.genre.name}</li> }
                {genres?.subGenre.name != "Undefined" &&<li>{genres?.subGenre.name}</li> }
                {genres?.segment.name != "Undefined" &&<li>{genres?.segment.name}</li> }
                {genres?.subType.name != "Undefined" &&<li>{genres?.subType.name}</li> }
            </ul>
            {"externalLinks" in currentAttraction &&
            <>
                <ul className="socialLinks">
                    <h3>Følg på sosiale medier:</h3>
                    {"homepage" in currentAttraction.externalLinks &&<li>
                        <a href={currentAttraction.externalLinks.homepage[0].url}>
                            <img src="../src/assets/gfx/sym-link.svg" alt="Link button"/>
                        </a>
                    </li> }
                    {"instagram" in currentAttraction.externalLinks &&<li>
                        <a href={currentAttraction.externalLinks.instagram[0].url}>
                            <img src="../src/assets/gfx/instagram.svg" alt="Instagram brand button"/>
                        </a>
                    </li> }
                    {"facebook" in currentAttraction.externalLinks &&<li>
                        <a href={currentAttraction.externalLinks.facebook[0].url}>
                            <img src="../src/assets/gfx/facebook.svg" alt="Facebook brand button"/>
                        </a>
                    </li> }
                    {"spotify" in currentAttraction.externalLinks &&<li>
                        <a href={currentAttraction.externalLinks.spotify[0].url}>
                            <img src="../src/assets/gfx/spotify.svg" alt="Spotify brand button"/>
                        </a>
                    </li> }
                </ul>
            </>
            }
            {("description" in currentAttraction) && <p>{currentAttraction.description}</p>}
            
        </section>

        <section className="eventGrid">
            <h2>Festivalpass</h2>
            {eventSearch?.map((festival) => 
                <EventCard key={festival.id} event={festival} linkToDetails={false}/>
            )}
        </section>
        
        <section className="eventGrid">
            <h2>Artister</h2>
            {filteredArtist?.map((artist) => (
                <ArtistCard key={artist?.id} artist={artist}/>
            ))}
        </section>
    </>
    ) 
}//https://stackoverflow.com/questions/74442594/how-to-remove-data-with-same-id-in-an-array-of-object-using-javascript