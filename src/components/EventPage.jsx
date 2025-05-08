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
    //const test = city?.map(testy => testy?._embedded.venues)console.log("test",test)


    const mapEvent = eventSearch?.events?.map((singleEvent) => singleEvent)
    //console.log(mapEvent)
    //console.log(mapEvent)
    //console.log(eventSearch?.events?.[2]._embedded)
    //console.log(eventSearch)
    //console.log(eventSearch?.events)
    //console.log(attraction)
    return (
        <section className="eventPageInfo">
            <h1>{attraction.name}</h1>
            <article>
                <p>Sjanger:
                    {mapEvent?.[1].classifications?.reduce((acc, current) => {
                        let undefinedName = acc.find(item => {return item?.genre?.name === "Undefined"})
                        let exists = acc.find( item => {return item?.genre?.id === current?.genre?.id
                        })
                        if(!exists || !undefinedName){
                            acc = acc.concat(current)
                        }
                        return acc
                    }, []
                    ).map((events) => <span key={events?.genre?.id}>{events?.genre?.name}</span>)}
                    {/*eventSearch?.events?.map((events) => (events?.classifications?.reduce((acc,obj) => {
                            console.log(events?.classifications?.genre)
                            if(!acc.some
                                (o => o?.events?.classifications?.genre?.id === obj?.events?.classifications?.genre?.id 
                                    || o?.events?.classifications?.genre?.name != "Undefined"))
                            {
                                console.log(obj?.events)
                                acc.push(obj)
                                console.log(obj?.events?.class)
                                console.log("acc:", acc)
                            } return acc},
                            [])
                            .map((genre) => 
                                <span id={genre?.genre?.id}>
                                    {genre?.genre?.name}
                                </span>)))*/}</p>
                <h2>Festivalpass</h2>
                <ul>
                    {eventSearch?.events?.map((festival) => <li key={festival.id}><EventCard event={festival} linkToDetails={false} attraction={attraction}/></li>)}
                </ul>
                <h2>Artister</h2>
                <ul>
                    {/*eventSearch?.events?.map((events) => 
                        (events?._embedded?.attractions?.map(
                            (artist) => 
                            <li key={artist.id}>
                                <ArtistCard img={artist?.images} artistName={artist?.name}/>
                            </li>)
                        )
                    )*/}
                    {mapEvent?.map((events) => 
                        (events?._embedded?.attractions?.reduce(
                            (acc, obj) => {
                                if(!acc.some(o => o?.id === obj?.id) || !acc.some(o => o?.name === attraction?.name)){
                                    acc.push(obj)
                                    //console.log(attraction?.name)
                                    //console.log(obj?.name)
                                }
                                //console.log(obj)
                            return acc}, 
                            []).map
                            ((artist) => 
                            <li key={artist?.id}>
                                <ArtistCard artistName={artist?.name} artistImg={artist?.images}/>
                                <p>{artist?.name/*Fjern <p> når ArtistCard er ferdig*/}</p>
                            </li>)
                        )
                    )}
                </ul>
            </article>
        </section>
    ) 
}//https://stackoverflow.com/questions/74442594/how-to-remove-data-with-same-id-in-an-array-of-object-using-javascript