import { useEffect, useState } from "react";
import { fetchEventSearchInfo, fetchSingleAttractionById } from "../fetchers/fetchTicketmaster";
import { useParams } from "react-router-dom";
import "../assets/styles/eventPage.scss"
import EventCard from "./EventCard";
import ArtistCard from "./ArtistCard";

export default function EventPage() {
    let { id } = useParams();

    const [attraction, setAttraction] = useState({});
    const [eventSearch, setEventSearch] = useState([])

    useEffect(()=>{
        getEventSearchByAttractionId(id)
        getAttractionById(id)
    },[])

    const getAttractionById = async (value) => {
        try {
            const response = await fetchSingleAttractionById(value);
            setAttraction(response);
        }
        catch(error) {
            console.error("Cannot fetch requested attraction!:", error)
        }
    };

    const getEventSearchByAttractionId = async (value) =>
    {
        try {
            const response = await fetchEventSearchInfo(value)
            setEventSearch(response)
            //console.log(response)
        }
        catch(error){
            console.error("Cannot fetch requested event search!:", error)
        }
    }

    //const mapEvent = eventSearch?.events?.map()
    
    //console.log(eventSearch?.events?.[2]._embedded)
    //console.log(eventSearch)
    //console.log(eventSearch?.events)
    //console.log(attraction)
    return (
        <section className="eventPageInfo">
            <h1>{attraction.name}</h1>
            <article>
                <p>Sjanger:
                    {eventSearch?.events?.map((events) => (events?.classifications?.reduce(
                        (acc,obj) => {
                            //console.log(events?.classifications?.genre)
                            if(!acc.some
                                (o => o?.events?.classifications?.genre?.id === obj?.events?.classifications?.genre?.id 
                                    || o?.events?.classifications?.genre?.name != "Undefined"))
                            {
                                console.log(obj?.events)
                                acc.push(obj)
                                //console.log(obj?.events?.class)
                                //console.log("acc:", acc)
                            } return acc},
                            [])
                            .map((genre) => 
                                <span id={genre?.genre?.id}>
                                    {genre?.genre?.name}
                                </span>)))}</p>
                <h2>Festivalpass</h2>
                <ul>
                    {eventSearch?.events?.map((festival) => <li key={festival.id}><EventCard event={festival} linkToDetails={false} attraction={attraction}/></li>)}
                </ul>
                <h2>Artister</h2>
                <ul>
                    {eventSearch?.events?.map((events) => 
                        (events?._embedded?.attractions?.map(
                            (artist) => 
                            <li key={artist.id}>
                                <ArtistCard img={artist?.images} artistName={artist?.name}/>
                            </li>)
                        )
                    )}
                </ul>
                
            </article>
        </section>
    ) 
}//https://stackoverflow.com/questions/71689875/how-to-map-a-nested-array-of-objects-one-child-array-item-at-a-time-in-react
//https://stackoverflow.com/questions/51841507/mapping-object-keys-in-react-and-returning-child-properties/51842076
//https://stackoverflow.com/questions/63693070/javascript-mapping-and-filtering-on-nested-arrays