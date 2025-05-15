import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleSanityEvent} from "../fetchers/eventServices";
import { fetchSingleEventsById } from "../fetchers/fetchTicketmaster";
import { fetchUserName } from "../fetchers/brukerServices";

export default function SanityEventDetails(){
    let { apiId } = useParams() // Manglet paranteser

    const [sanityEvent, setSanityEvent] = useState({});
    const [apiEvent, setApiEvent] = useState({})

    useEffect(() => {
        getSingleSanityEvent(apiId)
        getEventDetails(apiId)
    }, [])



    const getSingleSanityEvent = async (id) => {
        const data = await fetchSingleSanityEvent(id) 
        setSanityEvent(data) // Fjerne lookup på første index i array
    }

    //console.log(fetchSingleSanityEvent())
    const getEventDetails = async (value) => {
        try {
                const response = await fetchSingleEventsById(value); // Bytter til metode som fetcher eventer med id og ikke attractions
                setApiEvent(response);
            }
            catch(error) {
                console.error("Cannot fetch requested attraction!:", error)
        }
    }

    const getSanityPeople = async () => {

    }

    return (<section className="SanityEventDetails">
            <img />{/*Legg inn funksjon til å legge inn bilde*/}
            <h1>{apiEvent.name}</h1>
            <article>
                <h2>Dato og sted</h2>
                <p>Dato: <span>{apiEvent?.dates?.start?.localDate}</span></p>
                <p>Sted: <span>{apiEvent?._embedded?.venues[0]?.name}</span></p>
            </article>
            <article>
                <h2>Sjanger</h2>
                <p>{apiEvent?.classifications?.[0]?.genre?.name}</p>
            </article>
            <article>
                <h2>Hvem har dette i ønskelisten</h2>
                <p>Sett inn profil her</p>
            </article>
        </section>)
}