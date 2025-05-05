import { useEffect, useState } from "react";
import { fetchSingleAttractionById } from "../fetchers/fetchTicketmaster";
import { fetchSingleFestivalByID } from "../fetchers/fetchTicketmaster";
import { useParams } from "react-router-dom";
import "../assets/styles/eventPage.scss"
import EventCard from "./EventCard";


export default function EventPage() {
    let { id } = useParams();
    const promoterIDList = ["9189","13717","15301","14435"]

    const [attraction, setAttraction] = useState({});
    const [festivalInfo, setFestivalInfo] = useState([])

    useEffect(() => {
        getAttractionById(id);
    }, 
    []);

    const getAttractionById = async (value) => {
        try {
            const response = await fetchSingleAttractionById(value);
            setAttraction(response);

        }
        catch(error) {
            console.error("Cannot fetch requested attraction!:", error)
        }
        
    };
    console.log(attraction)
    return (
        <section className="eventPageInfo">
            <h1>{attraction.name}</h1>
            <img src={"images" in attraction ? attraction.images.find((img) => img.ratio === "16_9" && (img.width < 800 && img.width > 300)).url : "test.jpg"}/>
            <article>
                <p>Sjanger: {}</p>
            </article>
        </section>
        
    ) 
}
