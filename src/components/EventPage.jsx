import { useEffect, useState } from "react";
import { fetchEventSearchInfo, fetchSingleAttractionById } from "../fetchers/fetchTicketmaster";
import { useParams } from "react-router-dom";
import "../assets/styles/eventPage.scss"

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

    console.log(eventSearch?.events?.[1].classifications)
    //console.log(eventSearch)
    //console.log(attraction)
    return (
        <section className="eventPageInfo">
            <img src={"images" in attraction ? attraction.images.find((img) => img.ratio === "16_9" && (img.width < 800 && img.width > 300)).url : "test.jpg"}/>
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
                    {/*eventSearch?.map(() =>)*/}
                </ul>
            </article>
        </section>
    ) 
}
