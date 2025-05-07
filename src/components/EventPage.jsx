import { useEffect, useState } from "react";
import { fetchEventSearchInfo, fetchSingleAttractionById } from "../fetchers/fetchTicketmaster";
import { useParams } from "react-router-dom";
import "../assets/styles/eventPage.scss"
import EventCard from "./EventCard";

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

    //console.log(eventSearch?.events?.[2]._embedded)
    console.log(eventSearch)
    //console.log(eventSearch?.events)
    //console.log(attraction)
    return (
        <section className="eventPageInfo">
            <h1>{attraction.name}</h1>
            <article>
                <p>Sjanger: {eventSearch?.events?.[1].classifications?.reduce((acc, obj) =>{
                                if(!acc.some(o => o.genre?.id === obj.genre?.id || o.genre?.name != "Undefined" /*|| typeof o.genre?.name != typeof undefined*/)){
                                    acc.push(obj)
                                } return acc}, 
                                []).map((genre) => 
                                <span key={genre?.genre?.id}>{genre?.genre?.name}</span>)}
                    {/*eventSearch?.events?.[1].classifications?.map((genre) => <span key={genre.genre.id}>{genre.genre.name}</span>)*/}</p>
                <h2>Festivalpass</h2>
                <ul>
                    {eventSearch?.events?.map((festival) => <li key={festival.id}><EventCard event={festival} linkToDetails={false} attraction={attraction}/></li>)}
                </ul>
                <h2>Artister</h2>
                <ul>
                    {eventSearch?.events?.map((events, index) => 
                    {events[index]?.map(
                        (artist) => <li key={artist._embedded.id}>test</li>)})}
                    {eventSearch?.events?.map((events) => (events?._embedded?.attractions?.map((artist) => <li key={artist.id}>{artist.name}</li>)))}
                </ul>
                
            </article>
        </section>
    ) 
}//https://stackoverflow.com/questions/71689875/how-to-map-a-nested-array-of-objects-one-child-array-item-at-a-time-in-react
//https://stackoverflow.com/questions/51841507/mapping-object-keys-in-react-and-returning-child-properties/51842076
